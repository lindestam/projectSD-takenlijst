(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();function p(){return fetch("http://localhost:8080/restservices/taken").then(r=>r.json().then(t=>({status:r.status,body:t}))).then(({status:r,body:t})=>r===200?(console.log(t),t):(console.error(t.error),[])).catch(r=>(console.error("Error fetching tasks:",r),[]))}function h(r){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(r)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function g(r){const t=`http://localhost:8080/restservices/taken/${r.naam}`;return fetch(t,{method:"DELETE"}).then(e=>e.ok?(console.log("Taak verwijderd"),e.status===204?{message:"Taak verwijderd"}:e.json()):e.status===404?(console.log("Taak niet gevonden"),Promise.reject({error:"Taak niet gevonden"})):(console.log("Er is iets anders gebeurd"),e.json().then(n=>Promise.reject(n)))).catch(e=>(console.error("Fout bij het verwijderen van de taak:",e),Promise.reject(e)))}function v(){return fetch("http://localhost:8080/restservices/completed").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function f(r){let t=`http://localhost:8080/restservices/completed/${r.naam}`,o={method:"PUT",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.error("Error updating completed task:",e)})}const c={getTaken:p,addTaken:h,deleteTaak:g,getAfgevinkteTaken:v,updateAfgevinkteTaak:f};function y(r){const e=r.target.closest(".taak").querySelector(".name").textContent;c.deleteTaak({naam:e}).then(n=>{console.log(n.message),d()}).catch(n=>{console.error("Fout bij het verwijderen van de taak:",n)})}function d(){let r=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!r||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}r.innerHTML="",c.getTaken().then(o=>{o.forEach(e=>{let n=t.content.cloneNode(!0),a=n.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp||""),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=n.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum||""),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let i=n.querySelector(".name");i.textContent=e.naam||"Geen titel";let s=n.querySelector(".description");s.textContent=e.omschrijving||"Geen omschrijving";let u=n.querySelector(".type");u.textContent=e.type||"Geen type",n.querySelector(".delBtn").addEventListener("click",y),r.appendChild(n)})}).catch(o=>{console.error("Error rendering tasks:",o)})}document.addEventListener("DOMContentLoaded",()=>{d()});function S(){let r=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!r||!t)&&console.log("template bestaat niet"),c.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let n=r.content.cloneNode(!0),a=n.querySelector(".gemaaktOp");a.setAttribute("datetime",e.gemaaktOp),a.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let l=n.querySelector(".vervaltijd");l.setAttribute("datetime",e.vervalDatum),l.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let i=n.querySelector(".name");i.textContent=e.naam||"geen titel";let s=n.querySelector(".description");s.textContent=e.omschrijving||"geen om schrijving";let u=n.querySelector(".type");u.textContent=e.type||"geen type",t.appendChild(n)}),m()})}function k(r){let t={gemaaktOp:r.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:r.querySelector(".vervaltijd").getAttribute("datetime"),naam:r.querySelector(".name").textContent,omschrijving:r.querySelector(".description").textContent,type:r.querySelector(".type").textContent};c.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),r.remove()}).catch(o=>console.error("Error updating completed task: ",o))}function m(){document.querySelectorAll('input[name="completed"]').forEach(r=>{r.addEventListener("change",t=>{if(t.target.checked){const o=t.target.closest(".taak");k(o)}})})}document.addEventListener("DOMContentLoaded",()=>{S(),m()});
//# sourceMappingURL=main-B282oB7c.js.map
