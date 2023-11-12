# Node.js User Management and Chat App

This project is a Node.js application that includes user management features and a chat application. The user management system allows you to perform CRUD operations on user data, while the chat functionality enables real-time communication between users.

## Features

### User Management

1. **Add a New User:**
   - Route: `POST /user/addUser`
   - Description: Add a new user to the database.
   - Request Body:
     - `firstName` (string): First name of the user.
     - `lastName` (string): Last name of the user.
     - `age` (number): Age of the user.
     - `city` (string): City of the user.
     - `designation` (string): Designation of the user.
   - Response:
     - Status: `201 Created`
     - JSON object containing the newly added user.

2. **Update User:**
   - Route: `PUT /user/updateUser`
   - Description: Update the details of a user by their ID.
   - Request Body:
     - `userId` (string): ID of the user to update.
     - `firstName` (string): Updated first name.
     - `lastName` (string): Updated last name.
     - `age` (number): Updated age.
     - `city` (string): Updated city.
     - `designation` (string): Updated designation.
   - Response:
     - Status: `200 OK` if the user is updated.
     - Status: `404 Not Found` if the user with the specified ID does not exist.
     - JSON object containing the updated user details.

3. **Get User by ID:**
   - Route: `GET /user/getUser/:userId`
   - Description: Retrieve details of a specific user by their ID.
   - URL Parameters:
     - `userId` (string): ID of the user to retrieve.
   - Response:
     - Status: `200 OK` if the user is found.
     - Status: `404 Not Found` if the user with the specified ID does not exist.
     - JSON object containing user details.

4. **List All Users:**
   - Route: `GET /user/getAllUsers`
   - Description: Retrieve a list of all users in the database.
   - Response:
     - Status: `200 OK`
     - JSON array containing all users.

5. **Delete User:**
   - Route: `DELETE /user/deleteUser/:userId`
   - Description: Delete a user by their ID.
   - URL Parameters:
     - `userId` (string): ID of the user to delete.
   - Response:
     - Status: `200 No Content` if the user is successfully deleted.
     - Status: `404 Not Found` if the user with the specified ID does not exist.

### Chat Application

After running the application locally, open the link [http://localhost:4000/](http://localhost:4000/) in your web browser to access the chat application.

## Local Setup

To set up and run the application locally, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using the following command: `npm install`

3. Start the server: `npm start`

4. The API will be accessible at `http://localhost:4000`. The chat application will be available at [http://localhost:4000/](http://localhost:4000/).

5. You can make HTTP requests to the defined API endpoints using your preferred API client or tools like Postman.

## Dependencies

- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/)
