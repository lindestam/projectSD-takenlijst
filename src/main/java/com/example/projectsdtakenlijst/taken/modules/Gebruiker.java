package com.example.projectsdtakenlijst.taken.modules;

public class Gebruiker {
    private String naam;
    private String gebruikersNaam;
    private String wachtwoord;
    private String email;

    public Gebruiker(String nm, String gN, String ww, String em) {
        naam = nm;
        gebruikersNaam = gN;
        wachtwoord = ww;
        email = em;
    }

    // Getters
    public String getNaam() {
        return naam;
    }

    public String getGebruikersNaam() {
        return gebruikersNaam;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public String getEmail() {
        return email;
    }

    // Setters
    public void setNaam(String nm) {
        naam = nm;
    }

    public void setGebruikersNaam(String gN) {
        gebruikersNaam = gN;
    }

    public void setWachtwoord(String ww) {
        wachtwoord = ww;
    }

    public void setEmail(String em) {
        email = em;
    }
}


