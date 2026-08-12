# Client Portal Starter Kit — marketing landing page

## How to run it

Double-click `start.bat`. It installs anything missing and opens the page in your browser.

To stop the server, close the black window it opened.

### Why you can't just open index.html

This is a Vite + React app. `index.html` is an empty shell — it contains one line
pointing at `src/main.tsx`, which the browser cannot read. Vite compiles it in
memory and serves the result. So opening the file directly, or with Live Server,
gives a blank page every time. That is expected, not a bug.

### If you prefer the terminal

The commands must run in **this** folder (`landing-page`), not the one above it.

- `npm run dev` — dev server at http://localhost:5173/
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build (what Lighthouse must be run against)
- `npm run lint` — oxlint
