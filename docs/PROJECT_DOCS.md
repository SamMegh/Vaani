# Vaani (ChatBot) — Project Documentation

This document describes the Vaani ChatBot project. It covers architecture, how to run the project, server API, frontend structure, environment variables, deployment tips, and development notes.

## Table of contents
- Project overview
- Architecture
- Quick start (development)
- Scripts
- Environment variables
- Server (API) routes
- Authentication flow
- Database
- Frontend (client)
- Electron packaging
- Testing & linting
- Deployment notes
- Troubleshooting
- Contributing

## Project overview
Vaani is a chat platform with an AI assistant that can respond to messages, maintain conversation history, and support multi-user chatrooms. The project contains:
- `client/` — React + Vite frontend (TailwindCSS)
- `Server/` — Express backend with socket.io and MongoDB
- `electron/` — Electron packaging assets

## Architecture
- Frontend communicates with the server via REST endpoints (under `/chat` and `/auth`) and Socket.IO for real-time messaging.
- The server persists users, chatrooms, and messages in MongoDB via Mongoose models.
- The AI assistant uses a model integration (`chatAi.model.js`) to generate replies (project includes `g4f` and other hooks).

## Quick start (development)
Prerequisites:
- Node.js 18+ (or stable LTS)
- npm or yarn
- MongoDB connection (Atlas recommended)

1. Clone the repo and install dependencies for each package:

   - Root repo has `client/` and `Server/` directories. Install in each:
     - `cd client && npm install`
     - `cd Server && npm install`

2. Create a `.env` file in `Server/` with the required environment variables (see below).

3. Start the server and client (in separate terminals):

   - Server (development):
     - `cd Server && npm run dev` (uses nodemon)
   - Client (development):
     - `cd client && npm run dev` (Vite)

4. Open the app in the browser at the client dev server URL (Vite will print this, commonly `http://localhost:5173`).

## Scripts
Client (`client/package.json`):
- `dev` — run Vite dev server
- `build` — build production assets
- `preview` — preview production build
- `lint` — run ESLint

Server (`Server/package.json`):
- `start` — run server with Node
- `dev` — run server with nodemon

## Environment variables
Create `Server/.env` with the following (example):

- `Port` — server port (e.g., 5000)
- `CLIENTNAME` — client origin for CORS (e.g., `http://localhost:5173`)
- `MONGODB_USER` — Atlas DB user
- `MONGODB_PASS` — Atlas DB password
- `MONGODB_NAME` — DB name
- `JWT_SECRET` — secret for JWT cookie generation
- `NODE_ENV` — environment (development/production)

Keep these secrets out of source control.

## Server (API) routes
Base path: `http://<server-host>:<Port>`

Authentication (`/auth`):
- `POST /auth/signup` — Create new user. Body: `{ email, password, name }`. Returns user data and sets JWT cookie.
- `POST /auth/signin` — Login user. Body: `{ email, password }`. Returns user data and sets JWT cookie.
- `GET /auth/signout` — Logout (protected). Clears JWT cookie.
- `GET /auth/check` — Check current user (protected). Returns user payload.

Chat (`/chat`):
- `GET /chat/newchatroom` (protected) — Create a new chatroom. Returns new room id.
- `GET /chat/getchatrooms` (protected) — Get chatrooms for the current user.
- `POST /chat/getchats` (protected) — Get messages for a chatroom. Body: `{ roomID }`.
- `POST /chat/sendmessage` (protected) — Send a message into a chatroom. Body: `{ senderid, name, msg, roomID }`.
  - This endpoint saves the message, triggers socket.io events, calls the AI model via `chatAi.model.js`, and saves the assistant reply.
- `POST /chat/share` (protected) — Share (add) a user to a chatroom. Body: `{ roomID, userId }` (only admin can add).

Notes:
- Protected routes require a valid JWT cookie set by the server.

## Authentication flow
- On successful signup/signin, server creates a JWT and sets it as an HTTP-only cookie named `JWT`.
- Protected routes use the `protect.midlayer.js` middleware to read and validate the token and attach `req.user`.
- Logout clears the cookie via `res.clearCookie('JWT')`.

## Database
- MongoDB with Mongoose.
- Collections: Users, Chatrooms, Messages.
- DB connection uses environment variables to construct an Atlas connection string.

## Frontend (client)
- Built with React (v19) and Vite.
- Styling: Tailwind CSS.
- State: Zustand stores in `client/src/store/` for auth and chat.
- Components of interest:
  - `src/components/ChatHistory.jsx` — sidebar chatrooms list.
  - `src/components/MainChatSection.jsx` — main chat UI.
  - `src/screen/landingScreen.jsx` — landing page and documentation links.
- Socket.io client is used to receive real-time `newMsg` events.

## Electron
- `electron/` contains basic packaging assets for an Electron build.

## Testing & linting
- Client has ESLint configured; run `npm run lint` in `client/`.
- Server has no tests yet; add unit/integration tests as needed.

## Deployment notes
- Build client with `cd client && npm run build` and serve static files from a CDN or a static server.
- For production, make sure `CLIENTNAME` points to the deployed client origin.
- Use environment variables to protect secrets; use a secure cookie setup for production.
- If bundling with Electron, update asset paths accordingly.

## Troubleshooting
- `npm run dev` failing? Check you ran `npm install` inside both `client/` and `Server/`.
- CORS errors? Confirm `CLIENTNAME` matches the client origin.
- DB connection errors? Verify credentials and network access to Atlas.

## Contributing
- Fork, create a feature branch, open a PR, and request review.
- Keep changes small and add tests where appropriate.

---

If you'd like, I can also:
- Add a `docs/` site with individual pages per section.
- Generate an OpenAPI spec for the server endpoints.
- Add unit tests for critical server routes.

Tell me which enhancements you'd like next.
