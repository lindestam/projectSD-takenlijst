module com.example.projectsdtakenlijst {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.projectsdtakenlijst to javafx.fxml;
    exports com.example.projectsdtakenlijst;
}