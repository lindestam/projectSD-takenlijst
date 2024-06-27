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
import java.util.logging.Logger;

@Path("addTaken")
public class addTaakResource {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTaken(String requestBody) {
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();

        String taakNaam = jsonObject.getString("naam");
        String omschrijving = jsonObject.getString("omschrijving");
        String gemaaktOp = jsonObject.getString("gemaaktOp");
        String type = jsonObject.getString("type");

        // Check if the fields are empty
        if (taakNaam.isEmpty() || omschrijving.isEmpty() || gemaaktOp.isEmpty() || type.isEmpty()) {
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
        Taak newTaak = takenLijst.addTaak(taakNaam, omschrijving, gemaaktOp, type);
        if (newTaak == null || taken.contains(newTaak)) {
            var message = new AbstractMap.SimpleEntry<>("message", "Taak zit in de lijst!");
            return Response.status(500).entity(message).build();
        }

        return Response.ok(newTaak).build();
    }
}