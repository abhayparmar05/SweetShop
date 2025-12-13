# Sweet Shop Frontend

A modern, responsive React TypeScript application for managing a sweet shop with user and admin functionalities.

## Features

### User Features
- 🍬 Browse all available sweets with pagination
- 🔍 Search sweets by name
- 🎯 Filter sweets by category and price range
- 🛒 Purchase sweets with quantity selection
- 📱 Fully responsive design

### Admin Features
- ➕ Add new sweets to inventory
- ✏️ Edit existing sweet details
- 🗑️ Delete sweets from inventory
- 📦 Restock sweets
- 📊 View inventory statistics

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit (auth/UI) + React Query (server state)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom sweet-themed design
- **HTTP Client**: Axios
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the API base URL in `.env` if needed:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable components
│   ├── common/       # Generic UI components
│   ├── layout/       # Layout components
│   ├── sweets/       # Sweet-specific components
│   └── admin/        # Admin components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── store/            # Redux store configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## API Integration

The application integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets (paginated)
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Create sweet (any authenticated user)
- `PUT /api/sweets/:id` - Update sweet (any authenticated user)
- `DELETE /api/sweets/:id` - Delete sweet (admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (admin only)

## Usage

### As a User
1. Register or login to your account
2. Browse sweets on the dashboard
3. Use search and filters to find specific sweets
4. Click "Purchase" on any sweet to buy
5. Select quantity and confirm purchase

### As an Admin
1. Register or login with admin role
2. Access the Admin Dashboard from the navbar
3. View inventory statistics
4. Add new sweets using the "Add New Sweet" button
5. Edit, delete, or restock existing sweets from the table

## Design Theme

The application features a playful sweet-themed design with:
- Custom color palette (candy-pink, lollipop-purple, gummy-yellow, etc.)
- Poppins font for a modern, friendly look
- Smooth animations and transitions
- Gradient backgrounds and buttons
- Responsive design for all screen sizes

## License

This project is part of the Incubytes assessment task.
