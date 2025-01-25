import {Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User";
import dotenv from 'dotenv';

//Load environment variables
dotenv.config();

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const {username, email, password}  = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({email});

      if(existingUser) {
        res.status(400).json({message: "User already created"});
        return;
      }
      const newUser = new User({username, email, hashedPassword});
      await newUser.save();
      res.status(201).json({message: "User created successfully"});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

// Function to validate request body
const validateLoginInput = (email: string, password: string): boolean => {
    if(!email || !password) {
        return false;
    }
    return true;
};

// function to find user by email
const findUserByEmail = async(email: string) => {
    return await User.findOne({ email });
};

const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

// Function to generate token
export const generateToken = (userId: string): string => {
    return jwt.sign({userId}, secretKey, {expiresIn: '1h'});
};


// Login function
export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    if(!validateLoginInput(email, password)) {
        res.status(400).json({message: "Invalid input"});
        return;
    };

    try {
        const user = await findUserByEmail(email);
        if(!user) {
            res.status(404).json({message: 'User not found'});
        } else {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                res.status(401).json({message: 'Incorrect password'});
            }
            
            const token = generateToken(user.id);
            res.status(200).json({message: 'Login successfully', token});  
        }

    } catch (error) {
        res.status(500).json({message: 'Error to sign up', error: (error as Error).message})
    }
}

export const updatePassword = async (req: Request, res: Response):Promise<void> => {
    try {
        const updatePassword = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true},
        );
        if(!updatePassword) {
            res.status(404).json({error: "User not found"});
        } else {
            res.status(200).json({
                message: "Password update successfully",
                user: updatePassword,
            });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) {
            res.status(404).json({error: "User not found"});
        } else {
            res.status(200).json({
                message: "User deleted successfully",
                user: deletedUser,
            });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message: 'An unexpected error ocurred';
        res.status(500).json({error: errorMessage});
    }
}