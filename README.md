# CatMatch Users MicroService

A microservice for managing user profiles, authentication, and user-related data in the CatMatch platform. CatMatch connects cat rehomers with potential adopters, and this service handles all user management functionality.

## Overview

This microservice provides a RESTful API for managing user profiles, including personal information, user types (Rehomer/Adopter), and profile pictures. Built with TypeScript and Express.js, it integrates with Supabase for authentication and storage, and uses PostgreSQL with Drizzle ORM for data persistence.

## Features

- **User Profile Management**: Complete CRUD operations for user profiles including display name, email, phone number, gender, date of birth, and bio
- **User Type System**: Support for two user types - Rehomer (users rehoming cats) and Adopter (users looking to adopt)
- **Profile Picture Management**: Upload, retrieve, update, and delete user profile pictures with support for JPG, PNG, and WEBP formats
- **Authentication & Authorization**: JWT-based authentication with refresh token support via Supabase
- **Input Validation**: Comprehensive validation using Zod schemas
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Migrations**: Managed migrations using Drizzle Kit
- **Comprehensive Testing**: Unit and API tests with Vitest

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Validation**: Zod
- **Testing**: Vitest with coverage
- **API Documentation**: Swagger (swagger-jsdoc & swagger-ui-express)
- **File Upload**: Multer

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Supabase account and project
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jj-int-dev/CatMatch.MicroServices.Users.git
cd CatMatch.MicroServices.Users
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (create a `.env` file):

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_postgresql_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
AUTHORIZED_CALLER=your_authorized_origin_url
```

4. Run database migrations:

```bash
npm run db:push
```

## Usage

### Development

Start the development server with auto-reload:

```bash
npm run dev
```

### Production

Build and start the production server:

```bash
npm run build
npm start
```

### API Documentation

Access the interactive Swagger documentation at:

```
http://localhost:3000/api-docs
```

## API Endpoints

All endpoints are prefixed with `/api/users` and require authentication via Bearer token and refresh token headers.

- `GET /:userId/profile` - Get user profile details
- `PATCH /:userId/profile` - Update user profile
- `DELETE /:userId` - Delete user account
- `GET /:userId/type` - Get user type (Rehomer/Adopter)
- `PUT /:userId/user-type` - Update user type
- `GET /:userId/profile-picture` - Get profile picture URL
- `PUT /:userId/profile-picture` - Upload/update profile picture
- `DELETE /:userId/profile-picture` - Delete profile picture

## Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

Run tests with UI:

```bash
npm run test:ui
```

## Database Management

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Apply migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:pull` - Pull schema from database
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:check` - Check for migration issues
- `npm run db:drop` - Drop migrations

## Project Structure

```
├── src/
│   ├── actions/          # Business logic layer
│   ├── commands/         # Database operations
│   ├── config/           # Configuration files
│   ├── database-migrations/  # Database schema and migrations
│   ├── dtos/             # Data transfer objects
│   ├── mappers/          # Data transformation utilities
│   ├── routes/           # API route definitions
│   ├── utils/            # Utility functions and clients
│   ├── validators/       # Request and data validation
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── tests/
│   ├── api/              # API integration tests
│   ├── unit/             # Unit tests
│   └── mocks/            # Test mocks
└── coverage/             # Test coverage reports
```

## Development Scripts

- `npm run lint` - Run ESLint for code quality
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
