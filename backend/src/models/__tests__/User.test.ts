import { User } from '../../models/User';

describe('User Model', () => {
    describe('User Creation', () => {
        it('should create a user with valid data', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
                role: 'user',
            };

            const user = await User.create(userData);

            expect(user.email).toBe(userData.email);
            expect(user.role).toBe('user');
            expect(user.password).not.toBe(userData.password); // Password should be hashed
            expect(user.createdAt).toBeDefined();
        });

        it('should set default role to user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);

            expect(user.role).toBe('user');
        });

        it('should create admin user when role is specified', async () => {
            const userData = {
                email: 'admin@example.com',
                password: 'password123',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
            };

            const user = await User.create(userData);

            expect(user.role).toBe('admin');
        });
    });

    describe('User Validation', () => {
        it('should fail without email', async () => {
            const userData = {
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should fail without password', async () => {
            const userData = {
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should fail with invalid email format', async () => {
            const userData = {
                email: 'invalid-email',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should fail with password less than 6 characters', async () => {
            const userData = {
                email: 'test@example.com',
                password: '12345',
                firstName: 'Test',
                lastName: 'User',
            };

            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should fail with duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            await User.create(userData);
            await expect(User.create(userData)).rejects.toThrow();
        });

        it('should convert email to lowercase', async () => {
            const userData = {
                email: 'TEST@EXAMPLE.COM',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);

            expect(user.email).toBe('test@example.com');
        });
    });

    describe('Password Hashing', () => {
        it('should hash password before saving', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);

            expect(user.password).not.toBe(userData.password);
            expect(user.password.length).toBeGreaterThan(20);
        });

        it('should not rehash password if not modified', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);
            const originalHash = user.password;

            user.email = 'newemail@example.com';
            await user.save();

            expect(user.password).toBe(originalHash);
        });
    });

    describe('Password Comparison', () => {
        it('should return true for correct password', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);
            const userWithPassword = await User.findById(user._id).select('+password');

            const isMatch = await userWithPassword!.comparePassword('password123');

            expect(isMatch).toBe(true);
        });

        it('should return false for incorrect password', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            };

            const user = await User.create(userData);
            const userWithPassword = await User.findById(user._id).select('+password');

            const isMatch = await userWithPassword!.comparePassword('wrongpassword');

            expect(isMatch).toBe(false);
        });
    });
});
