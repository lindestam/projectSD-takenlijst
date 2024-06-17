import { taakService } from '../service/taakService.js';
function showDialog() {

}
function renderAllTasks(taak) {
    let temp = document.querySelector("#taak-template");
    let clon = temp.content.cloneNode(true);

    let articleElement = clon.querySelector("#taakTitle");
    articleElement.addEventListener('click', showDialog);

    let h2Element = clon.querySelector("h2");
    h2Element.textContent = taak.naamTaak || 'No Title';

    let vervaltimeElement = clon.querySelector("time.vervaltijd");
    vervaltimeElement.setAttribute("datetime", taak.vervalDatum || '');

    let timeElement = clon.querySelector("time");
    timeElement.setAttribute("datetime", taak.gemaaktOp || '');
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    timeElement.textContent = taak.gemaaktOp
        ? new Intl.DateTimeFormat(undefined, options).format(new Date(taak.gemaaktOp))
        : 'No Date';

    let descriptionElement = clon.querySelector(".description");
    descriptionElement.textContent = taak.omschrijving || 'No Description';

    return clon;
}

// Function to load all tasks
function render() {
    let tasksElement = document.querySelector(".to-do-container");
    taakService.getTaken()
        .then(taken => {
            tasksElement.innerHTML = "";
            taken.forEach(taak => {
                // Check if 'taak' is not null before rendering
                if (taak) {
                    tasksElement.appendChild(renderAllTasks(taak));
                } else {
                    console.warn('Encountered a null task object');
                }
            });
        })
        .catch(error => {
            console.error("Error getting all tasks:", error);
        });
}

document.addEventListener('DOMContentLoaded', render);
render();