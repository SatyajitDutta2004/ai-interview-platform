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

### Frontend deployment on Vercel

- Import the `Frontend` folder as the Vercel project
- Set the project root to `Frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables in Vercel dashboard if needed

### Backend deployment

This app is best deployed on a Node host such as Render or Railway, because Express is a long-running server and not ideal for default Vercel serverless hosting.

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
