package com.example.projectsdtakenlijst.persistence;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class PersistenceManager {
    private static final String DATA_DIRECTORY = "data";
    private static final String DATA_FILE = "data/taken.csv";
    private static final String AFGEVINKTE_TAKEN_FILE = "data/afgevinkteTaken.csv";

    // Methode om taken vanuit een CSV-bestand in te laden
    public static alleTaken loadTasksFromCSV() {
        alleTaken tasks = alleTaken.getTaak();
        if (tasks == null) { // Controleer of er al een instantie bestaat
            tasks = new alleTaken("lijsten");
            alleTaken.setTaak(tasks);
        }
        loadTasksFromFile(DATA_FILE, tasks, false);
        loadTasksFromFile(AFGEVINKTE_TAKEN_FILE, tasks, true);
        return tasks;
    }

    private static void loadTasksFromFile(String fileName, alleTaken tasks, boolean afgevinkt) {
        Path dataFilePath = Paths.get(fileName);
        if (!Files.exists(dataFilePath)) {
            System.out.println("CSV-bestand niet gevonden: " + fileName);
            return;
        }
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 5) {
                    Taak taak = tasks.addTaak(data[0], data[1], data[2], data[3], data[4]);
                    if (afgevinkt) {
                        tasks.voegAfgevinkteTaakToe(taak);
                    }
                } else {
                    System.out.println("Ongeldige regel in CSV: " + line);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private static void saveTasksToFile(String fileName, List<Taak> taken) {
        Path dataDirectoryPath = Paths.get(DATA_DIRECTORY);
        Path dataFilePath = Paths.get(fileName);
        try {
            if (!Files.exists(dataDirectoryPath)) {
                Files.createDirectories(dataDirectoryPath);
            }
            try (FileWriter writer = new FileWriter(dataFilePath.toFile())) {
                for (Taak task : taken) {
                    writer.write(String.join(",", task.getNaam(), task.getOmschrijving(), task.getGemaaktTijd(),
                            task.getVervalTijd(), task.getType()));
                    writer.write("\n");
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    // Methode om taken naar een CSV-bestand op te slaan
    public static void saveTasksToCSV(alleTaken tasks) {
        saveTasksToFile(DATA_FILE, tasks.getTaken());
    }

    public static void saveAfgevinkteTasksToCSV(alleTaken tasks) {
        saveTasksToFile(AFGEVINKTE_TAKEN_FILE, tasks.getAfgevinkteTaken());
    }
}
