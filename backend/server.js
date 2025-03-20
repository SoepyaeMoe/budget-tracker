import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/connectMongoDb.js';
import authMiddleware from './Middleware/auth.middleware.js';
import authRouter from './Routes/auth.route.js';
import incomeRouter from './Routes/income.route.js';
import expenseRouter from './Routes/expense.route.js';
import path from 'path';

const __dirname = path.resolve();

dotenv.config();
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use('/api/auth', authRouter);
app.use('/api/income', authMiddleware, incomeRouter);
app.use('/api/expense', authMiddleware, expenseRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    connectMongoDB();
});