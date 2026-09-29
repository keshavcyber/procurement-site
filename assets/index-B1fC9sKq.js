(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var ma;const oe=typeof window<"u"?(ma=window.matchMedia)==null?void 0:ma.call(window,"(prefers-reduced-motion: reduce)"):null,Ge=new Set,Ua="cubic-bezier(.2,.75,.25,1)";var ua;(ua=oe==null?void 0:oe.addEventListener)==null||ua.call(oe,"change",e=>{e.matches&&Ge.forEach(t=>t.cancel())});function et(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||oe!=null&&oe.matches)return;const i=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Ua,fill:"backwards"});return i.id="workspace-reveal",Ge.add(i),i.finished.then(()=>Ge.delete(i),()=>Ge.delete(i)),i}function ja(e){if(oe!=null&&oe.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||et(a,{delay:Math.min(s++*22,154),distance:10})}}const pa={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},We="oizom-id-token";let Bt=null;function Ha(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function tt(){const e=localStorage.getItem(We);return e?Ha(e)<Date.now()+3e4?(localStorage.removeItem(We),null):e:null}function Va(){const e=tt();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function _a(){localStorage.removeItem(We),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Ga(e){if(Bt=e,tt()){e();return}St(()=>{google.accounts.id.initialize({client_id:pa.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(We,t.credential),Bt()}}),google.accounts.id.prompt()})}function St(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>St(e,t+1),100)}function Ka(e){St(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class pt extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const ha=new Set(["list","me","usersList","health","logTail","financeList","attachmentDownload"]),za=new Set([404,408,429,500,502,503,504]),Ya=45e3;function Za(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function Ue(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=ha.has(e),i=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${i}). Please try syncing again.`:`Could not confirm your change (${i}). Sync and check whether it saved before submitting again.`;return new pt(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||za.has(t)})}async function Wa(e,t){const s=tt();if(!s)throw new pt("SIGNED_OUT");let a;try{a=await fetch(pa.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:Ya),body:JSON.stringify({...t,action:e,token:s})})}catch(o){throw Ue(e,{kind:["TimeoutError","AbortError"].includes(o.name)?"timeout":"network"})}const n=Za(a);if(!a.ok)throw Ue(e,{status:a.status,stage:n,kind:"http"});let i;try{i=await a.json()}catch{throw Ue(e,{stage:n,kind:"response"})}if(!i||typeof i.ok!="boolean"||i.ok&&e==="list"&&!Array.isArray(i.prs))throw Ue(e,{stage:n,kind:"response"});if(!i.ok)throw new pt(i.error||"Request failed",{action:e});return i}async function K(e,t={}){for(let s=0;s<2;s++)try{return await Wa(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!ha.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function Ja(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Qa(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Xa(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function en(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Ut(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,i)=>Number(n.itemNo)-Number(i.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:Xa(n),qty:en(n)}})}let Y={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const ht=new Set;let jt=!1,Ne=null,ot=0;function tn(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function lt(){ht.forEach(e=>e(Y))}const G={get:()=>Y,subscribe(e){return ht.add(e),()=>ht.delete(e)},refresh(){return Ne||(Y={...Y,loading:!0},Ne=Promise.resolve().then(async()=>{try{let e,t;do t=ot,e=await K("list");while(t!==ot);tn(e),Y={prs:Ut(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},jt=!0}catch(e){if(e.message==="SIGNED_OUT"&&jt){location.reload();return}Y={...Y,err:e.message,loading:!1}}}).finally(()=>{Ne=null,Y={...Y,loading:!1},lt()}),lt(),Ne)},async applyResult(e,{itemsChanged:t=!1}={}){ot++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=Y.prs.find(i=>i.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return G.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const i=(e.items||(n==null?void 0:n.items)||[]).map(d=>({...d,prId:e.pr.id})),o=Ut([e.pr],i)[0];s.prs=n?Y.prs.map(d=>d.id===o.id?o:d):[...Y.prs,o]}a=!0}e.deleted&&(s.prs=Y.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=Y.me&&e.users.find(i=>i.email.toLowerCase()===Y.me.email.toLowerCase());if(Y.me&&(!n||!n.role))return G.refresh();n&&(s.me={...Y.me,role:n.role,department:n.department}),a=!0}if(!a)return G.refresh();Y={...Y,...s},lt()}},Ht={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function y(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ht[e]||Ht.file}</svg>`}const r=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function at(e){return`<span class="chip ${r(e)}" data-s="${r(e)}">${r(e)}</span>`}function M(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${y(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const ae=e=>e?r(String(e).slice(0,10)):"—";function nt(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function kt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Vt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Ke=e=>Vt[e]!=null?Vt[e]:e+" ";function Ce(e,t){const s=e==="INR"?"en-IN":"en-US";return Ke(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function re(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Ke(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Ke(e)+(t/1e3).toFixed(1)+"K":Ke(e)+Math.round(t).toLocaleString("en-US")}const Be=["Cancelled","Rejected"],an=["Ordered","In Transit","Received"],st=e=>an.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function _t(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function Gt(e){const t=e.filter(n=>!Be.includes(n.status)),s=e.filter(st),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:_t(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:_t(t)}}const Je={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:st,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Be.includes(e.status)};function nn(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Kt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function va(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function sn(e){return e.filter(st)}function rn(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function on(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function zt(e,t,s){const a={};for(const n of e){const i=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(i))continue;let o;if(t==="count")o=1;else{if(Be.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const d=Number(n.amount);if(!n.amount||!isFinite(d)||(n.currency||"Unknown")!==s)continue;o=d}a[i]=(a[i]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function ln(e,t){const s={};for(const a of e){if(Be.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const i=a.department||"Unassigned";s[i]=(s[i]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function dn(e,t,s=6){const a={};for(const o of e){if(Be.includes(o.status)||(o.currency||"Unknown")!==t)continue;const d=Number(o.amount);if(!o.amount||!isFinite(d))continue;const S=o.vendor||"Unspecified";a[S]=(a[S]||0)+d}const n=Object.entries(a).map(([o,d])=>({vendor:o,total:d})).sort((o,d)=>d.total-o.total);if(n.length<=s)return n;const i=n.slice(s).reduce((o,d)=>o+d.total,0);return[...n.slice(0,s),{vendor:"Other",total:i}]}function cn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function mn(e){const t=(i,o)=>{const d=Date.parse(i),S=Date.parse(o);return isFinite(d)&&isFinite(S)?(S-d)/864e5:null},s=i=>i.length?i.reduce((o,d)=>o+d,0)/i.length:null,a=e.map(i=>i.createdAt&&i.approvedAt?t(i.createdAt,i.approvedAt):null).filter(i=>i!=null&&i>=0),n=e.map(i=>i.poDate&&i.receivedAt?t(i.poDate,i.receivedAt):null).filter(i=>i!=null&&i>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const un=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function pn(e,t=Date.now()){const s=un.map(a=>({...a,count:0}));return e.filter(st).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const i=(t-n)/864e5;(s.find(o=>i>=o.min&&i<=o.max)||s[s.length-1]).count++}),s}const Re=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],ya=["Unpaid","Paid","Partially Paid","FOC / Free"],Qe={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function hn(e,t,s,a,n){const i=(Qe[e]||{})[t];return i?i.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function vn(e,t,s,a){return Object.keys(Qe[e]||{}).filter(n=>hn(e,n,t,s,a))}function yn(e,t){return!!(Qe[e]&&Qe[e][t])}const fn=["Submitted","Approved","Rejected"],Yt=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],vt=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),p={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:vt()},De=25,bn={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let yt;function gn(e,t){p.tab=t==="admin"?"all":"dept",t==="admin"&&(p.statuses=e==="pending"?["Submitted"]:[...Re]),p.sel=["pending","unpaid"].includes(e)?e:"total",p.page=1,p.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ye(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(fa(e,t),s&&et(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const i=e.querySelector("#"+n.id);if(i&&(i.focus(),n.start!=null&&typeof i.setSelectionRange=="function"))try{i.setSelectionRange(n.start,n.end)}catch{}}const Zt=e=>String(e||"").slice(0,10);function $n(e){const t=p.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Zt(e.createdAt)<t.from||t.to&&Zt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function fa(e,t){clearTimeout(yt),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          ${y("plus")} New request
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,wn(e.querySelector("#tabBody"),e,t)}const Se=e=>e.length?e.map(([t,s])=>re(t,s)).join(" + "):"—";function wn(e,t,s){var Nt,Dt,Et,Mt,It,xt,Ft,Ot;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",i=a.role==="admin",o=a.role==="finance",d=[(Nt=a.email)==null?void 0:Nt.toLowerCase(),a.role,(Dt=a.department)==null?void 0:Dt.toLowerCase()].join("|");p.viewer!==d&&Object.assign(p,{viewer:d,tab:i?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:vt()});const S=n?["mine","dept","approved"]:i?["all","mine"]:o?["mine",(Et=s.capabilities)!=null&&Et.financeHandoff?"finance":"payments"]:["mine"];S.includes(p.tab)||(p.tab="mine");const m=i&&p.statuses.length===1&&p.statuses[0]==="Approved",u=p.statuses.length===Re.length,k=p.tab==="dept",N=p.tab==="approved",P=p.tab==="all",h=p.tab==="payments",q=p.tab==="finance",x=nn(s.prs,a.email),T=o?s.prs.filter(l=>l.financeReleased):[],A=n?Kt(s.prs,a.email):[],j=n?va(s.prs,a.department):[],E=o?sn(s.prs):[],O=k?j:N?A:P?s.prs:q?T:h?E:x,$=i&&!u?O.filter(l=>p.statuses.includes(l.status)):O,b=Gt($),I=n?j.filter(Je.pending):[],D=i?Gt(s.prs):n?{pending:I.length,highPriority:I.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,z=m?[{key:"total",n:b.total,l:"Ready to purchase",s:P?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:b.spendTotals.length?re(...b.spendTotals[0]):"-",l:"Approved value",s:b.spendTotals.length>1?"+ "+Se(b.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:h?[{key:"total",n:b.total,l:"Awaiting payment",s:Se(b.unpaidTotals)},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?re(...b.spendTotals[0]):"—",l:"Total value",s:b.spendTotals.length>1?"+ "+Se(b.spendTotals.slice(1)):""}]:k?[{key:"total",n:b.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:Se(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?re(...b.spendTotals[0]):"—",l:"Total spend",s:b.spendTotals.length>1?"+ "+Se(b.spendTotals.slice(1)):""}]:[{key:"total",n:b.total,l:N?"Approved PRs":i&&!u?"Selected PRs":P?"All PRs":"Total PRs",s:N?"across all requesters":i&&!u?"Matching your selected statuses":P?"every department":""},...N?[]:[{key:"pending",n:b.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:b.unpaidCount,l:"Unpaid",s:Se(b.unpaidTotals),cls:"bad"},{key:"transit",n:b.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:b.receivedPct+"%",l:"Received",s:b.received+" of "+b.total,cls:"go"},{key:"spend",n:b.spendTotals.length?re(...b.spendTotals[0]):"—",l:N?"Approved spend":"Total spend",s:b.spendTotals.length>1?"+ "+Se(b.spendTotals.slice(1)):""}];if(!i&&(!o||p.tab==="mine")){const l=z.findIndex(R=>R.key==="unpaid");l>=0&&z.splice(l,1)}if(P)for(const l of rn($))z.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+nt(l.email),s:l.email,cls:"go"});z.some(l=>l.key===p.sel)||(p.sel="total");const Z=(p.sel.startsWith("ap:")?Kt($,p.sel.slice(3)):$.filter(Je[p.sel])).sort((l,R)=>(R.createdAt||"").localeCompare(l.createdAt||"")),g=z.find(l=>l.key===p.sel),F=[...new Set($.map(l=>l.department).filter(Boolean))].sort(),f=[...new Set($.map(l=>l.vendor).filter(Boolean))].sort();p.filters.dept&&!F.includes(p.filters.dept)&&(p.filters.dept=""),p.filters.vendor&&!f.includes(p.filters.vendor)&&(p.filters.vendor="");const L=Z.filter($n),_=Object.values(p.filters).some(Boolean),V=Math.max(1,Math.ceil(L.length/De));p.page=Math.min(Math.max(1,p.page),V);const J=L.slice((p.page-1)*De,p.page*De),v=["dept","vendor","from","to"].filter(l=>p.filters[l]).length,w=u?"All statuses":p.statuses.join(" + "),C=i?(P?u?"All requests":m?"Approved requests":w:"Your requests")+(P?"":" · "+w):q?"Requests sent by admin":k?"Department requests":N?"Approved by you":h?"Payment queue":"Your requests",H=(l,R,B)=>`<button type="button" id="scope-${l}" class="adm-tab ${p.tab===l?"active":""}" data-tab="${l}" aria-pressed="${p.tab===l}">${R} <span>${B}</span></button>`,U=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),te=l=>{const R=i?Re:n&&l.status==="Submitted"&&U(l)?fn:null;return R?`<select class="status-sel" data-status="${r(l.status)}" aria-label="Status for ${r(l.id)}" data-id="${r(l.id)}">${R.map(B=>`<option ${B===l.status?"selected":""}>${r(B)}</option>`).join("")}</select>`:at(l.status)},le=l=>`<select class="pay-sel" aria-label="Payment status for ${r(l.id)}" data-id="${r(l.id)}">${ya.map(R=>`<option ${R===l.paymentStatus?"selected":""}>${r(R)}</option>`).join("")}</select>`,Te=i?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${u?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${u}">All <span>${O.length}</span></button>
        ${Yt.map((l,R)=>`<button type="button" class="view-pill ${!u&&p.statuses.includes(l)?"selected":""}" id="status-pill-${R}" data-admin-status="${r(l)}" aria-pressed="${!u&&p.statuses.includes(l)}">${l==="Submitted"?"Pending approval":r(l)}<span>${O.filter(B=>B.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${P?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${P}">Everyone</button>
        <button type="button" class="view-pill ${P?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!P}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${y("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${r(C)}</span><span class="view-result-count" role="status">${$.length} ${$.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Mt=s.capabilities)!=null&&Mt.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Mark In progress to take responsibility through completion.</p></div><a class="btn" href="#/payments">${y("wallet")} View payment work ${y("arrow")}</a></section>`:""}
    ${!i&&S.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${H("mine","Your requests",x.length)}
      ${n?H("dept",r(a.department||"Your department"),j.length)+H("approved","Approved by you",A.length):""}
      ${o?(It=s.capabilities)!=null&&It.financeHandoff?H("finance","Sent to Finance",T.length):H("payments","Awaiting payment",E.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${m?"approved-kpis":""}" aria-label="Filter requests by summary">${z.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===p.sel?"sel":""}" data-key="${r(l.key)}" aria-pressed="${l.key===p.sel}">
        <span class="kpi-top"><span class="l">${r(l.l)}</span>${y(bn[l.key])}</span>
        <span class="v">${r(String(l.n))}</span><span class="s">${r(l.s||(l.key==="total"?C:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${D?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?r(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${D.pending?"":"disabled"}><span class="attention-icon">${y("clock")}</span><span><b>${D.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${D.pending?"Open approval queue":"No approvals waiting"}</small></span>${y("arrow")}</button>
      ${i?`<button type="button" data-queue="unpaid" ${D.unpaidCount?"":"disabled"}><span class="attention-icon">${y("wallet")}</span><span><b>${D.unpaidCount} awaiting payment</b><small>${D.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${y("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${y("info")}</span><span><b>${D.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${Te}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${L.length}</span></h2><p>${r(C)} · ${p.sel==="total"?"Latest first":r(g.l)}</p></div><span class="table-hint">Select a request to view details ${y("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${y("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${r(p.filters.q)}"></label>
        ${i?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Re.map(l=>`<option value="${r(l)}" ${p.filters.status===l?"selected":""}>${r(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${v?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${p.moreFilters}" aria-controls="advancedFilters">${y("filter")} Filters ${v?`<span class="count-badge">${v}</span>`:""}</button>
        ${_?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${p.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${F.map(l=>`<option value="${r(l)}" ${p.filters.dept===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${f.map(l=>`<option value="${r(l)}" ${p.filters.vendor===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${r(p.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${r(p.filters.to)}"></label>
        ${P?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${z.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${r(l.key)}" ${p.sel===l.key?"selected":""}>${r(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${h?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${J.map(l=>`<tr class="rowlink ${h?"payment-row":""}" data-id="${r(l.id)}">
          <td class="request-id"><a href="#/pr/${r(l.id)}">${r(l.id)}</a></td>
          <td class="request-date">${ae(l.createdAt)}</td>
          ${h?`<td>${r(l.vendor)}</td><td>${r(l.poNo||"—")}</td><td>${r(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${r(l.department)}</td><td class="wrap request-item">${r(l.item)}</td><td class="request-vendor">${r(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?r(re(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${h?le(l):te(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${y(_?"search":"file")}<b>${_?"No matching requests":m?"No requests ready for purchasing":i&&!u?"No requests with these statuses":"No requests here yet"}</b><span>${_?"Try a different search or clear your filters.":m?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":i&&!u?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${_?'<button class="btn" id="emptyClear">Clear filters</button>':i&&!u?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${L.length?(p.page-1)*De+1:0}–${Math.min(p.page*De,L.length)} of ${L.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${p.page===1?"disabled":""}>${y("left")}</button><span>Page ${p.page} of ${V}</span><button class="btn" id="dashNext" aria-label="Next page" ${p.page===V?"disabled":""}>${y("right")}</button></div></div>
    </section>`;const ee=l=>{p.tab=l,p.sel="total",p.page=1,i&&(p.filters=vt()),ye(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>ee(l.dataset.tab));const me=()=>{p.statuses=[...Re],ee(p.tab),t.querySelector("#showAllRequests").focus()};(xt=e.querySelector("#showAllRequests"))==null||xt.addEventListener("click",me),(Ft=e.querySelector("#emptyAllRequests"))==null||Ft.addEventListener("click",()=>{p.tab="all",me()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const R=l.dataset.adminStatus;if(u)p.statuses=[R];else if(!p.statuses.includes(R))p.statuses=Yt.filter(B=>B===R||p.statuses.includes(B));else if(p.statuses.length>1)p.statuses=p.statuses.filter(B=>B!==R);else return;ee(p.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>ee(l.dataset.adminScope)),(Ot=e.querySelector("#resetAdminView"))==null||Ot.addEventListener("click",()=>{p.statuses=["Approved"],ee("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{p.sel=l.dataset.key,p.page=1,ye(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var B,Q,W;if(l.dataset.queue==="unpaid"&&((B=s.capabilities)!=null&&B.financeWorkflow)){location.hash="#/payments";return}if(!i&&!(n&&l.dataset.queue==="pending"))return;gn(l.dataset.queue,a.role),ye(t,s);const R=t.querySelector(".requests-card");R.focus({preventScroll:!0}),(W=R.scrollIntoView)==null||W.call(R,{block:"start",behavior:(Q=window.matchMedia)!=null&&Q.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=R=>{R.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{p.moreFilters=!p.moreFilters,e.querySelector("#advancedFilters").hidden=!p.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(p.moreFilters))};const he=e.querySelector("#dashApprover");he&&(he.onchange=()=>{p.sel=he.value,p.page=1,ye(t,s)});const Le=l=>{var R,B;p.page+=l,ye(t,s),(B=(R=t.querySelector(".requests-card")).scrollIntoView)==null||B.call(R,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>Le(-1),e.querySelector("#dashNext").onclick=()=>Le(1);const ve=(l,R)=>{p.filters[l]=R,p.page=1,ye(t,s)};e.querySelector("#dashQ").oninput=l=>{p.filters.q=l.target.value,p.page=1,clearTimeout(yt),yt=setTimeout(()=>{t.isConnected&&ye(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>ve("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>ve("vendor",l.target.value);const de=e.querySelector("#dashStatus");de&&(de.onchange=l=>ve("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>ve("from",l.target.value),e.querySelector("#dashTo").onchange=l=>ve("to",l.target.value);const ne=()=>{p.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},p.page=1,p.sel="total",ye(t,s)},we=e.querySelector("#dashFilterClear"),Lt=e.querySelector("#emptyClear");we&&(we.onclick=ne),Lt&&(Lt.onclick=ne),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,B=s.prs.find(W=>W.id===R),Q=l.value;if(!(!B||Q===B.status)){if((Q==="Rejected"||Q==="Cancelled")&&!confirm(`Mark ${R} as ${Q}?`)){l.value=B.status;return}l.disabled=!0;try{let W;a.role==="admin"&&!yn(B.status,Q)?W=await K("update",{id:R,updates:{status:Q}}):W=await K("transition",{id:R,to:Q}),M(`${R} → ${Q}`),await G.applyResult(W)}catch(W){M(W.message,!0),l.value=B.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=R=>R.stopPropagation(),l.onchange=async()=>{const R=l.dataset.id,B=s.prs.find(W=>W.id===R),Q=l.value;if(!(!B||Q===B.paymentStatus)){l.disabled=!0;try{const W=await K("update",{id:R,updates:{paymentStatus:Q}});M(`${R} payment → ${Q}`),await G.applyResult(W)}catch(W){M(W.message,!0),l.value=B.paymentStatus,l.disabled=!1}}}})}function At(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function qt(e,t){const s=At(e,t),a=s.filter(Je.spend),n={};for(const i of a){const o=Number(i.amount);if(!i.amount||!isFinite(o))continue;const d=i.currency||"INR";n[d]=(n[d]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((i,o)=>o[1]-i[1]),unpaid:s.filter(Je.unpaid).length,lastOrder:s.reduce((i,o)=>{const d=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(d)&&d>i?d:i},"")}}function ba(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(At(t,e.name).filter(i=>i.amount&&isFinite(Number(i.amount))).map(i=>i.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(i=>i!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Sn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],kn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},An=1,qn=.7,ga=.5,Rn=.4,Cn=.3,Pn=4,Tn=e=>e.length>=7?2:e.length>=Pn?1:0,Xe=e=>String(e??"").toLowerCase().trim();function Ln(e,t){const s=e[t];return Xe(Array.isArray(s)?s.join(" "):s)}function $a(e){return Xe(e).split(/[\s,]+/).filter(Boolean)}function Nn(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let i=1;i<=t.length;i++)n[i]=Math.min(s[i]+1,n[i-1]+1,s[i-1]+(e[a-1]===t[i-1]?0:1));s=n}return s[t.length]}function Wt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return An;if(s.some(n=>n.startsWith(t)))return qn;if(e.includes(t))return ga;const a=Tn(t);return a&&s.some(n=>Nn(n,t)<=a)?Cn:0}function Dn(e,t){const s=Wt(e,t);if(s)return s;const a=kn[t];return a&&a.some(i=>i.includes(" ")?e.includes(i):Wt(e,i)>=ga)?Rn:0}function En(e,t){const s=Array.isArray(t)?t:$a(t);if(!s.length)return 0;let a=0;for(const n of s){let i=0;for(const{key:o,weight:d}of Sn)i=Math.max(i,Dn(Ln(e,o),n)*d);if(!i)return 0;a+=i}return a}function wa(e,t){const s=$a(t);return s.length?(e||[]).map(a=>({v:a,score:En(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Xe(a.v.displayName||a.v.name).localeCompare(Xe(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function rt(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${y("search")}
        <input aria-label="${r(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${r(t)}" value="${r(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${y("close")}
        </button>
      </div>
    </div>`}const Rt=(...e)=>r(e.filter(Boolean).join(" ").toLowerCase());function Ct(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${r(t)}</td></tr>`}function Pt(e,{get:t,set:s,count:a,id:n="admSearch",match:i=null}){const o=e.querySelector("#"+n);if(!o)return;const d=o.closest(".adm-card"),S=d.querySelector(".admSearchClear"),m=()=>Mn(d,t(),a,i);o.oninput=()=>{s(o.value),S.hidden=!o.value,m()},o.onkeydown=u=>{u.key==="Escape"&&o.value&&(o.value="",o.oninput())},S.onclick=()=>{o.value="",o.oninput(),o.focus()},m()}function Mn(e,t,s,a){const n=t.trim().toLowerCase(),i=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let d=null;i.forEach(u=>{u.hidden=n?o?!o.has(u.dataset.name):!u.dataset.search.includes(n):!1,u.classList.remove("last-visible"),u.hidden||(d=u)}),d&&d.classList.add("last-visible");const S=e.querySelector(".adm-nomatch");S&&(S.hidden=!!d||!i.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(i.filter(u=>!u.hidden).length,i.length))}let Ee="";const Sa={Domestic:"dom",Foreign:"for",Mixed:"mix"},In=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function ka(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${r(In(e.displayName||e.name))}${t?`<img src="${r(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function xn(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${r(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Fn(e,t){const s=qt(e.prs,t.name),a=ba(t,e.prs),n=s.spendTotals.length?re(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
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
        <div><span class="vc-l">Last order</span><b>${ae(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${xn(t)}</div>
    </a>`}const On=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Jt(e,t){const s=On(e.vendors),a=t.trim()?wa(s,t):s;return a.length?a.map(n=>Fn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${r(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function Bn(e,t,s){if(s)return Un(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${rt(Ee,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Jt(t,Ee)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),i=e.querySelector(".admSearchClear"),o=()=>{Ee=n.value,i.hidden=!Ee,a.innerHTML=Jt(t,Ee)};n.oninput=o,n.onkeydown=d=>{d.key==="Escape"&&n.value&&(n.value="",o())},i.onclick=()=>{n.value="",o(),n.focus()}}function Un(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${r(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=qt(t.prs,a.name),i=ba(a,t.prs),o=t.me&&t.me.role==="admin",d=At(t.prs,a.name).sort((m,u)=>(u.createdAt||"").localeCompare(m.createdAt||"")),S=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
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
        <div class="kpi"><div class="v">${n.spendTotals.length?r(re(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?r(n.spendTotals.slice(1).map(([m,u])=>re(m,u)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${ae(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${S.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${S.map(([m,u])=>`<div><span class="vc-l">${r(m)}</span><b>${r(u)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(m=>`<span class="vc-chip">${r(m)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${d.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${d.map(m=>`<tr class="rowlink" data-id="${r(m.id)}">
            <td style="font-family:var(--mono);font-size:12px">${r(m.id)}</td>
            <td>${ae(m.createdAt)}</td><td>${r(m.department)}</td>
            <td class="wrap">${r(m.item)}</td>
            <td>${m.amount?r(re(m.currency||"INR",Number(m.amount))):"—"}</td>
            <td>${at(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const ft=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Aa=new Map(ft.map(e=>[e.code,e])),jn=e=>Aa.has(String(e||"").trim().toUpperCase());function bt(e){const t=Aa.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Hn(e){const t=String(e||"").trim().toLowerCase(),s=t?ft.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...ft],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,i)=>a(n)-a(i)||n.code.localeCompare(i.code))}function je(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const i=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",d=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${r(d)}">
      <span class="barlabel">${r(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${i.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${r(t(n.value))}</span>
    </div>`}).join("")}</div>`}function Qt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},i=s-n.l-n.r,o=a-n.t-n.b,d=Math.max(...e.map(T=>T.value),1),S=i/(e.length-1),m=T=>n.l+T*S,u=T=>n.t+o-T/d*o,k=e.map((T,A)=>`${A===0?"M":"L"}${m(A).toFixed(1)} ${u(T.value).toFixed(1)}`).join(" "),N=`${k} L${m(e.length-1).toFixed(1)} ${n.t+o} L${m(0).toFixed(1)} ${n.t+o} Z`,P=[0,.5,1].map(T=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-T)).toFixed(1)}" y2="${(n.t+o*(1-T)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),h=Math.ceil(e.length/6)||1,q=e.map((T,A)=>A%h===0||A===e.length-1?`<text x="${m(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${r(T.month.slice(2))}</text>`:"").join(""),x=e.map((T,A)=>`<circle cx="${m(A).toFixed(1)}" cy="${u(T.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${r(T.month)}: ${r(t(T.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${P}
    <path d="${N}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${k}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${x}
    ${q}
  </svg>`}const Vn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],_n={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},Gn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},He={currency:""};function qa(e,t){var E,O;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?va(t.prs,s.department):t.prs||[],i=on(n);i.includes(He.currency)||(He.currency=i[0]||"");const o=He.currency,d=$=>o?re(o,$):String($),S=o?zt(n,"spend",o):[],m=zt(n,"count"),u=o?dn(n,o,6).map($=>({label:$.vendor,value:$.total})):[],k=!a&&o?ln(n,o).map($=>({label:$.department,value:$.total})):[],N=cn(n),P=Vn.filter($=>N[$]).map($=>({label:$,value:N[$]})),h=mn(n),q=pn(n),x=q.map($=>({label:$.label,value:$.count})),T=q.reduce(($,b)=>$+b.count,0),A=S.reduce(($,b)=>$+b.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${r(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${i.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${y("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${i.map($=>`<option value="${r($)}" ${$===o?"selected":""}>${r(bt($))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?r(d(A)):"—"}</div><div class="l">Total spend${o?" · "+r(o):""}</div></div>
        <div class="kpi"><div class="v">${h.avgApprovalDays!=null?h.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${h.avgDeliveryDays!=null?h.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((E=t.me)==null?void 0:E.role)==="admin"?`<div class="kpi ${T?"warn":""}"><div class="v">${T}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+r(o):""}</p></div>
          </div>
          <div class="spend-chart">${S.length?Qt(S,{valueFmt:$=>re(o,$),height:180}):`<div class="trend-empty">${y("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${k.length?`<div class="card"><h2>Spend by department${o?" · "+r(o):""}</h2>
          <div class="pd-body">${je(k,{valueFmt:d})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+r(o):""}</h2>
          <div class="pd-body">${je(u,{valueFmt:d})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${je(P,{colorOf:$=>_n[$.label]||"var(--mut)"})}</div></div>
        ${((O=t.me)==null?void 0:O.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${je(x,{colorOf:$=>Gn[$.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${Qt(m,{valueFmt:$=>$+" PR"+($===1?"":"s")})}</div>
      </div>
    </div>`;const j=e.querySelector("#insCur");j&&(j.onchange=()=>{var $;He.currency=j.value,qa(e,t),($=e.querySelector("#insCur"))==null||$.focus()})}const Ra={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Ca(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Kn(e){const t=String(e.trackingNo||"").trim(),s=Ca(e.trackingLink)||(t?(Ra[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[r(e.courier||""),s?`<a href="${r(s)}" target="_blank" rel="noopener noreferrer">${r(t||"Track shipment")} ↗</a>`:r(t)].filter(Boolean).join(" ")}function zn(e,t=[]){const s=[...new Set([...t,...Object.keys(Ra),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${r(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${r(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${r(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${r(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function Yn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Ca(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const Zn="1900-01-01",Wn="2100-12-31",Jn="Enter a complete date with a year between 1900 and 2100.";function Fe(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Pa(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(Jn)};return t.forEach(a=>{a.min=Zn,a.max=Wn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const Qn=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function it(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function Ta(e){return`<div class="attachment-links">${it(e).map(t=>`<button type="button" class="attachment-link" data-download="${r(t.id)}">${y("file")}${r(t.name)}</button>`).join("")}</div>`}function La(e=[]){return`<div class="attachment-picker" data-attachments="${r(JSON.stringify(it(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${y("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${Qn}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const Xn=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function Na(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=it(e.dataset.attachments).map(u=>({attachment:u})),i=e.querySelector(".attachment-selection"),o=e.querySelector("input"),d=e.querySelector(".attachment-status"),S=()=>{e.dataset.attachments=JSON.stringify(n.filter(u=>u.attachment).map(u=>u.attachment))},m=()=>{i.innerHTML=n.map((u,k)=>{var N,P;return`<div class="attachment-chip">${y("file")}<span>${r(((N=u.attachment)==null?void 0:N.name)||u.file.name)}${u.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${k}" aria-label="Remove ${r(((P=u.attachment)==null?void 0:P.name)||u.file.name)}" ${a?"disabled":""}>${y("close")}</button></div>`}).join(""),i.querySelectorAll("[data-remove]").forEach(u=>u.onclick=()=>{a||(n.splice(Number(u.dataset.remove),1),S(),m())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const u=[...o.files];if(n.length+u.length>3)throw new Error("Attach up to 3 files per item or payment");for(const k of u){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(k.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!k.size||k.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}u.forEach(k=>n.push({file:k,operationId:crypto.randomUUID()})),d.textContent="Files will upload when you save.",m()}catch(u){M(u.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var u;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,m();try{for(const k of n){if(k.attachment)continue;d.textContent="Uploading "+k.file.name+"…";const N=await K("attachmentUpload",{scope:t,prId:s,name:k.file.name,operationId:k.operationId,base64:await Xn(k.file)});if(!((u=N.attachment)!=null&&u.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");k.attachment=N.attachment,S(),m()}return d.textContent=n.length?"Attachments ready.":"",n.map(k=>k.attachment)}catch(k){throw d.textContent="Upload not confirmed. Your selected files are kept here for retry.",k}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,m()}},e.hasPendingFiles=()=>n.some(u=>!u.attachment),m()}function Da(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await K("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),i=document.createElement("a");i.href=n,i.download=s.attachment.name,i.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){M(s.message,!0)}finally{t.disabled=!1}}})}const es=ya,ts={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},ze=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:ts[t])||[],dt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ue=(e,t,s)=>`<span class="lblrow">${r(e)}${dt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${r(dt[t])}" data-tip="${r(dt[t])}">?</span>`:""}</span>`;function ke(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${r(n)}" ${n===t?"selected":""}>${n?r(n):"Select…"}</option>`).join("")}function ct(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <div class="item-row-heading"><b class="item-number">Item ${s+1}</b><button type="button" class="btn danger rmItem">${y("trash")} Remove item</button></div>
    <input type="hidden" name="i_lineTotal" value="${r(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${r(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${r(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${r(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${ke(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${r(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${ke([...new Set([...ze(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${r(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${r(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${r(t.datasheetDoc)}"></label>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${La(t.attachments)}</div>
  </div>`}function Ve(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:it((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function as(e,t,s){var J;const a=s?t.prs.find(v=>v.id===s):null,n=a||{},i=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const d=a?n.department||"":o.department||"",S=(t.projects||[]).filter(v=>v.department.toLowerCase()===d.toLowerCase()).map(v=>v.project),m=(t.vendors||[]).filter(v=>(v.departments||[]).some(w=>w.toLowerCase()===d.toLowerCase())),u=v=>{const w=m.find(c=>c.name.toLowerCase()===String(v||"").toLowerCase());return w?w.displayName||w.name:String(v||"")},k=(t.materialTypes||[]).filter(v=>v.department.toLowerCase()===d.toLowerCase()).map(v=>v.materialType),N=d.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${r(n.id)}" style="font-family:var(--mono)">${r(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?r(n.id):"New Purchase Request"}</h1>
          ${a?at(n.status):""}
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
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${r(bt(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${r(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ue("Priority","priority",!0)} <select name="priority">${ke(ze(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Fe(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((J=t.capabilities)!=null&&J.financeWorkflow)?`
              <label>${ue("Payment status*","payment")} <select name="paymentStatus" required>${ke(es,n.paymentStatus||"Unpaid")}</select></label>`:""}
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
              <label>PO date <input name="poDate" type="date" value="${r(Fe(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${r(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${r(Fe(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${ke(ze(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${r(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${zn(n,ze(t,"couriers"))}
          <label>${ue("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Fe(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${i.map((v,w)=>ct(t,v,w,k,N)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${y("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${y("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const P=e.querySelector("#prForm"),h=Pa(P),q=e.querySelector("#itemRows"),x=()=>{const v=Ve(P).map(C=>{const H=Ja(C.qty,C.unitPrice);return{lineTotal:H!==""?H:C.lineTotal}}),w=Qa(v),c=P.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=w===""?"":"Total: "+Ce(c,w)},T=()=>{const v=q.children.length===1;[...q.children].forEach((w,c)=>{w.dataset.i=c,w.querySelector(".item-number").textContent="Item "+(c+1);const C=w.querySelector(".rmItem");C.innerHTML=y(v?"refresh":"trash")+(v?" Clear item":" Remove item"),C.setAttribute("aria-label",(v?"Clear item ":"Remove item ")+(c+1)),C.title=v?"Clear this item and its selected attachments":"Remove this item from the request",C.disabled=e.querySelector("#prSave").disabled})},A=v=>{Na(v.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),v.querySelector(".rmItem").onclick=()=>{if(e.querySelector("#prSave").disabled)return;let w=v.nextElementSibling||v.previousElementSibling;q.children.length>1?v.remove():(v.insertAdjacentHTML("afterend",ct(t,{},0,k,N)),w=v.nextElementSibling,v.remove(),A(w)),T(),x(),w.querySelector('[name="i_description"]').focus()},v.querySelectorAll("input, select").forEach(w=>w.oninput=x)};[...q.children].forEach(A),T(),x();const j=(v,w,c,{search:C,resolve:H,toLabel:U,allowEmpty:te,onCommit:le,onSelect:Te})=>{const ee=e.querySelector("#"+v),me=e.querySelector("#"+w),he=P.querySelector(`[name="${c}"]`),Le=()=>{le&&le()},ve=de=>{const ne=C(de).slice(0,30);me.innerHTML=ne.map(we=>`<div class="curOpt" data-v="${r(we.value)}"><b>${r(we.main)}</b> ${r(we.name||"")}<span>${r(we.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',me.hidden=!1};ee.onfocus=()=>{ee.select(),ve("")},ee.oninput=()=>ve(ee.value),me.onmousedown=de=>{de.preventDefault();const ne=de.target.closest(".curOpt");if(ne){if(Te!=null&&Te(ne.dataset.v)){me.hidden=!0;return}he.value=ne.dataset.v,ee.value=U(ne.dataset.v),me.hidden=!0,Le()}},ee.onblur=()=>setTimeout(()=>{me.hidden=!0;const de=ee.value.trim();if(!de&&te)he.value="";else{const ne=H(de);ne!=null&&(he.value=ne)}ee.value=U(he.value),Le()},120)};j("curSearch","curList","currency",{search:v=>Hn(v).map(w=>({value:w.code,main:w.code,name:w.name,sub:w.sym||""})),resolve:v=>{const w=v.split("—")[0].trim().toUpperCase();return jn(w)?w:null},toLabel:v=>bt(v),onCommit:x});const E=v=>{const w=String(v||"").trim().toLowerCase();return m.filter(c=>!w||c.name.toLowerCase().includes(w)||(c.displayName||"").toLowerCase().includes(w)||(c.category||"").toLowerCase().includes(w)).sort((c,C)=>(c.displayName||c.name).localeCompare(C.displayName||C.name)).slice(0,29).map(c=>({value:c.name,main:c.displayName||c.name,name:c.displayName?c.name:"",sub:c.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let O=!1;const $=e.querySelector("#manualVendorField"),b=e.querySelector("#manualVendorName"),I=P.querySelector('[name="vendor"]'),D=v=>{O=v,$.hidden=!v,b.required=v},z=e.querySelector("#venHint"),Z=()=>{const v=P.querySelector('[name="vendor"]').value.trim();z.hidden=!v||m.some(w=>w.name.toLowerCase()===v.toLowerCase())};j("venSearch","venList","vendor",{search:E,resolve:v=>{if(O)return b.value.trim();const w=m.find(c=>c.name.toLowerCase()===v.toLowerCase()||(c.displayName||"").toLowerCase()===v.toLowerCase());return w?w.name:v},toLabel:v=>O?"Other — enter manually":u(v),onSelect:v=>(D(v==="__other__"),O?(I.value=b.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",b.focus(),Z(),!0):!1),allowEmpty:!0,onCommit:Z}),b.oninput=()=>{I.value=b.value.trim(),Z()};const g=e.querySelector("#venSearch"),F=g.oninput;g.oninput=()=>{D(!1),F()},Z(),e.querySelector("#addItem").onclick=()=>{e.querySelector("#prSave").disabled||(q.insertAdjacentHTML("beforeend",ct(t,{},q.children.length,k,N)),A(q.lastElementChild),T(),et(q.lastElementChild))};const f=P.elements.namedItem("trackingLink");f&&(f.oninput=()=>f.setCustomValidity(""));const L=()=>Object.fromEntries([...new FormData(P)].filter(([v])=>!v.startsWith("i_"))),_=L(),V=JSON.stringify(Ve(P));P.onsubmit=async v=>{v.preventDefault();const w=e.querySelector("#prSave");if(w.disabled||!h()||!Yn(f))return;if(O&&!b.value.trim()){b.reportValidity();return}e.querySelectorAll(".pr-save").forEach(H=>{H.disabled=!0,H.innerHTML=y("refresh","spin")+" Saving…"}),w.disabled=!0,w.textContent="Saving…",T(),e.querySelector("#addItem").disabled=!0;const c=L();let C=Ve(P);try{if(!C.length&&(!a||JSON.stringify(C)!==V))throw new Error("Add at least one item with a description");for(const U of q.children)U.querySelector('[name="i_description"]').value.trim()&&await U.querySelector(".attachment-picker").uploadFiles();C=Ve(P);const H=JSON.stringify(C)!==V;if(a){const U=Object.fromEntries(Object.entries(c).filter(([te,le])=>le!==_[te]));if(Object.keys(U).length||H){const te=await K("update",{id:n.id,updates:U,...H?{items:C}:{}});await G.applyResult(te,{itemsChanged:H}),M("PR updated")}location.hash="#/pr/"+n.id}else{const U=await K("create",{pr:c,items:C});await G.applyResult(U,{itemsChanged:!0}),M("Created "+U.pr.id),location.hash="#/pr/"+U.pr.id}}catch(H){M(H.message,!0),w.disabled=!1,w.textContent=a?"Save changes":"Submit PR",T(),e.querySelector("#addItem").disabled=!1,e.querySelectorAll(".pr-save").forEach(U=>{U.disabled=!1,U.textContent=a?"Save changes":"Submit request"})}}}function Xt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const i=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),d=String(a||"").trim();return i&&o&&i===o&&d?d:nt(t)}const ea=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],ns=e=>e==="Open"?"Outstanding":e;let be={viewer:"",sync:null,data:null,pending:null},fe="Open";function ss(){be.data=null}const qe=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Ce(e.currency,t),ta=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Ea(e,t,s){var P;const a=t.me;if(!a||!["admin","finance"].includes(a.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((P=t.capabilities)!=null&&P.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const n=a.email+"|"+a.role,i=String(t.lastSync);(be.viewer!==n||be.sync!==i)&&(be={viewer:n,sync:i,data:null,pending:null},fe="Open");const o=be,d=async(h=!1)=>{if(h&&(o.data=null),!o.data){e.innerHTML=`<div class="connection-state" role="status">${y("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{o.pending||(o.pending=K("financeList").finally(()=>{o.pending=null}));const q=await o.pending;if(!Array.isArray(q.tasks)||!Array.isArray(q.financeUsers))throw new Error("The server did not return payment records.");o.data=q}catch(q){if(!e.isConnected||be!==o)return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${r(q.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>d(!0);return}}!e.isConnected||be!==o||k()};let S="",m=1,u=!1;const k=()=>{var D,z,Z;const{tasks:h,financeUsers:q}=o.data,x=a.role==="admin",T=x?["Awaiting admin",...ea]:ea,A=s&&h.find(g=>g.prId===s),j=g=>fe==="All"||(fe==="Open"?g.state!=="Completed":fe==="Mine"?g.owner===a.email:g.state===fe),E=h.filter(j).filter(g=>[g.prId,g.poNo,g.vendor,g.owner].join(" ").toLowerCase().includes(S.toLowerCase())),O=Math.max(1,Math.ceil(E.length/25));m=Math.min(m,O);const $=(x?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(g=>[g,h.filter(F=>F.state===g).length]);if(e.innerHTML=`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${x?"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${y("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${$.map(([g,F])=>`<button class="kpi clickable" data-stage="${g}"><span class="l">${g}</span><span class="v">${F}</span></button>`).join("")}</div>
      ${A?N(A,x,q):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${x?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${h.length}</span></h2><p>${x?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${T.map(g=>`<button class="view-pill ${g===fe?"selected":""}" data-stage="${g}" aria-pressed="${g===fe}">${ns(g)}</button>`).join("")}</div>
      <label class="search-input">${y("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${r(S)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${E.slice((m-1)*25,m*25).map(g=>`<tr><td><a href="#/payments/${encodeURIComponent(g.prId)}"><b>${r(g.prId)}</b></a><small class="finance-sub">${r(g.vendor)}</small></td><td>${r(g.poNo||"—")}</td><td>${r(qe(g,g.outstanding))}<small class="finance-sub">${r(g.paymentStatus)}</small></td><td>${r(g.owner||"Not started")}</td><td><span class="finance-status" data-state="${r(g.state)}">${r(g.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(g.prId)}" aria-label="View payment details ${r(g.prId)}">View details ${y("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${m===1?"disabled":""}>Previous</button><span>${E.length} results · Page ${m} of ${O}</span><button class="btn" id="financeNext" ${m===O?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${y("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${x?`<p class="finance-note">${y("info")} ${r(((D=o.data.zoho)==null?void 0:D.message)||"")}</p>`:""}
    </div>`,e.querySelector("#reloadPayments").onclick=()=>{u||d(!0)},e.querySelectorAll("[data-stage]").forEach(g=>g.onclick=()=>{u||(fe=g.dataset.stage,m=1,k())}),e.querySelector("#financeSearch").oninput=g=>{if(u)return;S=g.target.value,m=1,k(),e.querySelector("#financeSearch").focus()},e.querySelector("#financePrev").onclick=()=>{m--,k()},e.querySelector("#financeNext").onclick=()=>{m++,k()},!A)return;Da(e);const b=async(g,F)=>{if(!u){u=!0,e.querySelectorAll(".finance-detail button").forEach(f=>{f.disabled=!0});try{const f=await K(g,{id:A.prId,...F});if(!f.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");o.data.tasks=o.data.tasks.map(L=>L.prId===A.prId?f.task:L),e.isConnected&&be===o&&k(),await G.applyResult(f),M(g==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(f){M(f.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(L=>{L.disabled=!1})}finally{u=!1}}};e.querySelectorAll("[data-progress]").forEach(g=>g.onclick=()=>b("financeProgress",{state:g.dataset.progress})),(z=e.querySelector("#remindFinance"))==null||z.addEventListener("click",()=>b("financeRemind",{})),(Z=e.querySelector("#sendToFinance"))==null||Z.addEventListener("click",()=>b("financeRelease",{}));const I=e.querySelector("#recordPayment");if(I){const g=I.querySelector(".attachment-picker");Na(g,{scope:"payment",prId:A.prId});const F=I.elements.amount,f=()=>{const V=I.elements.paymentMode.value==="full";F.readOnly=V,F.max=V?String(A.outstanding):(Math.round(A.outstanding*(A.currency==="JPY"?1:100))-1)/(A.currency==="JPY"?1:100),F.value=V?String(A.outstanding):"",e.querySelector("#paymentAmountHint").textContent=V?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",V||F.focus()};I.querySelectorAll('[name="paymentMode"]').forEach(V=>V.onchange=f),f();const L="finance-attempt:"+a.email+":"+A.prId,_=V=>{const J=JSON.stringify(V);let v;try{v=JSON.parse(sessionStorage.getItem(L))}catch{}const w=(v==null?void 0:v.signature)===J?v:{signature:J,id:crypto.randomUUID()};return sessionStorage.setItem(L,JSON.stringify(w)),w.id};I.onsubmit=async V=>{if(V.preventDefault(),!(u||!I.reportValidity())){u=!0,I.querySelector('[type="submit"]').disabled=!0;try{const J=await g.uploadFiles(),v=Object.fromEntries(new FormData(I));v.currency=A.currency,v.paymentMode==="full"&&(v.amount=String(A.outstanding)),J.length&&(v.attachments=J),u=!1,await b("financeRecordPayment",{...v,operationId:_(v)})}catch(J){M(J.message,!0)}finally{u=!1,I.isConnected&&(I.querySelector('[type="submit"]').disabled=!1)}}}}for(const[g,F]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const f=e.querySelector("#"+g);f&&(f.onsubmit=L=>{L.preventDefault(),f.reportValidity()&&b(F,Object.fromEntries(new FormData(f)))})}},N=(h,q,x)=>{const T=h.owner===a.email.toLowerCase(),A=q||T,j=h.released&&!h.issue&&h.state!=="Completed";return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${r(h.vendor)}</span><h2>${r(h.prId)}</h2><p>${r(h.poNo||"PO reference not recorded")} · Request: ${r(h.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(h.prId)}">Request &amp; delivery ${y("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${r(qe(h,h.total))}</b></div><div><span>Recorded paid</span><b>${r(qe(h,h.paid))}</b></div><div><span>Outstanding</span><b>${r(qe(h,h.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${r(h.state)}">${r(h.state)}</span><span>Responsible: <b>${r(h.owner||"Not started")}</b></span></div>
      ${h.issue?`<p class="finance-alert" role="status">${r(h.issue)}</p>`:""}
      ${h.released?`<p class="finance-note">Sent to Finance ${r(ae(h.sentAt))} by ${r(h.sentBy||"admin")}.</p>`:'<p class="finance-note">This request is with admin. Finance cannot see it until you send it.</p>'}
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
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${r(qe(h,h.outstanding))}</small></span></label>
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
      ${q&&h.released&&h.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${x.map(E=>`<option value="${r(E.email)}" ${E.email===h.owner?"selected":""}>${r(E.name||E.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${h.payments.map(E=>`<article><div><b>${r(qe(h,E.amount))}</b><span>${r(ae(E.date))} · ${r(E.reference)}</span></div><p>${r(E.recordedBy)}${E.note?" · "+r(E.note):""}</p>${/^https:\/\//i.test(E.proofUrl||"")?`<a href="${r(E.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${y("external")}</a>`:""}${Ta(E.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await d()}const X=(e,t)=>`<div class="pd-f"><span class="vc-l">${r(e)}</span><b>${t||"—"}</b></div>`;let Me=!1,aa=null;const na=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${r(kt(s||t))}</span>
    <div>
      <span class="vc-l">${r(e)}</span>
      <b>${r(t)}</b>
      <div class="pd-sub">${r(a||"")}</div>
    </div>
  </div>`;function gt(e,t,s){var V,J,v,w;const a=t.prs.find(c=>c.id===s);if(!a){e.innerHTML=`<div class="card">PR ${r(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}aa!==s&&(Me=!1,aa=s);const n=t.me||{role:"",email:"",department:""},i=n.role==="admin",o=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),d=i||n.role==="finance"&&(!((V=t.capabilities)!=null&&V.financeHandoff)||a.financeReleased),S=i||o&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),u=vn(a.status,n.role,o,m),k=(a.department||"").toLowerCase()==="production",N=i&&a.status==="Approved",P=i&&((J=t.capabilities)==null?void 0:J.financeHandoff)&&!a.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(a.status)&&!["Paid","FOC / Free"].includes(a.paymentStatus),h=i&&a.poNo&&!a.zohoPoId&&!((v=t.capabilities)!=null&&v.financeWorkflow),q=N?"":u.find(c=>!["Rejected","Cancelled","On Hold"].includes(c)),x=u.filter(c=>c!==q),T=c=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[c]||"Mark "+c.toLowerCase(),A=c=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[c]||"arrow",j=["Submitted","Approved","Ordered","In Transit","Received"],E=j.indexOf(a.status),O=(t.vendors||[]).find(c=>String(c.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),$=a.paymentTerm||O&&O.paymentTerms||"",b=t.lists&&t.lists.paymentTerms||[],I=["",...$&&!b.includes($)?[$,...b]:b].map(c=>`<option value="${r(c)}" ${c===$?"selected":""}>${c?r(c):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${y("right")}<span>${r(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${r(a.id)}</h1>${at(a.status)}</div>
          <p class="request-subtitle">${r(a.project||a.department||"Purchase request")} · Created ${ae(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${P?`<button class="btn primary" id="sendFinanceBtn">${y("wallet")} Send to Finance</button>`:""}
          ${N?`<button class="btn primary" id="makePoBtn">${y("file")} Create purchase order</button>`:""}
          ${q?`<button class="btn primary" data-to="${r(q)}">${y(A(q))}${r(T(q))}</button>`:""}
          ${S?`<a class="btn" href="#/new/${r(a.id)}">${y("edit")} Edit</a>`:""}
          ${x.length||h?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${y("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${h?`<button class="btn" id="zohoPushBtn">${y("arrow")} Send to Zoho Books</button>`:""}
              ${x.map(c=>`<button class="btn ${["Rejected","Cancelled"].includes(c)?"danger":""}" data-to="${r(c)}">${y(A(c))}${r(T(c))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${r(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${E===-1?"Currently "+r(a.status.toLowerCase()):E===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${j.map((c,C)=>`<li class="${C<E?"done":C===E?"current":""}" ${C===E?'aria-current="step"':""}><span class="step-dot">${C<E?y("check"):C+1}</span><span>${r(c)}</span></li>`).join("")}</ol>
      </section>

      ${N&&Me?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${r(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${r(Fe(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${I}</select>
          </label>
          ${O&&O.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${r(O.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${na("Requested by",Xt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+ae(a.createdAt))}
          ${a.approverEmail||a.approvedByName?na("Approved by",Xt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+ae(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${k?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(c=>`<tr>
            <td>${r(c.itemNo)}</td>
            <td class="wrap">${r(c.description)}</td>${k?`<td>${r(c.partNo)}</td>`:""}<td>${r(c.materialType)}</td>
            <td>${r([c.qty,c.unit].filter(Boolean).join(" "))}</td>
            <td>${c.unitPrice?r(Ce(a.currency||"INR",Number(c.unitPrice))):"—"}</td>
            <td>${c.lineTotal?r(Ce(a.currency||"INR",Number(c.lineTotal))):"—"}</td>
            <td>${c.purchaseLink?`<a href="${r(c.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${c.datasheetDoc?` <a href="${r(c.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${Ta(c.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${k?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?r(Ce(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${X("Expected",ae(a.expectedDate))}
          ${X("Received",ae(a.receivedAt))}
          ${X("Tracking",Kn(a))}
          ${X("Notes",r(a.notes))}
        </div>
        </div>
      </div>

      ${d&&((w=t.capabilities)!=null&&w.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(a.status)?`<div class="card pd-body"><h2>Payment work</h2><p>${a.financeReleased?"Sent to Finance. View responsibility and payment records.":"With admin. Hidden from Finance until you send it."}</p><a class="btn" href="#/payments/${encodeURIComponent(a.id)}">${y("wallet")} View payment details</a></div>`:""}

      ${d?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${X("PO reference",[r(a.poNo),ae(a.poDate)].filter(Boolean).join(" · "))}
          ${X("Invoice / order #",[r(a.invoiceNo),ae(a.invoiceDate)].filter(Boolean).join(" · "))}
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
    </div>`,Da(e);const D=e.querySelector("#requestMore");e.onclick=c=>{D&&!D.contains(c.target)&&(D.open=!1)},e.onkeydown=c=>{c.key==="Escape"&&(D!=null&&D.open)&&(D.open=!1,D.querySelector("summary").focus())},D==null||D.addEventListener("focusout",c=>{D.contains(c.relatedTarget)||(D.open=!1)}),e.querySelectorAll("[data-to]").forEach(c=>c.onclick=async()=>{const C=c.dataset.to;if((C==="Rejected"||C==="Cancelled")&&!confirm(`Mark ${a.id} as ${C}?`))return;const H=c.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(U=>{U.disabled=!0}),c.innerHTML=y("refresh","spin")+" Updating…";try{const U=await K("transition",{id:a.id,to:C});M(a.id+" → "+C),await G.applyResult(U)}catch(U){M(U.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(te=>{te.disabled=!1}),c.innerHTML=H}});const z=e.querySelector("#makePoBtn"),Z=e.querySelector("#sendFinanceBtn");Z&&(Z.onclick=async()=>{Z.disabled=!0;try{const c=await K("financeRelease",{id:a.id});ss(),await G.applyResult(c),M(a.id+" sent to Finance")}catch(c){M(c.message,!0),Z.disabled=!1}}),z&&(z.onclick=()=>{var c,C;Me=!0,gt(e,t,s),et((c=e.querySelector("#poForm"))==null?void 0:c.closest(".card")),(C=e.querySelector("[name=poNo]"))==null||C.focus()});const g=e.querySelector("#poCancelBtn");g&&(g.onclick=()=>{Me=!1,gt(e,t,s)});const F=e.querySelector("#poForm"),f=F?Pa(F):null;F&&(F.onsubmit=async c=>{if(c.preventDefault(),!f())return;const C=new FormData(F),H=String(C.get("poNo")||"").trim();if(!H)return;const U=F.querySelector('button[type="submit"]');U.disabled=!0;let te;try{te=await K("update",{id:a.id,updates:{poNo:H,poDate:C.get("poDate")||"",paymentTerm:C.get("paymentTerm")||""}});const le=await K("transition",{id:a.id,to:"Ordered"});M(a.id+" → Ordered (PO "+H+")"),Me=!1,await G.applyResult(le)}catch(le){te&&await G.applyResult(te),M(le.message,!0),U.disabled=!1}});const L=e.querySelector("#zohoPushBtn");L&&(L.onclick=async()=>{L.disabled=!0;try{const{pr:c}=await K("zohoPushPo",{id:a.id});M(a.id+" → Zoho Books PO "+c.zohoPoNumber),await G.applyResult({pr:c})}catch(c){M(c.message,!0),L.disabled=!1}});const _=e.querySelector("#devDelete");_&&(_.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){_.disabled=!0;try{const c=await K("delete",{id:a.id});M(a.id+" deleted"),location.hash="#/",await G.applyResult(c)}catch(c){M(c.message,!0),_.disabled=!1}}})}let Ye=null,pe=null,$t="";const rs=["Domestic","International"];function Tt(e){return Ye===null&&(Ye=e.vendors||[]),Ye}function is(e){const t=e.lists&&e.lists.departments||[],s=Tt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const ie=(e,t,s,a="")=>`<label class="adm-field">${r(e)}
    <input class="adm-input" name="${t}" value="${r(s||"")}" placeholder="${r(a)}">
  </label>`;function os(e,t){const s=Tt(e),a=pe&&s.find(i=>i.name.toLowerCase()===pe.toLowerCase());if(a)return ls(e,a);const n=[...s].sort((i,o)=>i.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${rt($t,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${Rt(i.name,i.displayName,i.category,i.type,(i.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${r(i.name)}</td>
            <td>${(i.departments||[]).map(o=>`<span class="adm-chip on">${r(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${r(i.type||"—")}</td>
            <td>${r(i.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${r(i.name)}" title="Remove vendor">
                ${y("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${Ct(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ma(n.length,n.length)}</span></div>
    </div>`}const Ma=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function ls(e,t){const s=qt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],i=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${r(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?r(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${r(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${r(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${y("close")}</button>
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
          ${ie("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${ie("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${ie("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...rs].map(o=>`<option value="${r(o)}" ${o===(t.type||"")?"selected":""}>${o?r(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${ie("Contact person","contactPerson",t.contactPerson)}
          ${ie("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${r(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${r(t.address||"")}"></label>
        <div class="adm-grid2">
          ${ie("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${ie("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${r(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${ie("Account number","accountNumber",t.accountNumber)}
          ${ie("IFSC","ifsc",t.ifsc)}
        </div>
        ${ie("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${i}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${ie("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function ds(e,t,s){const a=async(m,u,k)=>{try{const N=await K(m,u);Ye=N.vendors,await G.applyResult(N),M(k),e.isConnected&&s()}catch(N){M(N.message,!0)}};Pt(e,{get:()=>$t,set:m=>{$t=m},count:Ma,match:m=>new Set(wa(Tt(t),m).map(u=>u.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=u=>{u.target.closest(".vRm")||(pe=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){M("Vendor name required",!0);return}pe=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const i=()=>{pe=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=i);const d=e.querySelector("#vCancel");d&&(d.onclick=i),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const S=e.querySelector("#vForm");S&&(S.onsubmit=m=>{m.preventDefault();const u={};for(const[N,P]of new FormData(S))u[N]=P.trim();u.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(N=>N.dataset.dept);const k=u.name||pe;a("vendorSet",{name:pe,updates:u},`${k} saved`),pe=k})}function cs(){pe=null}const Ie=["admin","approver","finance","requester"],ms={admin:"Full access to settings, users, PRs, and analytics.",approver:"Creates own PRs and approves or rejects submitted requests in their department.",finance:"Creates own PRs and handles payments for requests sent by admin. In progress assigns responsibility through completion.",requester:"Creates, tracks and edits own submitted PRs. No approval, payment or admin access."},sa=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let se="users",Ae=null,xe=null,_e="",wt="",Pe=null,Oe=null,ce=!1;const ra={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Pe,set:e=>{Pe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Oe,set:e=>{Oe=e},seed:e=>e.materialTypes}};function us(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%sa.length;return sa[t]}const mt=e=>e[0].toUpperCase()+e.slice(1),ps={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${y("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${y("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${y("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${y("vendors")} Add Vendor`}};function ge(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(_e!==s&&(_e=s,Ae=null,xe=null,Pe=null,Oe=null),Ae===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${y("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const i=e.querySelector("#adminUsersLoading"),o=xe||(xe=K("usersList"));o.then(d=>{if(_e===s){if(!Array.isArray(d.users))throw new Error("The server did not return users. Please retry.");Ae=d.users,e.contains(i)&&ge(e,t)}}).catch(d=>{_e!==s||!e.contains(i)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${r(d.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{xe=null,ge(e,t)})}).finally(()=>{xe===o&&(xe=null)});return}Pe===null&&(Pe=t.projects||[]),Oe===null&&(Oe=t.materialTypes||[]);const a=ps[se];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${a.title}</h1>
          <p>${a.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${a.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${se==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${se==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${se==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${se==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${se==="users"?hs(t):se==="vendors"?os(t,ce):ys(t,ra[se])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(i=>i.onclick=()=>{se=i.dataset.tab,ce=!1,cs(),ge(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(ce=!ce,ge(e,t),ce){const i=e.querySelector(".adm-addrow input, .adm-addrow select");i&&i.focus()}},se==="users"?vs(e,t):se==="vendors"?ds(e,t,()=>{ce=!1,ge(e,t)}):fs(e,t,ra[se])}function hs(e){const t=a=>(Ie.includes(a.role)?Ie:[a.role,...Ie]).map(n=>`<option value="${r(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?r(mt(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Ze(e).includes(a)?[a,...Ze(e)]:Ze(e)].map(n=>`<option value="${r(n)}" ${n===(a||"")?"selected":""}>${n?r(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${y("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${rt(wt,"Search by name or email…")}
      ${ce?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${Ie.map(a=>`<option value="${a}">${mt(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...Ae].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||nt(a.email);return`<tr data-search="${Rt(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${us(a.email)}">${r(kt(a.email))}${a.picture?`<img src="${r(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${y("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${Ct(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${Ae.length} of ${Ae.length} active members</span>
        <div class="adm-pager">
          <button disabled>${y("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${y("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${Ie.map(a=>`<div class="adm-rolecard">
        <h4>${mt(a)}</h4>
        <p>${ms[a]}</p>
      </div>`).join("")}
    </div>`}function vs(e,t){Pt(e,{get:()=>wt,set:n=>{wt=n},count:(n,i)=>`Showing ${n} of ${i} active members`});const s=async(n,i,o)=>{try{const d=await K("userSet",{email:n,...i});Ae=d.users,ce=!1,await G.applyResult(d),M(o),e.isConnected&&ge(e,t)}catch(d){M(d.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),i=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:i,department:o},`${n} → ${i}`)})}function Ze(e){const t=e.lists&&e.lists.departments||[],s=(Pe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function ys(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${rt(t.q,`Search ${t.plural} by name or department…`)}
      ${ce?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Ze(e).map(a=>`<option value="${r(a)}">${r(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${Rt(a.department,a[t.key])}">
            <td class="adm-name">${r(a.department)}</td>
            <td>${r(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${r(a.department)}" data-val="${r(a[t.key])}" title="Remove">
                ${y("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${Ct(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Ia(s.length,s.length,t)}</span>
      </div>
    </div>`}const Ia=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function fs(e,t,s){Pt(e,{get:()=>s.q,set:i=>{s.q=i},count:(i,o)=>Ia(i,o,s)});const a=async(i,o,d)=>{try{const S=await K(i,o);s.set(S[s.respKey]),ce=!1,await G.applyResult(S),M(d),e.isConnected&&ge(e,t)}catch(S){M(S.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const i=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:i,[s.key]:o},`${i} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(i=>i.onclick=()=>{const{dept:o,val:d}=i.dataset;confirm(`Remove "${d}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:d},`${d} removed`)})}const ia={requester:0,approver:1,finance:1,admin:2};function oa(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=ia[t.role];return s!=null&&s>=ia[e.minRole]}const xa=document.getElementById("app"),ut={"":{fn:fa,nav:"Dashboard",icon:"grid"},vendors:{fn:Bn,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:qa,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:Ea,nav:"Payments",icon:"wallet",roles:["admin","finance"]},new:{fn:as,roles:["requester","approver","finance","admin"]},pr:{fn:gt},admin:{fn:ge,nav:"Admin",icon:"settings",minRole:"admin"}};let $e,la=null;function Fa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function bs(){$e==null||$e.abort(),xa.innerHTML=`<div class="auth-gate">
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
  </div>`,Ka(document.getElementById("gsignin"))}function Oa(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=y("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function Ba(){var Z,g,F;const e=G.get(),{name:t,param:s}=Fa(),a=ut[t]||ut[""],n=((Z=e.me)==null?void 0:Z.role)||"";if(e.me&&!oa(a,e.me)){location.hash="#/";return}$e==null||$e.abort(),$e=new AbortController;const i=$e.signal,o=Object.entries(ut).filter(([,f])=>{var L;return f.nav&&e.me&&oa(f,e.me)&&(f.fn!==Ea||((L=e.capabilities)==null?void 0:L.financeWorkflow))}).map(([f,L])=>`<a href="#/${f}" ${t===f?'aria-current="page"':""} class="${t===f?"active":""}">${y(L.icon)}<span>${L.nav}</span>${t===f?'<span class="nav-dot"></span>':""}</a>`).join(""),d=e.notifications||[],S=d.filter(f=>!f.readAt).length,m=Va()||{},u=m.email||((g=e.me)==null?void 0:g.email)||"",k=m.name||nt(u),N=m.picture?`<img class="avatar" src="${r(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${r(kt(k))}</span>`,P=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=P+" · Oizom Procurement",xa.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${y("right")} <b>${r(P)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${y("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${S?", "+S+" unread":""}" aria-expanded="false" aria-controls="nPanel">${y("bell")}${S?`<span class="nbadge">${S>9?"9+":S}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${S?S+" new":"All caught up"}</span></div>
              ${d.length?d.map(f=>`<${f.prId?"a":"div"} class="nitem ${f.readAt?"":"unread"}" ${f.prId?`href="#/pr/${r(f.prId)}"`:""}><div class="nmsg">${r(f.message)}</div><div class="ntime">${r(String(f.ts).slice(0,16).replace("T"," "))}</div></${f.prId?"a":"div"}>`).join(""):`<div class="nempty">${y("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${N}<span class="profile-copy"><span class="pname">${r(k)}</span><span class="prole">${r(n||"Oizom team")}</span></span>${y("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${r(u)}</div><button class="btn" id="btnOut">${y("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Oa(e),document.getElementById("btnRefresh").onclick=async()=>{await G.refresh(),G.get().err||M("Data refreshed")};const h=document.getElementById("nPanel"),q=document.getElementById("nBtn"),x=document.getElementById("pMenu"),T=document.getElementById("profileBtn"),A=()=>{h.hidden=x.hidden=!0,q.setAttribute("aria-expanded","false"),T.setAttribute("aria-expanded","false")};q.onclick=()=>{var L;const f=h.hidden;A(),h.hidden=!f,q.setAttribute("aria-expanded",String(f)),f&&S&&(d.forEach(_=>{_.readAt||(_.readAt="now")}),(L=document.querySelector(".nbadge"))==null||L.remove(),K("notifRead").catch(()=>{}))},T.onclick=()=>{const f=x.hidden;A(),x.hidden=!f,T.setAttribute("aria-expanded",String(f))},document.getElementById("btnOut").onclick=_a,document.addEventListener("click",f=>{f.target.closest(".nbell, .profile-wrap")||A()},{signal:i});const j=document.getElementById("sidebar"),E=document.getElementById("workspace"),O=document.getElementById("openNav"),$=document.getElementById("shell"),b=matchMedia("(max-width: 960px)");let I=!1;const D=(f,L=!0)=>{var _;I=b.matches&&f,$.classList.toggle("nav-open",I),j.inert=b.matches&&!I,E.inert=I,document.getElementById("navBackdrop").hidden=!I,O.setAttribute("aria-expanded",String(I)),document.body.classList.toggle("nav-locked",I),I?(_=j.querySelector("nav a"))==null||_.focus():L&&b.matches&&O.focus()};D(!1,!1),O.onclick=()=>D(!0),document.getElementById("closeNav").onclick=()=>D(!1),document.getElementById("navBackdrop").onclick=()=>D(!1),j.querySelectorAll("a").forEach(f=>f.addEventListener("click",()=>D(!1),{signal:i})),b.addEventListener("change",()=>D(!1,!1),{signal:i}),document.addEventListener("keydown",f=>{if(f.key==="Escape"&&(I?D(!1):h.hidden?x.hidden||(A(),T.focus()):(A(),q.focus())),f.key==="Tab"&&I){const L=[...j.querySelectorAll("a, button")],_=L[0],V=L[L.length-1];f.shiftKey&&document.activeElement===_?(f.preventDefault(),V.focus()):!f.shiftKey&&document.activeElement===V&&(f.preventDefault(),_.focus())}},{signal:i});const z=document.getElementById("view");if(document.querySelector(".skip-link").onclick=f=>{f.preventDefault(),z.focus()},!e.lastSync)z.innerHTML=e.err?`<div class="connection-state">${y("info")}<h1>We couldn't load your workspace</h1><p>${r(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(F=document.getElementById("retryLoad"))==null||F.addEventListener("click",()=>G.refresh(),{signal:i});else{a.fn(z,e,s);const f=t+"/"+(s||"");la!==f&&ja(z),la=f}}window.addEventListener("hashchange",()=>{Ba(),window.scrollTo({top:0,behavior:"instant"})});let da="",ca=!1;G.subscribe(e=>{e.err&&e.err!==da&&M(e.err,!0),da=e.err;const t=!ca&&e.lastSync;if(t&&(ca=!0),e.lastSync&&(e.loading||e.err)||["new","payments"].includes(Fa().name)&&!t&&e.lastSync&&document.querySelector("#view form")){Oa(e);return}Ba()});Ga(()=>G.refresh());tt()||bs();
