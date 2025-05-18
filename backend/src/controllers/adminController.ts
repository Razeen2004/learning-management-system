// src/controllers/authController.ts
import { Request, Response } from 'express'
import prisma from '../utils/prisma';
import SendMail, { SendRecoveryMail } from '../utils/mail';

// Get all users from the database
export const getUsers = async (req: Request, res: Response) => {
    try{
        const admin = req.body.user;

        const checkUser = await prisma.user.findUnique(
            {where: {
                id: admin.id,
                role: admin.role
            }}
        )
        if(!checkUser) return res.status(401).json({ message: 'Unauthorized' });

        const users = await prisma.user.findMany({
            where:{},
            select:{
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
            }
        })
        if(!users) return res.status(404).json({ message: 'No users found' });

        res.status(200).json(users);

    }catch(error :any){
        res.status(400).json({ error: error.message });
    }
}

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const admin = req.body.user; // Make sure this is added by secure auth middleware
    const { id, role } = req.body;

    // Only allow admins to change roles
    if (admin.role !== "ADMIN") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate new role
    const validRoles = ["ADMIN", "TEACHER", "STUDENT"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
    try{
        const admin = req.body.user; // Make sure this is added by secure auth middleware
        const { id } = req.body;

        // Only allow admins to delete users
        if (admin.role !== "ADMIN") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user
        await prisma.user.delete({
            where: { id },
        });

        return res.status(200).json({ message: "User deleted successfully" });
    }catch(error : any){
        res.status(400).json({ error: error.message });
    }
}
