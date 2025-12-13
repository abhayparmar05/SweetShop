import { describe, it, expect } from 'vitest';
import {
    validateName,
    validatePrice,
    validateQuantity,
    validateEmail,
    validatePassword,
    isValid
} from '../validation.utils';

describe('validation.utils', () => {
    describe('validateName', () => {
        it('should return error for empty name', () => {
            expect(validateName('')).toBe('Name is required');
            expect(validateName('  ')).toBe('Name is required');
        });

        it('should return error for name shorter than minimum length', () => {
            expect(validateName('a')).toContain('at least 2 characters');
            expect(validateName('ab', 3)).toContain('at least 3 characters');
        });

        it('should return empty string for valid name', () => {
            expect(validateName('John')).toBe('');
            expect(validateName('Abc', 2)).toBe('');
        });
    });

    describe('validatePrice', () => {
        it('should return error for invalid number', () => {
            expect(validatePrice('abc')).toBe('Price must be a valid number');
            expect(validatePrice(NaN)).toBe('Price must be a valid number');
        });

        it('should return error for price below minimum', () => {
            expect(validatePrice(-1)).toContain('at least 0');
            expect(validatePrice('5', 10)).toContain('at least 10');
        });

        it('should return empty string for valid price', () => {
            expect(validatePrice('100')).toBe('');
            expect(validatePrice(50)).toBe('');
            expect(validatePrice('0', 0)).toBe('');
        });
    });

    describe('validateQuantity', () => {
        it('should return error for invalid number', () => {
            expect(validateQuantity('abc')).toBe('Quantity must be a valid number');
        });

        it('should return error for non-integer', () => {
            expect(validateQuantity('10.5')).toBe('Quantity must be a whole number');
            expect(validateQuantity(10.5)).toBe('Quantity must be a whole number');
        });

        it('should return error for quantity below minimum', () => {
            expect(validateQuantity(-1)).toContain('at least 0');
            expect(validateQuantity('5', 10)).toContain('at least 10');
        });

        it('should return empty string for valid quantity', () => {
            expect(validateQuantity('10')).toBe('');
            expect(validateQuantity(5)).toBe('');
            expect(validateQuantity('0', 0)).toBe('');
        });
    });

    describe('validateEmail', () => {
        it('should return error for empty email', () => {
            expect(validateEmail('')).toBe('Email is required');
            expect(validateEmail('  ')).toBe('Email is required');
        });

        it('should return error for invalid email format', () => {
            expect(validateEmail('invalid')).toBe('Please enter a valid email address');
            expect(validateEmail('test@')).toBe('Please enter a valid email address');
            expect(validateEmail('@example.com')).toBe('Please enter a valid email address');
            expect(validateEmail('test@.com')).toBe('Please enter a valid email address');
        });

        it('should return empty string for valid email', () => {
            expect(validateEmail('test@example.com')).toBe('');
            expect(validateEmail('user.name@domain.co.uk')).toBe('');
        });
    });

    describe('validatePassword', () => {
        it('should return error for empty password', () => {
            expect(validatePassword('')).toBe('Password is required');
        });

        it('should return error for password shorter than minimum', () => {
            expect(validatePassword('123')).toContain('at least 6 characters');
            expect(validatePassword('abc', 8)).toContain('at least 8 characters');
        });

        it('should return empty string for valid password', () => {
            expect(validatePassword('password123')).toBe('');
            expect(validatePassword('123456')).toBe('');
        });
    });

    describe('isValid', () => {
        it('should return true when no errors', () => {
            expect(isValid({})).toBe(true);
            expect(isValid({ name: '', email: '' })).toBe(true);
        });

        it('should return false when errors exist', () => {
            expect(isValid({ name: 'Name is required' })).toBe(false);
            expect(isValid({ name: '', email: 'Invalid email' })).toBe(false);
        });
    });
});
