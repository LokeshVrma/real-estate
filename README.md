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
    MONGO_DB_URI = mongodb+srv://lokesh:7uDzTrK88NcMyHfU@cluster0.8kkzv5u.mongodb.net/realestate
    JWT_SECRET = 553f718beb3c17b97cbabe40672e0003601776f6cf0e02726f3951db3fcce88132ffd3ceb08e3c66070dc57f3364d3b323c04719b1c9a2416abd773a7dd896cbc16ffd507a0c052046381c813fd262d94371d6d6866969a88465c7c297222b9e9b359bc1ffa32df881d45bb9d59abd204a2a0136117620c6b2310d259a37183296b90da2d0dc88a0f9ea3ef101d903d1743b0d58509be189aa0b9319744743ffa5a9039762b952b3ee478cbbddb2cd26ba163bf9a85c518b5bf484807b509d6674945f86f04e7568b4796516c15c49b063efbf4dff6d3019add7ffbbfcdcac804da407e4e4753402b99e235de15c5a577e78f331c0fb490e1aabb44c730078b9
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

