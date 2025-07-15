# 💡 CrowdCure: Community-Powered Problem Solving Platform

**CrowdCure** is a full-stack web platform designed to crowdsource solutions for a wide range of user-submitted problems — from small bugs to full-scale project collaborations. It empowers users to post problems, get solutions from the community, find collaborators, or hire freelancers. Powered by AI-driven tagging and smart recommendations, **CrowdCure** aims to become a go-to space for learners, coders, freelancers, and open-source contributors.

---

## 🚀 Key Features

- 🧩 **Post Problems**: Users can submit doubts, errors, or even large project requests.
- 🧠 **AI-Powered Auto Tagging**: Gemini-based categorization based on problem description — no manual tags needed.
- 🔍 **Search & Explore**: Browse problems by category, keyword, or popularity.
- 🧑‍🏫 **Mentorship & Tutoring Requests**: Seek guidance or request learning support.
- 💼 **Freelance Collaboration**: Post project-based tasks with budgets to attract problem-solvers or freelancers.
- 🔐 **Role-Based Access Control (RBAC)**: Different permissions for normal users, mentors, and admins.
- 🤖 **Integrated Chatbot**: Powered by Dialogflow for reminders, task assignments, status checks, and more.
- 📅 **Schedule Meetings**: Google Meet integration to plan collaborations.

---

## 🛠 Tech Stack

| Layer        | Technologies                                      |
|--------------|---------------------------------------------------|
| **Frontend** | React, Tailwind CSS                               |
| **Backend**  | Node.js, Express.js, MongoDB                      |
| **AI**       | Gemini (for problem classification)               |
| **Chatbot**  | Dialogflow, Node API integration                  |
| **Auth**     | JWT, Role-based access system                     |
| **Integrations** | Google Calendar/Meet API, Email Notifications |

---

## 📂 Project Modules

- `frontend/`: User interface for problem submission, listing, and profile management.
- `backend/`: Node.js API managing problem routes, user roles, collaboration logic.
- `chatbot/`: Dialogflow setup and webhook logic for user interaction and task handling.
- `ai-service/`: Handles Gemini-based tagging and classification of problems.
- `scheduler/`: Google Meet integration to plan calls/meetings from within the platform.

---

## 🧪 Core User Types

1. 👤 **Normal Users**: Post small queries or errors and get help from the community.
2. 🧑‍🎓 **Learners**: Request personalized help or tutoring.
3. 💼 **Project Owners**: Post detailed freelance tasks and find collaborators.

---

## 📌 How It Works

1. A user posts a problem or project requirement.
2. The backend sends it to Gemini for classification.
3. Based on type, the problem is routed to relevant users (solvers, freelancers, or mentors).
4. Users can chat, schedule meetings, assign tasks, and resolve the issue collaboratively.

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js
- MongoDB (local or cloud)
- Google Cloud Project (for Meet/Calendar API)
- Dialogflow Agent setup

### ▶️ Running the Project
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
🌱 Future Enhancements
✅ In-app notification system

📊 Dashboard for user activity and performance tracking

🎯 Gamification of community engagement

📱 Mobile App (React Native or Flutter)

💬 Real-time chat system


✨ Sample Use Cases
A student stuck with a bug can post it and get help.

A learner can find someone to explain a topic.

A startup can post a small module as a freelance task.

An open-source project can find contributors.

