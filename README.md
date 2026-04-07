# Gym-Tracker

## Project Description

Gym Tracker is a personal full-stack project built out of interest and inspired by a workout-tracking app I use on my phone. I wanted to recreate the experience myself while learning more about modern application development and backend architecture. This project uses a .NET backend, a Vite + React frontend, and uses PostgreSQL as the database. Styling is currently minimal and generic, as the main focus is on functionality, structure, and understanding the full development workflow. You can run everything manually or use Docker, which is the easiest way to get the application running.

## Project setup

If running manually make sure you have the following: 
- .NET (version 9.0)
- Node.js
- npm or yarn
- PostgreSQL

If you prefer not to install .NET, Node, or PostgreSQL manually, you can run the entire stack using Docker.

1. Make sure Docker Engine is running.

2. Run the project:
   ```docker compose up --build```
   
After starting, you can access the app at the URL provided by Docker

### To setup manually:

For the backend setup:
1. Navigate to the backend folder
   
2. Restore dependencies:
  ```dotnet restore```

3. Create a PostgreSQL database (or use an existing one)
   
4.  Update your database connection string in appsettings.json
   
5. Run the backend:
```dotnet run```

Frontend Setup:
1. Navigate to the frontend folder
2. Install dependencies:
   ```npm install```
3. Create a .env file in the frontend root
This file must point your React app to the backend API:
Example: VITE_API_URL=https://localhost:5001 (Adjust the port if your backend is running on a different one.)

4. Start the frontend:
```npm run dev```

