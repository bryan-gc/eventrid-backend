# Eventrid Backend

## Version
1.0.0

## Description
This is the backend of the technical test at Eventrid.


## Running the app
> docker compose up

> docker compose up init

## Structure

### Root Files
- `docker-compose.yml`: Docker multi-container orchestration.
- `Dockerfile`: Docker container image configuration.
- `.env.example`: Template for environment variables.
- `.env`: Environment variables for the application.
- `env.ts`: Loads and manages environment variables.
- `package.json`: npm package dependencies and scripts.
- `package-lock.json`: Locked versions of npm dependencies.
- `README.md`: Project documentation.
- `tsconfig.json`: TypeScript compiler configuration.

### src (Source Directory)
Contains the source code of the application, organized into modules and functionalities.

- `index.ts`: Main entry point of the application.

#### Core Module
- `core`: Core functionalities of the application.
  - `constants`: Constant values used throughout the application.
  - `database`: Configuration and entities for the database.
  - `exceptions`: Custom exception classes for standardized error handling.
  - `interfaces`: TypeScript interfaces to define the shape of objects.
  - `middlewares`: Middleware functions for request and response handling.
  - `seeders`: Scripts for seeding the database with initial data.
  - `swagger.config.ts`: Configuration file for Swagger API documentation.
  - `types`: Custom TypeScript types definitions.
  - `utils`: Utility functions used across the application.

#### Auth Module
- `auth`: Handles authentication-related functionalities.
  - `dtos` (Data Transfer Objects): Defines the structure of data sent to and from the server for authentication-related operations.
  - `routes`: Route definitions for authentication endpoints.
  - `services`: Business logic related to authentication processes.

#### Memes Module
- `memes`: Manages meme-related functionalities.
  - `dtos`: Data Transfer Objects for meme-related operations.
  - `entities`: Database entities representing meme data.
  - `routes`: Routes for meme-related API endpoints.
  - `services`: Business logic for managing memes.

#### Users Module
- `users`: Manages user-related functionalities.
  - `dtos`: Data Transfer Objects for user operations.
  - `entities`: Database entities representing user data.
  - `routes`: Routes for user-related API endpoints.
  - `services`: Business logic for user management.

## Authentication Mechanism

The authentication in this application is managed using JWT (JSON Web Tokens) and refresh tokens. Upon successful login, users are issued a JWT with a short expiration time for enhanced security. This JWT is used for authenticating subsequent requests until it expires. Alongside the JWT, a longer-lived refresh token is generated and stored in the database, linked to the user's session.

When the JWT expires, the refresh token can be used to obtain a new JWT without requiring the user to re-authenticate. This refresh token is managed through dedicated routes and services. For logout operations, the associated refresh token is marked as deleted in the database, effectively invalidating it for future use. Additionally, the system includes mechanisms to check the expiration status of a refresh token, ensuring that expired or invalidated tokens cannot be used to access the system. This dual-token approach allows for secure and efficient management of user sessions.


## Dependencies

### Runtime Dependencies
- `bcrypt`: Password hashing library.
- `body-parser`: Middleware to parse incoming request bodies.
- `cors`: Middleware to enable Cross-Origin Resource Sharing.
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web application framework.
- `express-promise-router`: Router that supports promise-based route handlers.
- `http-status`: Utility to get HTTP status codes.
- `joi`: Object schema validation library.
- `jsonwebtoken`: Library to implement JSON Web Tokens.
- `mysql`: MySQL client (using `mysql2` package).
- `reflect-metadata`: Allows adding metadata to classes in TypeScript.
- `swagger-jsdoc`: Swagger integration using JSDoc comments.
- `swagger-ui-express`: Serves auto-generated Swagger UI based on a Swagger spec.
- `typeorm`: ORM for TypeScript and JavaScript (ES7, ES6, ES5).

### Development Dependencies
- `@types/*`: TypeScript type definitions for various libraries (bcrypt, cors, express, jsonwebtoken, node, swagger-jsdoc, swagger-ui-express).
- `nodemon`: Utility that automatically restarts node application when file changes are detected.
- `ts-node`: TypeScript execution engine for Node.js.
- `typescript`: TypeScript language compiler.

## Scripts
- `start`: Runs the app using `ts-node`.
- `start:dev`: Runs the app in development mode with `nodemon`.
- `seed`: Executes the data seeder script.

---
