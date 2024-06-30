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
                if (response.status === 404) {
                    console.error("Foute email: geen '@' aanwezig");
                } else if (response.status === 403) {
                    console.error("Wachtwoord moet groter dan 10 tekens zijn");
                } else if (response.status === 409) {
                    console.error("Gebruiker met dezelfde naam bestaat al!");
                } else if (response.status === 400) {
                    console.error("Vereiste velden kunnen niet leeg zijn");
                }
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
function gebruikerBijTaakToevoegen(taakNaam, gebruikerNaam) {
    const url = `http://localhost:8080/restservices/taken/gebruikers/${taakNaam}`;
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ naam: gebruikerNaam }),
    };
    console.log("Request URL:", url);
    console.log("Request body:", options.body);

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                if (response.status === 400 ) {
                    throw new Error('Bad Request: Request body must contain gebruiker field or gebruiker field must be non-empty.');
                }
                if (response.status === 404) {
                    throw new Error('Not Found: Taak of gebruiker niet gevonden.')
                }
                if (response.status === 409) {
                    throw new Error('Conflict: Gebruiker is al gekoppeld aan deze taak.');
                }
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error adding gebruikers:", error);
        });
}
export const gebruikerService = {
    getGebruiker,
    addGebruiker,
    getTaakGebruikers,
    gebruikerBijTaakToevoegen

}