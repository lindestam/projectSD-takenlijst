package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;


@Path("taken")  // Base URI
public class takenResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTaak() {
        alleTaken taak = alleTaken.getTaak();
        if (taak == null) {
            var error = new AbstractMap.SimpleEntry<>("error", "no tasks found!");
            return Response.status(409).entity(error).build();
        }
        List<Taak> taken = taak.getTaken();
        return Response.ok(taken).build();
    }
    @DELETE
    @Path("{naam}")
    public Response deleteTaak(@PathParam("naam") String naam) {
        alleTaken takenLijst = alleTaken.getTaak();
        System.out.println("Te verwijderen taaknaam: " + naam);

        Taak taakToRemove = null;
        for (Taak taak : takenLijst.getTaken()) {
            if (taak.getNaam().equals(naam)) {
                taakToRemove = taak;
                break;
            }
        }
        System.out.println("verwijderde taak: " + taakToRemove);

        // Controleer of de taak gevonden is
        if (taakToRemove != null) {
            takenLijst.removeTaak(taakToRemove);
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}