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

    gebruikerService.addGebruiker(gebruiker)
        .then((result) => {
            console.log("Resultaat van toevoegen gebruiker:", result);
            if (result && result.naam === gebruiker.naam && result.gebruikersNaam === gebruiker.gebruikersNaam) {
                window.location.href = "/";  // Redirect to main page after successful user addition
            } else {
                console.error("User was not added successfully.");
            }  // Redirect to main page after successful user addition
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