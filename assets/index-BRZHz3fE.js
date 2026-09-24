(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Wt;const te=typeof window<"u"?(Wt=window.matchMedia)==null?void 0:Wt.call(window,"(prefers-reduced-motion: reduce)"):null,Le=new Set,$a="cubic-bezier(.2,.75,.25,1)";var Qt;(Qt=te==null?void 0:te.addEventListener)==null||Qt.call(te,"change",e=>{e.matches&&Le.forEach(t=>t.cancel())});function Ue(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||te!=null&&te.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:$a,fill:"backwards"});return r.id="workspace-reveal",Le.add(r),r.finished.then(()=>Le.delete(r),()=>Le.delete(r)),r}function Sa(e){if(te!=null&&te.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Ue(a,{delay:Math.min(s++*22,154),distance:10})}}const Jt={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},xe="oizom-id-token";let Tt=null;function wa(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function He(){const e=localStorage.getItem(xe);return e?wa(e)<Date.now()+3e4?(localStorage.removeItem(xe),null):e:null}function ka(){const e=He();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function Aa(){localStorage.removeItem(xe),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Ra(e){if(Tt=e,He()){e();return}dt(()=>{google.accounts.id.initialize({client_id:Jt.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(xe,t.credential),Tt()}}),google.accounts.id.prompt()})}function dt(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>dt(e,t+1),100)}function Ca(e){dt(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class et extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const Xt=new Set(["list","me","usersList","health","logTail"]),Ta=new Set([404,408,429,500,502,503,504]),qa=45e3;function Pa(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Te(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=Xt.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new et(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||Ta.has(t)})}async function La(e,t){const s=He();if(!s)throw new et("SIGNED_OUT");let a;try{a=await fetch(Jt.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(qa),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw Te(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=Pa(a);if(!a.ok)throw Te(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw Te(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw Te(e,{stage:n,kind:"response"});if(!r.ok)throw new et(r.error||"Request failed",{action:e});return r}async function U(e,t={}){for(let s=0;s<2;s++)try{return await La(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!Xt.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function Da(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Na(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Ea(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function Ma(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function qt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:Ea(n),qty:Ma(n)}})}let B={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const tt=new Set;let Pt=!1,ye=null,Ye=0;function xa(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Ze(){tt.forEach(e=>e(B))}const I={get:()=>B,subscribe(e){return tt.add(e),()=>tt.delete(e)},refresh(){return ye||(B={...B,loading:!0},ye=Promise.resolve().then(async()=>{try{let e,t;do t=Ye,e=await U("list");while(t!==Ye);xa(e),B={prs:qt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},Pt=!0}catch(e){if(e.message==="SIGNED_OUT"&&Pt){location.reload();return}B={...B,err:e.message,loading:!1}}}).finally(()=>{ye=null,B={...B,loading:!1},Ze()}),Ze(),ye)},async applyResult(e,{itemsChanged:t=!1}={}){Ye++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=B.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return I.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(m=>({...m,prId:e.pr.id})),i=qt([e.pr],r)[0];s.prs=n?B.prs.map(m=>m.id===i.id?i:m):[...B.prs,i]}a=!0}e.deleted&&(s.prs=B.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=B.me&&e.users.find(r=>r.email.toLowerCase()===B.me.email.toLowerCase());if(B.me&&(!n||!n.role))return I.refresh();n&&(s.me={...B.me,role:n.role,department:n.department}),a=!0}if(!a)return I.refresh();B={...B,...s},Ze()}},Lt={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Lt[e]||Lt.file}</svg>`}const o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ve(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function N(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const ee=e=>e?o(String(e).slice(0,10)):"—";function Ke(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function ct(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Dt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},De=e=>Dt[e]!=null?Dt[e]:e+" ";function we(e,t){const s=e==="INR"?"en-IN":"en-US";return De(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function W(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?De(e)+(t/1e6).toFixed(2)+"M":t>=1e3?De(e)+(t/1e3).toFixed(1)+"K":De(e)+Math.round(t).toLocaleString("en-US")}const Ae=["Cancelled","Rejected"],Ia=["Ordered","In Transit","Received"],_e=e=>Ia.includes(e.status)&&e.paymentStatus!=="Paid";function Nt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function Et(e){const t=e.filter(n=>!Ae.includes(n.status)),s=e.filter(_e),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:Nt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:Nt(t)}}const Ie={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:_e,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Ae.includes(e.status)};function Oa(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Mt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function ea(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function Ba(e){return e.filter(_e)}function Fa(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function ja(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function xt(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let i;if(t==="count")i=1;else{if(Ae.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const m=Number(n.amount);if(!n.amount||!isFinite(m)||(n.currency||"Unknown")!==s)continue;i=m}a[r]=(a[r]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Ua(e,t){const s={};for(const a of e){if(Ae.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function Ha(e,t,s=6){const a={};for(const i of e){if(Ae.includes(i.status)||(i.currency||"Unknown")!==t)continue;const m=Number(i.amount);if(!i.amount||!isFinite(m))continue;const g=i.vendor||"Unspecified";a[g]=(a[g]||0)+m}const n=Object.entries(a).map(([i,m])=>({vendor:i,total:m})).sort((i,m)=>m.total-i.total);if(n.length<=s)return n;const r=n.slice(s).reduce((i,m)=>i+m.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function Va(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Ka(e){const t=(r,i)=>{const m=Date.parse(r),g=Date.parse(i);return isFinite(m)&&isFinite(g)?(g-m)/864e5:null},s=r=>r.length?r.reduce((i,m)=>i+m,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const _a=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Ga(e,t=Date.now()){const s=_a.map(a=>({...a,count:0}));return e.filter(_e).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(i=>r>=i.min&&r<=i.max)||s[s.length-1]).count++}),s}const pe=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],ta=["Unpaid","Paid","Partially Paid","FOC / Free"],Oe={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function za(e,t,s,a,n){const r=(Oe[e]||{})[t];return r?r.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function Ya(e,t,s,a){return Object.keys(Oe[e]||{}).filter(n=>za(e,n,t,s,a))}function Za(e,t){return!!(Oe[e]&&Oe[e][t])}const Wa=["Submitted","Approved","Rejected"],It=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],at=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),c={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:at()},fe=25,Qa={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let nt;function Ja(e,t){c.tab=t==="admin"?"all":"dept",t==="admin"&&(c.statuses=e==="pending"?["Submitted"]:[...pe]),c.sel=["pending","unpaid"].includes(e)?e:"total",c.page=1,c.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ie(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(aa(e,t),s&&Ue(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const Ot=e=>String(e||"").slice(0,10);function Xa(e){const t=c.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Ot(e.createdAt)<t.from||t.to&&Ot(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function aa(e,t){clearTimeout(nt),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          ${v("plus")} New request
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,en(e.querySelector("#tabBody"),e,t)}const ce=e=>e.length?e.map(([t,s])=>W(t,s)).join(" + "):"—";function en(e,t,s){var wt,kt,At,Rt,Ct;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",i=a.role==="finance",m=[(wt=a.email)==null?void 0:wt.toLowerCase(),a.role,(kt=a.department)==null?void 0:kt.toLowerCase()].join("|");c.viewer!==m&&Object.assign(c,{viewer:m,tab:r?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:at()});const g=n?["mine","dept","approved"]:r?["all","mine"]:i?["mine","payments"]:["mine"];g.includes(c.tab)||(c.tab="mine");const u=r&&c.statuses.length===1&&c.statuses[0]==="Approved",y=c.statuses.length===pe.length,D=c.tab==="dept",T=c.tab==="approved",q=c.tab==="all",A=c.tab==="payments",F=Oa(s.prs,a.email),M=n?Mt(s.prs,a.email):[],R=n?ea(s.prs,a.department):[],P=i?Ba(s.prs):[],E=D?R:T?M:q?s.prs:A?P:F,f=r&&!y?E.filter(l=>c.statuses.includes(l.status)):E,b=Et(f),Q=n?R.filter(Ie.pending):[],O=r?Et(s.prs):n?{pending:Q.length,highPriority:Q.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,C=u?[{key:"total",n:b.total,l:"Ready to purchase",s:q?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:b.spendTotals.length?W(...b.spendTotals[0]):"-",l:"Approved value",s:b.spendTotals.length>1?"+ "+ce(b.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:A?[{key:"total",n:b.total,l:"Awaiting payment",s:ce(b.unpaidTotals)},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?W(...b.spendTotals[0]):"—",l:"Total value",s:b.spendTotals.length>1?"+ "+ce(b.spendTotals.slice(1)):""}]:D?[{key:"total",n:b.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:ce(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?W(...b.spendTotals[0]):"—",l:"Total spend",s:b.spendTotals.length>1?"+ "+ce(b.spendTotals.slice(1)):""}]:[{key:"total",n:b.total,l:T?"Approved PRs":r&&!y?"Selected PRs":q?"All PRs":"Total PRs",s:T?"across all requesters":r&&!y?"Matching your selected statuses":q?"every department":""},...T?[]:[{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:ce(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?W(...b.spendTotals[0]):"—",l:T?"Approved spend":"Total spend",s:b.spendTotals.length>1?"+ "+ce(b.spendTotals.slice(1)):""}];if(q)for(const l of Fa(f))C.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+Ke(l.email),s:l.email,cls:"go"});C.some(l=>l.key===c.sel)||(c.sel="total");const _=(c.sel.startsWith("ap:")?Mt(f,c.sel.slice(3)):f.filter(Ie[c.sel])).sort((l,w)=>(w.createdAt||"").localeCompare(l.createdAt||"")),J=C.find(l=>l.key===c.sel),h=[...new Set(f.map(l=>l.department).filter(Boolean))].sort(),$=[...new Set(f.map(l=>l.vendor).filter(Boolean))].sort();c.filters.dept&&!h.includes(c.filters.dept)&&(c.filters.dept=""),c.filters.vendor&&!$.includes(c.filters.vendor)&&(c.filters.vendor="");const k=_.filter(Xa),p=Object.values(c.filters).some(Boolean),d=Math.max(1,Math.ceil(k.length/fe));c.page=Math.min(Math.max(1,c.page),d);const S=k.slice((c.page-1)*fe,c.page*fe),x=["dept","vendor","from","to"].filter(l=>c.filters[l]).length,j=y?"All statuses":c.statuses.join(" + "),z=r?(q?y?"All requests":u?"Approved requests":j:"Your requests")+(q?"":" · "+j):D?"Department requests":T?"Approved by you":A?"Payment queue":"Your requests",ne=(l,w,L)=>`<button type="button" id="scope-${l}" class="adm-tab ${c.tab===l?"active":""}" data-tab="${l}" aria-pressed="${c.tab===l}">${w} <span>${L}</span></button>`,Re=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),Ce=l=>{const w=r?pe:n&&l.status==="Submitted"&&Re(l)?Wa:null;return w?`<select class="status-sel" data-status="${o(l.status)}" aria-label="Status for ${o(l.id)}" data-id="${o(l.id)}">${w.map(L=>`<option ${L===l.status?"selected":""}>${o(L)}</option>`).join("")}</select>`:Ve(l.status)},se=l=>`<select class="pay-sel" aria-label="Payment status for ${o(l.id)}" data-id="${o(l.id)}">${ta.map(w=>`<option ${w===l.paymentStatus?"selected":""}>${o(w)}</option>`).join("")}</select>`;e.innerHTML=`
    ${r?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${y?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${y}">All <span>${E.length}</span></button>
        ${It.map((l,w)=>`<button type="button" class="view-pill ${!y&&c.statuses.includes(l)?"selected":""}" id="status-pill-${w}" data-admin-status="${o(l)}" aria-pressed="${!y&&c.statuses.includes(l)}">${l==="Submitted"?"Pending approval":o(l)}<span>${E.filter(L=>L.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${q?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${q}">Everyone</button>
        <button type="button" class="view-pill ${q?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!q}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${v("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${o(z)}</span><span class="view-result-count" role="status">${f.length} ${f.length===1?"request":"requests"}</span></div>
    </section>`:""}
    ${!r&&g.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${ne("mine","Your requests",F.length)}
      ${n?ne("dept",o(a.department||"Your department"),R.length)+ne("approved","Approved by you",M.length):""}
      ${i?ne("payments","Awaiting payment",P.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${u?"approved-kpis":""}" aria-label="Filter requests by summary">${C.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===c.sel?"sel":""}" data-key="${o(l.key)}" aria-pressed="${l.key===c.sel}">
        <span class="kpi-top"><span class="l">${o(l.l)}</span>${v(Qa[l.key])}</span>
        <span class="v">${o(String(l.n))}</span><span class="s">${o(l.s||(l.key==="total"?z:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${O?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?o(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${O.pending?"":"disabled"}><span class="attention-icon">${v("clock")}</span><span><b>${O.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${O.pending?"Open approval queue":"No approvals waiting"}</small></span>${v("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${O.unpaidCount?"":"disabled"}><span class="attention-icon">${v("wallet")}</span><span><b>${O.unpaidCount} awaiting payment</b><small>${O.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${v("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${v("info")}</span><span><b>${O.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${k.length}</span></h2><p>${o(z)} · ${c.sel==="total"?"Latest first":o(J.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${o(c.filters.q)}"></label>
        ${r?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${pe.map(l=>`<option value="${o(l)}" ${c.filters.status===l?"selected":""}>${o(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${x?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${c.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${x?`<span class="count-badge">${x}</span>`:""}</button>
        ${p?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${c.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${h.map(l=>`<option value="${o(l)}" ${c.filters.dept===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${$.map(l=>`<option value="${o(l)}" ${c.filters.vendor===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${o(c.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${o(c.filters.to)}"></label>
        ${q?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${C.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${o(l.key)}" ${c.sel===l.key?"selected":""}>${o(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${A?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${S.map(l=>`<tr class="rowlink ${A?"payment-row":""}" data-id="${o(l.id)}">
          <td class="request-id"><a href="#/pr/${o(l.id)}">${o(l.id)}</a></td>
          <td class="request-date">${ee(l.createdAt)}</td>
          ${A?`<td>${o(l.vendor)}</td><td>${o(l.poNo||"—")}</td><td>${o(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${o(l.department)}</td><td class="wrap request-item">${o(l.item)}</td><td class="request-vendor">${o(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?o(W(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${A?se(l):Ce(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(p?"search":"file")}<b>${p?"No matching requests":u?"No requests ready for purchasing":r&&!y?"No requests with these statuses":"No requests here yet"}</b><span>${p?"Try a different search or clear your filters.":u?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":r&&!y?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${p?'<button class="btn" id="emptyClear">Clear filters</button>':r&&!y?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${k.length?(c.page-1)*fe+1:0}–${Math.min(c.page*fe,k.length)} of ${k.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${c.page===1?"disabled":""}>${v("left")}</button><span>Page ${c.page} of ${d}</span><button class="btn" id="dashNext" aria-label="Next page" ${c.page===d?"disabled":""}>${v("right")}</button></div></div>
    </section>`;const G=l=>{c.tab=l,c.sel="total",c.page=1,r&&(c.filters=at()),ie(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>G(l.dataset.tab));const de=()=>{c.statuses=[...pe],G(c.tab),t.querySelector("#showAllRequests").focus()};(At=e.querySelector("#showAllRequests"))==null||At.addEventListener("click",de),(Rt=e.querySelector("#emptyAllRequests"))==null||Rt.addEventListener("click",()=>{c.tab="all",de()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const w=l.dataset.adminStatus;if(y)c.statuses=[w];else if(!c.statuses.includes(w))c.statuses=It.filter(L=>L===w||c.statuses.includes(L));else if(c.statuses.length>1)c.statuses=c.statuses.filter(L=>L!==w);else return;G(c.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>G(l.dataset.adminScope)),(Ct=e.querySelector("#resetAdminView"))==null||Ct.addEventListener("click",()=>{c.statuses=["Approved"],G("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{c.sel=l.dataset.key,c.page=1,ie(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var L,V;if(!r&&!(n&&l.dataset.queue==="pending"))return;Ja(l.dataset.queue,a.role),ie(t,s);const w=t.querySelector(".requests-card");w.focus({preventScroll:!0}),(V=w.scrollIntoView)==null||V.call(w,{block:"start",behavior:(L=window.matchMedia)!=null&&L.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=w=>{w.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{c.moreFilters=!c.moreFilters,e.querySelector("#advancedFilters").hidden=!c.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(c.moreFilters))};const ze=e.querySelector("#dashApprover");ze&&(ze.onchange=()=>{c.sel=ze.value,c.page=1,ie(t,s)});const ft=l=>{var w,L;c.page+=l,ie(t,s),(L=(w=t.querySelector(".requests-card")).scrollIntoView)==null||L.call(w,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>ft(-1),e.querySelector("#dashNext").onclick=()=>ft(1);const he=(l,w)=>{c.filters[l]=w,c.page=1,ie(t,s)};e.querySelector("#dashQ").oninput=l=>{c.filters.q=l.target.value,c.page=1,clearTimeout(nt),nt=setTimeout(()=>{t.isConnected&&ie(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>he("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>he("vendor",l.target.value);const bt=e.querySelector("#dashStatus");bt&&(bt.onchange=l=>he("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>he("from",l.target.value),e.querySelector("#dashTo").onchange=l=>he("to",l.target.value);const gt=()=>{c.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},c.page=1,c.sel="total",ie(t,s)},$t=e.querySelector("#dashFilterClear"),St=e.querySelector("#emptyClear");$t&&($t.onclick=gt),St&&(St.onclick=gt),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,L=s.prs.find(Y=>Y.id===w),V=l.value;if(!(!L||V===L.status)){if((V==="Rejected"||V==="Cancelled")&&!confirm(`Mark ${w} as ${V}?`)){l.value=L.status;return}l.disabled=!0;try{let Y;a.role==="admin"&&!Za(L.status,V)?Y=await U("update",{id:w,updates:{status:V}}):Y=await U("transition",{id:w,to:V}),N(`${w} → ${V}`),await I.applyResult(Y)}catch(Y){N(Y.message,!0),l.value=L.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,L=s.prs.find(Y=>Y.id===w),V=l.value;if(!(!L||V===L.paymentStatus)){l.disabled=!0;try{const Y=await U("update",{id:w,updates:{paymentStatus:V}});N(`${w} payment → ${V}`),await I.applyResult(Y)}catch(Y){N(Y.message,!0),l.value=L.paymentStatus,l.disabled=!1}}}})}function mt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function ut(e,t){const s=mt(e,t),a=s.filter(Ie.spend),n={};for(const r of a){const i=Number(r.amount);if(!r.amount||!isFinite(i))continue;const m=r.currency||"INR";n[m]=(n[m]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((r,i)=>i[1]-r[1]),unpaid:s.filter(Ie.unpaid).length,lastOrder:s.reduce((r,i)=>{const m=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(m)&&m>r?m:r},"")}}function na(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(mt(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const tn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],an={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},nn=1,sn=.7,sa=.5,on=.4,rn=.3,ln=4,dn=e=>e.length>=7?2:e.length>=ln?1:0,Be=e=>String(e??"").toLowerCase().trim();function cn(e,t){const s=e[t];return Be(Array.isArray(s)?s.join(" "):s)}function oa(e){return Be(e).split(/[\s,]+/).filter(Boolean)}function mn(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function Bt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return nn;if(s.some(n=>n.startsWith(t)))return sn;if(e.includes(t))return sa;const a=dn(t);return a&&s.some(n=>mn(n,t)<=a)?rn:0}function un(e,t){const s=Bt(e,t);if(s)return s;const a=an[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):Bt(e,r)>=sa)?on:0}function pn(e,t){const s=Array.isArray(t)?t:oa(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:i,weight:m}of tn)r=Math.max(r,un(cn(e,i),n)*m);if(!r)return 0;a+=r}return a}function ra(e,t){const s=oa(t);return s.length?(e||[]).map(a=>({v:a,score:pn(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Be(a.v.displayName||a.v.name).localeCompare(Be(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Ge(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${o(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const pt=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function vt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function ht(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const i=e.querySelector("#"+n);if(!i)return;const m=i.closest(".adm-card"),g=m.querySelector(".admSearchClear"),u=()=>vn(m,t(),a,r);i.oninput=()=>{s(i.value),g.hidden=!i.value,u()},i.onkeydown=y=>{y.key==="Escape"&&i.value&&(i.value="",i.oninput())},g.onclick=()=>{i.value="",i.oninput(),i.focus()},u()}function vn(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let m=null;r.forEach(y=>{y.hidden=n?i?!i.has(y.dataset.name):!y.dataset.search.includes(n):!1,y.classList.remove("last-visible"),y.hidden||(m=y)}),m&&m.classList.add("last-visible");const g=e.querySelector(".adm-nomatch");g&&(g.hidden=!!m||!r.length);const u=e.querySelector(".adm-count");u&&(u.textContent=s(r.filter(y=>!y.hidden).length,r.length))}let be="";const ia={Domestic:"dom",Foreign:"for",Mixed:"mix"},hn=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function la(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(hn(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function yn(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function fn(e,t){const s=ut(e.prs,t.name),a=na(t,e.prs),n=s.spendTotals.length?W(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${o(t.name)}">
      <div class="vc-top">
        ${la(t)}
        <div class="vc-title">
          <b>${o(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${o(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${ia[a]}">${o(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${o(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${ee(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${yn(t)}</div>
    </a>`}const bn=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Ft(e,t){const s=bn(e.vendors),a=t.trim()?ra(s,t):s;return a.length?a.map(n=>fn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function gn(e,t,s){if(s)return $n(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Ge(be,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Ft(t,be)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),i=()=>{be=n.value,r.hidden=!be,a.innerHTML=Ft(t,be)};n.oninput=i,n.onkeydown=m=>{m.key==="Escape"&&n.value&&(n.value="",i())},r.onclick=()=>{n.value="",i(),n.focus()}}function $n(e,t,s){const a=(t.vendors||[]).find(u=>u.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=ut(t.prs,a.name),r=na(a,t.prs),i=t.me&&t.me.role==="admin",m=mt(t.prs,a.name).sort((u,y)=>(y.createdAt||"").localeCompare(u.createdAt||"")),g=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,u])=>u);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${la(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${o(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${ia[r]}">${o(r.toUpperCase())}</span>`:""}
            </h1>
            <p>${o(a.category||"Vendor")}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          ${i?'<a class="btn" href="#/admin">Edit in Admin</a>':""}
          <a class="btn" href="#/vendors">← All vendors</a>
        </div>
      </div>
      <div class="kpis">
        <div class="kpi"><div class="v">${n.count}</div><div class="l">Purchase requests</div></div>
        <div class="kpi ${n.unpaid?"bad":""}"><div class="v">${n.unpaid}</div><div class="l">Unpaid</div></div>
        <div class="kpi"><div class="v">${n.spendTotals.length?o(W(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([u,y])=>W(u,y)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${ee(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${g.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${g.map(([u,y])=>`<div><span class="vc-l">${o(u)}</span><b>${o(y)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(u=>`<span class="vc-chip">${o(u)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${m.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${m.map(u=>`<tr class="rowlink" data-id="${o(u.id)}">
            <td style="font-family:var(--mono);font-size:12px">${o(u.id)}</td>
            <td>${ee(u.createdAt)}</td><td>${o(u.department)}</td>
            <td class="wrap">${o(u.item)}</td>
            <td>${u.amount?o(W(u.currency||"INR",Number(u.amount))):"—"}</td>
            <td>${Ve(u.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(u=>u.onclick=()=>location.hash="#/pr/"+u.dataset.id)}const st=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],da=new Map(st.map(e=>[e.code,e])),Sn=e=>da.has(String(e||"").trim().toUpperCase());function ot(e){const t=da.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function wn(e){const t=String(e||"").trim().toLowerCase(),s=t?st.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...st],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function qe(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",m=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(m)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function jt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,i=a-n.t-n.b,m=Math.max(...e.map(R=>R.value),1),g=r/(e.length-1),u=R=>n.l+R*g,y=R=>n.t+i-R/m*i,D=e.map((R,P)=>`${P===0?"M":"L"}${u(P).toFixed(1)} ${y(R.value).toFixed(1)}`).join(" "),T=`${D} L${u(e.length-1).toFixed(1)} ${n.t+i} L${u(0).toFixed(1)} ${n.t+i} Z`,q=[0,.5,1].map(R=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-R)).toFixed(1)}" y2="${(n.t+i*(1-R)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),A=Math.ceil(e.length/6)||1,F=e.map((R,P)=>P%A===0||P===e.length-1?`<text x="${u(P).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${P===0?"start":P===e.length-1?"end":"middle"}">${o(R.month.slice(2))}</text>`:"").join(""),M=e.map((R,P)=>`<circle cx="${u(P).toFixed(1)}" cy="${y(R.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(R.month)}: ${o(t(R.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${q}
    <path d="${T}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${D}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${M}
    ${F}
  </svg>`}const kn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],An={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},Rn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Pe={currency:""};function ca(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?ea(t.prs,s.department):t.prs||[],r=ja(n);r.includes(Pe.currency)||(Pe.currency=r[0]||"");const i=Pe.currency,m=f=>i?W(i,f):String(f),g=i?xt(n,"spend",i):[],u=xt(n,"count"),y=i?Ha(n,i,6).map(f=>({label:f.vendor,value:f.total})):[],D=!a&&i?Ua(n,i).map(f=>({label:f.department,value:f.total})):[],T=Va(n),q=kn.filter(f=>T[f]).map(f=>({label:f,value:T[f]})),A=Ka(n),F=Ga(n),M=F.map(f=>({label:f.label,value:f.count})),R=F.reduce((f,b)=>f+b.count,0),P=g.reduce((f,b)=>f+b.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${o(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${r.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${v("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${r.map(f=>`<option value="${o(f)}" ${f===i?"selected":""}>${o(ot(f))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?o(m(P)):"—"}</div><div class="l">Total spend${i?" · "+o(i):""}</div></div>
        <div class="kpi"><div class="v">${A.avgApprovalDays!=null?A.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${A.avgDeliveryDays!=null?A.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${R?"warn":""}"><div class="v">${R}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+o(i):""}</p></div>
          </div>
          <div class="spend-chart">${g.length?jt(g,{valueFmt:f=>W(i,f),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${D.length?`<div class="card"><h2>Spend by department${i?" · "+o(i):""}</h2>
          <div class="pd-body">${qe(D,{valueFmt:m})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+o(i):""}</h2>
          <div class="pd-body">${qe(y,{valueFmt:m})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${qe(q,{colorOf:f=>An[f.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${qe(M,{colorOf:f=>Rn[f.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${jt(u,{valueFmt:f=>f+" PR"+(f===1?"":"s")})}</div>
      </div>
    </div>`;const E=e.querySelector("#insCur");E&&(E.onchange=()=>{var f;Pe.currency=E.value,ca(e,t),(f=e.querySelector("#insCur"))==null||f.focus()})}const ma={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function ua(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Cn(e){const t=String(e.trackingNo||"").trim(),s=ua(e.trackingLink)||(t?(ma[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[o(e.courier||""),s?`<a href="${o(s)}" target="_blank" rel="noopener noreferrer">${o(t||"Track shipment")} ↗</a>`:o(t)].filter(Boolean).join(" ")}function Tn(e,t=[]){const s=[...new Set([...t,...Object.keys(ma),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${o(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${o(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${o(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${o(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function qn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!ua(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const Pn="1900-01-01",Ln="2100-12-31",Dn="Enter a complete date with a year between 1900 and 2100.";function Se(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function pa(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(Dn)};return t.forEach(a=>{a.min=Pn,a.max=Ln;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const Nn=ta,En={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ne=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:En[t])||[],We={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},oe=(e,t,s)=>`<span class="lblrow">${o(e)}${We[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${o(We[t])}" data-tip="${o(We[t])}">?</span>`:""}</span>`;function me(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${n?o(n):"Select…"}</option>`).join("")}function Ut(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${o(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${o(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${o(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${o(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${me(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${o(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${me(Ne(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${o(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${o(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${o(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${v("close")}</button>
  </div>`}function Qe(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function Mn(e,t,s){const a=s?t.prs.find(h=>h.id===s):null,n=a||{},r=a?n.items||[]:[{}],i=t.me||{role:""},m=["approver","admin","finance"].includes(i.role),g=a?n.department||"":i.department||"",u=(t.projects||[]).filter(h=>h.department.toLowerCase()===g.toLowerCase()).map(h=>h.project),y=(t.vendors||[]).filter(h=>(h.departments||[]).some($=>$.toLowerCase()===g.toLowerCase())),D=h=>{const $=y.find(k=>k.name.toLowerCase()===String(h||"").toLowerCase());return $?$.displayName||$.name:String(h||"")},T=(t.materialTypes||[]).filter(h=>h.department.toLowerCase()===g.toLowerCase()).map(h=>h.materialType),q=g.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?Ve(n.status):""}
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn" href="${a?"#/pr/"+o(n.id):"#/"}">Cancel</a>
          <button class="btn primary pr-save" type="submit" form="prForm" id="prSave">${a?"Save changes":"Submit PR"}</button>
        </div>
      </div>
      <form id="prForm">
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${oe("Project*","project")} <select name="project" required>${me(u,n.project||"",!0)}</select></label>
              <label>${oe("Purpose","purpose")} <input name="purpose" value="${o(n.purpose)}"></label>
              <div class="pd-field full">${oe("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(D(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${oe("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(ot(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${oe("Priority","priority",!0)} <select name="priority">${me(Ne(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&i.role==="admin"?"":`<label>${oe("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o(Se(n.expectedDate))}"></label>`}
              ${m?`
              <label>${oe("Payment status*","payment")} <select name="paymentStatus" required>${me(Nn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${me(pe,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${o(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${oe("Notes","notes")} <textarea name="notes" rows="3">${o(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&i.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${o(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${o(Se(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${o(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${o(Se(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${me(Ne(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&i.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${Tn(n,Ne(t,"couriers"))}
          <label>${oe("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o(Se(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((h,$)=>Ut(t,h,$,T,q)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const A=e.querySelector("#prForm"),F=pa(A),M=e.querySelector("#itemRows"),R=()=>{const h=Qe(A).map(p=>{const d=Da(p.qty,p.unitPrice);return{lineTotal:d!==""?d:p.lineTotal}}),$=Na(h),k=A.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=$===""?"":"Total: "+we(k,$)},P=h=>{h.querySelector(".rmItem").onclick=()=>{M.children.length>1&&(h.remove(),R())},h.querySelectorAll("input, select").forEach($=>$.oninput=R)};[...M.children].forEach(P),R();const E=(h,$,k,{search:p,resolve:d,toLabel:S,allowEmpty:x,onCommit:j})=>{const H=e.querySelector("#"+h),z=e.querySelector("#"+$),ne=A.querySelector(`[name="${k}"]`),Re=()=>{j&&j()},Ce=se=>{const G=p(se).slice(0,30);z.innerHTML=G.map(de=>`<div class="curOpt" data-v="${o(de.value)}"><b>${o(de.main)}</b> ${o(de.name||"")}<span>${o(de.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',z.hidden=!1};H.onfocus=()=>{H.select(),Ce("")},H.oninput=()=>Ce(H.value),z.onmousedown=se=>{se.preventDefault();const G=se.target.closest(".curOpt");G&&(ne.value=G.dataset.v,H.value=S(G.dataset.v),z.hidden=!0,Re())},H.onblur=()=>setTimeout(()=>{z.hidden=!0;const se=H.value.trim();if(!se&&x)ne.value="";else{const G=d(se);G!=null&&(ne.value=G)}H.value=S(ne.value),Re()},120)};E("curSearch","curList","currency",{search:h=>wn(h).map($=>({value:$.code,main:$.code,name:$.name,sub:$.sym||""})),resolve:h=>{const $=h.split("—")[0].trim().toUpperCase();return Sn($)?$:null},toLabel:h=>ot(h),onCommit:R});const f=h=>{const $=String(h||"").trim().toLowerCase();return y.filter(k=>!$||k.name.toLowerCase().includes($)||(k.displayName||"").toLowerCase().includes($)||(k.category||"").toLowerCase().includes($)).sort((k,p)=>(k.displayName||k.name).localeCompare(p.displayName||p.name)).map(k=>({value:k.name,main:k.displayName||k.name,name:k.displayName?k.name:"",sub:k.category||""}))},b=e.querySelector("#venHint"),Q=()=>{const h=A.querySelector('[name="vendor"]').value.trim();b.hidden=!h||y.some($=>$.name.toLowerCase()===h.toLowerCase())};E("venSearch","venList","vendor",{search:f,resolve:h=>{const $=y.find(k=>k.name.toLowerCase()===h.toLowerCase()||(k.displayName||"").toLowerCase()===h.toLowerCase());return $?$.name:h},toLabel:h=>D(h),allowEmpty:!0,onCommit:Q}),Q(),e.querySelector("#addItem").onclick=()=>{M.insertAdjacentHTML("beforeend",Ut(t,{},M.children.length,T,q)),P(M.lastElementChild),Ue(M.lastElementChild)};const O=A.elements.namedItem("trackingLink");O&&(O.oninput=()=>O.setCustomValidity(""));const C=()=>Object.fromEntries([...new FormData(A)].filter(([h])=>!h.startsWith("i_"))),_=C(),J=JSON.stringify(Qe(A));A.onsubmit=async h=>{h.preventDefault();const $=e.querySelector("#prSave");if($.disabled||!F()||!qn(O))return;e.querySelectorAll(".pr-save").forEach(S=>{S.disabled=!0,S.innerHTML=v("refresh","spin")+" Saving…"}),$.disabled=!0,$.textContent="Saving…";const k=C(),p=Qe(A),d=JSON.stringify(p)!==J;try{if(!p.length&&(!a||d))throw new Error("Add at least one item with a description");if(a){const S=Object.fromEntries(Object.entries(k).filter(([x,j])=>j!==_[x]));if(Object.keys(S).length||d){const x=await U("update",{id:n.id,updates:S,...d?{items:p}:{}});await I.applyResult(x,{itemsChanged:d}),N("PR updated")}location.hash="#/pr/"+n.id}else{const S=await U("create",{pr:k,items:p});await I.applyResult(S,{itemsChanged:!0}),N("Created "+S.pr.id),location.hash="#/pr/"+S.pr.id}}catch(S){N(S.message,!0),$.disabled=!1,$.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(x=>{x.disabled=!1,x.textContent=a?"Save changes":"Submit request"})}}}function Ht(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),m=String(a||"").trim();return r&&i&&r===i&&m?m:Ke(t)}const K=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ge=!1,Vt=null;const Kt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(ct(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function rt(e,t,s){const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Vt!==s&&(ge=!1,Vt=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),m=["approver","admin","finance"].includes(n.role),g=r||i&&a.status==="Submitted",u=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),y=Ya(a.status,n.role,i,u),D=(a.department||"").toLowerCase()==="production",T=r&&a.status==="Approved",q=r&&a.poNo&&!a.zohoPoId,A=T?"":y.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),F=y.filter(d=>d!==A),M=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),R=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",P=["Submitted","Approved","Ordered","In Transit","Received"],E=P.indexOf(a.status),f=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),b=a.paymentTerm||f&&f.paymentTerms||"",Q=t.lists&&t.lists.paymentTerms||[],O=["",...b&&!Q.includes(b)?[b,...Q]:Q].map(d=>`<option value="${o(d)}" ${d===b?"selected":""}>${d?o(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${o(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${o(a.id)}</h1>${Ve(a.status)}</div>
          <p class="request-subtitle">${o(a.project||a.department||"Purchase request")} · Created ${ee(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${T?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${A?`<button class="btn primary" data-to="${o(A)}">${v(R(A))}${o(M(A))}</button>`:""}
          ${g?`<a class="btn" href="#/new/${o(a.id)}">${v("edit")} Edit</a>`:""}
          ${F.length||q?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${q?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${F.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${o(d)}">${v(R(d))}${o(M(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${o(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${E===-1?"Currently "+o(a.status.toLowerCase()):E===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${P.map((d,S)=>`<li class="${S<E?"done":S===E?"current":""}" ${S===E?'aria-current="step"':""}><span class="step-dot">${S<E?v("check"):S+1}</span><span>${o(d)}</span></li>`).join("")}</ol>
      </section>

      ${T&&ge?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(Se(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${O}</select>
          </label>
          ${f&&f.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${o(f.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${K("Department",o(a.department))}
          ${K("Project",o(a.project))}
          ${K("Vendor",o(a.vendor))}
          ${K("Purpose",o(a.purpose))}
          ${K("Priority",o(a.priority))}
          ${K("Payment status",o(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${Kt("Requested by",Ht(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+ee(a.createdAt))}
          ${a.approverEmail||a.approvedByName?Kt("Approved by",Ht(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+ee(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${D?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(d=>`<tr>
            <td>${o(d.itemNo)}</td>
            <td class="wrap">${o(d.description)}</td>${D?`<td>${o(d.partNo)}</td>`:""}<td>${o(d.materialType)}</td>
            <td>${o([d.qty,d.unit].filter(Boolean).join(" "))}</td>
            <td>${d.unitPrice?o(we(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?o(we(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${o(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${o(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${D?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(we(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${K("Expected",ee(a.expectedDate))}
          ${K("Received",ee(a.receivedAt))}
          ${K("Tracking",Cn(a))}
          ${K("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${m?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${K("PO reference",[o(a.poNo),ee(a.poDate)].filter(Boolean).join(" · "))}
          ${K("Invoice / order #",[o(a.invoiceNo),ee(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${K("Payment term",o(a.paymentTerm))}
          ${K("Quotation / PI",a.quotationDoc?`<a href="${o(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${K("Zoho Books PO",a.zohoPoNumber?o(a.zohoPoNumber):"")}
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
    </div>`;const C=e.querySelector("#requestMore");e.onclick=d=>{C&&!C.contains(d.target)&&(C.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(C!=null&&C.open)&&(C.open=!1,C.querySelector("summary").focus())},C==null||C.addEventListener("focusout",d=>{C.contains(d.relatedTarget)||(C.open=!1)}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const S=d.dataset.to;if((S==="Rejected"||S==="Cancelled")&&!confirm(`Mark ${a.id} as ${S}?`))return;const x=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(j=>{j.disabled=!0}),d.innerHTML=v("refresh","spin")+" Updating…";try{const j=await U("transition",{id:a.id,to:S});N(a.id+" → "+S),await I.applyResult(j)}catch(j){N(j.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(H=>{H.disabled=!1}),d.innerHTML=x}});const _=e.querySelector("#makePoBtn");_&&(_.onclick=()=>{var d,S;ge=!0,rt(e,t,s),Ue((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),(S=e.querySelector("[name=poNo]"))==null||S.focus()});const J=e.querySelector("#poCancelBtn");J&&(J.onclick=()=>{ge=!1,rt(e,t,s)});const h=e.querySelector("#poForm"),$=h?pa(h):null;h&&(h.onsubmit=async d=>{if(d.preventDefault(),!$())return;const S=new FormData(h),x=String(S.get("poNo")||"").trim();if(!x)return;const j=h.querySelector('button[type="submit"]');j.disabled=!0;let H;try{H=await U("update",{id:a.id,updates:{poNo:x,poDate:S.get("poDate")||"",paymentTerm:S.get("paymentTerm")||""}});const z=await U("transition",{id:a.id,to:"Ordered"});N(a.id+" → Ordered (PO "+x+")"),ge=!1,await I.applyResult(z)}catch(z){H&&await I.applyResult(H),N(z.message,!0),j.disabled=!1}});const k=e.querySelector("#zohoPushBtn");k&&(k.onclick=async()=>{k.disabled=!0;try{const{pr:d}=await U("zohoPushPo",{id:a.id});N(a.id+" → Zoho Books PO "+d.zohoPoNumber),await I.applyResult({pr:d})}catch(d){N(d.message,!0),k.disabled=!1}});const p=e.querySelector("#devDelete");p&&(p.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){p.disabled=!0;try{const d=await U("delete",{id:a.id});N(a.id+" deleted"),location.hash="#/",await I.applyResult(d)}catch(d){N(d.message,!0),p.disabled=!1}}})}let Ee=null,re=null,it="";const xn=["Domestic","International"];function yt(e){return Ee===null&&(Ee=e.vendors||[]),Ee}function In(e){const t=e.lists&&e.lists.departments||[],s=yt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const X=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function On(e,t){const s=yt(e),a=re&&s.find(r=>r.name.toLowerCase()===re.toLowerCase());if(a)return Bn(e,a);const n=[...s].sort((r,i)=>r.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${Ge(it,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
          ${n.map(r=>`<tr class="vRow" data-name="${o(r.name)}"
            data-search="${pt(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${o(r.name)}</td>
            <td>${(r.departments||[]).map(i=>`<span class="adm-chip on">${o(i)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${o(r.type||"—")}</td>
            <td>${o(r.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${o(r.name)}" title="Remove vendor">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${vt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${va(n.length,n.length)}</span></div>
    </div>`}const va=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function Bn(e,t){const s=ut(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${o(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?o(i):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${o(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${o(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${v("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${o(we("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${In(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(g=>g.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${o(i)}">${o(i)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${o(t.name)}">
        </label>
        <div class="adm-grid2">
          ${X("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${X("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${X("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...xn].map(i=>`<option value="${o(i)}" ${i===(t.type||"")?"selected":""}>${i?o(i):"—"}</option>`).join("")}
            </select>
          </label>
          ${X("Contact person","contactPerson",t.contactPerson)}
          ${X("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${o(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${o(t.address||"")}"></label>
        <div class="adm-grid2">
          ${X("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${X("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${o(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${X("Account number","accountNumber",t.accountNumber)}
          ${X("IFSC","ifsc",t.ifsc)}
        </div>
        ${X("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${r}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${X("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function Fn(e,t,s){const a=async(u,y,D)=>{try{const T=await U(u,y);Ee=T.vendors,await I.applyResult(T),N(D),e.isConnected&&s()}catch(T){N(T.message,!0)}};ht(e,{get:()=>it,set:u=>{it=u},count:va,match:u=>new Set(ra(yt(t),u).map(y=>y.name))}),e.querySelectorAll(".vRow").forEach(u=>u.onclick=y=>{y.target.closest(".vRm")||(re=u.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(u=>u.onclick=()=>{confirm(`Remove vendor "${u.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:u.dataset.name},`${u.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const u=e.querySelector("#nvName").value.trim();if(!u){N("Vendor name required",!0);return}re=u,a("vendorSet",{name:u,updates:{}},`${u} added — fill in the details`)});const r=()=>{re=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=r);const m=e.querySelector("#vCancel");m&&(m.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(u=>u.onclick=()=>u.classList.toggle("on"));const g=e.querySelector("#vForm");g&&(g.onsubmit=u=>{u.preventDefault();const y={};for(const[T,q]of new FormData(g))y[T]=q.trim();y.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(T=>T.dataset.dept);const D=y.name||re;a("vendorSet",{name:re,updates:y},`${D} saved`),re=D})}function jn(){re=null}const $e=["admin","approver","finance","requester"],Un={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},_t=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let Z="users",ve=null,lt="",ke=null,Fe=null,ae=!1;const Gt={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>ke,set:e=>{ke=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Fe,set:e=>{Fe=e},seed:e=>e.materialTypes}};function Hn(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%_t.length;return _t[t]}const Je=e=>e[0].toUpperCase()+e.slice(1),Vn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function ue(e,t){if(ve===null){e.innerHTML='<div class="card">Loading users…</div>',U("usersList").then(a=>{ve=a.users,ue(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}ke===null&&(ke=t.projects||[]),Fe===null&&(Fe=t.materialTypes||[]);const s=Vn[Z];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${s.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${Z==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${Z==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${Z==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${Z==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${Z==="users"?Kn(t):Z==="vendors"?On(t,ae):Gn(t,Gt[Z])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{Z=a.dataset.tab,ae=!1,jn(),ue(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ae=!ae,ue(e,t),ae){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},Z==="users"?_n(e,t):Z==="vendors"?Fn(e,t,()=>{ae=!1,ue(e,t)}):zn(e,t,Gt[Z])}function Kn(e){const t=a=>($e.includes(a.role)?$e:[a.role,...$e]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(Je(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Me(e).includes(a)?[a,...Me(e)]:Me(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${v("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Ge(lt,"Search by name or email…")}
      ${ae?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${$e.map(a=>`<option value="${a}">${Je(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...ve].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Ke(a.email);return`<tr data-search="${pt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Hn(a.email)}">${o(ct(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
                <div>
                  <div class="adm-name">${o(n)}</div>
                  <div class="adm-email">${o(a.email)}</div>
                </div>
              </div>
            </td>
            <td><div style="max-width:200px"><select data-email="${o(a.email)}" class="roleSel adm-select">${t(a)}</select></div></td>
            <td><div style="max-width:200px"><select data-email="${o(a.email)}" class="deptSel adm-select">${s(a.department)}</select></div></td>
            <td>${a.role?'<span class="adm-pill">Active</span>':'<span class="adm-pill pend" title="Signed in themselves — assign a role and department to approve">Pending</span>'}</td>
            <td style="text-align:right">
              <button class="adm-del rmBtn" data-email="${o(a.email)}" title="Remove user">
                ${v("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${vt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${ve.length} of ${ve.length} active members</span>
        <div class="adm-pager">
          <button disabled>${v("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${v("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${$e.map(a=>`<div class="adm-rolecard">
        <h4>${Je(a)}</h4>
        <p>${Un[a]}</p>
      </div>`).join("")}
    </div>`}function _n(e,t){ht(e,{get:()=>lt,set:n=>{lt=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,i)=>{try{const m=await U("userSet",{email:n,...r});ve=m.users,ae=!1,await I.applyResult(m),N(i),e.isConnected&&ue(e,t)}catch(m){N(m.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:r,department:i},`${n} → ${r}`)})}function Me(e){const t=e.lists&&e.lists.departments||[],s=(ke||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Gn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Ge(t.q,`Search ${t.plural} by name or department…`)}
      ${ae?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Me(e).map(a=>`<option value="${o(a)}">${o(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
        </select>
        <input id="mpName" placeholder="${o(t.label)} name" class="adm-input">
        <button class="adm-addbtn" id="mpAdd">Add ${o(t.label)}</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>Department</th><th>${o(t.label)}</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${s.map(a=>`<tr data-search="${pt(a.department,a[t.key])}">
            <td class="adm-name">${o(a.department)}</td>
            <td>${o(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${o(a.department)}" data-val="${o(a[t.key])}" title="Remove">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${vt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${ha(s.length,s.length,t)}</span>
      </div>
    </div>`}const ha=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function zn(e,t,s){ht(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,i)=>ha(r,i,s)});const a=async(r,i,m)=>{try{const g=await U(r,i);s.set(g[s.respKey]),ae=!1,await I.applyResult(g),N(m),e.isConnected&&ue(e,t)}catch(g){N(g.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:i},`${r} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:i,val:m}=r.dataset;confirm(`Remove "${m}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:m},`${m} removed`)})}const je={requester:0,approver:1,finance:1,admin:2};function Yn(e,t){if(!t||!e||!e.minRole)return!0;const s=je[t.role];return s!=null&&s>=je[e.minRole]}const ya=document.getElementById("app"),Xe={"":{fn:aa,nav:"Dashboard",icon:"grid"},vendors:{fn:gn,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:ca,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn:Mn,minRole:"requester"},pr:{fn:rt},admin:{fn:ue,nav:"Admin",icon:"settings",minRole:"admin"}};let le,zt=null;function fa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function Zn(){le==null||le.abort(),ya.innerHTML=`<div class="auth-gate">
    <section class="auth-story">
      <img src="oizom-logo.png" alt="OIZOM" class="auth-logo">
      <span class="eyebrow">THE PROCUREMENT WORKSPACE</span>
      <h1>Every purchase.<br><em>One clear path.</em></h1>
      <p>From the first request to the final delivery.<br>A shared space to keep work moving.</p>
      <div class="auth-flow"><span>${v("file")} Request</span>${v("arrow")}<span>${v("check")} Approve</span>${v("arrow")}<span>${v("package")} Receive</span></div>
      <div class="auth-footer">Oizom · Redefining resources</div>
    </section>
    <section class="auth-box">
      <span class="auth-mark">${v("package")}</span>
      <span class="eyebrow">OIZOM PROCUREMENT</span>
      <h2>Welcome back.</h2>
      <p>Sign in with your Oizom account<br>to open your workspace.</p>
      <div id="gsignin"></div>
      <div class="auth-note">${v("shield")} For your @oizom.com work account</div>
    </section>
  </div>`,Ca(document.getElementById("gsignin"))}function ba(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function ga(){var h,$,k;const e=I.get(),{name:t,param:s}=fa(),a=Xe[t]||Xe[""],n=((h=e.me)==null?void 0:h.role)||"";if(e.me&&!Yn(a,e.me)){location.hash="#/";return}le==null||le.abort(),le=new AbortController;const r=le.signal,i=Object.entries(Xe).filter(([,p])=>p.nav&&(!p.minRole||je[n]>=je[p.minRole])).map(([p,d])=>`<a href="#/${p}" ${t===p?'aria-current="page"':""} class="${t===p?"active":""}">${v(d.icon)}<span>${d.nav}</span>${t===p?'<span class="nav-dot"></span>':""}</a>`).join(""),m=e.notifications||[],g=m.filter(p=>!p.readAt).length,u=ka()||{},y=u.email||(($=e.me)==null?void 0:$.email)||"",D=u.name||Ke(y),T=u.picture?`<img class="avatar" src="${o(u.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(ct(D))}</span>`,q=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=q+" · Oizom Procurement",ya.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${v("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${i}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${v("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${v("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${v("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${o(q)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${v("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${g?", "+g+" unread":""}" aria-expanded="false" aria-controls="nPanel">${v("bell")}${g?`<span class="nbadge">${g>9?"9+":g}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${g?g+" new":"All caught up"}</span></div>
              ${m.length?m.map(p=>`<${p.prId?"a":"div"} class="nitem ${p.readAt?"":"unread"}" ${p.prId?`href="#/pr/${o(p.prId)}"`:""}><div class="nmsg">${o(p.message)}</div><div class="ntime">${o(String(p.ts).slice(0,16).replace("T"," "))}</div></${p.prId?"a":"div"}>`).join(""):`<div class="nempty">${v("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${T}<span class="profile-copy"><span class="pname">${o(D)}</span><span class="prole">${o(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${o(y)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,ba(e),document.getElementById("btnRefresh").onclick=async()=>{await I.refresh(),I.get().err||N("Data refreshed")};const A=document.getElementById("nPanel"),F=document.getElementById("nBtn"),M=document.getElementById("pMenu"),R=document.getElementById("profileBtn"),P=()=>{A.hidden=M.hidden=!0,F.setAttribute("aria-expanded","false"),R.setAttribute("aria-expanded","false")};F.onclick=()=>{var d;const p=A.hidden;P(),A.hidden=!p,F.setAttribute("aria-expanded",String(p)),p&&g&&(m.forEach(S=>{S.readAt||(S.readAt="now")}),(d=document.querySelector(".nbadge"))==null||d.remove(),U("notifRead").catch(()=>{}))},R.onclick=()=>{const p=M.hidden;P(),M.hidden=!p,R.setAttribute("aria-expanded",String(p))},document.getElementById("btnOut").onclick=Aa,document.addEventListener("click",p=>{p.target.closest(".nbell, .profile-wrap")||P()},{signal:r});const E=document.getElementById("sidebar"),f=document.getElementById("workspace"),b=document.getElementById("openNav"),Q=document.getElementById("shell"),O=matchMedia("(max-width: 960px)");let C=!1;const _=(p,d=!0)=>{var S;C=O.matches&&p,Q.classList.toggle("nav-open",C),E.inert=O.matches&&!C,f.inert=C,document.getElementById("navBackdrop").hidden=!C,b.setAttribute("aria-expanded",String(C)),document.body.classList.toggle("nav-locked",C),C?(S=E.querySelector("nav a"))==null||S.focus():d&&O.matches&&b.focus()};_(!1,!1),b.onclick=()=>_(!0),document.getElementById("closeNav").onclick=()=>_(!1),document.getElementById("navBackdrop").onclick=()=>_(!1),E.querySelectorAll("a").forEach(p=>p.addEventListener("click",()=>_(!1),{signal:r})),O.addEventListener("change",()=>_(!1,!1),{signal:r}),document.addEventListener("keydown",p=>{if(p.key==="Escape"&&(C?_(!1):A.hidden?M.hidden||(P(),R.focus()):(P(),F.focus())),p.key==="Tab"&&C){const d=[...E.querySelectorAll("a, button")],S=d[0],x=d[d.length-1];p.shiftKey&&document.activeElement===S?(p.preventDefault(),x.focus()):!p.shiftKey&&document.activeElement===x&&(p.preventDefault(),S.focus())}},{signal:r});const J=document.getElementById("view");if(document.querySelector(".skip-link").onclick=p=>{p.preventDefault(),J.focus()},!e.lastSync)J.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${o(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(k=document.getElementById("retryLoad"))==null||k.addEventListener("click",()=>I.refresh(),{signal:r});else{a.fn(J,e,s);const p=t+"/"+(s||"");zt!==p&&Sa(J),zt=p}}window.addEventListener("hashchange",()=>{ga(),window.scrollTo({top:0,behavior:"instant"})});let Yt="",Zt=!1;I.subscribe(e=>{e.err&&e.err!==Yt&&N(e.err,!0),Yt=e.err;const t=!Zt&&e.lastSync;if(t&&(Zt=!0),e.lastSync&&(e.loading||e.err)||fa().name==="new"&&!t&&e.lastSync){ba(e);return}ga()});Ra(()=>I.refresh());He()||Zn();
