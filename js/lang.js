/* FILE: /js/lang.js */
/* Last updated: 2026-10-25 */
/* Description: EN/DE language toggle, German translations, localized project data, and German chat responses. */
/* How it works: every visible text node whose (whitespace-normalized) English text is a key in DE_TEXT is swapped.
   A <br> or <strong> splits a paragraph into several text nodes, so each fragment needs its own key.
   After changing English copy in index.html, run a coverage check or the German version silently falls back to English. */
(() => {
  const LS_KEY = 'portfolio-lang';
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  const DE_TEXT = {
    // Header, sidebar
    'Search sections…': 'Bereiche durchsuchen …',
    'Open menu': 'Menü öffnen',
    'Click to switch theme': 'Klicken, um das Design zu wechseln',
    'Language selector': 'Sprachauswahl',
    'Connect': 'Vernetzen',
    'Chat with Sagar\'s Copilot': 'Mit Sagars Copilot chatten',
    'Power Platform + AI Engineer': 'Power Platform + KI Engineer',
    'Download CV': 'Lebenslauf herunterladen',
    'The Maker (Home)': 'Der Maker (Start)',
    'The Canvas': 'Das Canvas',
    'The Flow': 'Der Flow',
    'The Copilot': 'Der Copilot',
    'Copy Email': 'E-Mail kopieren',
    'Copy email': 'E-Mail kopieren',
    'Copilot Chat': 'Copilot Chat',
    'Available': 'Verfügbar',
    // Hero, stats
    "Bachelor of Arts in Economics": "Bachelor of Arts in Volkswirtschaftslehre",
    "The Report": "Der Bericht",
    "Everything above, on one report page. Pick your open role and decide.": "Alles von oben auf einer Berichtsseite. Wählen Sie Ihre offene Stelle und entscheiden Sie.",
    "Report": "Bericht",
    "If yes": "Wenn ja",
    "If no": "Wenn nein",
    "All (16)": "Alle (16)",
    "Advisor · Jun 2020 – Mar 2022 · Pune": "Advisor · Juni 2020 – März 2022 · Pune",
    "varGerman = \"C1\" · Output": "varGerman = \"C1\" · Ausgabe",
    "Company is": "Unternehmen ist",
    "The Admin Center": "Das Admin Center",
    "Power Platform + AI · Deutsch C1": "Power Platform + KI · Deutsch C1",
    "Available now · Ready to relocate to Germany": "Ab sofort verfügbar · Umzug nach Deutschland möglich",
    "German C1 · English C1": "Deutsch C1 · Englisch C1",
    "A collection of 16 Power Apps, Dataverse architectures, AI integrations and reports.": "16 Projekte: Power Apps, Architekturen auf Dataverse, KI-Integrationen und Berichte.",
    "Governance": "Governance",
    "DLP policies, Dev to Prod pipelines and the security model behind the apps.": "DLP-Richtlinien, Pipelines von Dev bis Prod und das Sicherheitsmodell hinter den Apps.",
    "Stack": "Stack",
    "Freelance Trainer: Microsoft 365, Power Platform & AI": "Freiberuflicher Dozent für Microsoft 365, Power Platform & KI",
    "Jul 2026 – Present": "Juli 2026 – heute",
    "Karlsruhe (remote)": "Karlsruhe (remote)",
    "Data Engineer (Power Platform & BI Developer)": "Data Engineer (Power Platform & BI Developer)",
    "Jan 2025 – Jun 2026": "Jan. 2025 – Juni 2026",
    "Pune · 1.5 yrs": "Pune · 1,5 Jahre",
    "Advisor: Customer Service in German": "Advisor, Kundenservice auf Deutsch",
    "Certifications & Languages": "Zertifizierungen & Sprachen",
    "Goethe-Zertifikat C1 · business fluent": "Goethe-Zertifikat C1 · verhandlungssicher",
    "Used daily since 2020": "Täglich im Einsatz seit 2020",
    "Business fluent": "Verhandlungssicher",
    "Working language": "Arbeitssprache",
    "33 Processes Automated: 190+ Hours/Month": "33 Prozesse automatisiert: über 190 Stunden pro Monat",
    "From German first-level support to the team's Power Platform developer:": "Vom deutschsprachigen First-Level-Support zum Entwickler des Teams für die Power Platform:",
    "33 business processes": "33 Geschäftsprozesse",
    "automated with Power Automate, plus Canvas and Model-Driven Apps on SharePoint and Excel, freeing up": "mit Power Automate automatisiert, dazu Canvas und Model-Driven Apps auf Basis von SharePoint und Excel; freigesetzt:",
    "190+ team hours": "über 190 Teamstunden",
    "a month.": "pro Monat.",
    "Adastra BI Suite: Allocation, Bench & Xero": "BI-Suite bei Adastra: Allocation, Bench und Xero",
    "Allocation Report for management's resource planning, Bench Reporting with dynamic parameters, bookmarks and DAX drilldowns": "Allocation Report für die Ressourcenplanung des Managements, Bench Reporting mit dynamischen Parametern, Bookmarks und Drilldowns in DAX,",
    "embedded live in the app": "live in die App eingebettet",
    ", and a Xero integration report joined with Dataverse.": ", dazu ein Integrationsbericht aus Xero und Dataverse.",
    "Azure REST API, Azure AI Services and Azure OpenAI classify and extract metadata from thousands of documents,": "Azure REST API, Azure AI Services und Azure OpenAI klassifizieren mehrere tausend Dokumente und extrahieren Metadaten:",
    "750+ document types": "750+ Dokumenttypen",
    "First-Level Support": "First-Level-Support",
    "Support Chatbots": "Chatbots für den Support",
    "Chatbots for standard first-level support requests, built with the predecessor of Copilot Studio: topics, trigger phrases and conversation nodes.": "Chatbots für Standardanfragen im First-Level-Support, gebaut mit dem Vorgänger von Copilot Studio: Topics, Trigger Phrases und Gesprächsknoten.",
    "Sentiment Analysis in Dynamics 365": "Sentimentanalyse in Dynamics 365",
    "A Custom Page opened from a Model-Driven App sends uploaded files to a model in": "Eine Custom Page in einer Model-Driven App schickt hochgeladene Dateien an ein Modell in",
    "Azure AI Foundry": "Azure AI Foundry",
    ". Sentiment and metadata come back as JSON and land on contact and account in Dynamics 365.": ". Sentiment und Metadaten kommen als JSON zurück und landen an Kontakt und Account in Dynamics 365.",
    "Command bar changes with Ribbon Workbench, form logic in JavaScript, business rules,": "Anpassungen der Command Bar mit Ribbon Workbench, Formularlogik in JavaScript, Business Rules,",
    "PCF controls in TypeScript": "PCF Controls in TypeScript",
    "and Custom Pages, with record- and column-level security.": "und Custom Pages, dazu Sicherheit auf Ebene von Datensätzen und Spalten.",
    "Microsoft Fabric Lakehouse": "Lakehouse in Microsoft Fabric",
    "Medallion architecture on F2 capacity: Xero, Dataverse and SharePoint in": "Medallion-Architektur auf Kapazität F2: Xero, Dataverse und SharePoint in",
    "bronze": "Bronze",
    ", notebooks refine to silver and gold, a scheduled pipeline refreshes it, and a semantic model feeds Power BI.": ", Notebooks bereiten zu Silver und Gold auf, eine geplante Pipeline aktualisiert, ein Semantic Model versorgt Power BI.",
    "Power Pages Portal for External Users": "Power Pages Portal für externe Nutzer",
    "Service providers and suppliers sign in and see, create or change": "Dienstleister und Lieferanten melden sich an und sehen, erstellen oder ändern",
    "only the data shared with them": "nur die für sie freigegebenen Daten",
    ", enforced with web roles and table permissions on Dataverse.": ", abgesichert über Web Roles und Table Permissions auf Dataverse.",
    "Code App with React": "Code App mit React",
    "A Power Apps": "Eine",
    "Code App written in React": "Code App in Power Apps, geschrieben in React",
    ", built with AI assistance on standard prompt and skill libraries. I reviewed the code myself against the requirements.": ", KI-gestützt auf Basis standardisierter Bibliotheken für Prompts und Skills. Den Code habe ich selbst gegen die Anforderungen geprüft.",
    "View Portal": "Portal ansehen",
    "Initialize variable: varGerman": "Variable initialisieren: varGerman",
    "Condition: Is the task repetitive?": "Bedingung: Wiederholt sich die Aufgabe?",
    "Automate it": "Automatisieren",
    "33 business processes with Power Automate": "33 Geschäftsprozesse mit Power Automate",
    "Canvas and Model-Driven Apps on SharePoint and Excel": "Canvas und Model-Driven Apps auf Basis von SharePoint und Excel",
    "Power BI reports for ServiceNow and licences": "Berichte in Power BI für ServiceNow und Lizenzen",
    "Support it in German": "Auf Deutsch unterstützen",
    "First-level support, technical and functional": "First-Level-Support, technisch und fachlich",
    "Kick-off meetings with clients": "Auftakttermine mit Kunden",
    "Standing in for the team lead": "Vertretung der Teamleitung",
    "Started in support, became the team's developer on my own initiative.": "Im Support gestartet, aus Eigeninitiative zum Entwickler des Teams geworden.",
    "automated, saving": "automatisiert, eingespart:",
    "every month": "jeden Monat",
    "Scope: Adastra": "Scope: Adastra",
    "Data Engineer (Power Platform & BI Developer) · Jan 2025 – Jun 2026 · Pune": "Data Engineer (Power Platform & BI Developer) · Jan. 2025 – Juni 2026 · Pune",
    "Less effort": "weniger Aufwand",
    "Outputs": "Ergebnisse",
    "Document Intelligence: 750+ document types, Azure AI Services and Azure OpenAI, Power Pages for external users": "Document Intelligence: 750+ Dokumenttypen, Azure AI Services und Azure OpenAI, Power Pages für externe Nutzer",
    "Model-Driven and Canvas Apps on Dataverse, AI with Azure AI Services and Copilot Studio, Power BI and Microsoft Fabric, with ALM through Azure DevOps pipelines and DLP governance.": "Model-Driven und Canvas Apps auf Dataverse, KI mit Azure AI Services und Copilot Studio, Power BI und Microsoft Fabric, mit ALM über Azure DevOps Pipelines und DLP-Governance.",
    "Switch: Role at Adastra": "Switch: Rolle bei Adastra",
    "3 CASES": "3 FÄLLE",
    "Power Platform Developer": "Power Platform Entwickler",
    "Power BI Developer": "Power BI Entwickler",
    "Copilot Agent Developer": "Entwickler für Agenten in Copilot Studio",
    "Apply to each: Teilnehmende": "Apply to each: Teilnehmende",
    "Freelance Trainer for Microsoft 365, Power Platform & AI · Since Jul 2026 · Karlsruhe (remote)": "Freiberuflicher Dozent für Microsoft 365, Power Platform & KI · seit Juli 2026 · Karlsruhe (remote)",
    "Taught in German": "Unterricht auf Deutsch",
    "Apps & data": "Apps & Daten",
    "AI & method": "KI & Methodik",
    "Teams, SharePoint Online (Sites and Lists), OneDrive, Word, Excel, PowerPoint": "Teams, SharePoint Online (Sites und Lists), OneDrive, Word, Excel, PowerPoint",
    "Power Apps, Power Automate, Dataverse, Power BI, Power Query, DAX": "Power Apps, Power Automate, Dataverse, Power BI, Power Query, DAX",
    "Microsoft Copilot, Copilot Studio, agents and prompting; requirements engineering, solution design, Scrum, Kanban": "Microsoft Copilot, Copilot Studio, Agenten und Prompting; Requirements Engineering, Solution Design, Scrum, Kanban",
    "Post adaptive card and wait for a response": "Post adaptive card and wait for a response",
    "Every exercise waits for the learner's answer before the loop moves on.": "Jede Übung wartet auf die Antwort der Teilnehmenden, bevor die Schleife weiterläuft.",
    "Designing and teaching hands-on courses in German for participants in further-education programmes, with my own course material and exercises.": "Konzeption und Durchführung praxisnaher Schulungen auf Deutsch für Teilnehmende in Weiterbildungsmaßnahmen, mit eigenen Kursunterlagen und Übungen.",
    "Send an email (V2)": "Send an email (V2)",
    "To": "An",
    "You, the recruiter": "Sie, Recruiterin oder Recruiter",
    "Subject": "Betreff",
    "Let's talk about your Power Platform role": "Lassen Sie uns über Ihre Stelle für die Power Platform sprechen",
    "Ready to bring Power Platform expertise and C1 German to your team. Available immediately, ready to relocate to Germany.": "Bereit, Erfahrung mit der Power Platform und Deutsch auf C1-Niveau in Ihr Team einzubringen. Ab sofort verfügbar, Umzug nach Deutschland jederzeit möglich.",
    "Power Platform admin center": "Power Platform Admin Center",
    "Policies": "Richtlinien",
    "Data policies": "Datenrichtlinien",
    "ALM · Security · DLP": "ALM · Sicherheit · DLP",
    "The part nobody sees in a demo: how apps get from Dev to Prod, who can see what, and which connectors are allowed to talk to each other.": "Der Teil, den man in keiner Demo sieht: wie Apps von Dev nach Prod kommen, wer was sehen darf und welche Konnektoren miteinander sprechen dürfen.",
    "Data policy: How I build": "Datenrichtlinie: So baue ich",
    "Scope: all environments · Status: Enforced": "Bereich: alle Umgebungen · Status: aktiv",
    "Business": "Business",
    "Non-business": "Non-Business",
    "Blocked": "Blockiert",
    "reviewed first": "erst nach Prüfung",
    "Custom connectors": "Custom Connectors",
    "Hard-coded credentials": "Fest einprogrammierte Zugangsdaten",
    "Unreviewed deployments": "Ungeprüfte Deployments",
    "Changes straight in Prod": "Änderungen direkt in Prod",
    "DLP policies for the Power Platform, used in production at Adastra.": "DLP-Richtlinien der Power Platform, produktiv im Einsatz bei Adastra.",
    "Deployment pipeline": "Deployment Pipeline",
    "Azure DevOps · Managed Solutions · Git": "Azure DevOps · Managed Solutions · Git",
    "Development": "Entwicklung",
    "Unmanaged": "Unmanaged",
    "Managed": "Managed",
    "Production": "Produktion",
    "Who can see what": "Wer sieht was",
    "Security model, outside in": "Sicherheitsmodell, von außen nach innen",
    "Sign-in and environment permissions": "Anmeldung und Berechtigungen je Umgebung",
    "Security roles": "Sicherheitsrollen",
    "Table-level access in Dataverse": "Zugriff auf Tabellenebene in Dataverse",
    "Access teams": "Access Teams",
    "Per Project Lead and Practice Lead": "Je Project Lead und Practice Lead",
    "Column and record security": "Sicherheit auf Spalten- und Datensatzebene",
    "Sensitive fields stay hidden": "Sensible Felder bleiben verborgen",
    "Web roles & table permissions": "Web Roles und Table Permissions",
    "External users in Power Pages": "Externe Nutzer in Power Pages",
    "Solution review": "Solution Review",
    "What I check before anything ships": "Was ich vor jedem Deployment prüfe",
    "Optimisation potential": "Optimierungspotenzial",
    "Remaining dependencies": "Verbleibende Abhängigkeiten",
    "Environment variables, no hard-coded URLs": "Environment Variables statt fest einprogrammierter URLs",
    "Ready for the deployment pipeline": "Bereit für die Deployment Pipeline",
    "Document Intelligence: one solution became two": "Document Intelligence: aus einer Solution wurden zwei",
    "Tables": "Tabellen",
    "Apps, flows, environment variables, sitemaps": "Apps, Flows, Environment Variables, Sitemaps",
    "Availability & relocation": "Verfügbarkeit & Umzug",
    "Governance & ALM": "Governance & ALM",
    "When are you available?": "Wann sind Sie verfügbar?",
    "How do you handle governance and ALM?": "Wie gehen Sie mit Governance und ALM um?",
    "Documents": "Dokumente",
    "Contact": "Kontakt",
    "Signed in as: Anonymous": "Angemeldet als: Anonym",
    "Signed in as: Recruiter": "Angemeldet als: Recruiter",
    "A Power Pages list on a Dataverse table. What you see depends on your web role.": "Eine Liste in Power Pages auf einer Tabelle in Dataverse. Was Sie sehen, hängt von Ihrer Web Role ab.",
    "Web role": "Web Role",
    "Anonymous Users": "Anonymous Users",
    "Recruiter": "Recruiter",
    "Name": "Name",
    "Type": "Typ",
    "Table permission": "Table Permission",
    "Lebenslauf (German CV)": "Lebenslauf",
    "Read · Global": "Lesen · Global",
    "Download": "Herunterladen",
    "PL-400 credential": "Nachweis PL-400",
    "PL-900 credential": "Nachweis PL-900",
    "Verify": "Prüfen",
    "LinkedIn profile": "LinkedIn-Profil",
    "External": "Extern",
    "Open": "Öffnen",
    "Read · Web role: Recruiter": "Lesen · Web Role: Recruiter",
    "Availability": "Verfügbarkeit",
    "Record": "Datensatz",
    "Immediately · relocation to Germany": "Ab sofort · Umzug nach Deutschland",
    "Book a call": "Gespräch vereinbaren",
    "Action": "Aktion",
    "Create · Web role: Recruiter": "Erstellen · Web Role: Recruiter",
    "Salary expectations": "Gehaltsvorstellung",
    "Requires web role: Interviewer": "Erfordert Web Role: Interviewer",
    "Let's talk in the interview": "Gern im Gespräch",
    "4 records visible to Anonymous Users · 3 hidden by table permissions": "4 Datensätze für Anonymous Users sichtbar · 3 durch Table Permissions verborgen",
    "7 records visible to Recruiter · 1 needs the Interviewer role": "7 Datensätze für Recruiter sichtbar · 1 erfordert die Rolle Interviewer",
    "Data policy: new connector detected": "Datenrichtlinie: neuer Konnektor erkannt",
    "This connector counts visits to the site. It only sets cookies if you put it in the Business group. Nothing is loaded before you choose.": "Dieser Konnektor zählt Besuche der Website. Er setzt nur Cookies, wenn Sie ihn der Gruppe Business zuordnen. Vor Ihrer Auswahl wird nichts geladen.",
    "Blocked (decline)": "Blockiert (ablehnen)",
    "Business (accept)": "Business (zulassen)",
    "Available now, ready to relocate to Germany": "Ab sofort verfügbar, Umzug nach Deutschland möglich",
    "· Power Platform + AI Engineer · Available now, ready to relocate to Germany": "· Power Platform + KI Engineer · Ab sofort verfügbar, Umzug nach Deutschland möglich",
    "Recruiter portal": "Recruiter-Portal",
    "Your open role": "Ihre offene Stelle",
    "4 rows": "4 Zeilen",
    "Shows each control as it is placed": "Zeigt jedes Control beim Platzieren",
    "≈ 4.75 work-weeks, every month": "≈ 4,75 Arbeitswochen, jeden Monat",
    "Before": "Vorher",
    "After": "Nachher",
    "60+ families": "60+ Familien",
    "Ask the agent what a recruiter would ask. It answers from my CV.": "Fragen Sie den Agenten, was ein Recruiter fragen würde. Er antwortet auf Basis meines Lebenslaufs.",
    "Experience": "Erfahrung",
    "Active Experience": "Aktive Erfahrung",
    "3 rows": "3 Zeilen",
    "Company": "Unternehmen",
    "Role": "Rolle",
    "Period": "Zeitraum",
    "Running": "Läuft",
    "Succeeded": "Erfolgreich",
    "Duration: 6+ Years": "Dauer: 6+ Jahre",
    "Run history": "Ausführungsverlauf",
    "Then": "Dann",
    "1.5+ yrs": "1,5+ J.",
    "1.8 yrs": "1,8 J.",
    "2.7 yrs": "2,7 J.",
    "3 cases": "3 Fälle",
    "Waiting for you": "Wartet auf Sie",
    "Test your agent": "Agent testen",
    "Answers are written from the CV. No live model, no data sent anywhere.": "Die Antworten stammen aus dem Lebenslauf. Kein Live-Modell, es werden keine Daten gesendet.",
    "Filter projects": "Projekte filtern",
    "Top skills": "Top-Skills",
    "German expertise": "Deutschkenntnisse",
    "A complex Power App": "Eine komplexe Power App",
    "Email": "E-Mail",
    "Location": "Standort",
    "Pune, Maharashtra, India": "Pune, Maharashtra, Indien",
    "Phone": "Telefon",
    "Sagar's Copilot": "Sagars Copilot",
    "Tree view": "Strukturansicht",
    "Power Platform + AI · Pune": "Power Platform + KI · Pune",
    "I build Power Apps, flows and Copilot agents for enterprise teams, and I can run the kick-off meeting in German.": "Ich baue Power Apps, Flows und Agenten in Copilot Studio für Enterprise-Teams und kann das Kick-off-Meeting auf Deutsch leiten.",
    "Six years in.": "Seit sechs Jahren dabei.",
    "See the work": "Arbeiten ansehen",
    "Preview": "Vorschau",
    "Live": "Live",
    "App published": "App veröffentlicht",
    "Replay build": "Aufbau erneut abspielen",
    "Projects": "Projekte",
    "Ask Copilot": "Copilot fragen",
    "Yes, this card is a Canvas App.": "Ja, diese Karte ist eine Canvas App.",
    "By the numbers": "In Zahlen",
    "Source: CV · 2026": "Quelle: Lebenslauf · 2026",
    "Years building": "Jahre Erfahrung",
    "Hours saved / month": "Gesparte Stunden / Monat",
    "Power Automate flows at T-Systems": "Flows in Power Automate bei T-Systems",
    "Less process time": "Weniger Prozesszeit",
    "Allocation app: 60 → 8 to 10 hrs/month": "Allocation-App: 60 → 8 bis 10 Std./Monat",
    "Document types classified": "Klassifizierte Dokumenttypen",
    "60+ families across six teams": "60+ Familien in sechs Teams",
    "Sagar Deshpande, home": "Sagar Deshpande, Start",
    "Sections": "Bereiche",
    "by Sagar": "von Sagar",
    'Power Platform + AI Engineer · C1 German · Turning complex problems into solutions people actually enjoy using.': 'Power Platform + KI Engineer · Deutsch C1 · Ich mache aus komplexen Anforderungen Lösungen, die Menschen wirklich gern nutzen.',
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
    // Quick nav cards
    'A collection of 11 complex Power Apps, Dataverse architectures, and AI integrations.': 'Eine Sammlung von 11 anspruchsvollen Power Apps, Architekturen auf Dataverse und KI-Integrationen.',
    'AI / OpenAI': 'KI / OpenAI',
    '6+ years visualised as a Power Automate execution flow. Concentrix → T-Systems → Adastra.': 'Über sechs Jahre Berufserfahrung, dargestellt als Ausführungsflow in Power Automate: Concentrix → T-Systems → Adastra.',
    // About
    'About Me': 'Über mich',
    'Most people use Power Platform to build forms. I use it to build systems people actually enjoy using.': 'Die meisten Menschen nutzen die Power Platform, um Formulare zu bauen. Ich nutze sie, um Systeme zu bauen, die man wirklich gerne verwendet.',
    'Over the last 5+ years, I\'ve been designing apps, automations, AI experiences, and business solutions that sit somewhere between engineering, product thinking, and': 'In den letzten über 5 Jahren habe ich Apps, Automatisierungen, KI-Erlebnisse und Business-Lösungen gestaltet, die irgendwo zwischen Engineering, Produktdenken und',
    '"how did you even build this in low-code?"': '„Wie hast du das überhaupt in Low-Code gebaut?“',
    'My work lives across Power Apps, Power Automate, Dataverse, Power BI, Copilot Studio, AI integrations: and increasingly the space where automation stops feeling robotic and starts feeling intelligent.': 'Meine Arbeit erstreckt sich über Power Apps, Power Automate, Dataverse, Power BI, Copilot Studio und KI-Integrationen: und zunehmend über den Bereich, in dem Automatisierung aufhört, roboterhaft zu wirken, und anfängt, sich intelligent anzufühlen.',
    'What makes me different is that I don\'t think like a traditional developer. I care about flow, friction, adoption,': 'Was mich unterscheidet, ist, dass ich nicht wie ein klassischer Entwickler denke. Mir sind Ablauf, Reibung, Akzeptanz,',
    'UI details people don\'t consciously notice': 'UI-Details, die niemandem bewusst auffallen',
    ', the logic behind the logic, and the tiny things that make a system feel smooth instead of corporate.': ', die Logik hinter der Logik und die kleinen Dinge wichtig, die ein System flüssig statt behäbig wirken lassen.',
    'I can discuss architecture with developers, process gaps with stakeholders, and then switch to presenting the same solution in German to DACH clients: without sounding like I memorised it five minutes earlier.': 'Ich kann mit Entwicklern über Architektur sprechen, mit Stakeholdern über Prozesslücken: und dann dieselbe Lösung auf Deutsch für DACH-Kunden präsentieren, ohne zu klingen, als hätte ich sie mir fünf Minuten vorher eingeprägt.',
    'Somewhere between Power Fx, AI orchestration, and German theatre, I accidentally built a career around': 'Irgendwo zwischen Power Fx, KI-Orchestrierung und deutschem Theater habe ich ganz nebenbei eine Karriere darauf aufgebaut,',
    'translating complexity into experiences that feel simple.': 'Komplexität in Erlebnisse zu übersetzen, die sich einfach anfühlen.',
    'And honestly, that\'s still the part I enjoy most.': 'Und ehrlich gesagt ist das immer noch der Teil, der mir am meisten Spaß macht.',
    // Work experience
    'Work Experience': 'Berufserfahrung',
    'Current': 'Aktuell',
    'Data Engineer: Power Platform + AI': 'Data Engineer: Power Platform + KI',
    'Jan 2025 – Present': 'Jan. 2025 – heute',
    'Pune · 1.5+ yrs': 'Pune · 1,5+ Jahre',
    'Junior Consultant: Power Platform Developer': 'Junior Consultant: Power Platform Developer',
    'German C1 Lead': 'Deutsch C1 Lead',
    'German C1': 'Deutsch C1',
    'May 2022 – Dec 2024': 'Mai 2022 – Dez. 2024',
    'Pune · 2.7 yrs': 'Pune · 2,7 Jahre',
    'Advisor I: German Enterprise Support': 'Advisor I: deutschsprachiger Enterprise Support',
    'Jun 2020 – Mar 2022': 'Juni 2020 – März 2022',
    'Pune · 1.8 yrs': 'Pune · 1,8 Jahre',
    'Full flow timeline': 'Vollständige Flow-Timeline',
    // Certifications
    'Certifications': 'Zertifizierungen',
    'Microsoft · May 2025': 'Microsoft · Mai 2025',
    'Microsoft · October 2024': 'Microsoft · Oktober 2024',
    'Verify Credential': 'Nachweis prüfen',
    // Testimonials (split at <br>, one key per line)
    'Testimonials': 'Stimmen',
    '"Sagar is a very helpful, cheerful, and polite team player who is a pleasure to work with.': '„Sagar ist ein sehr hilfsbereiter, fröhlicher und höflicher Teamplayer, mit dem die Zusammenarbeit Freude macht.',
    'His German skills are impressive, especially considering that German is his third language.': 'Seine Deutschkenntnisse sind beeindruckend, besonders wenn man bedenkt, dass Deutsch seine dritte Sprache ist.',
    'He made valuable contributions to an internal project by developing a Power App and creating insightful visualizations in Power BI. Throughout the project, he consistently demonstrated a proactive attitude and a strong willingness to help others.': 'Er hat in einem internen Projekt wertvolle Beiträge geleistet, indem er eine Power App entwickelte und aufschlussreiche Visualisierungen in Power BI erstellte. Während des gesamten Projekts zeigte er durchgehend eine proaktive Haltung und eine große Hilfsbereitschaft.',
    'I truly enjoyed working with Sagar and would be happy to collaborate with him again in the future."': 'Die Zusammenarbeit mit Sagar hat mir wirklich Freude bereitet, und ich würde jederzeit gerne wieder mit ihm arbeiten.“',
    'Data Engineer · Adastra Germany': 'Data Engineer · Adastra Germany',
    'June 10, 2026 · Senior to Sagar, didn\'t manage directly': '10. Juni 2026 · Sagar gegenüber vorgesetzt, ohne direkte Führung',
    '"I had the pleasure of working with Sagar and was always impressed by his proactive approach, technical expertise, and positive attitude.': '„Ich hatte das Vergnügen, mit Sagar zu arbeiten, und war stets von seinem proaktiven Ansatz, seiner fachlichen Kompetenz und seiner positiven Einstellung beeindruckt.',
    'Sagar combines strong Power Platform knowledge with excellent consulting skills. He worked confidently with German-speaking stakeholders, facilitated discussions in German, and consistently translated business requirements into practical solutions.': 'Sagar verbindet fundiertes Wissen zur Power Platform mit ausgezeichneten Beratungsfähigkeiten. Er arbeitete sicher mit deutschsprachigen Stakeholdern, moderierte Diskussionen auf Deutsch und übersetzte Geschäftsanforderungen konsequent in praktische Lösungen.',
    'Beyond his technical contributions, Sagar helped drive improvements in the way the team worked by introducing Agile practices such as Scrum boards and regular stand-ups, many of which continue to benefit the team today. His solutions were designed with long-term value in mind, and several of the automations he developed are still actively used to improve efficiency.': 'Über seine technischen Beiträge hinaus trug Sagar dazu bei, die Arbeitsweise des Teams zu verbessern, indem er agile Praktiken wie Scrum-Boards und regelmäßige Stand-ups einführte, von denen viele dem Team bis heute zugutekommen. Seine Lösungen waren auf langfristigen Nutzen ausgelegt, und mehrere der von ihm entwickelten Automatisierungen sind noch heute aktiv im Einsatz, um die Effizienz zu steigern.',
    'Sagar is reliable, collaborative, and genuinely enjoyable to work with. I would highly recommend him to any organization looking for a consultant who can bridge the gap between business needs and technology."': 'Sagar ist zuverlässig, kooperativ und eine echte Bereicherung für jedes Team. Ich würde ihn jeder Organisation wärmstens empfehlen, die einen Berater sucht, der die Lücke zwischen Geschäftsanforderungen und Technologie schließen kann.“',
    'Project Manager · T-Systems ICT India': 'Project Manager · T-Systems ICT India',
    'June 1, 2026 · Managed Sagar directly': '1. Juni 2026 · Sagar direkt geführt',
    '"I had the pleasure of working with Sagar and can recommend him without hesitation.': '„Ich hatte das Vergnügen, mit Sagar zu arbeiten, und kann ihn ohne Zögern empfehlen.',
    'He is technically strong in low-code development and data visualization, but what truly sets him apart is his attitude: proactive, innovative, and with a great work ethic.': 'Er ist technisch stark in der Low-Code-Entwicklung und Datenvisualisierung, aber was ihn wirklich auszeichnet, ist seine Einstellung: proaktiv, innovativ und mit einer großartigen Arbeitsmoral.',
    'He identifies opportunities before being asked and always delivers with quality.': 'Er erkennt Chancen, bevor man ihn darum bittet, und liefert stets Qualität.',
    'I have no doubt he will continue to do great work wherever he goes."': 'Ich habe keinen Zweifel, dass er überall, wohin er geht, hervorragende Arbeit leisten wird.“',
    'Cloud Architect · Adastra': 'Cloud Architect · Adastra',
    'June 4, 2026 · Senior to Sagar, didn\'t manage directly': '4. Juni 2026 · Sagar gegenüber vorgesetzt, ohne direkte Führung',
    'Read on LinkedIn': 'Auf LinkedIn lesen',
    // Canvas: filters and buttons
    'Insert': 'Einfügen',
    'Data': 'Daten',
    'All (11)': 'Alle (11)',
    'AI': 'KI',
    'View Details': 'Details ansehen',
    'View Solution': 'Lösung ansehen',
    'View Architecture': 'Architektur ansehen',
    'View Flow': 'Flow ansehen',
    'View Suite': 'Suite ansehen',
    'View Report': 'Report ansehen',
    'View Bot': 'Bot ansehen',
    // Canvas: project cards (split at <strong>)
    'JSON schema-driven Canvas App that replaced a costly third-party ESG tool in 3 months. One configurable form + grid for': 'über JSON Schema gesteuerte Canvas App, die in 3 Monaten ein teures ESG-Drittanbietertool ersetzt hat. Ein konfigurierbares Formular plus Grid für',
    '80+ entities': '80+ Entitäten',
    ', 1,000+ attributes: new fields and entities need zero code.': ', 1.000+ Attribute: neue Felder und Entitäten brauchen keinen Code.',
    'ESG Copilot Studio Agent': 'ESG Agent in Copilot Studio',
    'Built on the ESG Data Collector so users submit ESG data straight from Teams and Copilot Chat: no Canvas App needed. Conversation driven by the per-entity JSON schema, with an': 'Aufbauend auf dem ESG Data Collector reichen Nutzer ESG-Daten direkt aus Teams und Copilot Chat ein: ganz ohne Canvas App. Die Konversation wird vom JSON-Schema je Entität gesteuert, mit einem',
    'MCP server for dynamic form retrieval and CRUD.': 'MCP-Server für dynamische Formularabfrage und CRUD.',
    'Ran in production.': 'War in Produktion im Einsatz.',
    '190+ Hours/Month Saved: Process Automation': '190+ Stunden/Monat eingespart: Prozessautomatisierung',
    'Multiple Power Automate flows automating business processes across the team: freeing up': 'Mehrere Flows in Power Automate automatisieren Geschäftsprozesse im gesamten Team und schaffen',
    '190+ hours': '190+ Stunden',
    'of team bandwidth every month. SharePoint and Excel as primary data sources.': 'zusätzliche Teamkapazität pro Monat. SharePoint und Excel als primäre Datenquellen.',
    'End-to-end weekly ServiceNow reporting on a drillable': 'durchgängig-Wochenreporting für ServiceNow auf einer drillbaren',
    '5-level hierarchy': '5-stufigen Hierarchie',
    ': Projects → Services → Sub-Services → Tickets → Categories. Complex DAX, Power Query transformations, and slicer-driven dashboards.': ': Projects → Services → Sub-Services → Tickets → Categories. Komplexe DAX-Measures, Transformationen in Power Query und Dashboards mit Slicern.',
    'DevOps Toolchain License Report': 'DevOps Toolchain Lizenzbericht',
    'Tracks active users, maximum seats, and free capacity across 7 to 8 DevOps tools. Identifies licenses unused for 6+ months for cost optimisation.': 'Erfasst aktive Nutzer, maximale Sitze und freie Kapazität über 7 bis 8 DevOps-Tools. Identifiziert seit 6+ Monaten ungenutzte Lizenzen zur Kostenoptimierung.',
    'ServiceNow SLA Reaction Report': 'ServiceNow SLA Reaktionsbericht',
    'Measures full ticket lifecycle: Open → In Progress → Pending → Closed. Surfaces SLA compliance gaps and team performance metrics.': 'Misst den gesamten Ticket-Lebenszyklus: Open → In Progress → Pending → Closed. Macht Lücken in der SLA-Einhaltung und Kennzahlen zur Teamleistung sichtbar.',
    'Allocation Report with complex business logic, multi-source transformation, and performance-optimised modelling: built once the Allocation Management App went live. Plus automated Bench Reporting with dynamic parameters, bookmarks, and DAX drilldowns embedded in the app.': 'Allocation Report mit komplexer Geschäftslogik, Transformation aus mehreren Quellen und performance-optimierter Modellierung: gebaut, sobald die Allocation Management App live war. Dazu automatisiertes Bench Reporting mit dynamischen Parametern, Bookmarks und DAX-Drilldowns, direkt in der App eingebettet.',
    'AI Assistance: Upload to Autofill': 'KI-Assistenz: Upload zu Autofill',
    'The AI capture feature of the ESG Data Collector: upload a document on a single Canvas App screen and Azure AI pre-populates the relevant fields. Output saved as JSON for downstream systems: zero manual entry for standard documents.': 'Das KI-gestützte Erfassung des ESG Data Collector: Dokument auf einem einzigen Canvas-App-Screen hochladen, und Azure AI befüllt die relevanten Felder. Das Ergebnis wird als JSON für Downstream-Systeme gespeichert: keine manuelle Eingabe für Standarddokumente.',
    'Replaced a manual Excel allocation process with a Model-Driven App on Dataverse: multi-stage approval, Adaptive Cards in Teams/Outlook, over-allocation warnings, and audit history.': 'Ersetzte einen manuellen Excel-Allokationsprozess durch eine Model-Driven App auf Dataverse: mehrstufige Genehmigung, Adaptive Cards in Teams/Outlook, Warnungen bei Über-Allokation und Audit-Historie.',
    '60 → 8 to 10 hrs/month, an 83% reduction.': '60 → 8 bis 10 Std./Monat, eine Reduktion um 83 %.',
    'Azure REST API + Azure AI Services classify and extract metadata from': 'Azure REST API und Azure AI Services klassifizieren und extrahieren Metadaten aus',
    '500+ document types': '500+ Dokumenttypen',
    'across 60+ families and six teams, loading into Dataverse. Model-Driven App and Power Pages front end.': 'in 60+ Familien und sechs Teams und laden sie nach Dataverse. Frontend mit Model-Driven App und Power Pages.',
    'Conversational bots built with Power Virtual Agents to handle first-line user queries: configuring topics, trigger phrases, and conversation nodes.': 'Konversationsbots mit Power Virtual Agents für Standardanfragen im First-Level-Support: mit Konfiguration von Topics, Trigger-Phrasen und Konversationsknoten.',
    // Flow
    '| Duration: 6+ Years': '| Dauer: 6+ Jahre',
    'Execution Flow': 'Execution Flow',
    'My professional journey: visualised as a Power Automate workflow.': 'Mein beruflicher Weg, visualisiert wie ein Workflow in Power Automate.',
    'When an academic degree is acquired': 'Wenn ein Studienabschluss erworben wird',
    'Bachelor of Arts in Economics': 'Bachelor of Arts in Economics',
    'Economics background instills systemic thinking, resource optimisation logic, and a user-first perspective I bring to every build.': 'Der wirtschaftliche Hintergrund fördert systemisches Denken, ein Gespür für Ressourcenoptimierung und eine Nutzerperspektive, die ich in jedes Projekt einbringe.',
    'Initialize German Language Protocol': 'Deutsches Sprachprotokoll initialisieren',
    'ACTION': 'AKTION',
    'Advisor I · Jun 2020 – Mar 2022 · Pune': 'Advisor I · Juni 2020 – März 2022 · Pune',
    'Output Variables': 'Output-Variablen',
    '50+ daily native-German interactions · 87% CSAT · 90%+ RAP performance': '50+ tägliche Interaktionen mit deutschsprachigen Kunden · 87 % CSAT · 90 %+ RAP Performance',
    'Built enterprise-level German communication with native DACH speakers. Foundation for leading kick-offs and acting as Team Lead at T-Systems.': 'Aufbau professioneller deutscher Enterprise-Kommunikation mit DACH-Muttersprachlern. Grundlage für Kick-off-Leitung und Aufgaben der Teamleitung bei T-Systems.',
    'Initialize Power Platform Stack': 'Power Platform Stack initialisieren',
    'Junior Consultant · May 2022 – Dec 2024 · Pune': 'Junior Consultant · Mai 2022 – Dez. 2024 · Pune',
    'Hrs/Month': 'Std./Monat',
    'Delivered': 'Geliefert',
    'Power Automate Flows': 'Flows in Power Automate',
    'Power BI Dashboards': 'Dashboards in Power BI',
    'Next Step': 'Nächster Schritt',
    'Wanted to go deeper into AI orchestration, MCP extensibility, and Copilot Studio': 'Wollte tiefer in KI-Orchestrierung, MCP-Erweiterbarkeit und Copilot Studio einsteigen',
    'Ready to own larger enterprise architectures end to end': 'Bereit, größere Enterprise-Architekturen Ende zu Ende zu verantworten',
    'Next: Adastra: AI-first Power Platform architecture': 'Weiter: Adastra: KI-first Architektur auf der Power Platform',
    'Output Metrics': 'Output-Metriken',
    'Automated workflows saving': 'Automatisierte Workflows mit',
    'of team bandwidth monthly': 'monatlicher Entlastung für das Team',
    'Led kick-off meetings with German clients. Built Canvas/Model-Driven Apps, complex Power Automate flows, Power BI reporting suites, and ServiceNow integrations.': 'Technische Kick-offs mit deutschen Kunden geleitet. Canvas- und Model-Driven Apps, komplexe Flows in Power Automate, Reporting in Power BI und ServiceNow-Integrationen umgesetzt.',
    'Deploy AI & Advanced Architecture': 'KI und fortgeschrittene Architektur bereitstellen',
    'ACTIVE': 'AKTIV',
    'Data Engineer (Power Platform) · Jan 2025 – Present · Pune': 'Data Engineer (Power Platform) · Jan. 2025 – heute · Pune',
    'Active Outputs': 'Aktive Outputs',
    'ESG Copilot Studio agent in Teams + Copilot Chat: schema-driven, MCP server, in production': 'ESG Agent in Copilot Studio in Teams + Copilot Chat: schemagesteuert, MCP-Server, in Produktion',
    'ESG Data Collector: JSON-schema form engine, 80+ entities, 1,000+ attributes, zero redeploy': 'ESG Data Collector: Formular auf Basis von JSON Schema-Engine, 80+ Entitäten, 1.000+ Attribute, ohne Redeploy',
    'Allocation Management App: multi-stage approval, 60 → 8 to 10 hrs/month (83% reduction)': 'Allocation Management App: mehrstufige Genehmigung, 60 → 8 bis 10 Std./Monat (83 % weniger)',
    'Azure DevOps CI/CD pipelines: Dev/Test/Prod governance for enterprise apps': 'Azure-DevOps-CI/CD-Pipelines: Dev/Test/Prod-Governance für Enterprise-Apps',
    'Architecting advanced AI integrations, Dataverse-backed MDA apps, and enterprise Copilot agents with Dev/Test/Prod governance via Azure DevOps pipelines.': 'Architektur für fortgeschrittene KI-Integrationen, auf Dataverse gestützte MDA-Apps und Agenten in Copilot Studio für Unternehmen mit Dev/Test/Prod-Governance über Azure-DevOps-Pipelines.',
    // Flow: Switch (Power Automate uses "Fall" for Case in German)
    'Switch: Developer Roles at Adastra': 'Switch: Entwicklerrollen bei Adastra',
    '3 ROLES': '3 ROLLEN',
    'CASE 1': 'FALL 1',
    'CASE 2': 'FALL 2',
    'CASE 3': 'FALL 3',
    'Architected enterprise Canvas and Model-Driven applications with complex business logic, custom components, and Dataverse integrations.': 'Architektur von Enterprise-Canvas- und Model-Driven Apps mit komplexer Geschäftslogik, Custom Components und Integrationen mit Dataverse.',
    'Dataverse Governance': 'Dataverse-Governance',
    'Designed optimised data models, complex DAX measures, and interactive dashboards enabling real-time decision-making analytics.': 'Optimierte Datenmodelle, komplexe DAX-Measures und interaktive Dashboards für datengestützte Entscheidungen in Echtzeit.',
    'Data Modelling': 'Datenmodellierung',
    'Drilldown Reports': 'Drilldown-Reports',
    'Engineered intelligent AI agents with MCP Server integration, autonomous CRUD operations, and knowledge-driven automation workflows.': 'Intelligente KI-Agenten mit Integration eines MCP Servers, autonomen CRUD-Operationen und wissensbasierten Automatisierungs-Workflows.',
    'Knowledge Base': 'Wissensdatenbank',
    // Flow: end node, skills
    'Current Status: Ready for Next Challenge': 'Aktueller Status: bereit für die nächste Herausforderung',
    'Ready to bring Power Platform expertise and C1 German fluency to your team. Pune-based, remote-friendly.': 'Bereit, Erfahrung mit der Power Platform und Deutsch auf C1-Niveau in Ihr Team einzubringen. Standort Pune, remote-freundlich.',
    'Chat with Copilot': 'Mit Copilot chatten',
    'Skills Arsenal': 'Skill-Arsenal',
    'MCP Server Integration': 'Integration eines MCP Servers',
    'German C1 (Professional)': 'Deutsch C1 (berufssicher)',
    // Copilot
    'An assistant built from Sagar\'s profile. Ask anything a recruiter might want to know.': 'Ein Assistent auf Basis von Sagars Profil. Fragen Sie alles, was für Recruiting und Hiring relevant ist.',
    'Recruiter Prompts': 'Recruiter-Fragen',
    'What are your top skills?': 'Was sind deine wichtigsten Skills?',
    'Tell me about German expertise': 'Erzähl mir von deiner Deutsch-Kompetenz',
    'Tell me about your German expertise': 'Erzähl mir von deiner Deutsch-Kompetenz',
    'Describe a complex Power App': 'Beschreibe eine komplexe Power App',
    'Describe a complex Power App you built': 'Beschreibe eine komplexe Power App, die du gebaut hast',
    'Show contact information': 'Kontaktdaten anzeigen',
    'What certifications?': 'Welche Zertifizierungen?',
    'What certifications do you have?': 'Welche Zertifizierungen hast du?',
    'Work experience': 'Berufserfahrung',
    'Tell me about your work experience': 'Erzähl mir von deiner Berufserfahrung',
    'Why should I hire Sagar?': 'Warum sollte ich Sagar einstellen?',
    'Sagar\'s Copilot Agent': 'Sagars Copilot-Agent',
    'Online & Ready': 'Online & bereit',
    'Clear chat': 'Chat leeren',
    'Sagar\'s Copilot': 'Sagars Copilot',
    'Hello! I\'m an assistant built from Sagar\'s professional experience, portfolio, and skills.': 'Hallo! Ich bin ein Assistent auf Basis von Sagars Berufserfahrung, Portfolio und Skills.',
    'I can help you understand his expertise in Power Platform, AI integrations, C1 German fluency, or provide direct contact details. Use the prompts on the left or just ask freely.': 'Ich helfe dabei, seine Erfahrung mit der Power Platform, KI-Integrationen, Deutschkenntnisse auf C1-Niveau und Kontaktdaten schnell einzuordnen. Nutzen Sie die Fragen links oder fragen Sie frei.',
    'Portfolio Highlights': 'Portfolio-Highlights',
    'Contact Info': 'Kontaktdaten',
    'Why hire Sagar?': 'Warum Sagar?',
    'Ask Sagar\'s Copilot…': 'Sagars Copilot fragen …',
    'Send': 'Senden',
    'Enter to send · Shift+Enter for new line': 'Enter sendet · Shift+Enter für neue Zeile',
    // Footer, modal, consent, toasts
    '· Power Platform + AI Engineer · Pune, India': '· Power Platform + KI Engineer · Pune, Indien',
    'Built with Power Platform aesthetics': 'Gebaut im Look-and-feel der Power Platform',
    'Cookie settings': 'Cookie-Einstellungen',
    'Close': 'Schließen',
    'Cookie consent': 'Cookie-Einwilligung',
    'This site uses Google Analytics cookies to count visits. They are only set if you accept.': 'Diese Seite nutzt Cookies von Google Analytics, um Besuche zu zählen. Sie werden nur gesetzt, wenn Sie zustimmen.',
    'Decline': 'Ablehnen',
    'Accept': 'Akzeptieren',
    'Copied!': 'Kopiert!',
    // Runtime strings (js/main.js)
    'Key Achievements': 'Wichtigste Ergebnisse',
    'Tech Stack': 'Tech-Stack',
    'You': 'Sie',
    'Email copied!': 'E-Mail kopiert!',
    'Downloading resume…': 'Lebenslauf wird heruntergeladen …'
  };

  const PROJECTS_DE = [
    {t:'ESG Data Collector: dynamische Formular-Engine',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dynamic_form',tags:['Power Apps','Dataverse','JSON Schema','Azure AI'],desc:'Der Kunde zahlte hohe laufende Kosten für eine ESG-Anwendung eines Drittanbieters und wünschte einen 1:1-Nachbau in drei Monaten: 80+ Entitäten, 1.000+ Attribute. Statt 80+ Formulare einzeln nachzubauen, habe ich eine Formularlösung auf Basis von JSON Schema vorgeschlagen: eine Canvas App mit dynamischem Grid und Konfigurationsoberfläche, Änderungen ohne Entwickler. Der Prototyp hat die Kundenanforderung neu ausgerichtet.',tech:['Canvas Apps','Power Fx','Dataverse','JSON Schema','Azure AI','Power Automate'],pts:['Formularlösung auf Basis von JSON Schema: eine Canvas App mit Grid für 80+ Entitäten und 1.000+ Attribute','Neue Entitäten und Feldänderungen rein per Konfiguration, ohne Entwickler','Dynamisches Grid und Konfigurationsoberfläche','Datenerfassung mit KI: Dokument hochladen, ein Modell in Azure AI befüllt die Felder','Ausgabe als JSON für nachgelagerte Systeme','Im ursprünglichen Zeitplan, zu einem Bruchteil der bisherigen Kosten']},
    {t:'ESG Agent in Copilot Studio',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'smart_toy',tags:['KI','Copilot Studio','MCP Server','Dataverse'],desc:'Aufbauend auf dem ESG Data Collector: ESG-Daten im Dialog erfassen, ohne die Canvas App zu öffnen. Ein Agent in Copilot Studio für Microsoft Teams und Microsoft 365 Copilot Chat, gesteuert über das JSON Schema je Entität. Produktiv im Einsatz.',tech:['Copilot Studio','MCP Server','Power Automate','Dataverse','SharePoint','Adaptive Cards','JSON Schema'],pts:['Im Einsatz in Microsoft Teams und Microsoft 365 Copilot Chat','Gesprächsführung über das JSON Schema je Entität: Topics, Custom Prompts, Instructions, Wechsel zwischen Topics, Eskalationsflows','Adaptive Cards, Wissensquellen und Knowledge Articles, Datei-Uploads','Power Automate für Updates in Dataverse, Dateien in SharePoint und JSON Parsing','MCP Server ruft Formulare dynamisch ab und liest, legt an, ändert und löscht Daten','Produktiv im Einsatz']},
    {t:'33 Prozesse automatisiert: über 190 Stunden pro Monat',co:'T-Systems · 2022–2024',col:'var(--accent-automate)',ic:'bolt',tags:['Power Automate','SharePoint','Excel'],desc:'Gestartet im deutschsprachigen First-Level-Support, aus Eigeninitiative zum Entwickler des Teams für die Power Platform geworden. 33 Geschäftsprozesse mit Power Automate automatisiert, dazu Canvas und Model-Driven Apps auf Basis von SharePoint und Excel. Ergebnis: über 190 Teamstunden pro Monat freigesetzt.',tech:['Power Automate','Canvas Apps','Model-Driven Apps','SharePoint','Excel','Microsoft Teams'],pts:['33 Geschäftsprozesse automatisiert','Über 190 Teamstunden pro Monat freigesetzt','Canvas und Model-Driven Apps auf Basis von SharePoint und Excel','Prototypen als Demo für Stakeholder vor der Umsetzung, dann Test und Fehlerbehebung','Benutzerdokumentation und Leitfäden zur Fehlerbehebung','Reviews von Power Automate Flows im Team']},
    {t:'ServiceNow Reporting: Ticket-Hierarchie',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'account_tree',tags:['Power BI','DAX','ServiceNow'],desc:'Wöchentliches End-to-End Reporting auf einem Datenmodell mit 7 bis 8 Tabellen und fünfstufiger Hierarchie: Registered Projects, Services, Sub Services, Tickets, Ticketkategorie; Segmentierung nach PU, BA und BU sowie Level und Bundle.',tech:['Power BI','DAX Measures','Power Query (M)','Datenmodellierung','ServiceNow'],pts:['Datenmodell mit 7 bis 8 Tabellen','Fünfstufige Hierarchie: Projekte, Services, Sub Services, Tickets, Kategorien','Segmentierung nach PU, BA und BU sowie Level und Bundle','Komplexe DAX Measures, Slicer und Drilldowns','Wöchentliches Reporting von Anfang bis Ende']},
    {t:'Lizenzbericht DevOps-Tools',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'key',tags:['Power BI','Lizenzen','DevOps'],desc:'Aktive Nutzer, maximale Lizenzen und freie Kapazität über 7 bis 8 DevOps-Tools, mit Kennzeichnung seit 6+ Monaten ungenutzter Lizenzen. Kosten und Compliance an einer Stelle.',tech:['Power BI','DAX Measures','Power Query (M)','Datenmodellierung'],pts:['7 bis 8 DevOps-Tools: aktive Nutzer, maximale Lizenzen, freie Kapazität','Kennzeichnung seit 6+ Monaten ungenutzter Lizenzen','Kosten und Compliance in einem Bericht']},
    {t:'ServiceNow Reaction Report',co:'T-Systems · 2022–2024',col:'var(--accent-bi)',ic:'timer',tags:['Power BI','ServiceNow','SLA'],desc:'Misst die Ticketlaufzeit je Statuswechsel (Open, In Progress, Pending, Closed) und macht Abweichungen vom SLA sichtbar.',tech:['Power BI','DAX Measures','Power Query (M)','ServiceNow'],pts:['Ticketlaufzeit je Status: Open, In Progress, Pending, Closed','Abweichungen vom SLA sichtbar','Sachliche Grundlage für Gespräche zur Teamleistung']},
    {t:'BI-Suite bei Adastra: Allocation, Bench und Xero',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'monitoring',tags:['Power BI','Dataverse','Xero'],desc:'Drei Lösungen in Power BI. Der Allocation Report mit komplexer Geschäftslogik, Transformation aus mehreren Quellen und performanceoptimiertem Datenmodell ist die Grundlage des Managements für die Ressourcenplanung. Bench Reporting mit dynamischen Parametern, Bookmarks, DAX Measures und Drilldowns, live in die Unternehmensanwendung eingebettet. Dazu ein Integrationsbericht, der Daten aus Xero (Web API bzw. SQL Connector) mit Entitäten aus Dataverse zusammenführt.',tech:['Power BI','DAX Measures','Power Query (M)','Dataverse','Bookmarks','Xero'],pts:['Allocation Report: komplexe Geschäftslogik, mehrere Quellen, performanceoptimiertes Modell','Grundlage des Managements für Entscheidungen zur Ressourcenplanung','Datenquelle des Allocation Reports von Excel auf Dataverse umgestellt','Bench Reporting: dynamische Parameter, Bookmarks, DAX, Drilldowns, eingebettet in die App','Integration von Xero über Web API bzw. SQL Connector, zusammengeführt mit Dataverse']},
    {t:'KI-Assistenz: Upload zum Ausfüllen',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'auto_awesome',tags:['Power Apps','Azure AI','Dataverse'],desc:'Die KI-gestützte Erfassung im ESG Data Collector. Auf einem Bildschirm der Canvas App lädt man ein Dokument hoch, Modelle in Azure AI befüllen die passenden ESG-Felder. Die Ausgabe wird als JSON für nachgelagerte Systeme gespeichert.',tech:['Canvas Apps','Azure AI','Power Automate','Dataverse','JSON'],pts:['Teil des ESG Data Collectors','Dokument hochladen, Azure AI befüllt die Felder','Ausgabe als strukturiertes JSON für nachgelagerte Systeme','Ein Bildschirm, keine manuelle Eingabe bei Standarddokumenten']},
    {t:'Allocation Management App',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'assignment_turned_in',tags:['Power Apps','Dataverse','Power Automate','Power BI'],desc:'Zwei Kolleginnen und Kollegen stimmten Mitarbeiterzuordnungen monatlich rund 60 Stunden manuell in Excel ab, ohne Schutz vor Dubletten, Überbuchungen oder Überschneidungen. Ich habe den Prozess durch eine Model-Driven App auf Dataverse abgelöst. Der Aufwand sank von 60 auf 8 bis 10 Stunden pro Monat, also um 83 %.',tech:['Model-Driven Apps','Custom Pages','Dataverse','Power Automate','Adaptive Cards','Office Scripts','Dataflows','Sicherheitsrollen','Power BI'],pts:['Model-Driven App mit Custom Pages auf Dataverse','Genehmigungen über Adaptive Cards in Teams und Outlook','HTML Controls für Fortschrittsbalken, Änderungshistorie und Warnungen bei Überbuchungen und Überschneidungen','Massenimporte über SharePoint und Office Scripts (Excel nach JSON); Stammdaten über Dataflows','Sicherheitsrollen und Access Teams je Project Lead und Practice Lead','Aufwand um 83 % reduziert: von 60 auf 8 bis 10 Stunden pro Monat']},
    {t:'Document Intelligence Pipeline',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'document_scanner',tags:['Power Automate','Azure AI','Azure OpenAI','Dataverse'],desc:'Extraktion, Klassifizierung und Metadaten für mehrere tausend Dokumente: 750+ Dokumenttypen in 60+ Dokumentfamilien für sechs Teams. Vor Entwicklungsstart: Anforderungsworkshop mit dem Business Analyst, Anforderungsspezifikation, Datenmodell in DBDiagram.io und Architekturdiagramm.',tech:['Power Automate','Azure REST API','Azure AI Services','Azure OpenAI','Dataverse','Model-Driven Apps','Power Pages','DBDiagram.io'],pts:['Mehrere tausend Dokumente, 750+ Dokumenttypen, 60+ Familien, sechs Teams','Anforderungen, Datenmodell und Architektur vor der Entwicklung','Parent Flow mit vier Child Flows','Azure REST API für die Extraktion, Azure AI Services und Azure OpenAI für Klassifizierung und Metadaten, Speicherung in Dataverse','Neue Dokumenttypen ohne Umbau der Flows konfigurierbar','Frontend: Model-Driven App mit Custom Pages (intern) und Power Pages (extern)']},
    {t:'Chatbots für den Support',co:'T-Systems · 2022–2024',col:'var(--accent-copilot)',ic:'support_agent',tags:['Chatbot','First-Level-Support'],desc:'Chatbots für Standardanfragen im First-Level-Support, gebaut mit dem Vorgänger von Copilot Studio: Topics, Trigger Phrases und Gesprächsknoten.',tech:['Topics','Trigger Phrases','Gesprächsknoten'],pts:['Standardanfragen im First-Level-Support abgefangen','Topics und Trigger Phrases konfiguriert','Gesprächsknoten und Dialogpfade gestaltet','Grundlage für die spätere Arbeit mit Copilot Studio']},
    {t:'Sentimentanalyse in Dynamics 365',co:'Adastra · 2025',col:'var(--accent-copilot)',ic:'sentiment_satisfied',tags:['KI','Azure AI Foundry','Dynamics 365'],desc:'Eine Custom Page in einer Model-Driven App, per JavaScript geöffnet, schickt hochgeladene Dateien an ein Modell in Azure AI Foundry. Das Modell liefert Sentiment und Metadaten als JSON, gespeichert in den Tabellen für Engagement, Kontakt und Account in Dynamics 365.',tech:['Azure AI Foundry','Custom Pages','JavaScript','Dataverse','Dynamics 365'],pts:['Custom Page aus einer Model-Driven App per JavaScript geöffnet','Modell in Azure AI Foundry liefert Sentiment und Metadaten als JSON','Ergebnisse an Engagement, Kontakt und Account in Dynamics 365','Benutzer in Kontakte synchronisiert, Anhänge in einer Dokumentbibliothek']},
    {t:'Dynamics 365 Customizing',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'dashboard_customize',tags:['Dynamics 365','PCF','JavaScript'],desc:'Customizing auf Dataverse und Dynamics 365: Anpassungen der Command Bar mit Ribbon Workbench, Formularlogik in JavaScript, Business Rules, PCF Controls in TypeScript und Custom Pages, dazu Sicherheit auf Ebene von Datensätzen und Spalten.',tech:['Ribbon Workbench','JavaScript','TypeScript (PCF)','Business Rules','Custom Pages','Sicherheitsrollen'],pts:['Command Bar mit Ribbon Workbench angepasst','Formularlogik in JavaScript und Business Rules','PCF Controls in TypeScript','Custom Pages in Model-Driven Apps','Sicherheit auf Ebene von Datensätzen und Spalten']},
    {t:'Lakehouse in Microsoft Fabric',co:'Adastra · 2025',col:'var(--accent-bi)',ic:'stacks',tags:['Microsoft Fabric','Power BI','Medallion'],desc:'Ein Lakehouse auf Kapazität F2 in Medallion-Architektur. Xero, Dataverse und SharePoint landen in Bronze, Notebooks bereiten sie zu Silver und Gold auf, eine geplante Data Pipeline hält alles aktuell, darauf ein Semantic Model für die Berichte in Power BI.',tech:['Microsoft Fabric','Lakehouse','Notebooks','Data Pipelines','Semantic Model','Power BI'],pts:['Lakehouse auf Kapazität F2, Medallion-Architektur','Bronze: Xero, Dataverse, SharePoint','Silver und Gold mit Notebooks','Geplante Data Pipeline für die Aktualisierung','Semantic Model für Berichte in Power BI']},
    {t:'Power Pages Portal für externe Nutzer',co:'Adastra · 2025',col:'var(--accent-automate)',ic:'language',tags:['Power Pages','Dataverse','Sicherheit'],desc:'Das externe Frontend von Document Intelligence. Dienstleister und Lieferanten melden sich an einer Power Pages Site auf Dataverse an und sehen, erstellen oder ändern nur die für sie freigegebenen Daten, abgesichert über Web Roles und Table Permissions.',tech:['Power Pages','Dataverse','Web Roles','Table Permissions'],pts:['Power Pages Portal mit Anbindung an Dataverse','Externe Nutzer: Dienstleister und Lieferanten','Zugriff nur auf freigegebene Daten','Umgesetzt über Web Roles und Table Permissions']},
    {t:'Code App mit React',co:'Adastra · 2025',col:'var(--accent-apps)',ic:'code',tags:['Power Apps','Code Apps','React'],desc:'Eine Code App in Power Apps, vollständig mit React entwickelt, KI-gestützt. Den Code habe ich selbst gegen die Anforderungen geprüft und angepasst.',tech:['Power Apps Code Apps','React','TypeScript','KI-gestützte Entwicklung'],pts:['Code App in Power Apps, geschrieben in React','KI-gestützt auf Basis standardisierter Bibliotheken für Prompts und Skills','Code eigenständig geprüft und an die Anforderungen angepasst']}
  ];

  const RESP_DE = {
    skills:()=>`Sagars stärkste Skills liegen in der Microsoft Power Platform:\n\n**Power Apps**: Canvas, Model-Driven, Custom Pages und Code Apps, PCF Controls in TypeScript und eine Formularlösung auf Basis von JSON Schema für 80+ Entitäten.\n\n**Power Automate**: 33 automatisierte Geschäftsprozesse bei T-Systems (über 190 Teamstunden pro Monat), Genehmigungsworkflows und eine Dokumentenpipeline mit Parent Flow und vier Child Flows.\n\n**KI**: ein produktiver Agent in Copilot Studio mit MCP Server, dazu Azure AI Services, Azure OpenAI und Azure AI Foundry.\n\n**Dataverse und Governance**: Datenmodellierung, Sicherheitsrollen, Access Teams, Sicherheit auf Spaltenebene, ALM mit Azure DevOps, Managed Solutions und DLP-Richtlinien.\n\n**Power BI und Fabric**: DAX, Power Query, eingebettete Berichte und ein Lakehouse in Microsoft Fabric.\n\n**Deutsch C1**: täglich im Einsatz mit DACH-Kunden.`,
    german:()=>`Sagar spricht Deutsch auf C1-Niveau (Goethe-Zertifikat C1) und nutzt es im Beruf:\n\n- **Concentrix:** 50+ Kundengespräche täglich auf Deutsch, CSAT ca. 87 %\n- **T-Systems:** deutschsprachiger First-Level-Support, Auftakttermine mit Kunden, Vertretung der Teamleitung\n- **Lutz und Grub Academy:** unterrichtet Microsoft 365, Power Platform und KI auf Deutsch\n\nEnglisch ebenfalls C1. Er arbeitet direkt mit deutschsprachigen Stakeholdern, ohne Übersetzer dazwischen.`,
    app:()=>`Das stärkste Beispiel ist der **ESG Data Collector** bei Adastra:\n\nDer Kunde wollte einen 1:1-Nachbau eines teuren ESG-Tools in drei Monaten. Sagar schlug stattdessen eine Formularlösung auf Basis von JSON Schema als Canvas App vor:\n- **80+ Entitäten** und **1.000+ Attribute**\n- Neue Entitäten und Feldänderungen rein per Konfiguration\n- KI-gestützte Erfassung: Dokument hochladen, Azure AI befüllt die Felder\n- Im Zeitplan, zu einem Bruchteil der bisherigen Kosten\n\nDazu die **Allocation Management App**: eine Model-Driven App auf Dataverse, die den monatlichen Abstimmungsaufwand von 60 auf 8 bis 10 Stunden senkte (83 % weniger).`,
    contact:()=>`Hier sind Sagars Kontaktdaten:\n\n**E-Mail:** deshpande.sagar.milind@gmail.com\n**LinkedIn:** linkedin.com/in/sagar-deshpande2306\n**Telefon:** +91 90286 82226\n\nAb sofort verfügbar, keine Kündigungsfrist, Umzug nach Deutschland jederzeit möglich.`,
    cert:()=>`Sagar hat zwei Microsoft-Zertifizierungen:\n\n**PL-400**: Microsoft Certified: Power Platform Developer Associate (Mai 2025)\nDie Entwicklerzertifizierung: Custom Connectors, PCF Controls und komplexe App-Entwicklung.\n\n**PL-900**: Microsoft Certified: Power Platform Fundamentals (Oktober 2024)\n\nSprachen: Deutsch C1 (Goethe-Zertifikat C1) und Englisch C1.`,
    exp:()=>`Sagar hat über 6 Jahre Erfahrung (seit 06/2020):\n\n**Lutz und Grub Academy** (07/2026 – heute, remote)\nFreiberuflicher Dozent für Microsoft 365, Power Platform & KI. Unterricht auf Deutsch mit eigenen Kursunterlagen und Übungen.\n\n**Adastra** (01/2025 – 06/2026)\nData Engineer (Power Platform & BI Developer). Allocation Management App (83 % weniger Aufwand), Document Intelligence (750+ Dokumenttypen), ESG Data Collector, Agent in Copilot Studio mit MCP Server, Microsoft Fabric, ALM und Governance.\n\n**T-Systems ICT India** (05/2022 – 12/2024)\nJunior Consultant. Deutschsprachiger First-Level-Support, dann Entwickler des Teams für die Power Platform: 33 Prozesse automatisiert, über 190 Teamstunden pro Monat.\n\n**Concentrix** (06/2020 – 03/2022)\nAdvisor. 50+ Kundengespräche täglich auf Deutsch, RAP über 90 %, CSAT ca. 87 %.`,
    hire:()=>`Drei Dinge machen Sagar besonders:\n\n**1. Erst das Geschäftsproblem**\nEr hat Volkswirtschaft studiert, nicht Informatik. Er versteht das Problem, bevor er die Technologie wählt. Deshalb bekam der ESG-Kunde eine Formular-Engine statt 80 nachgebauter Formulare.\n\n**2. Deutsch C1 im echten Arbeitsalltag**\nSupport, Auftakttermine mit Kunden und heute Unterricht, alles auf Deutsch.\n\n**3. Die ganze Power Platform, produktiv**\nModel-Driven und Canvas Apps, Power Automate, ein Agent in Copilot Studio mit MCP Server, Power Pages, Power BI und Fabric, mit ALM und DLP-Governance drumherum.\n\n„Was ihn wirklich auszeichnet, ist seine Einstellung: proaktiv, innovativ und mit einer großartigen Arbeitsmoral. Er erkennt Chancen, bevor man ihn darum bittet, und liefert stets Qualität.“ (Max Rink, Cloud Architect, Adastra)`,
    portfolio:()=>`Das Canvas umfasst 16 Projekte:\n\n1. **ESG Data Collector**: Formular-Engine auf Basis von JSON Schema, 80+ Entitäten\n2. **ESG Agent in Copilot Studio**: Teams und Microsoft 365 Copilot Chat, MCP Server\n3. **33 Prozesse automatisiert**: über 190 Teamstunden pro Monat (T-Systems)\n4. **ServiceNow Reporting**: fünfstufige Hierarchie (T-Systems)\n5. **Lizenzbericht DevOps-Tools** (T-Systems)\n6. **ServiceNow Reaction Report** (T-Systems)\n7. **BI-Suite bei Adastra**: Allocation, Bench und Xero\n8. **KI-Assistenz: Upload zum Ausfüllen**\n9. **Allocation Management App**: von 60 auf 8 bis 10 Stunden pro Monat\n10. **Document Intelligence**: 750+ Dokumenttypen\n11. **Chatbots für den Support** (T-Systems)\n12. **Sentimentanalyse**: Azure AI Foundry, Dynamics 365\n13. **Dynamics 365 Customizing**\n14. **Lakehouse in Microsoft Fabric**\n15. **Power Pages Portal** für externe Nutzer\n16. **Code App mit React**\n\nDetails zu jedem Projekt im Canvas.`,
    avail:()=>`Sagar ist **ab sofort verfügbar**, ohne Kündigungsfrist.\n\n**Umzug nach Deutschland jederzeit möglich**, international reisebereit.`,
    teach:()=>`Seit 07/2026 ist Sagar **freiberuflicher Dozent bei der Lutz und Grub Academy** (remote). Er unterrichtet auf Deutsch Teilnehmende in Weiterbildungsmaßnahmen, mit eigenen Kursunterlagen und Übungen.\n\nThemen: Microsoft 365 (Teams, SharePoint Online, OneDrive, Excel …), Power Apps, Power Automate, Dataverse, Power BI mit Power Query und DAX, Microsoft Copilot, Copilot Studio, Agenten und Prompting, Requirements Engineering, Solution Design sowie Scrum und Kanban.`,
    gov:()=>`Governance gehört bei Sagar zu jeder Lösung:\n\n- **ALM:** Azure DevOps Pipelines (Dev, Test, Prod), Managed Solutions, Environment Variables, Git\n- **Sicherheit:** Microsoft Entra ID, Sicherheitsrollen, Access Teams, Sicherheit auf Ebene von Datensätzen und Spalten, Web Roles und Table Permissions in Power Pages\n- **DLP:** Richtlinien der Power Platform, produktiv bei Adastra\n- **Reviews:** technische Reviews der Solutions im Team auf Abhängigkeiten, Environment Variables und Bereitschaft für das Deployment. Bei Document Intelligence wurde daraus eine Aufteilung in zwei Solutions: Tabellen sowie Apps mit Flows, Environment Variables und Sitemaps.`
  };

  function normalized(value){ return String(value || '').replace(/\s+/g, ' ').trim(); }
  function readLang(){ try { return localStorage.getItem(LS_KEY); } catch(e) { return null; } }
  function defaultLang(){
    const stored = readLang();
    if(stored === 'en' || stored === 'de') return stored;
    const langs = navigator.languages || [navigator.language || ''];
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const germanLang = langs.some(l => /^de(-|$)/i.test(l));
    const germanySignal = /Europe\/Berlin/i.test(tz) || langs.some(l => /-DE$/i.test(l));
    return (germanLang || germanySignal) ? 'de' : 'en';
  }
  let lang = defaultLang();

  function rememberOriginalAttr(el){
    if(!originalAttrs.has(el)){
      originalAttrs.set(el, {
        placeholder: el.getAttribute('placeholder'),
        title: el.getAttribute('title'),
        ariaLabel: el.getAttribute('aria-label')
      });
    }
  }
  function applyText(next){
    document.documentElement.lang = next === 'de' ? 'de' : 'en';
    document.title = next === 'de'
      ? 'Sagar Deshpande · Power Platform + KI Engineer'
      : 'Sagar Deshpande · Power Platform + AI Engineer';

    document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => {
      rememberOriginalAttr(el);
      const base = originalAttrs.get(el);
      ['placeholder','title','ariaLabel'].forEach(key => {
        const attr = key === 'ariaLabel' ? 'aria-label' : key;
        const original = base[key];
        if(original == null) return;
        const translated = DE_TEXT[normalized(original)];
        el.setAttribute(attr, next === 'de' && translated ? translated : original);
      });
    });
    document.querySelectorAll('[data-de]').forEach(el => {
      if(el.dataset.en == null) el.dataset.en = el.innerHTML;
      el.innerHTML = next === 'de' ? el.dataset.de : el.dataset.en;
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!normalized(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if(node.parentElement?.closest('script,style,.msym,.ni,[data-de],[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if(!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const translated = DE_TEXT[normalized(original)];
      if(next === 'de' && translated){
        const lead = original.match(/^\s*/)?.[0] || '';
        const trail = original.match(/\s*$/)?.[0] || '';
        node.nodeValue = lead + translated + trail;
      } else {
        node.nodeValue = original;
      }
    });
    updateToggle(next);
    document.dispatchEvent(new CustomEvent('portfolio:lang', { detail: next }));
  }
  function updateToggle(next){
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === next;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  window.setLang = function(next){
    lang = next === 'de' ? 'de' : 'en';
    try { localStorage.setItem(LS_KEY, lang); } catch(e) {}
    applyText(lang);
  };

  // Used by js/main.js for runtime strings (toasts, modal headings, chat labels)
  window.translate = function(s){
    return (lang === 'de' && DE_TEXT[normalized(s)]) || s;
  };

  // Used by js/main.js openModal(); same index order as PM
  window.localizedProject = function(i){
    return lang === 'de' ? PROJECTS_DE[i] || null : null;
  };

  const originalGetResp = window.getResp;
  window.getResp = function(msg){
    if(lang !== 'de') return originalGetResp(msg);
    const m = msg.toLowerCase();
    if(m.includes('verfügbar') || m.includes('availab') || m.includes('umzug') || m.includes('relocat') || m.includes('kündigung')) return RESP_DE.avail();
    if(m.includes('dozent') || m.includes('unterricht') || m.includes('teach') || m.includes('lutz') || m.includes('schulung')) return RESP_DE.teach();
    if(m.includes('govern') || m.includes('dlp') || m.includes('alm') || m.includes('sicherheit') || m.includes('security')) return RESP_DE.gov();
    if(m.includes('skill') || m.includes('kompetenz') || m.includes('top') || m.includes('stark')) return RESP_DE.skills();
    if(m.includes('german') || m.includes('deutsch') || m.includes('dach')) return RESP_DE.german();
    if(m.includes('power app') || m.includes('complex') || m.includes('komplex') || m.includes('gebaut') || m.includes('canvas')) return RESP_DE.app();
    if(m.includes('contact') || m.includes('kontakt') || m.includes('email') || m.includes('e-mail') || m.includes('phone') || m.includes('telefon') || m.includes('linkedin')) return RESP_DE.contact();
    if(m.includes('certif') || m.includes('zertif')) return RESP_DE.cert();
    if(m.includes('experience') || m.includes('erfahrung') || m.includes('work') || m.includes('job') || m.includes('karriere') || m.includes('company')) return RESP_DE.exp();
    if(m.includes('hire') || m.includes('einstellen') || m.includes('warum') || m.includes('why')) return RESP_DE.hire();
    if(m.includes('portfolio') || m.includes('highlight') || m.includes('project') || m.includes('projekt')) return RESP_DE.portfolio();
    return `Gute Frage. Sagar ist Power Platform + KI Engineer mit über 6 Jahren Erfahrung: Model-Driven und Canvas Apps auf Dataverse, Power Automate, Agenten in Copilot Studio mit MCP Server, Power BI und Fabric. Deutsch C1, ab sofort verfügbar, Umzug nach Deutschland jederzeit möglich.

Sie können zum Beispiel fragen nach:
• seinen stärksten Skills
• Deutsch
• einem konkreten Projekt
• Berufserfahrung
• Governance und ALM
• Verfügbarkeit
• Kontaktdaten`;
  };

  applyText(lang);
})();
