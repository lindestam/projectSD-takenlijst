package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.AbstractMap;
import java.util.List;

@Path("completed")
public class afgevinkteTakenResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAfgevinkteTaken() {
        alleTaken afgevinkteTaak = alleTaken.getTaak();
        List<Taak> afgevinkteTaken = afgevinkteTaak.getAfgevinkteTaken();
        return Response.ok(afgevinkteTaken).build();
    }
    @PUT
    @Path("{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response voegAfgevinkteTaak(@PathParam("name")String name) {
        alleTaken taak = alleTaken.getTaak();
        List<Taak> taken = taak.getTaken();

        for (Taak t : taken) {
            if (t.getNaam().equals(name)) {
                taken.remove(t);
                taak.voegAfgevinkteTaakToe(t);
                return Response.ok(t).build();
            }
        }
        var error = new AbstractMap.SimpleEntry<>("error", "task not found!");
        return Response.status(409).entity(error).build();
    }
}


