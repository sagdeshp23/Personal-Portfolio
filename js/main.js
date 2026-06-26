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
  if(action === 'download-cv') downloadCV();
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
  {t:'ESG Data Collector — Dynamic Form Engine',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','Azure AI'],desc:'A like-for-like Power Platform replacement for a costly third-party ESG application, delivered within a three-month window. Rather than rebuilding 80+ individually designed forms, I built a single JSON schema-driven Canvas App form and grid: every field change and new entity is pure configuration — no developer required. Spans 80+ entities and 1,000+ attributes.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','Azure AI','Power Automate'],pts:['JSON schema-driven engine: one Canvas App form + grid covering 80+ entities and 1,000+ attributes','New entities and field changes are configuration-only — zero developer involvement','Dynamic grid and real-time configuration interface for live field management','AI-assisted data capture: upload a document and Azure AI pre-populates the relevant fields','AI output saved as JSON for the client\'s downstream systems','Delivered within the original 3-month timeline at a fraction of the third-party tool cost']},
  {t:'ESG Copilot Studio Agent',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'smart_toy',tags:['AI','Copilot Studio','MCP Server','Dataverse'],desc:'Built on top of the ESG Data Collector so users can submit ESG data without ever opening the Canvas App. A Copilot Studio agent deployed in Microsoft Teams and Copilot Chat, with the conversation driven by the JSON schema defined per entity. Ran in production.',tech:['Copilot Studio','MCP Server','Power Automate','Dataverse','SharePoint','Adaptive Cards','JSON Schema'],pts:['Deployed in Microsoft Teams and Copilot Chat — no Canvas App needed to submit data','Conversation driven by the per-entity JSON schema; configured topics, custom prompts, diversions, and escalation flows','Power Automate integration for Dataverse updates, SharePoint file creation, and complex JSON parsing','Custom prompts convert user input and uploaded document content into structured JSON for Adaptive Card rendering','MCP server configured for dynamic form retrieval and CRUD operations','Embedded knowledge articles for in-chat guidance; ran in production']},
  {t:'190+ Hours Saved: Process Automation',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Excel'],desc:'Multiple Power Automate flows automating business processes across the team, generating 190+ hours of additional team bandwidth. Integrated with SharePoint and Excel as the primary data sources.',tech:['Power Automate','SharePoint','Excel','Microsoft Teams','Scheduled Flows'],pts:['190+ hours of additional team bandwidth generated','Multiple flows automating business processes across the whole team','SharePoint and Excel as primary data sources','Approval routing, document workflows, and scheduled pipelines','Replaced manual, repetitive reporting and coordination tasks']},
  {t:'ServiceNow Reporting — Ticket Hierarchy',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'account_tree',tags:['Power BI','DAX','ServiceNow'],desc:'An end-to-end weekly ServiceNow reporting solution built on a five-level hierarchy data model — Registered Projects → Services → Sub-Services → Tickets → Ticket Category — with complex DAX measures and interactive dashboards. Covered the full pipeline from data modelling and Power Query transformations through to slicer- and drilldown-driven dashboards.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','ServiceNow'],pts:['5-level hierarchy data model: Projects → Services → Sub-Services → Tickets → Categories','Complex DAX measures powering the reporting logic','Interactive dashboards with slicers and drilldowns','End-to-end weekly reporting: data modelling + Power Query transformations','Built on ServiceNow ticket data']},
  {t:'DevOps Toolchain License Report',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'key',tags:['Power BI','Compliance','T-Systems'],desc:'Tracks active users, maximum seats, and free capacity across 7–8 DevOps tools — with a dedicated view for the playground instance and a flag identifying licenses unused for 6+ months. Gave the project full visibility over spend and compliance in one place.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','T-Systems'],pts:['Tracks across 7-8 DevOps tools: active users, max seats, free capacity','Dedicated playground instance view','Identifies licenses unused for 6+ months','Full spend and compliance visibility in single dashboard','Automated unused license flagging for cost optimisation']},
  {t:'ServiceNow SLA Reaction Report',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'timer',tags:['Power BI','ServiceNow','T-Systems'],desc:'Measures full ticket lifecycle time: Open → In Progress → Pending → Closed. Surfaced SLA compliance gaps and gave team leads a factual, data-driven basis for performance conversations.',tech:['Power BI','DAX Measures','Power Query (M)','ServiceNow Integration','T-Systems'],pts:['Full ticket lifecycle tracking: Open → In Progress → Pending → Closed','SLA compliance gap identification','Team lead performance metrics and conversations','Data-driven factual basis for escalations','ServiceNow real-time data refresh']},
  {t:'Adastra BI & Allocation Reporting Suite',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'bar_chart',tags:['Power BI','Dataverse','Adastra'],desc:'Two Power BI solutions built at Adastra. The Allocation Report delivers accurate, validated allocation data once the Allocation Management App went live — complex business logic, multi-source data transformation, and performance-optimised modelling. Bench Reporting is an automated solution using dynamic parameters, bookmarks, DAX measures, and drilldown visuals, embedded directly within the app for real-time access.',tech:['Power BI','DAX Measures','Power Query (M)','Dataverse','Bookmarks'],pts:['Allocation Report: complex business logic, multi-source data transformation, performance-optimised modelling','Built to give the business accurate, validated allocation data once the Allocation Management App went live','Bench Reporting: dynamic parameters, bookmarks, DAX measures, and drilldown visuals','Bench report embedded directly within the app for real-time access','Reporting source migrated from Excel to Dataverse']},
  {t:'AI Assistance — Upload to Autofill',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'auto_awesome',tags:['Power Apps','Azure AI','Dataverse'],desc:'The AI-assisted data capture feature of the ESG Data Collector. On a single Canvas App screen, users upload a document and Azure AI models pre-populate the relevant ESG fields automatically. Output is saved as JSON for the client\'s downstream systems — removing manual data entry for standard documents.',tech:['Canvas Apps','Azure AI','Power Automate','Dataverse','JSON'],pts:['AI-assisted capture feature built into the ESG Data Collector','Upload a document → Azure AI pre-populates the relevant fields automatically','Output saved as structured JSON for the client\'s downstream systems','Single-screen UX — no manual data entry for standard documents','Confidence-aware: low-certainty fields flagged for human review']},
  {t:'Allocation Management App',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'assignment_turned_in',tags:['Power Apps','Dataverse','Power Automate','Power BI'],desc:'Built for an internal client to replace a fully manual, Excel-based process for managing employee allocations across practices. Project Responsibles raise allocation requests; Practice Leads approve them. The old process had no validation — duplicate records, over-allocations, and overlapping assignments — and two colleagues spent ~60 hours a month just coordinating between both sides. Post go-live, monthly process time dropped from 60 hours to 8–10 hours: an 83% reduction.',tech:['Model-Driven Apps','Custom Pages','Dataverse','Power Automate','Adaptive Cards','Office Scripts','Dataflows','Security Roles','Power BI'],pts:['Model-Driven App with a custom page layer on Dataverse','Approval workflows via Power Automate with Adaptive Cards delivered in Teams and Outlook','HTML controls for a real-time approval progress bar, audit history, and inline over-allocation / overlap warnings','Bulk uploads via SharePoint — Office Scripts extract Excel table data into JSON arrays for flow processing','Dataflows for scheduled master-data imports; custom security roles and access teams scoped per Project Lead and Practice Lead','Power BI report migrated from Excel to Dataverse as source','83% reduction in monthly process time: 60 hours → 8–10 hours']},
  {t:'Document Intelligence Pipeline',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'document_scanner',tags:['Power Automate','Azure AI','Dataverse','Power Pages'],desc:'Automatic content extraction, document-type classification, and metadata loading into Dataverse for thousands of documents — 500+ document types across 60+ families belonging to six different teams. Began with a formal requirements phase (functional and non-functional requirements captured with a dedicated Business Analyst, plus a requirements specification) and a full architecture design before any development began.',tech:['Power Automate','Azure REST API','Azure AI Services','Dataverse','Model-Driven Apps','Power Pages','DBDiagram.io'],pts:['500+ document types across 60+ families spanning six teams','Requirements specification, DBDiagram.io data model, and architecture diagram produced before development','Parent flow orchestrating four child flows scoped to different triggers','Power Automate → Azure REST API for content extraction → Azure AI Services for classification → metadata into Dataverse','Frontend: Model-Driven App with custom pages (internal) and Power Pages (external)','Classification logic configurable for new document types without rebuilding flows']},
  {t:'Power Virtual Agents Bot',co:'T-Systems · 2022–2024',col:'var(--accent-copilot)',ic:'support_agent',tags:['Power Virtual Agents','Chatbot'],desc:'Conversational bots built with Power Virtual Agents to handle first-line user queries — configuring topics, trigger phrases, and conversation nodes.',tech:['Power Virtual Agents','Topics','Trigger Phrases','Conversation Nodes'],pts:['Handled first-line user queries to deflect routine requests','Configured topics and trigger phrases','Designed conversation nodes and dialog flows','Early conversational-AI foundation later extended into Copilot Studio work']}
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
  app:()=>`The standout example is the **ESG Data Collector** at Adastra:\n\nA JSON schema-driven Canvas App that replaced a costly third-party ESG tool — built in 3 months instead of rebuilding 80+ forms:\n- Supports **80+ entities** and **1,000+ attributes**\n- New entities and field changes are configuration-only — zero code\n- AI-assisted capture: upload a document, Azure AI pre-fills the fields\n\nAnother major project: the **Document Intelligence Pipeline** — Power Automate calls Azure REST API for content extraction and Azure AI Services for classification across **500+ document types** in 60+ families, loading metadata into Dataverse, with a Model-Driven App and Power Pages front end.`,
  contact:()=>`Here are Sagar's direct contact details:\n\n📧 **Email:** deshpande.sagar.milind@gmail.com\n🔗 **LinkedIn:** linkedin.com/in/sagar-deshpande2306\n📍 **Location:** Pune, Maharashtra, India\n📱 **Phone:** +91 90286 82226\n\nHe is open to opportunities and available for interviews. Remote-friendly and open to relocation for the right role.`,
  cert:()=>`Sagar holds two current Microsoft certifications:\n\n🏅 **PL-400** — Microsoft Certified: Power Platform Developer Associate (May 2025)\nThe advanced developer certification — covering custom connectors, PCF controls, and complex Canvas App development.\n\n🏅 **PL-900** — Microsoft Certified: Power Platform Fundamentals (October 2024)\n\nBoth are from 2024–2025, reflecting active upskilling alongside his professional work.`,
  exp:()=>`Sagar's professional journey spans 5+ years:\n\n**Concentrix** (Jun 2020 – Mar 2022)\nAdvisor I — Built C1 German communication with native DACH clients. 87% CSAT, 90%+ RAP.\n\n**T-Systems ICT India** (May 2022 – Dec 2024)\nJunior Consultant — Automated 190+ hrs/month, built Canvas Apps, Power Automate suites, Power BI dashboards. Led German-language kick-offs.\n\n**Adastra** (Jan 2025 – Present)\nData Engineer (Power Platform) — ESG Data Collector, ESG Copilot Studio agent with MCP Server, Document Intelligence Pipeline with Azure AI, Azure DevOps governance.`,
  hire:()=>`Three things make Sagar stand out:\n\n**1. User-first thinking from an economics background**\nHe didn't start in CS — he started in economics. This gives him a systemic, non-technical perspective that most developers lack. His apps require almost no user training.\n\n**2. C1 German fluency**\nActually leading technical kick-offs with native DACH clients — not just listed on a CV. Opens European markets most Indian developers can't access directly.\n\n**3. Full-stack Power Platform depth**\nFrom Canvas Apps with PCF controls to AI pipelines with GPT-4.1 to Copilot Studio agents with MCP Server CRUD — Sagar works at the advanced end of the spectrum.\n\n"What truly sets him apart is his attitude: proactive, innovative, and with a great work ethic. He identifies opportunities before being asked and always delivers with quality." — Max Rink, Cloud Architect @ Adastra`,
  portfolio:()=>`Sagar's portfolio has 11 projects across Adastra and T-Systems:\n\n1. **ESG Data Collector** — JSON schema-driven form engine, 80+ entities (Adastra)\n2. **ESG Copilot Studio Agent** — Teams + Copilot Chat, MCP server (Adastra)\n3. **190+ Hrs Process Automation** — Power Automate across the team (T-Systems)\n4. **ServiceNow Reporting** — 5-level hierarchy data model (T-Systems)\n5. **DevOps License Report** — Multi-tool tracking and compliance (T-Systems)\n6. **ServiceNow SLA Report** — Full lifecycle tracking (T-Systems)\n7. **Adastra BI & Allocation Suite** — Allocation Report + Bench Reporting (Adastra)\n8. **AI Upload-to-Autofill** — ESG AI capture, single-screen (Adastra)\n9. **Allocation Management App** — 60 → 8-10 hrs/month, 83% reduction (Adastra)\n10. **Document Intelligence Pipeline** — Azure AI, 500+ doc types (Adastra)\n11. **Power Virtual Agents Bot** — First-line query chatbot (T-Systems)\n\nExplore each in The Canvas section of this portfolio.`
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
    d.innerHTML=`<div class="chat-row bot"><div class="chat-avatar"><img src="images/avatar/sagar.png" alt="Sagar"></div><div class="chat-stack bot"><span class="chat-author">Sagar's Copilot</span><div class="chat-bubble bot">${fmt(text)}</div></div></div>`;
  }else{
    d.innerHTML=`<div class="chat-row user"><div class="chat-stack user"><span class="chat-author">You</span><div class="chat-bubble user">${text}</div></div><div class="chat-avatar user"><span class="msym">person</span></div></div>`;
  }
  w.appendChild(d);w.scrollTop=w.scrollHeight;
}

function addTyping(){
  const w=document.getElementById('chat-msgs');
  const d=document.createElement('div');d.id='typing';
  d.innerHTML=`<div class="chat-row bot typing-row"><div class="chat-avatar"><img src="images/avatar/sagar.png" alt="Sagar"></div><div class="typing-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`;
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

function downloadCV(){
  const a=document.createElement('a');
  a.href='Sagar-Deshpande-Resume.pdf';
  a.download='Sagar Deshpande - Resume.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('Downloading resume…');
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
