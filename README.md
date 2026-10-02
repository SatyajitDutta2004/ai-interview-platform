# YT-GENAI

AI-powered interview preparation app built with React + Vite frontend and Express + MongoDB backend.

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: MongoDB
- AI: Google Gemini
- PDF generation: Puppeteer

## Project Structure

- Frontend/
- Backend/
- .gitignore
- .env.example files for setup

## Local Setup

### 1) Install dependencies

```bash
cd Frontend && npm install
cd ../Backend && npm install
```

### 2) Create environment files

Copy the example files and fill in real values:

```bash
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

Then update the values inside the `.env` files.

### 3) Start the backend

```bash
cd Backend
npm install
node server.js
```

### 4) Start the frontend

```bash
cd Frontend
npm install
npm run dev
```

## Deployment Notes

### Backend deployment on Render

- Create a Web Service from this GitHub repository and set the root directory to `Backend`.
- Use `npm install` as the build command and `npm start` as the start command.
- Add `MONGO_URI`, `JWT_SECRET`, `GOOGLE_GENAI_API_KEY`, and `GOOGLE_GENAI_MODEL` as service environment variables.
- Set `FRONTEND_URL` to the exact deployed frontend origin, without a trailing slash, and set `NODE_ENV` to `production`.
- Render supplies `PORT`; the server uses it automatically.

### Frontend deployment on Vercel

- Import this GitHub repository and set the project root to `Frontend`.
- Use `npm run build` as the build command and `dist` as the output directory.
- Set `VITE_API_URL` to the backend service origin, without a trailing slash or `/api` suffix.
- After both services are deployed, make sure the Render `FRONTEND_URL` matches the Vercel production domain, then redeploy the backend.

Use the corresponding values in `Backend/.env` and `Frontend/.env` for local development. Never put real credentials in either `.env.example` file or commit real `.env` files. In MongoDB Atlas, allow network access from the backend host and use a database user with a strong password.

## Important

Do not commit the real `.env` file. Keep it local only.

## Git push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Environment variables required

### Backend

- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_GENAI_API_KEY`
- `GOOGLE_GENAI_MODEL`

### Frontend

- `VITE_API_URL`
