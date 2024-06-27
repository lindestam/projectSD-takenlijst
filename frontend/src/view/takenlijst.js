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
                const addUserButton = clone.querySelector('.voegToeGebruiker');
                addUserButton.addEventListener("click", gebruikerInput);

                tasksElement.appendChild(clone);
            });
        })
        .catch(error => {
            console.error("Error rendering tasks:", error);
        });
}
function addUserToTask(taakElement, gebruikerNaam) {
    const taakName = taakElement.querySelector('.name').textContent;

    gebruikerService.gebruikerBijTaakToevoegen(taakName, gebruikerNaam)
        .then(gebruikersBijTaak => {
            const gebruikerTaakElement = taakElement.querySelector("#taak-list");
            const newUserOption = document.createElement("option");
            newUserOption.textContent = gebruikerNaam;
            gebruikerTaakElement.appendChild(newUserOption);

            const inputField = taakElement.querySelector('.gebruikerNaamInput');
            inputField.style.display = "none";
            inputField.value = "";
            taakElement.querySelector('.voegToeGebruiker').textContent = "+";
        })
        .catch(error => {
            console.error("Error adding gebruiker to task:", error);
        });
}
function gebruikerInput(event) {
    const button = event.target;
    const taakElement = button.closest('.taak');
    const inputField = taakElement.querySelector('.gebruikerNaamInput');

    if (inputField.style.display === "none") {
        inputField.style.display = "block";
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const gebruikerNaam = inputField.value.trim();
                gebruikerBijTaakToevoegenHandler(gebruikerNaam, taakElement.querySelector('.name').textContent)
                    .then(({ gebruikerBestaat, gebruikerAlGekoppeld }) => {
                        if (gebruikerBestaat && !gebruikerAlGekoppeld) {
                            addUserToTask(taakElement, gebruikerNaam);
                        }
                    })
                    .catch(error => {
                        console.error("Fout bij het toevoegen van gebruiker aan taak:", error);
                    });
            }
        });

        button.addEventListener('click', function() {
            const gebruikerNaam = inputField.value.trim(); // Trimmen om spaties te verwijderen
            if (gebruikerNaam === "") {
                console.log("Gebruiker naam is leeg");
                return;
            }

            gebruikerBijTaakToevoegenHandler(gebruikerNaam, taakElement.querySelector('.name').textContent)
                .then(({ gebruikerBestaat, gebruikerAlGekoppeld }) => {
                    if (gebruikerBestaat && !gebruikerAlGekoppeld) {
                        addUserToTask(taakElement, gebruikerNaam);
                    }
                })
                .catch(error => {
                    console.error("Fout bij het toevoegen van gebruiker aan taak:", error);
                });
        });
    } else {
        inputField.style.display = "none";
        button.textContent = "+";
    }
}

function gebruikerBijTaakToevoegenHandler(gebruikerNaam, taakNaam) {
    let gebruikerBestaat = false;
    let gebruikerAlGekoppeld = false;

    return gebruikerService.getGebruiker()
        .then(gebruikers => {
            for (let i = 0; i < gebruikers.length; i++) {
                if (gebruikers[i].naam === gebruikerNaam) {
                    gebruikerBestaat = true;
                    break;
                }
            }
            if (!gebruikerBestaat) {
                console.log("Gebruiker bestaat niet");
            }

            // Als gebruiker niet bestaat, hoeven we niet verder te gaan met de tweede check
            if (!gebruikerBestaat) {
                return {
                    gebruikerBestaat: false,
                    gebruikerAlGekoppeld: false
                };
            }

            // Als gebruiker wel bestaat, check of gebruiker al gekoppeld is aan de taak
            return gebruikerService.getTaakGebruikers(taakNaam);
        })
        .then(gebruikersTaak => {
            if (gebruikerBestaat) {
                for (let i = 0; i < gebruikersTaak.length; i++) {
                    if (gebruikersTaak[i].naam === gebruikerNaam) {
                        gebruikerAlGekoppeld = true;
                        break;
                    }
                }
                if (gebruikerAlGekoppeld) {
                    console.log("Gebruiker is al gekoppeld aan deze taak");
                }
            }
            return {
                gebruikerBestaat: gebruikerBestaat,
                gebruikerAlGekoppeld: gebruikerAlGekoppeld
            };
        })
        .catch(error => {
            console.error("Error bij het controleren van gebruiker en koppeling:", error);
            // Je kunt er hier voor kiezen om de fout door te geven aan de bovenliggende code om af te handelen
            throw error;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    render([]);
});
