if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const f=e=>i(e,o),d={module:{uri:o},exports:t,require:f};s[o]=Promise.all(r.map((e=>d[e]||f(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-71S1-p93.js",revision:null},{url:"assets/workbox-window.prod.es5-prqDwDSL.js",revision:null},{url:"bootstrap.bundle.min.js",revision:"1fa88fa805d906cc3d966a4bf3a5ff43"},{url:"bootstrap.min.css",revision:"ccd5d0f624f3a21f58f70120df504b97"},{url:"calendar.js",revision:"960c0d42921c19881b9452feb65d8957"},{url:"index.html",revision:"4b6f017fa73ca05c38c1755ca3f9fa31"},{url:"v1.html",revision:"661e73948e03d221f384684e1fb9f391"},{url:"manifest.webmanifest",revision:"d9033b3dcf4fc57809331a9fa998cd14"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
