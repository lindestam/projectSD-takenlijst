
function getTaken() {
    return fetch("http://localhost:8080/restservices/taken")
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
    const url = "http://localhost:8080/restservices/addTaak";
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
    const url = `http://localhost:8080/restservices/update/${taak.naamTaak}`;
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
function deleteTaak(naam) {
    const url = `http://localhost:8080/restservices/delete/${naam}`;
    const options = {
        method: "DELETE",
    };
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                console.log("Task deleted");
            } else if (response.status === 404) {
                console.log("Task not found");
            } else {
                console.log("Something else happened");
            }
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
}
function getAfgevinkteTaken() {
    let url = "http://localhost:8080/restservices/taken/afgevinkt"
    return fetch(url)
        .then (response => {
            return response.json()
            .then(data => ({
                status: response.status,
                body: data
            }))
        })
        .then(({status, body}) => {
            if(status === 200) {
                console.log(body);
                return body;
            } else {
                console.log(body.error);
            }
        })
        .catch(error => {
            console.log(error);
        })
}
export const taakService = {
    getTaken,
    addTaken,
    deleteTaak,
    getAfgevinkteTaken
};
