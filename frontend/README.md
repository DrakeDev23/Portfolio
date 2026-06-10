# Drake Portfolio

A modern, dark-themed single-page portfolio built with **React + Vite + Tailwind CSS**.

## Tech Stack

- **React 18** with hooks
- **Vite 5** for dev server and bundling
- **Tailwind CSS 3** for utility styling
- **lucide-react** for icons (no emojis)
- **Inter** (display/body) + **JetBrains Mono** (code badges) via Google Fonts

## Project Structure

```
src/
├── assets/
│   └── images/
│       ├── avatar.jpg              ← Drop your profile photo here
│       ├── projects/               ← Drop project screenshots here
│       └── events/                 ← Drop event photos here
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Events.jsx
│   ├── Contact.jsx
│   ├── Chatbot.jsx
│   ├── Footer.jsx
│   ├── SectionHeader.jsx           ← Shared section header
│   └── GlassCard.jsx               ← Shared glass card primitive
├── constants/
│   └── data.js                     ← All content data (skills, projects, events, etc.)
├── App.jsx
├── main.jsx
└── index.css
```

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Adding Your Images

See `src/assets/images/README.md` for the full list of expected file names and recommended dimensions.

## Customising Content

All data lives in `src/constants/data.js`:

- **NAV_LINKS** — navbar items
- **SKILLS** — Development and Cybersecurity skill arrays
- **PROJECTS** — project cards (title, description, tags, color, image path)
- **EVENTS** — conference gallery cards (name, location, date, image path)
- **CHATBOT_RESPONSES** — seeded AI responses

## Connecting the Contact Form

In `src/components/Contact.jsx`, replace the `setTimeout` mock with your real API:

```js
// Example with a serverless endpoint
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

Compatible with Resend, EmailJS, Formspree, or any custom backend.
