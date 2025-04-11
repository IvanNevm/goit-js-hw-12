import{a as w,S as b,i as u}from"./assets/vendor-DqjOl-58.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const $="49622703-1639e63074f827bd1b79f059d",S="https://pixabay.com/api/";async function q(e,o=1){try{return(await w.get(`${S}`,{params:{key:$,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(s){throw console.error("Error fetching images:",s),s}}const p=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more");let E=new b(".gallery a");function B(e){const o=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:l,downloads:c})=>`
      <a href="${a}" class="gallery-item">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
          <p> Likes: <span class="info-value">${r}</span></p>
          <p> Views: <span class="info-value">${n}</span></p>
          <p> Comments: <span class="info-value">${l}</span></p>
          <p> Downloads: <span class="info-value">${c}</span></p>
        </div>
      </a>
    `).join("");p.innerHTML=o,E.refresh()}function M(){p.innerHTML=""}function H(){m.classList.add("visible")}function d(){m.classList.remove("visible")}function P(){y.classList.add("visible")}function g(){y.classList.remove("visible")}const O=document.querySelector(".form"),h=document.querySelector(".gallery"),T=document.querySelector(".load-more");document.querySelector(".loader");let v="",i=1,f=0;O.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements["search-text"].value.trim();o&&(v=o,i=1,M(),g(),await L())});T.addEventListener("click",async()=>{i++,await L()});async function L(){try{H();const{hits:e,totalHits:o}=await q(v,i);if(i===1&&(f=o),e.length===0){u.warning({title:"Warning",message:"No images found!"}),d();return}i===1?B(e):x(e),e.length<15||i*15>=f?(g(),u.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):P(),A()}catch(e){u.error({title:"Error",message:"Failed to fetch images!"}),console.error(e)}finally{d()}}function x(e){const o=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:l,downloads:c})=>`
      <a href="${a}" class="gallery-item">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
          <p> Likes: <span class="info-value">${r}</span></p>
          <p> Views: <span class="info-value">${n}</span></p>
          <p> Comments: <span class="info-value">${l}</span></p>
          <p> Downloads: <span class="info-value">${c}</span></p>
        </div>
      </a>
    `).join("");h.insertAdjacentHTML("beforeend",o)}function A(){const e=h.firstElementChild,o=e?e.getBoundingClientRect().height:0;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
