import { taakService } from '../service/taakService.js';

function showDialog() {
    // Placeholder for showDialog functionality if needed
}

function deleteTask(event) {
    const button = event.target; // Het element waarop is geklikt
    const taakName = button.getAttribute('data-task-name'); // Haal de taaknaam op van het data-attribuut

    taakService.deleteTaak(taakName)
        .then((result) => {
            console.log(result); // Optioneel: log resultaat van verwijderen
            // Als de taak succesvol is verwijderd, render de taken opnieuw
            render(); // Voeg hier je render functie toe, aangepast aan je implementatie
        })
        .catch((error) => {
            console.error('Fout bij het verwijderen van de taak:', error);
        });
}

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

                tasksElement.appendChild(clone);
            });
        })
        .catch(error => {
            console.error("Error rendering tasks:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll('.delBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    });
    render();
    // Taken renderen bij het laden van de pagina
});
