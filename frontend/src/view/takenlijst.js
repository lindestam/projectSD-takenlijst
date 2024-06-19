import { taakService } from '../service/taakService.js';

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

function deleteTask() {
    let buttonElement = document.querySelector('.delBtn')
        buttonElement.forEach(button => {
        button.addEventListener('click', function() {
            const taakName = this.closest('.taak').querySelector('.name').textContent;
            taakService.deleteTaak(taakName)
                .then((result) => {
                    render();
                })
                .catch((error) => {
                    console.error('Fout bij het verwijderen van de taak:', error);
                });
        });
    });
}

function render() {
    let tasksElement = document.querySelector(".to-do-container");
    let taskTemplate = document.getElementById("taskTemplate");

    if (!tasksElement || !taskTemplate) {
        console.error("Element with class 'to-do-container' or template not found in the DOM.");
        return;
    }

    taakService.getTaken()
        .then(taken => {
            tasksElement.innerHTML = ""; // Clear existing content

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
                console.log("Task name:", taak.naam); // Log de naam van de taak om te controleren of deze aanwezig is
                nameElement.textContent = taak.naam || 'Geen titel';

                let descriptionElement = clone.querySelector(".description");
                descriptionElement.textContent = taak.omschrijving || 'Geen omschrijving';

                let typeElement = clone.querySelector(".type");
                typeElement.textContent = taak.type || 'Geen type';

                tasksElement.appendChild(clone);
            });
        })
        .catch(error => {
            console.error("Error rendering tasks:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector("#takenZien");
    button.addEventListener("click", render);

});