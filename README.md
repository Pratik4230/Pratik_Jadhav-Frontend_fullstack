# Frontend Setup Guide

This guide provides clear instructions for setting up and running the React frontend application locally.

## Prerequisites

Before setting up the application, ensure you have the following installed:

- **Node.js**
- **npm**
- **Git**

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/Pratik4230/Pratik_Jadhav-Frontend_fullstack.git
```

### 2. Navigate to the Project Directory

Move into the project folder:

```bash
cd Pratik_Jadhav-Frontend_fullstack
```

### 3. Install Dependencies

Install all required packages using npm or yarn:

```bash
npm install
```

### 4. Create a `.env` File

Create a `.env` file in the root of the project and add the required environment variables. Below is an example of variables you might need:

```env
VITE_BACKEND_URL=http://localhost:3030
```

### 5. Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will start running on `http://localhost:5173` by default. Open this URL in your browser to access the app.

## Available Scripts

- `npm run dev` : Starts the development server.
- `npm run build` : Builds the application for production.

## Additional Notes

- If you encounter issues, make sure all dependencies are installed and the `.env` file is correctly configured.
