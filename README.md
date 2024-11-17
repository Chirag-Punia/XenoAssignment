# XenoAssignment

A full-stack project that enables efficient management of customer data, campaigns, and audiences. It includes a React frontend and a Node.js/Express backend, with MongoDB for data storage and Redis for messaging.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Frontend
- Built with React and Vite for a fast development experience.
- Responsive design with Tailwind CSS.
- Features:
    - User authentication (Signup/Login).
    - Campaign creation and management.
    - Audience management.
    - Dashboard for key metrics.

### Backend
- Built with Node.js and Express.
- MongoDB for database management.
- Redis for pub/sub messaging.
- RESTful API design for managing:
    - Campaigns.
    - Customers.
    - Audiences.
    - Orders
    - Users
- Secure routes with authentication middleware.

### DevOps
- Docker support for easy containerization and deployment.
- Configurable environment variables for flexibility.

---

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, NextUI.
- **Backend**: Node.js, Express, MongoDB, Redis.
- **DevOps**: Docker, Docker Compose.

---

## Project Structure

```
XenoAssignment
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   └── src/               # React components and logic
├── server/                # Backend Node.js application
│   ├── config/            # Redis and database configurations
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── middleware/        # Authentication and validation middleware
├── docker-compose.yml     # Docker configuration
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chirag-Punia/XenoAssignment.git
   cd XenoAssignment
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the `server` directory with the following keys:
```
MONGO_URI=mongodb://localhost:27017/xeno
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

---

## Usage

### Development

1. Start the backend:
   ```bash
   cd server
   npm start
   ```

2. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

3. Access the app at `http://localhost:5173`.

### Docker Setup

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The app will be accessible at:
    - Frontend: `http://localhost:5173`
    - Backend: `https://xenoassignment.onrender.com`

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.

--- 

