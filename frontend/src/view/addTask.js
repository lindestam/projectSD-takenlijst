import { taakService } from '../service/taakService.js';
function formTask() {
    let date = document.querySelector("#date").value;
    let vervaldatum = document.querySelector("#vervalDatum").value;
    let naam = document.querySelector("#naam").value;
    let beschrijving = document.querySelector("#omschrijving").value;

    return {
        gemaaktOp: date,
        vervaldatum: vervaldatum,
        naamTaak: naam,
        omschrijving: beschrijving
    };
}

function add(event) {
    event.preventDefault();
    let task = formTask();
    console.log(task);

    taakService.addTaken(task)
        .then((result) => {
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("Error adding task:", error);
        });
}

function cancel(event) {
    event.preventDefault();
    window.location.href = "index.html";  // Redirect to main page
}

document.addEventListener("DOMContentLoaded", () => {
    let formElement = document.querySelector(".submit");
    formElement.addEventListener("click", add);

    let resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", cancel);
});