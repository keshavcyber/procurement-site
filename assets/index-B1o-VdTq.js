(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();var Nt;const te=typeof window<"u"?(Nt=window.matchMedia)==null?void 0:Nt.call(window,"(prefers-reduced-motion: reduce)"):null,Re=new Set,sa="cubic-bezier(.2,.75,.25,1)";var Mt;(Mt=te==null?void 0:te.addEventListener)==null||Mt.call(te,"change",e=>{e.matches&&Re.forEach(t=>t.cancel())});function ge(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||te!=null&&te.matches)return;const o=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:sa,fill:"backwards"});return o.id="workspace-reveal",Re.add(o),o.finished.then(()=>Re.delete(o),()=>Re.delete(o)),o}function ra(e){if(te!=null&&te.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||ge(a,{delay:Math.min(s++*22,154),distance:10})}}const Et={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Le="oizom-id-token";let dt=null;function oa(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Be(){const e=localStorage.getItem(Le);return e?oa(e)<Date.now()+3e4?(localStorage.removeItem(Le),null):e:null}function ia(){const e=Be();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function la(){localStorage.removeItem(Le),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function da(e){if(dt=e,Be()){e();return}tt(()=>{google.accounts.id.initialize({client_id:Et.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Le,t.credential),dt()}}),google.accounts.id.prompt()})}function tt(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>tt(e,t+1),100)}function ca(e){tt(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class _e extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const xt=new Set(["list","me","usersList","health","logTail"]),ma=new Set([404,408,429,500,502,503,504]),ua=45e3;function pa(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function we(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=xt.has(e),o=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${o}). Please try syncing again.`:`Could not confirm your change (${o}). Sync and check whether it saved before submitting again.`;return new _e(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||ma.has(t)})}async function va(e,t){const s=Be();if(!s)throw new _e("SIGNED_OUT");let a;try{a=await fetch(Et.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(ua),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw we(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=pa(a);if(!a.ok)throw we(e,{status:a.status,stage:n,kind:"http"});let o;try{o=await a.json()}catch{throw we(e,{stage:n,kind:"response"})}if(!o||typeof o.ok!="boolean"||o.ok&&e==="list"&&!Array.isArray(o.prs))throw we(e,{stage:n,kind:"response"});if(!o.ok)throw new _e(o.error||"Request failed",{action:e});return o}async function z(e,t={}){for(let s=0;s<2;s++)try{return await va(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!xt.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function ha(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function ya(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function fa(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function ba(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function ct(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,o)=>Number(n.itemNo)-Number(o.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:fa(n),qty:ba(n)}})}let j={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ze=new Set;let mt=!1,pe=null,He=0;function ga(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Ve(){Ze.forEach(e=>e(j))}const M={get:()=>j,subscribe(e){return Ze.add(e),()=>Ze.delete(e)},refresh(){return pe||(j={...j,loading:!0},pe=Promise.resolve().then(async()=>{try{let e,t;do t=He,e=await z("list");while(t!==He);ga(e),j={prs:ct(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},mt=!0}catch(e){if(e.message==="SIGNED_OUT"&&mt){location.reload();return}j={...j,err:e.message,loading:!1}}}).finally(()=>{pe=null,j={...j,loading:!1},Ve()}),Ve(),pe)},async applyResult(e,{itemsChanged:t=!1}={}){He++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=j.prs.find(o=>o.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return M.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const o=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),i=ct([e.pr],o)[0];s.prs=n?j.prs.map(c=>c.id===i.id?i:c):[...j.prs,i]}a=!0}e.deleted&&(s.prs=j.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=j.me&&e.users.find(o=>o.email.toLowerCase()===j.me.email.toLowerCase());if(j.me&&(!n||!n.role))return M.refresh();n&&(s.me={...j.me,role:n.role,department:n.department}),a=!0}if(!a)return M.refresh();j={...j,...s},Ve()}},ut={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function h(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ut[e]||ut.file}</svg>`}const r=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Fe(e){return`<span class="chip ${r(e)}" data-s="${r(e)}">${r(e)}</span>`}function N(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${h(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const ee=e=>e?r(String(e).slice(0,10)):"—";function Oe(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function at(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const pt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Te=e=>pt[e]!=null?pt[e]:e+" ";function be(e,t){const s=e==="INR"?"en-IN":"en-US";return Te(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function ae(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Te(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Te(e)+(t/1e3).toFixed(1)+"K":Te(e)+Math.round(t).toLocaleString("en-US")}const Se=["Cancelled","Rejected"],$a=["Ordered","In Transit","Received"],je=e=>$a.includes(e.status)&&e.paymentStatus!=="Paid";function vt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function ht(e){const t=e.filter(n=>!Se.includes(n.status)),s=e.filter(je),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:vt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:vt(t)}}const Ne={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:je,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Se.includes(e.status)};function Sa(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function yt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function It(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function wa(e){return e.filter(je)}function ka(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function Ca(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function ft(e,t,s){const a={};for(const n of e){const o=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(o))continue;let i;if(t==="count")i=1;else{if(Se.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;i=c}a[o]=(a[o]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Ra(e,t){const s={};for(const a of e){if(Se.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const o=a.department||"Unassigned";s[o]=(s[o]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function Ta(e,t,s=6){const a={};for(const i of e){if(Se.includes(i.status)||(i.currency||"Unknown")!==t)continue;const c=Number(i.amount);if(!i.amount||!isFinite(c))continue;const b=i.vendor||"Unspecified";a[b]=(a[b]||0)+c}const n=Object.entries(a).map(([i,c])=>({vendor:i,total:c})).sort((i,c)=>c.total-i.total);if(n.length<=s)return n;const o=n.slice(s).reduce((i,c)=>i+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:o}]}function Aa(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function qa(e){const t=(o,i)=>{const c=Date.parse(o),b=Date.parse(i);return isFinite(c)&&isFinite(b)?(b-c)/864e5:null},s=o=>o.length?o.reduce((i,c)=>i+c,0)/o.length:null,a=e.map(o=>o.createdAt&&o.approvedAt?t(o.createdAt,o.approvedAt):null).filter(o=>o!=null&&o>=0),n=e.map(o=>o.poDate&&o.receivedAt?t(o.poDate,o.receivedAt):null).filter(o=>o!=null&&o>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Da=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Pa(e,t=Date.now()){const s=Da.map(a=>({...a,count:0}));return e.filter(je).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const o=(t-n)/864e5;(s.find(i=>o>=i.min&&o<=i.max)||s[s.length-1]).count++}),s}const Ye=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Bt=["Unpaid","Paid","Partially Paid","FOC / Free"],Me={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function La(e,t,s,a,n){const o=(Me[e]||{})[t];return o?o.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function Na(e,t,s,a){return Object.keys(Me[e]||{}).filter(n=>La(e,n,t,s,a))}function Ma(e,t){return!!(Me[e]&&Me[e][t])}const Ea=["Submitted","Approved","Rejected"],v={sel:"total",tab:"mine",page:1,moreFilters:!1,filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}},ve=25,xa={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let We;function Ia(e,t){v.tab=t==="admin"?"all":"dept",v.sel=["pending","unpaid"].includes(e)?e:"total",v.page=1,v.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function re(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Ft(e,t),s&&ge(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const o=e.querySelector("#"+n.id);if(o&&(o.focus(),n.start!=null&&typeof o.setSelectionRange=="function"))try{o.setSelectionRange(n.start,n.end)}catch{}}const bt=e=>String(e||"").slice(0,10);function Ba(e){const t=v.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&bt(e.createdAt)<t.from||t.to&&bt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Ft(e,t){clearTimeout(We),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          ${h("plus")} New request
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,Fa(e.querySelector("#tabBody"),e,t)}const ce=e=>e.length?e.map(([t,s])=>ae(t,s)).join(" + "):"—";function Fa(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",o=a.role==="admin",i=a.role==="finance",c=n?["mine","dept","approved"]:o?["mine","all"]:i?["mine","payments"]:["mine"];c.includes(v.tab)||(v.tab="mine");const b=v.tab==="dept",m=v.tab==="approved",g=v.tab==="all",C=v.tab==="payments",P=Sa(s.prs,a.email),V=n?yt(s.prs,a.email):[],R=n?It(s.prs,a.department):[],E=i?wa(s.prs):[],I=b?R:m?V:g?s.prs:C?E:P,u=ht(I),A=n?R.filter(Ne.pending):[],q=o?g?u:ht(s.prs):n?{pending:A.length,highPriority:A.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,$=C?[{key:"total",n:u.total,l:"Awaiting payment",s:ce(u.unpaidTotals)},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ae(...u.spendTotals[0]):"—",l:"Total value",s:u.spendTotals.length>1?"+ "+ce(u.spendTotals.slice(1)):""}]:b?[{key:"total",n:u.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:ce(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ae(...u.spendTotals[0]):"—",l:"Total spend",s:u.spendTotals.length>1?"+ "+ce(u.spendTotals.slice(1)):""}]:[{key:"total",n:u.total,l:m?"Approved PRs":g?"All PRs":"Total PRs",s:m?"across all requesters":g?"every department":""},...m?[]:[{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:ce(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?ae(...u.spendTotals[0]):"—",l:m?"Approved spend":"Total spend",s:u.spendTotals.length>1?"+ "+ce(u.spendTotals.slice(1)):""}];if(g)for(const l of ka(s.prs))$.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+Oe(l.email),s:l.email,cls:"go"});$.some(l=>l.key===v.sel)||(v.sel="total");const K=(v.sel.startsWith("ap:")?yt(s.prs,v.sel.slice(3)):I.filter(Ne[v.sel])).sort((l,k)=>(k.createdAt||"").localeCompare(l.createdAt||"")),Q=$.find(l=>l.key===v.sel),y=[...new Set(I.map(l=>l.department).filter(Boolean))].sort(),p=[...new Set(I.map(l=>l.vendor).filter(Boolean))].sort();v.filters.dept&&!y.includes(v.filters.dept)&&(v.filters.dept=""),v.filters.vendor&&!p.includes(v.filters.vendor)&&(v.filters.vendor="");const w=K.filter(Ba),D=Object.values(v.filters).some(Boolean),T=Math.max(1,Math.ceil(w.length/ve));v.page=Math.min(Math.max(1,v.page),T);const G=w.slice((v.page-1)*ve,v.page*ve),Y=["dept","vendor","from","to"].filter(l=>v.filters[l]).length,f=g?"All requests":b?"Department requests":m?"Approved by you":C?"Payment queue":"Your requests",d=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),S=l=>{const k=o?Ye:n&&l.status==="Submitted"&&d(l)?Ea:null;return k?`<select class="status-sel" data-status="${r(l.status)}" aria-label="Status for ${r(l.id)}" data-id="${r(l.id)}">${k.map(B=>`<option ${B===l.status?"selected":""}>${r(B)}</option>`).join("")}</select>`:Fe(l.status)},F=l=>`<select class="pay-sel" aria-label="Payment status for ${r(l.id)}" data-id="${r(l.id)}">${Bt.map(k=>`<option ${k===l.paymentStatus?"selected":""}>${r(k)}</option>`).join("")}</select>`;e.innerHTML=`
    ${c.length>1?`<div class="adm-tabs" aria-label="Request scope">
      <button class="adm-tab ${v.tab==="mine"?"active":""}" data-tab="mine">Your requests <span>${P.length}</span></button>
      ${n?`<button class="adm-tab ${b?"active":""}" data-tab="dept">${r(a.department||"Your department")} <span>${R.length}</span></button><button class="adm-tab ${m?"active":""}" data-tab="approved">Approved by you <span>${V.length}</span></button>`:""}
      ${o?`<button class="adm-tab ${g?"active":""}" data-tab="all">All requests <span>${s.prs.length}</span></button>`:""}
      ${i?`<button class="adm-tab ${C?"active":""}" data-tab="payments">Awaiting payment <span>${E.length}</span></button>`:""}
    </div>`:""}
    <div class="kpis dashboard-kpis" aria-label="Filter requests by summary">${$.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===v.sel?"sel":""}" data-key="${r(l.key)}" aria-pressed="${l.key===v.sel}">
        <span class="kpi-top"><span class="l">${r(l.l)}</span>${h(xa[l.key])}</span>
        <span class="v">${r(String(l.n))}</span><span class="s">${r(l.s||(l.key==="total"?f:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${q?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?r(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${q.pending?"":"disabled"}><span class="attention-icon">${h("clock")}</span><span><b>${q.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${q.pending?"Open approval queue":"No approvals waiting"}</small></span>${h("arrow")}</button>
      ${o?`<button type="button" data-queue="unpaid" ${q.unpaidCount?"":"disabled"}><span class="attention-icon">${h("wallet")}</span><span><b>${q.unpaidCount} awaiting payment</b><small>${q.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${h("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${h("info")}</span><span><b>${q.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${w.length}</span></h2><p>${r(f)} · ${v.sel==="total"?"Latest first":r(Q.l)}</p></div><span class="table-hint">Select a request to view details ${h("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${h("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${r(v.filters.q)}"></label>
        <select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Ye.map(l=>`<option value="${r(l)}" ${v.filters.status===l?"selected":""}>${r(l)}</option>`).join("")}</select>
        <button type="button" class="btn filter-toggle ${Y?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${v.moreFilters}" aria-controls="advancedFilters">${h("filter")} Filters ${Y?`<span class="count-badge">${Y}</span>`:""}</button>
        ${D?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${v.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${y.map(l=>`<option value="${r(l)}" ${v.filters.dept===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${p.map(l=>`<option value="${r(l)}" ${v.filters.vendor===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${r(v.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${r(v.filters.to)}"></label>
        ${g?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${$.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${r(l.key)}" ${v.sel===l.key?"selected":""}>${r(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${C?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${G.map(l=>`<tr class="rowlink ${C?"payment-row":""}" data-id="${r(l.id)}">
          <td class="request-id"><a href="#/pr/${r(l.id)}">${r(l.id)}</a></td>
          <td class="request-date">${ee(l.createdAt)}</td>
          ${C?`<td>${r(l.vendor)}</td><td>${r(l.poNo||"—")}</td><td>${r(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${r(l.department)}</td><td class="wrap request-item">${r(l.item)}</td><td class="request-vendor">${r(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?r(ae(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${C?F(l):S(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${h(D?"search":"file")}<b>${D?"No matching requests":"No requests here yet"}</b><span>${D?"Try a different search or clear your filters.":"Create a request to get your purchases moving."}</span>${D?'<button class="btn" id="emptyClear">Clear filters</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${w.length?(v.page-1)*ve+1:0}–${Math.min(v.page*ve,w.length)} of ${w.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${v.page===1?"disabled":""}>${h("left")}</button><span>Page ${v.page} of ${T}</span><button class="btn" id="dashNext" aria-label="Next page" ${v.page===T?"disabled":""}>${h("right")}</button></div></div>
    </section>`,e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>{v.tab=l.dataset.tab,v.sel="total",v.page=1,re(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{v.sel=l.dataset.key,v.page=1,re(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,H;if(!o&&!(n&&l.dataset.queue==="pending"))return;Ia(l.dataset.queue,a.role),re(t,s);const k=t.querySelector(".requests-card");k.focus({preventScroll:!0}),(H=k.scrollIntoView)==null||H.call(k,{block:"start",behavior:(B=window.matchMedia)!=null&&B.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=k=>{k.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{v.moreFilters=!v.moreFilters,e.querySelector("#advancedFilters").hidden=!v.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(v.moreFilters))};const O=e.querySelector("#dashApprover");O&&(O.onchange=()=>{v.sel=O.value,v.page=1,re(t,s)});const Z=l=>{var k,B;v.page+=l,re(t,s),(B=(k=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(k,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>Z(-1),e.querySelector("#dashNext").onclick=()=>Z(1);const L=(l,k)=>{v.filters[l]=k,v.page=1,re(t,s)};e.querySelector("#dashQ").oninput=l=>{v.filters.q=l.target.value,v.page=1,clearTimeout(We),We=setTimeout(()=>{t.isConnected&&re(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>L("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>L("vendor",l.target.value),e.querySelector("#dashStatus").onchange=l=>L("status",l.target.value),e.querySelector("#dashFrom").onchange=l=>L("from",l.target.value),e.querySelector("#dashTo").onchange=l=>L("to",l.target.value);const U=()=>{v.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},v.page=1,v.sel="total",re(t,s)},W=e.querySelector("#dashFilterClear"),ue=e.querySelector("#emptyClear");W&&(W.onclick=U),ue&&(ue.onclick=U),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=k=>k.stopPropagation(),l.onchange=async()=>{const k=l.dataset.id,B=s.prs.find(x=>x.id===k),H=l.value;if(!(!B||H===B.status)){if((H==="Rejected"||H==="Cancelled")&&!confirm(`Mark ${k} as ${H}?`)){l.value=B.status;return}l.disabled=!0;try{let x;a.role==="admin"&&!Ma(B.status,H)?x=await z("update",{id:k,updates:{status:H}}):x=await z("transition",{id:k,to:H}),N(`${k} → ${H}`),await M.applyResult(x)}catch(x){N(x.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=k=>k.stopPropagation(),l.onchange=async()=>{const k=l.dataset.id,B=s.prs.find(x=>x.id===k),H=l.value;if(!(!B||H===B.paymentStatus)){l.disabled=!0;try{const x=await z("update",{id:k,updates:{paymentStatus:H}});N(`${k} payment → ${H}`),await M.applyResult(x)}catch(x){N(x.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function nt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function st(e,t){const s=nt(e,t),a=s.filter(Ne.spend),n={};for(const o of a){const i=Number(o.amount);if(!o.amount||!isFinite(i))continue;const c=o.currency||"INR";n[c]=(n[c]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((o,i)=>i[1]-o[1]),unpaid:s.filter(Ne.unpaid).length,lastOrder:s.reduce((o,i)=>{const c=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>o?c:o},"")}}function Ot(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(nt(t,e.name).filter(o=>o.amount&&isFinite(Number(o.amount))).map(o=>o.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(o=>o!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Oa=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],ja={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Ua=1,Ha=.7,jt=.5,Va=.4,Ka=.3,Ga=4,za=e=>e.length>=7?2:e.length>=Ga?1:0,Ee=e=>String(e??"").toLowerCase().trim();function _a(e,t){const s=e[t];return Ee(Array.isArray(s)?s.join(" "):s)}function Ut(e){return Ee(e).split(/[\s,]+/).filter(Boolean)}function Za(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let o=1;o<=t.length;o++)n[o]=Math.min(s[o]+1,n[o-1]+1,s[o-1]+(e[a-1]===t[o-1]?0:1));s=n}return s[t.length]}function gt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Ua;if(s.some(n=>n.startsWith(t)))return Ha;if(e.includes(t))return jt;const a=za(t);return a&&s.some(n=>Za(n,t)<=a)?Ka:0}function Ya(e,t){const s=gt(e,t);if(s)return s;const a=ja[t];return a&&a.some(o=>o.includes(" ")?e.includes(o):gt(e,o)>=jt)?Va:0}function Wa(e,t){const s=Array.isArray(t)?t:Ut(t);if(!s.length)return 0;let a=0;for(const n of s){let o=0;for(const{key:i,weight:c}of Oa)o=Math.max(o,Ya(_a(e,i),n)*c);if(!o)return 0;a+=o}return a}function Ht(e,t){const s=Ut(t);return s.length?(e||[]).map(a=>({v:a,score:Wa(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Ee(a.v.displayName||a.v.name).localeCompare(Ee(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Ue(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${h("search")}
        <input aria-label="${r(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${r(t)}" value="${r(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${h("close")}
        </button>
      </div>
    </div>`}const rt=(...e)=>r(e.filter(Boolean).join(" ").toLowerCase());function ot(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${r(t)}</td></tr>`}function it(e,{get:t,set:s,count:a,id:n="admSearch",match:o=null}){const i=e.querySelector("#"+n);if(!i)return;const c=i.closest(".adm-card"),b=c.querySelector(".admSearchClear"),m=()=>Qa(c,t(),a,o);i.oninput=()=>{s(i.value),b.hidden=!i.value,m()},i.onkeydown=g=>{g.key==="Escape"&&i.value&&(i.value="",i.oninput())},b.onclick=()=>{i.value="",i.oninput(),i.focus()},m()}function Qa(e,t,s,a){const n=t.trim().toLowerCase(),o=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let c=null;o.forEach(g=>{g.hidden=n?i?!i.has(g.dataset.name):!g.dataset.search.includes(n):!1,g.classList.remove("last-visible"),g.hidden||(c=g)}),c&&c.classList.add("last-visible");const b=e.querySelector(".adm-nomatch");b&&(b.hidden=!!c||!o.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(o.filter(g=>!g.hidden).length,o.length))}let he="";const Vt={Domestic:"dom",Foreign:"for",Mixed:"mix"},Ja=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Kt(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${r(Ja(e.displayName||e.name))}${t?`<img src="${r(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Xa(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${r(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function en(e,t){const s=st(e.prs,t.name),a=Ot(t,e.prs),n=s.spendTotals.length?ae(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${r(t.name)}">
      <div class="vc-top">
        ${Kt(t)}
        <div class="vc-title">
          <b>${r(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${r(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Vt[a]}">${r(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${r(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${ee(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Xa(t)}</div>
    </a>`}const tn=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function $t(e,t){const s=tn(e.vendors),a=t.trim()?Ht(s,t):s;return a.length?a.map(n=>en(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${r(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function an(e,t,s){if(s)return nn(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Ue(he,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${$t(t,he)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),o=e.querySelector(".admSearchClear"),i=()=>{he=n.value,o.hidden=!he,a.innerHTML=$t(t,he)};n.oninput=i,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",i())},o.onclick=()=>{n.value="",i(),n.focus()}}function nn(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${r(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=st(t.prs,a.name),o=Ot(a,t.prs),i=t.me&&t.me.role==="admin",c=nt(t.prs,a.name).sort((m,g)=>(g.createdAt||"").localeCompare(m.createdAt||"")),b=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Kt(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${r(a.displayName||a.name)}
              ${o?`<span class="vc-badge ${Vt[o]}">${r(o.toUpperCase())}</span>`:""}
            </h1>
            <p>${r(a.category||"Vendor")}</p>
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
        <div class="kpi"><div class="v">${n.spendTotals.length?r(ae(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?r(n.spendTotals.slice(1).map(([m,g])=>ae(m,g)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${ee(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${b.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${b.map(([m,g])=>`<div><span class="vc-l">${r(m)}</span><b>${r(g)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(m=>`<span class="vc-chip">${r(m)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${c.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${c.map(m=>`<tr class="rowlink" data-id="${r(m.id)}">
            <td style="font-family:var(--mono);font-size:12px">${r(m.id)}</td>
            <td>${ee(m.createdAt)}</td><td>${r(m.department)}</td>
            <td class="wrap">${r(m.item)}</td>
            <td>${m.amount?r(ae(m.currency||"INR",Number(m.amount))):"—"}</td>
            <td>${Fe(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const Qe=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Gt=new Map(Qe.map(e=>[e.code,e])),sn=e=>Gt.has(String(e||"").trim().toUpperCase());function Je(e){const t=Gt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function rn(e){const t=String(e||"").trim().toLowerCase(),s=t?Qe.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...Qe],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,o)=>a(n)-a(o)||n.code.localeCompare(o.code))}function ke(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const o=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${r(c)}">
      <span class="barlabel">${r(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${o.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${r(t(n.value))}</span>
    </div>`}).join("")}</div>`}function St(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},o=s-n.l-n.r,i=a-n.t-n.b,c=Math.max(...e.map(u=>u.value),1),b=o/(e.length-1),m=u=>n.l+u*b,g=u=>n.t+i-u/c*i,C=e.map((u,A)=>`${A===0?"M":"L"}${m(A).toFixed(1)} ${g(u.value).toFixed(1)}`).join(" "),P=`${C} L${m(e.length-1).toFixed(1)} ${n.t+i} L${m(0).toFixed(1)} ${n.t+i} Z`,V=[0,.5,1].map(u=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-u)).toFixed(1)}" y2="${(n.t+i*(1-u)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),R=Math.ceil(e.length/6)||1,E=e.map((u,A)=>A%R===0||A===e.length-1?`<text x="${m(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${r(u.month.slice(2))}</text>`:"").join(""),I=e.map((u,A)=>`<circle cx="${m(A).toFixed(1)}" cy="${g(u.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${r(u.month)}: ${r(t(u.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${V}
    <path d="${P}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${C}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${I}
    ${E}
  </svg>`}const on=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],ln={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},dn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Ce={currency:""};function zt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?It(t.prs,s.department):t.prs||[],o=Ca(n);o.includes(Ce.currency)||(Ce.currency=o[0]||"");const i=Ce.currency,c=$=>i?ae(i,$):String($),b=i?ft(n,"spend",i):[],m=ft(n,"count"),g=i?Ta(n,i,6).map($=>({label:$.vendor,value:$.total})):[],C=!a&&i?Ra(n,i).map($=>({label:$.department,value:$.total})):[],P=Aa(n),V=on.filter($=>P[$]).map($=>({label:$,value:P[$]})),R=qa(n),E=Pa(n),I=E.map($=>({label:$.label,value:$.count})),u=E.reduce(($,K)=>$+K.count,0),A=b.reduce(($,K)=>$+K.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${r(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${o.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${h("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${o.map($=>`<option value="${r($)}" ${$===i?"selected":""}>${r(Je($))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?r(c(A)):"—"}</div><div class="l">Total spend${i?" · "+r(i):""}</div></div>
        <div class="kpi"><div class="v">${R.avgApprovalDays!=null?R.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${R.avgDeliveryDays!=null?R.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${u?"warn":""}"><div class="v">${u}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+r(i):""}</p></div>
          </div>
          <div class="spend-chart">${b.length?St(b,{valueFmt:$=>ae(i,$),height:180}):`<div class="trend-empty">${h("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${C.length?`<div class="card"><h2>Spend by department${i?" · "+r(i):""}</h2>
          <div class="pd-body">${ke(C,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+r(i):""}</h2>
          <div class="pd-body">${ke(g,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${ke(V,{colorOf:$=>ln[$.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${ke(I,{colorOf:$=>dn[$.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${St(m,{valueFmt:$=>$+" PR"+($===1?"":"s")})}</div>
      </div>
    </div>`;const q=e.querySelector("#insCur");q&&(q.onchange=()=>{var $;Ce.currency=q.value,zt(e,t),($=e.querySelector("#insCur"))==null||$.focus()})}const _t={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Zt(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function cn(e){const t=String(e.trackingNo||"").trim(),s=Zt(e.trackingLink)||(t?(_t[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[r(e.courier||""),s?`<a href="${r(s)}" target="_blank" rel="noopener noreferrer">${r(t||"Track shipment")} ↗</a>`:r(t)].filter(Boolean).join(" ")}function Yt(e,t=[]){const s=[...new Set([...t,...Object.keys(_t),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${r(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${r(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${r(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${r(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function Wt(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Zt(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const mn=Bt,un={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ae=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:un[t])||[],Ke={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},oe=(e,t,s)=>`<span class="lblrow">${r(e)}${Ke[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${r(Ke[t])}" data-tip="${r(Ke[t])}">?</span>`:""}</span>`;function le(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${r(n)}" ${n===t?"selected":""}>${n?r(n):"Select…"}</option>`).join("")}function wt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${r(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${r(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${r(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${r(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${le(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${r(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${le(Ae(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${r(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${r(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${r(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${h("close")}</button>
  </div>`}function kt(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function pn(e,t,s){const a=s?t.prs.find(y=>y.id===s):null,n=a||{},o=a?n.items||[]:[{}],i=t.me||{role:""},c=["approver","admin","finance"].includes(i.role),b=a?n.department||"":i.department||"",m=(t.projects||[]).filter(y=>y.department.toLowerCase()===b.toLowerCase()).map(y=>y.project),g=(t.vendors||[]).filter(y=>(y.departments||[]).some(p=>p.toLowerCase()===b.toLowerCase())),C=y=>{const p=g.find(w=>w.name.toLowerCase()===String(y||"").toLowerCase());return p?p.displayName||p.name:String(y||"")},P=(t.materialTypes||[]).filter(y=>y.department.toLowerCase()===b.toLowerCase()).map(y=>y.materialType),V=b.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${r(n.id)}" style="font-family:var(--mono)">${r(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?r(n.id):"New Purchase Request"}</h1>
          ${a?Fe(n.status):""}
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn" href="${a?"#/pr/"+r(n.id):"#/"}">Cancel</a>
          <button class="btn primary pr-save" type="submit" form="prForm" id="prSave">${a?"Save changes":"Submit PR"}</button>
        </div>
      </div>
      <form id="prForm">
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${oe("Project*","project")} <select name="project" required>${le(m,n.project||"",!0)}</select></label>
              <label>${oe("Purpose","purpose")} <input name="purpose" value="${r(n.purpose)}"></label>
              <div class="pd-field full">${oe("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${r(C(n.vendor))}">
                <input type="hidden" name="vendor" value="${r(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${oe("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${r(Je(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${r(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${oe("Priority","priority",!0)} <select name="priority">${le(Ae(t,"priorities"),n.priority||"Medium")}</select></label>
              <label>${oe("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r((n.expectedDate||"").slice(0,10))}"></label>
              ${c?`
              <label>${oe("Payment status*","payment")} <select name="paymentStatus" required>${le(mn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${le(Ye,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${r(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${oe("Notes","notes")} <textarea name="notes" rows="3">${r(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&i.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${r(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${r((n.poDate||"").slice(0,10))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${r(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${r((n.invoiceDate||"").slice(0,10))}"></label>
              <label>Payment term <select name="paymentTerm">${le(Ae(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${r(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&i.role==="admin"?`<div class="card"><h2>Delivery tracking</h2><div class="pd-body pd-form"><div class="pd-grid">${Yt(n,Ae(t,"couriers"))}</div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${o.map((y,p)=>wt(t,y,p,P,V)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${h("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${h("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const R=e.querySelector("#prForm"),E=e.querySelector("#itemRows"),I=()=>{const y=kt(R).map(D=>{const T=ha(D.qty,D.unitPrice);return{lineTotal:T!==""?T:D.lineTotal}}),p=ya(y),w=R.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=p===""?"":"Total: "+be(w,p)},u=y=>{y.querySelector(".rmItem").onclick=()=>{E.children.length>1&&(y.remove(),I())},y.querySelectorAll("input, select").forEach(p=>p.oninput=I)};[...E.children].forEach(u),I();const A=(y,p,w,{search:D,resolve:T,toLabel:G,allowEmpty:Y,onCommit:f})=>{const d=e.querySelector("#"+y),S=e.querySelector("#"+p),F=R.querySelector(`[name="${w}"]`),O=()=>{f&&f()},Z=L=>{const U=D(L).slice(0,30);S.innerHTML=U.map(W=>`<div class="curOpt" data-v="${r(W.value)}"><b>${r(W.main)}</b> ${r(W.name||"")}<span>${r(W.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',S.hidden=!1};d.onfocus=()=>{d.select(),Z("")},d.oninput=()=>Z(d.value),S.onmousedown=L=>{L.preventDefault();const U=L.target.closest(".curOpt");U&&(F.value=U.dataset.v,d.value=G(U.dataset.v),S.hidden=!0,O())},d.onblur=()=>setTimeout(()=>{S.hidden=!0;const L=d.value.trim();if(!L&&Y)F.value="";else{const U=T(L);U!=null&&(F.value=U)}d.value=G(F.value),O()},120)};A("curSearch","curList","currency",{search:y=>rn(y).map(p=>({value:p.code,main:p.code,name:p.name,sub:p.sym||""})),resolve:y=>{const p=y.split("—")[0].trim().toUpperCase();return sn(p)?p:null},toLabel:y=>Je(y),onCommit:I});const q=y=>{const p=String(y||"").trim().toLowerCase();return g.filter(w=>!p||w.name.toLowerCase().includes(p)||(w.displayName||"").toLowerCase().includes(p)||(w.category||"").toLowerCase().includes(p)).sort((w,D)=>(w.displayName||w.name).localeCompare(D.displayName||D.name)).map(w=>({value:w.name,main:w.displayName||w.name,name:w.displayName?w.name:"",sub:w.category||""}))},$=e.querySelector("#venHint"),K=()=>{const y=R.querySelector('[name="vendor"]').value.trim();$.hidden=!y||g.some(p=>p.name.toLowerCase()===y.toLowerCase())};A("venSearch","venList","vendor",{search:q,resolve:y=>{const p=g.find(w=>w.name.toLowerCase()===y.toLowerCase()||(w.displayName||"").toLowerCase()===y.toLowerCase());return p?p.name:y},toLabel:y=>C(y),allowEmpty:!0,onCommit:K}),K(),e.querySelector("#addItem").onclick=()=>{E.insertAdjacentHTML("beforeend",wt(t,{},E.children.length,P,V)),u(E.lastElementChild),ge(E.lastElementChild)};const Q=R.elements.namedItem("trackingLink");Q&&(Q.oninput=()=>Q.setCustomValidity("")),R.onsubmit=async y=>{y.preventDefault();const p=e.querySelector("#prSave");if(p.disabled||!Wt(Q))return;e.querySelectorAll(".pr-save").forEach(T=>{T.disabled=!0,T.innerHTML=h("refresh","spin")+" Saving…"}),p.disabled=!0,p.textContent="Saving…";const w={};for(const[T,G]of new FormData(y.target))T.startsWith("i_")||(w[T]=G);const D=kt(R);try{if(!D.length)throw new Error("Add at least one item with a description");if(a){const T=await z("update",{id:n.id,updates:w,items:D});await M.applyResult(T,{itemsChanged:!0}),N("PR updated"),location.hash="#/pr/"+n.id}else{const T=await z("create",{pr:w,items:D});await M.applyResult(T,{itemsChanged:!0}),N("Created "+T.pr.id),location.hash="#/pr/"+T.pr.id}}catch(T){N(T.message,!0),p.disabled=!1,p.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(G=>{G.disabled=!1,G.textContent=a?"Save changes":"Submit request"})}}}function Ct(e,t,s,a){const n=String(e||"").trim();if(n)return n;const o=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return o&&i&&o===i&&c?c:Oe(t)}const _=(e,t)=>`<div class="pd-f"><span class="vc-l">${r(e)}</span><b>${t||"—"}</b></div>`;let ye=!1,Rt=null;const Tt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${r(at(s||t))}</span>
    <div>
      <span class="vc-l">${r(e)}</span>
      <b>${r(t)}</b>
      <div class="pd-sub">${r(a||"")}</div>
    </div>
  </div>`;function qe(e,t,s){const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${r(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Rt!==s&&(ye=!1,Rt=s);const n=t.me||{role:"",email:"",department:""},o=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["approver","admin","finance"].includes(n.role),b=o||i&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),g=Na(a.status,n.role,i,m),C=(a.department||"").toLowerCase()==="production",P=o&&a.status==="Approved",V=o&&a.poNo&&!a.zohoPoId,R=P?"":g.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),E=g.filter(d=>d!==R),I=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),u=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",A=["Submitted","Approved","Ordered","In Transit","Received"],q=A.indexOf(a.status),$=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),K=a.paymentTerm||$&&$.paymentTerms||"",Q=t.lists&&t.lists.paymentTerms||[],y=["",...K&&!Q.includes(K)?[K,...Q]:Q].map(d=>`<option value="${r(d)}" ${d===K?"selected":""}>${d?r(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${h("right")}<span>${r(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${r(a.id)}</h1>${Fe(a.status)}</div>
          <p class="request-subtitle">${r(a.project||a.department||"Purchase request")} · Created ${ee(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="makePoBtn">${h("file")} Create purchase order</button>`:""}
          ${R?`<button class="btn primary" data-to="${r(R)}">${h(u(R))}${r(I(R))}</button>`:""}
          ${b?`<a class="btn" href="#/new/${r(a.id)}">${h("edit")} Edit</a>`:""}
          ${E.length||V?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${h("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${V?`<button class="btn" id="zohoPushBtn">${h("arrow")} Send to Zoho Books</button>`:""}
              ${E.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${r(d)}">${h(u(d))}${r(I(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${r(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${q===-1?"Currently "+r(a.status.toLowerCase()):q===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${A.map((d,S)=>`<li class="${S<q?"done":S===q?"current":""}" ${S===q?'aria-current="step"':""}><span class="step-dot">${S<q?h("check"):S+1}</span><span>${r(d)}</span></li>`).join("")}</ol>
      </section>

      ${P&&ye?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${r(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${r(a.poDate||new Date().toISOString().slice(0,10))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${y}</select>
          </label>
          ${$&&$.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${r($.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${_("Department",r(a.department))}
          ${_("Project",r(a.project))}
          ${_("Vendor",r(a.vendor))}
          ${_("Purpose",r(a.purpose))}
          ${_("Priority",r(a.priority))}
          ${_("Payment status",r(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${Tt("Requested by",Ct(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+ee(a.createdAt))}
          ${a.approverEmail||a.approvedByName?Tt("Approved by",Ct(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+ee(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${C?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(d=>`<tr>
            <td>${r(d.itemNo)}</td>
            <td class="wrap">${r(d.description)}</td>${C?`<td>${r(d.partNo)}</td>`:""}<td>${r(d.materialType)}</td>
            <td>${r([d.qty,d.unit].filter(Boolean).join(" "))}</td>
            <td>${d.unitPrice?r(be(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?r(be(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${r(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${r(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${C?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?r(be(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <div class="section-heading"><h2>Delivery</h2>${o?`<button type="button" class="btn" id="editDelivery" aria-expanded="false">${h("edit")} Edit delivery</button>`:""}</div>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${_("Expected",ee(a.expectedDate))}
          ${_("Received",ee(a.receivedAt))}
          ${_("Tracking",cn(a))}
          ${_("Notes",r(a.notes))}
        </div>
        </div>
      </div>

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${_("PO reference",[r(a.poNo),ee(a.poDate)].filter(Boolean).join(" · "))}
          ${_("Invoice / order #",[r(a.invoiceNo),ee(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${_("Payment term",r(a.paymentTerm))}
          ${_("Quotation / PI",a.quotationDoc?`<a href="${r(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${_("Zoho Books PO",a.zohoPoNumber?r(a.zohoPoNumber):"")}
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
    </div>`;const p=e.querySelector("#requestMore");e.onclick=d=>{p&&!p.contains(d.target)&&(p.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(p!=null&&p.open)&&(p.open=!1,p.querySelector("summary").focus())},p==null||p.addEventListener("focusout",d=>{p.contains(d.relatedTarget)||(p.open=!1)});const w=e.querySelector("#editDelivery");w&&(w.onclick=()=>{var Z;if(e.querySelector("#deliveryForm"))return;const d=Object.fromEntries(["courier","trackingNo","trackingLink","expectedDate","notes"].map(L=>[L,String(a[L]||"")]));d.expectedDate=d.expectedDate.slice(0,10),w.hidden=!0,w.setAttribute("aria-expanded","true"),e.querySelector("#deliveryRead").hidden=!0,e.querySelector("#deliveryBody").insertAdjacentHTML("beforeend",`
      <form class="delivery-form" id="deliveryForm" data-pr-id="${r(a.id)}" aria-label="Edit delivery">
        <fieldset><div class="pd-grid">
          ${Yt(d,((Z=t.lists)==null?void 0:Z.couriers)||[])}
          <label class="full">Expected delivery<input name="expectedDate" type="date" value="${r(d.expectedDate)}"></label>
          <label class="full">Notes<textarea name="notes" rows="3">${r(d.notes)}</textarea></label>
        </div>
        <p class="delivery-error" role="alert" hidden></p>
        <div class="delivery-actions"><button class="btn primary" type="submit">Save delivery</button><button class="btn" type="button" id="cancelDelivery">Cancel</button></div></fieldset>
      </form>`);const S=e.querySelector("#deliveryForm"),F=S.elements.namedItem("trackingLink");F.oninput=()=>F.setCustomValidity("");const O=()=>{var U;if(!S.isConnected)return;const L=M.get();qe(e,L.prs.some(W=>W.id===s)?L:t,s),(U=e.querySelector("#editDelivery"))==null||U.focus({preventScroll:!0})};S.querySelector("#cancelDelivery").onclick=O,S.onsubmit=async L=>{var B,H;L.preventDefault();const U=S.querySelector("fieldset");if(U.disabled||!Wt(F)||!S.reportValidity())return;const W=Object.fromEntries(new FormData(S));for(const x of["courier","trackingNo","trackingLink"])W[x]=W[x].trim();const ue=Object.fromEntries(Object.entries(W).filter(([x,na])=>na!==d[x]));if(!Object.keys(ue).length){O();return}const l=S.querySelector('[type="submit"]'),k=S.querySelector(".delivery-error");U.disabled=!0,S.setAttribute("aria-busy","true"),k.hidden=!0,l.innerHTML=h("refresh","spin")+" Saving...";try{const x=await z("update",{id:a.id,updates:ue});S.dataset.committing="true",await M.applyResult(x),O(),((B=document.querySelector(".request-title h1"))==null?void 0:B.textContent)===s&&((H=document.querySelector("#editDelivery"))==null||H.focus({preventScroll:!0})),N("Delivery updated")}catch(x){delete S.dataset.committing,U.disabled=!1,S.removeAttribute("aria-busy"),l.textContent="Save delivery",k.textContent=x.message,k.hidden=!1}},ge(S,{distance:4,duration:180}),F.focus()}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const S=d.dataset.to;if((S==="Rejected"||S==="Cancelled")&&!confirm(`Mark ${a.id} as ${S}?`))return;const F=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(O=>{O.disabled=!0}),d.innerHTML=h("refresh","spin")+" Updating…";try{const O=await z("transition",{id:a.id,to:S});N(a.id+" → "+S),await M.applyResult(O)}catch(O){N(O.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(Z=>{Z.disabled=!1}),d.innerHTML=F}});const D=e.querySelector("#makePoBtn");D&&(D.onclick=()=>{var d,S;ye=!0,qe(e,t,s),ge((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),(S=e.querySelector("[name=poNo]"))==null||S.focus()});const T=e.querySelector("#poCancelBtn");T&&(T.onclick=()=>{ye=!1,qe(e,t,s)});const G=e.querySelector("#poForm");G&&(G.onsubmit=async d=>{d.preventDefault();const S=new FormData(G),F=String(S.get("poNo")||"").trim();if(!F)return;const O=G.querySelector('button[type="submit"]');O.disabled=!0;let Z;try{Z=await z("update",{id:a.id,updates:{poNo:F,poDate:S.get("poDate")||"",paymentTerm:S.get("paymentTerm")||""}});const L=await z("transition",{id:a.id,to:"Ordered"});N(a.id+" → Ordered (PO "+F+")"),ye=!1,await M.applyResult(L)}catch(L){Z&&await M.applyResult(Z),N(L.message,!0),O.disabled=!1}});const Y=e.querySelector("#zohoPushBtn");Y&&(Y.onclick=async()=>{Y.disabled=!0;try{const{pr:d}=await z("zohoPushPo",{id:a.id});N(a.id+" → Zoho Books PO "+d.zohoPoNumber),await M.applyResult({pr:d})}catch(d){N(d.message,!0),Y.disabled=!1}});const f=e.querySelector("#devDelete");f&&(f.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){f.disabled=!0;try{const d=await z("delete",{id:a.id});N(a.id+" deleted"),location.hash="#/",await M.applyResult(d)}catch(d){N(d.message,!0),f.disabled=!1}}})}let De=null,se=null,Xe="";const vn=["Domestic","International"];function lt(e){return De===null&&(De=e.vendors||[]),De}function hn(e){const t=e.lists&&e.lists.departments||[],s=lt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const X=(e,t,s,a="")=>`<label class="adm-field">${r(e)}
    <input class="adm-input" name="${t}" value="${r(s||"")}" placeholder="${r(a)}">
  </label>`;function yn(e,t){const s=lt(e),a=se&&s.find(o=>o.name.toLowerCase()===se.toLowerCase());if(a)return fn(e,a);const n=[...s].sort((o,i)=>o.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${Ue(Xe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
          ${n.map(o=>`<tr class="vRow" data-name="${r(o.name)}"
            data-search="${rt(o.name,o.displayName,o.category,o.type,(o.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${r(o.name)}</td>
            <td>${(o.departments||[]).map(i=>`<span class="adm-chip on">${r(i)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${r(o.type||"—")}</td>
            <td>${r(o.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${r(o.name)}" title="Remove vendor">
                ${h("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${ot(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Qt(n.length,n.length)}</span></div>
    </div>`}const Qt=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function fn(e,t){const s=st(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],o=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${r(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?r(i):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${r(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${r(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${h("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${r(be("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${hn(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(b=>b.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${r(i)}">${r(i)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${r(t.name)}">
        </label>
        <div class="adm-grid2">
          ${X("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${X("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${X("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...vn].map(i=>`<option value="${r(i)}" ${i===(t.type||"")?"selected":""}>${i?r(i):"—"}</option>`).join("")}
            </select>
          </label>
          ${X("Contact person","contactPerson",t.contactPerson)}
          ${X("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${r(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${r(t.address||"")}"></label>
        <div class="adm-grid2">
          ${X("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${X("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${r(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${X("Account number","accountNumber",t.accountNumber)}
          ${X("IFSC","ifsc",t.ifsc)}
        </div>
        ${X("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${o}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${X("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function bn(e,t,s){const a=async(m,g,C)=>{try{const P=await z(m,g);De=P.vendors,await M.applyResult(P),N(C),e.isConnected&&s()}catch(P){N(P.message,!0)}};it(e,{get:()=>Xe,set:m=>{Xe=m},count:Qt,match:m=>new Set(Ht(lt(t),m).map(g=>g.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=g=>{g.target.closest(".vRm")||(se=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){N("Vendor name required",!0);return}se=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const o=()=>{se=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=o);const c=e.querySelector("#vCancel");c&&(c.onclick=o),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const b=e.querySelector("#vForm");b&&(b.onsubmit=m=>{m.preventDefault();const g={};for(const[P,V]of new FormData(b))g[P]=V.trim();g.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(P=>P.dataset.dept);const C=g.name||se;a("vendorSet",{name:se,updates:g},`${C} saved`),se=C})}function gn(){se=null}const fe=["admin","approver","finance","requester"],$n={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},At=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let J="users",me=null,et="",$e=null,xe=null,ne=!1;const qt={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>$e,set:e=>{$e=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>xe,set:e=>{xe=e},seed:e=>e.materialTypes}};function Sn(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%At.length;return At[t]}const Ge=e=>e[0].toUpperCase()+e.slice(1),wn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${h("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${h("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${h("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${h("vendors")} Add Vendor`}};function de(e,t){if(me===null){e.innerHTML='<div class="card">Loading users…</div>',z("usersList").then(a=>{me=a.users,de(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${r(a.message)}</div>`});return}$e===null&&($e=t.projects||[]),xe===null&&(xe=t.materialTypes||[]);const s=wn[J];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${s.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${J==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${J==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${J==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${J==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${J==="users"?kn(t):J==="vendors"?yn(t,ne):Rn(t,qt[J])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{J=a.dataset.tab,ne=!1,gn(),de(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ne=!ne,de(e,t),ne){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},J==="users"?Cn(e,t):J==="vendors"?bn(e,t,()=>{ne=!1,de(e,t)}):Tn(e,t,qt[J])}function kn(e){const t=a=>(fe.includes(a.role)?fe:[a.role,...fe]).map(n=>`<option value="${r(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?r(Ge(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Pe(e).includes(a)?[a,...Pe(e)]:Pe(e)].map(n=>`<option value="${r(n)}" ${n===(a||"")?"selected":""}>${n?r(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${h("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Ue(et,"Search by name or email…")}
      ${ne?`
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
          ${[...me].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Oe(a.email);return`<tr data-search="${rt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Sn(a.email)}">${r(at(a.email))}${a.picture?`<img src="${r(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
                <div>
                  <div class="adm-name">${r(n)}</div>
                  <div class="adm-email">${r(a.email)}</div>
                </div>
              </div>
            </td>
            <td><div style="max-width:200px"><select data-email="${r(a.email)}" class="roleSel adm-select">${t(a)}</select></div></td>
            <td><div style="max-width:200px"><select data-email="${r(a.email)}" class="deptSel adm-select">${s(a.department)}</select></div></td>
            <td>${a.role?'<span class="adm-pill">Active</span>':'<span class="adm-pill pend" title="Signed in themselves — assign a role and department to approve">Pending</span>'}</td>
            <td style="text-align:right">
              <button class="adm-del rmBtn" data-email="${r(a.email)}" title="Remove user">
                ${h("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${ot(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${me.length} of ${me.length} active members</span>
        <div class="adm-pager">
          <button disabled>${h("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${h("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${fe.map(a=>`<div class="adm-rolecard">
        <h4>${Ge(a)}</h4>
        <p>${$n[a]}</p>
      </div>`).join("")}
    </div>`}function Cn(e,t){it(e,{get:()=>et,set:n=>{et=n},count:(n,o)=>`Showing ${n} of ${o} active members`});const s=async(n,o,i)=>{try{const c=await z("userSet",{email:n,...o});me=c.users,ne=!1,await M.applyResult(c),N(i),e.isConnected&&de(e,t)}catch(c){N(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),o=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:o,department:i},`${n} → ${o}`)})}function Pe(e){const t=e.lists&&e.lists.departments||[],s=($e||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Rn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Ue(t.q,`Search ${t.plural} by name or department…`)}
      ${ne?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Pe(e).map(a=>`<option value="${r(a)}">${r(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
        </select>
        <input id="mpName" placeholder="${r(t.label)} name" class="adm-input">
        <button class="adm-addbtn" id="mpAdd">Add ${r(t.label)}</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>Department</th><th>${r(t.label)}</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${s.map(a=>`<tr data-search="${rt(a.department,a[t.key])}">
            <td class="adm-name">${r(a.department)}</td>
            <td>${r(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${r(a.department)}" data-val="${r(a[t.key])}" title="Remove">
                ${h("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${ot(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Jt(s.length,s.length,t)}</span>
      </div>
    </div>`}const Jt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function Tn(e,t,s){it(e,{get:()=>s.q,set:o=>{s.q=o},count:(o,i)=>Jt(o,i,s)});const a=async(o,i,c)=>{try{const b=await z(o,i);s.set(b[s.respKey]),ne=!1,await M.applyResult(b),N(c),e.isConnected&&de(e,t)}catch(b){N(b.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const o=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:o,[s.key]:i},`${o} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(o=>o.onclick=()=>{const{dept:i,val:c}=o.dataset;confirm(`Remove "${c}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:c},`${c} removed`)})}const Ie={requester:0,approver:1,finance:1,admin:2};function An(e,t){if(!t||!e||!e.minRole)return!0;const s=Ie[t.role];return s!=null&&s>=Ie[e.minRole]}const Xt=document.getElementById("app"),ze={"":{fn:Ft,nav:"Dashboard",icon:"grid"},vendors:{fn:an,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:zt,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn:pn,minRole:"requester"},pr:{fn:qe},admin:{fn:de,nav:"Admin",icon:"settings",minRole:"admin"}};let ie,Dt=null;function ea(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function qn(){ie==null||ie.abort(),Xt.innerHTML=`<div class="auth-gate">
    <section class="auth-story">
      <img src="oizom-logo.png" alt="OIZOM" class="auth-logo">
      <span class="eyebrow">THE PROCUREMENT WORKSPACE</span>
      <h1>Every purchase.<br><em>One clear path.</em></h1>
      <p>From the first request to the final delivery.<br>A shared space to keep work moving.</p>
      <div class="auth-flow"><span>${h("file")} Request</span>${h("arrow")}<span>${h("check")} Approve</span>${h("arrow")}<span>${h("package")} Receive</span></div>
      <div class="auth-footer">Oizom · Redefining resources</div>
    </section>
    <section class="auth-box">
      <span class="auth-mark">${h("package")}</span>
      <span class="eyebrow">OIZOM PROCUREMENT</span>
      <h2>Welcome back.</h2>
      <p>Sign in with your Oizom account<br>to open your workspace.</p>
      <div id="gsignin"></div>
      <div class="auth-note">${h("shield")} For your @oizom.com work account</div>
    </section>
  </div>`,ca(document.getElementById("gsignin"))}function ta(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=h("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function aa(){var T,G,Y;const e=M.get(),{name:t,param:s}=ea(),a=ze[t]||ze[""],n=((T=e.me)==null?void 0:T.role)||"";if(e.me&&!An(a,e.me)){location.hash="#/";return}ie==null||ie.abort(),ie=new AbortController;const o=ie.signal,i=Object.entries(ze).filter(([,f])=>f.nav&&(!f.minRole||Ie[n]>=Ie[f.minRole])).map(([f,d])=>`<a href="#/${f}" ${t===f?'aria-current="page"':""} class="${t===f?"active":""}">${h(d.icon)}<span>${d.nav}</span>${t===f?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],b=c.filter(f=>!f.readAt).length,m=ia()||{},g=m.email||((G=e.me)==null?void 0:G.email)||"",C=m.name||Oe(g),P=m.picture?`<img class="avatar" src="${r(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${r(at(C))}</span>`,V=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=V+" · Oizom Procurement",Xt.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${h("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${i}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${h("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${h("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${h("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${h("right")} <b>${r(V)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${h("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${b?", "+b+" unread":""}" aria-expanded="false" aria-controls="nPanel">${h("bell")}${b?`<span class="nbadge">${b>9?"9+":b}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${b?b+" new":"All caught up"}</span></div>
              ${c.length?c.map(f=>`<${f.prId?"a":"div"} class="nitem ${f.readAt?"":"unread"}" ${f.prId?`href="#/pr/${r(f.prId)}"`:""}><div class="nmsg">${r(f.message)}</div><div class="ntime">${r(String(f.ts).slice(0,16).replace("T"," "))}</div></${f.prId?"a":"div"}>`).join(""):`<div class="nempty">${h("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${P}<span class="profile-copy"><span class="pname">${r(C)}</span><span class="prole">${r(n||"Oizom team")}</span></span>${h("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${r(g)}</div><button class="btn" id="btnOut">${h("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,ta(e),document.getElementById("btnRefresh").onclick=async()=>{await M.refresh(),M.get().err||N("Data refreshed")};const R=document.getElementById("nPanel"),E=document.getElementById("nBtn"),I=document.getElementById("pMenu"),u=document.getElementById("profileBtn"),A=()=>{R.hidden=I.hidden=!0,E.setAttribute("aria-expanded","false"),u.setAttribute("aria-expanded","false")};E.onclick=()=>{var d;const f=R.hidden;A(),R.hidden=!f,E.setAttribute("aria-expanded",String(f)),f&&b&&(c.forEach(S=>{S.readAt||(S.readAt="now")}),(d=document.querySelector(".nbadge"))==null||d.remove(),z("notifRead").catch(()=>{}))},u.onclick=()=>{const f=I.hidden;A(),I.hidden=!f,u.setAttribute("aria-expanded",String(f))},document.getElementById("btnOut").onclick=la,document.addEventListener("click",f=>{f.target.closest(".nbell, .profile-wrap")||A()},{signal:o});const q=document.getElementById("sidebar"),$=document.getElementById("workspace"),K=document.getElementById("openNav"),Q=document.getElementById("shell"),y=matchMedia("(max-width: 960px)");let p=!1;const w=(f,d=!0)=>{var S;p=y.matches&&f,Q.classList.toggle("nav-open",p),q.inert=y.matches&&!p,$.inert=p,document.getElementById("navBackdrop").hidden=!p,K.setAttribute("aria-expanded",String(p)),document.body.classList.toggle("nav-locked",p),p?(S=q.querySelector("nav a"))==null||S.focus():d&&y.matches&&K.focus()};w(!1,!1),K.onclick=()=>w(!0),document.getElementById("closeNav").onclick=()=>w(!1),document.getElementById("navBackdrop").onclick=()=>w(!1),q.querySelectorAll("a").forEach(f=>f.addEventListener("click",()=>w(!1),{signal:o})),y.addEventListener("change",()=>w(!1,!1),{signal:o}),document.addEventListener("keydown",f=>{if(f.key==="Escape"&&(p?w(!1):R.hidden?I.hidden||(A(),u.focus()):(A(),E.focus())),f.key==="Tab"&&p){const d=[...q.querySelectorAll("a, button")],S=d[0],F=d[d.length-1];f.shiftKey&&document.activeElement===S?(f.preventDefault(),F.focus()):!f.shiftKey&&document.activeElement===F&&(f.preventDefault(),S.focus())}},{signal:o});const D=document.getElementById("view");if(document.querySelector(".skip-link").onclick=f=>{f.preventDefault(),D.focus()},!e.lastSync)D.innerHTML=e.err?`<div class="connection-state">${h("info")}<h1>We couldn't load your workspace</h1><p>${r(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(Y=document.getElementById("retryLoad"))==null||Y.addEventListener("click",()=>M.refresh(),{signal:o});else{a.fn(D,e,s);const f=t+"/"+(s||"");Dt!==f&&ra(D),Dt=f}}window.addEventListener("hashchange",()=>{aa(),window.scrollTo({top:0,behavior:"instant"})});let Pt="",Lt=!1;M.subscribe(e=>{var o;e.err&&e.err!==Pt&&N(e.err,!0),Pt=e.err;const t=!Lt&&e.lastSync;t&&(Lt=!0);const s=ea(),a=s.name==="pr"&&document.getElementById("deliveryForm"),n=a&&!a.dataset.committing&&((o=e.me)==null?void 0:o.role)==="admin"&&a.dataset.prId===s.param&&e.prs.some(i=>i.id===s.param);if(e.lastSync&&(e.loading||e.err)||(s.name==="new"||n)&&!t&&e.lastSync){ta(e);return}aa()});da(()=>M.refresh());Be()||qn();
