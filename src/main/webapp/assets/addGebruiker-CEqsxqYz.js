import{g as n}from"./gebruikerService-BsI3pxdp.js";function u(){let e=document.querySelector("#naamGebruiker").value,r=document.querySelector("#gebruikersnaam").value,t=document.querySelector("#wachtwoord").value,o=document.querySelector("#email").value;return{naam:e,gebruikersNaam:r,wachtwoord:t,email:o}}function a(e){e.preventDefault();let r=u();console.log("Verzonden gebruiker: ",r),n.addGebruiker(r).then(t=>{console.log("Resultaat van toevoegen gebruiker:",t),window.location.href="/",console.log("Gebruiker succesvol toegevoegd.")}).catch(t=>{console.error("Fout bij toevoegen gebruiker:",t)})}function l(e){e.preventDefault(),window.location.href="/"}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".submitGebruiker").addEventListener("click",a),document.querySelector(".resetGebruiker").addEventListener("click",l)});
//# sourceMappingURL=addGebruiker-CEqsxqYz.js.map
