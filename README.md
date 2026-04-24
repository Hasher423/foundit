# FoundIt Application

## Overview
The **FoundIt** application is designed to help users discover and manage lost and found items in their local area efficiently. It connects users who have lost items with those who have found them, creating a community-driven platform.

## Purpose
The primary purpose of the FoundIt application is to reduce the hassle and stress associated with losing personal belongings by providing an easy-to-use interface for reporting and searching for lost items.

## Features
- **User Authentication**: Secure login and signup options for users.
- **Item Reporting**: Users can easily report lost or found items with images and descriptions.
- **Search Functionality**: Users can search for lost items based on categories, keywords, and distance.
- **Notifications**: Users receive notifications when an item matching their search criteria is reported.
- **User Profiles**: Maintain profiles to track reported and found items over time.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Heroku

## Project Structure
```plaintext
├── client/            # Frontend application
│   ├── src/          # React source files
│   ├── public/       # Public files

├── server/            # Backend application
│   ├── controllers/   # API controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes

├── .env               # Environment variables
├── README.md          # Project documentation
└── package.json       # NPM dependencies
```

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hasher423/foundit.git
   cd foundit
   ```
2. **Install dependencies**:
   - For the frontend:
   ```bash
   cd client
   npm install
   ```
   - For the backend:
   ```bash
   cd server
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env` file inside the `server/` directory and add the necessary configurations.
4. **Run the application**:
   - Start the backend server:
   ```bash
   cd server
   npm start
   ```
   - Start the frontend application:
   ```bash
   cd client
   npm start
   ```

## API Endpoints
- **GET /api/items**: Retrieve a list of all reported items.
- **POST /api/items**: Report a new lost or found item.
- **GET /api/items/:id**: Retrieve details of a specific item.
- **PUT /api/items/:id**: Update details of a reported item.
- **DELETE /api/items/:id**: Delete a reported item.

---

For further details, please refer to the codebase or documentation.