import { UserRepository } from "../../repositories/userRepositories";
import { UserService } from "../../services/userService";
import { Request, Response } from "express";
import { IUserRepository, IUserService, User } from "../../types/UserTypes";
import jwt from "jsonwebtoken";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email }: User = req.body;
        const userExists = await userService.findUserByEmail(email);
        if(userExists) {
            res.status(400).json({message: "Email already exists"});
            return;
        }
        const newUser: User = req.body;
        res.status(201).json(newUser);
    } catch (error: any) {
        console.log("error :>> ", error);
        res.status(500).json(error.message);
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const jwtSecret = process.env.JWT_SECRET as string;
    try {
        const { email, password }: User = req.body;

        const user = await userService.findUserByEmail(email);
        if(!user) {
            res.status(400).json({message: "Invalid user or password"});
            return;
        }

        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword) {
            res.status(400).json({message: "Invalid user or password"});
            return;
        }

        const token = jwt.sign({id: user._id, email: user.email, username: user.username}, jwtSecret, {expiresIn: '1h'});
        res.json({token});
    } catch (error: any) {
        console.log("error :>> ", error);
        res.status(500).json(error.message);
    }
};