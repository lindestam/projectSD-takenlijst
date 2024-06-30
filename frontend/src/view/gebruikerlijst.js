import { gebruikerService } from '../service/gebruikerService.js';

function gebruikers() {
    let naamGebruiker = document.querySelector("#naamGebruiker").value;
    let gebruikersNaam = document.querySelector("#gebruikersnaam").value;
    let wachtwoord = document.querySelector("#wachtwoord").value;
    let email = document.querySelector("#email").value;

    return {
        naam: naamGebruiker,
        gebruikersNaam: gebruikersNaam,
        wachtwoord: wachtwoord,
        email: email
    };
}

function addGebruikers(event) {
    event.preventDefault();
    let gebruiker = gebruikers();
    console.log("verzonden gebruiker: ", gebruiker);
    if (!gebruiker.email.includes("@")) {
        console.error("Foute email: geen '@' aanwezig");
        return; // Stop de functie als de validatie niet slaagt
    }
    if (gebruiker.wachtwoord.length <= 10) {
        console.error("Wachtwoord moet groter dan 10 letters zijn");
        return; // Stop de functie als de validatie niet slaagt
    }

    gebruikerService.addGebruiker(gebruiker)
        .then((result) => {
            console.log("Resultaat van toevoegen gebruiker:", result);
            window.location.href = "/";
            console.error("User was added successfully.");
        })
        .catch((error) => {
            console.error("Error adding gebruiker:", error);
        });
}

function cancel(event) {
    event.preventDefault();
    window.location.href = "/";  // Redirect to main page
}

document.addEventListener("DOMContentLoaded", () => {
    let formElement = document.querySelector(".submitGebruiker");
    formElement.addEventListener("click", addGebruikers);

    let resetButton = document.querySelector(".resetGebruiker");
    resetButton.addEventListener("click", cancel);
});