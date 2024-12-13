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

## ScreenShots
![Screenshot 2024-12-13 193140](https://github.com/user-attachments/assets/9c14f044-8225-4a28-b6a6-b4b5ed1c1892)
![Screenshot 2024-12-13 193128](https://github.com/user-attachments/assets/54ee711a-0702-48d1-b451-43bd3036556c)
![Screenshot 2024-12-13 193112](https://github.com/user-attachments/assets/8b2aa5bc-9e1d-414a-8a30-41ab3f3062d3)

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

