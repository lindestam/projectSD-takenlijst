/**
* @param { Taak } taak
* @returns { Promise<array<Taak>> }
 */
getTaken(taak){
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