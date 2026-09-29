(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Ca;const ye=typeof window<"u"?(Ca=window.matchMedia)==null?void 0:Ca.call(window,"(prefers-reduced-motion: reduce)"):null,Xe=new Set,tn="cubic-bezier(.2,.75,.25,1)";var Ta;(Ta=ye==null?void 0:ye.addEventListener)==null||Ta.call(ye,"change",e=>{e.matches&&Xe.forEach(t=>t.cancel())});function dt(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||ye!=null&&ye.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:tn,fill:"backwards"});return r.id="workspace-reveal",Xe.add(r),r.finished.then(()=>Xe.delete(r),()=>Xe.delete(r)),r}function an(e){if(ye!=null&&ye.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||dt(a,{delay:Math.min(s++*22,154),distance:10})}}const La={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},st="oizom-id-token";let Qt=null;function nn(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function ct(){const e=localStorage.getItem(st);return e?nn(e)<Date.now()+3e4?(localStorage.removeItem(st),null):e:null}function sn(){const e=ct();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function rn(){localStorage.removeItem(st),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function on(e){if(Qt=e,ct()){e();return}Dt(()=>{google.accounts.id.initialize({client_id:La.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(st,t.credential),Qt()}}),google.accounts.id.prompt()})}function Dt(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>Dt(e,t+1),100)}function ln(e){Dt(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class St extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const Da=new Set(["list","me","usersList","health","logTail","financeList","financeGet","attachmentDownload"]),dn=new Set([404,408,429,500,502,503,504]),cn=45e3;function un(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function ze(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=Da.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new St(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||dn.has(t)})}async function mn(e,t){var d;const s=Date.now(),a=ct();if(!a)throw new St("SIGNED_OUT");let n;try{n=await fetch(La.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:cn),body:JSON.stringify({...t,action:e,token:a})})}catch($){throw ze(e,{kind:["TimeoutError","AbortError"].includes($.name)?"timeout":"network"})}const r=un(n);if(!n.ok)throw ze(e,{status:n.status,stage:r,kind:"http"});let o;try{o=await n.json()}catch{throw ze(e,{stage:r,kind:"response"})}if(!o||typeof o.ok!="boolean"||o.ok&&e==="list"&&!Array.isArray(o.prs))throw ze(e,{stage:r,kind:"response"});if(!o.ok)throw new St(o.error||"Request failed",{action:e});return Number.isFinite((d=o.timing)==null?void 0:d.serverMs)&&console.info("[Procurement timing]",{action:e,totalMs:Date.now()-s,serverMs:o.timing.serverMs,authMs:o.timing.authMs,actionMs:o.timing.actionMs}),o}async function z(e,t={}){for(let s=0;s<2;s++)try{return await mn(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!Da.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function pn(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function yn(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function hn(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function vn(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Xt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:hn(n),qty:vn(n)}})}let W={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const kt=new Set;let ea=!1,Fe=null,We=0,Oe=null;function fn(e,t){var r;const s=o=>{var d;return[(d=o==null?void 0:o.email)==null?void 0:d.toLowerCase(),o==null?void 0:o.role,o==null?void 0:o.department].join("|")};if(s(e.me)!==s(W.me)||!t.length)return null;const a=[...e.prs];let n=e.items||[];for(const o of t){if(!o.pr||["task","deleted","users","vendors","projects","materialTypes","notifications"].some(y=>o[y]!=null))return null;const d=a.findIndex(y=>y.id===o.pr.id),$=Date.parse(o.pr.updatedAt),c=Date.parse((r=a[d])==null?void 0:r.updatedAt);if(d<0||!Number.isFinite($)||!Number.isFinite(c))return null;if($>c){const y=a[d];a[d]={...o.pr};for(const q of["paymentWork","financeReleased"])!(q in o.pr)&&q in y&&(a[d][q]=y[q]);Array.isArray(o.items)&&(n=[...n.filter(q=>q.prId!==o.pr.id),...o.items.map(q=>({...q,prId:o.pr.id}))])}}return{...e,prs:a,items:n}}function ta(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function vt(){kt.forEach(e=>e(W))}const Y={get:()=>W,subscribe(e){return kt.add(e),()=>kt.delete(e)},refresh(){return Fe||(W={...W,loading:!0},Fe=Promise.resolve().then(async()=>{try{let e,t;do if(t=We,Oe=[],e=await z("list"),ta(e),t!==We){const s=fn(e,Oe);if(s){e=s;break}}while(t!==We);ta(e),W={prs:Xt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},ea=!0}catch(e){if(e.message==="SIGNED_OUT"&&ea){location.reload();return}W={...W,err:e.message,loading:!1}}}).finally(()=>{Fe=null,Oe=null,W={...W,loading:!1},vt()}),vt(),Fe)},async applyResult(e,{itemsChanged:t=!1}={}){We++,Oe&&Oe.push(t&&!Array.isArray(e.items)?{}:e);const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=W.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return Y.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(d=>({...d,prId:e.pr.id})),o=Xt([e.pr],r)[0];for(const d of["paymentWork","financeReleased"])!(d in e.pr)&&n&&d in n&&(o[d]=n[d]);s.prs=n?W.prs.map(d=>d.id===o.id?o:d):[...W.prs,o]}a=!0}e.deleted&&(s.prs=W.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=W.me&&e.users.find(r=>r.email.toLowerCase()===W.me.email.toLowerCase());if(W.me&&(!n||!n.role))return Y.refresh();n&&(s.me={...W.me,role:n.role,department:n.department}),a=!0}if(!a)return Y.refresh();W={...W,...s},vt()}},aa={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function f(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${aa[e]||aa.file}</svg>`}const i=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ut(e){return`<span class="chip ${i(e)}" data-s="${i(e)}">${i(e)}</span>`}function B(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${f(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const oe=e=>e?i(String(e).slice(0,10)):"—";function mt(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function Nt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const na={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},et=e=>na[e]!=null?na[e]:e+" ";function Me(e,t){const s=e==="INR"?"en-IN":"en-US";return et(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function me(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?et(e)+(t/1e6).toFixed(2)+"M":t>=1e3?et(e)+(t/1e3).toFixed(1)+"K":et(e)+Math.round(t).toLocaleString("en-US")}const Ge=["Cancelled","Rejected"],bn=["Ordered","In Transit","Received"],pt=e=>bn.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function sa(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function ra(e){const t=e.filter(n=>!Ge.includes(n.status)),s=e.filter(pt),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:sa(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:sa(t)}}const rt={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:pt,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Ge.includes(e.status)};function gn(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function ia(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function Na(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function $n(e){return e.filter(pt)}function wn(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function Sn(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function oa(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let o;if(t==="count")o=1;else{if(Ge.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const d=Number(n.amount);if(!n.amount||!isFinite(d)||(n.currency||"Unknown")!==s)continue;o=d}a[r]=(a[r]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function kn(e,t){const s={};for(const a of e){if(Ge.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function qn(e,t,s=6){const a={};for(const o of e){if(Ge.includes(o.status)||(o.currency||"Unknown")!==t)continue;const d=Number(o.amount);if(!o.amount||!isFinite(d))continue;const $=o.vendor||"Unspecified";a[$]=(a[$]||0)+d}const n=Object.entries(a).map(([o,d])=>({vendor:o,total:d})).sort((o,d)=>d.total-o.total);if(n.length<=s)return n;const r=n.slice(s).reduce((o,d)=>o+d.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function An(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Rn(e){const t=(r,o)=>{const d=Date.parse(r),$=Date.parse(o);return isFinite(d)&&isFinite($)?($-d)/864e5:null},s=r=>r.length?r.reduce((o,d)=>o+d,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Pn=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Cn(e,t=Date.now()){const s=Pn.map(a=>({...a,count:0}));return e.filter(pt).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(o=>r>=o.min&&r<=o.max)||s[s.length-1]).count++}),s}const Ne=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Ea=["Unpaid","Paid","Partially Paid","FOC / Free"],it={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Tn(e,t,s,a,n){const r=(it[e]||{})[t];return r?r.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function Ln(e,t,s,a){return Object.keys(it[e]||{}).filter(n=>Tn(e,n,t,s,a))}function Dn(e,t){return!!(it[e]&&it[e][t])}function la(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),d=String(a||"").trim();return r&&o&&r===o&&d?d:mt(t)}const Ma={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Ia(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Nn(e){const t=String(e.trackingNo||"").trim(),s=Ia(e.trackingLink)||(t?(Ma[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[i(e.courier||""),s?`<a href="${i(s)}" target="_blank" rel="noopener noreferrer">${i(t||"Track shipment")} ↗</a>`:i(t)].filter(Boolean).join(" ")}function En(e,t=[]){const s=[...new Set([...t,...Object.keys(Ma),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${i(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${i(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${i(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${i(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function Mn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Ia(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const In="1900-01-01",Fn="2100-12-31",On="Enter a complete date with a year between 1900 and 2100.";function _e(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Fa(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(On)};return t.forEach(a=>{a.min=In,a.max=Fn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const xn=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function yt(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function Oa(e){return`<div class="attachment-links">${yt(e).map(t=>`<button type="button" class="attachment-link" data-download="${i(t.id)}">${f("file")}${i(t.name)}</button>`).join("")}</div>`}function xa(e=[]){return`<div class="attachment-picker" data-attachments="${i(JSON.stringify(yt(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${f("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${xn}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const Bn=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function Ba(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=yt(e.dataset.attachments).map(y=>({attachment:y})),r=e.querySelector(".attachment-selection"),o=e.querySelector("input"),d=e.querySelector(".attachment-status"),$=()=>{e.dataset.attachments=JSON.stringify(n.filter(y=>y.attachment).map(y=>y.attachment))},c=()=>{r.innerHTML=n.map((y,q)=>{var R,A;return`<div class="attachment-chip">${f("file")}<span>${i(((R=y.attachment)==null?void 0:R.name)||y.file.name)}${y.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${q}" aria-label="Remove ${i(((A=y.attachment)==null?void 0:A.name)||y.file.name)}" ${a?"disabled":""}>${f("close")}</button></div>`}).join(""),r.querySelectorAll("[data-remove]").forEach(y=>y.onclick=()=>{a||(n.splice(Number(y.dataset.remove),1),$(),c())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const y=[...o.files];if(n.length+y.length>3)throw new Error("Attach up to 3 files per item or payment");for(const q of y){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(q.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!q.size||q.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}y.forEach(q=>n.push({file:q,operationId:crypto.randomUUID()})),d.textContent="Files will upload when you save.",c()}catch(y){B(y.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var y;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,c();try{for(const q of n){if(q.attachment)continue;d.textContent="Uploading "+q.file.name+"…";const R=await z("attachmentUpload",{scope:t,prId:s,name:q.file.name,operationId:q.operationId,base64:await Bn(q.file)});if(!((y=R.attachment)!=null&&y.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");q.attachment=R.attachment,$(),c()}return d.textContent=n.length?"Attachments ready.":"",n.map(q=>q.attachment)}catch(q){throw d.textContent="Upload not confirmed. Your selected files are kept here for retry.",q}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,c()}},e.hasPendingFiles=()=>n.some(y=>!y.attachment),c()}function ja(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await z("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),r=document.createElement("a");r.href=n,r.download=s.attachment.name,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){B(s.message,!0)}finally{t.disabled=!1}}})}const da=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],jn=e=>e==="Open"?"Outstanding":e;let Le={viewer:"",sync:null,data:null,pending:null};const De=new Map;let $e="Open";function ca(){Le.data=null,De.clear()}const Te=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Me(e.currency,t),ua=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Un(e,t,s,a={}){var C,I;const n=t.me,r=!!((C=t.capabilities)!=null&&C.poFinanceHandoff);if(!n||!["admin","finance"].includes(n.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((I=t.capabilities)!=null&&I.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const o=n.email+"|"+n.role,d=String(t.lastSync);(Le.viewer!==o||Le.sync!==d)&&(Le={viewer:o,sync:d,data:null,pending:null},$e="Open");const $=o+"|"+s;a.detailOnly&&(!De.has($)||De.get($).sync!==d)&&De.set($,{viewer:o,sync:d,data:null,pending:null});const c=a.detailOnly?De.get($):Le,y=()=>a.detailOnly?De.get($)===c:Le===c,q=async(v=!1)=>{var j;if(v&&(c.data=null),!c.data){e.innerHTML=`<div class="connection-state" role="status">${f("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{c.pending||(c.pending=(a.detailOnly&&((j=t.capabilities)!=null&&j.paymentDrawer)?z("financeGet",{id:s}):z("financeList")).finally(()=>{c.pending=null}));const b=await c.pending;if(!Array.isArray(b.tasks)||!Array.isArray(b.financeUsers))throw new Error("The server did not return payment records.");c.data=b}catch(b){if(!e.isConnected||!y())return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${i(b.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>q(!0);return}}!e.isConnected||!y()||T()};let R="",A=1,E=!1;const T=()=>{var K,Q,ee,S,P;const{tasks:v,financeUsers:j}=c.data,b=n.role==="admin",g=b?["Awaiting admin",...da]:da,m=s&&v.find(h=>h.prId===s),L=h=>$e==="All"||($e==="Open"?h.state!=="Completed":$e==="Mine"?h.owner===n.email:h.state===$e),F=v.filter(L).filter(h=>[h.prId,h.poNo,h.vendor,h.owner].join(" ").toLowerCase().includes(R.toLowerCase())),N=Math.max(1,Math.ceil(F.length/25));A=Math.min(A,N);const X=(b?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(h=>[h,v.filter(D=>D.state===h).length]);e.innerHTML=a.detailOnly?`<div class="payments-page payment-detail-only">${m?_(m,b,j):'<div class="connection-state"><h2>No payment work yet</h2><p>The request stays with admin until its PO is ready.</p></div>'}</div>`:`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${b?r?"Create the PO when ready. Payment work goes to Finance automatically.":"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${f("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${X.map(([h,D])=>`<button class="kpi clickable" data-stage="${h}"><span class="l">${h}</span><span class="v">${D}</span></button>`).join("")}</div>
      ${m?_(m,b,j):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${b?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${v.length}</span></h2><p>${b?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${g.map(h=>`<button class="view-pill ${h===$e?"selected":""}" data-stage="${h}" aria-pressed="${h===$e}">${jn(h)}</button>`).join("")}</div>
      <label class="search-input">${f("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${i(R)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${F.slice((A-1)*25,A*25).map(h=>`<tr><td><a href="#/payments/${encodeURIComponent(h.prId)}"><b>${i(h.prId)}</b></a><small class="finance-sub">${i(h.vendor)}</small></td><td>${i(h.poNo||"—")}</td><td>${i(Te(h,h.outstanding))}<small class="finance-sub">${i(h.paymentStatus)}</small></td><td>${i(h.owner||"Not started")}</td><td><span class="finance-status" data-state="${i(h.state)}">${i(h.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(h.prId)}" aria-label="View payment details ${i(h.prId)}">View details ${f("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${A===1?"disabled":""}>Previous</button><span>${F.length} results · Page ${A} of ${N}</span><button class="btn" id="financeNext" ${A===N?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${f("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${b?`<p class="finance-note">${f("info")} ${i(((K=c.data.zoho)==null?void 0:K.message)||"")}</p>`:""}
    </div>`;const se=e.querySelector("#reloadPayments");se&&(se.onclick=()=>{E||q(!0)}),e.querySelectorAll("[data-stage]").forEach(h=>h.onclick=()=>{E||($e=h.dataset.stage,A=1,T())});const le=e.querySelector("#financeSearch");if(le&&(le.oninput=h=>{if(E)return;R=h.target.value,A=1,T(),e.querySelector("#financeSearch").focus()}),(Q=e.querySelector("#financePrev"))==null||Q.addEventListener("click",()=>{A--,T()}),(ee=e.querySelector("#financeNext"))==null||ee.addEventListener("click",()=>{A++,T()}),!m)return;a.onRequest&&e.querySelectorAll('a[href^="#/pr/"]').forEach(h=>h.onclick=D=>{D.preventDefault(),a.onRequest()}),ja(e);const w=async(h,D)=>{var H,U,ae;if(!E){E=!0,(H=a.onBusy)==null||H.call(a,!0),e.querySelectorAll(".finance-detail button").forEach(V=>{V.disabled=!0});try{const V=await z(h,{id:m.prId,...D});if(!V.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");c.data.tasks=c.data.tasks.map(Z=>Z.prId===m.prId?V.task:Z),e.isConnected&&y()&&T(),await Y.applyResult(V),(U=a.onSaved)==null||U.call(a),B(h==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(V){B(V.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(Z=>{Z.disabled=!1})}finally{E=!1,(ae=a.onBusy)==null||ae.call(a,!1)}}};e.querySelectorAll("[data-progress]").forEach(h=>h.onclick=()=>w("financeProgress",{state:h.dataset.progress})),(S=e.querySelector("#remindFinance"))==null||S.addEventListener("click",()=>w("financeRemind",{})),(P=e.querySelector("#sendToFinance"))==null||P.addEventListener("click",()=>w("financeRelease",{}));const O=e.querySelector("#recordPayment");if(O){const h=O.querySelector(".attachment-picker");Ba(h,{scope:"payment",prId:m.prId});const D=O.elements.amount,H=()=>{const V=O.elements.paymentMode.value==="full";D.readOnly=V,D.max=V?String(m.outstanding):(Math.round(m.outstanding*(m.currency==="JPY"?1:100))-1)/(m.currency==="JPY"?1:100),D.value=V?String(m.outstanding):"",e.querySelector("#paymentAmountHint").textContent=V?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",V||D.focus()};O.querySelectorAll('[name="paymentMode"]').forEach(V=>V.onchange=H),H();const U="finance-attempt:"+n.email+":"+m.prId,ae=V=>{const Z=JSON.stringify(V);let p;try{p=JSON.parse(sessionStorage.getItem(U))}catch{}const M=(p==null?void 0:p.signature)===Z?p:{signature:Z,id:crypto.randomUUID()};return sessionStorage.setItem(U,JSON.stringify(M)),M.id};O.onsubmit=async V=>{var Z,p;if(V.preventDefault(),!(E||!O.reportValidity())){E=!0,(Z=a.onBusy)==null||Z.call(a,!0),O.querySelector('[type="submit"]').disabled=!0;try{const M=await h.uploadFiles(),G=Object.fromEntries(new FormData(O));G.currency=m.currency,G.paymentMode==="full"&&(G.amount=String(m.outstanding)),M.length&&(G.attachments=M),E=!1,await w("financeRecordPayment",{...G,operationId:ae(G)})}catch(M){B(M.message,!0)}finally{E=!1,(p=a.onBusy)==null||p.call(a,!1),O.isConnected&&(O.querySelector('[type="submit"]').disabled=!1)}}}}for(const[h,D]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const H=e.querySelector("#"+h);H&&(H.onsubmit=U=>{U.preventDefault(),H.reportValidity()&&w(D,Object.fromEntries(new FormData(H)))})}},_=(v,j,b)=>{const g=v.owner===n.email.toLowerCase(),m=j||g,L=v.released&&!v.issue&&v.state!=="Completed",F=r&&(v.requestStatus==="Approved"||!v.poNo);return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${i(v.vendor)}</span><h2>${i(v.prId)}</h2><p>${i(v.poNo||"PO reference not recorded")} · Request: ${i(v.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(v.prId)}">Request &amp; delivery ${f("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${i(Te(v,v.total))}</b></div><div><span>Recorded paid</span><b>${i(Te(v,v.paid))}</b></div><div><span>Outstanding</span><b>${i(Te(v,v.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${i(v.state)}">${i(v.state)}</span><span>Responsible: <b>${i(v.owner||"Not started")}</b></span></div>
      ${v.issue?`<p class="finance-alert" role="status">${i(v.issue)}</p>`:""}
      ${v.released?`<p class="finance-note">Sent to Finance ${i(oe(v.sentAt))} by ${i(v.sentBy||"admin")}.</p>`:`<p class="finance-note">${F?"This request stays with admin until the PO is recorded and sent to Finance.":"This request is with admin. Finance cannot see it until you send it."}</p>`}
      ${!j&&v.owner&&!g?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${j&&!v.released&&!v.issue&&v.state!=="Completed"?F?`<a class="btn primary" href="#/pr/${encodeURIComponent(v.prId)}">${v.requestStatus==="Approved"?"Create PO &amp; send to Finance":"Add PO details"}</a>`:'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${L&&(v.owner?m:!j)&&v.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${L&&m&&v.owner&&v.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${j&&v.released&&v.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${v.lastReminderAt?`<p class="finance-note">Last reminder: ${i(new Date(v.lastReminderAt).toLocaleString())}</p>`:""}
      ${j&&!v.owner&&L?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${L&&m&&v.owner&&v.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <fieldset class="payment-mode"><legend>Payment amount</legend><div class="payment-mode-options">
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${i(Te(v,v.outstanding))}</small></span></label>
          <label><input type="radio" name="paymentMode" value="partial"><span><b>Partial payment</b><small>Enter the amount paid</small></span></label>
        </div></fieldset><p class="full finance-note" id="paymentAmountHint"></p>
        <label>Amount (${i(v.currency)})<input name="amount" type="number" step="${v.currency==="JPY"?"1":"0.01"}" min="${v.currency==="JPY"?"1":"0.01"}" max="${v.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${ua()}" value="${ua()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <div class="full"><h4>Payment proof (optional)</h4>${xa()}</div>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${j&&v.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${i(v.currency)})<input name="amount" type="number" min="0" max="${v.total}" step="${v.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${j&&v.released&&v.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${b.map(N=>`<option value="${i(N.email)}" ${N.email===v.owner?"selected":""}>${i(N.name||N.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${v.payments.map(N=>`<article><div><b>${i(Te(v,N.amount))}</b><span>${i(oe(N.date))} · ${i(N.reference)}</span></div><p>${i(N.recordedBy)}${N.note?" · "+i(N.note):""}</p>${/^https:\/\//i.test(N.proofUrl||"")?`<a href="${i(N.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${f("external")}</a>`:""}${Oa(N.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await q()}const ne=(e,t)=>`<div class="pd-f"><span class="vc-l">${i(e)}</span><b>${t||"—"}</b></div>`;let xe=!1,ma=null;const pa=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${i(Nt(s||t))}</span>
    <div>
      <span class="vc-l">${i(e)}</span>
      <b>${i(t)}</b>
      <div class="pd-sub">${i(a||"")}</div>
    </div>
  </div>`;function ot(e,t,s,a={}){var D,H,U,ae,V,Z;const n=async p=>{var M;ca(),await Y.applyResult(p),(M=a.onSaved)==null||M.call(a)},r=t.prs.find(p=>p.id===s);if(!r){e.innerHTML=`<div class="card">PR ${i(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}ma!==s&&(xe=!1,ma=s);const o=t.me||{role:"",email:"",department:""},d=o.role==="admin",$=r.requesterEmail.toLowerCase()===o.email.toLowerCase(),c=d||o.role==="finance"&&(!((D=t.capabilities)!=null&&D.financeHandoff)||r.financeReleased),y=d||$&&r.status==="Submitted",q=String(r.department||"").toLowerCase()===String(o.department||"").toLowerCase(),R=!!((H=t.capabilities)!=null&&H.poFinanceHandoff),A=Ln(r.status,o.role,$,q).filter(p=>!(R&&r.status==="Approved"&&p==="Ordered")),E=(r.department||"").toLowerCase()==="production",T=d&&r.status==="Approved",_=d&&((U=t.capabilities)==null?void 0:U.financeHandoff)&&!r.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(r.status)&&!["Paid","FOC / Free"].includes(r.paymentStatus)&&(!R||r.status!=="Approved"&&r.poNo),C=!["Paid","FOC / Free"].includes(r.paymentStatus),I=R&&!r.financeReleased&&C?"Create PO & send to Finance":"Create purchase order",v=d&&r.poNo&&!r.zohoPoId&&!((ae=t.capabilities)!=null&&ae.financeWorkflow),j=T?"":A.find(p=>!["Rejected","Cancelled","On Hold"].includes(p)),b=A.filter(p=>p!==j),g=p=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[p]||"Mark "+p.toLowerCase(),m=p=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[p]||"arrow",L=["Submitted","Approved","Ordered","In Transit","Received"],F=L.indexOf(r.status),N=(t.vendors||[]).find(p=>String(p.name||"").toLowerCase()===String(r.vendor||"").toLowerCase()),X=r.paymentTerm||N&&N.paymentTerms||"",se=t.lists&&t.lists.paymentTerms||[],le=["",...X&&!se.includes(X)?[X,...se]:se].map(p=>`<option value="${i(p)}" ${p===X?"selected":""}>${p?i(p):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${f("right")}<span>${i(r.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${i(r.id)}</h1>${ut(r.status)}</div>
          <p class="request-subtitle">${i(r.project||r.department||"Purchase request")} · Created ${oe(r.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${_?`<button class="btn primary" id="sendFinanceBtn">${f("wallet")} Send to Finance</button>`:""}
          ${T?`<button class="btn primary" id="makePoBtn">${f("file")} ${i(I)}</button>`:""}
          ${j?`<button class="btn primary" data-to="${i(j)}">${f(m(j))}${i(g(j))}</button>`:""}
          ${y?`<a class="btn" href="#/new/${i(r.id)}">${f("edit")} Edit</a>`:""}
          ${b.length||v?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${f("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${v?`<button class="btn" id="zohoPushBtn">${f("arrow")} Send to Zoho Books</button>`:""}
              ${b.map(p=>`<button class="btn ${["Rejected","Cancelled"].includes(p)?"danger":""}" data-to="${i(p)}">${f(m(p))}${i(g(p))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${i(r.status)}">
        <div class="progress-label"><b>Request progress</b><span>${F===-1?"Currently "+i(r.status.toLowerCase()):F===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${L.map((p,M)=>`<li class="${M<F?"done":M===F?"current":""}" ${M===F?'aria-current="step"':""}><span class="step-dot">${M<F?f("check"):M+1}</span><span>${i(p)}</span></li>`).join("")}</ol>
      </section>

      ${T&&xe?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        ${R?`<p class="pd-sub">Record your PO reference below.${!r.financeReleased&&C?" Saving marks this request Ordered and sends it to all Finance members. The first member to mark In progress takes responsibility.":C?" Existing Finance responsibility and payment records will stay unchanged.":" No payment handoff is needed for a paid or free request."}</p>`:""}
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${i(r.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${i(_e(r.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${le}</select>
          </label>
          ${N&&N.paymentTerms&&!r.paymentTerm?`<div class="full pd-sub">Prefilled from ${i(N.name)}'s vendor record — change it here if this order is different.</div>`:""}
          <div class="full" style="display:flex;gap:8px">
            <button class="btn primary" type="submit">${R?i(I):"Create PO &amp; mark Ordered"}</button>
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
          ${c?ne("Payment status",i(r.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${pa("Requested by",la(r.requestedByName,r.requesterEmail,r.approverEmail,r.approvedByName),r.requesterEmail,"Created on "+oe(r.createdAt))}
          ${r.approverEmail||r.approvedByName?pa("Approved by",la(r.approvedByName,r.approverEmail,r.requesterEmail,r.requestedByName),r.approverEmail,r.approvedAt?"on "+oe(r.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(r.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${E?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(r.items||[]).map(p=>`<tr>
            <td>${i(p.itemNo)}</td>
            <td class="wrap">${i(p.description)}</td>${E?`<td>${i(p.partNo)}</td>`:""}<td>${i(p.materialType)}</td>
            <td>${i([p.qty,p.unit].filter(Boolean).join(" "))}</td>
            <td>${p.unitPrice?i(Me(r.currency||"INR",Number(p.unitPrice))):"—"}</td>
            <td>${p.lineTotal?i(Me(r.currency||"INR",Number(p.lineTotal))):"—"}</td>
            <td>${p.purchaseLink?`<a href="${i(p.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${p.datasheetDoc?` <a href="${i(p.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${Oa(p.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${E?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${r.totalAmount?i(Me(r.currency||"INR",Number(r.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${ne("Expected",oe(r.expectedDate))}
          ${ne("Received",oe(r.receivedAt))}
          ${ne("Tracking",Nn(r))}
          ${ne("Notes",i(r.notes))}
        </div>
        </div>
      </div>

      ${c&&((V=t.capabilities)!=null&&V.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(r.status)?`<section class="card payment-work-card"><h2>Payment work</h2><div class="pd-body"><p>${r.financeReleased?"Review responsibility, payment history and supporting files.":"With admin until the PO is ready to send to Finance."}</p><button class="btn" type="button" id="openPaymentDetails">${f("wallet")} View payment details ${f("right")}</button></div></section>`:""}

      ${c?`
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
    </div>`,ja(e),(Z=e.querySelector("#openPaymentDetails"))==null||Z.addEventListener("click",p=>Ee(t,r.id,"payment",p.currentTarget));const w=e.querySelector("#requestMore");e.onclick=p=>{w&&!w.contains(p.target)&&(w.open=!1)},e.onkeydown=p=>{p.key==="Escape"&&(w!=null&&w.open)&&(p.stopPropagation(),w.open=!1,w.querySelector("summary").focus())},w==null||w.addEventListener("focusout",p=>{w.contains(p.relatedTarget)||(w.open=!1)}),e.querySelectorAll("[data-to]").forEach(p=>p.onclick=async()=>{const M=p.dataset.to;if((M==="Rejected"||M==="Cancelled")&&!confirm(`Mark ${r.id} as ${M}?`))return;const G=p.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(re=>{re.disabled=!0}),p.innerHTML=f("refresh","spin")+" Updating…";try{const re=await z("transition",{id:r.id,to:M});B(r.id+" → "+M),await n(re)}catch(re){B(re.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(de=>{de.disabled=!1}),p.innerHTML=G}});const O=e.querySelector("#makePoBtn"),K=e.querySelector("#sendFinanceBtn");K&&(K.onclick=async()=>{K.disabled=!0;try{const p=await z("financeRelease",{id:r.id});ca(),await n(p),B(r.id+" sent to Finance")}catch(p){B(p.message,!0),K.disabled=!1}}),O&&(O.onclick=()=>{var p,M;xe=!0,ot(e,t,s,a),dt((p=e.querySelector("#poForm"))==null?void 0:p.closest(".card")),(M=e.querySelector("[name=poNo]"))==null||M.focus()});const Q=e.querySelector("#poCancelBtn");Q&&(Q.onclick=()=>{xe=!1,ot(e,t,s,a)});const ee=e.querySelector("#poForm"),S=ee?Fa(ee):null;ee&&(ee.onsubmit=async p=>{var ie,J;if(p.preventDefault(),!S())return;const M=new FormData(ee),G=String(M.get("poNo")||"").trim();if(!G)return;const re=ee.querySelector('button[type="submit"]');re.disabled=!0;let de;try{const ce={poNo:G,poDate:M.get("poDate")||"",paymentTerm:M.get("paymentTerm")||""};let qe;(ie=t.capabilities)!=null&&ie.singleStepOrder?qe=await z("order",{id:r.id,...ce}):(de=await z("update",{id:r.id,updates:ce}),qe=await z("transition",{id:r.id,to:"Ordered"})),B((J=qe.task)!=null&&J.released?`PO ${G} saved. Request sent to Finance.`:`PO ${G} saved. Request marked Ordered.`),xe=!1,await n(qe)}catch(ce){de&&await n(de),B(ce.message,!0),re.disabled=!1}});const P=e.querySelector("#zohoPushBtn");P&&(P.onclick=async()=>{P.disabled=!0;try{const{pr:p}=await z("zohoPushPo",{id:r.id});B(r.id+" → Zoho Books PO "+p.zohoPoNumber),await n({pr:p})}catch(p){B(p.message,!0),P.disabled=!1}});const h=e.querySelector("#devDelete");h&&(h.onclick=async()=>{if(confirm("Permanently DELETE "+r.id+"? This cannot be undone.")){h.disabled=!0;try{const p=await z("delete",{id:r.id});B(r.id+" deleted"),location.hash="#/",await n(p)}catch(p){B(p.message,!0),h.disabled=!1}}})}let we=null;const ya=e=>{var t,s,a,n;return[(s=(t=e.me)==null?void 0:t.email)==null?void 0:s.toLowerCase(),(a=e.me)==null?void 0:a.role,(n=e.me)==null?void 0:n.department].join("|")},Be=(e,t)=>{var s,a,n;return!!t&&((s=e.capabilities)==null?void 0:s.financeWorkflow)&&(((a=e.me)==null?void 0:a.role)==="admin"||((n=e.me)==null?void 0:n.role)==="finance"&&t.financeReleased)};function Hn(e=!1){return we?we.close(e):!0}function Ee(e,t,s="request",a=document.activeElement){const n=e.prs.find(b=>b.id===t);if(!n||s==="payment"&&!Be(e,n))return;if((we==null?void 0:we.id)===t){we.select(s);return}if(!Hn())return;let r=e,o=!1,d=!1,$=s;const c=ya(e),y=new AbortController,q=y.signal,R=document.createElement("div");R.className="request-panel-layer",R.innerHTML=`<div class="request-panel-backdrop" aria-hidden="true"></div>
    <section class="request-panel" role="dialog" aria-modal="true" aria-labelledby="requestPanelTitle">
      <header class="request-panel-header"><div><span class="eyebrow">PURCHASE WORKSPACE</span><h2 id="requestPanelTitle">${i(t)}</h2><p>${i(n.vendor||n.project||n.department||"Request details")}</p></div><button class="iconbtn" id="closeRequestPanel" aria-label="Close request details">${f("close")}</button></header>
      <div class="request-panel-tabs" role="tablist" aria-label="Request information"><button id="panelRequestTab" role="tab" data-panel-tab="request" aria-controls="requestPanelBody">${f("file")} Request details</button>${Be(e,n)?`<button id="panelPaymentTab" role="tab" data-panel-tab="payment" aria-controls="requestPanelBody">${f("wallet")} Payment work</button>`:""}</div>
      <div class="request-panel-body" id="requestPanelBody" role="tabpanel"></div>
      <div class="request-panel-footer">${f("shield")} <span>${Be(e,n)?"Payment records are private to Admin and Finance.":"Your request, items and delivery updates in one place."}</span></div>
    </section>`,document.body.append(R);const A=document.querySelector("#app"),E=(A==null?void 0:A.inert)||!1;A&&(A.inert=!0),document.body.classList.add("request-panel-open");const T=R.querySelector("#requestPanelBody"),_=()=>d||T.querySelector('button[type="submit"]:disabled, [data-to]:disabled')?(B("Please wait for the current save to finish."),!1):!o||confirm("Discard the unsaved changes in this panel?"),C=(b=!1)=>{var m;if(!b&&!_())return!1;y.abort(),j(),R.remove(),we=null,document.body.classList.remove("request-panel-open"),A&&(A.inert=E);const g=[...document.querySelectorAll("[data-payment-id], [data-open-request]")].find(L=>(L.dataset.paymentId||L.dataset.openRequest)===t);return(m=a!=null&&a.isConnected?a:g)==null||m.focus({preventScroll:!0}),!0},I=()=>{if(!R.isConnected)return;R.querySelectorAll("[data-panel-tab]").forEach(g=>{const m=g.dataset.panelTab===$;g.setAttribute("aria-selected",String(m)),g.tabIndex=m?0:-1}),T.setAttribute("aria-labelledby",$==="payment"?"panelPaymentTab":"panelRequestTab");const b=document.createElement("div");T.replaceChildren(b),T.scrollTop=0,$==="payment"?Un(b,r,t,{detailOnly:!0,onRequest:()=>v("request"),onBusy:g=>{d=g},onSaved:()=>{o=!1}}):ot(b,r,t,{onSaved:()=>{o=!1,I()}})},v=b=>{var m;if(b===$||!_())return;const g=r.prs.find(L=>L.id===t);b==="payment"&&!Be(r,g)||($=b,o=!1,I(),(m=R.querySelector(`[data-panel-tab="${b}"]`))==null||m.focus())},j=Y.subscribe(b=>{const g=b.prs.find(L=>L.id===t);if(ya(b)!==c||!g||$==="payment"&&!Be(b,g)){C(!0);return}const m=r.prs.find(L=>L.id===t)!==g||r.lastSync!==b.lastSync;r=b,m&&!o&&!d&&!b.loading&&!b.err&&I()});we={id:t,close:C,select:v},R.querySelector("#closeRequestPanel").onclick=()=>C(),R.querySelector(".request-panel-backdrop").onclick=()=>C(),R.querySelectorAll("[data-panel-tab]").forEach(b=>b.onclick=()=>v(b.dataset.panelTab)),T.addEventListener("input",()=>{o=!0},{signal:q}),T.addEventListener("change",()=>{o=!0},{signal:q}),R.addEventListener("click",b=>{b.target.closest('a[href^="#/new/"]')&&(_()?o=!1:(b.preventDefault(),b.stopPropagation()))},{capture:!0,signal:q}),R.addEventListener("keydown",b=>{if(b.key==="Escape"&&(b.preventDefault(),C()),["ArrowLeft","ArrowRight"].includes(b.key)&&b.target.matches("[role=tab]")&&(b.preventDefault(),v($==="payment"?"request":"payment")),b.key==="Tab"){const g=[...R.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex="0"]')].filter(F=>F.getClientRects().length&&!F.closest("[hidden]")),m=g[0],L=g.at(-1);b.shiftKey&&document.activeElement===m?(b.preventDefault(),L==null||L.focus()):!b.shiftKey&&document.activeElement===L&&(b.preventDefault(),m==null||m.focus())}},{signal:q}),window.addEventListener("hashchange",()=>C(!0),{signal:q}),window.addEventListener("beforeunload",b=>{(o||d)&&(b.preventDefault(),b.returnValue="")},{signal:q}),I(),R.querySelector("#closeRequestPanel").focus()}function ft(e,t){var a,n;if(!["admin","finance"].includes(t==null?void 0:t.role)||t.role==="finance"&&!e.financeReleased)return null;let s=((a=e.paymentWork)==null?void 0:a.state)||(e.financeReleased?"View details":["Approved","Ordered","In Transit","Received"].includes(e.status)?"Awaiting admin":"Not ready");return e.financeReleased&&!["Approved","Ordered","In Transit","Received"].includes(e.status)?s="Blocked":s!=="Needs review"&&["Paid","FOC / Free"].includes(e.paymentStatus)&&(s="Completed"),{state:s,owner:((n=e.paymentWork)==null?void 0:n.owner)||""}}const Vn=["Submitted","Approved","Rejected"],ha=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],qt=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),u={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,paymentStage:"",filters:qt()},je=25,_n={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let At;function Kn(e,t){u.tab=t==="admin"?"all":"dept",t==="admin"&&(u.statuses=e==="pending"?["Submitted"]:[...Ne]),u.sel=["pending","unpaid"].includes(e)?e:"total",u.page=1,u.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function ve(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Rt(e,t),s&&dt(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const va=e=>String(e||"").slice(0,10);function Gn(e){const t=u.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&va(e.createdAt)<t.from||t.to&&va(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Rt(e,t){clearTimeout(At),e.innerHTML=`
    <div class="dash dashboard-page">
      <div class="adm-head">
        <div>
          <span class="eyebrow">PURCHASE OPERATIONS</span><h1>Dashboard</h1>
<p>A clear view of your purchases, from request to delivery.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          ${f("plus")} New request
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,zn(e.querySelector("#tabBody"),e,t)}const Re=e=>e.length?e.map(([t,s])=>me(t,s)).join(" + "):"—";function zn(e,t,s){var Ut,Ht,Vt,_t,Kt,Gt,zt,Wt,Yt,Zt,Jt;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",o=a.role==="finance",d=[(Ut=a.email)==null?void 0:Ut.toLowerCase(),a.role,(Ht=a.department)==null?void 0:Ht.toLowerCase()].join("|");u.viewer!==d&&Object.assign(u,{viewer:d,tab:r?"all":o&&((Vt=s.capabilities)!=null&&Vt.paymentDrawer)?"finance":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,paymentStage:"",filters:qt()});const $=n?["mine","dept","approved"]:r?["all","mine"]:o?["mine",(_t=s.capabilities)!=null&&_t.financeHandoff?"finance":"payments"]:["mine"];$.includes(u.tab)||(u.tab="mine");const c=r&&u.statuses.length===1&&u.statuses[0]==="Approved",y=u.statuses.length===Ne.length,q=u.tab==="dept",R=u.tab==="approved",A=u.tab==="all",E=u.tab==="payments",T=u.tab==="finance",_=gn(s.prs,a.email),C=o?s.prs.filter(l=>l.financeReleased):[],I=n?ia(s.prs,a.email):[],v=n?Na(s.prs,a.department):[],j=o?$n(s.prs):[],b=q?v:R?I:A?s.prs:T?C:E?j:_,g=r&&!y?b.filter(l=>u.statuses.includes(l.status)):b,m=ra(g),L=n?v.filter(rt.pending):[],F=r?ra(s.prs):n?{pending:L.length,highPriority:L.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,N=c?[{key:"total",n:m.total,l:"Ready to purchase",s:A?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:m.spendTotals.length?me(...m.spendTotals[0]):"-",l:"Approved value",s:m.spendTotals.length>1?"+ "+Re(m.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:E?[{key:"total",n:m.total,l:"Awaiting payment",s:Re(m.unpaidTotals)},{key:"transit",n:m.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:m.receivedPct+"%",l:"Received",s:m.received+" of "+m.total,cls:"go"},{key:"spend",n:m.spendTotals.length?me(...m.spendTotals[0]):"—",l:"Total value",s:m.spendTotals.length>1?"+ "+Re(m.spendTotals.slice(1)):""}]:q?[{key:"total",n:m.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:m.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:m.unpaidCount,l:"Unpaid",s:Re(m.unpaidTotals),cls:"bad"},{key:"transit",n:m.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:m.receivedPct+"%",l:"Received",s:m.received+" of "+m.total,cls:"go"},{key:"spend",n:m.spendTotals.length?me(...m.spendTotals[0]):"—",l:"Total spend",s:m.spendTotals.length>1?"+ "+Re(m.spendTotals.slice(1)):""}]:[{key:"total",n:m.total,l:R?"Approved PRs":r&&!y?"Selected PRs":A?"All PRs":"Total PRs",s:R?"across all requesters":r&&!y?"Matching your selected statuses":A?"every department":""},...R?[]:[{key:"pending",n:m.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:m.unpaidCount,l:"Unpaid",s:Re(m.unpaidTotals),cls:"bad"},{key:"transit",n:m.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:m.receivedPct+"%",l:"Received",s:m.received+" of "+m.total,cls:"go"},{key:"spend",n:m.spendTotals.length?me(...m.spendTotals[0]):"—",l:R?"Approved spend":"Total spend",s:m.spendTotals.length>1?"+ "+Re(m.spendTotals.slice(1)):""}];if(!r&&(!o||u.tab==="mine")){const l=N.findIndex(k=>k.key==="unpaid");l>=0&&N.splice(l,1)}if(A)for(const l of wn(g))N.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+mt(l.email),s:l.email,cls:"go"});N.some(l=>l.key===u.sel)||(u.sel="total");const X=(u.sel.startsWith("ap:")?ia(g,u.sel.slice(3)):g.filter(rt[u.sel])).sort((l,k)=>(k.createdAt||"").localeCompare(l.createdAt||"")),se=N.find(l=>l.key===u.sel),le=[...new Set(g.map(l=>l.department).filter(Boolean))].sort(),w=[...new Set(g.map(l=>l.vendor).filter(Boolean))].sort();u.filters.dept&&!le.includes(u.filters.dept)&&(u.filters.dept=""),u.filters.vendor&&!w.includes(u.filters.vendor)&&(u.filters.vendor="");const O=!!((Kt=s.capabilities)!=null&&Kt.financeWorkflow)&&(r||o),K=X.filter(Gn).filter(l=>{var k,x;return!O||!u.paymentStage||(u.paymentStage==="Mine"?((k=ft(l,a))==null?void 0:k.owner.toLowerCase())===a.email.toLowerCase():((x=ft(l,a))==null?void 0:x.state)===u.paymentStage)}),Q=Object.values(u.filters).some(Boolean)||!!u.paymentStage,ee=Math.max(1,Math.ceil(K.length/je));u.page=Math.min(Math.max(1,u.page),ee);const S=K.slice((u.page-1)*je,u.page*je),P=["dept","vendor","from","to"].filter(l=>u.filters[l]).length,h=y?"All statuses":u.statuses.join(" + "),H=r?(A?y?"All requests":c?"Approved requests":h:"Your requests")+(A?"":" · "+h):T?"Requests sent by admin":q?"Department requests":R?"Approved by you":E?"Payment queue":"Your requests",U=(l,k,x)=>`<button type="button" id="scope-${l}" class="adm-tab ${u.tab===l?"active":""}" data-tab="${l}" aria-pressed="${u.tab===l}">${k} <span>${x}</span></button>`,ae=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),V=l=>{const k=r?Ne:n&&l.status==="Submitted"&&ae(l)?Vn:null;return k?`<select class="status-sel" data-status="${i(l.status)}" aria-label="Status for ${i(l.id)}" data-id="${i(l.id)}">${k.map(x=>`<option ${x===l.status?"selected":""}>${i(x)}</option>`).join("")}</select>`:ut(l.status)},Z=l=>`<select class="pay-sel" aria-label="Payment status for ${i(l.id)}" data-id="${i(l.id)}">${Ea.map(k=>`<option ${k===l.paymentStatus?"selected":""}>${i(k)}</option>`).join("")}</select>`,p=l=>{const k=ft(l,a);return k?`<button type="button" class="payment-work-button" data-payment-id="${i(l.id)}" aria-label="Payment work for ${i(l.id)}: ${i(k.state)}"><span class="finance-status" data-state="${i(k.state)}">${i(k.state)} ${f("right")}</span>${k.owner?`<small title="${i(k.owner)}">${i(k.owner)}</small>`:""}</button>`:'<span class="muted">—</span>'},M=r?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${y?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${y}">All <span>${b.length}</span></button>
        ${ha.map((l,k)=>`<button type="button" class="view-pill ${!y&&u.statuses.includes(l)?"selected":""}" id="status-pill-${k}" data-admin-status="${i(l)}" aria-pressed="${!y&&u.statuses.includes(l)}">${l==="Submitted"?"Pending approval":i(l)}<span>${b.filter(x=>x.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${A?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${A}">Everyone</button>
        <button type="button" class="view-pill ${A?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!A}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${f("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${i(H)}</span><span class="view-result-count" role="status">${g.length} ${g.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Gt=s.capabilities)!=null&&Gt.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Open a payment status below. Mark In progress to take responsibility.</p></div><button class="btn" type="button" id="showFinanceWork">${f("wallet")} View payment work ${f("arrow")}</button></section>`:""}
    ${!r&&$.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${U("mine","Your requests",_.length)}
      ${n?U("dept",i(a.department||"Your department"),v.length)+U("approved","Approved by you",I.length):""}
      ${o?(zt=s.capabilities)!=null&&zt.financeHandoff?U("finance","Sent to Finance",C.length):U("payments","Awaiting payment",j.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${c?"approved-kpis":""}" aria-label="Filter requests by summary">${N.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===u.sel?"sel":""}" data-key="${i(l.key)}" aria-pressed="${l.key===u.sel}">
        <span class="kpi-top"><span class="l">${i(l.l)}</span>${f(_n[l.key])}</span>
        <span class="v">${i(String(l.n))}</span><span class="s">${i(l.s||(l.key==="total"?H:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${F?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?i(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${F.pending?"":"disabled"}><span class="attention-icon">${f("clock")}</span><span><b>${F.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${F.pending?"Open approval queue":"No approvals waiting"}</small></span>${f("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${F.unpaidCount?"":"disabled"}><span class="attention-icon">${f("wallet")}</span><span><b>${F.unpaidCount} awaiting payment</b><small>${F.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${f("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${f("info")}</span><span><b>${F.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${M}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${K.length}</span></h2><p>${i(H)} · ${u.sel==="total"?"Latest first":i(se.l)}</p></div><span class="table-hint">Select a request to view details ${f("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${f("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${i(u.filters.q)}"></label>
        ${r?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Ne.map(l=>`<option value="${i(l)}" ${u.filters.status===l?"selected":""}>${i(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${P?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${u.moreFilters}" aria-controls="advancedFilters">${f("filter")} Filters ${P?`<span class="count-badge">${P}</span>`:""}</button>
        ${Q?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${u.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${le.map(l=>`<option value="${i(l)}" ${u.filters.dept===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${w.map(l=>`<option value="${i(l)}" ${u.filters.vendor===l?"selected":""}>${i(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${i(u.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${i(u.filters.to)}"></label>
        ${A?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${N.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${i(l.key)}" ${u.sel===l.key?"selected":""}>${i(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${E?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
        ${O?"<th>Payment work</th>":""}
      </tr></thead><tbody>
        ${S.map(l=>`<tr class="rowlink ${E?"payment-row":""}" data-id="${i(l.id)}">
          <td class="request-id"><a href="#/pr/${i(l.id)}" data-open-request="${i(l.id)}">${i(l.id)}</a></td>
          <td class="request-date">${oe(l.createdAt)}</td>
          ${E?`<td>${i(l.vendor)}</td><td>${i(l.poNo||"—")}</td><td>${i(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${i(l.department)}</td><td class="wrap request-item">${i(l.item)}</td><td class="request-vendor">${i(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?i(me(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${E?Z(l):V(l)}</td>
          ${O?`<td class="payment-work-cell">${p(l)}</td>`:""}
        </tr>`).join("")||`<tr><td colspan="${O?8:7}"><div class="empty-state">${f(Q?"search":"file")}<b>${Q?"No matching requests":c?"No requests ready for purchasing":r&&!y?"No requests with these statuses":"No requests here yet"}</b><span>${Q?"Try a different search or clear your filters.":c?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":r&&!y?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${Q?'<button class="btn" id="emptyClear">Clear filters</button>':r&&!y?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${K.length?(u.page-1)*je+1:0}–${Math.min(u.page*je,K.length)} of ${K.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${u.page===1?"disabled":""}>${f("left")}</button><span>Page ${u.page} of ${ee}</span><button class="btn" id="dashNext" aria-label="Next page" ${u.page===ee?"disabled":""}>${f("right")}</button></div></div>
    </section>`;const G=l=>{u.tab=l,u.sel="total",u.page=1,r&&(u.filters=qt()),ve(t,s)};(Wt=e.querySelector("#showFinanceWork"))==null||Wt.addEventListener("click",()=>{var l,k,x;u.paymentStage="",G((l=s.capabilities)!=null&&l.financeHandoff?"finance":"payments"),(x=(k=t.querySelector(".requests-card")).scrollIntoView)==null||x.call(k,{block:"start",behavior:"smooth"})}),O&&(e.querySelector(".table-scroll").insertAdjacentHTML("beforebegin",`<div class="payment-work-filters"><label>Payment work<select id="dashPaymentWork" aria-label="Filter payment work"><option value="">All payment work</option>${["Awaiting admin","Pending","In progress","Mine","On hold","Needs review","Blocked","Completed","Not ready"].map(l=>`<option value="${l}" ${u.paymentStage===l?"selected":""}>${l==="Mine"?"Assigned to me":l}</option>`).join("")}</select></label><span class="finance-note">Select a status to open details</span></div>`),e.querySelector("#dashPaymentWork").onchange=l=>{u.paymentStage=l.target.value,u.page=1,ve(t,s)},e.querySelectorAll("[data-payment-id]").forEach(l=>l.onclick=()=>Ee(s,l.dataset.paymentId,"payment",l))),e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>G(l.dataset.tab));const re=()=>{u.statuses=[...Ne],G(u.tab),t.querySelector("#showAllRequests").focus()};(Yt=e.querySelector("#showAllRequests"))==null||Yt.addEventListener("click",re),(Zt=e.querySelector("#emptyAllRequests"))==null||Zt.addEventListener("click",()=>{u.tab="all",re()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const k=l.dataset.adminStatus;if(y)u.statuses=[k];else if(!u.statuses.includes(k))u.statuses=ha.filter(x=>x===k||u.statuses.includes(x));else if(u.statuses.length>1)u.statuses=u.statuses.filter(x=>x!==k);else return;G(u.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>G(l.dataset.adminScope)),(Jt=e.querySelector("#resetAdminView"))==null||Jt.addEventListener("click",()=>{u.statuses=["Approved"],u.paymentStage="",G("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{u.sel=l.dataset.key,u.page=1,ve(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var x,te;if(u.paymentStage="",!r&&!(n&&l.dataset.queue==="pending"))return;Kn(l.dataset.queue,a.role),ve(t,s);const k=t.querySelector(".requests-card");k.focus({preventScroll:!0}),(te=k.scrollIntoView)==null||te.call(k,{block:"start",behavior:(x=window.matchMedia)!=null&&x.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=k=>{k.target.closest("a, select, button")||Ee(s,l.dataset.id,"request",l.querySelector("[data-open-request]"))}),e.querySelectorAll("[data-open-request]").forEach(l=>l.onclick=k=>{k.ctrlKey||k.metaKey||k.shiftKey||k.altKey||(k.preventDefault(),Ee(s,l.dataset.openRequest,"request",l))}),e.querySelector("#dashMoreFilters").onclick=()=>{u.moreFilters=!u.moreFilters,e.querySelector("#advancedFilters").hidden=!u.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(u.moreFilters))};const de=e.querySelector("#dashApprover");de&&(de.onchange=()=>{u.sel=de.value,u.page=1,ve(t,s)});const ie=l=>{var k,x;u.page+=l,ve(t,s),(x=(k=t.querySelector(".requests-card")).scrollIntoView)==null||x.call(k,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>ie(-1),e.querySelector("#dashNext").onclick=()=>ie(1);const J=(l,k)=>{u.filters[l]=k,u.page=1,ve(t,s)};e.querySelector("#dashQ").oninput=l=>{u.filters.q=l.target.value,u.page=1,clearTimeout(At),At=setTimeout(()=>{t.isConnected&&ve(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>J("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>J("vendor",l.target.value);const ce=e.querySelector("#dashStatus");ce&&(ce.onchange=l=>J("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>J("from",l.target.value),e.querySelector("#dashTo").onchange=l=>J("to",l.target.value);const qe=()=>{u.paymentStage="",u.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},u.page=1,u.sel="total",ve(t,s)},Bt=e.querySelector("#dashFilterClear"),jt=e.querySelector("#emptyClear");Bt&&(Bt.onclick=qe),jt&&(jt.onclick=qe),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=k=>k.stopPropagation(),l.onchange=async()=>{var ge;const k=l.dataset.id,x=s.prs.find(Ae=>Ae.id===k),te=l.value;if(!(!x||te===x.status)){if((ge=s.capabilities)!=null&&ge.poFinanceHandoff&&x.status==="Approved"&&te==="Ordered"){l.value=x.status,Ee(s,k,"request",l),B("Create the PO to mark this request Ordered and send it to Finance.");return}if((te==="Rejected"||te==="Cancelled")&&!confirm(`Mark ${k} as ${te}?`)){l.value=x.status;return}l.disabled=!0;try{let Ae;a.role==="admin"&&!Dn(x.status,te)?Ae=await z("update",{id:k,updates:{status:te}}):Ae=await z("transition",{id:k,to:te}),B(`${k} → ${te}`),await Y.applyResult(Ae)}catch(Ae){B(Ae.message,!0),l.value=x.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=k=>k.stopPropagation(),l.onchange=async()=>{const k=l.dataset.id,x=s.prs.find(ge=>ge.id===k),te=l.value;if(!(!x||te===x.paymentStatus)){l.disabled=!0;try{const ge=await z("update",{id:k,updates:{paymentStatus:te}});B(`${k} payment → ${te}`),await Y.applyResult(ge)}catch(ge){B(ge.message,!0),l.value=x.paymentStatus,l.disabled=!1}}}})}function Et(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function Mt(e,t){const s=Et(e,t),a=s.filter(rt.spend),n={};for(const r of a){const o=Number(r.amount);if(!r.amount||!isFinite(o))continue;const d=r.currency||"INR";n[d]=(n[d]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((r,o)=>o[1]-r[1]),unpaid:s.filter(rt.unpaid).length,lastOrder:s.reduce((r,o)=>{const d=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(d)&&d>r?d:r},"")}}function Ua(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(Et(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Wn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Yn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Zn=1,Jn=.7,Ha=.5,Qn=.4,Xn=.3,es=4,ts=e=>e.length>=7?2:e.length>=es?1:0,lt=e=>String(e??"").toLowerCase().trim();function as(e,t){const s=e[t];return lt(Array.isArray(s)?s.join(" "):s)}function Va(e){return lt(e).split(/[\s,]+/).filter(Boolean)}function ns(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function fa(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Zn;if(s.some(n=>n.startsWith(t)))return Jn;if(e.includes(t))return Ha;const a=ts(t);return a&&s.some(n=>ns(n,t)<=a)?Xn:0}function ss(e,t){const s=fa(e,t);if(s)return s;const a=Yn[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):fa(e,r)>=Ha)?Qn:0}function rs(e,t){const s=Array.isArray(t)?t:Va(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:o,weight:d}of Wn)r=Math.max(r,ss(as(e,o),n)*d);if(!r)return 0;a+=r}return a}function _a(e,t){const s=Va(t);return s.length?(e||[]).map(a=>({v:a,score:rs(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||lt(a.v.displayName||a.v.name).localeCompare(lt(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function ht(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${f("search")}
        <input aria-label="${i(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${i(t)}" value="${i(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${f("close")}
        </button>
      </div>
    </div>`}const It=(...e)=>i(e.filter(Boolean).join(" ").toLowerCase());function Ft(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${i(t)}</td></tr>`}function Ot(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const o=e.querySelector("#"+n);if(!o)return;const d=o.closest(".adm-card"),$=d.querySelector(".admSearchClear"),c=()=>is(d,t(),a,r);o.oninput=()=>{s(o.value),$.hidden=!o.value,c()},o.onkeydown=y=>{y.key==="Escape"&&o.value&&(o.value="",o.oninput())},$.onclick=()=>{o.value="",o.oninput(),o.focus()},c()}function is(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let d=null;r.forEach(y=>{y.hidden=n?o?!o.has(y.dataset.name):!y.dataset.search.includes(n):!1,y.classList.remove("last-visible"),y.hidden||(d=y)}),d&&d.classList.add("last-visible");const $=e.querySelector(".adm-nomatch");$&&($.hidden=!!d||!r.length);const c=e.querySelector(".adm-count");c&&(c.textContent=s(r.filter(y=>!y.hidden).length,r.length))}let Ue="";const Ka={Domestic:"dom",Foreign:"for",Mixed:"mix"},os=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Ga(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${i(os(e.displayName||e.name))}${t?`<img src="${i(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function ls(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${i(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function ds(e,t){const s=Mt(e.prs,t.name),a=Ua(t,e.prs),n=s.spendTotals.length?me(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${i(t.name)}">
      <div class="vc-top">
        ${Ga(t)}
        <div class="vc-title">
          <b>${i(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${i(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Ka[a]}">${i(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${i(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${oe(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${ls(t)}</div>
    </a>`}const cs=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function ba(e,t){const s=cs(e.vendors),a=t.trim()?_a(s,t):s;return a.length?a.map(n=>ds(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${i(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function us(e,t,s){if(s)return ms(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${ht(Ue,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${ba(t,Ue)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),o=()=>{Ue=n.value,r.hidden=!Ue,a.innerHTML=ba(t,Ue)};n.oninput=o,n.onkeydown=d=>{d.key==="Escape"&&n.value&&(n.value="",o())},r.onclick=()=>{n.value="",o(),n.focus()}}function ms(e,t,s){const a=(t.vendors||[]).find(c=>c.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${i(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=Mt(t.prs,a.name),r=Ua(a,t.prs),o=t.me&&t.me.role==="admin",d=Et(t.prs,a.name).sort((c,y)=>(y.createdAt||"").localeCompare(c.createdAt||"")),$=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,c])=>c);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Ga(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${i(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${Ka[r]}">${i(r.toUpperCase())}</span>`:""}
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
          <div class="s">${n.spendTotals.length>1?i(n.spendTotals.slice(1).map(([c,y])=>me(c,y)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${oe(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${$.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${$.map(([c,y])=>`<div><span class="vc-l">${i(c)}</span><b>${i(y)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(c=>`<span class="vc-chip">${i(c)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${d.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${d.map(c=>`<tr class="rowlink" data-id="${i(c.id)}">
            <td style="font-family:var(--mono);font-size:12px">${i(c.id)}</td>
            <td>${oe(c.createdAt)}</td><td>${i(c.department)}</td>
            <td class="wrap">${i(c.item)}</td>
            <td>${c.amount?i(me(c.currency||"INR",Number(c.amount))):"—"}</td>
            <td>${ut(c.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(c=>c.onclick=()=>location.hash="#/pr/"+c.dataset.id)}const Pt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],za=new Map(Pt.map(e=>[e.code,e])),ps=e=>za.has(String(e||"").trim().toUpperCase());function Ct(e){const t=za.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function ys(e){const t=String(e||"").trim().toLowerCase(),s=t?Pt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...Pt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function Ye(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",d=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${i(d)}">
      <span class="barlabel">${i(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${i(t(n.value))}</span>
    </div>`}).join("")}</div>`}function ga(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,o=a-n.t-n.b,d=Math.max(...e.map(C=>C.value),1),$=r/(e.length-1),c=C=>n.l+C*$,y=C=>n.t+o-C/d*o,q=e.map((C,I)=>`${I===0?"M":"L"}${c(I).toFixed(1)} ${y(C.value).toFixed(1)}`).join(" "),R=`${q} L${c(e.length-1).toFixed(1)} ${n.t+o} L${c(0).toFixed(1)} ${n.t+o} Z`,A=[0,.5,1].map(C=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-C)).toFixed(1)}" y2="${(n.t+o*(1-C)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),E=Math.ceil(e.length/6)||1,T=e.map((C,I)=>I%E===0||I===e.length-1?`<text x="${c(I).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${I===0?"start":I===e.length-1?"end":"middle"}">${i(C.month.slice(2))}</text>`:"").join(""),_=e.map((C,I)=>`<circle cx="${c(I).toFixed(1)}" cy="${y(C.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${i(C.month)}: ${i(t(C.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${A}
    <path d="${R}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${q}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${_}
    ${T}
  </svg>`}const hs=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],vs={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},fs={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Ze={currency:""};function Wa(e,t){var j,b;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?Na(t.prs,s.department):t.prs||[],r=Sn(n);r.includes(Ze.currency)||(Ze.currency=r[0]||"");const o=Ze.currency,d=g=>o?me(o,g):String(g),$=o?oa(n,"spend",o):[],c=oa(n,"count"),y=o?qn(n,o,6).map(g=>({label:g.vendor,value:g.total})):[],q=!a&&o?kn(n,o).map(g=>({label:g.department,value:g.total})):[],R=An(n),A=hs.filter(g=>R[g]).map(g=>({label:g,value:R[g]})),E=Rn(n),T=Cn(n),_=T.map(g=>({label:g.label,value:g.count})),C=T.reduce((g,m)=>g+m.count,0),I=$.reduce((g,m)=>g+m.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${i(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${r.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${f("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${r.map(g=>`<option value="${i(g)}" ${g===o?"selected":""}>${i(Ct(g))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?i(d(I)):"—"}</div><div class="l">Total spend${o?" · "+i(o):""}</div></div>
        <div class="kpi"><div class="v">${E.avgApprovalDays!=null?E.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${E.avgDeliveryDays!=null?E.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((j=t.me)==null?void 0:j.role)==="admin"?`<div class="kpi ${C?"warn":""}"><div class="v">${C}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+i(o):""}</p></div>
          </div>
          <div class="spend-chart">${$.length?ga($,{valueFmt:g=>me(o,g),height:180}):`<div class="trend-empty">${f("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${q.length?`<div class="card"><h2>Spend by department${o?" · "+i(o):""}</h2>
          <div class="pd-body">${Ye(q,{valueFmt:d})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+i(o):""}</h2>
          <div class="pd-body">${Ye(y,{valueFmt:d})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${Ye(A,{colorOf:g=>vs[g.label]||"var(--mut)"})}</div></div>
        ${((b=t.me)==null?void 0:b.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${Ye(_,{colorOf:g=>fs[g.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${ga(c,{valueFmt:g=>g+" PR"+(g===1?"":"s")})}</div>
      </div>
    </div>`;const v=e.querySelector("#insCur");v&&(v.onchange=()=>{var g;Ze.currency=v.value,Wa(e,t),(g=e.querySelector("#insCur"))==null||g.focus()})}const bs=Ea,gs={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},tt=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:gs[t])||[],bt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},fe=(e,t,s)=>`<span class="lblrow">${i(e)}${bt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${i(bt[t])}" data-tip="${i(bt[t])}">?</span>`:""}</span>`;function Pe(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${i(n)}" ${n===t?"selected":""}>${n?i(n):"Select…"}</option>`).join("")}function gt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <div class="item-row-heading"><b class="item-number">Item ${s+1}</b><button type="button" class="btn danger rmItem">${f("trash")} Remove item</button></div>
    <input type="hidden" name="i_lineTotal" value="${i(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${i(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${i(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${i(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${Pe(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${i(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${Pe([...new Set([...tt(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${i(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${i(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${i(t.datasheetDoc)}"></label>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${xa(t.attachments)}</div>
  </div>`}function Je(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:yt((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function $s(e,t,s){var ee;const a=s?t.prs.find(S=>S.id===s):null,n=a||{},r=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const d=a?n.department||"":o.department||"",$=(t.projects||[]).filter(S=>S.department.toLowerCase()===d.toLowerCase()).map(S=>S.project),c=(t.vendors||[]).filter(S=>(S.departments||[]).some(P=>P.toLowerCase()===d.toLowerCase())),y=S=>{const P=c.find(h=>h.name.toLowerCase()===String(S||"").toLowerCase());return P?P.displayName||P.name:String(S||"")},q=(t.materialTypes||[]).filter(S=>S.department.toLowerCase()===d.toLowerCase()).map(S=>S.materialType),R=d.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${i(n.id)}" style="font-family:var(--mono)">${i(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?i(n.id):"New Purchase Request"}</h1>
          ${a?ut(n.status):""}
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
              <label>${fe("Project*","project")} <select name="project" required>${Pe($,n.project||"",!0)}</select></label>
              <label>${fe("Purpose","purpose")} <input name="purpose" value="${i(n.purpose)}"></label>
              <div class="pd-field full">${fe("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${i(y(n.vendor))}">
                <input type="hidden" name="vendor" value="${i(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <label class="vendor-manual" id="manualVendorField" hidden>Vendor name<input id="manualVendorName" maxlength="200" placeholder="Enter the vendor's name" autocomplete="off"></label>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${fe("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${i(Ct(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${i(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${fe("Priority","priority",!0)} <select name="priority">${Pe(tt(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${fe("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(_e(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((ee=t.capabilities)!=null&&ee.financeWorkflow)?`
              <label>${fe("Payment status*","payment")} <select name="paymentStatus" required>${Pe(bs,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${Pe(Ne,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${i(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${fe("Notes","notes")} <textarea name="notes" rows="3">${i(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&o.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${i(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${i(_e(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${i(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${i(_e(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${Pe(tt(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${i(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${En(n,tt(t,"couriers"))}
          <label>${fe("Expected delivery","expected")} <input name="expectedDate" type="date" value="${i(_e(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((S,P)=>gt(t,S,P,q,R)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${f("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${f("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const A=e.querySelector("#prForm"),E=Fa(A),T=e.querySelector("#itemRows"),_=()=>{const S=Je(A).map(D=>{const H=pn(D.qty,D.unitPrice);return{lineTotal:H!==""?H:D.lineTotal}}),P=yn(S),h=A.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=P===""?"":"Total: "+Me(h,P)},C=()=>{const S=T.children.length===1;[...T.children].forEach((P,h)=>{P.dataset.i=h,P.querySelector(".item-number").textContent="Item "+(h+1);const D=P.querySelector(".rmItem");D.innerHTML=f(S?"refresh":"trash")+(S?" Clear item":" Remove item"),D.setAttribute("aria-label",(S?"Clear item ":"Remove item ")+(h+1)),D.title=S?"Clear this item and its selected attachments":"Remove this item from the request",D.disabled=e.querySelector("#prSave").disabled})},I=S=>{Ba(S.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),S.querySelector(".rmItem").onclick=()=>{if(e.querySelector("#prSave").disabled)return;let P=S.nextElementSibling||S.previousElementSibling;T.children.length>1?S.remove():(S.insertAdjacentHTML("afterend",gt(t,{},0,q,R)),P=S.nextElementSibling,S.remove(),I(P)),C(),_(),P.querySelector('[name="i_description"]').focus()},S.querySelectorAll("input, select").forEach(P=>P.oninput=_)};[...T.children].forEach(I),C(),_();const v=(S,P,h,{search:D,resolve:H,toLabel:U,allowEmpty:ae,onCommit:V,onSelect:Z})=>{const p=e.querySelector("#"+S),M=e.querySelector("#"+P),G=A.querySelector(`[name="${h}"]`),re=()=>{V&&V()},de=ie=>{const J=D(ie).slice(0,30);M.innerHTML=J.map(ce=>`<div class="curOpt" data-v="${i(ce.value)}"><b>${i(ce.main)}</b> ${i(ce.name||"")}<span>${i(ce.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',M.hidden=!1};p.onfocus=()=>{p.select(),de("")},p.oninput=()=>de(p.value),M.onmousedown=ie=>{ie.preventDefault();const J=ie.target.closest(".curOpt");if(J){if(Z!=null&&Z(J.dataset.v)){M.hidden=!0;return}G.value=J.dataset.v,p.value=U(J.dataset.v),M.hidden=!0,re()}},p.onblur=()=>setTimeout(()=>{M.hidden=!0;const ie=p.value.trim();if(!ie&&ae)G.value="";else{const J=H(ie);J!=null&&(G.value=J)}p.value=U(G.value),re()},120)};v("curSearch","curList","currency",{search:S=>ys(S).map(P=>({value:P.code,main:P.code,name:P.name,sub:P.sym||""})),resolve:S=>{const P=S.split("—")[0].trim().toUpperCase();return ps(P)?P:null},toLabel:S=>Ct(S),onCommit:_});const j=S=>{const P=String(S||"").trim().toLowerCase();return c.filter(h=>!P||h.name.toLowerCase().includes(P)||(h.displayName||"").toLowerCase().includes(P)||(h.category||"").toLowerCase().includes(P)).sort((h,D)=>(h.displayName||h.name).localeCompare(D.displayName||D.name)).slice(0,29).map(h=>({value:h.name,main:h.displayName||h.name,name:h.displayName?h.name:"",sub:h.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let b=!1;const g=e.querySelector("#manualVendorField"),m=e.querySelector("#manualVendorName"),L=A.querySelector('[name="vendor"]'),F=S=>{b=S,g.hidden=!S,m.required=S},N=e.querySelector("#venHint"),X=()=>{const S=A.querySelector('[name="vendor"]').value.trim();N.hidden=!S||c.some(P=>P.name.toLowerCase()===S.toLowerCase())};v("venSearch","venList","vendor",{search:j,resolve:S=>{if(b)return m.value.trim();const P=c.find(h=>h.name.toLowerCase()===S.toLowerCase()||(h.displayName||"").toLowerCase()===S.toLowerCase());return P?P.name:S},toLabel:S=>b?"Other — enter manually":y(S),onSelect:S=>(F(S==="__other__"),b?(L.value=m.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",m.focus(),X(),!0):!1),allowEmpty:!0,onCommit:X}),m.oninput=()=>{L.value=m.value.trim(),X()};const se=e.querySelector("#venSearch"),le=se.oninput;se.oninput=()=>{F(!1),le()},X(),e.querySelector("#addItem").onclick=()=>{e.querySelector("#prSave").disabled||(T.insertAdjacentHTML("beforeend",gt(t,{},T.children.length,q,R)),I(T.lastElementChild),C(),dt(T.lastElementChild))};const w=A.elements.namedItem("trackingLink");w&&(w.oninput=()=>w.setCustomValidity(""));const O=()=>Object.fromEntries([...new FormData(A)].filter(([S])=>!S.startsWith("i_"))),K=O(),Q=JSON.stringify(Je(A));A.onsubmit=async S=>{S.preventDefault();const P=e.querySelector("#prSave");if(P.disabled||!E()||!Mn(w))return;if(b&&!m.value.trim()){m.reportValidity();return}e.querySelectorAll(".pr-save").forEach(H=>{H.disabled=!0,H.innerHTML=f("refresh","spin")+" Saving…"}),P.disabled=!0,P.textContent="Saving…",C(),e.querySelector("#addItem").disabled=!0;const h=O();let D=Je(A);try{if(!D.length&&(!a||JSON.stringify(D)!==Q))throw new Error("Add at least one item with a description");for(const U of T.children)U.querySelector('[name="i_description"]').value.trim()&&await U.querySelector(".attachment-picker").uploadFiles();D=Je(A);const H=JSON.stringify(D)!==Q;if(a){const U=Object.fromEntries(Object.entries(h).filter(([ae,V])=>V!==K[ae]));if(Object.keys(U).length||H){const ae=await z("update",{id:n.id,updates:U,...H?{items:D}:{}});await Y.applyResult(ae,{itemsChanged:H}),B("PR updated")}location.hash="#/pr/"+n.id}else{const U=await z("create",{pr:h,items:D});await Y.applyResult(U,{itemsChanged:!0}),B("Created "+U.pr.id),location.hash="#/pr/"+U.pr.id}}catch(H){B(H.message,!0),P.disabled=!1,P.textContent=a?"Save changes":"Submit PR",C(),e.querySelector("#addItem").disabled=!1,e.querySelectorAll(".pr-save").forEach(U=>{U.disabled=!1,U.textContent=a?"Save changes":"Submit request"})}}}let at=null,be=null,Tt="";const ws=["Domestic","International"];function xt(e){return at===null&&(at=e.vendors||[]),at}function Ss(e){const t=e.lists&&e.lists.departments||[],s=xt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const pe=(e,t,s,a="")=>`<label class="adm-field">${i(e)}
    <input class="adm-input" name="${t}" value="${i(s||"")}" placeholder="${i(a)}">
  </label>`;function ks(e,t){const s=xt(e),a=be&&s.find(r=>r.name.toLowerCase()===be.toLowerCase());if(a)return qs(e,a);const n=[...s].sort((r,o)=>r.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${ht(Tt,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${It(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${i(r.name)}</td>
            <td>${(r.departments||[]).map(o=>`<span class="adm-chip on">${i(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${i(r.type||"—")}</td>
            <td>${i(r.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${i(r.name)}" title="Remove vendor">
                ${f("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${Ft(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ya(n.length,n.length)}</span></div>
    </div>`}const Ya=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function qs(e,t){const s=Mt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${i(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?i(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${i(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${i(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${f("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${i(Me("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${Ss(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some($=>$.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${i(o)}">${i(o)}</button>`).join("")}
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
              ${["",...ws].map(o=>`<option value="${i(o)}" ${o===(t.type||"")?"selected":""}>${o?i(o):"—"}</option>`).join("")}
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
    </div>`}function As(e,t,s){const a=async(c,y,q)=>{try{const R=await z(c,y);at=R.vendors,await Y.applyResult(R),B(q),e.isConnected&&s()}catch(R){B(R.message,!0)}};Ot(e,{get:()=>Tt,set:c=>{Tt=c},count:Ya,match:c=>new Set(_a(xt(t),c).map(y=>y.name))}),e.querySelectorAll(".vRow").forEach(c=>c.onclick=y=>{y.target.closest(".vRm")||(be=c.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(c=>c.onclick=()=>{confirm(`Remove vendor "${c.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:c.dataset.name},`${c.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const c=e.querySelector("#nvName").value.trim();if(!c){B("Vendor name required",!0);return}be=c,a("vendorSet",{name:c,updates:{}},`${c} added — fill in the details`)});const r=()=>{be=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=r);const d=e.querySelector("#vCancel");d&&(d.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(c=>c.onclick=()=>c.classList.toggle("on"));const $=e.querySelector("#vForm");$&&($.onsubmit=c=>{c.preventDefault();const y={};for(const[R,A]of new FormData($))y[R]=A.trim();y.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(R=>R.dataset.dept);const q=y.name||be;a("vendorSet",{name:be,updates:y},`${q} saved`),be=q})}function Rs(){be=null}const He=["admin","approver","finance","requester"],Ps={admin:"Full access to settings, users, PRs, and analytics.",approver:"Creates own PRs and approves or rejects submitted requests in their department.",finance:"Creates own PRs and handles payments for requests sent by admin. In progress assigns responsibility through completion.",requester:"Creates, tracks and edits own submitted PRs. No approval, payment or admin access."},$a=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let ue="users",Ce=null,Ve=null,Qe="",Lt="",Ie=null,Ke=null,he=!1;const wa={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Ie,set:e=>{Ie=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Ke,set:e=>{Ke=e},seed:e=>e.materialTypes}};function Cs(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%$a.length;return $a[t]}const $t=e=>e[0].toUpperCase()+e.slice(1),Ts={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${f("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${f("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${f("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${f("vendors")} Add Vendor`}};function Se(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(Qe!==s&&(Qe=s,Ce=null,Ve=null,Ie=null,Ke=null),Ce===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${f("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const r=e.querySelector("#adminUsersLoading"),o=Ve||(Ve=z("usersList"));o.then(d=>{if(Qe===s){if(!Array.isArray(d.users))throw new Error("The server did not return users. Please retry.");Ce=d.users,e.contains(r)&&Se(e,t)}}).catch(d=>{Qe!==s||!e.contains(r)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${i(d.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{Ve=null,Se(e,t)})}).finally(()=>{Ve===o&&(Ve=null)});return}Ie===null&&(Ie=t.projects||[]),Ke===null&&(Ke=t.materialTypes||[]);const a=Ts[ue];e.innerHTML=`
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
      ${ue==="users"?Ls(t):ue==="vendors"?ks(t,he):Ns(t,wa[ue])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(r=>r.onclick=()=>{ue=r.dataset.tab,he=!1,Rs(),Se(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(he=!he,Se(e,t),he){const r=e.querySelector(".adm-addrow input, .adm-addrow select");r&&r.focus()}},ue==="users"?Ds(e,t):ue==="vendors"?As(e,t,()=>{he=!1,Se(e,t)}):Es(e,t,wa[ue])}function Ls(e){const t=a=>(He.includes(a.role)?He:[a.role,...He]).map(n=>`<option value="${i(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?i($t(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!nt(e).includes(a)?[a,...nt(e)]:nt(e)].map(n=>`<option value="${i(n)}" ${n===(a||"")?"selected":""}>${n?i(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${f("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${ht(Lt,"Search by name or email…")}
      ${he?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${He.map(a=>`<option value="${a}">${$t(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...Ce].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||mt(a.email);return`<tr data-search="${It(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Cs(a.email)}">${i(Nt(a.email))}${a.picture?`<img src="${i(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${f("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${Ft(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${Ce.length} of ${Ce.length} active members</span>
        <div class="adm-pager">
          <button disabled>${f("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${f("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${He.map(a=>`<div class="adm-rolecard">
        <h4>${$t(a)}</h4>
        <p>${Ps[a]}</p>
      </div>`).join("")}
    </div>`}function Ds(e,t){Ot(e,{get:()=>Lt,set:n=>{Lt=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,o)=>{try{const d=await z("userSet",{email:n,...r});Ce=d.users,he=!1,await Y.applyResult(d),B(o),e.isConnected&&Se(e,t)}catch(d){B(d.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:r,department:o},`${n} → ${r}`)})}function nt(e){const t=e.lists&&e.lists.departments||[],s=(Ie||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Ns(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${ht(t.q,`Search ${t.plural} by name or department…`)}
      ${he?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${nt(e).map(a=>`<option value="${i(a)}">${i(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${It(a.department,a[t.key])}">
            <td class="adm-name">${i(a.department)}</td>
            <td>${i(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${i(a.department)}" data-val="${i(a[t.key])}" title="Remove">
                ${f("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${Ft(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Za(s.length,s.length,t)}</span>
      </div>
    </div>`}const Za=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function Es(e,t,s){Ot(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,o)=>Za(r,o,s)});const a=async(r,o,d)=>{try{const $=await z(r,o);s.set($[s.respKey]),he=!1,await Y.applyResult($),B(d),e.isConnected&&Se(e,t)}catch($){B($.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:o},`${r} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:o,val:d}=r.dataset;confirm(`Remove "${d}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:d},`${d} removed`)})}const Sa={requester:0,approver:1,finance:1,admin:2};function ka(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=Sa[t.role];return s!=null&&s>=Sa[e.minRole]}const Ja=document.getElementById("app"),wt={"":{fn:Rt,nav:"Dashboard",icon:"grid"},vendors:{fn:us,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:Wa,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:(e,t,s)=>{history.replaceState(null,"","#/"),Rt(e,t),s&&Ee(t,s,"payment")},roles:["admin","finance"]},new:{fn:$s,roles:["requester","approver","finance","admin"]},pr:{fn:ot},admin:{fn:Se,nav:"Admin",icon:"settings",minRole:"admin"}};let ke,qa=null;function Qa(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function Ms(){ke==null||ke.abort(),Ja.innerHTML=`<div class="auth-gate">
    <section class="auth-story">
      <img src="oizom-logo.png" alt="OIZOM" class="auth-logo">
      <span class="eyebrow">THE PROCUREMENT WORKSPACE</span>
      <h1>Every purchase.<br><em>One clear path.</em></h1>
      <p>From the first request to the final delivery.<br>A shared space to keep work moving.</p>
      <div class="auth-flow"><span>${f("file")} Request</span>${f("arrow")}<span>${f("check")} Approve</span>${f("arrow")}<span>${f("package")} Receive</span></div>
      <div class="auth-footer">Oizom · Redefining resources</div>
    </section>
    <section class="auth-box">
      <span class="auth-mark">${f("package")}</span>
      <span class="eyebrow">OIZOM PROCUREMENT</span>
      <h2>Welcome back.</h2>
      <p>Sign in with your Oizom account<br>to open your workspace.</p>
      <div id="gsignin"></div>
      <div class="auth-note">${f("shield")} For your @oizom.com work account</div>
    </section>
  </div>`,ln(document.getElementById("gsignin"))}function Xa(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=f("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function en(){var X,se,le;const e=Y.get(),{name:t,param:s}=Qa(),a=wt[t]||wt[""],n=((X=e.me)==null?void 0:X.role)||"";if(e.me&&!ka(a,e.me)){location.hash="#/";return}ke==null||ke.abort(),ke=new AbortController;const r=ke.signal,o=Object.entries(wt).filter(([,w])=>w.nav&&e.me&&ka(w,e.me)).map(([w,O])=>`<a href="#/${w}" ${t===w?'aria-current="page"':""} class="${t===w?"active":""}">${f(O.icon)}<span>${O.nav}</span>${t===w?'<span class="nav-dot"></span>':""}</a>`).join(""),d=e.notifications||[],$=d.filter(w=>!w.readAt).length,c=sn()||{},y=c.email||((se=e.me)==null?void 0:se.email)||"",q=c.name||mt(y),R=c.picture?`<img class="avatar" src="${i(c.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${i(Nt(q))}</span>`,A=a.nav||(t==="payments"?"Dashboard":t==="new"?s?"Edit request":"New request":"Purchase request");document.title=A+" · Oizom Procurement",Ja.innerHTML=`<div class="app-shell" id="shell">
    <a class="skip-link" href="#view">Skip to content</a>
    <aside class="sidebar" id="sidebar" aria-label="Workspace navigation">
      <a href="#/" class="workspace-brand"><img src="oizom-logo.png" alt="OIZOM"><span>Procurement<span>WORKSPACE</span></span></a>
      <button class="iconbtn mobile-close" id="closeNav" aria-label="Close navigation">${f("close")}</button>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">${o}</nav>
      <div class="sidebar-bottom">
        <div class="workspace-note">${f("package")}<div><b>From request to received.</b><span>Keep every purchase in view.</span></div></div>
        <div class="org-label"><span class="org-dot"></span> Oizom workspace ${f("shield")}</div>
      </div>
    </aside>
    <button class="nav-backdrop" id="navBackdrop" aria-label="Close navigation" tabindex="-1" hidden></button>
    <div class="workspace" id="workspace">
      <header class="topbar">
        <button class="iconbtn mobile-menu" id="openNav" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${f("menu")}</button>
        <div class="topbar-breadcrumb">Workspace ${f("right")} <b>${i(A)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${f("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${$?", "+$+" unread":""}" aria-expanded="false" aria-controls="nPanel">${f("bell")}${$?`<span class="nbadge">${$>9?"9+":$}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${$?$+" new":"All caught up"}</span></div>
              ${d.length?d.map(w=>`<${w.prId?"a":"div"} class="nitem ${w.readAt?"":"unread"}" ${w.prId?`href="#/pr/${i(w.prId)}"`:""}><div class="nmsg">${i(w.message)}</div><div class="ntime">${i(String(w.ts).slice(0,16).replace("T"," "))}</div></${w.prId?"a":"div"}>`).join(""):`<div class="nempty">${f("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${R}<span class="profile-copy"><span class="pname">${i(q)}</span><span class="prole">${i(n||"Oizom team")}</span></span>${f("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${i(y)}</div><button class="btn" id="btnOut">${f("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Xa(e),document.getElementById("btnRefresh").onclick=async()=>{await Y.refresh(),Y.get().err||B("Data refreshed")};const E=document.getElementById("nPanel"),T=document.getElementById("nBtn"),_=document.getElementById("pMenu"),C=document.getElementById("profileBtn"),I=()=>{E.hidden=_.hidden=!0,T.setAttribute("aria-expanded","false"),C.setAttribute("aria-expanded","false")};T.onclick=()=>{var O;const w=E.hidden;I(),E.hidden=!w,T.setAttribute("aria-expanded",String(w)),w&&$&&(d.forEach(K=>{K.readAt||(K.readAt="now")}),(O=document.querySelector(".nbadge"))==null||O.remove(),z("notifRead").catch(()=>{}))},C.onclick=()=>{const w=_.hidden;I(),_.hidden=!w,C.setAttribute("aria-expanded",String(w))},document.getElementById("btnOut").onclick=rn,document.addEventListener("click",w=>{w.target.closest(".nbell, .profile-wrap")||I()},{signal:r});const v=document.getElementById("sidebar"),j=document.getElementById("workspace"),b=document.getElementById("openNav"),g=document.getElementById("shell"),m=matchMedia("(max-width: 960px)");let L=!1;const F=(w,O=!0)=>{var K;L=m.matches&&w,g.classList.toggle("nav-open",L),v.inert=m.matches&&!L,j.inert=L,document.getElementById("navBackdrop").hidden=!L,b.setAttribute("aria-expanded",String(L)),document.body.classList.toggle("nav-locked",L),L?(K=v.querySelector("nav a"))==null||K.focus():O&&m.matches&&b.focus()};F(!1,!1),b.onclick=()=>F(!0),document.getElementById("closeNav").onclick=()=>F(!1),document.getElementById("navBackdrop").onclick=()=>F(!1),v.querySelectorAll("a").forEach(w=>w.addEventListener("click",()=>F(!1),{signal:r})),m.addEventListener("change",()=>F(!1,!1),{signal:r}),document.addEventListener("keydown",w=>{if(w.key==="Escape"&&(L?F(!1):E.hidden?_.hidden||(I(),C.focus()):(I(),T.focus())),w.key==="Tab"&&L){const O=[...v.querySelectorAll("a, button")],K=O[0],Q=O[O.length-1];w.shiftKey&&document.activeElement===K?(w.preventDefault(),Q.focus()):!w.shiftKey&&document.activeElement===Q&&(w.preventDefault(),K.focus())}},{signal:r});const N=document.getElementById("view");if(document.querySelector(".skip-link").onclick=w=>{w.preventDefault(),N.focus()},!e.lastSync)N.innerHTML=e.err?`<div class="connection-state">${f("info")}<h1>We couldn't load your workspace</h1><p>${i(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(le=document.getElementById("retryLoad"))==null||le.addEventListener("click",()=>Y.refresh(),{signal:r});else{a.fn(N,e,s);const w=t+"/"+(s||"");qa!==w&&an(N),qa=w}}window.addEventListener("hashchange",()=>{en(),window.scrollTo({top:0,behavior:"instant"})});let Aa="",Ra=!1,Pa=Y.get().prs;Y.subscribe(e=>{const t=e.prs!==Pa;Pa=e.prs,e.err&&e.err!==Aa&&B(e.err,!0),Aa=e.err;const s=!Ra&&e.lastSync;if(s&&(Ra=!0),e.lastSync&&(e.loading||e.err)&&!t||["new","payments"].includes(Qa().name)&&!s&&e.lastSync&&document.querySelector("#view form")){Xa(e);return}en()});on(()=>Y.refresh());ct()||Ms();
