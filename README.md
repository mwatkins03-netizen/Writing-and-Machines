# Writing & Machines
### A Faculty Workshop on AI and First-Year Writing

A self-contained, interactive workshop for first-year writing faculty exploring the affordances, limitations, and pedagogical implications of current AI writing tools. No installation, no server, no build step — one HTML file.

**[→ Live site](https://yourname.github.io/writing-and-machines/)** *(update this link after enabling GitHub Pages)*

---

## What's in the workshop

Five sequential modules, designed to be used in full (3–4 hours) or as standalone 45-minute sessions:

| Module | What it does |
|---|---|
| **01 — Capability Map** | Two-column overview of what AI does well vs. what it structurally cannot do in a writing context |
| **02 — Provocative Interactions** | Four hands-on exercises (see below) |
| **03 — Student Scenarios** | Four composite cases — no easy answers, discussion questions for small groups |
| **04 — Pedagogical Frameworks** | Prohibition, Disclosure, Critical Integration, Redesign — with rationale, sample policy language, and honest tensions |
| **05 — Position Builder** | Three guided questions that produce a draft position statement you can edit and copy |

### The four interactions
- **Spot the AI** — 3-round scored exercise identifying AI vs. human passages, with pedagogical analysis of the tells
- **Side by Side** — Annotated comparison of human and AI responses to the same prompt
- **AI Struggles** — Select a prompt requiring lived experience; generate a live AI response; reflect on what's absent
- **Evaluate AI Feedback** — Get live AI feedback on a student paragraph; evaluate whether it's actually useful

### Facilitator guide mode
Open the **Tweaks panel** (toolbar) and set **Guide On** to reveal facilitator callouts throughout — time estimates, discussion scaffolding, and tips for each section.

---

## Hosting on GitHub Pages

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch**, Branch: `main`, Folder: `/ (root)`
4. Click **Save**
5. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
6. Update the link at the top of this README

The site uses live AI calls (via Claude) for two of the four interactions. These work in the browser without any API key — they use a shared quota. If calls fail, the site degrades gracefully.

---

## Customizing

The source files (before bundling) are:
- `AI Writing Workshop.html` — shell, styles, nav, tweaks panel
- `workshop-sections.jsx` — all section components, data, and facilitator notes

Edit those files, then re-bundle if you have the tooling. Or edit `index.html` directly — search for the content you want to change; it's all readable plain text inside the bundle.

**To change the student scenarios or capability map data:** search for `SCENARIOS_DATA` or `CAPABILITIES_DATA` in the source.

**To change the sample passages in Spot the AI:** search for `SPOT_ROUNDS`.

**To add or edit facilitator notes:** search for `FacilitatorNote` in `workshop-sections.jsx`.

---

## Pedagogical grounding

This workshop is informed by:
- [WPA Outcomes Statement for First-Year Composition (4th ed.)](https://wpacouncil.org/aws/CWPA/pt/sd/news_article/243055/_PARENT/layout_details/false)
- [NCTE Position Statement on AI in English Education](https://ncte.org/statement/aiandliteracyeducation/)
- Council of Writing Program Administrators guidelines on academic integrity

---

## License

MIT — use, adapt, and share freely. If you build on this for your institution, a note in your materials pointing back here is appreciated but not required.
