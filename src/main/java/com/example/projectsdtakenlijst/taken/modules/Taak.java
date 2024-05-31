package com.example.projectsdtakenlijst.taken.modules;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Taak {

    public String naam;
    public String omschrijving;
    public String gemaaktTijd;
    public String vervalTijd;
    public Gebruiker naamGebruiker;
    public String type;

    public Taak(String nm, String oms, String gT, String vT, String tp) {
        naam = nm;
        omschrijving = oms;
        gemaaktTijd = gT;
        vervalTijd = vT;
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
    public String getGemaaktTijd() {
        return gemaaktTijd;
    }
    public void setGemaaktTijd(String Gt) {
        gemaaktTijd = Gt;
    }
    public String getVervalTijd() {
        return vervalTijd;
    }
    public void setVervalTijd(String Vt) {
        vervalTijd = Vt;
    }
    public String getType() {
        return type;
    }
    public void setType(String tp) {
        type = tp;
    }
    public static String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return date.format(formatter);
    }


}
