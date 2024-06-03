
function getAllTasks(taak) {
    let temp = document.querySelector("#taak-template");
    let clon = temp.content.cloneNode(true);

    let articleElement = clon.querySelector("#taakTitle");
    articleElement.addEventListener('click', showDialog);

    let h2Element = clon.querySelector("h2");
    h2Element.textContent = taak.naamTaak;

    let vervaltimeElement = clon.querySelector("time.vervaltijd");
    vervaltimeElement.setAttribute("datetime", taak.vervalDatum);

    let timeElement = clon.querySelector("time");
    timeElement.setAttribute("datetime", taak.gemaaktOp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    timeElement.textContent = new Intl.DateTimeFormat(undefined, options).format(new Date(taak.gemaaktOp));
    let descriptionElement = clon.querySelector(".description");
    descriptionElement.textContent = taak.omschrijving;
    return clon;
}

// Function to load all tasks
function getAll() {
    let tasksElement = document.querySelector(".to-do-container");
    getTaken()
        .then(taken => {
            tasksElement.innerHTML = "";
            taken.forEach(taak => {
                tasksElement.appendChild(getAllTasks(taak));
            });
        })
        .catch(error => {
            console.error("Error getting all tasks:", error);
        });
}

// Event listener for form submission to add a task
// Function to show the dialog (stub function for now)
// Initial load of tasks
document.addEventListener('DOMContentLoaded', getAll);