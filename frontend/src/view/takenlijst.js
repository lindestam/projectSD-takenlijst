import taakService from "../service/taakService.js"

function showDialog() {
}
function renderAllTasks(taak) {
    let temp = document.querySelector("#taak-template");
    let clon = temp.content.cloneNode(true);

    let articleElement = clon.querySelector("#taakTitle");
    articleElement.addEventListener('click', showDialog);

    let h2Element = clon.querySelector("h2");
    h2Element.textContent = taak.naamTaak;

    let vervaltimeElement = clon.querySelector("time.vervaltijd");
    vervaltimeElement.setAttribute("datetime", taak.vervalDatum);

    let timeElement = clon.querySelector("time");
    timeElement.setAttribute("datetime", taak.gemaaktOp);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let date = new Date(taak.gemaaktOp);
    if (!isNaN(date)) {
        timeElement.textContent = new Intl.DateTimeFormat(undefined, options).format(date);
    } else {
        console.error("Invalid date:", taak.gemaaktOp);
        timeElement.textContent = "Invalid date";
    }

    let descriptionElement = clon.querySelector(".description");
    descriptionElement.textContent = taak.omschrijving;

    return clon;
}

// Function to load all tasks
function render() {
    let tasksElement = document.querySelector(".to-do-container");
    taakService.getTaken()
        .then(taken => {
            tasksElement.innerHTML = "";
            taken.forEach(taak => {
                tasksElement.appendChild(renderAllTasks(taak));
            });
        })
        .catch(error => {
            console.error("Error getting all tasks:", error);
        });
}

document.addEventListener('DOMContentLoaded', render);
render();