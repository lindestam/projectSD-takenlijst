import"./modulepreload-polyfill-B5Qt9EMX.js";function n(){return fetch("http://localhost:8080/restservices/gebruiker").then(e=>e.json().then(r=>({status:e.status,body:r}))).then(({status:e,body:r})=>e===200?(console.log(r),r):(console.error(r.error),[])).catch(e=>(console.error("Error fetching gebruikers:",e),[]))}function u(e){let r="http://localhost:8080/restservices/addgebruiker",t={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)};return fetch(r,t).then(o=>{if(!o.ok)throw new Error("http error, : ${response.status}");return o.json()}).catch(o=>{console.error("error adding gebruikers",o)})}const i={getGebruiker:n,addGebruiker:u};function c(){let e=document.querySelector("#naamGebruiker"),r=document.querySelector("#gebruikersnaam"),t=document.querySelector("#wachtwoord"),o=document.querySelector("#email");return{naamGebruiker:e,gebruikersnaam:r,wachtwoord:t,email:o}}function a(e){e.preventDefault();let r=c();console.log("verzonden gebruiker: ",r),i.addGebruiker(r).then(t=>{console.log("Resultaat van toevoegen gebruiker:",t),window.location.href="/"}).catch(t=>{console.error("Error adding gebruiker:",t)})}function l(e){e.preventDefault(),window.location.href="/"}document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".submitGebruiker").addEventListener("click",a),document.querySelector(".resetGebruiker").addEventListener("click",l)});
//# sourceMappingURL=addGebruiker-u9CbZK7P.js.map
