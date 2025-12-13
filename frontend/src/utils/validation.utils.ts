/**
 * Common validation utilities for form inputs
 * Following DRY principles to avoid duplicate validation logic
 */

/**
 * Validates a name field
 * @param name - The name to validate
 * @param minLength - Minimum required length (default: 2)
 * @returns Error message if invalid, empty string if valid
 */
export function validateName(name: string, minLength: number = 2): string {
    if (!name || name.trim().length === 0) {
        return 'Name is required';
    }
    if (name.trim().length < minLength) {
        return `Name must be at least ${minLength} characters`;
    }
    return '';
}

/**
 * Validates a price input
 * @param price - The price value (as string or number)
 * @param min - Minimum allowed price (default: 0)
 * @returns Error message if invalid, empty string if valid
 */
export function validatePrice(price: string | number, min: number = 0): string {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numericPrice)) {
        return 'Price must be a valid number';
    }
    if (numericPrice < min) {
        return `Price must be at least ${min}`;
    }
    return '';
}

/**
 * Validates a quantity input
 * @param quantity - The quantity value (as string or number)
 * @param min - Minimum allowed quantity (default: 0)
 * @returns Error message if invalid, empty string if valid
 */
export function validateQuantity(quantity: string | number, min: number = 0): string {
    const numericQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

    if (isNaN(numericQuantity)) {
        return 'Quantity must be a valid number';
    }
    if (!Number.isInteger(numericQuantity)) {
        return 'Quantity must be a whole number';
    }
    if (numericQuantity < min) {
        return `Quantity must be at least ${min}`;
    }
    return '';
}

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns Error message if invalid, empty string if valid
 */
export function validateEmail(email: string): string {
    if (!email || email.trim().length === 0) {
        return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    return '';
}

/**
 * Validates a password
 * @param password - The password to validate
 * @param minLength - Minimum required length (default: 6)
 * @returns Error message if invalid, empty string if valid
 */
export function validatePassword(password: string, minLength: number = 6): string {
    if (!password || password.length === 0) {
        return 'Password is required';
    }
    if (password.length < minLength) {
        return `Password must be at least ${minLength} characters`;
    }
    return '';
}

/**
 * Checks if a form has any validation errors
 * @param errors - Record of field names to error messages
 * @returns True if no errors exist, false otherwise
 */
export function isValid(errors: Record<string, string>): boolean {
    return Object.values(errors).every(error => error === '');
}
