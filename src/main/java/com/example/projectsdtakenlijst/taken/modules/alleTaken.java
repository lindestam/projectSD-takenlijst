package com.example.projectsdtakenlijst.taken.modules;

import java.util.*;

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
    private final Map<Taak, List<Gebruiker>> taakGebruiker;
    public alleTaken(String nm) {
        naam = nm;
        taken = new ArrayList<>();
        afgevinkteTaken = new ArrayList<>();
        gebruikers = new ArrayList<>();
        taakGebruiker = new HashMap<>();
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
    public Taak addTaak(String naam, String omschrijving, String gemaaktOp, String type) {
        Taak nieuweTaak = new Taak(naam, omschrijving, gemaaktOp, type);
        taken.add(nieuweTaak);
        return nieuweTaak;
    }
    public Gebruiker addGebruiker(String naam, String gebruikersNaam, String wachtwoord, String email) {
        Gebruiker nieuweGebruiker = new Gebruiker(naam, gebruikersNaam, wachtwoord, email);
        gebruikers.add(nieuweGebruiker);
        return nieuweGebruiker;
    }
    public void gebruikerToevoegenBijTaak(Taak taak, Gebruiker gebruiker) {
        if(!taakGebruiker.containsKey(taak)) {
            taakGebruiker.put(taak, new ArrayList<>());
        }
        taakGebruiker.get(taak).add(gebruiker);
    }

    public List<Gebruiker> getGebruikersBijTaak(Taak taak) {
        if (taakGebruiker.containsKey(taak)) {
            return taakGebruiker.get(taak);
        } else {
            return new ArrayList<>();
        }
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