package com.example.projectsdtakenlijst.setup;

import com.example.projectsdtakenlijst.persistence.PersistenceManager;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyServletContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Applicatie begint, taken worden geladen.");
        PersistenceManager.loadTasksFromCSV();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("Applicatie wordt afgesloten, taken worden opgeslagen.");
        alleTaken takenLijst = alleTaken.getTaak();
        PersistenceManager.saveTasksToCSV(takenLijst);
        PersistenceManager.saveAfgevinkteTasksToCSV(takenLijst);
    }
}
