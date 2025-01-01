import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export class UserController {
  // Get all users
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  // Get user by ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  }

  // Create new user
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  }

  // Update user
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error });
    }
  }

  // Delete user
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }

  // Login user
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }
      // Compare passwords using bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Generate JWT token
      const token = generateToken({
        userId: user._id?.toString() ?? "", // Convert ObjectId to string, handle potential undefined
        email: user.email,
      });

      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }
}
