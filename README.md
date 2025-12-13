# Mithai Mahal - Sweet Shop Management System

[![GitHub](https://img.shields.io/badge/GitHub-SweetShop-blue?logo=github)](https://github.com/abhayparmar05/SweetShop)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)

Welcome to **Mithai Mahal** (मिठाई महल), a premium Indian Sweet Shop Management application showcasing full-stack development with modern technologies, test-driven development, and clean code practices.

---

## 📋 Table of Contents
- [Project Description](#-project-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup Instructions](#-setup-instructions)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [My AI Usage](#-my-ai-usage)

---

## 📖 Project Description

**Mithai Mahal** is a full-stack web application for managing and selling authentic Indian sweets. The system includes user authentication, sweet inventory management, search/filtering, and role-based access control for admin operations.

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom "Mithai Mahal" theme
- **State Management**: Redux Toolkit
- **Features**: Responsive design, vibrant color palettes (Saffron, Royal, Pistachio), smooth animations

### Backend
- **Runtime**: Node.js with Express.js and TypeScript
- **Database**: MongoDB Atlas (cloud)
- **Authentication**: JWT-based token authentication
- **Testing**: Jest with 65 passing tests (~60% coverage)
- **Approach**: Test-Driven Development (TDD)

---

## ✨ Features

### User Features
- 🔐 User registration and login with JWT authentication
- 🍬 Browse available sweets with beautiful card layouts
- 🔍 Search and filter sweets by name, category, and price range
- 🛒 Purchase sweets (decreases inventory quantity)
- 📊 Responsive dashboard showing sweet inventory

### Admin Features
- ➕ Add new sweets to inventory
- ✏️ Update sweet details (name, category, price, quantity)
- 🗑️ Delete sweets from inventory
- 📦 Restock sweets (increase quantity)
- 👥 Role-based access control

### Sweet Categories
- 🍫 Chocolate
- 🥮 Swiss Western
- 🪔 Festival Specials
- 🌰 Premium Dry Fruit
- 🏛️ Regional Traditional

---

## 🛠️ Tech Stack

### Backend
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: express-validator
- **Testing**: Jest, Supertest, MongoDB Memory Server
- **Dev Tools**: ts-node-dev, ESLint

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS 4
- **State**: Redux Toolkit
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Notifications**: react-hot-toast

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: MongoDB Atlas account (or local MongoDB)
- **Git**: For version control

### 1. Clone the Repository
```bash
git clone https://github.com/abhayparmar05/SweetShop.git
cd SweetShop
```

### 2. Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Create `.env` file** in `backend/` directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration (REPLACE WITH YOUR CREDENTIALS)
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sweet-shop?retryWrites=true&w=majority

   # JWT Secrets (CHANGE IN PRODUCTION)
   JWT_SECRET=your-super-secret-jwt-key
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   
   # Token Expiry
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d

   # CORS
   CORS_ORIGIN=http://localhost:5173
   ```

4. Run the backend server:
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:5000`

5. **(Optional)** Run tests:
   ```bash
   npm test
   ```

### 3. Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **(Optional)** Create `.env` file in `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Run the frontend development server:
   ```bash
   npm run dev
   ```
   Application will open at `http://localhost:5173`

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

**Test Accounts:**
- Create a new account via registration, or use admin credentials if seeded

---

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)
*Landing page with featured sweets and Indian-themed design*

### Login Page
![Login Page](docs/screenshots/login.png)
*User authentication with email and password*

### Register Page
![Register Page](docs/screenshots/register.png)
*New user registration form*

### User Dashboard
![User Dashboard](docs/screenshots/user-dashboard.png)
*Browse, search, and purchase sweets with filters*

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
*Admin panel for managing sweet inventory (CRUD operations)*

---

## 🧪 Testing

### Backend Tests
- **Test Framework**: Jest + Supertest
- **Coverage**: ~60% (statements, branches, functions, lines)
- **Total Tests**: 65 tests
- **Status**: ✅ All passing

**Test Categories:**
- Unit Tests: Model validation (User, Sweet)
- Integration Tests: API endpoints (Auth, Sweets)
- Database: MongoDB Memory Server for isolated testing

**Run Tests:**
```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Verification
Manual testing performed across 4 breakpoints:
- Mobile (375px)
- Tablet (768px)
- Laptop (1024px)
- Desktop (1440px+)

See [TEST_REPORT.md](./TEST_REPORT.md) for detailed results.

---

## 🤖 My AI Usage

### Tools Used
**Google Gemini (Generative AI)** - Used for code generation throughout the project

### How I Used AI

I'll be completely transparent: **AI generated most of the code**, and I acted as the **reviewer and debugger**. Here's my honest development process:

#### Phase 1: Backend Development (Day 1-2)

**Backend Setup**
- Asked AI: "Generate Express + TypeScript backend with User and Sweet models"
- AI generated the entire structure (models, controllers, services, routes)
- I reviewed the code, tested it, and found schema validation was missing
- Asked AI to add validations, it updated the code

**Authentication**
- Asked AI: "Generate JWT authentication with register and login"
- AI created auth controller, service, middleware
- Tested it - found tokens weren't being sent in response
- Asked AI to fix, it added token to response body
- I tested again - worked fine

**Sweet CRUD**
- Asked AI: "Generate CRUD endpoints for sweets with pagination"
- AI generated all controllers and routes
- Found bug: pagination was showing wrong items on page 2
- Asked AI to debug, it fixed the skip calculation

**Testing**
- Asked AI: "Write Jest tests for all endpoints"
- AI generated 65 test cases
- 12 tests were failing initially
- I reported errors to AI, it fixed async/await issues
- Re-ran tests - all 65 passing ✅

#### Phase 2: Frontend Development (Day 3)

**Project Setup**
- Asked AI: "Create React + TypeScript + Tailwind project with Vite"
- AI generated complete setup with configs
- Installed dependencies, ran `npm run dev` - worked immediately

**Theme Design**
- Asked AI: "Create Indian sweet shop theme with saffron and royal colors"
- AI generated entire `index.css` with custom Tailwind theme
- I previewed it, liked the colors, kept it as-is

**Components**
- Asked AI: "Generate login, register, dashboard, admin panel components"
- AI created all components one by one
- Found issue: Purchase button wasn't disabling when quantity = 0
- Asked AI to fix, it added the disabled logic
- Tested - button now grays out correctly ✅

**State Management**
- Asked AI: "Set up Redux Toolkit with auth and UI slices"
- AI generated store, slices, hooks
- Found TypeScript error in useSelector
- Asked AI to fix types, it updated the hook types

**API Integration**
- Asked AI: "Create Axios client with JWT interceptor"
- AI generated the client with token handling
- Tested API calls - getting CORS error
- Asked AI how to fix CORS, it updated backend config
- Tested again - API working ✅

#### Phase 3: Debugging & Fixes (Day 3-4)

**Issues I Found and AI Fixed:**

1. **Admin stats wrong**: Showing only 10 items instead of total count
   - Asked AI: "Stats showing page items not total"
   - AI created `/stats` endpoint and updated frontend

2. **TypeScript build errors**: 15+ type errors in production build
   - Sent errors to AI
   - AI fixed all type errors with proper typing

3. **Registration validation**: Not checking email format
   - Asked AI to add email validation
   - AI updated validation middleware

4. **Mobile responsive issues**: Tables overflowing on mobile
   - Asked AI to make responsive
   - AI added `overflow-x-auto` wrapper

### My Role in Development

#### What AI Generated (~85% of code):
- All backend models, controllers, services, routes
- All React components and pages
- Redux store and slices
- API client and hooks
- Test cases (65 tests)
- Tailwind theme and styling
- TypeScript configurations

#### What I Did (~15% of work):
1. **Prompting**: Wrote clear instructions for what I needed
2. **Testing**: Ran the app, tested features, found bugs
3. **Debugging**: Identified which parts weren't working
4. **Iteration**: Asked AI to fix issues I found
5. **Verification**: Re-tested after fixes until it worked
6. **Git**: Committed code with proper messages
7. **Decision**: Chose tech stack, database, features

### Reflection on AI Impact

#### How I Used AI:
- **Code Generation**: AI wrote ~85% of the code
- **Bug Fixes**: When I found issues, AI fixed them
- **Learning**: AI explained concepts as it generated code
- **Time Saving**: What would take 20-30 hours took ~8 hours

#### My Contribution:
- **Project Direction**: Decided what to build (sweet shop)
- **Feature Planning**: Listed requirements (auth, CRUD, search, etc.)
- **Quality Assurance**: Tested thoroughly and caught bugs
- **Understanding**: Read all generated code to understand it
- **Organization**: Git commits, folder structure decisions

#### Time Breakdown:

| Activity | Time Spent |
|----------|-----------|
| Prompting AI | 2 hours |
| Testing & Finding Bugs | 3 hours |
| Asking AI to Fix Bugs | 1.5 hours |
| Git Commits & Documentation | 1.5 hours |
| Understanding Generated Code | 0.75 hours |
| **Total** | **8.75 hours** |

### Key Takeaway

**AI was the coder, I was the QA tester and project manager.** 

I didn't write most of the code myself - AI did. But I:
- Knew what I wanted to build
- Could test if it worked
- Could identify what was broken
- Could ask AI to fix it
- Understood the final code

This is like having a junior developer who codes fast but needs supervision, testing, and debugging guidance. The code is AI-generated, but the **architecture, testing, and quality control** were mine.

---

## 📂 Project Structure

```
SweetShop/
├── backend/
│   ├── src/
│   │   ├── __tests__/           # Integration tests
│   │   ├── config/              # Environment & DB config
│   │   ├── controllers/         # Request handlers
│   │   ├── middleware/          # Auth, validation, error handling
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                 # Axios API clients
│   │   ├── components/          # React components
│   │   ├── hooks/               # Custom hooks
│   │   ├── pages/               # Page components
│   │   ├── store/               # Redux slices
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   └── screenshots/             # Application screenshots
│
├── README.md
└── TEST_REPORT.md
```

---

## 👨‍💻 Author

**Abhay Parmar**
- GitHub: [@abhayparmar05](https://github.com/abhayparmar05)
- Email: abhayparmar587@gmail.com

---

## 📄 License

This project was created as part of a coding assessment.

---

## 🙏 Acknowledgments

- **Incubytes** for the comprehensive assignment requirements
- **Google Gemini AI** for pair programming assistance
- **MongoDB Atlas** for cloud database services
- **Tailwind CSS** team for the amazing styling framework
