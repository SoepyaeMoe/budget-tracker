import { Router } from "express";
import { signup, login, authUser, logout } from "../Controllers/auth.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/user', authMiddleware, authUser);
router.post('/logout', authMiddleware, logout);
export default router;