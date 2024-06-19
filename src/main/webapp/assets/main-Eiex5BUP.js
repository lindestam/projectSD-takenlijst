(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(r){if(r.ep)return;r.ep=!0;const l=o(r);fetch(r.href,l)}})();function m(){return fetch("http://localhost:8080/restservices/taken").then(n=>n.json().then(t=>({status:n.status,body:t}))).then(({status:n,body:t})=>n===200?(console.log(t),t):(console.error(t.error),[])).catch(n=>(console.error("Error fetching tasks:",n),[]))}function p(n){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)};return fetch(t,o).then(e=>{if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding task:",e)})}function h(n){const t=`http://localhost:8080/restservices/delete/${n}`;return fetch(t,{method:"DELETE"}).then(e=>{e.ok?console.log("Task deleted"):e.status===404?console.log("Task not found"):console.log("Something else happened")}).catch(e=>{console.error("Error deleting task:",e)})}function g(){return fetch("http://localhost:8080/restservices/taken/afgevinkt").then(t=>t.json().then(o=>({status:t.status,body:o}))).then(({status:t,body:o})=>{if(t===200)return console.log(o),o;console.log(o.error)}).catch(t=>{console.log(t)})}function f(n){let t=`http://localhost:8080/restservices/taken/afgevinkt/${n.name}`,o={method:"PUT",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}};return fetch(t,o).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{console.log(e)})}const a={getTaken:m,addTaken:p,deleteTaak:h,getAfgevinkteTaken:g,updateAfgevinkteTaak:f};function v(){document.querySelectorAll(".delBtn").forEach(t=>{t.addEventListener("click",function(){const o=this.closest(".taak").querySelector(".name").textContent;a.deleteTaak(o).then(e=>{console.log(e),d()}).catch(e=>{console.error("Fout bij het verwijderen van de taak:",e)})})})}function d(){let n=document.querySelector(".to-do-container"),t=document.getElementById("taskTemplate");if(!n||!t){console.error("Element with class 'to-do-container' or template not found in the DOM.");return}n.innerHTML="",a.getTaken().then(o=>{o.forEach(e=>{let r=t.content.cloneNode(!0),l=r.querySelector(".gemaaktOp");l.setAttribute("datetime",e.gemaaktOp||""),l.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".vervaltijd");c.setAttribute("datetime",e.vervalDatum||""),c.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen vervaldatum";let i=r.querySelector(".name");i.textContent=e.naam||"Geen titel";let s=r.querySelector(".description");s.textContent=e.omschrijving||"Geen omschrijving";let u=r.querySelector(".type");u.textContent=e.type||"Geen type",n.appendChild(r)})}).catch(o=>{console.error("Error rendering tasks:",o)})}document.addEventListener("DOMContentLoaded",()=>{d(),v()});function y(){let n=document.querySelector("#completedTask"),t=document.querySelector(".completed-container");(!n||!t)&&console.log("template bestaat niet"),a.getAfgevinkteTaken().then(o=>{t.innerHTML="",o.forEach(e=>{let r=n.content.cloneNode(!0),l=r.querySelector(".gemaaktOp");l.setAttribute("datetime",e.gemaaktOp),l.textContent=e.gemaaktOp?new Date(e.gemaaktOp).toLocaleDateString("nl-NL"):"Geen datum";let c=r.querySelector(".vervaltijd");c.setAttribute("datetime",e.vervalDatum),c.textContent=e.vervalDatum?new Date(e.vervalDatum).toLocaleDateString("nl-NL"):"Geen datum";let i=r.querySelector(".name");i.textContent=e.naam||"geen titel";let s=r.querySelector(".description");s.textContent=e.omschrijving||"geen om schrijving";let u=r.querySelector(".type");u.textContent=e.type||"geen type",t.appendChild(r)})})}function S(n){let t={gemaaktOp:n.querySelector(".gemaaktOp").getAttribute("datetime"),vervalDatum:n.querySelector(".vervaltijd").getAttribute("datetime"),naam:n.querySelector(".name").textContent,omschrijving:n.querySelector(".description").textContent,type:n.querySelector(".type").textContent};a.updateAfgevinkteTaak(t).then(()=>{let o=document.querySelector("#completedTask").content.cloneNode(!0);o.querySelector(".gemaaktOp").textContent=new Date(t.gemaaktOp).toLocaleDateString("nl-NL"),o.querySelector(".vervaltijd").textContent=new Date(t.vervalDatum).toLocaleDateString("nl-NL"),o.querySelector(".name").textContent=t.naam,o.querySelector(".description").textContent=t.omschrijving,o.querySelector(".type").textContent=t.type,document.querySelector(".completed-container").appendChild(o),n.remove()}).catch(o=>console.log("Error updating completed task: ",o))}function k(){document.querySelectorAll("#aanvinken").forEach(n=>{n.addEventListener("click",t=>{if(t.target.checked){const o=t.target.closest(".taak");S(o)}})})}document.addEventListener("DOMContentLoaded",()=>{y(),k()});
//# sourceMappingURL=main-Eiex5BUP.js.map
