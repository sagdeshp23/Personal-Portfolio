/* FILE: /js/lang.js */
/* Last updated: 2026-05-09 */
/* Description: EN/DE language toggle, German translations, localized project data, and German chat responses. */
(() => {
  const LS_KEY = 'portfolio-lang';
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  const DE_TEXT = {
    'Power Portfolio': 'Power Portfolio',
    'Search sections…': 'Bereiche durchsuchen...',
    'Save': 'Speichern',
    'Chat with Sagar\'s Copilot': 'Mit Sagars Copilot chatten',
    'Power Platform + AI Engineer': 'Power Platform + AI Engineer',
    'Download CV': 'Lebenslauf herunterladen',
    'The Maker (Home)': 'Der Maker (Start)',
    'The Canvas': 'Die Canvas',
    'The Flow': 'Der Flow',
    'The Copilot': 'Der Copilot',
    'Copy Email': 'E-Mail kopieren',
    'Copilot Chat': 'Copilot-Chat',
    'Available': 'Verfuegbar',
    '// Power Platform + AI Portfolio': '// Power Platform + AI Portfolio',
    'Power Platform + AI Engineer · C1 German · Turning complex problems into solutions people actually enjoy using.': 'Power Platform + AI Engineer · Deutsch C1 · Ich mache aus komplexen Anforderungen Lösungen, die Menschen wirklich gern nutzen.',
    'View Projects': 'Projekte ansehen',
    'Resume / CV': 'Lebenslauf / CV',
    'C1 Deutsch': 'Deutsch C1',
    'AI & Copilot': 'KI & Copilot',
    'Economics Background': 'Wirtschaftlicher Hintergrund',
    'Pune, Maharashtra · India': 'Pune, Maharashtra · Indien',
    'Open to Work': 'Offen für neue Rollen',
    'Yrs Exp': 'Jahre Erf.',
    'Hrs/Mo': 'Std./Monat',
    'Pune, India · Remote Friendly': 'Pune, Indien · Remote-freundlich',
    'BA Economics · SPPU · 2020': 'B.A. Economics · SPPU · 2020',
    '6 complex Power Apps, AI pipelines, Dataverse architectures and GPT-4.1 integrations — from T-Systems, Adastra, and Freelance.': 'Sechs anspruchsvolle Power Apps, KI-Pipelines, Dataverse-Architekturen und GPT-4.1-Integrationen aus Projekten bei T-Systems, Adastra und in der Freiberuflichkeit.',
    'Power Apps': 'Power Apps',
    'AI / OpenAI': 'KI / OpenAI',
    'Dataverse': 'Dataverse',
    '5+ years visualised as a Power Automate execution flow. Concentrix → T-Systems → Adastra → Freelance.': 'Mehr als fünf Jahre Berufserfahrung, gedacht wie ein Power-Automate-Ausführungsflow: Concentrix -> T-Systems -> Adastra -> Freelance.',
    'Work Experience': 'Berufserfahrung',
    'Current': 'Aktuell',
    'Data Engineer — Power Platform + AI': 'Data Engineer — Power Platform + KI',
    'Jan 2025 – Present': 'Jan. 2025 – heute',
    'Pune · ~1 yr': 'Pune · ca. 1 Jahr',
    'Junior Consultant — Power Platform Developer': 'Junior Consultant — Power Platform Developer',
    'German C1 Lead': 'Deutsch C1 Lead',
    'May 2022 – Dec 2024': 'Mai 2022 – Dez. 2024',
    'Pune · 2.5 yrs': 'Pune · 2,5 Jahre',
    'Advisor I — German Enterprise Support': 'Advisor I — deutschsprachiger Enterprise Support',
    'Jun 2020 – Mar 2022': 'Juni 2020 – Maerz 2022',
    'Pune · 1.8 yrs': 'Pune · 1,8 Jahre',
    'Freelance — Power Platform + AI Consultant': 'Freelance — Power Platform + KI Consultant',
    'AI Real Estate Document Processing Pipeline': 'KI-Pipeline für Immobiliendokumente',
    'Jul – Dec 2025': 'Juli – Dez. 2025',
    'Remote': 'Remote',
    'Full flow timeline': 'Vollständige Flow-Timeline',
    'Certifications': 'Zertifizierungen',
    'Power Platform Developer Associate': 'Power Platform Developer Associate',
    'Microsoft · May 2025': 'Microsoft · Mai 2025',
    'Power Platform Fundamentals': 'Power Platform Fundamentals',
    'Microsoft · October 2024': 'Microsoft · Oktober 2024',
    'About Me': 'Über mich',
    'I didn\'t start in computer science. I started in': 'Ich komme nicht urspruenglich aus der Informatik, sondern aus',
    'economics': 'der Volkswirtschaft',
    '. That single fact changes how I approach every problem — I think from the user\'s perspective first, and from the technology second. Most developers can\'t do that. I can.': '. Genau das prägt meine Arbeitsweise: Ich denke zuerst aus Sicht der Nutzerinnen und Nutzer und erst danach aus Sicht der Technologie. Viele Entwickler können diesen Perspektivwechsel nicht sauber leisten. Ich kann es.',
    'I didn\'t start in computer science. I started in economics. That single fact changes how I approach every problem — I think from the user\'s perspective first, and from the technology second. Most developers can\'t do that. I can.': 'Ich komme nicht urspruenglich aus der Informatik, sondern aus der Volkswirtschaft. Genau das prägt meine Arbeitsweise: Ich denke zuerst aus Sicht der Nutzerinnen und Nutzer und erst danach aus Sicht der Technologie. Viele Entwickler können diesen Perspektivwechsel nicht sauber leisten. Ich kann es.',
    'With': 'Mit',
    '5+ years on Microsoft Power Platform': 'mehr als fünf Jahren Erfahrung auf der Microsoft Power Platform',
    ', I\'ve shipped JSON-Schema-driven Canvas Apps managing 80+ entities, AI document processing pipelines powered by GPT-4.1, and Copilot Studio agents with full CRUD via a configured MCP server.': ' habe ich JSON-Schema-gesteuerte Canvas Apps für über 80 Entitäten, GPT-4.1-basierte Dokumentenpipelines und Copilot-Studio-Agenten mit vollem CRUD-Zugriff über einen konfigurierten MCP-Server umgesetzt.',
    'With 5+ years on Microsoft Power Platform, I\'ve shipped JSON-Schema-driven Canvas Apps managing 80+ entities, AI document processing pipelines powered by GPT-4.1, and Copilot Studio agents with full CRUD via a configured MCP server.': 'Mit mehr als fünf Jahren Erfahrung auf der Microsoft Power Platform habe ich JSON-Schema-gesteuerte Canvas Apps für über 80 Entitäten, GPT-4.1-basierte Dokumentenpipelines und Copilot-Studio-Agenten mit vollem CRUD-Zugriff über einen konfigurierten MCP-Server umgesetzt.',
    'I\'m fluent in German at': 'Ich spreche Deutsch auf',
    'C1 level': 'C1-Niveau',
    '. Not listed-on-a-CV fluent. Actually-leading-kick-off-meetings-with-native-DACH-clients fluent. This opens doors in European markets that most Indian developers simply can\'t walk through.': '. Nicht nur als Zeile im Lebenslauf, sondern so, dass ich technische Kick-off-Meetings mit deutschsprachigen DACH-Kunden direkt fuehren kann. Das schafft Zugang zu europaeischen Projekten, den viele Entwickler aus Indien so nicht haben.',
    'I\'m fluent in German at C1 level. Not listed-on-a-CV fluent. Actually-leading-kick-off-meetings-with-native-DACH-clients fluent. This opens doors in European markets that most Indian developers simply can\'t walk through.': 'Ich spreche Deutsch auf C1-Niveau. Nicht nur als Zeile im Lebenslauf, sondern so, dass ich technische Kick-off-Meetings mit deutschsprachigen DACH-Kunden direkt fuehren kann. Das schafft Zugang zu europaeischen Projekten, den viele Entwickler aus Indien so nicht haben.',
    '"The best solution is the one that feels obvious to the person who never asked how it works."': '"Die beste Lösung ist die, die für Menschen selbstverständlich wirkt, ohne dass sie fragen müssen, wie sie funktioniert."',
    'Testimonials': 'Stimmen',
    '"Sagar has a rare ability to make complex solutions feel effortless. His non-technical background is his biggest technical strength — he always asks \'will a non-developer understand this?\' before writing a single line of Power Fx."': '"Sagar hat die seltene Faehigkeit, komplexe Lösungen leicht wirken zu lassen. Sein nicht-technischer Hintergrund ist seine größte technische Stärke: Bevor er eine Zeile Power Fx schreibt, fragt er zuerst, ob ein Nicht-Entwickler es verstehen wird."',
    'Power Platform Community': 'Power Platform Community',
    '"He approaches every build from a user-experience lens first. The apps he delivers require almost no user training — and that\'s the hardest thing to achieve in enterprise software."': '"Er betrachtet jedes Build zuerst durch die UX-Brille. Die Apps, die er liefert, brauchen fast keine Schulung. Genau das ist im Enterprise-Umfeld am schwersten zu erreichen."',
    'Enterprise Development': 'Enterprise Development',
    '"Sagar delivered 190+ hours of monthly time savings. Every flow was clean, well-documented, and easy to maintain long after handover."': '"Sagar hat mehr als 190 Stunden manuellen Aufwand pro Monat eingespart. Jeder Flow war sauber aufgebaut, gut dokumentiert und auch lange nach der Übergabe einfach wartbar."',
    'Business Analyst · T-Systems ICT India': 'Business Analyst · T-Systems ICT India',
    'Insert': 'Einfuegen',
    'Data': 'Daten',
    'All': 'Alle',
    'Power Automate': 'Power Automate',
    'AI / Copilot': 'KI / Copilot',
    'Power BI': 'Power BI',
    'Active Projects': 'Aktive Projekte',
    'View Solution': 'Lösung ansehen',
    'View Architecture': 'Architektur ansehen',
    'View Agent': 'Agent ansehen',
    'View Flow': 'Flow ansehen',
    'View Reports': 'Reports ansehen',
    'Execution Flow': 'Execution Flow',
    'My professional journey — visualised as a Power Automate workflow.': 'Mein beruflicher Weg, visualisiert wie ein Power-Automate-Workflow.',
    'When an academic degree is acquired': 'Wenn ein Studienabschluss erworben wird',
    'TRIGGER': 'TRIGGER',
    'Bachelor of Arts — Economics': 'Bachelor of Arts — Economics',
    'Economics background instills systemic thinking, resource optimisation logic, and a user-first perspective that most CS graduates don\'t develop.': 'Der wirtschaftliche Hintergrund foerdert systemisches Denken, ein Gespuer für Ressourcenoptimierung und eine konsequente Nutzerperspektive.',
    'Initialize German Language Protocol': 'Deutsches Sprachprotokoll initialisieren',
    'ACTION': 'AKTION',
    'Output Variables': 'Output-Variablen',
    '50+ daily native-German interactions · 87% CSAT · 90%+ RAP performance': '50+ tägliche Interaktionen mit deutschsprachigen Kunden · 87 % CSAT · 90 %+ RAP Performance',
    'Built enterprise-level German communication with native DACH speakers. Foundation for leading kick-offs and acting as Team Lead at T-Systems.': 'Aufbau professioneller deutscher Enterprise-Kommunikation mit DACH-Muttersprachlern. Grundlage für Kick-off-Leitung und Team-Lead-Aufgaben bei T-Systems.',
    'Initialize Power Platform Stack': 'Power-Platform-Stack initialisieren',
    'Output Metrics': 'Output-Metriken',
    'Automated workflows saving 190+ hours of team bandwidth monthly': 'Automatisierte Workflows mit über 190 Stunden monatlicher Entlastung für das Team',
    'Led kick-off meetings with German clients. Built Canvas/Model-Driven Apps, complex Power Automate flows, Power BI reporting suites, and ServiceNow integrations.': 'Technische Kick-offs mit deutschen Kunden geleitet. Canvas- und Model-Driven-Apps, komplexe Power-Automate-Flows, Power-BI-Reporting und ServiceNow-Integrationen umgesetzt.',
    'Deploy AI & Advanced Architecture': 'KI und fortgeschrittene Architektur bereitstellen',
    'ACTIVE': 'AKTIV',
    'Live': 'Live',
    'Active Outputs': 'Aktive Outputs',
    'JSON Engine — 80+ entities, 1,000+ attributes, zero redeploy': 'JSON Engine — 80+ Entitäten, 1.000+ Attribute, ohne Redeploy',
    'Copilot agents with MCP Server + full CRUD operations': 'Copilot-Agenten mit MCP Server und vollständigen CRUD-Operationen',
    'AI upload-to-autofill pipeline via Azure OpenAI GPT-4.1': 'KI-Pipeline von Upload zu Autofill mit Azure OpenAI GPT-4.1',
    'Architecting advanced AI integrations, Dataverse-backed MDA apps, and enterprise Copilot agents with Dev/Test/Prod governance via Azure DevOps pipelines.': 'Architektur für fortgeschrittene KI-Integrationen, Dataverse-gestützte MDA-Apps und Enterprise-Copilot-Agenten mit Dev/Test/Prod-Governance über Azure-DevOps-Pipelines.',
    'Process AI Pipelines': 'KI-Pipelines verarbeiten',
    'GPT-4.1 real estate data extraction': 'GPT-4.1-Extraktion für Immobiliendaten',
    'Multi-entity Dataverse upsert engine': 'Multi-Entity-Upsert-Engine in Dataverse',
    'Centralised error logging + admin MDA': 'Zentrales Error Logging plus Admin-MDA',
    'Condition: Language': 'Bedingung: Sprache',
    'German C1 Certification': 'Deutsch-C1-Zertifizierung',
    'DACH Market Access Enabled': 'DACH-Marktzugang aktiviert',
    'Leading technical kick-offs with native German clients directly — a rare differentiator in Indian Power Platform talent.': 'Technische Kick-offs direkt mit deutschsprachigen Kunden leiten zu können, ist ein seltener Differenzierungsfaktor im indischen Power-Platform-Talentmarkt.',
    'Current Status — Ready for Next Challenge': 'Aktueller Status — bereit für die nächste Herausforderung',
    'Ready to bring Power Platform expertise and C1 German fluency to your team. Pune-based, remote-friendly.': 'Bereit, Power-Platform-Expertise und Deutsch auf C1-Niveau in Ihr Team einzubringen. Standort Pune, remote-freundlich.',
    'Chat with Copilot': 'Mit Copilot chatten',
    'LinkedIn': 'LinkedIn',
    'Copy Email': 'E-Mail kopieren',
    'Skills Arsenal': 'Skill-Arsenal',
    'Power Apps (Canvas + MDA)': 'Power Apps (Canvas + MDA)',
    'Microsoft Dataverse': 'Microsoft Dataverse',
    'Copilot Studio': 'Copilot Studio',
    'Power BI + DAX': 'Power BI + DAX',
    'Azure OpenAI / GPT-4.1': 'Azure OpenAI / GPT-4.1',
    'MCP Server Integration': 'MCP-Server-Integration',
    'PCF Controls': 'PCF Controls',
    'JSON Schema': 'JSON Schema',
    'JavaScript / TypeScript': 'JavaScript / TypeScript',
    'SharePoint': 'SharePoint',
    'Dynamics 365': 'Dynamics 365',
    'Azure Functions': 'Azure Functions',
    'SQL Server': 'SQL Server',
    'Azure DevOps': 'Azure DevOps',
    'Power Query (M)': 'Power Query (M)',
    'ServiceNow': 'ServiceNow',
    'German C1 (Professional)': 'Deutsch C1 (berufssicher)',
    'An AI agent trained on Sagar\'s profile. Ask anything a recruiter might want to know.': 'Ein KI-Agent, trainiert auf Sagars Profil. Fragen Sie alles, was für Recruiting und Hiring relevant ist.',
    'Recruiter Prompts': 'Recruiter-Fragen',
    'What are your top skills?': 'Was sind deine wichtigsten Skills?',
    'Tell me about German expertise': 'Erzaehl mir von deiner Deutsch-Kompetenz',
    'Describe a complex Power App': 'Beschreibe eine komplexe Power App',
    'Show contact information': 'Kontaktdaten anzeigen',
    'What certifications?': 'Welche Zertifizierungen?',
    'Work experience': 'Berufserfahrung',
    'Why should I hire Sagar?': 'Warum sollte ich Sagar einstellen?',
    'Sagar\'s Copilot Agent': 'Sagars Copilot-Agent',
    'Online & Ready': 'Online & bereit',
    'Clear chat': 'Chat leeren',
    'Sagar\'s Copilot': 'Sagars Copilot',
    'Hello! I\'m an AI agent trained on Sagar\'s professional experience, portfolio, and skills.': 'Hallo! Ich bin ein KI-Agent, der auf Sagars Berufserfahrung, Portfolio und Skills abgestimmt ist.',
    'I can help you understand his expertise in Power Platform, AI integrations, C1 German fluency, or provide direct contact details. Use the prompts on the left or just ask freely.': 'Ich helfe dabei, seine Power-Platform-Expertise, KI-Integrationen, Deutschkenntnisse auf C1-Niveau und Kontaktdaten schnell einzuordnen. Nutzen Sie die Fragen links oder fragen Sie frei.',
    'Hello! I\'m an AI agent trained on Sagar\'s professional experience, portfolio, and skills. I can help you understand his expertise in Power Platform, AI integrations, C1 German fluency, or provide direct contact details. Use the prompts on the left or just ask freely.': 'Hallo! Ich bin ein KI-Agent, der auf Sagars Berufserfahrung, Portfolio und Skills abgestimmt ist. Ich helfe dabei, seine Power-Platform-Expertise, KI-Integrationen, Deutschkenntnisse auf C1-Niveau und Kontaktdaten schnell einzuordnen. Nutzen Sie die Fragen links oder fragen Sie frei.',
    'Portfolio Highlights': 'Portfolio-Highlights',
    'Contact Info': 'Kontaktdaten',
    'Why hire Sagar?': 'Warum Sagar?',
    'Ask Sagar\'s Copilot…': 'Sagars Copilot fragen...',
    'Enter to send · Shift+Enter for new line': 'Enter sendet · Shift+Enter für neue Zeile',
    'Sagar Milind Deshpande · Power Platform + AI Engineer · Pune, India': 'Sagar Milind Deshpande · Power Platform + KI Engineer · Pune, Indien',
    'Built with Power Platform aesthetics': 'Gebaut im Look-and-feel der Power Platform',
    'Email copied!': 'E-Mail kopiert!'
  };

  const PROJECTS_DE = [
    {t:'KI-gestützte Dokumentenverarbeitung',co:'Freelance · 2025',col:'var(--accent-apps)',ic:'document_scanner',tags:['Power Apps','KI','Dataverse','Power Automate','Azure OpenAI'],desc:'Ein komplett manueller Review-Prozess für Immobiliendokumente wurde durch eine Ende-zu-Ende-KI-Pipeline ersetzt. Power Automate übernimmt den Upload, GPT-4.1 klassifiziert und extrahiert strukturierte Metadaten, Dataverse speichert die Datensätze. Unsichere Fälle werden über Confidence-Regeln an Menschen zur Prüfung geroutet.',tech:['Power Apps','Power Automate','Azure OpenAI','GPT-4.1','Dataverse','Model-Driven App','Environment Variables','Modulare Child Flows'],pts:['Mehrstufige Pipeline: Upload -> KI-Klassifikation -> Metadatenextraktion -> Dataverse-Datensatz','Confidence-basiertes Routing über Konfigurationstabellen statt hart codierter Logik','Multi-Entity-Upsert-Engine für Deal, Asset, Building und Unit','Zentrales Error Logging und Monitoring über eine Admin Model-Driven App','Saubere Dev/Test/Prod-Deployments mit Environment Variables und modularen Child Flows']},
    {t:'JSON-Schema Dynamic Form Engine',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','PCF Controls'],desc:'Eine Canvas App mit JSON-Schema-gesteuerter Engine für über 80 Entitäten und mehr als 1.000 Attribute. Fachbereiche können Felder in Echtzeit hinzufügen, ausblenden, anzeigen oder ändern, ohne dass ein Code-Deployment notwendig ist.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','JavaScript','PCF Controls'],pts:['80+ Entitäten und 1.000+ Attribute aus Dataverse-Schemas gesteuert','Keine Redeploys für Feldkonfigurationsänderungen','Dynamische Grid- und Konfigurationsoberfläche für Fachanwender','Rekursive Komponentenarchitektur für verschachtelte Formularstrukturen','Dark/Light Mode, KPI-Dashboards und eingebettete Power-BI-Berichte']},
    {t:'Fortgeschrittener Copilot-Studio-Agent',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'smart_toy',tags:['KI','Copilot Studio','MCP Server','Dataverse'],desc:'Enterprise-Copilot-Agenten für Datei-Uploads, dynamische Formularabfragen und vollständige CRUD-Operationen über einen konfigurierten MCP-Server. Wissensartikel sind direkt im Agenten eingebettet. Ergebnis: rund 40 % kürzere durchschnittliche Ticketlösungszeit und keine Entwicklerintervention für Routineanfragen nach Go-live.',tech:['Copilot Studio','MCP Server','Dataverse','Power Automate','Knowledge Base'],pts:['MCP-Server-Integration für sicheres CRUD auf internen SQL-Datenbanken und proprietären APIs','Dynamische Formularabfrage: Der Agent generiert und befüllt Formulare kontextbezogen','Datei-Upload-Flows mit KI-gestützter Verarbeitung und Routing','Eingebettete Knowledge Base für geführte Workflow-Walkthroughs','Rund 40 % kürzere Ticketlösungszeit; Routineanfragen ohne Entwicklerunterstützung']},
    {t:'190+ Stunden eingespart: Enterprise Automation Suite',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Microsoft Teams'],desc:'Eine umfassende Power-Automate-Suite, die monatlich mehr als 190 Stunden manuellen Aufwand eliminiert: Genehmigungsrouting, Dokumentenworkflows, plattformübergreifende Benachrichtigungen und geplante Pipelines.',tech:['Power Automate','SharePoint','Microsoft Teams','E-Mail','Excel','Scheduled Flows'],pts:['190+ Stunden Teamkapazitaet pro Monat durch automatisierte Workflows freigesetzt','Mehrstufige Approval-Flows mit Eskalation und Tracking','Dokumentenworkflows mit automatisierter Ablage und Metadatenpflege','Teams- und E-Mail-Benachrichtigungen mit dynamischem Inhalt','Geplante Wartungs- und Reporting-Pipelines statt manueller Wochenreports']},
    {t:'Enterprise Power BI Reporting Suite',co:'T-Systems · 2022–2024',col:'var(--accent-apps)',ic:'bar_chart',tags:['Power BI','DAX','ServiceNow','Azure DevOps'],desc:'Drei Ende-zu-Ende-Power-BI-Lösungen auf komplexen Datenmodellen: eine fünfstufig drillbare Ticket-Hierarchie, ein DevOps-Lizenz-Compliance-Tracker und ein ServiceNow-SLA-Reaktionszeitreport.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','ServiceNow','Azure DevOps'],pts:['5-stufige Ticket-Hierarchie: Projects -> Services -> Sub-Services -> Tickets -> Categories','DevOps-Lizenz-Compliance über 7-8 Tools, inklusive Erkennung ungenutzter Lizenzen seit 6+ Monaten','ServiceNow-SLA-Report für den Lebenszyklus Open -> In Progress -> Pending -> Closed','Multi-Table-Datenmodelle mit Power-Query-Transformationen','Eingebettet in Power Apps für eine einheitliche Nutzererfahrung']},
    {t:'KI-Assistenz: Upload zu Autofill',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'auto_awesome',tags:['Power Apps','Azure OpenAI','Dataverse'],desc:'Ein einziger Canvas-App-Screen für die komplette Document-to-Data-Pipeline: Dokument hochladen, Power Automate triggert Azure-OpenAI-Extraktion, Confidence Scoring entscheidet zwischen Autofill und manueller Prüfung.',tech:['Canvas Apps','Azure OpenAI','Power Automate','Dataverse','PCF Controls'],pts:['Single-Screen-UX für die komplette Upload-to-Fill-Pipeline ohne Seitenwechsel','GPT-4.1 extrahiert strukturierte Daten praezise aus unstrukturierten Dokumenten','Hohe Confidence -> Autofill; niedrige Confidence -> manuelle Prüfung','PCF Controls für bessere Upload-Erfahrung mit Vorschau','Keine manuelle Dateneingabe für Standarddokumente in Produktion']}
  ];

  const RESP_DE = {
    skills:()=>`Sagars stärkste Skills liegen klar in der Microsoft Power Platform:\n\n**Power Apps** — Canvas und Model-Driven Apps, inklusive JSON-Schema-Engine für 80+ Entitäten und PCF Custom Controls.\n\n**Power Automate** — Komplexe mehrstufige Pipelines, Approval-Flows, Dokumentenverarbeitung und über 190 Stunden monatliche Einsparung bei T-Systems.\n\n**KI-Integration** — Azure OpenAI GPT-4.1 für Dokumentenverarbeitung, Copilot-Studio-Agenten mit MCP Server und Confidence-basiertes Routing.\n\n**Dataverse** — Relationale Architekturen, Dev/Test/Prod-Governance und hierarchische Multi-Entity-Datenmodelle.\n\n**Deutsch C1** — Berufssicher eingesetzt in Kundenmeetings und technischen Kick-offs mit DACH-Kunden.`,
    german:()=>`Sagar hat Deutsch auf C1-Niveau und nutzt die Sprache nicht nur formal im Lebenslauf, sondern praktisch im Projektalltag.\n\nBei **T-Systems ICT India** hat er:\n- technische Kick-off-Meetings direkt mit deutschsprachigen Kunden geführt\n- Level-1 technischen und fachlichen Support auf Deutsch geleistet\n- als Team Lead für deutschsprachige Kundenaccounts agiert\n- bei Concentrix mit 50+ deutschsprachigen Interaktionen pro Tag **87 % CSAT** erreicht\n\nDas ist ein echter Differenzierungsfaktor: Er kann mit DACH-Stakeholdern direkt arbeiten, ohne dass immer eine sprachliche Bruecke dazwischenstehen muss.`,
    app:()=>`Das stärkste Beispiel ist die **JSON-Schema Dynamic Form Engine** bei Adastra:\n\nEine rekursive Canvas App, die komplexe UI-Formulare direkt aus JSON-Schemas in Dataverse generiert:\n- 80+ Entitäten und 1.000+ Attribute\n- Fachbereiche können Felder in Echtzeit anpassen, ohne Code-Änderung\n- PCF Controls, Dark/Light Mode und eingebettete Power-BI-Berichte\n\nEin weiteres starkes Projekt ist die **KI-gestützte Dokumentenverarbeitung**: GPT-4.1 extrahiert Metadaten aus PDFs, Confidence-Regeln steuern das Routing und Dataverse speichert die Ergebnisse automatisch.`,
    contact:()=>`Hier sind Sagars direkte Kontaktdaten:\n\n**E-Mail:** deshpande.sagar.milind@gmail.com\n**LinkedIn:** linkedin.com/in/sagar-deshpande2306\n**Standort:** Pune, Maharashtra, Indien\n**Telefon:** +91 90286 82226\n\nEr ist offen für passende Rollen, remote-freundlich und für gute Chancen auch offen für Relocation.`,
    cert:()=>`Sagar hat zwei aktuelle Microsoft-Zertifizierungen:\n\n**PL-400** — Microsoft Certified: Power Platform Developer Associate (Mai 2025)\nDie fortgeschrittene Developer-Zertifizierung für Custom Connectors, PCF Controls und komplexe Canvas-App-Entwicklung.\n\n**PL-900** — Microsoft Certified: Power Platform Fundamentals (Oktober 2024)\n\nBeide Zertifizierungen sind aktuell und zeigen, dass er sich parallel zur Projektarbeit aktiv weiterentwickelt.`,
    exp:()=>`Sagars Berufserfahrung umfasst mehr als fünf Jahre:\n\n**Concentrix** (Juni 2020 – Maerz 2022)\nAdvisor I — Aufbau professioneller C1-Kommunikation mit DACH-Kunden. 87 % CSAT, 90 %+ RAP.\n\n**T-Systems ICT India** (Mai 2022 – Dez. 2024)\nJunior Consultant — 190+ Std./Monat automatisiert, Canvas Apps, Power-Automate-Suites, Power-BI-Dashboards und deutschsprachige Kick-offs.\n\n**Adastra** (Jan. 2025 – heute)\nData Engineer (Power Platform) — KI-Pipelines, Copilot-Studio-Agenten mit MCP Server, JSON-Schema Form Engine, PCF Controls und Azure-DevOps-Governance.\n\n**Freelance** (Juli – Dez. 2025)\nEnde-zu-Ende-KI-Verarbeitung für Immobiliendokumente mit GPT-4.1 und Dataverse.`,
    hire:()=>`Drei Dinge machen Sagar besonders interessant:\n\n**1. Nutzerfokus durch wirtschaftlichen Hintergrund**\nEr kommt nicht aus der klassischen Informatik, sondern aus der Volkswirtschaft. Dadurch denkt er in Prozessen, Nutzen und Akzeptanz, nicht nur in Technik. Seine Apps brauchen kaum Schulung.\n\n**2. Deutsch C1 im echten Projektkontext**\nEr kann technische Kick-offs mit DACH-Kunden direkt fuehren. Das ist für internationale Teams ein echter Vorteil.\n\n**3. Tiefe Power-Platform-Expertise**\nVon Canvas Apps mit PCF Controls über GPT-4.1-Pipelines bis zu Copilot-Studio-Agenten mit MCP-Server-CRUD: Sagar arbeitet am anspruchsvollen Ende der Power Platform.`,
    portfolio:()=>`Sagars Portfolio umfasst sechs Projekte über drei Arbeitskontexte hinweg:\n\n1. **KI Document Processing** — GPT-4.1 + Dataverse Pipeline (Freelance)\n2. **JSON-Schema Form Engine** — 80+ Entitäten, Konfiguration ohne Redeploy (Adastra)\n3. **Copilot Studio Agent** — MCP Server + CRUD (Adastra)\n4. **190+ Std. Automation Suite** — Power Automate im Enterprise-Umfeld (T-Systems)\n5. **Power BI Suite** — drei Dashboards mit 5-Level-Drilldowns (T-Systems)\n6. **AI Upload-to-Autofill** — Single-Screen Azure-OpenAI-Pipeline (Adastra)\n\nDie Details finden Sie in der Canvas-Sektion dieses Portfolios.`
  };

  function normalized(value){ return String(value || '').replace(/\s+/g, ' ').trim(); }
  function defaultLang(){
    const stored = localStorage.getItem(LS_KEY);
    if(stored === 'en' || stored === 'de') return stored;
    const langs = navigator.languages || [navigator.language || ''];
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const germanLang = langs.some(l => /^de(-|$)/i.test(l));
    const germanySignal = /Europe\/Berlin/i.test(tz) || langs.some(l => /-DE$/i.test(l));
    return (germanLang || germanySignal) ? 'de' : 'en';
  }
  function rememberOriginalAttr(el){
    if(!originalAttrs.has(el)){
      originalAttrs.set(el, {
        placeholder: el.getAttribute('placeholder'),
        title: el.getAttribute('title'),
        ariaLabel: el.getAttribute('aria-label')
      });
    }
  }
  function applyText(lang){
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';
    document.title = lang === 'de'
      ? 'Sagar Deshpande — Power Platform + KI Engineer'
      : 'Sagar Deshpande — Power Platform + AI Engineer';

    document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
      rememberOriginalAttr(el);
      const base = originalAttrs.get(el);
      ['placeholder','title','ariaLabel'].forEach(key => {
        const attr = key === 'ariaLabel' ? 'aria-label' : key;
        const original = base[key];
        if(original == null) return;
        const translated = DE_TEXT[normalized(original)];
        el.setAttribute(attr, lang === 'de' && translated ? translated : original);
      });
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!normalized(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if(node.parentElement?.closest('script,style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if(!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const translated = DE_TEXT[normalized(original)];
      if(lang === 'de' && translated){
        const lead = original.match(/^\s*/)?.[0] || '';
        const trail = original.match(/\s*$/)?.[0] || '';
        node.nodeValue = lead + translated + trail;
      } else {
        node.nodeValue = original;
      }
    });
    updateToggle(lang);
  }
  function updateToggle(lang){
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
    });
  }
  function currentLang(){ return localStorage.getItem(LS_KEY) || defaultLang(); }
  window.setLang = function(lang){
    const next = lang === 'de' ? 'de' : 'en';
    localStorage.setItem(LS_KEY, next);
    applyText(next);
  };

  const originalOpenModal = window.openModal;
  window.openModal = function(i){
    if(currentLang() !== 'de') return originalOpenModal(i);
    const p = PROJECTS_DE[i];
    if(!p) return originalOpenModal(i);
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
      <h3 class="modal-project-section">Wichtigste Ergebnisse</h3>
      <div class="modal-project-points">${p.pts.map(b=>`<div><span class="msym">check_circle</span><span>${b}</span></div>`).join('')}</div>
      <h3 class="modal-project-section">Tech Stack</h3>
      <div class="modal-project-tech">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div>
      </div>`;
    document.getElementById('proj-modal').style.display='flex';
  };

  const originalGetResp = window.getResp;
  window.getResp = function(msg){
    if(currentLang() !== 'de') return originalGetResp(msg);
    const m = msg.toLowerCase();
    if(m.includes('skill') || m.includes('kompetenz') || m.includes('top') || m.includes('stark')) return RESP_DE.skills();
    if(m.includes('german') || m.includes('deutsch') || m.includes('dach')) return RESP_DE.german();
    if(m.includes('power app') || m.includes('complex') || m.includes('komplex') || m.includes('gebaut') || m.includes('canvas')) return RESP_DE.app();
    if(m.includes('contact') || m.includes('kontakt') || m.includes('email') || m.includes('e-mail') || m.includes('phone') || m.includes('telefon') || m.includes('linkedin')) return RESP_DE.contact();
    if(m.includes('certif') || m.includes('zertif')) return RESP_DE.cert();
    if(m.includes('experience') || m.includes('erfahrung') || m.includes('work') || m.includes('job') || m.includes('karriere') || m.includes('company')) return RESP_DE.exp();
    if(m.includes('hire') || m.includes('einstellen') || m.includes('warum') || m.includes('why')) return RESP_DE.hire();
    if(m.includes('portfolio') || m.includes('highlight') || m.includes('project') || m.includes('projekt')) return RESP_DE.portfolio();
    return `Gute Frage. Sagar ist Power Platform + KI Engineer mit mehr als fünf Jahren Erfahrung in Canvas Apps, Power Automate, KI-Integrationen mit GPT-4.1, Copilot Studio und Dataverse. Dazu kommt Deutsch auf C1-Niveau, das er in Kundenkontexten praktisch einsetzt.\n\nSie können zum Beispiel fragen nach:\n• seinen stärksten Skills\n• Deutsch- und DACH-Erfahrung\n• einem konkreten Projekt\n• Berufserfahrung\n• Kontaktdaten\n• warum er für eine Rolle interessant ist`;
  };

  const search = document.getElementById('gsearch');
  search?.addEventListener('keydown', e => {
    if(e.key !== 'Enter') return;
    const q = e.target.value.toLowerCase().trim();
    const map = {home:['start','über','über','sagar','zertifikat'],canvas:['canvas','projekt','projekte','app','ki','dataverse','automate','bi','power'],flow:['flow','erfahrung','laufbahn','beruf','job','skills'],copilot:['copilot','chat','kontakt','frage']};
    for(const [sec,kws] of Object.entries(map)){
      if(kws.some(k => q.includes(k) || k.includes(q))){
        goTo(sec);
        e.target.value='';
        break;
      }
    }
  });

  const initial = defaultLang();
  localStorage.setItem(LS_KEY, initial);
  applyText(initial);
})();
