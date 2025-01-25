import { Router } from "express";
import { createUser, deleteUser, updatePassword, login } from "../controllers/userController";

const router = Router();

router.post('/', createUser);
router.post('/login', login);
router.put('/:id', updatePassword);
router.delete('/:id', deleteUser);

export default router;