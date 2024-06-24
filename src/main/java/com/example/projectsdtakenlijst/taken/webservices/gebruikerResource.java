package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Gebruiker;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.AbstractMap;
import java.util.List;

@Path("gebruiker")
public class gebruikerResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGebruikers() {
        alleTaken taken = alleTaken.getTaak();
        List<Gebruiker> gebruikers = taken.getGebruikers();
        if (gebruikers == null) {
            var error = new AbstractMap.SimpleEntry<>("error", "no gebruikers found!");
            return Response.status(409).entity(error).build();
        } else {
            return Response.ok(gebruikers).build();
        }
    }
}
