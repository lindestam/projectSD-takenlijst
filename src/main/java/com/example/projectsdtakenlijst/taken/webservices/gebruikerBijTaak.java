package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.StringReader;
import java.util.List;

@Path("taken")
public class gebruikerBijTaak {
    @GET
    @Path("{taakNaam}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGebruikersVanTaak(@PathParam("taakNaam")String naam) {
        List<Taak> taken = alleTaken.getTaak().getTaken();
        Taak taak = null;
        for (Taak t : taken) {
            if (t.getNaam().equals(naam)) {
                taak = t;
            }
        }
        alleTaken takenlijst = alleTaken.getTaak();
        List<Gebruiker> gebruikersBijTaak = takenlijst.getGebruikersBijTaak(taak);
        return Response.ok(gebruikersBijTaak).build();
    }

    @Path("gebruikers/{taakNaam}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response gebruikerToevoegenAanTaak(@PathParam("taakNaam")String naam, String requestBody) {
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();

        String gebruikerNaam = jsonObject.getString("naam");

        if (gebruikerNaam.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Gebruiker field must be non-empty.")
                    .build();
        }

        List<Taak> taken = alleTaken.getTaak().getTaken();
        Taak gekozenTaak = null;
        for (Taak t : taken) {
            if (t.getNaam().equals(naam)) {
                gekozenTaak = t;
                break;
            }
        }

        if (gekozenTaak == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Taak met naam " + naam + " niet gevonden.")
                    .build();
        }

        alleTaken lijst = alleTaken.getTaak();

        // Zoek de gebruiker met de gegeven naam
        Gebruiker gevondenGebruiker = null;
        for (Gebruiker g : lijst.getGebruikers()) {
            if (g.getNaam().equals(gebruikerNaam)) {
                gevondenGebruiker = g;
                break;
            }
        }

        if (gevondenGebruiker == null) {
            return Response.status(404).entity("Gebruiker met naam " + gebruikerNaam + " niet gevonden").build();
        }

        // Controleer of de eigenschappen van gebruiker 'g' gelijk zijn aan 'gevondenGebruiker'
        for (Gebruiker g : lijst.getGebruikersBijTaak(gekozenTaak)) {
            if (g.getNaam().equals(gevondenGebruiker.getNaam()) &&
                    g.getGebruikersNaam().equals(gevondenGebruiker.getGebruikersNaam()) &&
                    g.getWachtwoord().equals(gevondenGebruiker.getWachtwoord()) &&
                    g.getEmail().equals(gevondenGebruiker.getEmail())) {
                return Response.status(409).entity("Gebruiker is al gekoppeld aan deze taak").build();
            }
        }
        lijst.gebruikerToevoegenBijTaak(gekozenTaak, gevondenGebruiker);
        return Response.ok("Gebruiker succesvol toegevoegd aan taak.").build();
    }
}