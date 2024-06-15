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

    @GET
    @Path("{afgevinkt}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAfgevinkteTaken(@PathParam("afgevinkt")alleTaken taak) {
        alleTaken afgevinkteTaak = alleTaken.getTaak();
        List<Taak> afgevinkteTaken = afgevinkteTaak.getAfgevinkteTaken();
        return Response.ok(afgevinkteTaken).build();
    }
    @PUT
    @Path("afgevinkt/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response voegAfgevinkteTaakToe(@PathParam("name")String name) {
        alleTaken taak = alleTaken.getTaak();
        List<Taak> taken = taak.getTaken();
        List<Taak> afgevinkteTaken = taak.getAfgevinkteTaken();

        for (Taak t : taken) {
            if (t.getNaam().equals(name)) {
                taken.remove(t);
                afgevinkteTaken.add(t);
                return Response.ok(t).build();
            }
        }
        var error = new AbstractMap.SimpleEntry<>("error", "task not found!");
        return Response.status(409).entity(error).build();
    }
}
