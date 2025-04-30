💬 NexText - Real-Time Chat + AI Chatbot Application

🧾 Project Overview
NexText is a feature-rich, real-time chat application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js) with Socket.IO for instant, bidirectional communication. The application allows users to create an account, find other users, and engage in real-time private chats. Beyond basic messaging, NexText now includes a powerful AI Chatbot integration that can understand user queries and provide automated, intelligent responses—making it ideal for both social and productivity use cases.

This project showcases the combination of real-time technologies and artificial intelligence to create a modern, responsive, and interactive messaging platform.

⚙️ Detailed Features Breakdown

🔐 Authentication & User Management
User registration and login using JWT-based authentication.

Secure password handling with bcrypt hashing.

Persistent login using localStorage and protected frontend routes.

💬 Real-Time Chat System
One-to-one private messaging using Socket.IO.

Typing indicators with real-time status updates.

Automatic message updates without page reloads.

Scrollable and responsive chat interface.

📖 Message History & Persistence
Messages are stored in MongoDB with timestamps and sender/receiver references.

Users can view past conversations any time after logging in.

🔍 User Search & Contact Initiation
Live user search with debounced API calls.

Easy initiation of new chats from the user list.

🧠 AI-Powered Chatbot Integration
A virtual chatbot that users can interact with in a separate chat window.

Uses OpenAI’s API (or LangChain) to simulate human-like conversation.

Supports use cases like FAQs, productivity tips, task help, or casual conversation.

Built with extensibility in mind—can later support voice input, image understanding, or custom domain training.

🎨 UI/UX Design
Built with Chakra UI and Bootstrap for responsive, mobile-friendly layouts.

Dark/light mode support (optional).

Clean and intuitive design with feedback on actions like sending messages, logging in, etc.

🌐 RESTful Backend Architecture
Modular Express.js routing structure.

Controllers and middleware for scalable API design.

Token-based user validation for protected endpoints.

🧪 Use Cases
Social Chat App – Let users find and message friends in real time.

Customer Support Bot – Offer a virtual assistant powered by AI for basic support.

Team Collaboration Tool – Adapt the codebase to allow channels and groups.

Educational Companion – Enable the chatbot to answer academic or exam-related queries.


:

🧠 Technical Approach
NexText is architected with a modular, scalable, and real-time communication framework. Below is a breakdown of how each component is designed and interacts:

🏗️ 1. Architecture Overview
Frontend (React + Vite)

Handles routing, UI rendering, state management, and real-time Socket.IO events.

Communicates with backend via Axios for RESTful API calls and via Socket.IO for real-time features.

Backend (Node.js + Express)

Manages authentication, chat logic, and database operations using MongoDB + Mongoose.

Serves Socket.IO server for real-time communication.

Includes a chatbot route and controller that interfaces with an AI model.

Database (MongoDB Atlas)

Stores user data, chat metadata, and messages using Mongoose schemas.

Real-Time Layer (Socket.IO)

Enables bidirectional, event-based communication between frontend and backend for live chat, typing indicators, etc.

AI Chatbot Integration

A separate route/controller handles chatbot prompts and communicates with OpenAI's GPT or LangChain API.

Responses are sent back through the existing chat framework so the chatbot feels like a regular user.

🧾 2. Modules & Responsibilities

Module	Technology	Purpose
Authentication	JWT, bcrypt	Handles login, signup, and route protection.
Chat System	Socket.IO, REST API	Manages real-time messages and chat storage.
Chatbot Service	OpenAI API or LangChain	AI response generation and conversation handling.
Frontend	React, Chakra UI	Builds responsive UI, handles chat state, API requests.
Backend API	Express.js	Handles users, chats, messages, and AI endpoints.
Database	MongoDB + Mongoose	Persistent storage for all app data.


🚀 Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/Pawar-007/NexText.git
cd NexText
2. Install dependencies
bash
Copy
Edit
# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev

# Navigate to the backend folder and install backend dependencies
cd backend
npm install

# Start the backend server
npm run dev

3. Backend Environment Setup
Create a .env file in backend/:

env
Copy
Edit

PORT=5000

MONGO_URI2=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

OPENAI_API_KEY=your_openai_api_key  # ⬅️ New variable for Chatbot


📸 Screenshots

![Screenshot 2025-04-25 140605](https://github.com/user-attachments/assets/81ddf800-f4f4-4b8b-ad6b-9cf3b2e27442)
![Screenshot 2025-04-25 140624](https://github.com/user-attachments/assets/99a58d04-72d2-4964-b006-61d9b5e1aafa)
![Screenshot 2025-04-25 140659](https://github.com/user-attachments/assets/d431b41c-f2d6-4910-b4fe-f0b821edc556)
![image](https://github.com/user-attachments/assets/097980de-d2ca-49ed-b136-28e95a39a62b)


