package com.example.projectsdtakenlijst.taken.modules;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TakenLijst {
    public List<Taak> taken;
    public List<Taak> afgevinkteTaken;
    public TakenLijst() {
        taken = new ArrayList<>();
        afgevinkteTaken = new ArrayList<>();
    }
    public void addTaak(Taak t) {
        taken.add(t);
    }
    public void removeTaak(Taak t) {
        taken.remove(t);
    }
    public void updateTaak(Taak oudeTaak, Taak nieuweTaak) {
        int index = taken.indexOf(oudeTaak);
        if (index != -1) {
            taken.set(index, nieuweTaak);
        }
    }
    public List<Taak> getTaken() {
        return Collections.unmodifiableList(taken);
    }
    public List<Taak> getAfgevinkteTaken() {
        return Collections.unmodifiableList(afgevinkteTaken);
    }
}
