# Realestate

Realestate is a web application to rent properties online.

## Features

- User Registration and Authentication
- View Properties
- Reccommend Properties

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Running online
1. **Go to website**
    Url: https://real-estate-s334.onrender.com/

2. **To login click on login and enter this data**
    - **email**: admin@gmail.com
    - **password**: admin123

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Git installed

### Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/LokeshVrma/real-estate.git
    cd server
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory and add the following variables:
    ```env
    PORT = 5000
    MONGO_DB_URI = your monogo db url
    JWT_SECRET = random secret
    ```

4. **Run the backend server**:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/LokeshVrma/real-estate.git
    cd client
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the frontend development server**:
    ```sh
    npm run dev
    ```

