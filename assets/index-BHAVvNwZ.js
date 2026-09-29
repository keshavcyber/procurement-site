(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var ya;const ue=typeof window<"u"?(ya=window.matchMedia)==null?void 0:ya.call(window,"(prefers-reduced-motion: reduce)"):null,Ye=new Set,Ga="cubic-bezier(.2,.75,.25,1)";var fa;(fa=ue==null?void 0:ue.addEventListener)==null||fa.call(ue,"change",e=>{e.matches&&Ye.forEach(t=>t.cancel())});function nt(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||ue!=null&&ue.matches)return;const i=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:Ga,fill:"backwards"});return i.id="workspace-reveal",Ye.add(i),i.finished.then(()=>Ye.delete(i),()=>Ye.delete(i)),i}function Ka(e){if(ue!=null&&ue.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||nt(a,{delay:Math.min(s++*22,154),distance:10})}}const ba={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},Xe="oizom-id-token";let jt=null;function za(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function st(){const e=localStorage.getItem(Xe);return e?za(e)<Date.now()+3e4?(localStorage.removeItem(Xe),null):e:null}function Ya(){const e=st();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function Za(){localStorage.removeItem(Xe),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function Wa(e){if(jt=e,st()){e();return}At(()=>{google.accounts.id.initialize({client_id:ba.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(Xe,t.credential),jt()}}),google.accounts.id.prompt()})}function At(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>At(e,t+1),100)}function Ja(e){At(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class vt extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const ga=new Set(["list","me","usersList","health","logTail","financeList","attachmentDownload"]),Qa=new Set([404,408,429,500,502,503,504]),Xa=45e3;function en(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function He(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=ga.has(e),i=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",o=n?`Could not load data from the ${s} (${i}). Please try syncing again.`:`Could not confirm your change (${i}). Sync and check whether it saved before submitting again.`;return new vt(o,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||Qa.has(t)})}async function tn(e,t){var d;const s=Date.now(),a=st();if(!a)throw new vt("SIGNED_OUT");let n;try{n=await fetch(ba.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(e==="attachmentUpload"||e==="attachmentDownload"?9e4:Xa),body:JSON.stringify({...t,action:e,token:a})})}catch($){throw He(e,{kind:["TimeoutError","AbortError"].includes($.name)?"timeout":"network"})}const i=en(n);if(!n.ok)throw He(e,{status:n.status,stage:i,kind:"http"});let o;try{o=await n.json()}catch{throw He(e,{stage:i,kind:"response"})}if(!o||typeof o.ok!="boolean"||o.ok&&e==="list"&&!Array.isArray(o.prs))throw He(e,{stage:i,kind:"response"});if(!o.ok)throw new vt(o.error||"Request failed",{action:e});return Number.isFinite((d=o.timing)==null?void 0:d.serverMs)&&console.info("[Procurement timing]",{action:e,totalMs:Date.now()-s,serverMs:o.timing.serverMs,authMs:o.timing.authMs,actionMs:o.timing.actionMs}),o}async function z(e,t={}){for(let s=0;s<2;s++)try{return await tn(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!ga.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function an(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function nn(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function sn(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function rn(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Ht(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,i)=>Number(n.itemNo)-Number(i.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:sn(n),qty:rn(n)}})}let W={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const yt=new Set;let Vt=!1,De=null,Ve=0,Ee=null;function on(e,t){var i;const s=o=>{var d;return[(d=o==null?void 0:o.email)==null?void 0:d.toLowerCase(),o==null?void 0:o.role,o==null?void 0:o.department].join("|")};if(s(e.me)!==s(W.me)||!t.length)return null;const a=[...e.prs];let n=e.items||[];for(const o of t){if(!o.pr||["task","deleted","users","vendors","projects","materialTypes","notifications"].some(m=>o[m]!=null))return null;const d=a.findIndex(m=>m.id===o.pr.id),$=Date.parse(o.pr.updatedAt),p=Date.parse((i=a[d])==null?void 0:i.updatedAt);if(d<0||!Number.isFinite($)||!Number.isFinite(p))return null;$>p&&(a[d]=o.pr,Array.isArray(o.items)&&(n=[...n.filter(m=>m.prId!==o.pr.id),...o.items.map(m=>({...m,prId:o.pr.id}))]))}return{...e,prs:a,items:n}}function _t(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function ct(){yt.forEach(e=>e(W))}const V={get:()=>W,subscribe(e){return yt.add(e),()=>yt.delete(e)},refresh(){return De||(W={...W,loading:!0},De=Promise.resolve().then(async()=>{try{let e,t;do if(t=Ve,Ee=[],e=await z("list"),_t(e),t!==Ve){const s=on(e,Ee);if(s){e=s;break}}while(t!==Ve);_t(e),W={prs:Ht(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,capabilities:e.capabilities||{},lastSync:new Date,err:"",loading:!1},Vt=!0}catch(e){if(e.message==="SIGNED_OUT"&&Vt){location.reload();return}W={...W,err:e.message,loading:!1}}}).finally(()=>{De=null,Ee=null,W={...W,loading:!1},ct()}),ct(),De)},async applyResult(e,{itemsChanged:t=!1}={}){Ve++,Ee&&Ee.push(t&&!Array.isArray(e.items)?{}:e);const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=W.prs.find(i=>i.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return V.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const i=(e.items||(n==null?void 0:n.items)||[]).map(d=>({...d,prId:e.pr.id})),o=Ht([e.pr],i)[0];s.prs=n?W.prs.map(d=>d.id===o.id?o:d):[...W.prs,o]}a=!0}e.deleted&&(s.prs=W.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=W.me&&e.users.find(i=>i.email.toLowerCase()===W.me.email.toLowerCase());if(W.me&&(!n||!n.role))return V.refresh();n&&(s.me={...W.me,role:n.role,department:n.department}),a=!0}if(!a)return V.refresh();W={...W,...s},ct()}},Gt={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function f(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Gt[e]||Gt.file}</svg>`}const r=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function rt(e){return`<span class="chip ${r(e)}" data-s="${r(e)}">${r(e)}</span>`}function N(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${f(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const se=e=>e?r(String(e).slice(0,10)):"—";function it(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function qt(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Kt={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Ze=e=>Kt[e]!=null?Kt[e]:e+" ";function Le(e,t){const s=e==="INR"?"en-IN":"en-US";return Ze(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function le(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Ze(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Ze(e)+(t/1e3).toFixed(1)+"K":Ze(e)+Math.round(t).toLocaleString("en-US")}const je=["Cancelled","Rejected"],ln=["Ordered","In Transit","Received"],ot=e=>ln.includes(e.status)&&["Unpaid","Partially Paid"].includes(e.paymentStatus);function zt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function Yt(e){const t=e.filter(n=>!je.includes(n.status)),s=e.filter(ot),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:zt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:zt(t)}}const et={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:ot,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!je.includes(e.status)};function dn(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Zt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function $a(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function cn(e){return e.filter(ot)}function mn(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function pn(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function Wt(e,t,s){const a={};for(const n of e){const i=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(i))continue;let o;if(t==="count")o=1;else{if(je.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const d=Number(n.amount);if(!n.amount||!isFinite(d)||(n.currency||"Unknown")!==s)continue;o=d}a[i]=(a[i]||0)+o}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function un(e,t){const s={};for(const a of e){if(je.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const i=a.department||"Unassigned";s[i]=(s[i]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function hn(e,t,s=6){const a={};for(const o of e){if(je.includes(o.status)||(o.currency||"Unknown")!==t)continue;const d=Number(o.amount);if(!o.amount||!isFinite(d))continue;const $=o.vendor||"Unspecified";a[$]=(a[$]||0)+d}const n=Object.entries(a).map(([o,d])=>({vendor:o,total:d})).sort((o,d)=>d.total-o.total);if(n.length<=s)return n;const i=n.slice(s).reduce((o,d)=>o+d.total,0);return[...n.slice(0,s),{vendor:"Other",total:i}]}function vn(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function yn(e){const t=(i,o)=>{const d=Date.parse(i),$=Date.parse(o);return isFinite(d)&&isFinite($)?($-d)/864e5:null},s=i=>i.length?i.reduce((o,d)=>o+d,0)/i.length:null,a=e.map(i=>i.createdAt&&i.approvedAt?t(i.createdAt,i.approvedAt):null).filter(i=>i!=null&&i>=0),n=e.map(i=>i.poDate&&i.receivedAt?t(i.poDate,i.receivedAt):null).filter(i=>i!=null&&i>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const fn=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function bn(e,t=Date.now()){const s=fn.map(a=>({...a,count:0}));return e.filter(ot).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const i=(t-n)/864e5;(s.find(o=>i>=o.min&&i<=o.max)||s[s.length-1]).count++}),s}const Te=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],wa=["Unpaid","Paid","Partially Paid","FOC / Free"],tt={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function gn(e,t,s,a,n){const i=(tt[e]||{})[t];return i?i.some(o=>o==="requester:own"?s==="requester"&&a:o==="approver:dept"?s==="approver"&&n:o===s):!1}function $n(e,t,s,a){return Object.keys(tt[e]||{}).filter(n=>gn(e,n,t,s,a))}function wn(e,t){return!!(tt[e]&&tt[e][t])}const Sn=["Submitted","Approved","Rejected"],Jt=["Approved","Ordered","In Transit","Received","Submitted","On Hold","Rejected","Cancelled"],ft=()=>({q:"",dept:"",vendor:"",status:"",from:"",to:""}),u={viewer:"",sel:"total",tab:"mine",statuses:["Approved"],page:1,moreFilters:!1,filters:ft()},Me=25,kn={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let bt;function An(e,t){u.tab=t==="admin"?"all":"dept",t==="admin"&&(u.statuses=e==="pending"?["Submitted"]:[...Te]),u.sel=["pending","unpaid"].includes(e)?e:"total",u.page=1,u.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function be(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Sa(e,t),s&&nt(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const i=e.querySelector("#"+n.id);if(i&&(i.focus(),n.start!=null&&typeof i.setSelectionRange=="function"))try{i.setSelectionRange(n.start,n.end)}catch{}}const Qt=e=>String(e||"").slice(0,10);function qn(e){const t=u.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Qt(e.createdAt)<t.from||t.to&&Qt(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Sa(e,t){clearTimeout(bt),e.innerHTML=`
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
    </div>`,Rn(e.querySelector("#tabBody"),e,t)}const qe=e=>e.length?e.map(([t,s])=>le(t,s)).join(" + "):"—";function Rn(e,t,s){var Et,Mt,It,Ft,xt,Ot,Bt,Ut;const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",i=a.role==="admin",o=a.role==="finance",d=[(Et=a.email)==null?void 0:Et.toLowerCase(),a.role,(Mt=a.department)==null?void 0:Mt.toLowerCase()].join("|");u.viewer!==d&&Object.assign(u,{viewer:d,tab:i?"all":"mine",statuses:["Approved"],sel:"total",page:1,moreFilters:!1,filters:ft()});const $=n?["mine","dept","approved"]:i?["all","mine"]:o?["mine",(It=s.capabilities)!=null&&It.financeHandoff?"finance":"payments"]:["mine"];$.includes(u.tab)||(u.tab="mine");const p=i&&u.statuses.length===1&&u.statuses[0]==="Approved",m=u.statuses.length===Te.length,S=u.tab==="dept",R=u.tab==="approved",P=u.tab==="all",B=u.tab==="payments",F=u.tab==="finance",h=dn(s.prs,a.email),k=o?s.prs.filter(l=>l.financeReleased):[],C=n?Zt(s.prs,a.email):[],_=n?$a(s.prs,a.department):[],D=o?cn(s.prs):[],O=S?_:R?C:P?s.prs:F?k:B?D:h,w=i&&!m?O.filter(l=>u.statuses.includes(l.status)):O,v=Yt(w),j=n?_.filter(et.pending):[],E=i?Yt(s.prs):n?{pending:j.length,highPriority:j.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,M=p?[{key:"total",n:v.total,l:"Ready to purchase",s:P?"Approved requests across all departments":"Your approved requests"},{key:"spend",n:v.spendTotals.length?le(...v.spendTotals[0]):"-",l:"Approved value",s:v.spendTotals.length>1?"+ "+qe(v.spendTotals.slice(1)):"Value of requests ready for purchasing"}]:B?[{key:"total",n:v.total,l:"Awaiting payment",s:qe(v.unpaidTotals)},{key:"transit",n:v.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:v.receivedPct+"%",l:"Received",s:v.received+" of "+v.total,cls:"go"},{key:"spend",n:v.spendTotals.length?le(...v.spendTotals[0]):"—",l:"Total value",s:v.spendTotals.length>1?"+ "+qe(v.spendTotals.slice(1)):""}]:S?[{key:"total",n:v.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:v.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:v.unpaidCount,l:"Unpaid",s:qe(v.unpaidTotals),cls:"bad"},{key:"transit",n:v.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:v.receivedPct+"%",l:"Received",s:v.received+" of "+v.total,cls:"go"},{key:"spend",n:v.spendTotals.length?le(...v.spendTotals[0]):"—",l:"Total spend",s:v.spendTotals.length>1?"+ "+qe(v.spendTotals.slice(1)):""}]:[{key:"total",n:v.total,l:R?"Approved PRs":i&&!m?"Selected PRs":P?"All PRs":"Total PRs",s:R?"across all requesters":i&&!m?"Matching your selected statuses":P?"every department":""},...R?[]:[{key:"pending",n:v.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:v.unpaidCount,l:"Unpaid",s:qe(v.unpaidTotals),cls:"bad"},{key:"transit",n:v.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:v.receivedPct+"%",l:"Received",s:v.received+" of "+v.total,cls:"go"},{key:"spend",n:v.spendTotals.length?le(...v.spendTotals[0]):"—",l:R?"Approved spend":"Total spend",s:v.spendTotals.length>1?"+ "+qe(v.spendTotals.slice(1)):""}];if(!i&&(!o||u.tab==="mine")){const l=M.findIndex(q=>q.key==="unpaid");l>=0&&M.splice(l,1)}if(P)for(const l of mn(w))M.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+it(l.email),s:l.email,cls:"go"});M.some(l=>l.key===u.sel)||(u.sel="total");const te=(u.sel.startsWith("ap:")?Zt(w,u.sel.slice(3)):w.filter(et[u.sel])).sort((l,q)=>(q.createdAt||"").localeCompare(l.createdAt||"")),H=M.find(l=>l.key===u.sel),ae=[...new Set(w.map(l=>l.department).filter(Boolean))].sort(),c=[...new Set(w.map(l=>l.vendor).filter(Boolean))].sort();u.filters.dept&&!ae.includes(u.filters.dept)&&(u.filters.dept=""),u.filters.vendor&&!c.includes(u.filters.vendor)&&(u.filters.vendor="");const T=te.filter(qn),L=Object.values(u.filters).some(Boolean),Y=Math.max(1,Math.ceil(T.length/Me));u.page=Math.min(Math.max(1,u.page),Y);const de=T.slice((u.page-1)*Me,u.page*Me),y=["dept","vendor","from","to"].filter(l=>u.filters[l]).length,g=m?"All statuses":u.statuses.join(" + "),I=i?(P?m?"All requests":p?"Approved requests":g:"Your requests")+(P?"":" · "+g):F?"Requests sent by admin":S?"Department requests":R?"Approved by you":B?"Payment queue":"Your requests",K=(l,q,x)=>`<button type="button" id="scope-${l}" class="adm-tab ${u.tab===l?"active":""}" data-tab="${l}" aria-pressed="${u.tab===l}">${q} <span>${x}</span></button>`,Z=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),b=l=>{const q=i?Te:n&&l.status==="Submitted"&&Z(l)?Sn:null;return q?`<select class="status-sel" data-status="${r(l.status)}" aria-label="Status for ${r(l.id)}" data-id="${r(l.id)}">${q.map(x=>`<option ${x===l.status?"selected":""}>${r(x)}</option>`).join("")}</select>`:rt(l.status)},U=l=>`<select class="pay-sel" aria-label="Payment status for ${r(l.id)}" data-id="${r(l.id)}">${wa.map(q=>`<option ${q===l.paymentStatus?"selected":""}>${r(q)}</option>`).join("")}</select>`,re=i?`<section class="admin-view-bar" aria-label="Admin request view">
      <div class="view-control-row"><span class="view-control-label" id="statusPillLabel">STATUS</span><div class="status-pills" role="group" aria-labelledby="statusPillLabel" aria-describedby="statusPillHint">
        <button type="button" class="view-pill ${m?"selected":""}" id="showAllRequests" aria-label="All statuses" aria-pressed="${m}">All <span>${O.length}</span></button>
        ${Jt.map((l,q)=>`<button type="button" class="view-pill ${!m&&u.statuses.includes(l)?"selected":""}" id="status-pill-${q}" data-admin-status="${r(l)}" aria-pressed="${!m&&u.statuses.includes(l)}">${l==="Submitted"?"Pending approval":r(l)}<span>${O.filter(x=>x.status===l).length}</span></button>`).join("")}
      </div></div>
      <div class="view-control-row view-scope-row"><span class="view-control-label" id="scopePillLabel">SCOPE</span><div class="scope-pills" role="group" aria-labelledby="scopePillLabel">
        <button type="button" class="view-pill ${P?"selected":""}" id="scope-all" data-admin-scope="all" aria-pressed="${P}">Everyone</button>
        <button type="button" class="view-pill ${P?"":"selected"}" id="scope-mine" data-admin-scope="mine" aria-pressed="${!P}">Your requests</button>
      </div><span class="view-selection-hint" id="statusPillHint">Select one or more statuses</span><button type="button" class="view-reset" id="resetAdminView" title="Reset to Approved requests">${f("refresh")} Reset</button></div>
      <div class="view-selection-summary"><span class="view-active-dot"></span><span id="adminViewHeading">${r(I)}</span><span class="view-result-count" role="status">${w.length} ${w.length===1?"request":"requests"}</span></div>
    </section>`:"";e.innerHTML=`
    ${o&&((Ft=s.capabilities)!=null&&Ft.financeWorkflow)?`<section class="attention-card"><div class="attention-heading"><span class="eyebrow">FINANCE</span><h2>Your payment work</h2><p>Mark In progress to take responsibility through completion.</p></div><a class="btn" href="#/payments">${f("wallet")} View payment work ${f("arrow")}</a></section>`:""}
    ${!i&&$.length>1?`<div class="adm-tabs" role="group" aria-label="Request scope">
      ${K("mine","Your requests",h.length)}
      ${n?K("dept",r(a.department||"Your department"),_.length)+K("approved","Approved by you",C.length):""}
      ${o?(xt=s.capabilities)!=null&&xt.financeHandoff?K("finance","Sent to Finance",k.length):K("payments","Awaiting payment",D.length):""}
    </div>`:""}
    <div class="kpis dashboard-kpis ${p?"approved-kpis":""}" aria-label="Filter requests by summary">${M.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===u.sel?"sel":""}" data-key="${r(l.key)}" aria-pressed="${l.key===u.sel}">
        <span class="kpi-top"><span class="l">${r(l.l)}</span>${f(kn[l.key])}</span>
        <span class="v">${r(String(l.n))}</span><span class="s">${r(l.s||(l.key==="total"?I:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${E?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?r(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${E.pending?"":"disabled"}><span class="attention-icon">${f("clock")}</span><span><b>${E.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${E.pending?"Open approval queue":"No approvals waiting"}</small></span>${f("arrow")}</button>
      ${i?`<button type="button" data-queue="unpaid" ${E.unpaidCount?"":"disabled"}><span class="attention-icon">${f("wallet")}</span><span><b>${E.unpaidCount} awaiting payment</b><small>${E.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${f("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${f("info")}</span><span><b>${E.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    ${re}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${T.length}</span></h2><p>${r(I)} · ${u.sel==="total"?"Latest first":r(H.l)}</p></div><span class="table-hint">Select a request to view details ${f("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${f("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${r(u.filters.q)}"></label>
        ${i?"":`<select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${Te.map(l=>`<option value="${r(l)}" ${u.filters.status===l?"selected":""}>${r(l)}</option>`).join("")}</select>`}
        <button type="button" class="btn filter-toggle ${y?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${u.moreFilters}" aria-controls="advancedFilters">${f("filter")} Filters ${y?`<span class="count-badge">${y}</span>`:""}</button>
        ${L?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${u.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${ae.map(l=>`<option value="${r(l)}" ${u.filters.dept===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${c.map(l=>`<option value="${r(l)}" ${u.filters.vendor===l?"selected":""}>${r(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${r(u.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${r(u.filters.to)}"></label>
        ${P?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${M.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${r(l.key)}" ${u.sel===l.key?"selected":""}>${r(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${B?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${de.map(l=>`<tr class="rowlink ${B?"payment-row":""}" data-id="${r(l.id)}">
          <td class="request-id"><a href="#/pr/${r(l.id)}">${r(l.id)}</a></td>
          <td class="request-date">${se(l.createdAt)}</td>
          ${B?`<td>${r(l.vendor)}</td><td>${r(l.poNo||"—")}</td><td>${r(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${r(l.department)}</td><td class="wrap request-item">${r(l.item)}</td><td class="request-vendor">${r(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?r(le(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${B?U(l):b(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${f(L?"search":"file")}<b>${L?"No matching requests":p?"No requests ready for purchasing":i&&!m?"No requests with these statuses":"No requests here yet"}</b><span>${L?"Try a different search or clear your filters.":p?"Requests appear here once approved. Open All requests to review pending approvals and other statuses.":i&&!m?"Choose different statuses or open All requests.":"Create a request to get your purchases moving."}</span>${L?'<button class="btn" id="emptyClear">Clear filters</button>':i&&!m?'<button class="btn primary" id="emptyAllRequests">View all requests</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${T.length?(u.page-1)*Me+1:0}–${Math.min(u.page*Me,T.length)} of ${T.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${u.page===1?"disabled":""}>${f("left")}</button><span>Page ${u.page} of ${Y}</span><button class="btn" id="dashNext" aria-label="Next page" ${u.page===Y?"disabled":""}>${f("right")}</button></div></div>
    </section>`;const G=l=>{u.tab=l,u.sel="total",u.page=1,i&&(u.filters=ft()),be(t,s)};e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>G(l.dataset.tab));const X=()=>{u.statuses=[...Te],G(u.tab),t.querySelector("#showAllRequests").focus()};(Ot=e.querySelector("#showAllRequests"))==null||Ot.addEventListener("click",X),(Bt=e.querySelector("#emptyAllRequests"))==null||Bt.addEventListener("click",()=>{u.tab="all",X()}),e.querySelectorAll("[data-admin-status]").forEach(l=>l.onclick=()=>{const q=l.dataset.adminStatus;if(m)u.statuses=[q];else if(!u.statuses.includes(q))u.statuses=Jt.filter(x=>x===q||u.statuses.includes(x));else if(u.statuses.length>1)u.statuses=u.statuses.filter(x=>x!==q);else return;G(u.tab)}),e.querySelectorAll("[data-admin-scope]").forEach(l=>l.onclick=()=>G(l.dataset.adminScope)),(Ut=e.querySelector("#resetAdminView"))==null||Ut.addEventListener("click",()=>{u.statuses=["Approved"],G("all")}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{u.sel=l.dataset.key,u.page=1,be(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var x,Q,me;if(l.dataset.queue==="unpaid"&&((x=s.capabilities)!=null&&x.financeWorkflow)){location.hash="#/payments";return}if(!i&&!(n&&l.dataset.queue==="pending"))return;An(l.dataset.queue,a.role),be(t,s);const q=t.querySelector(".requests-card");q.focus({preventScroll:!0}),(me=q.scrollIntoView)==null||me.call(q,{block:"start",behavior:(Q=window.matchMedia)!=null&&Q.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=q=>{q.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{u.moreFilters=!u.moreFilters,e.querySelector("#advancedFilters").hidden=!u.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(u.moreFilters))};const ce=e.querySelector("#dashApprover");ce&&(ce.onchange=()=>{u.sel=ce.value,u.page=1,be(t,s)});const fe=l=>{var q,x;u.page+=l,be(t,s),(x=(q=t.querySelector(".requests-card")).scrollIntoView)==null||x.call(q,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>fe(-1),e.querySelector("#dashNext").onclick=()=>fe(1);const ne=(l,q)=>{u.filters[l]=q,u.page=1,be(t,s)};e.querySelector("#dashQ").oninput=l=>{u.filters.q=l.target.value,u.page=1,clearTimeout(bt),bt=setTimeout(()=>{t.isConnected&&be(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>ne("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>ne("vendor",l.target.value);const J=e.querySelector("#dashStatus");J&&(J.onchange=l=>ne("status",l.target.value)),e.querySelector("#dashFrom").onchange=l=>ne("from",l.target.value),e.querySelector("#dashTo").onchange=l=>ne("to",l.target.value);const ie=()=>{u.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},u.page=1,u.sel="total",be(t,s)},ke=e.querySelector("#dashFilterClear"),Dt=e.querySelector("#emptyClear");ke&&(ke.onclick=ie),Dt&&(Dt.onclick=ie),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=q=>q.stopPropagation(),l.onchange=async()=>{var me;const q=l.dataset.id,x=s.prs.find(Ae=>Ae.id===q),Q=l.value;if(!(!x||Q===x.status)){if((me=s.capabilities)!=null&&me.poFinanceHandoff&&x.status==="Approved"&&Q==="Ordered"){l.value=x.status,location.hash="#/pr/"+encodeURIComponent(q),N("Create the PO to mark this request Ordered and send it to Finance.");return}if((Q==="Rejected"||Q==="Cancelled")&&!confirm(`Mark ${q} as ${Q}?`)){l.value=x.status;return}l.disabled=!0;try{let Ae;a.role==="admin"&&!wn(x.status,Q)?Ae=await z("update",{id:q,updates:{status:Q}}):Ae=await z("transition",{id:q,to:Q}),N(`${q} → ${Q}`),await V.applyResult(Ae)}catch(Ae){N(Ae.message,!0),l.value=x.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=q=>q.stopPropagation(),l.onchange=async()=>{const q=l.dataset.id,x=s.prs.find(me=>me.id===q),Q=l.value;if(!(!x||Q===x.paymentStatus)){l.disabled=!0;try{const me=await z("update",{id:q,updates:{paymentStatus:Q}});N(`${q} payment → ${Q}`),await V.applyResult(me)}catch(me){N(me.message,!0),l.value=x.paymentStatus,l.disabled=!1}}}})}function Rt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function Pt(e,t){const s=Rt(e,t),a=s.filter(et.spend),n={};for(const i of a){const o=Number(i.amount);if(!i.amount||!isFinite(o))continue;const d=i.currency||"INR";n[d]=(n[d]||0)+o}return{count:s.length,spendTotals:Object.entries(n).sort((i,o)=>o[1]-i[1]),unpaid:s.filter(et.unpaid).length,lastOrder:s.reduce((i,o)=>{const d=String(o.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(d)&&d>i?d:i},"")}}function ka(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(Rt(t,e.name).filter(i=>i.amount&&isFinite(Number(i.amount))).map(i=>i.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(i=>i!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Pn=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Cn={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},Tn=1,Ln=.7,Aa=.5,Nn=.4,Dn=.3,En=4,Mn=e=>e.length>=7?2:e.length>=En?1:0,at=e=>String(e??"").toLowerCase().trim();function In(e,t){const s=e[t];return at(Array.isArray(s)?s.join(" "):s)}function qa(e){return at(e).split(/[\s,]+/).filter(Boolean)}function Fn(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let i=1;i<=t.length;i++)n[i]=Math.min(s[i]+1,n[i-1]+1,s[i-1]+(e[a-1]===t[i-1]?0:1));s=n}return s[t.length]}function Xt(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return Tn;if(s.some(n=>n.startsWith(t)))return Ln;if(e.includes(t))return Aa;const a=Mn(t);return a&&s.some(n=>Fn(n,t)<=a)?Dn:0}function xn(e,t){const s=Xt(e,t);if(s)return s;const a=Cn[t];return a&&a.some(i=>i.includes(" ")?e.includes(i):Xt(e,i)>=Aa)?Nn:0}function On(e,t){const s=Array.isArray(t)?t:qa(t);if(!s.length)return 0;let a=0;for(const n of s){let i=0;for(const{key:o,weight:d}of Pn)i=Math.max(i,xn(In(e,o),n)*d);if(!i)return 0;a+=i}return a}function Ra(e,t){const s=qa(t);return s.length?(e||[]).map(a=>({v:a,score:On(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||at(a.v.displayName||a.v.name).localeCompare(at(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function lt(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${f("search")}
        <input aria-label="${r(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${r(t)}" value="${r(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${f("close")}
        </button>
      </div>
    </div>`}const Ct=(...e)=>r(e.filter(Boolean).join(" ").toLowerCase());function Tt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${r(t)}</td></tr>`}function Lt(e,{get:t,set:s,count:a,id:n="admSearch",match:i=null}){const o=e.querySelector("#"+n);if(!o)return;const d=o.closest(".adm-card"),$=d.querySelector(".admSearchClear"),p=()=>Bn(d,t(),a,i);o.oninput=()=>{s(o.value),$.hidden=!o.value,p()},o.onkeydown=m=>{m.key==="Escape"&&o.value&&(o.value="",o.oninput())},$.onclick=()=>{o.value="",o.oninput(),o.focus()},p()}function Bn(e,t,s,a){const n=t.trim().toLowerCase(),i=[...e.querySelectorAll("tbody tr[data-search]")],o=n&&a?a(n):null;let d=null;i.forEach(m=>{m.hidden=n?o?!o.has(m.dataset.name):!m.dataset.search.includes(n):!1,m.classList.remove("last-visible"),m.hidden||(d=m)}),d&&d.classList.add("last-visible");const $=e.querySelector(".adm-nomatch");$&&($.hidden=!!d||!i.length);const p=e.querySelector(".adm-count");p&&(p.textContent=s(i.filter(m=>!m.hidden).length,i.length))}let Ie="";const Pa={Domestic:"dom",Foreign:"for",Mixed:"mix"},Un=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function Ca(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${r(Un(e.displayName||e.name))}${t?`<img src="${r(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function jn(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${r(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Hn(e,t){const s=Pt(e.prs,t.name),a=ka(t,e.prs),n=s.spendTotals.length?le(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${r(t.name)}">
      <div class="vc-top">
        ${Ca(t)}
        <div class="vc-title">
          <b>${r(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${r(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Pa[a]}">${r(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${r(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${se(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${jn(t)}</div>
    </a>`}const Vn=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function ea(e,t){const s=Vn(e.vendors),a=t.trim()?Ra(s,t):s;return a.length?a.map(n=>Hn(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${r(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function _n(e,t,s){if(s)return Gn(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${lt(Ie,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${ea(t,Ie)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),i=e.querySelector(".admSearchClear"),o=()=>{Ie=n.value,i.hidden=!Ie,a.innerHTML=ea(t,Ie)};n.oninput=o,n.onkeydown=d=>{d.key==="Escape"&&n.value&&(n.value="",o())},i.onclick=()=>{n.value="",o(),n.focus()}}function Gn(e,t,s){const a=(t.vendors||[]).find(p=>p.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${r(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=Pt(t.prs,a.name),i=ka(a,t.prs),o=t.me&&t.me.role==="admin",d=Rt(t.prs,a.name).sort((p,m)=>(m.createdAt||"").localeCompare(p.createdAt||"")),$=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,p])=>p);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${Ca(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${r(a.displayName||a.name)}
              ${i?`<span class="vc-badge ${Pa[i]}">${r(i.toUpperCase())}</span>`:""}
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
        <div class="kpi"><div class="v">${n.spendTotals.length?r(le(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?r(n.spendTotals.slice(1).map(([p,m])=>le(p,m)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${se(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${$.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${$.map(([p,m])=>`<div><span class="vc-l">${r(p)}</span><b>${r(m)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(p=>`<span class="vc-chip">${r(p)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${d.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${d.map(p=>`<tr class="rowlink" data-id="${r(p.id)}">
            <td style="font-family:var(--mono);font-size:12px">${r(p.id)}</td>
            <td>${se(p.createdAt)}</td><td>${r(p.department)}</td>
            <td class="wrap">${r(p.item)}</td>
            <td>${p.amount?r(le(p.currency||"INR",Number(p.amount))):"—"}</td>
            <td>${rt(p.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(p=>p.onclick=()=>location.hash="#/pr/"+p.dataset.id)}const gt=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Ta=new Map(gt.map(e=>[e.code,e])),Kn=e=>Ta.has(String(e||"").trim().toUpperCase());function $t(e){const t=Ta.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function zn(e){const t=String(e||"").trim().toLowerCase(),s=t?gt.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...gt],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,i)=>a(n)-a(i)||n.code.localeCompare(i.code))}function _e(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const i=Math.max(n.value/a*100,n.value>0?2:0),o=s?s(n):"var(--brand)",d=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${r(d)}">
      <span class="barlabel">${r(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${i.toFixed(1)}%;background:${o}"></span></span>
      <span class="barval">${r(t(n.value))}</span>
    </div>`}).join("")}</div>`}function ta(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},i=s-n.l-n.r,o=a-n.t-n.b,d=Math.max(...e.map(k=>k.value),1),$=i/(e.length-1),p=k=>n.l+k*$,m=k=>n.t+o-k/d*o,S=e.map((k,C)=>`${C===0?"M":"L"}${p(C).toFixed(1)} ${m(k.value).toFixed(1)}`).join(" "),R=`${S} L${p(e.length-1).toFixed(1)} ${n.t+o} L${p(0).toFixed(1)} ${n.t+o} Z`,P=[0,.5,1].map(k=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+o*(1-k)).toFixed(1)}" y2="${(n.t+o*(1-k)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),B=Math.ceil(e.length/6)||1,F=e.map((k,C)=>C%B===0||C===e.length-1?`<text x="${p(C).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${C===0?"start":C===e.length-1?"end":"middle"}">${r(k.month.slice(2))}</text>`:"").join(""),h=e.map((k,C)=>`<circle cx="${p(C).toFixed(1)}" cy="${m(k.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${r(k.month)}: ${r(t(k.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${P}
    <path d="${R}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${S}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${h}
    ${F}
  </svg>`}const Yn=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],Zn={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},Wn={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Ge={currency:""};function La(e,t){var D,O;const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?$a(t.prs,s.department):t.prs||[],i=pn(n);i.includes(Ge.currency)||(Ge.currency=i[0]||"");const o=Ge.currency,d=w=>o?le(o,w):String(w),$=o?Wt(n,"spend",o):[],p=Wt(n,"count"),m=o?hn(n,o,6).map(w=>({label:w.vendor,value:w.total})):[],S=!a&&o?un(n,o).map(w=>({label:w.department,value:w.total})):[],R=vn(n),P=Yn.filter(w=>R[w]).map(w=>({label:w,value:R[w]})),B=yn(n),F=bn(n),h=F.map(w=>({label:w.label,value:w.count})),k=F.reduce((w,v)=>w+v.count,0),C=$.reduce((w,v)=>w+v.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${r(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${i.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${f("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${i.map(w=>`<option value="${r(w)}" ${w===o?"selected":""}>${r($t(w))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${o?r(d(C)):"—"}</div><div class="l">Total spend${o?" · "+r(o):""}</div></div>
        <div class="kpi"><div class="v">${B.avgApprovalDays!=null?B.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${B.avgDeliveryDays!=null?B.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        ${((D=t.me)==null?void 0:D.role)==="admin"?`<div class="kpi ${k?"warn":""}"><div class="v">${k}</div><div class="l">Unpaid POs awaiting payment</div></div>`:""}
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${o?" · "+r(o):""}</p></div>
          </div>
          <div class="spend-chart">${$.length?ta($,{valueFmt:w=>le(o,w),height:180}):`<div class="trend-empty">${f("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${S.length?`<div class="card"><h2>Spend by department${o?" · "+r(o):""}</h2>
          <div class="pd-body">${_e(S,{valueFmt:d})}</div></div>`:""}
        <div class="card"><h2>Top vendors${o?" · "+r(o):""}</h2>
          <div class="pd-body">${_e(m,{valueFmt:d})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${_e(P,{colorOf:w=>Zn[w.label]||"var(--mut)"})}</div></div>
        ${((O=t.me)==null?void 0:O.role)==="admin"?`<div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${_e(h,{colorOf:w=>Wn[w.label]||"var(--brand)"})}</div></div>`:""}
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${ta(p,{valueFmt:w=>w+" PR"+(w===1?"":"s")})}</div>
      </div>
    </div>`;const _=e.querySelector("#insCur");_&&(_.onchange=()=>{var w;Ge.currency=_.value,La(e,t),(w=e.querySelector("#insCur"))==null||w.focus()})}const Na={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Da(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function Jn(e){const t=String(e.trackingNo||"").trim(),s=Da(e.trackingLink)||(t?(Na[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[r(e.courier||""),s?`<a href="${r(s)}" target="_blank" rel="noopener noreferrer">${r(t||"Track shipment")} ↗</a>`:r(t)].filter(Boolean).join(" ")}function Qn(e,t=[]){const s=[...new Set([...t,...Object.keys(Na),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${r(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${r(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${r(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${r(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function Xn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Da(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const es="1900-01-01",ts="2100-12-31",as="Enter a complete date with a year between 1900 and 2100.";function Be(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Ea(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(as)};return t.forEach(a=>{a.min=es,a.max=ts;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const ns=".pdf,.jpg,.jpeg,.png,.xls,.xlsx";function dt(e){try{const t=typeof e=="string"?JSON.parse(e):e;return Array.isArray(t)?t:[]}catch{return[]}}function Ma(e){return`<div class="attachment-links">${dt(e).map(t=>`<button type="button" class="attachment-link" data-download="${r(t.id)}">${f("file")}${r(t.name)}</button>`).join("")}</div>`}function Ia(e=[]){return`<div class="attachment-picker" data-attachments="${r(JSON.stringify(dt(e)))}">
    <div class="attachment-selection"></div>
    <button type="button" class="btn attach-file">${f("plus")} Attach proof</button>
    <input class="attachment-input" type="file" accept="${ns}" multiple hidden aria-label="Attach PDF, image or Excel proof">
    <small>PDF, JPG, PNG or Excel · 5 MB per file · up to 3 files</small><span class="attachment-status" role="status" aria-live="polite"></span>
  </div>`}const ss=e=>new Promise((t,s)=>{const a=new FileReader;a.onload=()=>t(String(a.result).split(",")[1]),a.onerror=()=>s(new Error("Could not read "+e.name)),a.readAsDataURL(e)});function Fa(e,{scope:t,prId:s=""}){if(!e)return;let a=!1;const n=dt(e.dataset.attachments).map(m=>({attachment:m})),i=e.querySelector(".attachment-selection"),o=e.querySelector("input"),d=e.querySelector(".attachment-status"),$=()=>{e.dataset.attachments=JSON.stringify(n.filter(m=>m.attachment).map(m=>m.attachment))},p=()=>{i.innerHTML=n.map((m,S)=>{var R,P;return`<div class="attachment-chip">${f("file")}<span>${r(((R=m.attachment)==null?void 0:R.name)||m.file.name)}${m.attachment?"":" · ready to upload"}</span><button type="button" data-remove="${S}" aria-label="Remove ${r(((P=m.attachment)==null?void 0:P.name)||m.file.name)}" ${a?"disabled":""}>${f("close")}</button></div>`}).join(""),i.querySelectorAll("[data-remove]").forEach(m=>m.onclick=()=>{a||(n.splice(Number(m.dataset.remove),1),$(),p())})};e.querySelector(".attach-file").onclick=()=>o.click(),o.onchange=()=>{try{const m=[...o.files];if(n.length+m.length>3)throw new Error("Attach up to 3 files per item or payment");for(const S of m){if(!/\.(pdf|jpe?g|png|xlsx?)$/i.test(S.name))throw new Error("Choose a PDF, JPG, PNG or Excel file");if(!S.size||S.size>5*1024*1024)throw new Error("Each file must be between 1 byte and 5 MB")}m.forEach(S=>n.push({file:S,operationId:crypto.randomUUID()})),d.textContent="Files will upload when you save.",p()}catch(m){N(m.message,!0)}finally{o.value=""}},e.uploadFiles=async()=>{var m;a=!0,o.disabled=!0,e.querySelector(".attach-file").disabled=!0,p();try{for(const S of n){if(S.attachment)continue;d.textContent="Uploading "+S.file.name+"…";const R=await z("attachmentUpload",{scope:t,prId:s,name:S.file.name,operationId:S.operationId,base64:await ss(S.file)});if(!((m=R.attachment)!=null&&m.id))throw new Error("Upload response was incomplete. Retry saving to check this file.");S.attachment=R.attachment,$(),p()}return d.textContent=n.length?"Attachments ready.":"",n.map(S=>S.attachment)}catch(S){throw d.textContent="Upload not confirmed. Your selected files are kept here for retry.",S}finally{a=!1,o.disabled=!1,e.querySelector(".attach-file").disabled=!1,p()}},e.hasPendingFiles=()=>n.some(m=>!m.attachment),p()}function xa(e){e.querySelectorAll("[data-download]").forEach(t=>t.onclick=async()=>{if(!t.disabled){t.disabled=!0;try{const s=await z("attachmentDownload",{id:t.dataset.download}),a=Uint8Array.from(atob(s.base64),o=>o.charCodeAt(0)),n=URL.createObjectURL(new Blob([a],{type:s.attachment.mimeType})),i=document.createElement("a");i.href=n,i.download=s.attachment.name,i.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){N(s.message,!0)}finally{t.disabled=!1}}})}const rs=wa,is={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},We=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:is[t])||[],mt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ve=(e,t,s)=>`<span class="lblrow">${r(e)}${mt[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${r(mt[t])}" data-tip="${r(mt[t])}">?</span>`:""}</span>`;function Re(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${r(n)}" ${n===t?"selected":""}>${n?r(n):"Select…"}</option>`).join("")}function pt(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <div class="item-row-heading"><b class="item-number">Item ${s+1}</b><button type="button" class="btn danger rmItem">${f("trash")} Remove item</button></div>
    <input type="hidden" name="i_lineTotal" value="${r(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${r(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${r(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${r(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${Re(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${r(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${Re([...new Set([...We(e,"units"),"nos","na"])],t.unit||"nos").replace(">nos</option>",">nos — Number</option>").replace(">na</option>",">na — Not applicable</option>")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${r(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${r(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${r(t.datasheetDoc)}"></label>
    <div class="item-attachments"><span class="lblrow">Item proof / supporting files</span>${Ia(t.attachments)}</div>
  </div>`}function Ke(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{var a;const s=n=>t.querySelector(`[name="${n}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal"),attachments:dt((a=t.querySelector(".attachment-picker"))==null?void 0:a.dataset.attachments)}}).filter(t=>t.description)}function os(e,t,s){var de;const a=s?t.prs.find(y=>y.id===s):null,n=a||{},i=a?n.items||[]:[{}],o=t.me||{role:""};["approver","admin","finance"].includes(o.role);const d=a?n.department||"":o.department||"",$=(t.projects||[]).filter(y=>y.department.toLowerCase()===d.toLowerCase()).map(y=>y.project),p=(t.vendors||[]).filter(y=>(y.departments||[]).some(g=>g.toLowerCase()===d.toLowerCase())),m=y=>{const g=p.find(A=>A.name.toLowerCase()===String(y||"").toLowerCase());return g?g.displayName||g.name:String(y||"")},S=(t.materialTypes||[]).filter(y=>y.department.toLowerCase()===d.toLowerCase()).map(y=>y.materialType),R=d.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${r(n.id)}" style="font-family:var(--mono)">${r(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?r(n.id):"New Purchase Request"}</h1>
          ${a?rt(n.status):""}
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
              <label>${ve("Project*","project")} <select name="project" required>${Re($,n.project||"",!0)}</select></label>
              <label>${ve("Purpose","purpose")} <input name="purpose" value="${r(n.purpose)}"></label>
              <div class="pd-field full">${ve("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${r(m(n.vendor))}">
                <input type="hidden" name="vendor" value="${r(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <label class="vendor-manual" id="manualVendorField" hidden>Vendor name<input id="manualVendorName" maxlength="200" placeholder="Enter the vendor's name" autocomplete="off"></label>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ve("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${r($t(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${r(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ve("Priority","priority",!0)} <select name="priority">${Re(We(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&o.role==="admin"?"":`<label>${ve("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Be(n.expectedDate))}"></label>`}
              ${["admin","finance"].includes(o.role)&&!((de=t.capabilities)!=null&&de.financeWorkflow)?`
              <label>${ve("Payment status*","payment")} <select name="paymentStatus" required>${Re(rs,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&o.role==="admin"?`
              <label>Status (admin override) <select name="status">${Re(Te,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${r(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${ve("Notes","notes")} <textarea name="notes" rows="3">${r(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&o.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${r(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${r(Be(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${r(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${r(Be(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${Re(We(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${r(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&o.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${Qn(n,We(t,"couriers"))}
          <label>${ve("Expected delivery","expected")} <input name="expectedDate" type="date" value="${r(Be(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${i.map((y,g)=>pt(t,y,g,S,R)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${f("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${f("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const P=e.querySelector("#prForm"),B=Ea(P),F=e.querySelector("#itemRows"),h=()=>{const y=Ke(P).map(I=>{const K=an(I.qty,I.unitPrice);return{lineTotal:K!==""?K:I.lineTotal}}),g=nn(y),A=P.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=g===""?"":"Total: "+Le(A,g)},k=()=>{const y=F.children.length===1;[...F.children].forEach((g,A)=>{g.dataset.i=A,g.querySelector(".item-number").textContent="Item "+(A+1);const I=g.querySelector(".rmItem");I.innerHTML=f(y?"refresh":"trash")+(y?" Clear item":" Remove item"),I.setAttribute("aria-label",(y?"Clear item ":"Remove item ")+(A+1)),I.title=y?"Clear this item and its selected attachments":"Remove this item from the request",I.disabled=e.querySelector("#prSave").disabled})},C=y=>{Fa(y.querySelector(".attachment-picker"),{scope:"item",prId:(a==null?void 0:a.id)||""}),y.querySelector(".rmItem").onclick=()=>{if(e.querySelector("#prSave").disabled)return;let g=y.nextElementSibling||y.previousElementSibling;F.children.length>1?y.remove():(y.insertAdjacentHTML("afterend",pt(t,{},0,S,R)),g=y.nextElementSibling,y.remove(),C(g)),k(),h(),g.querySelector('[name="i_description"]').focus()},y.querySelectorAll("input, select").forEach(g=>g.oninput=h)};[...F.children].forEach(C),k(),h();const _=(y,g,A,{search:I,resolve:K,toLabel:Z,allowEmpty:b,onCommit:U,onSelect:re})=>{const G=e.querySelector("#"+y),X=e.querySelector("#"+g),ce=P.querySelector(`[name="${A}"]`),fe=()=>{U&&U()},ne=J=>{const ie=I(J).slice(0,30);X.innerHTML=ie.map(ke=>`<div class="curOpt" data-v="${r(ke.value)}"><b>${r(ke.main)}</b> ${r(ke.name||"")}<span>${r(ke.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',X.hidden=!1};G.onfocus=()=>{G.select(),ne("")},G.oninput=()=>ne(G.value),X.onmousedown=J=>{J.preventDefault();const ie=J.target.closest(".curOpt");if(ie){if(re!=null&&re(ie.dataset.v)){X.hidden=!0;return}ce.value=ie.dataset.v,G.value=Z(ie.dataset.v),X.hidden=!0,fe()}},G.onblur=()=>setTimeout(()=>{X.hidden=!0;const J=G.value.trim();if(!J&&b)ce.value="";else{const ie=K(J);ie!=null&&(ce.value=ie)}G.value=Z(ce.value),fe()},120)};_("curSearch","curList","currency",{search:y=>zn(y).map(g=>({value:g.code,main:g.code,name:g.name,sub:g.sym||""})),resolve:y=>{const g=y.split("—")[0].trim().toUpperCase();return Kn(g)?g:null},toLabel:y=>$t(y),onCommit:h});const D=y=>{const g=String(y||"").trim().toLowerCase();return p.filter(A=>!g||A.name.toLowerCase().includes(g)||(A.displayName||"").toLowerCase().includes(g)||(A.category||"").toLowerCase().includes(g)).sort((A,I)=>(A.displayName||A.name).localeCompare(I.displayName||I.name)).slice(0,29).map(A=>({value:A.name,main:A.displayName||A.name,name:A.displayName?A.name:"",sub:A.category||""})).concat({value:"__other__",main:"Other — enter manually",sub:"Vendor not listed? Add its name to this request."})};let O=!1;const w=e.querySelector("#manualVendorField"),v=e.querySelector("#manualVendorName"),j=P.querySelector('[name="vendor"]'),E=y=>{O=y,w.hidden=!y,v.required=y},M=e.querySelector("#venHint"),te=()=>{const y=P.querySelector('[name="vendor"]').value.trim();M.hidden=!y||p.some(g=>g.name.toLowerCase()===y.toLowerCase())};_("venSearch","venList","vendor",{search:D,resolve:y=>{if(O)return v.value.trim();const g=p.find(A=>A.name.toLowerCase()===y.toLowerCase()||(A.displayName||"").toLowerCase()===y.toLowerCase());return g?g.name:y},toLabel:y=>O?"Other — enter manually":m(y),onSelect:y=>(E(y==="__other__"),O?(j.value=v.value.trim(),e.querySelector("#venSearch").value="Other — enter manually",v.focus(),te(),!0):!1),allowEmpty:!0,onCommit:te}),v.oninput=()=>{j.value=v.value.trim(),te()};const H=e.querySelector("#venSearch"),ae=H.oninput;H.oninput=()=>{E(!1),ae()},te(),e.querySelector("#addItem").onclick=()=>{e.querySelector("#prSave").disabled||(F.insertAdjacentHTML("beforeend",pt(t,{},F.children.length,S,R)),C(F.lastElementChild),k(),nt(F.lastElementChild))};const c=P.elements.namedItem("trackingLink");c&&(c.oninput=()=>c.setCustomValidity(""));const T=()=>Object.fromEntries([...new FormData(P)].filter(([y])=>!y.startsWith("i_"))),L=T(),Y=JSON.stringify(Ke(P));P.onsubmit=async y=>{y.preventDefault();const g=e.querySelector("#prSave");if(g.disabled||!B()||!Xn(c))return;if(O&&!v.value.trim()){v.reportValidity();return}e.querySelectorAll(".pr-save").forEach(K=>{K.disabled=!0,K.innerHTML=f("refresh","spin")+" Saving…"}),g.disabled=!0,g.textContent="Saving…",k(),e.querySelector("#addItem").disabled=!0;const A=T();let I=Ke(P);try{if(!I.length&&(!a||JSON.stringify(I)!==Y))throw new Error("Add at least one item with a description");for(const Z of F.children)Z.querySelector('[name="i_description"]').value.trim()&&await Z.querySelector(".attachment-picker").uploadFiles();I=Ke(P);const K=JSON.stringify(I)!==Y;if(a){const Z=Object.fromEntries(Object.entries(A).filter(([b,U])=>U!==L[b]));if(Object.keys(Z).length||K){const b=await z("update",{id:n.id,updates:Z,...K?{items:I}:{}});await V.applyResult(b,{itemsChanged:K}),N("PR updated")}location.hash="#/pr/"+n.id}else{const Z=await z("create",{pr:A,items:I});await V.applyResult(Z,{itemsChanged:!0}),N("Created "+Z.pr.id),location.hash="#/pr/"+Z.pr.id}}catch(K){N(K.message,!0),g.disabled=!1,g.textContent=a?"Save changes":"Submit PR",k(),e.querySelector("#addItem").disabled=!1,e.querySelectorAll(".pr-save").forEach(Z=>{Z.disabled=!1,Z.textContent=a?"Save changes":"Submit request"})}}}function aa(e,t,s,a){const n=String(e||"").trim();if(n)return n;const i=String(t||"").trim().toLowerCase(),o=String(s||"").trim().toLowerCase(),d=String(a||"").trim();return i&&o&&i===o&&d?d:it(t)}const na=["Open","Mine","Pending","In progress","On hold","Needs review","Completed","All"],ls=e=>e==="Open"?"Outstanding":e;let $e={viewer:"",sync:null,data:null,pending:null},ge="Open";function sa(){$e.data=null}const Ce=(e,t)=>t==null||!Number.isFinite(Number(t))?"Needs review":Le(e.currency,t),ra=()=>new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date);async function Oa(e,t,s){var B,F;const a=t.me,n=!!((B=t.capabilities)!=null&&B.poFinanceHandoff);if(!a||!["admin","finance"].includes(a.role)){e.innerHTML='<div class="card">Payments are available to Admin and Finance.</div>';return}if(!((F=t.capabilities)!=null&&F.financeWorkflow)){e.innerHTML='<div class="card pd-body"><h1>Payments setup pending</h1><p>The Finance backend must be published before payment tracking is available.</p></div>';return}const i=a.email+"|"+a.role,o=String(t.lastSync);($e.viewer!==i||$e.sync!==o)&&($e={viewer:i,sync:o,data:null,pending:null},ge="Open");const d=$e,$=async(h=!1)=>{if(h&&(d.data=null),!d.data){e.innerHTML=`<div class="connection-state" role="status">${f("refresh","spin")}<h2>Loading payments</h2><p>Your payment work is separate from delivery progress.</p></div>`;try{d.pending||(d.pending=z("financeList").finally(()=>{d.pending=null}));const k=await d.pending;if(!Array.isArray(k.tasks)||!Array.isArray(k.financeUsers))throw new Error("The server did not return payment records.");d.data=k}catch(k){if(!e.isConnected||$e!==d)return;e.innerHTML=`<div class="connection-state"><h2>Could not load payments</h2><p>${r(k.message)}</p><button class="btn" id="retryPayments">Try again</button></div>`,e.querySelector("#retryPayments").onclick=()=>$(!0);return}}!e.isConnected||$e!==d||R()};let p="",m=1,S=!1;const R=()=>{var te,H,ae;const{tasks:h,financeUsers:k}=d.data,C=a.role==="admin",_=C?["Awaiting admin",...na]:na,D=s&&h.find(c=>c.prId===s),O=c=>ge==="All"||(ge==="Open"?c.state!=="Completed":ge==="Mine"?c.owner===a.email:c.state===ge),w=h.filter(O).filter(c=>[c.prId,c.poNo,c.vendor,c.owner].join(" ").toLowerCase().includes(p.toLowerCase())),v=Math.max(1,Math.ceil(w.length/25));m=Math.min(m,v);const j=(C?["Awaiting admin","Pending","In progress","Completed"]:["Pending","In progress","On hold","Completed"]).map(c=>[c,h.filter(T=>T.state===c).length]);if(e.innerHTML=`<div class="dash payments-page">
      <div class="adm-head"><div><span class="eyebrow">PAYMENT OPERATIONS</span><h1>Payments</h1><p>${C?n?"Create the PO when ready. Payment work goes to Finance automatically.":"Choose when approved requests are sent to Finance.":"Only requests sent by admin. Start work and keep responsibility through completion."}</p></div><button class="btn" id="reloadPayments">${f("refresh")} Refresh payments</button></div>
      <div class="kpis finance-kpis">${j.map(([c,T])=>`<button class="kpi clickable" data-stage="${c}"><span class="l">${c}</span><span class="v">${T}</span></button>`).join("")}</div>
      ${D?P(D,C,k):s?'<div class="card pd-body">This request has no payment work yet.</div>':""}
      <section class="card finance-list"><div class="section-heading"><div><h2>${C?"Approved requests & payment work":"Requests sent to Finance"} <span class="count-badge">${h.length}</span></h2><p>${C?"Awaiting admin stays hidden from Finance until you send it.":"In progress assigns the payment to you until completion. Delivery remains separate."}</p></div></div>
      <div class="finance-toolbar"><div class="status-pills" role="group" aria-label="Payment work status">${_.map(c=>`<button class="view-pill ${c===ge?"selected":""}" data-stage="${c}" aria-pressed="${c===ge}">${ls(c)}</button>`).join("")}</div>
      <label class="search-input">${f("search")}<span class="sr-only">Search payments</span><input id="financeSearch" type="search" placeholder="Request, vendor, PO or owner" value="${r(p)}"></label></div>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Payment work"><table class="tbl"><thead><tr><th>Request / vendor</th><th>PO</th><th>Outstanding</th><th>Owner</th><th>Payment work</th><th></th></tr></thead><tbody>
      ${w.slice((m-1)*25,m*25).map(c=>`<tr><td><a href="#/payments/${encodeURIComponent(c.prId)}"><b>${r(c.prId)}</b></a><small class="finance-sub">${r(c.vendor)}</small></td><td>${r(c.poNo||"—")}</td><td>${r(Ce(c,c.outstanding))}<small class="finance-sub">${r(c.paymentStatus)}</small></td><td>${r(c.owner||"Not started")}</td><td><span class="finance-status" data-state="${r(c.state)}">${r(c.state)}</span></td><td><a class="btn" href="#/payments/${encodeURIComponent(c.prId)}" aria-label="View payment details ${r(c.prId)}">View details ${f("right")}</a></td></tr>`).join("")||'<tr><td colspan="6">No payments match this view.</td></tr>'}
      </tbody></table></div><div class="finance-pagination"><button class="btn" id="financePrev" ${m===1?"disabled":""}>Previous</button><span>${w.length} results · Page ${m} of ${v}</span><button class="btn" id="financeNext" ${m===v?"disabled":""}>Next</button></div></section>
      <p class="finance-note">${f("shield")} Visible only to Admin and Finance. Record payments made through your existing bank or Zoho process.</p>
      ${C?`<p class="finance-note">${f("info")} ${r(((te=d.data.zoho)==null?void 0:te.message)||"")}</p>`:""}
    </div>`,e.querySelector("#reloadPayments").onclick=()=>{S||$(!0)},e.querySelectorAll("[data-stage]").forEach(c=>c.onclick=()=>{S||(ge=c.dataset.stage,m=1,R())}),e.querySelector("#financeSearch").oninput=c=>{if(S)return;p=c.target.value,m=1,R(),e.querySelector("#financeSearch").focus()},e.querySelector("#financePrev").onclick=()=>{m--,R()},e.querySelector("#financeNext").onclick=()=>{m++,R()},!D)return;xa(e);const E=async(c,T)=>{if(!S){S=!0,e.querySelectorAll(".finance-detail button").forEach(L=>{L.disabled=!0});try{const L=await z(c,{id:D.prId,...T});if(!L.task)throw new Error("Payment response was incomplete. Refresh payments to check before retrying.");d.data.tasks=d.data.tasks.map(Y=>Y.prId===D.prId?L.task:Y),e.isConnected&&$e===d&&R(),await V.applyResult(L),N(c==="financeRemind"?"Reminder requested. Last reminder updated.":"Payment work updated")}catch(L){N(L.message,!0),e.isConnected&&e.querySelectorAll(".finance-detail button").forEach(Y=>{Y.disabled=!1})}finally{S=!1}}};e.querySelectorAll("[data-progress]").forEach(c=>c.onclick=()=>E("financeProgress",{state:c.dataset.progress})),(H=e.querySelector("#remindFinance"))==null||H.addEventListener("click",()=>E("financeRemind",{})),(ae=e.querySelector("#sendToFinance"))==null||ae.addEventListener("click",()=>E("financeRelease",{}));const M=e.querySelector("#recordPayment");if(M){const c=M.querySelector(".attachment-picker");Fa(c,{scope:"payment",prId:D.prId});const T=M.elements.amount,L=()=>{const y=M.elements.paymentMode.value==="full";T.readOnly=y,T.max=y?String(D.outstanding):(Math.round(D.outstanding*(D.currency==="JPY"?1:100))-1)/(D.currency==="JPY"?1:100),T.value=y?String(D.outstanding):"",e.querySelector("#paymentAmountHint").textContent=y?"Full payment covers the remaining balance.":"Enter an amount smaller than the remaining balance.",y||T.focus()};M.querySelectorAll('[name="paymentMode"]').forEach(y=>y.onchange=L),L();const Y="finance-attempt:"+a.email+":"+D.prId,de=y=>{const g=JSON.stringify(y);let A;try{A=JSON.parse(sessionStorage.getItem(Y))}catch{}const I=(A==null?void 0:A.signature)===g?A:{signature:g,id:crypto.randomUUID()};return sessionStorage.setItem(Y,JSON.stringify(I)),I.id};M.onsubmit=async y=>{if(y.preventDefault(),!(S||!M.reportValidity())){S=!0,M.querySelector('[type="submit"]').disabled=!0;try{const g=await c.uploadFiles(),A=Object.fromEntries(new FormData(M));A.currency=D.currency,A.paymentMode==="full"&&(A.amount=String(D.outstanding)),g.length&&(A.attachments=g),S=!1,await E("financeRecordPayment",{...A,operationId:de(A)})}catch(g){N(g.message,!0)}finally{S=!1,M.isConnected&&(M.querySelector('[type="submit"]').disabled=!1)}}}}for(const[c,T]of[["assignFinance","financeAssign"],["openingPayment","financeOpening"]]){const L=e.querySelector("#"+c);L&&(L.onsubmit=Y=>{Y.preventDefault(),L.reportValidity()&&E(T,Object.fromEntries(new FormData(L)))})}},P=(h,k,C)=>{const _=h.owner===a.email.toLowerCase(),D=k||_,O=h.released&&!h.issue&&h.state!=="Completed",w=n&&(h.requestStatus==="Approved"||!h.poNo);return`<section class="card finance-detail" aria-label="Payment details">
      <div class="section-heading"><div><span class="eyebrow">${r(h.vendor)}</span><h2>${r(h.prId)}</h2><p>${r(h.poNo||"PO reference not recorded")} · Request: ${r(h.requestStatus)}</p></div><a class="btn" href="#/pr/${encodeURIComponent(h.prId)}">Request &amp; delivery ${f("right")}</a></div>
      <div class="pd-body"><div class="finance-totals"><div><span>Order value</span><b>${r(Ce(h,h.total))}</b></div><div><span>Recorded paid</span><b>${r(Ce(h,h.paid))}</b></div><div><span>Outstanding</span><b>${r(Ce(h,h.outstanding))}</b></div></div>
      <div class="finance-owner"><span class="finance-status" data-state="${r(h.state)}">${r(h.state)}</span><span>Responsible: <b>${r(h.owner||"Not started")}</b></span></div>
      ${h.issue?`<p class="finance-alert" role="status">${r(h.issue)}</p>`:""}
      ${h.released?`<p class="finance-note">Sent to Finance ${r(se(h.sentAt))} by ${r(h.sentBy||"admin")}.</p>`:`<p class="finance-note">${w?"This request stays with admin until the PO is recorded and sent to Finance.":"This request is with admin. Finance cannot see it until you send it."}</p>`}
      ${!k&&h.owner&&!_?'<p class="finance-note">Another Finance member owns this payment through completion. Contact an admin if reassignment is needed.</p>':""}
      <div class="finance-actions">
      ${k&&!h.released&&!h.issue&&h.state!=="Completed"?w?`<a class="btn primary" href="#/pr/${encodeURIComponent(h.prId)}">${h.requestStatus==="Approved"?"Create PO &amp; send to Finance":"Add PO details"}</a>`:'<button class="btn primary" id="sendToFinance">Send to Finance</button>':""}
      ${O&&(h.owner?D:!k)&&h.state!=="In progress"?'<button class="btn primary" data-progress="In progress">Mark In progress</button>':""}
      ${O&&D&&h.owner&&h.state==="In progress"?'<button class="btn" data-progress="On hold">Put payment On hold</button>':""}
      ${k&&h.released&&h.state!=="Completed"?'<button class="btn" id="remindFinance">Remind Finance</button>':""}</div>
      ${h.lastReminderAt?`<p class="finance-note">Last reminder: ${r(new Date(h.lastReminderAt).toLocaleString())}</p>`:""}
      ${k&&!h.owner&&O?'<p class="finance-note">A Finance member can start this payment, or you can assign responsibility below.</p>':""}
      ${O&&D&&h.owner&&h.state==="In progress"?`<form class="finance-form" id="recordPayment"><h3>Record a payment already made</h3>
        <fieldset class="payment-mode"><legend>Payment amount</legend><div class="payment-mode-options">
          <label><input type="radio" name="paymentMode" value="full" checked><span><b>Full payment</b><small>Remaining ${r(Ce(h,h.outstanding))}</small></span></label>
          <label><input type="radio" name="paymentMode" value="partial"><span><b>Partial payment</b><small>Enter the amount paid</small></span></label>
        </div></fieldset><p class="full finance-note" id="paymentAmountHint"></p>
        <label>Amount (${r(h.currency)})<input name="amount" type="number" step="${h.currency==="JPY"?"1":"0.01"}" min="${h.currency==="JPY"?"1":"0.01"}" max="${h.outstanding}" required></label>
        <label>Payment date<input name="date" type="date" min="1900-01-01" max="${ra()}" value="${ra()}" required></label>
        <label>Transaction reference<input name="reference" maxlength="200" required autocomplete="off"></label>
        <label>Proof link (optional)<input name="proofUrl" type="url" placeholder="https://…"></label>
        <label class="full">Payment note (private)<textarea name="note" maxlength="1000"></textarea></label>
        <div class="full"><h4>Payment proof (optional)</h4>${Ia()}</div>
        <label class="full finance-confirm"><input type="checkbox" required> I confirm this payment has already been made.</label><button class="btn primary" type="submit">Record payment</button></form>`:""}
      ${k&&h.issue==="Admin must confirm the amount already paid"?`<form class="finance-form" id="openingPayment"><h3>Confirm historical payment</h3><p class="full">This request was already Partially Paid. Enter the total paid before using this workflow.</p><label>Already paid (${r(h.currency)})<input name="amount" type="number" min="0" max="${h.total}" step="${h.currency==="JPY"?"1":"0.01"}" required></label><label>Historical reference / evidence<input name="reference" required maxlength="200"></label><button class="btn" type="submit">Confirm opening amount</button></form>`:""}
      ${k&&h.released&&h.state!=="Completed"?`<details class="finance-reassign"><summary>Assign or reassign responsibility</summary><form class="finance-form" id="assignFinance"><label>Finance member<select name="owner" required><option value="">Select a member</option>${C.map(v=>`<option value="${r(v.email)}" ${v.email===h.owner?"selected":""}>${r(v.name||v.email)}</option>`).join("")}</select></label><label>Reason<input name="reason" required maxlength="500"></label><button class="btn" type="submit">Save assignment</button></form></details>`:""}
      <h3>Payment history</h3><p class="finance-note">Historical payments confirmed before this workflow are included in Recorded paid.</p>
      <div class="finance-history">${h.payments.map(v=>`<article><div><b>${r(Ce(h,v.amount))}</b><span>${r(se(v.date))} · ${r(v.reference)}</span></div><p>${r(v.recordedBy)}${v.note?" · "+r(v.note):""}</p>${/^https:\/\//i.test(v.proofUrl||"")?`<a href="${r(v.proofUrl)}" target="_blank" rel="noopener noreferrer">View proof ${f("external")}</a>`:""}${Ma(v.attachments)}</article>`).join("")||"<p>No payments recorded in this workflow yet.</p>"}</div>
      </div></section>`};await $()}const ee=(e,t)=>`<div class="pd-f"><span class="vc-l">${r(e)}</span><b>${t||"—"}</b></div>`;let Fe=!1,ia=null;const oa=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${r(qt(s||t))}</span>
    <div>
      <span class="vc-l">${r(e)}</span>
      <b>${r(t)}</b>
      <div class="pd-sub">${r(a||"")}</div>
    </div>
  </div>`;function wt(e,t,s){var g,A,I,K,Z;const a=t.prs.find(b=>b.id===s);if(!a){e.innerHTML=`<div class="card">PR ${r(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}ia!==s&&(Fe=!1,ia=s);const n=t.me||{role:"",email:"",department:""},i=n.role==="admin",o=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),d=i||n.role==="finance"&&(!((g=t.capabilities)!=null&&g.financeHandoff)||a.financeReleased),$=i||o&&a.status==="Submitted",p=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),m=!!((A=t.capabilities)!=null&&A.poFinanceHandoff),S=$n(a.status,n.role,o,p).filter(b=>!(m&&a.status==="Approved"&&b==="Ordered")),R=(a.department||"").toLowerCase()==="production",P=i&&a.status==="Approved",B=i&&((I=t.capabilities)==null?void 0:I.financeHandoff)&&!a.financeReleased&&["Approved","Ordered","In Transit","Received"].includes(a.status)&&!["Paid","FOC / Free"].includes(a.paymentStatus)&&(!m||a.status!=="Approved"&&a.poNo),F=!["Paid","FOC / Free"].includes(a.paymentStatus),h=m&&!a.financeReleased&&F?"Create PO & send to Finance":"Create purchase order",k=i&&a.poNo&&!a.zohoPoId&&!((K=t.capabilities)!=null&&K.financeWorkflow),C=P?"":S.find(b=>!["Rejected","Cancelled","On Hold"].includes(b)),_=S.filter(b=>b!==C),D=b=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[b]||"Mark "+b.toLowerCase(),O=b=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[b]||"arrow",w=["Submitted","Approved","Ordered","In Transit","Received"],v=w.indexOf(a.status),j=(t.vendors||[]).find(b=>String(b.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),E=a.paymentTerm||j&&j.paymentTerms||"",M=t.lists&&t.lists.paymentTerms||[],te=["",...E&&!M.includes(E)?[E,...M]:M].map(b=>`<option value="${r(b)}" ${b===E?"selected":""}>${b?r(b):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${f("right")}<span>${r(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${r(a.id)}</h1>${rt(a.status)}</div>
          <p class="request-subtitle">${r(a.project||a.department||"Purchase request")} · Created ${se(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${B?`<button class="btn primary" id="sendFinanceBtn">${f("wallet")} Send to Finance</button>`:""}
          ${P?`<button class="btn primary" id="makePoBtn">${f("file")} ${r(h)}</button>`:""}
          ${C?`<button class="btn primary" data-to="${r(C)}">${f(O(C))}${r(D(C))}</button>`:""}
          ${$?`<a class="btn" href="#/new/${r(a.id)}">${f("edit")} Edit</a>`:""}
          ${_.length||k?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${f("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${k?`<button class="btn" id="zohoPushBtn">${f("arrow")} Send to Zoho Books</button>`:""}
              ${_.map(b=>`<button class="btn ${["Rejected","Cancelled"].includes(b)?"danger":""}" data-to="${r(b)}">${f(O(b))}${r(D(b))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${r(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${v===-1?"Currently "+r(a.status.toLowerCase()):v===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${w.map((b,U)=>`<li class="${U<v?"done":U===v?"current":""}" ${U===v?'aria-current="step"':""}><span class="step-dot">${U<v?f("check"):U+1}</span><span>${r(b)}</span></li>`).join("")}</ol>
      </section>

      ${P&&Fe?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        ${m?`<p class="pd-sub">Record your PO reference below.${!a.financeReleased&&F?" Saving marks this request Ordered and sends it to all Finance members. The first member to mark In progress takes responsibility.":F?" Existing Finance responsibility and payment records will stay unchanged.":" No payment handoff is needed for a paid or free request."}</p>`:""}
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${r(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${r(Be(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${te}</select>
          </label>
          ${j&&j.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${r(j.name)}'s vendor record — change it here if this order is different.</div>`:""}
          <div class="full" style="display:flex;gap:8px">
            <button class="btn primary" type="submit">${m?r(h):"Create PO &amp; mark Ordered"}</button>
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
          ${ee("Department",r(a.department))}
          ${ee("Project",r(a.project))}
          ${ee("Vendor",r(a.vendor))}
          ${ee("Purpose",r(a.purpose))}
          ${ee("Priority",r(a.priority))}
          ${d?ee("Payment status",r(a.paymentStatus)):""}
        </div>
        <div class="pd-people">
          ${oa("Requested by",aa(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+se(a.createdAt))}
          ${a.approverEmail||a.approvedByName?oa("Approved by",aa(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+se(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${R?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(b=>`<tr>
            <td>${r(b.itemNo)}</td>
            <td class="wrap">${r(b.description)}</td>${R?`<td>${r(b.partNo)}</td>`:""}<td>${r(b.materialType)}</td>
            <td>${r([b.qty,b.unit].filter(Boolean).join(" "))}</td>
            <td>${b.unitPrice?r(Le(a.currency||"INR",Number(b.unitPrice))):"—"}</td>
            <td>${b.lineTotal?r(Le(a.currency||"INR",Number(b.lineTotal))):"—"}</td>
            <td>${b.purchaseLink?`<a href="${r(b.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${b.datasheetDoc?` <a href="${r(b.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}${Ma(b.attachments)}</td>
          </tr>`).join("")||`<tr><td colspan="${R?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?r(Le(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${ee("Expected",se(a.expectedDate))}
          ${ee("Received",se(a.receivedAt))}
          ${ee("Tracking",Jn(a))}
          ${ee("Notes",r(a.notes))}
        </div>
        </div>
      </div>

      ${d&&((Z=t.capabilities)!=null&&Z.financeWorkflow)&&["Approved","Ordered","In Transit","Received","On Hold"].includes(a.status)?`<div class="card pd-body"><h2>Payment work</h2><p>${a.financeReleased?"Sent to Finance. View responsibility and payment records.":"With admin. Hidden from Finance until you send it."}</p><a class="btn" href="#/payments/${encodeURIComponent(a.id)}">${f("wallet")} View payment details</a></div>`:""}

      ${d?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${ee("PO reference",[r(a.poNo),se(a.poDate)].filter(Boolean).join(" · "))}
          ${ee("Invoice / order #",[r(a.invoiceNo),se(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${ee("Payment term",r(a.paymentTerm))}
          ${ee("Quotation / PI",a.quotationDoc?`<a href="${r(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${ee("Zoho Books PO",a.zohoPoNumber?r(a.zohoPoNumber):"")}
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
    </div>`,xa(e);const H=e.querySelector("#requestMore");e.onclick=b=>{H&&!H.contains(b.target)&&(H.open=!1)},e.onkeydown=b=>{b.key==="Escape"&&(H!=null&&H.open)&&(H.open=!1,H.querySelector("summary").focus())},H==null||H.addEventListener("focusout",b=>{H.contains(b.relatedTarget)||(H.open=!1)}),e.querySelectorAll("[data-to]").forEach(b=>b.onclick=async()=>{const U=b.dataset.to;if((U==="Rejected"||U==="Cancelled")&&!confirm(`Mark ${a.id} as ${U}?`))return;const re=b.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(G=>{G.disabled=!0}),b.innerHTML=f("refresh","spin")+" Updating…";try{const G=await z("transition",{id:a.id,to:U});N(a.id+" → "+U),await V.applyResult(G)}catch(G){N(G.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(X=>{X.disabled=!1}),b.innerHTML=re}});const ae=e.querySelector("#makePoBtn"),c=e.querySelector("#sendFinanceBtn");c&&(c.onclick=async()=>{c.disabled=!0;try{const b=await z("financeRelease",{id:a.id});sa(),await V.applyResult(b),N(a.id+" sent to Finance")}catch(b){N(b.message,!0),c.disabled=!1}}),ae&&(ae.onclick=()=>{var b,U;Fe=!0,wt(e,t,s),nt((b=e.querySelector("#poForm"))==null?void 0:b.closest(".card")),(U=e.querySelector("[name=poNo]"))==null||U.focus()});const T=e.querySelector("#poCancelBtn");T&&(T.onclick=()=>{Fe=!1,wt(e,t,s)});const L=e.querySelector("#poForm"),Y=L?Ea(L):null;L&&(L.onsubmit=async b=>{var ce,fe;if(b.preventDefault(),!Y())return;const U=new FormData(L),re=String(U.get("poNo")||"").trim();if(!re)return;const G=L.querySelector('button[type="submit"]');G.disabled=!0;let X;try{const ne={poNo:re,poDate:U.get("poDate")||"",paymentTerm:U.get("paymentTerm")||""};let J;(ce=t.capabilities)!=null&&ce.singleStepOrder?J=await z("order",{id:a.id,...ne}):(X=await z("update",{id:a.id,updates:ne}),J=await z("transition",{id:a.id,to:"Ordered"})),J.task&&sa(),N((fe=J.task)!=null&&fe.released?`PO ${re} saved. Request sent to Finance.`:`PO ${re} saved. Request marked Ordered.`),Fe=!1,await V.applyResult(J)}catch(ne){X&&await V.applyResult(X),N(ne.message,!0),G.disabled=!1}});const de=e.querySelector("#zohoPushBtn");de&&(de.onclick=async()=>{de.disabled=!0;try{const{pr:b}=await z("zohoPushPo",{id:a.id});N(a.id+" → Zoho Books PO "+b.zohoPoNumber),await V.applyResult({pr:b})}catch(b){N(b.message,!0),de.disabled=!1}});const y=e.querySelector("#devDelete");y&&(y.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){y.disabled=!0;try{const b=await z("delete",{id:a.id});N(a.id+" deleted"),location.hash="#/",await V.applyResult(b)}catch(b){N(b.message,!0),y.disabled=!1}}})}let Je=null,ye=null,St="";const ds=["Domestic","International"];function Nt(e){return Je===null&&(Je=e.vendors||[]),Je}function cs(e){const t=e.lists&&e.lists.departments||[],s=Nt(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const pe=(e,t,s,a="")=>`<label class="adm-field">${r(e)}
    <input class="adm-input" name="${t}" value="${r(s||"")}" placeholder="${r(a)}">
  </label>`;function ms(e,t){const s=Nt(e),a=ye&&s.find(i=>i.name.toLowerCase()===ye.toLowerCase());if(a)return ps(e,a);const n=[...s].sort((i,o)=>i.name.localeCompare(o.name));return`
    <div class="adm-card">
      ${lt(St,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${Ct(i.name,i.displayName,i.category,i.type,(i.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${r(i.name)}</td>
            <td>${(i.departments||[]).map(o=>`<span class="adm-chip on">${r(o)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${r(i.type||"—")}</td>
            <td>${r(i.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${r(i.name)}" title="Remove vendor">
                ${f("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${Tt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Ba(n.length,n.length)}</span></div>
    </div>`}const Ba=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function ps(e,t){const s=Pt(e.prs,t.name),a=(s.spendTotals.find(([o])=>o==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],i=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(o=>`<option value="${r(o)}" ${o===(t.paymentTerms||"")?"selected":""}>${o?r(o):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${r(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${r(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${f("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${r(Le("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${cs(e).map(o=>`<button class="adm-chip ${(t.departments||[]).some($=>$.toLowerCase()===o.toLowerCase())?"on":""}" data-dept="${r(o)}">${r(o)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${r(t.name)}">
        </label>
        <div class="adm-grid2">
          ${pe("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${pe("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${pe("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...ds].map(o=>`<option value="${r(o)}" ${o===(t.type||"")?"selected":""}>${o?r(o):"—"}</option>`).join("")}
            </select>
          </label>
          ${pe("Contact person","contactPerson",t.contactPerson)}
          ${pe("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${r(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${r(t.address||"")}"></label>
        <div class="adm-grid2">
          ${pe("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${pe("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${r(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${pe("Account number","accountNumber",t.accountNumber)}
          ${pe("IFSC","ifsc",t.ifsc)}
        </div>
        ${pe("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${i}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${pe("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function us(e,t,s){const a=async(p,m,S)=>{try{const R=await z(p,m);Je=R.vendors,await V.applyResult(R),N(S),e.isConnected&&s()}catch(R){N(R.message,!0)}};Lt(e,{get:()=>St,set:p=>{St=p},count:Ba,match:p=>new Set(Ra(Nt(t),p).map(m=>m.name))}),e.querySelectorAll(".vRow").forEach(p=>p.onclick=m=>{m.target.closest(".vRm")||(ye=p.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(p=>p.onclick=()=>{confirm(`Remove vendor "${p.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:p.dataset.name},`${p.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const p=e.querySelector("#nvName").value.trim();if(!p){N("Vendor name required",!0);return}ye=p,a("vendorSet",{name:p,updates:{}},`${p} added — fill in the details`)});const i=()=>{ye=null,s()},o=e.querySelector("#vClose");o&&(o.onclick=i);const d=e.querySelector("#vCancel");d&&(d.onclick=i),e.querySelectorAll("#vDepts .adm-chip").forEach(p=>p.onclick=()=>p.classList.toggle("on"));const $=e.querySelector("#vForm");$&&($.onsubmit=p=>{p.preventDefault();const m={};for(const[R,P]of new FormData($))m[R]=P.trim();m.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(R=>R.dataset.dept);const S=m.name||ye;a("vendorSet",{name:ye,updates:m},`${S} saved`),ye=S})}function hs(){ye=null}const xe=["admin","approver","finance","requester"],vs={admin:"Full access to settings, users, PRs, and analytics.",approver:"Creates own PRs and approves or rejects submitted requests in their department.",finance:"Creates own PRs and handles payments for requests sent by admin. In progress assigns responsibility through completion.",requester:"Creates, tracks and edits own submitted PRs. No approval, payment or admin access."},la=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let oe="users",Pe=null,Oe=null,ze="",kt="",Ne=null,Ue=null,he=!1;const da={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>Ne,set:e=>{Ne=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Ue,set:e=>{Ue=e},seed:e=>e.materialTypes}};function ys(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%la.length;return la[t]}const ut=e=>e[0].toUpperCase()+e.slice(1),fs={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${f("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${f("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${f("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${f("vendors")} Add Vendor`}};function we(e,t){var n;const s=((n=t.me)==null?void 0:n.email)||"";if(ze!==s&&(ze=s,Pe=null,Oe=null,Ne=null,Ue=null),Pe===null){e.innerHTML=`<div class="connection-state" id="adminUsersLoading" role="status">${f("refresh","spin")}<h2>Loading users and roles</h2><p>Fetching the latest Admin settings.</p></div>`;const i=e.querySelector("#adminUsersLoading"),o=Oe||(Oe=z("usersList"));o.then(d=>{if(ze===s){if(!Array.isArray(d.users))throw new Error("The server did not return users. Please retry.");Pe=d.users,e.contains(i)&&we(e,t)}}).catch(d=>{ze!==s||!e.contains(i)||(e.innerHTML=`<div class="connection-state" role="alert"><h2>Could not load Admin settings</h2><p>${r(d.message)}</p><p>The workspace sync indicator does not include this separate users request.</p><button class="btn primary" id="retryAdminUsers">Retry loading users</button></div>`,e.querySelector("#retryAdminUsers").onclick=()=>{Oe=null,we(e,t)})}).finally(()=>{Oe===o&&(Oe=null)});return}Ne===null&&(Ne=t.projects||[]),Ue===null&&(Ue=t.materialTypes||[]);const a=fs[oe];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${a.title}</h1>
          <p>${a.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${a.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${oe==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${oe==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${oe==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${oe==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${oe==="users"?bs(t):oe==="vendors"?ms(t,he):$s(t,da[oe])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(i=>i.onclick=()=>{oe=i.dataset.tab,he=!1,hs(),we(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(he=!he,we(e,t),he){const i=e.querySelector(".adm-addrow input, .adm-addrow select");i&&i.focus()}},oe==="users"?gs(e,t):oe==="vendors"?us(e,t,()=>{he=!1,we(e,t)}):ws(e,t,da[oe])}function bs(e){const t=a=>(xe.includes(a.role)?xe:[a.role,...xe]).map(n=>`<option value="${r(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?r(ut(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!Qe(e).includes(a)?[a,...Qe(e)]:Qe(e)].map(n=>`<option value="${r(n)}" ${n===(a||"")?"selected":""}>${n?r(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${f("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${lt(kt,"Search by name or email…")}
      ${he?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${xe.map(a=>`<option value="${a}">${ut(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...Pe].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||it(a.email);return`<tr data-search="${Ct(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${ys(a.email)}">${r(qt(a.email))}${a.picture?`<img src="${r(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${f("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${Tt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${Pe.length} of ${Pe.length} active members</span>
        <div class="adm-pager">
          <button disabled>${f("left")}</button>
          <span>Page 1 of 1</span>
          <button disabled>${f("right")}</button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${xe.map(a=>`<div class="adm-rolecard">
        <h4>${ut(a)}</h4>
        <p>${vs[a]}</p>
      </div>`).join("")}
    </div>`}function gs(e,t){Lt(e,{get:()=>kt,set:n=>{kt=n},count:(n,i)=>`Showing ${n} of ${i} active members`});const s=async(n,i,o)=>{try{const d=await z("userSet",{email:n,...i});Pe=d.users,he=!1,await V.applyResult(d),N(o),e.isConnected&&we(e,t)}catch(d){N(d.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),i=e.querySelector("#newRole").value,o=e.querySelector("#newDept").value;s(n,{role:i,department:o},`${n} → ${i}`)})}function Qe(e){const t=e.lists&&e.lists.departments||[],s=(Ne||[]).map(a=>a.department);return[...new Set([...t,...s])]}function $s(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${lt(t.q,`Search ${t.plural} by name or department…`)}
      ${he?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${Qe(e).map(a=>`<option value="${r(a)}">${r(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${Ct(a.department,a[t.key])}">
            <td class="adm-name">${r(a.department)}</td>
            <td>${r(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${r(a.department)}" data-val="${r(a[t.key])}" title="Remove">
                ${f("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${Tt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Ua(s.length,s.length,t)}</span>
      </div>
    </div>`}const Ua=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function ws(e,t,s){Lt(e,{get:()=>s.q,set:i=>{s.q=i},count:(i,o)=>Ua(i,o,s)});const a=async(i,o,d)=>{try{const $=await z(i,o);s.set($[s.respKey]),he=!1,await V.applyResult($),N(d),e.isConnected&&we(e,t)}catch($){N($.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const i=e.querySelector("#mpDept").value,o=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:i,[s.key]:o},`${i} / ${o} added`)}),e.querySelectorAll(".mpRm").forEach(i=>i.onclick=()=>{const{dept:o,val:d}=i.dataset;confirm(`Remove "${d}" from ${o}?`)&&a(s.removeRoute,{department:o,[s.key]:d},`${d} removed`)})}const ca={requester:0,approver:1,finance:1,admin:2};function ma(e,t){if(!t)return!0;if(e!=null&&e.roles)return e.roles.includes(t.role);if(!e||!e.minRole)return!0;const s=ca[t.role];return s!=null&&s>=ca[e.minRole]}const ja=document.getElementById("app"),ht={"":{fn:Sa,nav:"Dashboard",icon:"grid"},vendors:{fn:_n,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:La,nav:"Insights",icon:"chart",roles:["admin","approver"]},payments:{fn:Oa,nav:"Payments",icon:"wallet",roles:["admin","finance"]},new:{fn:os,roles:["requester","approver","finance","admin"]},pr:{fn:wt},admin:{fn:we,nav:"Admin",icon:"settings",minRole:"admin"}};let Se,pa=null;function Ha(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function Ss(){Se==null||Se.abort(),ja.innerHTML=`<div class="auth-gate">
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
  </div>`,Ja(document.getElementById("gsignin"))}function Va(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=f("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function _a(){var te,H,ae;const e=V.get(),{name:t,param:s}=Ha(),a=ht[t]||ht[""],n=((te=e.me)==null?void 0:te.role)||"";if(e.me&&!ma(a,e.me)){location.hash="#/";return}Se==null||Se.abort(),Se=new AbortController;const i=Se.signal,o=Object.entries(ht).filter(([,c])=>{var T;return c.nav&&e.me&&ma(c,e.me)&&(c.fn!==Oa||((T=e.capabilities)==null?void 0:T.financeWorkflow))}).map(([c,T])=>`<a href="#/${c}" ${t===c?'aria-current="page"':""} class="${t===c?"active":""}">${f(T.icon)}<span>${T.nav}</span>${t===c?'<span class="nav-dot"></span>':""}</a>`).join(""),d=e.notifications||[],$=d.filter(c=>!c.readAt).length,p=Ya()||{},m=p.email||((H=e.me)==null?void 0:H.email)||"",S=p.name||it(m),R=p.picture?`<img class="avatar" src="${r(p.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${r(qt(S))}</span>`,P=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=P+" · Oizom Procurement",ja.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${f("right")} <b>${r(P)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${f("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${$?", "+$+" unread":""}" aria-expanded="false" aria-controls="nPanel">${f("bell")}${$?`<span class="nbadge">${$>9?"9+":$}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${$?$+" new":"All caught up"}</span></div>
              ${d.length?d.map(c=>`<${c.prId?"a":"div"} class="nitem ${c.readAt?"":"unread"}" ${c.prId?`href="#/pr/${r(c.prId)}"`:""}><div class="nmsg">${r(c.message)}</div><div class="ntime">${r(String(c.ts).slice(0,16).replace("T"," "))}</div></${c.prId?"a":"div"}>`).join(""):`<div class="nempty">${f("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${R}<span class="profile-copy"><span class="pname">${r(S)}</span><span class="prole">${r(n||"Oizom team")}</span></span>${f("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${r(m)}</div><button class="btn" id="btnOut">${f("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,Va(e),document.getElementById("btnRefresh").onclick=async()=>{await V.refresh(),V.get().err||N("Data refreshed")};const B=document.getElementById("nPanel"),F=document.getElementById("nBtn"),h=document.getElementById("pMenu"),k=document.getElementById("profileBtn"),C=()=>{B.hidden=h.hidden=!0,F.setAttribute("aria-expanded","false"),k.setAttribute("aria-expanded","false")};F.onclick=()=>{var T;const c=B.hidden;C(),B.hidden=!c,F.setAttribute("aria-expanded",String(c)),c&&$&&(d.forEach(L=>{L.readAt||(L.readAt="now")}),(T=document.querySelector(".nbadge"))==null||T.remove(),z("notifRead").catch(()=>{}))},k.onclick=()=>{const c=h.hidden;C(),h.hidden=!c,k.setAttribute("aria-expanded",String(c))},document.getElementById("btnOut").onclick=Za,document.addEventListener("click",c=>{c.target.closest(".nbell, .profile-wrap")||C()},{signal:i});const _=document.getElementById("sidebar"),D=document.getElementById("workspace"),O=document.getElementById("openNav"),w=document.getElementById("shell"),v=matchMedia("(max-width: 960px)");let j=!1;const E=(c,T=!0)=>{var L;j=v.matches&&c,w.classList.toggle("nav-open",j),_.inert=v.matches&&!j,D.inert=j,document.getElementById("navBackdrop").hidden=!j,O.setAttribute("aria-expanded",String(j)),document.body.classList.toggle("nav-locked",j),j?(L=_.querySelector("nav a"))==null||L.focus():T&&v.matches&&O.focus()};E(!1,!1),O.onclick=()=>E(!0),document.getElementById("closeNav").onclick=()=>E(!1),document.getElementById("navBackdrop").onclick=()=>E(!1),_.querySelectorAll("a").forEach(c=>c.addEventListener("click",()=>E(!1),{signal:i})),v.addEventListener("change",()=>E(!1,!1),{signal:i}),document.addEventListener("keydown",c=>{if(c.key==="Escape"&&(j?E(!1):B.hidden?h.hidden||(C(),k.focus()):(C(),F.focus())),c.key==="Tab"&&j){const T=[..._.querySelectorAll("a, button")],L=T[0],Y=T[T.length-1];c.shiftKey&&document.activeElement===L?(c.preventDefault(),Y.focus()):!c.shiftKey&&document.activeElement===Y&&(c.preventDefault(),L.focus())}},{signal:i});const M=document.getElementById("view");if(document.querySelector(".skip-link").onclick=c=>{c.preventDefault(),M.focus()},!e.lastSync)M.innerHTML=e.err?`<div class="connection-state">${f("info")}<h1>We couldn't load your workspace</h1><p>${r(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(ae=document.getElementById("retryLoad"))==null||ae.addEventListener("click",()=>V.refresh(),{signal:i});else{a.fn(M,e,s);const c=t+"/"+(s||"");pa!==c&&Ka(M),pa=c}}window.addEventListener("hashchange",()=>{_a(),window.scrollTo({top:0,behavior:"instant"})});let ua="",ha=!1,va=V.get().prs;V.subscribe(e=>{const t=e.prs!==va;va=e.prs,e.err&&e.err!==ua&&N(e.err,!0),ua=e.err;const s=!ha&&e.lastSync;if(s&&(ha=!0),e.lastSync&&(e.loading||e.err)&&!t||["new","payments"].includes(Ha().name)&&!s&&e.lastSync&&document.querySelector("#view form")){Va(e);return}_a()});Wa(()=>V.refresh());st()||Ss();
