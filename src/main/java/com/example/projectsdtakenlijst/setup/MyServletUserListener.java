package com.example.projectsdtakenlijst.setup;

import com.example.projectsdtakenlijst.persistence.persistenceGebruiker;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyServletUserListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Applicatie is begonnen, gebruikers worden geladen.");
        persistenceGebruiker.loadUsersFromFile();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Applicatie wordt afgesloten, gebruikers worden opgeslagen.");
        persistenceGebruiker.saveUsersToFile();
    }
}
