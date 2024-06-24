package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
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
import java.util.AbstractMap;
import java.util.List;

@Path("addgebruiker")
public class addGebruikerResource {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addGebruikers(String requestBody) {
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();

        String naamGebruiker = jsonObject.getString("naamGebruiker");
        String gebruikersNaam = jsonObject.getString("gebruikersnaam");
        String wachtwoord = jsonObject.getString("wachtwoord");
        String email = jsonObject.getString("email");

        if (naamGebruiker.isEmpty() || gebruikersNaam.isEmpty() || wachtwoord.isEmpty() || email.isEmpty()) {
            var error = new AbstractMap.SimpleEntry<>("error", "Fields cannot be empty!");
            return Response.status(400).entity(error).build();
        }
        alleTaken taak = alleTaken.getTaak();
        List<Gebruiker> gebruikers = taak.getGebruikers();
        for (Gebruiker g : gebruikers) {
            if (g.getNaam().equals(naamGebruiker)) {
                var error = new AbstractMap.SimpleEntry<>("error", "gebruiker met dezelfde naam bestaat al!");
                return Response.status(409).entity(error).build();
            }
        }
        alleTaken gebruikersLijst = alleTaken.getTaak();
        Gebruiker newGebruiker = gebruikersLijst.addGebruiker(naamGebruiker, gebruikersNaam, wachtwoord, email);
        if (gebruikers.contains(newGebruiker)) {
            var message = new AbstractMap.SimpleEntry<>("message", "gebruiker zit in de lijst!");
            return Response.status(500).entity(message).build();
        }
        return Response.ok(newGebruiker).build();
    }
}
