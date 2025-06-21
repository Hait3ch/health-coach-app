# Health Coach App

A fullstack health assessment web application where users answer a short questionnaire to receive personalized insights and lifestyle recommendations.

---

## 🔧 Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: [Clerk.dev](https://clerk.com/)
- **Hosting**:
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/)
- **CI/CD**: GitHub Actions

---

## 🚀 Live Demo

- 🌐 App: [health-coach-app-mu.vercel.app](https://health-coach-app-mu.vercel.app/)
- ⚙️ API: [health-coach-app.onrender.com](https://health-coach-app.onrender.com/)

---

## ✨ Features

- Secure user authentication and sessions
- Dynamic health questionnaire with BMI and risk scoring
- Personalized results with contextual recommendations
- All user data saved to MongoDB (per user)
- Fully responsive and mobile-first design
- Multilingual support (English & Finnish)

---

## 🧪 Running Frontend Tests

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/) for unit and component testing.

### Run frontend tests:

```bash
cd frontend
npm test
```
---
## 🛠 Start Local Development


```bash
cd frontend
npm run dev

cd backend
npm run dev
```