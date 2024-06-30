(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();function u(){return fetch("http://localhost:8080/restservices/gebruiker").then(o=>o.json().then(r=>({status:o.status,body:r}))).then(({status:o,body:r})=>o===200?(console.log(r),r):(console.error(r.error),[])).catch(o=>(console.error("Error fetching gebruikers:",o),[]))}function c(o){let r="http://localhost:8080/restservices/addgebruiker",n={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(o)};return fetch(r,n).then(t=>{if(!t.ok)throw t.status===404&&console.error("Foute email: geen '@' aanwezig"),t.status===500&&console.error("Wachtwoord moet groter dan 10 tekens zijn"),t.status===409&&console.log("gebruiker met dezelfde naam bestaat al!"),new Error(`HTTP error, status = ${t.status}`);return t.json()}).catch(t=>{console.error("error adding gebruikers",t)})}function a(o){let r=`http://localhost:8080/restservices/taken/${o}`;return fetch(r).then(n=>n.json()).then(n=>n).catch(n=>(console.error("Error fetching gebruikers:",n),[]))}function l(o,r){const n=`http://localhost:8080/restservices/taken/gebruikers/${o}`,t={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({naam:r})};return console.log("Request URL:",n),console.log("Request body:",t.body),fetch(n,t).then(e=>{if(!e.ok)throw e.status===400?new Error("Bad Request: Request body must contain gebruiker field or gebruiker field must be non-empty."):e.status===404?new Error("Not Found: Taak of gebruiker niet gevonden."):e.status===409?new Error("Conflict: Gebruiker is al gekoppeld aan deze taak."):new Error(`HTTP error, status = ${e.status}`);return e.json()}).catch(e=>{console.error("Error adding gebruikers:",e)})}const f={getGebruiker:u,addGebruiker:c,getTaakGebruikers:a,gebruikerBijTaakToevoegen:l};export{f as g};
//# sourceMappingURL=gebruikerService-CLCUeZ5Z.js.map
