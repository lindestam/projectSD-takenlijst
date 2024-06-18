import { taakService } from '../service/taakService.js';

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

function renderAllTasks(taak) {
    let temp = document.getElementById("taskTemplate");

    if (!temp) {
        console.error("Template element not found.");
    }

    let clon = temp.content.cloneNode(true);

    let articleElement = clon.querySelector(".taak");
    articleElement.addEventListener('click', showDialog);

    let h2Element = clon.querySelector(".name");
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

function render() {
    let tasksElement = document.querySelector(".right-section");

    if (!tasksElement) {
        console.error("Element with class 'right-section' not found in the DOM.");
        return;
    }

    taakService.getTaken()
        .then(taken => {
            tasksElement.innerHTML = ""; // Clear existing content
            taken.forEach(taak => {
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
