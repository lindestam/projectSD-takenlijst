package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("update")
public class updateTaakResource {

    @PUT
    @Path("{naamTaak}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response putTaak(@PathParam("naamTaak") String naamTaak, Taak nieuweTaak) {
        // Haal de lijst met taken op
        alleTaken takenLijst = alleTaken.getTaak();

        if (takenLijst == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "No task list available"))
                    .build();
        }

        // Zoek de oude taak in de lijst
        List<Taak> taken = takenLijst.getTaken();
        Taak oudeTaak = null;

        for (Taak taak : taken) {
            if (taak.getNaam().equals(naamTaak)) {
                oudeTaak = taak;
                break;
            }
        }
        if (oudeTaak == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "Task not found"))
                    .build();
        }
        // Maak een nieuwe taak aan met de gegeven naam en de eigenschappen van de oude taak
        Taak nieuweTaakMetNaam = new Taak(naamTaak, nieuweTaak.getOmschrijving(), nieuweTaak.getGemaaktTijd(), nieuweTaak.getVervalTijd(), nieuweTaak.getType());

        // Update de gegevens van de oude taak met de nieuwe taak
        boolean success = takenLijst.updateTaak(naamTaak, nieuweTaakMetNaam);

        if (!success) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(Map.of("error", "Task not found"))
                    .build();
        }

        // Retourneer de bijgewerkte taak
        return Response.ok(nieuweTaakMetNaam).build();
    }
}
