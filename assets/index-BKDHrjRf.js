(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var ca;const ie=typeof window<"u"?(ca=window.matchMedia)==null?void 0:ca.call(window,"(prefers-reduced-motion: reduce)"):null,_e=new Set,Ba="cubic-bezier(.2,.75,.25,1)";var ma;(ma=ie==null?void 0:ie.addEventListener)==null||ma.call(ie,"change",e=>{e.matches&&_e.forEach(t=>t.cancel())});function Xe(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||ie!=null&&ie.matches)return;const i=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Ba,fill:"backwards"});return i.id="workspace-reveal",_e.add(i),i.finished.then(()=>_e.delete(i),()=>_e.delete(i)),i}function Ua(e){if(ie!=null&&ie.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Xe(a,{delay:Math.min(s++*22,154),distance:10})}}const ua={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Ze="oizom-id-token";let Ft=null;function ja(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function et(){const e=localStorage.getItem(Ze);return e?ja(e)<Date.now()+3e4?(localStorage.removeItem(Ze),null):e:null}function Ha(){const e=et();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function Va(){localStorage.removeItem(Ze),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function _a(e){if(Ft=e,et()){e();return}$t(()=>{google.accounts.id.initialize({client_id:ua.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Ze,t.credential),Ft()}}),google.accounts.id.prompt()})}function $t(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>$t(e,t+1),100)}function Ga(e){$t(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class mt extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const pa=new Set(["list","me","usersList","health","logTail","financeList","attachmentDownload"]),Ka=new Set([404,408,429,500,502,503,504]),za=45e3;function Ya(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Be(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=pa.has(e),i=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${i}). Please try syncing again.`:`Could not confirm your change (${i}). Sync and check whether it saved before submitting again.`;return new mt(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||Ka.has(t)})}async function Za(e,t){const s=et();if(!s)throw new mt("SIGNED_OUT");let a;try{a=await fetch(ua.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:za),body:JSON.stringify({...t,action:e,token:s})})}catch(o){throw Be(e,{kind:["TimeoutError","AbortError"].includes(o.name)?"timeout":"network"})}const n=Ya(a);if(!a.ok)throw Be(e,{status:a.status,stage:n,kind:"http"});let i;try{i=await a.json()}catch{throw Be(e,{stage:n,kind:"response"})}if(!i||typeof i.ok!="boolean"||i.ok&&e==="list"&&!Array.isArray(i.prs))throw Be(e,{stage:n,kind:"response"});if(!i.ok)throw new mt(i.error||"Request failed",{action:e});return i}async function G(e,t={}){for(let s=0;s<2;s++)try{return await Za(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!pa.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function Wa(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Ja(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Qa(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function Xa(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Ot(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,i)=>Number(n.itemNo)-Number(i.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:Qa(n),qty:Xa(n)}})}let z={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const ut=new Set;let Bt=!1,Le=null,it=0;function en(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function ot(){ut.forEach(e=>e(z))}const V={get:()=>z,subscribe(e){return ut.add(e),()=>ut.delete(e)},refresh(){return Le||(z={...z,loading:!0},Le=Promise.resolve().then(async()=>{try{let e,t;do t=it,e=await G("list");while(t!==it);en(e),z={prs:Ot(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},Bt=!0}catch(e){if(e.message==="SIGNED_OUT"&&Bt){location.reload();return}z={...z,err:e.message,loading:!1}}}).finally(()=>{Le=null,z={...z,loading:!1},ot()}),ot(),Le)},async applyResult(e,{itemsChanged:t=!1}={}){it++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=z.prs.find(i=>i.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return V.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const i=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),o=Ot([e.pr],i)[0];s.prs=n?z.prs.map(c=>c.id===o.id?o:c):[...z.prs,o]}a=!0}e.deleted&&(s.prs=z.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=z.me&&e.users.find(i=>i.email.toLowerCase()===z.me.email.toLowerCase());if(z.me&&(!n||!n.role))return V.refresh();n&&(s.me={...z.me,role:n.role,department:n.department}),a=!0}if(!a)return V.refresh();z={...z,...s},ot()}},Ut={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ut[e]||Ut.file}</svg>`}const r=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function tt(e){return`<span class="chip ${r(e)}" data-s="${r(e)}">${r(e)}</span>`}function I(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const ee=e=>e?r(String(e).slice(0,10)):"—";function at(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function wt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const jt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Ge=e=>jt[e]!=null?jt[e]:e+" ";function Ce(e,t){const s=e==="INR"?"en-IN":"en-US";return Ge(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function ne(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Ge(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Ge(e)+(t/1e3).toFixed(1)+"K":Ge(e)+Math.round(t).toLocaleString("en-US")}const Oe=["Cancelled","Rejected"],tn=["Ordered","In Transit","Received"],nt=e=>tn.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function Ht(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function Vt(e){const t=e.filter(n=>!Oe.includes(n.status)),s=e.filter(nt),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:Ht(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:Ht(t)}}const We={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:nt,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Oe.includes(e.status)};function an(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function _t(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function ha(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function nn(e){return e.filter(nt)}function sn(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function rn(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function Gt(e,t,s){const a={};for(const n of e){const i=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(i))continue;let o;if(t==="count")o=1;else{if(Oe.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;o=c}a[i]=(a[i]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function on(e,t){const s={};for(const a of e){if(Oe.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const i=a.department||"Unassigned";s[i]=(s[i]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function ln(e,t,s=6){const a={};for(const o of e){if(Oe.includes(o.status)||(o.currency||"Unknown")!==t)continue;const c=Number(o.amount);if(!o.amount||!isFinite(c))continue;const S=o.vendor||"Unspecified";a[S]=(a[S]||0)+c}const n=Object.entries(a).map(([o,c])=>({vendor:o,total:c})).sort((o,c)=>c.total-o.total);if(n.length<=s)return n;const i=n.slice(s).reduce((o,c)=>o+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:i}]}function dn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function cn(e){const t=(i,o)=>{const c=Date.parse(i),S=Date.parse(o);return isFinite(c)&&isFinite(S)?(S-c)/864e5:null},s=i=>i.length?i.reduce((o,c)=>o+c,0)/i.length:null,a=e.map(i=>i.createdAt&&i.approvedAt?t(i.createdAt,i.approvedAt):null).filter(i=>i!=null&&i>=0),n=e.map(i=>i.poDate&&i.receivedAt?t(i.poDate,i.receivedAt):null).filter(i=>i!=null&&i>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const mn=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function un(e,t=Date.now()){const s=mn.map(a=>({...a,count:0}));return e.filter(nt).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const i=(t-n)/864e5;(s.find(o=>i>=o.min&&i<=o.max)||s[s.length-1]).count++}),s}const Re=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],va=["Unpaid","Paid","Partially Paid","FOC / Free"],Je={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function pn(e,t,s,a,n){const i=(Je[e]||{})[t];return i?i.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function hn(e,t,s,a){return Object.keys(Je[e]||{}).filter(n=>pn(e,n,t,s,a))}function vn(e,t){return!!(Je[e]&&Je[e][t])}const yn=["Submitted","Approved","Rejected"],Kt=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],pt=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),p={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:pt()},De=25,fn={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let ht;function bn(e,t){p.tab=t==="admin"?"all":"dept",t==="admin"&&(p.statuses=e==="pending"?["Submitted"]:[...Re]),p.sel=["pending","unpaid"].includes(e)?e:"total",p.page=1,p.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ve(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(ya(e,t),s&&Xe(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const i=e.querySelector("#"+n.id);if(i&&(i.focus(),n.start!=null&&typeof i.setSelectionRange=="function"))try{i.setSelectionRange(n.start,n.end)}catch{}}const zt=e=>String(e||"").slice(0,10);function gn(e){const t=p.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&zt(e.createdAt)<t.from||t.to&&zt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function ya(e,t){var s;clearTimeout(ht),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        ${((s=t.me)==null?void 0:s.role)!=="finance"?`<a class="adm-addbtn" href="#/new">
          ${v("plus")} New request
        </a>`:""}
      </div>
      <div id="tabBody"></div>
    </div>`,$n(e.querySelector("#tabBody"),e,t)}const Se=e=>e.length?e.map(([t,s])=>ne(t,s)).join(" + "):"—";function $n(e,t,s){var Pt,Tt,Lt,Dt,Nt,Et,Mt,It,xt;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",i=a.role==="admin",o=a.role==="finance",c=[(Pt=a.email)==null?void 0:Pt.toLowerCase(),a.role,(Tt=a.department)==null?void 0:Tt.toLowerCase()].join("|");p.viewer!==c&&Object.assign(p,{viewer:c,tab:i?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:pt()});const S=n?["mine","dept","approved"]:i?["all","mine"]:o&&!((Lt=s.capabilities)!=null&&Lt.financeWorkflow)?["mine","payments"]:["mine"];S.includes(p.tab)||(p.tab="mine");const m=i&&p.statuses.length===1&&p.statuses[0]==="Approved",u=p.statuses.length===Re.length,k=p.tab==="dept",D=p.tab==="approved",P=p.tab==="all",h=p.tab==="payments",C=o&&((Dt=s.capabilities)!=null&&Dt.financeHandoff)?s.prs:an(s.prs,a.email),F=n?_t(s.prs,a.email):[],T=n?ha(s.prs,a.department):[],A=o?nn(s.prs):[],j=k?T:D?F:P?s.prs:h?A:C,q=i&&!u?j.filter(l=>p.statuses.includes(l.status)):j,g=Vt(q),$=n?T.filter(We.pending):[],x=i?Vt(s.prs):n?{pending:$.length,highPriority:$.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,N=m?[{key:"total",n:g.total,l:"Ready to purchase",s:P?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:g.spendTotals.length?ne(...g.spendTotals[0]):"-",l:"Approved value",s:g.spendTotals.length>1?"+ "+Se(g.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:h?[{key:"total",n:g.total,l:"Awaiting payment",s:Se(g.unpaidTotals)},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ne(...g.spendTotals[0]):"—",l:"Total value",s:g.spendTotals.length>1?"+ "+Se(g.spendTotals.slice(1)):""}]:k?[{key:"total",n:g.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:g.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:g.unpaidCount,l:"Unpaid",s:Se(g.unpaidTotals),cls:"bad"},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ne(...g.spendTotals[0]):"—",l:"Total spend",s:g.spendTotals.length>1?"+ "+Se(g.spendTotals.slice(1)):""}]:[{key:"total",n:g.total,l:D?"Approved PRs":i&&!u?"Selected PRs":P?"All PRs":"Total PRs",s:D?"across all requesters":i&&!u?"Matching your selected statuses":P?"every department":""},...D?[]:[{key:"pending",n:g.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:g.unpaidCount,l:"Unpaid",s:Se(g.unpaidTotals),cls:"bad"},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ne(...g.spendTotals[0]):"—",l:D?"Approved spend":"Total spend",s:g.spendTotals.length>1?"+ "+Se(g.spendTotals.slice(1)):""}];if(!i&&!o){const l=N.findIndex(R=>R.key==="unpaid");l>=0&&N.splice(l,1)}if(P)for(const l of sn(q))N.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+at(l.email),s:l.email,cls:"go"});N.some(l=>l.key===p.sel)||(p.sel="total");const O=(p.sel.startsWith("ap:")?_t(q,p.sel.slice(3)):q.filter(We[p.sel])).sort((l,R)=>(R.createdAt||"").localeCompare(l.createdAt||"")),Y=N.find(l=>l.key===p.sel),Z=[...new Set(q.map(l=>l.department).filter(Boolean))].sort(),b=[...new Set(q.map(l=>l.vendor).filter(Boolean))].sort();p.filters.dept&&!Z.includes(p.filters.dept)&&(p.filters.dept=""),p.filters.vendor&&!b.includes(p.filters.vendor)&&(p.filters.vendor="");const E=O.filter(gn),y=Object.values(p.filters).some(Boolean),M=Math.max(1,Math.ceil(E.length/De));p.page=Math.min(Math.max(1,p.page),M);const K=E.slice((p.page-1)*De,p.page*De),H=["dept","vendor","from","to"].filter(l=>p.filters[l]).length,f=u?"All statuses":p.statuses.join(" + "),d=i?(P?u?"All requests":m?"Approved requests":f:"Your requests")+(P?"":" · "+f):o&&((Nt=s.capabilities)!=null&&Nt.financeHandoff)?"Requests sent by admin":k?"Department requests":D?"Approved by you":h?"Payment queue":"Your requests",L=(l,R,B)=>`<button type="button" id="scope-${l}" class="adm-tab ${p.tab===l?"active":""}" data-tab="${l}" aria-pressed="${p.tab===l}">${R} <span>${B}</span></button>`,_=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),U=l=>{const R=i?Re:n&&l.status==="Submitted"&&_(l)?yn:null;return R?`<select class="status-sel" data-status="${r(l.status)}" aria-label="Status for ${r(l.id)}" data-id="${r(l.id)}">${R.map(B=>`<option ${B===l.status?"selected":""}>${r(B)}</option>`).join("")}</select>`:tt(l.status)},X=l=>`<select class="pay-sel" aria-label="Payment status for ${r(l.id)}" data-id="${r(l.id)}">${va.map(R=>`<option ${R===l.paymentStatus?"selected":""}>${r(R)}</option>`).join("")}</select>`,oe=i?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${u?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${u}">All <span>${j.length}</span></button>
        ${Kt.map((l,R)=>`<button type="button" class="view-pill ${!u&&p.statuses.includes(l)?"selected":""}" id="status-pill-${R}" data-admin-status="${r(l)}" aria-pressed="${!u&&p.statuses.includes(l)}">${l==="Submitted"?"Pending approval":r(l)}<span>${j.filter(B=>B.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${P?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${P}">Everyone</button>
        <button type="button" class="view-pill ${P?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!P}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${v("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${r(d)}</span><span class="view-result-count" role="status">${q.length} ${q.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Et=s.capabilities)!=null&&Et.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Mark In progress to take responsibility through completion.</p></div><a class="btn" href="#/payments">${v("wallet")} View payment work ${v("arrow")}</a></section>`:""}
    ${!i&&S.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${L("mine","Your requests",C.length)}
      ${n?L("dept",r(a.department||"Your department"),T.length)+L("approved","Approved by you",F.length):""}
      ${o?L("payments","Awaiting payment",A.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${m?"approved-kpis":""}" aria-label="Filter requests by summary">${N.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===p.sel?"sel":""}" data-key="${r(l.key)}" aria-pressed="${l.key===p.sel}">
        <span class="kpi-top"><span class="l">${r(l.l)}</span>${v(fn[l.key])}</span>
        <span class="v">${r(String(l.n))}</span><span class="s">${r(l.s||(l.key==="total"?d:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${x?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?r(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${x.pending?"":"disabled"}><span class="attention-icon">${v("clock")}</span><span><b>${x.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${x.pending?"Open approval queue":"No approvals waiting"}</small></span>${v("arrow")}</button>
      ${i?`<button type="button" data-queue="unpaid" ${x.unpaidCount?"":"disabled"}><span class="attention-icon">${v("wallet")}</span><span><b>${x.unpaidCount} awaiting payment</b><small>${x.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${v("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${v("info")}</span><span><b>${x.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${oe}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${E.length}</span></h2><p>${r(d)} · ${p.sel==="total"?"Latest first":r(Y.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${r(p.filters.q)}"></label>
        ${i?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Re.map(l=>`<option value="${r(l)}" ${p.filters.status===l?"selected":""}>${r(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${H?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${p.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${H?`<span class="count-badge">${H}</span>`:""}</button>
        ${y?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${p.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${Z.map(l=>`<option value="${r(l)}" ${p.filters.dept===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${b.map(l=>`<option value="${r(l)}" ${p.filters.vendor===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${r(p.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${r(p.filters.to)}"></label>
        ${P?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${N.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${r(l.key)}" ${p.sel===l.key?"selected":""}>${r(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${h?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${K.map(l=>`<tr class="rowlink ${h?"payment-row":""}" data-id="${r(l.id)}">
          <td class="request-id"><a href="#/pr/${r(l.id)}">${r(l.id)}</a></td>
          <td class="request-date">${ee(l.createdAt)}</td>
          ${h?`<td>${r(l.vendor)}</td><td>${r(l.poNo||"—")}</td><td>${r(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${r(l.department)}</td><td class="wrap request-item">${r(l.item)}</td><td class="request-vendor">${r(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?r(ne(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${h?X(l):U(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(y?"search":"file")}<b>${y?"No matching requests":m?"No requests ready for purchasing":i&&!u?"No requests with these statuses":"No requests here yet"}</b><span>${y?"Try a different search or clear your filters.":m?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":i&&!u?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${y?'<button class="btn" id="emptyClear">Clear filters</button>':i&&!u?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${E.length?(p.page-1)*De+1:0}–${Math.min(p.page*De,E.length)} of ${E.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${p.page===1?"disabled":""}>${v("left")}</button><span>Page ${p.page} of ${M}</span><button class="btn" id="dashNext" aria-label="Next page" ${p.page===M?"disabled":""}>${v("right")}</button></div></div>
    </section>`;const me=l=>{p.tab=l,p.sel="total",p.page=1,i&&(p.filters=pt()),ve(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>me(l.dataset.tab));const se=()=>{p.statuses=[...Re],me(p.tab),t.querySelector("#showAllRequests").focus()};(Mt=e.querySelector("#showAllRequests"))==null||Mt.addEventListener("click",se),(It=e.querySelector("#emptyAllRequests"))==null||It.addEventListener("click",()=>{p.tab="all",se()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const R=l.dataset.adminStatus;if(u)p.statuses=[R];else if(!p.statuses.includes(R))p.statuses=Kt.filter(B=>B===R||p.statuses.includes(B));else if(p.statuses.length>1)p.statuses=p.statuses.filter(B=>B!==R);else return;me(p.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>me(l.dataset.adminScope)),(xt=e.querySelector("#resetAdminView"))==null||xt.addEventListener("click",()=>{p.statuses=["Approved"],me("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{p.sel=l.dataset.key,p.page=1,ve(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,J,W;if(l.dataset.queue==="unpaid"&&((B=s.capabilities)!=null&&B.financeWorkflow)){location.hash="#/payments";return}if(!i&&!(n&&l.dataset.queue==="pending"))return;bn(l.dataset.queue,a.role),ve(t,s);const R=t.querySelector(".requests-card");R.focus({preventScroll:!0}),(W=R.scrollIntoView)==null||W.call(R,{block:"start",behavior:(J=window.matchMedia)!=null&&J.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=R=>{R.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{p.moreFilters=!p.moreFilters,e.querySelector("#advancedFilters").hidden=!p.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(p.moreFilters))};const le=e.querySelector("#dashApprover");le&&(le.onchange=()=>{p.sel=le.value,p.page=1,ve(t,s)});const $e=l=>{var R,B;p.page+=l,ve(t,s),(B=(R=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(R,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>$e(-1),e.querySelector("#dashNext").onclick=()=>$e(1);const he=(l,R)=>{p.filters[l]=R,p.page=1,ve(t,s)};e.querySelector("#dashQ").oninput=l=>{p.filters.q=l.target.value,p.page=1,clearTimeout(ht),ht=setTimeout(()=>{t.isConnected&&ve(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>he("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>he("vendor",l.target.value);const Te=e.querySelector("#dashStatus");Te&&(Te.onchange=l=>he("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>he("from",l.target.value),e.querySelector("#dashTo").onchange=l=>he("to",l.target.value);const de=()=>{p.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},p.page=1,p.sel="total",ve(t,s)},te=e.querySelector("#dashFilterClear"),we=e.querySelector("#emptyClear");te&&(te.onclick=de),we&&(we.onclick=de),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,B=s.prs.find(W=>W.id===R),J=l.value;if(!(!B||J===B.status)){if((J==="Rejected"||J==="Cancelled")&&!confirm(`Mark ${R} as ${J}?`)){l.value=B.status;return}l.disabled=!0;try{let W;a.role==="admin"&&!vn(B.status,J)?W=await G("update",{id:R,updates:{status:J}}):W=await G("transition",{id:R,to:J}),I(`${R} → ${J}`),await V.applyResult(W)}catch(W){I(W.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,B=s.prs.find(W=>W.id===R),J=l.value;if(!(!B||J===B.paymentStatus)){l.disabled=!0;try{const W=await G("update",{id:R,updates:{paymentStatus:J}});I(`${R} payment → ${J}`),await V.applyResult(W)}catch(W){I(W.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function St(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function kt(e,t){const s=St(e,t),a=s.filter(We.spend),n={};for(const i of a){const o=Number(i.amount);if(!i.amount||!isFinite(o))continue;const c=i.currency||"INR";n[c]=(n[c]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((i,o)=>o[1]-i[1]),unpaid:s.filter(We.unpaid).length,lastOrder:s.reduce((i,o)=>{const c=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>i?c:i},"")}}function fa(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(St(t,e.name).filter(i=>i.amount&&isFinite(Number(i.amount))).map(i=>i.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(i=>i!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const wn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Sn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},kn=1,An=.7,ba=.5,qn=.4,Rn=.3,Cn=4,Pn=e=>e.length>=7?2:e.length>=Cn?1:0,Qe=e=>String(e??"").toLowerCase().trim();function Tn(e,t){const s=e[t];return Qe(Array.isArray(s)?s.join(" "):s)}function ga(e){return Qe(e).split(/[\s,]+/).filter(Boolean)}function Ln(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let i=1;i<=t.length;i++)n[i]=Math.min(s[i]+1,n[i-1]+1,s[i-1]+(e[a-1]===t[i-1]?0:1));s=n}return s[t.length]}function Yt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return kn;if(s.some(n=>n.startsWith(t)))return An;if(e.includes(t))return ba;const a=Pn(t);return a&&s.some(n=>Ln(n,t)<=a)?Rn:0}function Dn(e,t){const s=Yt(e,t);if(s)return s;const a=Sn[t];return a&&a.some(i=>i.includes(" ")?e.includes(i):Yt(e,i)>=ba)?qn:0}function Nn(e,t){const s=Array.isArray(t)?t:ga(t);if(!s.length)return 0;let a=0;for(const n of s){let i=0;for(const{key:o,weight:c}of wn)i=Math.max(i,Dn(Tn(e,o),n)*c);if(!i)return 0;a+=i}return a}function $a(e,t){const s=ga(t);return s.length?(e||[]).map(a=>({v:a,score:Nn(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Qe(a.v.displayName||a.v.name).localeCompare(Qe(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function st(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${r(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${r(t)}" value="${r(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const At=(...e)=>r(e.filter(Boolean).join(" ").toLowerCase());function qt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${r(t)}</td></tr>`}function Rt(e,{get:t,set:s,count:a,id:n="admSearch",match:i=null}){const o=e.querySelector("#"+n);if(!o)return;const c=o.closest(".adm-card"),S=c.querySelector(".admSearchClear"),m=()=>En(c,t(),a,i);o.oninput=()=>{s(o.value),S.hidden=!o.value,m()},o.onkeydown=u=>{u.key==="Escape"&&o.value&&(o.value="",o.oninput())},S.onclick=()=>{o.value="",o.oninput(),o.focus()},m()}function En(e,t,s,a){const n=t.trim().toLowerCase(),i=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let c=null;i.forEach(u=>{u.hidden=n?o?!o.has(u.dataset.name):!u.dataset.search.includes(n):!1,u.classList.remove("last-visible"),u.hidden||(c=u)}),c&&c.classList.add("last-visible");const S=e.querySelector(".adm-nomatch");S&&(S.hidden=!!c||!i.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(i.filter(u=>!u.hidden).length,i.length))}let Ne="";const wa={Domestic:"dom",Foreign:"for",Mixed:"mix"},Mn=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Sa(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${r(Mn(e.displayName||e.name))}${t?`<img src="${r(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function In(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${r(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function xn(e,t){const s=kt(e.prs,t.name),a=fa(t,e.prs),n=s.spendTotals.length?ne(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${r(t.name)}">
      <div class="vc-top">
        ${Sa(t)}
        <div class="vc-title">
          <b>${r(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${r(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${wa[a]}">${r(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${r(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${ee(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${In(t)}</div>
    </a>`}const Fn=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Zt(e,t){const s=Fn(e.vendors),a=t.trim()?$a(s,t):s;return a.length?a.map(n=>xn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${r(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function On(e,t,s){if(s)return Bn(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${st(Ne,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Zt(t,Ne)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),i=e.querySelector(".admSearchClear"),o=()=>{Ne=n.value,i.hidden=!Ne,a.innerHTML=Zt(t,Ne)};n.oninput=o,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",o())},i.onclick=()=>{n.value="",o(),n.focus()}}function Bn(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${r(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=kt(t.prs,a.name),i=fa(a,t.prs),o=t.me&&t.me.role==="admin",c=St(t.prs,a.name).sort((m,u)=>(u.createdAt||"").localeCompare(m.createdAt||"")),S=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Sa(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${r(a.displayName||a.name)}
              ${i?`<span class="vc-badge ${wa[i]}">${r(i.toUpperCase())}</span>`:""}
            </h1>
            <p>${r(a.category||"Vendor")}</p>
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
        <div class="kpi"><div class="v">${n.spendTotals.length?r(ne(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?r(n.spendTotals.slice(1).map(([m,u])=>ne(m,u)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${ee(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${S.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${S.map(([m,u])=>`<div><span class="vc-l">${r(m)}</span><b>${r(u)}</b></div>`).join("")}</div>
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
            <td>${m.amount?r(ne(m.currency||"INR",Number(m.amount))):"—"}</td>
            <td>${tt(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const vt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],ka=new Map(vt.map(e=>[e.code,e])),Un=e=>ka.has(String(e||"").trim().toUpperCase());function yt(e){const t=ka.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function jn(e){const t=String(e||"").trim().toLowerCase(),s=t?vt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...vt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,i)=>a(n)-a(i)||n.code.localeCompare(i.code))}function Ue(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const i=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${r(c)}">
      <span class="barlabel">${r(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${i.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${r(t(n.value))}</span>
    </div>`}).join("")}</div>`}function Wt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},i=s-n.l-n.r,o=a-n.t-n.b,c=Math.max(...e.map(T=>T.value),1),S=i/(e.length-1),m=T=>n.l+T*S,u=T=>n.t+o-T/c*o,k=e.map((T,A)=>`${A===0?"M":"L"}${m(A).toFixed(1)} ${u(T.value).toFixed(1)}`).join(" "),D=`${k} L${m(e.length-1).toFixed(1)} ${n.t+o} L${m(0).toFixed(1)} ${n.t+o} Z`,P=[0,.5,1].map(T=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-T)).toFixed(1)}" y2="${(n.t+o*(1-T)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),h=Math.ceil(e.length/6)||1,C=e.map((T,A)=>A%h===0||A===e.length-1?`<text x="${m(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${r(T.month.slice(2))}</text>`:"").join(""),F=e.map((T,A)=>`<circle cx="${m(A).toFixed(1)}" cy="${u(T.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${r(T.month)}: ${r(t(T.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${P}
    <path d="${D}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${k}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${F}
    ${C}
  </svg>`}const Hn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],Vn={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},_n={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},je={currency:""};function Aa(e,t){var q,g;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?ha(t.prs,s.department):t.prs||[],i=rn(n);i.includes(je.currency)||(je.currency=i[0]||"");const o=je.currency,c=$=>o?ne(o,$):String($),S=o?Gt(n,"spend",o):[],m=Gt(n,"count"),u=o?ln(n,o,6).map($=>({label:$.vendor,value:$.total})):[],k=!a&&o?on(n,o).map($=>({label:$.department,value:$.total})):[],D=dn(n),P=Hn.filter($=>D[$]).map($=>({label:$,value:D[$]})),h=cn(n),C=un(n),F=C.map($=>({label:$.label,value:$.count})),T=C.reduce(($,x)=>$+x.count,0),A=S.reduce(($,x)=>$+x.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${r(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${i.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${v("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${i.map($=>`<option value="${r($)}" ${$===o?"selected":""}>${r(yt($))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?r(c(A)):"—"}</div><div class="l">Total spend${o?" · "+r(o):""}</div></div>
        <div class="kpi"><div class="v">${h.avgApprovalDays!=null?h.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${h.avgDeliveryDays!=null?h.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((q=t.me)==null?void 0:q.role)==="admin"?`<div class="kpi ${T?"warn":""}"><div class="v">${T}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+r(o):""}</p></div>
          </div>
          <div class="spend-chart">${S.length?Wt(S,{valueFmt:$=>ne(o,$),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${k.length?`<div class="card"><h2>Spend by department${o?" · "+r(o):""}</h2>
          <div class="pd-body">${Ue(k,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+r(o):""}</h2>
          <div class="pd-body">${Ue(u,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${Ue(P,{colorOf:$=>Vn[$.label]||"var(--mut)"})}</div></div>
        ${((g=t.me)==null?void 0:g.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${Ue(F,{colorOf:$=>_n[$.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${Wt(m,{valueFmt:$=>$+" PR"+($===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var $;je.currency=j.value,Aa(e,t),($=e.querySelector("#insCur"))==null||$.focus()})}const qa={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Ra(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Gn(e){const t=String(e.trackingNo||"").trim(),s=Ra(e.trackingLink)||(t?(qa[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[r(e.courier||""),s?`<a href="${r(s)}" target="_blank" rel="noopener noreferrer">${r(t||"Track shipment")} ↗</a>`:r(t)].filter(Boolean).join(" ")}function Kn(e,t=[]){const s=[...new Set([...t,...Object.keys(qa),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${r(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${r(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${r(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${r(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function zn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Ra(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const Yn="1900-01-01",Zn="2100-12-31",Wn="Enter a complete date with a year between 1900 and 2100.";function xe(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Ca(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(Wn)};return t.forEach(a=>{a.min=Yn,a.max=Zn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const Jn=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function rt(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function Pa(e){return`<div class="attachment-links">${rt(e).map(t=>`<button type="button" class="attachment-link" data-download="${r(t.id)}">${v("file")}${r(t.name)}</button>`).join("")}</div>`}function Ta(e=[]){return`<div class="attachment-picker" data-attachments="${r(JSON.stringify(rt(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${v("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${Jn}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const Qn=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function La(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=rt(e.dataset.attachments).map(u=>({attachment:u})),i=e.querySelector(".attachment-selection"),o=e.querySelector("input"),c=e.querySelector(".attachment-status"),S=()=>{e.dataset.attachments=JSON.stringify(n.filter(u=>u.attachment).map(u=>u.attachment))},m=()=>{i.innerHTML=n.map((u,k)=>{var D,P;return`<div class="attachment-chip">${v("file")}<span>${r(((D=u.attachment)==null?void 0:D.name)||u.file.name)}${u.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${k}" aria-label="Remove ${r(((P=u.attachment)==null?void 0:P.name)||u.file.name)}" ${a?"disabled":""}>${v("close")}</button></div>`}).join(""),i.querySelectorAll("[data-remove]").forEach(u=>u.onclick=()=>{a||(n.splice(Number(u.dataset.remove),1),S(),m())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const u=[...o.files];if(n.length+u.length>3)throw new Error("Attach up to 3 files per item or payment");for(const k of u){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(k.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!k.size||k.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}u.forEach(k=>n.push({file:k,operationId:crypto.randomUUID()})),c.textContent="Files will upload when you save.",m()}catch(u){I(u.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var u;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,m();try{for(const k of n){if(k.attachment)continue;c.textContent="Uploading "+k.file.name+"…";const D=await G("attachmentUpload",{scope:t,prId:s,name:k.file.name,operationId:k.operationId,base64:await Qn(k.file)});if(!((u=D.attachment)!=null&&u.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");k.attachment=D.attachment,S(),m()}return c.textContent=n.length?"Attachments ready.":"",n.map(k=>k.attachment)}catch(k){throw c.textContent="Upload not confirmed. Your selected files are kept here for retry.",k}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,m()}},e.hasPendingFiles=()=>n.some(u=>!u.attachment),m()}function Da(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await G("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),i=document.createElement("a");i.href=n,i.download=s.attachment.name,i.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){I(s.message,!0)}finally{t.disabled=!1}}})}const Xn=va,es={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ke=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:es[t])||[],lt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ue=(e,t,s)=>`<span class="lblrow">${r(e)}${lt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${r(lt[t])}" data-tip="${r(lt[t])}">?</span>`:""}</span>`;function ke(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${r(n)}" ${n===t?"selected":""}>${n?r(n):"Select…"}</option>`).join("")}function Jt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${r(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${r(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${r(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${r(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${ke(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${r(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${ke([...new Set([...Ke(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${r(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${r(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${r(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${v("close")}</button>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${Ta(t.attachments)}</div>
  </div>`}function He(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:rt((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function ts(e,t,s){var H;const a=s?t.prs.find(f=>f.id===s):null,n=a||{},i=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const c=a?n.department||"":o.department||"",S=(t.projects||[]).filter(f=>f.department.toLowerCase()===c.toLowerCase()).map(f=>f.project),m=(t.vendors||[]).filter(f=>(f.departments||[]).some(w=>w.toLowerCase()===c.toLowerCase())),u=f=>{const w=m.find(d=>d.name.toLowerCase()===String(f||"").toLowerCase());return w?w.displayName||w.name:String(f||"")},k=(t.materialTypes||[]).filter(f=>f.department.toLowerCase()===c.toLowerCase()).map(f=>f.materialType),D=c.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${r(n.id)}" style="font-family:var(--mono)">${r(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?r(n.id):"New Purchase Request"}</h1>
          ${a?tt(n.status):""}
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
              <label>${ue("Project*","project")} <select name="project" required>${ke(S,n.project||"",!0)}</select></label>
              <label>${ue("Purpose","purpose")} <input name="purpose" value="${r(n.purpose)}"></label>
              <div class="pd-field full">${ue("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${r(u(n.vendor))}">
                <input type="hidden" name="vendor" value="${r(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <label class="vendor-manual" id="manualVendorField" hidden>Vendor name<input id="manualVendorName" maxlength="200" placeholder="Enter the vendor's name" autocomplete="off"></label>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ue("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${r(yt(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${r(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ue("Priority","priority",!0)} <select name="priority">${ke(Ke(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(xe(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((H=t.capabilities)!=null&&H.financeWorkflow)?`
              <label>${ue("Payment status*","payment")} <select name="paymentStatus" required>${ke(Xn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${ke(Re,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${r(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${ue("Notes","notes")} <textarea name="notes" rows="3">${r(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&o.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${r(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${r(xe(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${r(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${r(xe(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${ke(Ke(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${r(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${Kn(n,Ke(t,"couriers"))}
          <label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(xe(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${i.map((f,w)=>Jt(t,f,w,k,D)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const P=e.querySelector("#prForm"),h=Ca(P),C=e.querySelector("#itemRows"),F=()=>{const f=He(P).map(L=>{const _=Wa(L.qty,L.unitPrice);return{lineTotal:_!==""?_:L.lineTotal}}),w=Ja(f),d=P.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=w===""?"":"Total: "+Ce(d,w)},T=f=>{La(f.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),f.querySelector(".rmItem").onclick=()=>{C.children.length>1&&(f.remove(),F())},f.querySelectorAll("input, select").forEach(w=>w.oninput=F)};[...C.children].forEach(T),F();const A=(f,w,d,{search:L,resolve:_,toLabel:U,allowEmpty:X,onCommit:oe,onSelect:me})=>{const se=e.querySelector("#"+f),le=e.querySelector("#"+w),$e=P.querySelector(`[name="${d}"]`),he=()=>{oe&&oe()},Te=de=>{const te=L(de).slice(0,30);le.innerHTML=te.map(we=>`<div class="curOpt" data-v="${r(we.value)}"><b>${r(we.main)}</b> ${r(we.name||"")}<span>${r(we.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',le.hidden=!1};se.onfocus=()=>{se.select(),Te("")},se.oninput=()=>Te(se.value),le.onmousedown=de=>{de.preventDefault();const te=de.target.closest(".curOpt");if(te){if(me!=null&&me(te.dataset.v)){le.hidden=!0;return}$e.value=te.dataset.v,se.value=U(te.dataset.v),le.hidden=!0,he()}},se.onblur=()=>setTimeout(()=>{le.hidden=!0;const de=se.value.trim();if(!de&&X)$e.value="";else{const te=_(de);te!=null&&($e.value=te)}se.value=U($e.value),he()},120)};A("curSearch","curList","currency",{search:f=>jn(f).map(w=>({value:w.code,main:w.code,name:w.name,sub:w.sym||""})),resolve:f=>{const w=f.split("—")[0].trim().toUpperCase();return Un(w)?w:null},toLabel:f=>yt(f),onCommit:F});const j=f=>{const w=String(f||"").trim().toLowerCase();return m.filter(d=>!w||d.name.toLowerCase().includes(w)||(d.displayName||"").toLowerCase().includes(w)||(d.category||"").toLowerCase().includes(w)).sort((d,L)=>(d.displayName||d.name).localeCompare(L.displayName||L.name)).slice(0,29).map(d=>({value:d.name,main:d.displayName||d.name,name:d.displayName?d.name:"",sub:d.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let q=!1;const g=e.querySelector("#manualVendorField"),$=e.querySelector("#manualVendorName"),x=P.querySelector('[name="vendor"]'),N=f=>{q=f,g.hidden=!f,$.required=f},O=e.querySelector("#venHint"),Y=()=>{const f=P.querySelector('[name="vendor"]').value.trim();O.hidden=!f||m.some(w=>w.name.toLowerCase()===f.toLowerCase())};A("venSearch","venList","vendor",{search:j,resolve:f=>{if(q)return $.value.trim();const w=m.find(d=>d.name.toLowerCase()===f.toLowerCase()||(d.displayName||"").toLowerCase()===f.toLowerCase());return w?w.name:f},toLabel:f=>q?"Other — enter manually":u(f),onSelect:f=>(N(f==="__other__"),q?(x.value=$.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",$.focus(),Y(),!0):!1),allowEmpty:!0,onCommit:Y}),$.oninput=()=>{x.value=$.value.trim(),Y()};const Z=e.querySelector("#venSearch"),b=Z.oninput;Z.oninput=()=>{N(!1),b()},Y(),e.querySelector("#addItem").onclick=()=>{C.insertAdjacentHTML("beforeend",Jt(t,{},C.children.length,k,D)),T(C.lastElementChild),Xe(C.lastElementChild)};const E=P.elements.namedItem("trackingLink");E&&(E.oninput=()=>E.setCustomValidity(""));const y=()=>Object.fromEntries([...new FormData(P)].filter(([f])=>!f.startsWith("i_"))),M=y(),K=JSON.stringify(He(P));P.onsubmit=async f=>{f.preventDefault();const w=e.querySelector("#prSave");if(w.disabled||!h()||!zn(E))return;if(q&&!$.value.trim()){$.reportValidity();return}e.querySelectorAll(".pr-save").forEach(_=>{_.disabled=!0,_.innerHTML=v("refresh","spin")+" Saving…"}),w.disabled=!0,w.textContent="Saving…";const d=y();let L=He(P);try{if(!L.length&&(!a||JSON.stringify(L)!==K))throw new Error("Add at least one item with a description");for(const U of C.children)U.querySelector('[name="i_description"]').value.trim()&&await U.querySelector(".attachment-picker").uploadFiles();L=He(P);const _=JSON.stringify(L)!==K;if(a){const U=Object.fromEntries(Object.entries(d).filter(([X,oe])=>oe!==M[X]));if(Object.keys(U).length||_){const X=await G("update",{id:n.id,updates:U,..._?{items:L}:{}});await V.applyResult(X,{itemsChanged:_}),I("PR updated")}location.hash="#/pr/"+n.id}else{const U=await G("create",{pr:d,items:L});await V.applyResult(U,{itemsChanged:!0}),I("Created "+U.pr.id),location.hash="#/pr/"+U.pr.id}}catch(_){I(_.message,!0),w.disabled=!1,w.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(U=>{U.disabled=!1,U.textContent=a?"Save changes":"Submit request"})}}}function Qt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const i=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return i&&o&&i===o&&c?c:at(t)}const Xt=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],as=e=>e==="Open"?"Outstanding":e;let fe={viewer:"",sync:null,data:null,pending:null},ye="Open";function ns(){fe.data=null}const qe=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Ce(e.currency,t),ea=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Na(e,t,s){var P;const a=t.me;if(!a||!["admin","finance"].includes(a.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((P=t.capabilities)!=null&&P.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const n=a.email+"|"+a.role,i=String(t.lastSync);(fe.viewer!==n||fe.sync!==i)&&(fe={viewer:n,sync:i,data:null,pending:null},ye="Open");const o=fe,c=async(h=!1)=>{if(h&&(o.data=null),!o.data){e.innerHTML=`<div class="connection-state" role="status">${v("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{o.pending||(o.pending=G("financeList").finally(()=>{o.pending=null}));const C=await o.pending;if(!Array.isArray(C.tasks)||!Array.isArray(C.financeUsers))throw new Error("The server did not return payment records.");o.data=C}catch(C){if(!e.isConnected||fe!==o)return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${r(C.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>c(!0);return}}!e.isConnected||fe!==o||k()};let S="",m=1,u=!1;const k=()=>{var O,Y,Z;const{tasks:h,financeUsers:C}=o.data,F=a.role==="admin",T=F?["Awaiting admin",...Xt]:Xt,A=s&&h.find(b=>b.prId===s),j=b=>ye==="All"||(ye==="Open"?b.state!=="Completed":ye==="Mine"?b.owner===a.email:b.state===ye),q=h.filter(j).filter(b=>[b.prId,b.poNo,b.vendor,b.owner].join(" ").toLowerCase().includes(S.toLowerCase())),g=Math.max(1,Math.ceil(q.length/25));m=Math.min(m,g);const $=(F?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(b=>[b,h.filter(E=>E.state===b).length]);if(e.innerHTML=`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${F?"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${v("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${$.map(([b,E])=>`<button class="kpi clickable" data-stage="${b}"><span class="l">${b}</span><span class="v">${E}</span></button>`).join("")}</div>
      ${A?D(A,F,C):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${F?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${h.length}</span></h2><p>${F?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${T.map(b=>`<button class="view-pill ${b===ye?"selected":""}" data-stage="${b}" aria-pressed="${b===ye}">${as(b)}</button>`).join("")}</div>
      <label class="search-input">${v("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${r(S)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${q.slice((m-1)*25,m*25).map(b=>`<tr><td><a href="#/payments/${encodeURIComponent(b.prId)}"><b>${r(b.prId)}</b></a><small class="finance-sub">${r(b.vendor)}</small></td><td>${r(b.poNo||"—")}</td><td>${r(qe(b,b.outstanding))}<small class="finance-sub">${r(b.paymentStatus)}</small></td><td>${r(b.owner||"Not started")}</td><td><span class="finance-status" data-state="${r(b.state)}">${r(b.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(b.prId)}" aria-label="View payment details ${r(b.prId)}">View details ${v("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${m===1?"disabled":""}>Previous</button><span>${q.length} results · Page ${m} of ${g}</span><button class="btn" id="financeNext" ${m===g?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${v("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${F?`<p class="finance-note">${v("info")} ${r(((O=o.data.zoho)==null?void 0:O.message)||"")}</p>`:""}
    </div>`,e.querySelector("#reloadPayments").onclick=()=>{u||c(!0)},e.querySelectorAll("[data-stage]").forEach(b=>b.onclick=()=>{u||(ye=b.dataset.stage,m=1,k())}),e.querySelector("#financeSearch").oninput=b=>{if(u)return;S=b.target.value,m=1,k(),e.querySelector("#financeSearch").focus()},e.querySelector("#financePrev").onclick=()=>{m--,k()},e.querySelector("#financeNext").onclick=()=>{m++,k()},!A)return;Da(e);const x=async(b,E)=>{if(!u){u=!0,e.querySelectorAll(".finance-detail button").forEach(y=>{y.disabled=!0});try{const y=await G(b,{id:A.prId,...E});if(!y.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");o.data.tasks=o.data.tasks.map(M=>M.prId===A.prId?y.task:M),e.isConnected&&fe===o&&k(),await V.applyResult(y),I(b==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(y){I(y.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(M=>{M.disabled=!1})}finally{u=!1}}};e.querySelectorAll("[data-progress]").forEach(b=>b.onclick=()=>x("financeProgress",{state:b.dataset.progress})),(Y=e.querySelector("#remindFinance"))==null||Y.addEventListener("click",()=>x("financeRemind",{})),(Z=e.querySelector("#sendToFinance"))==null||Z.addEventListener("click",()=>x("financeRelease",{}));const N=e.querySelector("#recordPayment");if(N){const b=N.querySelector(".attachment-picker");La(b,{scope:"payment",prId:A.prId});const E=N.elements.amount,y=()=>{const H=N.elements.paymentMode.value==="full";E.readOnly=H,E.max=H?String(A.outstanding):(Math.round(A.outstanding*(A.currency==="JPY"?1:100))-1)/(A.currency==="JPY"?1:100),E.value=H?String(A.outstanding):"",e.querySelector("#paymentAmountHint").textContent=H?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",H||E.focus()};N.querySelectorAll('[name="paymentMode"]').forEach(H=>H.onchange=y),y();const M="finance-attempt:"+a.email+":"+A.prId,K=H=>{const f=JSON.stringify(H);let w;try{w=JSON.parse(sessionStorage.getItem(M))}catch{}const d=(w==null?void 0:w.signature)===f?w:{signature:f,id:crypto.randomUUID()};return sessionStorage.setItem(M,JSON.stringify(d)),d.id};N.onsubmit=async H=>{if(H.preventDefault(),!(u||!N.reportValidity())){u=!0,N.querySelector('[type="submit"]').disabled=!0;try{const f=await b.uploadFiles(),w=Object.fromEntries(new FormData(N));w.currency=A.currency,w.paymentMode==="full"&&(w.amount=String(A.outstanding)),f.length&&(w.attachments=f),u=!1,await x("financeRecordPayment",{...w,operationId:K(w)})}catch(f){I(f.message,!0)}finally{u=!1,N.isConnected&&(N.querySelector('[type="submit"]').disabled=!1)}}}}for(const[b,E]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const y=e.querySelector("#"+b);y&&(y.onsubmit=M=>{M.preventDefault(),y.reportValidity()&&x(E,Object.fromEntries(new FormData(y)))})}},D=(h,C,F)=>{const T=h.owner===a.email.toLowerCase(),A=C||T,j=h.released&&!h.issue&&h.state!=="Completed";return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${r(h.vendor)}</span><h2>${r(h.prId)}</h2><p>${r(h.poNo||"PO reference not recorded")} · Request: ${r(h.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(h.prId)}">Request &amp; delivery ${v("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${r(qe(h,h.total))}</b></div><div><span>Recorded paid</span><b>${r(qe(h,h.paid))}</b></div><div><span>Outstanding</span><b>${r(qe(h,h.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${r(h.state)}">${r(h.state)}</span><span>Responsible: <b>${r(h.owner||"Not started")}</b></span></div>
      ${h.issue?`<p class="finance-alert" role="status">${r(h.issue)}</p>`:""}
      ${h.released?`<p class="finance-note">Sent to Finance ${r(ee(h.sentAt))} by ${r(h.sentBy||"admin")}.</p>`:'<p class="finance-note">This request is with admin. Finance cannot see it until you send it.</p>'}
      ${!C&&h.owner&&!T?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${C&&!h.released&&!h.issue&&h.state!=="Completed"?'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${j&&(h.owner?A:!C)&&h.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${j&&A&&h.owner&&h.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${C&&h.released&&h.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${h.lastReminderAt?`<p class="finance-note">Last reminder: ${r(new Date(h.lastReminderAt).toLocaleString())}</p>`:""}
      ${C&&!h.owner&&j?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${j&&A&&h.owner&&h.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <fieldset class="payment-mode"><legend>Payment amount</legend><div class="payment-mode-options">
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${r(qe(h,h.outstanding))}</small></span></label>
          <label><input type="radio" name="paymentMode" value="partial"><span><b>Partial payment</b><small>Enter the amount paid</small></span></label>
        </div></fieldset><p class="full finance-note" id="paymentAmountHint"></p>
        <label>Amount (${r(h.currency)})<input name="amount" type="number" step="${h.currency==="JPY"?"1":"0.01"}" min="${h.currency==="JPY"?"1":"0.01"}" max="${h.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${ea()}" value="${ea()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <div class="full"><h4>Payment proof (optional)</h4>${Ta()}</div>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${C&&h.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${r(h.currency)})<input name="amount" type="number" min="0" max="${h.total}" step="${h.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${C&&h.released&&h.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${F.map(q=>`<option value="${r(q.email)}" ${q.email===h.owner?"selected":""}>${r(q.name||q.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${h.payments.map(q=>`<article><div><b>${r(qe(h,q.amount))}</b><span>${r(ee(q.date))} · ${r(q.reference)}</span></div><p>${r(q.recordedBy)}${q.note?" · "+r(q.note):""}</p>${/^https:\/\//i.test(q.proofUrl||"")?`<a href="${r(q.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${v("external")}</a>`:""}${Pa(q.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await c()}const Q=(e,t)=>`<div class="pd-f"><span class="vc-l">${r(e)}</span><b>${t||"—"}</b></div>`;let Ee=!1,ta=null;const aa=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${r(wt(s||t))}</span>
    <div>
      <span class="vc-l">${r(e)}</span>
      <b>${r(t)}</b>
      <div class="pd-sub">${r(a||"")}</div>
    </div>
  </div>`;function ft(e,t,s){var H,f,w;const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${r(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}ta!==s&&(Ee=!1,ta=s);const n=t.me||{role:"",email:"",department:""},i=n.role==="admin",o=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["admin","finance"].includes(n.role),S=i||o&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),u=hn(a.status,n.role,o,m),k=(a.department||"").toLowerCase()==="production",D=i&&a.status==="Approved",P=i&&((H=t.capabilities)==null?void 0:H.financeHandoff)&&!a.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(a.status)&&!["Paid","FOC / Free"].includes(a.paymentStatus),h=i&&a.poNo&&!a.zohoPoId&&!((f=t.capabilities)!=null&&f.financeWorkflow),C=D?"":u.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),F=u.filter(d=>d!==C),T=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),A=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",j=["Submitted","Approved","Ordered","In Transit","Received"],q=j.indexOf(a.status),g=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),$=a.paymentTerm||g&&g.paymentTerms||"",x=t.lists&&t.lists.paymentTerms||[],N=["",...$&&!x.includes($)?[$,...x]:x].map(d=>`<option value="${r(d)}" ${d===$?"selected":""}>${d?r(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${r(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${r(a.id)}</h1>${tt(a.status)}</div>
          <p class="request-subtitle">${r(a.project||a.department||"Purchase request")} · Created ${ee(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="sendFinanceBtn">${v("wallet")} Send to Finance</button>`:""}
          ${D?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${C?`<button class="btn primary" data-to="${r(C)}">${v(A(C))}${r(T(C))}</button>`:""}
          ${S?`<a class="btn" href="#/new/${r(a.id)}">${v("edit")} Edit</a>`:""}
          ${F.length||h?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${h?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${F.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${r(d)}">${v(A(d))}${r(T(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${r(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${q===-1?"Currently "+r(a.status.toLowerCase()):q===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${j.map((d,L)=>`<li class="${L<q?"done":L===q?"current":""}" ${L===q?'aria-current="step"':""}><span class="step-dot">${L<q?v("check"):L+1}</span><span>${r(d)}</span></li>`).join("")}</ol>
      </section>

      ${D&&Ee?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${r(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${r(xe(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${N}</select>
          </label>
          ${g&&g.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${r(g.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${Q("Department",r(a.department))}
          ${Q("Project",r(a.project))}
          ${Q("Vendor",r(a.vendor))}
          ${Q("Purpose",r(a.purpose))}
          ${Q("Priority",r(a.priority))}
          ${c?Q("Payment status",r(a.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${aa("Requested by",Qt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+ee(a.createdAt))}
          ${a.approverEmail||a.approvedByName?aa("Approved by",Qt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+ee(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${k?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(d=>`<tr>
            <td>${r(d.itemNo)}</td>
            <td class="wrap">${r(d.description)}</td>${k?`<td>${r(d.partNo)}</td>`:""}<td>${r(d.materialType)}</td>
            <td>${r([d.qty,d.unit].filter(Boolean).join(" "))}</td>
            <td>${d.unitPrice?r(Ce(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?r(Ce(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${r(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${r(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${Pa(d.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${k?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?r(Ce(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${Q("Expected",ee(a.expectedDate))}
          ${Q("Received",ee(a.receivedAt))}
          ${Q("Tracking",Gn(a))}
          ${Q("Notes",r(a.notes))}
        </div>
        </div>
      </div>

      ${c&&((w=t.capabilities)!=null&&w.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(a.status)?`<div class="card pd-body"><h2>Payment work</h2><p>${a.financeReleased?"Sent to Finance. View responsibility and payment records.":"With admin. Hidden from Finance until you send it."}</p><a class="btn" href="#/payments/${encodeURIComponent(a.id)}">${v("wallet")} View payment details</a></div>`:""}

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${Q("PO reference",[r(a.poNo),ee(a.poDate)].filter(Boolean).join(" · "))}
          ${Q("Invoice / order #",[r(a.invoiceNo),ee(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${Q("Payment term",r(a.paymentTerm))}
          ${Q("Quotation / PI",a.quotationDoc?`<a href="${r(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${Q("Zoho Books PO",a.zohoPoNumber?r(a.zohoPoNumber):"")}
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
    </div>`,Da(e);const O=e.querySelector("#requestMore");e.onclick=d=>{O&&!O.contains(d.target)&&(O.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(O!=null&&O.open)&&(O.open=!1,O.querySelector("summary").focus())},O==null||O.addEventListener("focusout",d=>{O.contains(d.relatedTarget)||(O.open=!1)}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const L=d.dataset.to;if((L==="Rejected"||L==="Cancelled")&&!confirm(`Mark ${a.id} as ${L}?`))return;const _=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(U=>{U.disabled=!0}),d.innerHTML=v("refresh","spin")+" Updating…";try{const U=await G("transition",{id:a.id,to:L});I(a.id+" → "+L),await V.applyResult(U)}catch(U){I(U.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(X=>{X.disabled=!1}),d.innerHTML=_}});const Y=e.querySelector("#makePoBtn"),Z=e.querySelector("#sendFinanceBtn");Z&&(Z.onclick=async()=>{Z.disabled=!0;try{const d=await G("financeRelease",{id:a.id});ns(),await V.applyResult(d),I(a.id+" sent to Finance")}catch(d){I(d.message,!0),Z.disabled=!1}}),Y&&(Y.onclick=()=>{var d,L;Ee=!0,ft(e,t,s),Xe((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),(L=e.querySelector("[name=poNo]"))==null||L.focus()});const b=e.querySelector("#poCancelBtn");b&&(b.onclick=()=>{Ee=!1,ft(e,t,s)});const E=e.querySelector("#poForm"),y=E?Ca(E):null;E&&(E.onsubmit=async d=>{if(d.preventDefault(),!y())return;const L=new FormData(E),_=String(L.get("poNo")||"").trim();if(!_)return;const U=E.querySelector('button[type="submit"]');U.disabled=!0;let X;try{X=await G("update",{id:a.id,updates:{poNo:_,poDate:L.get("poDate")||"",paymentTerm:L.get("paymentTerm")||""}});const oe=await G("transition",{id:a.id,to:"Ordered"});I(a.id+" → Ordered (PO "+_+")"),Ee=!1,await V.applyResult(oe)}catch(oe){X&&await V.applyResult(X),I(oe.message,!0),U.disabled=!1}});const M=e.querySelector("#zohoPushBtn");M&&(M.onclick=async()=>{M.disabled=!0;try{const{pr:d}=await G("zohoPushPo",{id:a.id});I(a.id+" → Zoho Books PO "+d.zohoPoNumber),await V.applyResult({pr:d})}catch(d){I(d.message,!0),M.disabled=!1}});const K=e.querySelector("#devDelete");K&&(K.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){K.disabled=!0;try{const d=await G("delete",{id:a.id});I(a.id+" deleted"),location.hash="#/",await V.applyResult(d)}catch(d){I(d.message,!0),K.disabled=!1}}})}let ze=null,pe=null,bt="";const ss=["Domestic","International"];function Ct(e){return ze===null&&(ze=e.vendors||[]),ze}function rs(e){const t=e.lists&&e.lists.departments||[],s=Ct(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const re=(e,t,s,a="")=>`<label class="adm-field">${r(e)}
    <input class="adm-input" name="${t}" value="${r(s||"")}" placeholder="${r(a)}">
  </label>`;function is(e,t){const s=Ct(e),a=pe&&s.find(i=>i.name.toLowerCase()===pe.toLowerCase());if(a)return os(e,a);const n=[...s].sort((i,o)=>i.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${st(bt,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
          ${n.map(i=>`<tr class="vRow" data-name="${r(i.name)}"
            data-search="${At(i.name,i.displayName,i.category,i.type,(i.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${r(i.name)}</td>
            <td>${(i.departments||[]).map(o=>`<span class="adm-chip on">${r(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${r(i.type||"—")}</td>
            <td>${r(i.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${r(i.name)}" title="Remove vendor">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${qt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ea(n.length,n.length)}</span></div>
    </div>`}const Ea=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function os(e,t){const s=kt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],i=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${r(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?r(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${r(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${r(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${v("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${r(Ce("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${rs(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some(S=>S.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${r(o)}">${r(o)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${r(t.name)}">
        </label>
        <div class="adm-grid2">
          ${re("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${re("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${re("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...ss].map(o=>`<option value="${r(o)}" ${o===(t.type||"")?"selected":""}>${o?r(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${re("Contact person","contactPerson",t.contactPerson)}
          ${re("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${r(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${r(t.address||"")}"></label>
        <div class="adm-grid2">
          ${re("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${re("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${r(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${re("Account number","accountNumber",t.accountNumber)}
          ${re("IFSC","ifsc",t.ifsc)}
        </div>
        ${re("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${i}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${re("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function ls(e,t,s){const a=async(m,u,k)=>{try{const D=await G(m,u);ze=D.vendors,await V.applyResult(D),I(k),e.isConnected&&s()}catch(D){I(D.message,!0)}};Rt(e,{get:()=>bt,set:m=>{bt=m},count:Ea,match:m=>new Set($a(Ct(t),m).map(u=>u.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=u=>{u.target.closest(".vRm")||(pe=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){I("Vendor name required",!0);return}pe=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const i=()=>{pe=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=i);const c=e.querySelector("#vCancel");c&&(c.onclick=i),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const S=e.querySelector("#vForm");S&&(S.onsubmit=m=>{m.preventDefault();const u={};for(const[D,P]of new FormData(S))u[D]=P.trim();u.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(D=>D.dataset.dept);const k=u.name||pe;a("vendorSet",{name:pe,updates:u},`${k} saved`),pe=k})}function ds(){pe=null}const Me=["admin","approver","finance","requester"],cs={admin:"Full access to settings, users, PRs, and analytics.",approver:"Approves or rejects submitted purchase requests in their department.",finance:"Sees requests sent by admin. In progress assigns responsibility through payment completion.",requester:"Can create purchase requests and edit own submitted PRs."},na=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let ae="users",Ae=null,Ie=null,Ve="",gt="",Pe=null,Fe=null,ce=!1;const sa={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Pe,set:e=>{Pe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Fe,set:e=>{Fe=e},seed:e=>e.materialTypes}};function ms(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%na.length;return na[t]}const dt=e=>e[0].toUpperCase()+e.slice(1),us={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function be(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(Ve!==s&&(Ve=s,Ae=null,Ie=null,Pe=null,Fe=null),Ae===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${v("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const i=e.querySelector("#adminUsersLoading"),o=Ie||(Ie=G("usersList"));o.then(c=>{if(Ve===s){if(!Array.isArray(c.users))throw new Error("The server did not return users. Please retry.");Ae=c.users,e.contains(i)&&be(e,t)}}).catch(c=>{Ve!==s||!e.contains(i)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${r(c.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{Ie=null,be(e,t)})}).finally(()=>{Ie===o&&(Ie=null)});return}Pe===null&&(Pe=t.projects||[]),Fe===null&&(Fe=t.materialTypes||[]);const a=us[ae];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${a.title}</h1>
          <p>${a.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${a.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${ae==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${ae==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${ae==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${ae==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${ae==="users"?ps(t):ae==="vendors"?is(t,ce):vs(t,sa[ae])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(i=>i.onclick=()=>{ae=i.dataset.tab,ce=!1,ds(),be(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ce=!ce,be(e,t),ce){const i=e.querySelector(".adm-addrow input, .adm-addrow select");i&&i.focus()}},ae==="users"?hs(e,t):ae==="vendors"?ls(e,t,()=>{ce=!1,be(e,t)}):ys(e,t,sa[ae])}function ps(e){const t=a=>(Me.includes(a.role)?Me:[a.role,...Me]).map(n=>`<option value="${r(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?r(dt(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Ye(e).includes(a)?[a,...Ye(e)]:Ye(e)].map(n=>`<option value="${r(n)}" ${n===(a||"")?"selected":""}>${n?r(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${v("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${st(gt,"Search by name or email…")}
      ${ce?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${Me.map(a=>`<option value="${a}">${dt(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...Ae].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||at(a.email);return`<tr data-search="${At(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${ms(a.email)}">${r(wt(a.email))}${a.picture?`<img src="${r(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${v("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${qt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${Ae.length} of ${Ae.length} active members</span>
        <div class="adm-pager">
          <button disabled>${v("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${v("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${Me.map(a=>`<div class="adm-rolecard">
        <h4>${dt(a)}</h4>
        <p>${cs[a]}</p>
      </div>`).join("")}
    </div>`}function hs(e,t){Rt(e,{get:()=>gt,set:n=>{gt=n},count:(n,i)=>`Showing ${n} of ${i} active members`});const s=async(n,i,o)=>{try{const c=await G("userSet",{email:n,...i});Ae=c.users,ce=!1,await V.applyResult(c),I(o),e.isConnected&&be(e,t)}catch(c){I(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),i=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:i,department:o},`${n} → ${i}`)})}function Ye(e){const t=e.lists&&e.lists.departments||[],s=(Pe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function vs(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${st(t.q,`Search ${t.plural} by name or department…`)}
      ${ce?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Ye(e).map(a=>`<option value="${r(a)}">${r(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${At(a.department,a[t.key])}">
            <td class="adm-name">${r(a.department)}</td>
            <td>${r(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${r(a.department)}" data-val="${r(a[t.key])}" title="Remove">
                ${v("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${qt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Ma(s.length,s.length,t)}</span>
      </div>
    </div>`}const Ma=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function ys(e,t,s){Rt(e,{get:()=>s.q,set:i=>{s.q=i},count:(i,o)=>Ma(i,o,s)});const a=async(i,o,c)=>{try{const S=await G(i,o);s.set(S[s.respKey]),ce=!1,await V.applyResult(S),I(c),e.isConnected&&be(e,t)}catch(S){I(S.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const i=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:i,[s.key]:o},`${i} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(i=>i.onclick=()=>{const{dept:o,val:c}=i.dataset;confirm(`Remove "${c}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:c},`${c} removed`)})}const ra={requester:0,approver:1,finance:1,admin:2};function ia(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=ra[t.role];return s!=null&&s>=ra[e.minRole]}const Ia=document.getElementById("app"),ct={"":{fn:ya,nav:"Dashboard",icon:"grid"},vendors:{fn:On,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:Aa,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:Na,nav:"Payments",icon:"wallet",roles:["admin","finance"]},new:{fn:ts,roles:["requester","approver","admin"]},pr:{fn:ft},admin:{fn:be,nav:"Admin",icon:"settings",minRole:"admin"}};let ge,oa=null;function xa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function fs(){ge==null||ge.abort(),Ia.innerHTML=`<div class="auth-gate">
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
  </div>`,Ga(document.getElementById("gsignin"))}function Fa(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Oa(){var Z,b,E;const e=V.get(),{name:t,param:s}=xa(),a=ct[t]||ct[""],n=((Z=e.me)==null?void 0:Z.role)||"";if(e.me&&!ia(a,e.me)){location.hash="#/";return}ge==null||ge.abort(),ge=new AbortController;const i=ge.signal,o=Object.entries(ct).filter(([,y])=>{var M;return y.nav&&e.me&&ia(y,e.me)&&(y.fn!==Na||((M=e.capabilities)==null?void 0:M.financeWorkflow))}).map(([y,M])=>`<a href="#/${y}" ${t===y?'aria-current="page"':""} class="${t===y?"active":""}">${v(M.icon)}<span>${M.nav}</span>${t===y?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],S=c.filter(y=>!y.readAt).length,m=Ha()||{},u=m.email||((b=e.me)==null?void 0:b.email)||"",k=m.name||at(u),D=m.picture?`<img class="avatar" src="${r(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${r(wt(k))}</span>`,P=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=P+" · Oizom Procurement",Ia.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${v("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${o}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${v("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${v("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${v("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${r(P)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${v("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${S?", "+S+" unread":""}" aria-expanded="false" aria-controls="nPanel">${v("bell")}${S?`<span class="nbadge">${S>9?"9+":S}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${S?S+" new":"All caught up"}</span></div>
              ${c.length?c.map(y=>`<${y.prId?"a":"div"} class="nitem ${y.readAt?"":"unread"}" ${y.prId?`href="#/pr/${r(y.prId)}"`:""}><div class="nmsg">${r(y.message)}</div><div class="ntime">${r(String(y.ts).slice(0,16).replace("T"," "))}</div></${y.prId?"a":"div"}>`).join(""):`<div class="nempty">${v("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${D}<span class="profile-copy"><span class="pname">${r(k)}</span><span class="prole">${r(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${r(u)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Fa(e),document.getElementById("btnRefresh").onclick=async()=>{await V.refresh(),V.get().err||I("Data refreshed")};const h=document.getElementById("nPanel"),C=document.getElementById("nBtn"),F=document.getElementById("pMenu"),T=document.getElementById("profileBtn"),A=()=>{h.hidden=F.hidden=!0,C.setAttribute("aria-expanded","false"),T.setAttribute("aria-expanded","false")};C.onclick=()=>{var M;const y=h.hidden;A(),h.hidden=!y,C.setAttribute("aria-expanded",String(y)),y&&S&&(c.forEach(K=>{K.readAt||(K.readAt="now")}),(M=document.querySelector(".nbadge"))==null||M.remove(),G("notifRead").catch(()=>{}))},T.onclick=()=>{const y=F.hidden;A(),F.hidden=!y,T.setAttribute("aria-expanded",String(y))},document.getElementById("btnOut").onclick=Va,document.addEventListener("click",y=>{y.target.closest(".nbell, .profile-wrap")||A()},{signal:i});const j=document.getElementById("sidebar"),q=document.getElementById("workspace"),g=document.getElementById("openNav"),$=document.getElementById("shell"),x=matchMedia("(max-width: 960px)");let N=!1;const O=(y,M=!0)=>{var K;N=x.matches&&y,$.classList.toggle("nav-open",N),j.inert=x.matches&&!N,q.inert=N,document.getElementById("navBackdrop").hidden=!N,g.setAttribute("aria-expanded",String(N)),document.body.classList.toggle("nav-locked",N),N?(K=j.querySelector("nav a"))==null||K.focus():M&&x.matches&&g.focus()};O(!1,!1),g.onclick=()=>O(!0),document.getElementById("closeNav").onclick=()=>O(!1),document.getElementById("navBackdrop").onclick=()=>O(!1),j.querySelectorAll("a").forEach(y=>y.addEventListener("click",()=>O(!1),{signal:i})),x.addEventListener("change",()=>O(!1,!1),{signal:i}),document.addEventListener("keydown",y=>{if(y.key==="Escape"&&(N?O(!1):h.hidden?F.hidden||(A(),T.focus()):(A(),C.focus())),y.key==="Tab"&&N){const M=[...j.querySelectorAll("a, button")],K=M[0],H=M[M.length-1];y.shiftKey&&document.activeElement===K?(y.preventDefault(),H.focus()):!y.shiftKey&&document.activeElement===H&&(y.preventDefault(),K.focus())}},{signal:i});const Y=document.getElementById("view");if(document.querySelector(".skip-link").onclick=y=>{y.preventDefault(),Y.focus()},!e.lastSync)Y.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${r(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(E=document.getElementById("retryLoad"))==null||E.addEventListener("click",()=>V.refresh(),{signal:i});else{a.fn(Y,e,s);const y=t+"/"+(s||"");oa!==y&&Ua(Y),oa=y}}window.addEventListener("hashchange",()=>{Oa(),window.scrollTo({top:0,behavior:"instant"})});let la="",da=!1;V.subscribe(e=>{e.err&&e.err!==la&&I(e.err,!0),la=e.err;const t=!da&&e.lastSync;if(t&&(da=!0),e.lastSync&&(e.loading||e.err)||["new","payments"].includes(xa().name)&&!t&&e.lastSync&&document.querySelector("#view form")){Fa(e);return}Oa()});_a(()=>V.refresh());et()||fs();
