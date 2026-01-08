# Focus Quest - Gamified EdTech MVP

A secure, gamified Pomodoro-based learning application built with React, Tailwind CSS, Framer Motion, Node.js, and MySQL.

## Features

### Phase 1: Interactive Landing Page
- Hero section with 2D character sprite
- Dynamic cursor tracking (eyeballs follow mouse)
- Magic scroll component revealing Pomodoro technique details
- Secure authentication modal with input sanitization

### Phase 2: Character Customization
- Layered SVG character system
- Customizable base (gender, skin tone)
- Accessories (glasses, shoes)
- Aura effects with adjustable intensity
- Persistent character configuration

### Phase 3: Focus Quest (Pomodoro RPG)
- Session setup with total study hours or custom timer
- 25-minute work / 5-minute break cycles
- State machine for Focus Loop (Idle, Focusing, Warning, Penalizing, Breaking)
- Yellow zone grace period (5 seconds)
- HP drain system (10 HP every 5 seconds if distracted)
- Lock-down mode with authorized study resources
- Alert system with speech bubbles

### Phase 4: Student Dashboard
- Total XP earned display
- Level calculation and progress
- Quests accomplished counter
- Focus consistency chart (health history)

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MySQL (mysql2)
- **Database**: Cloud MySQL (e.g., Aiven, PlanetScale, or local MySQL)
- **Deployment**:
  - **Frontend**: Vercel
  - **Backend**: Render

## Project Structure

The project is split into two independent folders for easy deployment:

```
focus-quest/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json     # Client dependencies
│   └── vite.config.js
│
├── server/              # Backend (Node.js + Express)
│   ├── index.js         # API & Server logic
│   ├── database.sql     # Database Schema
│   └── package.json     # Server dependencies
```

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- MySQL Server running locally (or a cloud URL)

### 1. Database Setup
Create a MySQL database named `focus_quest` and import the schema:
```bash
mysql -u root -p focus_quest < server/database.sql
```

### 2. Backend Setup (Server)
Navigate to the `server` directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=focus_quest
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup (Client)
Open a **new terminal** and navigate to the `client` directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `client` directory (optional for local, required for prod):
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## Deployment Guide

### Backend (Render)
1.  Connect your GitHub repository to Render.
2.  Select the **server** directory as the `Root Directory`.
3.  **Build Command**: `npm install`
4.  **Start Command**: `node index.js`
5.  Add **Environment Variables**:
    *   `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (Your cloud database credentials)
    *   `JWT_SECRET`
    *   `CLIENT_URL`: The URL of your deployed Vercel frontend (e.g., `https://your-app.vercel.app`)

### Frontend (Vercel)
1.  Connect your GitHub repository to Vercel.
2.  Select the **client** directory as the `Root Directory`.
3.  **Build Command**: `vite build`
4.  **Output Directory**: `dist`
5.  Add **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed Render backend (e.g., `https://your-api.onrender.com`)

## Security Features

- **CORS Protection**: Access limited to allowed origins (Frontend URL).
- **Secure Cookies**: HTTP-only, secure cookies for JWT storage.
- **Input Sanitization**: XSS prevention on all user inputs.
- **Password Hashing**: Bcrypt for secure password storage.

## License

MIT
