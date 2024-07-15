const axios = require('axios');

// Fonction pour récupérer une blague de l'API
async function fetchJoke() {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    return response.data;
}

// Fonction pour envoyer la blague au webhook Google Apps Script
async function sendJokeToGoogleSheets(joke) {
    const webhookUrl = process.env.JOKE_WEBHOOK_URL; // Utilise le secret

    await axios.post(webhookUrl, joke);
}

// Fonction principale
async function main() {
    const joke = await fetchJoke();
    await sendJokeToGoogleSheets(joke);
}

// Exécuter le script
main().catch(console.error);
