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
    'Connect': 'Vernetzen',
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
    'Most people use Power Platform to build forms. I use it to build systems people actually enjoy using.': 'Die meisten Menschen nutzen die Power Platform, um Formulare zu bauen. Ich nutze sie, um Systeme zu bauen, die man wirklich gerne verwendet.',
    'Over the last 5+ years, I\'ve been designing apps, automations, AI experiences, and business solutions that sit somewhere between engineering, product thinking, and': 'In den letzten über 5 Jahren habe ich Apps, Automatisierungen, KI-Erlebnisse und Business-Lösungen gestaltet, die irgendwo zwischen Engineering, Produktdenken und',
    '"how did you even build this in low-code?"': '"wie hast du das überhaupt in Low-Code gebaut?"',
    'My work lives across Power Apps, Power Automate, Dataverse, Power BI, Copilot Studio, AI integrations — and increasingly the space where automation stops feeling robotic and starts feeling intelligent.': 'Meine Arbeit erstreckt sich über Power Apps, Power Automate, Dataverse, Power BI, Copilot Studio und KI-Integrationen – und zunehmend über den Bereich, in dem Automatisierung aufhört, roboterhaft zu wirken, und anfängt, sich intelligent anzufühlen.',
    'What makes me different is that I don\'t think like a traditional developer. I care about flow, friction, adoption,': 'Was mich unterscheidet, ist, dass ich nicht wie ein klassischer Entwickler denke. Mir sind Ablauf, Reibung, Akzeptanz,',
    'UI details people don\'t consciously notice': 'UI-Details, die niemandem bewusst auffallen',
    ', the logic behind the logic, and the tiny things that make a system feel smooth instead of corporate.': ', die Logik hinter der Logik und die kleinen Dinge wichtig, die ein System flüssig statt behäbig wirken lassen.',
    'I can discuss architecture with developers, process gaps with stakeholders, and then switch to presenting the same solution in German to DACH clients — without sounding like I memorised it five minutes earlier.': 'Ich kann mit Entwicklern über Architektur sprechen, mit Stakeholdern über Prozesslücken – und dann dieselbe Lösung auf Deutsch für DACH-Kunden präsentieren, ohne zu klingen, als hätte ich sie mir fünf Minuten vorher eingeprägt.',
    'Somewhere between Power Fx, AI orchestration, and German theatre, I accidentally built a career around': 'Irgendwo zwischen Power Fx, KI-Orchestrierung und deutschem Theater habe ich ganz nebenbei eine Karriere darauf aufgebaut,',
    'translating complexity into experiences that feel simple.': 'Komplexität in Erlebnisse zu übersetzen, die sich einfach anfühlen.',
    'And honestly, that\'s still the part I enjoy most.': 'Und ehrlich gesagt ist das immer noch der Teil, der mir am meisten Spaß macht.',
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
    '"Sagar is a very helpful, cheerful, and polite team player who is a pleasure to work with. His German skills are impressive, especially considering that German is his third language. He made valuable contributions to an internal project by developing a Power App and creating insightful visualizations in Power BI. Throughout the project, he consistently demonstrated a proactive attitude and a strong willingness to help others. I truly enjoyed working with Sagar and would be happy to collaborate with him again in the future."': '"Sagar ist ein sehr hilfsbereiter, fröhlicher und höflicher Teamplayer, mit dem die Zusammenarbeit Freude macht. Seine Deutschkenntnisse sind beeindruckend, besonders wenn man bedenkt, dass Deutsch seine dritte Sprache ist. Er hat in einem internen Projekt wertvolle Beiträge geleistet, indem er eine Power App entwickelte und aufschlussreiche Visualisierungen in Power BI erstellte. Während des gesamten Projekts zeigte er durchgehend eine proaktive Haltung und eine große Hilfsbereitschaft. Die Zusammenarbeit mit Sagar hat mir wirklich Freude bereitet und ich würde jederzeit gerne wieder mit ihm arbeiten."',
    'Data Engineer · Adastra Germany': 'Data Engineer · Adastra Germany',
    'June 10, 2026 · Senior to Sagar, didn\'t manage directly': '10. Juni 2026 · Sagar gegenüber vorgesetzt, ohne direkte Führung',
    '"I had the pleasure of working with Sagar and was always impressed by his proactive approach, technical expertise, and positive attitude.': '"Ich hatte das Vergnügen, mit Sagar zu arbeiten, und war stets von seinem proaktiven Ansatz, seiner fachlichen Kompetenz und seiner positiven Einstellung beeindruckt.',
    'Sagar combines strong Power Platform knowledge with excellent consulting skills. He worked confidently with German-speaking stakeholders, facilitated discussions in German, and consistently translated business requirements into practical solutions.': 'Sagar verbindet fundiertes Power-Platform-Wissen mit ausgezeichneten Beratungsfähigkeiten. Er arbeitete sicher mit deutschsprachigen Stakeholdern, moderierte Diskussionen auf Deutsch und übersetzte Geschäftsanforderungen konsequent in praktische Lösungen.',
    'Beyond his technical contributions, Sagar helped drive improvements in the way the team worked by introducing Agile practices such as Scrum boards and regular stand-ups, many of which continue to benefit the team today. His solutions were designed with long-term value in mind, and several of the automations he developed are still actively used to improve efficiency.': 'Über seine technischen Beiträge hinaus trug Sagar dazu bei, die Arbeitsweise des Teams zu verbessern, indem er agile Praktiken wie Scrum-Boards und regelmäßige Stand-ups einführte, von denen viele dem Team bis heute zugutekommen. Seine Lösungen waren auf langfristigen Nutzen ausgelegt, und mehrere der von ihm entwickelten Automatisierungen sind noch heute aktiv im Einsatz, um die Effizienz zu steigern.',
    'Sagar is reliable, collaborative, and genuinely enjoyable to work with. I would highly recommend him to any organization looking for a consultant who can bridge the gap between business needs and technology."': 'Sagar ist zuverlässig, kooperativ und eine echte Bereicherung für jedes Team. Ich würde ihn jeder Organisation wärmstens empfehlen, die einen Berater sucht, der die Lücke zwischen Geschäftsanforderungen und Technologie schließen kann."',
    'Project Manager · T-Systems ICT India': 'Project Manager · T-Systems ICT India',
    'June 1, 2026 · Managed Sagar directly': '1. Juni 2026 · Sagar direkt geführt',
    '"I had the pleasure of working with Sagar and can recommend him without hesitation. He is technically strong in low-code development and data visualization, but what truly sets him apart is his attitude: proactive, innovative, and with a great work ethic. He identifies opportunities before being asked and always delivers with quality. I have no doubt he will continue to do great work wherever he goes."': '"Ich hatte das Vergnügen, mit Sagar zu arbeiten, und kann ihn ohne Zögern empfehlen. Er ist technisch stark in der Low-Code-Entwicklung und Datenvisualisierung, aber was ihn wirklich auszeichnet, ist seine Einstellung: proaktiv, innovativ und mit einer großartigen Arbeitsmoral. Er erkennt Chancen, bevor er darum gebeten wird, und liefert stets Qualität. Ich habe keinen Zweifel, dass er überall, wohin er geht, hervorragende Arbeit leisten wird."',
    'Cloud Architect · Adastra': 'Cloud Architect · Adastra',
    'June 4, 2026 · Senior to Sagar, didn\'t manage directly': '4. Juni 2026 · Sagar gegenüber vorgesetzt, ohne direkte Führung',
    'LinkedIn Verified': 'Auf LinkedIn verifiziert',
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
    {t:'ESG Data Collector — Dynamische Formular-Engine',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','Azure AI'],desc:'Ein like-for-like Power-Platform-Ersatz für eine teure ESG-Drittanbieteranwendung, geliefert innerhalb von drei Monaten. Statt über 80 individuell gestaltete Formulare neu zu bauen, entstand eine einzige JSON-Schema-gesteuerte Canvas-App mit Formular und Grid: Jede Feldänderung und jede neue Entität ist reine Konfiguration, kein Entwickler nötig. Umfasst 80+ Entitäten und 1.000+ Attribute.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','Azure AI','Power Automate'],pts:['JSON-Schema-gesteuerte Engine: ein Formular plus Grid für 80+ Entitäten und 1.000+ Attribute','Neue Entitäten und Feldänderungen rein per Konfiguration, ohne Entwicklerbeteiligung','Dynamisches Grid und Konfigurationsoberfläche für Feldverwaltung in Echtzeit','KI-gestützte Datenerfassung: Dokument hochladen, Azure AI befüllt die relevanten Felder','KI-Ergebnis wird als JSON für die Downstream-Systeme des Kunden gespeichert','Im ursprünglichen 3-Monats-Zeitrahmen geliefert, zu einem Bruchteil der Drittanbieterkosten']},
    {t:'ESG Copilot-Studio-Agent',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'smart_toy',tags:['KI','Copilot Studio','MCP Server','Dataverse'],desc:'Aufbauend auf dem ESG Data Collector, damit Nutzer ESG-Daten einreichen können, ohne die Canvas App zu öffnen. Ein Copilot-Studio-Agent in Microsoft Teams und Copilot Chat, dessen Konversation vom je Entität definierten JSON-Schema gesteuert wird. War in Produktion im Einsatz.',tech:['Copilot Studio','MCP Server','Power Automate','Dataverse','SharePoint','Adaptive Cards','JSON Schema'],pts:['In Microsoft Teams und Copilot Chat bereitgestellt, ohne Canvas App zur Dateneingabe','Konversation vom JSON-Schema je Entität gesteuert; Topics, Custom Prompts, Diversions und Eskalationsflows','Power-Automate-Integration für Dataverse-Updates, SharePoint-Dateierstellung und komplexes JSON-Parsing','Custom Prompts wandeln Nutzereingaben und Dokumentinhalte in strukturiertes JSON für Adaptive Cards','MCP-Server für dynamische Formularabfrage und CRUD-Operationen konfiguriert','Eingebettete Wissensartikel für In-Chat-Anleitung; war in Produktion im Einsatz']},
    {t:'190+ Stunden eingespart: Prozessautomatisierung',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Excel'],desc:'Mehrere Power-Automate-Flows automatisieren Geschäftsprozesse im gesamten Team und schaffen 190+ Stunden zusätzliche Teamkapazität. Integriert mit SharePoint und Excel als primären Datenquellen.',tech:['Power Automate','SharePoint','Excel','Microsoft Teams','Scheduled Flows'],pts:['190+ Stunden zusätzliche Teamkapazität generiert','Mehrere Flows automatisieren Geschäftsprozesse im gesamten Team','SharePoint und Excel als primäre Datenquellen','Genehmigungsrouting, Dokumentenworkflows und geplante Pipelines','Manuelle, repetitive Reporting- und Koordinationsaufgaben ersetzt']},
    {t:'ServiceNow Reporting — Ticket-Hierarchie',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'account_tree',tags:['Power BI','DAX','ServiceNow'],desc:'Eine Ende-zu-Ende-Wochenreporting-Lösung für ServiceNow auf einem fünfstufigen Hierarchie-Datenmodell — Registered Projects -> Services -> Sub-Services -> Tickets -> Ticket Category — mit komplexen DAX-Measures und interaktiven Dashboards. Deckt die gesamte Strecke von Datenmodellierung und Power-Query-Transformationen bis zu Dashboards mit Slicern und Drilldowns ab.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','ServiceNow'],pts:['5-stufiges Hierarchie-Datenmodell: Projects -> Services -> Sub-Services -> Tickets -> Categories','Komplexe DAX-Measures als Grundlage der Reporting-Logik','Interaktive Dashboards mit Slicern und Drilldowns','Ende-zu-Ende-Wochenreporting: Datenmodellierung plus Power-Query-Transformationen','Aufgebaut auf ServiceNow-Ticketdaten']},
    {t:'DevOps Toolchain Lizenzbericht',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'key',tags:['Power BI','Compliance','T-Systems'],desc:'Erfasst aktive Nutzer, maximale Sitze und freie Kapazität über 7-8 DevOps-Tools — mit einer eigenen Ansicht für die Playground-Instanz und einer Markierung für seit 6+ Monaten ungenutzte Lizenzen. Schafft volle Transparenz über Kosten und Compliance an einem Ort.',tech:['Power BI','DAX Measures','Power Query (M)','Data Modelling','T-Systems'],pts:['Erfasst über 7-8 DevOps-Tools: aktive Nutzer, max. Sitze, freie Kapazität','Eigene Ansicht für die Playground-Instanz','Identifiziert seit 6+ Monaten ungenutzte Lizenzen','Volle Kosten- und Compliance-Transparenz in einem Dashboard','Automatisches Markieren ungenutzter Lizenzen zur Kostenoptimierung']},
    {t:'ServiceNow SLA Reaktionsbericht',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'timer',tags:['Power BI','ServiceNow','T-Systems'],desc:'Misst die gesamte Ticket-Lebenszykluszeit: Open -> In Progress -> Pending -> Closed. Macht SLA-Compliance-Lücken sichtbar und gibt Teamleitungen eine faktenbasierte Grundlage für Performance-Gespräche.',tech:['Power BI','DAX Measures','Power Query (M)','ServiceNow Integration','T-Systems'],pts:['Vollständiges Ticket-Lebenszyklus-Tracking: Open -> In Progress -> Pending -> Closed','Identifikation von SLA-Compliance-Lücken','Performance-Metriken und -Gespräche für Teamleitungen','Faktenbasierte Grundlage für Eskalationen','ServiceNow-Datenaktualisierung in Echtzeit']},
    {t:'Adastra BI & Allocation Reporting Suite',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'bar_chart',tags:['Power BI','Dataverse','Adastra'],desc:'Zwei Power-BI-Lösungen bei Adastra. Der Allocation Report liefert genaue, validierte Allokationsdaten, sobald die Allocation Management App live war — mit komplexer Geschäftslogik, Multi-Source-Datentransformation und performance-optimierter Modellierung. Das Bench Reporting ist eine automatisierte Lösung mit dynamischen Parametern, Bookmarks, DAX-Measures und Drilldown-Visuals, direkt in der App eingebettet für Echtzeitzugriff.',tech:['Power BI','DAX Measures','Power Query (M)','Dataverse','Bookmarks'],pts:['Allocation Report: komplexe Geschäftslogik, Multi-Source-Transformation, performance-optimierte Modellierung','Liefert genaue, validierte Allokationsdaten, sobald die Allocation Management App live war','Bench Reporting: dynamische Parameter, Bookmarks, DAX-Measures und Drilldown-Visuals','Bench-Report direkt in der App eingebettet für Echtzeitzugriff','Reporting-Quelle von Excel nach Dataverse migriert']},
    {t:'KI-Assistenz — Upload zu Autofill',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'auto_awesome',tags:['Power Apps','Azure AI','Dataverse'],desc:'Das KI-gestützte Erfassungs-Feature des ESG Data Collector. Auf einem einzigen Canvas-App-Screen laden Nutzer ein Dokument hoch, und Azure-AI-Modelle befüllen die relevanten ESG-Felder automatisch. Das Ergebnis wird als JSON für die Downstream-Systeme des Kunden gespeichert — keine manuelle Dateneingabe für Standarddokumente.',tech:['Canvas Apps','Azure AI','Power Automate','Dataverse','JSON'],pts:['KI-Erfassungs-Feature, eingebaut in den ESG Data Collector','Dokument hochladen -> Azure AI befüllt die relevanten Felder automatisch','Ergebnis als strukturiertes JSON für die Downstream-Systeme des Kunden gespeichert','Single-Screen-UX — keine manuelle Dateneingabe für Standarddokumente','Confidence-bewusst: Felder mit geringer Sicherheit zur manuellen Prüfung markiert']},
    {t:'Allocation Management App',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'assignment_turned_in',tags:['Power Apps','Dataverse','Power Automate','Power BI'],desc:'Für einen internen Kunden gebaut, um einen komplett manuellen, Excel-basierten Prozess zur Verwaltung von Mitarbeiterallokationen über Practices hinweg abzulösen. Project Responsibles stellen Allokationsanfragen; Practice Leads genehmigen sie. Der alte Prozess hatte keine Validierung — Dubletten, Über-Allokationen und überlappende Zuweisungen — und zwei Kolleginnen und Kollegen verbrachten rund 60 Stunden im Monat allein mit der Abstimmung zwischen beiden Seiten. Nach Go-live sank die monatliche Prozesszeit von 60 auf 8-10 Stunden: eine Reduktion um 83 %.',tech:['Model-Driven Apps','Custom Pages','Dataverse','Power Automate','Adaptive Cards','Office Scripts','Dataflows','Security Roles','Power BI'],pts:['Model-Driven App mit Custom-Page-Ebene auf Dataverse','Approval-Workflows via Power Automate mit Adaptive Cards in Teams und Outlook','HTML-Controls für eine Echtzeit-Genehmigungsleiste, Audit-Historie und Inline-Warnungen bei Über-Allokation und Überlappung','Bulk-Uploads über SharePoint — Office Scripts extrahieren Excel-Tabellendaten in JSON-Arrays für die Flow-Verarbeitung','Dataflows für geplante Stammdatenimporte; Custom Security Roles und Access Teams je Project Lead und Practice Lead','Power-BI-Report von Excel auf Dataverse als Quelle migriert','83 % Reduktion der monatlichen Prozesszeit: 60 Stunden -> 8-10 Stunden']},
    {t:'Document Intelligence Pipeline',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'document_scanner',tags:['Power Automate','Azure AI','Dataverse','Power Pages'],desc:'Automatische Inhaltsextraktion, Klassifikation nach Dokumenttyp und Laden der Metadaten nach Dataverse für tausende Dokumente — 500+ Dokumenttypen über 60+ Familien, die zu sechs verschiedenen Teams gehören. Begonnen mit einer formalen Anforderungsphase (funktionale und nicht-funktionale Anforderungen mit einem dedizierten Business Analyst plus Anforderungsspezifikation) und einem vollständigen Architekturentwurf vor Entwicklungsbeginn.',tech:['Power Automate','Azure REST API','Azure AI Services','Dataverse','Model-Driven Apps','Power Pages','DBDiagram.io'],pts:['500+ Dokumenttypen über 60+ Familien, verteilt auf sechs Teams','Anforderungsspezifikation, DBDiagram.io-Datenmodell und Architekturdiagramm vor der Entwicklung erstellt','Parent-Flow, der vier Child-Flows mit unterschiedlichen Triggern orchestriert','Power Automate -> Azure REST API für Inhaltsextraktion -> Azure AI Services für Klassifikation -> Metadaten nach Dataverse','Frontend: Model-Driven App mit Custom Pages (intern) und Power Pages (extern)','Klassifikationslogik für neue Dokumenttypen konfigurierbar, ohne Flows neu zu bauen']},
    {t:'Power Virtual Agents Bot',co:'T-Systems · 2022–2024',col:'var(--accent-copilot)',ic:'support_agent',tags:['Power Virtual Agents','Chatbot'],desc:'Konversationsbots, gebaut mit Power Virtual Agents, um First-Level-Nutzeranfragen zu bearbeiten — mit Konfiguration von Topics, Trigger-Phrasen und Konversationsknoten.',tech:['Power Virtual Agents','Topics','Trigger-Phrasen','Konversationsknoten'],pts:['Bearbeitung von First-Level-Nutzeranfragen zur Entlastung von Routineanfragen','Topics und Trigger-Phrasen konfiguriert','Konversationsknoten und Dialogabläufe gestaltet','Frühe Konversations-KI-Grundlage, später ausgebaut in der Copilot-Studio-Arbeit']}
  ];

  const RESP_DE = {
    skills:()=>`Sagars stärkste Skills liegen klar in der Microsoft Power Platform:\n\n**Power Apps** — Canvas und Model-Driven Apps, inklusive JSON-Schema-Engine für 80+ Entitäten und PCF Custom Controls.\n\n**Power Automate** — Komplexe mehrstufige Pipelines, Approval-Flows, Dokumentenverarbeitung und über 190 Stunden monatliche Einsparung bei T-Systems.\n\n**KI-Integration** — Azure OpenAI GPT-4.1 für Dokumentenverarbeitung, Copilot-Studio-Agenten mit MCP Server und Confidence-basiertes Routing.\n\n**Dataverse** — Relationale Architekturen, Dev/Test/Prod-Governance und hierarchische Multi-Entity-Datenmodelle.\n\n**Deutsch C1** — Berufssicher eingesetzt in Kundenmeetings und technischen Kick-offs mit DACH-Kunden.`,
    german:()=>`Sagar hat Deutsch auf C1-Niveau und nutzt die Sprache nicht nur formal im Lebenslauf, sondern praktisch im Projektalltag.\n\nBei **T-Systems ICT India** hat er:\n- technische Kick-off-Meetings direkt mit deutschsprachigen Kunden geführt\n- Level-1 technischen und fachlichen Support auf Deutsch geleistet\n- als Team Lead für deutschsprachige Kundenaccounts agiert\n- bei Concentrix mit 50+ deutschsprachigen Interaktionen pro Tag **87 % CSAT** erreicht\n\nDas ist ein echter Differenzierungsfaktor: Er kann mit DACH-Stakeholdern direkt arbeiten, ohne dass immer eine sprachliche Bruecke dazwischenstehen muss.`,
    app:()=>`Das stärkste Beispiel ist der **ESG Data Collector** bei Adastra:\n\nEine JSON-Schema-gesteuerte Canvas App, die ein teures ESG-Drittanbietertool ersetzt hat — in 3 Monaten gebaut, statt 80+ Formulare neu zu erstellen:\n- 80+ Entitäten und 1.000+ Attribute\n- Neue Entitäten und Feldänderungen rein per Konfiguration, kein Code\n- KI-gestützte Erfassung: Dokument hochladen, Azure AI befüllt die Felder\n\nEin weiteres starkes Projekt ist die **Document Intelligence Pipeline**: Power Automate ruft die Azure REST API zur Inhaltsextraktion und Azure AI Services zur Klassifikation auf — über **500+ Dokumenttypen** in 60+ Familien — und lädt die Metadaten nach Dataverse, mit Model-Driven App und Power Pages als Frontend.`,
    contact:()=>`Hier sind Sagars direkte Kontaktdaten:\n\n**E-Mail:** deshpande.sagar.milind@gmail.com\n**LinkedIn:** linkedin.com/in/sagar-deshpande2306\n**Standort:** Pune, Maharashtra, Indien\n**Telefon:** +91 90286 82226\n\nEr ist offen für passende Rollen, remote-freundlich und für gute Chancen auch offen für Relocation.`,
    cert:()=>`Sagar hat zwei aktuelle Microsoft-Zertifizierungen:\n\n**PL-400** — Microsoft Certified: Power Platform Developer Associate (Mai 2025)\nDie fortgeschrittene Developer-Zertifizierung für Custom Connectors, PCF Controls und komplexe Canvas-App-Entwicklung.\n\n**PL-900** — Microsoft Certified: Power Platform Fundamentals (Oktober 2024)\n\nBeide Zertifizierungen sind aktuell und zeigen, dass er sich parallel zur Projektarbeit aktiv weiterentwickelt.`,
    exp:()=>`Sagars Berufserfahrung umfasst mehr als fünf Jahre:\n\n**Concentrix** (Juni 2020 – Maerz 2022)\nAdvisor I — Aufbau professioneller C1-Kommunikation mit DACH-Kunden. 87 % CSAT, 90 %+ RAP.\n\n**T-Systems ICT India** (Mai 2022 – Dez. 2024)\nJunior Consultant — 190+ Std./Monat automatisiert, Canvas Apps, Power-Automate-Suites, Power-BI-Dashboards und deutschsprachige Kick-offs.\n\n**Adastra** (Jan. 2025 – heute)\nData Engineer (Power Platform) — ESG Data Collector, ESG Copilot-Studio-Agent mit MCP Server, Document Intelligence Pipeline mit Azure AI und Azure-DevOps-Governance.`,
    hire:()=>`Drei Dinge machen Sagar besonders interessant:\n\n**1. Nutzerfokus durch wirtschaftlichen Hintergrund**\nEr kommt nicht aus der klassischen Informatik, sondern aus der Volkswirtschaft. Dadurch denkt er in Prozessen, Nutzen und Akzeptanz, nicht nur in Technik. Seine Apps brauchen kaum Schulung.\n\n**2. Deutsch C1 im echten Projektkontext**\nEr kann technische Kick-offs mit DACH-Kunden direkt fuehren. Das ist für internationale Teams ein echter Vorteil.\n\n**3. Tiefe Power-Platform-Expertise**\nVon Canvas Apps mit PCF Controls über GPT-4.1-Pipelines bis zu Copilot-Studio-Agenten mit MCP-Server-CRUD: Sagar arbeitet am anspruchsvollen Ende der Power Platform.`,
    portfolio:()=>`Sagars Portfolio umfasst 11 Projekte bei Adastra und T-Systems:\n\n1. **ESG Data Collector** — JSON-Schema-Form-Engine, 80+ Entitäten (Adastra)\n2. **ESG Copilot-Studio-Agent** — Teams + Copilot Chat, MCP Server (Adastra)\n3. **190+ Std. Prozessautomatisierung** — Power Automate teamweit (T-Systems)\n4. **ServiceNow Reporting** — 5-stufiges Hierarchie-Datenmodell (T-Systems)\n5. **DevOps Lizenzbericht** — Multi-Tool-Tracking und Compliance (T-Systems)\n6. **ServiceNow SLA-Report** — Lebenszyklus-Tracking (T-Systems)\n7. **Adastra BI & Allocation Suite** — Allocation Report + Bench Reporting (Adastra)\n8. **KI Upload-to-Autofill** — ESG-KI-Erfassung, Single-Screen (Adastra)\n9. **Allocation Management App** — 60 -> 8-10 Std./Monat, 83 % weniger (Adastra)\n10. **Document Intelligence Pipeline** — Azure AI, 500+ Dokumenttypen (Adastra)\n11. **Power Virtual Agents Bot** — Chatbot für First-Level-Anfragen (T-Systems)\n\nDie Details finden Sie in der Canvas-Sektion dieses Portfolios.`
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
