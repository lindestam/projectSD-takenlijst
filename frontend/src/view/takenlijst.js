import { taakService } from '../service/taakService.js';

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

function renderAllTasks(taak) {
    let temp = document.querySelector("#taskTemplate");
    let div = document.querySelector(".to-do-container");

    if (!temp) {
        console.error("Template element not found!!.");
        return;
    }

    let clon = temp.content.cloneNode(true);

    let articleElement = clon.querySelector(".taak");
    articleElement.addEventListener('click', showDialog);

    let h2Element = clon.querySelector(".name");
    h2Element.textContent = taak.naamTaak || 'No Title';

    let vervaltimeElement = clon.querySelector("time.vervaltijd");
    vervaltimeElement.setAttribute("datetime", taak.vervalDatum || '');
    vervaltimeElement.textContent = taak.vervalDatum || 'No Expiry Date';

    let timeElement = clon.querySelector("time:not(.vervaltijd)");
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

    div.appendChild(clon);
}

function render() {
    let tasksElement = document.querySelector(".to-do-container");

    if (!tasksElement) {
        console.error("Element with class 'to-do-container' not found in the DOM.");
        return;
    }

    taakService.getTaken()
        .then(taken => {
            tasksElement.innerHTML = ""; // Clear existing content
            taken.forEach(taak => {
                if (taak) {
                    renderAllTasks(taak);
                } else {
                    console.warn('Encountered a null task object');
                }
            });
        })
        .catch(error => {
            console.error("Error getting all tasks:", error);
        });
}

function showContent() {
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial rendering or any other setup can go here
});
