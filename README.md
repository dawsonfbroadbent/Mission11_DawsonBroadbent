# Mission 11 - Online Bookstore

This is a full-stack web application for an online bookstore, built with ASP.NET Core API for the backend and React (using Vite) for the frontend. The app allows users to view a list of books with pagination, adjustable results per page, and sorting by title.

## Features

- **Book Listing**: Displays books with details including title, author, publisher, ISBN, classification, number of pages, and price.
- **Pagination**: Shows 5 books per page by default, with options to change the number of results per page.
- **Sorting**: Sort books by title.
- **Responsive Design**: Styled with Bootstrap for a clean, responsive UI.

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (version 8.0 or later)
- [Node.js](https://nodejs.org/) (version 16 or later)
- A database (e.g., SQL Server, SQLite) configured in the backend

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dawsonfbroadbent/Mission11_DawsonBroadbent.git
   cd Mission11_DawsonBroadbent
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend/Mission11.API
     ```
   - Restore .NET dependencies:
     ```bash
     dotnet restore
     ```
   - Update the database connection string in `appsettings.json` if necessary.
   - Run the backend API:
     ```bash
     dotnet run
     ```
     The API will be available at `https://localhost:5001` (or as configured in `launchSettings.json`).

3. **Frontend Setup**:
   - Open a new terminal and navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
     The frontend will be available at `http://localhost:5173` (or as configured).

4. **Access the Application**:
   - Open your browser and go to the frontend URL (e.g., `http://localhost:5173`).
   - The app will fetch data from the backend API.

## Project Structure

- `backend/`: ASP.NET Core API project
  - `Mission11.API/`: Main API application with controllers, models, and database context
- `frontend/`: React application using Vite
  - `src/`: Source code including components and styles
- `docs/`: Documentation files

## Technologies Used

- **Backend**: ASP.NET Core, Entity Framework Core
- **Frontend**: React, TypeScript, Vite, Bootstrap
- **Database**: Configurable (e.g., SQL Server)</content>
<parameter name="filePath">/Users/dawsonb/Documents/School/IS 413 - Hilton/Mission11/README.md