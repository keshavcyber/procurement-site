(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Nt;const J=typeof window<"u"?(Nt=window.matchMedia)==null?void 0:Nt.call(window,"(prefers-reduced-motion: reduce)"):null,Ce=new Set,ta="cubic-bezier(.2,.75,.25,1)";var Mt;(Mt=J==null?void 0:J.addEventListener)==null||Mt.call(J,"change",e=>{e.matches&&Ce.forEach(t=>t.cancel())});function xe(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||J!=null&&J.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:ta,fill:"backwards"});return r.id="workspace-reveal",Ce.add(r),r.finished.then(()=>Ce.delete(r),()=>Ce.delete(r)),r}function aa(e){if(J!=null&&J.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||xe(a,{delay:Math.min(s++*22,154),distance:10})}}const Et={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},qe="oizom-id-token";let ct=null;function na(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Ie(){const e=localStorage.getItem(qe);return e?na(e)<Date.now()+3e4?(localStorage.removeItem(qe),null):e:null}function sa(){const e=Ie();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function oa(){localStorage.removeItem(qe),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function ra(e){if(ct=e,Ie()){e();return}at(()=>{google.accounts.id.initialize({client_id:Et.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(qe,t.credential),ct()}}),google.accounts.id.prompt()})}function at(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>at(e,t+1),100)}function ia(e){at(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class _e extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const xt=new Set(["list","me","usersList","health","logTail"]),la=new Set([404,408,429,500,502,503,504]),da=45e3;function ca(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Se(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=xt.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new _e(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||la.has(t)})}async function ma(e,t){const s=Ie();if(!s)throw new _e("SIGNED_OUT");let a;try{a=await fetch(Et.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(da),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw Se(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=ca(a);if(!a.ok)throw Se(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw Se(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw Se(e,{stage:n,kind:"response"});if(!r.ok)throw new _e(r.error||"Request failed",{action:e});return r}async function H(e,t={}){for(let s=0;s<2;s++)try{return await ma(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!xt.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function ua(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function pa(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function va(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function ha(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function mt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:va(n),qty:ha(n)}})}let I={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ze=new Set;let ut=!1,pe=null,Ue=0;function ya(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function He(){Ze.forEach(e=>e(I))}const E={get:()=>I,subscribe(e){return Ze.add(e),()=>Ze.delete(e)},refresh(){return pe||(I={...I,loading:!0},pe=Promise.resolve().then(async()=>{try{let e,t;do t=Ue,e=await H("list");while(t!==Ue);ya(e),I={prs:mt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},ut=!0}catch(e){if(e.message==="SIGNED_OUT"&&ut){location.reload();return}I={...I,err:e.message,loading:!1}}}).finally(()=>{pe=null,I={...I,loading:!1},He()}),He(),pe)},async applyResult(e,{itemsChanged:t=!1}={}){Ue++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=I.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return E.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),i=mt([e.pr],r)[0];s.prs=n?I.prs.map(c=>c.id===i.id?i:c):[...I.prs,i]}a=!0}e.deleted&&(s.prs=I.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=I.me&&e.users.find(r=>r.email.toLowerCase()===I.me.email.toLowerCase());if(I.me&&(!n||!n.role))return E.refresh();n&&(s.me={...I.me,role:n.role,department:n.department}),a=!0}if(!a)return E.refresh();I={...I,...s},He()}},pt={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pt[e]||pt.file}</svg>`}const o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Be(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function L(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const Q=e=>e?o(String(e).slice(0,10)):"—";function Fe(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function nt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const vt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Re=e=>vt[e]!=null?vt[e]:e+" ";function be(e,t){const s=e==="INR"?"en-IN":"en-US";return Re(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function X(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Re(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Re(e)+(t/1e3).toFixed(1)+"K":Re(e)+Math.round(t).toLocaleString("en-US")}const $e=["Cancelled","Rejected"],fa=["Ordered","In Transit","Received"],Oe=e=>fa.includes(e.status)&&e.paymentStatus!=="Paid";function ht(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function yt(e){const t=e.filter(n=>!$e.includes(n.status)),s=e.filter(Oe),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:ht(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:ht(t)}}const De={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:Oe,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!$e.includes(e.status)};function ba(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function ft(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function It(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function ga(e){return e.filter(Oe)}function $a(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function Sa(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function bt(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let i;if(t==="count")i=1;else{if($e.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;i=c}a[r]=(a[r]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function wa(e,t){const s={};for(const a of e){if($e.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function ka(e,t,s=6){const a={};for(const i of e){if($e.includes(i.status)||(i.currency||"Unknown")!==t)continue;const c=Number(i.amount);if(!i.amount||!isFinite(c))continue;const y=i.vendor||"Unspecified";a[y]=(a[y]||0)+c}const n=Object.entries(a).map(([i,c])=>({vendor:i,total:c})).sort((i,c)=>c.total-i.total);if(n.length<=s)return n;const r=n.slice(s).reduce((i,c)=>i+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function Ca(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Ra(e){const t=(r,i)=>{const c=Date.parse(r),y=Date.parse(i);return isFinite(c)&&isFinite(y)?(y-c)/864e5:null},s=r=>r.length?r.reduce((i,c)=>i+c,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Ta=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Aa(e,t=Date.now()){const s=Ta.map(a=>({...a,count:0}));return e.filter(Oe).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(i=>r>=i.min&&r<=i.max)||s[s.length-1]).count++}),s}const Ye=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Bt=["Unpaid","Paid","Partially Paid","FOC / Free"],Le={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Pa(e,t,s,a,n){const r=(Le[e]||{})[t];return r?r.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function qa(e,t,s,a){return Object.keys(Le[e]||{}).filter(n=>Pa(e,n,t,s,a))}function Da(e,t){return!!(Le[e]&&Le[e][t])}const La=["Submitted","Approved","Rejected"],p={sel:"total",tab:"mine",page:1,moreFilters:!1,filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}},ve=25,Na={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let We;function Ma(e,t){p.tab=t==="admin"?"all":"dept",p.sel=["pending","unpaid"].includes(e)?e:"total",p.page=1,p.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function oe(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Ft(e,t),s&&xe(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const gt=e=>String(e||"").slice(0,10);function Ea(e){const t=p.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&gt(e.createdAt)<t.from||t.to&&gt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Ft(e,t){clearTimeout(We),e.innerHTML=`
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
    </div>`,xa(e.querySelector("#tabBody"),e,t)}const de=e=>e.length?e.map(([t,s])=>X(t,s)).join(" + "):"—";function xa(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",i=a.role==="finance",c=n?["mine","dept","approved"]:r?["mine","all"]:i?["mine","payments"]:["mine"];c.includes(p.tab)||(p.tab="mine");const y=p.tab==="dept",m=p.tab==="approved",f=p.tab==="all",C=p.tab==="payments",P=ba(s.prs,a.email),j=n?ft(s.prs,a.email):[],k=n?It(s.prs,a.department):[],N=i?ga(s.prs):[],M=y?k:m?j:f?s.prs:C?N:P,u=yt(M),T=n?k.filter(De.pending):[],A=r?f?u:yt(s.prs):n?{pending:T.length,highPriority:T.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,b=C?[{key:"total",n:u.total,l:"Awaiting payment",s:de(u.unpaidTotals)},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:"Total value",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:y?[{key:"total",n:u.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:[{key:"total",n:u.total,l:m?"Approved PRs":f?"All PRs":"Total PRs",s:m?"across all requesters":f?"every department":""},...m?[]:[{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:m?"Approved spend":"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}];if(f)for(const l of $a(s.prs))b.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+Fe(l.email),s:l.email,cls:"go"});b.some(l=>l.key===p.sel)||(p.sel="total");const U=(p.sel.startsWith("ap:")?ft(s.prs,p.sel.slice(3)):M.filter(De[p.sel])).sort((l,S)=>(S.createdAt||"").localeCompare(l.createdAt||"")),z=b.find(l=>l.key===p.sel),_=[...new Set(M.map(l=>l.department).filter(Boolean))].sort(),R=[...new Set(M.map(l=>l.vendor).filter(Boolean))].sort();p.filters.dept&&!_.includes(p.filters.dept)&&(p.filters.dept=""),p.filters.vendor&&!R.includes(p.filters.vendor)&&(p.filters.vendor="");const x=U.filter(Ea),h=Object.values(p.filters).some(Boolean),g=Math.max(1,Math.ceil(x.length/ve));p.page=Math.min(Math.max(1,p.page),g);const w=x.slice((p.page-1)*ve,p.page*ve),q=["dept","vendor","from","to"].filter(l=>p.filters[l]).length,d=f?"All requests":y?"Department requests":m?"Approved by you":C?"Payment queue":"Your requests",$=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),D=l=>{const S=r?Ye:n&&l.status==="Submitted"&&$(l)?La:null;return S?`<select class="status-sel" data-status="${o(l.status)}" aria-label="Status for ${o(l.id)}" data-id="${o(l.id)}">${S.map(O=>`<option ${O===l.status?"selected":""}>${o(O)}</option>`).join("")}</select>`:Be(l.status)},B=l=>`<select class="pay-sel" aria-label="Payment status for ${o(l.id)}" data-id="${o(l.id)}">${Bt.map(S=>`<option ${S===l.paymentStatus?"selected":""}>${o(S)}</option>`).join("")}</select>`;e.innerHTML=`
    ${c.length>1?`<div class="adm-tabs" aria-label="Request scope">
      <button class="adm-tab ${p.tab==="mine"?"active":""}" data-tab="mine">Your requests <span>${P.length}</span></button>
      ${n?`<button class="adm-tab ${y?"active":""}" data-tab="dept">${o(a.department||"Your department")} <span>${k.length}</span></button><button class="adm-tab ${m?"active":""}" data-tab="approved">Approved by you <span>${j.length}</span></button>`:""}
      ${r?`<button class="adm-tab ${f?"active":""}" data-tab="all">All requests <span>${s.prs.length}</span></button>`:""}
      ${i?`<button class="adm-tab ${C?"active":""}" data-tab="payments">Awaiting payment <span>${N.length}</span></button>`:""}
    </div>`:""}
    <div class="kpis dashboard-kpis" aria-label="Filter requests by summary">${b.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===p.sel?"sel":""}" data-key="${o(l.key)}" aria-pressed="${l.key===p.sel}">
        <span class="kpi-top"><span class="l">${o(l.l)}</span>${v(Na[l.key])}</span>
        <span class="v">${o(String(l.n))}</span><span class="s">${o(l.s||(l.key==="total"?d:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${A?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?o(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${A.pending?"":"disabled"}><span class="attention-icon">${v("clock")}</span><span><b>${A.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${A.pending?"Open approval queue":"No approvals waiting"}</small></span>${v("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${A.unpaidCount?"":"disabled"}><span class="attention-icon">${v("wallet")}</span><span><b>${A.unpaidCount} awaiting payment</b><small>${A.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${v("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${v("info")}</span><span><b>${A.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${x.length}</span></h2><p>${o(d)} · ${p.sel==="total"?"Latest first":o(z.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${o(p.filters.q)}"></label>
        <select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Ye.map(l=>`<option value="${o(l)}" ${p.filters.status===l?"selected":""}>${o(l)}</option>`).join("")}</select>
        <button type="button" class="btn filter-toggle ${q?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${p.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${q?`<span class="count-badge">${q}</span>`:""}</button>
        ${h?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${p.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${_.map(l=>`<option value="${o(l)}" ${p.filters.dept===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${R.map(l=>`<option value="${o(l)}" ${p.filters.vendor===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${o(p.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${o(p.filters.to)}"></label>
        ${f?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${b.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${o(l.key)}" ${p.sel===l.key?"selected":""}>${o(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${C?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${w.map(l=>`<tr class="rowlink ${C?"payment-row":""}" data-id="${o(l.id)}">
          <td class="request-id"><a href="#/pr/${o(l.id)}">${o(l.id)}</a></td>
          <td class="request-date">${Q(l.createdAt)}</td>
          ${C?`<td>${o(l.vendor)}</td><td>${o(l.poNo||"—")}</td><td>${o(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${o(l.department)}</td><td class="wrap request-item">${o(l.item)}</td><td class="request-vendor">${o(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?o(X(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${C?B(l):D(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(h?"search":"file")}<b>${h?"No matching requests":"No requests here yet"}</b><span>${h?"Try a different search or clear your filters.":"Create a request to get your purchases moving."}</span>${h?'<button class="btn" id="emptyClear">Clear filters</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${x.length?(p.page-1)*ve+1:0}–${Math.min(p.page*ve,x.length)} of ${x.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${p.page===1?"disabled":""}>${v("left")}</button><span>Page ${p.page} of ${g}</span><button class="btn" id="dashNext" aria-label="Next page" ${p.page===g?"disabled":""}>${v("right")}</button></div></div>
    </section>`,e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>{p.tab=l.dataset.tab,p.sel="total",p.page=1,oe(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{p.sel=l.dataset.key,p.page=1,oe(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var O,V;if(!r&&!(n&&l.dataset.queue==="pending"))return;Ma(l.dataset.queue,a.role),oe(t,s);const S=t.querySelector(".requests-card");S.focus({preventScroll:!0}),(V=S.scrollIntoView)==null||V.call(S,{block:"start",behavior:(O=window.matchMedia)!=null&&O.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=S=>{S.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{p.moreFilters=!p.moreFilters,e.querySelector("#advancedFilters").hidden=!p.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(p.moreFilters))};const F=e.querySelector("#dashApprover");F&&(F.onchange=()=>{p.sel=F.value,p.page=1,oe(t,s)});const Z=l=>{var S,O;p.page+=l,oe(t,s),(O=(S=t.querySelector(".requests-card")).scrollIntoView)==null||O.call(S,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>Z(-1),e.querySelector("#dashNext").onclick=()=>Z(1);const ee=(l,S)=>{p.filters[l]=S,p.page=1,oe(t,s)};e.querySelector("#dashQ").oninput=l=>{p.filters.q=l.target.value,p.page=1,clearTimeout(We),We=setTimeout(()=>{t.isConnected&&oe(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>ee("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>ee("vendor",l.target.value),e.querySelector("#dashStatus").onchange=l=>ee("status",l.target.value),e.querySelector("#dashFrom").onchange=l=>ee("from",l.target.value),e.querySelector("#dashTo").onchange=l=>ee("to",l.target.value);const me=()=>{p.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},p.page=1,p.sel="total",oe(t,s)},ue=e.querySelector("#dashFilterClear"),te=e.querySelector("#emptyClear");ue&&(ue.onclick=me),te&&(te.onclick=me),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=S=>S.stopPropagation(),l.onchange=async()=>{const S=l.dataset.id,O=s.prs.find(G=>G.id===S),V=l.value;if(!(!O||V===O.status)){if((V==="Rejected"||V==="Cancelled")&&!confirm(`Mark ${S} as ${V}?`)){l.value=O.status;return}l.disabled=!0;try{let G;a.role==="admin"&&!Da(O.status,V)?G=await H("update",{id:S,updates:{status:V}}):G=await H("transition",{id:S,to:V}),L(`${S} → ${V}`),await E.applyResult(G)}catch(G){L(G.message,!0),l.value=O.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=S=>S.stopPropagation(),l.onchange=async()=>{const S=l.dataset.id,O=s.prs.find(G=>G.id===S),V=l.value;if(!(!O||V===O.paymentStatus)){l.disabled=!0;try{const G=await H("update",{id:S,updates:{paymentStatus:V}});L(`${S} payment → ${V}`),await E.applyResult(G)}catch(G){L(G.message,!0),l.value=O.paymentStatus,l.disabled=!1}}}})}function st(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function ot(e,t){const s=st(e,t),a=s.filter(De.spend),n={};for(const r of a){const i=Number(r.amount);if(!r.amount||!isFinite(i))continue;const c=r.currency||"INR";n[c]=(n[c]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((r,i)=>i[1]-r[1]),unpaid:s.filter(De.unpaid).length,lastOrder:s.reduce((r,i)=>{const c=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>r?c:r},"")}}function Ot(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(st(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Ia=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Ba={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Fa=1,Oa=.7,jt=.5,ja=.4,Ua=.3,Ha=4,Va=e=>e.length>=7?2:e.length>=Ha?1:0,Ne=e=>String(e??"").toLowerCase().trim();function Ka(e,t){const s=e[t];return Ne(Array.isArray(s)?s.join(" "):s)}function Ut(e){return Ne(e).split(/[\s,]+/).filter(Boolean)}function Ga(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function $t(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Fa;if(s.some(n=>n.startsWith(t)))return Oa;if(e.includes(t))return jt;const a=Va(t);return a&&s.some(n=>Ga(n,t)<=a)?Ua:0}function za(e,t){const s=$t(e,t);if(s)return s;const a=Ba[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):$t(e,r)>=jt)?ja:0}function _a(e,t){const s=Array.isArray(t)?t:Ut(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:i,weight:c}of Ia)r=Math.max(r,za(Ka(e,i),n)*c);if(!r)return 0;a+=r}return a}function Ht(e,t){const s=Ut(t);return s.length?(e||[]).map(a=>({v:a,score:_a(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Ne(a.v.displayName||a.v.name).localeCompare(Ne(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function je(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${o(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const rt=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function it(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function lt(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const i=e.querySelector("#"+n);if(!i)return;const c=i.closest(".adm-card"),y=c.querySelector(".admSearchClear"),m=()=>Za(c,t(),a,r);i.oninput=()=>{s(i.value),y.hidden=!i.value,m()},i.onkeydown=f=>{f.key==="Escape"&&i.value&&(i.value="",i.oninput())},y.onclick=()=>{i.value="",i.oninput(),i.focus()},m()}function Za(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let c=null;r.forEach(f=>{f.hidden=n?i?!i.has(f.dataset.name):!f.dataset.search.includes(n):!1,f.classList.remove("last-visible"),f.hidden||(c=f)}),c&&c.classList.add("last-visible");const y=e.querySelector(".adm-nomatch");y&&(y.hidden=!!c||!r.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(r.filter(f=>!f.hidden).length,r.length))}let he="";const Vt={Domestic:"dom",Foreign:"for",Mixed:"mix"},Ya=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Kt(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(Ya(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Wa(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Qa(e,t){const s=ot(e.prs,t.name),a=Ot(t,e.prs),n=s.spendTotals.length?X(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${o(t.name)}">
      <div class="vc-top">
        ${Kt(t)}
        <div class="vc-title">
          <b>${o(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${o(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Vt[a]}">${o(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${o(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${Q(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Wa(t)}</div>
    </a>`}const Ja=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function St(e,t){const s=Ja(e.vendors),a=t.trim()?Ht(s,t):s;return a.length?a.map(n=>Qa(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Xa(e,t,s){if(s)return en(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${je(he,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${St(t,he)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),i=()=>{he=n.value,r.hidden=!he,a.innerHTML=St(t,he)};n.oninput=i,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",i())},r.onclick=()=>{n.value="",i(),n.focus()}}function en(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=ot(t.prs,a.name),r=Ot(a,t.prs),i=t.me&&t.me.role==="admin",c=st(t.prs,a.name).sort((m,f)=>(f.createdAt||"").localeCompare(m.createdAt||"")),y=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Kt(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${o(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${Vt[r]}">${o(r.toUpperCase())}</span>`:""}
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
        <div class="kpi"><div class="v">${n.spendTotals.length?o(X(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([m,f])=>X(m,f)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${Q(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${y.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${y.map(([m,f])=>`<div><span class="vc-l">${o(m)}</span><b>${o(f)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(m=>`<span class="vc-chip">${o(m)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${c.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${c.map(m=>`<tr class="rowlink" data-id="${o(m.id)}">
            <td style="font-family:var(--mono);font-size:12px">${o(m.id)}</td>
            <td>${Q(m.createdAt)}</td><td>${o(m.department)}</td>
            <td class="wrap">${o(m.item)}</td>
            <td>${m.amount?o(X(m.currency||"INR",Number(m.amount))):"—"}</td>
            <td>${Be(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const Qe=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Gt=new Map(Qe.map(e=>[e.code,e])),tn=e=>Gt.has(String(e||"").trim().toUpperCase());function Je(e){const t=Gt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function an(e){const t=String(e||"").trim().toLowerCase(),s=t?Qe.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...Qe],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function we(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(c)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function wt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,i=a-n.t-n.b,c=Math.max(...e.map(u=>u.value),1),y=r/(e.length-1),m=u=>n.l+u*y,f=u=>n.t+i-u/c*i,C=e.map((u,T)=>`${T===0?"M":"L"}${m(T).toFixed(1)} ${f(u.value).toFixed(1)}`).join(" "),P=`${C} L${m(e.length-1).toFixed(1)} ${n.t+i} L${m(0).toFixed(1)} ${n.t+i} Z`,j=[0,.5,1].map(u=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-u)).toFixed(1)}" y2="${(n.t+i*(1-u)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),k=Math.ceil(e.length/6)||1,N=e.map((u,T)=>T%k===0||T===e.length-1?`<text x="${m(T).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${T===0?"start":T===e.length-1?"end":"middle"}">${o(u.month.slice(2))}</text>`:"").join(""),M=e.map((u,T)=>`<circle cx="${m(T).toFixed(1)}" cy="${f(u.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(u.month)}: ${o(t(u.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${j}
    <path d="${P}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${C}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${M}
    ${N}
  </svg>`}const nn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],sn={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},on={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},ke={currency:""};function zt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?It(t.prs,s.department):t.prs||[],r=Sa(n);r.includes(ke.currency)||(ke.currency=r[0]||"");const i=ke.currency,c=b=>i?X(i,b):String(b),y=i?bt(n,"spend",i):[],m=bt(n,"count"),f=i?ka(n,i,6).map(b=>({label:b.vendor,value:b.total})):[],C=!a&&i?wa(n,i).map(b=>({label:b.department,value:b.total})):[],P=Ca(n),j=nn.filter(b=>P[b]).map(b=>({label:b,value:P[b]})),k=Ra(n),N=Aa(n),M=N.map(b=>({label:b.label,value:b.count})),u=N.reduce((b,U)=>b+U.count,0),T=y.reduce((b,U)=>b+U.value,0);e.innerHTML=`
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
        <select id="insCur" aria-describedby="insCurHelp">${r.map(b=>`<option value="${o(b)}" ${b===i?"selected":""}>${o(Je(b))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?o(c(T)):"—"}</div><div class="l">Total spend${i?" · "+o(i):""}</div></div>
        <div class="kpi"><div class="v">${k.avgApprovalDays!=null?k.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${k.avgDeliveryDays!=null?k.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${u?"warn":""}"><div class="v">${u}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+o(i):""}</p></div>
          </div>
          <div class="spend-chart">${y.length?wt(y,{valueFmt:b=>X(i,b),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${C.length?`<div class="card"><h2>Spend by department${i?" · "+o(i):""}</h2>
          <div class="pd-body">${we(C,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+o(i):""}</h2>
          <div class="pd-body">${we(f,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${we(j,{colorOf:b=>sn[b.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${we(M,{colorOf:b=>on[b.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${wt(m,{valueFmt:b=>b+" PR"+(b===1?"":"s")})}</div>
      </div>
    </div>`;const A=e.querySelector("#insCur");A&&(A.onchange=()=>{var b;ke.currency=A.value,zt(e,t),(b=e.querySelector("#insCur"))==null||b.focus()})}const _t={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Zt(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function rn(e){const t=String(e.trackingNo||"").trim(),s=Zt(e.trackingLink)||(t?(_t[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[o(e.courier||""),s?`<a href="${o(s)}" target="_blank" rel="noopener noreferrer">${o(t||"Track shipment")} ↗</a>`:o(t)].filter(Boolean).join(" ")}function ln(e,t=[]){const s=[...new Set([...t,...Object.keys(_t),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${o(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${o(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${o(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${o(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function dn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Zt(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const cn=Bt,mn={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Te=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:mn[t])||[],Ve={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ne=(e,t,s)=>`<span class="lblrow">${o(e)}${Ve[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${o(Ve[t])}" data-tip="${o(Ve[t])}">?</span>`:""}</span>`;function ie(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${n?o(n):"Select…"}</option>`).join("")}function kt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${o(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${o(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${o(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${o(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${ie(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${o(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${ie(Te(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${o(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${o(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${o(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${v("close")}</button>
  </div>`}function Ke(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function un(e,t,s){const a=s?t.prs.find(h=>h.id===s):null,n=a||{},r=a?n.items||[]:[{}],i=t.me||{role:""},c=["approver","admin","finance"].includes(i.role),y=a?n.department||"":i.department||"",m=(t.projects||[]).filter(h=>h.department.toLowerCase()===y.toLowerCase()).map(h=>h.project),f=(t.vendors||[]).filter(h=>(h.departments||[]).some(g=>g.toLowerCase()===y.toLowerCase())),C=h=>{const g=f.find(w=>w.name.toLowerCase()===String(h||"").toLowerCase());return g?g.displayName||g.name:String(h||"")},P=(t.materialTypes||[]).filter(h=>h.department.toLowerCase()===y.toLowerCase()).map(h=>h.materialType),j=y.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?Be(n.status):""}
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
              <label>${ne("Project*","project")} <select name="project" required>${ie(m,n.project||"",!0)}</select></label>
              <label>${ne("Purpose","purpose")} <input name="purpose" value="${o(n.purpose)}"></label>
              <div class="pd-field full">${ne("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(C(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ne("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(Je(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ne("Priority","priority",!0)} <select name="priority">${ie(Te(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&i.role==="admin"?"":`<label>${ne("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o((n.expectedDate||"").slice(0,10))}"></label>`}
              ${c?`
              <label>${ne("Payment status*","payment")} <select name="paymentStatus" required>${ie(cn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${ie(Ye,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${o(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${ne("Notes","notes")} <textarea name="notes" rows="3">${o(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&i.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${o(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${o((n.poDate||"").slice(0,10))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${o(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${o((n.invoiceDate||"").slice(0,10))}"></label>
              <label>Payment term <select name="paymentTerm">${ie(Te(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&i.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${ln(n,Te(t,"couriers"))}
          <label>${ne("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o((n.expectedDate||"").slice(0,10))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((h,g)=>kt(t,h,g,P,j)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const k=e.querySelector("#prForm"),N=e.querySelector("#itemRows"),M=()=>{const h=Ke(k).map(q=>{const d=ua(q.qty,q.unitPrice);return{lineTotal:d!==""?d:q.lineTotal}}),g=pa(h),w=k.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=g===""?"":"Total: "+be(w,g)},u=h=>{h.querySelector(".rmItem").onclick=()=>{N.children.length>1&&(h.remove(),M())},h.querySelectorAll("input, select").forEach(g=>g.oninput=M)};[...N.children].forEach(u),M();const T=(h,g,w,{search:q,resolve:d,toLabel:$,allowEmpty:D,onCommit:B})=>{const F=e.querySelector("#"+h),Z=e.querySelector("#"+g),ee=k.querySelector(`[name="${w}"]`),me=()=>{B&&B()},ue=te=>{const l=q(te).slice(0,30);Z.innerHTML=l.map(S=>`<div class="curOpt" data-v="${o(S.value)}"><b>${o(S.main)}</b> ${o(S.name||"")}<span>${o(S.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',Z.hidden=!1};F.onfocus=()=>{F.select(),ue("")},F.oninput=()=>ue(F.value),Z.onmousedown=te=>{te.preventDefault();const l=te.target.closest(".curOpt");l&&(ee.value=l.dataset.v,F.value=$(l.dataset.v),Z.hidden=!0,me())},F.onblur=()=>setTimeout(()=>{Z.hidden=!0;const te=F.value.trim();if(!te&&D)ee.value="";else{const l=d(te);l!=null&&(ee.value=l)}F.value=$(ee.value),me()},120)};T("curSearch","curList","currency",{search:h=>an(h).map(g=>({value:g.code,main:g.code,name:g.name,sub:g.sym||""})),resolve:h=>{const g=h.split("—")[0].trim().toUpperCase();return tn(g)?g:null},toLabel:h=>Je(h),onCommit:M});const A=h=>{const g=String(h||"").trim().toLowerCase();return f.filter(w=>!g||w.name.toLowerCase().includes(g)||(w.displayName||"").toLowerCase().includes(g)||(w.category||"").toLowerCase().includes(g)).sort((w,q)=>(w.displayName||w.name).localeCompare(q.displayName||q.name)).map(w=>({value:w.name,main:w.displayName||w.name,name:w.displayName?w.name:"",sub:w.category||""}))},b=e.querySelector("#venHint"),U=()=>{const h=k.querySelector('[name="vendor"]').value.trim();b.hidden=!h||f.some(g=>g.name.toLowerCase()===h.toLowerCase())};T("venSearch","venList","vendor",{search:A,resolve:h=>{const g=f.find(w=>w.name.toLowerCase()===h.toLowerCase()||(w.displayName||"").toLowerCase()===h.toLowerCase());return g?g.name:h},toLabel:h=>C(h),allowEmpty:!0,onCommit:U}),U(),e.querySelector("#addItem").onclick=()=>{N.insertAdjacentHTML("beforeend",kt(t,{},N.children.length,P,j)),u(N.lastElementChild),xe(N.lastElementChild)};const z=k.elements.namedItem("trackingLink");z&&(z.oninput=()=>z.setCustomValidity(""));const _=()=>Object.fromEntries([...new FormData(k)].filter(([h])=>!h.startsWith("i_"))),R=_(),x=JSON.stringify(Ke(k));k.onsubmit=async h=>{h.preventDefault();const g=e.querySelector("#prSave");if(g.disabled||!dn(z))return;e.querySelectorAll(".pr-save").forEach($=>{$.disabled=!0,$.innerHTML=v("refresh","spin")+" Saving…"}),g.disabled=!0,g.textContent="Saving…";const w=_(),q=Ke(k),d=JSON.stringify(q)!==x;try{if(!q.length&&(!a||d))throw new Error("Add at least one item with a description");if(a){const $=Object.fromEntries(Object.entries(w).filter(([D,B])=>B!==R[D]));if(Object.keys($).length||d){const D=await H("update",{id:n.id,updates:$,...d?{items:q}:{}});await E.applyResult(D,{itemsChanged:d}),L("PR updated")}location.hash="#/pr/"+n.id}else{const $=await H("create",{pr:w,items:q});await E.applyResult($,{itemsChanged:!0}),L("Created "+$.pr.id),location.hash="#/pr/"+$.pr.id}}catch($){L($.message,!0),g.disabled=!1,g.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(D=>{D.disabled=!1,D.textContent=a?"Save changes":"Submit request"})}}}function Ct(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return r&&i&&r===i&&c?c:Fe(t)}const K=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ye=!1,Rt=null;const Tt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(nt(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function Xe(e,t,s){const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Rt!==s&&(ye=!1,Rt=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["approver","admin","finance"].includes(n.role),y=r||i&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),f=qa(a.status,n.role,i,m),C=(a.department||"").toLowerCase()==="production",P=r&&a.status==="Approved",j=r&&a.poNo&&!a.zohoPoId,k=P?"":f.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),N=f.filter(d=>d!==k),M=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),u=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",T=["Submitted","Approved","Ordered","In Transit","Received"],A=T.indexOf(a.status),b=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),U=a.paymentTerm||b&&b.paymentTerms||"",z=t.lists&&t.lists.paymentTerms||[],_=["",...U&&!z.includes(U)?[U,...z]:z].map(d=>`<option value="${o(d)}" ${d===U?"selected":""}>${d?o(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${o(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${o(a.id)}</h1>${Be(a.status)}</div>
          <p class="request-subtitle">${o(a.project||a.department||"Purchase request")} · Created ${Q(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${k?`<button class="btn primary" data-to="${o(k)}">${v(u(k))}${o(M(k))}</button>`:""}
          ${y?`<a class="btn" href="#/new/${o(a.id)}">${v("edit")} Edit</a>`:""}
          ${N.length||j?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${j?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${N.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${o(d)}">${v(u(d))}${o(M(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${o(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${A===-1?"Currently "+o(a.status.toLowerCase()):A===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${T.map((d,$)=>`<li class="${$<A?"done":$===A?"current":""}" ${$===A?'aria-current="step"':""}><span class="step-dot">${$<A?v("check"):$+1}</span><span>${o(d)}</span></li>`).join("")}</ol>
      </section>

      ${P&&ye?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(a.poDate||new Date().toISOString().slice(0,10))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${_}</select>
          </label>
          ${b&&b.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${o(b.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${Tt("Requested by",Ct(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+Q(a.createdAt))}
          ${a.approverEmail||a.approvedByName?Tt("Approved by",Ct(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+Q(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${C?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(d=>`<tr>
            <td>${o(d.itemNo)}</td>
            <td class="wrap">${o(d.description)}</td>${C?`<td>${o(d.partNo)}</td>`:""}<td>${o(d.materialType)}</td>
            <td>${o([d.qty,d.unit].filter(Boolean).join(" "))}</td>
            <td>${d.unitPrice?o(be(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?o(be(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${o(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${o(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${C?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(be(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${K("Expected",Q(a.expectedDate))}
          ${K("Received",Q(a.receivedAt))}
          ${K("Tracking",rn(a))}
          ${K("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${K("PO reference",[o(a.poNo),Q(a.poDate)].filter(Boolean).join(" · "))}
          ${K("Invoice / order #",[o(a.invoiceNo),Q(a.invoiceDate)].filter(Boolean).join(" · "))}
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
    </div>`;const R=e.querySelector("#requestMore");e.onclick=d=>{R&&!R.contains(d.target)&&(R.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(R!=null&&R.open)&&(R.open=!1,R.querySelector("summary").focus())},R==null||R.addEventListener("focusout",d=>{R.contains(d.relatedTarget)||(R.open=!1)}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const $=d.dataset.to;if(($==="Rejected"||$==="Cancelled")&&!confirm(`Mark ${a.id} as ${$}?`))return;const D=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(B=>{B.disabled=!0}),d.innerHTML=v("refresh","spin")+" Updating…";try{const B=await H("transition",{id:a.id,to:$});L(a.id+" → "+$),await E.applyResult(B)}catch(B){L(B.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(F=>{F.disabled=!1}),d.innerHTML=D}});const x=e.querySelector("#makePoBtn");x&&(x.onclick=()=>{var d,$;ye=!0,Xe(e,t,s),xe((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),($=e.querySelector("[name=poNo]"))==null||$.focus()});const h=e.querySelector("#poCancelBtn");h&&(h.onclick=()=>{ye=!1,Xe(e,t,s)});const g=e.querySelector("#poForm");g&&(g.onsubmit=async d=>{d.preventDefault();const $=new FormData(g),D=String($.get("poNo")||"").trim();if(!D)return;const B=g.querySelector('button[type="submit"]');B.disabled=!0;let F;try{F=await H("update",{id:a.id,updates:{poNo:D,poDate:$.get("poDate")||"",paymentTerm:$.get("paymentTerm")||""}});const Z=await H("transition",{id:a.id,to:"Ordered"});L(a.id+" → Ordered (PO "+D+")"),ye=!1,await E.applyResult(Z)}catch(Z){F&&await E.applyResult(F),L(Z.message,!0),B.disabled=!1}});const w=e.querySelector("#zohoPushBtn");w&&(w.onclick=async()=>{w.disabled=!0;try{const{pr:d}=await H("zohoPushPo",{id:a.id});L(a.id+" → Zoho Books PO "+d.zohoPoNumber),await E.applyResult({pr:d})}catch(d){L(d.message,!0),w.disabled=!1}});const q=e.querySelector("#devDelete");q&&(q.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){q.disabled=!0;try{const d=await H("delete",{id:a.id});L(a.id+" deleted"),location.hash="#/",await E.applyResult(d)}catch(d){L(d.message,!0),q.disabled=!1}}})}let Ae=null,se=null,et="";const pn=["Domestic","International"];function dt(e){return Ae===null&&(Ae=e.vendors||[]),Ae}function vn(e){const t=e.lists&&e.lists.departments||[],s=dt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const W=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function hn(e,t){const s=dt(e),a=se&&s.find(r=>r.name.toLowerCase()===se.toLowerCase());if(a)return yn(e,a);const n=[...s].sort((r,i)=>r.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${je(et,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${rt(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
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
          ${it(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Yt(n.length,n.length)}</span></div>
    </div>`}const Yt=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function yn(e,t){const s=ot(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${o(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?o(i):"—"}</option>`).join("");return`
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
        <div class="adm-stat"><b>${o(be("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${vn(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(y=>y.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${o(i)}">${o(i)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${o(t.name)}">
        </label>
        <div class="adm-grid2">
          ${W("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${W("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${W("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...pn].map(i=>`<option value="${o(i)}" ${i===(t.type||"")?"selected":""}>${i?o(i):"—"}</option>`).join("")}
            </select>
          </label>
          ${W("Contact person","contactPerson",t.contactPerson)}
          ${W("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${o(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${o(t.address||"")}"></label>
        <div class="adm-grid2">
          ${W("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${W("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${o(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${W("Account number","accountNumber",t.accountNumber)}
          ${W("IFSC","ifsc",t.ifsc)}
        </div>
        ${W("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${r}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${W("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function fn(e,t,s){const a=async(m,f,C)=>{try{const P=await H(m,f);Ae=P.vendors,await E.applyResult(P),L(C),e.isConnected&&s()}catch(P){L(P.message,!0)}};lt(e,{get:()=>et,set:m=>{et=m},count:Yt,match:m=>new Set(Ht(dt(t),m).map(f=>f.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=f=>{f.target.closest(".vRm")||(se=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){L("Vendor name required",!0);return}se=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const r=()=>{se=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=r);const c=e.querySelector("#vCancel");c&&(c.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const y=e.querySelector("#vForm");y&&(y.onsubmit=m=>{m.preventDefault();const f={};for(const[P,j]of new FormData(y))f[P]=j.trim();f.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(P=>P.dataset.dept);const C=f.name||se;a("vendorSet",{name:se,updates:f},`${C} saved`),se=C})}function bn(){se=null}const fe=["admin","approver","finance","requester"],gn={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},At=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let Y="users",ce=null,tt="",ge=null,Me=null,ae=!1;const Pt={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>ge,set:e=>{ge=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Me,set:e=>{Me=e},seed:e=>e.materialTypes}};function $n(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%At.length;return At[t]}const Ge=e=>e[0].toUpperCase()+e.slice(1),Sn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function le(e,t){if(ce===null){e.innerHTML='<div class="card">Loading users…</div>',H("usersList").then(a=>{ce=a.users,le(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}ge===null&&(ge=t.projects||[]),Me===null&&(Me=t.materialTypes||[]);const s=Sn[Y];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${s.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${Y==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${Y==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${Y==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${Y==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${Y==="users"?wn(t):Y==="vendors"?hn(t,ae):Cn(t,Pt[Y])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{Y=a.dataset.tab,ae=!1,bn(),le(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ae=!ae,le(e,t),ae){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},Y==="users"?kn(e,t):Y==="vendors"?fn(e,t,()=>{ae=!1,le(e,t)}):Rn(e,t,Pt[Y])}function wn(e){const t=a=>(fe.includes(a.role)?fe:[a.role,...fe]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(Ge(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Pe(e).includes(a)?[a,...Pe(e)]:Pe(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${v("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${je(tt,"Search by name or email…")}
      ${ae?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${fe.map(a=>`<option value="${a}">${Ge(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...ce].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Fe(a.email);return`<tr data-search="${rt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${$n(a.email)}">${o(nt(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
          ${it(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${ce.length} of ${ce.length} active members</span>
        <div class="adm-pager">
          <button disabled>${v("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${v("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${fe.map(a=>`<div class="adm-rolecard">
        <h4>${Ge(a)}</h4>
        <p>${gn[a]}</p>
      </div>`).join("")}
    </div>`}function kn(e,t){lt(e,{get:()=>tt,set:n=>{tt=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,i)=>{try{const c=await H("userSet",{email:n,...r});ce=c.users,ae=!1,await E.applyResult(c),L(i),e.isConnected&&le(e,t)}catch(c){L(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:r,department:i},`${n} → ${r}`)})}function Pe(e){const t=e.lists&&e.lists.departments||[],s=(ge||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Cn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${je(t.q,`Search ${t.plural} by name or department…`)}
      ${ae?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Pe(e).map(a=>`<option value="${o(a)}">${o(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${rt(a.department,a[t.key])}">
            <td class="adm-name">${o(a.department)}</td>
            <td>${o(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${o(a.department)}" data-val="${o(a[t.key])}" title="Remove">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${it(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Wt(s.length,s.length,t)}</span>
      </div>
    </div>`}const Wt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function Rn(e,t,s){lt(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,i)=>Wt(r,i,s)});const a=async(r,i,c)=>{try{const y=await H(r,i);s.set(y[s.respKey]),ae=!1,await E.applyResult(y),L(c),e.isConnected&&le(e,t)}catch(y){L(y.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:i},`${r} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:i,val:c}=r.dataset;confirm(`Remove "${c}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:c},`${c} removed`)})}const Ee={requester:0,approver:1,finance:1,admin:2};function Tn(e,t){if(!t||!e||!e.minRole)return!0;const s=Ee[t.role];return s!=null&&s>=Ee[e.minRole]}const Qt=document.getElementById("app"),ze={"":{fn:Ft,nav:"Dashboard",icon:"grid"},vendors:{fn:Xa,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:zt,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn:un,minRole:"requester"},pr:{fn:Xe},admin:{fn:le,nav:"Admin",icon:"settings",minRole:"admin"}};let re,qt=null;function Jt(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function An(){re==null||re.abort(),Qt.innerHTML=`<div class="auth-gate">
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
  </div>`,ia(document.getElementById("gsignin"))}function Xt(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function ea(){var g,w,q;const e=E.get(),{name:t,param:s}=Jt(),a=ze[t]||ze[""],n=((g=e.me)==null?void 0:g.role)||"";if(e.me&&!Tn(a,e.me)){location.hash="#/";return}re==null||re.abort(),re=new AbortController;const r=re.signal,i=Object.entries(ze).filter(([,d])=>d.nav&&(!d.minRole||Ee[n]>=Ee[d.minRole])).map(([d,$])=>`<a href="#/${d}" ${t===d?'aria-current="page"':""} class="${t===d?"active":""}">${v($.icon)}<span>${$.nav}</span>${t===d?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],y=c.filter(d=>!d.readAt).length,m=sa()||{},f=m.email||((w=e.me)==null?void 0:w.email)||"",C=m.name||Fe(f),P=m.picture?`<img class="avatar" src="${o(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(nt(C))}</span>`,j=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=j+" · Oizom Procurement",Qt.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${o(j)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${v("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${y?", "+y+" unread":""}" aria-expanded="false" aria-controls="nPanel">${v("bell")}${y?`<span class="nbadge">${y>9?"9+":y}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${y?y+" new":"All caught up"}</span></div>
              ${c.length?c.map(d=>`<${d.prId?"a":"div"} class="nitem ${d.readAt?"":"unread"}" ${d.prId?`href="#/pr/${o(d.prId)}"`:""}><div class="nmsg">${o(d.message)}</div><div class="ntime">${o(String(d.ts).slice(0,16).replace("T"," "))}</div></${d.prId?"a":"div"}>`).join(""):`<div class="nempty">${v("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${P}<span class="profile-copy"><span class="pname">${o(C)}</span><span class="prole">${o(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${o(f)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Xt(e),document.getElementById("btnRefresh").onclick=async()=>{await E.refresh(),E.get().err||L("Data refreshed")};const k=document.getElementById("nPanel"),N=document.getElementById("nBtn"),M=document.getElementById("pMenu"),u=document.getElementById("profileBtn"),T=()=>{k.hidden=M.hidden=!0,N.setAttribute("aria-expanded","false"),u.setAttribute("aria-expanded","false")};N.onclick=()=>{var $;const d=k.hidden;T(),k.hidden=!d,N.setAttribute("aria-expanded",String(d)),d&&y&&(c.forEach(D=>{D.readAt||(D.readAt="now")}),($=document.querySelector(".nbadge"))==null||$.remove(),H("notifRead").catch(()=>{}))},u.onclick=()=>{const d=M.hidden;T(),M.hidden=!d,u.setAttribute("aria-expanded",String(d))},document.getElementById("btnOut").onclick=oa,document.addEventListener("click",d=>{d.target.closest(".nbell, .profile-wrap")||T()},{signal:r});const A=document.getElementById("sidebar"),b=document.getElementById("workspace"),U=document.getElementById("openNav"),z=document.getElementById("shell"),_=matchMedia("(max-width: 960px)");let R=!1;const x=(d,$=!0)=>{var D;R=_.matches&&d,z.classList.toggle("nav-open",R),A.inert=_.matches&&!R,b.inert=R,document.getElementById("navBackdrop").hidden=!R,U.setAttribute("aria-expanded",String(R)),document.body.classList.toggle("nav-locked",R),R?(D=A.querySelector("nav a"))==null||D.focus():$&&_.matches&&U.focus()};x(!1,!1),U.onclick=()=>x(!0),document.getElementById("closeNav").onclick=()=>x(!1),document.getElementById("navBackdrop").onclick=()=>x(!1),A.querySelectorAll("a").forEach(d=>d.addEventListener("click",()=>x(!1),{signal:r})),_.addEventListener("change",()=>x(!1,!1),{signal:r}),document.addEventListener("keydown",d=>{if(d.key==="Escape"&&(R?x(!1):k.hidden?M.hidden||(T(),u.focus()):(T(),N.focus())),d.key==="Tab"&&R){const $=[...A.querySelectorAll("a, button")],D=$[0],B=$[$.length-1];d.shiftKey&&document.activeElement===D?(d.preventDefault(),B.focus()):!d.shiftKey&&document.activeElement===B&&(d.preventDefault(),D.focus())}},{signal:r});const h=document.getElementById("view");if(document.querySelector(".skip-link").onclick=d=>{d.preventDefault(),h.focus()},!e.lastSync)h.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${o(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(q=document.getElementById("retryLoad"))==null||q.addEventListener("click",()=>E.refresh(),{signal:r});else{a.fn(h,e,s);const d=t+"/"+(s||"");qt!==d&&aa(h),qt=d}}window.addEventListener("hashchange",()=>{ea(),window.scrollTo({top:0,behavior:"instant"})});let Dt="",Lt=!1;E.subscribe(e=>{e.err&&e.err!==Dt&&L(e.err,!0),Dt=e.err;const t=!Lt&&e.lastSync;if(t&&(Lt=!0),e.lastSync&&(e.loading||e.err)||Jt().name==="new"&&!t&&e.lastSync){Xt(e);return}ea()});ra(()=>E.refresh());Ie()||An();
