package com.example.projectsdtakenlijst.persistence;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PersistenceManager {

    private static final String DATA_DIRECTORY = "data";
    private static final String DATA_FILE = "data/taken.csv";

    // Methode om taken vanuit een CSV-bestand in te laden
    public static alleTaken loadTasksFromCSV() {
        alleTaken tasks = new alleTaken("Taken");
        Path dataFilePath = Paths.get(DATA_FILE);
        if (!Files.exists(dataFilePath)) {
            System.out.println("CSV-bestand niet gevonden: " + DATA_FILE);
            return tasks; // Retourneer lege takenlijst als het bestand niet bestaat
        }
        try (BufferedReader br = new BufferedReader(new FileReader(DATA_FILE))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 5) {
                    // Index 0: Naam, Index 1: Omschrijving, Index 2: GemaaktTijd, Index 3: VervalTijd, Index 4: Type
                    tasks.addTaak(data[0], data[1], data[2], data[3], data[4]);
                } else {
                    System.out.println("Ongeldige regel in CSV: " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return tasks;
    }

    // Methode om taken naar een CSV-bestand op te slaan
    public static void saveTasksToCSV(alleTaken tasks) {
        Path dataDirectoryPath = Paths.get(DATA_DIRECTORY);
        Path dataFilePath = Paths.get(DATA_FILE);
        try {
            if (!Files.exists(dataDirectoryPath)) {
                Files.createDirectories(dataDirectoryPath);
            }
            try (FileWriter writer = new FileWriter(dataFilePath.toFile())) {
                for (Taak task : tasks.getTaken()) {
                    // Gegevens van elke taak scheiden met komma's en elke taak op een nieuwe regel plaatsen
                    writer.write(String.join(",", task.getNaam(), task.getOmschrijving(), task.getGemaaktTijd(),
                            task.getVervalTijd(), task.getType()));
                    writer.write("\n"); // Nieuwe regel
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
