if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const f=e=>i(e,o),d={module:{uri:o},exports:t,require:f};s[o]=Promise.all(n.map((e=>d[e]||f(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-YQhsp2t4.js",revision:null},{url:"assets/workbox-window.prod.es5-FhKJGEEu.js",revision:null},{url:"bootstrap.bundle.min.js",revision:"1fa88fa805d906cc3d966a4bf3a5ff43"},{url:"bootstrap.min.css",revision:"ccd5d0f624f3a21f58f70120df504b97"},{url:"calendar.js",revision:"960c0d42921c19881b9452feb65d8957"},{url:"index.html",revision:"98a926a14c1c25f73eadbe70767290f5"},{url:"v1.html",revision:"661e73948e03d221f384684e1fb9f391"},{url:"manifest.webmanifest",revision:"d9033b3dcf4fc57809331a9fa998cd14"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map