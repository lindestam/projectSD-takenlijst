import{g as k}from"./gebruikerService-D02CixR6.js";function S(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function f(n){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function E(n){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(n.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}const d={getTaken:S,addTaken:f,deleteTaak:E};function C(n){const e=n.target.closest(".taak").querySelector(".name").textContent;d.deleteTaak({naam:e}).then(r=>{console.log(r),p()}).catch(r=>{console.error("Fout bij het verwijderen van de taak:",r)})}function p(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",d.getTaken().then(o=>{o.forEach(e=>{let r=t.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum||""),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let c=r.querySelector(".name");c.textContent=e.naam||"Geen titel";let i=r.querySelector(".description");i.textContent=e.omschrijving||"Geen omschrijving";let s=r.querySelector(".type");s.textContent=e.type||"Geen type",r.querySelector(".delBtn").addEventListener("click",C);let u=r.querySelector("#taak-list");u?k.getTaakGebruikers(e.naam).then(v=>{v.forEach(y=>{let m=document.createElement("option");m.textContent=y.naam,u.appendChild(m)})}):console.error("Element with ID 'taak-list' not found in the template for taak:",e.naam),n.appendChild(r)})}).catch(o=>{console.error("Error rendering tasks:",o)})}document.addEventListener("DOMContentLoaded",()=>{p()});function q(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function j(n){let t=`http://localhost:8080/restservices/completed/${n.naam}`,o={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const h={getAfgevinkteTaken:q,updateAfgevinkteTaak:j};function D(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),h.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let r=n.content.cloneNode(!0),a=r.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=r.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".name");c.textContent=e.naam||"geen titel";let i=r.querySelector(".description");i.textContent=e.omschrijving||"geen om schrijving";let s=r.querySelector(".type");s.textContent=e.type||"geen type",t.appendChild(r)}),g()})}function T(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:n.querySelector(".vervaltijd").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};h.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),n.remove()}).catch(o=>console.error("Error updating completed task: ",o))}function g(){document.querySelectorAll('input[name="completed"]').forEach(n=>{n.addEventListener("change",t=>{if(t.target.checked){const o=t.target.closest(".taak");T(o)}})})}document.addEventListener("DOMContentLoaded",()=>{D(),g()});
//# sourceMappingURL=main-oXqfhTOq.js.map
