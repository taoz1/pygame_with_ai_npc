# NPC Observatory

A browser game with four residents driven by **DeepSeek V4.1 Flash** (`deepseek-flash`). The model chooses each resident's actions, intentions, and spoken lines from needs, goals, events, and recent memories. The engine applies validated actions; residents in the same location remember one another's dialogue.

## Add your key securely

In this repository, open **Settings → Secrets and variables → Codespaces → New repository secret**:

- Name: `DEEPSEEK_API_KEY`
- Value: your DeepSeek API key

Create or restart your Codespace afterward. The key is read by the Node server and is never sent to the browser or committed. Codespaces secrets do not automatically transfer to the hosted Sites application; its server needs the same secret configured separately.

## Develop anywhere

Use **Code → Codespaces → Create codespace on main**. Port 3000 opens the game; keep the forwarded port private. The server starts automatically. If the secret was added after startup, stop and restart the Codespace.

For local development with Node.js 22.9 or later:

```sh
cp .env.example .env
# Edit .env locally to set DEEPSEEK_API_KEY; .env is ignored by Git.
npm run dev
```

Visit http://localhost:3000. No dependencies to install. Without a key, the local rule-based demo remains playable. With a key, AI mode is selected automatically. A successful turn confirms the key works; configuration status alone does not verify credentials or balance.

## Behavior and cost

- One server-side DeepSeek request per simulated hour for all four NPCs, with at most 1,200 output tokens and thinking disabled.
- `Run world` performs at most ten turns, then pauses. Pause prevents the next request; an already-started request can complete.
- Errors pause the run and preserve world state. No silent fallback from AI to demo.
- State is held in browser memory and resets on reload.
- Requests have bounded input size, validated state and output, and a timeout. Model text is HTML-escaped before display.
- This is a private prototype. Before public deployment, add authenticated per-user quotas and durable rate limiting.

## Source

- `dist/index.html`, `dist/style.css`, `dist/app.js` — interface
- `dist/engine.js` — world rules and validated action application
- `backend/deepseek.mjs` — shared server-only API adapter
- `server.mjs` — Node development server
- `scripts/build.mjs` — embeds static assets and the adapter in a Cloudflare-compatible Worker
- `.devcontainer/devcontainer.json` — Codespaces configuration
- `tests/deepseek.test.mjs` — mocked provider tests, errors, and state changes

Run `npm run check` for syntax and integration tests. `npm run build` prepares the Sites Worker; generated server files are ignored. The Sites project manifest identifies the existing deployment. GitHub commits do not automatically redeploy the site.

No live DeepSeek call has been verified yet; that requires your API key.
