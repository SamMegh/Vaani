# Vaani (ChatBot)

This repository contains Vaani — a chat application with an AI assistant.

See the full documentation in `docs/PROJECT_DOCS.md` for architecture, setup, API reference, and deployment notes.

Quick start

1. Install dependencies

	- `cd client && npm install`
	- `cd Server && npm install`

2. Create a `.env` file in `Server/` directory with the following variables:

```env
# Server Configuration
Port=8080

# Client Configuration
CLIENTNAME=http://localhost:5173

# AI Services API Keys
GROQ_API_KEY=your_groq_api_key

# Authentication
JWT_SECRET=your_secret_key_for_jwt

# MongoDB Configuration
MONGODB_USER=your_mongodb_user
MONGODB_PASS=your_mongodb_password
MONGODB_NAME=your_database_name
MONGODB_URL=mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@your-cluster.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority
```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `Port` | Backend server port | `8080` |
| `CLIENTNAME` | Frontend client URL | `http://localhost:5173` |
| `GoogleGeminiAPI` | Google Gemini API key | Get from [Google AI Studio](https://aistudio.google.com/) |
| `GROQ_API_KEY` | Groq API key for LLM inference | Get from [Groq Console](https://console.groq.com/) |
| `JWT_SECRET` | Secret key for JWT token generation | Any secure random string |
| `MONGODB_USER` | MongoDB username | Your MongoDB user |
| `MONGODB_PASS` | MongoDB password | Your MongoDB password |
| `MONGODB_NAME` | MongoDB database name | `chatbotDB` or your choice |
| `MONGODB_URL` | Full MongoDB connection string | Your MongoDB Atlas connection URL |

3. Run in development

	- `cd Server && npm run dev`
	- `cd client && npm run dev`

More details: `docs/PROJECT_DOCS.md`
