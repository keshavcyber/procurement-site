(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var qt;const X=typeof window<"u"?(qt=window.matchMedia)==null?void 0:qt.call(window,"(prefers-reduced-motion: reduce)"):null,we=new Set,Qt="cubic-bezier(.2,.75,.25,1)";var Dt;(Dt=X==null?void 0:X.addEventListener)==null||Dt.call(X,"change",e=>{e.matches&&we.forEach(t=>t.cancel())});function Le(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||X!=null&&X.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Qt,fill:"backwards"});return r.id="workspace-reveal",we.add(r),r.finished.then(()=>we.delete(r),()=>we.delete(r)),r}function Jt(e){if(X!=null&&X.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Le(a,{delay:Math.min(s++*22,154),distance:10})}}const Lt={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Te="oizom-id-token";let it=null;function Xt(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Ne(){const e=localStorage.getItem(Te);return e?Xt(e)<Date.now()+3e4?(localStorage.removeItem(Te),null):e:null}function ea(){const e=Ne();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function ta(){localStorage.removeItem(Te),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function aa(e){if(it=e,Ne()){e();return}Xe(()=>{google.accounts.id.initialize({client_id:Lt.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Te,t.credential),it()}}),google.accounts.id.prompt()})}function Xe(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>Xe(e,t+1),100)}function na(e){Xe(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class He extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const Nt=new Set(["list","me","usersList","health","logTail"]),sa=new Set([404,408,429,500,502,503,504]),oa=45e3;function ra(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function ge(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=Nt.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new He(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||sa.has(t)})}async function ia(e,t){const s=Ne();if(!s)throw new He("SIGNED_OUT");let a;try{a=await fetch(Lt.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(oa),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw ge(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=ra(a);if(!a.ok)throw ge(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw ge(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw ge(e,{stage:n,kind:"response"});if(!r.ok)throw new He(r.error||"Request failed",{action:e});return r}async function O(e,t={}){for(let s=0;s<2;s++)try{return await ia(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!Nt.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function la(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function da(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function ca(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function ma(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function lt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:ca(n),qty:ma(n)}})}let x={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ke=new Set;let dt=!1,me=null,Be=0;function ua(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Fe(){Ke.forEach(e=>e(x))}const M={get:()=>x,subscribe(e){return Ke.add(e),()=>Ke.delete(e)},refresh(){return me||(x={...x,loading:!0},me=Promise.resolve().then(async()=>{try{let e,t;do t=Be,e=await O("list");while(t!==Be);ua(e),x={prs:lt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},dt=!0}catch(e){if(e.message==="SIGNED_OUT"&&dt){location.reload();return}x={...x,err:e.message,loading:!1}}}).finally(()=>{me=null,x={...x,loading:!1},Fe()}),Fe(),me)},async applyResult(e,{itemsChanged:t=!1}={}){Be++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=x.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return M.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),i=lt([e.pr],r)[0];s.prs=n?x.prs.map(c=>c.id===i.id?i:c):[...x.prs,i]}a=!0}e.deleted&&(s.prs=x.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=x.me&&e.users.find(r=>r.email.toLowerCase()===x.me.email.toLowerCase());if(x.me&&(!n||!n.role))return M.refresh();n&&(s.me={...x.me,role:n.role,department:n.department}),a=!0}if(!a)return M.refresh();x={...x,...s},Fe()}},ct={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ct[e]||ct.file}</svg>`}const o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Me(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function q(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const J=e=>e?o(String(e).slice(0,10)):"—";function Ee(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function et(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const mt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},ke=e=>mt[e]!=null?mt[e]:e+" ";function ye(e,t){const s=e==="INR"?"en-IN":"en-US";return ke(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function ee(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?ke(e)+(t/1e6).toFixed(2)+"M":t>=1e3?ke(e)+(t/1e3).toFixed(1)+"K":ke(e)+Math.round(t).toLocaleString("en-US")}const be=["Cancelled","Rejected"],pa=["Ordered","In Transit","Received"],xe=e=>pa.includes(e.status)&&e.paymentStatus!=="Paid";function ut(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function Mt(e){const t=e.filter(n=>!be.includes(n.status)),s=e.filter(xe),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:ut(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:ut(t)}}const Ve={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:xe,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!be.includes(e.status)};function va(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function pt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function Et(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function ha(e){return e.filter(xe)}function ya(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function fa(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function vt(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let i;if(t==="count")i=1;else{if(be.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;i=c}a[r]=(a[r]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function ba(e,t){const s={};for(const a of e){if(be.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function ga(e,t,s=6){const a={};for(const i of e){if(be.includes(i.status)||(i.currency||"Unknown")!==t)continue;const c=Number(i.amount);if(!i.amount||!isFinite(c))continue;const b=i.vendor||"Unspecified";a[b]=(a[b]||0)+c}const n=Object.entries(a).map(([i,c])=>({vendor:i,total:c})).sort((i,c)=>c.total-i.total);if(n.length<=s)return n;const r=n.slice(s).reduce((i,c)=>i+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function $a(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Sa(e){const t=(r,i)=>{const c=Date.parse(r),b=Date.parse(i);return isFinite(c)&&isFinite(b)?(b-c)/864e5:null},s=r=>r.length?r.reduce((i,c)=>i+c,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const wa=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function ka(e,t=Date.now()){const s=wa.map(a=>({...a,count:0}));return e.filter(xe).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(i=>r>=i.min&&r<=i.max)||s[s.length-1]).count++}),s}const Ge=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],xt=["Unpaid","Paid","Partially Paid","FOC / Free"],Ae={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Ra(e,t,s,a,n){const r=(Ae[e]||{})[t];return r?r.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function Ca(e,t,s,a){return Object.keys(Ae[e]||{}).filter(n=>Ra(e,n,t,s,a))}function Ta(e,t){return!!(Ae[e]&&Ae[e][t])}const Aa=["Submitted","Approved","Rejected"],u={sel:"total",tab:"mine",page:1,moreFilters:!1,filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}},ue=25,Pa={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let ze;function qa(e,t){u.tab=t==="admin"?"all":t==="approver"?"dept":t==="finance"?"payments":"mine",u.sel=["pending","unpaid"].includes(e)?e:"total",u.page=1,u.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""},location.hash="#/"}function re(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(It(e,t),s&&Le(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const ht=e=>String(e||"").slice(0,10);function Da(e){const t=u.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&ht(e.createdAt)<t.from||t.to&&ht(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function It(e,t){clearTimeout(ze),e.innerHTML=`
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
    </div>`,La(e.querySelector("#tabBody"),e,t)}const de=e=>e.length?e.map(([t,s])=>ee(t,s)).join(" + "):"—";function La(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",i=a.role==="finance",c=n?["mine","dept","approved"]:r?["mine","all"]:i?["mine","payments"]:["mine"];c.includes(u.tab)||(u.tab="mine");const b=u.tab==="dept",m=u.tab==="approved",$=u.tab==="all",k=u.tab==="payments",P=va(s.prs,a.email),B=n?pt(s.prs,a.email):[],T=n?Et(s.prs,a.department):[],L=i?ha(s.prs):[],N=b?T:m?B:$?s.prs:k?L:P,p=Mt(N),w=k?[{key:"total",n:p.total,l:"Awaiting payment",s:de(p.unpaidTotals)},{key:"transit",n:p.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:p.receivedPct+"%",l:"Received",s:p.received+" of "+p.total,cls:"go"},{key:"spend",n:p.spendTotals.length?ee(...p.spendTotals[0]):"—",l:"Total value",s:p.spendTotals.length>1?"+ "+de(p.spendTotals.slice(1)):""}]:b?[{key:"total",n:p.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:p.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:p.unpaidCount,l:"Unpaid",s:de(p.unpaidTotals),cls:"bad"},{key:"transit",n:p.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:p.receivedPct+"%",l:"Received",s:p.received+" of "+p.total,cls:"go"},{key:"spend",n:p.spendTotals.length?ee(...p.spendTotals[0]):"—",l:"Total spend",s:p.spendTotals.length>1?"+ "+de(p.spendTotals.slice(1)):""}]:[{key:"total",n:p.total,l:m?"Approved PRs":$?"All PRs":"Total PRs",s:m?"across all requesters":$?"every department":""},...m?[]:[{key:"pending",n:p.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:p.unpaidCount,l:"Unpaid",s:de(p.unpaidTotals),cls:"bad"},{key:"transit",n:p.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:p.receivedPct+"%",l:"Received",s:p.received+" of "+p.total,cls:"go"},{key:"spend",n:p.spendTotals.length?ee(...p.spendTotals[0]):"—",l:m?"Approved spend":"Total spend",s:p.spendTotals.length>1?"+ "+de(p.spendTotals.slice(1)):""}];if($)for(const d of ya(s.prs))w.push({key:"ap:"+d.email,n:d.count,l:"Approved by "+Ee(d.email),s:d.email,cls:"go"});w.some(d=>d.key===u.sel)||(u.sel="total");const I=(u.sel.startsWith("ap:")?pt(s.prs,u.sel.slice(3)):N.filter(Ve[u.sel])).sort((d,C)=>(C.createdAt||"").localeCompare(d.createdAt||"")),j=w.find(d=>d.key===u.sel),f=[...new Set(N.map(d=>d.department).filter(Boolean))].sort(),h=[...new Set(N.map(d=>d.vendor).filter(Boolean))].sort();u.filters.dept&&!f.includes(u.filters.dept)&&(u.filters.dept=""),u.filters.vendor&&!h.includes(u.filters.vendor)&&(u.filters.vendor="");const g=I.filter(Da),y=Object.values(u.filters).some(Boolean),A=Math.max(1,Math.ceil(g.length/ue));u.page=Math.min(Math.max(1,u.page),A);const R=g.slice((u.page-1)*ue,u.page*ue),E=["dept","vendor","from","to"].filter(d=>u.filters[d]).length,z=$?"All requests":b?"Department requests":m?"Approved by you":k?"Payment queue":"Your requests",_=d=>String(d.department||"").toLowerCase()===String(a.department||"").toLowerCase(),l=d=>{const C=r?Ge:n&&d.status==="Submitted"&&_(d)?Aa:null;return C?`<select class="status-sel" data-status="${o(d.status)}" aria-label="Status for ${o(d.id)}" data-id="${o(d.id)}">${C.map(U=>`<option ${U===d.status?"selected":""}>${o(U)}</option>`).join("")}</select>`:Me(d.status)},S=d=>`<select class="pay-sel" aria-label="Payment status for ${o(d.id)}" data-id="${o(d.id)}">${xt.map(C=>`<option ${C===d.paymentStatus?"selected":""}>${o(C)}</option>`).join("")}</select>`;e.innerHTML=`
    ${c.length>1?`<div class="adm-tabs" aria-label="Request scope">
      <button class="adm-tab ${u.tab==="mine"?"active":""}" data-tab="mine">Your requests <span>${P.length}</span></button>
      ${n?`<button class="adm-tab ${b?"active":""}" data-tab="dept">${o(a.department||"Your department")} <span>${T.length}</span></button><button class="adm-tab ${m?"active":""}" data-tab="approved">Approved by you <span>${B.length}</span></button>`:""}
      ${r?`<button class="adm-tab ${$?"active":""}" data-tab="all">All requests <span>${s.prs.length}</span></button>`:""}
      ${i?`<button class="adm-tab ${k?"active":""}" data-tab="payments">Awaiting payment <span>${L.length}</span></button>`:""}
    </div>`:""}
    <div class="kpis dashboard-kpis" aria-label="Filter requests by summary">${w.filter(d=>!d.key.startsWith("ap:")).map(d=>`
      <button type="button" class="kpi clickable ${d.cls||""} ${d.key===u.sel?"sel":""}" data-key="${o(d.key)}" aria-pressed="${d.key===u.sel}">
        <span class="kpi-top"><span class="l">${o(d.l)}</span>${v(Pa[d.key])}</span>
        <span class="v">${o(String(d.n))}</span><span class="s">${o(d.s||(d.key==="total"?z:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    <section class="card requests-card" aria-label="Purchase requests">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${g.length}</span></h2><p>${o(z)} · ${u.sel==="total"?"Latest first":o(j.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${o(u.filters.q)}"></label>
        <select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Ge.map(d=>`<option value="${o(d)}" ${u.filters.status===d?"selected":""}>${o(d)}</option>`).join("")}</select>
        <button type="button" class="btn filter-toggle ${E?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${u.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${E?`<span class="count-badge">${E}</span>`:""}</button>
        ${y?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${u.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${f.map(d=>`<option value="${o(d)}" ${u.filters.dept===d?"selected":""}>${o(d)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${h.map(d=>`<option value="${o(d)}" ${u.filters.vendor===d?"selected":""}>${o(d)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${o(u.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${o(u.filters.to)}"></label>
        ${$?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${w.filter(d=>d.key.startsWith("ap:")).map(d=>`<option value="${o(d.key)}" ${u.sel===d.key?"selected":""}>${o(d.l.replace("Approved by ",""))} (${d.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${k?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${R.map(d=>`<tr class="rowlink ${k?"payment-row":""}" data-id="${o(d.id)}">
          <td class="request-id"><a href="#/pr/${o(d.id)}">${o(d.id)}</a></td>
          <td class="request-date">${J(d.createdAt)}</td>
          ${k?`<td>${o(d.vendor)}</td><td>${o(d.poNo||"—")}</td><td>${o(d.paymentTerm||"—")}</td>`:`<td class="request-dept">${o(d.department)}</td><td class="wrap request-item">${o(d.item)}</td><td class="request-vendor">${o(d.vendor)}</td>`}
          <td class="request-amount">${d.amount?o(ee(d.currency||"INR",Number(d.amount))):"—"}</td>
          <td class="request-status">${k?S(d):l(d)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(y?"search":"file")}<b>${y?"No matching requests":"No requests here yet"}</b><span>${y?"Try a different search or clear your filters.":"Create a request to get your purchases moving."}</span>${y?'<button class="btn" id="emptyClear">Clear filters</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${g.length?(u.page-1)*ue+1:0}–${Math.min(u.page*ue,g.length)} of ${g.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${u.page===1?"disabled":""}>${v("left")}</button><span>Page ${u.page} of ${A}</span><button class="btn" id="dashNext" aria-label="Next page" ${u.page===A?"disabled":""}>${v("right")}</button></div></div>
    </section>`,e.querySelectorAll(".adm-tab").forEach(d=>d.onclick=()=>{u.tab=d.dataset.tab,u.sel="total",u.page=1,re(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(d=>d.onclick=()=>{u.sel=d.dataset.key,u.page=1,re(t,s)}),e.querySelectorAll("tr.rowlink").forEach(d=>d.onclick=C=>{C.target.closest("a, select, button")||(location.hash="#/pr/"+d.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{u.moreFilters=!u.moreFilters,e.querySelector("#advancedFilters").hidden=!u.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(u.moreFilters))};const D=e.querySelector("#dashApprover");D&&(D.onchange=()=>{u.sel=D.value,u.page=1,re(t,s)});const F=d=>{var C,U;u.page+=d,re(t,s),(U=(C=t.querySelector(".requests-card")).scrollIntoView)==null||U.call(C,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>F(-1),e.querySelector("#dashNext").onclick=()=>F(1);const K=(d,C)=>{u.filters[d]=C,u.page=1,re(t,s)};e.querySelector("#dashQ").oninput=d=>{u.filters.q=d.target.value,u.page=1,clearTimeout(ze),ze=setTimeout(()=>{t.isConnected&&re(t,s,!1)},150)},e.querySelector("#dashDept").onchange=d=>K("dept",d.target.value),e.querySelector("#dashVendor").onchange=d=>K("vendor",d.target.value),e.querySelector("#dashStatus").onchange=d=>K("status",d.target.value),e.querySelector("#dashFrom").onchange=d=>K("from",d.target.value),e.querySelector("#dashTo").onchange=d=>K("to",d.target.value);const V=()=>{u.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},u.page=1,u.sel="total",re(t,s)},W=e.querySelector("#dashFilterClear"),oe=e.querySelector("#emptyClear");W&&(W.onclick=V),oe&&(oe.onclick=V),e.querySelectorAll(".status-sel").forEach(d=>{d.onclick=C=>C.stopPropagation(),d.onchange=async()=>{const C=d.dataset.id,U=s.prs.find(G=>G.id===C),Z=d.value;if(!(!U||Z===U.status)){if((Z==="Rejected"||Z==="Cancelled")&&!confirm(`Mark ${C} as ${Z}?`)){d.value=U.status;return}d.disabled=!0;try{let G;a.role==="admin"&&!Ta(U.status,Z)?G=await O("update",{id:C,updates:{status:Z}}):G=await O("transition",{id:C,to:Z}),q(`${C} → ${Z}`),await M.applyResult(G)}catch(G){q(G.message,!0),d.value=U.status,d.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(d=>{d.onclick=C=>C.stopPropagation(),d.onchange=async()=>{const C=d.dataset.id,U=s.prs.find(G=>G.id===C),Z=d.value;if(!(!U||Z===U.paymentStatus)){d.disabled=!0;try{const G=await O("update",{id:C,updates:{paymentStatus:Z}});q(`${C} payment → ${Z}`),await M.applyResult(G)}catch(G){q(G.message,!0),d.value=U.paymentStatus,d.disabled=!1}}}})}function tt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function at(e,t){const s=tt(e,t),a=s.filter(Ve.spend),n={};for(const r of a){const i=Number(r.amount);if(!r.amount||!isFinite(i))continue;const c=r.currency||"INR";n[c]=(n[c]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((r,i)=>i[1]-r[1]),unpaid:s.filter(Ve.unpaid).length,lastOrder:s.reduce((r,i)=>{const c=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>r?c:r},"")}}function Bt(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(tt(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Na=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Ma={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Ea=1,xa=.7,Ft=.5,Ia=.4,Ba=.3,Fa=4,Oa=e=>e.length>=7?2:e.length>=Fa?1:0,Pe=e=>String(e??"").toLowerCase().trim();function ja(e,t){const s=e[t];return Pe(Array.isArray(s)?s.join(" "):s)}function Ot(e){return Pe(e).split(/[\s,]+/).filter(Boolean)}function Ua(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function yt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Ea;if(s.some(n=>n.startsWith(t)))return xa;if(e.includes(t))return Ft;const a=Oa(t);return a&&s.some(n=>Ua(n,t)<=a)?Ba:0}function Ha(e,t){const s=yt(e,t);if(s)return s;const a=Ma[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):yt(e,r)>=Ft)?Ia:0}function Ka(e,t){const s=Array.isArray(t)?t:Ot(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:i,weight:c}of Na)r=Math.max(r,Ha(ja(e,i),n)*c);if(!r)return 0;a+=r}return a}function jt(e,t){const s=Ot(t);return s.length?(e||[]).map(a=>({v:a,score:Ka(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Pe(a.v.displayName||a.v.name).localeCompare(Pe(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Ie(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${o(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const nt=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function st(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function ot(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const i=e.querySelector("#"+n);if(!i)return;const c=i.closest(".adm-card"),b=c.querySelector(".admSearchClear"),m=()=>Va(c,t(),a,r);i.oninput=()=>{s(i.value),b.hidden=!i.value,m()},i.onkeydown=$=>{$.key==="Escape"&&i.value&&(i.value="",i.oninput())},b.onclick=()=>{i.value="",i.oninput(),i.focus()},m()}function Va(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let c=null;r.forEach($=>{$.hidden=n?i?!i.has($.dataset.name):!$.dataset.search.includes(n):!1,$.classList.remove("last-visible"),$.hidden||(c=$)}),c&&c.classList.add("last-visible");const b=e.querySelector(".adm-nomatch");b&&(b.hidden=!!c||!r.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(r.filter($=>!$.hidden).length,r.length))}let pe="";const Ut={Domestic:"dom",Foreign:"for",Mixed:"mix"},Ga=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Ht(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(Ga(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function za(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function _a(e,t){const s=at(e.prs,t.name),a=Bt(t,e.prs),n=s.spendTotals.length?ee(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${o(t.name)}">
      <div class="vc-top">
        ${Ht(t)}
        <div class="vc-title">
          <b>${o(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${o(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Ut[a]}">${o(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${o(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${J(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${za(t)}</div>
    </a>`}const Za=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function ft(e,t){const s=Za(e.vendors),a=t.trim()?jt(s,t):s;return a.length?a.map(n=>_a(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Ya(e,t,s){if(s)return Wa(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Ie(pe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${ft(t,pe)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),i=()=>{pe=n.value,r.hidden=!pe,a.innerHTML=ft(t,pe)};n.oninput=i,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",i())},r.onclick=()=>{n.value="",i(),n.focus()}}function Wa(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=at(t.prs,a.name),r=Bt(a,t.prs),i=t.me&&t.me.role==="admin",c=tt(t.prs,a.name).sort((m,$)=>($.createdAt||"").localeCompare(m.createdAt||"")),b=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Ht(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${o(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${Ut[r]}">${o(r.toUpperCase())}</span>`:""}
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
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([m,$])=>ee(m,$)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${J(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${b.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${b.map(([m,$])=>`<div><span class="vc-l">${o(m)}</span><b>${o($)}</b></div>`).join("")}</div>
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
            <td>${Me(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const _e=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Kt=new Map(_e.map(e=>[e.code,e])),Qa=e=>Kt.has(String(e||"").trim().toUpperCase());function Ze(e){const t=Kt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Ja(e){const t=String(e||"").trim().toLowerCase(),s=t?_e.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[..._e],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function $e(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(c)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function bt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,i=a-n.t-n.b,c=Math.max(...e.map(p=>p.value),1),b=r/(e.length-1),m=p=>n.l+p*b,$=p=>n.t+i-p/c*i,k=e.map((p,w)=>`${w===0?"M":"L"}${m(w).toFixed(1)} ${$(p.value).toFixed(1)}`).join(" "),P=`${k} L${m(e.length-1).toFixed(1)} ${n.t+i} L${m(0).toFixed(1)} ${n.t+i} Z`,B=[0,.5,1].map(p=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-p)).toFixed(1)}" y2="${(n.t+i*(1-p)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),T=Math.ceil(e.length/6)||1,L=e.map((p,w)=>w%T===0||w===e.length-1?`<text x="${m(w).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${w===0?"start":w===e.length-1?"end":"middle"}">${o(p.month.slice(2))}</text>`:"").join(""),N=e.map((p,w)=>`<circle cx="${m(w).toFixed(1)}" cy="${$(p.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(p.month)}: ${o(t(p.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${B}
    <path d="${P}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${k}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${N}
    ${L}
  </svg>`}const Xa=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],en={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},tn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Se={currency:""};function Vt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?Et(t.prs,s.department):t.prs||[],r=fa(n);r.includes(Se.currency)||(Se.currency=r[0]||"");const i=Se.currency,c=f=>i?ee(i,f):String(f),b=i?vt(n,"spend",i):[],m=vt(n,"count"),$=i?ga(n,i,6).map(f=>({label:f.vendor,value:f.total})):[],k=!a&&i?ba(n,i).map(f=>({label:f.department,value:f.total})):[],P=$a(n),B=Xa.filter(f=>P[f]).map(f=>({label:f,value:P[f]})),T=Sa(n),L=ka(n),N=L.map(f=>({label:f.label,value:f.count})),p=L.reduce((f,h)=>f+h.count,0),w=b.reduce((f,h)=>f+h.value,0),I=Mt(n);e.innerHTML=`
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
        <select id="insCur" aria-describedby="insCurHelp">${r.map(f=>`<option value="${o(f)}" ${f===i?"selected":""}>${o(Ze(f))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?o(c(w)):"—"}</div><div class="l">Total spend${i?" · "+o(i):""}</div></div>
        <div class="kpi"><div class="v">${T.avgApprovalDays!=null?T.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${T.avgDeliveryDays!=null?T.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${p?"warn":""}"><div class="v">${p}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+o(i):""}</p></div>
          </div>
          <div class="spend-chart">${b.length?bt(b,{valueFmt:f=>ee(i,f),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
        <section class="attention-card">
          <span class="eyebrow">NEXT UP</span><h2>Keep work moving.</h2>
          ${s.role!=="finance"?`<button type="button" data-queue="pending"><span class="attention-icon">${v("clock")}</span><span><b>${I.pending} awaiting approval</b><small>Ready for a decision</small></span>${v("arrow")}</button>`:""}
          <button type="button" data-queue="unpaid"><span class="attention-icon">${v("wallet")}</span><span><b>${I.unpaidCount} awaiting payment</b><small>Ordered and not fully paid</small></span>${v("arrow")}</button>
        </section>
      </div>

      <div class="adm-grid2">
        ${k.length?`<div class="card"><h2>Spend by department${i?" · "+o(i):""}</h2>
          <div class="pd-body">${$e(k,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+o(i):""}</h2>
          <div class="pd-body">${$e($,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${$e(B,{colorOf:f=>en[f.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${$e(N,{colorOf:f=>tn[f.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${bt(m,{valueFmt:f=>f+" PR"+(f===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var f;Se.currency=j.value,Vt(e,t),(f=e.querySelector("#insCur"))==null||f.focus()}),e.querySelectorAll("[data-queue]").forEach(f=>{f.onclick=()=>qa(f.dataset.queue,s.role)})}const an=xt,nn={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ye=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:nn[t])||[],Oe={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ne=(e,t,s)=>`<span class="lblrow">${o(e)}${Oe[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${o(Oe[t])}" data-tip="${o(Oe[t])}">?</span>`:""}</span>`;function ie(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${n?o(n):"Select…"}</option>`).join("")}function gt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
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
  </div>`}function $t(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function sn(e,t,s){const a=s?t.prs.find(h=>h.id===s):null,n=a||{},r=a?n.items||[]:[{}],i=t.me||{role:""},c=["approver","admin","finance"].includes(i.role),b=a?n.department||"":i.department||"",m=(t.projects||[]).filter(h=>h.department.toLowerCase()===b.toLowerCase()).map(h=>h.project),$=(t.vendors||[]).filter(h=>(h.departments||[]).some(g=>g.toLowerCase()===b.toLowerCase())),k=h=>{const g=$.find(y=>y.name.toLowerCase()===String(h||"").toLowerCase());return g?g.displayName||g.name:String(h||"")},P=(t.materialTypes||[]).filter(h=>h.department.toLowerCase()===b.toLowerCase()).map(h=>h.materialType),B=b.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?Me(n.status):""}
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
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(k(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ne("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(Ze(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ne("Priority","priority",!0)} <select name="priority">${ie(Ye(t,"priorities"),n.priority||"Medium")}</select></label>
              <label>${ne("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o((n.expectedDate||"").slice(0,10))}"></label>
              ${c?`
              <label>${ne("Payment status*","payment")} <select name="paymentStatus" required>${ie(an,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${ie(Ge,n.status)}</select></label>
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
              <label>Payment term <select name="paymentTerm">${ie(Ye(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((h,g)=>gt(t,h,g,P,B)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const T=e.querySelector("#prForm"),L=e.querySelector("#itemRows"),N=()=>{const h=$t(T).map(A=>{const R=la(A.qty,A.unitPrice);return{lineTotal:R!==""?R:A.lineTotal}}),g=da(h),y=T.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=g===""?"":"Total: "+ye(y,g)},p=h=>{h.querySelector(".rmItem").onclick=()=>{L.children.length>1&&(h.remove(),N())},h.querySelectorAll("input, select").forEach(g=>g.oninput=N)};[...L.children].forEach(p),N();const w=(h,g,y,{search:A,resolve:R,toLabel:E,allowEmpty:z,onCommit:_})=>{const l=e.querySelector("#"+h),S=e.querySelector("#"+g),D=T.querySelector(`[name="${y}"]`),F=()=>{_&&_()},K=V=>{const W=A(V).slice(0,30);S.innerHTML=W.map(oe=>`<div class="curOpt" data-v="${o(oe.value)}"><b>${o(oe.main)}</b> ${o(oe.name||"")}<span>${o(oe.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',S.hidden=!1};l.onfocus=()=>{l.select(),K("")},l.oninput=()=>K(l.value),S.onmousedown=V=>{V.preventDefault();const W=V.target.closest(".curOpt");W&&(D.value=W.dataset.v,l.value=E(W.dataset.v),S.hidden=!0,F())},l.onblur=()=>setTimeout(()=>{S.hidden=!0;const V=l.value.trim();if(!V&&z)D.value="";else{const W=R(V);W!=null&&(D.value=W)}l.value=E(D.value),F()},120)};w("curSearch","curList","currency",{search:h=>Ja(h).map(g=>({value:g.code,main:g.code,name:g.name,sub:g.sym||""})),resolve:h=>{const g=h.split("—")[0].trim().toUpperCase();return Qa(g)?g:null},toLabel:h=>Ze(h),onCommit:N});const I=h=>{const g=String(h||"").trim().toLowerCase();return $.filter(y=>!g||y.name.toLowerCase().includes(g)||(y.displayName||"").toLowerCase().includes(g)||(y.category||"").toLowerCase().includes(g)).sort((y,A)=>(y.displayName||y.name).localeCompare(A.displayName||A.name)).map(y=>({value:y.name,main:y.displayName||y.name,name:y.displayName?y.name:"",sub:y.category||""}))},j=e.querySelector("#venHint"),f=()=>{const h=T.querySelector('[name="vendor"]').value.trim();j.hidden=!h||$.some(g=>g.name.toLowerCase()===h.toLowerCase())};w("venSearch","venList","vendor",{search:I,resolve:h=>{const g=$.find(y=>y.name.toLowerCase()===h.toLowerCase()||(y.displayName||"").toLowerCase()===h.toLowerCase());return g?g.name:h},toLabel:h=>k(h),allowEmpty:!0,onCommit:f}),f(),e.querySelector("#addItem").onclick=()=>{L.insertAdjacentHTML("beforeend",gt(t,{},L.children.length,P,B)),p(L.lastElementChild),Le(L.lastElementChild)},T.onsubmit=async h=>{h.preventDefault();const g=e.querySelector("#prSave");if(g.disabled)return;e.querySelectorAll(".pr-save").forEach(R=>{R.disabled=!0,R.innerHTML=v("refresh","spin")+" Saving…"}),g.disabled=!0,g.textContent="Saving…";const y={};for(const[R,E]of new FormData(h.target))R.startsWith("i_")||(y[R]=E);const A=$t(T);try{if(!A.length)throw new Error("Add at least one item with a description");if(a){const R=await O("update",{id:n.id,updates:y,items:A});await M.applyResult(R,{itemsChanged:!0}),q("PR updated"),location.hash="#/pr/"+n.id}else{const R=await O("create",{pr:y,items:A});await M.applyResult(R,{itemsChanged:!0}),q("Created "+R.pr.id),location.hash="#/pr/"+R.pr.id}}catch(R){q(R.message,!0),g.disabled=!1,g.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(E=>{E.disabled=!1,E.textContent=a?"Save changes":"Submit request"})}}}function St(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return r&&i&&r===i&&c?c:Ee(t)}const on={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`},rn=(e,t)=>(on[e]||(s=>`https://t.17track.net/en#nums=${s}`))(encodeURIComponent(t)),H=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ve=!1,wt=null;const kt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(et(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function We(e,t,s){const a=t.prs.find(l=>l.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}wt!==s&&(ve=!1,wt=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["approver","admin","finance"].includes(n.role),b=r||i&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),$=Ca(a.status,n.role,i,m),k=(a.department||"").toLowerCase()==="production",P=r&&a.status==="Approved",B=r&&a.poNo&&!a.zohoPoId,T=P?"":$.find(l=>!["Rejected","Cancelled","On Hold"].includes(l)),L=$.filter(l=>l!==T),N=l=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[l]||"Mark "+l.toLowerCase(),p=l=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[l]||"arrow",w=["Submitted","Approved","Ordered","In Transit","Received"],I=w.indexOf(a.status),j=(t.vendors||[]).find(l=>String(l.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),f=a.paymentTerm||j&&j.paymentTerms||"",h=t.lists&&t.lists.paymentTerms||[],g=["",...f&&!h.includes(f)?[f,...h]:h].map(l=>`<option value="${o(l)}" ${l===f?"selected":""}>${l?o(l):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${o(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${o(a.id)}</h1>${Me(a.status)}</div>
          <p class="request-subtitle">${o(a.project||a.department||"Purchase request")} · Created ${J(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${T?`<button class="btn primary" data-to="${o(T)}">${v(p(T))}${o(N(T))}</button>`:""}
          ${b?`<a class="btn" href="#/new/${o(a.id)}">${v("edit")} Edit</a>`:""}
          ${L.length||B?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${B?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${L.map(l=>`<button class="btn ${["Rejected","Cancelled"].includes(l)?"danger":""}" data-to="${o(l)}">${v(p(l))}${o(N(l))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${o(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${I===-1?"Currently "+o(a.status.toLowerCase()):I===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${w.map((l,S)=>`<li class="${S<I?"done":S===I?"current":""}" ${S===I?'aria-current="step"':""}><span class="step-dot">${S<I?v("check"):S+1}</span><span>${o(l)}</span></li>`).join("")}</ol>
      </section>

      ${P&&ve?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(a.poDate||new Date().toISOString().slice(0,10))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${g}</select>
          </label>
          ${j&&j.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${o(j.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${H("Department",o(a.department))}
          ${H("Project",o(a.project))}
          ${H("Vendor",o(a.vendor))}
          ${H("Purpose",o(a.purpose))}
          ${H("Priority",o(a.priority))}
          ${H("Payment status",o(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${kt("Requested by",St(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+J(a.createdAt))}
          ${a.approverEmail||a.approvedByName?kt("Approved by",St(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+J(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${k?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(l=>`<tr>
            <td>${o(l.itemNo)}</td>
            <td class="wrap">${o(l.description)}</td>${k?`<td>${o(l.partNo)}</td>`:""}<td>${o(l.materialType)}</td>
            <td>${o([l.qty,l.unit].filter(Boolean).join(" "))}</td>
            <td>${l.unitPrice?o(ye(a.currency||"INR",Number(l.unitPrice))):"—"}</td>
            <td>${l.lineTotal?o(ye(a.currency||"INR",Number(l.lineTotal))):"—"}</td>
            <td>${l.purchaseLink?`<a href="${o(l.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${l.datasheetDoc?` <a href="${o(l.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${k?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(ye(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card">
        <h2>Delivery</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${H("Expected",J(a.expectedDate))}
          ${H("Received",J(a.receivedAt))}
          ${H("Tracking",a.trackingNo?`${o(a.courier||"")} <a href="${a.trackingLink?o(a.trackingLink):rn(a.courier,a.trackingNo)}" target="_blank" rel="noopener">${o(a.trackingNo)} ↗</a>`:"")}
          ${H("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${H("PO reference",[o(a.poNo),J(a.poDate)].filter(Boolean).join(" · "))}
          ${H("Invoice / order #",[o(a.invoiceNo),J(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${H("Payment term",o(a.paymentTerm))}
          ${H("Quotation / PI",a.quotationDoc?`<a href="${o(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${H("Zoho Books PO",a.zohoPoNumber?o(a.zohoPoNumber):"")}
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
    </div>`;const y=e.querySelector("#requestMore");e.onclick=l=>{y&&!y.contains(l.target)&&(y.open=!1)},e.onkeydown=l=>{l.key==="Escape"&&(y!=null&&y.open)&&(y.open=!1,y.querySelector("summary").focus())},y==null||y.addEventListener("focusout",l=>{y.contains(l.relatedTarget)||(y.open=!1)}),e.querySelectorAll("[data-to]").forEach(l=>l.onclick=async()=>{const S=l.dataset.to;if((S==="Rejected"||S==="Cancelled")&&!confirm(`Mark ${a.id} as ${S}?`))return;const D=l.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(F=>{F.disabled=!0}),l.innerHTML=v("refresh","spin")+" Updating…";try{const F=await O("transition",{id:a.id,to:S});q(a.id+" → "+S),await M.applyResult(F)}catch(F){q(F.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(K=>{K.disabled=!1}),l.innerHTML=D}});const A=e.querySelector("#makePoBtn");A&&(A.onclick=()=>{var l,S;ve=!0,We(e,t,s),Le((l=e.querySelector("#poForm"))==null?void 0:l.closest(".card")),(S=e.querySelector("[name=poNo]"))==null||S.focus()});const R=e.querySelector("#poCancelBtn");R&&(R.onclick=()=>{ve=!1,We(e,t,s)});const E=e.querySelector("#poForm");E&&(E.onsubmit=async l=>{l.preventDefault();const S=new FormData(E),D=String(S.get("poNo")||"").trim();if(!D)return;const F=E.querySelector('button[type="submit"]');F.disabled=!0;let K;try{K=await O("update",{id:a.id,updates:{poNo:D,poDate:S.get("poDate")||"",paymentTerm:S.get("paymentTerm")||""}});const V=await O("transition",{id:a.id,to:"Ordered"});q(a.id+" → Ordered (PO "+D+")"),ve=!1,await M.applyResult(V)}catch(V){K&&await M.applyResult(K),q(V.message,!0),F.disabled=!1}});const z=e.querySelector("#zohoPushBtn");z&&(z.onclick=async()=>{z.disabled=!0;try{const{pr:l}=await O("zohoPushPo",{id:a.id});q(a.id+" → Zoho Books PO "+l.zohoPoNumber),await M.applyResult({pr:l})}catch(l){q(l.message,!0),z.disabled=!1}});const _=e.querySelector("#devDelete");_&&(_.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){_.disabled=!0;try{const l=await O("delete",{id:a.id});q(a.id+" deleted"),location.hash="#/",await M.applyResult(l)}catch(l){q(l.message,!0),_.disabled=!1}}})}let Re=null,ae=null,Qe="";const ln=["Domestic","International"];function rt(e){return Re===null&&(Re=e.vendors||[]),Re}function dn(e){const t=e.lists&&e.lists.departments||[],s=rt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const Q=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function cn(e,t){const s=rt(e),a=ae&&s.find(r=>r.name.toLowerCase()===ae.toLowerCase());if(a)return mn(e,a);const n=[...s].sort((r,i)=>r.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${Ie(Qe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
      <div class="adm-foot"><span class="adm-count">${Gt(n.length,n.length)}</span></div>
    </div>`}const Gt=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function mn(e,t){const s=at(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${o(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?o(i):"—"}</option>`).join("");return`
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
        ${dn(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(b=>b.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${o(i)}">${o(i)}</button>`).join("")}
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
              ${["",...ln].map(i=>`<option value="${o(i)}" ${i===(t.type||"")?"selected":""}>${i?o(i):"—"}</option>`).join("")}
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
    </div>`}function un(e,t,s){const a=async(m,$,k)=>{try{const P=await O(m,$);Re=P.vendors,await M.applyResult(P),q(k),e.isConnected&&s()}catch(P){q(P.message,!0)}};ot(e,{get:()=>Qe,set:m=>{Qe=m},count:Gt,match:m=>new Set(jt(rt(t),m).map($=>$.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=$=>{$.target.closest(".vRm")||(ae=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){q("Vendor name required",!0);return}ae=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const r=()=>{ae=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=r);const c=e.querySelector("#vCancel");c&&(c.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const b=e.querySelector("#vForm");b&&(b.onsubmit=m=>{m.preventDefault();const $={};for(const[P,B]of new FormData(b))$[P]=B.trim();$.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(P=>P.dataset.dept);const k=$.name||ae;a("vendorSet",{name:ae,updates:$},`${k} saved`),ae=k})}function pn(){ae=null}const he=["admin","approver","finance","requester"],vn={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},Rt=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let Y="users",ce=null,Je="",fe=null,qe=null,te=!1;const Ct={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>fe,set:e=>{fe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>qe,set:e=>{qe=e},seed:e=>e.materialTypes}};function hn(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%Rt.length;return Rt[t]}const je=e=>e[0].toUpperCase()+e.slice(1),yn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function le(e,t){if(ce===null){e.innerHTML='<div class="card">Loading users…</div>',O("usersList").then(a=>{ce=a.users,le(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}fe===null&&(fe=t.projects||[]),qe===null&&(qe=t.materialTypes||[]);const s=yn[Y];e.innerHTML=`
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
      ${Y==="users"?fn(t):Y==="vendors"?cn(t,te):gn(t,Ct[Y])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{Y=a.dataset.tab,te=!1,pn(),le(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(te=!te,le(e,t),te){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},Y==="users"?bn(e,t):Y==="vendors"?un(e,t,()=>{te=!1,le(e,t)}):$n(e,t,Ct[Y])}function fn(e){const t=a=>(he.includes(a.role)?he:[a.role,...he]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(je(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Ce(e).includes(a)?[a,...Ce(e)]:Ce(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${v("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Ie(Je,"Search by name or email…")}
      ${te?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${he.map(a=>`<option value="${a}">${je(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...ce].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Ee(a.email);return`<tr data-search="${nt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${hn(a.email)}">${o(et(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
        <h4>${je(a)}</h4>
        <p>${vn[a]}</p>
      </div>`).join("")}
    </div>`}function bn(e,t){ot(e,{get:()=>Je,set:n=>{Je=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,i)=>{try{const c=await O("userSet",{email:n,...r});ce=c.users,te=!1,await M.applyResult(c),q(i),e.isConnected&&le(e,t)}catch(c){q(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:r,department:i},`${n} → ${r}`)})}function Ce(e){const t=e.lists&&e.lists.departments||[],s=(fe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function gn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Ie(t.q,`Search ${t.plural} by name or department…`)}
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
        <span class="adm-count">${zt(s.length,s.length,t)}</span>
      </div>
    </div>`}const zt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function $n(e,t,s){ot(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,i)=>zt(r,i,s)});const a=async(r,i,c)=>{try{const b=await O(r,i);s.set(b[s.respKey]),te=!1,await M.applyResult(b),q(c),e.isConnected&&le(e,t)}catch(b){q(b.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:i},`${r} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:i,val:c}=r.dataset;confirm(`Remove "${c}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:c},`${c} removed`)})}const De={requester:0,approver:1,finance:1,admin:2};function Sn(e,t){if(!t||!e||!e.minRole)return!0;const s=De[t.role];return s!=null&&s>=De[e.minRole]}const _t=document.getElementById("app"),Ue={"":{fn:It,nav:"Dashboard",icon:"grid"},vendors:{fn:Ya,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:Vt,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn:sn,minRole:"requester"},pr:{fn:We},admin:{fn:le,nav:"Admin",icon:"settings",minRole:"admin"}};let se,Tt=null;function Zt(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function wn(){se==null||se.abort(),_t.innerHTML=`<div class="auth-gate">
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
  </div>`,na(document.getElementById("gsignin"))}function Yt(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Wt(){var E,z,_;const e=M.get(),{name:t,param:s}=Zt(),a=Ue[t]||Ue[""],n=((E=e.me)==null?void 0:E.role)||"";if(e.me&&!Sn(a,e.me)){location.hash="#/";return}se==null||se.abort(),se=new AbortController;const r=se.signal,i=Object.entries(Ue).filter(([,l])=>l.nav&&(!l.minRole||De[n]>=De[l.minRole])).map(([l,S])=>`<a href="#/${l}" ${t===l?'aria-current="page"':""} class="${t===l?"active":""}">${v(S.icon)}<span>${S.nav}</span>${t===l?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],b=c.filter(l=>!l.readAt).length,m=ea()||{},$=m.email||((z=e.me)==null?void 0:z.email)||"",k=m.name||Ee($),P=m.picture?`<img class="avatar" src="${o(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(et(k))}</span>`,B=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=B+" · Oizom Procurement",_t.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${o(B)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${v("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${b?", "+b+" unread":""}" aria-expanded="false" aria-controls="nPanel">${v("bell")}${b?`<span class="nbadge">${b>9?"9+":b}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${b?b+" new":"All caught up"}</span></div>
              ${c.length?c.map(l=>`<${l.prId?"a":"div"} class="nitem ${l.readAt?"":"unread"}" ${l.prId?`href="#/pr/${o(l.prId)}"`:""}><div class="nmsg">${o(l.message)}</div><div class="ntime">${o(String(l.ts).slice(0,16).replace("T"," "))}</div></${l.prId?"a":"div"}>`).join(""):`<div class="nempty">${v("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${P}<span class="profile-copy"><span class="pname">${o(k)}</span><span class="prole">${o(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${o($)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Yt(e),document.getElementById("btnRefresh").onclick=async()=>{await M.refresh(),M.get().err||q("Data refreshed")};const T=document.getElementById("nPanel"),L=document.getElementById("nBtn"),N=document.getElementById("pMenu"),p=document.getElementById("profileBtn"),w=()=>{T.hidden=N.hidden=!0,L.setAttribute("aria-expanded","false"),p.setAttribute("aria-expanded","false")};L.onclick=()=>{var S;const l=T.hidden;w(),T.hidden=!l,L.setAttribute("aria-expanded",String(l)),l&&b&&(c.forEach(D=>{D.readAt||(D.readAt="now")}),(S=document.querySelector(".nbadge"))==null||S.remove(),O("notifRead").catch(()=>{}))},p.onclick=()=>{const l=N.hidden;w(),N.hidden=!l,p.setAttribute("aria-expanded",String(l))},document.getElementById("btnOut").onclick=ta,document.addEventListener("click",l=>{l.target.closest(".nbell, .profile-wrap")||w()},{signal:r});const I=document.getElementById("sidebar"),j=document.getElementById("workspace"),f=document.getElementById("openNav"),h=document.getElementById("shell"),g=matchMedia("(max-width: 960px)");let y=!1;const A=(l,S=!0)=>{var D;y=g.matches&&l,h.classList.toggle("nav-open",y),I.inert=g.matches&&!y,j.inert=y,document.getElementById("navBackdrop").hidden=!y,f.setAttribute("aria-expanded",String(y)),document.body.classList.toggle("nav-locked",y),y?(D=I.querySelector("nav a"))==null||D.focus():S&&g.matches&&f.focus()};A(!1,!1),f.onclick=()=>A(!0),document.getElementById("closeNav").onclick=()=>A(!1),document.getElementById("navBackdrop").onclick=()=>A(!1),I.querySelectorAll("a").forEach(l=>l.addEventListener("click",()=>A(!1),{signal:r})),g.addEventListener("change",()=>A(!1,!1),{signal:r}),document.addEventListener("keydown",l=>{if(l.key==="Escape"&&(y?A(!1):T.hidden?N.hidden||(w(),p.focus()):(w(),L.focus())),l.key==="Tab"&&y){const S=[...I.querySelectorAll("a, button")],D=S[0],F=S[S.length-1];l.shiftKey&&document.activeElement===D?(l.preventDefault(),F.focus()):!l.shiftKey&&document.activeElement===F&&(l.preventDefault(),D.focus())}},{signal:r});const R=document.getElementById("view");if(document.querySelector(".skip-link").onclick=l=>{l.preventDefault(),R.focus()},!e.lastSync)R.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${o(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(_=document.getElementById("retryLoad"))==null||_.addEventListener("click",()=>M.refresh(),{signal:r});else{a.fn(R,e,s);const l=t+"/"+(s||"");Tt!==l&&Jt(R),Tt=l}}window.addEventListener("hashchange",()=>{Wt(),window.scrollTo({top:0,behavior:"instant"})});let At="",Pt=!1;M.subscribe(e=>{e.err&&e.err!==At&&q(e.err,!0),At=e.err;const t=!Pt&&e.lastSync;if(t&&(Pt=!0),e.lastSync&&(e.loading||e.err)||Zt().name==="new"&&!t&&e.lastSync){Yt(e);return}Wt()});aa(()=>M.refresh());Ne()||wn();
