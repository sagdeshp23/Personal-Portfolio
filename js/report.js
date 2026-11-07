/* FILE: /js/report.js */
/* Last updated: 2026-11-07 */
/* Description: "Hiring decision" Power BI report on the home page. A role slicer (the five tracks from the CV)
   re-renders the requirement coverage table and the decision card. Every claim maps to a project in the Canvas
   (data-modal index) or a section. Facts only from the CV (profil.md). EN + DE. */
(() => {
  const root = document.getElementById('hire-report');
  if (!root) return;
  const de = () => document.documentElement.lang === 'de';
  const L = o => (de() ? o.de : o.en);

  // level: 'prod' = in production / delivered, 'hands' = built hands-on
  const ROLES = {
    pp: {
      label: { en: 'Power Platform Developer', de: 'Power Platform Entwickler' },
      rows: [
        { req: { en: 'Model-Driven & Canvas Apps', de: 'Model-Driven und Canvas Apps' }, proof: { en: 'Allocation Management App', de: 'Allocation Management App' }, kpi: { en: '83 % less effort', de: '83 % weniger Aufwand' }, lvl: 'prod', m: 8 },
        { req: { en: 'Dataverse modelling & security', de: 'Dataverse: Datenmodell und Sicherheit' }, proof: { en: 'Security roles, access teams, column security', de: 'Sicherheitsrollen, Access Teams, Spaltensicherheit' }, kpi: { en: 'per Project & Practice Lead', de: 'je Project und Practice Lead' }, lvl: 'prod', m: 8 },
        { req: { en: 'Power Automate', de: 'Power Automate' }, proof: { en: '33 business processes automated', de: '33 Geschäftsprozesse automatisiert' }, kpi: { en: '190+ team hrs / month', de: '190+ Teamstunden / Monat' }, lvl: 'prod', m: 2 },
        { req: { en: 'ALM & Azure DevOps', de: 'ALM und Azure DevOps' }, proof: { en: 'Dev → Test → Prod, managed solutions', de: 'Dev, Test, Prod mit Managed Solutions' }, kpi: { en: 'DLP policies in production', de: 'DLP-Richtlinien produktiv' }, lvl: 'prod', q: 'How do you handle governance and ALM?' },
        { req: { en: 'PCF & JavaScript', de: 'PCF und JavaScript' }, proof: { en: 'Dynamics 365 Customizing', de: 'Dynamics 365 Customizing' }, kpi: { en: 'PCF in TypeScript', de: 'PCF in TypeScript' }, lvl: 'prod', m: 12 },
        { req: { en: 'Power Pages', de: 'Power Pages' }, proof: { en: 'Portal for external users', de: 'Portal für externe Nutzer' }, kpi: { en: 'web roles & table permissions', de: 'Web Roles und Table Permissions' }, lvl: 'prod', m: 14 }
      ],
      best: { en: 'Allocation Management App: 60 → 8 to 10 hours a month', de: 'Allocation Management App: von 60 auf 8 bis 10 Stunden pro Monat' }, bm: 8
    },
    ai: {
      label: { en: 'Copilot & AI', de: 'Copilot und KI' },
      rows: [
        { req: { en: 'Copilot Studio agents', de: 'Agenten in Copilot Studio' }, proof: { en: 'ESG agent in Teams & M365 Copilot Chat', de: 'ESG-Agent in Teams und M365 Copilot Chat' }, kpi: { en: 'in production', de: 'produktiv im Einsatz' }, lvl: 'prod', m: 1 },
        { req: { en: 'MCP & tool integration', de: 'MCP und Tool-Anbindung' }, proof: { en: 'MCP server: dynamic forms + CRUD', de: 'MCP Server: dynamische Formulare und CRUD' }, kpi: { en: 'in production', de: 'produktiv im Einsatz' }, lvl: 'prod', m: 1 },
        { req: { en: 'Azure OpenAI & AI Services', de: 'Azure OpenAI und AI Services' }, proof: { en: 'Document Intelligence', de: 'Document Intelligence' }, kpi: { en: '750+ document types', de: '750+ Dokumenttypen' }, lvl: 'prod', m: 9 },
        { req: { en: 'Azure AI Foundry', de: 'Azure AI Foundry' }, proof: { en: 'Sentiment analysis in Dynamics 365', de: 'Sentimentanalyse in Dynamics 365' }, kpi: { en: 'JSON into Dataverse', de: 'JSON nach Dataverse' }, lvl: 'prod', m: 11 },
        { req: { en: 'Prompt engineering', de: 'Prompt Engineering' }, proof: { en: 'Custom prompts, prompt & skill libraries', de: 'Custom Prompts, Bibliotheken für Prompts und Skills' }, kpi: { en: 'standardised for the team', de: 'standardisiert im Team' }, lvl: 'prod', m: 15 },
        { req: { en: 'Enabling users with AI', de: 'Anwender für KI befähigen' }, proof: { en: 'Trainer at Lutz und Grub Academy', de: 'Dozent bei der Lutz und Grub Academy' }, kpi: { en: 'Copilot & prompting, in German', de: 'Copilot und Prompting, auf Deutsch' }, lvl: 'prod', go: 'flow' }
      ],
      best: { en: 'Copilot Studio agent with an MCP server, in production', de: 'Agent in Copilot Studio mit MCP Server, produktiv im Einsatz' }, bm: 1
    },
    bi: {
      label: { en: 'Power BI & Fabric', de: 'Power BI und Fabric' },
      rows: [
        { req: { en: 'DAX & data modelling', de: 'DAX und Datenmodellierung' }, proof: { en: 'ServiceNow Reporting', de: 'ServiceNow Reporting' }, kpi: { en: '5-level hierarchy, 7 to 8 tables', de: 'fünfstufige Hierarchie, 7 bis 8 Tabellen' }, lvl: 'prod', m: 3 },
        { req: { en: 'Reports for decisions', de: 'Berichte für Entscheidungen' }, proof: { en: 'Allocation Report', de: 'Allocation Report' }, kpi: { en: 'used by management', de: 'genutzt vom Management' }, lvl: 'prod', m: 6 },
        { req: { en: 'Embedded reporting', de: 'Eingebettete Berichte' }, proof: { en: 'Bench Reporting in the app', de: 'Bench Reporting in der App' }, kpi: { en: 'live, in one place', de: 'live, an einer Stelle' }, lvl: 'prod', m: 6 },
        { req: { en: 'Microsoft Fabric', de: 'Microsoft Fabric' }, proof: { en: 'Lakehouse, medallion architecture', de: 'Lakehouse, Medallion-Architektur' }, kpi: { en: 'bronze → silver → gold', de: 'Bronze, Silver, Gold' }, lvl: 'prod', m: 13 },
        { req: { en: 'Multiple data sources', de: 'Mehrere Datenquellen' }, proof: { en: 'Xero + Dataverse in one report', de: 'Xero und Dataverse in einem Bericht' }, kpi: { en: 'Web API / SQL connector', de: 'Web API bzw. SQL Connector' }, lvl: 'prod', m: 6 },
        { req: { en: 'SLA & operations reporting', de: 'SLA- und Betriebsreporting' }, proof: { en: 'Reaction Report', de: 'Reaction Report' }, kpi: { en: 'time per ticket status', de: 'Laufzeit je Ticketstatus' }, lvl: 'prod', m: 5 }
      ],
      best: { en: 'Allocation Report: management plans resources with it', de: 'Allocation Report: Grundlage des Managements für die Ressourcenplanung' }, bm: 6
    },
    crm: {
      label: { en: 'Dynamics 365 / CRM', de: 'Dynamics 365 / CRM' },
      rows: [
        { req: { en: 'Dynamics 365 Customizing', de: 'Dynamics 365 Customizing' }, proof: { en: 'Ribbon Workbench, JavaScript, business rules', de: 'Ribbon Workbench, JavaScript, Business Rules' }, kpi: { en: 'command bar + forms', de: 'Command Bar und Formulare' }, lvl: 'prod', m: 12 },
        { req: { en: 'Model-Driven Apps on Dataverse', de: 'Model-Driven Apps auf Dataverse' }, proof: { en: 'Allocation Management App', de: 'Allocation Management App' }, kpi: { en: '83 % less effort', de: '83 % weniger Aufwand' }, lvl: 'prod', m: 8 },
        { req: { en: 'PCF controls', de: 'PCF Controls' }, proof: { en: 'Custom controls in TypeScript', de: 'Eigene Controls in TypeScript' }, kpi: { en: 'plus Custom Pages', de: 'dazu Custom Pages' }, lvl: 'prod', m: 12 },
        { req: { en: 'AI on contact & account', de: 'KI an Kontakt und Account' }, proof: { en: 'Sentiment analysis', de: 'Sentimentanalyse' }, kpi: { en: 'Azure AI Foundry', de: 'Azure AI Foundry' }, lvl: 'prod', m: 11 },
        { req: { en: 'Security model', de: 'Sicherheitsmodell' }, proof: { en: 'Record & column-level security', de: 'Sicherheit auf Datensatz- und Spaltenebene' }, kpi: { en: 'security roles, access teams', de: 'Sicherheitsrollen, Access Teams' }, lvl: 'prod', m: 12 },
        { req: { en: 'Approvals in Teams & Outlook', de: 'Genehmigungen in Teams und Outlook' }, proof: { en: 'Adaptive Cards', de: 'Adaptive Cards' }, kpi: { en: 'multi-stage approval', de: 'mehrstufige Genehmigung' }, lvl: 'prod', m: 8 }
      ],
      best: { en: 'Dynamics 365 Customizing with PCF, plus sentiment on contact & account', de: 'Dynamics 365 Customizing mit PCF, dazu Sentiment an Kontakt und Account' }, bm: 12
    },
    proc: {
      label: { en: 'Process digitalisation', de: 'Prozessdigitalisierung' },
      rows: [
        { req: { en: 'Process & requirements analysis', de: 'Prozess- und Anforderungsanalyse' }, proof: { en: 'Workshop, spec, data model before dev', de: 'Workshop, Spezifikation, Datenmodell vor der Entwicklung' }, kpi: { en: 'Document Intelligence', de: 'Document Intelligence' }, lvl: 'prod', m: 9 },
        { req: { en: 'Replacing Excel processes', de: 'Excel-Prozesse ablösen' }, proof: { en: 'Allocation Management App', de: 'Allocation Management App' }, kpi: { en: '60 → 8 to 10 hrs / month', de: 'von 60 auf 8 bis 10 Std. / Monat' }, lvl: 'prod', m: 8 },
        { req: { en: 'Low-code delivery at scale', de: 'Low-Code in der Breite' }, proof: { en: '33 business processes automated', de: '33 Geschäftsprozesse automatisiert' }, kpi: { en: '190+ team hrs / month', de: '190+ Teamstunden / Monat' }, lvl: 'prod', m: 2 },
        { req: { en: 'Problem first, then technology', de: 'Erst das Problem, dann die Technik' }, proof: { en: 'ESG: one engine instead of 80+ forms', de: 'ESG: eine Engine statt 80+ Formularen' }, kpi: { en: 'fraction of the cost', de: 'Bruchteil der Kosten' }, lvl: 'prod', m: 0 },
        { req: { en: 'Training the users', de: 'Anwender schulen' }, proof: { en: 'Trainer at Lutz und Grub Academy', de: 'Dozent bei der Lutz und Grub Academy' }, kpi: { en: 'taught in German', de: 'Unterricht auf Deutsch' }, lvl: 'prod', go: 'flow' },
        { req: { en: 'Governance', de: 'Governance' }, proof: { en: 'DLP, ALM, solution reviews', de: 'DLP, ALM, Solution Reviews' }, kpi: { en: 'in production', de: 'produktiv' }, lvl: 'prod', q: 'How do you handle governance and ALM?' }
      ],
      best: { en: 'Allocation Management App: 83 % less monthly effort', de: 'Allocation Management App: 83 % weniger monatlicher Aufwand' }, bm: 8
    }
  };

  const T = {
    lvl: { prod: { en: 'In production', de: 'Produktiv' }, hands: { en: 'Hands-on', de: 'Praktisch erprobt' } },
    found: { en: n => `Evidence found for all ${n} requirements`, de: n => `Belege für alle ${n} Anforderungen` },
    open: { en: 'Open', de: 'Öffnen' }
  };
  // static labels inside the report (the container opts out of lang.js text swapping)
  const STATIC = {
    'hr-q': ['Should you contact Sagar?', 'Sollten Sie Sagar kontaktieren?'],
    'hr-sub': ['Hiring decision report · Source: CV · 2026', 'Bericht zur Einstellungsentscheidung · Quelle: Lebenslauf · 2026'],
    'hr-slk': ['Your open role', 'Ihre offene Stelle'],
    'hr-k1': ['Experience', 'Erfahrung'], 'hr-c1': ['years, since 06/2020', 'Jahre, seit 06/2020'],
    'hr-k2': ['Notice period', 'Kündigungsfrist'], 'hr-days': ['days', 'Tage'], 'hr-c2': ['available immediately', 'ab sofort verfügbar'],
    'hr-k3': ['German', 'Deutsch'], 'hr-c3': ['Goethe-Zertifikat · English C1', 'Goethe-Zertifikat · Englisch C1'],
    'hr-k4': ['Relocation', 'Umzug'], 'hr-ready': ['Ready', 'Bereit'], 'hr-c4': ['to Germany, any time', 'nach Deutschland, jederzeit'],
    'hr-covt': ['Requirement coverage', 'Abdeckung der Anforderungen'],
    'hr-col1': ['Requirement', 'Anforderung'], 'hr-col2': ['Evidence', 'Beleg'], 'hr-col3': ['Result', 'Ergebnis'], 'hr-col4': ['Status', 'Status'],
    'hr-hint': ['Click a row to drill through to the project.', 'Zeile anklicken für den Drillthrough zum Projekt.'],
    'hr-deck': ['Recommended action', 'Empfohlene Aktion'], 'hr-dect': ['Contact Sagar', 'Sagar kontaktieren'],
    'hr-bestk': ['Strongest proof for this role', 'Stärkster Beleg für diese Rolle'],
    'hr-cta1': ['Download CV', 'Lebenslauf herunterladen'], 'hr-cta2': ['Copy email', 'E-Mail kopieren'], 'hr-cta3': ['Ask the Copilot', 'Copilot fragen']
  };
  let role = 'pp';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function render() {
    const r = ROLES[role];
    Object.entries(STATIC).forEach(([cls, v]) => document.querySelectorAll('.' + cls).forEach(el => { el.textContent = de() ? v[1] : v[0]; }));
    const rows = r.rows.map((x, i) => `
      <button class="cov-row" style="--i:${i}" ${x.m != null ? `data-modal="${x.m}"` : x.q ? `data-goto="copilot" data-question="${esc(x.q)}"` : `data-goto="${x.go}"`}>
        <span class="cov-req">${esc(L(x.req))}</span>
        <span class="cov-proof">${esc(L(x.proof))}</span>
        <span class="cov-kpi mono">${esc(L(x.kpi))}</span>
        <span class="cov-lvl" data-lvl="${x.lvl}"><span class="msym mf" aria-hidden="true">check_circle</span>${esc(L(T.lvl[x.lvl]))}</span>
      </button>`).join('');
    root.querySelector('#cov-body').innerHTML = rows;
    root.querySelector('#cov-role').textContent = L(r.label);
    root.querySelector('#dec-found').textContent = (de() ? T.found.de : T.found.en)(r.rows.length);
    const best = root.querySelector('#dec-best');
    best.textContent = L(r.best);
    best.dataset.modal = r.bm;
    root.querySelector('#hr-filter').textContent = (de() ? 'Rolle ist (' : 'Role is (') + L(r.label) + ')';
    root.querySelectorAll('.sl').forEach(b => {
      b.textContent = L(ROLES[b.dataset.role].label);
      const on = b.dataset.role === role;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }
  root.querySelectorAll('.sl').forEach(b => b.addEventListener('click', () => {
    role = b.dataset.role;
    render();
    const body = root.querySelector('#cov-body');
    body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
  }));
  document.addEventListener('portfolio:lang', render);
  render();
})();
