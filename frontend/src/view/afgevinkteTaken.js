import { taakService } from '../service/taakService.js';
function afgevinkt() {
    let templateAfgevinkt = document.querySelector("#completedTask")
    let divAfgevinkt = document.querySelector(".completed-container")
    if(!templateAfgevinkt || !divAfgevinkt){
        console.log("template bestaat niet");
    }

    taakService.getAfgevinkteTaken()
        .then(afgevinkteTaken => {
            divAfgevinkt.innerHTML = ""

            afgevinkteTaken.forEach(afgevinkteTaak => {
                let clon = templateAfgevinkt.content.cloneNode(true);

                let gemaakOpElement = clon.querySelector(".gemaaktOp");
                gemaakOpElement.setAttribute("datetime", afgevinkteTaak.gemaaktOp)
                gemaakOpElement.textContent = afgevinkteTaak.gemaaktOp
                    ? new Date(afgevinkteTaak.gemaaktOp).toLocaleDateString('nl-NL')
                    : 'Geen datum';

                let vervalDateElement = clon.querySelector(".vervaltijd");
                vervalDateElement.setAttribute("datetime", afgevinkteTaak.vervalDatum);
                vervalDateElement.textContent = afgevinkteTaak.vervalDatum
                    ? new Date(afgevinkteTaak.vervalDatum).toLocaleDateString('nl-NL')
                    : 'Geen datum';

                let naamElement = clon.querySelector(".name");
                naamElement.textContent = afgevinkteTaak.naam || "geen titel";

                let omschrijvingElement = clon.querySelector(".description");
                omschrijvingElement.textContent = afgevinkteTaak.omschrijving || "geen om schrijving";

                let typeElement = clon.querySelector(".type");
                typeElement.textContent = afgevinkteTaak.type || "geen type";

                divAfgevinkt.appendChild(clon);
            })
        })
}
function addAfgevinkteTaken() {
    let checkboxes = document.querySelector("#aanvinken");
    taakService.updateAfgevinkteTaak().then(r => {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("click", event => {
                if (event.target.checked) {
                    const taskElement = event.target.closest(".afgevinkt");
                    if (taskElement) {
                        let completedTask = {
                            gemaaktOp: taskElement.querySelector(".gemaaktOp").getAttribute("datetime"),
                            vervalDatum: taskElement.querySelector(".vervaltijd").getAttribute("datetime"),
                            naam: taskElement.querySelector(".name").textContent,
                            omschrijving: taskElement.querySelector(".description").textContent,
                            type: taskElement.querySelector(".type").textContent
                        };

                        let templateAfgevinkt = document.querySelector("#completedTask");
                        let divAfgevinkt = document.querySelector(".completed-container");

                        let clon = templateAfgevinkt.content.cloneNode(true);

                        let gemaakOpElement = clon.querySelector(".gemaaktOp");
                        gemaakOpElement.setAttribute("datetime", completedTask.gemaaktOp);
                        gemaakOpElement.textContent = completedTask.gemaaktOp
                            ? new Date(completedTask.gemaaktOp).toLocaleDateString('nl-NL')
                            : 'Geen datum';

                        let vervalDateElement = clon.querySelector(".vervaltijd");
                        vervalDateElement.setAttribute("datetime", completedTask.vervalDatum);
                        vervalDateElement.textContent = completedTask.vervalDatum
                            ? new Date(completedTask.vervalDatum).toLocaleDateString('nl-NL')
                            : 'Geen datum';

                        let naamElement = clon.querySelector(".name");
                        naamElement.textContent = completedTask.naam || "geen titel";

                        let omschrijvingElement = clon.querySelector(".description");
                        omschrijvingElement.textContent = completedTask.omschrijving || "geen omschrijving";

                        let typeElement = clon.querySelector(".type");
                        typeElement.textContent = completedTask.type || "geen type";

                        divAfgevinkt.appendChild(clon);

                        taskElement.remove();
                    }
                }
            });
        });

    })

}
document.addEventListener("DOMContentLoaded", () => {
    afgevinkt()
    addAfgevinkteTaken()
})