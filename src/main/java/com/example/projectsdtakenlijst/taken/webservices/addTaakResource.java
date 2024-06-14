package com.example.projectsdtakenlijst.taken.webservices;


import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
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
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();
        String taakNaam = jsonObject.getString("taak");
        String omschrijving = jsonObject.getString("omschrijving");
        String datum = jsonObject.getString("datum");
        String vervalDatum = jsonObject.getString("vervalDatum");
        String type = jsonObject.getString("type");


        List<Taak> taken = alleTaken.getTaak().getTaken();
        for (Taak t : taken) {
            if (t.getNaam().equals(taakNaam)) {
                var error = new AbstractMap.SimpleEntry<>("error", "Taak met dezelfde naam bestaat al!");
                return Response.status(409).entity(error).build();
            }
        }
        alleTaken takenLijst = alleTaken.getTaak();
        Taak newTaak = takenLijst.addTaak(taakNaam, omschrijving, datum, vervalDatum, type);
        if(taken.contains(newTaak)) {
            var message = new AbstractMap.SimpleEntry<>("message", "taak zit in de lijst!");
            return Response.status(500).entity(message).build();
        }
        return Response.ok(newTaak).build();
    }
}
