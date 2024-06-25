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

        String gebruiker = jsonObject.getString("gebruiker");
        String gebruikersnaam = jsonObject.getString("gebruikersNaam");
        String wachtwoord = jsonObject.getString("wachtwoord");
        String email = jsonObject.getString("email");

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


        Gebruiker nieuweGebruiker = new Gebruiker(gebruiker, gebruikersnaam, wachtwoord, email); // Je moet hier de juiste parameters invullen
        alleTaken lijst = alleTaken.getTaak();
        boolean gebruikerBestaat = false;
        for (Gebruiker g : lijst.getGebruikers()) {
            if (g.getNaam().equals(nieuweGebruiker.getNaam()) && g.getGebruikersNaam().equals(nieuweGebruiker.getGebruikersNaam())
                    && g.getWachtwoord().equals(nieuweGebruiker.getWachtwoord()) && g.getEmail().equals(nieuweGebruiker.getEmail())) {
                gebruikerBestaat = true;
                break;
            }
        }

        if (!gebruikerBestaat) {
            var error = "gebruiker bestaat niet";
            return Response.status(409).entity(error).build();
        }



        boolean gebruikerAlBijTaak = false;
        List<Gebruiker> gebruikersBijTaak = lijst.getGebruikersBijTaak(gekozenTaak);
        for (Gebruiker g : gebruikersBijTaak) {
            if (g.getNaam().equals(nieuweGebruiker.getNaam()) && g.getGebruikersNaam().equals(nieuweGebruiker.getGebruikersNaam())
                    && g.getWachtwoord().equals(nieuweGebruiker.getWachtwoord()) && g.getEmail().equals(nieuweGebruiker.getEmail())) {
                gebruikerAlBijTaak = true;
                break;
            }
        }

        if (gebruikerAlBijTaak) {
            var error = "gebruiker is al gekoppeld aan deze taak";
            return Response.status(409).entity(error).build();
        } else {
            lijst.gebruikerToevoegenBijTaak(gekozenTaak, nieuweGebruiker);
            gebruikersBijTaak = lijst.getGebruikersBijTaak(gekozenTaak);
            return Response.ok(gebruikersBijTaak).build();
        }
    }
}
