import { User, IUser } from '../models/User';
import { AppError } from '../middleware/errorHandler';

export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'user' | 'admin';
}

class UserService {
    /**
     * Get all users (admin only)
     */
    async getAllUsers(): Promise<IUser[]> {
        const users = await User.find().select('-password -refreshToken').sort({ createdAt: -1 });
        return users;
    }

    /**
     * Get user by ID
     */
    async getUserById(userId: string): Promise<IUser> {
        const user = await User.findById(userId).select('-password -refreshToken');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    /**
     * Update user
     */
    async updateUser(userId: string, data: UpdateUserData): Promise<IUser> {
        const { firstName, lastName, email, role } = data;

        // Check if email is being changed and if it's already taken
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                throw new AppError('Email is already in use', 400);
            }
        }

        // Build update object
        const updateData: any = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role;

        // Update user
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -refreshToken');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    /**
     * Delete user
     */
    async deleteUser(userId: string): Promise<void> {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }
    }

    /**
     * Get user count by role
     */
    async getUserStats(): Promise<{ total: number; admins: number; users: number }> {
        const total = await User.countDocuments();
        const admins = await User.countDocuments({ role: 'admin' });
        const users = await User.countDocuments({ role: 'user' });

        return { total, admins, users };
    }
}

export default new UserService();
