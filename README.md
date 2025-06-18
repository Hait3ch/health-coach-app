# 🧠 Health Coach App

A fullstack web application where users fill out a short health questionnaire and receive personalized insights and recommendations based on their answers.

## 🔧 Tech Stack

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas (cloud)
- **Authentication**: Clerk.dev
- **Hosting**:
  - Frontend: Vercel
  - Backend: Render
- **CI/CD**: GitHub Actions

## 🚀 Live Demo

👉 [https://your-app.vercel.app](https://your-app.vercel.app)  
(API: [https://your-api.onrender.com](https://your-api.onrender.com))

## ✨ Features

- User registration & login
- Health questionnaire with 5–10 questions
- Dynamic result summary with charts and insights
- Personalized health tips (sleep, stress, nutrition)
- All data saved in a cloud MongoDB database
- Fully responsive and mobile-friendly UI

## 📦 Local Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
node server.js
