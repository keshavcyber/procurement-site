(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const pt={APP_URL:"https://script.google.com/macros/s/AKfycby5ZM_xx3GisD_5tBWM9USmVoqKf7nC-6zh7fVZAS6HuBT5gr-TtMOGJNqSmtTsNrc/exec",CLIENT_ID:"975636156405-6b56sp8duaqmjg54tnqqhahiioseokqn.apps.googleusercontent.com"},ve="oizom-id-token";let ze=null;function At(e){try{return JSON.parse(atob(e.split(".")[1])).exp*1e3}catch{return 0}}function ge(){const e=localStorage.getItem(ve);return e?At(e)<Date.now()+3e4?(localStorage.removeItem(ve),null):e:null}function Nt(){const e=ge();if(!e)return null;try{const t=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=JSON.parse(decodeURIComponent(escape(atob(t))));return{email:s.email||"",name:s.name||"",picture:s.picture||""}}catch{return null}}function Lt(){localStorage.removeItem(ve),window.google&&google.accounts&&google.accounts.id.disableAutoSelect(),location.reload()}function qt(e){if(ze=e,ge()){e();return}Ee(()=>{google.accounts.id.initialize({client_id:pt.CLIENT_ID,hd:"oizom.com",auto_select:!0,callback:t=>{localStorage.setItem(ve,t.credential),ze()}}),google.accounts.id.prompt()})}function Ee(e,t=0){if(window.google&&google.accounts)return e();if(t>100){console.error("Google Identity Services failed to load");return}setTimeout(()=>Ee(e,t+1),100)}function xt(e){Ee(()=>{google.accounts.id.renderButton(e,{theme:"filled_blue",size:"large",width:280})})}class Re extends Error{}async function q(e,t={}){const s=ge();if(!s)throw new Re("SIGNED_OUT");const a=await fetch(pt.APP_URL,{method:"POST",body:JSON.stringify({action:e,token:s,...t})});if(!a.ok)throw new Re("HTTP "+a.status);const n=await a.json();if(!n.ok)throw new Re(n.error||"Request failed");return n}function It(e,t){const s=Number(e),a=Number(t);return e===""||e==null||t===""||t==null||!isFinite(s)||!isFinite(a)?"":Math.round(s*a*100)/100}function Et(e){let t=0,s=!1;for(const a of e){const n=Number(a.lineTotal);a.lineTotal!==""&&a.lineTotal!=null&&isFinite(n)&&(t+=n,s=!0)}return s?Math.round(t*100)/100:""}function Bt(e){if(!e.length)return"";const t=e[0].description||"";return e.length>1?`${t} (+${e.length-1} more)`:t}function Ft(e){return e.length?e.length===1?[e[0].qty,e[0].unit].filter(Boolean).join(" "):e.length+" items":""}function Mt(e,t){const s={};for(const a of t)(s[a.prId]=s[a.prId]||[]).push(a);for(const a in s)s[a].sort((n,i)=>Number(n.itemNo)-Number(i.itemNo));return e.map(a=>{const n=s[a.id]||[];return{...a,items:n,amount:a.totalAmount,item:Bt(n),qty:Ft(n)}})}let Y={prs:[],lists:{},vendors:[],projects:[],materialTypes:[],notifications:[],me:null,lastSync:null,err:"",loading:!1};const Ce=new Set;let Ge=!1;function _e(){Ce.forEach(e=>e(Y))}const B={get:()=>Y,subscribe(e){return Ce.add(e),()=>Ce.delete(e)},async refresh(){Y={...Y,loading:!0},_e();try{const e=await q("list");Ge=!0,Y={prs:Mt(e.prs,e.items||[]),lists:e.lists||{},vendors:e.vendors||[],projects:e.projects||[],materialTypes:e.materialTypes||[],notifications:e.notifications||[],me:e.me,lastSync:new Date,err:"",loading:!1}}catch(e){if(e.message==="SIGNED_OUT"&&Ge){location.reload();return}Y={...Y,err:e.message,loading:!1}}_e()}},o=e=>e==null?"":String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function $e(e){return`<span class="chip ${o(e)}" data-s="${o(e)}">${o(e)}</span>`}function T(e,t=!1){document.querySelectorAll(".toast").forEach(a=>a.remove());const s=document.createElement("div");s.className="toast"+(t?" err":""),s.innerHTML=`
    <span class="t-ico material-symbols-outlined">${t?"error":"check_circle"}</span>
    <div class="t-body">
      <div class="t-title">${t?"Error":"Success"}</div>
      <div class="t-msg"></div>
    </div>
    <button class="t-close" aria-label="Dismiss">&times;</button>`,s.querySelector(".t-msg").textContent=e,s.querySelector(".t-close").onclick=()=>s.remove(),document.body.appendChild(s),setTimeout(()=>s.remove(),t?6e3:4e3)}const j=e=>e?o(String(e).slice(0,10)):"—";function Se(e){return String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean).map(s=>s[0].toUpperCase()+s.slice(1)).join(" ")||e}function Be(e){const t=String(e||"").split("@")[0].split(/[._-]+/).filter(Boolean);return((t[0]||"u")[0]+(t[1]?t[1][0]:"")).toUpperCase()}const Ve={INR:"₹",USD:"$",GBP:"£",EUR:"€",JPY:"¥",CNY:"¥",AED:"د.إ ",SGD:"S$",AUD:"A$",CAD:"C$",CHF:"CHF ",Unknown:""},me=e=>Ve[e]!=null?Ve[e]:e+" ";function se(e,t){const s=e==="INR"?"en-IN":"en-US";return me(e)+Number(t).toLocaleString(s,{maximumFractionDigits:2})}function M(e,t){return e==="INR"?t>=1e7?"₹"+(t/1e7).toFixed(2)+" Cr":t>=1e5?"₹"+(t/1e5).toFixed(1)+"L":"₹"+Math.round(t).toLocaleString("en-IN"):t>=1e6?me(e)+(t/1e6).toFixed(2)+"M":t>=1e3?me(e)+(t/1e3).toFixed(1)+"K":me(e)+Math.round(t).toLocaleString("en-US")}const ie=["Cancelled","Rejected"],Ot=["Ordered","In Transit","Received"],we=e=>Ot.includes(e.status)&&e.paymentStatus!=="Paid";function Ze(e){const t={};for(const s of e){const a=Number(s.amount);if(!s.amount||!isFinite(a))continue;const n=s.currency||"Unknown";t[n]=(t[n]||0)+a}return Object.entries(t).sort((s,a)=>a[1]-s[1])}function jt(e){const t=e.filter(n=>!ie.includes(n.status)),s=e.filter(we),a=e.filter(n=>n.status==="Received").length;return{total:e.length,pending:e.filter(n=>n.status==="Submitted").length,unpaidCount:s.length,unpaidTotals:Ze(s),inTransit:e.filter(n=>n.status==="In Transit").length,received:a,receivedPct:Math.round(a/(e.length||1)*100),spendTotals:Ze(t)}}const Pe={total:()=>!0,pending:e=>e.status==="Submitted",unpaid:we,transit:e=>e.status==="In Transit",received:e=>e.status==="Received",spend:e=>!ie.includes(e.status)};function Ut(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.requesterEmail||"").toLowerCase()===s)}function Ye(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.approverEmail||"").toLowerCase()===s&&s&&a.status!=="Rejected")}function vt(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.department||"").toLowerCase()===s)}function Ht(e){return e.filter(we)}function Kt(e){const t={};for(const s of e){const a=String(s.approverEmail||"").toLowerCase();!a||s.status==="Rejected"||(t[a]=(t[a]||0)+1)}return Object.entries(t).map(([s,a])=>({email:s,count:a})).sort((s,a)=>a.count-s.count||s.email.localeCompare(a.email))}function zt(e){return[...new Set(e.filter(t=>t.amount&&isFinite(Number(t.amount))).map(t=>t.currency||"Unknown"))].sort()}function We(e,t,s){const a={};for(const n of e){const i=String(n.createdAt||"").slice(0,7);if(!/^\d{4}-\d{2}$/.test(i))continue;let r;if(t==="count")r=1;else{if(ie.includes(n.status)||t==="unpaid"&&n.paymentStatus!=="Unpaid")continue;const m=Number(n.amount);if(!n.amount||!isFinite(m)||(n.currency||"Unknown")!==s)continue;r=m}a[i]=(a[i]||0)+r}return Object.keys(a).sort().map(n=>({month:n,value:a[n]}))}function Gt(e,t){const s={};for(const a of e){if(ie.includes(a.status)||(a.currency||"Unknown")!==t)continue;const n=Number(a.amount);if(!a.amount||!isFinite(n))continue;const i=a.department||"Unassigned";s[i]=(s[i]||0)+n}return Object.entries(s).map(([a,n])=>({department:a,total:n})).sort((a,n)=>n.total-a.total)}function _t(e,t,s=6){const a={};for(const r of e){if(ie.includes(r.status)||(r.currency||"Unknown")!==t)continue;const m=Number(r.amount);if(!r.amount||!isFinite(m))continue;const y=r.vendor||"Unspecified";a[y]=(a[y]||0)+m}const n=Object.entries(a).map(([r,m])=>({vendor:r,total:m})).sort((r,m)=>m.total-r.total);if(n.length<=s)return n;const i=n.slice(s).reduce((r,m)=>r+m.total,0);return[...n.slice(0,s),{vendor:"Other",total:i}]}function Vt(e){const t={};for(const s of e)t[s.status]=(t[s.status]||0)+1;return t}function Zt(e){const t=(i,r)=>{const m=Date.parse(i),y=Date.parse(r);return isFinite(m)&&isFinite(y)?(y-m)/864e5:null},s=i=>i.length?i.reduce((r,m)=>r+m,0)/i.length:null,a=e.map(i=>i.createdAt&&i.approvedAt?t(i.createdAt,i.approvedAt):null).filter(i=>i!=null&&i>=0),n=e.map(i=>i.poDate&&i.receivedAt?t(i.poDate,i.receivedAt):null).filter(i=>i!=null&&i>=0);return{avgApprovalDays:s(a),approvalSamples:a.length,avgDeliveryDays:s(n),deliverySamples:n.length}}const Yt=[{key:"0-7",label:"0–7 days",min:0,max:7},{key:"8-14",label:"8–14 days",min:8,max:14},{key:"15-30",label:"15–30 days",min:15,max:30},{key:"30+",label:"30+ days",min:31,max:1/0}];function Wt(e,t=Date.now()){const s=Yt.map(a=>({...a,count:0}));return e.filter(we).forEach(a=>{const n=Date.parse(a.poDate||a.updatedAt||a.createdAt);if(!isFinite(n))return;const i=(t-n)/864e5;(s.find(r=>i>=r.min&&i<=r.max)||s[s.length-1]).count++}),s}const Ae=["Submitted","Approved","Rejected","Ordered","In Transit","Received","Cancelled","On Hold"],yt=["Unpaid","Paid","Partially Paid","FOC / Free"],ye={Submitted:{Approved:["admin","approver:dept"],Rejected:["admin","approver:dept"],Cancelled:["admin","requester:own"],"On Hold":["admin"]},Approved:{Ordered:["admin"],Cancelled:["admin"],"On Hold":["admin"],Rejected:["admin"],Submitted:["admin"]},Ordered:{"In Transit":["admin"],Received:["admin"],Cancelled:["admin"],"On Hold":["admin"]},"In Transit":{Received:["admin"],"On Hold":["admin"]},"On Hold":{Submitted:["admin"],Approved:["admin"],Ordered:["admin"],Cancelled:["admin"]},Rejected:{Submitted:["admin","requester:own"],Approved:["admin"]},Received:{},Cancelled:{}};function Qt(e,t,s,a,n){const i=(ye[e]||{})[t];return i?i.some(r=>r==="requester:own"?s==="requester"&&a:r==="approver:dept"?s==="approver"&&n:r===s):!1}function Jt(e,t,s,a){return Object.keys(ye[e]||{}).filter(n=>Qt(e,n,t,s,a))}function Xt(e,t){return!!(ye[e]&&ye[e][t])}const ea=["Submitted","Approved","Rejected"],g={sel:"total",tab:"mine",filters:{q:"",dept:"",vendor:"",status:"",from:"",to:""}};function de(e,t){const s=document.activeElement,a=s&&e.contains(s)&&s.id?{id:s.id,start:s.selectionStart,end:s.selectionEnd}:null;if(ht(e,t),!a)return;const n=e.querySelector("#"+a.id);if(n&&(n.focus(),a.start!=null&&typeof n.setSelectionRange=="function"))try{n.setSelectionRange(a.start,a.end)}catch{}}const Qe=e=>String(e||"").slice(0,10);function ta(e){const t=g.filters;return!(t.dept&&e.department!==t.dept||t.vendor&&e.vendor!==t.vendor||t.status&&e.status!==t.status||t.from&&Qe(e.createdAt)<t.from||t.to&&Qe(e.createdAt)>t.to||t.q&&!`${e.id} ${e.item} ${e.vendor} ${e.department}`.toLowerCase().includes(t.q.trim().toLowerCase()))}function ht(e,t){e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p>Your purchase requests at a glance — cards filter the list below.</p>
        </div>
        <a class="adm-addbtn" href="#/new">
          <span class="material-symbols-outlined" style="font-size:20px">add</span>
          New PR
        </a>
      </div>
      <div id="tabBody"></div>
    </div>`,aa(e.querySelector("#tabBody"),e,t)}const J=e=>e.length?e.map(([t,s])=>M(t,s)).join(" + "):"—";function aa(e,t,s){const a=s.me||{role:"",email:"",department:""},n=a.role==="approver",i=a.role==="admin",r=a.role==="finance",m=n?["mine","dept","approved"]:i?["mine","all"]:r?["mine","payments"]:["mine"];m.includes(g.tab)||(g.tab="mine");const y=g.tab==="dept",c=g.tab==="approved",v=g.tab==="all",S=g.tab==="payments",w=Ut(s.prs,a.email),C=n?Ye(s.prs,a.email):[],h=n?vt(s.prs,a.department):[],R=r?Ht(s.prs):[],P=y?h:c?C:v?s.prs:S?R:w,u=jt(P),k=S?[{key:"total",n:u.total,l:"Awaiting payment",s:J(u.unpaidTotals)},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?M(...u.spendTotals[0]):"—",l:"Total value",s:u.spendTotals.length>1?"+ "+J(u.spendTotals.slice(1)):""}]:y?[{key:"total",n:u.total,l:"Department PRs",s:a.department?"in "+a.department:""},{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting decision",cls:"warn"},{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:J(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?M(...u.spendTotals[0]):"—",l:"Total spend",s:u.spendTotals.length>1?"+ "+J(u.spendTotals.slice(1)):""}]:[{key:"total",n:u.total,l:c?"Approved PRs":v?"All PRs":"Total PRs",s:c?"across all requesters":v?"every department":""},...c?[]:[{key:"pending",n:u.pending,l:"Pending approval",s:"awaiting approver",cls:"warn"}],{key:"unpaid",n:u.unpaidCount,l:"Unpaid",s:J(u.unpaidTotals),cls:"bad"},{key:"transit",n:u.inTransit,l:"In transit",s:"trackable shipments",cls:"warn"},{key:"received",n:u.receivedPct+"%",l:"Received",s:u.received+" of "+u.total,cls:"go"},{key:"spend",n:u.spendTotals.length?M(...u.spendTotals[0]):"—",l:c?"Approved spend":"Total spend",s:u.spendTotals.length>1?"+ "+J(u.spendTotals.slice(1)):""}];if(v)for(const d of Kt(s.prs))k.push({key:"ap:"+d.email,n:d.count,l:"Approved by "+Se(d.email),s:d.email,cls:"go"});k.some(d=>d.key===g.sel)||(g.sel="total");const U=(g.sel.startsWith("ap:")?Ye(s.prs,g.sel.slice(3)):P.filter(Pe[g.sel])).sort((d,$)=>($.createdAt||"").localeCompare(d.createdAt||"")),f=k.find(d=>d.key===g.sel),E=[...new Set(P.map(d=>d.department).filter(Boolean))].sort(),p=[...new Set(P.map(d=>d.vendor).filter(Boolean))].sort();g.filters.dept&&!E.includes(g.filters.dept)&&(g.filters.dept=""),g.filters.vendor&&!p.includes(g.filters.vendor)&&(g.filters.vendor="");const l=U.filter(ta),b=Object.values(g.filters).some(Boolean),D=d=>String(d.department||"").toLowerCase()===String(a.department||"").toLowerCase(),A=d=>{const $=i?Ae:n&&d.status==="Submitted"&&D(d)?ea:null;return $?`<select class="status-sel" data-id="${o(d.id)}">${$.map(N=>`<option ${N===d.status?"selected":""}>${o(N)}</option>`).join("")}</select>`:$e(d.status)},G=d=>`<select class="pay-sel" data-id="${o(d.id)}">${yt.map($=>`<option ${$===d.paymentStatus?"selected":""}>${o($)}</option>`).join("")}</select>`;e.innerHTML=`
    ${m.length>1?`
    <div class="adm-tabs">
      <button class="adm-tab ${g.tab==="mine"?"active":""}" data-tab="mine">Your PRs</button>
      ${n?`<button class="adm-tab ${y?"active":""}" data-tab="dept">${o(a.department||"Your dept")} · ${h.length}</button>`:""}
      ${n?`<button class="adm-tab ${c?"active":""}" data-tab="approved">Approved by you · ${C.length}</button>`:""}
      ${i?`<button class="adm-tab ${v?"active":""}" data-tab="all">All PRs · ${s.prs.length}</button>`:""}
      ${r?`<button class="adm-tab ${S?"active":""}" data-tab="payments">Awaiting payment · ${R.length}</button>`:""}
    </div>`:""}
    <div class="kpis">${k.map(d=>`
      <div class="kpi clickable ${d.cls||""} ${d.key===g.sel?"sel":""}" data-key="${o(d.key)}">
        <div class="v">${o(String(d.n))}</div><div class="l">${o(d.l)}</div><div class="s">${o(d.s)}</div>
      </div>`).join("")}
    </div>
    <div class="card">
      <h2>${o(f.l)} · ${l.length}</h2>
      <div class="filters">
        <input id="dashQ" type="search" autocomplete="off" spellcheck="false"
               placeholder="Search ID, item, vendor…" value="${o(g.filters.q)}">
        <select id="dashDept">
          <option value="">All departments</option>
          ${E.map(d=>`<option value="${o(d)}" ${g.filters.dept===d?"selected":""}>${o(d)}</option>`).join("")}
        </select>
        <select id="dashVendor">
          <option value="">All vendors</option>
          ${p.map(d=>`<option value="${o(d)}" ${g.filters.vendor===d?"selected":""}>${o(d)}</option>`).join("")}
        </select>
        <select id="dashStatus">
          <option value="">All statuses</option>
          ${Ae.map(d=>`<option value="${o(d)}" ${g.filters.status===d?"selected":""}>${o(d)}</option>`).join("")}
        </select>
        <input id="dashFrom" type="date" title="From date" value="${o(g.filters.from)}">
        <input id="dashTo" type="date" title="To date" value="${o(g.filters.to)}">
        ${b?'<button type="button" class="btn" id="dashFilterClear">Clear filters</button>':""}
      </div>
      <table class="tbl"><thead><tr>
        ${S?"<th>ID</th><th>Date</th><th>Vendor</th><th>PO #</th><th>Payment term</th><th>Amount</th><th>Payment status</th>":"<th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Vendor</th><th>Amount</th><th>Status</th>"}
      </tr></thead><tbody>
        ${l.map(d=>S?`<tr class="rowlink" data-id="${o(d.id)}">
          <td style="font-family:var(--mono);font-size:12px">${o(d.id)}</td>
          <td>${j(d.createdAt)}</td><td>${o(d.vendor)}</td>
          <td style="font-family:var(--mono);font-size:12px">${d.poNo?o(d.poNo):"—"}</td>
          <td>${d.paymentTerm?o(d.paymentTerm):"—"}</td>
          <td>${d.amount?o(M(d.currency||"INR",Number(d.amount))):"—"}</td>
          <td>${G(d)}</td>
        </tr>`:`<tr class="rowlink" data-id="${o(d.id)}">
          <td style="font-family:var(--mono);font-size:12px">${o(d.id)}</td>
          <td>${j(d.createdAt)}</td><td>${o(d.department)}</td>
          <td class="wrap">${o(d.item)}</td><td>${o(d.vendor)}</td>
          <td>${d.amount?o(M(d.currency||"INR",Number(d.amount))):"—"}</td>
          <td>${A(d)}</td>
        </tr>`).join("")||'<tr><td colspan="7" style="color:var(--mut)">No PRs match these filters.</td></tr>'}
      </tbody></table>
    </div>`,e.querySelectorAll(".adm-tab").forEach(d=>d.onclick=()=>{g.tab=d.dataset.tab,g.sel="total",de(t,s)}),e.querySelectorAll(".kpi.clickable").forEach(d=>d.onclick=()=>{g.sel=d.dataset.key,de(t,s)}),e.querySelectorAll("tr.rowlink").forEach(d=>d.onclick=()=>location.hash="#/pr/"+d.dataset.id);const _=(d,$)=>{g.filters[d]=$,de(t,s)};e.querySelector("#dashQ").oninput=d=>_("q",d.target.value),e.querySelector("#dashDept").onchange=d=>_("dept",d.target.value),e.querySelector("#dashVendor").onchange=d=>_("vendor",d.target.value),e.querySelector("#dashStatus").onchange=d=>_("status",d.target.value),e.querySelector("#dashFrom").onchange=d=>_("from",d.target.value),e.querySelector("#dashTo").onchange=d=>_("to",d.target.value);const ee=e.querySelector("#dashFilterClear");ee&&(ee.onclick=()=>{g.filters={q:"",dept:"",vendor:"",status:"",from:"",to:""},de(t,s)}),e.querySelectorAll(".status-sel").forEach(d=>{d.onclick=$=>$.stopPropagation(),d.onchange=async()=>{const $=d.dataset.id,N=s.prs.find(H=>H.id===$),x=d.value;if(!(!N||x===N.status)){if((x==="Rejected"||x==="Cancelled")&&!confirm(`Mark ${$} as ${x}?`)){d.value=N.status;return}d.disabled=!0;try{a.role==="admin"&&!Xt(N.status,x)?await q("update",{id:$,updates:{status:x}}):await q("transition",{id:$,to:x}),T(`${$} → ${x}`),B.refresh()}catch(H){T(H.message,!0),d.value=N.status,d.disabled=!1}}}}),e.querySelectorAll(".pay-sel").forEach(d=>{d.onclick=$=>$.stopPropagation(),d.onchange=async()=>{const $=d.dataset.id,N=s.prs.find(H=>H.id===$),x=d.value;if(!(!N||x===N.paymentStatus)){d.disabled=!0;try{await q("update",{id:$,updates:{paymentStatus:x}}),T(`${$} payment → ${x}`),B.refresh()}catch(H){T(H.message,!0),d.value=N.paymentStatus,d.disabled=!1}}}})}function Fe(e,t){const s=String(t||"").toLowerCase();return e.filter(a=>String(a.vendor||"").toLowerCase()===s)}function Me(e,t){const s=Fe(e,t),a=s.filter(Pe.spend),n={};for(const i of a){const r=Number(i.amount);if(!i.amount||!isFinite(r))continue;const m=i.currency||"INR";n[m]=(n[m]||0)+r}return{count:s.length,spendTotals:Object.entries(n).sort((i,r)=>r[1]-i[1]),unpaid:s.filter(Pe.unpaid).length,lastOrder:s.reduce((i,r)=>{const m=String(r.createdAt||"");return/^\d{4}-\d{2}-\d{2}/.test(m)&&m>i?m:i},"")}}function ft(e,t){if(e.type==="Domestic")return"Domestic";if(e.type==="International")return"Foreign";const s=new Set(Fe(t,e.name).filter(i=>i.amount&&isFinite(Number(i.amount))).map(i=>i.currency||"INR"));if(!s.size)return"";const a=s.has("INR"),n=[...s].some(i=>i!=="INR");return a&&n?"Mixed":n?"Foreign":"Domestic"}const na=[{key:"name",weight:3},{key:"displayName",weight:3},{key:"category",weight:2},{key:"type",weight:2},{key:"departments",weight:2},{key:"contactPerson",weight:1},{key:"address",weight:1},{key:"paymentTerms",weight:1},{key:"notes",weight:1}],sa={sensor:["pm","gas","module","electrochemical","particulate"],sensors:["pm","gas","module","electrochemical","particulate"],fab:["fabrication","enclosure","sheet metal","machining"],fabrication:["enclosure","sheet metal","machining"],enclosure:["fabrication","sheet metal","machining"],calibration:["nabl","certification","testing"],certification:["nabl","calibration","testing"],electronics:["components","distributor","semiconductor"],components:["electronics","distributor","semiconductor"],local:["india","domestic"],domestic:["india","local"],foreign:["international","import"],import:["international","foreign"]},oa=1,ia=.7,bt=.5,ra=.4,da=.3,la=4,ca=e=>e.length>=7?2:e.length>=la?1:0,he=e=>String(e??"").toLowerCase().trim();function ma(e,t){const s=e[t];return he(Array.isArray(s)?s.join(" "):s)}function gt(e){return he(e).split(/[\s,]+/).filter(Boolean)}function ua(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 99;let s=Array.from({length:t.length+1},(a,n)=>n);for(let a=1;a<=e.length;a++){const n=[a];for(let i=1;i<=t.length;i++)n[i]=Math.min(s[i]+1,n[i-1]+1,s[i-1]+(e[a-1]===t[i-1]?0:1));s=n}return s[t.length]}function Je(e,t){if(!e||!t)return 0;const s=e.split(/[^a-z0-9]+/).filter(Boolean);if(s.includes(t))return oa;if(s.some(n=>n.startsWith(t)))return ia;if(e.includes(t))return bt;const a=ca(t);return a&&s.some(n=>ua(n,t)<=a)?da:0}function pa(e,t){const s=Je(e,t);if(s)return s;const a=sa[t];return a&&a.some(i=>i.includes(" ")?e.includes(i):Je(e,i)>=bt)?ra:0}function va(e,t){const s=Array.isArray(t)?t:gt(t);if(!s.length)return 0;let a=0;for(const n of s){let i=0;for(const{key:r,weight:m}of na)i=Math.max(i,pa(ma(e,r),n)*m);if(!i)return 0;a+=i}return a}function $t(e,t){const s=gt(t);return s.length?(e||[]).map(a=>({v:a,score:va(a,s)})).filter(a=>a.score>0).sort((a,n)=>n.score-a.score||he(a.v.displayName||a.v.name).localeCompare(he(n.v.displayName||n.v.name))).map(a=>a.v):[...e||[]]}function Te(e,t,s="admSearch"){return`
    <div class="adm-toolbar">
      <div class="adm-search">
        <span class="material-symbols-outlined">search</span>
        <input id="${s}" type="search" autocomplete="off" spellcheck="false"
               placeholder="${o(t)}" value="${o(e)}">
        <button type="button" class="admSearchClear" title="Clear search" ${e?"":"hidden"}>
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>`}const Oe=(...e)=>o(e.filter(Boolean).join(" ").toLowerCase());function je(e,t){return`<tr class="adm-nomatch" hidden><td colspan="${e}" style="color:var(--adm-on-var)">${o(t)}</td></tr>`}function Ue(e,{get:t,set:s,count:a,id:n="admSearch",match:i=null}){const r=e.querySelector("#"+n);if(!r)return;const m=r.closest(".adm-card"),y=m.querySelector(".admSearchClear"),c=()=>ya(m,t(),a,i);r.oninput=()=>{s(r.value),y.hidden=!r.value,c()},r.onkeydown=v=>{v.key==="Escape"&&r.value&&(r.value="",r.oninput())},y.onclick=()=>{r.value="",r.oninput(),r.focus()},c()}function ya(e,t,s,a){const n=t.trim().toLowerCase(),i=[...e.querySelectorAll("tbody tr[data-search]")],r=n&&a?a(n):null;let m=null;i.forEach(v=>{v.hidden=n?r?!r.has(v.dataset.name):!v.dataset.search.includes(n):!1,v.classList.remove("last-visible"),v.hidden||(m=v)}),m&&m.classList.add("last-visible");const y=e.querySelector(".adm-nomatch");y&&(y.hidden=!!m||!i.length);const c=e.querySelector(".adm-count");c&&(c.textContent=s(i.filter(v=>!v.hidden).length,i.length))}let te="";const St={Domestic:"dom",Foreign:"for",Mixed:"mix"},ha=e=>String(e||"").split(/\s+/).filter(Boolean).slice(0,2).map(t=>t[0]).join("").toUpperCase()||"?";function wt(e){let t=e.logoUrl||"";if(!t&&e.website){const s=String(e.website).replace(/^https?:\/\//,"").split("/")[0];s&&(t=`https://www.google.com/s2/favicons?domain=${encodeURIComponent(s)}&sz=64`)}return`<span class="vc-logo">${o(ha(e.displayName||e.name))}${t?`<img src="${o(t)}" alt="" loading="lazy" onerror="this.remove()">`:""}</span>`}function fa(e){const t=[...e.bankName?[{t:e.bankName,cls:"bank"}]:[],...(e.departments||[]).map(n=>({t:n,cls:""}))],s=t.slice(0,3),a=t.length-s.length;return s.map(n=>`<span class="vc-chip ${n.cls}">${o(n.t)}</span>`).join("")+(a>0?`<span class="vc-chip more">+${a} more</span>`:"")}function ba(e,t){const s=Me(e.prs,t.name),a=ft(t,e.prs),n=s.spendTotals.length?M(...s.spendTotals[0])+(s.spendTotals.length>1?" +":""):"—";return`
    <div class="vcard" data-name="${o(t.name)}">
      <div class="vc-top">
        ${wt(t)}
        <div class="vc-title">
          <b>${o(t.displayName||t.name)}</b>
          ${t.category?`<span class="vc-sub">${o(t.category)}</span>`:""}
        </div>
        ${a?`<span class="vc-badge ${St[a]}">${o(a.toUpperCase())}</span>`:""}
      </div>
      <div class="vc-stats">
        <div><span class="vc-l">Purchase reqs</span><b>${s.count}</b></div>
        <div><span class="vc-l">Total spend</span><b>${o(n)}</b></div>
        <div><span class="vc-l">Unpaid</span><b class="${s.unpaid?"vc-bad":""}">${s.unpaid}</b></div>
        <div><span class="vc-l">Last order</span><b>${j(s.lastOrder)}</b></div>
      </div>
      <div class="vc-chips">${fa(t)}</div>
    </div>`}const ga=e=>[...e||[]].sort((t,s)=>(t.displayName||t.name).localeCompare(s.displayName||s.name));function Xe(e,t){const s=ga(e.vendors),a=t.trim()?$t(s,t):s;return a.length?a.map(n=>ba(e,n)).join(""):s.length?`<div class="card" style="color:var(--mut)">No vendors match “${o(t)}”.</div>`:'<div class="card" style="color:var(--mut)">No vendors yet — an admin can add them in Admin → Vendors.</div>'}function $a(e,t,s){if(s)return Sa(e,t,decodeURIComponent(s));e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Vendors</h1>
          <p>Registered vendors and their purchase activity.</p>
        </div>
      </div>
      <div class="vsearch">${Te(te,"Search vendors — try “sensor”, “fab”, “ahmedabad”…","vendorSearch")}</div>
      <div class="vgrid" id="vgrid">${Xe(t,te)}</div>
    </div>`;const a=e.querySelector("#vgrid"),n=e.querySelector("#vendorSearch"),i=e.querySelector(".admSearchClear"),r=()=>{te=n.value,i.hidden=!te,a.innerHTML=Xe(t,te),et(a)};n.oninput=r,n.onkeydown=m=>{m.key==="Escape"&&n.value&&(n.value="",r())},i.onclick=()=>{n.value="",r(),n.focus()},et(a)}function et(e){e.querySelectorAll(".vcard").forEach(t=>t.onclick=()=>location.hash="#/vendors/"+encodeURIComponent(t.dataset.name))}function Sa(e,t,s){const a=(t.vendors||[]).find(c=>c.name.toLowerCase()===s.toLowerCase());if(!a){e.innerHTML=`<div class="dash"><div class="card">Vendor not found: <b>${o(s)}</b> — <a href="#/vendors">back to vendors</a></div></div>`;return}const n=Me(t.prs,a.name),i=ft(a,t.prs),r=t.me&&t.me.role==="admin",m=Fe(t.prs,a.name).sort((c,v)=>(v.createdAt||"").localeCompare(c.createdAt||"")),y=[["Contact person",a.contactPerson],["Phone",a.phone],["Email",a.email],["Website",a.website],["Address",a.address],["Payment terms",a.paymentTerms],["Bank",a.bankName]].filter(([,c])=>c);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div style="display:flex;gap:14px;align-items:center">
          ${wt(a)}
          <div>
            <h1 style="display:flex;gap:10px;align-items:center">${o(a.displayName||a.name)}
              ${i?`<span class="vc-badge ${St[i]}">${o(i.toUpperCase())}</span>`:""}
            </h1>
            <p>${o(a.category||"Vendor")}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          ${r?'<a class="btn" href="#/admin">Edit in Admin</a>':""}
          <a class="btn" href="#/vendors">← All vendors</a>
        </div>
      </div>
      <div class="kpis">
        <div class="kpi"><div class="v">${n.count}</div><div class="l">Purchase requests</div></div>
        <div class="kpi ${n.unpaid?"bad":""}"><div class="v">${n.unpaid}</div><div class="l">Unpaid</div></div>
        <div class="kpi"><div class="v">${n.spendTotals.length?o(M(...n.spendTotals[0])):"—"}</div><div class="l">Total spend</div>
          <div class="s">${n.spendTotals.length>1?o(n.spendTotals.slice(1).map(([c,v])=>M(c,v)).join(" + ")):""}</div></div>
        <div class="kpi"><div class="v">${j(n.lastOrder)}</div><div class="l">Last order</div></div>
      </div>
      ${y.length||(a.departments||[]).length?`<div class="card"><h2>Details</h2>
        <div class="vd-info">${y.map(([c,v])=>`<div><span class="vc-l">${o(c)}</span><b>${o(v)}</b></div>`).join("")}</div>
        ${(a.departments||[]).length?`<div class="vc-chips" style="margin-top:12px">${a.departments.map(c=>`<span class="vc-chip">${o(c)}</span>`).join("")}</div>`:""}
      </div>`:""}
      <div class="card">
        <h2>Purchase requests · ${m.length}</h2>
        <table class="tbl"><thead><tr>
          <th>ID</th><th>Date</th><th>Dept</th><th>Item</th><th>Amount</th><th>Status</th>
        </tr></thead><tbody>
          ${m.map(c=>`<tr class="rowlink" data-id="${o(c.id)}">
            <td style="font-family:var(--mono);font-size:12px">${o(c.id)}</td>
            <td>${j(c.createdAt)}</td><td>${o(c.department)}</td>
            <td class="wrap">${o(c.item)}</td>
            <td>${c.amount?o(M(c.currency||"INR",Number(c.amount))):"—"}</td>
            <td>${$e(c.status)}</td>
          </tr>`).join("")||'<tr><td colspan="6" style="color:var(--mut)">No PRs with this vendor yet.</td></tr>'}
        </tbody></table>
      </div>
    </div>`,e.querySelectorAll("tr.rowlink").forEach(c=>c.onclick=()=>location.hash="#/pr/"+c.dataset.id)}function le(e,{valueFmt:t=String,colorOf:s}={}){if(!e.length)return'<div class="chart-empty">Not enough data yet.</div>';const a=Math.max(...e.map(n=>n.value),1);return`<div class="barlist">${e.map(n=>{const i=Math.max(n.value/a*100,n.value>0?2:0),r=s?s(n):"var(--brand)",m=`${n.label}: ${t(n.value)}${n.sub?" · "+n.sub:""}`;return`<div class="barrow" title="${o(m)}">
      <span class="barlabel">${o(n.label)}</span>
      <span class="bartrack"><span class="barfill" style="width:${i.toFixed(1)}%;background:${r}"></span></span>
      <span class="barval">${o(t(n.value))}</span>
    </div>`}).join("")}</div>`}function tt(e,{valueFmt:t=String,width:s=640,height:a=170}={}){if(e.length<2)return'<div class="chart-empty">Not enough months yet to plot a trend.</div>';const n={l:8,r:8,t:14,b:22},i=s-n.l-n.r,r=a-n.t-n.b,m=Math.max(...e.map(u=>u.value),1),y=i/(e.length-1),c=u=>n.l+u*y,v=u=>n.t+r-u/m*r,S=e.map((u,k)=>`${k===0?"M":"L"}${c(k).toFixed(1)} ${v(u.value).toFixed(1)}`).join(" "),w=`${S} L${c(e.length-1).toFixed(1)} ${n.t+r} L${c(0).toFixed(1)} ${n.t+r} Z`,C=[0,.5,1].map(u=>`<line x1="${n.l}" x2="${s-n.r}" y1="${(n.t+r*(1-u)).toFixed(1)}" y2="${(n.t+r*(1-u)).toFixed(1)}" stroke="var(--line)" stroke-width="1"/>`).join(""),h=Math.ceil(e.length/6)||1,R=e.map((u,k)=>k%h===0||k===e.length-1?`<text x="${c(k).toFixed(1)}" y="${a-6}" font-size="9.5" fill="var(--mut)" text-anchor="middle">${o(u.month.slice(2))}</text>`:"").join(""),P=e.map((u,k)=>`<circle cx="${c(k).toFixed(1)}" cy="${v(u.value).toFixed(1)}" r="3" fill="var(--brand)" stroke="var(--panel)" stroke-width="1.5"><title>${o(u.month)}: ${o(t(u.value))}</title></circle>`).join("");return`<svg viewBox="0 0 ${s} ${a}" class="chart-line" role="img" aria-label="Monthly trend" preserveAspectRatio="xMidYMid meet">
    ${C}
    <path d="${w}" fill="var(--brand-soft)" stroke="none"/>
    <path d="${S}" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${P}
    ${R}
  </svg>`}const wa=["Submitted","Approved","Ordered","In Transit","Received","On Hold","Rejected","Cancelled"],Ta={Submitted:"var(--blue)",Approved:"var(--brand)",Ordered:"var(--amber)","In Transit":"var(--amber)",Received:"var(--brand)","On Hold":"var(--mut)",Rejected:"var(--red)",Cancelled:"var(--red)"},Ra={"0–7 days":"var(--brand)","8–14 days":"var(--brand)","15–30 days":"var(--amber)","30+ days":"var(--red)"},ce={currency:""};function Tt(e,t){const s=t.me||{role:"",department:""},a=s.role==="approver",n=a?vt(t.prs,s.department):t.prs||[],i=zt(n);i.includes(ce.currency)||(ce.currency=i[0]||"");const r=ce.currency,m=f=>r?M(r,f):String(f),y=r?We(n,"spend",r):[],c=We(n,"count"),v=r?_t(n,r,6).map(f=>({label:f.vendor,value:f.total})):[],S=!a&&r?Gt(n,r).map(f=>({label:f.department,value:f.total})):[],w=Vt(n),C=wa.filter(f=>w[f]).map(f=>({label:f,value:w[f]})),h=Zt(n),R=Wt(n),P=R.map(f=>({label:f.label,value:f.count})),u=R.reduce((f,E)=>f+E.count,0),k=y.reduce((f,E)=>f+E.value,0);e.innerHTML=`
    <div class="dash">
      <div class="adm-head">
        <div>
          <h1>Insights</h1>
          <p>${a?`Spend and cycle-time trends for ${o(s.department||"your department")}.`:"Spend, vendor and cycle-time trends across every purchase request."}</p>
        </div>
        ${i.length>1?`<select id="insCur">${i.map(f=>`<option value="${o(f)}" ${f===r?"selected":""}>${o(f)}</option>`).join("")}</select>`:""}
      </div>

      <div class="kpis">
        <div class="kpi"><div class="v">${r?o(m(k)):"—"}</div><div class="l">Total spend${r?" · "+o(r):""}</div></div>
        <div class="kpi"><div class="v">${h.avgApprovalDays!=null?h.avgApprovalDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. time to decide</div></div>
        <div class="kpi"><div class="v">${h.avgDeliveryDays!=null?h.avgDeliveryDays.toFixed(1)+"d":"—"}</div>
          <div class="l">Avg. PO to delivery</div></div>
        <div class="kpi ${u?"warn":""}"><div class="v">${u}</div><div class="l">Unpaid POs awaiting payment</div></div>
      </div>

      <div class="card">
        <h2>Monthly spend${r?" · "+o(r):""}</h2>
        <div class="pd-body">${r?tt(y,{valueFmt:f=>M(r,f)}):'<div class="chart-empty">No priced purchase requests yet.</div>'}</div>
      </div>

      <div class="adm-grid2">
        ${S.length?`<div class="card"><h2>Spend by department${r?" · "+o(r):""}</h2>
          <div class="pd-body">${le(S,{valueFmt:m})}</div></div>`:""}
        <div class="card"><h2>Top vendors${r?" · "+o(r):""}</h2>
          <div class="pd-body">${le(v,{valueFmt:m})}</div></div>
      </div>

      <div class="adm-grid2">
        <div class="card"><h2>Requests by status</h2>
          <div class="pd-body">${le(C,{colorOf:f=>Ta[f.label]||"var(--mut)"})}</div></div>
        <div class="card"><h2>Unpaid PO aging</h2>
          <div class="pd-body">${le(P,{colorOf:f=>Ra[f.label]||"var(--brand)"})}</div></div>
      </div>

      <div class="card">
        <h2>Request volume, by month</h2>
        <div class="pd-body">${tt(c,{valueFmt:f=>f+" PR"+(f===1?"":"s")})}</div>
      </div>
    </div>`;const U=e.querySelector("#insCur");U&&(U.onchange=()=>{ce.currency=U.value,Tt(e,t)})}const Ne=[{code:"AED",name:"UAE Dirham",sym:"د.إ"},{code:"AFN",name:"Afghan Afghani",sym:"؋"},{code:"ALL",name:"Albanian Lek",sym:"L"},{code:"AMD",name:"Armenian Dram",sym:"֏"},{code:"ANG",name:"Netherlands Antillean Guilder",sym:"ƒ"},{code:"AOA",name:"Angolan Kwanza",sym:"Kz"},{code:"ARS",name:"Argentine Peso",sym:"$"},{code:"AUD",name:"Australian Dollar",sym:"A$"},{code:"AWG",name:"Aruban Florin",sym:"ƒ"},{code:"AZN",name:"Azerbaijani Manat",sym:"₼"},{code:"BAM",name:"Bosnia-Herzegovina Convertible Mark",sym:"KM"},{code:"BBD",name:"Barbadian Dollar",sym:"$"},{code:"BDT",name:"Bangladeshi Taka",sym:"৳"},{code:"BGN",name:"Bulgarian Lev",sym:"лв"},{code:"BHD",name:"Bahraini Dinar",sym:".د.ب"},{code:"BIF",name:"Burundian Franc",sym:"FBu"},{code:"BMD",name:"Bermudian Dollar",sym:"$"},{code:"BND",name:"Brunei Dollar",sym:"$"},{code:"BOB",name:"Bolivian Boliviano",sym:"Bs."},{code:"BRL",name:"Brazilian Real",sym:"R$"},{code:"BSD",name:"Bahamian Dollar",sym:"$"},{code:"BTN",name:"Bhutanese Ngultrum",sym:"Nu."},{code:"BWP",name:"Botswana Pula",sym:"P"},{code:"BYN",name:"Belarusian Ruble",sym:"Br"},{code:"BZD",name:"Belize Dollar",sym:"BZ$"},{code:"CAD",name:"Canadian Dollar",sym:"C$"},{code:"CDF",name:"Congolese Franc",sym:"FC"},{code:"CHF",name:"Swiss Franc",sym:"CHF"},{code:"CLP",name:"Chilean Peso",sym:"$"},{code:"CNY",name:"Chinese Yuan Renminbi",sym:"¥"},{code:"COP",name:"Colombian Peso",sym:"$"},{code:"CRC",name:"Costa Rican Colón",sym:"₡"},{code:"CUP",name:"Cuban Peso",sym:"$"},{code:"CVE",name:"Cape Verdean Escudo",sym:"$"},{code:"CZK",name:"Czech Koruna",sym:"Kč"},{code:"DJF",name:"Djiboutian Franc",sym:"Fdj"},{code:"DKK",name:"Danish Krone",sym:"kr"},{code:"DOP",name:"Dominican Peso",sym:"RD$"},{code:"DZD",name:"Algerian Dinar",sym:"دج"},{code:"EGP",name:"Egyptian Pound",sym:"E£"},{code:"ERN",name:"Eritrean Nakfa",sym:"Nfk"},{code:"ETB",name:"Ethiopian Birr",sym:"Br"},{code:"EUR",name:"Euro",sym:"€"},{code:"FJD",name:"Fijian Dollar",sym:"FJ$"},{code:"FKP",name:"Falkland Islands Pound",sym:"£"},{code:"GBP",name:"British Pound Sterling",sym:"£"},{code:"GEL",name:"Georgian Lari",sym:"₾"},{code:"GHS",name:"Ghanaian Cedi",sym:"GH₵"},{code:"GIP",name:"Gibraltar Pound",sym:"£"},{code:"GMD",name:"Gambian Dalasi",sym:"D"},{code:"GNF",name:"Guinean Franc",sym:"FG"},{code:"GTQ",name:"Guatemalan Quetzal",sym:"Q"},{code:"GYD",name:"Guyanese Dollar",sym:"G$"},{code:"HKD",name:"Hong Kong Dollar",sym:"HK$"},{code:"HNL",name:"Honduran Lempira",sym:"L"},{code:"HTG",name:"Haitian Gourde",sym:"G"},{code:"HUF",name:"Hungarian Forint",sym:"Ft"},{code:"IDR",name:"Indonesian Rupiah",sym:"Rp"},{code:"ILS",name:"Israeli New Shekel",sym:"₪"},{code:"INR",name:"Indian Rupee",sym:"₹"},{code:"IQD",name:"Iraqi Dinar",sym:"ع.د"},{code:"IRR",name:"Iranian Rial",sym:"﷼"},{code:"ISK",name:"Icelandic Króna",sym:"kr"},{code:"JMD",name:"Jamaican Dollar",sym:"J$"},{code:"JOD",name:"Jordanian Dinar",sym:"د.ا"},{code:"JPY",name:"Japanese Yen",sym:"¥"},{code:"KES",name:"Kenyan Shilling",sym:"KSh"},{code:"KGS",name:"Kyrgyzstani Som",sym:"с"},{code:"KHR",name:"Cambodian Riel",sym:"៛"},{code:"KMF",name:"Comorian Franc",sym:"CF"},{code:"KPW",name:"North Korean Won",sym:"₩"},{code:"KRW",name:"South Korean Won",sym:"₩"},{code:"KWD",name:"Kuwaiti Dinar",sym:"د.ك"},{code:"KYD",name:"Cayman Islands Dollar",sym:"$"},{code:"KZT",name:"Kazakhstani Tenge",sym:"₸"},{code:"LAK",name:"Lao Kip",sym:"₭"},{code:"LBP",name:"Lebanese Pound",sym:"ل.ل"},{code:"LKR",name:"Sri Lankan Rupee",sym:"Rs"},{code:"LRD",name:"Liberian Dollar",sym:"L$"},{code:"LSL",name:"Lesotho Loti",sym:"L"},{code:"LYD",name:"Libyan Dinar",sym:"ل.د"},{code:"MAD",name:"Moroccan Dirham",sym:"د.م."},{code:"MDL",name:"Moldovan Leu",sym:"L"},{code:"MGA",name:"Malagasy Ariary",sym:"Ar"},{code:"MKD",name:"Macedonian Denar",sym:"ден"},{code:"MMK",name:"Myanmar Kyat",sym:"K"},{code:"MNT",name:"Mongolian Tögrög",sym:"₮"},{code:"MOP",name:"Macanese Pataca",sym:"MOP$"},{code:"MRU",name:"Mauritanian Ouguiya",sym:"UM"},{code:"MUR",name:"Mauritian Rupee",sym:"₨"},{code:"MVR",name:"Maldivian Rufiyaa",sym:"Rf"},{code:"MWK",name:"Malawian Kwacha",sym:"MK"},{code:"MXN",name:"Mexican Peso",sym:"Mex$"},{code:"MYR",name:"Malaysian Ringgit",sym:"RM"},{code:"MZN",name:"Mozambican Metical",sym:"MT"},{code:"NAD",name:"Namibian Dollar",sym:"N$"},{code:"NGN",name:"Nigerian Naira",sym:"₦"},{code:"NIO",name:"Nicaraguan Córdoba",sym:"C$"},{code:"NOK",name:"Norwegian Krone",sym:"kr"},{code:"NPR",name:"Nepalese Rupee",sym:"रू"},{code:"NZD",name:"New Zealand Dollar",sym:"NZ$"},{code:"OMR",name:"Omani Rial",sym:"ر.ع."},{code:"PAB",name:"Panamanian Balboa",sym:"B/."},{code:"PEN",name:"Peruvian Sol",sym:"S/"},{code:"PGK",name:"Papua New Guinean Kina",sym:"K"},{code:"PHP",name:"Philippine Peso",sym:"₱"},{code:"PKR",name:"Pakistani Rupee",sym:"₨"},{code:"PLN",name:"Polish Złoty",sym:"zł"},{code:"PYG",name:"Paraguayan Guaraní",sym:"₲"},{code:"QAR",name:"Qatari Riyal",sym:"ر.ق"},{code:"RON",name:"Romanian Leu",sym:"lei"},{code:"RSD",name:"Serbian Dinar",sym:"дин"},{code:"RUB",name:"Russian Ruble",sym:"₽"},{code:"RWF",name:"Rwandan Franc",sym:"FRw"},{code:"SAR",name:"Saudi Riyal",sym:"ر.س"},{code:"SBD",name:"Solomon Islands Dollar",sym:"SI$"},{code:"SCR",name:"Seychellois Rupee",sym:"₨"},{code:"SDG",name:"Sudanese Pound",sym:"ج.س."},{code:"SEK",name:"Swedish Krona",sym:"kr"},{code:"SGD",name:"Singapore Dollar",sym:"S$"},{code:"SHP",name:"Saint Helena Pound",sym:"£"},{code:"SLE",name:"Sierra Leonean Leone",sym:"Le"},{code:"SOS",name:"Somali Shilling",sym:"Sh"},{code:"SRD",name:"Surinamese Dollar",sym:"$"},{code:"SSP",name:"South Sudanese Pound",sym:"£"},{code:"STN",name:"São Tomé and Príncipe Dobra",sym:"Db"},{code:"SYP",name:"Syrian Pound",sym:"£S"},{code:"SZL",name:"Eswatini Lilangeni",sym:"E"},{code:"THB",name:"Thai Baht",sym:"฿"},{code:"TJS",name:"Tajikistani Somoni",sym:"SM"},{code:"TMT",name:"Turkmenistani Manat",sym:"m"},{code:"TND",name:"Tunisian Dinar",sym:"د.ت"},{code:"TOP",name:"Tongan Paʻanga",sym:"T$"},{code:"TRY",name:"Turkish Lira",sym:"₺"},{code:"TTD",name:"Trinidad and Tobago Dollar",sym:"TT$"},{code:"TWD",name:"New Taiwan Dollar",sym:"NT$"},{code:"TZS",name:"Tanzanian Shilling",sym:"TSh"},{code:"UAH",name:"Ukrainian Hryvnia",sym:"₴"},{code:"UGX",name:"Ugandan Shilling",sym:"USh"},{code:"USD",name:"US Dollar",sym:"$"},{code:"UYU",name:"Uruguayan Peso",sym:"$U"},{code:"UZS",name:"Uzbekistani Som",sym:"soʻm"},{code:"VES",name:"Venezuelan Bolívar",sym:"Bs."},{code:"VND",name:"Vietnamese Đồng",sym:"₫"},{code:"VUV",name:"Vanuatu Vatu",sym:"VT"},{code:"WST",name:"Samoan Tālā",sym:"WS$"},{code:"XAF",name:"Central African CFA Franc",sym:"FCFA"},{code:"XCD",name:"East Caribbean Dollar",sym:"EC$"},{code:"XOF",name:"West African CFA Franc",sym:"CFA"},{code:"XPF",name:"CFP Franc",sym:"₣"},{code:"YER",name:"Yemeni Rial",sym:"﷼"},{code:"ZAR",name:"South African Rand",sym:"R"},{code:"ZMW",name:"Zambian Kwacha",sym:"ZK"},{code:"ZWG",name:"Zimbabwe Gold",sym:"ZiG"}],Rt=new Map(Ne.map(e=>[e.code,e])),ka=e=>Rt.has(String(e||"").trim().toUpperCase());function at(e){const t=Rt.get(String(e||"").trim().toUpperCase());return t?`${t.code} — ${t.name}${t.sym?" "+t.sym:""}`:String(e||"")}function Da(e){const t=String(e||"").trim().toLowerCase(),s=t?Ne.filter(n=>n.code.toLowerCase().includes(t)||n.name.toLowerCase().includes(t)||n.sym&&n.sym.toLowerCase().includes(t)):[...Ne],a=n=>t&&n.code.toLowerCase().startsWith(t)?0:1;return s.sort((n,i)=>a(n)-a(i)||n.code.localeCompare(i.code))}const Ca=yt,Pa={priorities:["Critical","High","Medium","Low"],couriers:["BlueDart","DHL","FedEx","DTDC","India Post","Other"],departments:[],materialTypes:[],paymentTerms:[],units:[]},Le=(e,t)=>(e.lists&&e.lists[t]&&e.lists[t].length?e.lists[t]:Pa[t])||[],nt={project:"Which running project this purchase belongs to. Only your department’s projects are listed — ask an admin to add one if yours is missing.",purpose:"One line on why this purchase is needed, e.g. “Calibration jigs for the EnvizomPro batch”.",vendor:"The vendor you’ll buy from. Search picks from vendors already registered for your department — if yours isn’t listed, just type its name and an admin will be notified to add it.",currency:"Currency of the vendor’s quote. Type to search any world currency by code, name or symbol.",priority:"Critical = must-have immediately, expedite even at extra cost. High = procure as soon as possible. Medium = needed within the normal purchase cycle. Low = procure when budget allows.",expected:"Date you expect the goods to arrive — used for the In-Transit tracking on the dashboard.",payment:"Whether the vendor has been paid. Usually Unpaid when raising the request.",notes:"Anything the approver or purchase team should know — links, context, constraints.",iDesc:"What you’re buying — one line per item, e.g. “ESP32-S3 DevKit N16R8”.",iZoho:"Zoho part number, links the item to Production inventory (e.g. Z-0042).",iType:"Item category for your department — drives reporting. Ask an admin to add a missing type.",iQty:"How many, counted in the unit chosen next to it.",iUnit:"Unit of measure: pcs, kg, m, set…",iPrice:"Price for ONE unit, in the PR’s currency. Line total = qty × unit price; leave blank if unknown.",iLink:"URL of the exact product page / variant you want ordered.",iDoc:"Datasheet or spec document URL, if relevant."},L=(e,t,s)=>`<span class="lblrow">${o(e)}${nt[t]?`<span class="hq ${s?"r":""}" data-tip="${o(nt[t])}">?</span>`:""}</span>`;function W(e,t,s){const a=t&&!e.includes(t)?[...e,t]:e;return(s?["",...a]:a).map(n=>`<option value="${o(n)}" ${n===t?"selected":""}>${o(n)}</option>`).join("")}function st(e,t={},s=0,a=[],n=!0){return`<div class="itemrow ${n?"":"nz"}" data-i="${s}">
    <input type="hidden" name="i_lineTotal" value="${o(t.lineTotal)}">
    <input name="i_description" placeholder="Item / description*" value="${o(t.description)}">
    ${n?`<input name="i_partNo" placeholder="Zoho no" value="${o(t.partNo)}">`:`<input type="hidden" name="i_partNo" value="${o(t.partNo)}">`}
    <select name="i_materialType" required>${W(a,t.materialType||"",!0)}</select>
    <input name="i_qty" type="number" step="any" min="0" placeholder="Qty*" required value="${o(t.qty)}">
    <select name="i_unit" required>${W(Le(e,"units"),t.unit||"pcs")}</select>
    <input name="i_unitPrice" type="number" step="0.01" min="0" placeholder="Unit price" value="${o(t.unitPrice)}">
    <input name="i_purchaseLink" placeholder="Purchase link" value="${o(t.purchaseLink)}">
    <input name="i_datasheetDoc" placeholder="Datasheet / doc URL" value="${o(t.datasheetDoc)}">
    <button type="button" class="btn danger rmItem" title="Remove item">×</button>
  </div>`}function ot(e){return[...e.querySelectorAll(".itemrow:not(.ithead)")].map(t=>{const s=a=>t.querySelector(`[name="${a}"]`).value.trim();return{description:s("i_description"),partNo:s("i_partNo"),materialType:s("i_materialType"),qty:s("i_qty"),unit:s("i_unit"),unitPrice:s("i_unitPrice"),purchaseLink:s("i_purchaseLink"),datasheetDoc:s("i_datasheetDoc"),lineTotal:s("i_lineTotal")}}).filter(t=>t.description)}function Aa(e,t,s){const a=s?t.prs.find(p=>p.id===s):null,n=a||{},i=a?n.items||[]:[{}],r=t.me||{role:""},m=["approver","admin","finance"].includes(r.role),y=a?n.department||"":r.department||"",c=(t.projects||[]).filter(p=>p.department.toLowerCase()===y.toLowerCase()).map(p=>p.project),v=(t.vendors||[]).filter(p=>(p.departments||[]).some(l=>l.toLowerCase()===y.toLowerCase())),S=p=>{const l=v.find(b=>b.name.toLowerCase()===String(p||"").toLowerCase());return l?l.displayName||l.name:String(p||"")},w=(t.materialTypes||[]).filter(p=>p.department.toLowerCase()===y.toLowerCase()).map(p=>p.materialType),C=y.toLowerCase()==="production";e.innerHTML=`
    <div class="dash">
      <div class="crumbs"><a href="#/">PRs</a> / ${a?`<a href="#/pr/${o(n.id)}" style="font-family:var(--mono)">${o(n.id)}</a> / edit`:"new"}</div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="margin:0${a?";font-family:var(--mono)":""}">${a?o(n.id):"New Purchase Request"}</h1>
          ${a?$e(n.status):""}
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn" href="${a?"#/pr/"+o(n.id):"#/"}">Cancel</a>
          <button class="btn primary" type="submit" form="prForm" id="prSave">${a?"Save changes":"Submit PR"}</button>
        </div>
      </div>
      <form id="prForm">
        <div class="card">
          <h2>General information</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>${L("Project*","project")} <select name="project" required>${W(c,n.project||"",!0)}</select></label>
              <label>${L("Purpose","purpose")} <input name="purpose" value="${o(n.purpose)}"></label>
              <div class="pd-field full">${L("Vendor","vendor")}
                <input id="venSearch" class="combo" autocomplete="off" spellcheck="false" placeholder="Search vendors, or type a new vendor's name…" value="${o(S(n.vendor))}">
                <input type="hidden" name="vendor" value="${o(n.vendor||"")}">
                <div class="curList" id="venList" hidden></div>
                <div class="pd-sub" id="venHint" hidden>Not a registered vendor — that's fine, it'll still go on this PR, and an admin will be notified to add it properly.</div>
              </div>
              <div class="pd-field">${L("Currency","currency")}
                <input id="curSearch" class="combo" autocomplete="off" spellcheck="false" value="${o(at(n.currency||"INR"))}">
                <input type="hidden" name="currency" value="${o(n.currency||"INR")}">
                <div class="curList" id="curList" hidden></div>
              </div>
              <label>${L("Priority","priority",!0)} <select name="priority">${W(Le(t,"priorities"),n.priority||"Medium")}</select></label>
              <label>${L("Expected delivery","expected")} <input name="expectedDate" type="date" value="${o((n.expectedDate||"").slice(0,10))}"></label>
              ${m?`
              <label>${L("Payment status*","payment")} <select name="paymentStatus" required>${W(Ca,n.paymentStatus||"Unpaid")}</select></label>`:""}
              ${a&&r.role==="admin"?`
              <label>Status (admin override) <select name="status">${W(Ae,n.status)}</select></label>
              <label>Requester email (admin override) <input name="requesterEmail" value="${o(n.requesterEmail)}"></label>`:""}
            </div>
            <label style="margin-top:14px">${L("Notes","notes")} <textarea name="notes" rows="3">${o(n.notes)}</textarea></label>
          </div>
        </div>

        ${a&&r.role==="admin"?`
        <div class="card">
          <h2>Procurement details</h2>
          <div class="pd-body pd-form">
            <div class="pd-grid">
              <label>PO number <input name="poNo" value="${o(n.poNo)}"></label>
              <label>PO date <input name="poDate" type="date" value="${o((n.poDate||"").slice(0,10))}"></label>
              <label>Invoice / order # <input name="invoiceNo" value="${o(n.invoiceNo)}"></label>
              <label>Invoice date <input name="invoiceDate" type="date" value="${o((n.invoiceDate||"").slice(0,10))}"></label>
              <label>Payment term <select name="paymentTerm">${W(Le(t,"paymentTerms"),n.paymentTerm||"",!0)}</select></label>
              <label>Quotation / PI URL <input name="quotationDoc" value="${o(n.quotationDoc)}"></label>
            </div>
          </div>
        </div>`:""}

        <div class="card">
          <h2>Requested items</h2>
          <div class="pd-body pd-form">
            <div class="itemrow ithead ${C?"":"nz"}">
              <span>${L("Description*","iDesc")}</span>
              ${C?`<span>${L("Zoho no","iZoho")}</span>`:""}
              <span>${L("Type*","iType")}</span>
              <span>${L("Qty*","iQty")}</span>
              <span>${L("Unit*","iUnit")}</span>
              <span>${L("Unit price","iPrice")}</span>
              <span>${L("Purchase link","iLink",!0)}</span>
              <span>${L("Datasheet","iDoc",!0)}</span>
              <span></span>
            </div>
            <div id="itemRows">${i.map((p,l)=>st(t,p,l,w,C)).join("")}</div>
            <div style="display:flex;align-items:center;gap:12px;margin-top:10px">
              <button type="button" class="btn" id="addItem">+ Add item</button>
              <span id="liveTotal" style="color:var(--mut)"></span>
            </div>
          </div>
        </div>
      </form>
    </div>`;const h=e.querySelector("#prForm"),R=e.querySelector("#itemRows"),P=()=>{const p=ot(h).map(D=>{const A=It(D.qty,D.unitPrice);return{lineTotal:A!==""?A:D.lineTotal}}),l=Et(p),b=h.querySelector('[name="currency"]').value||"INR";e.querySelector("#liveTotal").textContent=l===""?"":"Total: "+se(b,l)},u=p=>{p.querySelector(".rmItem").onclick=()=>{R.children.length>1&&(p.remove(),P())},p.querySelectorAll("input, select").forEach(l=>l.oninput=P)};[...R.children].forEach(u),P();const k=(p,l,b,{search:D,resolve:A,toLabel:G,allowEmpty:_,onCommit:ee})=>{const d=e.querySelector("#"+p),$=e.querySelector("#"+l),N=h.querySelector(`[name="${b}"]`),x=()=>{ee&&ee()},H=Z=>{const V=D(Z).slice(0,30);$.innerHTML=V.map(re=>`<div class="curOpt" data-v="${o(re.value)}"><b>${o(re.main)}</b> ${o(re.name||"")}<span>${o(re.sub||"")}</span></div>`).join("")||'<div class="curEmpty">No match</div>',$.hidden=!1};d.onfocus=()=>{d.select(),H("")},d.oninput=()=>H(d.value),$.onmousedown=Z=>{Z.preventDefault();const V=Z.target.closest(".curOpt");V&&(N.value=V.dataset.v,d.value=G(V.dataset.v),$.hidden=!0,x())},d.onblur=()=>setTimeout(()=>{$.hidden=!0;const Z=d.value.trim();if(!Z&&_)N.value="";else{const V=A(Z);V!=null&&(N.value=V)}d.value=G(N.value),x()},120)};k("curSearch","curList","currency",{search:p=>Da(p).map(l=>({value:l.code,main:l.code,name:l.name,sub:l.sym||""})),resolve:p=>{const l=p.split("—")[0].trim().toUpperCase();return ka(l)?l:null},toLabel:p=>at(p),onCommit:P});const U=p=>{const l=String(p||"").trim().toLowerCase();return v.filter(b=>!l||b.name.toLowerCase().includes(l)||(b.displayName||"").toLowerCase().includes(l)||(b.category||"").toLowerCase().includes(l)).sort((b,D)=>(b.displayName||b.name).localeCompare(D.displayName||D.name)).map(b=>({value:b.name,main:b.displayName||b.name,name:b.displayName?b.name:"",sub:b.category||""}))},f=e.querySelector("#venHint"),E=()=>{const p=h.querySelector('[name="vendor"]').value.trim();f.hidden=!p||v.some(l=>l.name.toLowerCase()===p.toLowerCase())};k("venSearch","venList","vendor",{search:U,resolve:p=>{const l=v.find(b=>b.name.toLowerCase()===p.toLowerCase()||(b.displayName||"").toLowerCase()===p.toLowerCase());return l?l.name:p},toLabel:p=>S(p),allowEmpty:!0,onCommit:E}),E(),e.querySelector("#addItem").onclick=()=>{R.insertAdjacentHTML("beforeend",st(t,{},R.children.length,w,C)),u(R.lastElementChild)},h.onsubmit=async p=>{p.preventDefault();const l=e.querySelector("#prSave");l.disabled=!0,l.textContent="Saving…";const b={};for(const[A,G]of new FormData(p.target))A.startsWith("i_")||(b[A]=G);const D=ot(h);try{if(!D.length)throw new Error("Add at least one item with a description");if(a)await q("update",{id:n.id,updates:b,items:D}),T("PR updated"),location.hash="#/pr/"+n.id;else{const A=await q("create",{pr:b,items:D});T("Created "+A.pr.id),location.hash="#/pr/"+A.pr.id}B.refresh()}catch(A){T(A.message,!0),l.disabled=!1,l.textContent=a?"Save changes":"Submit PR"}}}function it(e,t,s,a){const n=String(e||"").trim();if(n)return n;const i=String(t||"").trim().toLowerCase(),r=String(s||"").trim().toLowerCase(),m=String(a||"").trim();return i&&r&&i===r&&m?m:Se(t)}const Na={BlueDart:e=>`https://www.bluedart.com/tracking?trackFor=0&trackNo=${e}`,DHL:e=>`https://www.dhl.com/in-en/home/tracking.html?tracking-id=${e}`,FedEx:e=>`https://www.fedex.com/fedextrack/?trknbr=${e}`,DTDC:e=>`https://txn.dtdc.com/ctbs-tracking/customerInterface.tr?submitName=showCITrackingDetails&cnNo=${e}`,Delhivery:e=>`https://www.delhivery.com/track-v2/package/${e}`},La=(e,t)=>(Na[e]||(s=>`https://t.17track.net/en#nums=${s}`))(encodeURIComponent(t)),I=(e,t)=>`<div class="pd-f"><span class="vc-l">${o(e)}</span><b>${t||"—"}</b></div>`;let ae=!1,rt=null;const dt=(e,t,s,a)=>`
  <div class="pd-person">
    <span class="avatar avatar-txt">${o(Be(s||t))}</span>
    <div>
      <span class="vc-l">${o(e)}</span>
      <b>${o(t)}</b>
      <div class="pd-sub">${o(a||"")}</div>
    </div>
  </div>`;function qe(e,t,s){const a=t.prs.find(l=>l.id===s);if(!a){e.innerHTML=`<div class="card">PR ${o(s)} not found ${t.prs.length?"":"(still syncing…)"}</div>`;return}rt!==s&&(ae=!1,rt=s);const n=t.me||{role:"",email:"",department:""},i=n.role==="admin",r=a.requesterEmail.toLowerCase()===n.email.toLowerCase(),m=["approver","admin","finance"].includes(n.role),y=i||r&&a.status==="Submitted",c=String(a.department||"").toLowerCase()===String(n.department||"").toLowerCase(),v=Jt(a.status,n.role,r,c),S=(a.department||"").toLowerCase()==="production",w=i&&a.status==="Approved",C=i&&a.poNo&&!a.zohoPoId,h=(t.vendors||[]).find(l=>String(l.name||"").toLowerCase()===String(a.vendor||"").toLowerCase()),R=a.paymentTerm||h&&h.paymentTerms||"",P=t.lists&&t.lists.paymentTerms||[],u=["",...R&&!P.includes(R)?[R,...P]:P].map(l=>`<option value="${o(l)}" ${l===R?"selected":""}>${l?o(l):"— select —"}</option>`).join("");e.innerHTML=`
    <div class="dash">
      <div class="crumbs"><a href="#/">PRs</a> / <span style="font-family:var(--mono)">${o(a.id)}</span></div>
      <div class="adm-head">
        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="font-family:var(--mono);margin:0">${o(a.id)}</h1>${$e(a.status)}
        </div>
        <div style="display:flex;gap:8px">
          ${v.map(l=>`<button class="btn ${l==="Approved"||l==="Received"?"primary":l==="Rejected"||l==="Cancelled"?"danger":""}" data-to="${o(l)}">Mark ${o(l)}</button>`).join("")}
          ${w?'<button class="btn primary" id="makePoBtn">Make a PO</button>':""}
          ${C?'<button class="btn" id="zohoPushBtn">Send to Zoho Books</button>':""}
          ${y?`<a class="btn" href="#/new/${o(a.id)}">Edit</a>`:""}
        </div>
      </div>

      ${w&&ae?`
      <div class="card">
        <h2>Make a purchase order</h2>
        <div class="pd-body">
        <form class="pr" id="poForm">
          <label>PO number* <input name="poNo" required value="${o(a.poNo)}"></label>
          <label>PO date <input name="poDate" type="date" value="${o(a.poDate||new Date().toISOString().slice(0,10))}"></label>
          <label class="full">Payment term
            <select name="paymentTerm">${u}</select>
          </label>
          ${h&&h.paymentTerms&&!a.paymentTerm?`<div class="full pd-sub">Prefilled from ${o(h.name)}'s vendor record — change it here if this order is different.</div>`:""}
          <div class="full" style="display:flex;gap:8px">
            <button class="btn primary" type="submit">Create PO &amp; mark Ordered</button>
            <button class="btn" type="button" id="poCancelBtn">Cancel</button>
          </div>
        </form>
        </div>
      </div>`:""}

      <div class="card">
        <h2>General information</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${I("Department",o(a.department))}
          ${I("Project",o(a.project))}
          ${I("Vendor",o(a.vendor))}
          ${I("Purpose",o(a.purpose))}
          ${I("Priority",o(a.priority))}
          ${I("Payment status",o(a.paymentStatus))}
        </div>
        <div class="pd-people">
          ${dt("Requested by",it(a.requestedByName,a.requesterEmail,a.approverEmail,a.approvedByName),a.requesterEmail,"Created on "+j(a.createdAt))}
          ${a.approverEmail||a.approvedByName?dt("Approved by",it(a.approvedByName,a.approverEmail,a.requesterEmail,a.requestedByName),a.approverEmail,a.approvedAt?"on "+j(a.approvedAt):""):""}
        </div>
        </div>
      </div>

      <div class="card">
        <h2>Requested items</h2>
        <table class="tbl"><thead><tr>
          <th>#</th><th>Description</th>${S?"<th>Zoho no</th>":""}<th>Type</th><th>Qty</th><th>Unit price</th><th>Line total</th><th>Links</th>
        </tr></thead><tbody>
          ${(a.items||[]).map(l=>`<tr>
            <td>${o(l.itemNo)}</td>
            <td class="wrap">${o(l.description)}</td>${S?`<td>${o(l.partNo)}</td>`:""}<td>${o(l.materialType)}</td>
            <td>${o([l.qty,l.unit].filter(Boolean).join(" "))}</td>
            <td>${l.unitPrice?o(se(a.currency||"INR",Number(l.unitPrice))):"—"}</td>
            <td>${l.lineTotal?o(se(a.currency||"INR",Number(l.lineTotal))):"—"}</td>
            <td>${l.purchaseLink?`<a href="${o(l.purchaseLink)}" target="_blank" rel="noopener">buy ↗</a>`:""}
                ${l.datasheetDoc?` <a href="${o(l.datasheetDoc)}" target="_blank" rel="noopener">doc ↗</a>`:""}</td>
          </tr>`).join("")||`<tr><td colspan="${S?8:7}" style="color:var(--mut)">No items.</td></tr>`}
        </tbody></table>
        <div class="pd-total">Request total&nbsp;<b>${a.totalAmount?o(se(a.currency||"INR",Number(a.totalAmount))):"—"}</b></div>
      </div>

      <div class="card">
        <h2>Delivery</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${I("Expected",j(a.expectedDate))}
          ${I("Received",j(a.receivedAt))}
          ${I("Tracking",a.trackingNo?`${o(a.courier||"")} <a href="${a.trackingLink?o(a.trackingLink):La(a.courier,a.trackingNo)}" target="_blank" rel="noopener">${o(a.trackingNo)} ↗</a>`:"")}
          ${I("Notes",o(a.notes))}
        </div>
        </div>
      </div>

      ${m?`
      <div class="card">
        <h2>Procurement details</h2>
        <div class="pd-body">
        <div class="pd-grid">
          ${I("PO reference",[o(a.poNo),j(a.poDate)].filter(Boolean).join(" · "))}
          ${I("Invoice / order #",[o(a.invoiceNo),j(a.invoiceDate)].filter(Boolean).join(" · "))}
          ${I("Payment term",o(a.paymentTerm))}
          ${I("Quotation / PI",a.quotationDoc?`<a href="${o(a.quotationDoc)}" target="_blank" rel="noopener">open ↗</a>`:"")}
          ${I("Zoho Books PO",a.zohoPoNumber?o(a.zohoPoNumber):"")}
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
    </div>`,e.querySelectorAll("[data-to]").forEach(l=>l.onclick=async()=>{const b=l.dataset.to;if(!((b==="Rejected"||b==="Cancelled")&&!confirm(`Mark ${a.id} as ${b}?`))){l.disabled=!0;try{await q("transition",{id:a.id,to:b}),T(a.id+" → "+b),B.refresh()}catch(D){T(D.message,!0),l.disabled=!1}}});const k=e.querySelector("#makePoBtn");k&&(k.onclick=()=>{ae=!0,qe(e,t,s)});const U=e.querySelector("#poCancelBtn");U&&(U.onclick=()=>{ae=!1,qe(e,t,s)});const f=e.querySelector("#poForm");f&&(f.onsubmit=async l=>{l.preventDefault();const b=new FormData(f),D=String(b.get("poNo")||"").trim();if(!D)return;const A=f.querySelector('button[type="submit"]');A.disabled=!0;try{await q("update",{id:a.id,updates:{poNo:D,poDate:b.get("poDate")||"",paymentTerm:b.get("paymentTerm")||""}}),await q("transition",{id:a.id,to:"Ordered"}),T(a.id+" → Ordered (PO "+D+")"),ae=!1,B.refresh()}catch(G){T(G.message,!0),A.disabled=!1}});const E=e.querySelector("#zohoPushBtn");E&&(E.onclick=async()=>{E.disabled=!0;try{const{pr:l}=await q("zohoPushPo",{id:a.id});T(a.id+" → Zoho Books PO "+l.zohoPoNumber),B.refresh()}catch(l){T(l.message,!0),E.disabled=!1}});const p=e.querySelector("#devDelete");p&&(p.onclick=async()=>{if(confirm("Permanently DELETE "+a.id+"? This cannot be undone.")){p.disabled=!0;try{await q("delete",{id:a.id}),T(a.id+" deleted"),location.hash="#/",B.refresh()}catch(l){T(l.message,!0),p.disabled=!1}}})}let ue=null,z=null,xe="";const qa=["Domestic","International"];function He(e){return ue===null&&(ue=e.vendors||[]),ue}function xa(e){const t=e.lists&&e.lists.departments||[],s=He(e).flatMap(a=>a.departments||[]);return[...new Set([...t,...s])]}const O=(e,t,s,a="")=>`<label class="adm-field">${o(e)}
    <input class="adm-input" name="${t}" value="${o(s||"")}" placeholder="${o(a)}">
  </label>`;function Ia(e,t){const s=He(e),a=z&&s.find(i=>i.name.toLowerCase()===z.toLowerCase());if(a)return Ea(e,a);const n=[...s].sort((i,r)=>i.name.localeCompare(r.name));return`
    <div class="adm-card">
      ${Te(xe,"Search vendors — try “sensor”, “fab”, “ahmedabad”…")}
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
          ${n.map(i=>`<tr class="vRow" data-name="${o(i.name)}"
            data-search="${Oe(i.name,i.displayName,i.category,i.type,(i.departments||[]).join(" "))}"
            style="cursor:pointer">
            <td class="adm-name">${o(i.name)}</td>
            <td>${(i.departments||[]).map(r=>`<span class="adm-chip on">${o(r)}</span>`).join(" ")||'<span class="adm-email">—</span>'}</td>
            <td>${o(i.type||"—")}</td>
            <td>${o(i.category||"—")}</td>
            <td style="text-align:right">
              <button class="adm-del vRm" data-name="${o(i.name)}" title="Remove vendor">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="5" style="color:var(--adm-on-var)">No vendors yet — add the first one.</td></tr>'}
          ${je(5,"No vendor matches that name, category or department.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot"><span class="adm-count">${kt(n.length,n.length)}</span></div>
    </div>`}const kt=(e,t)=>e===t?`Showing ${t} vendor${t===1?"":"s"}`:`Showing ${e} of ${t} vendors`;function Ea(e,t){const s=Me(e.prs,t.name),a=(s.spendTotals.find(([r])=>r==="INR")||["INR",0])[1],n=e.lists&&e.lists.paymentTerms||[],i=["",...t.paymentTerms&&!n.includes(t.paymentTerms)?[t.paymentTerms,...n]:n].map(r=>`<option value="${o(r)}" ${r===(t.paymentTerms||"")?"selected":""}>${r?o(r):"—"}</option>`).join("");return`
    <div class="adm-card" style="padding:24px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px">
        <div>
          <div class="adm-sec" style="margin:0 0 4px">${o(t.type||"Vendor")}${t.type?" vendor":""}</div>
          <h2 style="font-size:24px;font-weight:600;color:var(--adm-primary);margin:0">${o(t.name)}</h2>
        </div>
        <button class="adm-del" id="vClose" title="Close"><span class="material-symbols-outlined">close</span></button>
      </div>

      <div class="adm-sec">Activity</div>
      <div class="adm-stats">
        <div class="adm-stat"><b>${s.count}</b><span>Purchase requests</span></div>
        <div class="adm-stat"><b>${o(se("INR",a))}</b><span>INR spend</span></div>
        <div class="adm-stat"><b>${s.unpaid}</b><span>Unpaid</span></div>
      </div>

      <div class="adm-sec">Departments</div>
      <div class="adm-chips" id="vDepts">
        ${xa(e).map(r=>`<button class="adm-chip ${(t.departments||[]).some(y=>y.toLowerCase()===r.toLowerCase())?"on":""}" data-dept="${o(r)}">${o(r)}</button>`).join("")}
      </div>

      <div class="adm-sec">Vendor details <span style="font-weight:400;text-transform:none">(editable)</span></div>
      <form id="vForm">
        <label class="adm-field" style="grid-column:1/-1">Vendor name
          <input class="adm-input" name="name" value="${o(t.name)}">
        </label>
        <div class="adm-grid2">
          ${O("Display name","displayName",t.displayName,"Shown on vendor cards")}
          ${O("Logo URL","logoUrl",t.logoUrl,"https://…/logo.png")}
        </div>
        <div class="adm-grid2">
          ${O("Category","category",t.category,"Sensors, PCB, Packaging…")}
          <label class="adm-field">Type
            <select class="adm-select" name="type">
              ${["",...qa].map(r=>`<option value="${o(r)}" ${r===(t.type||"")?"selected":""}>${r?o(r):"—"}</option>`).join("")}
            </select>
          </label>
          ${O("Contact person","contactPerson",t.contactPerson)}
          ${O("Phone","phone",t.phone)}
        </div>
        <label class="adm-field">Email <input class="adm-input" name="email" value="${o(t.email||"")}"></label>
        <label class="adm-field">Address <input class="adm-input" name="address" value="${o(t.address||"")}"></label>
        <div class="adm-grid2">
          ${O("GST / Tax ID","gstTaxId",t.gstTaxId)}
          ${O("Rating (1–5)","rating",t.rating)}
        </div>

        <div class="adm-sec">Banking &amp; payment</div>
        <label class="adm-field">Bank name <input class="adm-input" name="bankName" value="${o(t.bankName||"")}"></label>
        <div class="adm-grid2">
          ${O("Account number","accountNumber",t.accountNumber)}
          ${O("IFSC","ifsc",t.ifsc)}
        </div>
        ${O("SWIFT","swift",t.swift)}
        <label class="adm-field">Payment terms
          <select class="adm-select" name="paymentTerms">${i}</select>
        </label>

        <div class="adm-sec">Zoho Books</div>
        ${O("Zoho Vendor ID","zohoVendorId",t.zohoVendorId,"Contact ID from Zoho Books → Contacts")}

        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="adm-addbtn" type="submit">Save changes</button>
          <button class="btn" type="button" id="vCancel">Cancel</button>
        </div>
      </form>
    </div>`}function Ba(e,t,s){const a=async(c,v,S)=>{try{ue=(await q(c,v)).vendors,T(S),s()}catch(w){T(w.message,!0)}};Ue(e,{get:()=>xe,set:c=>{xe=c},count:kt,match:c=>new Set($t(He(t),c).map(v=>v.name))}),e.querySelectorAll(".vRow").forEach(c=>c.onclick=v=>{v.target.closest(".vRm")||(z=c.dataset.name,s())}),e.querySelectorAll(".vRm").forEach(c=>c.onclick=()=>{confirm(`Remove vendor "${c.dataset.name}"? PRs keep the name, but it leaves the registry.`)&&a("vendorRemove",{name:c.dataset.name},`${c.dataset.name} removed`)});const n=e.querySelector("#nvAdd");n&&(n.onclick=()=>{const c=e.querySelector("#nvName").value.trim();if(!c){T("Vendor name required",!0);return}z=c,a("vendorSet",{name:c,updates:{}},`${c} added — fill in the details`)});const i=()=>{z=null,s()},r=e.querySelector("#vClose");r&&(r.onclick=i);const m=e.querySelector("#vCancel");m&&(m.onclick=i),e.querySelectorAll("#vDepts .adm-chip").forEach(c=>c.onclick=()=>c.classList.toggle("on"));const y=e.querySelector("#vForm");y&&(y.onsubmit=c=>{c.preventDefault();const v={};for(const[w,C]of new FormData(y))v[w]=C.trim();v.departments=[...e.querySelectorAll("#vDepts .adm-chip.on")].map(w=>w.dataset.dept);const S=v.name||z;a("vendorSet",{name:z,updates:v},`${S} saved`),z=S})}function Fa(){z=null}const ne=["admin","approver","finance","requester"],Ma={admin:"Full access to settings, users, PRs, and analytics.",approver:"Can authorize purchase requests and manage procurement fields.",finance:"Sees POs ready for payment and marks them paid — not tied to a department.",requester:"Can create purchase requests and edit own submitted PRs."},lt=["#d1e5f7","#8cfb85","#d1e5f9","#e4e2e1"];let F="users",X=null,Ie="",oe=null,fe=null,K=!1;const ct={projects:{key:"project",label:"Project",respKey:"projects",plural:"projects",addRoute:"projectAdd",removeRoute:"projectRemove",q:"",get:()=>oe,set:e=>{oe=e},seed:e=>e.projects},types:{key:"materialType",label:"Item type",respKey:"materialTypes",plural:"item types",addRoute:"materialTypeAdd",removeRoute:"materialTypeRemove",q:"",get:()=>fe,set:e=>{fe=e},seed:e=>e.materialTypes}};function Oa(e){let t=0;for(const s of e)t=(t*31+s.charCodeAt(0))%lt.length;return lt[t]}const ke=e=>e[0].toUpperCase()+e.slice(1),ja={users:{title:"User & Role Management",desc:"Manage organizational access by assigning roles to team members. Changes are audited and logged for security compliance.",btn:'<span class="material-symbols-outlined" style="font-size:20px">person_add</span> Add User'},projects:{title:"Department Projects",desc:"Maintain each department’s running projects. The PR form only offers projects listed here.",btn:'<span class="material-symbols-outlined" style="font-size:20px">add</span> Add Project'},types:{title:"Department Item Types",desc:"Maintain each department’s item types. PR items must use a type listed for the requester’s department.",btn:'<span class="material-symbols-outlined" style="font-size:20px">category</span> Add Item Type'},vendors:{title:"Vendors",desc:"Register vendors, map them to departments, and keep contact, tax and banking details in one place. The PR form only offers a department’s vendors.",btn:'<span class="material-symbols-outlined" style="font-size:20px">storefront</span> Add Vendor'}};function Q(e,t){if(X===null){e.innerHTML='<div class="card">Loading users…</div>',q("usersList").then(a=>{X=a.users,Q(e,t)}).catch(a=>{e.innerHTML=`<div class="card">${o(a.message)}</div>`});return}oe===null&&(oe=t.projects||[]),fe===null&&(fe=t.materialTypes||[]);const s=ja[F];e.innerHTML=`
    <div class="adm">
      <div class="adm-head">
        <div>
          <h1>${s.title}</h1>
          <p>${s.desc}</p>
        </div>
        <button class="adm-addbtn" id="addToggle">${s.btn}</button>
      </div>
      <div class="adm-tabs">
        <button class="adm-tab ${F==="users"?"active":""}" data-tab="users">Users &amp; Roles</button>
        <button class="adm-tab ${F==="projects"?"active":""}" data-tab="projects">Projects</button>
        <button class="adm-tab ${F==="types"?"active":""}" data-tab="types">Item Types</button>
        <button class="adm-tab ${F==="vendors"?"active":""}" data-tab="vendors">Vendors</button>
      </div>
      ${F==="users"?Ua(t):F==="vendors"?Ia(t,K):Ka(t,ct[F])}
    </div>`,e.querySelectorAll(".adm-tab").forEach(a=>a.onclick=()=>{F=a.dataset.tab,K=!1,Fa(),Q(e,t)}),e.querySelector("#addToggle").onclick=()=>{if(K=!K,Q(e,t),K){const a=e.querySelector(".adm-addrow input, .adm-addrow select");a&&a.focus()}},F==="users"?Ha(e,t):F==="vendors"?Ba(e,t,()=>{K=!1,Q(e,t)}):za(e,t,ct[F])}function Ua(e){const t=a=>(ne.includes(a.role)?ne:[a.role,...ne]).map(n=>`<option value="${o(n)}" ${n===a.role?"selected":""} ${n?"":"disabled"}>${n?o(ke(n)):"— assign role —"}</option>`).join(""),s=a=>["",...a&&!pe(e).includes(a)?[a,...pe(e)]:pe(e)].map(n=>`<option value="${o(n)}" ${n===(a||"")?"selected":""}>${n?o(n):"— no department —"}</option>`).join("");return`
    <div class="adm-banner">
      <div class="adm-banner-left">
        <span class="material-symbols-outlined">shield_person</span>
        <span>Last admin protection active. System ensures at least one active Administrator remains.</span>
      </div>
    </div>
    <div class="adm-card">
      ${Te(Ie,"Search by name or email…")}
      ${K?`
      <div class="adm-addrow">
        <input id="newEmail" placeholder="person@oizom.com" class="adm-input">
        <select id="newRole" class="adm-select" style="width:auto">${ne.map(a=>`<option value="${a}">${ke(a)}</option>`).join("")}</select>
        <select id="newDept" class="adm-select" style="width:auto">${s("")}</select>
        <button class="adm-addbtn" id="addBtn">Add User</button>
      </div>`:""}
      <div style="overflow-x:auto">
        <table class="adm-tbl">
          <thead><tr>
            <th>User Details</th><th>Role Assignment</th><th>Department</th><th>Status</th><th style="text-align:right">Actions</th>
          </tr></thead>
          <tbody>
          ${[...X].sort((a,n)=>(a.role?1:0)-(n.role?1:0)).map(a=>{const n=a.name||Se(a.email);return`<tr data-search="${Oe(n,a.email)}">
            <td>
              <div class="adm-user">
                <div class="adm-avatar" style="background:${Oa(a.email)}">${o(Be(a.email))}${a.picture?`<img src="${o(a.picture)}" alt="" referrerpolicy="no-referrer" loading="lazy" onerror="this.remove()">`:""}</div>
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
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>`}).join("")}
          ${je(5,"No member matches that name or email.")}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">Showing ${X.length} of ${X.length} active members</span>
        <div class="adm-pager">
          <button disabled><span class="material-symbols-outlined" style="font-size:18px">chevron_left</span></button>
          <span>Page 1 of 1</span>
          <button disabled><span class="material-symbols-outlined" style="font-size:18px">chevron_right</span></button>
        </div>
      </div>
    </div>
    <div class="adm-roles">
      ${ne.map(a=>`<div class="adm-rolecard">
        <h4>${ke(a)}</h4>
        <p>${Ma[a]}</p>
      </div>`).join("")}
    </div>`}function Ha(e,t){Ue(e,{get:()=>Ie,set:n=>{Ie=n},count:(n,i)=>`Showing ${n} of ${i} active members`});const s=async(n,i,r)=>{try{X=(await q("userSet",{email:n,...i})).users,K=!1,T(r),Q(e,t)}catch(m){T(m.message,!0)}};e.querySelectorAll(".roleSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{role:n.value},`${n.dataset.email} → ${n.value}`)),e.querySelectorAll(".deptSel").forEach(n=>n.onchange=()=>s(n.dataset.email,{department:n.value},`${n.dataset.email} → ${n.value||"no department"}`)),e.querySelectorAll(".rmBtn").forEach(n=>n.onclick=()=>{confirm(`Are you sure you want to remove ${n.dataset.email}? This action is permanent.`)&&s(n.dataset.email,{role:""},`${n.dataset.email} removed`)});const a=e.querySelector("#addBtn");a&&(a.onclick=()=>{const n=e.querySelector("#newEmail").value.trim(),i=e.querySelector("#newRole").value,r=e.querySelector("#newDept").value;s(n,{role:i,department:r},`${n} → ${i}`)})}function pe(e){const t=e.lists&&e.lists.departments||[],s=(oe||[]).map(a=>a.department);return[...new Set([...t,...s])]}function Ka(e,t){const s=[...t.get()].sort((a,n)=>a.department.localeCompare(n.department)||a[t.key].localeCompare(n[t.key]));return`
    <div class="adm-card">
      ${Te(t.q,`Search ${t.plural} by name or department…`)}
      ${K?`
      <div class="adm-addrow">
        <select id="mpDept" class="adm-select" style="width:auto">
          ${pe(e).map(a=>`<option value="${o(a)}">${o(a)}</option>`).join("")||'<option value="">— no departments —</option>'}
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
          ${s.map(a=>`<tr data-search="${Oe(a.department,a[t.key])}">
            <td class="adm-name">${o(a.department)}</td>
            <td>${o(a[t.key])}</td>
            <td style="text-align:right">
              <button class="adm-del mpRm" data-dept="${o(a.department)}" data-val="${o(a[t.key])}" title="Remove">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </td>
          </tr>`).join("")||'<tr><td colspan="3" style="color:var(--adm-on-var)">Nothing listed yet — add the first one.</td></tr>'}
          ${je(3,`No ${t.label.toLowerCase()} matches that name or department.`)}
          </tbody>
        </table>
      </div>
      <div class="adm-foot">
        <span class="adm-count">${Dt(s.length,s.length,t)}</span>
      </div>
    </div>`}const Dt=(e,t,s)=>e===t?`Showing ${t} ${s.label.toLowerCase()}${t===1?"":"s"}`:`Showing ${e} of ${t} ${s.label.toLowerCase()}s`;function za(e,t,s){Ue(e,{get:()=>s.q,set:i=>{s.q=i},count:(i,r)=>Dt(i,r,s)});const a=async(i,r,m)=>{try{const y=await q(i,r);s.set(y[s.respKey]),K=!1,T(m),Q(e,t)}catch(y){T(y.message,!0)}},n=e.querySelector("#mpAdd");n&&(n.onclick=()=>{const i=e.querySelector("#mpDept").value,r=e.querySelector("#mpName").value.trim();a(s.addRoute,{department:i,[s.key]:r},`${i} / ${r} added`)}),e.querySelectorAll(".mpRm").forEach(i=>i.onclick=()=>{const{dept:r,val:m}=i.dataset;confirm(`Remove "${m}" from ${r}?`)&&a(s.removeRoute,{department:r,[s.key]:m},`${m} removed`)})}const be={requester:0,approver:1,finance:1,admin:2};function Ga(e,t){if(!t||!e||!e.minRole)return!0;const s=be[t.role];return s!=null&&s>=be[e.minRole]}const Ct=document.getElementById("app"),De={"":{fn:ht,nav:"Dashboard"},vendors:{fn:$a,nav:"Vendors",minRole:"admin"},insights:{fn:Tt,nav:"Insights",minRole:"approver"},new:{fn:Aa,minRole:"requester"},pr:{fn:qe},admin:{fn:Q,nav:"Admin",minRole:"admin"}};function Pt(){const e=location.hash.replace(/^#\/?/,"").split("/");return{name:e[0]||"",param:e[1]||null}}function _a(){Ct.innerHTML=`
    <div class="auth-gate">
      <img src="oizom-logo.png" alt="OIZOM" style="height:44px;margin-bottom:18px">
      <div class="auth-box">
        <h1>OIZOM <b>Procurement</b></h1>
        <p>Sign in with your @oizom.com Google account</p>
        <div id="gsignin" style="display:flex;justify-content:center"></div>
      </div>
    </div>`,xt(document.getElementById("gsignin"))}function Ke(){const e=B.get(),{name:t,param:s}=Pt(),a=De[t]||De[""],n=e.me?e.me.role:"";if(!Ga(a,e.me)){location.hash="#/";return}const i=Object.entries(De).filter(([,h])=>h.nav&&(!h.minRole||be[n]>=be[h.minRole])).map(([h,R])=>`<a href="#/${h}" class="${t===h?"active":""}">${R.nav}</a>`).join(""),r=e.notifications||[],m=r.filter(h=>!h.readAt).length,y=Nt()||{},c=y.email||(e.me?e.me.email:""),v=y.name||Se(c),S=y.picture?`<img class="avatar" src="${o(y.picture)}" alt="" referrerpolicy="no-referrer">`:`<span class="avatar avatar-txt">${o(Be(c))}</span>`;Ct.innerHTML=`
    <div class="topbar">
      <span class="logo"><img src="oizom-logo.png" alt="OIZOM" style="height:26px;vertical-align:middle;margin-right:2px"><b>Procurement</b></span>
      <nav>${i}</nav>
      <button class="iconbtn" id="btnRefresh" title="Refresh now">
        <span class="material-symbols-outlined ${e.loading?"spin":""}" style="font-size:20px">refresh</span>
      </button>
      <div class="nbell">
        <button class="iconbtn" id="nBtn" title="Notifications">
          <span class="material-symbols-outlined" style="font-size:20px">notifications</span>
          ${m?`<span class="nbadge">${m>9?"9+":m}</span>`:""}
        </button>
        <div class="npanel" id="nPanel" hidden>
          ${r.length?r.map(h=>`
          <div class="nitem ${h.readAt?"":"unread"}" ${h.prId?`data-pr="${o(h.prId)}"`:""}>
            <div class="nmsg">${o(h.message)}</div>
            <div class="ntime">${o(String(h.ts).slice(0,16).replace("T"," "))}</div>
          </div>`).join(""):'<div class="nempty">Nothing yet.</div>'}
        </div>
      </div>
      <div class="profile" id="profileBtn">
        <span class="pname">${o(v)}</span>
        ${S}
        <div class="pmenu" id="pMenu" hidden>
          <div class="pmail">${o(c)}</div>
          <button class="btn" id="btnOut" style="width:100%">Sign out</button>
        </div>
      </div>
    </div>
    <div class="main" id="view"></div>`,document.getElementById("btnRefresh").onclick=async()=>{await B.refresh(),B.get().err||T("Data refreshed")};const w=document.getElementById("nPanel");document.getElementById("nBtn").onclick=()=>{var h;w.hidden=!w.hidden,!w.hidden&&m&&(r.forEach(R=>{R.readAt||(R.readAt="now")}),(h=document.querySelector(".nbadge"))==null||h.remove(),q("notifRead").catch(()=>{}))},w.querySelectorAll(".nitem[data-pr]").forEach(h=>h.onclick=()=>{location.hash="#/pr/"+h.dataset.pr});const C=document.getElementById("pMenu");document.getElementById("profileBtn").onclick=h=>{h.target.id!=="btnOut"&&(C.hidden=!C.hidden)},document.getElementById("btnOut").onclick=Lt,a.fn(document.getElementById("view"),e,s)}window.addEventListener("hashchange",Ke);let mt="";B.subscribe(e=>{e.err&&e.err!==mt&&T(e.err,!0),mt=e.err});let ut=!1;B.subscribe(()=>{const e=!ut&&B.get().lastSync;e&&(ut=!0),!(Pt().name==="new"&&!e)&&Ke()});qt(()=>{B.refresh(),Ke()});ge()||_a();
