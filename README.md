🚀 AUTHFORGE
🔐 Enterprise-Grade Authentication Backend API
⚡ Secure • Scalable • Production-Ready
<p align="center"> <b>A powerful Node.js authentication system built for modern applications</b> </p> <p align="center"> <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge"> <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge"> <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge"> <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge"> </p>
🌟 What is AuthForge?

AuthForge is a secure and scalable authentication backend designed to power modern web and mobile applications.

It handles:
✔ User Registration
✔ Secure Login
✔ JWT Authentication
✔ Protected Routes
✔ Cookie-based Sessions

All built using best security practices.

🎯 Built For

🚀 Startups
🌐 Web Applications
📱 Mobile Apps
🧩 Microservices
👨‍💻 Developers who value clean architecture

✨ Core Features
🔐 Secure Authentication

Password hashing with bcrypt

JWT-based authorization

HTTP-only cookie storage

🛡️ Protected Routes

Middleware-based access control

Secure profile endpoint

⚡ Performance Optimized

Minimal API latency

Efficient MongoDB queries

🌍 Frontend Ready

CORS enabled

Cookie + token authentication

🧠 System Architecture
Client → API Routes → Controllers → Middleware → MongoDB
                      ↓
                 JWT Verification

🛠️ Tech Stack
Tech	Purpose
Node.js	Backend Runtime
Express.js	API Framework
MongoDB	Database
Mongoose	ODM
JWT	Authentication
bcrypt	Password Security
dotenv	Environment Config
cookie-parser	Cookie Handling
express-validator	Input Validation
📂 Project Structure
backend/
│── middleware/
│   └── auth.js
│── models/
│   └── User.js
│── routes/
│   └── auth.js
│── server.js
│── package.json
│── .env

⚙️ Setup Guide
🔹 Clone the repository
git clone <your-repo-url>
cd backend

🔹 Install dependencies
npm install

🔹 Configure environment variables

Create a .env file:

PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development

🔹 Run the server

Development mode:

npm run dev


Production mode:

npm start

🔗 API Endpoints
🟢 Register User

POST /api/auth/register

🔵 Login User

POST /api/auth/login

🔴 Logout User

POST /api/auth/logout

🟡 Profile (Protected)

GET /api/auth/profile

🔒 Security Highlights

✔ Password Hashing
✔ JWT Expiry
✔ HTTP-only Cookies
✔ Middleware Protection
✔ Input Validation
✔ Production Safe Settings

📸 Project Preview
<p align="center"> <img src="./Screenshot.png" width="800"> </p>

📌 Save your screenshot as:

/screenshot.png

🧪 Testing Tools

Postman

Thunder Client

Insomnia

🚀 Future Roadmap

🔹 Email verification
🔹 Password reset
🔹 OAuth integration
🔹 Role-based access
🔹 Rate limiting
🔹 Swagger docs

👨‍💻 Author
Harry

Backend Developer • API Engineer • Problem Solver
