# Chatter Island

## Chat App API

This API serves as the backend for a chat application built using Express.js, Drizzle, PostgreSQL, Socket.IO, TypeScript, Zod, Multer, Peer for video chat, and JWT for authentication. The API enables users to sign up, send friend requests, chat with friends via text or video, send photos in the chat, create chat groups with customizable capacities, and manage group memberships through moderators.

## Features

1. **User Authentication:** Users can sign up and authenticate using JSON Web Tokens (JWT), ensuring secure access to the application.
2. **Friend Requests:** Users can send and accept friend requests, establishing connections with other users.

3. **One-on-One Chat:** Users can engage in one-on-one text and video chats with their friends, enhancing communication flexibility.

4. **Multimedia Messaging:** Users can send photos in their chat conversations, enriching the messaging experience.

5. **Group Creation:** Users can create chat groups with specified capacities, allowing multiple users to participate in group discussions.

6. **Group Membership Management:** Each group has a moderator who can accept or reject membership requests and remove members from the group, ensuring efficient group management.

7. **Video Chat:** Utilizing Peer, users can initiate and participate in real-time video chats within the application.

## Technologies Used

- **Express.js:** A minimalist web framework for Node.js, facilitating the development of robust APIs.
- **Drizzle:** A lightweight ORM (Object-Relational Mapping) for TypeScript and JavaScript, simplifying database interactions.
- **PostgreSQL:** A powerful open-source relational database management system, used for storing user data and chat information.
- **Socket.IO:** A library enabling real-time, bidirectional communication between web clients and servers, crucial for instant messaging functionality.
- **TypeScript:** A statically typed superset of JavaScript, providing improved developer productivity and code maintainability.
- **Zod:** A TypeScript-first schema declaration and validation library, ensuring data consistency and integrity.
- **Multer:** A middleware for handling multipart/form-data, enabling the uploading of photos within chat conversations.
- **Peer:** A simple, peer-to-peer solution for video, voice, and data communication, facilitating real-time video chat features.
- **JWT (JSON Web Tokens):** A standard for securely transmitting information between parties as JSON objects, used for user authentication and authorization.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/JooZef315/Chatter-Island-API
   ```

2. Navigate to the project directory:

   ```
   cd <project-directory>
   ```

3. Install dependencies:

   ```
   npm install
   ```

## Configuration

Add `.env` file and fill in the necessary environment variables.

```
ENVIRONMENT =
PORT =

DATABASE_URI =

ACCESS_TOKEN_SECRET =
REFRESH_TOKEN_SECRET =

UPLOADCARE_SECRET =

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

### Authentication

1. **Register a new user**

   - **Description**: Register a new user.
   - **Method**: POST
   - **Route**: /api/v1/users/
   - **Access**: Public
   - **Output**: Success message

2. **Authenticate a user**

   - **Description**: Authenticate a user and get JWT token.
   - **Method**: POST
   - **Route**: /api/v1/auth/login
   - **Access**: Public
   - **Output**: JWT token

3. **Logout a user**

   - **Description**: Logout a user.
   - **Method**: POST
   - **Route**: /api/v1/auth/logout
   - **Access**: Private
   - **Output**: Success message

4. **Refresh the access token**

   - **Description**: Refresh the access token.
   - **Method**: GET
   - **Route**: /api/v1/auth/refresh
   - **Access**: Private
   - **Output**: Access token

### Users

1. **Get all Users**

   - **Description**: get all users.
   - **Method**: GET
   - **Route**: /api/v1/users
   - **Access**: Private
   - **Query Parameters**:
     - search (string): Optional. for searching for a user by username.
   - **Output**: users

2. **Get a user**

   - **Description**: get a user.
   - **Method**: GET
   - **Route**: /api/v1/users/:uid
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Query Parameters**:
     - full (boolean): Optional. to fully populate the user.
   - **Output**: user

3. **Update a user**

   - **Description**: get a user.
   - **Method**: PUT
   - **Route**: /api/v1/users/:uid
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: Success message

4. **Delete a user**

   - **Description**: Delete a user.
   - **Method**: DELETE
   - **Route**: /api/v1/users/:uid
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: Success message

5. **get friends**

   - **Description**: get a user friends.
   - **Method**: GET
   - **Route**: /api/v1/users/:uid/friends
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: friends

6. **Friend request**

   - **Description**: send friend request to a user.
   - **Method**: POST
   - **Route**: /api/v1/users/:uid/addFriend
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: Success message

7. **confirm friend request**

   - **Description**: confirm friend request from a user.
   - **Method**: PUT
   - **Route**: /api/v1/users/:uid/confirmFriend
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: Success message

8. **Unfriend**

   - **Description**: unfriend a user.
   - **Method**: DELETE
   - **Route**: /api/v1/users/:uid/friends
   - **Access**: Private
   - **Parameters**:
     - uid (string): User ID.
   - **Output**: Success message

### Chats

1. **Get Chats**

   - **Description**: get all the chats for the current user.
   - **Method**: GET
   - **Route**: /api/v1/chats
   - **Access**: Private
   - **Output**: chats

2. **Get messages**

   - **Description**: get messages in a single chat.
   - **Method**: GET
   - **Route**: /api/v1/chats/:cid/
   - **Access**: Private
   - **Parameters**:
     - cid (string): chat ID.
   - **Query Parameters**:
     - page (number): for pagination. defualt = 1.
   - **Output**: messages

3. **Delete a message**

   - **Description**: delete a message.
   - **Method**: DELETE
   - **Route**: /api/v1/chats/:cid/:mid
   - **Access**: Private
   - **Parameters**:
     - cid (string): chat ID.
     - mid (string): message ID.
   - **Output**: Success message

4. **Send a message**

   - **Description**: send a new message to a user.
   - **Method**: POST
   - **Route**: /api/v1/chats/:cid
   - **Access**: Private
   - **Parameters**:
     - cid (string): chat ID.
   - **Output**: message

### Group Chats

1. **Get Group Chats**

   - **Description**: get all groups.
   - **Method**: GET
   - **Route**: /api/v1/groups
   - **Access**: Private
   - **Output**: Group

2. **Get messages**

   - **Description**: get messages in a group chat.
   - **Method**: GET
   - **Route**: /api/v1/groups/:gid/
   - **Access**: Private
   - **Parameters**:
     - gid (string): group ID.
   - **Query Parameters**:
     - page (number): for pagination. defualt = 1.
   - **Output**: messages

3. **Create Group Chat**

   - **Description**:create a group.
   - **Method**: POST
   - **Route**: /api/v1/groups
   - **Access**: Private
   - **Output**: Group

4. **Update Group Chat**

   - **Description**: Update Group Chat.
   - **Method**: PUT
   - **Route**: /api/v1/chats/:cid
   - **Access**: Private (Moderator)
   - **Parameters**:
     - gid (string): chat ID.
   - **Output**: Updated Group

5. **Delete Group Chat**

   - **Description**: delete a group.
   - **Method**: DELETE
   - **Route**: /api/v1/groups/:gid
   - **Access**: Private (Moderator)
   - **Parameters**:
     - gid (string): chat ID.
   - **Output**: Success message

6. **Send messages**

   - **Description**: send a new message to a group.
   - **Method**: POST
   - **Route**: /api/v1/groups/:gid
   - **Access**: Private
   - **Parameters**:
     - gid (string): group ID.
   - **Output**: message

7. **Get Members**

   - **Description**: get members of a group.
   - **Method**: GET
   - **Route**: /api/v1/groups/:gid/members
   - **Access**: Private
   - **Parameters**:
     - gid (string): chat ID.
   - **Output**: members

8. **Join Request**

   - **Description**: send a join request to a group.
   - **Method**: PUT
   - **Route**: /api/v1/groups/:gid/join
   - **Access**: Private
   - **Parameters**:
     - gid (string): chat ID.
   - **Output**: Success message

9. **Confirm join Request**

   - **Description**: confirm join request to a group from a user.
   - **Method**: PUT
   - **Route**: /api/v1/groups/:gid/members/:uid
   - **Access**: Private (Moderator)
   - **Parameters**:
     - gid (string): chat ID.
     - uid (string): user ID.
   - **Output**: Success message

10. **Remove a Member **
    - **Description**: remove a member / delete join request.
    - **Method**: DELETE
    - **Route**: /api/v1/groups/:gid/members/:uid
    - **Access**: Private (Moderator)
    - **Parameters**:
    - gid (string): chat ID.
    - **Output**: Success message

## License

This project is licensed under the [MIT License](LICENSE).
