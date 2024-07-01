
function getTaken() {
    return fetch("restservices/taken")
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                body: data
            }));
        })
        .then(({ status, body }) => {
            if (status === 200) {
                console.log(body);
                return body;
            } else {
                console.error(body.error);
                return [];
            }
        })
        .catch(error => {
            console.error("Error fetching tasks:", error);
            return [];
        });
}

// Function to add a task
function addTaken(taak) {
    const url = "restservices/addTaak";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taak),
    };
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
}


// Function to update a task
function updateTaak(taak) {
    const url = `restservices/update/${taak.naam}`;
    const options = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taak),
    };
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.error("Error updating task:", error);
        });
}


// Function to delete a task
function deleteTaak(taak) {
    const url = `restservices/taken/${encodeURIComponent(taak.naam)}`;
    const options = {
        method: "DELETE",
    };
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                console.log("Taak verwijderd");
                return response.json(); // Verwacht een JSON-respons met de geüpdatete lijst van taken
            } else if (response.status === 404) {
                console.log("Taak niet gevonden");
                return Promise.reject({ error: "Taak niet gevonden" });
            } else {
                console.log("Er is iets anders gebeurd");
                return Promise.reject({ error: "Onbekende fout" });
            }
        })
        .catch(error => {
            console.error("Fout bij het verwijderen van de taak:", error);
            return Promise.reject(error);
        });
}




export const taakService = {
    getTaken,
    addTaken,
    deleteTaak
};
