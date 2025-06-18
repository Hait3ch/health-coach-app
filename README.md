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
```

# Health Risk Assessment Logic

## 1. Basic Health Risk Index Calculation

We assign points based on smoking, exercise, and stress answers:

- **Smoking:**  
  - yes = 2 points  
  - no = 0 points

- **Exercise:**  
  - rarely or never = 1 point  
  - weekly or daily = 0 points

- **Stress:**  
  - often = 1 point  
  - rarely or never = 0 points

**Calculate total risk score:** 0–4 points.

---

## 2. Personalized Recommendations Based on Risk Score and BMI Category

| Risk Score | BMI Category            | Recommendation                                                 |
|------------|------------------------|----------------------------------------------------------------|
| 0–1        | Normal or Underweight   | Maintain healthy lifestyle                                      |
| 2–3        | Overweight or Obese    | Encourage more exercise, reduce smoking, manage stress         |
| 4          | Any                    | Strongly recommend lifestyle changes and medical consultation  |

---

## 3. Age-Adjusted Interpretation

Adjust BMI thresholds by age group:

- **Age < 45:** Use normal BMI categories (e.g., normal upper limit = 25)
- **Age ≥ 45:** Slightly lower normal BMI upper limit (e.g., 24 instead of 25)
