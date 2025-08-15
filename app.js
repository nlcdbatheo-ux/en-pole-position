fetch("https://en-pole-bot.onrender.com/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: userMessage })
})
.then(response => response.json())
.then(data => {
  // afficher la réponse du bot sur ton site
  console.log(data);
});
