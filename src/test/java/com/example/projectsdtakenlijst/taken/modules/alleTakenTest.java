package com.example.projectsdtakenlijst.taken.modules;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
class alleTakenTest {
    @Test
    public void testAddTaken(){
        alleTaken takenlijst = new alleTaken("Takenlijst");

// Test het toevoegen van een nieuwe taak
        Taak nieuweTaak = takenlijst.addTaak("Winkelen", "Boodschappen doen", "2024-07-01", "Persoonlijk");
        List<Taak> taken = takenlijst.getTaken();
        assertTrue(taken.contains(nieuweTaak));
    }
    @Test
    public void testRemoveTaak(){
        alleTaken takenlijst = new alleTaken("Takenlijst");
        Taak nieuweTaak = takenlijst.addTaak("Winkelen", "Boodschappen doen", "2024-07-01", "Persoonlijk");

        // Verwijder de taak
        takenlijst.removeTaak(nieuweTaak);

        // Controleer of de taak niet meer in de lijst aanwezig is
        List<Taak> taken = takenlijst.getTaken();
        assertFalse(taken.contains(nieuweTaak));
    }
    @Test
    public void testAfgevinkteTaak() {
        alleTaken takenlijst = new alleTaken("Takenlijst");
        Taak nieuweTaak = takenlijst.addTaak("Winkelen", "Boodschappen doen", "2024-07-01", "Persoonlijk");
        takenlijst.voegAfgevinkteTaakToe(nieuweTaak);
        List<Taak> afgevinkteTaak = takenlijst.getAfgevinkteTaken();
        assertTrue(afgevinkteTaak.contains(nieuweTaak));

        takenlijst.removeAfgevinkteTaak(nieuweTaak);
        assertFalse(afgevinkteTaak.contains(nieuweTaak));
    }
    @Test
    public void testAddGebruiker() {
        alleTaken takenlijst = new alleTaken("Takenlijst");
        Gebruiker nieuweGebruiker = takenlijst.addGebruiker("lisa", "lisa1234", "lisa_hoii", "lisa.jansen@icloud.com");
        List<Gebruiker> gebruikers = takenlijst.getGebruikers();
        assertTrue(gebruikers.contains(nieuweGebruiker));
    }
    @Test
    public void testGebruikerToevoegenBijTaak() {
        alleTaken takenlijst = new alleTaken("Takenlijst");
        // Maak een nieuwe taak en gebruiker
        Taak nieuweTaak = takenlijst.addTaak("Winkelen", "Boodschappen doen", "2024-07-01", "Persoonlijk");
        Gebruiker nieuweGebruiker = takenlijst.addGebruiker("Jan Jansen", "janjansen", "wachtwoord", "jan@voorbeeld.com");

        // Voeg de gebruiker toe aan de taak
        takenlijst.gebruikerToevoegenBijTaak(nieuweTaak, nieuweGebruiker);

        // Controleer of de gebruiker aan de taak is toegevoegd
        List<Gebruiker> gebruikers = takenlijst.getGebruikersBijTaak(nieuweTaak);
        assertTrue(gebruikers.contains(nieuweGebruiker));
    }
    @Test
    public void testGetGebruikersBijTaak() {
        alleTaken takenlijst = new alleTaken("Takenlijst");
        // Maak een nieuwe taak en gebruikers
        Taak nieuweTaak = takenlijst.addTaak("Winkelen", "Boodschappen doen", "2024-07-01", "Persoonlijk");
        Gebruiker gebruiker1 = takenlijst.addGebruiker("Jan Jansen", "janjansen", "wachtwoord", "jan@voorbeeld.com");
        Gebruiker gebruiker2 = takenlijst.addGebruiker("Piet Pietersen", "pietp", "geheim", "piet@voorbeeld.com");

        // Voeg gebruikers toe aan de taak
        takenlijst.gebruikerToevoegenBijTaak(nieuweTaak, gebruiker1);
        takenlijst.gebruikerToevoegenBijTaak(nieuweTaak, gebruiker2);

        // Haal de lijst met gebruikers bij de taak op
        List<Gebruiker> gebruikers = takenlijst.getGebruikersBijTaak(nieuweTaak);

        // Controleer of de juiste gebruikers aan de taak zijn gekoppeld
        assertEquals(2, gebruikers.size());
        assertTrue(gebruikers.contains(gebruiker1));
        assertTrue(gebruikers.contains(gebruiker2));
    }
    @Test
    public void testGetNaam() {
        alleTaken takenlijst = new alleTaken("Takenlijst");
        String expectedName = "Takenlijst";

        // Haal de naam op via de getNaam methode
        String actualName = takenlijst.getNaam();
        // Controleer of de daadwerkelijke naam overeenkomt met de verwachte naam
        assertEquals(expectedName, actualName);
    }
  
}