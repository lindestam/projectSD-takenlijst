import{g as n}from"./gebruikerService-D02CixR6.js";function a(){let t=document.querySelector("#naamGebruiker").value,r=document.querySelector("#gebruikersnaam").value,e=document.querySelector("#wachtwoord").value,o=document.querySelector("#email").value;return{naam:t,gebruikersNaam:r,wachtwoord:e,email:o}}function u(t){t.preventDefault();let r=a();console.log("verzonden gebruiker: ",r),n.addGebruiker(r).then(e=>{console.log("Resultaat van toevoegen gebruiker:",e),e&&e.naam===r.naam&&e.gebruikersNaam===r.gebruikersNaam?window.location.href="/":console.error("User was not added successfully.")}).catch(e=>{console.error("Error adding gebruiker:",e)})}function i(t){t.preventDefault(),window.location.href="/"}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".submitGebruiker").addEventListener("click",u),document.querySelector(".resetGebruiker").addEventListener("click",i)});
//# sourceMappingURL=addGebruiker-kfIw1bda.js.map
