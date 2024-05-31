package com.example.projectsdtakenlijst.setup;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Locale;

@WebListener
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("applicatie begint");

        // Maak één instantie van alleTaken aan
        alleTaken takenLijst = new alleTaken("taken");
        alleTaken.setTaak(takenLijst);

        LocalDate gemaaktTijd1 = LocalDate.of(2000, 5, 1);
        LocalDate vervalTijd1 = LocalDate.of(2000, 5, 28);
        String formattedGemaaktTijd1 = Taak.formatDate(gemaaktTijd1);
        String formattedVervalTijd1 = Taak.formatDate(vervalTijd1);
        takenLijst.addTaak("houshouden", "ik moet het huis schoonmaken en stofzuigen",formattedGemaaktTijd1, formattedVervalTijd1, "persoonlijk");

        LocalDate gemaaktTijd2 = LocalDate.of(2000, 5, 2);
        LocalDate vervalTijd2 = LocalDate.of(2000, 5, 29);
        String formattedGemaaktTijd = Taak.formatDate(gemaaktTijd2);
        String formattedVervalTijd = Taak.formatDate(vervalTijd2);
        takenLijst.addTaak("school opdrachten", "ik moet voor biologie voor woensdag twee verslagen afmaken over het menselijk lichaam",formattedGemaaktTijd, formattedVervalTijd, "school");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("terminating application");
    }
}
