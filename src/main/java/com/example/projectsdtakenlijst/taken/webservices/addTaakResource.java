package com.example.projectsdtakenlijst.taken.webservices;


import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.json.*;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.StringReader;
import java.time.LocalDate;
import java.util.AbstractMap;
import java.util.List;
import java.util.Locale;

@Path("addTaken")
public class addTaakResource {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTaken(String requestBody) {
        try {
            JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
            JsonObject jsonObject = jsonReader.readObject();

            // Retrieve JSON fields with default values as null
            JsonString taakJsonString = jsonObject.getJsonString("taak");
            JsonString omschrijvingJsonString = jsonObject.getJsonString("omschrijving");
            JsonString datumJsonString = jsonObject.getJsonString("datum");
            JsonString vervalDatumJsonString = jsonObject.getJsonString("vervalDatum");
            JsonString typeJsonString = jsonObject.getJsonString("type");

            // Check if any of the required fields are null
            if (taakJsonString == null || omschrijvingJsonString == null || datumJsonString == null ||
                    vervalDatumJsonString == null || typeJsonString == null) {
                var error = new AbstractMap.SimpleEntry<>("error", "Missing required fields!");
                return Response.status(400).entity(error).build();
            }

            String taakNaam = taakJsonString.getString();
            String omschrijving = omschrijvingJsonString.getString();
            String datum = datumJsonString.getString();
            String vervalDatum = vervalDatumJsonString.getString();
            String type = typeJsonString.getString();

            // Check if the fields are empty
            if (taakNaam.isEmpty() || omschrijving.isEmpty() || datum.isEmpty() || vervalDatum.isEmpty() || type.isEmpty()) {
                var error = new AbstractMap.SimpleEntry<>("error", "Fields cannot be empty!");
                return Response.status(400).entity(error).build();
            }

            List<Taak> taken = alleTaken.getTaak().getTaken();
            for (Taak t : taken) {
                if (t.getNaam().equals(taakNaam)) {
                    var error = new AbstractMap.SimpleEntry<>("error", "Taak met dezelfde naam bestaat al!");
                    return Response.status(409).entity(error).build();
                }
            }

            alleTaken takenLijst = alleTaken.getTaak();
            Taak newTaak = takenLijst.addTaak(taakNaam, omschrijving, datum, vervalDatum, type);
            if (newTaak == null || taken.contains(newTaak)) {
                var message = new AbstractMap.SimpleEntry<>("message", "Taak zit in de lijst!");
                return Response.status(500).entity(message).build();
            }

            return Response.ok(newTaak).build();
        } catch (JsonException e) {
            var error = new AbstractMap.SimpleEntry<>("error", "Invalid JSON format!");
            return Response.status(400).entity(error).build();
        } catch (Exception e) {
            var error = new AbstractMap.SimpleEntry<>("error", "Server error: " + e.getMessage());
            return Response.status(500).entity(error).build();
        }
    }
}