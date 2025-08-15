document.getElementById("year").textContent = new Date().getFullYear();

async function loadPosts() {
  try {
    const response = await fetch("news.json");
    const posts = await response.json();
    const container = document.getElementById("posts");
    container.innerHTML = "";
    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `<h2>${
