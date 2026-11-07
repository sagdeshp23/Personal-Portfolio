/* FILE: /js/main.js */
/* Last updated: 2026-10 to 25 */
/* Description: Navigation, filters, modals, chat, toast, copy email, and page initialization. */
// i18n hooks (set by js/lang.js; English fallbacks keep this file working on its own)
function t(s){return window.translate?window.translate(s):s}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

// NAV
function goTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('mob-overlay').classList.toggle('active')}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('mob-overlay').classList.remove('active')}
function closeSidebarMob(){if(window.innerWidth<768)closeSidebar()}

// Active nav on scroll
const secs=['home','flow','canvas','proof','report','copilot'];
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      document.querySelector(`[data-sec="${e.target.id}"]`)?.classList.add('active');
    }
  });
},{threshold:0,rootMargin:'-45% 0px -54% 0px'});
secs.forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});

// Global search (English + German keywords; one handler only)
document.getElementById('gsearch').addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  const q=e.target.value.toLowerCase().trim();
  if(q.length<2)return;
  const map={
    home:['home','about','maker','sagar','start','über','ueber'],
    canvas:['canvas','project','projekt','app','ai','ki','dataverse','automate','bi','power'],
    flow:['flow','exp','skill','work','job','experience','erfahrung','laufbahn','beruf','lutz','dozent','trainer'],
    report:['report','bericht','decision','entscheidung','cert','zertifikat','testimonial','stimmen','referenz'],
    copilot:['copilot','chat','contact','ask','kontakt','frage','govern','dlp','alm']
  };
  for(const[sec,kws]of Object.entries(map)){if(kws.some(k=>q.includes(k)||k.includes(q))){goTo(sec);e.target.value='';break}}
});

// Keyboard support for non-button elements that act as buttons (nav links, header avatar)
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&document.getElementById('proj-modal').style.display==='flex'){closeModal();return}
  if(e.key==='Tab')trapModalFocus(e);
  if((e.key==='Enter'||e.key===' ')&&e.target.matches?.('[role="button"]')&&e.target.id!=='formula-toggle'){e.preventDefault();e.target.click()}
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
// Filter = a Power Apps gallery Filter(): cards that stay animate from their old spot (FLIP)
function filterP(tag,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
  btn.classList.add('active');btn.setAttribute('aria-pressed','true');
  const cards=[...document.querySelectorAll('#pgrid article')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const before=new Map(cards.map(c=>[c,c.getBoundingClientRect()]));
  let n=0,k=0;
  cards.forEach(c=>{
    const show=tag==='all'||(c.dataset.t||'').split(',').includes(tag);
    const wasHidden=c.classList.contains('is-hidden');
    c.classList.toggle('is-hidden',!show);
    c.classList.add('vis');
    if(!show)return;
    n++;
    if(reduce)return;
    if(wasHidden){
      c.animate([{opacity:0,transform:'translateY(18px) scale(.96)'},{opacity:1,transform:'none'}],{duration:450,delay:k++*45,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
    }else{
      const a=before.get(c),b=c.getBoundingClientRect();
      const dx=a.left-b.left,dy=a.top-b.top;
      if(dx||dy)c.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:500,easing:'cubic-bezier(.2,.7,.2,1)'});
    }
  });
  const cnt=document.getElementById('filter-count');
  if(cnt)cnt.textContent='CountRows: '+n;
}

// Project modal data
const PM=[
  {t:'ESG Data Collector: Dynamic Form Engine',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','Azure AI'],desc:'The client was paying high running costs for a third-party ESG application and asked for a like-for-like rebuild in three months: 80+ entities, 1,000+ attributes. Instead of rebuilding 80+ forms one by one, I proposed a JSON schema-driven form engine: one Canvas App form, a dynamic grid and a configuration interface, so field changes and new entities need no developer. The prototype changed what the client asked for.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','Azure AI','Power Automate'],pts:['JSON schema-driven engine: one Canvas App form + grid covering 80+ entities and 1,000+ attributes','New entities and field changes are configuration only, no developer needed','Dynamic grid and configuration interface for live field management','AI-assisted capture: upload a document and an Azure AI model pre-fills the fields','Output saved as JSON for downstream systems','Delivered within the original timeline at a fraction of the third-party cost']},
  {t:'ESG Copilot Studio Agent',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'smart_toy',tags:['AI','Copilot Studio','MCP Server','Dataverse'],desc:'Built on the ESG Data Collector so users can submit ESG data without opening the Canvas App. A Copilot Studio agent in Microsoft Teams and Microsoft 365 Copilot Chat, with the conversation driven by the JSON schema of each entity. In production.',tech:['Copilot Studio','MCP Server','Power Automate','Dataverse','SharePoint','Adaptive Cards','JSON Schema'],pts:['Runs in Microsoft Teams and Microsoft 365 Copilot Chat','Conversation driven by the per-entity JSON schema: topics, custom prompts, instructions, topic switching and escalation flows','Adaptive Cards, knowledge sources and knowledge articles, file uploads','Power Automate for Dataverse updates, SharePoint files and JSON parsing','MCP server for dynamic form retrieval and full CRUD on existing data','In production']},
  {t:'33 Processes Automated: 190+ Hours/Month',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Excel'],desc:'Started in German-speaking first-level support and became the team\'s Power Platform developer on my own initiative. Automated 33 business processes with Power Automate, plus Canvas and Model-Driven Apps on SharePoint and Excel, freeing up more than 190 team hours every month.',tech:['Power Automate','Canvas Apps','Model-Driven Apps','SharePoint','Excel','Microsoft Teams'],pts:['33 business processes automated','190+ team hours freed up every month','Canvas and Model-Driven Apps on SharePoint and Excel','Prototypes as stakeholder demos before building, then testing and fixing','User documentation and troubleshooting guides for end users','Reviews of Power Automate flows in the team']},
  {t:'ServiceNow Reporting: Ticket Hierarchy',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'account_tree',tags:['Power BI','DAX','ServiceNow'],desc:'Weekly end-to-end ServiceNow reporting on a data model of 7 to 8 tables with a five-level hierarchy: Registered Projects → Services → Sub-Services → Tickets → Ticket Category, segmented by PU, BA and BU, plus level and bundle.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','ServiceNow'],pts:['Data model of 7 to 8 tables','Five-level hierarchy: Projects → Services → Sub-Services → Tickets → Categories','Segmentation by PU, BA and BU, plus level and bundle','Complex DAX measures, slicers and drilldowns','Weekly end-to-end reporting']},
  {t:'DevOps Toolchain License Report',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'key',tags:['Power BI','Licensing','DevOps'],desc:'Active users, maximum seats and free capacity across 7 to 8 DevOps tools, with a flag for licenses unused for 6+ months. Spend and compliance visible in one place.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling'],pts:['Tracks 7 to 8 DevOps tools: active users, max seats, free capacity','Flags licenses unused for 6+ months','Spend and compliance visibility in one report']},
  {t:'ServiceNow Reaction Report',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'timer',tags:['Power BI','ServiceNow','SLA'],desc:'Measures ticket time per status change: Open → In Progress → Pending → Closed, to show where tickets miss their SLA.',tech:['Power BI','DAX Measures','Power Query (M)','ServiceNow'],pts:['Ticket time per status: Open → In Progress → Pending → Closed','Makes SLA deviations visible','Factual basis for team performance conversations']},
  {t:'Adastra BI Suite: Allocation, Bench & Xero',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'monitoring',tags:['Power BI','Dataverse','Xero'],desc:'Three Power BI solutions. The Allocation Report has complex business logic, multi-source transformation and a performance-optimised model; management uses it for resource planning decisions. Bench Reporting uses dynamic parameters, bookmarks, DAX measures and drilldowns, embedded live in the company application. A Xero integration report combines Xero data (Web API or SQL connector) with Dataverse entities.',tech:['Power BI','DAX Measures','Power Query (M)','Dataverse','Bookmarks','Xero'],pts:['Allocation Report: complex business logic, multiple sources, performance-optimised model','Used by management for resource planning decisions','Allocation Report source moved from Excel to Dataverse','Bench Reporting: dynamic parameters, bookmarks, DAX, drilldowns, embedded in the app','Xero integration via Web API or SQL connector, joined with Dataverse in one report']},
  {t:'AI Assistance: Upload to Autofill',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'auto_awesome',tags:['Power Apps','Azure AI','Dataverse'],desc:'The AI capture feature of the ESG Data Collector. On a single Canvas App screen, users upload a document and Azure AI models pre-fill the relevant ESG fields. Output is saved as JSON for downstream systems.',tech:['Canvas Apps','Azure AI','Power Automate','Dataverse','JSON'],pts:['Built into the ESG Data Collector','Upload a document → Azure AI pre-fills the fields','Output saved as structured JSON for downstream systems','Single-screen experience, no manual entry for standard documents']},
  {t:'Allocation Management App',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'assignment_turned_in',tags:['Power Apps','Dataverse','Power Automate','Power BI'],desc:'Two colleagues spent about 60 hours a month reconciling employee allocations in Excel. Project Leads raised requests, Practice Leads approved them, and nothing stopped duplicates, over-allocations or overlaps. I replaced it with a Model-Driven App on Dataverse. Monthly effort went from 60 hours to 8 to 10 hours: an 83% reduction.',tech:['Model-Driven Apps','Custom Pages','Dataverse','Power Automate','Adaptive Cards','Office Scripts','Dataflows','Security Roles','Power BI'],pts:['Model-Driven App with Custom Pages on Dataverse','Approvals through Adaptive Cards in Teams and Outlook','HTML controls for a progress bar, audit history and over-allocation / overlap warnings','Bulk uploads via SharePoint and Office Scripts (Excel → JSON); Dataflows for master data','Security roles and access teams per Project Lead and Practice Lead','83% less monthly effort: 60 hours → 8 to 10 hours']},
  {t:'Document Intelligence Pipeline',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'document_scanner',tags:['Power Automate','Azure AI','Azure OpenAI','Dataverse'],desc:'Extraction, classification and metadata for thousands of documents: 750+ document types in 60+ families, for six teams. Started with a requirements workshop with the Business Analyst, a requirements specification, a data model in DBDiagram.io and an architecture diagram before any development.',tech:['Power Automate','Azure REST API','Azure AI Services','Azure OpenAI','Dataverse','Model-Driven Apps','Power Pages','DBDiagram.io'],pts:['Thousands of documents, 750+ document types, 60+ families, six teams','Requirements, data model and architecture before development','Parent flow orchestrating four child flows','Azure REST API for extraction → Azure AI Services and Azure OpenAI for classification and metadata → Dataverse','New document types are configuration only, no flow changes','Front end: Model-Driven App with Custom Pages (internal) and Power Pages (external)']},
  {t:'Support Chatbots',co:'T-Systems · 2022–2024',col:'var(--accent-copilot)',ic:'support_agent',tags:['Chatbot','First-Level Support'],desc:'Chatbots for standard first-level support requests, built with the predecessor of Copilot Studio: topics, trigger phrases and conversation nodes.',tech:['Topics','Trigger Phrases','Conversation Nodes'],pts:['Handled standard first-level requests','Configured topics and trigger phrases','Designed conversation nodes and dialog paths','The groundwork for later Copilot Studio work']},
  {t:'Sentiment Analysis in Dynamics 365',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'sentiment_satisfied',tags:['AI','Azure AI Foundry','Dynamics 365'],desc:'A Custom Page in a Model-Driven App, opened through JavaScript, sends uploaded files to a model in Azure AI Foundry. The model returns sentiment and metadata as JSON, which is stored in the engagement, contact and account tables in Dynamics 365.',tech:['Azure AI Foundry','Custom Pages','JavaScript','Dataverse','Dynamics 365'],pts:['Custom Page opened from a Model-Driven App with JavaScript','Azure AI Foundry model returns sentiment and metadata as JSON','Results stored on engagement, contact and account in Dynamics 365','Users synced into contacts; attachments in a document library']},
  {t:'Dynamics 365 Customizing',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dashboard_customize',tags:['Dynamics 365','PCF','JavaScript'],desc:'Customizing on Dataverse and Dynamics 365: command bar changes with Ribbon Workbench, form logic in JavaScript, business rules, PCF controls in TypeScript and Custom Pages, with record- and column-level security.',tech:['Ribbon Workbench','JavaScript','TypeScript (PCF)','Business Rules','Custom Pages','Security Roles'],pts:['Command bar customization with Ribbon Workbench','Form logic in JavaScript and business rules','PCF controls in TypeScript','Custom Pages in Model-Driven Apps','Security at record and column level']},
  {t:'Microsoft Fabric Lakehouse',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'stacks',tags:['Microsoft Fabric','Power BI','Medallion'],desc:'A lakehouse on F2 capacity in medallion architecture. Xero, Dataverse and SharePoint land in bronze, notebooks refine them into silver and gold, a scheduled data pipeline keeps it fresh, and a semantic model on top feeds the Power BI reports.',tech:['Microsoft Fabric','Lakehouse','Notebooks','Data Pipelines','Semantic Model','Power BI'],pts:['Lakehouse on F2 capacity, medallion architecture','Bronze: Xero, Dataverse, SharePoint','Silver and gold built with notebooks','Scheduled data pipeline for refresh','Semantic model for Power BI reports']},
  {t:'Power Pages Portal for External Users',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'language',tags:['Power Pages','Dataverse','Security'],desc:'The external front end of Document Intelligence. Service providers and suppliers sign in to a Power Pages site on Dataverse and can only see, create or change the data shared with them, enforced through web roles and table permissions.',tech:['Power Pages','Dataverse','Web Roles','Table Permissions'],pts:['Power Pages portal connected to Dataverse','External users: service providers and suppliers','Access only to data shared with them','Enforced through web roles and table permissions']},
  {t:'Code App with React',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'code',tags:['Power Apps','Code Apps','React'],desc:'A Power Apps Code App built entirely in React, developed with AI assistance. I reviewed the code myself against the requirements and adjusted it.',tech:['Power Apps Code Apps','React','TypeScript','AI-assisted development'],pts:['Code App in Power Apps, written in React','Built with AI assistance on standard prompt and skill libraries','Code reviewed and adjusted against the requirements by me']}
];

function accentClass(col){
  if(String(col).includes('automate')) return 'accent-automate';
  if(String(col).includes('bi')) return 'accent-bi';
  if(String(col).includes('copilot')) return 'accent-copilot';
  return 'accent-apps';
}

let modalOpener=null;
function openModal(i){
  // js/lang.js provides the German project copy (same index order as PM)
  const p=(window.localizedProject&&window.localizedProject(i))||PM[i];
  if(!p)return;
  document.getElementById('modal-body').innerHTML=`
    <div class="modal-project ${accentClass(p.col)}">
    <div class="modal-project-head">
      <div class="modal-project-icon">
        <span class="msym mf" aria-hidden="true">${p.ic}</span>
      </div>
      <div><h2 class="modal-project-title" id="modal-title">${p.t}</h2><div class="modal-project-company">${p.co}</div></div>
    </div>
    <div class="modal-project-tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div>
    <p class="modal-project-desc">${p.desc}</p>
    <h3 class="modal-project-section">${t('Key Achievements')}</h3>
    <div class="modal-project-points">${p.pts.map(b=>`<div><span class="msym" aria-hidden="true">check_circle</span><span>${b}</span></div>`).join('')}</div>
    <h3 class="modal-project-section">${t('Tech Stack')}</h3>
    <div class="modal-project-tech">${p.tech.map(x=>`<span>${x}</span>`).join('')}</div>
    </div>`;
  const m=document.getElementById('proj-modal');
  modalOpener=document.activeElement;
  m.style.display='flex';
  m.querySelector('.modal-close')?.focus();
}
function closeModal(){
  document.getElementById('proj-modal').style.display='none';
  modalOpener?.focus?.();
  modalOpener=null;
}
// Keep Tab focus inside the open modal
function trapModalFocus(e){
  const m=document.getElementById('proj-modal');
  if(m.style.display!=='flex')return;
  const f=[...m.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')];
  if(!f.length)return;
  const first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  else if(!m.contains(document.activeElement)){e.preventDefault();first.focus()}
}

// CHAT
const RESP={
  skills:()=>`Sagar's strongest skills are on the Microsoft Power Platform:\n\n**Power Apps**: Canvas, Model-Driven, Custom Pages and Code Apps, PCF controls in TypeScript, and a JSON schema form engine covering 80+ entities.\n\n**Power Automate**: 33 business processes automated at T-Systems (190+ team hours a month), approval flows and a document pipeline with a parent flow and four child flows.\n\n**AI**: a Copilot Studio agent with an MCP server in production, plus Azure AI Services, Azure OpenAI and Azure AI Foundry.\n\n**Dataverse & governance**: data modelling, security roles, access teams, column-level security, ALM with Azure DevOps, managed solutions and DLP policies.\n\n**Power BI & Fabric**: DAX, Power Query, embedded reports and a Fabric lakehouse in medallion architecture.\n\n**German C1**: used every day with DACH clients.`,
  german:()=>`Sagar speaks German at C1 level (Goethe-Zertifikat C1) and uses it at work, not just on paper:\n\n- **Concentrix:** 50+ customer conversations a day in German, CSAT around 87%\n- **T-Systems:** German first-level support, kick-off meetings with clients, standing in for the team lead\n- **Lutz und Grub Academy:** teaches Microsoft 365, Power Platform and AI courses in German\n\nEnglish is also C1. He can work directly with German-speaking stakeholders, no translator in between.`,
  app:()=>`The standout is the **ESG Data Collector** at Adastra:\n\nThe client wanted a like-for-like rebuild of a costly third-party ESG tool in three months. Sagar proposed a JSON schema-driven Canvas App form engine instead:\n- **80+ entities** and **1,000+ attributes**\n- New entities and field changes are configuration only, no code\n- AI-assisted capture: upload a document, Azure AI pre-fills the fields\n- Delivered on time at a fraction of the third-party cost\n\nAnother one is the **Allocation Management App**: a Model-Driven App on Dataverse that cut monthly reconciliation from 60 hours to 8 to 10 hours (83% less).`,
  contact:()=>`Here are Sagar's contact details:\n\n**Email:** deshpande.sagar.milind@gmail.com\n**LinkedIn:** linkedin.com/in/sagar-deshpande2306\n**Phone:** +91 90286 82226\n\nAvailable immediately, no notice period, and ready to relocate to Germany.`,
  cert:()=>`Sagar holds two Microsoft certifications:\n\n**PL-400**: Microsoft Certified: Power Platform Developer Associate (May 2025)\nThe developer certification: custom connectors, PCF controls and complex app development.\n\n**PL-900**: Microsoft Certified: Power Platform Fundamentals (October 2024)\n\nLanguages: German C1 (Goethe-Zertifikat C1) and English C1.`,
  exp:()=>`Sagar has 6+ years of experience (since 06/2020):\n\n**Lutz und Grub Academy** (07/2026 – today, remote)\nFreelance trainer for Microsoft 365, Power Platform & AI. Teaches in German, with his own course material and exercises.\n\n**Adastra** (01/2025 – 06/2026)\nData Engineer (Power Platform & BI Developer). Allocation Management App (83% less effort), Document Intelligence (750+ document types), ESG Data Collector, a Copilot Studio agent with an MCP server, Microsoft Fabric, ALM and governance.\n\n**T-Systems ICT India** (05/2022 – 12/2024)\nJunior Consultant. German first-level support, then the team's Power Platform developer: 33 processes automated, 190+ team hours a month.\n\n**Concentrix** (06/2020 – 03/2022)\nAdvisor. 50+ German customer conversations a day, RAP above 90%, CSAT around 87%.`,
  hire:()=>`Three things make Sagar stand out:\n\n**1. Business problem first**\nHe studied economics, not computer science. He understands the problem before picking the technology, which is why the ESG client got a form engine instead of 80 rebuilt forms.\n\n**2. German C1, in real work**\nSupport, client kick-offs and now teaching, all in German. No intermediary needed for DACH stakeholders.\n\n**3. The whole Power Platform, in production**\nModel-Driven and Canvas Apps, Power Automate, a Copilot Studio agent with an MCP server, Power Pages, Power BI and Fabric, with ALM and DLP governance around it.\n\n"What truly sets him apart is his attitude: proactive, innovative, and with a great work ethic. He identifies opportunities before being asked and always delivers with quality." (Max Rink, Cloud Architect, Adastra)`,
  portfolio:()=>`The Canvas has 16 projects:\n\n1. **ESG Data Collector**: JSON schema form engine, 80+ entities\n2. **ESG Copilot Studio Agent**: Teams + Microsoft 365 Copilot Chat, MCP server\n3. **33 Processes Automated**: 190+ team hours a month (T-Systems)\n4. **ServiceNow Reporting**: five-level hierarchy (T-Systems)\n5. **DevOps License Report** (T-Systems)\n6. **ServiceNow Reaction Report** (T-Systems)\n7. **Adastra BI Suite**: Allocation, Bench and Xero reports\n8. **AI Upload to Autofill**\n9. **Allocation Management App**: 60 → 8 to 10 hours a month\n10. **Document Intelligence**: 750+ document types\n11. **Support Chatbots** (T-Systems)\n12. **Sentiment Analysis**: Azure AI Foundry, Dynamics 365\n13. **Dynamics 365 Customizing**\n14. **Microsoft Fabric Lakehouse**\n15. **Power Pages Portal** for external users\n16. **Code App with React**\n\nOpen each one in The Canvas for the details.`,
  avail:()=>`Sagar is **available immediately**, with no notice period.\n\nHe is **ready to relocate to Germany** at any time and willing to travel internationally.`,
  teach:()=>`Since 07/2026 Sagar works as a **freelance trainer at Lutz und Grub Academy** (remote). He teaches in German, for participants in further-education programmes, with his own course material and exercises.\n\nTopics: Microsoft 365 (Teams, SharePoint Online, OneDrive, Excel…), Power Apps, Power Automate, Dataverse, Power BI with Power Query and DAX, Microsoft Copilot, Copilot Studio, agents and prompting, requirements engineering, solution design and Scrum / Kanban.`,
  gov:()=>`Governance is part of every build, not an afterthought:\n\n- **ALM:** Azure DevOps pipelines Dev → Test → Prod, managed solutions, environment variables, Git\n- **Security:** Microsoft Entra ID, security roles, access teams, record- and column-level security, web roles and table permissions in Power Pages\n- **DLP:** Power Platform data policies, in production at Adastra\n- **Reviews:** technical reviews of the team's solutions for dependencies, environment variables and deployment readiness. For Document Intelligence that meant splitting one solution into two: tables, and apps with their flows, environment variables and sitemaps.`
};

function getResp(msg){
  const m=msg.toLowerCase();
  if(m.includes('availab')||m.includes('relocat')||m.includes('notice')||m.includes('start'))return RESP.avail();
  if(m.includes('teach')||m.includes('trainer')||m.includes('lutz')||m.includes('course'))return RESP.teach();
  if(m.includes('govern')||m.includes('dlp')||m.includes('alm')||m.includes('security'))return RESP.gov();
  if(m.includes('german')||m.includes('deutsch')||m.includes('language'))return RESP.german();
  if(m.includes('skill')||m.includes('expertise')||m.includes('top')||m.includes('best at'))return RESP.skills();
  if(m.includes('power app')||m.includes('complex')||m.includes('built')||m.includes('canvas'))return RESP.app();
  if(m.includes('contact')||m.includes('email')||m.includes('phone')||m.includes('reach')||m.includes('linkedin'))return RESP.contact();
  if(m.includes('certif'))return RESP.cert();
  if(m.includes('experience')||m.includes('work')||m.includes('job')||m.includes('career')||m.includes('company'))return RESP.exp();
  if(m.includes('hire')||m.includes('why')||m.includes('should'))return RESP.hire();
  if(m.includes('portfolio')||m.includes('highlight')||m.includes('project'))return RESP.portfolio();
  return `Good question. Sagar is a Power Platform + AI engineer with 6+ years of experience: Model-Driven and Canvas Apps on Dataverse, Power Automate, Copilot Studio agents with an MCP server, Power BI and Fabric. German C1, available immediately and ready to relocate to Germany.

Try asking about:
• His top skills
• German expertise
• A specific project
• Work experience
• Governance and ALM
• Availability
• Contact information`;
}

function fmt(t){return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>').replace(/^• /gm,'&#8226; ')}

// Suggested follow-ups shown under each answer (Copilot Studio "suggested actions")
const FOLLOW_UPS=[
  ['What are your top skills?','Top skills'],
  ['Tell me about your German expertise','German expertise'],
  ['Describe a complex Power App you built','A complex Power App'],
  ['Show contact information','Contact Info'],
  ['What certifications do you have?','Certifications'],
  ['Tell me about your work experience','Work experience'],
  ['Why should I hire Sagar?','Why hire Sagar?'],
  ['Portfolio Highlights','Portfolio Highlights']
];
const asked=new Set();
function chipsFor(q){
  asked.add(q);
  const pool=FOLLOW_UPS.filter(([k])=>!asked.has(k));
  const pick=(pool.length?pool:FOLLOW_UPS).slice(0,3);
  return `<div class="chat-chips in">${pick.map(([k,l])=>`<button data-question="${esc(k)}" class="chip">${esc(t(l))}</button>`).join('')}</div>`;
}
// Contact answer renders as an Adaptive Card instead of plain text
function contactCard(){
  return `<div class="acard">
    <div class="acard-head"><img src="images/avatar/sagar.png" alt=""><div><b>Sagar Deshpande</b><small>${esc(t('Power Platform + AI Engineer'))}</small></div></div>
    <dl class="acard-facts">
      <dt>${esc(t('Email'))}</dt><dd>deshpande.sagar.milind@gmail.com</dd>
      <dt>LinkedIn</dt><dd>linkedin.com/in/sagar-deshpande2306</dd>
      <dt>${esc(t('Location'))}</dt><dd>${esc(t('Pune, Maharashtra, India'))}</dd>
      <dt>${esc(t('Phone'))}</dt><dd>+91 90286 82226</dd>
    </dl>
    <div class="acard-actions">
      <button class="btn-p" data-action="copy-email"><span class="msym" aria-hidden="true">mail</span>${esc(t('Copy Email'))}</button>
      <button class="btn-g" data-action="open-linkedin"><span class="msym" aria-hidden="true">link</span>LinkedIn</button>
    </div>
  </div>`;
}
const isContact=s=>/deshpande\.sagar\.milind@gmail\.com/.test(s)&&/linkedin/i.test(s);
const cleanEmoji=s=>s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]️?\s?/gu,'');

let streamId=0;
function addMsg(role,text,q){
  const w=document.getElementById('chat-msgs');
  const d=document.createElement('div');
  d.className='chat-msg';
  if(role==='bot'){
    text=cleanEmoji(text);
    d.innerHTML=`<div class="chat-row bot"><div class="chat-avatar"><img src="images/avatar/sagar.png" alt="Sagar"></div><div class="chat-stack bot"><span class="chat-author">${t("Sagar's Copilot")}</span><div class="chat-bubble bot"></div></div></div>`;
    w.appendChild(d);
    const bubble=d.querySelector('.chat-bubble'),stack=d.querySelector('.chat-stack');
    const finish=()=>{
      if(isContact(text)){bubble.innerHTML=fmt(text.split('\n\n')[0]);bubble.insertAdjacentHTML('afterend',contactCard())}
      else bubble.innerHTML=fmt(text);
      if(q)stack.insertAdjacentHTML('beforeend',chipsFor(q));
      w.scrollTop=w.scrollHeight;
    };
    // Stream word by word like Copilot; instant when reduced motion is on
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return}
    const src=isContact(text)?text.split('\n\n')[0]:text;
    const words=src.split(/(\s+)/);
    const id=++streamId;let i=0;
    const step=()=>{
      if(id!==streamId){finish();return}
      i=Math.min(words.length,i+2);
      bubble.innerHTML=fmt(words.slice(0,i).join('').replace(/\*\*([^*]*)$/,'$1'))+'<span class="cursor"></span>';
      w.scrollTop=w.scrollHeight;
      if(i<words.length)setTimeout(step,18+Math.random()*24);else finish();
    };
    step();
    return;
  }
  d.innerHTML=`<div class="chat-row user"><div class="chat-stack user"><span class="chat-author">${t('You')}</span><div class="chat-bubble user">${esc(text)}</div></div><div class="chat-avatar user"><span class="msym" aria-hidden="true">person</span></div></div>`;
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
  setTimeout(()=>{removeTyping();addMsg('bot',getResp(msg),msg)},700+Math.random()*600);
}

// Show the question in the current language; match keywords on the English original
function sendQ(q){
  // chips that were clicked go away, like Copilot suggested actions
  document.querySelectorAll('.chat-chips').forEach(c=>c.remove());
  addMsg('user',t(q));addTyping();setTimeout(()=>{removeTyping();addMsg('bot',getResp(q),q)},700+Math.random()*600);
}

function handleKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}}
function autores(el){el.style.height='34px';el.style.height=Math.min(el.scrollHeight,80)+'px'}
const chatWelcome=document.getElementById('chat-msgs').innerHTML;
function clearChat(){
  streamId++;asked.clear();
  const w=document.getElementById('chat-msgs');
  w.innerHTML=chatWelcome;
  // re-apply the current language to the restored welcome message
  if(window.setLang)window.setLang(document.documentElement.lang==='de'?'de':'en');
}

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
  document.getElementById('toast-txt').textContent=t(msg);
  el.classList.add('show');el.style.opacity='1';
  setTimeout(()=>{el.style.opacity='0';el.classList.remove('show')},2800);
}

// INIT
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('[data-sec="home"]')?.classList.add('active');
  setTimeout(()=>{document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('vis')})},120);
});
