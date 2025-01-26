import {Request, Response } from "express";
import { IUserRepository, IUserService, User } from "../types/UserTypes";
import { UserRepository } from "../repositories/userRepositories";
import { UserService } from "../services/userService";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (_req: Request, res: Response):Promise<void> => {
    try {
        const users = await userService.findUsers();
        if(users.length === 0) {
            res.status(404).json({message: "Users not found"});
            return;
        }

        res.json(users);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};

export const findUserById = async (req: Request, res: Response):Promise<void> =>{
    try {
        const user = await userService.findUserById(req.params.id);
        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        res.json(user);
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser: User = req.body;
        const result = await userService.createUser(newUser);
        
        res.status(201).json({message: "User created successfully", result: result});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);

        if(!user) res.status(404).json({error: "User not found"});
        
        res.status(200).json({message: "User updated successfully", user});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);

        if(!user) res.status(404).json({error: "User not found"});
        
        res.status(200).json({message: "User deleted successfully", user});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
}