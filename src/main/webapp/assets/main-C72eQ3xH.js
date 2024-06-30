import{g as s}from"./gebruikerService-CLCUeZ5Z.js";function f(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function v(n){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function S(n){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(n.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}const m={getTaken:f,addTaken:v,deleteTaak:S};function b(n){const e=n.target.closest(".taak").querySelector(".name").textContent;m.deleteTaak({naam:e}).then(r=>{console.log(r),p()}).catch(r=>{console.error("Fout bij het verwijderen van de taak:",r)})}function p(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",m.getTaken().then(o=>{o.forEach(e=>{let r=t.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".name");c.textContent=e.naam||"Geen titel";let l=r.querySelector(".description");l.textContent=e.omschrijving||"Geen omschrijving";let i=r.querySelector(".type");i.textContent=e.type||"Geen type",r.querySelector(".delBtn").addEventListener("click",b);let u=r.querySelector("#taak-list");u?s.getTaakGebruikers(e.naam).then(h=>{h.forEach(y=>{let d=document.createElement("option");d.textContent=y.naam,u.appendChild(d)})}):console.error("Element with ID 'taak-list' not found in the template for taak:",e.naam),r.querySelector(".voegToeGebruiker").addEventListener("click",E),n.appendChild(r)})}).catch(o=>{console.error("Error rendering tasks:",o)})}function T(n,t){const o=n.querySelector(".name").textContent;s.gebruikerBijTaakToevoegen(o,t).then(e=>{const r=n.querySelector("#taak-list"),a=document.createElement("option");a.textContent=t,r.appendChild(a);const c=n.querySelector(".gebruikerNaamInput");c.style.display="none",c.value="",n.querySelector(".voegToeGebruiker").textContent="+"}).catch(e=>{console.error("Error adding gebruiker to task:",e)})}function E(n){const t=n.target,o=t.closest(".taak"),e=o.querySelector(".gebruikerNaamInput");e.style.display==="none"?(e.style.display="block",e.addEventListener("keyup",function(r){if(r.key==="Enter"){const a=e.value.trim();if(a===""){console.log("Gebruiker naam is leeg");return}const c=o.querySelector(".name").textContent;C(a,c).then(({gebruikerBestaat:l,gebruikerAlGekoppeld:i})=>{l&&!i&&T(o,a)}).catch(l=>{console.error("Fout bij het toevoegen van gebruiker aan taak:",l)})}})):(e.style.display="none",t.textContent="+")}function C(n,t){return s.getGebruiker().then(o=>{const e=o.some(r=>r.naam===n);return e?s.getTaakGebruikers(t).then(r=>{const a=r.some(c=>c.naam===n);return a&&console.log("Gebruiker is al gekoppeld aan deze taak"),{gebruikerBestaat:e,gebruikerAlGekoppeld:a}}):(console.log("Gebruiker bestaat niet"),{gebruikerBestaat:!1,gebruikerAlGekoppeld:!1})}).catch(o=>{throw console.error("Error bij het controleren van gebruiker en koppeling:",o),o})}document.addEventListener("DOMContentLoaded",()=>{p()});function q(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function j(n){let t=`http://localhost:8080/restservices/completed/${n.naam}`,o={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const g={getAfgevinkteTaken:q,updateAfgevinkteTaak:j};function x(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),g.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let r=n.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".name");c.textContent=e.naam||"geen titel";let l=r.querySelector(".description");l.textContent=e.omschrijving||"geen om schrijving";let i=r.querySelector(".type");i.textContent=e.type||"geen type",t.appendChild(r)}),k()})}function O(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};g.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),n.remove()}).catch(o=>console.error("Error updating completed task: ",o))}function k(){document.querySelectorAll('input[name="completed"]').forEach(n=>{n.addEventListener("change",t=>{if(t.target.checked){const o=t.target.closest(".taak");O(o)}})})}document.addEventListener("DOMContentLoaded",()=>{x(),k()});
//# sourceMappingURL=main-C72eQ3xH.js.map
