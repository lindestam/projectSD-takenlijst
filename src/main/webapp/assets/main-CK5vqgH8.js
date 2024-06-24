(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(n){if(n.ep)return;n.ep=!0;const l=r(n);fetch(n.href,l)}})();function h(){return fetch("http://localhost:8080/restservices/taken").then(o=>o.json().then(t=>({status:o.status,body:t}))).then(({status:o,body:t})=>o===200?(console.log(t),t):(console.error(t.error),[])).catch(o=>(console.error("Error fetching tasks:",o),[]))}function g(o){const t="http://localhost:8080/restservices/addTaak",r={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(o)};return fetch(t,r).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function v(o){const t=`http://localhost:8080/restservices/taken/${encodeURIComponent(o.naam)}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),Promise.reject({error:"Onbekende fout"}))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}function f(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(r=>({status:t.status,body:r}))).then(({status:t,body:r})=>{if(t===200)return console.log(r),r;console.log(r.error)}).catch(t=>{console.log(t)})}function y(o){let t=`http://localhost:8080/restservices/completed/${o.naam}`,r={method:"PUT",body:JSON.stringify(o),headers:{"Content-Type":"application/json"}};return fetch(t,r).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const a={getTaken:h,addTaken:g,deleteTaak:v,getAfgevinkteTaken:f,updateAfgevinkteTaak:y};function d(o){const e=o.target.closest(".taak").querySelector(".name").textContent;a.deleteTaak({naam:e}).then(n=>{console.log(n),m()}).catch(n=>{console.error("Fout bij het verwijderen van de taak:",n)})}function m(){let o=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!o||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}o.innerHTML="",a.getTaken().then(r=>{r.forEach(e=>{let n=t.content.cloneNode(!0),l=n.querySelector(".gemaaktOp");l.setAttribute("datetime",e.gemaaktOp||""),l.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=n.querySelector(".vervaltijd");c.setAttribute("datetime",e.vervalDatum||""),c.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let i=n.querySelector(".name");i.textContent=e.naam||"Geen titel";let s=n.querySelector(".description");s.textContent=e.omschrijving||"Geen omschrijving";let u=n.querySelector(".type");u.textContent=e.type||"Geen type",n.querySelector(".delBtn").addEventListener("click",d),o.appendChild(n)})}).catch(r=>{console.error("Error rendering tasks:",r)})}document.addEventListener("DOMContentLoaded",()=>{d(),m()});function S(){let o=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!o||!t)&&console.log("template bestaat niet"),a.getAfgevinkteTaken().then(r=>{t.innerHTML="",r.forEach(e=>{let n=o.content.cloneNode(!0),l=n.querySelector(".gemaaktOp");l.setAttribute("datetime",e.gemaaktOp),l.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=n.querySelector(".vervaltijd");c.setAttribute("datetime",e.vervalDatum),c.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let i=n.querySelector(".name");i.textContent=e.naam||"geen titel";let s=n.querySelector(".description");s.textContent=e.omschrijving||"geen om schrijving";let u=n.querySelector(".type");u.textContent=e.type||"geen type",t.appendChild(n)}),p()})}function k(o){let t={gemaaktOp:o.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:o.querySelector(".vervaltijd").getAttribute("datetime"),naam:o.querySelector(".name").textContent,omschrijving:o.querySelector(".description").textContent,type:o.querySelector(".type").textContent};a.updateAfgevinkteTaak(t).then(()=>{let r=document.querySelector("#completedTask").content.cloneNode(!0);r.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),r.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),r.querySelector(".name").textContent=t.naam,r.querySelector(".description").textContent=t.omschrijving,r.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(r),o.remove()}).catch(r=>console.error("Error updating completed task: ",r))}function p(){document.querySelectorAll('input[name="completed"]').forEach(o=>{o.addEventListener("change",t=>{if(t.target.checked){const r=t.target.closest(".taak");k(r)}})})}document.addEventListener("DOMContentLoaded",()=>{S(),p()});
//# sourceMappingURL=main-CK5vqgH8.js.map
