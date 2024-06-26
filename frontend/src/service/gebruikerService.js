function getGebruiker() {
   return fetch("http://localhost:8080/restservices/gebruiker")
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
           console.error("Error fetching gebruikers:", error);
           return [];
       });
}

function addGebruiker(gebruiker) {
    let url = "http://localhost:8080/restservices/addgebruiker";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(gebruiker),
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("error adding gebruikers", error);
        });
}
function getTaakGebruikers(taakNaam) {
    let url = `http://localhost:8080/restservices/taken/${taakNaam}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error("Error fetching gebruikers:", error);
            return [];
        });
}
function gebruikerBijTaakToevoegen(taakNaam) {
    let url = "http://localhost:8080/restservices/taken/gebruikers/${taakNaam}"
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taakNaam),
    };
    return fetch(url,options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("error adding gebruikers", error);
        });
}
export const gebruikerService = {
    getGebruiker,
    addGebruiker,
    getTaakGebruikers,
    gebruikerBijTaakToevoegen

}