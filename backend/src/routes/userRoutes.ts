import { Router } from "express";
import { createUser, deleteUser, findUserById, findUsers, updateUser } from "../controllers/userController";
import { loginUser, registerUser } from "../controllers/auth/authControllers";
import { verifyToken } from "../middleware/auth";

const router = Router();

// Authentication Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// User Routes
router.get('/users', verifyToken, findUsers);
router.get('/users/:id', verifyToken, findUserById);
router.post('/users', verifyToken, createUser);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;
