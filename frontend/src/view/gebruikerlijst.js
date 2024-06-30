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

    // Haal gebruikersgegevens op
    let gebruiker = gebruikers();
    console.log("Verzonden gebruiker: ", gebruiker);

    // Voeg gebruiker toe via gebruikerService
    gebruikerService.addGebruiker(gebruiker)
        .then((result) => {
            console.log("Resultaat van toevoegen gebruiker:", result);
            window.location.href = "/"; // Navigeer naar hoofdpagina bij succes
            console.log("Gebruiker succesvol toegevoegd.");
        })
        .catch((error) => {
            console.error("Fout bij toevoegen gebruiker:", error);
        });
}

function cancel(event) {
    event.preventDefault();
    window.location.href = "/";  // Navigeer naar hoofdpagina bij annulering
}

document.addEventListener("DOMContentLoaded", () => {
    let formElement = document.querySelector(".submitGebruiker");
    formElement.addEventListener("click", addGebruikers);

    let resetButton = document.querySelector(".resetGebruiker");
    resetButton.addEventListener("click", cancel);
});
