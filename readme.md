# Backend Practice Project

This repository is a personal practice project for learning how to build production-grade backends. It's not intended as a drop-in solution for other systems — instead it documents what I'm learning, demonstrates capabilities I've implemented, and provides a clear place to iterate and improve.

## What I'm Learning

- Building stable Express-based APIs
- Structuring a project for maintainability (controllers, models, routes, middleware)
- Connecting and modeling data with MongoDB / Mongoose
- Authentication with JWTs (access & refresh tokens) and secure password hashing
- Relational data modeling (users, videos, subscriptions, watch history)
- File uploads (Cloudinary), media handling and streaming patterns
- Pagination and aggregation for large datasets
- Error handling, async flow control, and API response conventions
- Environment-based configuration and secrets management

## What This App Can Do (so far)

- **User Management:** Registration, login, profile with avatar and cover image ([src/models/user.model.js](src/models/user.model.js))
- **Authentication:** JWT-based access and refresh tokens with password hashing via bcrypt
- **Video Management:** Upload, publish, and manage videos with metadata (title, description, duration, views, thumbnail) ([src/models/video.model.js](src/models/video.model.js))
- **Subscriptions:** Subscribe/unsubscribe to channels and manage channel followers ([src/models/subscriptions.model.js](src/models/subscriptions.model.js))
- **Watch History:** Track user watch history with references to videos
- **Media Uploads:** Cloudinary integration for avatar, cover images, and video files ([src/utils/coudinary.js](src/utils/coudinary.js))
- **Pagination:** Aggregate pagination for large datasets (videos, etc.)
- **Error Handling & Middleware:** Custom error responses, async handlers, auth middleware, multer file uploads ([src/middleware/](src/middleware/))

## Tech Stack

- **Runtime:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (access & refresh tokens), bcrypt for password hashing
- **File Storage:** Cloudinary for media uploads
- **Utilities:** mongoose-aggregate-paginate for pagination, multer for file handling

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

- **Current focus:** Building out core features (users, videos, subscriptions, watch history) with solid patterns and error handling.
- **This is a learning project.** I deliberately focus on clarity and experimenting with production patterns: proper error handling, config management, authentication, relational data modeling, and API conventions.
- **Next steps:** API documentation (endpoints & example requests), full test coverage, deployment configs, and advanced features (comments, likes, notifications).

Feel free to check back for updates as I continue building and refactoring!
