# NPC Observatory

A small browser game prototype: observe four autonomous residents, inspect their needs and memories, and introduce rain, a festival, or a food shortage.

**This version uses deterministic rule-based agents, not an LLM.** There are no API calls or API keys. State lives in memory and resets on reload. Encounters build relationships; hunger, energy, and social needs determine choices.

## Develop anywhere

Open this repository in GitHub Codespaces using **Code → Codespaces → Create codespace on main**. The dev container starts the site on port 3000. Codespaces availability and billing depend on your GitHub account.

Or clone the repository onto any machine with Node.js 22 or later:

```sh
npm run dev
```

Visit http://localhost:3000. No dependencies need installing. Run `npm run check` to check JavaScript syntax.

## Structure

- `dist/index.html` — page structure
- `dist/style.css` — responsive theme
- `dist/engine.js` — simulation state and decision rules
- `dist/app.js` — rendering, interaction, optional WebMCP integration
- `server.mjs` — dependency-free local development server
- `.devcontainer/devcontainer.json` — portable Codespaces setup

## Next development step

Replace agent decision selection with a server-side model adapter. Keep API keys on the server, validate model actions against a finite action schema, and retain deterministic rules as a fallback. The present site is fully static; a real model integration will require a backend.

The Sites deployment is maintained separately. GitHub edits do not automatically redeploy it.
