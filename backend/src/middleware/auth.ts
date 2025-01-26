import { UserRepository } from "../repositories/userRepositories";
import { UserService } from "../services/userService";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository, IUserService, User } from "../types/UserTypes";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.replace(/Bearer\s+/, '') as string;

    try {
        const verify = jwt.verify(token, jwtSecret) as User;

        const getUser = await userService.findUserById(verify.id);
        if(!getUser) {
            res.status(400).json({message: "Invalid token"});
            return;
        }

        res.locals.user = getUser;
        next();
    } catch (error: any) {
        console.log("error :>> ", error);
        res.status(401).json(error.message);
    }
};