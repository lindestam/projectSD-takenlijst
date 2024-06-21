import { taakService } from '../service/taakService.js';

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

// Function to handle the delete task event
function deleteTask(event) {
    const button = event.target;
    const taakName = button.parentElement.querySelector('.name').textContent;

    taakService.deleteTaak(taakName)
        .then((result) => {
            console.log(result);
            render();
        })
        .catch((error) => {
            console.error('Fout bij het verwijderen van de taak:', error);
        });
}

// Function to render the tasks
function render() {
    let tasksElement = document.querySelector(".to-do-container");
    let taskTemplate = document.getElementById("taskTemplate");

    if (!tasksElement || !taskTemplate) {
        console.error("Element with class 'to-do-container' or template not found in the DOM.");
        return;
    }

    tasksElement.innerHTML = ""; // Clear existing content

    taakService.getTaken()
        .then(taken => {
            taken.forEach(taak => {
                let clone = taskTemplate.content.cloneNode(true);

                let gemaaktOpElement = clone.querySelector(".gemaaktOp");
                gemaaktOpElement.setAttribute("datetime", taak.gemaaktOp || '');
                gemaaktOpElement.textContent = taak.gemaaktOp
                    ? new Date(taak.gemaaktOp).toLocaleDateString('nl-NL')
                    : 'Geen datum';

                let vervaltimeElement = clone.querySelector(".vervaltijd");
                vervaltimeElement.setAttribute("datetime", taak.vervalDatum || '');
                vervaltimeElement.textContent = taak.vervalDatum
                    ? new Date(taak.vervalDatum).toLocaleDateString('nl-NL')
                    : 'Geen vervaldatum';

                let nameElement = clone.querySelector(".name");
                nameElement.textContent = taak.naam || 'Geen titel';

                let descriptionElement = clone.querySelector(".description");
                descriptionElement.textContent = taak.omschrijving || 'Geen omschrijving';

                let typeElement = clone.querySelector(".type");
                typeElement.textContent = taak.type || 'Geen type';

                let deleteButton = clone.querySelector('.delBtn');
                deleteButton.addEventListener('click', deleteTask);

                tasksElement.appendChild(clone);
            });
        })
        .catch(error => {
            console.error("Error rendering tasks:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    render();
});