package com.example.projectsdtakenlijst.persistence;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class persistenceGebruiker {
    private static final String DATA_DIRECTORY = "data";
    private static final String DATA_FILE = "data/gebruikers.csv";
    private static final String USER_TASK_DIRECTOR = "data";
    private static final String USER_TASK_FILE = "data/gebruikerTaak.csv";


    public static void loadUsersFromFile() {
        alleTaken tasks = alleTaken.getTaak();
        Path dataFile = Paths.get(DATA_FILE);
        if (!Files.exists(dataFile)) {
            System.out.println("CSV-bestand niet gevonden: " + dataFile);
            return;
        }
        try (BufferedReader br = new BufferedReader(new FileReader(DATA_FILE))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 4) {
                    tasks.addGebruiker(data[0], data[1], data[2], data[3]);
                } else {
                    System.out.println("Ongeldige regel in CSV: " + line);
                }
            }
        } catch (Exception e) {
            System.out.println("Fout bij het laden van gebruikers: " + e.getMessage());
        }
    }

    public static void loadTaskUsersFromFile() {
        String fileName = USER_TASK_FILE; // Definieer het bestandsnaam
        alleTaken tasks = alleTaken.getTaak();
        Path dataFile = Paths.get(fileName);
        if (!Files.exists(dataFile)) {
            System.out.println("CSV-bestand niet gevonden: " + fileName);
            return;
        }
        try (BufferedReader br = Files.newBufferedReader(dataFile)) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 5) { // Er moeten 5 velden zijn: naam, gebruikersNaam, wachtwoord, email, taakNaam
                    Gebruiker gebruiker = new Gebruiker(data[0], data[1], data[2], data[3]);
                    Taak taak = null;
                    for (Taak t : tasks.getTaken()) {
                        if (t.getNaam().equals(data[4])) {
                            taak = t;
                            break;
                        }
                    }
                    if (taak != null) {
                        tasks.gebruikerToevoegenBijTaak(taak, gebruiker);
                    } else {
                        System.out.println("Taak niet gevonden voor gebruiker: " + line);
                    }
                } else {
                    System.out.println("Ongeldige regel in CSV: " + line);
                }
            }
        } catch (IOException e) {
            System.out.println("Fout bij het laden van taak-gebruikers: " + e.getMessage());
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
    public static void saveTaskUsersToFile() {
        alleTaken tasks = alleTaken.getTaak(); // Haal de instantie van alleTaken op
        Path dataFilePath = Paths.get(USER_TASK_FILE);
        Path dataDirectoryPath = Paths.get(USER_TASK_DIRECTOR);
        try {
            if (!Files.exists(dataDirectoryPath)) {
                Files.createDirectories(dataDirectoryPath);
            }
            try (BufferedWriter writer = Files.newBufferedWriter(dataFilePath)) {
                for (Taak taak : tasks.getTaken()) {
                    List<Gebruiker> gebruikers = tasks.getGebruikersBijTaak(taak);
                    for (Gebruiker gebruiker : gebruikers) {
                        writer.write(String.join(",",
                                gebruiker.getNaam(),
                                gebruiker.getGebruikersNaam(),
                                gebruiker.getWachtwoord(),
                                gebruiker.getEmail(),
                                taak.getNaam()));
                        writer.write("\n");
                    }
                }
            } catch (IOException e) {
                System.out.println("Fout bij het opslaan van taak-gebruikers: " + e.getMessage());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
