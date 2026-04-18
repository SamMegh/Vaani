# Vaani

AI chat application for real-time conversations with an assistant, built on a WebSocket-driven messaging pipeline and an LLM response service. Vaani combines persistent chat rooms, authenticated sessions, and server-side AI generation to support low-latency, multi-user chat workflows.

## Features

- JWT cookie-based authentication with protected chat routes.
- Room-scoped real-time messaging via Socket.IO.
- AI response generation triggered on each user message and stored as assistant messages.
- Chat room ownership and participant-based access control.
- Persistent conversation history with MongoDB and Mongoose.
- Frontend state orchestration with React + Zustand for auth and chat synchronization.

## Architecture

1. The client sends authenticated REST requests for room creation, room discovery, message fetch, and message submission.
2. The server validates the JWT cookie, persists the user message, and emits a Socket.IO event to the target room.
3. The server calls the AI provider to generate a response.
4. The assistant response is persisted and broadcast to the same room.
5. Connected clients receive events in real time and update chat state without polling.

## Tech Stack

- Frontend: React, Vite, Zustand, Axios, Socket.IO Client, Tailwind CSS
- Backend: Node.js, Express, Socket.IO, JWT, Cookie Parser, CORS
- Database: MongoDB, Mongoose
- AI Integration: Groq SDK (OpenAI-style chat completion workflow)
- Packaging: Electron assets included for desktop distribution

## Project Structure

```text
client/
Server/
docs/
Screenshoot/
```

## Screenshots

![Vaani - Home Screen](./Screenshoot/HomeScreen.png)
![Vaani - Contact Screen](./Screenshoot/ContactScreen.png)
![Vaani - Chat View](./Screenshoot/screenshot0.png)
![Vaani - App Snapshot](./Screenshoot/Screenshot%202025-09-08%20231804.png)

## Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd Vanni
```

### 2. Install dependencies

```bash
cd client
npm install
cd ../Server
npm install
```

### 3. Configure environment

Create a `.env` file inside `Server/`.

### 4. Run development servers

Terminal 1:

```bash
cd Server
npm run dev
```

Terminal 2:

```bash
cd client
npm run dev
```

## Environment Variables

Example `Server/.env`:

```env
# Server
Port=8080

# CORS
CLIENTNAME=http://localhost:5173

# AI Provider
GROQ_API_KEY=your_groq_api_key

# Authentication
JWT_SECRET=replace_with_a_strong_secret

# MongoDB
MONGODB_USER=your_mongodb_user
MONGODB_PASS=your_mongodb_password
MONGODB_NAME=your_database_name
MONGODB_URL=mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@your-cluster.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority
```

## API and WebSocket

### REST API

Auth routes (`/auth`):
- `POST /signin`
- `POST /signup`
- `GET /signout`
- `GET /check`

Chat routes (`/chat`):
- `GET /newchatroom`
- `GET /getchatrooms`
- `POST /getchats`
- `POST /sendmessage`
- `POST /share`

### WebSocket Events

- Client emits `joinRoom` with `roomId`.
- Server emits `newMsg` to room participants when a message is stored.
- Real-time transport complements REST persistence to keep message history authoritative.

## Challenges and Learnings

- Coordinating database persistence and socket emission order was necessary to avoid duplicate or out-of-sync UI states.
- AI response latency required separating user message persistence from assistant generation for better perceived responsiveness.
- Cross-origin cookie auth in local development required precise CORS and credential handling.
- Room-level access enforcement highlighted the need for explicit participant/admin checks on every protected action.

## Future Improvements

- Token streaming for assistant responses to reduce time-to-first-feedback.
- Rate limiting and queueing around AI calls for cost and reliability control.
- Automated tests for auth middleware, room authorization, and message lifecycle.
- Observability pipeline (structured logs, latency metrics, failure tracing).
- Presence indicators, typing signals, and delivery/read status semantics.
