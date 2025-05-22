// netlify/functions/openai.js
import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  // Solo richieste POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Recupera la chiave API dalle variabili d'ambiente di Netlify
    const OPENAI_API_KEY = process.env.VITE_OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Chiave API OpenAI non configurata.' }),
      };
    }

    // Parsa il body della richiesta dal frontend
    const { messages } = JSON.parse(event.body);

    // Fai la chiamata all'API di OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Puoi rendere il modello configurabile se necessario
        messages: messages,
        temperature: 0.7, // Puoi rendere la temperatura configurabile
        max_tokens: 2000, // Puoi rendere max_tokens configurabile
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Errore API OpenAI:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || 'Errore nella chiamata API OpenAI' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // Inoltra la risposta di OpenAI al frontend
    };

  } catch (error) {
    console.error('Errore nella funzione Netlify:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore interno del server.' }),
    };
  }
};