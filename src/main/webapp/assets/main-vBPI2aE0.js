import{g as s}from"./gebruikerService-CgMzG8RS.js";function S(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function E(n){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function b(n){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(n.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}const p={getTaken:S,addTaken:E,deleteTaak:b};function q(n){const e=n.target.closest(".taak").querySelector(".name").textContent;p.deleteTaak({naam:e}).then(r=>{console.log(r),h()}).catch(r=>{console.error("Fout bij het verwijderen van de taak:",r)})}function h(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",p.getTaken().then(o=>{o.forEach(e=>{let r=t.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum||""),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let c=r.querySelector(".name");c.textContent=e.naam||"Geen titel";let i=r.querySelector(".description");i.textContent=e.omschrijving||"Geen omschrijving";let u=r.querySelector(".type");u.textContent=e.type||"Geen type",r.querySelector(".delBtn").addEventListener("click",q);let d=r.querySelector("#taak-list");d?s.getTaakGebruikers(e.naam).then(y=>{y.forEach(f=>{let m=document.createElement("option");m.textContent=f.naam,d.appendChild(m)})}):console.error("Element with ID 'taak-list' not found in the template for taak:",e.naam),r.querySelector(".voegToeGebruiker").addEventListener("click",C),n.appendChild(r)})}).catch(o=>{console.error("Error rendering tasks:",o)})}function g(n,t){const o=n.querySelector(".name").textContent;s.gebruikerBijTaakToevoegen(o,t).then(e=>{const r=n.querySelector("#taak-list"),a=document.createElement("option");a.textContent=t,r.appendChild(a);const l=n.querySelector(".gebruikerNaamInput");l.style.display="none",l.value="",n.querySelector(".voegToeGebruiker").textContent="+"}).catch(e=>{console.error("Error adding gebruiker to task:",e)})}function C(n){const t=n.target,o=t.closest(".taak"),e=o.querySelector(".gebruikerNaamInput");e.style.display==="none"?(e.style.display="block",e.addEventListener("keyup",function(r){r.key==="Enter"&&T(e.value).then(a=>{a?g(o,e.value):console.log("gebruiker bestaat niet")})}),t.addEventListener("click",function(){if(e.value===""){console.log("Gebruiker naam is leeg");return}g(o,e.value)})):(e.style.display="none",t.textContent="+")}function T(n){return s.getGebruiker().then(t=>{let o=!1;for(let e=0;e<t.length;e++)if(t[e].naam===n){o=!0;break}return o||console.log("Gebruiker bestaat niet"),o})}document.addEventListener("DOMContentLoaded",()=>{h()});function j(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function D(n){let t=`http://localhost:8080/restservices/completed/${n.naam}`,o={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const k={getAfgevinkteTaken:j,updateAfgevinkteTaak:D};function x(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),k.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let r=n.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".name");c.textContent=e.naam||"geen titel";let i=r.querySelector(".description");i.textContent=e.omschrijving||"geen om schrijving";let u=r.querySelector(".type");u.textContent=e.type||"geen type",t.appendChild(r)}),v()})}function L(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:n.querySelector(".vervaltijd").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};k.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),n.remove()}).catch(o=>console.error("Error updating completed task: ",o))}function v(){document.querySelectorAll('input[name="completed"]').forEach(n=>{n.addEventListener("change",t=>{if(t.target.checked){const o=t.target.closest(".taak");L(o)}})})}document.addEventListener("DOMContentLoaded",()=>{x(),v()});
//# sourceMappingURL=main-vBPI2aE0.js.map
