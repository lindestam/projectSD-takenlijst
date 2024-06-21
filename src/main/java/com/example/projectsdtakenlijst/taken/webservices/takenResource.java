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
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTaak(@PathParam("naam") String naam) {
        alleTaken takenLijst = alleTaken.getTaak();
        System.out.println("Te verwijderen taaknaam: " + naam);

        try {
            Taak taakToRemove = null;
            for (Taak taak : takenLijst.getTaken()) {
                if (taak.getNaam().equals(naam)) {
                    taakToRemove = taak;
                    break;
                }
            }
            System.out.println("verwijderde taak: " + taakToRemove);

            if (taakToRemove != null) {
                takenLijst.removeTaak(taakToRemove);
                List<Taak> updatedTaken = takenLijst.getTaken();
                return Response.ok(updatedTaken).build(); // Retourneer de geüpdatete lijst van taken
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(new AbstractMap.SimpleEntry<>("error", "Taak niet gevonden"))
                        .build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new AbstractMap.SimpleEntry<>("error", "Interne serverfout"))
                    .build();
        }
    }
}
