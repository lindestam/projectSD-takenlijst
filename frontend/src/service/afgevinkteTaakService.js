function getAfgevinkteTaken() {
    let url = "http://localhost:8080/restservices/completed"
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
function updateAfgevinkteTaak(completedTask) {
    let url = `http://localhost:8080/restservices/completed/${completedTask.naam}`;
    let options = {
        method: "PUT",
        body: JSON.stringify(completedTask),
        headers: {'Content-Type': 'application/json'}
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(error => {
            console.error("Error updating completed task:", error);
        });
}
export const afgvinkteTaakService = {
    getAfgevinkteTaken,
    updateAfgevinkteTaak
}