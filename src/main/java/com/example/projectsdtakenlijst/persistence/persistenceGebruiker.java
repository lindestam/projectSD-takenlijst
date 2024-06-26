package com.example.projectsdtakenlijst.persistence;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class persistenceGebruiker {
    private static final String DATA_DIRECTORY = "data";
    private static final String DATA_FILE = "data/gebruikers.csv";
    private static final String USER_TASK_DIRECTOR = "data";
    private static final String USER_TASK_FILE = "data/gebruikerTaak.csv";

    public static void loadUsersFromSCV() {

    }
    public static void loadUsersFromFile() {
        alleTaken alleTakenInstance = alleTaken.getTaak();
        Path dataFile = Paths.get(DATA_FILE);
        if (!Files.exists(dataFile)) {
            System.out.println("CSV-bestand niet gevonden: " + DATA_FILE);
            return;
        }
        try (BufferedReader br = new BufferedReader(new FileReader(DATA_FILE))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 4) {
                    alleTakenInstance.addGebruiker(data[0], data[1], data[2], data[3]);
                } else {
                    System.out.println("Ongeldige regel in CSV: " + line);
                }
            }
        } catch (Exception e) {
            System.out.println("Fout bij het laden van gebruikers: " + e.getMessage());
        }
    }

    public static void saveUsersToFile() {
        alleTaken alleTakenInstance = alleTaken.getTaak();
        List<Gebruiker> gebruikers = alleTakenInstance.getGebruikers();

        Path dataDirectoryPath = Paths.get(DATA_DIRECTORY);
        Path dataFilePath = Paths.get(DATA_FILE);
        try {
            if (!Files.exists(dataDirectoryPath)) {
                Files.createDirectories(dataDirectoryPath);
            }
            try (FileWriter writer = new FileWriter(dataFilePath.toFile())) {
                for (Gebruiker gebruiker : gebruikers) {
                    writer.write(String.join(",",
                            gebruiker.getNaam(),
                            gebruiker.getGebruikersNaam(),
                            gebruiker.getWachtwoord(),
                            gebruiker.getEmail()));
                    writer.write("\n");
                }
            }
        } catch (Exception e) {
            System.out.println("Fout bij het opslaan van gebruikers: " + e.getMessage());
        }
    }
}
