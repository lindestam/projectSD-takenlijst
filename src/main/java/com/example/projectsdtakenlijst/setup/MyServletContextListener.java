package com.example.projectsdtakenlijst.setup;

import com.example.projectsdtakenlijst.persistence.PersistenceManager;
import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.time.LocalDate;

@WebListener
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("applicatie begint");

        // Maak één instantie van alleTaken aan
        alleTaken takenLijst = PersistenceManager.loadTasksFromCSV();
        alleTaken.setTaak(takenLijst);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("terminating application");

        alleTaken takenLijst = alleTaken.getTaak();
        PersistenceManager.saveTasksToCSV(takenLijst);
    }
}
