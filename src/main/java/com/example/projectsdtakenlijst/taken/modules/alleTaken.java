package com.example.projectsdtakenlijst.taken.modules;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class alleTaken {
    private static alleTaken deTaak;
    public static void setTaak(alleTaken taak) {
        deTaak = taak;
    }
    public static alleTaken getTaak() {
        return deTaak;
    }

    private final String naam;
    private final List<Taak> taken;
    private final List<Taak> afgevinkteTaken;
    private final List<Gebruiker> gebruikers;
    public alleTaken(String nm) {
        naam = nm;
        taken = new ArrayList<>();
        afgevinkteTaken = new ArrayList<>();
        gebruikers = new ArrayList<>();
    }

    public Taak addTaak(String naam, String omschrijving, String gemaaktTijd, String vervalTijd, String type) {
        Taak nieuweTaak = new Taak(naam, omschrijving, gemaaktTijd, vervalTijd, type);
        taken.add(nieuweTaak);
        return nieuweTaak;
    }
    public void removeTaak(Taak t) {
        taken.remove(t);
    }
    public void removeAfgevinkteTaak(Taak t) {
        afgevinkteTaken.remove(t);
    }
    public boolean updateTaak(String taakNaam, Taak nieuweTaak) {
        for (int i = 0; i < taken.size(); i++) {
            if (taken.get(i).getNaam().equals(taakNaam)) {
                taken.set(i, nieuweTaak);
                return true;
            }
        }
        return false;
    }
    public void voegAfgevinkteTaakToe(Taak taak) {
        afgevinkteTaken.add(taak);
        taken.remove(taak); // Verwijder de taak ook uit de normale takenlijst
    }
    public Gebruiker addGebruiker(String naamGebruiker, String gebruikersnaam, String wachtwoord, String email) {
        Gebruiker nieuweGebruiker = new Gebruiker(naamGebruiker, gebruikersnaam, wachtwoord, email);
        gebruikers.add(nieuweGebruiker);
        return nieuweGebruiker;
    }

    public String getNaam() {
        return naam;
    }
    public List<Taak> getTaken() {
        return taken;
    }
    public List<Taak> getAfgevinkteTaken() {
        return Collections.unmodifiableList(afgevinkteTaken);
    }
    public List<Gebruiker> getGebruikers(){
        return Collections.unmodifiableList(gebruikers);
    }


}