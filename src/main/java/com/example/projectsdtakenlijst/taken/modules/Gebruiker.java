package com.example.projectsdtakenlijst.taken.modules;

public class Gebruiker {
    private String naamGebruiker;
    private String gebruikersnaam;
    private String wachtwoord;
    private String email;

    public Gebruiker(String nm, String gN, String ww, String em) {
        naamGebruiker = nm;
        gebruikersnaam = gN;
        wachtwoord = ww;
        email = em;
    }

    // Getters
    public String getNaam() {
        return naamGebruiker;
    }

    public String getGebruikersNaam() {
        return gebruikersnaam;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public String getEmail() {
        return email;
    }

    // Setters
    public void setNaam(String nm) {
        naamGebruiker = nm;
    }

    public void setGebruikersNaam(String gN) {
        gebruikersnaam = gN;
    }

    public void setWachtwoord(String ww) {
        wachtwoord = ww;
    }

    public void setEmail(String em) {
        email = em;
    }
}


