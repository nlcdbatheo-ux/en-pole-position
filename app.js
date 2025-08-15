const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatBox = document.querySelector("#chat-box");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value;
  chatInput.value = "";

  // Afficher le message de l'utilisateur
  chatBox.innerHTML += `<div class="message user-message">${userMessage}</div>`;

  // Envoyer la requête au bot
  const response = await fetch("https://en-pole-bot.onrender.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userMessage })
  });

  const data = await response.json();

  // Afficher la réponse du bot
  chatBox.innerHTML += `<div class="message bot-message">${data.response}</div>`;
});
