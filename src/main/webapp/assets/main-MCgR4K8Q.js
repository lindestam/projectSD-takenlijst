import{g as c}from"./gebruikerService-CgMzG8RS.js";function S(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function b(n){const t="http://localhost:8080/restservices/addTaak",r={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,r).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function E(n){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(n.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}const p={getTaken:S,addTaken:b,deleteTaak:E};function q(n){const e=n.target.closest(".taak").querySelector(".name").textContent;p.deleteTaak({naam:e}).then(o=>{console.log(o),h()}).catch(o=>{console.error("Fout bij het verwijderen van de taak:",o)})}function h(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",p.getTaken().then(r=>{r.forEach(e=>{let o=t.content.cloneNode(!0),a=o.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=o.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum||""),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let i=o.querySelector(".name");i.textContent=e.naam||"Geen titel";let u=o.querySelector(".description");u.textContent=e.omschrijving||"Geen omschrijving";let s=o.querySelector(".type");s.textContent=e.type||"Geen type",o.querySelector(".delBtn").addEventListener("click",q);let d=o.querySelector("#taak-list");d?c.getTaakGebruikers(e.naam).then(y=>{y.forEach(f=>{let m=document.createElement("option");m.textContent=f.naam,d.appendChild(m)})}):console.error("Element with ID 'taak-list' not found in the template for taak:",e.naam),o.querySelector(".voegToeGebruiker").addEventListener("click",C),n.appendChild(o)})}).catch(r=>{console.error("Error rendering tasks:",r)})}function g(n,t){const r=n.querySelector(".name").textContent;c.gebruikerBijTaakToevoegen(r,t).then(e=>{const o=n.querySelector("#taak-list"),a=document.createElement("option");a.textContent=t,o.appendChild(a);const l=n.querySelector(".gebruikerNaamInput");l.style.display="none",l.value="",n.querySelector(".voegToeGebruiker").textContent="+"}).catch(e=>{console.error("Error adding gebruiker to task:",e)})}function C(n){const t=n.target,r=t.closest(".taak"),e=r.querySelector(".gebruikerNaamInput");e.style.display==="none"?(e.style.display="block",e.addEventListener("keyup",function(o){o.key==="Enter"&&T(e.value,r).then(()=>{g(r,e.value)}).catch(a=>{console.error("Fout bij het toevoegen van gebruiker aan taak:",a)})}),t.addEventListener("click",function(){if(e.value===""){console.log("Gebruiker naam is leeg");return}g(r,e.value)})):(e.style.display="none",t.textContent="+")}function T(n,t){return c.getGebruiker().then(r=>{let e=!1,o=!1;for(let a=0;a<r.length;a++)if(r[a].naam===n){e=!0;break}return e||console.log("Gebruiker bestaat niet"),c.getTaakGebruikers(t).then(a=>{for(let l=0;l<a.length;l++)if(a[l].naam===n){o=!0;break}if(o)throw console.log("Gebruiker is al gekoppeld aan deze taak"),new Error("Gebruiker is al gekoppeld aan deze taak");return!0})})}document.addEventListener("DOMContentLoaded",()=>{h()});function j(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(r=>({status:t.status,body:r}))).then(({status:t,body:r})=>{if(t===200)return console.log(r),r;console.log(r.error)}).catch(t=>{console.log(t)})}function D(n){let t=`http://localhost:8080/restservices/completed/${n.naam}`,r={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,r).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const k={getAfgevinkteTaken:j,updateAfgevinkteTaak:D};function x(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),k.getAfgevinkteTaken().then(r=>{t.innerHTML="",r.forEach(e=>{let o=n.content.cloneNode(!0),a=o.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=o.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let i=o.querySelector(".name");i.textContent=e.naam||"geen titel";let u=o.querySelector(".description");u.textContent=e.omschrijving||"geen om schrijving";let s=o.querySelector(".type");s.textContent=e.type||"geen type",t.appendChild(o)}),v()})}function L(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:n.querySelector(".vervaltijd").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};k.updateAfgevinkteTaak(t).then(()=>{let r=document.querySelector("#completedTask").content.cloneNode(!0);r.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),r.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),r.querySelector(".name").textContent=t.naam,r.querySelector(".description").textContent=t.omschrijving,r.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(r),n.remove()}).catch(r=>console.error("Error updating completed task: ",r))}function v(){document.querySelectorAll('input[name="completed"]').forEach(n=>{n.addEventListener("change",t=>{if(t.target.checked){const r=t.target.closest(".taak");L(r)}})})}document.addEventListener("DOMContentLoaded",()=>{x(),v()});
//# sourceMappingURL=main-MCgR4K8Q.js.map
