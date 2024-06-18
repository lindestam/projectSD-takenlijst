(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();function d(){return fetch("http://localhost:8080/restservices/taken").then(e=>e.json().then(t=>({status:e.status,body:t}))).then(({status:e,body:t})=>e===200?(console.log(t),t):(console.error(t.error),[])).catch(e=>(console.error("Error fetching tasks:",e),[]))}function u(e){const t="http://localhost:8080/restservices/addTaak",o={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(e)};return fetch(t,o).then(i=>{if(!i.ok)throw new Error(`HTTP error! Status: ${i.status}`);return i.json()}).catch(i=>{console.error("Error adding task:",i)})}const m={getTaken:d,addTaken:u};function f(){}function h(e){let t=document.getElementById("taskTemplate");t||console.error("Template element not found.");let o=t.content.cloneNode(!0),i=document.querySelector(".taak");i.addEventListener("click",f);let r=document.querySelector(".name");r.textContent=e.naamTaak||"No Title";let n=document.querySelector("time.vervaltijd");n.setAttribute("datetime",e.vervalDatum||"");let c=document.querySelector("time");c.setAttribute("datetime",e.gemaaktOp||"");const a={year:"numeric",month:"long",day:"numeric"};c.textContent=e.gemaaktOp?new Intl.DateTimeFormat(void 0,a).format(new Date(e.gemaaktOp)):"No Date";let l=document.querySelector(".description");return l.textContent=e.omschrijving||"No Description",o.appendChild(i),o.appendChild(r),o.appendChild(n),o.appendChild(c),o.appendChild(l),o}function s(){let e=document.querySelector(".right-section");if(!e){console.error("Element with class 'right-section' not found in the DOM.");return}m.getTaken().then(t=>{e.innerHTML="",t.forEach(o=>{o?e.appendChild(h(o)):console.warn("Encountered a null task object")})}).catch(t=>{console.error("Error getting all tasks:",t)})}document.addEventListener("DOMContentLoaded",s);s();
//# sourceMappingURL=main-CrDS6FQI.js.map
