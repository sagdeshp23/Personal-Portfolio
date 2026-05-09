/* FILE: /js/main.js */
/* Last updated: 2026-05-09 */
/* Description: Navigation, filters, modals, chat, toast, copy email, and page initialization. */
// NAV
function goTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('mob-overlay').classList.toggle('active')}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('mob-overlay').classList.remove('active')}
function closeSidebarMob(){if(window.innerWidth<768)closeSidebar()}

// Active nav on scroll
const secs=['home','canvas','flow','copilot'];
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      document.querySelector(`[data-sec="${e.target.id}"]`)?.classList.add('active');
    }
  });
},{threshold:0.2,rootMargin:'-48px 0px -45% 0px'});
secs.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});

// Global search
document.getElementById('gsearch').addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  const q=e.target.value.toLowerCase().trim();
  const map={home:['home','about','maker','cert','test','sagar'],canvas:['canvas','project','app','ai','dataverse','automate','bi','power'],flow:['flow','exp','skill','work','job','experience'],copilot:['copilot','chat','contact','ask']};
  for(const[sec,kws]of Object.entries(map)){if(kws.some(k=>q.includes(k)||k.includes(q))){goTo(sec);e.target.value='';break}}
});

// Scroll reveal
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:0.07});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

document.addEventListener('click', event => {
  const target = event.target.closest('[data-action], [data-goto], [data-filter], [data-modal], [data-question], .lang-btn');
  if(!target) return;
  const action = target.dataset.action;
  if(target.classList.contains('lang-btn') && window.setLang){
    window.setLang(target.dataset.lang);
    return;
  }
  if(target.dataset.goto){
    goTo(target.dataset.goto);
    if(target.dataset.closeSidebarMobile) closeSidebarMob();
  }
  if(target.dataset.filter) filterP(target.dataset.filter, target);
  if(target.dataset.modal) openModal(Number(target.dataset.modal));
  if(target.dataset.question) sendQ(target.dataset.question);
  if(action === 'toggle-sidebar') toggleSidebar();
  if(action === 'close-sidebar') closeSidebar();
  if(action === 'open-linkedin') window.open('https://www.linkedin.com/in/sagar-deshpande2306/','_blank');
  if(action === 'copy-email') copyEmail();
  if(action === 'clear-chat') clearChat();
  if(action === 'send-msg') sendMsg();
  if(action === 'close-modal') closeModal();
});

// Project filter
function filterP(tag,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#pgrid article').forEach((c,i)=>{
    const tags=c.dataset.t||'';
    const show=tag==='all'||tags.includes(tag);
    c.style.display=show?'flex':'none';
    if(show){c.style.opacity='0';c.style.transform='translateY(14px)';setTimeout(()=>{c.style.transition='opacity .35s,transform .35s';c.style.opacity='1';c.style.transform='translateY(0)'},i*40)}
  });
}

// Project modal data
const PM=[
  {t:'AI-Powered Document Processing',co:'Freelance · 2025',col:'var(--accent-apps)',ic:'document_scanner',tags:['Power Apps','AI','Dataverse','Power Automate','Azure OpenAI'],desc:'Replaced a 100% manual real estate document review workflow with an end-to-end AI pipeline. Power Automate handles upload, GPT-4.1 classifies and extracts structured metadata, Dataverse stores records — with confidence-based routing for edge cases requiring human review.',tech:['Power Apps','Power Automate','Azure OpenAI','GPT-4.1','Dataverse','Model-Driven App','Environment Variables','Modular Child Flows'],pts:['Multi-stage pipeline: upload → AI classification → metadata extraction → Dataverse record creation','Confidence-based routing using configuration tables instead of hardcoded logic','Multi-entity upsert engine: Deal, Asset, Building, and Unit hierarchical levels','Centralised error logging and monitoring via admin Model-Driven App','Clean Dev/Test/Prod deployments using Environment Variables and modular child flows']},
  {t:'JSON-Schema Dynamic Form Engine',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','PCF Controls'],desc:'Canvas App powered by a JSON-Schema-driven engine managing 80+ entities and 1,000+ attributes. Business users can add, hide, show, or modify fields in real time — zero code changes required per configuration update.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','JavaScript','PCF Controls'],pts:['80+ entities and 1,000+ attributes managed from Dataverse-stored schemas','Zero redeploy required for any field configuration changes','Real-time dynamic grid and configuration interface for business users','Recursive component architecture for arbitrarily nested form structures','Dark/Light mode UI with KPI dashboards and embedded Power BI reports']},
  {t:'Advanced Copilot Studio Agent',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'smart_toy',tags:['AI','Copilot Studio','MCP Server','Dataverse'],desc:'Enterprise-grade Copilot agents supporting file uploads, dynamic form retrieval, and full CRUD operations via a configured MCP server. Knowledge articles embedded directly in the agent for guided walkthroughs. Result: ~40% reduction in average ticket resolution time and zero developer intervention needed for routine data requests post-deployment.',tech:['Copilot Studio','MCP Server','Dataverse','Power Automate','Knowledge Base'],pts:['MCP Server integration for secure CRUD on internal SQL databases and proprietary APIs','Dynamic form retrieval — agent generates and fills forms contextually','File upload flows with AI-driven processing and routing','Embedded knowledge base for step-by-step guided workflow walkthroughs','~40% reduction in ticket resolution time — no developer needed for routine data requests']},
  {t:'190+ Hours Saved: Enterprise Automation Suite',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Microsoft Teams'],desc:'A comprehensive suite of Power Automate flows eliminating over 190 hours of manual monthly effort — approval routing, document workflows, cross-platform notifications, and scheduled pipelines.',tech:['Power Automate','SharePoint','Microsoft Teams','Email','Excel','Scheduled Flows'],pts:['190+ hours of team bandwidth freed monthly across all automated workflows','Approval routing flows with multi-stage escalation and tracking','Document processing workflows with automated filing and metadata tagging','Cross-platform notifications via Teams and Email with dynamic content','Scheduled maintenance pipelines replacing manual weekly reporting tasks']},
  {t:'Enterprise Power BI Reporting Suite',co:'T-Systems · 2022–2024',col:'var(--accent-apps)',ic:'bar_chart',tags:['Power BI','DAX','ServiceNow','Azure DevOps'],desc:'Three end-to-end Power BI solutions built on complex data models: a 5-level drillable ticket hierarchy, a DevOps license compliance tracker, and a ServiceNow SLA reaction time report.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','ServiceNow','Azure DevOps'],pts:['5-level drillable ticket hierarchy: Projects → Services → Sub-Services → Tickets → Categories','DevOps toolchain license compliance across 7–8 tools — flags licenses unused for 6+ months','ServiceNow SLA report: Open → In Progress → Pending → Closed lifecycle tracking','All three built on multi-table data models with Power Query transformations','Embedded as interactive reports within Power Apps for unified UX']},
  {t:'AI Assistance — Upload to Autofill',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'auto_awesome',tags:['Power Apps','Azure OpenAI','Dataverse'],desc:'A single Canvas App screen handling the entire document-to-data pipeline: upload document → Power Automate triggers Azure OpenAI extraction → confidence scoring routes for auto-fill or manual review.',tech:['Canvas Apps','Azure OpenAI','Power Automate','Dataverse','PCF Controls'],pts:['Single-screen UX for the full upload-to-fill pipeline — no page navigation required','GPT-4.1 extracts structured data from unstructured documents precisely','High confidence → auto-fill; low confidence → flagged for human review','PCF controls for enhanced file upload experience with preview support','Zero manual data entry for standard documents in production']}
];

function accentClass(col){
  if(String(col).includes('automate')) return 'accent-automate';
  if(String(col).includes('bi')) return 'accent-bi';
  if(String(col).includes('copilot')) return 'accent-copilot';
  return 'accent-apps';
}

function openModal(i){
  const p=PM[i];
  document.getElementById('modal-body').innerHTML=`
    <div class="modal-project ${accentClass(p.col)}">
    <div class="modal-project-head">
      <div class="modal-project-icon">
        <span class="msym mf">${p.ic}</span>
      </div>
      <div><h2 class="modal-project-title">${p.t}</h2><div class="modal-project-company">${p.co}</div></div>
    </div>
    <div class="modal-project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
    <p class="modal-project-desc">${p.desc}</p>
    <h3 class="modal-project-section">Key Achievements</h3>
    <div class="modal-project-points">${p.pts.map(b=>`<div><span class="msym">check_circle</span><span>${b}</span></div>`).join('')}</div>
    <h3 class="modal-project-section">Tech Stack</h3>
    <div class="modal-project-tech">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div>
    </div>`;
  const m=document.getElementById('proj-modal');
  m.style.display='flex';
}
function closeModal(){document.getElementById('proj-modal').style.display='none'}

// CHAT
const RESP={
  skills:()=>`Sagar's strongest skills centre on the Microsoft Power Platform:\n\n**Power Apps** — Canvas and Model-Driven Apps, including a JSON-Schema engine managing 80+ entities and PCF custom controls.\n\n**Power Automate** — Complex multi-stage pipelines, approval flows, document extraction, and 190+ hours of monthly savings at T-Systems.\n\n**AI Integration** — Azure OpenAI GPT-4.1 for document processing, Copilot Studio agents with MCP Server, and confidence-based routing logic.\n\n**Dataverse** — Relational architectures, Dev/Test/Prod governance, and multi-entity hierarchical data modelling.\n\n**German C1** — Used daily in client-facing meetings and technical kick-offs with DACH customers.`,
  german:()=>`Sagar holds a C1 (Professional Proficiency) German certification — not just listed on a CV, but actively used every day.\n\nAt **T-Systems ICT India**, he:\n- Led technical kick-off meetings directly with native German-speaking clients\n- Provided Level 1 technical and business support in German\n- Acted as Team Lead for German-speaking customer accounts\n- Achieved **87% CSAT** while handling 50+ daily interactions in German at Concentrix\n\nThis is a rare differentiator — it opens direct DACH market access without requiring a German intermediary.`,
  app:()=>`The standout example is the **JSON-Schema Dynamic Form Engine** at Adastra:\n\nA recursive Canvas App generating complex UI forms directly from Dataverse-stored JSON schemas:\n- Supports **80+ entities** and **1,000+ attributes**\n- Business users modify fields in real time — zero code changes\n- PCF controls, Dark/Light mode UI, embedded Power BI reports\n\nAnother major project: the **AI-Powered Document Processing** system — GPT-4.1 extracts metadata from PDFs, routes via confidence scoring, creates Dataverse records automatically — replacing 100% manual review.`,
  contact:()=>`Here are Sagar's direct contact details:\n\n📧 **Email:** deshpande.sagar.milind@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/sagar-deshpande2306\n📍 **Location:** Pune, Maharashtra, India\n📱 **Phone:** +91 90286 82226\n\nHe is open to opportunities and available for interviews. Remote-friendly and open to relocation for the right role.`,
  cert:()=>`Sagar holds two current Microsoft certifications:\n\n🏅 **PL-400** — Microsoft Certified: Power Platform Developer Associate (May 2025)\nThe advanced developer certification — covering custom connectors, PCF controls, and complex Canvas App development.\n\n🏅 **PL-900** — Microsoft Certified: Power Platform Fundamentals (October 2024)\n\nBoth are from 2024–2025, reflecting active upskilling alongside his professional work.`,
  exp:()=>`Sagar's professional journey spans 5+ years:\n\n**Concentrix** (Jun 2020 – Mar 2022)\nAdvisor I — Built C1 German communication with native DACH clients. 87% CSAT, 90%+ RAP.\n\n**T-Systems ICT India** (May 2022 – Dec 2024)\nJunior Consultant — Automated 190+ hrs/month, built Canvas Apps, Power Automate suites, Power BI dashboards. Led German-language kick-offs.\n\n**Adastra** (Jan 2025 – Present)\nData Engineer (Power Platform) — AI pipelines, Copilot Studio agents with MCP Server, JSON-Schema form engine, PCF controls, Azure DevOps governance.\n\n**Freelance** (Jul – Dec 2025)\nEnd-to-end AI real estate document processing with GPT-4.1 and Dataverse.`,
  hire:()=>`Three things make Sagar stand out:\n\n**1. User-first thinking from an economics background**\nHe didn't start in CS — he started in economics. This gives him a systemic, non-technical perspective that most developers lack. His apps require almost no user training.\n\n**2. C1 German fluency**\nActually leading technical kick-offs with native DACH clients — not just listed on a CV. Opens European markets most Indian developers can't access directly.\n\n**3. Full-stack Power Platform depth**\nFrom Canvas Apps with PCF controls to AI pipelines with GPT-4.1 to Copilot Studio agents with MCP Server CRUD — Sagar works at the advanced end of the spectrum.\n\n"The apps he delivers require almost no user training — and that's the hardest thing to achieve in enterprise software." — Madhura Gokhale`,
  portfolio:()=>`Sagar's portfolio has 6 projects across 3 companies:\n\n1. **AI Document Processing** — GPT-4.1 + Dataverse pipeline (Freelance)\n2. **JSON-Schema Form Engine** — 80+ entities, zero-redeploy config (Adastra)\n3. **Copilot Studio Agent** — MCP Server + CRUD (Adastra)\n4. **190+ Hrs Automation Suite** — Power Automate at enterprise scale (T-Systems)\n5. **Power BI Suite** — 3 dashboards, 5-level drilldowns (T-Systems)\n6. **AI Upload-to-Autofill** — Single-screen Azure OpenAI pipeline (Adastra)\n\nExplore each in The Canvas section of this portfolio.`
};

function getResp(msg){
  const m=msg.toLowerCase();
  if(m.includes('skill')||m.includes('expertise')||m.includes('top')||m.includes('best at'))return RESP.skills();
  if(m.includes('german')||m.includes('deutsch'))return RESP.german();
  if(m.includes('power app')||m.includes('complex')||m.includes('built')||m.includes('canvas'))return RESP.app();
  if(m.includes('contact')||m.includes('email')||m.includes('phone')||m.includes('reach')||m.includes('linkedin'))return RESP.contact();
  if(m.includes('certif'))return RESP.cert();
  if(m.includes('experience')||m.includes('work')||m.includes('job')||m.includes('career')||m.includes('company'))return RESP.exp();
  if(m.includes('hire')||m.includes('why')||m.includes('should'))return RESP.hire();
  if(m.includes('portfolio')||m.includes('highlight')||m.includes('project'))return RESP.portfolio();
  return `Great question! Sagar is a Power Platform + AI Engineer with 5+ years of experience specialising in Canvas Apps, Power Automate, AI integrations (GPT-4.1), Copilot Studio, and Dataverse — with C1 German fluency used daily.\n\nTry asking about:\n• His top skills\n• German expertise\n• A specific project\n• Work experience\n• Contact information\n• Why you should hire him`;
}

function fmt(t){return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>').replace(/^• /gm,'&#8226; ')}

function addMsg(role,text){
  const w=document.getElementById('chat-msgs');
  const d=document.createElement('div');
  d.className='chat-msg';
  if(role==='bot'){
    d.innerHTML=`<div class="chat-row bot"><div class="chat-avatar"><img src="avatar.png" alt="Sagar"></div><div class="chat-stack bot"><span class="chat-author">Sagar's Copilot</span><div class="chat-bubble bot">${fmt(text)}</div></div></div>`;
  }else{
    d.innerHTML=`<div class="chat-row user"><div class="chat-stack user"><span class="chat-author">You</span><div class="chat-bubble user">${text}</div></div><div class="chat-avatar user"><span class="msym">person</span></div></div>`;
  }
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}

function addTyping(){
  const w=document.getElementById('chat-msgs');
  const d=document.createElement('div');d.id='typing';
  d.innerHTML=`<div class="chat-row bot typing-row"><div class="chat-avatar"><img src="avatar.png" alt="Sagar"></div><div class="typing-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`;
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}

function removeTyping(){document.getElementById('typing')?.remove()}

function sendMsg(){
  const inp=document.getElementById('chat-input');
  const msg=inp.value.trim();if(!msg)return;
  inp.value='';inp.style.height='34px';
  addMsg('user',msg);addTyping();
  setTimeout(()=>{removeTyping();addMsg('bot',getResp(msg))},700+Math.random()*600);
}

function sendQ(q){addMsg('user',q);addTyping();setTimeout(()=>{removeTyping();addMsg('bot',getResp(q))},700+Math.random()*600)}

function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}}
function autores(el){el.style.height='34px';el.style.height=Math.min(el.scrollHeight,80)+'px'}
function clearChat(){const w=document.getElementById('chat-msgs');while(w.children.length>1)w.removeChild(w.lastChild)}

document.getElementById('chat-input').addEventListener('focus',()=>{document.getElementById('chat-wrap').classList.add('is-focused')});
document.getElementById('chat-input').addEventListener('blur',()=>{document.getElementById('chat-wrap').classList.remove('is-focused')});
document.getElementById('chat-input').addEventListener('keydown',handleKey);
document.getElementById('chat-input').addEventListener('input',event=>autores(event.target));

// COPY EMAIL
function copyEmail(){
  navigator.clipboard.writeText('deshpande.sagar.milind@gmail.com').then(()=>toast('Email copied!')).catch(()=>toast('deshpande.sagar.milind@gmail.com'));
}

function toast(msg){
  const el=document.getElementById('toast');
  document.getElementById('toast-txt').textContent=msg;
  el.classList.add('show');el.style.opacity='1';
  setTimeout(()=>{el.style.opacity='0';el.classList.remove('show')},2800);
}

// INIT
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('[data-sec="home"]')?.classList.add('active');
  setTimeout(()=>{document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('vis')})},120);
});
