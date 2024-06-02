
function getTaken() {
    let status = undefined;
    fetch("restservices/taken")
        .then(response => {
            status = response.status;
            return response.json();
        })
        .then(myJson => {
            if (status === 200) {
                console.log(myJson);
            } else {
                console.log(myJson.error);
            }
        })
}

function addTaken(taak) {
    const url = "http://localhost:8080/restservices/addTaak"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taak),
    }
    const req = fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
    return req;
}
function updateTaak() {
    const url = "http://localhost:8080/restservices/update"
    let options = {
        method: "PUT",
        body: JSON.stringify(jsonRequestBody),
        headers: {'content-type' : 'application/json'}
    }
    fetch(url, options)
        .then(response => response.json())
        .then(function(myJson){
            console.log(myJson)
        });
}
function deleteTaak() {
    const url = "http://localhost:8080/restservices/delete"+formData.get("naam")
    let options = {
            method: "DELETE"
    }
    fetch(url, options)
        .then(function (response){
            if (response.ok) console.log("task deleted")
            else if (response.status == 404) console.log("task not found")
            else console.log("Something else happened" )
        })
}