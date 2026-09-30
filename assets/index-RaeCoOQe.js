(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Ka;const ye=typeof window<"u"?(Ka=window.matchMedia)==null?void 0:Ka.call(window,"(prefers-reduced-motion: reduce)"):null,it=new Set,qn="cubic-bezier(.2,.75,.25,1)";var Ga;(Ga=ye==null?void 0:ye.addEventListener)==null||Ga.call(ye,"change",e=>{e.matches&&it.forEach(t=>t.cancel())});function yt(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||ye!=null&&ye.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:qn,fill:"backwards"});return r.id="workspace-reveal",it.add(r),r.finished.then(()=>it.delete(r),()=>it.delete(r)),r}function An(e){if(ye!=null&&ye.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||yt(a,{delay:Math.min(s++*22,154),distance:10})}}const za={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},ct="oizom-id-token";let da=null;function Rn(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function ht(){const e=localStorage.getItem(ct);return e?Rn(e)<Date.now()+3e4?(localStorage.removeItem(ct),null):e:null}function Pn(){const e=ht();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function Cn(){localStorage.removeItem(ct),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Tn(e){if(da=e,ht()){e();return}Ht(()=>{google.accounts.id.initialize({client_id:za.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(ct,t.credential),da()}}),google.accounts.id.prompt()})}function Ht(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>Ht(e,t+1),100)}function Ln(e){Ht(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}const Xe=[];function Wa(e,t,s,a=!0){Xe.push({kind:e,name:t,durationMs:Math.round(s*100)/100,ok:a,at:Date.now()}),Xe.length>200&&Xe.shift()}const En=()=>Xe.map(e=>({...e}));function Dn(e,t){const s=performance.now();let a=!1;try{const n=t();return a=!0,n}finally{Wa("render",e||"dashboard",performance.now()-s,a)}}typeof window<"u"&&(window.procurementPerformance={samples:En,clear:()=>{Xe.length=0}});class Dt extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const Ya=new Set(["list","prDetail","me","usersList","health","logTail","financeList","financeGet","attachmentDownload"]),Nn=new Set([404,408,429,500,502,503,504]),Mn=45e3;function In(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function at(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=Ya.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new Dt(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||Nn.has(t)})}async function Fn(e,t){var d;const s=Date.now(),a=ht();if(!a)throw new Dt("SIGNED_OUT");let n;try{n=await fetch(za.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:Mn),body:JSON.stringify({...t,action:e,token:a})})}catch($){throw at(e,{kind:["TimeoutError","AbortError"].includes($.name)?"timeout":"network"})}const r=In(n);if(!n.ok)throw at(e,{status:n.status,stage:r,kind:"http"});let o;try{o=await n.json()}catch{throw at(e,{stage:r,kind:"response"})}if(!o||typeof o.ok!="boolean"||o.ok&&e==="list"&&!Array.isArray(o.prs))throw at(e,{stage:r,kind:"response"});if(!o.ok)throw new Dt(o.error||"Request failed",{action:e});return Number.isFinite((d=o.timing)==null?void 0:d.serverMs)&&console.info("[Procurement timing]",{action:e,totalMs:Date.now()-s,serverMs:o.timing.serverMs,authMs:o.timing.authMs,actionMs:o.timing.actionMs}),o}async function Y(e,t={}){const s=performance.now();let a=!1;try{for(let n=0;n<2;n++)try{const r=await Fn(e,t);return a=!0,r}catch(r){if(!r.retryable||(console.warn("[Procurement connection]",{action:e,status:r.status,stage:r.stage,kind:r.kind,attempt:n+1}),!Ya.has(e)||n===1))throw r;await new Promise(o=>setTimeout(o,800))}}finally{Wa("api",e,performance.now()-s,a)}}function On(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function xn(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Za(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function Bn(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function ca(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,itemsLoaded:!0,itemCount:n.length,amount:a.totalAmount,item:Za(n),qty:Bn(n)}})}function ua(e){return e.map(t=>({...t,items:void 0,itemsLoaded:!1,amount:t.totalAmount,item:t.item||"",qty:""}))}let K={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Nt=new Set;let ma=!1,Ne=null,Me=0,_e=null,pa=!1,ya=null,wt=0;const Ie=new Map;function jn(e,t){var r;const s=o=>{var d;return[(d=o==null?void 0:o.email)==null?void 0:d.toLowerCase(),o==null?void 0:o.role,o==null?void 0:o.department].join("|")};if(s(e.me)!==s(K.me)||!t.length)return null;const a=[...e.prs];let n=e.items||[];for(const o of t){if(!o.pr||["task","deleted","users","vendors","projects","materialTypes","notifications"].some(m=>o[m]!=null))return null;const d=a.findIndex(m=>m.id===o.pr.id),$=Date.parse(o.pr.updatedAt),y=Date.parse((r=a[d])==null?void 0:r.updatedAt);if(d<0||!Number.isFinite($)||!Number.isFinite(y))return null;if($>y){const m=a[d];a[d]={...m,...o.pr},e.summary&&Array.isArray(o.items)&&(a[d].item=Za(o.items),a[d].itemCount=o.items.length);for(const h of["paymentWork","financeReleased"])!(h in o.pr)&&h in m&&(a[d][h]=m[h]);Array.isArray(o.items)&&(n=[...n.filter(h=>h.prId!==o.pr.id),...o.items.map(h=>({...h,prId:o.pr.id}))])}}return{...e,prs:a,items:n}}function ha(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function St(){Nt.forEach(e=>e(K))}const z={get:()=>K,subscribe(e){return Nt.add(e),()=>Nt.delete(e)},refresh({fresh:e=!1}={}){return Ne?e&&!pa?ya||(ya=Ne.then(()=>z.refresh({fresh:!0})).finally(()=>{ya=null})):Ne:(pa=e,K={...K,loading:!0},Ne=Promise.resolve().then(async()=>{try{let t,s;do if(s=Me,_e=[],t=await Y("list",{summary:!0,fresh:e}),ha(t),s!==Me){const a=jn(t,_e);if(a){t=a;break}}while(s!==Me);ha(t),K={prs:t.summary===!0?ua(t.prs):ca(t.prs,t.items||[]),lists:t.lists||{},vendors:t.vendors||[],projects:t.projects||[],materialTypes:t.materialTypes||[],notifications:t.notifications||[],me:t.me,capabilities:t.capabilities||{},lastSync:new Date,err:"",loading:!1},ma=!0,wt++}catch(t){if(t.message==="SIGNED_OUT"&&ma){location.reload();return}K={...K,err:t.message,loading:!1}}}).finally(()=>{Ne=null,_e=null,K={...K,loading:!1},St()}),St(),Ne)},loadPr(e,{force:t=!1}={}){var d,$,y;const s=K.prs.find(m=>m.id===e);if(s&&s.itemsLoaded!==!1&&!t)return Promise.resolve(s);if(Ie.has(e))return Ie.get(e);const a=Me,n=wt,r=[(d=K.me)==null?void 0:d.email,($=K.me)==null?void 0:$.role,(y=K.me)==null?void 0:y.department].join("|"),o=Promise.resolve().then(()=>Y("prDetail",{id:e})).then(async m=>{var S,q,L,C;if(((S=m.pr)==null?void 0:S.id)!==e||!Array.isArray(m.items))throw new Error("Incomplete purchase request response. Please retry.");if([(q=K.me)==null?void 0:q.email,(L=K.me)==null?void 0:L.role,(C=K.me)==null?void 0:C.department].join("|")!==r)return null;const h=K.prs.find(j=>j.id===e);return h?Me!==a||wt!==n?h.itemsLoaded!==!1?h:(Ie.delete(e),z.loadPr(e)):(await z.applyResult(m,{itemsChanged:!0}),K.prs.find(j=>j.id===e)||null):null}).finally(()=>{Ie.get(e)===o&&Ie.delete(e)});return Ie.set(e,o),o},async applyResult(e,{itemsChanged:t=!1}={}){Me++,_e&&_e.push(t&&!Array.isArray(e.items)?{}:e);const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=K.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return z.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(d=>({...d,prId:e.pr.id})),o=!Array.isArray(e.items)&&(n==null?void 0:n.itemsLoaded)===!1?ua([{...n,...e.pr}])[0]:ca([{...n,...e.pr}],r)[0];for(const d of["paymentWork","financeReleased"])!(d in e.pr)&&n&&d in n&&(o[d]=n[d]);s.prs=n?K.prs.map(d=>d.id===o.id?o:d):[...K.prs,o]}a=!0}e.deleted&&(s.prs=K.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=K.me&&e.users.find(r=>r.email.toLowerCase()===K.me.email.toLowerCase());if(K.me&&(!n||!n.role))return z.refresh();n&&(s.me={...K.me,role:n.role,department:n.department}),a=!0}if(!a)return z.refresh();K={...K,...s},St()}},fa={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function b(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${fa[e]||fa.file}</svg>`}const i=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ft(e){return`<span class="chip ${i(e)}" data-s="${i(e)}">${i(e)}</span>`}function U(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${b(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const oe=e=>e?i(String(e).slice(0,10)):"—";function vt(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function Vt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const va={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},ot=e=>va[e]!=null?va[e]:e+" ";function Ve(e,t){const s=e==="INR"?"en-IN":"en-US";return ot(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function me(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?ot(e)+(t/1e6).toFixed(2)+"M":t>=1e3?ot(e)+(t/1e3).toFixed(1)+"K":ot(e)+Math.round(t).toLocaleString("en-US")}const tt=["Cancelled","Rejected"],Un=["Ordered","In Transit","Received"],bt=e=>Un.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function ba(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function ga(e){const t=e.filter(n=>!tt.includes(n.status)),s=e.filter(bt),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:ba(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:ba(t)}}const ut={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:bt,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!tt.includes(e.status)};function Hn(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function $a(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function Ja(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function Vn(e){return e.filter(bt)}function _n(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function Kn(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function wa(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let o;if(t==="count")o=1;else{if(tt.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const d=Number(n.amount);if(!n.amount||!isFinite(d)||(n.currency||"Unknown")!==s)continue;o=d}a[r]=(a[r]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Gn(e,t){const s={};for(const a of e){if(tt.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function zn(e,t,s=6){const a={};for(const o of e){if(tt.includes(o.status)||(o.currency||"Unknown")!==t)continue;const d=Number(o.amount);if(!o.amount||!isFinite(d))continue;const $=o.vendor||"Unspecified";a[$]=(a[$]||0)+d}const n=Object.entries(a).map(([o,d])=>({vendor:o,total:d})).sort((o,d)=>d.total-o.total);if(n.length<=s)return n;const r=n.slice(s).reduce((o,d)=>o+d.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function Wn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Yn(e){const t=(r,o)=>{const d=Date.parse(r),$=Date.parse(o);return isFinite(d)&&isFinite($)?($-d)/864e5:null},s=r=>r.length?r.reduce((o,d)=>o+d,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Zn=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Jn(e,t=Date.now()){const s=Zn.map(a=>({...a,count:0}));return e.filter(bt).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(o=>r>=o.min&&r<=o.max)||s[s.length-1]).count++}),s}const je=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Qa=["Unpaid","Paid","Partially Paid","FOC / Free"],mt={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Qn(e,t,s,a,n){const r=(mt[e]||{})[t];return r?r.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function Xn(e,t,s,a){return Object.keys(mt[e]||{}).filter(n=>Qn(e,n,t,s,a))}function es(e,t){return!!(mt[e]&&mt[e][t])}function Sa(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),d=String(a||"").trim();return r&&o&&r===o&&d?d:vt(t)}const Xa={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function en(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function ts(e){const t=String(e.trackingNo||"").trim(),s=en(e.trackingLink)||(t?(Xa[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[i(e.courier||""),s?`<a href="${i(s)}" target="_blank" rel="noopener noreferrer">${i(t||"Track shipment")} ↗</a>`:i(t)].filter(Boolean).join(" ")}function as(e,t=[]){const s=[...new Set([...t,...Object.keys(Xa),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${i(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${i(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${i(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${i(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function ns(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!en(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const ss="1900-01-01",rs="2100-12-31",is="Enter a complete date with a year between 1900 and 2100.";function Je(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function tn(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(is)};return t.forEach(a=>{a.min=ss,a.max=rs;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const os=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function gt(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function an(e){return`<div class="attachment-links">${gt(e).map(t=>`<button type="button" class="attachment-link" data-download="${i(t.id)}">${b("file")}${i(t.name)}</button>`).join("")}</div>`}function nn(e=[]){return`<div class="attachment-picker" data-attachments="${i(JSON.stringify(gt(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${b("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${os}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const ls=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function sn(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=gt(e.dataset.attachments).map(m=>({attachment:m})),r=e.querySelector(".attachment-selection"),o=e.querySelector("input"),d=e.querySelector(".attachment-status"),$=()=>{e.dataset.attachments=JSON.stringify(n.filter(m=>m.attachment).map(m=>m.attachment))},y=()=>{r.innerHTML=n.map((m,h)=>{var S,q;return`<div class="attachment-chip">${b("file")}<span>${i(((S=m.attachment)==null?void 0:S.name)||m.file.name)}${m.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${h}" aria-label="Remove ${i(((q=m.attachment)==null?void 0:q.name)||m.file.name)}" ${a?"disabled":""}>${b("close")}</button></div>`}).join(""),r.querySelectorAll("[data-remove]").forEach(m=>m.onclick=()=>{a||(n.splice(Number(m.dataset.remove),1),$(),y())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const m=[...o.files];if(n.length+m.length>3)throw new Error("Attach up to 3 files per item or payment");for(const h of m){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(h.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!h.size||h.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}m.forEach(h=>n.push({file:h,operationId:crypto.randomUUID()})),d.textContent="Files will upload when you save.",y()}catch(m){U(m.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var m;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,y();try{for(const h of n){if(h.attachment)continue;d.textContent="Uploading "+h.file.name+"…";const S=await Y("attachmentUpload",{scope:t,prId:s,name:h.file.name,operationId:h.operationId,base64:await ls(h.file)});if(!((m=S.attachment)!=null&&m.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");h.attachment=S.attachment,$(),y()}return d.textContent=n.length?"Attachments ready.":"",n.map(h=>h.attachment)}catch(h){throw d.textContent="Upload not confirmed. Your selected files are kept here for retry.",h}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,y()}},e.hasPendingFiles=()=>n.some(m=>!m.attachment),y()}function rn(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await Y("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),r=document.createElement("a");r.href=n,r.download=s.attachment.name,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){U(s.message,!0)}finally{t.disabled=!1}}})}const ka=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],ds=e=>e==="Open"?"Outstanding":e;let xe={viewer:"",sync:null,data:null,pending:null};const Be=new Map;let $e="Open";function qa(){xe.data=null,Be.clear()}const Fe=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Ve(e.currency,t),Aa=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function cs(e,t,s,a={}){var P,M;const n=t.me,r=!!((P=t.capabilities)!=null&&P.poFinanceHandoff);if(!n||!["admin","finance"].includes(n.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((M=t.capabilities)!=null&&M.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const o=n.email+"|"+n.role,d=String(t.lastSync);(xe.viewer!==o||xe.sync!==d)&&(xe={viewer:o,sync:d,data:null,pending:null},$e="Open");const $=o+"|"+s;a.detailOnly&&(!Be.has($)||Be.get($).sync!==d)&&Be.set($,{viewer:o,sync:d,data:null,pending:null});const y=a.detailOnly?Be.get($):xe,m=()=>a.detailOnly?Be.get($)===y:xe===y,h=async(c=!1)=>{var T;if(c&&(y.data=null),!y.data){e.innerHTML=`<div class="connection-state" role="status">${b("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{y.pending||(y.pending=(a.detailOnly&&((T=t.capabilities)!=null&&T.paymentDrawer)?Y("financeGet",{id:s}):Y("financeList")).finally(()=>{y.pending=null}));const g=await y.pending;if(!Array.isArray(g.tasks)||!Array.isArray(g.financeUsers))throw new Error("The server did not return payment records.");y.data=g}catch(g){if(!e.isConnected||!m())return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${i(g.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>h(!0);return}}!e.isConnected||!m()||C()};let S="",q=1,L=!1;const C=()=>{var W,Q,ee,k,R;const{tasks:c,financeUsers:T}=y.data,g=n.role==="admin",F=g?["Awaiting admin",...ka]:ka,f=s&&c.find(v=>v.prId===s),E=v=>$e==="All"||($e==="Open"?v.state!=="Completed":$e==="Mine"?v.owner===n.email:v.state===$e),O=c.filter(E).filter(v=>[v.prId,v.poNo,v.vendor,v.owner].join(" ").toLowerCase().includes(S.toLowerCase())),I=Math.max(1,Math.ceil(O.length/25));q=Math.min(q,I);const X=(g?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(v=>[v,c.filter(D=>D.state===v).length]);e.innerHTML=a.detailOnly?`<div class="payments-page payment-detail-only">${f?j(f,g,T):'<div class="connection-state"><h2>No payment work yet</h2><p>The request stays with admin until its PO is ready.</p></div>'}</div>`:`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${g?r?"Create the PO when ready. Payment work goes to Finance automatically.":"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${b("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${X.map(([v,D])=>`<button class="kpi clickable" data-stage="${v}"><span class="l">${v}</span><span class="v">${D}</span></button>`).join("")}</div>
      ${f?j(f,g,T):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${g?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${c.length}</span></h2><p>${g?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${F.map(v=>`<button class="view-pill ${v===$e?"selected":""}" data-stage="${v}" aria-pressed="${v===$e}">${ds(v)}</button>`).join("")}</div>
      <label class="search-input">${b("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${i(S)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${O.slice((q-1)*25,q*25).map(v=>`<tr><td><a href="#/payments/${encodeURIComponent(v.prId)}"><b>${i(v.prId)}</b></a><small class="finance-sub">${i(v.vendor)}</small></td><td>${i(v.poNo||"—")}</td><td>${i(Fe(v,v.outstanding))}<small class="finance-sub">${i(v.paymentStatus)}</small></td><td>${i(v.owner||"Not started")}</td><td><span class="finance-status" data-state="${i(v.state)}">${i(v.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(v.prId)}" aria-label="View payment details ${i(v.prId)}">View details ${b("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${q===1?"disabled":""}>Previous</button><span>${O.length} results · Page ${q} of ${I}</span><button class="btn" id="financeNext" ${q===I?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${b("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${g?`<p class="finance-note">${b("info")} ${i(((W=y.data.zoho)==null?void 0:W.message)||"")}</p>`:""}
    </div>`;const se=e.querySelector("#reloadPayments");se&&(se.onclick=()=>{L||h(!0)}),e.querySelectorAll("[data-stage]").forEach(v=>v.onclick=()=>{L||($e=v.dataset.stage,q=1,C())});const le=e.querySelector("#financeSearch");if(le&&(le.oninput=v=>{if(L)return;S=v.target.value,q=1,C(),e.querySelector("#financeSearch").focus()}),(Q=e.querySelector("#financePrev"))==null||Q.addEventListener("click",()=>{q--,C()}),(ee=e.querySelector("#financeNext"))==null||ee.addEventListener("click",()=>{q++,C()}),!f)return;a.onRequest&&e.querySelectorAll('a[href^="#/pr/"]').forEach(v=>v.onclick=D=>{D.preventDefault(),a.onRequest()}),rn(e);const w=async(v,D)=>{var V,H,ae;if(!L){L=!0,(V=a.onBusy)==null||V.call(a,!0),e.querySelectorAll(".finance-detail button").forEach(_=>{_.disabled=!0});try{const _=await Y(v,{id:f.prId,...D});if(!_.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");y.data.tasks=y.data.tasks.map(Z=>Z.prId===f.prId?_.task:Z),e.isConnected&&m()&&C(),await z.applyResult(_),(H=a.onSaved)==null||H.call(a),U(v==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(_){U(_.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(Z=>{Z.disabled=!1})}finally{L=!1,(ae=a.onBusy)==null||ae.call(a,!1)}}};e.querySelectorAll("[data-progress]").forEach(v=>v.onclick=()=>w("financeProgress",{state:v.dataset.progress})),(k=e.querySelector("#remindFinance"))==null||k.addEventListener("click",()=>w("financeRemind",{})),(R=e.querySelector("#sendToFinance"))==null||R.addEventListener("click",()=>w("financeRelease",{}));const x=e.querySelector("#recordPayment");if(x){const v=x.querySelector(".attachment-picker");sn(v,{scope:"payment",prId:f.prId});const D=x.elements.amount,V=()=>{const _=x.elements.paymentMode.value==="full";D.readOnly=_,D.max=_?String(f.outstanding):(Math.round(f.outstanding*(f.currency==="JPY"?1:100))-1)/(f.currency==="JPY"?1:100),D.value=_?String(f.outstanding):"",e.querySelector("#paymentAmountHint").textContent=_?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",_||D.focus()};x.querySelectorAll('[name="paymentMode"]').forEach(_=>_.onchange=V),V();const H="finance-attempt:"+n.email+":"+f.prId,ae=_=>{const Z=JSON.stringify(_);let p;try{p=JSON.parse(sessionStorage.getItem(H))}catch{}const N=(p==null?void 0:p.signature)===Z?p:{signature:Z,id:crypto.randomUUID()};return sessionStorage.setItem(H,JSON.stringify(N)),N.id};x.onsubmit=async _=>{var Z,p;if(_.preventDefault(),!(L||!x.reportValidity())){L=!0,(Z=a.onBusy)==null||Z.call(a,!0),x.querySelector('[type="submit"]').disabled=!0;try{const N=await v.uploadFiles(),G=Object.fromEntries(new FormData(x));G.currency=f.currency,G.paymentMode==="full"&&(G.amount=String(f.outstanding)),N.length&&(G.attachments=N),L=!1,await w("financeRecordPayment",{...G,operationId:ae(G)})}catch(N){U(N.message,!0)}finally{L=!1,(p=a.onBusy)==null||p.call(a,!1),x.isConnected&&(x.querySelector('[type="submit"]').disabled=!1)}}}}for(const[v,D]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const V=e.querySelector("#"+v);V&&(V.onsubmit=H=>{H.preventDefault(),V.reportValidity()&&w(D,Object.fromEntries(new FormData(V)))})}},j=(c,T,g)=>{const F=c.owner===n.email.toLowerCase(),f=T||F,E=c.released&&!c.issue&&c.state!=="Completed",O=r&&(c.requestStatus==="Approved"||!c.poNo);return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${i(c.vendor)}</span><h2>${i(c.prId)}</h2><p>${i(c.poNo||"PO reference not recorded")} · Request: ${i(c.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(c.prId)}">Request &amp; delivery ${b("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${i(Fe(c,c.total))}</b></div><div><span>Recorded paid</span><b>${i(Fe(c,c.paid))}</b></div><div><span>Outstanding</span><b>${i(Fe(c,c.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${i(c.state)}">${i(c.state)}</span><span>Responsible: <b>${i(c.owner||"Not started")}</b></span></div>
      ${c.issue?`<p class="finance-alert" role="status">${i(c.issue)}</p>`:""}
      ${c.released?`<p class="finance-note">Sent to Finance ${i(oe(c.sentAt))} by ${i(c.sentBy||"admin")}.</p>`:`<p class="finance-note">${O?"This request stays with admin until the PO is recorded and sent to Finance.":"This request is with admin. Finance cannot see it until you send it."}</p>`}
      ${!T&&c.owner&&!F?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${T&&!c.released&&!c.issue&&c.state!=="Completed"?O?`<a class="btn primary" href="#/pr/${encodeURIComponent(c.prId)}">${c.requestStatus==="Approved"?"Create PO &amp; send to Finance":"Add PO details"}</a>`:'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${E&&(c.owner?f:!T)&&c.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${E&&f&&c.owner&&c.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${T&&c.released&&c.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${c.lastReminderAt?`<p class="finance-note">Last reminder: ${i(new Date(c.lastReminderAt).toLocaleString())}</p>`:""}
      ${T&&!c.owner&&E?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${E&&f&&c.owner&&c.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <fieldset class="payment-mode"><legend>Payment amount</legend><div class="payment-mode-options">
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${i(Fe(c,c.outstanding))}</small></span></label>
          <label><input type="radio" name="paymentMode" value="partial"><span><b>Partial payment</b><small>Enter the amount paid</small></span></label>
        </div></fieldset><p class="full finance-note" id="paymentAmountHint"></p>
        <label>Amount (${i(c.currency)})<input name="amount" type="number" step="${c.currency==="JPY"?"1":"0.01"}" min="${c.currency==="JPY"?"1":"0.01"}" max="${c.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${Aa()}" value="${Aa()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <div class="full"><h4>Payment proof (optional)</h4>${nn()}</div>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${T&&c.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${i(c.currency)})<input name="amount" type="number" min="0" max="${c.total}" step="${c.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${T&&c.released&&c.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${g.map(I=>`<option value="${i(I.email)}" ${I.email===c.owner?"selected":""}>${i(I.name||I.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${c.payments.map(I=>`<article><div><b>${i(Fe(c,I.amount))}</b><span>${i(oe(I.date))} · ${i(I.reference)}</span></div><p>${i(I.recordedBy)}${I.note?" · "+i(I.note):""}</p>${/^https:\/\//i.test(I.proofUrl||"")?`<a href="${i(I.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${b("external")}</a>`:""}${an(I.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await h()}function on(e,t,s,a){if(!s)return!1;const n=t.prs.find(o=>o.id===s);if(!n)return e.innerHTML=`<div class="card">PR ${i(s)} not found.</div>`,!0;if(n.itemsLoaded!==!1)return!1;e.innerHTML='<div class="card" role="status">Loading purchase request.</div>';const r=e.firstElementChild;return z.loadPr(s).then(()=>{e.isConnected&&e.firstElementChild===r&&a(e,z.get(),s)}).catch(o=>{!e.isConnected||e.firstElementChild!==r||(e.innerHTML=`<div class="card">${i(o.message)} <button class="btn" id="prRetry">Retry</button></div>`,e.querySelector("#prRetry").onclick=()=>a(e,z.get(),s))}),!0}const ne=(e,t)=>`<div class="pd-f"><span class="vc-l">${i(e)}</span><b>${t||"—"}</b></div>`;let Ke=!1,Ra=null;const Pa=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${i(Vt(s||t))}</span>
    <div>
      <span class="vc-l">${i(e)}</span>
      <b>${i(t)}</b>
      <div class="pd-sub">${i(a||"")}</div>
    </div>
  </div>`;function et(e,t,s,a={}){var D,V,H,ae,_,Z;if(on(e,t,s,(p,N,G)=>et(p,N,G,a)))return;const n=async p=>{var N;qa(),await z.applyResult(p),(N=a.onSaved)==null||N.call(a)},r=t.prs.find(p=>p.id===s);if(!r){e.innerHTML=`<div class="card">PR ${i(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Ra!==s&&(Ke=!1,Ra=s);const o=t.me||{role:"",email:"",department:""},d=o.role==="admin",$=r.requesterEmail.toLowerCase()===o.email.toLowerCase(),y=d||o.role==="finance"&&(!((D=t.capabilities)!=null&&D.financeHandoff)||r.financeReleased),m=d||$&&r.status==="Submitted",h=String(r.department||"").toLowerCase()===String(o.department||"").toLowerCase(),S=!!((V=t.capabilities)!=null&&V.poFinanceHandoff),q=Xn(r.status,o.role,$,h).filter(p=>!(S&&r.status==="Approved"&&p==="Ordered")),L=(r.department||"").toLowerCase()==="production",C=d&&r.status==="Approved",j=d&&((H=t.capabilities)==null?void 0:H.financeHandoff)&&!r.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(r.status)&&!["Paid","FOC / Free"].includes(r.paymentStatus)&&(!S||r.status!=="Approved"&&r.poNo),P=!["Paid","FOC / Free"].includes(r.paymentStatus),M=S&&!r.financeReleased&&P?"Create PO & send to Finance":"Create purchase order",c=d&&r.poNo&&!r.zohoPoId&&!((ae=t.capabilities)!=null&&ae.financeWorkflow),T=C?"":q.find(p=>!["Rejected","Cancelled","On Hold"].includes(p)),g=q.filter(p=>p!==T),F=p=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[p]||"Mark "+p.toLowerCase(),f=p=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[p]||"arrow",E=["Submitted","Approved","Ordered","In Transit","Received"],O=E.indexOf(r.status),I=(t.vendors||[]).find(p=>String(p.name||"").toLowerCase()===String(r.vendor||"").toLowerCase()),X=r.paymentTerm||I&&I.paymentTerms||"",se=t.lists&&t.lists.paymentTerms||[],le=["",...X&&!se.includes(X)?[X,...se]:se].map(p=>`<option value="${i(p)}" ${p===X?"selected":""}>${p?i(p):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${b("right")}<span>${i(r.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${i(r.id)}</h1>${ft(r.status)}</div>
          <p class="request-subtitle">${i(r.project||r.department||"Purchase request")} · Created ${oe(r.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${j?`<button class="btn primary" id="sendFinanceBtn">${b("wallet")} Send to Finance</button>`:""}
          ${C?`<button class="btn primary" id="makePoBtn">${b("file")} ${i(M)}</button>`:""}
          ${T?`<button class="btn primary" data-to="${i(T)}">${b(f(T))}${i(F(T))}</button>`:""}
          ${m?`<a class="btn" href="#/new/${i(r.id)}">${b("edit")} Edit</a>`:""}
          ${g.length||c?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${b("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${c?`<button class="btn" id="zohoPushBtn">${b("arrow")} Send to Zoho Books</button>`:""}
              ${g.map(p=>`<button class="btn ${["Rejected","Cancelled"].includes(p)?"danger":""}" data-to="${i(p)}">${b(f(p))}${i(F(p))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${i(r.status)}">
        <div class="progress-label"><b>Request progress</b><span>${O===-1?"Currently "+i(r.status.toLowerCase()):O===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${E.map((p,N)=>`<li class="${N<O?"done":N===O?"current":""}" ${N===O?'aria-current="step"':""}><span class="step-dot">${N<O?b("check"):N+1}</span><span>${i(p)}</span></li>`).join("")}</ol>
      </section>

      ${C&&Ke?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        ${S?`<p class="pd-sub">Record your PO reference below.${!r.financeReleased&&P?" Saving marks this request Ordered and sends it to all Finance members. The first member to mark In progress takes responsibility.":P?" Existing Finance responsibility and payment records will stay unchanged.":" No payment handoff is needed for a paid or free request."}</p>`:""}
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${i(r.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${i(Je(r.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${le}</select>
          </label>
          ${I&&I.paymentTerms&&!r.paymentTerm?`<div class="full pd-sub">Prefilled from ${i(I.name)}'s vendor record — change it here if this order is different.</div>`:""}
          <div class="full" style="display:flex;gap:8px">
            <button class="btn primary" type="submit">${S?i(M):"Create PO &amp; mark Ordered"}</button>
            <button class="btn" type="button" id="poCancelBtn">Cancel</button>
          </div>
        </form>
        </div>
      </div>`:""}

      <div class="detail-columns"><div class="detail-main">
      <div class="card">
        <h2>General information</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${ne("Department",i(r.department))}
          ${ne("Project",i(r.project))}
          ${ne("Vendor",i(r.vendor))}
          ${ne("Purpose",i(r.purpose))}
          ${ne("Priority",i(r.priority))}
          ${y?ne("Payment status",i(r.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${Pa("Requested by",Sa(r.requestedByName,r.requesterEmail,r.approverEmail,r.approvedByName),r.requesterEmail,"Created on "+oe(r.createdAt))}
          ${r.approverEmail||r.approvedByName?Pa("Approved by",Sa(r.approvedByName,r.approverEmail,r.requesterEmail,r.requestedByName),r.approverEmail,r.approvedAt?"on "+oe(r.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(r.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${L?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(r.items||[]).map(p=>`<tr>
            <td>${i(p.itemNo)}</td>
            <td class="wrap">${i(p.description)}</td>${L?`<td>${i(p.partNo)}</td>`:""}<td>${i(p.materialType)}</td>
            <td>${i([p.qty,p.unit].filter(Boolean).join(" "))}</td>
            <td>${p.unitPrice?i(Ve(r.currency||"INR",Number(p.unitPrice))):"—"}</td>
            <td>${p.lineTotal?i(Ve(r.currency||"INR",Number(p.lineTotal))):"—"}</td>
            <td>${p.purchaseLink?`<a href="${i(p.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${p.datasheetDoc?` <a href="${i(p.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${an(p.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${L?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${r.totalAmount?i(Ve(r.currency||"INR",Number(r.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${ne("Expected",oe(r.expectedDate))}
          ${ne("Received",oe(r.receivedAt))}
          ${ne("Tracking",ts(r))}
          ${ne("Notes",i(r.notes))}
        </div>
        </div>
      </div>

      ${y&&((_=t.capabilities)!=null&&_.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(r.status)?`<section class="card payment-work-card"><h2>Payment work</h2><div class="pd-body"><p>${r.financeReleased?"Review responsibility, payment history and supporting files.":"With admin until the PO is ready to send to Finance."}</p><button class="btn" type="button" id="openPaymentDetails">${b("wallet")} View payment details ${b("right")}</button></div></section>`:""}

      ${y?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${ne("PO reference",[i(r.poNo),oe(r.poDate)].filter(Boolean).join(" · "))}
          ${ne("Invoice / order #",[i(r.invoiceNo),oe(r.invoiceDate)].filter(Boolean).join(" · "))}
          ${ne("Payment term",i(r.paymentTerm))}
          ${ne("Quotation / PI",r.quotationDoc?`<a href="${i(r.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${ne("Zoho Books PO",r.zohoPoNumber?i(r.zohoPoNumber):"")}
        </div>
        </div>
      </div>`:""}

      ${o.role==="admin"?`
      <div class="card pd-danger">
        <div>
          <b>Delete this purchase request</b>
          <div class="pd-sub">Deletion is permanent and cannot be undone. Item rows and this PR leave all active views.</div>
        </div>
        <button class="btn danger" id="devDelete">Delete PR permanently</button>
      </div>`:""}
      </aside></div>
    </div>`,rn(e),(Z=e.querySelector("#openPaymentDetails"))==null||Z.addEventListener("click",p=>Ue(t,r.id,"payment",p.currentTarget));const w=e.querySelector("#requestMore");e.onclick=p=>{w&&!w.contains(p.target)&&(w.open=!1)},e.onkeydown=p=>{p.key==="Escape"&&(w!=null&&w.open)&&(p.stopPropagation(),w.open=!1,w.querySelector("summary").focus())},w==null||w.addEventListener("focusout",p=>{w.contains(p.relatedTarget)||(w.open=!1)}),e.querySelectorAll("[data-to]").forEach(p=>p.onclick=async()=>{const N=p.dataset.to;if((N==="Rejected"||N==="Cancelled")&&!confirm(`Mark ${r.id} as ${N}?`))return;const G=p.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(re=>{re.disabled=!0}),p.innerHTML=b("refresh","spin")+" Updating…";try{const re=await Y("transition",{id:r.id,to:N});U(r.id+" → "+N),await n(re)}catch(re){U(re.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(de=>{de.disabled=!1}),p.innerHTML=G}});const x=e.querySelector("#makePoBtn"),W=e.querySelector("#sendFinanceBtn");W&&(W.onclick=async()=>{W.disabled=!0;try{const p=await Y("financeRelease",{id:r.id});qa(),await n(p),U(r.id+" sent to Finance")}catch(p){U(p.message,!0),W.disabled=!1}}),x&&(x.onclick=()=>{var p,N;Ke=!0,et(e,t,s,a),yt((p=e.querySelector("#poForm"))==null?void 0:p.closest(".card")),(N=e.querySelector("[name=poNo]"))==null||N.focus()});const Q=e.querySelector("#poCancelBtn");Q&&(Q.onclick=()=>{Ke=!1,et(e,t,s,a)});const ee=e.querySelector("#poForm"),k=ee?tn(ee):null;ee&&(ee.onsubmit=async p=>{var ie,J;if(p.preventDefault(),!k())return;const N=new FormData(ee),G=String(N.get("poNo")||"").trim();if(!G)return;const re=ee.querySelector('button[type="submit"]');re.disabled=!0;let de;try{const ce={poNo:G,poDate:N.get("poDate")||"",paymentTerm:N.get("paymentTerm")||""};let Ae;(ie=t.capabilities)!=null&&ie.singleStepOrder?Ae=await Y("order",{id:r.id,...ce}):(de=await Y("update",{id:r.id,updates:ce}),Ae=await Y("transition",{id:r.id,to:"Ordered"})),U((J=Ae.task)!=null&&J.released?`PO ${G} saved. Request sent to Finance.`:`PO ${G} saved. Request marked Ordered.`),Ke=!1,await n(Ae)}catch(ce){de&&await n(de),U(ce.message,!0),re.disabled=!1}});const R=e.querySelector("#zohoPushBtn");R&&(R.onclick=async()=>{R.disabled=!0;try{const{pr:p}=await Y("zohoPushPo",{id:r.id});U(r.id+" → Zoho Books PO "+p.zohoPoNumber),await n({pr:p})}catch(p){U(p.message,!0),R.disabled=!1}});const v=e.querySelector("#devDelete");v&&(v.onclick=async()=>{if(confirm("Permanently DELETE "+r.id+"? This cannot be undone.")){v.disabled=!0;try{const p=await Y("delete",{id:r.id});U(r.id+" deleted"),location.hash="#/",await n(p)}catch(p){U(p.message,!0),v.disabled=!1}}})}let we=null;const Ca=e=>{var t,s,a,n;return[(s=(t=e.me)==null?void 0:t.email)==null?void 0:s.toLowerCase(),(a=e.me)==null?void 0:a.role,(n=e.me)==null?void 0:n.department].join("|")},Ge=(e,t)=>{var s,a,n;return!!t&&((s=e.capabilities)==null?void 0:s.financeWorkflow)&&(((a=e.me)==null?void 0:a.role)==="admin"||((n=e.me)==null?void 0:n.role)==="finance"&&t.financeReleased)};function us(e=!1){return we?we.close(e):!0}function Ue(e,t,s="request",a=document.activeElement){const n=e.prs.find(g=>g.id===t);if(!n||s==="payment"&&!Ge(e,n))return;if((we==null?void 0:we.id)===t){we.select(s);return}if(!us())return;let r=e,o=!1,d=!1,$=s;const y=Ca(e),m=new AbortController,h=m.signal,S=document.createElement("div");S.className="request-panel-layer",S.innerHTML=`<div class="request-panel-backdrop" aria-hidden="true"></div>
    <section class="request-panel" role="dialog" aria-modal="true" aria-labelledby="requestPanelTitle">
      <header class="request-panel-header"><div><span class="eyebrow">PURCHASE WORKSPACE</span><h2 id="requestPanelTitle">${i(t)}</h2><p>${i(n.vendor||n.project||n.department||"Request details")}</p></div><button class="iconbtn" id="closeRequestPanel" aria-label="Close request details">${b("close")}</button></header>
      <div class="request-panel-tabs" role="tablist" aria-label="Request information"><button id="panelRequestTab" role="tab" data-panel-tab="request" aria-controls="requestPanelBody">${b("file")} Request details</button>${Ge(e,n)?`<button id="panelPaymentTab" role="tab" data-panel-tab="payment" aria-controls="requestPanelBody">${b("wallet")} Payment work</button>`:""}</div>
      <div class="request-panel-body" id="requestPanelBody" role="tabpanel"></div>
      <div class="request-panel-footer">${b("shield")} <span>${Ge(e,n)?"Payment records are private to Admin and Finance.":"Your request, items and delivery updates in one place."}</span></div>
    </section>`,document.body.append(S);const q=document.querySelector("#app"),L=(q==null?void 0:q.inert)||!1;q&&(q.inert=!0),document.body.classList.add("request-panel-open");const C=S.querySelector("#requestPanelBody"),j=()=>d||C.querySelector('button[type="submit"]:disabled, [data-to]:disabled')?(U("Please wait for the current save to finish."),!1):!o||confirm("Discard the unsaved changes in this panel?"),P=(g=!1)=>{var f;if(!g&&!j())return!1;m.abort(),T(),S.remove(),we=null,document.body.classList.remove("request-panel-open"),q&&(q.inert=L);const F=[...document.querySelectorAll("[data-payment-id], [data-open-request]")].find(E=>(E.dataset.paymentId||E.dataset.openRequest)===t);return(f=a!=null&&a.isConnected?a:F)==null||f.focus({preventScroll:!0}),!0},M=()=>{if(!S.isConnected)return;S.querySelectorAll("[data-panel-tab]").forEach(F=>{const f=F.dataset.panelTab===$;F.setAttribute("aria-selected",String(f)),F.tabIndex=f?0:-1}),C.setAttribute("aria-labelledby",$==="payment"?"panelPaymentTab":"panelRequestTab");const g=document.createElement("div");C.replaceChildren(g),C.scrollTop=0,$==="payment"?cs(g,r,t,{detailOnly:!0,onRequest:()=>c("request"),onBusy:F=>{d=F},onSaved:()=>{o=!1}}):et(g,r,t,{onSaved:()=>{o=!1,M()}})},c=g=>{var f;if(g===$||!j())return;const F=r.prs.find(E=>E.id===t);g==="payment"&&!Ge(r,F)||($=g,o=!1,M(),(f=S.querySelector(`[data-panel-tab="${g}"]`))==null||f.focus())},T=z.subscribe(g=>{const F=g.prs.find(E=>E.id===t);if(Ca(g)!==y||!F||$==="payment"&&!Ge(g,F)){P(!0);return}const f=r.prs.find(E=>E.id===t)!==F||r.lastSync!==g.lastSync;r=g,f&&!o&&!d&&!g.loading&&!g.err&&M()});we={id:t,close:P,select:c},S.querySelector("#closeRequestPanel").onclick=()=>P(),S.querySelector(".request-panel-backdrop").onclick=()=>P(),S.querySelectorAll("[data-panel-tab]").forEach(g=>g.onclick=()=>c(g.dataset.panelTab)),C.addEventListener("input",()=>{o=!0},{signal:h}),C.addEventListener("change",()=>{o=!0},{signal:h}),S.addEventListener("click",g=>{g.target.closest('a[href^="#/new/"]')&&(j()?o=!1:(g.preventDefault(),g.stopPropagation()))},{capture:!0,signal:h}),S.addEventListener("keydown",g=>{if(g.key==="Escape"&&(g.preventDefault(),P()),["ArrowLeft","ArrowRight"].includes(g.key)&&g.target.matches("[role=tab]")&&(g.preventDefault(),c($==="payment"?"request":"payment")),g.key==="Tab"){const F=[...S.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex="0"]')].filter(O=>O.getClientRects().length&&!O.closest("[hidden]")),f=F[0],E=F.at(-1);g.shiftKey&&document.activeElement===f?(g.preventDefault(),E==null||E.focus()):!g.shiftKey&&document.activeElement===E&&(g.preventDefault(),f==null||f.focus())}},{signal:h}),window.addEventListener("hashchange",()=>P(!0),{signal:h}),window.addEventListener("beforeunload",g=>{(o||d)&&(g.preventDefault(),g.returnValue="")},{signal:h}),M(),S.querySelector("#closeRequestPanel").focus()}function kt(e,t){var a,n;if(!["admin","finance"].includes(t==null?void 0:t.role)||t.role==="finance"&&!e.financeReleased)return null;let s=((a=e.paymentWork)==null?void 0:a.state)||(e.financeReleased?"View details":["Approved","Ordered","In Transit","Received"].includes(e.status)?"Awaiting admin":"Not ready");return e.financeReleased&&!["Approved","Ordered","In Transit","Received"].includes(e.status)?s="Blocked":s!=="Needs review"&&["Paid","FOC / Free"].includes(e.paymentStatus)&&(s="Completed"),{state:s,owner:((n=e.paymentWork)==null?void 0:n.owner)||""}}const ms=["Submitted","Approved","Rejected"],Ta=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],Mt=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),u={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,paymentStage:"",filters:Mt()},ze=25,ps={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let It;function ys(e,t){u.tab=t==="admin"?"all":"dept",t==="admin"&&(u.statuses=e==="pending"?["Submitted"]:[...je]),u.sel=["pending","unpaid"].includes(e)?e:"total",u.page=1,u.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function fe(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Ft(e,t),s&&yt(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const La=e=>String(e||"").slice(0,10);function hs(e){const t=u.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&La(e.createdAt)<t.from||t.to&&La(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Ft(e,t){clearTimeout(It),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          ${b("plus")} New request
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,fs(e.querySelector("#tabBody"),e,t)}const Pe=e=>e.length?e.map(([t,s])=>me(t,s)).join(" + "):"—";function fs(e,t,s){var Qt,Xt,ea,ta,aa,na,sa,ra,ia,oa,la;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",o=a.role==="finance",d=[(Qt=a.email)==null?void 0:Qt.toLowerCase(),a.role,(Xt=a.department)==null?void 0:Xt.toLowerCase()].join("|");u.viewer!==d&&Object.assign(u,{viewer:d,tab:r?"all":o&&((ea=s.capabilities)!=null&&ea.paymentDrawer)?"finance":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,paymentStage:"",filters:Mt()});const $=n?["mine","dept","approved"]:r?["all","mine"]:o?["mine",(ta=s.capabilities)!=null&&ta.financeHandoff?"finance":"payments"]:["mine"];$.includes(u.tab)||(u.tab="mine");const y=r&&u.statuses.length===1&&u.statuses[0]==="Approved",m=u.statuses.length===je.length,h=u.tab==="dept",S=u.tab==="approved",q=u.tab==="all",L=u.tab==="payments",C=u.tab==="finance",j=Hn(s.prs,a.email),P=o?s.prs.filter(l=>l.financeReleased):[],M=n?$a(s.prs,a.email):[],c=n?Ja(s.prs,a.department):[],T=o?Vn(s.prs):[],g=h?c:S?M:q?s.prs:C?P:L?T:j,F=r&&!m?g.filter(l=>u.statuses.includes(l.status)):g,f=ga(F),E=n?c.filter(ut.pending):[],O=r?ga(s.prs):n?{pending:E.length,highPriority:E.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,I=y?[{key:"total",n:f.total,l:"Ready to purchase",s:q?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:f.spendTotals.length?me(...f.spendTotals[0]):"-",l:"Approved value",s:f.spendTotals.length>1?"+ "+Pe(f.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:L?[{key:"total",n:f.total,l:"Awaiting payment",s:Pe(f.unpaidTotals)},{key:"transit",n:f.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:f.receivedPct+"%",l:"Received",s:f.received+" of "+f.total,cls:"go"},{key:"spend",n:f.spendTotals.length?me(...f.spendTotals[0]):"—",l:"Total value",s:f.spendTotals.length>1?"+ "+Pe(f.spendTotals.slice(1)):""}]:h?[{key:"total",n:f.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:f.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:f.unpaidCount,l:"Unpaid",s:Pe(f.unpaidTotals),cls:"bad"},{key:"transit",n:f.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:f.receivedPct+"%",l:"Received",s:f.received+" of "+f.total,cls:"go"},{key:"spend",n:f.spendTotals.length?me(...f.spendTotals[0]):"—",l:"Total spend",s:f.spendTotals.length>1?"+ "+Pe(f.spendTotals.slice(1)):""}]:[{key:"total",n:f.total,l:S?"Approved PRs":r&&!m?"Selected PRs":q?"All PRs":"Total PRs",s:S?"across all requesters":r&&!m?"Matching your selected statuses":q?"every department":""},...S?[]:[{key:"pending",n:f.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:f.unpaidCount,l:"Unpaid",s:Pe(f.unpaidTotals),cls:"bad"},{key:"transit",n:f.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:f.receivedPct+"%",l:"Received",s:f.received+" of "+f.total,cls:"go"},{key:"spend",n:f.spendTotals.length?me(...f.spendTotals[0]):"—",l:S?"Approved spend":"Total spend",s:f.spendTotals.length>1?"+ "+Pe(f.spendTotals.slice(1)):""}];if(!r&&(!o||u.tab==="mine")){const l=I.findIndex(A=>A.key==="unpaid");l>=0&&I.splice(l,1)}if(q)for(const l of _n(F))I.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+vt(l.email),s:l.email,cls:"go"});I.some(l=>l.key===u.sel)||(u.sel="total");const X=(u.sel.startsWith("ap:")?$a(F,u.sel.slice(3)):F.filter(ut[u.sel])).sort((l,A)=>(A.createdAt||"").localeCompare(l.createdAt||"")),se=I.find(l=>l.key===u.sel),le=[...new Set(F.map(l=>l.department).filter(Boolean))].sort(),w=[...new Set(F.map(l=>l.vendor).filter(Boolean))].sort();u.filters.dept&&!le.includes(u.filters.dept)&&(u.filters.dept=""),u.filters.vendor&&!w.includes(u.filters.vendor)&&(u.filters.vendor="");const x=!!((aa=s.capabilities)!=null&&aa.financeWorkflow)&&(r||o),W=X.filter(hs).filter(l=>{var A,B;return!x||!u.paymentStage||(u.paymentStage==="Mine"?((A=kt(l,a))==null?void 0:A.owner.toLowerCase())===a.email.toLowerCase():((B=kt(l,a))==null?void 0:B.state)===u.paymentStage)}),Q=Object.values(u.filters).some(Boolean)||!!u.paymentStage,ee=Math.max(1,Math.ceil(W.length/ze));u.page=Math.min(Math.max(1,u.page),ee);const k=W.slice((u.page-1)*ze,u.page*ze),R=["dept","vendor","from","to"].filter(l=>u.filters[l]).length,v=m?"All statuses":u.statuses.join(" + "),V=r?(q?m?"All requests":y?"Approved requests":v:"Your requests")+(q?"":" · "+v):C?"Requests sent by admin":h?"Department requests":S?"Approved by you":L?"Payment queue":"Your requests",H=(l,A,B)=>`<button type="button" id="scope-${l}" class="adm-tab ${u.tab===l?"active":""}" data-tab="${l}" aria-pressed="${u.tab===l}">${A} <span>${B}</span></button>`,ae=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),_=l=>{const A=r?je:n&&l.status==="Submitted"&&ae(l)?ms:null;return A?`<select class="status-sel" data-status="${i(l.status)}" aria-label="Status for ${i(l.id)}" data-id="${i(l.id)}">${A.map(B=>`<option ${B===l.status?"selected":""}>${i(B)}</option>`).join("")}</select>`:ft(l.status)},Z=l=>`<select class="pay-sel" aria-label="Payment status for ${i(l.id)}" data-id="${i(l.id)}">${Qa.map(A=>`<option ${A===l.paymentStatus?"selected":""}>${i(A)}</option>`).join("")}</select>`,p=l=>{const A=kt(l,a);return A?`<button type="button" class="payment-work-button" data-payment-id="${i(l.id)}" aria-label="Payment work for ${i(l.id)}: ${i(A.state)}"><span class="finance-status" data-state="${i(A.state)}">${i(A.state)} ${b("right")}</span>${A.owner?`<small title="${i(A.owner)}">${i(A.owner)}</small>`:""}</button>`:'<span class="muted">—</span>'},N=r?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${m?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${m}">All <span>${g.length}</span></button>
        ${Ta.map((l,A)=>`<button type="button" class="view-pill ${!m&&u.statuses.includes(l)?"selected":""}" id="status-pill-${A}" data-admin-status="${i(l)}" aria-pressed="${!m&&u.statuses.includes(l)}">${l==="Submitted"?"Pending approval":i(l)}<span>${g.filter(B=>B.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${q?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${q}">Everyone</button>
        <button type="button" class="view-pill ${q?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!q}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${b("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${i(V)}</span><span class="view-result-count" role="status">${F.length} ${F.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((na=s.capabilities)!=null&&na.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Open a payment status below. Mark In progress to take responsibility.</p></div><button class="btn" type="button" id="showFinanceWork">${b("wallet")} View payment work ${b("arrow")}</button></section>`:""}
    ${!r&&$.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${H("mine","Your requests",j.length)}
      ${n?H("dept",i(a.department||"Your department"),c.length)+H("approved","Approved by you",M.length):""}
      ${o?(sa=s.capabilities)!=null&&sa.financeHandoff?H("finance","Sent to Finance",P.length):H("payments","Awaiting payment",T.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${y?"approved-kpis":""}" aria-label="Filter requests by summary">${I.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===u.sel?"sel":""}" data-key="${i(l.key)}" aria-pressed="${l.key===u.sel}">
        <span class="kpi-top"><span class="l">${i(l.l)}</span>${b(ps[l.key])}</span>
        <span class="v">${i(String(l.n))}</span><span class="s">${i(l.s||(l.key==="total"?V:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${O?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?i(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${O.pending?"":"disabled"}><span class="attention-icon">${b("clock")}</span><span><b>${O.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${O.pending?"Open approval queue":"No approvals waiting"}</small></span>${b("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${O.unpaidCount?"":"disabled"}><span class="attention-icon">${b("wallet")}</span><span><b>${O.unpaidCount} awaiting payment</b><small>${O.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${b("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${b("info")}</span><span><b>${O.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${N}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${W.length}</span></h2><p>${i(V)} · ${u.sel==="total"?"Latest first":i(se.l)}</p></div><span class="table-hint">Select a request to view details ${b("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${b("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${i(u.filters.q)}"></label>
        ${r?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${je.map(l=>`<option value="${i(l)}" ${u.filters.status===l?"selected":""}>${i(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${R?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${u.moreFilters}" aria-controls="advancedFilters">${b("filter")} Filters ${R?`<span class="count-badge">${R}</span>`:""}</button>
        ${Q?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${u.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${le.map(l=>`<option value="${i(l)}" ${u.filters.dept===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${w.map(l=>`<option value="${i(l)}" ${u.filters.vendor===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${i(u.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${i(u.filters.to)}"></label>
        ${q?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${I.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${i(l.key)}" ${u.sel===l.key?"selected":""}>${i(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${L?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
        ${x?"<th>Payment work</th>":""}
      </tr></thead><tbody>
        ${k.map(l=>`<tr class="rowlink ${L?"payment-row":""}" data-id="${i(l.id)}">
          <td class="request-id"><a href="#/pr/${i(l.id)}" data-open-request="${i(l.id)}">${i(l.id)}</a></td>
          <td class="request-date">${oe(l.createdAt)}</td>
          ${L?`<td>${i(l.vendor)}</td><td>${i(l.poNo||"—")}</td><td>${i(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${i(l.department)}</td><td class="wrap request-item">${i(l.item)}</td><td class="request-vendor">${i(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?i(me(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${L?Z(l):_(l)}</td>
          ${x?`<td class="payment-work-cell">${p(l)}</td>`:""}
        </tr>`).join("")||`<tr><td colspan="${x?8:7}"><div class="empty-state">${b(Q?"search":"file")}<b>${Q?"No matching requests":y?"No requests ready for purchasing":r&&!m?"No requests with these statuses":"No requests here yet"}</b><span>${Q?"Try a different search or clear your filters.":y?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":r&&!m?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${Q?'<button class="btn" id="emptyClear">Clear filters</button>':r&&!m?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${W.length?(u.page-1)*ze+1:0}–${Math.min(u.page*ze,W.length)} of ${W.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${u.page===1?"disabled":""}>${b("left")}</button><span>Page ${u.page} of ${ee}</span><button class="btn" id="dashNext" aria-label="Next page" ${u.page===ee?"disabled":""}>${b("right")}</button></div></div>
    </section>`;const G=l=>{u.tab=l,u.sel="total",u.page=1,r&&(u.filters=Mt()),fe(t,s)};(ra=e.querySelector("#showFinanceWork"))==null||ra.addEventListener("click",()=>{var l,A,B;u.paymentStage="",G((l=s.capabilities)!=null&&l.financeHandoff?"finance":"payments"),(B=(A=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(A,{block:"start",behavior:"smooth"})}),x&&(e.querySelector(".table-scroll").insertAdjacentHTML("beforebegin",`<div class="payment-work-filters"><label>Payment work<select id="dashPaymentWork" aria-label="Filter payment work"><option value="">All payment work</option>${["Awaiting admin","Pending","In progress","Mine","On hold","Needs review","Blocked","Completed","Not ready"].map(l=>`<option value="${l}" ${u.paymentStage===l?"selected":""}>${l==="Mine"?"Assigned to me":l}</option>`).join("")}</select></label><span class="finance-note">Select a status to open details</span></div>`),e.querySelector("#dashPaymentWork").onchange=l=>{u.paymentStage=l.target.value,u.page=1,fe(t,s)},e.querySelectorAll("[data-payment-id]").forEach(l=>l.onclick=()=>Ue(s,l.dataset.paymentId,"payment",l))),e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>G(l.dataset.tab));const re=()=>{u.statuses=[...je],G(u.tab),t.querySelector("#showAllRequests").focus()};(ia=e.querySelector("#showAllRequests"))==null||ia.addEventListener("click",re),(oa=e.querySelector("#emptyAllRequests"))==null||oa.addEventListener("click",()=>{u.tab="all",re()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const A=l.dataset.adminStatus;if(m)u.statuses=[A];else if(!u.statuses.includes(A))u.statuses=Ta.filter(B=>B===A||u.statuses.includes(B));else if(u.statuses.length>1)u.statuses=u.statuses.filter(B=>B!==A);else return;G(u.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>G(l.dataset.adminScope)),(la=e.querySelector("#resetAdminView"))==null||la.addEventListener("click",()=>{u.statuses=["Approved"],u.paymentStage="",G("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{u.sel=l.dataset.key,u.page=1,fe(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,te;if(u.paymentStage="",!r&&!(n&&l.dataset.queue==="pending"))return;ys(l.dataset.queue,a.role),fe(t,s);const A=t.querySelector(".requests-card");A.focus({preventScroll:!0}),(te=A.scrollIntoView)==null||te.call(A,{block:"start",behavior:(B=window.matchMedia)!=null&&B.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=A=>{A.target.closest("a, select, button")||Ue(s,l.dataset.id,"request",l.querySelector("[data-open-request]"))}),e.querySelectorAll("[data-open-request]").forEach(l=>l.onclick=A=>{A.ctrlKey||A.metaKey||A.shiftKey||A.altKey||(A.preventDefault(),Ue(s,l.dataset.openRequest,"request",l))}),e.querySelector("#dashMoreFilters").onclick=()=>{u.moreFilters=!u.moreFilters,e.querySelector("#advancedFilters").hidden=!u.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(u.moreFilters))};const de=e.querySelector("#dashApprover");de&&(de.onchange=()=>{u.sel=de.value,u.page=1,fe(t,s)});const ie=l=>{var A,B;u.page+=l,fe(t,s),(B=(A=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(A,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>ie(-1),e.querySelector("#dashNext").onclick=()=>ie(1);const J=(l,A)=>{u.filters[l]=A,u.page=1,fe(t,s)};e.querySelector("#dashQ").oninput=l=>{u.filters.q=l.target.value,u.page=1,clearTimeout(It),It=setTimeout(()=>{t.isConnected&&fe(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>J("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>J("vendor",l.target.value);const ce=e.querySelector("#dashStatus");ce&&(ce.onchange=l=>J("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>J("from",l.target.value),e.querySelector("#dashTo").onchange=l=>J("to",l.target.value);const Ae=()=>{u.paymentStage="",u.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},u.page=1,u.sel="total",fe(t,s)},Zt=e.querySelector("#dashFilterClear"),Jt=e.querySelector("#emptyClear");Zt&&(Zt.onclick=Ae),Jt&&(Jt.onclick=Ae),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=A=>A.stopPropagation(),l.onchange=async()=>{var ge;const A=l.dataset.id,B=s.prs.find(Re=>Re.id===A),te=l.value;if(!(!B||te===B.status)){if((ge=s.capabilities)!=null&&ge.poFinanceHandoff&&B.status==="Approved"&&te==="Ordered"){l.value=B.status,Ue(s,A,"request",l),U("Create the PO to mark this request Ordered and send it to Finance.");return}if((te==="Rejected"||te==="Cancelled")&&!confirm(`Mark ${A} as ${te}?`)){l.value=B.status;return}l.disabled=!0;try{let Re;a.role==="admin"&&!es(B.status,te)?Re=await Y("update",{id:A,updates:{status:te}}):Re=await Y("transition",{id:A,to:te}),U(`${A} → ${te}`),await z.applyResult(Re)}catch(Re){U(Re.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=A=>A.stopPropagation(),l.onchange=async()=>{const A=l.dataset.id,B=s.prs.find(ge=>ge.id===A),te=l.value;if(!(!B||te===B.paymentStatus)){l.disabled=!0;try{const ge=await Y("update",{id:A,updates:{paymentStatus:te}});U(`${A} payment → ${te}`),await z.applyResult(ge)}catch(ge){U(ge.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function _t(e,t){const s=String(t||"").toLowerCase();return[...vs(e).get(s)||[]]}let Ea=null,We=new Map;function vs(e){if(Ea!==e){Ea=e,We=new Map;for(const t of e){const s=String(t.vendor||"").toLowerCase();We.has(s)||We.set(s,[]),We.get(s).push(t)}}return We}function Kt(e,t){const s=_t(e,t),a=s.filter(ut.spend),n={};for(const r of a){const o=Number(r.amount);if(!r.amount||!isFinite(o))continue;const d=r.currency||"INR";n[d]=(n[d]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((r,o)=>o[1]-r[1]),unpaid:s.filter(ut.unpaid).length,lastOrder:s.reduce((r,o)=>{const d=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(d)&&d>r?d:r},"")}}function ln(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(_t(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const bs=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],gs={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},$s=1,ws=.7,dn=.5,Ss=.4,ks=.3,qs=4,As=e=>e.length>=7?2:e.length>=qs?1:0,pt=e=>String(e??"").toLowerCase().trim();function Rs(e,t){const s=e[t];return pt(Array.isArray(s)?s.join(" "):s)}function cn(e){return pt(e).split(/[\s,]+/).filter(Boolean)}function Ps(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function Da(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return $s;if(s.some(n=>n.startsWith(t)))return ws;if(e.includes(t))return dn;const a=As(t);return a&&s.some(n=>Ps(n,t)<=a)?ks:0}function Cs(e,t){const s=Da(e,t);if(s)return s;const a=gs[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):Da(e,r)>=dn)?Ss:0}function Ts(e,t){const s=Array.isArray(t)?t:cn(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:o,weight:d}of bs)r=Math.max(r,Cs(Rs(e,o),n)*d);if(!r)return 0;a+=r}return a}function un(e,t){const s=cn(t);return s.length?(e||[]).map(a=>({v:a,score:Ts(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||pt(a.v.displayName||a.v.name).localeCompare(pt(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function $t(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${b("search")}
        <input aria-label="${i(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${i(t)}" value="${i(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${b("close")}
        </button>
      </div>
    </div>`}const Gt=(...e)=>i(e.filter(Boolean).join(" ").toLowerCase());function zt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${i(t)}</td></tr>`}function Wt(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const o=e.querySelector("#"+n);if(!o)return;const d=o.closest(".adm-card"),$=d.querySelector(".admSearchClear"),y=()=>Ls(d,t(),a,r);o.oninput=()=>{s(o.value),$.hidden=!o.value,y()},o.onkeydown=m=>{m.key==="Escape"&&o.value&&(o.value="",o.oninput())},$.onclick=()=>{o.value="",o.oninput(),o.focus()},y()}function Ls(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let d=null;r.forEach(m=>{m.hidden=n?o?!o.has(m.dataset.name):!m.dataset.search.includes(n):!1,m.classList.remove("last-visible"),m.hidden||(d=m)}),d&&d.classList.add("last-visible");const $=e.querySelector(".adm-nomatch");$&&($.hidden=!!d||!r.length);const y=e.querySelector(".adm-count");y&&(y.textContent=s(r.filter(m=>!m.hidden).length,r.length))}let Oe="",Te=1;const qe=25,qt=new Map;function mn(e,t,s,a){return`<div class="table-footer"><span role="status">${s?(e-1)*qe+1:0}–${Math.min(e*qe,s)} of ${s} ${a}</span><div class="pager"><button class="btn" data-prev ${e===1?"disabled":""}>Previous</button><span>Page ${e} of ${t}</span><button class="btn" data-next ${e===t?"disabled":""}>Next</button></div></div>`}const pn={Domestic:"dom",Foreign:"for",Mixed:"mix"},Es=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function yn(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${i(Es(e.displayName||e.name))}${t?`<img src="${i(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Ds(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${i(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Ns(e,t){const s=Kt(e.prs,t.name),a=ln(t,e.prs),n=s.spendTotals.length?me(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${i(t.name)}">
      <div class="vc-top">
        ${yn(t)}
        <div class="vc-title">
          <b>${i(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${i(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${pn[a]}">${i(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${i(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${oe(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Ds(t)}</div>
    </a>`}const Ms=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function At(e,t){const s=Ms(e.vendors),a=t.trim()?un(s,t):s,n=Math.max(1,Math.ceil(a.length/qe));return Te=Math.min(Te,n),a.length?a.slice((Te-1)*qe,Te*qe).map(r=>Ns(e,r)).join("")+`<div style="grid-column:1/-1">${mn(Te,n,a.length,"vendors")}</div>`:s.length?`<div class="card" style="color:var(--mut)">No vendors match “${i(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Is(e,t,s){if(s)return Ot(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${$t(Oe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${At(t,Oe)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),o=()=>{Oe=n.value,Te=1,r.hidden=!Oe,a.innerHTML=At(t,Oe)};a.onclick=d=>{d.target.closest("[data-prev], [data-next]")&&(Te+=d.target.closest("[data-next]")?1:-1,a.innerHTML=At(t,Oe))},n.oninput=o,n.onkeydown=d=>{d.key==="Escape"&&n.value&&(n.value="",o())},r.onclick=()=>{n.value="",o(),n.focus()}}function Ot(e,t,s){const a=(t.vendors||[]).find(h=>h.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${i(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=Kt(t.prs,a.name),r=ln(a,t.prs),o=t.me&&t.me.role==="admin",d=_t(t.prs,a.name).sort((h,S)=>(S.createdAt||"").localeCompare(h.createdAt||"")),$=Math.max(1,Math.ceil(d.length/qe)),y=Math.min(qt.get(s)||1,$),m=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,h])=>h);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${yn(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${i(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${pn[r]}">${i(r.toUpperCase())}</span>`:""}
            </h1>
            <p>${i(a.category||"Vendor")}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          ${o?'<a class="btn" href="#/admin">Edit in Admin</a>':""}
          <a class="btn" href="#/vendors">← All vendors</a>
        </div>
      </div>
      <div class="kpis">
        <div class="kpi"><div class="v">${n.count}</div><div class="l">Purchase requests</div></div>
        <div class="kpi ${n.unpaid?"bad":""}"><div class="v">${n.unpaid}</div><div class="l">Unpaid</div></div>
        <div class="kpi"><div class="v">${n.spendTotals.length?i(me(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?i(n.spendTotals.slice(1).map(([h,S])=>me(h,S)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${oe(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${m.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${m.map(([h,S])=>`<div><span class="vc-l">${i(h)}</span><b>${i(S)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(h=>`<span class="vc-chip">${i(h)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${d.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${d.slice((y-1)*qe,y*qe).map(h=>`<tr class="rowlink" data-id="${i(h.id)}">
            <td style="font-family:var(--mono);font-size:12px">${i(h.id)}</td>
            <td>${oe(h.createdAt)}</td><td>${i(h.department)}</td>
            <td class="wrap">${i(h.item)}</td>
            <td>${h.amount?i(me(h.currency||"INR",Number(h.amount))):"—"}</td>
            <td>${ft(h.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
        ${mn(y,$,d.length,"requests")}
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(h=>h.onclick=()=>location.hash="#/pr/"+h.dataset.id),e.querySelector("[data-prev]").onclick=()=>{qt.set(s,y-1),Ot(e,t,s)},e.querySelector("[data-next]").onclick=()=>{qt.set(s,y+1),Ot(e,t,s)}}const xt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],hn=new Map(xt.map(e=>[e.code,e])),Fs=e=>hn.has(String(e||"").trim().toUpperCase());function Bt(e){const t=hn.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Os(e){const t=String(e||"").trim().toLowerCase(),s=t?xt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...xt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function nt(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",d=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${i(d)}">
      <span class="barlabel">${i(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${i(t(n.value))}</span>
    </div>`}).join("")}</div>`}function Na(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,o=a-n.t-n.b,d=Math.max(...e.map(P=>P.value),1),$=r/(e.length-1),y=P=>n.l+P*$,m=P=>n.t+o-P/d*o,h=e.map((P,M)=>`${M===0?"M":"L"}${y(M).toFixed(1)} ${m(P.value).toFixed(1)}`).join(" "),S=`${h} L${y(e.length-1).toFixed(1)} ${n.t+o} L${y(0).toFixed(1)} ${n.t+o} Z`,q=[0,.5,1].map(P=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-P)).toFixed(1)}" y2="${(n.t+o*(1-P)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),L=Math.ceil(e.length/6)||1,C=e.map((P,M)=>M%L===0||M===e.length-1?`<text x="${y(M).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${M===0?"start":M===e.length-1?"end":"middle"}">${i(P.month.slice(2))}</text>`:"").join(""),j=e.map((P,M)=>`<circle cx="${y(M).toFixed(1)}" cy="${m(P.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${i(P.month)}: ${i(t(P.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${q}
    <path d="${S}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${h}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${j}
    ${C}
  </svg>`}const xs=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],Bs={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},js={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Rt={currency:""};let Ma=null,Ce=new Map;function Us(e,t){const s=e.me||{role:"",department:""},a=s.role==="approver",n=a?Ja(e.prs,s.department):e.prs||[],r=Kn(n),o=r.includes(t)?t:r[0]||"";Ma!==e.prs&&(Ma=e.prs,Ce=new Map);const d=JSON.stringify([s.role,s.department,o,new Date().toDateString()]);if(Ce.has(d))return Ce.get(d);const $=o?wa(n,"spend",o):[],y=wa(n,"count"),m=o?zn(n,o,6).map(T=>({label:T.vendor,value:T.total})):[],h=!a&&o?Gn(n,o).map(T=>({label:T.department,value:T.total})):[],S=Wn(n),q=xs.filter(T=>S[T]).map(T=>({label:T,value:S[T]})),L=Yn(n),C=Jn(n),j=C.map(T=>({label:T.label,value:T.count})),P=C.reduce((T,g)=>T+g.count,0),M=$.reduce((T,g)=>T+g.value,0),c={currencies:r,cur:o,trend:$,volumeTrend:y,vendorRows:m,deptRows:h,statusRows:q,ct:L,agingRows:j,unpaidCount:P,totalSpend:M};return Ce.set(d,c),Ce.size>20&&Ce.delete(Ce.keys().next().value),c}function fn(e,t){var P,M;const s=t.me||{role:"",department:""},a=s.role==="approver",{currencies:n,cur:r,trend:o,volumeTrend:d,vendorRows:$,deptRows:y,statusRows:m,ct:h,agingRows:S,unpaidCount:q,totalSpend:L}=Us(t,Rt.currency);Rt.currency=r;const C=c=>r?me(r,c):String(c);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${i(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${n.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${b("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${n.map(c=>`<option value="${i(c)}" ${c===r?"selected":""}>${i(Bt(c))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${r?i(C(L)):"—"}</div><div class="l">Total spend${r?" · "+i(r):""}</div></div>
        <div class="kpi"><div class="v">${h.avgApprovalDays!=null?h.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${h.avgDeliveryDays!=null?h.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((P=t.me)==null?void 0:P.role)==="admin"?`<div class="kpi ${q?"warn":""}"><div class="v">${q}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${r?" · "+i(r):""}</p></div>
          </div>
          <div class="spend-chart">${o.length?Na(o,{valueFmt:c=>me(r,c),height:180}):`<div class="trend-empty">${b("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${y.length?`<div class="card"><h2>Spend by department${r?" · "+i(r):""}</h2>
          <div class="pd-body">${nt(y,{valueFmt:C})}</div></div>`:""}
        <div class="card"><h2>Top vendors${r?" · "+i(r):""}</h2>
          <div class="pd-body">${nt($,{valueFmt:C})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${nt(m,{colorOf:c=>Bs[c.label]||"var(--mut)"})}</div></div>
        ${((M=t.me)==null?void 0:M.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${nt(S,{colorOf:c=>js[c.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${Na(d,{valueFmt:c=>c+" PR"+(c===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var c;Rt.currency=j.value,fn(e,t),(c=e.querySelector("#insCur"))==null||c.focus()})}const Hs=Qa,Vs={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},lt=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:Vs[t])||[],Pt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ve=(e,t,s)=>`<span class="lblrow">${i(e)}${Pt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${i(Pt[t])}" data-tip="${i(Pt[t])}">?</span>`:""}</span>`;function Le(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${i(n)}" ${n===t?"selected":""}>${n?i(n):"Select…"}</option>`).join("")}function Ct(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <div class="item-row-heading"><b class="item-number">Item ${s+1}</b><button type="button" class="btn danger rmItem">${b("trash")} Remove item</button></div>
    <input type="hidden" name="i_lineTotal" value="${i(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${i(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${i(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${i(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${Le(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${i(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${Le([...new Set([...lt(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${i(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${i(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${i(t.datasheetDoc)}"></label>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${nn(t.attachments)}</div>
  </div>`}function st(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:gt((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function vn(e,t,s){var ee;if(on(e,t,s,vn))return;const a=s?t.prs.find(k=>k.id===s):null,n=a||{},r=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const d=a?n.department||"":o.department||"",$=(t.projects||[]).filter(k=>k.department.toLowerCase()===d.toLowerCase()).map(k=>k.project),y=(t.vendors||[]).filter(k=>(k.departments||[]).some(R=>R.toLowerCase()===d.toLowerCase())),m=k=>{const R=y.find(v=>v.name.toLowerCase()===String(k||"").toLowerCase());return R?R.displayName||R.name:String(k||"")},h=(t.materialTypes||[]).filter(k=>k.department.toLowerCase()===d.toLowerCase()).map(k=>k.materialType),S=d.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${i(n.id)}" style="font-family:var(--mono)">${i(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?i(n.id):"New Purchase Request"}</h1>
          ${a?ft(n.status):""}
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn" href="${a?"#/pr/"+i(n.id):"#/"}">Cancel</a>
          <button class="btn primary pr-save" type="submit" form="prForm" id="prSave">${a?"Save changes":"Submit PR"}</button>
        </div>
      </div>
      <form id="prForm">
        ${d?"":'<div class="card" role="status">A department is needed to create a request. Ask an admin to assign your department in Admin → Users, then refresh.</div>'}
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${ve("Project*","project")} <select name="project" required>${Le($,n.project||"",!0)}</select></label>
              <label>${ve("Purpose","purpose")} <input name="purpose" value="${i(n.purpose)}"></label>
              <div class="pd-field full">${ve("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${i(m(n.vendor))}">
                <input type="hidden" name="vendor" value="${i(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <label class="vendor-manual" id="manualVendorField" hidden>Vendor name<input id="manualVendorName" maxlength="200" placeholder="Enter the vendor's name" autocomplete="off"></label>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ve("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${i(Bt(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${i(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ve("Priority","priority",!0)} <select name="priority">${Le(lt(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${ve("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(Je(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((ee=t.capabilities)!=null&&ee.financeWorkflow)?`
              <label>${ve("Payment status*","payment")} <select name="paymentStatus" required>${Le(Hs,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${Le(je,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${i(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${ve("Notes","notes")} <textarea name="notes" rows="3">${i(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&o.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${i(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${i(Je(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${i(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${i(Je(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${Le(lt(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${i(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${as(n,lt(t,"couriers"))}
          <label>${ve("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(Je(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((k,R)=>Ct(t,k,R,h,S)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${b("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${b("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const q=e.querySelector("#prForm"),L=tn(q),C=e.querySelector("#itemRows"),j=()=>{const k=st(q).map(D=>{const V=On(D.qty,D.unitPrice);return{lineTotal:V!==""?V:D.lineTotal}}),R=xn(k),v=q.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=R===""?"":"Total: "+Ve(v,R)},P=()=>{const k=C.children.length===1;[...C.children].forEach((R,v)=>{R.dataset.i=v,R.querySelector(".item-number").textContent="Item "+(v+1);const D=R.querySelector(".rmItem");D.innerHTML=b(k?"refresh":"trash")+(k?" Clear item":" Remove item"),D.setAttribute("aria-label",(k?"Clear item ":"Remove item ")+(v+1)),D.title=k?"Clear this item and its selected attachments":"Remove this item from the request",D.disabled=e.querySelector("#prSave").disabled})},M=k=>{sn(k.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),k.querySelector(".rmItem").onclick=()=>{if(e.querySelector("#prSave").disabled)return;let R=k.nextElementSibling||k.previousElementSibling;C.children.length>1?k.remove():(k.insertAdjacentHTML("afterend",Ct(t,{},0,h,S)),R=k.nextElementSibling,k.remove(),M(R)),P(),j(),R.querySelector('[name="i_description"]').focus()},k.querySelectorAll("input, select").forEach(R=>R.oninput=j)};[...C.children].forEach(M),P(),j();const c=(k,R,v,{search:D,resolve:V,toLabel:H,allowEmpty:ae,onCommit:_,onSelect:Z})=>{const p=e.querySelector("#"+k),N=e.querySelector("#"+R),G=q.querySelector(`[name="${v}"]`),re=()=>{_&&_()},de=ie=>{const J=D(ie).slice(0,30);N.innerHTML=J.map(ce=>`<div class="curOpt" data-v="${i(ce.value)}"><b>${i(ce.main)}</b> ${i(ce.name||"")}<span>${i(ce.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',N.hidden=!1};p.onfocus=()=>{p.select(),de("")},p.oninput=()=>de(p.value),N.onmousedown=ie=>{ie.preventDefault();const J=ie.target.closest(".curOpt");if(J){if(Z!=null&&Z(J.dataset.v)){N.hidden=!0;return}G.value=J.dataset.v,p.value=H(J.dataset.v),N.hidden=!0,re()}},p.onblur=()=>setTimeout(()=>{N.hidden=!0;const ie=p.value.trim();if(!ie&&ae)G.value="";else{const J=V(ie);J!=null&&(G.value=J)}p.value=H(G.value),re()},120)};c("curSearch","curList","currency",{search:k=>Os(k).map(R=>({value:R.code,main:R.code,name:R.name,sub:R.sym||""})),resolve:k=>{const R=k.split("—")[0].trim().toUpperCase();return Fs(R)?R:null},toLabel:k=>Bt(k),onCommit:j});const T=k=>{const R=String(k||"").trim().toLowerCase();return y.filter(v=>!R||v.name.toLowerCase().includes(R)||(v.displayName||"").toLowerCase().includes(R)||(v.category||"").toLowerCase().includes(R)).sort((v,D)=>(v.displayName||v.name).localeCompare(D.displayName||D.name)).slice(0,29).map(v=>({value:v.name,main:v.displayName||v.name,name:v.displayName?v.name:"",sub:v.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let g=!1;const F=e.querySelector("#manualVendorField"),f=e.querySelector("#manualVendorName"),E=q.querySelector('[name="vendor"]'),O=k=>{g=k,F.hidden=!k,f.required=k},I=e.querySelector("#venHint"),X=()=>{const k=q.querySelector('[name="vendor"]').value.trim();I.hidden=!k||y.some(R=>R.name.toLowerCase()===k.toLowerCase())};c("venSearch","venList","vendor",{search:T,resolve:k=>{if(g)return f.value.trim();const R=y.find(v=>v.name.toLowerCase()===k.toLowerCase()||(v.displayName||"").toLowerCase()===k.toLowerCase());return R?R.name:k},toLabel:k=>g?"Other — enter manually":m(k),onSelect:k=>(O(k==="__other__"),g?(E.value=f.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",f.focus(),X(),!0):!1),allowEmpty:!0,onCommit:X}),f.oninput=()=>{E.value=f.value.trim(),X()};const se=e.querySelector("#venSearch"),le=se.oninput;se.oninput=()=>{O(!1),le()},X(),e.querySelector("#addItem").onclick=()=>{e.querySelector("#prSave").disabled||(C.insertAdjacentHTML("beforeend",Ct(t,{},C.children.length,h,S)),M(C.lastElementChild),P(),yt(C.lastElementChild))};const w=q.elements.namedItem("trackingLink");w&&(w.oninput=()=>w.setCustomValidity(""));const x=()=>Object.fromEntries([...new FormData(q)].filter(([k])=>!k.startsWith("i_"))),W=x(),Q=JSON.stringify(st(q));q.onsubmit=async k=>{k.preventDefault();const R=e.querySelector("#prSave");if(R.disabled||!L()||!ns(w))return;if(g&&!f.value.trim()){f.reportValidity();return}e.querySelectorAll(".pr-save").forEach(V=>{V.disabled=!0,V.innerHTML=b("refresh","spin")+" Saving…"}),R.disabled=!0,R.textContent="Saving…",P(),e.querySelector("#addItem").disabled=!0;const v=x();let D=st(q);try{if(!D.length&&(!a||JSON.stringify(D)!==Q))throw new Error("Add at least one item with a description");for(const H of C.children)H.querySelector('[name="i_description"]').value.trim()&&await H.querySelector(".attachment-picker").uploadFiles();D=st(q);const V=JSON.stringify(D)!==Q;if(a){const H=Object.fromEntries(Object.entries(v).filter(([ae,_])=>_!==W[ae]));if(Object.keys(H).length||V){const ae=await Y("update",{id:n.id,updates:H,...V?{items:D}:{}});await z.applyResult(ae,{itemsChanged:V}),U("PR updated")}location.hash="#/pr/"+n.id}else{const H=await Y("create",{pr:v,items:D});await z.applyResult(H,{itemsChanged:!0}),U("Created "+H.pr.id),location.hash="#/pr/"+H.pr.id}}catch(V){U(V.message,!0),R.disabled=!1,R.textContent=a?"Save changes":"Submit PR",P(),e.querySelector("#addItem").disabled=!1,e.querySelectorAll(".pr-save").forEach(H=>{H.disabled=!1,H.textContent=a?"Save changes":"Submit request"})}}}let Qe=null,be=null,jt="",Ia=null,Fa="";const _s=["Domestic","International"];function Yt(e){var t,s;return(Fa!==((t=e.me)==null?void 0:t.email)||e.lastSync&&Ia!==e.lastSync)&&(Qe=e.vendors||[],Fa=(s=e.me)==null?void 0:s.email,Ia=e.lastSync),Qe===null&&(Qe=e.vendors||[]),Qe}function Ks(e){const t=e.lists&&e.lists.departments||[],s=Yt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const pe=(e,t,s,a="")=>`<label class="adm-field">${i(e)}
    <input class="adm-input" name="${t}" value="${i(s||"")}" placeholder="${i(a)}">
  </label>`;function Gs(e,t){const s=Yt(e),a=be&&s.find(r=>r.name.toLowerCase()===be.toLowerCase());if(a)return zs(e,a);const n=[...s].sort((r,o)=>r.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${$t(jt,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
      ${t?`
      <div class="adm-addrow">
        <input id="nvName" placeholder="Vendor name" class="adm-input">
        <button class="adm-addbtn" id="nvAdd">Add Vendor</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>Vendor</th><th>Departments</th><th>Type</th><th>Category</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${n.map(r=>`<tr class="vRow" data-name="${i(r.name)}"
            data-search="${Gt(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${i(r.name)}</td>
            <td>${(r.departments||[]).map(o=>`<span class="adm-chip on">${i(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${i(r.type||"—")}</td>
            <td>${i(r.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${i(r.name)}" title="Remove vendor">
                ${b("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${zt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${bn(n.length,n.length)}</span></div>
    </div>`}const bn=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function zs(e,t){const s=Kt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${i(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?i(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${i(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${i(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${b("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${i(Ve("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${Ks(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some($=>$.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${i(o)}">${i(o)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${i(t.name)}">
        </label>
        <div class="adm-grid2">
          ${pe("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${pe("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${pe("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",..._s].map(o=>`<option value="${i(o)}" ${o===(t.type||"")?"selected":""}>${o?i(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${pe("Contact person","contactPerson",t.contactPerson)}
          ${pe("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${i(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${i(t.address||"")}"></label>
        <div class="adm-grid2">
          ${pe("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${pe("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${i(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${pe("Account number","accountNumber",t.accountNumber)}
          ${pe("IFSC","ifsc",t.ifsc)}
        </div>
        ${pe("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${r}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${pe("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function Ws(e,t,s){const a=async(y,m,h)=>{try{const S=await Y(y,m);Qe=S.vendors,await z.applyResult(S),U(h),e.isConnected&&s()}catch(S){U(S.message,!0)}};Wt(e,{get:()=>jt,set:y=>{jt=y},count:bn,match:y=>new Set(un(Yt(t),y).map(m=>m.name))}),e.querySelectorAll(".vRow").forEach(y=>y.onclick=m=>{m.target.closest(".vRm")||(be=y.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(y=>y.onclick=()=>{confirm(`Remove vendor "${y.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:y.dataset.name},`${y.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const y=e.querySelector("#nvName").value.trim();if(!y){U("Vendor name required",!0);return}be=y,a("vendorSet",{name:y,updates:{}},`${y} added — fill in the details`)});const r=()=>{be=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=r);const d=e.querySelector("#vCancel");d&&(d.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(y=>y.onclick=()=>y.classList.toggle("on"));const $=e.querySelector("#vForm");$&&($.onsubmit=y=>{y.preventDefault();const m={};for(const[S,q]of new FormData($))m[S]=q.trim();m.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(S=>S.dataset.dept);const h=m.name||be;a("vendorSet",{name:be,updates:m},`${h} saved`),be=h})}function Ys(){be=null}const Ye=["admin","approver","finance","requester"],Zs={admin:"Full access to settings, users, PRs, and analytics.",approver:"Creates own PRs and approves or rejects submitted requests in their department.",finance:"Creates own PRs and handles payments for requests sent by admin. In progress assigns responsibility through completion.",requester:"Creates, tracks and edits own submitted PRs. No approval, payment or admin access."},Oa=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let ue="users",De=null,Ze=null,rt="",Ut="",Ee=null,He=null,Tt=null,he=!1;const xa={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Ee,set:e=>{Ee=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>He,set:e=>{He=e},seed:e=>e.materialTypes}};function Js(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%Oa.length;return Oa[t]}const Lt=e=>e[0].toUpperCase()+e.slice(1),Qs={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${b("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${b("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${b("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${b("vendors")} Add Vendor`}};function Se(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(rt!==s&&(rt=s,De=null,Ze=null,Ee=null,He=null,Tt=null),t.lastSync&&t.lastSync!==Tt&&(Ee=t.projects||[],He=t.materialTypes||[],Tt=t.lastSync),De===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${b("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const r=e.querySelector("#adminUsersLoading"),o=Ze||(Ze=Y("usersList"));o.then(d=>{if(rt===s){if(!Array.isArray(d.users))throw new Error("The server did not return users. Please retry.");De=d.users,e.contains(r)&&Se(e,t)}}).catch(d=>{rt!==s||!e.contains(r)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${i(d.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{Ze=null,Se(e,t)})}).finally(()=>{Ze===o&&(Ze=null)});return}Ee===null&&(Ee=t.projects||[]),He===null&&(He=t.materialTypes||[]);const a=Qs[ue];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${a.title}</h1>
          <p>${a.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${a.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${ue==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${ue==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${ue==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${ue==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${ue==="users"?Xs(t):ue==="vendors"?Gs(t,he):tr(t,xa[ue])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(r=>r.onclick=()=>{ue=r.dataset.tab,he=!1,Ys(),Se(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(he=!he,Se(e,t),he){const r=e.querySelector(".adm-addrow input, .adm-addrow select");r&&r.focus()}},ue==="users"?er(e,t):ue==="vendors"?Ws(e,t,()=>{he=!1,Se(e,t)}):ar(e,t,xa[ue])}function Xs(e){const t=a=>(Ye.includes(a.role)?Ye:[a.role,...Ye]).map(n=>`<option value="${i(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?i(Lt(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!dt(e).includes(a)?[a,...dt(e)]:dt(e)].map(n=>`<option value="${i(n)}" ${n===(a||"")?"selected":""}>${n?i(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${b("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${$t(Ut,"Search by name or email…")}
      ${he?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${Ye.map(a=>`<option value="${a}">${Lt(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...De].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||vt(a.email);return`<tr data-search="${Gt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Js(a.email)}">${i(Vt(a.email))}${a.picture?`<img src="${i(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
                <div>
                  <div class="adm-name">${i(n)}</div>
                  <div class="adm-email">${i(a.email)}</div>
                </div>
              </div>
            </td>
            <td><div style="max-width:200px"><select data-email="${i(a.email)}" class="roleSel adm-select">${t(a)}</select></div></td>
            <td><div style="max-width:200px"><select data-email="${i(a.email)}" class="deptSel adm-select">${s(a.department)}</select></div></td>
            <td>${a.role?'<span class="adm-pill">Active</span>':'<span class="adm-pill pend" title="Signed in themselves — assign a role and department to approve">Pending</span>'}</td>
            <td style="text-align:right">
              <button class="adm-del rmBtn" data-email="${i(a.email)}" title="Remove user">
                ${b("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${zt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${De.length} of ${De.length} active members</span>
        <div class="adm-pager">
          <button disabled>${b("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${b("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${Ye.map(a=>`<div class="adm-rolecard">
        <h4>${Lt(a)}</h4>
        <p>${Zs[a]}</p>
      </div>`).join("")}
    </div>`}function er(e,t){Wt(e,{get:()=>Ut,set:n=>{Ut=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,o)=>{try{const d=await Y("userSet",{email:n,...r});De=d.users,he=!1,await z.applyResult(d),U(o),e.isConnected&&Se(e,t)}catch(d){U(d.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:r,department:o},`${n} → ${r}`)})}function dt(e){const t=e.lists&&e.lists.departments||[],s=(Ee||[]).map(a=>a.department);return[...new Set([...t,...s])]}function tr(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${$t(t.q,`Search ${t.plural} by name or department…`)}
      ${he?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${dt(e).map(a=>`<option value="${i(a)}">${i(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
        </select>
        <input id="mpName" placeholder="${i(t.label)} name" class="adm-input">
        <button class="adm-addbtn" id="mpAdd">Add ${i(t.label)}</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>Department</th><th>${i(t.label)}</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${s.map(a=>`<tr data-search="${Gt(a.department,a[t.key])}">
            <td class="adm-name">${i(a.department)}</td>
            <td>${i(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${i(a.department)}" data-val="${i(a[t.key])}" title="Remove">
                ${b("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${zt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${gn(s.length,s.length,t)}</span>
      </div>
    </div>`}const gn=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function ar(e,t,s){Wt(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,o)=>gn(r,o,s)});const a=async(r,o,d)=>{try{const $=await Y(r,o);s.set($[s.respKey]),he=!1,await z.applyResult($),U(d),e.isConnected&&Se(e,t)}catch($){U($.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:o},`${r} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:o,val:d}=r.dataset;confirm(`Remove "${d}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:d},`${d} removed`)})}const Ba={requester:0,approver:1,finance:1,admin:2};function ja(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=Ba[t.role];return s!=null&&s>=Ba[e.minRole]}const $n=document.getElementById("app"),Et={"":{fn:Ft,nav:"Dashboard",icon:"grid"},vendors:{fn:Is,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:(e,t,s)=>{history.replaceState(null,"","#/"),Ft(e,t),s&&Ue(t,s,"payment")},roles:["admin","finance"]},new:{fn:vn,roles:["requester","approver","finance","admin"]},pr:{fn:et},admin:{fn:Se,nav:"Admin",icon:"settings",minRole:"admin"}};let ke,Ua=null;function wn(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function nr(){ke==null||ke.abort(),$n.innerHTML=`<div class="auth-gate">
    <section class="auth-story">
      <img src="oizom-logo.png" alt="OIZOM" class="auth-logo">
      <span class="eyebrow">THE PROCUREMENT WORKSPACE</span>
      <h1>Every purchase.<br><em>One clear path.</em></h1>
      <p>From the first request to the final delivery.<br>A shared space to keep work moving.</p>
      <div class="auth-flow"><span>${b("file")} Request</span>${b("arrow")}<span>${b("check")} Approve</span>${b("arrow")}<span>${b("package")} Receive</span></div>
      <div class="auth-footer">Oizom · Redefining resources</div>
    </section>
    <section class="auth-box">
      <span class="auth-mark">${b("package")}</span>
      <span class="eyebrow">OIZOM PROCUREMENT</span>
      <h2>Welcome back.</h2>
      <p>Sign in with your Oizom account<br>to open your workspace.</p>
      <div id="gsignin"></div>
      <div class="auth-note">${b("shield")} For your @oizom.com work account</div>
    </section>
  </div>`,Ln(document.getElementById("gsignin"))}function Sn(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=b("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function kn(){var X,se,le;const e=z.get(),{name:t,param:s}=wn(),a=Et[t]||Et[""],n=((X=e.me)==null?void 0:X.role)||"";if(e.me&&!ja(a,e.me)){location.hash="#/";return}ke==null||ke.abort(),ke=new AbortController;const r=ke.signal,o=Object.entries(Et).filter(([,w])=>w.nav&&e.me&&ja(w,e.me)).map(([w,x])=>`<a href="#/${w}" ${t===w?'aria-current="page"':""} class="${t===w?"active":""}">${b(x.icon)}<span>${x.nav}</span>${t===w?'<span class="nav-dot"></span>':""}</a>`).join(""),d=e.notifications||[],$=d.filter(w=>!w.readAt).length,y=Pn()||{},m=y.email||((se=e.me)==null?void 0:se.email)||"",h=y.name||vt(m),S=y.picture?`<img class="avatar" src="${i(y.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${i(Vt(h))}</span>`,q=a.nav||(t==="payments"?"Dashboard":t==="new"?s?"Edit request":"New request":"Purchase request");document.title=q+" · Oizom Procurement",$n.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${b("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${o}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${b("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${b("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${b("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${b("right")} <b>${i(q)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${b("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${$?", "+$+" unread":""}" aria-expanded="false" aria-controls="nPanel">${b("bell")}${$?`<span class="nbadge">${$>9?"9+":$}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${$?$+" new":"All caught up"}</span></div>
              ${d.length?d.map(w=>`<${w.prId?"a":"div"} class="nitem ${w.readAt?"":"unread"}" ${w.prId?`href="#/pr/${i(w.prId)}"`:""}><div class="nmsg">${i(w.message)}</div><div class="ntime">${i(String(w.ts).slice(0,16).replace("T"," "))}</div></${w.prId?"a":"div"}>`).join(""):`<div class="nempty">${b("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${S}<span class="profile-copy"><span class="pname">${i(h)}</span><span class="prole">${i(n||"Oizom team")}</span></span>${b("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${i(m)}</div><button class="btn" id="btnOut">${b("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Sn(e),document.getElementById("btnRefresh").onclick=async()=>{await z.refresh({fresh:!0}),z.get().err||U("Data refreshed")};const L=document.getElementById("nPanel"),C=document.getElementById("nBtn"),j=document.getElementById("pMenu"),P=document.getElementById("profileBtn"),M=()=>{L.hidden=j.hidden=!0,C.setAttribute("aria-expanded","false"),P.setAttribute("aria-expanded","false")};C.onclick=()=>{var x;const w=L.hidden;M(),L.hidden=!w,C.setAttribute("aria-expanded",String(w)),w&&$&&(d.forEach(W=>{W.readAt||(W.readAt="now")}),(x=document.querySelector(".nbadge"))==null||x.remove(),Y("notifRead").catch(()=>{}))},P.onclick=()=>{const w=j.hidden;M(),j.hidden=!w,P.setAttribute("aria-expanded",String(w))},document.getElementById("btnOut").onclick=Cn,document.addEventListener("click",w=>{w.target.closest(".nbell, .profile-wrap")||M()},{signal:r});const c=document.getElementById("sidebar"),T=document.getElementById("workspace"),g=document.getElementById("openNav"),F=document.getElementById("shell"),f=matchMedia("(max-width: 960px)");let E=!1;const O=(w,x=!0)=>{var W;E=f.matches&&w,F.classList.toggle("nav-open",E),c.inert=f.matches&&!E,T.inert=E,document.getElementById("navBackdrop").hidden=!E,g.setAttribute("aria-expanded",String(E)),document.body.classList.toggle("nav-locked",E),E?(W=c.querySelector("nav a"))==null||W.focus():x&&f.matches&&g.focus()};O(!1,!1),g.onclick=()=>O(!0),document.getElementById("closeNav").onclick=()=>O(!1),document.getElementById("navBackdrop").onclick=()=>O(!1),c.querySelectorAll("a").forEach(w=>w.addEventListener("click",()=>O(!1),{signal:r})),f.addEventListener("change",()=>O(!1,!1),{signal:r}),document.addEventListener("keydown",w=>{if(w.key==="Escape"&&(E?O(!1):L.hidden?j.hidden||(M(),P.focus()):(M(),C.focus())),w.key==="Tab"&&E){const x=[...c.querySelectorAll("a, button")],W=x[0],Q=x[x.length-1];w.shiftKey&&document.activeElement===W?(w.preventDefault(),Q.focus()):!w.shiftKey&&document.activeElement===Q&&(w.preventDefault(),W.focus())}},{signal:r});const I=document.getElementById("view");if(document.querySelector(".skip-link").onclick=w=>{w.preventDefault(),I.focus()},!e.lastSync)I.innerHTML=e.err?`<div class="connection-state">${b("info")}<h1>We couldn't load your workspace</h1><p>${i(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(le=document.getElementById("retryLoad"))==null||le.addEventListener("click",()=>z.refresh(),{signal:r});else{Dn(t,()=>a.fn(I,e,s));const w=t+"/"+(s||"");Ua!==w&&An(I),Ua=w}}window.addEventListener("hashchange",()=>{kn(),window.scrollTo({top:0,behavior:"instant"})});let Ha="",Va=!1,_a=z.get().prs;z.subscribe(e=>{const t=e.prs!==_a;_a=e.prs,e.err&&e.err!==Ha&&U(e.err,!0),Ha=e.err;const s=!Va&&e.lastSync;if(s&&(Va=!0),e.lastSync&&(e.loading||e.err)&&!t||["new","payments"].includes(wn().name)&&!s&&e.lastSync&&document.querySelector("#view form")){Sn(e);return}kn()});Tn(()=>z.refresh());ht()||nr();
