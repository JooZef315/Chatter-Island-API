# Chat App API

This is a backend API for a chat application built with Express.js and Socket.IO, utilizing TypeScript for type safety.

## Technologies Used

- Express.js: A minimalist web framework for Node.js.
- Socket.IO: A library that enables real-time, bidirectional, and event-based communication.
- TypeScript: A superset of JavaScript that adds static types.
- PostgreSQL: A powerful, open-source object-relational database system.
- Drizzle: An ORM (Object-Relational Mapper) for Node.js, providing an easy-to-use interface for database operations.
- JWT (JSON Web Tokens): A standard for securely transmitting information between parties as a JSON object.

## Features

- **User Authentication**: Register and login to access protected routes using JWT.
- **Friend Requests**: Send and accept friend requests to chat with others.
- **Private Messaging**: Send private messages to friends in real-time.
- **Group Chat Rooms**: Create and join group chat rooms with moderators and capacity limits.
- **Video Calls**: Initiate video calls with friends for face-to-face conversations.

## Installation

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm i`.
4. Set up your PostgreSQL database and configure the connection in `.env` file.
5. Run migrations to create database tables using `npm run db:migrate`.
6. Start the server using `npm run dev`.

## Configuration

Add `.env` file and fill in the necessary environment variables.

```
TODO ...
```

## Usage

### Development Mode

To start the server in development mode with Nodemon, run:

```
npm run dev
```

## API Endpoints

Detailed documentation for API endpoints can be found in the [API Documentation](#api-documentation) section below.

## API Documentation

### TODO ...
