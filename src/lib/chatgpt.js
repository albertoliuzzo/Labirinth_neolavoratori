const API_KEY = process.env.VITE_OPENAI_API_KEY;

// Aggiungo un log per debug
console.log('API Key presente:', !!API_KEY);

const fallbackResults = {
  profile: {
    description: "Il test evidenzia una forte propensione per ruoli creativi e sociali, con un marcato interesse per l'impatto positivo sulla società. La persona mostra una naturale inclinazione verso il lavoro di squadra e la comunicazione, combinata con una spiccata capacità analitica. Valori come l'equilibrio vita-lavoro e la crescita professionale emergono come prioritari, insieme a un desiderio di contribuire al benessere collettivo attraverso il proprio lavoro.",
    interests: ["Creatività", "Impatto sociale", "Comunicazione", "Analisi", "Teamwork"],
    workStyle: "Preferisce un ambiente di lavoro collaborativo ma con spazi di autonomia, dove può esprimere la propria creatività e contribuire a progetti significativi. Mostra una buona capacità di gestione del tempo e di adattamento a diverse situazioni.",
    values: ["Equilibrio vita-lavoro", "Impatto sociale", "Crescita professionale", "Autonomia", "Collaborazione"],
    aspirations: "Aspira a un ruolo che combini creatività e impatto sociale, con possibilità di crescita e sviluppo professionale continuo."
  },
  suggestedRoles: [
    {
      title: "UX/UI Designer",
      match: 92,
      description: "Progetta esperienze utente intuitive e interfacce accattivanti per prodotti digitali, combinando creatività e analisi dei bisogni degli utenti.",
      salary: {
        junior: "25.000-32.000 €",
        mid: "35.000-45.000 €",
        senior: "50.000-65.000 €"
      },
      market: "In forte crescita, con alta domanda in startup tech, agenzie digitali e grandi aziende. Settori: e-commerce, fintech, healthcare.",
      education: "Laurea in Design o Informatica. Master in UX Design. Certificazioni: Google UX Design, Interaction Design Foundation.",
      dailyRoutine: {
        morning: "Analisi dei dati utente, brainstorming con il team, definizione dei wireframe",
        afternoon: "Prototipazione, test con utenti, iterazione del design"
      }
    },
    {
      title: "Product Manager",
      match: 88,
      description: "Guida lo sviluppo di prodotti digitali, bilanciando esigenze utente, obiettivi aziendali e fattibilità tecnica.",
      salary: {
        junior: "35.000-45.000 €",
        mid: "50.000-65.000 €",
        senior: "70.000-90.000 €"
      },
      market: "Ruolo strategico in crescita, richiesto in tech, fintech e startup innovative. Opportunità in aziende in trasformazione digitale.",
      education: "Laurea in Business, Informatica o Design. Master in Product Management. Certificazioni: Agile, Scrum.",
      dailyRoutine: {
        morning: "Analisi metriche, meeting con stakeholder, definizione roadmap",
        afternoon: "Collaborazione con team di sviluppo, prioritizzazione backlog, test prodotti"
      }
    }
  ],
  nextSteps: [
    "Leggi gli approfondimenti sulle professioni suggerite",
    "Compila il form per scegliere il tuo ruolo preferito",
    "Accedi al tirocinio virtuale per sperimentare il lavoro in prima persona"
  ]
};

export const analyzeTestResults = async (answers, questions) => {
  try {
    if (!API_KEY) {
      console.warn('API key non configurata, utilizzo risultati di fallback');
      return fallbackResults;
    }

    // Prepara i dati per l'analisi
    const analysisData = {
      answers,
      questions: questions.map(section => ({
        title: section.title,
        questions: section.questions
      }))
    };

    // Chiamata all'API di ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Analizza le risposte del test individuando:
Interessi dominanti (es. creativi, sociali, tecnici, analitici, manuali, manageriali…).
Attitudini e stili di lavoro (es. autonomia, multitasking, precisione, leadership…).
Valori professionali chiave (es. sicurezza, impatto sociale, retribuzione, work-life balance…).
Aspirazioni future (es. specializzazione, carriera internazionale, imprenditorialità…).

Elabora un profilo sintetico e motivazionale che descriva la persona (tono positivo, coinvolgente, 130-180 parole).

Seleziona i 5 ruoli professionali più compatibili con quanto emerso. Evita ruoli duplicati o troppo simili.

Per ogni ruolo fornisci, nell'ordine:

📌 Descrizione (spiega cosa fa il professionista).

💰 Retribuzione media in Italia (range junior / mid / senior, RAL €).

🎓 Percorso di studi/certificazioni consigliato.

📈 Trend di mercato (crescita/stabilità/declino + settori che assumono).

🗓 Giornata tipo (2-3 attività del mattino, 2-3 del pomeriggio).

Indica una Compatibilità % fra test e ruolo, motivata in ≤ 15 parole.

Chiudi invitando l'utente a indicare il ruolo preferito per accedere a un "tirocinio virtuale".

Scrivi tutto in italiano, tono amichevole e professionale.

Mantieni una formattazione leggibile: titoli in grassetto, elenchi puntati ordinati, non usare tabelle.

Formatta la risposta come JSON con questa struttura:
{
  "profile": {
    "description": "profilo sintetico e motivazionale",
    "interests": ["interesse1", "interesse2", ...],
    "workStyle": "descrizione stile di lavoro",
    "values": ["valore1", "valore2", ...],
    "aspirations": "descrizione aspirazioni"
  },
  "suggestedRoles": [
    {
      "title": "nome ruolo",
      "match": numero,
      "description": "descrizione ruolo",
      "salary": {
        "junior": "range stipendio junior",
        "mid": "range stipendio mid",
        "senior": "range stipendio senior"
      },
      "market": "situazione del mercato",
      "education": "percorso di studi",
      "dailyRoutine": {
        "morning": "attività mattutine",
        "afternoon": "attività pomeridiane"
      }
    },
    ...
  ]
}`
          },
          {
            role: "user",
            content: JSON.stringify(analysisData)
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Errore API:', data.error?.message);
      return fallbackResults;
    }

    try {
      // Estrai e parsa il JSON dalla risposta di ChatGPT
      const analysisResult = JSON.parse(data.choices[0].message.content);
      return analysisResult;
    } catch (parseError) {
      console.error('Errore nel parsing della risposta:', parseError);
      return fallbackResults;
    }

  } catch (error) {
    console.error('Errore nell\'analisi dei risultati:', error);
    return fallbackResults;
  }
}; 