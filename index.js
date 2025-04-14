import{a as $,S as p,i as u}from"./assets/vendor-DqjOl-58.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const b="49622703-1639e63074f827bd1b79f059d",S="https://pixabay.com/api/";async function q(e,o=1){try{return(await $.get(`${S}`,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(s){throw console.error("Error fetching images:",s),s}}const m=document.querySelector(".gallery"),g=document.querySelector(".loader"),y=document.querySelector(".load-more");let B=new p(".gallery a");function E(e){const o=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:l,downloads:c})=>`
      <a href="${a}" class="gallery-item">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
          <p> Likes: <span class="info-value">${r}</span></p>
          <p> Views: <span class="info-value">${n}</span></p>
          <p> Comments: <span class="info-value">${l}</span></p>
          <p> Downloads: <span class="info-value">${c}</span></p>
        </div>
      </a>
    `).join("");m.innerHTML=o,B.refresh()}function M(){m.innerHTML=""}function C(){g.classList.add("visible")}function d(){g.classList.remove("visible")}function H(){y.classList.add("visible")}function h(){y.classList.remove("visible")}const P=document.querySelector(".form"),v=document.querySelector(".gallery"),x=document.querySelector(".load-more");document.querySelector(".loader");let L="",i=1,f=0,O=new p(".gallery a");P.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements["search-text"].value.trim();o&&(L=o,i=1,M(),h(),await w())});x.addEventListener("click",async()=>{i++,await w()});async function w(){try{C();const{hits:e,totalHits:o}=await q(L,i);if(i===1&&(f=o),e.length===0){u.warning({title:"Warning",message:"No images found!"}),d();return}i===1?E(e):(T(e),O.refresh()),e.length<15||i*15>=f?(h(),u.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):H(),A()}catch(e){u.error({title:"Error",message:"Failed to fetch images!"}),console.error(e)}finally{d()}}function T(e){const o=e.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:n,comments:l,downloads:c})=>`
      <a href="${a}" class="gallery-item">
        <img src="${s}" alt="${t}" loading="lazy" />
        <div class="info">
          <p>Likes: <span class="info-value">${r}</span></p>
          <p>Views: <span class="info-value">${n}</span></p>
          <p>Comments: <span class="info-value">${l}</span></p>
          <p>Downloads: <span class="info-value">${c}</span></p>
        </div>
      </a>
    `).join("");v.insertAdjacentHTML("beforeend",o)}function A(){const e=v.firstElementChild,o=e?e.getBoundingClientRect().height:0;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
