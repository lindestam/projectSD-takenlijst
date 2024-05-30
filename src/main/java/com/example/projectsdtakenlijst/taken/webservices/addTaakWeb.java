package com.example.projectsdtakenlijst.taken.webservices;

import com.sun.research.ws.wadl.Response;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.StringReader;

@Path("addTaak")
public class addTaakWeb {
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTaken(String requestBody) {
        JsonReader jsonReader = Json.createReader(new StringReader(requestBody));
        JsonObject jsonObject = jsonReader.readObject();
    }
}
