const axios = require('axios');

// Fonction pour récupérer une blague de l'API
async function fetchJoke() {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    return response.data;
}

// Fonction pour envoyer la blague au webhook Google Apps Script
async function sendJokeToGoogleSheets(joke) {
    //const webhookUrl = process.env.JOKE_WEBHOOK_URL; // Utilise le secret
    const webhookUrl = "https://script.google.com/macros/s/AKfycbwUTkQqMXKUC2KA9olocfUO2xjjzUZD_IpvK77pCT4MX8mi_ndqgFfThm37HsLMufIB/exec"; // Utilise le secret

    if (!webhookUrl) {
        throw new Error('JOKE_WEBHOOK_URL secret is not defined.');
    }

    await axios.post(webhookUrl, joke);
}

// Fonction principale
async function main() {
    try {
        const joke = await fetchJoke();
        await sendJokeToGoogleSheets(joke);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la blague :', error.message);
        process.exit(1); // Quitte le processus avec un code d'erreur
    }
}

// Exécuter le script
main().catch(console.error);
