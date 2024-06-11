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
    console.log("Verzonden taak:", task);

    addTaken(task)
        .then((result) => {
            console.log("Resultaat van toevoegen taak:", result);
            window.location.href = "/";
        })
        .catch((error) => {
            console.error("Error adding task:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    let formElement = document.querySelector(".submit");
    formElement.addEventListener("submit", add);
});
