// Sélection des éléments HTML
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatBox = document.querySelector("#chat-box");

// Fonction pour ajouter un message dans le chat
function addMessage(message, sender) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(sender === "user" ? "user-message" : "bot-message");
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll automatique
}

// Événement lors de l'envoi du formulaire
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";

  // Afficher le message de l'utilisateur
  addMessage(userMessage, "user");

  try {
    // Envoyer la requête POST au bot Render
    const response = await fetch("https://en-pole-bot.onrender.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage })
    });

    if (!response.ok) {
      addMessage("Erreur : le bot n'a pas répondu correctement.", "bot");
      return;
    }

    const data = await response.json();

    // Afficher la réponse du bot
    addMessage(data.response, "bot");

  } catch (error) {
    console.error("Erreur :", error);
    addMessage("Erreur : impossible de contacter le bot.", "bot");
  }
});
