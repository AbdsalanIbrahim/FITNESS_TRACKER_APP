Fitness Tracker App - README

Overview

The Fitness Tracker App is a full-stack web application designed to help users log exercises, track fitness goals, and manage their progress over time. The app is built with a React frontend and a Flask backend, using SQLite as the database. Users can add, view, and track their exercises, while the backend manages authentication, data storage, and retrieval. The project follows a structured directory layout, with separate folders for the client-side React app (client/) and the server-side Flask API (server/).

Project Structure

The project is organized into the following directories and files:

○ client/: Contains the React frontend, including src/ for components and public/ for static assets.

○ server/: Houses the Flask backend, including app.py for app setup, models.py for database models, config.py for 

○ configuration settings, and seed.py for initial database seeding.

○ instance/: Stores the SQLite database file.

○ migrations/: Contains database migration scripts managed by Flask-Migrate.

○ Pipfile & Pipfile.lock: Define Python dependencies using Pipenv.

○ package.json: Manages JavaScript dependencies for the frontend.

○ .gitignore: Ensures unnecessary files are not tracked in Git.

○ LICENSE.md & CONTRIBUTING.md: Provide guidelines for contribution and legal information.

○ README.md: This file, containing setup instructions and project details.

Technologies Used

Frontend (Client)

○ React (react, react-dom, react-router-dom)

○ State management with React Hooks

○ Fetch API for backend communication

Backend (Server)

○ Flask (flask, flask-restful, flask-migrate, flask-cors, flask-sqlalchemy)

○ SQLite database

○ JWT authentication with jwt-decode

Deployment

The Fitness Tracker App is deployed using Render for the backend. The latest deployment can be accessed [here](https://dashboard.render.com/web/srv-cug6fshopnds73blgeag/deploys/dep-cug6g19opnds73blggig?r=2025-02-03%4006%3A52%3A57%7E2025-02-03%4006%3A58%3A26).

To deploy the frontend, you can use Netlify or Vercel, ensuring the API endpoint is correctly set in the React app (proxy in package.json or .env variables).

Contributing

Contributions are welcome! Please refer to CONTRIBUTING.md for guidelines on how to contribute to this project.
