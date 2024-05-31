package com.example.projectsdtakenlijst.taken.modules;

import java.time.LocalDate;
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

    public String naam;
    public List<Taak> taken;
    public List<Taak> afgevinkteTaken;
    public alleTaken(String nm) {
        naam = nm;
        taken = new ArrayList<>();
        afgevinkteTaken = new ArrayList<>();
    }
    public Taak addTaak(String naam, String omschrijving, String gemaaktTijd, String vervalTijd, String type) {
        Taak nieuweTaak = new Taak(naam, omschrijving, gemaaktTijd, vervalTijd, type);
        taken.add(nieuweTaak);
        return nieuweTaak;
    }
    public void removeTaak(Taak t) {
        taken.remove(t);
    }
    public void updateTaak(Taak oudeTaak, Taak nieuweTaak) {
        int index = taken.indexOf(oudeTaak);
        if (index != -1) {
            taken.set(index, nieuweTaak);
        }
    }
    public String getNaam() {
        return naam;
    }
    public List<Taak> getTaken() {
        return Collections.unmodifiableList(taken);
    }
    public List<Taak> getAfgevinkteTaken() {
        return Collections.unmodifiableList(afgevinkteTaken);
    }
}