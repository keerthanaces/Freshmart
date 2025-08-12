# 🛒 FreshMart

FreshMart is a cross-platform e-commerce app with:  
- **Frontend:** React Native (mobile app)  
- **Backend:** Java Spring Boot (API server)  

---

## Project Structure

FreshMart/
├── frontend/ # React Native app
├── backend/ # Spring Boot backend
├── helpme.md # Backend reference and Maven info
├── README.md # This file (overview + setup)
└── .gitignore

---

## Getting Started

### Frontend Setup (React Native)

```bash
cd frontend
npm install
npm start

Run on Android:
npx react-native run-android

Run on iOS (Mac only):
npx pod-install ios
npx react-native run-ios
Backend Setup (Spring Boot)
For detailed backend info, see helpme.md.

Quick commands:
cd backend
./mvnw clean install
./mvnw spring-boot:run
Configure application.properties manually (not committed) with your DB credentials.

Environment Variables
Frontend (.env)


API_BASE_URL=http://localhost:8080
Backend (application.properties)



spring.datasource.username=your-db-username
spring.datasource.password=your-db-password


Git Workflow

git checkout -b feature/branch-name
git add .
git commit -m "feat: your message"
git push -u origin feature/branch-name
Maintainers
Your Name – you@example.com


