package com.example.projectsdtakenlijst.taken.webservices;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("addgebruiker")
public class addGebruikerResource {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addGebruikers(String requestBody) {

    }
}
