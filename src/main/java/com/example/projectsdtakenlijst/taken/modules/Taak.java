package com.example.projectsdtakenlijst.taken.modules;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Taak {

    private String naam;
    private String omschrijving;
    private String gemaaktOp;
    private String type;

    public Taak(String nm, String oms, String gO, String tp) {
        naam = nm;
        omschrijving = oms;
        gemaaktOp= gO;
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
    public String getGemaaktOp() {
        return gemaaktOp;
    }
    public void setGemaaktOp(String Gt) {
        gemaaktOp = Gt;
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
