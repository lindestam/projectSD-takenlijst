package com.example.projectsdtakenlijst.taken.webservices;

import com.example.projectsdtakenlijst.taken.modules.Taak;
import com.example.projectsdtakenlijst.taken.modules.alleTaken;

import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("afgevinkteTaken")
public class deleteAfgevinkteTaak {
    @DELETE
    @Path("{naam}")
    public Response delAfgevinkt(@PathParam("naam")String naam) {
        alleTaken takenLijst = alleTaken.getTaak();
        System.out.println("Te verwijderen taaknaam: " + naam);

        Taak taakToRemove = null;
        for (Taak taak : takenLijst.getAfgevinkteTaken()) {
            if (taak.getNaam().equals(naam)) {
                taakToRemove = taak;
                break;
            }
        }
        System.out.println("verwijderde taak: " + taakToRemove);

        // Controleer of de taak gevonden is
        if (taakToRemove != null) {
            takenLijst.removeAfgevinkteTaak(taakToRemove);
            return Response.ok().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
