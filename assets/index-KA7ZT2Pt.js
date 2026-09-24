(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var Mt;const J=typeof window<"u"?(Mt=window.matchMedia)==null?void 0:Mt.call(window,"(prefers-reduced-motion: reduce)"):null,Re=new Set,na="cubic-bezier(.2,.75,.25,1)";var Et;(Et=J==null?void 0:J.addEventListener)==null||Et.call(J,"change",e=>{e.matches&&Re.forEach(t=>t.cancel())});function Ie(e,{duration:t=240,delay:s=0,distance:a=8,fromOpacity:n=0}={}){if(!(e!=null&&e.animate)||J!=null&&J.matches)return;const r=e.animate([{opacity:n,transform:`translateY(${a}px)`},{opacity:1,transform:"translateY(0)"}],{duration:t,delay:s,easing:na,fill:"backwards"});return r.id="workspace-reveal",Re.add(r),r.finished.then(()=>Re.delete(r),()=>Re.delete(r)),r}function sa(e){if(J!=null&&J.matches)return;const t=e.querySelectorAll([".adm-head",".adm-tabs",".dashboard-kpis > .kpi",".insights-filters",".insights-overview > section",".attention-card",".requests-card",".request-progress",".detail-main > .card",".detail-aside > .card",".form-page #prForm > .card",".insights-page > .kpis > .kpi",".insights-page > .card",".insights-page .adm-grid2 > .card",".vcard",".adm > .adm-card",".adm > .adm-banner"].join(","));let s=0;for(const a of[...t].slice(0,16)){const n=a.getBoundingClientRect();n.bottom<=0||n.top>=window.innerHeight||Ie(a,{delay:Math.min(s++*22,154),distance:10})}}const xt={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},De="oizom-id-token";let mt=null;function oa(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function Be(){const e=localStorage.getItem(De);return e?oa(e)<Date.now()+3e4?(localStorage.removeItem(De),null):e:null}function ra(){const e=Be();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function ia(){localStorage.removeItem(De),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function la(e){if(mt=e,Be()){e();return}nt(()=>{google.accounts.id.initialize({client_id:xt.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(De,t.credential),mt()}}),google.accounts.id.prompt()})}function nt(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>nt(e,t+1),100)}function da(e){nt(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class Ze extends Error{constructor(t,s={}){super(t),this.name="ApiError",Object.assign(this,s)}}const It=new Set(["list","me","usersList","health","logTail"]),ca=new Set([404,408,429,500,502,503,504]),ma=45e3;function ua(e){try{const t=new URL(e.url).hostname;if(t==="script.googleusercontent.com")return"Google response service";if(t==="script.google.com")return"Google backend"}catch{}return"procurement server"}function we(e,{status:t,stage:s="procurement server",kind:a="network"}){const n=It.has(e),r=t?`HTTP ${t}`:a==="timeout"?"request timed out":a==="response"?"incomplete response":"connection interrupted",i=n?`Could not load data from the ${s} (${r}). Please try syncing again.`:`Could not confirm your change (${r}). Sync and check whether it saved before submitting again.`;return new Ze(i,{action:e,status:t,stage:s,kind:a,outcomeUnknown:!n,retryable:!t||ca.has(t)})}async function pa(e,t){const s=Be();if(!s)throw new Ze("SIGNED_OUT");let a;try{a=await fetch(xt.APP_URL,{method:"POST",cache:"no-store",signal:AbortSignal.timeout(ma),body:JSON.stringify({...t,action:e,token:s})})}catch(i){throw we(e,{kind:["TimeoutError","AbortError"].includes(i.name)?"timeout":"network"})}const n=ua(a);if(!a.ok)throw we(e,{status:a.status,stage:n,kind:"http"});let r;try{r=await a.json()}catch{throw we(e,{stage:n,kind:"response"})}if(!r||typeof r.ok!="boolean"||r.ok&&e==="list"&&!Array.isArray(r.prs))throw we(e,{stage:n,kind:"response"});if(!r.ok)throw new Ze(r.error||"Request failed",{action:e});return r}async function H(e,t={}){for(let s=0;s<2;s++)try{return await pa(e,t)}catch(a){if(!a.retryable||(console.warn("[Procurement connection]",{action:e,status:a.status,stage:a.stage,kind:a.kind,attempt:s+1}),!It.has(e)||s===1))throw a;await new Promise(n=>setTimeout(n,800))}}function va(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function ha(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function ya(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function fa(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function ut(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,r)=>Number(n.itemNo)-Number(r.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:ya(n),qty:fa(n)}})}let I={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ye=new Set;let pt=!1,pe=null,He=0;function ba(e){const t=["prs","items","vendors","projects","materialTypes","notifications"];if(!e||!Array.isArray(e.prs)||t.some(s=>e[s]!=null&&!Array.isArray(e[s]))||!e.me||typeof e.me.email!="string"||typeof e.me.role!="string")throw new Error("The server did not return your workspace data. Please try again.")}function Ve(){Ye.forEach(e=>e(I))}const M={get:()=>I,subscribe(e){return Ye.add(e),()=>Ye.delete(e)},refresh(){return pe||(I={...I,loading:!0},pe=Promise.resolve().then(async()=>{try{let e,t;do t=He,e=await H("list");while(t!==He);ba(e),I={prs:ut(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1},pt=!0}catch(e){if(e.message==="SIGNED_OUT"&&pt){location.reload();return}I={...I,err:e.message,loading:!1}}}).finally(()=>{pe=null,I={...I,loading:!1},Ve()}),Ve(),pe)},async applyResult(e,{itemsChanged:t=!1}={}){He++;const s={err:""};let a=!1;if(e.pr&&e.pr.id){const n=I.prs.find(r=>r.id===e.pr.id);if(!Array.isArray(e.items)&&(t||!n))return M.refresh();if(!n||!(Date.parse(n.updatedAt)>Date.parse(e.pr.updatedAt))){const r=(e.items||(n==null?void 0:n.items)||[]).map(c=>({...c,prId:e.pr.id})),i=ut([e.pr],r)[0];s.prs=n?I.prs.map(c=>c.id===i.id?i:c):[...I.prs,i]}a=!0}e.deleted&&(s.prs=I.prs.filter(n=>n.id!==e.deleted),a=!0);for(const n of["vendors","projects","materialTypes","notifications"])Array.isArray(e[n])&&(s[n]=e[n],a=!0);if(Array.isArray(e.users)){const n=I.me&&e.users.find(r=>r.email.toLowerCase()===I.me.email.toLowerCase());if(I.me&&(!n||!n.role))return M.refresh();n&&(s.me={...I.me,role:n.role,department:n.department}),a=!0}if(!a)return M.refresh();I={...I,...s},Ve()}},vt={trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',vendors:'<path d="M3 10h18M5 10v11h14V10M3 10l2-7h14l2 7M9 21v-7h6v7"/>',chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',plus:'<path d="M12 5v14M5 12h14"/>',refresh:'<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',down:'<path d="m6 9 6 6 6-6"/>',right:'<path d="m9 5 7 7-7 7"/>',left:'<path d="m15 5-7 7 7 7"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',file:'<path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',wallet:'<path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',truck:'<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',check:'<path d="m5 12 4 4L19 6"/>',package:'<path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M8 5l9 5"/>',more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',logout:'<path d="M9 4H4v16h5M10 12h11m-5-5 5 5-5 5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>'};function h(e,t=""){return`<svg class="ico ${t}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${vt[e]||vt.file}</svg>`}const o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Oe(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function D(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.setAttribute("role",t?"alert":"status"),s.setAttribute("aria-live",t?"assertive":"polite"),s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico">${h(t?"info":"check")}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const Q=e=>e?o(String(e).slice(0,10)):"—";function Fe(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function st(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const ht={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},Te=e=>ht[e]!=null?ht[e]:e+" ";function ge(e,t){const s=e==="INR"?"en-IN":"en-US";return Te(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function X(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?Te(e)+(t/1e6).toFixed(2)+"M":t>=1e3?Te(e)+(t/1e3).toFixed(1)+"K":Te(e)+Math.round(t).toLocaleString("en-US")}const Se=["Cancelled","Rejected"],ga=["Ordered","In Transit","Received"],je=e=>ga.includes(e.status)&&e.paymentStatus!=="Paid";function yt(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function ft(e){const t=e.filter(n=>!Se.includes(n.status)),s=e.filter(je),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:yt(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:yt(t)}}const Le={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:je,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!Se.includes(e.status)};function $a(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function bt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function Bt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function Sa(e){return e.filter(je)}function wa(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function ka(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function gt(e,t,s){const a={};for(const n of e){const r=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(r))continue;let i;if(t==="count")i=1;else{if(Se.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const c=Number(n.amount);if(!n.amount||!isFinite(c)||(n.currency||"Unknown")!==s)continue;i=c}a[r]=(a[r]||0)+i}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Ca(e,t){const s={};for(const a of e){if(Se.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const r=a.department||"Unassigned";s[r]=(s[r]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function Ra(e,t,s=6){const a={};for(const i of e){if(Se.includes(i.status)||(i.currency||"Unknown")!==t)continue;const c=Number(i.amount);if(!i.amount||!isFinite(c))continue;const f=i.vendor||"Unspecified";a[f]=(a[f]||0)+c}const n=Object.entries(a).map(([i,c])=>({vendor:i,total:c})).sort((i,c)=>c.total-i.total);if(n.length<=s)return n;const r=n.slice(s).reduce((i,c)=>i+c.total,0);return[...n.slice(0,s),{vendor:"Other",total:r}]}function Ta(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Aa(e){const t=(r,i)=>{const c=Date.parse(r),f=Date.parse(i);return isFinite(c)&&isFinite(f)?(f-c)/864e5:null},s=r=>r.length?r.reduce((i,c)=>i+c,0)/r.length:null,a=e.map(r=>r.createdAt&&r.approvedAt?t(r.createdAt,r.approvedAt):null).filter(r=>r!=null&&r>=0),n=e.map(r=>r.poDate&&r.receivedAt?t(r.poDate,r.receivedAt):null).filter(r=>r!=null&&r>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Pa=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function qa(e,t=Date.now()){const s=Pa.map(a=>({...a,count:0}));return e.filter(je).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const r=(t-n)/864e5;(s.find(i=>r>=i.min&&r<=i.max)||s[s.length-1]).count++}),s}const We=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],Ot=["Unpaid","Paid","Partially Paid","FOC / Free"],Ne={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Da(e,t,s,a,n){const r=(Ne[e]||{})[t];return r?r.some(i=>i==="requester:own"?s==="requester"&&a:i==="approver:dept"?s==="approver"&&n:i===s):!1}function La(e,t,s,a){return Object.keys(Ne[e]||{}).filter(n=>Da(e,n,t,s,a))}function Na(e,t){return!!(Ne[e]&&Ne[e][t])}const Ma=["Submitted","Approved","Rejected"],p={sel:"total",tab:"mine",page:1,moreFilters:!1,filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}},ve=25,Ea={total:"file",pending:"clock",unpaid:"wallet",transit:"truck",received:"package",spend:"chart"};let Qe;function xa(e,t){p.tab=t==="admin"?"all":"dept",p.sel=["pending","unpaid"].includes(e)?e:"total",p.page=1,p.filters={q:"",dept:"",vendor:"",status:e==="pending"?"Submitted":"",from:"",to:""}}function se(e,t,s=!0){const a=document.activeElement,n=a&&e.contains(a)&&a.id?{id:a.id,start:a.selectionStart,end:a.selectionEnd}:null;if(Ft(e,t),s&&Ie(e.querySelector(".request-table tbody"),{duration:160,distance:3,fromOpacity:.5}),!n)return;const r=e.querySelector("#"+n.id);if(r&&(r.focus(),n.start!=null&&typeof r.setSelectionRange=="function"))try{r.setSelectionRange(n.start,n.end)}catch{}}const $t=e=>String(e||"").slice(0,10);function Ia(e){const t=p.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&$t(e.createdAt)<t.from||t.to&&$t(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function Ft(e,t){clearTimeout(Qe),e.innerHTML=`
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
    </div>`,Ba(e.querySelector("#tabBody"),e,t)}const de=e=>e.length?e.map(([t,s])=>X(t,s)).join(" + "):"—";function Ba(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",r=a.role==="admin",i=a.role==="finance",c=n?["mine","dept","approved"]:r?["mine","all"]:i?["mine","payments"]:["mine"];c.includes(p.tab)||(p.tab="mine");const f=p.tab==="dept",m=p.tab==="approved",b=p.tab==="all",T=p.tab==="payments",q=$a(s.prs,a.email),B=n?bt(s.prs,a.email):[],C=n?Bt(s.prs,a.department):[],O=i?Sa(s.prs):[],L=f?C:m?B:b?s.prs:T?O:q,u=ft(L),A=n?C.filter(Le.pending):[],P=r?b?u:ft(s.prs):n?{pending:A.length,highPriority:A.filter(l=>["high","critical"].includes(String(l.priority||"").trim().toLowerCase())).length}:null,g=T?[{key:"total",n:u.total,l:"Awaiting payment",s:de(u.unpaidTotals)},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:"Total value",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:f?[{key:"total",n:u.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}]:[{key:"total",n:u.total,l:m?"Approved PRs":b?"All PRs":"Total PRs",s:m?"across all requesters":b?"every department":""},...m?[]:[{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:de(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?X(...u.spendTotals[0]):"—",l:m?"Approved spend":"Total spend",s:u.spendTotals.length>1?"+ "+de(u.spendTotals.slice(1)):""}];if(b)for(const l of wa(s.prs))g.push({key:"ap:"+l.email,n:l.count,l:"Approved by "+Fe(l.email),s:l.email,cls:"go"});g.some(l=>l.key===p.sel)||(p.sel="total");const U=(p.sel.startsWith("ap:")?bt(s.prs,p.sel.slice(3)):L.filter(Le[p.sel])).sort((l,w)=>(w.createdAt||"").localeCompare(l.createdAt||"")),ee=g.find(l=>l.key===p.sel),z=[...new Set(L.map(l=>l.department).filter(Boolean))].sort(),R=[...new Set(L.map(l=>l.vendor).filter(Boolean))].sort();p.filters.dept&&!z.includes(p.filters.dept)&&(p.filters.dept=""),p.filters.vendor&&!R.includes(p.filters.vendor)&&(p.filters.vendor="");const E=U.filter(Ia),V=Object.values(p.filters).some(Boolean),y=Math.max(1,Math.ceil(E.length/ve));p.page=Math.min(Math.max(1,p.page),y);const $=E.slice((p.page-1)*ve,p.page*ve),k=["dept","vendor","from","to"].filter(l=>p.filters[l]).length,v=b?"All requests":f?"Department requests":m?"Approved by you":T?"Payment queue":"Your requests",d=l=>String(l.department||"").toLowerCase()===String(a.department||"").toLowerCase(),S=l=>{const w=r?We:n&&l.status==="Submitted"&&d(l)?Ma:null;return w?`<select class="status-sel" data-status="${o(l.status)}" aria-label="Status for ${o(l.id)}" data-id="${o(l.id)}">${w.map(N=>`<option ${N===l.status?"selected":""}>${o(N)}</option>`).join("")}</select>`:Oe(l.status)},x=l=>`<select class="pay-sel" aria-label="Payment status for ${o(l.id)}" data-id="${o(l.id)}">${Ot.map(w=>`<option ${w===l.paymentStatus?"selected":""}>${o(w)}</option>`).join("")}</select>`;e.innerHTML=`
    ${c.length>1?`<div class="adm-tabs" aria-label="Request scope">
      <button class="adm-tab ${p.tab==="mine"?"active":""}" data-tab="mine">Your requests <span>${q.length}</span></button>
      ${n?`<button class="adm-tab ${f?"active":""}" data-tab="dept">${o(a.department||"Your department")} <span>${C.length}</span></button><button class="adm-tab ${m?"active":""}" data-tab="approved">Approved by you <span>${B.length}</span></button>`:""}
      ${r?`<button class="adm-tab ${b?"active":""}" data-tab="all">All requests <span>${s.prs.length}</span></button>`:""}
      ${i?`<button class="adm-tab ${T?"active":""}" data-tab="payments">Awaiting payment <span>${O.length}</span></button>`:""}
    </div>`:""}
    <div class="kpis dashboard-kpis" aria-label="Filter requests by summary">${g.filter(l=>!l.key.startsWith("ap:")).map(l=>`
      <button type="button" class="kpi clickable ${l.cls||""} ${l.key===p.sel?"sel":""}" data-key="${o(l.key)}" aria-pressed="${l.key===p.sel}">
        <span class="kpi-top"><span class="l">${o(l.l)}</span>${h(Ea[l.key])}</span>
        <span class="v">${o(String(l.n))}</span><span class="s">${o(l.s||(l.key==="total"?v:"Active request value"))}</span>
      </button>`).join("")}
    </div>
    ${P?`<section class="attention-card" aria-labelledby="nextUpHeading">
      <div class="attention-heading"><span class="eyebrow">NEXT UP</span><h2 id="nextUpHeading">${n?"Your approval workload":"Keep work moving."}</h2><p>${n?o(a.department||"Your department")+" requests":"Across all requests"}</p></div>
      <button type="button" data-queue="pending" ${P.pending?"":"disabled"}><span class="attention-icon">${h("clock")}</span><span><b>${P.pending} ${n?"awaiting your decision":"awaiting approval"}</b><small>${P.pending?"Open approval queue":"No approvals waiting"}</small></span>${h("arrow")}</button>
      ${r?`<button type="button" data-queue="unpaid" ${P.unpaidCount?"":"disabled"}><span class="attention-icon">${h("wallet")}</span><span><b>${P.unpaidCount} awaiting payment</b><small>${P.unpaidCount?"Open unpaid orders":"No payments waiting"}</small></span>${h("arrow")}</button>`:`<div class="attention-summary"><span class="attention-icon">${h("info")}</span><span><b>${P.highPriority} high priority</b><small>High or Critical, awaiting approval</small></span></div>`}
    </section>`:""}
    <section class="card requests-card" aria-label="Purchase requests" tabindex="-1">
      <div class="section-heading"><div><h2>Purchase requests <span class="count-badge">${E.length}</span></h2><p>${o(v)} · ${p.sel==="total"?"Latest first":o(ee.l)}</p></div><span class="table-hint">Select a request to view details ${h("arrow")}</span></div>
      <div class="filters request-filters">
        <label class="search-input">${h("search")}<span class="sr-only">Search requests</span><input id="dashQ" type="search" autocomplete="off" spellcheck="false" placeholder="Search requests, items or vendors…" value="${o(p.filters.q)}"></label>
        <select id="dashStatus" aria-label="Filter by status"><option value="">All statuses</option>${We.map(l=>`<option value="${o(l)}" ${p.filters.status===l?"selected":""}>${o(l)}</option>`).join("")}</select>
        <button type="button" class="btn filter-toggle ${k?"is-filtered":""}" id="dashMoreFilters" aria-expanded="${p.moreFilters}" aria-controls="advancedFilters">${h("filter")} Filters ${k?`<span class="count-badge">${k}</span>`:""}</button>
        ${V?'<button type="button" class="btn quiet" id="dashFilterClear">Clear</button>':""}
      </div>
      <div class="advanced-filters" id="advancedFilters" ${p.moreFilters?"":"hidden"}>
        <label>Department<select id="dashDept"><option value="">All departments</option>${z.map(l=>`<option value="${o(l)}" ${p.filters.dept===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>Vendor<select id="dashVendor"><option value="">All vendors</option>${R.map(l=>`<option value="${o(l)}" ${p.filters.vendor===l?"selected":""}>${o(l)}</option>`).join("")}</select></label>
        <label>From date<input id="dashFrom" type="date" value="${o(p.filters.from)}"></label>
        <label>To date<input id="dashTo" type="date" value="${o(p.filters.to)}"></label>
        ${b?`<label>Approved by<select id="dashApprover"><option value="total">Anyone</option>${g.filter(l=>l.key.startsWith("ap:")).map(l=>`<option value="${o(l.key)}" ${p.sel===l.key?"selected":""}>${o(l.l.replace("Approved by ",""))} (${l.n})</option>`).join("")}</select></label>`:""}
      </div>
      <div class="table-scroll"><table class="tbl request-table"><thead><tr>
        ${T?"<th>Request</th><th>Created</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>Request</th><th>Created</th><th>Department</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${$.map(l=>`<tr class="rowlink ${T?"payment-row":""}" data-id="${o(l.id)}">
          <td class="request-id"><a href="#/pr/${o(l.id)}">${o(l.id)}</a></td>
          <td class="request-date">${Q(l.createdAt)}</td>
          ${T?`<td>${o(l.vendor)}</td><td>${o(l.poNo||"—")}</td><td>${o(l.paymentTerm||"—")}</td>`:`<td class="request-dept">${o(l.department)}</td><td class="wrap request-item">${o(l.item)}</td><td class="request-vendor">${o(l.vendor)}</td>`}
          <td class="request-amount">${l.amount?o(X(l.currency||"INR",Number(l.amount))):"—"}</td>
          <td class="request-status">${T?x(l):S(l)}</td>
        </tr>`).join("")||`<tr><td colspan="7"><div class="empty-state">${h(V?"search":"file")}<b>${V?"No matching requests":"No requests here yet"}</b><span>${V?"Try a different search or clear your filters.":"Create a request to get your purchases moving."}</span>${V?'<button class="btn" id="emptyClear">Clear filters</button>':'<a class="btn primary" href="#/new">Create a request</a>'}</div></td></tr>`}
      </tbody></table></div>
      <div class="table-footer"><span role="status">${E.length?(p.page-1)*ve+1:0}–${Math.min(p.page*ve,E.length)} of ${E.length} requests</span><div class="pager"><button class="btn" id="dashPrev" aria-label="Previous page" ${p.page===1?"disabled":""}>${h("left")}</button><span>Page ${p.page} of ${y}</span><button class="btn" id="dashNext" aria-label="Next page" ${p.page===y?"disabled":""}>${h("right")}</button></div></div>
    </section>`,e.querySelectorAll(".adm-tab").forEach(l=>l.onclick=()=>{p.tab=l.dataset.tab,p.sel="total",p.page=1,se(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(l=>l.onclick=()=>{p.sel=l.dataset.key,p.page=1,se(t,s)}),e.querySelectorAll("[data-queue]").forEach(l=>l.onclick=()=>{var N,_;if(!r&&!(n&&l.dataset.queue==="pending"))return;xa(l.dataset.queue,a.role),se(t,s);const w=t.querySelector(".requests-card");w.focus({preventScroll:!0}),(_=w.scrollIntoView)==null||_.call(w,{block:"start",behavior:(N=window.matchMedia)!=null&&N.call(window,"(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}),e.querySelectorAll("tr.rowlink").forEach(l=>l.onclick=w=>{w.target.closest("a, select, button")||(location.hash="#/pr/"+l.dataset.id)}),e.querySelector("#dashMoreFilters").onclick=()=>{p.moreFilters=!p.moreFilters,e.querySelector("#advancedFilters").hidden=!p.moreFilters,e.querySelector("#dashMoreFilters").setAttribute("aria-expanded",String(p.moreFilters))};const F=e.querySelector("#dashApprover");F&&(F.onchange=()=>{p.sel=F.value,p.page=1,se(t,s)});const j=l=>{var w,N;p.page+=l,se(t,s),(N=(w=t.querySelector(".requests-card")).scrollIntoView)==null||N.call(w,{block:"start"})};e.querySelector("#dashPrev").onclick=()=>j(-1),e.querySelector("#dashNext").onclick=()=>j(1);const K=(l,w)=>{p.filters[l]=w,p.page=1,se(t,s)};e.querySelector("#dashQ").oninput=l=>{p.filters.q=l.target.value,p.page=1,clearTimeout(Qe),Qe=setTimeout(()=>{t.isConnected&&se(t,s,!1)},150)},e.querySelector("#dashDept").onchange=l=>K("dept",l.target.value),e.querySelector("#dashVendor").onchange=l=>K("vendor",l.target.value),e.querySelector("#dashStatus").onchange=l=>K("status",l.target.value),e.querySelector("#dashFrom").onchange=l=>K("from",l.target.value),e.querySelector("#dashTo").onchange=l=>K("to",l.target.value);const re=()=>{p.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},p.page=1,p.sel="total",se(t,s)},me=e.querySelector("#dashFilterClear"),ue=e.querySelector("#emptyClear");me&&(me.onclick=re),ue&&(ue.onclick=re),e.querySelectorAll(".status-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,N=s.prs.find(Z=>Z.id===w),_=l.value;if(!(!N||_===N.status)){if((_==="Rejected"||_==="Cancelled")&&!confirm(`Mark ${w} as ${_}?`)){l.value=N.status;return}l.disabled=!0;try{let Z;a.role==="admin"&&!Na(N.status,_)?Z=await H("update",{id:w,updates:{status:_}}):Z=await H("transition",{id:w,to:_}),D(`${w} → ${_}`),await M.applyResult(Z)}catch(Z){D(Z.message,!0),l.value=N.status,l.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(l=>{l.onclick=w=>w.stopPropagation(),l.onchange=async()=>{const w=l.dataset.id,N=s.prs.find(Z=>Z.id===w),_=l.value;if(!(!N||_===N.paymentStatus)){l.disabled=!0;try{const Z=await H("update",{id:w,updates:{paymentStatus:_}});D(`${w} payment → ${_}`),await M.applyResult(Z)}catch(Z){D(Z.message,!0),l.value=N.paymentStatus,l.disabled=!1}}}})}function ot(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function rt(e,t){const s=ot(e,t),a=s.filter(Le.spend),n={};for(const r of a){const i=Number(r.amount);if(!r.amount||!isFinite(i))continue;const c=r.currency||"INR";n[c]=(n[c]||0)+i}return{count:s.length,spendTotals:Object.entries(n).sort((r,i)=>i[1]-r[1]),unpaid:s.filter(Le.unpaid).length,lastOrder:s.reduce((r,i)=>{const c=String(i.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(c)&&c>r?c:r},"")}}function jt(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(ot(t,e.name).filter(r=>r.amount&&isFinite(Number(r.amount))).map(r=>r.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(r=>r!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const Oa=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],Fa={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},ja=1,Ua=.7,Ut=.5,Ha=.4,Va=.3,Ka=4,_a=e=>e.length>=7?2:e.length>=Ka?1:0,Me=e=>String(e??"").toLowerCase().trim();function Ga(e,t){const s=e[t];return Me(Array.isArray(s)?s.join(" "):s)}function Ht(e){return Me(e).split(/[\s,]+/).filter(Boolean)}function za(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let r=1;r<=t.length;r++)n[r]=Math.min(s[r]+1,n[r-1]+1,s[r-1]+(e[a-1]===t[r-1]?0:1));s=n}return s[t.length]}function St(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return ja;if(s.some(n=>n.startsWith(t)))return Ua;if(e.includes(t))return Ut;const a=_a(t);return a&&s.some(n=>za(n,t)<=a)?Va:0}function Za(e,t){const s=St(e,t);if(s)return s;const a=Fa[t];return a&&a.some(r=>r.includes(" ")?e.includes(r):St(e,r)>=Ut)?Ha:0}function Ya(e,t){const s=Array.isArray(t)?t:Ht(t);if(!s.length)return 0;let a=0;for(const n of s){let r=0;for(const{key:i,weight:c}of Oa)r=Math.max(r,Za(Ga(e,i),n)*c);if(!r)return 0;a+=r}return a}function Vt(e,t){const s=Ht(t);return s.length?(e||[]).map(a=>({v:a,score:Ya(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||Me(a.v.displayName||a.v.name).localeCompare(Me(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Ue(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        ${h("search")}
        <input aria-label="${o(t)}" id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          ${h("close")}
        </button>
      </div>
    </div>`}const it=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function lt(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function dt(e,{get:t,set:s,count:a,id:n="admSearch",match:r=null}){const i=e.querySelector("#"+n);if(!i)return;const c=i.closest(".adm-card"),f=c.querySelector(".admSearchClear"),m=()=>Wa(c,t(),a,r);i.oninput=()=>{s(i.value),f.hidden=!i.value,m()},i.onkeydown=b=>{b.key==="Escape"&&i.value&&(i.value="",i.oninput())},f.onclick=()=>{i.value="",i.oninput(),i.focus()},m()}function Wa(e,t,s,a){const n=t.trim().toLowerCase(),r=[...e.querySelectorAll("tbody tr[data-search]")],i=n&&a?a(n):null;let c=null;r.forEach(b=>{b.hidden=n?i?!i.has(b.dataset.name):!b.dataset.search.includes(n):!1,b.classList.remove("last-visible"),b.hidden||(c=b)}),c&&c.classList.add("last-visible");const f=e.querySelector(".adm-nomatch");f&&(f.hidden=!!c||!r.length);const m=e.querySelector(".adm-count");m&&(m.textContent=s(r.filter(b=>!b.hidden).length,r.length))}let he="";const Kt={Domestic:"dom",Foreign:"for",Mixed:"mix"},Qa=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function _t(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(Qa(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function Ja(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function Xa(e,t){const s=rt(e.prs,t.name),a=jt(t,e.prs),n=s.spendTotals.length?X(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <a class="vcard" href="#/vendors/${encodeURIComponent(t.name)}" data-name="${o(t.name)}">
      <div class="vc-top">
        ${_t(t)}
        <div class="vc-title">
          <b>${o(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${o(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${Kt[a]}">${o(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${o(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${Q(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${Ja(t)}</div>
    </a>`}const en=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function wt(e,t){const s=en(e.vendors),a=t.trim()?Vt(s,t):s;return a.length?a.map(n=>Xa(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function tn(e,t,s){if(s)return an(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Ue(he,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${wt(t,he)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),r=e.querySelector(".admSearchClear"),i=()=>{he=n.value,r.hidden=!he,a.innerHTML=wt(t,he)};n.oninput=i,n.onkeydown=c=>{c.key==="Escape"&&n.value&&(n.value="",i())},r.onclick=()=>{n.value="",i(),n.focus()}}function an(e,t,s){const a=(t.vendors||[]).find(m=>m.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=rt(t.prs,a.name),r=jt(a,t.prs),i=t.me&&t.me.role==="admin",c=ot(t.prs,a.name).sort((m,b)=>(b.createdAt||"").localeCompare(m.createdAt||"")),f=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,m])=>m);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${_t(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${o(a.displayName||a.name)}
              ${r?`<span class="vc-badge ${Kt[r]}">${o(r.toUpperCase())}</span>`:""}
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
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([m,b])=>X(m,b)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${Q(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${f.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${f.map(([m,b])=>`<div><span class="vc-l">${o(m)}</span><b>${o(b)}</b></div>`).join("")}</div>
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
            <td>${Oe(m.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(m=>m.onclick=()=>location.hash="#/pr/"+m.dataset.id)}const Je=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Gt=new Map(Je.map(e=>[e.code,e])),nn=e=>Gt.has(String(e||"").trim().toUpperCase());function Xe(e){const t=Gt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function sn(e){const t=String(e||"").trim().toLowerCase(),s=t?Je.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...Je],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,r)=>a(n)-a(r)||n.code.localeCompare(r.code))}function ke(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const r=Math.max(n.value/a*100,n.value>0?2:0),i=s?s(n):"var(--brand)",c=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(c)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${r.toFixed(1)}%;background:${i}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function kt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},r=s-n.l-n.r,i=a-n.t-n.b,c=Math.max(...e.map(u=>u.value),1),f=r/(e.length-1),m=u=>n.l+u*f,b=u=>n.t+i-u/c*i,T=e.map((u,A)=>`${A===0?"M":"L"}${m(A).toFixed(1)} ${b(u.value).toFixed(1)}`).join(" "),q=`${T} L${m(e.length-1).toFixed(1)} ${n.t+i} L${m(0).toFixed(1)} ${n.t+i} Z`,B=[0,.5,1].map(u=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+i*(1-u)).toFixed(1)}" y2="${(n.t+i*(1-u)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),C=Math.ceil(e.length/6)||1,O=e.map((u,A)=>A%C===0||A===e.length-1?`<text x="${m(A).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="${A===0?"start":A===e.length-1?"end":"middle"}">${o(u.month.slice(2))}</text>`:"").join(""),L=e.map((u,A)=>`<circle cx="${m(A).toFixed(1)}" cy="${b(u.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(u.month)}: ${o(t(u.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${B}
    <path d="${q}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${T}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${L}
    ${O}
  </svg>`}const on=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],rn={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},ln={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},Ce={currency:""};function zt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?Bt(t.prs,s.department):t.prs||[],r=ka(n);r.includes(Ce.currency)||(Ce.currency=r[0]||"");const i=Ce.currency,c=g=>i?X(i,g):String(g),f=i?gt(n,"spend",i):[],m=gt(n,"count"),b=i?Ra(n,i,6).map(g=>({label:g.vendor,value:g.total})):[],T=!a&&i?Ca(n,i).map(g=>({label:g.department,value:g.total})):[],q=Ta(n),B=on.filter(g=>q[g]).map(g=>({label:g,value:q[g]})),C=Aa(n),O=qa(n),L=O.map(g=>({label:g.label,value:g.count})),u=O.reduce((g,U)=>g+U.count,0),A=f.reduce((g,U)=>g+U.value,0);e.innerHTML=`
    <div class="dash insights-page">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${o(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
      </div>

      ${r.length?`<section class="insights-filters" aria-label="Spending currency filter">
        <div class="insights-currency-copy">
          <span class="insights-currency-icon" aria-hidden="true">${h("wallet")}</span>
          <div><label for="insCur">Spending currency</label>
            <p id="insCurHelp">Filter spending totals, department breakdowns and vendor charts by currency.</p></div>
        </div>
        <select id="insCur" aria-describedby="insCurHelp">${r.map(g=>`<option value="${o(g)}" ${g===i?"selected":""}>${o(Xe(g))}</option>`).join("")}</select>
      </section>`:""}

      <div class="kpis">
        <div class="kpi"><div class="v">${i?o(c(A)):"—"}</div><div class="l">Total spend${i?" · "+o(i):""}</div></div>
        <div class="kpi"><div class="v">${C.avgApprovalDays!=null?C.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${C.avgDeliveryDays!=null?C.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${u?"warn":""}"><div class="v">${u}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="insights-overview">
        <section class="card spend-card">
          <div class="section-heading"><div><h2>Spend overview</h2><p>Active request value by month${i?" · "+o(i):""}</p></div>
          </div>
          <div class="spend-chart">${f.length?kt(f,{valueFmt:g=>X(i,g),height:180}):`<div class="trend-empty">${h("chart")}<div><b>Your spending story starts here</b><span>Priced requests will appear in this overview.</span></div></div>`}</div>
        </section>
      </div>

      <div class="adm-grid2">
        ${T.length?`<div class="card"><h2>Spend by department${i?" · "+o(i):""}</h2>
          <div class="pd-body">${ke(T,{valueFmt:c})}</div></div>`:""}
        <div class="card"><h2>Top vendors${i?" · "+o(i):""}</h2>
          <div class="pd-body">${ke(b,{valueFmt:c})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${ke(B,{colorOf:g=>rn[g.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${ke(L,{colorOf:g=>ln[g.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${kt(m,{valueFmt:g=>g+" PR"+(g===1?"":"s")})}</div>
      </div>
    </div>`;const P=e.querySelector("#insCur");P&&(P.onchange=()=>{var g;Ce.currency=P.value,zt(e,t),(g=e.querySelector("#insCur"))==null||g.focus()})}const Zt={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`};function Yt(e){try{const t=new URL(String(e||"").trim());return["https:","http:"].includes(t.protocol)?t.href:""}catch{return""}}function dn(e){const t=String(e.trackingNo||"").trim(),s=Yt(e.trackingLink)||(t?(Zt[e.courier]||(a=>`https://t.17track.net/en#nums=${a}`))(encodeURIComponent(t)):"");return[o(e.courier||""),s?`<a href="${o(s)}" target="_blank" rel="noopener noreferrer">${o(t||"Track shipment")} ↗</a>`:o(t)].filter(Boolean).join(" ")}function cn(e,t=[]){const s=[...new Set([...t,...Object.keys(Zt),"India Post"])];return`<label>Courier<input name="courier" list="deliveryCouriers" autocomplete="off" placeholder="Select or enter a courier" value="${o(e.courier)}"></label>
    <datalist id="deliveryCouriers">${s.map(a=>`<option value="${o(a)}"></option>`).join("")}</datalist>
    <label>Tracking number<input name="trackingNo" value="${o(e.trackingNo)}"></label>
    <label class="full">Tracking link<input name="trackingLink" type="url" inputmode="url" placeholder="https://..." aria-describedby="trackingLinkHelp" value="${o(e.trackingLink)}">
      <span class="delivery-help" id="trackingLinkHelp">Paste a tracking link, even if you don't have a tracking number.</span></label>`}function mn(e){return e?(e.value=e.value.trim(),e.setCustomValidity(e.value&&!Yt(e.value)?"Enter a full http:// or https:// tracking link.":""),e.reportValidity()):!0}const un="1900-01-01",pn="2100-12-31",vn="Enter a complete date with a year between 1900 and 2100.";function be(e){var t;return((t=String(e||"").match(/^\d{4,}-\d{2}-\d{2}/))==null?void 0:t[0])||""}function Wt(e){const t=[...e.querySelectorAll('input[type="date"]')],s=a=>{a.setCustomValidity(""),(a.validity.badInput||a.validity.rangeUnderflow||a.validity.rangeOverflow)&&a.setCustomValidity(vn)};return t.forEach(a=>{a.min=un,a.max=pn;for(const n of["input","change","invalid"])a.addEventListener(n,()=>s(a));s(a)}),()=>t.every(a=>(s(a),a.reportValidity()))}const hn=Ot,yn={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Ae=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:yn[t])||[],Ke={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},ae=(e,t,s)=>`<span class="lblrow">${o(e)}${Ke[t]?`<span class="hq ${s?"r":""}" tabindex="0" aria-label="${o(Ke[t])}" data-tip="${o(Ke[t])}">?</span>`:""}</span>`;function ie(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${n?o(n):"Select…"}</option>`).join("")}function Ct(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${o(t.lineTotal)}">
    <label class="item-field description">Description *<input name="i_description" placeholder="e.g. PM sensor module" value="${o(t.description)}"></label>
    ${n?`<label class="item-field">Zoho part number<input name="i_partNo" placeholder="Part number" value="${o(t.partNo)}"></label>`:`<input type="hidden" name="i_partNo" value="${o(t.partNo)}">`}
    <label class="item-field">Item type *<select name="i_materialType" required>${ie(a,t.materialType||"",!0)}</select></label>
    <label class="item-field">Quantity *<input name="i_qty" type="number" step="any" min="0" placeholder="0" required value="${o(t.qty)}"></label>
    <label class="item-field">Unit *<select name="i_unit" required>${ie(Ae(e,"units"),t.unit||"pcs")}</select></label>
    <label class="item-field">Unit price<input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="0.00" value="${o(t.unitPrice)}"></label>
    <label class="item-field link-field">Purchase link<input name="i_purchaseLink" placeholder="https://…" value="${o(t.purchaseLink)}"></label>
    <label class="item-field link-field">Datasheet or specification<input name="i_datasheetDoc" placeholder="Document URL (optional)" value="${o(t.datasheetDoc)}"></label>
    <button type="button" class="btn danger rmItem" aria-label="Remove item" title="Remove item">${h("close")}</button>
  </div>`}function _e(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function fn(e,t,s){const a=s?t.prs.find(y=>y.id===s):null,n=a||{},r=a?n.items||[]:[{}],i=t.me||{role:""},c=["approver","admin","finance"].includes(i.role),f=a?n.department||"":i.department||"",m=(t.projects||[]).filter(y=>y.department.toLowerCase()===f.toLowerCase()).map(y=>y.project),b=(t.vendors||[]).filter(y=>(y.departments||[]).some($=>$.toLowerCase()===f.toLowerCase())),T=y=>{const $=b.find(k=>k.name.toLowerCase()===String(y||"").toLowerCase());return $?$.displayName||$.name:String(y||"")},q=(t.materialTypes||[]).filter(y=>y.department.toLowerCase()===f.toLowerCase()).map(y=>y.materialType),B=f.toLowerCase()==="production";e.innerHTML=`
    <div class="dash form-page">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?Oe(n.status):""}
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
              <label>${ae("Project*","project")} <select name="project" required>${ie(m,n.project||"",!0)}</select></label>
              <label>${ae("Purpose","purpose")} <input name="purpose" value="${o(n.purpose)}"></label>
              <div class="pd-field full">${ae("Vendor","vendor")}
                <input aria-label="Vendor" id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(T(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${ae("Currency","currency")}
                <input aria-label="Currency" id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(Xe(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${ae("Priority","priority",!0)} <select name="priority">${ie(Ae(t,"priorities"),n.priority||"Medium")}</select></label>
              ${a&&i.role==="admin"?"":`<label>${ae("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o(be(n.expectedDate))}"></label>`}
              ${c?`
              <label>${ae("Payment status*","payment")} <select name="paymentStatus" required>${ie(hn,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&i.role==="admin"?`
              <label>Status (admin override) <select name="status">${ie(We,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${o(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${ae("Notes","notes")} <textarea name="notes" rows="3">${o(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&i.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${o(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${o(be(n.poDate))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${o(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${o(be(n.invoiceDate))}"></label>
              <label>Payment term <select name="paymentTerm">${ie(Ae(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        ${a&&i.role==="admin"?`<div class="card"><h2>Delivery</h2><div class="pd-body pd-form"><div class="pd-grid">${cn(n,Ae(t,"couriers"))}
          <label>${ae("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o(be(n.expectedDate))}"></label>
        </div></div></div>`:""}

        <div class="card">
          <h2>Requested items</h2><p class="form-caption">Add each item with its quantity and quoted price. Fields marked * are required.</p>
          <div class="pd-body pd-form">
            <div id="itemRows">${r.map((y,$)=>Ct(t,y,$,q,B)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">${h("plus")} Add another item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
        <div class="form-actions-bottom"><span>Ready to ${a?"save your changes":"send for approval"}?</span><button class="btn primary pr-save" type="submit">${h("check")}${a?"Save changes":"Submit request"}</button></div>
      </form>
    </div>`;const C=e.querySelector("#prForm"),O=Wt(C),L=e.querySelector("#itemRows"),u=()=>{const y=_e(C).map(v=>{const d=va(v.qty,v.unitPrice);return{lineTotal:d!==""?d:v.lineTotal}}),$=ha(y),k=C.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=$===""?"":"Total: "+ge(k,$)},A=y=>{y.querySelector(".rmItem").onclick=()=>{L.children.length>1&&(y.remove(),u())},y.querySelectorAll("input, select").forEach($=>$.oninput=u)};[...L.children].forEach(A),u();const P=(y,$,k,{search:v,resolve:d,toLabel:S,allowEmpty:x,onCommit:F})=>{const j=e.querySelector("#"+y),K=e.querySelector("#"+$),re=C.querySelector(`[name="${k}"]`),me=()=>{F&&F()},ue=l=>{const w=v(l).slice(0,30);K.innerHTML=w.map(N=>`<div class="curOpt" data-v="${o(N.value)}"><b>${o(N.main)}</b> ${o(N.name||"")}<span>${o(N.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',K.hidden=!1};j.onfocus=()=>{j.select(),ue("")},j.oninput=()=>ue(j.value),K.onmousedown=l=>{l.preventDefault();const w=l.target.closest(".curOpt");w&&(re.value=w.dataset.v,j.value=S(w.dataset.v),K.hidden=!0,me())},j.onblur=()=>setTimeout(()=>{K.hidden=!0;const l=j.value.trim();if(!l&&x)re.value="";else{const w=d(l);w!=null&&(re.value=w)}j.value=S(re.value),me()},120)};P("curSearch","curList","currency",{search:y=>sn(y).map($=>({value:$.code,main:$.code,name:$.name,sub:$.sym||""})),resolve:y=>{const $=y.split("—")[0].trim().toUpperCase();return nn($)?$:null},toLabel:y=>Xe(y),onCommit:u});const g=y=>{const $=String(y||"").trim().toLowerCase();return b.filter(k=>!$||k.name.toLowerCase().includes($)||(k.displayName||"").toLowerCase().includes($)||(k.category||"").toLowerCase().includes($)).sort((k,v)=>(k.displayName||k.name).localeCompare(v.displayName||v.name)).map(k=>({value:k.name,main:k.displayName||k.name,name:k.displayName?k.name:"",sub:k.category||""}))},U=e.querySelector("#venHint"),ee=()=>{const y=C.querySelector('[name="vendor"]').value.trim();U.hidden=!y||b.some($=>$.name.toLowerCase()===y.toLowerCase())};P("venSearch","venList","vendor",{search:g,resolve:y=>{const $=b.find(k=>k.name.toLowerCase()===y.toLowerCase()||(k.displayName||"").toLowerCase()===y.toLowerCase());return $?$.name:y},toLabel:y=>T(y),allowEmpty:!0,onCommit:ee}),ee(),e.querySelector("#addItem").onclick=()=>{L.insertAdjacentHTML("beforeend",Ct(t,{},L.children.length,q,B)),A(L.lastElementChild),Ie(L.lastElementChild)};const z=C.elements.namedItem("trackingLink");z&&(z.oninput=()=>z.setCustomValidity(""));const R=()=>Object.fromEntries([...new FormData(C)].filter(([y])=>!y.startsWith("i_"))),E=R(),V=JSON.stringify(_e(C));C.onsubmit=async y=>{y.preventDefault();const $=e.querySelector("#prSave");if($.disabled||!O()||!mn(z))return;e.querySelectorAll(".pr-save").forEach(S=>{S.disabled=!0,S.innerHTML=h("refresh","spin")+" Saving…"}),$.disabled=!0,$.textContent="Saving…";const k=R(),v=_e(C),d=JSON.stringify(v)!==V;try{if(!v.length&&(!a||d))throw new Error("Add at least one item with a description");if(a){const S=Object.fromEntries(Object.entries(k).filter(([x,F])=>F!==E[x]));if(Object.keys(S).length||d){const x=await H("update",{id:n.id,updates:S,...d?{items:v}:{}});await M.applyResult(x,{itemsChanged:d}),D("PR updated")}location.hash="#/pr/"+n.id}else{const S=await H("create",{pr:k,items:v});await M.applyResult(S,{itemsChanged:!0}),D("Created "+S.pr.id),location.hash="#/pr/"+S.pr.id}}catch(S){D(S.message,!0),$.disabled=!1,$.textContent=a?"Save changes":"Submit PR",e.querySelectorAll(".pr-save").forEach(x=>{x.disabled=!1,x.textContent=a?"Save changes":"Submit request"})}}}function Rt(e,t,s,a){const n=String(e||"").trim();if(n)return n;const r=String(t||"").trim().toLowerCase(),i=String(s||"").trim().toLowerCase(),c=String(a||"").trim();return r&&i&&r===i&&c?c:Fe(t)}const G=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ye=!1,Tt=null;const At=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(st(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function et(e,t,s){const a=t.prs.find(d=>d.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}Tt!==s&&(ye=!1,Tt=s);const n=t.me||{role:"",email:"",department:""},r=n.role==="admin",i=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),c=["approver","admin","finance"].includes(n.role),f=r||i&&a.status==="Submitted",m=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),b=La(a.status,n.role,i,m),T=(a.department||"").toLowerCase()==="production",q=r&&a.status==="Approved",B=r&&a.poNo&&!a.zohoPoId,C=q?"":b.find(d=>!["Rejected","Cancelled","On Hold"].includes(d)),O=b.filter(d=>d!==C),L=d=>({Approved:"Approve request","In Transit":"Mark in transit",Received:"Mark received",Submitted:"Mark submitted"})[d]||"Mark "+d.toLowerCase(),u=d=>({Approved:"check","In Transit":"truck",Received:"package","On Hold":"pause",Cancelled:"close",Rejected:"close"})[d]||"arrow",A=["Submitted","Approved","Ordered","In Transit","Received"],P=A.indexOf(a.status),g=(t.vendors||[]).find(d=>String(d.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),U=a.paymentTerm||g&&g.paymentTerms||"",ee=t.lists&&t.lists.paymentTerms||[],z=["",...U&&!ee.includes(U)?[U,...ee]:ee].map(d=>`<option value="${o(d)}" ${d===U?"selected":""}>${d?o(d):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash detail-page">
      <div class="crumbs"><a href="#/">Purchase requests</a>${h("right")}<span>${o(a.id)}</span></div>
      <div class="adm-head request-heading">
        <div><div class="request-title"><h1 style="margin:0">${o(a.id)}</h1>${Oe(a.status)}</div>
          <p class="request-subtitle">${o(a.project||a.department||"Purchase request")} · Created ${Q(a.createdAt)}</p>
        </div>
        <div class="request-actions">
          ${q?`<button class="btn primary" id="makePoBtn">${h("file")} Create purchase order</button>`:""}
          ${C?`<button class="btn primary" data-to="${o(C)}">${h(u(C))}${o(L(C))}</button>`:""}
          ${f?`<a class="btn" href="#/new/${o(a.id)}">${h("edit")} Edit</a>`:""}
          ${O.length||B?`<details class="action-menu" id="requestMore">
            <summary class="btn" aria-label="More request actions">${h("more")} More</summary>
            <div class="action-popover"><div class="popover-label">Request actions</div>
              ${B?`<button class="btn" id="zohoPushBtn">${h("arrow")} Send to Zoho Books</button>`:""}
              ${O.map(d=>`<button class="btn ${["Rejected","Cancelled"].includes(d)?"danger":""}" data-to="${o(d)}">${h(u(d))}${o(L(d))}</button>`).join("")}
            </div>
          </details>`:""}
        </div>
      </div>
      <section class="card request-progress" aria-label="Request progress: ${o(a.status)}">
        <div class="progress-label"><b>Request progress</b><span>${P===-1?"Currently "+o(a.status.toLowerCase()):P===4?"Delivery complete":"From request to received"}</span></div>
        <ol class="progress-track">${A.map((d,S)=>`<li class="${S<P?"done":S===P?"current":""}" ${S===P?'aria-current="step"':""}><span class="step-dot">${S<P?h("check"):S+1}</span><span>${o(d)}</span></li>`).join("")}</ol>
      </section>

      ${q&&ye?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(be(a.poDate||new Date().toISOString()))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${z}</select>
          </label>
          ${g&&g.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${o(g.name)}'s vendor record — change it here if this order is different.</div>`:""}
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
          ${G("Department",o(a.department))}
          ${G("Project",o(a.project))}
          ${G("Vendor",o(a.vendor))}
          ${G("Purpose",o(a.purpose))}
          ${G("Priority",o(a.priority))}
          ${G("Payment status",o(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${At("Requested by",Rt(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+Q(a.createdAt))}
          ${a.approverEmail||a.approvedByName?At("Approved by",Rt(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+Q(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card items-card">
        <h2>Requested items <span class="count-badge">${(a.items||[]).length}</span></h2>
        <div class="table-scroll" tabindex="0" role="region" aria-label="Requested items table"><table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${T?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(d=>`<tr>
            <td>${o(d.itemNo)}</td>
            <td class="wrap">${o(d.description)}</td>${T?`<td>${o(d.partNo)}</td>`:""}<td>${o(d.materialType)}</td>
            <td>${o([d.qty,d.unit].filter(Boolean).join(" "))}</td>
            <td>${d.unitPrice?o(ge(a.currency||"INR",Number(d.unitPrice))):"—"}</td>
            <td>${d.lineTotal?o(ge(a.currency||"INR",Number(d.lineTotal))):"—"}</td>
            <td>${d.purchaseLink?`<a href="${o(d.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${d.datasheetDoc?` <a href="${o(d.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${T?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table></div>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(ge(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      </div><aside class="detail-aside" aria-label="Delivery and procurement">
      <div class="card delivery-card">
        <h2>Delivery</h2>
        <div class="pd-body" id="deliveryBody">
        <div class="pd-grid" id="deliveryRead">
          ${G("Expected",Q(a.expectedDate))}
          ${G("Received",Q(a.receivedAt))}
          ${G("Tracking",dn(a))}
          ${G("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${c?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${G("PO reference",[o(a.poNo),Q(a.poDate)].filter(Boolean).join(" · "))}
          ${G("Invoice / order #",[o(a.invoiceNo),Q(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${G("Payment term",o(a.paymentTerm))}
          ${G("Quotation / PI",a.quotationDoc?`<a href="${o(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${G("Zoho Books PO",a.zohoPoNumber?o(a.zohoPoNumber):"")}
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
    </div>`;const R=e.querySelector("#requestMore");e.onclick=d=>{R&&!R.contains(d.target)&&(R.open=!1)},e.onkeydown=d=>{d.key==="Escape"&&(R!=null&&R.open)&&(R.open=!1,R.querySelector("summary").focus())},R==null||R.addEventListener("focusout",d=>{R.contains(d.relatedTarget)||(R.open=!1)}),e.querySelectorAll("[data-to]").forEach(d=>d.onclick=async()=>{const S=d.dataset.to;if((S==="Rejected"||S==="Cancelled")&&!confirm(`Mark ${a.id} as ${S}?`))return;const x=d.innerHTML;e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(F=>{F.disabled=!0}),d.innerHTML=h("refresh","spin")+" Updating…";try{const F=await H("transition",{id:a.id,to:S});D(a.id+" → "+S),await M.applyResult(F)}catch(F){D(F.message,!0),e.querySelectorAll("[data-to], #makePoBtn, #zohoPushBtn").forEach(j=>{j.disabled=!1}),d.innerHTML=x}});const E=e.querySelector("#makePoBtn");E&&(E.onclick=()=>{var d,S;ye=!0,et(e,t,s),Ie((d=e.querySelector("#poForm"))==null?void 0:d.closest(".card")),(S=e.querySelector("[name=poNo]"))==null||S.focus()});const V=e.querySelector("#poCancelBtn");V&&(V.onclick=()=>{ye=!1,et(e,t,s)});const y=e.querySelector("#poForm"),$=y?Wt(y):null;y&&(y.onsubmit=async d=>{if(d.preventDefault(),!$())return;const S=new FormData(y),x=String(S.get("poNo")||"").trim();if(!x)return;const F=y.querySelector('button[type="submit"]');F.disabled=!0;let j;try{j=await H("update",{id:a.id,updates:{poNo:x,poDate:S.get("poDate")||"",paymentTerm:S.get("paymentTerm")||""}});const K=await H("transition",{id:a.id,to:"Ordered"});D(a.id+" → Ordered (PO "+x+")"),ye=!1,await M.applyResult(K)}catch(K){j&&await M.applyResult(j),D(K.message,!0),F.disabled=!1}});const k=e.querySelector("#zohoPushBtn");k&&(k.onclick=async()=>{k.disabled=!0;try{const{pr:d}=await H("zohoPushPo",{id:a.id});D(a.id+" → Zoho Books PO "+d.zohoPoNumber),await M.applyResult({pr:d})}catch(d){D(d.message,!0),k.disabled=!1}});const v=e.querySelector("#devDelete");v&&(v.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){v.disabled=!0;try{const d=await H("delete",{id:a.id});D(a.id+" deleted"),location.hash="#/",await M.applyResult(d)}catch(d){D(d.message,!0),v.disabled=!1}}})}let Pe=null,ne=null,tt="";const bn=["Domestic","International"];function ct(e){return Pe===null&&(Pe=e.vendors||[]),Pe}function gn(e){const t=e.lists&&e.lists.departments||[],s=ct(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const W=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function $n(e,t){const s=ct(e),a=ne&&s.find(r=>r.name.toLowerCase()===ne.toLowerCase());if(a)return Sn(e,a);const n=[...s].sort((r,i)=>r.name.localeCompare(i.name));return`
    <div class="adm-card">
      ${Ue(tt,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
            data-search="${it(r.name,r.displayName,r.category,r.type,(r.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${o(r.name)}</td>
            <td>${(r.departments||[]).map(i=>`<span class="adm-chip on">${o(i)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${o(r.type||"—")}</td>
            <td>${o(r.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${o(r.name)}" title="Remove vendor">
                ${h("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${lt(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${Qt(n.length,n.length)}</span></div>
    </div>`}const Qt=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function Sn(e,t){const s=rt(e.prs,t.name),a=(s.spendTotals.find(([i])=>i==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],r=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(i=>`<option value="${o(i)}" ${i===(t.paymentTerms||"")?"selected":""}>${i?o(i):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${o(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${o(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close">${h("close")}</button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${o(ge("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${gn(e).map(i=>`<button class="adm-chip ${(t.departments||[]).some(f=>f.toLowerCase()===i.toLowerCase())?"on":""}" data-dept="${o(i)}">${o(i)}</button>`).join("")}
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
              ${["",...bn].map(i=>`<option value="${o(i)}" ${i===(t.type||"")?"selected":""}>${i?o(i):"—"}</option>`).join("")}
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
    </div>`}function wn(e,t,s){const a=async(m,b,T)=>{try{const q=await H(m,b);Pe=q.vendors,await M.applyResult(q),D(T),e.isConnected&&s()}catch(q){D(q.message,!0)}};dt(e,{get:()=>tt,set:m=>{tt=m},count:Qt,match:m=>new Set(Vt(ct(t),m).map(b=>b.name))}),e.querySelectorAll(".vRow").forEach(m=>m.onclick=b=>{b.target.closest(".vRm")||(ne=m.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(m=>m.onclick=()=>{confirm(`Remove vendor "${m.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:m.dataset.name},`${m.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const m=e.querySelector("#nvName").value.trim();if(!m){D("Vendor name required",!0);return}ne=m,a("vendorSet",{name:m,updates:{}},`${m} added — fill in the details`)});const r=()=>{ne=null,s()},i=e.querySelector("#vClose");i&&(i.onclick=r);const c=e.querySelector("#vCancel");c&&(c.onclick=r),e.querySelectorAll("#vDepts .adm-chip").forEach(m=>m.onclick=()=>m.classList.toggle("on"));const f=e.querySelector("#vForm");f&&(f.onsubmit=m=>{m.preventDefault();const b={};for(const[q,B]of new FormData(f))b[q]=B.trim();b.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(q=>q.dataset.dept);const T=b.name||ne;a("vendorSet",{name:ne,updates:b},`${T} saved`),ne=T})}function kn(){ne=null}const fe=["admin","approver","finance","requester"],Cn={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},Pt=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let Y="users",ce=null,at="",$e=null,Ee=null,te=!1;const qt={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>$e,set:e=>{$e=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>Ee,set:e=>{Ee=e},seed:e=>e.materialTypes}};function Rn(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%Pt.length;return Pt[t]}const Ge=e=>e[0].toUpperCase()+e.slice(1),Tn={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:`${h("users")} Add User`},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:`${h("plus")} Add Project`},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:`${h("package")} Add Item Type`},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:`${h("vendors")} Add Vendor`}};function le(e,t){if(ce===null){e.innerHTML='<div class="card">Loading users…</div>',H("usersList").then(a=>{ce=a.users,le(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}$e===null&&($e=t.projects||[]),Ee===null&&(Ee=t.materialTypes||[]);const s=Tn[Y];e.innerHTML=`
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
      ${Y==="users"?An(t):Y==="vendors"?$n(t,te):qn(t,qt[Y])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{Y=a.dataset.tab,te=!1,kn(),le(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(te=!te,le(e,t),te){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},Y==="users"?Pn(e,t):Y==="vendors"?wn(e,t,()=>{te=!1,le(e,t)}):Dn(e,t,qt[Y])}function An(e){const t=a=>(fe.includes(a.role)?fe:[a.role,...fe]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(Ge(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!qe(e).includes(a)?[a,...qe(e)]:qe(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        ${h("shield")}
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Ue(at,"Search by name or email…")}
      ${te?`
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
          ${[...ce].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Fe(a.email);return`<tr data-search="${it(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Rn(a.email)}">${o(st(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                ${h("trash")}
              </button>
            </td>
          </tr>`}).join("")}
          ${lt(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${ce.length} of ${ce.length} active members</span>
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
        <p>${Cn[a]}</p>
      </div>`).join("")}
    </div>`}function Pn(e,t){dt(e,{get:()=>at,set:n=>{at=n},count:(n,r)=>`Showing ${n} of ${r} active members`});const s=async(n,r,i)=>{try{const c=await H("userSet",{email:n,...r});ce=c.users,te=!1,await M.applyResult(c),D(i),e.isConnected&&le(e,t)}catch(c){D(c.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),r=e.querySelector("#newRole").value,i=e.querySelector("#newDept").value;s(n,{role:r,department:i},`${n} → ${r}`)})}function qe(e){const t=e.lists&&e.lists.departments||[],s=($e||[]).map(a=>a.department);return[...new Set([...t,...s])]}function qn(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Ue(t.q,`Search ${t.plural} by name or department…`)}
      ${te?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${qe(e).map(a=>`<option value="${o(a)}">${o(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${it(a.department,a[t.key])}">
            <td class="adm-name">${o(a.department)}</td>
            <td>${o(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${o(a.department)}" data-val="${o(a[t.key])}" title="Remove">
                ${h("trash")}
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${lt(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Jt(s.length,s.length,t)}</span>
      </div>
    </div>`}const Jt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function Dn(e,t,s){dt(e,{get:()=>s.q,set:r=>{s.q=r},count:(r,i)=>Jt(r,i,s)});const a=async(r,i,c)=>{try{const f=await H(r,i);s.set(f[s.respKey]),te=!1,await M.applyResult(f),D(c),e.isConnected&&le(e,t)}catch(f){D(f.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const r=e.querySelector("#mpDept").value,i=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:r,[s.key]:i},`${r} / ${i} added`)}),e.querySelectorAll(".mpRm").forEach(r=>r.onclick=()=>{const{dept:i,val:c}=r.dataset;confirm(`Remove "${c}" from ${i}?`)&&a(s.removeRoute,{department:i,[s.key]:c},`${c} removed`)})}const xe={requester:0,approver:1,finance:1,admin:2};function Ln(e,t){if(!t||!e||!e.minRole)return!0;const s=xe[t.role];return s!=null&&s>=xe[e.minRole]}const Xt=document.getElementById("app"),ze={"":{fn:Ft,nav:"Dashboard",icon:"grid"},vendors:{fn:tn,nav:"Vendors",icon:"vendors",minRole:"admin"},insights:{fn:zt,nav:"Insights",icon:"chart",minRole:"approver"},new:{fn,minRole:"requester"},pr:{fn:et},admin:{fn:le,nav:"Admin",icon:"settings",minRole:"admin"}};let oe,Dt=null;function ea(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function Nn(){oe==null||oe.abort(),Xt.innerHTML=`<div class="auth-gate">
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
  </div>`,da(document.getElementById("gsignin"))}function ta(e){const t=document.getElementById("btnRefresh");t&&(t.disabled=e.loading,t.innerHTML=h("refresh",e.loading?"spin":""),t.setAttribute("aria-label",e.loading?"Refreshing data":"Refresh data"));const s=document.getElementById("syncState");s&&(s.classList.toggle("sync-error",!!e.err),s.textContent=e.loading?"Syncing…":e.err?"Sync failed":e.lastSync?"Up to date":"Connecting…",s.title=e.err||(e.lastSync?"Last full refresh: "+new Date(e.lastSync).toLocaleTimeString():""))}function aa(){var y,$,k;const e=M.get(),{name:t,param:s}=ea(),a=ze[t]||ze[""],n=((y=e.me)==null?void 0:y.role)||"";if(e.me&&!Ln(a,e.me)){location.hash="#/";return}oe==null||oe.abort(),oe=new AbortController;const r=oe.signal,i=Object.entries(ze).filter(([,v])=>v.nav&&(!v.minRole||xe[n]>=xe[v.minRole])).map(([v,d])=>`<a href="#/${v}" ${t===v?'aria-current="page"':""} class="${t===v?"active":""}">${h(d.icon)}<span>${d.nav}</span>${t===v?'<span class="nav-dot"></span>':""}</a>`).join(""),c=e.notifications||[],f=c.filter(v=>!v.readAt).length,m=ra()||{},b=m.email||(($=e.me)==null?void 0:$.email)||"",T=m.name||Fe(b),q=m.picture?`<img class="avatar" src="${o(m.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(st(T))}</span>`,B=a.nav||(t==="new"?s?"Edit request":"New request":"Purchase request");document.title=B+" · Oizom Procurement",Xt.innerHTML=`<div class="app-shell" id="shell">
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
        <div class="topbar-breadcrumb">Workspace ${h("right")} <b>${o(B)}</b></div>
        <div class="topbar-tools">
          <span class="sync-state" id="syncState" role="status"></span>
          <button class="iconbtn" id="btnRefresh" title="Refresh data" aria-label="Refresh data">${h("refresh")}</button>
          <div class="nbell">
            <button class="iconbtn" id="nBtn" title="Notifications" aria-label="Notifications${f?", "+f+" unread":""}" aria-expanded="false" aria-controls="nPanel">${h("bell")}${f?`<span class="nbadge">${f>9?"9+":f}</span>`:""}</button>
            <section class="npanel" id="nPanel" aria-label="Notifications" hidden>
              <div class="popover-title">Notifications <span>${f?f+" new":"All caught up"}</span></div>
              ${c.length?c.map(v=>`<${v.prId?"a":"div"} class="nitem ${v.readAt?"":"unread"}" ${v.prId?`href="#/pr/${o(v.prId)}"`:""}><div class="nmsg">${o(v.message)}</div><div class="ntime">${o(String(v.ts).slice(0,16).replace("T"," "))}</div></${v.prId?"a":"div"}>`).join(""):`<div class="nempty">${h("bell")}<b>You're all caught up</b><span>Updates on your requests will appear here.</span></div>`}
            </section>
          </div>
          <div class="profile-wrap">
            <button class="profile" id="profileBtn" aria-expanded="false" aria-controls="pMenu">${q}<span class="profile-copy"><span class="pname">${o(T)}</span><span class="prole">${o(n||"Oizom team")}</span></span>${h("down")}</button>
            <div class="pmenu" id="pMenu" hidden><div class="pmail">${o(b)}</div><button class="btn" id="btnOut">${h("logout")} Sign out</button></div>
          </div>
        </div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <footer class="workspace-footer">Oizom Procurement<span>Clarity at every step.</span></footer>
    </div>
  </div>`,ta(e),document.getElementById("btnRefresh").onclick=async()=>{await M.refresh(),M.get().err||D("Data refreshed")};const C=document.getElementById("nPanel"),O=document.getElementById("nBtn"),L=document.getElementById("pMenu"),u=document.getElementById("profileBtn"),A=()=>{C.hidden=L.hidden=!0,O.setAttribute("aria-expanded","false"),u.setAttribute("aria-expanded","false")};O.onclick=()=>{var d;const v=C.hidden;A(),C.hidden=!v,O.setAttribute("aria-expanded",String(v)),v&&f&&(c.forEach(S=>{S.readAt||(S.readAt="now")}),(d=document.querySelector(".nbadge"))==null||d.remove(),H("notifRead").catch(()=>{}))},u.onclick=()=>{const v=L.hidden;A(),L.hidden=!v,u.setAttribute("aria-expanded",String(v))},document.getElementById("btnOut").onclick=ia,document.addEventListener("click",v=>{v.target.closest(".nbell, .profile-wrap")||A()},{signal:r});const P=document.getElementById("sidebar"),g=document.getElementById("workspace"),U=document.getElementById("openNav"),ee=document.getElementById("shell"),z=matchMedia("(max-width: 960px)");let R=!1;const E=(v,d=!0)=>{var S;R=z.matches&&v,ee.classList.toggle("nav-open",R),P.inert=z.matches&&!R,g.inert=R,document.getElementById("navBackdrop").hidden=!R,U.setAttribute("aria-expanded",String(R)),document.body.classList.toggle("nav-locked",R),R?(S=P.querySelector("nav a"))==null||S.focus():d&&z.matches&&U.focus()};E(!1,!1),U.onclick=()=>E(!0),document.getElementById("closeNav").onclick=()=>E(!1),document.getElementById("navBackdrop").onclick=()=>E(!1),P.querySelectorAll("a").forEach(v=>v.addEventListener("click",()=>E(!1),{signal:r})),z.addEventListener("change",()=>E(!1,!1),{signal:r}),document.addEventListener("keydown",v=>{if(v.key==="Escape"&&(R?E(!1):C.hidden?L.hidden||(A(),u.focus()):(A(),O.focus())),v.key==="Tab"&&R){const d=[...P.querySelectorAll("a, button")],S=d[0],x=d[d.length-1];v.shiftKey&&document.activeElement===S?(v.preventDefault(),x.focus()):!v.shiftKey&&document.activeElement===x&&(v.preventDefault(),S.focus())}},{signal:r});const V=document.getElementById("view");if(document.querySelector(".skip-link").onclick=v=>{v.preventDefault(),V.focus()},!e.lastSync)V.innerHTML=e.err?`<div class="connection-state">${h("info")}<h1>We couldn't load your workspace</h1><p>${o(e.err)}</p><button class="btn primary" id="retryLoad">Try again</button></div>`:`<div class="loading-workspace" role="status" aria-label="Loading workspace"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-subtitle"></div><div class="loading-tiles">${'<div class="skeleton"></div>'.repeat(4)}</div><div class="skeleton skeleton-table"></div><p>Getting your workspace ready…</p></div>`,(k=document.getElementById("retryLoad"))==null||k.addEventListener("click",()=>M.refresh(),{signal:r});else{a.fn(V,e,s);const v=t+"/"+(s||"");Dt!==v&&sa(V),Dt=v}}window.addEventListener("hashchange",()=>{aa(),window.scrollTo({top:0,behavior:"instant"})});let Lt="",Nt=!1;M.subscribe(e=>{e.err&&e.err!==Lt&&D(e.err,!0),Lt=e.err;const t=!Nt&&e.lastSync;if(t&&(Nt=!0),e.lastSync&&(e.loading||e.err)||ea().name==="new"&&!t&&e.lastSync){ta(e);return}aa()});la(()=>M.refresh());Be()||Nn();
