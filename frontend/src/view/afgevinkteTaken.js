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
document.addEventListener("DOMContentLoaded", () => {
    let knopElerment = document.querySelector("#aanvinken");
    knopElerment.addEventListener("click", afgevinkt);
})