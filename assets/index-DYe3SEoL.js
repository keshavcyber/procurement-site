(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var oa;const ne=typeof window<"u"?(oa=window.matchMedia)==null?void 0:oa.call(window,"(prefers-reduced-motion: reduce)"):null,Ee=new Set,Na="cubic-bezier(.2,.75,.25,1)";var la;(la=ne==null?void 0:ne.addEventListener)==null||la.call(ne,"change",e=>{e.matches&&Ee.forEach(t=>t.cancel())});function Ve(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||ne!=null&&ne.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Na,fill:"backwards"});return r.id="workspace-reveal",Ee.add(r),r.finished.then(()=>Ee.delete(r),()=>Ee.delete(r)),r}function Ea(e){if(ne!=null&&ne.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Ve(a,{delay:Math.min(s++*22,154),distance:10})}}const da={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Fe="oizom-id-token";let Mt=null;function Ma(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Ke(){const e=localStorage.getItem(Fe);return e?Ma(e)<Date.now()+3e4?(localStorage.removeItem(Fe),null):e:null}function Ia(){const e=Ke();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function xa(){localStorage.removeItem(Fe),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Oa(e){if(Mt=e,Ke()){e();return}pt(()=>{google.accounts.id.initialize({client_id:da.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Fe,t.credential),Mt()}}),google.accounts.id.prompt()})}function pt(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>pt(e,t+1),100)}function Fa(e){pt(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class at extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const ca=new Set(["list","me","usersList","health","logTail","financeList"]),Ba=new Set([404,408,429,500,502,503,504]),ja=45e3;function Ua(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Le(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=ca.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new at(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||Ba.has(t)})}async function Ha(e,t){const s=Ke();if(!s)throw new at("SIGNED_OUT");let a;try{a=await fetch(da.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(ja),body:JSON.stringify({...t,action:e,token:s})})}catch(o){throw Le(e,{kind:["TimeoutError","AbortError"].includes(o.name)?"timeout":"network"})}const n=Ua(a);if(!a.ok)throw Le(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw Le(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw Le(e,{stage:n,kind:"response"});if(!r.ok)throw new at(r.error||"Request failed",{action:e});return r}async function K(e,t={}){for(let s=0;s<2;s++)try{return await Ha(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!ca.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function Va(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Ka(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function _a(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function Ga(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function It(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:_a(n),qty:Ga(n)}})}let V={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const nt=new Set;let xt=!1,we=null,We=0;function za(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Je(){nt.forEach(e=>e(V))}const U={get:()=>V,subscribe(e){return nt.add(e),()=>nt.delete(e)},refresh(){return we||(V={...V,loading:!0},we=Promise.resolve().then(async()=>{try{let e,t;do t=We,e=await K("list");while(t!==We);za(e),V={prs:It(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},xt=!0}catch(e){if(e.message==="SIGNED_OUT"&&xt){location.reload();return}V={...V,err:e.message,loading:!1}}}).finally(()=>{we=null,V={...V,loading:!1},Je()}),Je(),we)},async applyResult(e,{itemsChanged:t=!1}={}){We++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=V.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return U.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(p=>({...p,prId:e.pr.id})),o=It([e.pr],r)[0];s.prs=n?V.prs.map(p=>p.id===o.id?o:p):[...V.prs,o]}a=!0}e.deleted&&(s.prs=V.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=V.me&&e.users.find(r=>r.email.toLowerCase()===V.me.email.toLowerCase());if(V.me&&(!n||!n.role))return U.refresh();n&&(s.me={...V.me,role:n.role,department:n.department}),a=!0}if(!a)return U.refresh();V={...V,...s},Je()}},Ot={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function y(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ot[e]||Ot.file}</svg>`}const i=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function _e(e){return`<span class="chip ${i(e)}" data-s="${i(e)}">${i(e)}</span>`}function O(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${y(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const Q=e=>e?i(String(e).slice(0,10)):"—";function Ge(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function mt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Ft={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Me=e=>Ft[e]!=null?Ft[e]:e+" ";function be(e,t){const s=e==="INR"?"en-IN":"en-US";return Me(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function te(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Me(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Me(e)+(t/1e3).toFixed(1)+"K":Me(e)+Math.round(t).toLocaleString("en-US")}const Pe=["Cancelled","Rejected"],Ya=["Ordered","In Transit","Received"],ze=e=>Ya.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function Bt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function jt(e){const t=e.filter(n=>!Pe.includes(n.status)),s=e.filter(ze),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:Bt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:Bt(t)}}const Be={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:ze,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Pe.includes(e.status)};function Za(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Ut(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function pa(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function Wa(e){return e.filter(ze)}function Ja(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function Qa(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function Ht(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let o;if(t==="count")o=1;else{if(Pe.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const p=Number(n.amount);if(!n.amount||!isFinite(p)||(n.currency||"Unknown")!==s)continue;o=p}a[r]=(a[r]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Xa(e,t){const s={};for(const a of e){if(Pe.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function en(e,t,s=6){const a={};for(const o of e){if(Pe.includes(o.status)||(o.currency||"Unknown")!==t)continue;const p=Number(o.amount);if(!o.amount||!isFinite(p))continue;const S=o.vendor||"Unspecified";a[S]=(a[S]||0)+p}const n=Object.entries(a).map(([o,p])=>({vendor:o,total:p})).sort((o,p)=>p.total-o.total);if(n.length<=s)return n;const r=n.slice(s).reduce((o,p)=>o+p.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function tn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function an(e){const t=(r,o)=>{const p=Date.parse(r),S=Date.parse(o);return isFinite(p)&&isFinite(S)?(S-p)/864e5:null},s=r=>r.length?r.reduce((o,p)=>o+p,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const nn=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function sn(e,t=Date.now()){const s=nn.map(a=>({...a,count:0}));return e.filter(ze).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(o=>r>=o.min&&r<=o.max)||s[s.length-1]).count++}),s}const fe=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],ma=["Unpaid","Paid","Partially Paid","FOC / Free"],je={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function rn(e,t,s,a,n){const r=(je[e]||{})[t];return r?r.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function on(e,t,s,a){return Object.keys(je[e]||{}).filter(n=>rn(e,n,t,s,a))}function ln(e,t){return!!(je[e]&&je[e][t])}const dn=["Submitted","Approved","Rejected"],Vt=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],st=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),m={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:st()},Se=25,cn={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let it;function pn(e,t){m.tab=t==="admin"?"all":"dept",t==="admin"&&(m.statuses=e==="pending"?["Submitted"]:[...fe]),m.sel=["pending","unpaid"].includes(e)?e:"total",m.page=1,m.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ce(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(ua(e,t),s&&Ve(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const Kt=e=>String(e||"").slice(0,10);function mn(e){const t=m.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Kt(e.createdAt)<t.from||t.to&&Kt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function ua(e,t){var s;clearTimeout(it),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        ${((s=t.me)==null?void 0:s.role)!=="finance"?`<a class="adm-addbtn" href="#/new">
          ${y("plus")} New request
        </a>`:""}
      </div>
      <div id="tabBody"></div>
    </div>`,un(e.querySelector("#tabBody"),e,t)}const ve=e=>e.length?e.map(([t,s])=>te(t,s)).join(" + "):"—";function un(e,t,s){var Rt,Ct,qt,Tt,Pt,Lt,Dt,Nt,Et;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",o=a.role==="finance",p=[(Rt=a.email)==null?void 0:Rt.toLowerCase(),a.role,(Ct=a.department)==null?void 0:Ct.toLowerCase()].join("|");m.viewer!==p&&Object.assign(m,{viewer:p,tab:r?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:st()});const S=n?["mine","dept","approved"]:r?["all","mine"]:o&&!((qt=s.capabilities)!=null&&qt.financeWorkflow)?["mine","payments"]:["mine"];S.includes(m.tab)||(m.tab="mine");const c=r&&m.statuses.length===1&&m.statuses[0]==="Approved",f=m.statuses.length===fe.length,D=m.tab==="dept",N=m.tab==="approved",P=m.tab==="all",u=m.tab==="payments",R=o&&((Tt=s.capabilities)!=null&&Tt.financeHandoff)?s.prs:Za(s.prs,a.email),M=n?Ut(s.prs,a.email):[],q=n?pa(s.prs,a.department):[],T=o?Wa(s.prs):[],j=D?q:N?M:P?s.prs:u?T:R,C=r&&!f?j.filter(l=>m.statuses.includes(l.status)):j,b=jt(C),$=n?q.filter(Be.pending):[],E=r?jt(s.prs):n?{pending:$.length,highPriority:$.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,F=c?[{key:"total",n:b.total,l:"Ready to purchase",s:P?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:b.spendTotals.length?te(...b.spendTotals[0]):"-",l:"Approved value",s:b.spendTotals.length>1?"+ "+ve(b.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:u?[{key:"total",n:b.total,l:"Awaiting payment",s:ve(b.unpaidTotals)},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?te(...b.spendTotals[0]):"—",l:"Total value",s:b.spendTotals.length>1?"+ "+ve(b.spendTotals.slice(1)):""}]:D?[{key:"total",n:b.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:ve(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?te(...b.spendTotals[0]):"—",l:"Total spend",s:b.spendTotals.length>1?"+ "+ve(b.spendTotals.slice(1)):""}]:[{key:"total",n:b.total,l:N?"Approved PRs":r&&!f?"Selected PRs":P?"All PRs":"Total PRs",s:N?"across all requesters":r&&!f?"Matching your selected statuses":P?"every department":""},...N?[]:[{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:ve(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?te(...b.spendTotals[0]):"—",l:N?"Approved spend":"Total spend",s:b.spendTotals.length>1?"+ "+ve(b.spendTotals.slice(1)):""}];if(!r&&!o){const l=F.findIndex(A=>A.key==="unpaid");l>=0&&F.splice(l,1)}if(P)for(const l of Ja(C))F.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+Ge(l.email),s:l.email,cls:"go"});F.some(l=>l.key===m.sel)||(m.sel="total");const I=(m.sel.startsWith("ap:")?Ut(C,m.sel.slice(3)):C.filter(Be[m.sel])).sort((l,A)=>(A.createdAt||"").localeCompare(l.createdAt||"")),G=F.find(l=>l.key===m.sel),g=[...new Set(C.map(l=>l.department).filter(Boolean))].sort(),d=[...new Set(C.map(l=>l.vendor).filter(Boolean))].sort();m.filters.dept&&!g.includes(m.filters.dept)&&(m.filters.dept=""),m.filters.vendor&&!d.includes(m.filters.vendor)&&(m.filters.vendor="");const w=I.filter(mn),v=Object.values(m.filters).some(Boolean),k=Math.max(1,Math.ceil(w.length/Se));m.page=Math.min(Math.max(1,m.page),k);const L=w.slice((m.page-1)*Se,m.page*Se),H=["dept","vendor","from","to"].filter(l=>m.filters[l]).length,se=f?"All statuses":m.statuses.join(" + "),h=r?(P?f?"All requests":c?"Approved requests":se:"Your requests")+(P?"":" · "+se):o&&((Pt=s.capabilities)!=null&&Pt.financeHandoff)?"Requests sent by admin":D?"Department requests":N?"Approved by you":u?"Payment queue":"Your requests",x=(l,A,B)=>`<button type="button" id="scope-${l}" class="adm-tab ${m.tab===l?"active":""}" data-tab="${l}" aria-pressed="${m.tab===l}">${A} <span>${B}</span></button>`,ie=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),J=l=>{const A=r?fe:n&&l.status==="Submitted"&&ie(l)?dn:null;return A?`<select class="status-sel" data-status="${i(l.status)}" aria-label="Status for ${i(l.id)}" data-id="${i(l.id)}">${A.map(B=>`<option ${B===l.status?"selected":""}>${i(B)}</option>`).join("")}</select>`:_e(l.status)},z=l=>`<select class="pay-sel" aria-label="Payment status for ${i(l.id)}" data-id="${i(l.id)}">${ma.map(A=>`<option ${A===l.paymentStatus?"selected":""}>${i(A)}</option>`).join("")}</select>`,W=r?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${f?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${f}">All <span>${j.length}</span></button>
        ${Vt.map((l,A)=>`<button type="button" class="view-pill ${!f&&m.statuses.includes(l)?"selected":""}" id="status-pill-${A}" data-admin-status="${i(l)}" aria-pressed="${!f&&m.statuses.includes(l)}">${l==="Submitted"?"Pending approval":i(l)}<span>${j.filter(B=>B.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${P?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${P}">Everyone</button>
        <button type="button" class="view-pill ${P?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!P}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${y("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${i(h)}</span><span class="view-result-count" role="status">${C.length} ${C.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Lt=s.capabilities)!=null&&Lt.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Mark In progress to take responsibility through completion.</p></div><a class="btn" href="#/payments">${y("wallet")} Open payments ${y("arrow")}</a></section>`:""}
    ${!r&&S.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${x("mine","Your requests",R.length)}
      ${n?x("dept",i(a.department||"Your department"),q.length)+x("approved","Approved by you",M.length):""}
      ${o?x("payments","Awaiting payment",T.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${c?"approved-kpis":""}" aria-label="Filter requests by summary">${F.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===m.sel?"sel":""}" data-key="${i(l.key)}" aria-pressed="${l.key===m.sel}">
        <span class="kpi-top"><span class="l">${i(l.l)}</span>${y(cn[l.key])}</span>
        <span class="v">${i(String(l.n))}</span><span class="s">${i(l.s||(l.key==="total"?h:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${E?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?i(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${E.pending?"":"disabled"}><span class="attention-icon">${y("clock")}</span><span><b>${E.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${E.pending?"Open approval queue":"No approvals waiting"}</small></span>${y("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${E.unpaidCount?"":"disabled"}><span class="attention-icon">${y("wallet")}</span><span><b>${E.unpaidCount} awaiting payment</b><small>${E.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${y("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${y("info")}</span><span><b>${E.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${W}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${w.length}</span></h2><p>${i(h)} · ${m.sel==="total"?"Latest first":i(G.l)}</p></div><span class="table-hint">Select a request to view details ${y("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${y("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${i(m.filters.q)}"></label>
        ${r?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${fe.map(l=>`<option value="${i(l)}" ${m.filters.status===l?"selected":""}>${i(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${H?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${m.moreFilters}" aria-controls="advancedFilters">${y("filter")} Filters ${H?`<span class="count-badge">${H}</span>`:""}</button>
        ${v?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${m.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${g.map(l=>`<option value="${i(l)}" ${m.filters.dept===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${d.map(l=>`<option value="${i(l)}" ${m.filters.vendor===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${i(m.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${i(m.filters.to)}"></label>
        ${P?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${F.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${i(l.key)}" ${m.sel===l.key?"selected":""}>${i(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${u?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${L.map(l=>`<tr class="rowlink ${u?"payment-row":""}" data-id="${i(l.id)}">
          <td class="request-id"><a href="#/pr/${i(l.id)}">${i(l.id)}</a></td>
          <td class="request-date">${Q(l.createdAt)}</td>
          ${u?`<td>${i(l.vendor)}</td><td>${i(l.poNo||"—")}</td><td>${i(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${i(l.department)}</td><td class="wrap request-item">${i(l.item)}</td><td class="request-vendor">${i(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?i(te(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${u?z(l):J(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${y(v?"search":"file")}<b>${v?"No matching requests":c?"No requests ready for purchasing":r&&!f?"No requests with these statuses":"No requests here yet"}</b><span>${v?"Try a different search or clear your filters.":c?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":r&&!f?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${v?'<button class="btn" id="emptyClear">Clear filters</button>':r&&!f?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${w.length?(m.page-1)*Se+1:0}–${Math.min(m.page*Se,w.length)} of ${w.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${m.page===1?"disabled":""}>${y("left")}</button><span>Page ${m.page} of ${k}</span><button class="btn" id="dashNext" aria-label="Next page" ${m.page===k?"disabled":""}>${y("right")}</button></div></div>
    </section>`;const re=l=>{m.tab=l,m.sel="total",m.page=1,r&&(m.filters=st()),ce(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>re(l.dataset.tab));const gt=()=>{m.statuses=[...fe],re(m.tab),t.querySelector("#showAllRequests").focus()};(Dt=e.querySelector("#showAllRequests"))==null||Dt.addEventListener("click",gt),(Nt=e.querySelector("#emptyAllRequests"))==null||Nt.addEventListener("click",()=>{m.tab="all",gt()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const A=l.dataset.adminStatus;if(f)m.statuses=[A];else if(!m.statuses.includes(A))m.statuses=Vt.filter(B=>B===A||m.statuses.includes(B));else if(m.statuses.length>1)m.statuses=m.statuses.filter(B=>B!==A);else return;re(m.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>re(l.dataset.adminScope)),(Et=e.querySelector("#resetAdminView"))==null||Et.addEventListener("click",()=>{m.statuses=["Approved"],re("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{m.sel=l.dataset.key,m.page=1,ce(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,Y,_;if(l.dataset.queue==="unpaid"&&((B=s.capabilities)!=null&&B.financeWorkflow)){location.hash="#/payments";return}if(!r&&!(n&&l.dataset.queue==="pending"))return;pn(l.dataset.queue,a.role),ce(t,s);const A=t.querySelector(".requests-card");A.focus({preventScroll:!0}),(_=A.scrollIntoView)==null||_.call(A,{block:"start",behavior:(Y=window.matchMedia)!=null&&Y.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=A=>{A.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{m.moreFilters=!m.moreFilters,e.querySelector("#advancedFilters").hidden=!m.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(m.moreFilters))};const Ze=e.querySelector("#dashApprover");Ze&&(Ze.onchange=()=>{m.sel=Ze.value,m.page=1,ce(t,s)});const $t=l=>{var A,B;m.page+=l,ce(t,s),(B=(A=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(A,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>$t(-1),e.querySelector("#dashNext").onclick=()=>$t(1);const $e=(l,A)=>{m.filters[l]=A,m.page=1,ce(t,s)};e.querySelector("#dashQ").oninput=l=>{m.filters.q=l.target.value,m.page=1,clearTimeout(it),it=setTimeout(()=>{t.isConnected&&ce(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>$e("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>$e("vendor",l.target.value);const wt=e.querySelector("#dashStatus");wt&&(wt.onchange=l=>$e("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>$e("from",l.target.value),e.querySelector("#dashTo").onchange=l=>$e("to",l.target.value);const St=()=>{m.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},m.page=1,m.sel="total",ce(t,s)},kt=e.querySelector("#dashFilterClear"),At=e.querySelector("#emptyClear");kt&&(kt.onclick=St),At&&(At.onclick=St),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=A=>A.stopPropagation(),l.onchange=async()=>{const A=l.dataset.id,B=s.prs.find(_=>_.id===A),Y=l.value;if(!(!B||Y===B.status)){if((Y==="Rejected"||Y==="Cancelled")&&!confirm(`Mark ${A} as ${Y}?`)){l.value=B.status;return}l.disabled=!0;try{let _;a.role==="admin"&&!ln(B.status,Y)?_=await K("update",{id:A,updates:{status:Y}}):_=await K("transition",{id:A,to:Y}),O(`${A} → ${Y}`),await U.applyResult(_)}catch(_){O(_.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=A=>A.stopPropagation(),l.onchange=async()=>{const A=l.dataset.id,B=s.prs.find(_=>_.id===A),Y=l.value;if(!(!B||Y===B.paymentStatus)){l.disabled=!0;try{const _=await K("update",{id:A,updates:{paymentStatus:Y}});O(`${A} payment → ${Y}`),await U.applyResult(_)}catch(_){O(_.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function ut(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function vt(e,t){const s=ut(e,t),a=s.filter(Be.spend),n={};for(const r of a){const o=Number(r.amount);if(!r.amount||!isFinite(o))continue;const p=r.currency||"INR";n[p]=(n[p]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((r,o)=>o[1]-r[1]),unpaid:s.filter(Be.unpaid).length,lastOrder:s.reduce((r,o)=>{const p=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(p)&&p>r?p:r},"")}}function va(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(ut(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const vn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],hn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},yn=1,fn=.7,ha=.5,bn=.4,gn=.3,$n=4,wn=e=>e.length>=7?2:e.length>=$n?1:0,Ue=e=>String(e??"").toLowerCase().trim();function Sn(e,t){const s=e[t];return Ue(Array.isArray(s)?s.join(" "):s)}function ya(e){return Ue(e).split(/[\s,]+/).filter(Boolean)}function kn(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function _t(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return yn;if(s.some(n=>n.startsWith(t)))return fn;if(e.includes(t))return ha;const a=wn(t);return a&&s.some(n=>kn(n,t)<=a)?gn:0}function An(e,t){const s=_t(e,t);if(s)return s;const a=hn[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):_t(e,r)>=ha)?bn:0}function Rn(e,t){const s=Array.isArray(t)?t:ya(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:o,weight:p}of vn)r=Math.max(r,An(Sn(e,o),n)*p);if(!r)return 0;a+=r}return a}function fa(e,t){const s=ya(t);return s.length?(e||[]).map(a=>({v:a,score:Rn(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Ue(a.v.displayName||a.v.name).localeCompare(Ue(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Ye(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${y("search")}
        <input aria-label="${i(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${i(t)}" value="${i(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${y("close")}
        </button>
      </div>
    </div>`}const ht=(...e)=>i(e.filter(Boolean).join(" ").toLowerCase());function yt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${i(t)}</td></tr>`}function ft(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const o=e.querySelector("#"+n);if(!o)return;const p=o.closest(".adm-card"),S=p.querySelector(".admSearchClear"),c=()=>Cn(p,t(),a,r);o.oninput=()=>{s(o.value),S.hidden=!o.value,c()},o.onkeydown=f=>{f.key==="Escape"&&o.value&&(o.value="",o.oninput())},S.onclick=()=>{o.value="",o.oninput(),o.focus()},c()}function Cn(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let p=null;r.forEach(f=>{f.hidden=n?o?!o.has(f.dataset.name):!f.dataset.search.includes(n):!1,f.classList.remove("last-visible"),f.hidden||(p=f)}),p&&p.classList.add("last-visible");const S=e.querySelector(".adm-nomatch");S&&(S.hidden=!!p||!r.length);const c=e.querySelector(".adm-count");c&&(c.textContent=s(r.filter(f=>!f.hidden).length,r.length))}let ke="";const ba={Domestic:"dom",Foreign:"for",Mixed:"mix"},qn=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function ga(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${i(qn(e.displayName||e.name))}${t?`<img src="${i(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Tn(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${i(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Pn(e,t){const s=vt(e.prs,t.name),a=va(t,e.prs),n=s.spendTotals.length?te(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${i(t.name)}">
      <div class="vc-top">
        ${ga(t)}
        <div class="vc-title">
          <b>${i(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${i(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${ba[a]}">${i(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${i(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${Q(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Tn(t)}</div>
    </a>`}const Ln=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Gt(e,t){const s=Ln(e.vendors),a=t.trim()?fa(s,t):s;return a.length?a.map(n=>Pn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${i(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Dn(e,t,s){if(s)return Nn(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Ye(ke,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Gt(t,ke)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),o=()=>{ke=n.value,r.hidden=!ke,a.innerHTML=Gt(t,ke)};n.oninput=o,n.onkeydown=p=>{p.key==="Escape"&&n.value&&(n.value="",o())},r.onclick=()=>{n.value="",o(),n.focus()}}function Nn(e,t,s){const a=(t.vendors||[]).find(c=>c.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${i(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=vt(t.prs,a.name),r=va(a,t.prs),o=t.me&&t.me.role==="admin",p=ut(t.prs,a.name).sort((c,f)=>(f.createdAt||"").localeCompare(c.createdAt||"")),S=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,c])=>c);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${ga(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${i(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${ba[r]}">${i(r.toUpperCase())}</span>`:""}
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
        <div class="kpi"><div class="v">${n.spendTotals.length?i(te(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?i(n.spendTotals.slice(1).map(([c,f])=>te(c,f)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${Q(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${S.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${S.map(([c,f])=>`<div><span class="vc-l">${i(c)}</span><b>${i(f)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(c=>`<span class="vc-chip">${i(c)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${p.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${p.map(c=>`<tr class="rowlink" data-id="${i(c.id)}">
            <td style="font-family:var(--mono);font-size:12px">${i(c.id)}</td>
            <td>${Q(c.createdAt)}</td><td>${i(c.department)}</td>
            <td class="wrap">${i(c.item)}</td>
            <td>${c.amount?i(te(c.currency||"INR",Number(c.amount))):"—"}</td>
            <td>${_e(c.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(c=>c.onclick=()=>location.hash="#/pr/"+c.dataset.id)}const rt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],$a=new Map(rt.map(e=>[e.code,e])),En=e=>$a.has(String(e||"").trim().toUpperCase());function ot(e){const t=$a.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Mn(e){const t=String(e||"").trim().toLowerCase(),s=t?rt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...rt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function De(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",p=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${i(p)}">
      <span class="barlabel">${i(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${i(t(n.value))}</span>
    </div>`}).join("")}</div>`}function zt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,o=a-n.t-n.b,p=Math.max(...e.map(q=>q.value),1),S=r/(e.length-1),c=q=>n.l+q*S,f=q=>n.t+o-q/p*o,D=e.map((q,T)=>`${T===0?"M":"L"}${c(T).toFixed(1)} ${f(q.value).toFixed(1)}`).join(" "),N=`${D} L${c(e.length-1).toFixed(1)} ${n.t+o} L${c(0).toFixed(1)} ${n.t+o} Z`,P=[0,.5,1].map(q=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-q)).toFixed(1)}" y2="${(n.t+o*(1-q)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),u=Math.ceil(e.length/6)||1,R=e.map((q,T)=>T%u===0||T===e.length-1?`<text x="${c(T).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${T===0?"start":T===e.length-1?"end":"middle"}">${i(q.month.slice(2))}</text>`:"").join(""),M=e.map((q,T)=>`<circle cx="${c(T).toFixed(1)}" cy="${f(q.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${i(q.month)}: ${i(t(q.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${P}
    <path d="${N}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${D}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${M}
    ${R}
  </svg>`}const In=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],xn={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},On={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Ne={currency:""};function wa(e,t){var C,b;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?pa(t.prs,s.department):t.prs||[],r=Qa(n);r.includes(Ne.currency)||(Ne.currency=r[0]||"");const o=Ne.currency,p=$=>o?te(o,$):String($),S=o?Ht(n,"spend",o):[],c=Ht(n,"count"),f=o?en(n,o,6).map($=>({label:$.vendor,value:$.total})):[],D=!a&&o?Xa(n,o).map($=>({label:$.department,value:$.total})):[],N=tn(n),P=In.filter($=>N[$]).map($=>({label:$,value:N[$]})),u=an(n),R=sn(n),M=R.map($=>({label:$.label,value:$.count})),q=R.reduce(($,E)=>$+E.count,0),T=S.reduce(($,E)=>$+E.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${i(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${r.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${y("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${r.map($=>`<option value="${i($)}" ${$===o?"selected":""}>${i(ot($))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?i(p(T)):"—"}</div><div class="l">Total spend${o?" · "+i(o):""}</div></div>
        <div class="kpi"><div class="v">${u.avgApprovalDays!=null?u.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${u.avgDeliveryDays!=null?u.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((C=t.me)==null?void 0:C.role)==="admin"?`<div class="kpi ${q?"warn":""}"><div class="v">${q}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+i(o):""}</p></div>
          </div>
          <div class="spend-chart">${S.length?zt(S,{valueFmt:$=>te(o,$),height:180}):`<div class="trend-empty">${y("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${D.length?`<div class="card"><h2>Spend by department${o?" · "+i(o):""}</h2>
          <div class="pd-body">${De(D,{valueFmt:p})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+i(o):""}</h2>
          <div class="pd-body">${De(f,{valueFmt:p})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${De(P,{colorOf:$=>xn[$.label]||"var(--mut)"})}</div></div>
        ${((b=t.me)==null?void 0:b.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${De(M,{colorOf:$=>On[$.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${zt(c,{valueFmt:$=>$+" PR"+($===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var $;Ne.currency=j.value,wa(e,t),($=e.querySelector("#insCur"))==null||$.focus()})}const Sa={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function ka(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Fn(e){const t=String(e.trackingNo||"").trim(),s=ka(e.trackingLink)||(t?(Sa[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[i(e.courier||""),s?`<a href="${i(s)}" target="_blank" rel="noopener noreferrer">${i(t||"Track shipment")} ↗</a>`:i(t)].filter(Boolean).join(" ")}function Bn(e,t=[]){const s=[...new Set([...t,...Object.keys(Sa),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${i(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${i(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${i(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${i(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function jn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!ka(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const Un="1900-01-01",Hn="2100-12-31",Vn="Enter a complete date with a year between 1900 and 2100.";function qe(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Aa(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(Vn)};return t.forEach(a=>{a.min=Un,a.max=Hn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const Kn=ma,_n={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ie=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:_n[t])||[],Qe={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},le=(e,t,s)=>`<span class="lblrow">${i(e)}${Qe[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${i(Qe[t])}" data-tip="${i(Qe[t])}">?</span>`:""}</span>`;function he(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${i(n)}" ${n===t?"selected":""}>${n?i(n):"Select…"}</option>`).join("")}function Yt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${i(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${i(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${i(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${i(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${he(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${i(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${he(Ie(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${i(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${i(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${i(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${y("close")}</button>
  </div>`}function Xe(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function Gn(e,t,s){var G;const a=s?t.prs.find(g=>g.id===s):null,n=a||{},r=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const p=a?n.department||"":o.department||"",S=(t.projects||[]).filter(g=>g.department.toLowerCase()===p.toLowerCase()).map(g=>g.project),c=(t.vendors||[]).filter(g=>(g.departments||[]).some(d=>d.toLowerCase()===p.toLowerCase())),f=g=>{const d=c.find(w=>w.name.toLowerCase()===String(g||"").toLowerCase());return d?d.displayName||d.name:String(g||"")},D=(t.materialTypes||[]).filter(g=>g.department.toLowerCase()===p.toLowerCase()).map(g=>g.materialType),N=p.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${i(n.id)}" style="font-family:var(--mono)">${i(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?i(n.id):"New Purchase Request"}</h1>
          ${a?_e(n.status):""}
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn" href="${a?"#/pr/"+i(n.id):"#/"}">Cancel</a>
          <button class="btn primary pr-save" type="submit" form="prForm" id="prSave">${a?"Save changes":"Submit PR"}</button>
        </div>
      </div>
      <form id="prForm">
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${le("Project*","project")} <select name="project" required>${he(S,n.project||"",!0)}</select></label>
              <label>${le("Purpose","purpose")} <input name="purpose" value="${i(n.purpose)}"></label>
              <div class="pd-field full">${le("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${i(f(n.vendor))}">
                <input type="hidden" name="vendor" value="${i(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${le("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${i(ot(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${i(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${le("Priority","priority",!0)} <select name="priority">${he(Ie(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${le("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(qe(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((G=t.capabilities)!=null&&G.financeWorkflow)?`
              <label>${le("Payment status*","payment")} <select name="paymentStatus" required>${he(Kn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${he(fe,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${i(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${le("Notes","notes")} <textarea name="notes" rows="3">${i(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&o.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${i(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${i(qe(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${i(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${i(qe(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${he(Ie(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${i(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${Bn(n,Ie(t,"couriers"))}
          <label>${le("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(qe(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((g,d)=>Yt(t,g,d,D,N)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${y("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${y("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const P=e.querySelector("#prForm"),u=Aa(P),R=e.querySelector("#itemRows"),M=()=>{const g=Xe(P).map(v=>{const k=Va(v.qty,v.unitPrice);return{lineTotal:k!==""?k:v.lineTotal}}),d=Ka(g),w=P.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=d===""?"":"Total: "+be(w,d)},q=g=>{g.querySelector(".rmItem").onclick=()=>{R.children.length>1&&(g.remove(),M())},g.querySelectorAll("input, select").forEach(d=>d.oninput=M)};[...R.children].forEach(q),M();const T=(g,d,w,{search:v,resolve:k,toLabel:L,allowEmpty:H,onCommit:se})=>{const X=e.querySelector("#"+g),h=e.querySelector("#"+d),x=P.querySelector(`[name="${w}"]`),ie=()=>{se&&se()},J=z=>{const W=v(z).slice(0,30);h.innerHTML=W.map(re=>`<div class="curOpt" data-v="${i(re.value)}"><b>${i(re.main)}</b> ${i(re.name||"")}<span>${i(re.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',h.hidden=!1};X.onfocus=()=>{X.select(),J("")},X.oninput=()=>J(X.value),h.onmousedown=z=>{z.preventDefault();const W=z.target.closest(".curOpt");W&&(x.value=W.dataset.v,X.value=L(W.dataset.v),h.hidden=!0,ie())},X.onblur=()=>setTimeout(()=>{h.hidden=!0;const z=X.value.trim();if(!z&&H)x.value="";else{const W=k(z);W!=null&&(x.value=W)}X.value=L(x.value),ie()},120)};T("curSearch","curList","currency",{search:g=>Mn(g).map(d=>({value:d.code,main:d.code,name:d.name,sub:d.sym||""})),resolve:g=>{const d=g.split("—")[0].trim().toUpperCase();return En(d)?d:null},toLabel:g=>ot(g),onCommit:M});const j=g=>{const d=String(g||"").trim().toLowerCase();return c.filter(w=>!d||w.name.toLowerCase().includes(d)||(w.displayName||"").toLowerCase().includes(d)||(w.category||"").toLowerCase().includes(d)).sort((w,v)=>(w.displayName||w.name).localeCompare(v.displayName||v.name)).map(w=>({value:w.name,main:w.displayName||w.name,name:w.displayName?w.name:"",sub:w.category||""}))},C=e.querySelector("#venHint"),b=()=>{const g=P.querySelector('[name="vendor"]').value.trim();C.hidden=!g||c.some(d=>d.name.toLowerCase()===g.toLowerCase())};T("venSearch","venList","vendor",{search:j,resolve:g=>{const d=c.find(w=>w.name.toLowerCase()===g.toLowerCase()||(w.displayName||"").toLowerCase()===g.toLowerCase());return d?d.name:g},toLabel:g=>f(g),allowEmpty:!0,onCommit:b}),b(),e.querySelector("#addItem").onclick=()=>{R.insertAdjacentHTML("beforeend",Yt(t,{},R.children.length,D,N)),q(R.lastElementChild),Ve(R.lastElementChild)};const $=P.elements.namedItem("trackingLink");$&&($.oninput=()=>$.setCustomValidity(""));const E=()=>Object.fromEntries([...new FormData(P)].filter(([g])=>!g.startsWith("i_"))),F=E(),I=JSON.stringify(Xe(P));P.onsubmit=async g=>{g.preventDefault();const d=e.querySelector("#prSave");if(d.disabled||!u()||!jn($))return;e.querySelectorAll(".pr-save").forEach(L=>{L.disabled=!0,L.innerHTML=y("refresh","spin")+" Saving…"}),d.disabled=!0,d.textContent="Saving…";const w=E(),v=Xe(P),k=JSON.stringify(v)!==I;try{if(!v.length&&(!a||k))throw new Error("Add at least one item with a description");if(a){const L=Object.fromEntries(Object.entries(w).filter(([H,se])=>se!==F[H]));if(Object.keys(L).length||k){const H=await K("update",{id:n.id,updates:L,...k?{items:v}:{}});await U.applyResult(H,{itemsChanged:k}),O("PR updated")}location.hash="#/pr/"+n.id}else{const L=await K("create",{pr:w,items:v});await U.applyResult(L,{itemsChanged:!0}),O("Created "+L.pr.id),location.hash="#/pr/"+L.pr.id}}catch(L){O(L.message,!0),d.disabled=!1,d.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(H=>{H.disabled=!1,H.textContent=a?"Save changes":"Submit request"})}}}function Zt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),p=String(a||"").trim();return r&&o&&r===o&&p?p:Ge(t)}const Wt=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"];let me={viewer:"",sync:null,data:null,pending:null},pe="Open";function zn(){me.data=null}const Ae=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":be(e.currency,t),Jt=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Ra(e,t,s){var P;const a=t.me;if(!a||!["admin","finance"].includes(a.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((P=t.capabilities)!=null&&P.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const n=a.email+"|"+a.role,r=String(t.lastSync);(me.viewer!==n||me.sync!==r)&&(me={viewer:n,sync:r,data:null,pending:null},pe="Open");const o=me,p=async(u=!1)=>{if(u&&(o.data=null),!o.data){e.innerHTML=`<div class="connection-state" role="status">${y("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{o.pending||(o.pending=K("financeList").finally(()=>{o.pending=null}));const R=await o.pending;if(!Array.isArray(R.tasks)||!Array.isArray(R.financeUsers))throw new Error("The server did not return payment records.");o.data=R}catch(R){if(!e.isConnected||me!==o)return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${i(R.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>p(!0);return}}!e.isConnected||me!==o||D()};let S="",c=1,f=!1;const D=()=>{var I,G,g;const{tasks:u,financeUsers:R}=o.data,M=a.role==="admin",q=M?["Awaiting admin",...Wt]:Wt,T=s&&u.find(d=>d.prId===s),j=d=>pe==="All"||(pe==="Open"?d.state!=="Completed":pe==="Mine"?d.owner===a.email:d.state===pe),C=u.filter(j).filter(d=>[d.prId,d.poNo,d.vendor,d.owner].join(" ").toLowerCase().includes(S.toLowerCase())),b=Math.max(1,Math.ceil(C.length/25));c=Math.min(c,b);const $=(M?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(d=>[d,u.filter(w=>w.state===d).length]);if(e.innerHTML=`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${M?"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${y("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${$.map(([d,w])=>`<button class="kpi clickable" data-stage="${d}"><span class="l">${d}</span><span class="v">${w}</span></button>`).join("")}</div>
      ${T?N(T,M,R):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${M?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${u.length}</span></h2><p>${M?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${q.map(d=>`<button class="view-pill ${d===pe?"selected":""}" data-stage="${d}" aria-pressed="${d===pe}">${d}</button>`).join("")}</div>
      <label class="search-input">${y("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${i(S)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${C.slice((c-1)*25,c*25).map(d=>`<tr><td><a href="#/payments/${encodeURIComponent(d.prId)}"><b>${i(d.prId)}</b></a><small class="finance-sub">${i(d.vendor)}</small></td><td>${i(d.poNo||"—")}</td><td>${i(Ae(d,d.outstanding))}<small class="finance-sub">${i(d.paymentStatus)}</small></td><td>${i(d.owner||"Not started")}</td><td><span class="finance-status" data-state="${i(d.state)}">${i(d.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(d.prId)}" aria-label="Open payment ${i(d.prId)}">Open ${y("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${c===1?"disabled":""}>Previous</button><span>${C.length} results · Page ${c} of ${b}</span><button class="btn" id="financeNext" ${c===b?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${y("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${M?`<p class="finance-note">${y("info")} ${i(((I=o.data.zoho)==null?void 0:I.message)||"")}</p>`:""}
    </div>`,e.querySelector("#reloadPayments").onclick=()=>p(!0),e.querySelectorAll("[data-stage]").forEach(d=>d.onclick=()=>{pe=d.dataset.stage,c=1,D()}),e.querySelector("#financeSearch").oninput=d=>{S=d.target.value,c=1,D(),e.querySelector("#financeSearch").focus()},e.querySelector("#financePrev").onclick=()=>{c--,D()},e.querySelector("#financeNext").onclick=()=>{c++,D()},!T)return;const E=async(d,w)=>{if(!f){f=!0,e.querySelectorAll(".finance-detail button").forEach(v=>{v.disabled=!0});try{const v=await K(d,{id:T.prId,...w});if(!v.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");o.data.tasks=o.data.tasks.map(k=>k.prId===T.prId?v.task:k),e.isConnected&&me===o&&D(),await U.applyResult(v),O(d==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(v){O(v.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(k=>{k.disabled=!1})}finally{f=!1}}};e.querySelectorAll("[data-progress]").forEach(d=>d.onclick=()=>E("financeProgress",{state:d.dataset.progress})),(G=e.querySelector("#remindFinance"))==null||G.addEventListener("click",()=>E("financeRemind",{})),(g=e.querySelector("#sendToFinance"))==null||g.addEventListener("click",()=>E("financeRelease",{}));const F=e.querySelector("#recordPayment");if(F){const d="finance-attempt:"+a.email+":"+T.prId,w=v=>{const k=JSON.stringify(v);let L;try{L=JSON.parse(sessionStorage.getItem(d))}catch{}const H=(L==null?void 0:L.signature)===k?L:{signature:k,id:crypto.randomUUID()};return sessionStorage.setItem(d,JSON.stringify(H)),H.id};F.onsubmit=v=>{if(v.preventDefault(),!F.reportValidity())return;const k=Object.fromEntries(new FormData(F));k.currency=T.currency,E("financeRecordPayment",{...k,operationId:w(k)})}}for(const[d,w]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const v=e.querySelector("#"+d);v&&(v.onsubmit=k=>{k.preventDefault(),v.reportValidity()&&E(w,Object.fromEntries(new FormData(v)))})}},N=(u,R,M)=>{const q=u.owner===a.email.toLowerCase(),T=R||q,j=u.released&&!u.issue&&u.state!=="Completed";return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${i(u.vendor)}</span><h2>${i(u.prId)}</h2><p>${i(u.poNo||"PO reference not recorded")} · Request: ${i(u.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(u.prId)}">Request &amp; delivery ${y("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${i(Ae(u,u.total))}</b></div><div><span>Recorded paid</span><b>${i(Ae(u,u.paid))}</b></div><div><span>Outstanding</span><b>${i(Ae(u,u.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${i(u.state)}">${i(u.state)}</span><span>Responsible: <b>${i(u.owner||"Not started")}</b></span></div>
      ${u.issue?`<p class="finance-alert" role="status">${i(u.issue)}</p>`:""}
      ${u.released?`<p class="finance-note">Sent to Finance ${i(Q(u.sentAt))} by ${i(u.sentBy||"admin")}.</p>`:'<p class="finance-note">This request is with admin. Finance cannot see it until you send it.</p>'}
      ${!R&&u.owner&&!q?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${R&&!u.released&&!u.issue&&u.state!=="Completed"?'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${j&&(u.owner?T:!R)&&u.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${j&&T&&u.owner&&u.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${R&&u.released&&u.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${u.lastReminderAt?`<p class="finance-note">Last reminder: ${i(new Date(u.lastReminderAt).toLocaleString())}</p>`:""}
      ${R&&!u.owner&&j?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${j&&T&&u.owner&&u.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <label>Amount (${i(u.currency)})<input name="amount" type="number" step="${u.currency==="JPY"?"1":"0.01"}" min="${u.currency==="JPY"?"1":"0.01"}" max="${u.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${Jt()}" value="${Jt()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${R&&u.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${i(u.currency)})<input name="amount" type="number" min="0" max="${u.total}" step="${u.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${R&&u.released&&u.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${M.map(C=>`<option value="${i(C.email)}" ${C.email===u.owner?"selected":""}>${i(C.name||C.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${u.payments.map(C=>`<article><div><b>${i(Ae(u,C.amount))}</b><span>${i(Q(C.date))} · ${i(C.reference)}</span></div><p>${i(C.recordedBy)}${C.note?" · "+i(C.note):""}</p>${/^https:\/\//i.test(C.proofUrl||"")?`<a href="${i(C.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${y("external")}</a>`:""}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await p()}const Z=(e,t)=>`<div class="pd-f"><span class="vc-l">${i(e)}</span><b>${t||"—"}</b></div>`;let Re=!1,Qt=null;const Xt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${i(mt(s||t))}</span>
    <div>
      <span class="vc-l">${i(e)}</span>
      <b>${i(t)}</b>
      <div class="pd-sub">${i(a||"")}</div>
    </div>
  </div>`;function lt(e,t,s){var H,se,X;const a=t.prs.find(h=>h.id===s);if(!a){e.innerHTML=`<div class="card">PR ${i(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Qt!==s&&(Re=!1,Qt=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",o=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),p=["admin","finance"].includes(n.role),S=r||o&&a.status==="Submitted",c=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),f=on(a.status,n.role,o,c),D=(a.department||"").toLowerCase()==="production",N=r&&a.status==="Approved",P=r&&((H=t.capabilities)==null?void 0:H.financeHandoff)&&!a.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(a.status)&&!["Paid","FOC / Free"].includes(a.paymentStatus),u=r&&a.poNo&&!a.zohoPoId&&!((se=t.capabilities)!=null&&se.financeWorkflow),R=N?"":f.find(h=>!["Rejected","Cancelled","On Hold"].includes(h)),M=f.filter(h=>h!==R),q=h=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[h]||"Mark "+h.toLowerCase(),T=h=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[h]||"arrow",j=["Submitted","Approved","Ordered","In Transit","Received"],C=j.indexOf(a.status),b=(t.vendors||[]).find(h=>String(h.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),$=a.paymentTerm||b&&b.paymentTerms||"",E=t.lists&&t.lists.paymentTerms||[],F=["",...$&&!E.includes($)?[$,...E]:E].map(h=>`<option value="${i(h)}" ${h===$?"selected":""}>${h?i(h):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${y("right")}<span>${i(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${i(a.id)}</h1>${_e(a.status)}</div>
          <p class="request-subtitle">${i(a.project||a.department||"Purchase request")} · Created ${Q(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="sendFinanceBtn">${y("wallet")} Send to Finance</button>`:""}
          ${N?`<button class="btn primary" id="makePoBtn">${y("file")} Create purchase order</button>`:""}
          ${R?`<button class="btn primary" data-to="${i(R)}">${y(T(R))}${i(q(R))}</button>`:""}
          ${S?`<a class="btn" href="#/new/${i(a.id)}">${y("edit")} Edit</a>`:""}
          ${M.length||u?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${y("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${u?`<button class="btn" id="zohoPushBtn">${y("arrow")} Send to Zoho Books</button>`:""}
              ${M.map(h=>`<button class="btn ${["Rejected","Cancelled"].includes(h)?"danger":""}" data-to="${i(h)}">${y(T(h))}${i(q(h))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${i(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${C===-1?"Currently "+i(a.status.toLowerCase()):C===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${j.map((h,x)=>`<li class="${x<C?"done":x===C?"current":""}" ${x===C?'aria-current="step"':""}><span class="step-dot">${x<C?y("check"):x+1}</span><span>${i(h)}</span></li>`).join("")}</ol>
      </section>

      ${N&&Re?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${i(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${i(qe(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${F}</select>
          </label>
          ${b&&b.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${i(b.name)}'s vendor record — change it here if this order is different.</div>`:""}
          <div class="full" style="display:flex;gap:8px">
            <button class="btn primary" type="submit">Create PO &amp; mark Ordered</button>
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
          ${Z("Department",i(a.department))}
          ${Z("Project",i(a.project))}
          ${Z("Vendor",i(a.vendor))}
          ${Z("Purpose",i(a.purpose))}
          ${Z("Priority",i(a.priority))}
          ${p?Z("Payment status",i(a.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${Xt("Requested by",Zt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+Q(a.createdAt))}
          ${a.approverEmail||a.approvedByName?Xt("Approved by",Zt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+Q(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${D?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(h=>`<tr>
            <td>${i(h.itemNo)}</td>
            <td class="wrap">${i(h.description)}</td>${D?`<td>${i(h.partNo)}</td>`:""}<td>${i(h.materialType)}</td>
            <td>${i([h.qty,h.unit].filter(Boolean).join(" "))}</td>
            <td>${h.unitPrice?i(be(a.currency||"INR",Number(h.unitPrice))):"—"}</td>
            <td>${h.lineTotal?i(be(a.currency||"INR",Number(h.lineTotal))):"—"}</td>
            <td>${h.purchaseLink?`<a href="${i(h.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${h.datasheetDoc?` <a href="${i(h.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${D?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?i(be(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${Z("Expected",Q(a.expectedDate))}
          ${Z("Received",Q(a.receivedAt))}
          ${Z("Tracking",Fn(a))}
          ${Z("Notes",i(a.notes))}
        </div>
        </div>
      </div>

      ${p&&((X=t.capabilities)!=null&&X.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(a.status)?`<div class="card pd-body"><h2>Payment work</h2><p>${a.financeReleased?"Sent to Finance. View responsibility and payment records.":"With admin. Hidden from Finance until you send it."}</p><a class="btn" href="#/payments/${encodeURIComponent(a.id)}">${y("wallet")} Open payments</a></div>`:""}

      ${p?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${Z("PO reference",[i(a.poNo),Q(a.poDate)].filter(Boolean).join(" · "))}
          ${Z("Invoice / order #",[i(a.invoiceNo),Q(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${Z("Payment term",i(a.paymentTerm))}
          ${Z("Quotation / PI",a.quotationDoc?`<a href="${i(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${Z("Zoho Books PO",a.zohoPoNumber?i(a.zohoPoNumber):"")}
        </div>
        </div>
      </div>`:""}

      ${n.role==="admin"?`
      <div class="card pd-danger">
        <div>
          <b>Delete this purchase request</b>
          <div class="pd-sub">Deletion is permanent and cannot be undone. Item rows and this PR leave all active views.</div>
        </div>
        <button class="btn danger" id="devDelete">Delete PR permanently</button>
      </div>`:""}
      </aside></div>
    </div>`;const I=e.querySelector("#requestMore");e.onclick=h=>{I&&!I.contains(h.target)&&(I.open=!1)},e.onkeydown=h=>{h.key==="Escape"&&(I!=null&&I.open)&&(I.open=!1,I.querySelector("summary").focus())},I==null||I.addEventListener("focusout",h=>{I.contains(h.relatedTarget)||(I.open=!1)}),e.querySelectorAll("[data-to]").forEach(h=>h.onclick=async()=>{const x=h.dataset.to;if((x==="Rejected"||x==="Cancelled")&&!confirm(`Mark ${a.id} as ${x}?`))return;const ie=h.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(J=>{J.disabled=!0}),h.innerHTML=y("refresh","spin")+" Updating…";try{const J=await K("transition",{id:a.id,to:x});O(a.id+" → "+x),await U.applyResult(J)}catch(J){O(J.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(z=>{z.disabled=!1}),h.innerHTML=ie}});const G=e.querySelector("#makePoBtn"),g=e.querySelector("#sendFinanceBtn");g&&(g.onclick=async()=>{g.disabled=!0;try{const h=await K("financeRelease",{id:a.id});zn(),await U.applyResult(h),O(a.id+" sent to Finance")}catch(h){O(h.message,!0),g.disabled=!1}}),G&&(G.onclick=()=>{var h,x;Re=!0,lt(e,t,s),Ve((h=e.querySelector("#poForm"))==null?void 0:h.closest(".card")),(x=e.querySelector("[name=poNo]"))==null||x.focus()});const d=e.querySelector("#poCancelBtn");d&&(d.onclick=()=>{Re=!1,lt(e,t,s)});const w=e.querySelector("#poForm"),v=w?Aa(w):null;w&&(w.onsubmit=async h=>{if(h.preventDefault(),!v())return;const x=new FormData(w),ie=String(x.get("poNo")||"").trim();if(!ie)return;const J=w.querySelector('button[type="submit"]');J.disabled=!0;let z;try{z=await K("update",{id:a.id,updates:{poNo:ie,poDate:x.get("poDate")||"",paymentTerm:x.get("paymentTerm")||""}});const W=await K("transition",{id:a.id,to:"Ordered"});O(a.id+" → Ordered (PO "+ie+")"),Re=!1,await U.applyResult(W)}catch(W){z&&await U.applyResult(z),O(W.message,!0),J.disabled=!1}});const k=e.querySelector("#zohoPushBtn");k&&(k.onclick=async()=>{k.disabled=!0;try{const{pr:h}=await K("zohoPushPo",{id:a.id});O(a.id+" → Zoho Books PO "+h.zohoPoNumber),await U.applyResult({pr:h})}catch(h){O(h.message,!0),k.disabled=!1}});const L=e.querySelector("#devDelete");L&&(L.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){L.disabled=!0;try{const h=await K("delete",{id:a.id});O(a.id+" deleted"),location.hash="#/",await U.applyResult(h)}catch(h){O(h.message,!0),L.disabled=!1}}})}let xe=null,de=null,dt="";const Yn=["Domestic","International"];function bt(e){return xe===null&&(xe=e.vendors||[]),xe}function Zn(e){const t=e.lists&&e.lists.departments||[],s=bt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const ae=(e,t,s,a="")=>`<label class="adm-field">${i(e)}
    <input class="adm-input" name="${t}" value="${i(s||"")}" placeholder="${i(a)}">
  </label>`;function Wn(e,t){const s=bt(e),a=de&&s.find(r=>r.name.toLowerCase()===de.toLowerCase());if(a)return Jn(e,a);const n=[...s].sort((r,o)=>r.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${Ye(dt,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${ht(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${i(r.name)}</td>
            <td>${(r.departments||[]).map(o=>`<span class="adm-chip on">${i(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${i(r.type||"—")}</td>
            <td>${i(r.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${i(r.name)}" title="Remove vendor">
                ${y("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${yt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ca(n.length,n.length)}</span></div>
    </div>`}const Ca=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function Jn(e,t){const s=vt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${i(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?i(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${i(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${i(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${y("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${i(be("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${Zn(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some(S=>S.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${i(o)}">${i(o)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${i(t.name)}">
        </label>
        <div class="adm-grid2">
          ${ae("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${ae("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${ae("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...Yn].map(o=>`<option value="${i(o)}" ${o===(t.type||"")?"selected":""}>${o?i(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${ae("Contact person","contactPerson",t.contactPerson)}
          ${ae("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${i(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${i(t.address||"")}"></label>
        <div class="adm-grid2">
          ${ae("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${ae("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${i(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${ae("Account number","accountNumber",t.accountNumber)}
          ${ae("IFSC","ifsc",t.ifsc)}
        </div>
        ${ae("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${r}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${ae("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function Qn(e,t,s){const a=async(c,f,D)=>{try{const N=await K(c,f);xe=N.vendors,await U.applyResult(N),O(D),e.isConnected&&s()}catch(N){O(N.message,!0)}};ft(e,{get:()=>dt,set:c=>{dt=c},count:Ca,match:c=>new Set(fa(bt(t),c).map(f=>f.name))}),e.querySelectorAll(".vRow").forEach(c=>c.onclick=f=>{f.target.closest(".vRm")||(de=c.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(c=>c.onclick=()=>{confirm(`Remove vendor "${c.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:c.dataset.name},`${c.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const c=e.querySelector("#nvName").value.trim();if(!c){O("Vendor name required",!0);return}de=c,a("vendorSet",{name:c,updates:{}},`${c} added — fill in the details`)});const r=()=>{de=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=r);const p=e.querySelector("#vCancel");p&&(p.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(c=>c.onclick=()=>c.classList.toggle("on"));const S=e.querySelector("#vForm");S&&(S.onsubmit=c=>{c.preventDefault();const f={};for(const[N,P]of new FormData(S))f[N]=P.trim();f.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(N=>N.dataset.dept);const D=f.name||de;a("vendorSet",{name:de,updates:f},`${D} saved`),de=D})}function Xn(){de=null}const Ce=["admin","approver","finance","requester"],es={admin:"Full access to settings, users, PRs, and analytics.",approver:"Approves or rejects submitted purchase requests in their department.",finance:"Sees requests sent by admin. In progress assigns responsibility through payment completion.",requester:"Can create purchase requests and edit own submitted PRs."},ea=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let ee="users",ge=null,ct="",Te=null,He=null,oe=!1;const ta={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Te,set:e=>{Te=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>He,set:e=>{He=e},seed:e=>e.materialTypes}};function ts(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%ea.length;return ea[t]}const et=e=>e[0].toUpperCase()+e.slice(1),as={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${y("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${y("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${y("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${y("vendors")} Add Vendor`}};function ye(e,t){if(ge===null){e.innerHTML='<div class="card">Loading users…</div>',K("usersList").then(a=>{ge=a.users,ye(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${i(a.message)}</div>`});return}Te===null&&(Te=t.projects||[]),He===null&&(He=t.materialTypes||[]);const s=as[ee];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${s.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${ee==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${ee==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${ee==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${ee==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${ee==="users"?ns(t):ee==="vendors"?Wn(t,oe):is(t,ta[ee])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{ee=a.dataset.tab,oe=!1,Xn(),ye(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(oe=!oe,ye(e,t),oe){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},ee==="users"?ss(e,t):ee==="vendors"?Qn(e,t,()=>{oe=!1,ye(e,t)}):rs(e,t,ta[ee])}function ns(e){const t=a=>(Ce.includes(a.role)?Ce:[a.role,...Ce]).map(n=>`<option value="${i(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?i(et(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Oe(e).includes(a)?[a,...Oe(e)]:Oe(e)].map(n=>`<option value="${i(n)}" ${n===(a||"")?"selected":""}>${n?i(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${y("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Ye(ct,"Search by name or email…")}
      ${oe?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${Ce.map(a=>`<option value="${a}">${et(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...ge].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Ge(a.email);return`<tr data-search="${ht(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${ts(a.email)}">${i(mt(a.email))}${a.picture?`<img src="${i(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${y("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${yt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${ge.length} of ${ge.length} active members</span>
        <div class="adm-pager">
          <button disabled>${y("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${y("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${Ce.map(a=>`<div class="adm-rolecard">
        <h4>${et(a)}</h4>
        <p>${es[a]}</p>
      </div>`).join("")}
    </div>`}function ss(e,t){ft(e,{get:()=>ct,set:n=>{ct=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,o)=>{try{const p=await K("userSet",{email:n,...r});ge=p.users,oe=!1,await U.applyResult(p),O(o),e.isConnected&&ye(e,t)}catch(p){O(p.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:r,department:o},`${n} → ${r}`)})}function Oe(e){const t=e.lists&&e.lists.departments||[],s=(Te||[]).map(a=>a.department);return[...new Set([...t,...s])]}function is(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Ye(t.q,`Search ${t.plural} by name or department…`)}
      ${oe?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Oe(e).map(a=>`<option value="${i(a)}">${i(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${ht(a.department,a[t.key])}">
            <td class="adm-name">${i(a.department)}</td>
            <td>${i(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${i(a.department)}" data-val="${i(a[t.key])}" title="Remove">
                ${y("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${yt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${qa(s.length,s.length,t)}</span>
      </div>
    </div>`}const qa=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function rs(e,t,s){ft(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,o)=>qa(r,o,s)});const a=async(r,o,p)=>{try{const S=await K(r,o);s.set(S[s.respKey]),oe=!1,await U.applyResult(S),O(p),e.isConnected&&ye(e,t)}catch(S){O(S.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:o},`${r} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:o,val:p}=r.dataset;confirm(`Remove "${p}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:p},`${p} removed`)})}const aa={requester:0,approver:1,finance:1,admin:2};function na(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=aa[t.role];return s!=null&&s>=aa[e.minRole]}const Ta=document.getElementById("app"),tt={"":{fn:ua,nav:"Dashboard",icon:"grid"},vendors:{fn:Dn,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:wa,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:Ra,nav:"Payments",icon:"wallet",roles:["admin","finance"]},new:{fn:Gn,roles:["requester","approver","admin"]},pr:{fn:lt},admin:{fn:ye,nav:"Admin",icon:"settings",minRole:"admin"}};let ue,sa=null;function Pa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function os(){ue==null||ue.abort(),Ta.innerHTML=`<div class="auth-gate">
    <section class="auth-story">
      <img src="oizom-logo.png" alt="OIZOM" class="auth-logo">
      <span class="eyebrow">THE PROCUREMENT WORKSPACE</span>
      <h1>Every purchase.<br><em>One clear path.</em></h1>
      <p>From the first request to the final delivery.<br>A shared space to keep work moving.</p>
      <div class="auth-flow"><span>${y("file")} Request</span>${y("arrow")}<span>${y("check")} Approve</span>${y("arrow")}<span>${y("package")} Receive</span></div>
      <div class="auth-footer">Oizom · Redefining resources</div>
    </section>
    <section class="auth-box">
      <span class="auth-mark">${y("package")}</span>
      <span class="eyebrow">OIZOM PROCUREMENT</span>
      <h2>Welcome back.</h2>
      <p>Sign in with your Oizom account<br>to open your workspace.</p>
      <div id="gsignin"></div>
      <div class="auth-note">${y("shield")} For your @oizom.com work account</div>
    </section>
  </div>`,Fa(document.getElementById("gsignin"))}function La(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=y("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Da(){var g,d,w;const e=U.get(),{name:t,param:s}=Pa(),a=tt[t]||tt[""],n=((g=e.me)==null?void 0:g.role)||"";if(e.me&&!na(a,e.me)){location.hash="#/";return}ue==null||ue.abort(),ue=new AbortController;const r=ue.signal,o=Object.entries(tt).filter(([,v])=>{var k;return v.nav&&e.me&&na(v,e.me)&&(v.fn!==Ra||((k=e.capabilities)==null?void 0:k.financeWorkflow))}).map(([v,k])=>`<a href="#/${v}" ${t===v?'aria-current="page"':""} class="${t===v?"active":""}">${y(k.icon)}<span>${k.nav}</span>${t===v?'<span class="nav-dot"></span>':""}</a>`).join(""),p=e.notifications||[],S=p.filter(v=>!v.readAt).length,c=Ia()||{},f=c.email||((d=e.me)==null?void 0:d.email)||"",D=c.name||Ge(f),N=c.picture?`<img class="avatar" src="${i(c.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${i(mt(D))}</span>`,P=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=P+" · Oizom Procurement",Ta.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${y("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${o}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${y("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${y("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${y("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${y("right")} <b>${i(P)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${y("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${S?", "+S+" unread":""}" aria-expanded="false" aria-controls="nPanel">${y("bell")}${S?`<span class="nbadge">${S>9?"9+":S}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${S?S+" new":"All caught up"}</span></div>
              ${p.length?p.map(v=>`<${v.prId?"a":"div"} class="nitem ${v.readAt?"":"unread"}" ${v.prId?`href="#/pr/${i(v.prId)}"`:""}><div class="nmsg">${i(v.message)}</div><div class="ntime">${i(String(v.ts).slice(0,16).replace("T"," "))}</div></${v.prId?"a":"div"}>`).join(""):`<div class="nempty">${y("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${N}<span class="profile-copy"><span class="pname">${i(D)}</span><span class="prole">${i(n||"Oizom team")}</span></span>${y("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${i(f)}</div><button class="btn" id="btnOut">${y("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,La(e),document.getElementById("btnRefresh").onclick=async()=>{await U.refresh(),U.get().err||O("Data refreshed")};const u=document.getElementById("nPanel"),R=document.getElementById("nBtn"),M=document.getElementById("pMenu"),q=document.getElementById("profileBtn"),T=()=>{u.hidden=M.hidden=!0,R.setAttribute("aria-expanded","false"),q.setAttribute("aria-expanded","false")};R.onclick=()=>{var k;const v=u.hidden;T(),u.hidden=!v,R.setAttribute("aria-expanded",String(v)),v&&S&&(p.forEach(L=>{L.readAt||(L.readAt="now")}),(k=document.querySelector(".nbadge"))==null||k.remove(),K("notifRead").catch(()=>{}))},q.onclick=()=>{const v=M.hidden;T(),M.hidden=!v,q.setAttribute("aria-expanded",String(v))},document.getElementById("btnOut").onclick=xa,document.addEventListener("click",v=>{v.target.closest(".nbell, .profile-wrap")||T()},{signal:r});const j=document.getElementById("sidebar"),C=document.getElementById("workspace"),b=document.getElementById("openNav"),$=document.getElementById("shell"),E=matchMedia("(max-width: 960px)");let F=!1;const I=(v,k=!0)=>{var L;F=E.matches&&v,$.classList.toggle("nav-open",F),j.inert=E.matches&&!F,C.inert=F,document.getElementById("navBackdrop").hidden=!F,b.setAttribute("aria-expanded",String(F)),document.body.classList.toggle("nav-locked",F),F?(L=j.querySelector("nav a"))==null||L.focus():k&&E.matches&&b.focus()};I(!1,!1),b.onclick=()=>I(!0),document.getElementById("closeNav").onclick=()=>I(!1),document.getElementById("navBackdrop").onclick=()=>I(!1),j.querySelectorAll("a").forEach(v=>v.addEventListener("click",()=>I(!1),{signal:r})),E.addEventListener("change",()=>I(!1,!1),{signal:r}),document.addEventListener("keydown",v=>{if(v.key==="Escape"&&(F?I(!1):u.hidden?M.hidden||(T(),q.focus()):(T(),R.focus())),v.key==="Tab"&&F){const k=[...j.querySelectorAll("a, button")],L=k[0],H=k[k.length-1];v.shiftKey&&document.activeElement===L?(v.preventDefault(),H.focus()):!v.shiftKey&&document.activeElement===H&&(v.preventDefault(),L.focus())}},{signal:r});const G=document.getElementById("view");if(document.querySelector(".skip-link").onclick=v=>{v.preventDefault(),G.focus()},!e.lastSync)G.innerHTML=e.err?`<div class="connection-state">${y("info")}<h1>We couldn't load your workspace</h1><p>${i(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(w=document.getElementById("retryLoad"))==null||w.addEventListener("click",()=>U.refresh(),{signal:r});else{a.fn(G,e,s);const v=t+"/"+(s||"");sa!==v&&Ea(G),sa=v}}window.addEventListener("hashchange",()=>{Da(),window.scrollTo({top:0,behavior:"instant"})});let ia="",ra=!1;U.subscribe(e=>{e.err&&e.err!==ia&&O(e.err,!0),ia=e.err;const t=!ra&&e.lastSync;if(t&&(ra=!0),e.lastSync&&(e.loading||e.err)||["new","payments"].includes(Pa().name)&&!t&&e.lastSync&&document.querySelector("#view form")){La(e);return}Da()});Oa(()=>U.refresh());Ke()||os();
