package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.StringReader;
import java.util.List;

@Path("gebruikerTaak")
public class gebruikerBijTaak {
    @Path("{taakNaam}/gebruikers")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response gebruikerToevoegenAanTaak(@PathParam("taakNaam")String naam, String requestBody) {
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();

        String gebruiker = jsonObject.getString("gebruiker");

        List<Taak> taken = alleTaken.getTaak().getTaken();
        Taak gekozenTaak = null;
        for (Taak t : taken) {
            if(t.getNaam().equals(naam)) {
               gekozenTaak = t;
            }
        }
        if (gekozenTaak == null) {
            // Taak niet gevonden, retourneer 404 Not Found
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Taak met naam " + naam + " niet gevonden.")
                    .build();
        }
        Gebruiker nieuweGebruiker = new Gebruiker(gebruiker, "gebruikersnaam", "wachtwoord", "email"); // Je moet hier de juiste parameters invullen
        alleTaken lijst = alleTaken.getTaak();

        lijst.gebruikerToevoegenBijTaak(gekozenTaak, nieuweGebruiker);
        List<Gebruiker> gebruikersBijTaak = lijst.getGebruikersBijTaak(gekozenTaak);
        return Response.ok(gebruikersBijTaak).build();
    }
}
