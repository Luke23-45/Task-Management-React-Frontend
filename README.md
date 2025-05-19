# Task Management React Frontend

A responsive frontend application for managing user tasks, built with React and consuming a separate backend API.

## Features

* **User Authentication:**
    * User Registration
    * User Login
    * Secure JWT (JSON Web Token) handling
    * Automatic Token Refresh using Axios Interceptors
    * Session Persistence using Local Storage
    * Protected Routes for authenticated users
    * User Logout
* **Task Management (CRUD):**
    * Create new tasks
    * View a list of all tasks
    * View detailed information for a single task
    * Update existing tasks
    * Delete tasks
* **Advanced Task Listing:**
    * Filter tasks by status
    * Search tasks by keywords (title, description)
    * Order tasks by various fields (creation date, title, status, etc.)
    * Pagination for navigating through large lists of tasks
* **Modern UI:**
    * Styled components for aesthetic and organized styling.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **Redux Toolkit:** Efficient state management for React applications.
* **TanStack Query (React Query):** Powerful data fetching, caching, and state management for asynchronous data.
* **Axios:** Promise-based HTTP client for making API requests.
* **React Router DOM:** Declarative routing for React.
* **Styled Components:** Library for writing component-level styles using tagged template literals.
* **TypeScript:** Superset of JavaScript that adds static typing.

## API

This frontend application is designed to work with a separate backend API. It is configured to communicate with API endpoints for authentication and task management as discussed during development.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Luke23-45/Task-Management-React-Frontend.git
    cd task-management-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
