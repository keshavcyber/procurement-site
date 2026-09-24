(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Nt;const X=typeof window<"u"?(Nt=window.matchMedia)==null?void 0:Nt.call(window,"(prefers-reduced-motion: reduce)"):null,we=new Set,Xt="cubic-bezier(.2,.75,.25,1)";var Mt;(Mt=X==null?void 0:X.addEventListener)==null||Mt.call(X,"change",e=>{e.matches&&we.forEach(t=>t.cancel())});function Ne(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||X!=null&&X.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Xt,fill:"backwards"});return r.id="workspace-reveal",we.add(r),r.finished.then(()=>we.delete(r),()=>we.delete(r)),r}function ea(e){if(X!=null&&X.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Ne(a,{delay:Math.min(s++*22,154),distance:10})}}const Et={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Te="oizom-id-token";let dt=null;function ta(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Me(){const e=localStorage.getItem(Te);return e?ta(e)<Date.now()+3e4?(localStorage.removeItem(Te),null):e:null}function aa(){const e=Me();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function na(){localStorage.removeItem(Te),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function sa(e){if(dt=e,Me()){e();return}Xe(()=>{google.accounts.id.initialize({client_id:Et.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Te,t.credential),dt()}}),google.accounts.id.prompt()})}function Xe(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>Xe(e,t+1),100)}function oa(e){Xe(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class Ve extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const xt=new Set(["list","me","usersList","health","logTail"]),ra=new Set([404,408,429,500,502,503,504]),ia=45e3;function la(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function ge(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=xt.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new Ve(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||ra.has(t)})}async function da(e,t){const s=Me();if(!s)throw new Ve("SIGNED_OUT");let a;try{a=await fetch(Et.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(ia),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw ge(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=la(a);if(!a.ok)throw ge(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw ge(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw ge(e,{stage:n,kind:"response"});if(!r.ok)throw new Ve(r.error||"Request failed",{action:e});return r}async function U(e,t={}){for(let s=0;s<2;s++)try{return await da(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!xt.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function ca(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function ma(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function ua(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function pa(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function ct(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:ua(n),qty:pa(n)}})}let I={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ke=new Set;let mt=!1,me=null,Fe=0;function va(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Oe(){Ke.forEach(e=>e(I))}const E={get:()=>I,subscribe(e){return Ke.add(e),()=>Ke.delete(e)},refresh(){return me||(I={...I,loading:!0},me=Promise.resolve().then(async()=>{try{let e,t;do t=Fe,e=await U("list");while(t!==Fe);va(e),I={prs:ct(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},mt=!0}catch(e){if(e.message==="SIGNED_OUT"&&mt){location.reload();return}I={...I,err:e.message,loading:!1}}}).finally(()=>{me=null,I={...I,loading:!1},Oe()}),Oe(),me)},async applyResult(e,{itemsChanged:t=!1}={}){Fe++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=I.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return E.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),i=ct([e.pr],r)[0];s.prs=n?I.prs.map(c=>c.id===i.id?i:c):[...I.prs,i]}a=!0}e.deleted&&(s.prs=I.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=I.me&&e.users.find(r=>r.email.toLowerCase()===I.me.email.toLowerCase());if(I.me&&(!n||!n.role))return E.refresh();n&&(s.me={...I.me,role:n.role,department:n.department}),a=!0}if(!a)return E.refresh();I={...I,...s},Oe()}},ut={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ut[e]||ut.file}</svg>`}const o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ee(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function D(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const J=e=>e?o(String(e).slice(0,10)):"—";function xe(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function et(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const pt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},ke=e=>pt[e]!=null?pt[e]:e+" ";function ye(e,t){const s=e==="INR"?"en-IN":"en-US";return ke(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function ee(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?ke(e)+(t/1e6).toFixed(2)+"M":t>=1e3?ke(e)+(t/1e3).toFixed(1)+"K":ke(e)+Math.round(t).toLocaleString("en-US")}const be=["Cancelled","Rejected"],ha=["Ordered","In Transit","Received"],Ie=e=>ha.includes(e.status)&&e.paymentStatus!=="Paid";function vt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function ht(e){const t=e.filter(n=>!be.includes(n.status)),s=e.filter(Ie),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:vt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:vt(t)}}const Ae={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:Ie,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!be.includes(e.status)};function ya(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function yt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function It(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function fa(e){return e.filter(Ie)}function ba(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function ga(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function ft(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let i;if(t==="count")i=1;else{if(be.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;i=c}a[r]=(a[r]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function $a(e,t){const s={};for(const a of e){if(be.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function Sa(e,t,s=6){const a={};for(const i of e){if(be.includes(i.status)||(i.currency||"Unknown")!==t)continue;const c=Number(i.amount);if(!i.amount||!isFinite(c))continue;const y=i.vendor||"Unspecified";a[y]=(a[y]||0)+c}const n=Object.entries(a).map(([i,c])=>({vendor:i,total:c})).sort((i,c)=>c.total-i.total);if(n.length<=s)return n;const r=n.slice(s).reduce((i,c)=>i+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function wa(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function ka(e){const t=(r,i)=>{const c=Date.parse(r),y=Date.parse(i);return isFinite(c)&&isFinite(y)?(y-c)/864e5:null},s=r=>r.length?r.reduce((i,c)=>i+c,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Ra=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Ca(e,t=Date.now()){const s=Ra.map(a=>({...a,count:0}));return e.filter(Ie).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(i=>r>=i.min&&r<=i.max)||s[s.length-1]).count++}),s}const Ge=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Bt=["Unpaid","Paid","Partially Paid","FOC / Free"],Pe={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Ta(e,t,s,a,n){const r=(Pe[e]||{})[t];return r?r.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function Aa(e,t,s,a){return Object.keys(Pe[e]||{}).filter(n=>Ta(e,n,t,s,a))}function Pa(e,t){return!!(Pe[e]&&Pe[e][t])}const qa=["Submitted","Approved","Rejected"],p={sel:"total",tab:"mine",page:1,moreFilters:!1,filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}},ue=25,Da={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let ze;function La(e,t){p.tab=t==="admin"?"all":"dept",p.sel=["pending","unpaid"].includes(e)?e:"total",p.page=1,p.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ne(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Ft(e,t),s&&Ne(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const bt=e=>String(e||"").slice(0,10);function Na(e){const t=p.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&bt(e.createdAt)<t.from||t.to&&bt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Ft(e,t){clearTimeout(ze),e.innerHTML=`
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
    </div>`,Ma(e.querySelector("#tabBody"),e,t)}const de=e=>e.length?e.map(([t,s])=>ee(t,s)).join(" + "):"—";function Ma(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",i=a.role==="finance",c=n?["mine","dept","approved"]:r?["mine","all"]:i?["mine","payments"]:["mine"];c.includes(p.tab)||(p.tab="mine");const y=p.tab==="dept",m=p.tab==="approved",f=p.tab==="all",C=p.tab==="payments",q=ya(s.prs,a.email),F=n?yt(s.prs,a.email):[],T=n?It(s.prs,a.department):[],L=i?fa(s.prs):[],N=y?T:m?F:f?s.prs:C?L:q,u=ht(N),A=n?T.filter(Ae.pending):[],P=r?f?u:ht(s.prs):n?{pending:A.length,highPriority:A.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,b=C?[{key:"total",n:u.total,l:"Awaiting payment",s:de(u.unpaidTotals)},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ee(...u.spendTotals[0]):"—",l:"Total value",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:y?[{key:"total",n:u.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ee(...u.spendTotals[0]):"—",l:"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:[{key:"total",n:u.total,l:m?"Approved PRs":f?"All PRs":"Total PRs",s:m?"across all requesters":f?"every department":""},...m?[]:[{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ee(...u.spendTotals[0]):"—",l:m?"Approved spend":"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}];if(f)for(const l of ba(s.prs))b.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+xe(l.email),s:l.email,cls:"go"});b.some(l=>l.key===p.sel)||(p.sel="total");const O=(p.sel.startsWith("ap:")?yt(s.prs,p.sel.slice(3)):N.filter(Ae[p.sel])).sort((l,w)=>(w.createdAt||"").localeCompare(l.createdAt||"")),g=b.find(l=>l.key===p.sel),$=[...new Set(N.map(l=>l.department).filter(Boolean))].sort(),h=[...new Set(N.map(l=>l.vendor).filter(Boolean))].sort();p.filters.dept&&!$.includes(p.filters.dept)&&(p.filters.dept=""),p.filters.vendor&&!h.includes(p.filters.vendor)&&(p.filters.vendor="");const R=O.filter(Na),k=Object.values(p.filters).some(Boolean),x=Math.max(1,Math.ceil(R.length/ue));p.page=Math.min(Math.max(1,p.page),x);const W=R.slice((p.page-1)*ue,p.page*ue),K=["dept","vendor","from","to"].filter(l=>p.filters[l]).length,d=f?"All requests":y?"Department requests":m?"Approved by you":C?"Payment queue":"Your requests",S=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),M=l=>{const w=r?Ge:n&&l.status==="Submitted"&&S(l)?qa:null;return w?`<select class="status-sel" data-status="${o(l.status)}" aria-label="Status for ${o(l.id)}" data-id="${o(l.id)}">${w.map(B=>`<option ${B===l.status?"selected":""}>${o(B)}</option>`).join("")}</select>`:Ee(l.status)},j=l=>`<select class="pay-sel" aria-label="Payment status for ${o(l.id)}" data-id="${o(l.id)}">${Bt.map(w=>`<option ${w===l.paymentStatus?"selected":""}>${o(w)}</option>`).join("")}</select>`;e.innerHTML=`
    ${c.length>1?`<div class="adm-tabs" aria-label="Request scope">
      <button class="adm-tab ${p.tab==="mine"?"active":""}" data-tab="mine">Your requests <span>${q.length}</span></button>
      ${n?`<button class="adm-tab ${y?"active":""}" data-tab="dept">${o(a.department||"Your department")} <span>${T.length}</span></button><button class="adm-tab ${m?"active":""}" data-tab="approved">Approved by you <span>${F.length}</span></button>`:""}
      ${r?`<button class="adm-tab ${f?"active":""}" data-tab="all">All requests <span>${s.prs.length}</span></button>`:""}
      ${i?`<button class="adm-tab ${C?"active":""}" data-tab="payments">Awaiting payment <span>${L.length}</span></button>`:""}
    </div>`:""}
    <div class="kpis dashboard-kpis" aria-label="Filter requests by summary">${b.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===p.sel?"sel":""}" data-key="${o(l.key)}" aria-pressed="${l.key===p.sel}">
        <span class="kpi-top"><span class="l">${o(l.l)}</span>${v(Da[l.key])}</span>
        <span class="v">${o(String(l.n))}</span><span class="s">${o(l.s||(l.key==="total"?d:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${P?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?o(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${P.pending?"":"disabled"}><span class="attention-icon">${v("clock")}</span><span><b>${P.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${P.pending?"Open approval queue":"No approvals waiting"}</small></span>${v("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${P.unpaidCount?"":"disabled"}><span class="attention-icon">${v("wallet")}</span><span><b>${P.unpaidCount} awaiting payment</b><small>${P.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${v("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${v("info")}</span><span><b>${P.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${R.length}</span></h2><p>${o(d)} · ${p.sel==="total"?"Latest first":o(g.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${o(p.filters.q)}"></label>
        <select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Ge.map(l=>`<option value="${o(l)}" ${p.filters.status===l?"selected":""}>${o(l)}</option>`).join("")}</select>
        <button type="button" class="btn filter-toggle ${K?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${p.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${K?`<span class="count-badge">${K}</span>`:""}</button>
        ${k?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${p.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${$.map(l=>`<option value="${o(l)}" ${p.filters.dept===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${h.map(l=>`<option value="${o(l)}" ${p.filters.vendor===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${o(p.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${o(p.filters.to)}"></label>
        ${f?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${b.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${o(l.key)}" ${p.sel===l.key?"selected":""}>${o(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${C?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${W.map(l=>`<tr class="rowlink ${C?"payment-row":""}" data-id="${o(l.id)}">
          <td class="request-id"><a href="#/pr/${o(l.id)}">${o(l.id)}</a></td>
          <td class="request-date">${J(l.createdAt)}</td>
          ${C?`<td>${o(l.vendor)}</td><td>${o(l.poNo||"—")}</td><td>${o(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${o(l.department)}</td><td class="wrap request-item">${o(l.item)}</td><td class="request-vendor">${o(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?o(ee(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${C?j(l):M(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(k?"search":"file")}<b>${k?"No matching requests":"No requests here yet"}</b><span>${k?"Try a different search or clear your filters.":"Create a request to get your purchases moving."}</span>${k?'<button class="btn" id="emptyClear">Clear filters</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${R.length?(p.page-1)*ue+1:0}–${Math.min(p.page*ue,R.length)} of ${R.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${p.page===1?"disabled":""}>${v("left")}</button><span>Page ${p.page} of ${x}</span><button class="btn" id="dashNext" aria-label="Next page" ${p.page===x?"disabled":""}>${v("right")}</button></div></div>
    </section>`,e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>{p.tab=l.dataset.tab,p.sel="total",p.page=1,ne(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{p.sel=l.dataset.key,p.page=1,ne(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,H;if(!r&&!(n&&l.dataset.queue==="pending"))return;La(l.dataset.queue,a.role),ne(t,s);const w=t.querySelector(".requests-card");w.focus({preventScroll:!0}),(H=w.scrollIntoView)==null||H.call(w,{block:"start",behavior:(B=window.matchMedia)!=null&&B.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=w=>{w.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{p.moreFilters=!p.moreFilters,e.querySelector("#advancedFilters").hidden=!p.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(p.moreFilters))};const Z=e.querySelector("#dashApprover");Z&&(Z.onchange=()=>{p.sel=Z.value,p.page=1,ne(t,s)});const G=l=>{var w,B;p.page+=l,ne(t,s),(B=(w=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(w,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>G(-1),e.querySelector("#dashNext").onclick=()=>G(1);const z=(l,w)=>{p.filters[l]=w,p.page=1,ne(t,s)};e.querySelector("#dashQ").oninput=l=>{p.filters.q=l.target.value,p.page=1,clearTimeout(ze),ze=setTimeout(()=>{t.isConnected&&ne(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>z("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>z("vendor",l.target.value),e.querySelector("#dashStatus").onchange=l=>z("status",l.target.value),e.querySelector("#dashFrom").onchange=l=>z("from",l.target.value),e.querySelector("#dashTo").onchange=l=>z("to",l.target.value);const re=()=>{p.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},p.page=1,p.sel="total",ne(t,s)},it=e.querySelector("#dashFilterClear"),lt=e.querySelector("#emptyClear");it&&(it.onclick=re),lt&&(lt.onclick=re),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,B=s.prs.find(_=>_.id===w),H=l.value;if(!(!B||H===B.status)){if((H==="Rejected"||H==="Cancelled")&&!confirm(`Mark ${w} as ${H}?`)){l.value=B.status;return}l.disabled=!0;try{let _;a.role==="admin"&&!Pa(B.status,H)?_=await U("update",{id:w,updates:{status:H}}):_=await U("transition",{id:w,to:H}),D(`${w} → ${H}`),await E.applyResult(_)}catch(_){D(_.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,B=s.prs.find(_=>_.id===w),H=l.value;if(!(!B||H===B.paymentStatus)){l.disabled=!0;try{const _=await U("update",{id:w,updates:{paymentStatus:H}});D(`${w} payment → ${H}`),await E.applyResult(_)}catch(_){D(_.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function tt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function at(e,t){const s=tt(e,t),a=s.filter(Ae.spend),n={};for(const r of a){const i=Number(r.amount);if(!r.amount||!isFinite(i))continue;const c=r.currency||"INR";n[c]=(n[c]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((r,i)=>i[1]-r[1]),unpaid:s.filter(Ae.unpaid).length,lastOrder:s.reduce((r,i)=>{const c=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>r?c:r},"")}}function Ot(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(tt(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Ea=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],xa={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Ia=1,Ba=.7,jt=.5,Fa=.4,Oa=.3,ja=4,Ua=e=>e.length>=7?2:e.length>=ja?1:0,qe=e=>String(e??"").toLowerCase().trim();function Ha(e,t){const s=e[t];return qe(Array.isArray(s)?s.join(" "):s)}function Ut(e){return qe(e).split(/[\s,]+/).filter(Boolean)}function Va(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function gt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Ia;if(s.some(n=>n.startsWith(t)))return Ba;if(e.includes(t))return jt;const a=Ua(t);return a&&s.some(n=>Va(n,t)<=a)?Oa:0}function Ka(e,t){const s=gt(e,t);if(s)return s;const a=xa[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):gt(e,r)>=jt)?Fa:0}function Ga(e,t){const s=Array.isArray(t)?t:Ut(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:i,weight:c}of Ea)r=Math.max(r,Ka(Ha(e,i),n)*c);if(!r)return 0;a+=r}return a}function Ht(e,t){const s=Ut(t);return s.length?(e||[]).map(a=>({v:a,score:Ga(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||qe(a.v.displayName||a.v.name).localeCompare(qe(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Be(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${o(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const nt=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function st(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function ot(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const i=e.querySelector("#"+n);if(!i)return;const c=i.closest(".adm-card"),y=c.querySelector(".admSearchClear"),m=()=>za(c,t(),a,r);i.oninput=()=>{s(i.value),y.hidden=!i.value,m()},i.onkeydown=f=>{f.key==="Escape"&&i.value&&(i.value="",i.oninput())},y.onclick=()=>{i.value="",i.oninput(),i.focus()},m()}function za(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let c=null;r.forEach(f=>{f.hidden=n?i?!i.has(f.dataset.name):!f.dataset.search.includes(n):!1,f.classList.remove("last-visible"),f.hidden||(c=f)}),c&&c.classList.add("last-visible");const y=e.querySelector(".adm-nomatch");y&&(y.hidden=!!c||!r.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(r.filter(f=>!f.hidden).length,r.length))}let pe="";const Vt={Domestic:"dom",Foreign:"for",Mixed:"mix"},_a=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Kt(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(_a(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Za(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Ya(e,t){const s=at(e.prs,t.name),a=Ot(t,e.prs),n=s.spendTotals.length?ee(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
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
        <div><span class="vc-l">Last order</span><b>${J(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Za(t)}</div>
    </a>`}const Wa=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function $t(e,t){const s=Wa(e.vendors),a=t.trim()?Ht(s,t):s;return a.length?a.map(n=>Ya(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Qa(e,t,s){if(s)return Ja(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Be(pe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${$t(t,pe)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),i=()=>{pe=n.value,r.hidden=!pe,a.innerHTML=$t(t,pe)};n.oninput=i,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",i())},r.onclick=()=>{n.value="",i(),n.focus()}}function Ja(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=at(t.prs,a.name),r=Ot(a,t.prs),i=t.me&&t.me.role==="admin",c=tt(t.prs,a.name).sort((m,f)=>(f.createdAt||"").localeCompare(m.createdAt||"")),y=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
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
        <div class="kpi"><div class="v">${n.spendTotals.length?o(ee(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([m,f])=>ee(m,f)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${J(n.lastOrder)}</div><div class="l">Last order</div></div>
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
            <td>${J(m.createdAt)}</td><td>${o(m.department)}</td>
            <td class="wrap">${o(m.item)}</td>
            <td>${m.amount?o(ee(m.currency||"INR",Number(m.amount))):"—"}</td>
            <td>${Ee(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const _e=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Gt=new Map(_e.map(e=>[e.code,e])),Xa=e=>Gt.has(String(e||"").trim().toUpperCase());function Ze(e){const t=Gt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function en(e){const t=String(e||"").trim().toLowerCase(),s=t?_e.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[..._e],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function $e(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(c)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function St(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,i=a-n.t-n.b,c=Math.max(...e.map(u=>u.value),1),y=r/(e.length-1),m=u=>n.l+u*y,f=u=>n.t+i-u/c*i,C=e.map((u,A)=>`${A===0?"M":"L"}${m(A).toFixed(1)} ${f(u.value).toFixed(1)}`).join(" "),q=`${C} L${m(e.length-1).toFixed(1)} ${n.t+i} L${m(0).toFixed(1)} ${n.t+i} Z`,F=[0,.5,1].map(u=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-u)).toFixed(1)}" y2="${(n.t+i*(1-u)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),T=Math.ceil(e.length/6)||1,L=e.map((u,A)=>A%T===0||A===e.length-1?`<text x="${m(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${o(u.month.slice(2))}</text>`:"").join(""),N=e.map((u,A)=>`<circle cx="${m(A).toFixed(1)}" cy="${f(u.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(u.month)}: ${o(t(u.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${F}
    <path d="${q}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${C}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${N}
    ${L}
  </svg>`}const tn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],an={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},nn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Se={currency:""};function zt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?It(t.prs,s.department):t.prs||[],r=ga(n);r.includes(Se.currency)||(Se.currency=r[0]||"");const i=Se.currency,c=b=>i?ee(i,b):String(b),y=i?ft(n,"spend",i):[],m=ft(n,"count"),f=i?Sa(n,i,6).map(b=>({label:b.vendor,value:b.total})):[],C=!a&&i?$a(n,i).map(b=>({label:b.department,value:b.total})):[],q=wa(n),F=tn.filter(b=>q[b]).map(b=>({label:b,value:q[b]})),T=ka(n),L=Ca(n),N=L.map(b=>({label:b.label,value:b.count})),u=L.reduce((b,O)=>b+O.count,0),A=y.reduce((b,O)=>b+O.value,0);e.innerHTML=`
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
        <select id="insCur" aria-describedby="insCurHelp">${r.map(b=>`<option value="${o(b)}" ${b===i?"selected":""}>${o(Ze(b))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?o(c(A)):"—"}</div><div class="l">Total spend${i?" · "+o(i):""}</div></div>
        <div class="kpi"><div class="v">${T.avgApprovalDays!=null?T.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${T.avgDeliveryDays!=null?T.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${u?"warn":""}"><div class="v">${u}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+o(i):""}</p></div>
          </div>
          <div class="spend-chart">${y.length?St(y,{valueFmt:b=>ee(i,b),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${C.length?`<div class="card"><h2>Spend by department${i?" · "+o(i):""}</h2>
          <div class="pd-body">${$e(C,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+o(i):""}</h2>
          <div class="pd-body">${$e(f,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${$e(F,{colorOf:b=>an[b.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${$e(N,{colorOf:b=>nn[b.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${St(m,{valueFmt:b=>b+" PR"+(b===1?"":"s")})}</div>
      </div>
    </div>`;const P=e.querySelector("#insCur");P&&(P.onchange=()=>{var b;Se.currency=P.value,zt(e,t),(b=e.querySelector("#insCur"))==null||b.focus()})}const sn=Bt,on={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ye=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:on[t])||[],je={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},se=(e,t,s)=>`<span class="lblrow">${o(e)}${je[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${o(je[t])}" data-tip="${o(je[t])}">?</span>`:""}</span>`;function ie(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${n?o(n):"Select…"}</option>`).join("")}function wt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${o(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${o(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${o(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${o(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${ie(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${o(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${ie(Ye(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${o(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${o(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${o(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${v("close")}</button>
  </div>`}function kt(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function rn(e,t,s){const a=s?t.prs.find(g=>g.id===s):null,n=a||{},r=a?n.items||[]:[{}],i=t.me||{role:""},c=["approver","admin","finance"].includes(i.role),y=a?n.department||"":i.department||"",m=(t.projects||[]).filter(g=>g.department.toLowerCase()===y.toLowerCase()).map(g=>g.project),f=(t.vendors||[]).filter(g=>(g.departments||[]).some($=>$.toLowerCase()===y.toLowerCase())),C=g=>{const $=f.find(h=>h.name.toLowerCase()===String(g||"").toLowerCase());return $?$.displayName||$.name:String(g||"")},q=(t.materialTypes||[]).filter(g=>g.department.toLowerCase()===y.toLowerCase()).map(g=>g.materialType),F=y.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?Ee(n.status):""}
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
              <label>${se("Project*","project")} <select name="project" required>${ie(m,n.project||"",!0)}</select></label>
              <label>${se("Purpose","purpose")} <input name="purpose" value="${o(n.purpose)}"></label>
              <div class="pd-field full">${se("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(C(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${se("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(Ze(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${se("Priority","priority",!0)} <select name="priority">${ie(Ye(t,"priorities"),n.priority||"Medium")}</select></label>
              <label>${se("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o((n.expectedDate||"").slice(0,10))}"></label>
              ${c?`
              <label>${se("Payment status*","payment")} <select name="paymentStatus" required>${ie(sn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${ie(Ge,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${o(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${se("Notes","notes")} <textarea name="notes" rows="3">${o(n.notes)}</textarea></label>
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
              <label>Payment term <select name="paymentTerm">${ie(Ye(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((g,$)=>wt(t,g,$,q,F)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const T=e.querySelector("#prForm"),L=e.querySelector("#itemRows"),N=()=>{const g=kt(T).map(R=>{const k=ca(R.qty,R.unitPrice);return{lineTotal:k!==""?k:R.lineTotal}}),$=ma(g),h=T.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=$===""?"":"Total: "+ye(h,$)},u=g=>{g.querySelector(".rmItem").onclick=()=>{L.children.length>1&&(g.remove(),N())},g.querySelectorAll("input, select").forEach($=>$.oninput=N)};[...L.children].forEach(u),N();const A=(g,$,h,{search:R,resolve:k,toLabel:x,allowEmpty:W,onCommit:K})=>{const d=e.querySelector("#"+g),S=e.querySelector("#"+$),M=T.querySelector(`[name="${h}"]`),j=()=>{K&&K()},Z=G=>{const z=R(G).slice(0,30);S.innerHTML=z.map(re=>`<div class="curOpt" data-v="${o(re.value)}"><b>${o(re.main)}</b> ${o(re.name||"")}<span>${o(re.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',S.hidden=!1};d.onfocus=()=>{d.select(),Z("")},d.oninput=()=>Z(d.value),S.onmousedown=G=>{G.preventDefault();const z=G.target.closest(".curOpt");z&&(M.value=z.dataset.v,d.value=x(z.dataset.v),S.hidden=!0,j())},d.onblur=()=>setTimeout(()=>{S.hidden=!0;const G=d.value.trim();if(!G&&W)M.value="";else{const z=k(G);z!=null&&(M.value=z)}d.value=x(M.value),j()},120)};A("curSearch","curList","currency",{search:g=>en(g).map($=>({value:$.code,main:$.code,name:$.name,sub:$.sym||""})),resolve:g=>{const $=g.split("—")[0].trim().toUpperCase();return Xa($)?$:null},toLabel:g=>Ze(g),onCommit:N});const P=g=>{const $=String(g||"").trim().toLowerCase();return f.filter(h=>!$||h.name.toLowerCase().includes($)||(h.displayName||"").toLowerCase().includes($)||(h.category||"").toLowerCase().includes($)).sort((h,R)=>(h.displayName||h.name).localeCompare(R.displayName||R.name)).map(h=>({value:h.name,main:h.displayName||h.name,name:h.displayName?h.name:"",sub:h.category||""}))},b=e.querySelector("#venHint"),O=()=>{const g=T.querySelector('[name="vendor"]').value.trim();b.hidden=!g||f.some($=>$.name.toLowerCase()===g.toLowerCase())};A("venSearch","venList","vendor",{search:P,resolve:g=>{const $=f.find(h=>h.name.toLowerCase()===g.toLowerCase()||(h.displayName||"").toLowerCase()===g.toLowerCase());return $?$.name:g},toLabel:g=>C(g),allowEmpty:!0,onCommit:O}),O(),e.querySelector("#addItem").onclick=()=>{L.insertAdjacentHTML("beforeend",wt(t,{},L.children.length,q,F)),u(L.lastElementChild),Ne(L.lastElementChild)},T.onsubmit=async g=>{g.preventDefault();const $=e.querySelector("#prSave");if($.disabled)return;e.querySelectorAll(".pr-save").forEach(k=>{k.disabled=!0,k.innerHTML=v("refresh","spin")+" Saving…"}),$.disabled=!0,$.textContent="Saving…";const h={};for(const[k,x]of new FormData(g.target))k.startsWith("i_")||(h[k]=x);const R=kt(T);try{if(!R.length)throw new Error("Add at least one item with a description");if(a){const k=await U("update",{id:n.id,updates:h,items:R});await E.applyResult(k,{itemsChanged:!0}),D("PR updated"),location.hash="#/pr/"+n.id}else{const k=await U("create",{pr:h,items:R});await E.applyResult(k,{itemsChanged:!0}),D("Created "+k.pr.id),location.hash="#/pr/"+k.pr.id}}catch(k){D(k.message,!0),$.disabled=!1,$.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(x=>{x.disabled=!1,x.textContent=a?"Save changes":"Submit request"})}}}function Rt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return r&&i&&r===i&&c?c:xe(t)}const ln={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`},dn=(e,t)=>(ln[e]||(s=>`https://t.17track.net/en#nums=${s}`))(encodeURIComponent(t)),V=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ve=!1,Ct=null;const Tt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(et(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function We(e,t,s){const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Ct!==s&&(ve=!1,Ct=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["approver","admin","finance"].includes(n.role),y=r||i&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),f=Aa(a.status,n.role,i,m),C=(a.department||"").toLowerCase()==="production",q=r&&a.status==="Approved",F=r&&a.poNo&&!a.zohoPoId,T=q?"":f.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),L=f.filter(d=>d!==T),N=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),u=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",A=["Submitted","Approved","Ordered","In Transit","Received"],P=A.indexOf(a.status),b=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),O=a.paymentTerm||b&&b.paymentTerms||"",g=t.lists&&t.lists.paymentTerms||[],$=["",...O&&!g.includes(O)?[O,...g]:g].map(d=>`<option value="${o(d)}" ${d===O?"selected":""}>${d?o(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${o(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${o(a.id)}</h1>${Ee(a.status)}</div>
          <p class="request-subtitle">${o(a.project||a.department||"Purchase request")} · Created ${J(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${q?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${T?`<button class="btn primary" data-to="${o(T)}">${v(u(T))}${o(N(T))}</button>`:""}
          ${y?`<a class="btn" href="#/new/${o(a.id)}">${v("edit")} Edit</a>`:""}
          ${L.length||F?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${F?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${L.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${o(d)}">${v(u(d))}${o(N(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${o(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${P===-1?"Currently "+o(a.status.toLowerCase()):P===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${A.map((d,S)=>`<li class="${S<P?"done":S===P?"current":""}" ${S===P?'aria-current="step"':""}><span class="step-dot">${S<P?v("check"):S+1}</span><span>${o(d)}</span></li>`).join("")}</ol>
      </section>

      ${q&&ve?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(a.poDate||new Date().toISOString().slice(0,10))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${$}</select>
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
          ${V("Department",o(a.department))}
          ${V("Project",o(a.project))}
          ${V("Vendor",o(a.vendor))}
          ${V("Purpose",o(a.purpose))}
          ${V("Priority",o(a.priority))}
          ${V("Payment status",o(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${Tt("Requested by",Rt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+J(a.createdAt))}
          ${a.approverEmail||a.approvedByName?Tt("Approved by",Rt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+J(a.approvedAt):""):""}
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
            <td>${d.unitPrice?o(ye(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?o(ye(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${o(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${o(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${C?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(ye(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card">
        <h2>Delivery</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${V("Expected",J(a.expectedDate))}
          ${V("Received",J(a.receivedAt))}
          ${V("Tracking",a.trackingNo?`${o(a.courier||"")} <a href="${a.trackingLink?o(a.trackingLink):dn(a.courier,a.trackingNo)}" target="_blank" rel="noopener">${o(a.trackingNo)} ↗</a>`:"")}
          ${V("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${V("PO reference",[o(a.poNo),J(a.poDate)].filter(Boolean).join(" · "))}
          ${V("Invoice / order #",[o(a.invoiceNo),J(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${V("Payment term",o(a.paymentTerm))}
          ${V("Quotation / PI",a.quotationDoc?`<a href="${o(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${V("Zoho Books PO",a.zohoPoNumber?o(a.zohoPoNumber):"")}
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
    </div>`;const h=e.querySelector("#requestMore");e.onclick=d=>{h&&!h.contains(d.target)&&(h.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(h!=null&&h.open)&&(h.open=!1,h.querySelector("summary").focus())},h==null||h.addEventListener("focusout",d=>{h.contains(d.relatedTarget)||(h.open=!1)}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const S=d.dataset.to;if((S==="Rejected"||S==="Cancelled")&&!confirm(`Mark ${a.id} as ${S}?`))return;const M=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(j=>{j.disabled=!0}),d.innerHTML=v("refresh","spin")+" Updating…";try{const j=await U("transition",{id:a.id,to:S});D(a.id+" → "+S),await E.applyResult(j)}catch(j){D(j.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(Z=>{Z.disabled=!1}),d.innerHTML=M}});const R=e.querySelector("#makePoBtn");R&&(R.onclick=()=>{var d,S;ve=!0,We(e,t,s),Ne((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),(S=e.querySelector("[name=poNo]"))==null||S.focus()});const k=e.querySelector("#poCancelBtn");k&&(k.onclick=()=>{ve=!1,We(e,t,s)});const x=e.querySelector("#poForm");x&&(x.onsubmit=async d=>{d.preventDefault();const S=new FormData(x),M=String(S.get("poNo")||"").trim();if(!M)return;const j=x.querySelector('button[type="submit"]');j.disabled=!0;let Z;try{Z=await U("update",{id:a.id,updates:{poNo:M,poDate:S.get("poDate")||"",paymentTerm:S.get("paymentTerm")||""}});const G=await U("transition",{id:a.id,to:"Ordered"});D(a.id+" → Ordered (PO "+M+")"),ve=!1,await E.applyResult(G)}catch(G){Z&&await E.applyResult(Z),D(G.message,!0),j.disabled=!1}});const W=e.querySelector("#zohoPushBtn");W&&(W.onclick=async()=>{W.disabled=!0;try{const{pr:d}=await U("zohoPushPo",{id:a.id});D(a.id+" → Zoho Books PO "+d.zohoPoNumber),await E.applyResult({pr:d})}catch(d){D(d.message,!0),W.disabled=!1}});const K=e.querySelector("#devDelete");K&&(K.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){K.disabled=!0;try{const d=await U("delete",{id:a.id});D(a.id+" deleted"),location.hash="#/",await E.applyResult(d)}catch(d){D(d.message,!0),K.disabled=!1}}})}let Re=null,ae=null,Qe="";const cn=["Domestic","International"];function rt(e){return Re===null&&(Re=e.vendors||[]),Re}function mn(e){const t=e.lists&&e.lists.departments||[],s=rt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const Q=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function un(e,t){const s=rt(e),a=ae&&s.find(r=>r.name.toLowerCase()===ae.toLowerCase());if(a)return pn(e,a);const n=[...s].sort((r,i)=>r.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${Be(Qe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${nt(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
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
          ${st(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${_t(n.length,n.length)}</span></div>
    </div>`}const _t=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function pn(e,t){const s=at(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${o(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?o(i):"—"}</option>`).join("");return`
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
        <div class="adm-stat"><b>${o(ye("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${mn(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(y=>y.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${o(i)}">${o(i)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${o(t.name)}">
        </label>
        <div class="adm-grid2">
          ${Q("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${Q("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${Q("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...cn].map(i=>`<option value="${o(i)}" ${i===(t.type||"")?"selected":""}>${i?o(i):"—"}</option>`).join("")}
            </select>
          </label>
          ${Q("Contact person","contactPerson",t.contactPerson)}
          ${Q("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${o(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${o(t.address||"")}"></label>
        <div class="adm-grid2">
          ${Q("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${Q("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${o(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${Q("Account number","accountNumber",t.accountNumber)}
          ${Q("IFSC","ifsc",t.ifsc)}
        </div>
        ${Q("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${r}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${Q("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function vn(e,t,s){const a=async(m,f,C)=>{try{const q=await U(m,f);Re=q.vendors,await E.applyResult(q),D(C),e.isConnected&&s()}catch(q){D(q.message,!0)}};ot(e,{get:()=>Qe,set:m=>{Qe=m},count:_t,match:m=>new Set(Ht(rt(t),m).map(f=>f.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=f=>{f.target.closest(".vRm")||(ae=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){D("Vendor name required",!0);return}ae=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const r=()=>{ae=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=r);const c=e.querySelector("#vCancel");c&&(c.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const y=e.querySelector("#vForm");y&&(y.onsubmit=m=>{m.preventDefault();const f={};for(const[q,F]of new FormData(y))f[q]=F.trim();f.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(q=>q.dataset.dept);const C=f.name||ae;a("vendorSet",{name:ae,updates:f},`${C} saved`),ae=C})}function hn(){ae=null}const he=["admin","approver","finance","requester"],yn={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},At=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let Y="users",ce=null,Je="",fe=null,De=null,te=!1;const Pt={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>fe,set:e=>{fe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>De,set:e=>{De=e},seed:e=>e.materialTypes}};function fn(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%At.length;return At[t]}const Ue=e=>e[0].toUpperCase()+e.slice(1),bn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function le(e,t){if(ce===null){e.innerHTML='<div class="card">Loading users…</div>',U("usersList").then(a=>{ce=a.users,le(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}fe===null&&(fe=t.projects||[]),De===null&&(De=t.materialTypes||[]);const s=bn[Y];e.innerHTML=`
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
      ${Y==="users"?gn(t):Y==="vendors"?un(t,te):Sn(t,Pt[Y])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{Y=a.dataset.tab,te=!1,hn(),le(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(te=!te,le(e,t),te){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},Y==="users"?$n(e,t):Y==="vendors"?vn(e,t,()=>{te=!1,le(e,t)}):wn(e,t,Pt[Y])}function gn(e){const t=a=>(he.includes(a.role)?he:[a.role,...he]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(Ue(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Ce(e).includes(a)?[a,...Ce(e)]:Ce(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${v("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Be(Je,"Search by name or email…")}
      ${te?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${he.map(a=>`<option value="${a}">${Ue(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...ce].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||xe(a.email);return`<tr data-search="${nt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${fn(a.email)}">${o(et(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
          ${st(5,"No member matches that name or email.")}
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
      ${he.map(a=>`<div class="adm-rolecard">
        <h4>${Ue(a)}</h4>
        <p>${yn[a]}</p>
      </div>`).join("")}
    </div>`}function $n(e,t){ot(e,{get:()=>Je,set:n=>{Je=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,i)=>{try{const c=await U("userSet",{email:n,...r});ce=c.users,te=!1,await E.applyResult(c),D(i),e.isConnected&&le(e,t)}catch(c){D(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:r,department:i},`${n} → ${r}`)})}function Ce(e){const t=e.lists&&e.lists.departments||[],s=(fe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Sn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Be(t.q,`Search ${t.plural} by name or department…`)}
      ${te?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Ce(e).map(a=>`<option value="${o(a)}">${o(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${nt(a.department,a[t.key])}">
            <td class="adm-name">${o(a.department)}</td>
            <td>${o(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${o(a.department)}" data-val="${o(a[t.key])}" title="Remove">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${st(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Zt(s.length,s.length,t)}</span>
      </div>
    </div>`}const Zt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function wn(e,t,s){ot(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,i)=>Zt(r,i,s)});const a=async(r,i,c)=>{try{const y=await U(r,i);s.set(y[s.respKey]),te=!1,await E.applyResult(y),D(c),e.isConnected&&le(e,t)}catch(y){D(y.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:i},`${r} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:i,val:c}=r.dataset;confirm(`Remove "${c}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:c},`${c} removed`)})}const Le={requester:0,approver:1,finance:1,admin:2};function kn(e,t){if(!t||!e||!e.minRole)return!0;const s=Le[t.role];return s!=null&&s>=Le[e.minRole]}const Yt=document.getElementById("app"),He={"":{fn:Ft,nav:"Dashboard",icon:"grid"},vendors:{fn:Qa,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:zt,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn:rn,minRole:"requester"},pr:{fn:We},admin:{fn:le,nav:"Admin",icon:"settings",minRole:"admin"}};let oe,qt=null;function Wt(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function Rn(){oe==null||oe.abort(),Yt.innerHTML=`<div class="auth-gate">
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
  </div>`,oa(document.getElementById("gsignin"))}function Qt(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Jt(){var x,W,K;const e=E.get(),{name:t,param:s}=Wt(),a=He[t]||He[""],n=((x=e.me)==null?void 0:x.role)||"";if(e.me&&!kn(a,e.me)){location.hash="#/";return}oe==null||oe.abort(),oe=new AbortController;const r=oe.signal,i=Object.entries(He).filter(([,d])=>d.nav&&(!d.minRole||Le[n]>=Le[d.minRole])).map(([d,S])=>`<a href="#/${d}" ${t===d?'aria-current="page"':""} class="${t===d?"active":""}">${v(S.icon)}<span>${S.nav}</span>${t===d?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],y=c.filter(d=>!d.readAt).length,m=aa()||{},f=m.email||((W=e.me)==null?void 0:W.email)||"",C=m.name||xe(f),q=m.picture?`<img class="avatar" src="${o(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(et(C))}</span>`,F=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=F+" · Oizom Procurement",Yt.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${o(F)}</b></div>
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
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${q}<span class="profile-copy"><span class="pname">${o(C)}</span><span class="prole">${o(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${o(f)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Qt(e),document.getElementById("btnRefresh").onclick=async()=>{await E.refresh(),E.get().err||D("Data refreshed")};const T=document.getElementById("nPanel"),L=document.getElementById("nBtn"),N=document.getElementById("pMenu"),u=document.getElementById("profileBtn"),A=()=>{T.hidden=N.hidden=!0,L.setAttribute("aria-expanded","false"),u.setAttribute("aria-expanded","false")};L.onclick=()=>{var S;const d=T.hidden;A(),T.hidden=!d,L.setAttribute("aria-expanded",String(d)),d&&y&&(c.forEach(M=>{M.readAt||(M.readAt="now")}),(S=document.querySelector(".nbadge"))==null||S.remove(),U("notifRead").catch(()=>{}))},u.onclick=()=>{const d=N.hidden;A(),N.hidden=!d,u.setAttribute("aria-expanded",String(d))},document.getElementById("btnOut").onclick=na,document.addEventListener("click",d=>{d.target.closest(".nbell, .profile-wrap")||A()},{signal:r});const P=document.getElementById("sidebar"),b=document.getElementById("workspace"),O=document.getElementById("openNav"),g=document.getElementById("shell"),$=matchMedia("(max-width: 960px)");let h=!1;const R=(d,S=!0)=>{var M;h=$.matches&&d,g.classList.toggle("nav-open",h),P.inert=$.matches&&!h,b.inert=h,document.getElementById("navBackdrop").hidden=!h,O.setAttribute("aria-expanded",String(h)),document.body.classList.toggle("nav-locked",h),h?(M=P.querySelector("nav a"))==null||M.focus():S&&$.matches&&O.focus()};R(!1,!1),O.onclick=()=>R(!0),document.getElementById("closeNav").onclick=()=>R(!1),document.getElementById("navBackdrop").onclick=()=>R(!1),P.querySelectorAll("a").forEach(d=>d.addEventListener("click",()=>R(!1),{signal:r})),$.addEventListener("change",()=>R(!1,!1),{signal:r}),document.addEventListener("keydown",d=>{if(d.key==="Escape"&&(h?R(!1):T.hidden?N.hidden||(A(),u.focus()):(A(),L.focus())),d.key==="Tab"&&h){const S=[...P.querySelectorAll("a, button")],M=S[0],j=S[S.length-1];d.shiftKey&&document.activeElement===M?(d.preventDefault(),j.focus()):!d.shiftKey&&document.activeElement===j&&(d.preventDefault(),M.focus())}},{signal:r});const k=document.getElementById("view");if(document.querySelector(".skip-link").onclick=d=>{d.preventDefault(),k.focus()},!e.lastSync)k.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${o(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(K=document.getElementById("retryLoad"))==null||K.addEventListener("click",()=>E.refresh(),{signal:r});else{a.fn(k,e,s);const d=t+"/"+(s||"");qt!==d&&ea(k),qt=d}}window.addEventListener("hashchange",()=>{Jt(),window.scrollTo({top:0,behavior:"instant"})});let Dt="",Lt=!1;E.subscribe(e=>{e.err&&e.err!==Dt&&D(e.err,!0),Dt=e.err;const t=!Lt&&e.lastSync;if(t&&(Lt=!0),e.lastSync&&(e.loading||e.err)||Wt().name==="new"&&!t&&e.lastSync){Qt(e);return}Jt()});sa(()=>E.refresh());Me()||Rn();
