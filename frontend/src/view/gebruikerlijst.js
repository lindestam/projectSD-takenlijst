import { gebruikerService } from '../service/gebruikerService.js';

function gebruikers() {
    let naamgebruiker = document.querySelector("#naamGebruiker");
    let gebruikersnaam = document.querySelector("#gebruikersNaam");
    let wachtwoord = document.querySelector("#wachtwoord");
    let email = document.querySelector("#email");

    return {
        naamGebruiker: naamgebruiker,
        gebruikersNaam: gebruikersnaam,
        wachtwoord: wachtwoord,
        email: email
    }
}
function addGebruiker(event){
    event.preventDefault();
    let gebruiker = gebruikers();
    console.log("verzonden gebruiker: ", gebruiker);

    gebruikerService.addGebruiker(gebruiker)
        .then((result) => {
            console.log("Resultaat van toevoegen gebruiker:", result);
            window.location.href = "/";  // Redirect after successful user addition
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
    formElement.addEventListener("click", addGebruiker);

    let resetButton = document.querySelector(".resetGebruiker");
    resetButton.addEventListener("click", cancel);
})