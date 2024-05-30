module com.example.projectsdtakenlijst {
    requires java.servlet;
    requires org.glassfish.java.json;// oor javax.servlet API
    requires jersey.common; // oor Jersey Common
    requires jersey.server; // oor Jersey Server
    requires jersey.container.servlet.core; // oor Jersey Servlet Container
    requires jersey.media.json.jackson; // oor JSON support in Jersey
    // oeg ander modules toe

    opens com.example.projectsdtakenlijst to javafx.fxml;
    exports com.example.projectsdtakenlijst;
}