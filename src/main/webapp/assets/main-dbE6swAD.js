import{g as s}from"./gebruikerService-CgMzG8RS.js";function y(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function v(n){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function b(n){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(n.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}const m={getTaken:y,addTaken:v,deleteTaak:b};function S(n){const e=n.target.closest(".taak").querySelector(".name").textContent;m.deleteTaak({naam:e}).then(r=>{console.log(r),p()}).catch(r=>{console.error("Fout bij het verwijderen van de taak:",r)})}function p(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",m.getTaken().then(o=>{o.forEach(e=>{let r=t.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".name");l.textContent=e.naam||"Geen titel";let c=r.querySelector(".description");c.textContent=e.omschrijving||"Geen omschrijving";let i=r.querySelector(".type");i.textContent=e.type||"Geen type",r.querySelector(".delBtn").addEventListener("click",S);let u=r.querySelector("#taak-list");u?s.getTaakGebruikers(e.naam).then(h=>{h.forEach(f=>{let d=document.createElement("option");d.textContent=f.naam,u.appendChild(d)})}):console.error("Element with ID 'taak-list' not found in the template for taak:",e.naam),r.querySelector(".voegToeGebruiker").addEventListener("click",T),n.appendChild(r)})}).catch(o=>{console.error("Error rendering tasks:",o)})}function E(n,t){const o=n.querySelector(".name").textContent;s.gebruikerBijTaakToevoegen(o,t).then(e=>{const r=n.querySelector("#taak-list");let a=!1;for(let i=0;i<r.options.length;i++)if(r.options[i].textContent===t){a=!0;break}if(a){console.log("Gebruiker is al gekoppeld aan deze taak.");return}const l=document.createElement("option");l.textContent=t,r.appendChild(l);const c=n.querySelector(".gebruikerNaamInput");c.style.display="none",c.value="",n.querySelector(".voegToeGebruiker").textContent="+"}).catch(e=>{console.error("Error adding gebruiker to task:",e)})}function T(n){const t=n.target,o=t.closest(".taak"),e=o.querySelector(".gebruikerNaamInput");e.style.display==="none"?(e.style.display="block",e.addEventListener("keyup",function(r){if(r.key==="Enter"){const a=e.value.trim();C(a,o.querySelector(".name").textContent).then(({gebruikerBestaat:l,gebruikerAlGekoppeld:c})=>{l&&!c&&E(o,a)}).catch(l=>{console.error("Fout bij het toevoegen van gebruiker aan taak:",l)})}}),t.addEventListener("click",function(){e.value.trim()===""&&console.log("Gebruiker naam is leeg")})):(e.style.display="none",t.textContent="+")}function C(n,t){let o=!1,e=!1;return s.getGebruiker().then(r=>{for(let a=0;a<r.length;a++)if(r[a].naam===n){o=!0;break}return o||console.log("Gebruiker bestaat niet"),o?s.getTaakGebruikers(t):{gebruikerBestaat:!1,gebruikerAlGekoppeld:!1}}).then(r=>{if(o){for(let a=0;a<r.length;a++)if(r[a].naam===n){e=!0;break}e&&console.log("Gebruiker is al gekoppeld aan deze taak")}return{gebruikerBestaat:o,gebruikerAlGekoppeld:e}}).catch(r=>{throw console.error("Error bij het controleren van gebruiker en koppeling:",r),r})}document.addEventListener("DOMContentLoaded",()=>{p()});function q(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function j(n){let t=`http://localhost:8080/restservices/completed/${n.naam}`,o={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const g={getAfgevinkteTaken:q,updateAfgevinkteTaak:j};function x(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),g.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let r=n.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".name");l.textContent=e.naam||"geen titel";let c=r.querySelector(".description");c.textContent=e.omschrijving||"geen om schrijving";let i=r.querySelector(".type");i.textContent=e.type||"geen type",t.appendChild(r)}),k()})}function O(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};g.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),n.remove()}).catch(o=>console.error("Error updating completed task: ",o))}function k(){document.querySelectorAll('input[name="completed"]').forEach(n=>{n.addEventListener("change",t=>{if(t.target.checked){const o=t.target.closest(".taak");O(o)}})})}document.addEventListener("DOMContentLoaded",()=>{x(),k()});
//# sourceMappingURL=main-dbE6swAD.js.map
