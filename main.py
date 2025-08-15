import requests
from bs4 import BeautifulSoup
import time
import os
import json
import openai

# ⚙️ Configuration OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

# Sites F1 à surveiller
NEWS_SOURCES = [
    "https://www.formula1.com/en/latest.html",
    "https://www.motorsport.com/f1/news/",
    "https://www.autosport.com/f1/news/"
]

news_vues = set()

# Récupérer les titres
def get_news():
    articles = []
    for url in NEWS_SOURCES:
        r = requests.get(url)
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.find_all("a", href=True)[:5]:
            titre = a.get_text(strip=True)
            lien = a.get("href")
            if titre and lien and lien not in news_vues:
                news_vues.add(lien)
                articles.append({"titre": titre, "lien": lien})
    return articles

# Réécriture avec OpenAI GPT
def rewrite_news(text):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Réécris cette info F1 pour mon média En Pôle Position en français clair et concis : {text}"}],
            max_tokens=100
        )
        return response.choices[0].message.content.strip()
    except:
        return text

# Sauvegarde dans JSON pour app.js
def save_news_json(news_list):
    for n in news_list:
        n["resume"] = rewrite_news(n["titre"])
    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(news_list, f, ensure_ascii=False, indent=2)

# Boucle principale
if __name__ == "__main__":
    while True:
        articles = get_news()
        if articles:
            save_news_json(articles)
        time.sleep(600)  # toutes les 10 minutes
