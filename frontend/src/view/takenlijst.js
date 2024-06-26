import { taakService } from '../service/taakService.js';
import {gebruikerService} from "../service/gebruikerService.js";

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

// Function to handle the delete task event
function deleteTask(event) {
    const button = event.target;
    const taakElement = button.closest('.taak'); // Find the closest parent element with class 'taak'
    const taakName = taakElement.querySelector('.name').textContent;

    taakService.deleteTaak({ naam: taakName })
        .then((result) => {
            console.log(result); // optioneel: log het resultaat van de verwijdering
            render(); // Roep de render functie aan om de taken opnieuw te renderen
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

                let gebruikerTaakElement = clone.querySelector("#taak-list");
                if (!gebruikerTaakElement) {
                    console.error("Element with ID 'taak-list' not found in the template for taak:", taak.naam);
                } else {
                    // Fetch and render gebruikers for this task
                    gebruikerService.getTaakGebruikers(taak.naam).then(gebruikers => {
                        gebruikers.forEach(gebruiker => {
                            let li = document.createElement("option");
                            li.textContent = gebruiker.naam; // Assuming gebruiker object has 'naam' property
                            gebruikerTaakElement.appendChild(li);
                        });
                    });
                }
                tasksElement.appendChild(clone);
            });
        })
        .catch(error => {
            console.error("Error rendering tasks:", error);
        });
}
document.addEventListener("DOMContentLoaded", () => {
    render([]);

});