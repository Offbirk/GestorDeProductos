import { Router } from "express";
import { createUser, deleteUser, findUserById, findUsers, updateUser } from "../controllers/userController";
import { loginUser, registerUser } from "../controllers/auth/authControllers";
import { verifyToken } from "../middleware/auth";

const router = Router();

// Authentication Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// User Routes
router.get('/', verifyToken, findUsers);
router.get('/:id', verifyToken, findUserById);
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
