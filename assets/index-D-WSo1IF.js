(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var ma;const le=typeof window<"u"?(ma=window.matchMedia)==null?void 0:ma.call(window,"(prefers-reduced-motion: reduce)"):null,_e=new Set,Ua="cubic-bezier(.2,.75,.25,1)";var ua;(ua=le==null?void 0:le.addEventListener)==null||ua.call(le,"change",e=>{e.matches&&_e.forEach(t=>t.cancel())});function Xe(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||le!=null&&le.matches)return;const i=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Ua,fill:"backwards"});return i.id="workspace-reveal",_e.add(i),i.finished.then(()=>_e.delete(i),()=>_e.delete(i)),i}function ja(e){if(le!=null&&le.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Xe(a,{delay:Math.min(s++*22,154),distance:10})}}const pa={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Ze="oizom-id-token";let Ot=null;function Ha(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function et(){const e=localStorage.getItem(Ze);return e?Ha(e)<Date.now()+3e4?(localStorage.removeItem(Ze),null):e:null}function Va(){const e=et();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function _a(){localStorage.removeItem(Ze),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Ga(e){if(Ot=e,et()){e();return}$t(()=>{google.accounts.id.initialize({client_id:pa.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Ze,t.credential),Ot()}}),google.accounts.id.prompt()})}function $t(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>$t(e,t+1),100)}function Ka(e){$t(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class mt extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const ha=new Set(["list","me","usersList","health","logTail","financeList","attachmentDownload"]),za=new Set([404,408,429,500,502,503,504]),Ya=45e3;function Za(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Be(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=ha.has(e),i=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${i}). Please try syncing again.`:`Could not confirm your change (${i}). Sync and check whether it saved before submitting again.`;return new mt(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||za.has(t)})}async function Wa(e,t){const s=et();if(!s)throw new mt("SIGNED_OUT");let a;try{a=await fetch(pa.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:Ya),body:JSON.stringify({...t,action:e,token:s})})}catch(o){throw Be(e,{kind:["TimeoutError","AbortError"].includes(o.name)?"timeout":"network"})}const n=Za(a);if(!a.ok)throw Be(e,{status:a.status,stage:n,kind:"http"});let i;try{i=await a.json()}catch{throw Be(e,{stage:n,kind:"response"})}if(!i||typeof i.ok!="boolean"||i.ok&&e==="list"&&!Array.isArray(i.prs))throw Be(e,{stage:n,kind:"response"});if(!i.ok)throw new mt(i.error||"Request failed",{action:e});return i}async function z(e,t={}){for(let s=0;s<2;s++)try{return await Wa(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!ha.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function Ja(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Qa(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Xa(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function en(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Bt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,i)=>Number(n.itemNo)-Number(i.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:Xa(n),qty:en(n)}})}let Y={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const ut=new Set;let Ut=!1,Le=null,it=0;function tn(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function ot(){ut.forEach(e=>e(Y))}const K={get:()=>Y,subscribe(e){return ut.add(e),()=>ut.delete(e)},refresh(){return Le||(Y={...Y,loading:!0},Le=Promise.resolve().then(async()=>{try{let e,t;do t=it,e=await z("list");while(t!==it);tn(e),Y={prs:Bt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},Ut=!0}catch(e){if(e.message==="SIGNED_OUT"&&Ut){location.reload();return}Y={...Y,err:e.message,loading:!1}}}).finally(()=>{Le=null,Y={...Y,loading:!1},ot()}),ot(),Le)},async applyResult(e,{itemsChanged:t=!1}={}){it++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=Y.prs.find(i=>i.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return K.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const i=(e.items||(n==null?void 0:n.items)||[]).map(d=>({...d,prId:e.pr.id})),o=Bt([e.pr],i)[0];s.prs=n?Y.prs.map(d=>d.id===o.id?o:d):[...Y.prs,o]}a=!0}e.deleted&&(s.prs=Y.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=Y.me&&e.users.find(i=>i.email.toLowerCase()===Y.me.email.toLowerCase());if(Y.me&&(!n||!n.role))return K.refresh();n&&(s.me={...Y.me,role:n.role,department:n.department}),a=!0}if(!a)return K.refresh();Y={...Y,...s},ot()}},jt={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function v(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${jt[e]||jt.file}</svg>`}const r=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function tt(e){return`<span class="chip ${r(e)}" data-s="${r(e)}">${r(e)}</span>`}function F(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${v(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const te=e=>e?r(String(e).slice(0,10)):"—";function at(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function wt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Ht={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Ge=e=>Ht[e]!=null?Ht[e]:e+" ";function Ce(e,t){const s=e==="INR"?"en-IN":"en-US";return Ge(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function ie(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Ge(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Ge(e)+(t/1e3).toFixed(1)+"K":Ge(e)+Math.round(t).toLocaleString("en-US")}const Oe=["Cancelled","Rejected"],an=["Ordered","In Transit","Received"],nt=e=>an.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function Vt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function _t(e){const t=e.filter(n=>!Oe.includes(n.status)),s=e.filter(nt),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:Vt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:Vt(t)}}const We={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:nt,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Oe.includes(e.status)};function nn(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Gt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function va(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function sn(e){return e.filter(nt)}function rn(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function on(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function Kt(e,t,s){const a={};for(const n of e){const i=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(i))continue;let o;if(t==="count")o=1;else{if(Oe.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const d=Number(n.amount);if(!n.amount||!isFinite(d)||(n.currency||"Unknown")!==s)continue;o=d}a[i]=(a[i]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function ln(e,t){const s={};for(const a of e){if(Oe.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const i=a.department||"Unassigned";s[i]=(s[i]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function dn(e,t,s=6){const a={};for(const o of e){if(Oe.includes(o.status)||(o.currency||"Unknown")!==t)continue;const d=Number(o.amount);if(!o.amount||!isFinite(d))continue;const S=o.vendor||"Unspecified";a[S]=(a[S]||0)+d}const n=Object.entries(a).map(([o,d])=>({vendor:o,total:d})).sort((o,d)=>d.total-o.total);if(n.length<=s)return n;const i=n.slice(s).reduce((o,d)=>o+d.total,0);return[...n.slice(0,s),{vendor:"Other",total:i}]}function cn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function mn(e){const t=(i,o)=>{const d=Date.parse(i),S=Date.parse(o);return isFinite(d)&&isFinite(S)?(S-d)/864e5:null},s=i=>i.length?i.reduce((o,d)=>o+d,0)/i.length:null,a=e.map(i=>i.createdAt&&i.approvedAt?t(i.createdAt,i.approvedAt):null).filter(i=>i!=null&&i>=0),n=e.map(i=>i.poDate&&i.receivedAt?t(i.poDate,i.receivedAt):null).filter(i=>i!=null&&i>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const un=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function pn(e,t=Date.now()){const s=un.map(a=>({...a,count:0}));return e.filter(nt).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const i=(t-n)/864e5;(s.find(o=>i>=o.min&&i<=o.max)||s[s.length-1]).count++}),s}const qe=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],ya=["Unpaid","Paid","Partially Paid","FOC / Free"],Je={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function hn(e,t,s,a,n){const i=(Je[e]||{})[t];return i?i.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function vn(e,t,s,a){return Object.keys(Je[e]||{}).filter(n=>hn(e,n,t,s,a))}function yn(e,t){return!!(Je[e]&&Je[e][t])}const fn=["Submitted","Approved","Rejected"],zt=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],pt=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),u={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:pt()},Ne=25,bn={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let ht;function gn(e,t){u.tab=t==="admin"?"all":"dept",t==="admin"&&(u.statuses=e==="pending"?["Submitted"]:[...qe]),u.sel=["pending","unpaid"].includes(e)?e:"total",u.page=1,u.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function he(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(fa(e,t),s&&Xe(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const i=e.querySelector("#"+n.id);if(i&&(i.focus(),n.start!=null&&typeof i.setSelectionRange=="function"))try{i.setSelectionRange(n.start,n.end)}catch{}}const Yt=e=>String(e||"").slice(0,10);function $n(e){const t=u.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Yt(e.createdAt)<t.from||t.to&&Yt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function fa(e,t){clearTimeout(ht),e.innerHTML=`
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
    </div>`,wn(e.querySelector("#tabBody"),e,t)}const we=e=>e.length?e.map(([t,s])=>ie(t,s)).join(" + "):"—";function wn(e,t,s){var Lt,Nt,Dt,Et,Mt,It,Ft,xt;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",i=a.role==="admin",o=a.role==="finance",d=[(Lt=a.email)==null?void 0:Lt.toLowerCase(),a.role,(Nt=a.department)==null?void 0:Nt.toLowerCase()].join("|");u.viewer!==d&&Object.assign(u,{viewer:d,tab:i?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:pt()});const S=n?["mine","dept","approved"]:i?["all","mine"]:o?["mine",(Dt=s.capabilities)!=null&&Dt.financeHandoff?"finance":"payments"]:["mine"];S.includes(u.tab)||(u.tab="mine");const c=i&&u.statuses.length===1&&u.statuses[0]==="Approved",m=u.statuses.length===qe.length,k=u.tab==="dept",N=u.tab==="approved",C=u.tab==="all",h=u.tab==="payments",q=u.tab==="finance",O=nn(s.prs,a.email),T=o?s.prs.filter(l=>l.financeReleased):[],A=n?Gt(s.prs,a.email):[],j=n?va(s.prs,a.department):[],P=o?sn(s.prs):[],_=k?j:N?A:C?s.prs:q?T:h?P:O,b=i&&!m?_.filter(l=>u.statuses.includes(l.status)):_,g=_t(b),x=n?j.filter(We.pending):[],E=i?_t(s.prs):n?{pending:x.length,highPriority:x.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,G=c?[{key:"total",n:g.total,l:"Ready to purchase",s:C?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:g.spendTotals.length?ie(...g.spendTotals[0]):"-",l:"Approved value",s:g.spendTotals.length>1?"+ "+we(g.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:h?[{key:"total",n:g.total,l:"Awaiting payment",s:we(g.unpaidTotals)},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ie(...g.spendTotals[0]):"—",l:"Total value",s:g.spendTotals.length>1?"+ "+we(g.spendTotals.slice(1)):""}]:k?[{key:"total",n:g.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:g.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:g.unpaidCount,l:"Unpaid",s:we(g.unpaidTotals),cls:"bad"},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ie(...g.spendTotals[0]):"—",l:"Total spend",s:g.spendTotals.length>1?"+ "+we(g.spendTotals.slice(1)):""}]:[{key:"total",n:g.total,l:N?"Approved PRs":i&&!m?"Selected PRs":C?"All PRs":"Total PRs",s:N?"across all requesters":i&&!m?"Matching your selected statuses":C?"every department":""},...N?[]:[{key:"pending",n:g.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:g.unpaidCount,l:"Unpaid",s:we(g.unpaidTotals),cls:"bad"},{key:"transit",n:g.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:g.receivedPct+"%",l:"Received",s:g.received+" of "+g.total,cls:"go"},{key:"spend",n:g.spendTotals.length?ie(...g.spendTotals[0]):"—",l:N?"Approved spend":"Total spend",s:g.spendTotals.length>1?"+ "+we(g.spendTotals.slice(1)):""}];if(!i&&(!o||u.tab==="mine")){const l=G.findIndex(R=>R.key==="unpaid");l>=0&&G.splice(l,1)}if(C)for(const l of rn(b))G.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+at(l.email),s:l.email,cls:"go"});G.some(l=>l.key===u.sel)||(u.sel="total");const J=(u.sel.startsWith("ap:")?Gt(b,u.sel.slice(3)):b.filter(We[u.sel])).sort((l,R)=>(R.createdAt||"").localeCompare(l.createdAt||"")),$=G.find(l=>l.key===u.sel),I=[...new Set(b.map(l=>l.department).filter(Boolean))].sort(),y=[...new Set(b.map(l=>l.vendor).filter(Boolean))].sort();u.filters.dept&&!I.includes(u.filters.dept)&&(u.filters.dept=""),u.filters.vendor&&!y.includes(u.filters.vendor)&&(u.filters.vendor="");const L=J.filter($n),H=Object.values(u.filters).some(Boolean),V=Math.max(1,Math.ceil(L.length/Ne));u.page=Math.min(Math.max(1,u.page),V);const f=L.slice((u.page-1)*Ne,u.page*Ne),w=["dept","vendor","from","to"].filter(l=>u.filters[l]).length,M=m?"All statuses":u.statuses.join(" + "),D=i?(C?m?"All requests":c?"Approved requests":M:"Your requests")+(C?"":" · "+M):q?"Requests sent by admin":k?"Department requests":N?"Approved by you":h?"Payment queue":"Your requests",B=(l,R,U)=>`<button type="button" id="scope-${l}" class="adm-tab ${u.tab===l?"active":""}" data-tab="${l}" aria-pressed="${u.tab===l}">${R} <span>${U}</span></button>`,Z=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),ae=l=>{const R=i?qe:n&&l.status==="Submitted"&&Z(l)?fn:null;return R?`<select class="status-sel" data-status="${r(l.status)}" aria-label="Status for ${r(l.id)}" data-id="${r(l.id)}">${R.map(U=>`<option ${U===l.status?"selected":""}>${r(U)}</option>`).join("")}</select>`:tt(l.status)},me=l=>`<select class="pay-sel" aria-label="Payment status for ${r(l.id)}" data-id="${r(l.id)}">${ya.map(R=>`<option ${R===l.paymentStatus?"selected":""}>${r(R)}</option>`).join("")}</select>`,de=i?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${m?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${m}">All <span>${_.length}</span></button>
        ${zt.map((l,R)=>`<button type="button" class="view-pill ${!m&&u.statuses.includes(l)?"selected":""}" id="status-pill-${R}" data-admin-status="${r(l)}" aria-pressed="${!m&&u.statuses.includes(l)}">${l==="Submitted"?"Pending approval":r(l)}<span>${_.filter(U=>U.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${C?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${C}">Everyone</button>
        <button type="button" class="view-pill ${C?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!C}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${v("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${r(D)}</span><span class="view-result-count" role="status">${b.length} ${b.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Et=s.capabilities)!=null&&Et.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Mark In progress to take responsibility through completion.</p></div><a class="btn" href="#/payments">${v("wallet")} View payment work ${v("arrow")}</a></section>`:""}
    ${!i&&S.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${B("mine","Your requests",O.length)}
      ${n?B("dept",r(a.department||"Your department"),j.length)+B("approved","Approved by you",A.length):""}
      ${o?(Mt=s.capabilities)!=null&&Mt.financeHandoff?B("finance","Sent to Finance",T.length):B("payments","Awaiting payment",P.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${c?"approved-kpis":""}" aria-label="Filter requests by summary">${G.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===u.sel?"sel":""}" data-key="${r(l.key)}" aria-pressed="${l.key===u.sel}">
        <span class="kpi-top"><span class="l">${r(l.l)}</span>${v(bn[l.key])}</span>
        <span class="v">${r(String(l.n))}</span><span class="s">${r(l.s||(l.key==="total"?D:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${E?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?r(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${E.pending?"":"disabled"}><span class="attention-icon">${v("clock")}</span><span><b>${E.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${E.pending?"Open approval queue":"No approvals waiting"}</small></span>${v("arrow")}</button>
      ${i?`<button type="button" data-queue="unpaid" ${E.unpaidCount?"":"disabled"}><span class="attention-icon">${v("wallet")}</span><span><b>${E.unpaidCount} awaiting payment</b><small>${E.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${v("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${v("info")}</span><span><b>${E.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${de}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${L.length}</span></h2><p>${r(D)} · ${u.sel==="total"?"Latest first":r($.l)}</p></div><span class="table-hint">Select a request to view details ${v("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${v("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${r(u.filters.q)}"></label>
        ${i?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${qe.map(l=>`<option value="${r(l)}" ${u.filters.status===l?"selected":""}>${r(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${w?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${u.moreFilters}" aria-controls="advancedFilters">${v("filter")} Filters ${w?`<span class="count-badge">${w}</span>`:""}</button>
        ${H?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${u.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${I.map(l=>`<option value="${r(l)}" ${u.filters.dept===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${y.map(l=>`<option value="${r(l)}" ${u.filters.vendor===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${r(u.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${r(u.filters.to)}"></label>
        ${C?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${G.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${r(l.key)}" ${u.sel===l.key?"selected":""}>${r(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${h?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${f.map(l=>`<tr class="rowlink ${h?"payment-row":""}" data-id="${r(l.id)}">
          <td class="request-id"><a href="#/pr/${r(l.id)}">${r(l.id)}</a></td>
          <td class="request-date">${te(l.createdAt)}</td>
          ${h?`<td>${r(l.vendor)}</td><td>${r(l.poNo||"—")}</td><td>${r(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${r(l.department)}</td><td class="wrap request-item">${r(l.item)}</td><td class="request-vendor">${r(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?r(ie(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${h?me(l):ae(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${v(H?"search":"file")}<b>${H?"No matching requests":c?"No requests ready for purchasing":i&&!m?"No requests with these statuses":"No requests here yet"}</b><span>${H?"Try a different search or clear your filters.":c?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":i&&!m?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${H?'<button class="btn" id="emptyClear">Clear filters</button>':i&&!m?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${L.length?(u.page-1)*Ne+1:0}–${Math.min(u.page*Ne,L.length)} of ${L.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${u.page===1?"disabled":""}>${v("left")}</button><span>Page ${u.page} of ${V}</span><button class="btn" id="dashNext" aria-label="Next page" ${u.page===V?"disabled":""}>${v("right")}</button></div></div>
    </section>`;const ne=l=>{u.tab=l,u.sel="total",u.page=1,i&&(u.filters=pt()),he(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>ne(l.dataset.tab));const ge=()=>{u.statuses=[...qe],ne(u.tab),t.querySelector("#showAllRequests").focus()};(It=e.querySelector("#showAllRequests"))==null||It.addEventListener("click",ge),(Ft=e.querySelector("#emptyAllRequests"))==null||Ft.addEventListener("click",()=>{u.tab="all",ge()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const R=l.dataset.adminStatus;if(m)u.statuses=[R];else if(!u.statuses.includes(R))u.statuses=zt.filter(U=>U===R||u.statuses.includes(U));else if(u.statuses.length>1)u.statuses=u.statuses.filter(U=>U!==R);else return;ne(u.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>ne(l.dataset.adminScope)),(xt=e.querySelector("#resetAdminView"))==null||xt.addEventListener("click",()=>{u.statuses=["Approved"],ne("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{u.sel=l.dataset.key,u.page=1,he(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var U,Q,W;if(l.dataset.queue==="unpaid"&&((U=s.capabilities)!=null&&U.financeWorkflow)){location.hash="#/payments";return}if(!i&&!(n&&l.dataset.queue==="pending"))return;gn(l.dataset.queue,a.role),he(t,s);const R=t.querySelector(".requests-card");R.focus({preventScroll:!0}),(W=R.scrollIntoView)==null||W.call(R,{block:"start",behavior:(Q=window.matchMedia)!=null&&Q.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=R=>{R.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{u.moreFilters=!u.moreFilters,e.querySelector("#advancedFilters").hidden=!u.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(u.moreFilters))};const Ae=e.querySelector("#dashApprover");Ae&&(Ae.onchange=()=>{u.sel=Ae.value,u.page=1,he(t,s)});const Te=l=>{var R,U;u.page+=l,he(t,s),(U=(R=t.querySelector(".requests-card")).scrollIntoView)==null||U.call(R,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>Te(-1),e.querySelector("#dashNext").onclick=()=>Te(1);const ee=(l,R)=>{u.filters[l]=R,u.page=1,he(t,s)};e.querySelector("#dashQ").oninput=l=>{u.filters.q=l.target.value,u.page=1,clearTimeout(ht),ht=setTimeout(()=>{t.isConnected&&he(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>ee("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>ee("vendor",l.target.value);const se=e.querySelector("#dashStatus");se&&(se.onchange=l=>ee("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>ee("from",l.target.value),e.querySelector("#dashTo").onchange=l=>ee("to",l.target.value);const $e=()=>{u.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},u.page=1,u.sel="total",he(t,s)},Pt=e.querySelector("#dashFilterClear"),Tt=e.querySelector("#emptyClear");Pt&&(Pt.onclick=$e),Tt&&(Tt.onclick=$e),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,U=s.prs.find(W=>W.id===R),Q=l.value;if(!(!U||Q===U.status)){if((Q==="Rejected"||Q==="Cancelled")&&!confirm(`Mark ${R} as ${Q}?`)){l.value=U.status;return}l.disabled=!0;try{let W;a.role==="admin"&&!yn(U.status,Q)?W=await z("update",{id:R,updates:{status:Q}}):W=await z("transition",{id:R,to:Q}),F(`${R} → ${Q}`),await K.applyResult(W)}catch(W){F(W.message,!0),l.value=U.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,U=s.prs.find(W=>W.id===R),Q=l.value;if(!(!U||Q===U.paymentStatus)){l.disabled=!0;try{const W=await z("update",{id:R,updates:{paymentStatus:Q}});F(`${R} payment → ${Q}`),await K.applyResult(W)}catch(W){F(W.message,!0),l.value=U.paymentStatus,l.disabled=!1}}}})}function St(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function kt(e,t){const s=St(e,t),a=s.filter(We.spend),n={};for(const i of a){const o=Number(i.amount);if(!i.amount||!isFinite(o))continue;const d=i.currency||"INR";n[d]=(n[d]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((i,o)=>o[1]-i[1]),unpaid:s.filter(We.unpaid).length,lastOrder:s.reduce((i,o)=>{const d=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(d)&&d>i?d:i},"")}}function ba(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(St(t,e.name).filter(i=>i.amount&&isFinite(Number(i.amount))).map(i=>i.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(i=>i!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Sn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],kn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},An=1,Rn=.7,ga=.5,qn=.4,Cn=.3,Pn=4,Tn=e=>e.length>=7?2:e.length>=Pn?1:0,Qe=e=>String(e??"").toLowerCase().trim();function Ln(e,t){const s=e[t];return Qe(Array.isArray(s)?s.join(" "):s)}function $a(e){return Qe(e).split(/[\s,]+/).filter(Boolean)}function Nn(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let i=1;i<=t.length;i++)n[i]=Math.min(s[i]+1,n[i-1]+1,s[i-1]+(e[a-1]===t[i-1]?0:1));s=n}return s[t.length]}function Zt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return An;if(s.some(n=>n.startsWith(t)))return Rn;if(e.includes(t))return ga;const a=Tn(t);return a&&s.some(n=>Nn(n,t)<=a)?Cn:0}function Dn(e,t){const s=Zt(e,t);if(s)return s;const a=kn[t];return a&&a.some(i=>i.includes(" ")?e.includes(i):Zt(e,i)>=ga)?qn:0}function En(e,t){const s=Array.isArray(t)?t:$a(t);if(!s.length)return 0;let a=0;for(const n of s){let i=0;for(const{key:o,weight:d}of Sn)i=Math.max(i,Dn(Ln(e,o),n)*d);if(!i)return 0;a+=i}return a}function wa(e,t){const s=$a(t);return s.length?(e||[]).map(a=>({v:a,score:En(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Qe(a.v.displayName||a.v.name).localeCompare(Qe(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function st(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${v("search")}
        <input aria-label="${r(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${r(t)}" value="${r(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${v("close")}
        </button>
      </div>
    </div>`}const At=(...e)=>r(e.filter(Boolean).join(" ").toLowerCase());function Rt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${r(t)}</td></tr>`}function qt(e,{get:t,set:s,count:a,id:n="admSearch",match:i=null}){const o=e.querySelector("#"+n);if(!o)return;const d=o.closest(".adm-card"),S=d.querySelector(".admSearchClear"),c=()=>Mn(d,t(),a,i);o.oninput=()=>{s(o.value),S.hidden=!o.value,c()},o.onkeydown=m=>{m.key==="Escape"&&o.value&&(o.value="",o.oninput())},S.onclick=()=>{o.value="",o.oninput(),o.focus()},c()}function Mn(e,t,s,a){const n=t.trim().toLowerCase(),i=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let d=null;i.forEach(m=>{m.hidden=n?o?!o.has(m.dataset.name):!m.dataset.search.includes(n):!1,m.classList.remove("last-visible"),m.hidden||(d=m)}),d&&d.classList.add("last-visible");const S=e.querySelector(".adm-nomatch");S&&(S.hidden=!!d||!i.length);const c=e.querySelector(".adm-count");c&&(c.textContent=s(i.filter(m=>!m.hidden).length,i.length))}let De="";const Sa={Domestic:"dom",Foreign:"for",Mixed:"mix"},In=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function ka(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${r(In(e.displayName||e.name))}${t?`<img src="${r(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Fn(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${r(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function xn(e,t){const s=kt(e.prs,t.name),a=ba(t,e.prs),n=s.spendTotals.length?ie(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${r(t.name)}">
      <div class="vc-top">
        ${ka(t)}
        <div class="vc-title">
          <b>${r(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${r(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Sa[a]}">${r(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${r(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${te(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Fn(t)}</div>
    </a>`}const On=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Wt(e,t){const s=On(e.vendors),a=t.trim()?wa(s,t):s;return a.length?a.map(n=>xn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${r(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Bn(e,t,s){if(s)return Un(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${st(De,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Wt(t,De)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),i=e.querySelector(".admSearchClear"),o=()=>{De=n.value,i.hidden=!De,a.innerHTML=Wt(t,De)};n.oninput=o,n.onkeydown=d=>{d.key==="Escape"&&n.value&&(n.value="",o())},i.onclick=()=>{n.value="",o(),n.focus()}}function Un(e,t,s){const a=(t.vendors||[]).find(c=>c.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${r(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=kt(t.prs,a.name),i=ba(a,t.prs),o=t.me&&t.me.role==="admin",d=St(t.prs,a.name).sort((c,m)=>(m.createdAt||"").localeCompare(c.createdAt||"")),S=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,c])=>c);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${ka(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${r(a.displayName||a.name)}
              ${i?`<span class="vc-badge ${Sa[i]}">${r(i.toUpperCase())}</span>`:""}
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
        <div class="kpi"><div class="v">${n.spendTotals.length?r(ie(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?r(n.spendTotals.slice(1).map(([c,m])=>ie(c,m)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${te(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${S.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${S.map(([c,m])=>`<div><span class="vc-l">${r(c)}</span><b>${r(m)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(c=>`<span class="vc-chip">${r(c)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${d.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${d.map(c=>`<tr class="rowlink" data-id="${r(c.id)}">
            <td style="font-family:var(--mono);font-size:12px">${r(c.id)}</td>
            <td>${te(c.createdAt)}</td><td>${r(c.department)}</td>
            <td class="wrap">${r(c.item)}</td>
            <td>${c.amount?r(ie(c.currency||"INR",Number(c.amount))):"—"}</td>
            <td>${tt(c.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(c=>c.onclick=()=>location.hash="#/pr/"+c.dataset.id)}const vt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Aa=new Map(vt.map(e=>[e.code,e])),jn=e=>Aa.has(String(e||"").trim().toUpperCase());function yt(e){const t=Aa.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Hn(e){const t=String(e||"").trim().toLowerCase(),s=t?vt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...vt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,i)=>a(n)-a(i)||n.code.localeCompare(i.code))}function Ue(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const i=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",d=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${r(d)}">
      <span class="barlabel">${r(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${i.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${r(t(n.value))}</span>
    </div>`}).join("")}</div>`}function Jt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},i=s-n.l-n.r,o=a-n.t-n.b,d=Math.max(...e.map(T=>T.value),1),S=i/(e.length-1),c=T=>n.l+T*S,m=T=>n.t+o-T/d*o,k=e.map((T,A)=>`${A===0?"M":"L"}${c(A).toFixed(1)} ${m(T.value).toFixed(1)}`).join(" "),N=`${k} L${c(e.length-1).toFixed(1)} ${n.t+o} L${c(0).toFixed(1)} ${n.t+o} Z`,C=[0,.5,1].map(T=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-T)).toFixed(1)}" y2="${(n.t+o*(1-T)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),h=Math.ceil(e.length/6)||1,q=e.map((T,A)=>A%h===0||A===e.length-1?`<text x="${c(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${r(T.month.slice(2))}</text>`:"").join(""),O=e.map((T,A)=>`<circle cx="${c(A).toFixed(1)}" cy="${m(T.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${r(T.month)}: ${r(t(T.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${C}
    <path d="${N}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${k}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${O}
    ${q}
  </svg>`}const Vn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],_n={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},Gn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},je={currency:""};function Ra(e,t){var P,_;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?va(t.prs,s.department):t.prs||[],i=on(n);i.includes(je.currency)||(je.currency=i[0]||"");const o=je.currency,d=b=>o?ie(o,b):String(b),S=o?Kt(n,"spend",o):[],c=Kt(n,"count"),m=o?dn(n,o,6).map(b=>({label:b.vendor,value:b.total})):[],k=!a&&o?ln(n,o).map(b=>({label:b.department,value:b.total})):[],N=cn(n),C=Vn.filter(b=>N[b]).map(b=>({label:b,value:N[b]})),h=mn(n),q=pn(n),O=q.map(b=>({label:b.label,value:b.count})),T=q.reduce((b,g)=>b+g.count,0),A=S.reduce((b,g)=>b+g.value,0);e.innerHTML=`
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
        <select id="insCur" aria-describedby="insCurHelp">${i.map(b=>`<option value="${r(b)}" ${b===o?"selected":""}>${r(yt(b))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?r(d(A)):"—"}</div><div class="l">Total spend${o?" · "+r(o):""}</div></div>
        <div class="kpi"><div class="v">${h.avgApprovalDays!=null?h.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${h.avgDeliveryDays!=null?h.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((P=t.me)==null?void 0:P.role)==="admin"?`<div class="kpi ${T?"warn":""}"><div class="v">${T}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+r(o):""}</p></div>
          </div>
          <div class="spend-chart">${S.length?Jt(S,{valueFmt:b=>ie(o,b),height:180}):`<div class="trend-empty">${v("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${k.length?`<div class="card"><h2>Spend by department${o?" · "+r(o):""}</h2>
          <div class="pd-body">${Ue(k,{valueFmt:d})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+r(o):""}</h2>
          <div class="pd-body">${Ue(m,{valueFmt:d})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${Ue(C,{colorOf:b=>_n[b.label]||"var(--mut)"})}</div></div>
        ${((_=t.me)==null?void 0:_.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${Ue(O,{colorOf:b=>Gn[b.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${Jt(c,{valueFmt:b=>b+" PR"+(b===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var b;je.currency=j.value,Ra(e,t),(b=e.querySelector("#insCur"))==null||b.focus()})}const qa={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Ca(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Kn(e){const t=String(e.trackingNo||"").trim(),s=Ca(e.trackingLink)||(t?(qa[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[r(e.courier||""),s?`<a href="${r(s)}" target="_blank" rel="noopener noreferrer">${r(t||"Track shipment")} ↗</a>`:r(t)].filter(Boolean).join(" ")}function zn(e,t=[]){const s=[...new Set([...t,...Object.keys(qa),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${r(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${r(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${r(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${r(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function Yn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Ca(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const Zn="1900-01-01",Wn="2100-12-31",Jn="Enter a complete date with a year between 1900 and 2100.";function Fe(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Pa(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(Jn)};return t.forEach(a=>{a.min=Zn,a.max=Wn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const Qn=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function rt(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function Ta(e){return`<div class="attachment-links">${rt(e).map(t=>`<button type="button" class="attachment-link" data-download="${r(t.id)}">${v("file")}${r(t.name)}</button>`).join("")}</div>`}function La(e=[]){return`<div class="attachment-picker" data-attachments="${r(JSON.stringify(rt(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${v("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${Qn}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const Xn=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function Na(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=rt(e.dataset.attachments).map(m=>({attachment:m})),i=e.querySelector(".attachment-selection"),o=e.querySelector("input"),d=e.querySelector(".attachment-status"),S=()=>{e.dataset.attachments=JSON.stringify(n.filter(m=>m.attachment).map(m=>m.attachment))},c=()=>{i.innerHTML=n.map((m,k)=>{var N,C;return`<div class="attachment-chip">${v("file")}<span>${r(((N=m.attachment)==null?void 0:N.name)||m.file.name)}${m.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${k}" aria-label="Remove ${r(((C=m.attachment)==null?void 0:C.name)||m.file.name)}" ${a?"disabled":""}>${v("close")}</button></div>`}).join(""),i.querySelectorAll("[data-remove]").forEach(m=>m.onclick=()=>{a||(n.splice(Number(m.dataset.remove),1),S(),c())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const m=[...o.files];if(n.length+m.length>3)throw new Error("Attach up to 3 files per item or payment");for(const k of m){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(k.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!k.size||k.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}m.forEach(k=>n.push({file:k,operationId:crypto.randomUUID()})),d.textContent="Files will upload when you save.",c()}catch(m){F(m.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var m;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,c();try{for(const k of n){if(k.attachment)continue;d.textContent="Uploading "+k.file.name+"…";const N=await z("attachmentUpload",{scope:t,prId:s,name:k.file.name,operationId:k.operationId,base64:await Xn(k.file)});if(!((m=N.attachment)!=null&&m.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");k.attachment=N.attachment,S(),c()}return d.textContent=n.length?"Attachments ready.":"",n.map(k=>k.attachment)}catch(k){throw d.textContent="Upload not confirmed. Your selected files are kept here for retry.",k}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,c()}},e.hasPendingFiles=()=>n.some(m=>!m.attachment),c()}function Da(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await z("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),i=document.createElement("a");i.href=n,i.download=s.attachment.name,i.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){F(s.message,!0)}finally{t.disabled=!1}}})}const es=ya,ts={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ke=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:ts[t])||[],lt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ue=(e,t,s)=>`<span class="lblrow">${r(e)}${lt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${r(lt[t])}" data-tip="${r(lt[t])}">?</span>`:""}</span>`;function Se(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${r(n)}" ${n===t?"selected":""}>${n?r(n):"Select…"}</option>`).join("")}function Qt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${r(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${r(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${r(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${r(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${Se(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${r(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${Se([...new Set([...Ke(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${r(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${r(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${r(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${v("close")}</button>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${La(t.attachments)}</div>
  </div>`}function He(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:rt((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function as(e,t,s){var V;const a=s?t.prs.find(f=>f.id===s):null,n=a||{},i=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const d=a?n.department||"":o.department||"",S=(t.projects||[]).filter(f=>f.department.toLowerCase()===d.toLowerCase()).map(f=>f.project),c=(t.vendors||[]).filter(f=>(f.departments||[]).some(w=>w.toLowerCase()===d.toLowerCase())),m=f=>{const w=c.find(M=>M.name.toLowerCase()===String(f||"").toLowerCase());return w?w.displayName||w.name:String(f||"")},k=(t.materialTypes||[]).filter(f=>f.department.toLowerCase()===d.toLowerCase()).map(f=>f.materialType),N=d.toLowerCase()==="production";e.innerHTML=`
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
        ${d?"":'<div class="card" role="status">A department is needed to create a request. Ask an admin to assign your department in Admin → Users, then refresh.</div>'}
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${ue("Project*","project")} <select name="project" required>${Se(S,n.project||"",!0)}</select></label>
              <label>${ue("Purpose","purpose")} <input name="purpose" value="${r(n.purpose)}"></label>
              <div class="pd-field full">${ue("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${r(m(n.vendor))}">
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
              <label>${ue("Priority","priority",!0)} <select name="priority">${Se(Ke(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Fe(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((V=t.capabilities)!=null&&V.financeWorkflow)?`
              <label>${ue("Payment status*","payment")} <select name="paymentStatus" required>${Se(es,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${Se(qe,n.status)}</select></label>
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
              <label>PO date <input name="poDate" type="date" value="${r(Fe(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${r(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${r(Fe(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${Se(Ke(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${r(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${zn(n,Ke(t,"couriers"))}
          <label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Fe(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${i.map((f,w)=>Qt(t,f,w,k,N)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${v("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${v("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const C=e.querySelector("#prForm"),h=Pa(C),q=e.querySelector("#itemRows"),O=()=>{const f=He(C).map(p=>{const D=Ja(p.qty,p.unitPrice);return{lineTotal:D!==""?D:p.lineTotal}}),w=Qa(f),M=C.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=w===""?"":"Total: "+Ce(M,w)},T=f=>{Na(f.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),f.querySelector(".rmItem").onclick=()=>{q.children.length>1&&(f.remove(),O())},f.querySelectorAll("input, select").forEach(w=>w.oninput=O)};[...q.children].forEach(T),O();const A=(f,w,M,{search:p,resolve:D,toLabel:B,allowEmpty:Z,onCommit:ae,onSelect:me})=>{const de=e.querySelector("#"+f),ne=e.querySelector("#"+w),ge=C.querySelector(`[name="${M}"]`),Ae=()=>{ae&&ae()},Te=ee=>{const se=p(ee).slice(0,30);ne.innerHTML=se.map($e=>`<div class="curOpt" data-v="${r($e.value)}"><b>${r($e.main)}</b> ${r($e.name||"")}<span>${r($e.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',ne.hidden=!1};de.onfocus=()=>{de.select(),Te("")},de.oninput=()=>Te(de.value),ne.onmousedown=ee=>{ee.preventDefault();const se=ee.target.closest(".curOpt");if(se){if(me!=null&&me(se.dataset.v)){ne.hidden=!0;return}ge.value=se.dataset.v,de.value=B(se.dataset.v),ne.hidden=!0,Ae()}},de.onblur=()=>setTimeout(()=>{ne.hidden=!0;const ee=de.value.trim();if(!ee&&Z)ge.value="";else{const se=D(ee);se!=null&&(ge.value=se)}de.value=B(ge.value),Ae()},120)};A("curSearch","curList","currency",{search:f=>Hn(f).map(w=>({value:w.code,main:w.code,name:w.name,sub:w.sym||""})),resolve:f=>{const w=f.split("—")[0].trim().toUpperCase();return jn(w)?w:null},toLabel:f=>yt(f),onCommit:O});const j=f=>{const w=String(f||"").trim().toLowerCase();return c.filter(M=>!w||M.name.toLowerCase().includes(w)||(M.displayName||"").toLowerCase().includes(w)||(M.category||"").toLowerCase().includes(w)).sort((M,p)=>(M.displayName||M.name).localeCompare(p.displayName||p.name)).slice(0,29).map(M=>({value:M.name,main:M.displayName||M.name,name:M.displayName?M.name:"",sub:M.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let P=!1;const _=e.querySelector("#manualVendorField"),b=e.querySelector("#manualVendorName"),g=C.querySelector('[name="vendor"]'),x=f=>{P=f,_.hidden=!f,b.required=f},E=e.querySelector("#venHint"),G=()=>{const f=C.querySelector('[name="vendor"]').value.trim();E.hidden=!f||c.some(w=>w.name.toLowerCase()===f.toLowerCase())};A("venSearch","venList","vendor",{search:j,resolve:f=>{if(P)return b.value.trim();const w=c.find(M=>M.name.toLowerCase()===f.toLowerCase()||(M.displayName||"").toLowerCase()===f.toLowerCase());return w?w.name:f},toLabel:f=>P?"Other — enter manually":m(f),onSelect:f=>(x(f==="__other__"),P?(g.value=b.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",b.focus(),G(),!0):!1),allowEmpty:!0,onCommit:G}),b.oninput=()=>{g.value=b.value.trim(),G()};const J=e.querySelector("#venSearch"),$=J.oninput;J.oninput=()=>{x(!1),$()},G(),e.querySelector("#addItem").onclick=()=>{q.insertAdjacentHTML("beforeend",Qt(t,{},q.children.length,k,N)),T(q.lastElementChild),Xe(q.lastElementChild)};const I=C.elements.namedItem("trackingLink");I&&(I.oninput=()=>I.setCustomValidity(""));const y=()=>Object.fromEntries([...new FormData(C)].filter(([f])=>!f.startsWith("i_"))),L=y(),H=JSON.stringify(He(C));C.onsubmit=async f=>{f.preventDefault();const w=e.querySelector("#prSave");if(w.disabled||!h()||!Yn(I))return;if(P&&!b.value.trim()){b.reportValidity();return}e.querySelectorAll(".pr-save").forEach(D=>{D.disabled=!0,D.innerHTML=v("refresh","spin")+" Saving…"}),w.disabled=!0,w.textContent="Saving…";const M=y();let p=He(C);try{if(!p.length&&(!a||JSON.stringify(p)!==H))throw new Error("Add at least one item with a description");for(const B of q.children)B.querySelector('[name="i_description"]').value.trim()&&await B.querySelector(".attachment-picker").uploadFiles();p=He(C);const D=JSON.stringify(p)!==H;if(a){const B=Object.fromEntries(Object.entries(M).filter(([Z,ae])=>ae!==L[Z]));if(Object.keys(B).length||D){const Z=await z("update",{id:n.id,updates:B,...D?{items:p}:{}});await K.applyResult(Z,{itemsChanged:D}),F("PR updated")}location.hash="#/pr/"+n.id}else{const B=await z("create",{pr:M,items:p});await K.applyResult(B,{itemsChanged:!0}),F("Created "+B.pr.id),location.hash="#/pr/"+B.pr.id}}catch(D){F(D.message,!0),w.disabled=!1,w.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(B=>{B.disabled=!1,B.textContent=a?"Save changes":"Submit request"})}}}function Xt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const i=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),d=String(a||"").trim();return i&&o&&i===o&&d?d:at(t)}const ea=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],ns=e=>e==="Open"?"Outstanding":e;let ye={viewer:"",sync:null,data:null,pending:null},ve="Open";function ss(){ye.data=null}const Re=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Ce(e.currency,t),ta=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Ea(e,t,s){var C;const a=t.me;if(!a||!["admin","finance"].includes(a.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((C=t.capabilities)!=null&&C.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const n=a.email+"|"+a.role,i=String(t.lastSync);(ye.viewer!==n||ye.sync!==i)&&(ye={viewer:n,sync:i,data:null,pending:null},ve="Open");const o=ye,d=async(h=!1)=>{if(h&&(o.data=null),!o.data){e.innerHTML=`<div class="connection-state" role="status">${v("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{o.pending||(o.pending=z("financeList").finally(()=>{o.pending=null}));const q=await o.pending;if(!Array.isArray(q.tasks)||!Array.isArray(q.financeUsers))throw new Error("The server did not return payment records.");o.data=q}catch(q){if(!e.isConnected||ye!==o)return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${r(q.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>d(!0);return}}!e.isConnected||ye!==o||k()};let S="",c=1,m=!1;const k=()=>{var E,G,J;const{tasks:h,financeUsers:q}=o.data,O=a.role==="admin",T=O?["Awaiting admin",...ea]:ea,A=s&&h.find($=>$.prId===s),j=$=>ve==="All"||(ve==="Open"?$.state!=="Completed":ve==="Mine"?$.owner===a.email:$.state===ve),P=h.filter(j).filter($=>[$.prId,$.poNo,$.vendor,$.owner].join(" ").toLowerCase().includes(S.toLowerCase())),_=Math.max(1,Math.ceil(P.length/25));c=Math.min(c,_);const b=(O?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map($=>[$,h.filter(I=>I.state===$).length]);if(e.innerHTML=`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${O?"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${v("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${b.map(([$,I])=>`<button class="kpi clickable" data-stage="${$}"><span class="l">${$}</span><span class="v">${I}</span></button>`).join("")}</div>
      ${A?N(A,O,q):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${O?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${h.length}</span></h2><p>${O?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${T.map($=>`<button class="view-pill ${$===ve?"selected":""}" data-stage="${$}" aria-pressed="${$===ve}">${ns($)}</button>`).join("")}</div>
      <label class="search-input">${v("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${r(S)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${P.slice((c-1)*25,c*25).map($=>`<tr><td><a href="#/payments/${encodeURIComponent($.prId)}"><b>${r($.prId)}</b></a><small class="finance-sub">${r($.vendor)}</small></td><td>${r($.poNo||"—")}</td><td>${r(Re($,$.outstanding))}<small class="finance-sub">${r($.paymentStatus)}</small></td><td>${r($.owner||"Not started")}</td><td><span class="finance-status" data-state="${r($.state)}">${r($.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent($.prId)}" aria-label="View payment details ${r($.prId)}">View details ${v("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${c===1?"disabled":""}>Previous</button><span>${P.length} results · Page ${c} of ${_}</span><button class="btn" id="financeNext" ${c===_?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${v("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${O?`<p class="finance-note">${v("info")} ${r(((E=o.data.zoho)==null?void 0:E.message)||"")}</p>`:""}
    </div>`,e.querySelector("#reloadPayments").onclick=()=>{m||d(!0)},e.querySelectorAll("[data-stage]").forEach($=>$.onclick=()=>{m||(ve=$.dataset.stage,c=1,k())}),e.querySelector("#financeSearch").oninput=$=>{if(m)return;S=$.target.value,c=1,k(),e.querySelector("#financeSearch").focus()},e.querySelector("#financePrev").onclick=()=>{c--,k()},e.querySelector("#financeNext").onclick=()=>{c++,k()},!A)return;Da(e);const g=async($,I)=>{if(!m){m=!0,e.querySelectorAll(".finance-detail button").forEach(y=>{y.disabled=!0});try{const y=await z($,{id:A.prId,...I});if(!y.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");o.data.tasks=o.data.tasks.map(L=>L.prId===A.prId?y.task:L),e.isConnected&&ye===o&&k(),await K.applyResult(y),F($==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(y){F(y.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(L=>{L.disabled=!1})}finally{m=!1}}};e.querySelectorAll("[data-progress]").forEach($=>$.onclick=()=>g("financeProgress",{state:$.dataset.progress})),(G=e.querySelector("#remindFinance"))==null||G.addEventListener("click",()=>g("financeRemind",{})),(J=e.querySelector("#sendToFinance"))==null||J.addEventListener("click",()=>g("financeRelease",{}));const x=e.querySelector("#recordPayment");if(x){const $=x.querySelector(".attachment-picker");Na($,{scope:"payment",prId:A.prId});const I=x.elements.amount,y=()=>{const V=x.elements.paymentMode.value==="full";I.readOnly=V,I.max=V?String(A.outstanding):(Math.round(A.outstanding*(A.currency==="JPY"?1:100))-1)/(A.currency==="JPY"?1:100),I.value=V?String(A.outstanding):"",e.querySelector("#paymentAmountHint").textContent=V?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",V||I.focus()};x.querySelectorAll('[name="paymentMode"]').forEach(V=>V.onchange=y),y();const L="finance-attempt:"+a.email+":"+A.prId,H=V=>{const f=JSON.stringify(V);let w;try{w=JSON.parse(sessionStorage.getItem(L))}catch{}const M=(w==null?void 0:w.signature)===f?w:{signature:f,id:crypto.randomUUID()};return sessionStorage.setItem(L,JSON.stringify(M)),M.id};x.onsubmit=async V=>{if(V.preventDefault(),!(m||!x.reportValidity())){m=!0,x.querySelector('[type="submit"]').disabled=!0;try{const f=await $.uploadFiles(),w=Object.fromEntries(new FormData(x));w.currency=A.currency,w.paymentMode==="full"&&(w.amount=String(A.outstanding)),f.length&&(w.attachments=f),m=!1,await g("financeRecordPayment",{...w,operationId:H(w)})}catch(f){F(f.message,!0)}finally{m=!1,x.isConnected&&(x.querySelector('[type="submit"]').disabled=!1)}}}}for(const[$,I]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const y=e.querySelector("#"+$);y&&(y.onsubmit=L=>{L.preventDefault(),y.reportValidity()&&g(I,Object.fromEntries(new FormData(y)))})}},N=(h,q,O)=>{const T=h.owner===a.email.toLowerCase(),A=q||T,j=h.released&&!h.issue&&h.state!=="Completed";return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${r(h.vendor)}</span><h2>${r(h.prId)}</h2><p>${r(h.poNo||"PO reference not recorded")} · Request: ${r(h.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(h.prId)}">Request &amp; delivery ${v("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${r(Re(h,h.total))}</b></div><div><span>Recorded paid</span><b>${r(Re(h,h.paid))}</b></div><div><span>Outstanding</span><b>${r(Re(h,h.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${r(h.state)}">${r(h.state)}</span><span>Responsible: <b>${r(h.owner||"Not started")}</b></span></div>
      ${h.issue?`<p class="finance-alert" role="status">${r(h.issue)}</p>`:""}
      ${h.released?`<p class="finance-note">Sent to Finance ${r(te(h.sentAt))} by ${r(h.sentBy||"admin")}.</p>`:'<p class="finance-note">This request is with admin. Finance cannot see it until you send it.</p>'}
      ${!q&&h.owner&&!T?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${q&&!h.released&&!h.issue&&h.state!=="Completed"?'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${j&&(h.owner?A:!q)&&h.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${j&&A&&h.owner&&h.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${q&&h.released&&h.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${h.lastReminderAt?`<p class="finance-note">Last reminder: ${r(new Date(h.lastReminderAt).toLocaleString())}</p>`:""}
      ${q&&!h.owner&&j?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${j&&A&&h.owner&&h.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <fieldset class="payment-mode"><legend>Payment amount</legend><div class="payment-mode-options">
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${r(Re(h,h.outstanding))}</small></span></label>
          <label><input type="radio" name="paymentMode" value="partial"><span><b>Partial payment</b><small>Enter the amount paid</small></span></label>
        </div></fieldset><p class="full finance-note" id="paymentAmountHint"></p>
        <label>Amount (${r(h.currency)})<input name="amount" type="number" step="${h.currency==="JPY"?"1":"0.01"}" min="${h.currency==="JPY"?"1":"0.01"}" max="${h.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${ta()}" value="${ta()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <div class="full"><h4>Payment proof (optional)</h4>${La()}</div>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${q&&h.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${r(h.currency)})<input name="amount" type="number" min="0" max="${h.total}" step="${h.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${q&&h.released&&h.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${O.map(P=>`<option value="${r(P.email)}" ${P.email===h.owner?"selected":""}>${r(P.name||P.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${h.payments.map(P=>`<article><div><b>${r(Re(h,P.amount))}</b><span>${r(te(P.date))} · ${r(P.reference)}</span></div><p>${r(P.recordedBy)}${P.note?" · "+r(P.note):""}</p>${/^https:\/\//i.test(P.proofUrl||"")?`<a href="${r(P.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${v("external")}</a>`:""}${Ta(P.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await d()}const X=(e,t)=>`<div class="pd-f"><span class="vc-l">${r(e)}</span><b>${t||"—"}</b></div>`;let Ee=!1,aa=null;const na=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${r(wt(s||t))}</span>
    <div>
      <span class="vc-l">${r(e)}</span>
      <b>${r(t)}</b>
      <div class="pd-sub">${r(a||"")}</div>
    </div>
  </div>`;function ft(e,t,s){var V,f,w,M;const a=t.prs.find(p=>p.id===s);if(!a){e.innerHTML=`<div class="card">PR ${r(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}aa!==s&&(Ee=!1,aa=s);const n=t.me||{role:"",email:"",department:""},i=n.role==="admin",o=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),d=i||n.role==="finance"&&(!((V=t.capabilities)!=null&&V.financeHandoff)||a.financeReleased),S=i||o&&a.status==="Submitted",c=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),m=vn(a.status,n.role,o,c),k=(a.department||"").toLowerCase()==="production",N=i&&a.status==="Approved",C=i&&((f=t.capabilities)==null?void 0:f.financeHandoff)&&!a.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(a.status)&&!["Paid","FOC / Free"].includes(a.paymentStatus),h=i&&a.poNo&&!a.zohoPoId&&!((w=t.capabilities)!=null&&w.financeWorkflow),q=N?"":m.find(p=>!["Rejected","Cancelled","On Hold"].includes(p)),O=m.filter(p=>p!==q),T=p=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[p]||"Mark "+p.toLowerCase(),A=p=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[p]||"arrow",j=["Submitted","Approved","Ordered","In Transit","Received"],P=j.indexOf(a.status),_=(t.vendors||[]).find(p=>String(p.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),b=a.paymentTerm||_&&_.paymentTerms||"",g=t.lists&&t.lists.paymentTerms||[],x=["",...b&&!g.includes(b)?[b,...g]:g].map(p=>`<option value="${r(p)}" ${p===b?"selected":""}>${p?r(p):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${v("right")}<span>${r(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${r(a.id)}</h1>${tt(a.status)}</div>
          <p class="request-subtitle">${r(a.project||a.department||"Purchase request")} · Created ${te(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${C?`<button class="btn primary" id="sendFinanceBtn">${v("wallet")} Send to Finance</button>`:""}
          ${N?`<button class="btn primary" id="makePoBtn">${v("file")} Create purchase order</button>`:""}
          ${q?`<button class="btn primary" data-to="${r(q)}">${v(A(q))}${r(T(q))}</button>`:""}
          ${S?`<a class="btn" href="#/new/${r(a.id)}">${v("edit")} Edit</a>`:""}
          ${O.length||h?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${v("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${h?`<button class="btn" id="zohoPushBtn">${v("arrow")} Send to Zoho Books</button>`:""}
              ${O.map(p=>`<button class="btn ${["Rejected","Cancelled"].includes(p)?"danger":""}" data-to="${r(p)}">${v(A(p))}${r(T(p))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${r(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${P===-1?"Currently "+r(a.status.toLowerCase()):P===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${j.map((p,D)=>`<li class="${D<P?"done":D===P?"current":""}" ${D===P?'aria-current="step"':""}><span class="step-dot">${D<P?v("check"):D+1}</span><span>${r(p)}</span></li>`).join("")}</ol>
      </section>

      ${N&&Ee?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${r(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${r(Fe(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${x}</select>
          </label>
          ${_&&_.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${r(_.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${X("Department",r(a.department))}
          ${X("Project",r(a.project))}
          ${X("Vendor",r(a.vendor))}
          ${X("Purpose",r(a.purpose))}
          ${X("Priority",r(a.priority))}
          ${d?X("Payment status",r(a.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${na("Requested by",Xt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+te(a.createdAt))}
          ${a.approverEmail||a.approvedByName?na("Approved by",Xt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+te(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${k?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(p=>`<tr>
            <td>${r(p.itemNo)}</td>
            <td class="wrap">${r(p.description)}</td>${k?`<td>${r(p.partNo)}</td>`:""}<td>${r(p.materialType)}</td>
            <td>${r([p.qty,p.unit].filter(Boolean).join(" "))}</td>
            <td>${p.unitPrice?r(Ce(a.currency||"INR",Number(p.unitPrice))):"—"}</td>
            <td>${p.lineTotal?r(Ce(a.currency||"INR",Number(p.lineTotal))):"—"}</td>
            <td>${p.purchaseLink?`<a href="${r(p.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${p.datasheetDoc?` <a href="${r(p.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${Ta(p.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${k?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?r(Ce(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${X("Expected",te(a.expectedDate))}
          ${X("Received",te(a.receivedAt))}
          ${X("Tracking",Kn(a))}
          ${X("Notes",r(a.notes))}
        </div>
        </div>
      </div>

      ${d&&((M=t.capabilities)!=null&&M.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(a.status)?`<div class="card pd-body"><h2>Payment work</h2><p>${a.financeReleased?"Sent to Finance. View responsibility and payment records.":"With admin. Hidden from Finance until you send it."}</p><a class="btn" href="#/payments/${encodeURIComponent(a.id)}">${v("wallet")} View payment details</a></div>`:""}

      ${d?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${X("PO reference",[r(a.poNo),te(a.poDate)].filter(Boolean).join(" · "))}
          ${X("Invoice / order #",[r(a.invoiceNo),te(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${X("Payment term",r(a.paymentTerm))}
          ${X("Quotation / PI",a.quotationDoc?`<a href="${r(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${X("Zoho Books PO",a.zohoPoNumber?r(a.zohoPoNumber):"")}
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
    </div>`,Da(e);const E=e.querySelector("#requestMore");e.onclick=p=>{E&&!E.contains(p.target)&&(E.open=!1)},e.onkeydown=p=>{p.key==="Escape"&&(E!=null&&E.open)&&(E.open=!1,E.querySelector("summary").focus())},E==null||E.addEventListener("focusout",p=>{E.contains(p.relatedTarget)||(E.open=!1)}),e.querySelectorAll("[data-to]").forEach(p=>p.onclick=async()=>{const D=p.dataset.to;if((D==="Rejected"||D==="Cancelled")&&!confirm(`Mark ${a.id} as ${D}?`))return;const B=p.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(Z=>{Z.disabled=!0}),p.innerHTML=v("refresh","spin")+" Updating…";try{const Z=await z("transition",{id:a.id,to:D});F(a.id+" → "+D),await K.applyResult(Z)}catch(Z){F(Z.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(ae=>{ae.disabled=!1}),p.innerHTML=B}});const G=e.querySelector("#makePoBtn"),J=e.querySelector("#sendFinanceBtn");J&&(J.onclick=async()=>{J.disabled=!0;try{const p=await z("financeRelease",{id:a.id});ss(),await K.applyResult(p),F(a.id+" sent to Finance")}catch(p){F(p.message,!0),J.disabled=!1}}),G&&(G.onclick=()=>{var p,D;Ee=!0,ft(e,t,s),Xe((p=e.querySelector("#poForm"))==null?void 0:p.closest(".card")),(D=e.querySelector("[name=poNo]"))==null||D.focus()});const $=e.querySelector("#poCancelBtn");$&&($.onclick=()=>{Ee=!1,ft(e,t,s)});const I=e.querySelector("#poForm"),y=I?Pa(I):null;I&&(I.onsubmit=async p=>{if(p.preventDefault(),!y())return;const D=new FormData(I),B=String(D.get("poNo")||"").trim();if(!B)return;const Z=I.querySelector('button[type="submit"]');Z.disabled=!0;let ae;try{ae=await z("update",{id:a.id,updates:{poNo:B,poDate:D.get("poDate")||"",paymentTerm:D.get("paymentTerm")||""}});const me=await z("transition",{id:a.id,to:"Ordered"});F(a.id+" → Ordered (PO "+B+")"),Ee=!1,await K.applyResult(me)}catch(me){ae&&await K.applyResult(ae),F(me.message,!0),Z.disabled=!1}});const L=e.querySelector("#zohoPushBtn");L&&(L.onclick=async()=>{L.disabled=!0;try{const{pr:p}=await z("zohoPushPo",{id:a.id});F(a.id+" → Zoho Books PO "+p.zohoPoNumber),await K.applyResult({pr:p})}catch(p){F(p.message,!0),L.disabled=!1}});const H=e.querySelector("#devDelete");H&&(H.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){H.disabled=!0;try{const p=await z("delete",{id:a.id});F(a.id+" deleted"),location.hash="#/",await K.applyResult(p)}catch(p){F(p.message,!0),H.disabled=!1}}})}let ze=null,pe=null,bt="";const rs=["Domestic","International"];function Ct(e){return ze===null&&(ze=e.vendors||[]),ze}function is(e){const t=e.lists&&e.lists.departments||[],s=Ct(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const oe=(e,t,s,a="")=>`<label class="adm-field">${r(e)}
    <input class="adm-input" name="${t}" value="${r(s||"")}" placeholder="${r(a)}">
  </label>`;function os(e,t){const s=Ct(e),a=pe&&s.find(i=>i.name.toLowerCase()===pe.toLowerCase());if(a)return ls(e,a);const n=[...s].sort((i,o)=>i.name.localeCompare(o.name));return`
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
          ${Rt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ma(n.length,n.length)}</span></div>
    </div>`}const Ma=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function ls(e,t){const s=kt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],i=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${r(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?r(o):"—"}</option>`).join("");return`
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
        ${is(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some(S=>S.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${r(o)}">${r(o)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${r(t.name)}">
        </label>
        <div class="adm-grid2">
          ${oe("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${oe("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${oe("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...rs].map(o=>`<option value="${r(o)}" ${o===(t.type||"")?"selected":""}>${o?r(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${oe("Contact person","contactPerson",t.contactPerson)}
          ${oe("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${r(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${r(t.address||"")}"></label>
        <div class="adm-grid2">
          ${oe("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${oe("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${r(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${oe("Account number","accountNumber",t.accountNumber)}
          ${oe("IFSC","ifsc",t.ifsc)}
        </div>
        ${oe("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${i}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${oe("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function ds(e,t,s){const a=async(c,m,k)=>{try{const N=await z(c,m);ze=N.vendors,await K.applyResult(N),F(k),e.isConnected&&s()}catch(N){F(N.message,!0)}};qt(e,{get:()=>bt,set:c=>{bt=c},count:Ma,match:c=>new Set(wa(Ct(t),c).map(m=>m.name))}),e.querySelectorAll(".vRow").forEach(c=>c.onclick=m=>{m.target.closest(".vRm")||(pe=c.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(c=>c.onclick=()=>{confirm(`Remove vendor "${c.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:c.dataset.name},`${c.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const c=e.querySelector("#nvName").value.trim();if(!c){F("Vendor name required",!0);return}pe=c,a("vendorSet",{name:c,updates:{}},`${c} added — fill in the details`)});const i=()=>{pe=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=i);const d=e.querySelector("#vCancel");d&&(d.onclick=i),e.querySelectorAll("#vDepts .adm-chip").forEach(c=>c.onclick=()=>c.classList.toggle("on"));const S=e.querySelector("#vForm");S&&(S.onsubmit=c=>{c.preventDefault();const m={};for(const[N,C]of new FormData(S))m[N]=C.trim();m.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(N=>N.dataset.dept);const k=m.name||pe;a("vendorSet",{name:pe,updates:m},`${k} saved`),pe=k})}function cs(){pe=null}const Me=["admin","approver","finance","requester"],ms={admin:"Full access to settings, users, PRs, and analytics.",approver:"Creates own PRs and approves or rejects submitted requests in their department.",finance:"Creates own PRs and handles payments for requests sent by admin. In progress assigns responsibility through completion.",requester:"Creates, tracks and edits own submitted PRs. No approval, payment or admin access."},sa=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let re="users",ke=null,Ie=null,Ve="",gt="",Pe=null,xe=null,ce=!1;const ra={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Pe,set:e=>{Pe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>xe,set:e=>{xe=e},seed:e=>e.materialTypes}};function us(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%sa.length;return sa[t]}const dt=e=>e[0].toUpperCase()+e.slice(1),ps={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${v("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${v("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${v("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${v("vendors")} Add Vendor`}};function fe(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(Ve!==s&&(Ve=s,ke=null,Ie=null,Pe=null,xe=null),ke===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${v("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const i=e.querySelector("#adminUsersLoading"),o=Ie||(Ie=z("usersList"));o.then(d=>{if(Ve===s){if(!Array.isArray(d.users))throw new Error("The server did not return users. Please retry.");ke=d.users,e.contains(i)&&fe(e,t)}}).catch(d=>{Ve!==s||!e.contains(i)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${r(d.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{Ie=null,fe(e,t)})}).finally(()=>{Ie===o&&(Ie=null)});return}Pe===null&&(Pe=t.projects||[]),xe===null&&(xe=t.materialTypes||[]);const a=ps[re];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${a.title}</h1>
          <p>${a.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${a.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${re==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${re==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${re==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${re==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${re==="users"?hs(t):re==="vendors"?os(t,ce):ys(t,ra[re])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(i=>i.onclick=()=>{re=i.dataset.tab,ce=!1,cs(),fe(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ce=!ce,fe(e,t),ce){const i=e.querySelector(".adm-addrow input, .adm-addrow select");i&&i.focus()}},re==="users"?vs(e,t):re==="vendors"?ds(e,t,()=>{ce=!1,fe(e,t)}):fs(e,t,ra[re])}function hs(e){const t=a=>(Me.includes(a.role)?Me:[a.role,...Me]).map(n=>`<option value="${r(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?r(dt(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Ye(e).includes(a)?[a,...Ye(e)]:Ye(e)].map(n=>`<option value="${r(n)}" ${n===(a||"")?"selected":""}>${n?r(n):"— no department —"}</option>`).join("");return`
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
          ${[...ke].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||at(a.email);return`<tr data-search="${At(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${us(a.email)}">${r(wt(a.email))}${a.picture?`<img src="${r(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
          ${Rt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${ke.length} of ${ke.length} active members</span>
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
        <p>${ms[a]}</p>
      </div>`).join("")}
    </div>`}function vs(e,t){qt(e,{get:()=>gt,set:n=>{gt=n},count:(n,i)=>`Showing ${n} of ${i} active members`});const s=async(n,i,o)=>{try{const d=await z("userSet",{email:n,...i});ke=d.users,ce=!1,await K.applyResult(d),F(o),e.isConnected&&fe(e,t)}catch(d){F(d.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),i=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:i,department:o},`${n} → ${i}`)})}function Ye(e){const t=e.lists&&e.lists.departments||[],s=(Pe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function ys(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
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
          ${Rt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Ia(s.length,s.length,t)}</span>
      </div>
    </div>`}const Ia=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function fs(e,t,s){qt(e,{get:()=>s.q,set:i=>{s.q=i},count:(i,o)=>Ia(i,o,s)});const a=async(i,o,d)=>{try{const S=await z(i,o);s.set(S[s.respKey]),ce=!1,await K.applyResult(S),F(d),e.isConnected&&fe(e,t)}catch(S){F(S.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const i=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:i,[s.key]:o},`${i} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(i=>i.onclick=()=>{const{dept:o,val:d}=i.dataset;confirm(`Remove "${d}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:d},`${d} removed`)})}const ia={requester:0,approver:1,finance:1,admin:2};function oa(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=ia[t.role];return s!=null&&s>=ia[e.minRole]}const Fa=document.getElementById("app"),ct={"":{fn:fa,nav:"Dashboard",icon:"grid"},vendors:{fn:Bn,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:Ra,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:Ea,nav:"Payments",icon:"wallet",roles:["admin","finance"]},new:{fn:as,roles:["requester","approver","finance","admin"]},pr:{fn:ft},admin:{fn:fe,nav:"Admin",icon:"settings",minRole:"admin"}};let be,la=null;function xa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function bs(){be==null||be.abort(),Fa.innerHTML=`<div class="auth-gate">
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
  </div>`,Ka(document.getElementById("gsignin"))}function Oa(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=v("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Ba(){var J,$,I;const e=K.get(),{name:t,param:s}=xa(),a=ct[t]||ct[""],n=((J=e.me)==null?void 0:J.role)||"";if(e.me&&!oa(a,e.me)){location.hash="#/";return}be==null||be.abort(),be=new AbortController;const i=be.signal,o=Object.entries(ct).filter(([,y])=>{var L;return y.nav&&e.me&&oa(y,e.me)&&(y.fn!==Ea||((L=e.capabilities)==null?void 0:L.financeWorkflow))}).map(([y,L])=>`<a href="#/${y}" ${t===y?'aria-current="page"':""} class="${t===y?"active":""}">${v(L.icon)}<span>${L.nav}</span>${t===y?'<span class="nav-dot"></span>':""}</a>`).join(""),d=e.notifications||[],S=d.filter(y=>!y.readAt).length,c=Va()||{},m=c.email||(($=e.me)==null?void 0:$.email)||"",k=c.name||at(m),N=c.picture?`<img class="avatar" src="${r(c.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${r(wt(k))}</span>`,C=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=C+" · Oizom Procurement",Fa.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${v("right")} <b>${r(C)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${v("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${S?", "+S+" unread":""}" aria-expanded="false" aria-controls="nPanel">${v("bell")}${S?`<span class="nbadge">${S>9?"9+":S}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${S?S+" new":"All caught up"}</span></div>
              ${d.length?d.map(y=>`<${y.prId?"a":"div"} class="nitem ${y.readAt?"":"unread"}" ${y.prId?`href="#/pr/${r(y.prId)}"`:""}><div class="nmsg">${r(y.message)}</div><div class="ntime">${r(String(y.ts).slice(0,16).replace("T"," "))}</div></${y.prId?"a":"div"}>`).join(""):`<div class="nempty">${v("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${N}<span class="profile-copy"><span class="pname">${r(k)}</span><span class="prole">${r(n||"Oizom team")}</span></span>${v("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${r(m)}</div><button class="btn" id="btnOut">${v("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Oa(e),document.getElementById("btnRefresh").onclick=async()=>{await K.refresh(),K.get().err||F("Data refreshed")};const h=document.getElementById("nPanel"),q=document.getElementById("nBtn"),O=document.getElementById("pMenu"),T=document.getElementById("profileBtn"),A=()=>{h.hidden=O.hidden=!0,q.setAttribute("aria-expanded","false"),T.setAttribute("aria-expanded","false")};q.onclick=()=>{var L;const y=h.hidden;A(),h.hidden=!y,q.setAttribute("aria-expanded",String(y)),y&&S&&(d.forEach(H=>{H.readAt||(H.readAt="now")}),(L=document.querySelector(".nbadge"))==null||L.remove(),z("notifRead").catch(()=>{}))},T.onclick=()=>{const y=O.hidden;A(),O.hidden=!y,T.setAttribute("aria-expanded",String(y))},document.getElementById("btnOut").onclick=_a,document.addEventListener("click",y=>{y.target.closest(".nbell, .profile-wrap")||A()},{signal:i});const j=document.getElementById("sidebar"),P=document.getElementById("workspace"),_=document.getElementById("openNav"),b=document.getElementById("shell"),g=matchMedia("(max-width: 960px)");let x=!1;const E=(y,L=!0)=>{var H;x=g.matches&&y,b.classList.toggle("nav-open",x),j.inert=g.matches&&!x,P.inert=x,document.getElementById("navBackdrop").hidden=!x,_.setAttribute("aria-expanded",String(x)),document.body.classList.toggle("nav-locked",x),x?(H=j.querySelector("nav a"))==null||H.focus():L&&g.matches&&_.focus()};E(!1,!1),_.onclick=()=>E(!0),document.getElementById("closeNav").onclick=()=>E(!1),document.getElementById("navBackdrop").onclick=()=>E(!1),j.querySelectorAll("a").forEach(y=>y.addEventListener("click",()=>E(!1),{signal:i})),g.addEventListener("change",()=>E(!1,!1),{signal:i}),document.addEventListener("keydown",y=>{if(y.key==="Escape"&&(x?E(!1):h.hidden?O.hidden||(A(),T.focus()):(A(),q.focus())),y.key==="Tab"&&x){const L=[...j.querySelectorAll("a, button")],H=L[0],V=L[L.length-1];y.shiftKey&&document.activeElement===H?(y.preventDefault(),V.focus()):!y.shiftKey&&document.activeElement===V&&(y.preventDefault(),H.focus())}},{signal:i});const G=document.getElementById("view");if(document.querySelector(".skip-link").onclick=y=>{y.preventDefault(),G.focus()},!e.lastSync)G.innerHTML=e.err?`<div class="connection-state">${v("info")}<h1>We couldn't load your workspace</h1><p>${r(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(I=document.getElementById("retryLoad"))==null||I.addEventListener("click",()=>K.refresh(),{signal:i});else{a.fn(G,e,s);const y=t+"/"+(s||"");la!==y&&ja(G),la=y}}window.addEventListener("hashchange",()=>{Ba(),window.scrollTo({top:0,behavior:"instant"})});let da="",ca=!1;K.subscribe(e=>{e.err&&e.err!==da&&F(e.err,!0),da=e.err;const t=!ca&&e.lastSync;if(t&&(ca=!0),e.lastSync&&(e.loading||e.err)||["new","payments"].includes(xa().name)&&!t&&e.lastSync&&document.querySelector("#view form")){Oa(e);return}Ba()});Ga(()=>K.refresh());et()||bs();
