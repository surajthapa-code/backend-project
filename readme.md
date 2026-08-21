# Backend Practice Project

This is my personal backend learning project. I am using it to understand how production-level APIs are designed, organized, secured, and connected to external services.

This is not intended to be a ready-made system for other applications. The repository is a record of my progress, experiments, mistakes, and the backend skills I am building.

## Current Progress

### Implemented

- Express application setup with JSON, URL-encoded, CORS, cookies, and static file middleware
- MongoDB connection using Mongoose
- User registration and login
- Password hashing and password verification with bcrypt
- JWT access-token and refresh-token authentication
- HTTP-only authentication cookies
- Protected routes using JWT middleware
- Logout and refresh-token rotation
- User profile retrieval and detail updates
- Password updates
- Avatar and cover-image uploads through Multer and Cloudinary
- Replacement of old Cloudinary profile images
- Channel profile lookup with subscriber information
- Watch-history lookup using MongoDB aggregation
- Reusable API response, API error, and async-handler utilities

### In Progress

The data models for videos and subscriptions are present, including video pagination support. The routes and controllers for the complete video platform are still being built.

## API Routes

All user routes are mounted under `/api/v1/users`.

| Method  | Route                  | Auth | Purpose                                                 |
| ------- | ---------------------- | ---- | ------------------------------------------------------- |
| `POST`  | `/register`            | No   | Register a user with an avatar and optional cover image |
| `POST`  | `/login`               | No   | Login with email or username                            |
| `POST`  | `/logout`              | Yes  | Clear the session refresh token and cookies             |
| `POST`  | `/refreshtoken`        | No   | Generate a new access token and refresh token           |
| `PATCH` | `/updatepassword`      | Yes  | Change the current user's password                      |
| `PATCH` | `/update-avatar`       | Yes  | Replace the current user's avatar                       |
| `PATCH` | `/update-cover-image`  | Yes  | Replace the current user's cover image                  |
| `GET`   | `/getuser`             | Yes  | Get the authenticated user's details                    |
| `PATCH` | `/update-user-details` | Yes  | Update name and email                                   |
| `GET`   | `/c/:username`         | Yes  | Fetch a channel profile                                 |
| `GET`   | `/watch-history`       | Yes  | Fetch the authenticated user's watch history            |

Authenticated requests use the access token cookie or the authentication format expected by the auth middleware.

## Tech Stack

- Node.js and Express
- MongoDB and Mongoose
- JWT and bcrypt for authentication
- Cloudinary for image and media storage
- Multer for multipart file uploads
- Mongoose aggregate pagination
- Nodemon for development

## Project Structure

```text
src/
|-- controllers/    Request handlers and business logic
|-- database/       MongoDB connection
|-- middleware/     JWT authentication and file uploads
|-- models/         User, video, and subscription schemas
|-- routes/         Express route definitions
|-- utils/          API helpers and Cloudinary utilities
|-- app.js          Express app and middleware setup
`-- index.js        Environment loading, database connection, and server startup
```

## Run Locally

Install dependencies:

```bash
npm install
```

Create a local environment file from the example and add your own values:

```bash
copy .env.example .env
```

Start the development server:

```bash
npm run dev
```

The API runs on the port configured by `PORT`, which is `8000` in my current local setup.

## Environment Variables

See `.env.example` for the required database, JWT, and Cloudinary variables. Never commit `.env` or expose real credentials in documentation. Production deployments should use a proper secret-management solution.

## What I Am Learning

Through this project, I am practicing:

- Separating routes, controllers, models, and middleware
- Designing relationships between users, videos, subscriptions, and watch history
- Handling authentication state with short-lived access tokens and refresh tokens
- Validating request data and returning consistent API responses
- Managing local uploads and remote media storage
- Cleaning up replaced media files
- Using aggregation pipelines to join and shape MongoDB data
- Thinking about error handling, security, scalability, and maintainability

## Next Steps

- Add video routes and controllers
- Add subscription actions and channel statistics
- Add likes, comments, playlists, and search
- Improve validation and error messages
- Add automated tests and API documentation
- Add production logging, rate limiting, and deployment configuration

This project is updated as I learn and add new backend features.
