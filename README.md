# Story Management App

A React + Vite front-end implementing full CRUD operations against the
Story Management REST API.

API base URL: `https://sms-express-app-1-production.up.railway.app/api/stories`
(Swagger docs: `https://sms-express-app-1-production.up.railway.app/api-docs/`)

## Project structure

```
src
├── pages
│   ├── AddStory.jsx       # Create
│   ├── StoryList.jsx      # Read all + Delete
│   ├── StoryDetails.jsx   # Read one
│   └── EditStory.jsx      # Update
├── services
│   └── storyService.js    # All axios calls live here
├── App.jsx                # Routes + nav
├── main.jsx                # React + Router bootstrap
└── index.css
```

## Getting started

```bash
npm install
npm run dev
```

This starts a local dev server (default: http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Notes

- The original project notes had the API_URL missing its `https://`
  protocol — that's fixed in `src/services/storyService.js`, otherwise
  axios treats it as a relative path and every request fails.
- Request/response field names assumed: `authorName`, `content`, and an
  `id` field returned by the backend. If the live API uses different
  field names (check the Swagger UI link above), update `storyService.js`
  and the corresponding `story.xxx` references in the page components.
- Error states and loading states are handled on every page so failed
  requests show a message instead of a blank screen.
