import os
import json
import re
import asyncio
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from jinja2 import Environment, FileSystemLoader
import httpx

# Load .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from data import (
    PERSONAL_INFO, SKILLS, CATEGORY_ORDER, EXPLORING_TECHS, PROJECTS,
    EXPERIENCE, EDUCATION, CERTIFICATES, TIMELINES, SOCIAL_LINKS,
    NAV_ITEMS, HEADLINES, PARTICLE_CONFIG, GRID_CONFIG, get_categorized_skills,
)

app = FastAPI(title="Tejas N B Portfolio")

import datetime as _dt

static_path = os.path.join(os.path.dirname(__file__), "static")
templates_path = os.path.join(os.path.dirname(__file__), "templates")

app.mount("/static", StaticFiles(directory=static_path), name="static")
jinja_env = Environment(loader=FileSystemLoader(templates_path))

GITHUB_TOKEN = os.getenv("NEXT_PUBLIC_GITHUB_TOKEN") or os.getenv("GITHUB_TOKEN") or ""


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    tmpl = jinja_env.get_template("index.html")
    html = tmpl.render(
        request=request,
        personal_info=PERSONAL_INFO,
        skills=SKILLS,
        categorized_skills=get_categorized_skills(),
        category_order=CATEGORY_ORDER,
        exploring_techs=EXPLORING_TECHS,
        featured_projects=[p for p in PROJECTS if p["featured"]],
        other_projects=[p for p in PROJECTS if not p["featured"]],
        projects=PROJECTS,
        experience=EXPERIENCE,
        education=EDUCATION,
        certificates=CERTIFICATES,
        timelines=TIMELINES,
        social_links=SOCIAL_LINKS,
        nav_items=NAV_ITEMS,
        headlines=json.dumps(HEADLINES),
        particle_config=json.dumps(PARTICLE_CONFIG),
        grid_config=json.dumps(GRID_CONFIG),
        current_year=_dt.datetime.now().year,
    )
    return HTMLResponse(html)


@app.get("/api/github")
async def github_data():
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

    async with httpx.AsyncClient() as client:
        user_res, repos_res = await asyncio.gather(
            client.get("https://api.github.com/users/dev-tejasnb", headers=headers),
            client.get("https://api.github.com/users/dev-tejasnb/repos?per_page=100&sort=updated", headers=headers),
        )

        if user_res.status_code != 200 or repos_res.status_code != 200:
            return {"error": "Failed to fetch GitHub data"}

        user = user_res.json()
        repos = repos_res.json()
        total_stars = sum(r["stargazers_count"] for r in repos)

        now = __import__("datetime").datetime.utcnow()
        year = now.year
        start = f"{year}-01-01T00:00:00Z"
        end = f"{year}-12-31T23:59:59Z"

        query = """
        query {
          user(login: "dev-tejasnb") {
            contributionsCollection(from: "%s", to: "%s") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }
        """ % (start, end)

        gql_res = await client.post(
            "https://api.github.com/graphql",
            headers={**headers, "Content-Type": "application/json"},
            json={"query": query},
        )

        if gql_res.status_code != 200:
            return {"error": "Failed to fetch contribution data"}

        gql = gql_res.json()
        cal = gql["data"]["user"]["contributionsCollection"]["contributionCalendar"]
        weeks_data = cal["weeks"]

        grid = []
        for w in weeks_data:
            week = []
            for d in w["contributionDays"]:
                count = d["contributionCount"]
                level = 0 if count == 0 else (1 if count <= 3 else (2 if count <= 6 else (3 if count <= 9 else 4)))
                week.append({"date": d["date"], "count": count, "level": level})
            grid.append(week)

        streak = 0
        longest = 0
        cur = 0
        for w in reversed(weeks_data):
            for d in reversed(w["contributionDays"]):
                if d["contributionCount"] > 0:
                    cur += 1
                    longest = max(longest, cur)
                elif cur > 0:
                    streak = cur
                    break
            if streak > 0:
                break

        return {
            "totalContributions": cal["totalContributions"],
            "totalRepos": user["public_repos"],
            "totalStars": total_stars,
            "streak": cur,
            "longestStreak": longest,
            "grid": grid,
        }


@app.get("/api/chat")
async def chat(message: str = ""):
    msg = message.lower().strip()
    general = "I'm an AI assistant for Tejas N B's portfolio. I can answer questions about skills, projects, experience, and more."

    if re.search(r"(skill|tech|stack|language|framework|tool|know)", msg):
        cats = get_categorized_skills()
        lines = []
        for cat, items in cats.items():
            lines.append(f"**{cat}**: " + ", ".join(f"{s['name']} ({s['proficiency']}%)" for s in items))
        return {"response": "Here are Tejas's skills:\n" + "\n".join(lines)}

    if re.search(r"(project|build|create|work|portfolio)", msg):
        lines = [f"- **{p['title']}**: {p['description']}" for p in PROJECTS[:4]]
        return {"response": "Here are Tejas's featured projects:\n" + "\n".join(lines)}

    if re.search(r"(experience|work|job|career|professional)", msg):
        lines = []
        for e in EXPERIENCE:
            lines.append(f"**{e['position']}** at *{e['company']}* ({e['startDate']}–present)" if e["current"] else f"**{e['position']}** at *{e['company']}* ({e['startDate']}–{e['endDate']})",)
            for d in e["description"]:
                lines.append(f"  - {d}")
        return {"response": "Tejas's experience:\n" + "\n".join(lines)}

    if re.search(r"(education|study|studying|learn|academic|degree|college|sahyadri)", msg):
        lines = [f"🎓 **{e['degree']}** in {e['field']} at *{e['institution']}*, {e.get('location', '')} ({e['startDate']})" for e in EDUCATION]
        return {"response": "Tejas's education:\n" + "\n".join(lines)}

    if re.search(r"(certif|cert|credential)", msg):
        lines = [f"- **{c['name']}** — {c['issuer']} ({c['date']})" for c in CERTIFICATES]
        return {"response": "Tejas's certifications:\n" + "\n".join(lines)}

    if re.search(r"(contact|email|reach|hire|freelance)", msg):
        return {"response": f"You can reach Tejas at {PERSONAL_INFO['email']} or connect on LinkedIn."}

    if re.search(r"(hi|hello|hey|greetings|how are you)", msg):
        return {"response": f"Hey there! 👋 I'm Tejas's AI assistant. {general}"}

    if re.search(r"(about|who is|tell me|bio|background)", msg):
        return {"response": PERSONAL_INFO["bio"]}

    return {"response": f"I'm not sure about that. {general}"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
