# Legal Expert System

This project is a web-based legal expert system designed to provide users with automated legal advice through a simple and intuitive chat interface.

## Project Structure

The project is divided into two main parts:

-   `frontend/`: A React-based user interface that provides the chat functionality.
-   `backend/`: A Python-based server that contains the core legal expert system logic and serves the API.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Node.js](httpss://nodejs.org/) (which includes npm)
-   [Python](httpss://www.python.org/) (version 3.x is recommended)
-   pip (Python package installer)

## Setup and Installation

Follow these steps to get the project up and running on your local machine.



1.  **Set up the Backend:**

    -   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    -   (Recommended) Create and activate a virtual environment:
        ```bash
        python -m venv venv
        source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
        ```
    -   Install the required Python packages:
        ```bash
        pip install -r requirements.txt
        ```

2.  **Set up the Frontend:**

    -   Navigate to the frontend directory from the project root:
        ```bash
        cd ../frontend
        ```
    -   Install the required npm packages:
        ```bash
        npm install

        ```

## Running the Application

You will need to run both the backend and frontend servers simultaneously in two separate terminal windows.

1.  **Start the Backend Server:**

    -   In your first terminal, navigate to the `backend` directory and run:
        ```bash
        python api_server.py
        ```
    -   The server should now be running, typically on `http://127.0.0.1:5000`.

2.  **Start the Frontend Development Server:**

    -   In your second terminal, navigate to the `frontend` directory and run:
        ```bash
        npm start
        ```
    -   This will open a new browser tab with the application running at `http://localhost:3000`.

## Usage

Once both servers are running, you can interact with the legal chatbot through the web interface at `http://localhost:3000`. Type your legal questions into the chatbox to receive guidance from the expert system.
