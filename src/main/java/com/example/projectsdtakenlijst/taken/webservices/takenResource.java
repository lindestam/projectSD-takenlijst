package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.AbstractMap;
import java.util.List;


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
}
