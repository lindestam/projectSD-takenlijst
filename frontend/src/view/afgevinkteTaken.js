import { afgvinkteTaakService } from '../service/afgevinkteTaakService.js';
function afgevinkt() {
    let templateAfgevinkt = document.querySelector("#completedTask")
    let divAfgevinkt = document.querySelector(".completed-container")
    if(!templateAfgevinkt || !divAfgevinkt){
        console.log("template bestaat niet");
    }

    afgvinkteTaakService.getAfgevinkteTaken()
        .then(afgevinkteTaken => {
            divAfgevinkt.innerHTML = ""

            afgevinkteTaken.forEach(afgevinkteTaak => {
                let clon = templateAfgevinkt.content.cloneNode(true);

                let gemaakOpElement = clon.querySelector(".gemaaktOp");
                gemaakOpElement.setAttribute("datetime", afgevinkteTaak.gemaaktOp)
                gemaakOpElement.textContent = afgevinkteTaak.gemaaktOp
                    ? new Date(afgevinkteTaak.gemaaktOp).toLocaleDateString('nl-NL')
                    : 'Geen datum';

                let naamElement = clon.querySelector(".name");
                naamElement.textContent = afgevinkteTaak.naam || "geen titel";

                let omschrijvingElement = clon.querySelector(".description");
                omschrijvingElement.textContent = afgevinkteTaak.omschrijving || "geen om schrijving";

                let typeElement = clon.querySelector(".type");
                typeElement.textContent = afgevinkteTaak.type || "geen type";

                divAfgevinkt.appendChild(clon);
            })
            addAfgevinkteTaken()
        })
}
function moveTaskToCompleted(taskElement) {
    let completedTask = {
        gemaaktOp: taskElement.querySelector(".gemaaktOp").getAttribute("datetime"),
        naam: taskElement.querySelector(".name").textContent,
        omschrijving: taskElement.querySelector(".description").textContent,
        type: taskElement.querySelector(".type").textContent
    };

    afgvinkteTaakService.updateAfgevinkteTaak(completedTask)
        .then(() => {
            let clon = document.querySelector("#completedTask").content.cloneNode(true);

            clon.querySelector(".gemaaktOp").textContent = new Date(completedTask.gemaaktOp).toLocaleDateString('nl-NL');
            clon.querySelector(".name").textContent = completedTask.naam;
            clon.querySelector(".description").textContent = completedTask.omschrijving;
            clon.querySelector(".type").textContent = completedTask.type;

            document.querySelector(".completed-container").appendChild(clon);
            taskElement.remove();
        })
        .catch(error => console.error("Error updating completed task: ", error));
}

function addAfgevinkteTaken() {
    document.querySelectorAll('input[name="completed"]').forEach(checkbox => {
        checkbox.addEventListener("change", event => {
            if (event.target.checked) {
                const taskElement = event.target.closest(".taak");
                moveTaskToCompleted(taskElement);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    afgevinkt()
    addAfgevinkteTaken()
})
