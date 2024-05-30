package com.example.projectsdtakenlijst.taken.modules;

import java.time.LocalDate;

public class Taak {
    private static Taak deTaak;
    public static void setTaak(Taak taak) {
        deTaak = taak;
    }
    public static Taak getTaak() {
        return deTaak;
    }

    public String naam;
    public String omschrijving;
    public LocalDate gemaaktTijd;
    public LocalDate vervalTijd;
    public Gebruiker naamGebruiker;
    public String type;

    public Taak(String nm, String oms, LocalDate Gt, LocalDate Vt, String tp) {
        naam = nm;
        omschrijving = oms;
        gemaaktTijd = Gt;
        vervalTijd = Vt;
        type = tp;
    }

    public String getNaam() {
        return naam;
    }
    public void setNaam(String nm) {
        naam = nm;
    }
    public String getOmschrijving() {
        return omschrijving;
    }
    public void setOmschrijving(String oms) {
        omschrijving = oms;
    }
    public LocalDate getGemaaktTijd() {
        return gemaaktTijd;
    }
    public void setGemaaktTijd(LocalDate Gt) {
        gemaaktTijd = Gt;
    }
    public LocalDate getVervalTijd() {
        return vervalTijd;
    }
    public void setVervalTijd(LocalDate Vt) {
        vervalTijd = Vt;
    }
    public String getType() {
        return type;
    }
    public void setType(String tp) {
        type = tp;
    }
}
