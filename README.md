# Budget Tracker

This is a simple budget tracker application built with Node.js, Express, MongoDB, and React.

## Demo Link
https://budget-tracker-8820.onrender.com/

## Features

* User authentication with JWT
* User can create, read, update, and delete transactions
* User can view total balance, income, and expenses
* User can filter transactions by category
* User can sort transactions by date

## Development
#### Clone the repository
```
git clone https://github.com/SoepyaeMoe/budget-tracker.git
```
#### Install dependencies for backend
```
cd budget-tracker
npm install
```

#### Install dependencies for frontend
```
cd frontend
npm install
```

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```
PORT=3000
MONGO_URL = 'mongodb+srv://username:password@cluster0.u6avi.mongodb.net/budget_tracker?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECRET = 'add your secret'
NODE_ENV = 'development'
```

#### Run backend development server
##### In main directory run the following command
```
npm run dev
```
> ⚠ Then, the development server will be started at http://127.0.0.1:3000/

#### Run the frontend development server
Open another terminal and change directory to frontend folder and run the following command
```
npm run dev
```
> ⚠ Then, the development server will be started at http://127.0.0.1:5173/ and open in browser


