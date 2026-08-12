# Backend Practice Project

This repository is a personal practice project for learning how to build production-grade backends. It's not intended as a drop-in solution for other systems — instead it documents what I'm learning, demonstrates capabilities I've implemented, and provides a clear place to iterate and improve.

## What I'm Learning

- Building stable Express-based APIs
- Structuring a project for maintainability (controllers, models, routes, middleware)
- Connecting and modeling data with MongoDB / Mongoose
- Authentication with JWTs and secure password handling
- File uploads (Cloudinary), media handling and streaming patterns
- Error handling, async flow control, and API response conventions
- Environment-based configuration and secrets management

## What This App Can Do (so far)

- User registration and authentication
- Basic user routes and controllers ([src/routes/user.routes.js](src/routes/user.routes.js))
- MongoDB integration via Mongoose ([src/database/index.js](src/database/index.js))
- Media upload support and Cloudinary integration ([src/utils/coudinary.js](src/utils/coudinary.js))
- Middleware for auth, file uploads, and async error handling

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Cloudinary for media uploads
- JWT for authentication

## Project Structure (high level)

- `src/` — application source code
  - `controllers/` — request handlers
  - `models/` — Mongoose models
  - `routes/` — Express routes
  - `middleware/` — auth, multer, etc.
  - `utils/` — helpers, ApiError, ApiResponse, Cloudinary helpers

## Getting Started (local)

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill values:

```bash
cp .env.example .env
```

3. Start the app in development:

```bash
npm run dev
```

The server should run on the port defined by `PORT` in your `.env`.

## Environment

See `.env.example` for required configuration values. Sensitive keys should never be committed — use environment variables or a secrets manager in real projects.

## Notes & Next Steps

- This is a learning project. I deliberately focus on clarity and experimenting with production patterns (error handling, config, auth). I'm iterating and improving tests, CI, and deployment workflows next.

If you'd like me to add API documentation or example requests, tell me which endpoints you want documented.
