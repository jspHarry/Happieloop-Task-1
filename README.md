🔐 User Authentication Backend API

A Node.js + Express backend API that provides user authentication features including registration, login, logout, and protected profile access using JWT and MongoDB.

🚀 Features

User Registration with validation

Secure Password Hashing using bcrypt

JWT-based Authentication

HTTP-only Cookie Support

Protected Routes

MongoDB Database Integration

Input Validation with express-validator

CORS Support

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcrypt

dotenv

cookie-parser

express-validator

CORS

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

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone <your-repo-link>
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the backend root and add:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development

4️⃣ Run the server

Development mode:

npm run dev


Production mode:

npm start


Server runs on:

http://localhost:4000

📌 API Endpoints
🔹 Register User

POST /api/auth/register

Body:

{
  "name": "Harry",
  "email": "harry@example.com",
  "password": "123456"
}

🔹 Login User

POST /api/auth/login

Body:

{
  "email": "harry@example.com",
  "password": "123456"
}


Response:

JWT token stored in HTTP-only cookie

Token also returned in JSON response

🔹 Logout User

POST /api/auth/logout

🔹 Get User Profile (Protected)

GET /api/auth/profile

Requires:

JWT token in cookie or Authorization header

🔒 Authentication Flow

User registers

Password is hashed and stored

User logs in

JWT token is generated

Token stored in HTTP-only cookie

Protected routes verify token using middleware

📸 Screenshot

Add your project screenshot here

![App Screenshot](./screenshot.png)


👉 Place your screenshot file in the project root and name it:

screenshot.png

🧪 Testing Tools

Postman

Thunder Client

Insomnia

🛡️ Security Features

Hashed passwords

JWT authentication

HTTP-only cookies

Input validation

Secure cookie options in production

👨‍💻 Author

Harry
