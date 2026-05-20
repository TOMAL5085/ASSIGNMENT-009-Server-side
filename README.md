# MediQueue Server

Live API: `https://your-mediqueue-api.onrender.com`

MediQueue Server is the backend API for the MediQueue tutor booking platform. It handles authentication support, JWT token exchange, tutor management, booking management, and database communication for the client application.

## Features

- Provides REST API routes for tutors and bookings
- Supports Better Auth session handling with Google login flow
- Issues application JWT tokens for protected client requests
- Connects to MongoDB using Mongoose for tutor and booking data
- Protects private routes for tutor creation, updates, deletion, and booking management
- Includes a health endpoint for deployment checks
- Includes a seed script for adding demo tutor data quickly

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Better Auth
- JSON Web Token
- CORS

## Main API Routes

- `GET /` : basic API status
- `GET /api/health` : health check endpoint
- `GET /api/tutors` : fetch all tutors with optional search and date filtering
- `GET /api/tutors/:id` : fetch a single tutor
- `POST /api/tutors` : create a tutor
- `PATCH /api/tutors/:id` : update a tutor created by the logged-in user
- `DELETE /api/tutors/:id` : delete a tutor created by the logged-in user
- `GET /api/bookings/my-bookings` : fetch bookings for the logged-in student
- `POST /api/bookings` : create a booking and generate a session token
- `PATCH /api/bookings/:id/cancel` : cancel a booked session

## Environment Variables

Create a `.env` file in the server root with the following values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=choose_a_strong_secret
BETTER_AUTH_SECRET=choose_a_long_random_secret
BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the production server:

```bash
npm start
```

## Seed Demo Tutors

To insert demo tutor data into MongoDB:

```bash
node scripts/seedTutors.mjs
```

## Deployment Notes

- Recommended backend hosting: Render or Railway
- Update `CLIENT_URL` to your deployed frontend URL
- Update `BETTER_AUTH_URL` to your deployed backend URL
- Add the deployed Google OAuth callback URL:
  `https://your-mediqueue-api.onrender.com/api/auth/callback/google`

