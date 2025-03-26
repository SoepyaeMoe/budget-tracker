import { Router } from "express";
import { signup, login, authUser, logout, updateUser, changePassword, deleteUser, checkPassword } from "../Controllers/auth.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/logout', authMiddleware, logout);

router.get('/user', authMiddleware, authUser);
router.put('/user', authMiddleware, updateUser);
router.post('/change-password', authMiddleware, changePassword);
router.post('/check-password', authMiddleware, checkPassword);
router.delete('/delete-user', authMiddleware, deleteUser);
export default router;