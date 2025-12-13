import { Sweet } from '../../models/Sweet';

describe('Sweet Model', () => {
    describe('Sweet Creation', () => {
        it('should create a sweet with valid data', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            };

            const sweet = await Sweet.create(sweetData);

            expect(sweet.name).toBe(sweetData.name);
            expect(sweet.category).toBe(sweetData.category);
            expect(sweet.price).toBe(sweetData.price);
            expect(sweet.quantity).toBe(sweetData.quantity);
            expect(sweet.createdAt).toBeDefined();
            expect(sweet.updatedAt).toBeDefined();
        });

        it('should set default quantity to 0', async () => {
            const sweetData = {
                name: 'Kaju Katli',
                category: 'festival',
                price: 1.99,
            };

            const sweet = await Sweet.create(sweetData);

            expect(sweet.quantity).toBe(0);
        });
    });

    describe('Sweet Validation', () => {
        it('should fail without name', async () => {
            const sweetData = {
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail without category', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                price: 2.99,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail without price', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'chocolate',
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail with name less than 2 characters', async () => {
            const sweetData = {
                name: 'C',
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail with name more than 100 characters', async () => {
            const sweetData = {
                name: 'A'.repeat(101),
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail with invalid category', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'invalid-category',
                price: 2.99,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should accept valid categories', async () => {
            const categories = ['chocolate', 'swiss-western', 'festival', 'premium-dry-fruit', 'regional-traditional'];

            for (const category of categories) {
                const sweet = await Sweet.create({
                    name: `Test ${category}`,
                    category,
                    price: 1.99,
                    quantity: 10,
                });

                expect(sweet.category).toBe(category);
            }
        });

        it('should fail with negative price', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'chocolate',
                price: -1,
                quantity: 100,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail with negative quantity', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'chocolate',
                price: 2.99,
                quantity: -10,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should fail with non-integer quantity', async () => {
            const sweetData = {
                name: 'Chocolate Bar',
                category: 'chocolate',
                price: 2.99,
                quantity: 10.5,
            };

            await expect(Sweet.create(sweetData)).rejects.toThrow();
        });

        it('should accept price of 0', async () => {
            const sweetData = {
                name: 'Free Sample',
                category: 'festival',
                price: 0,
                quantity: 100,
            };

            const sweet = await Sweet.create(sweetData);

            expect(sweet.price).toBe(0);
        });

        it('should trim whitespace from name', async () => {
            const sweetData = {
                name: '  Chocolate Bar  ',
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            };

            const sweet = await Sweet.create(sweetData);

            expect(sweet.name).toBe('Chocolate Bar');
        });
    });

    describe('Sweet Updates', () => {
        it('should update updatedAt timestamp on save', async () => {
            const sweet = await Sweet.create({
                name: 'Chocolate Bar',
                category: 'chocolate',
                price: 2.99,
                quantity: 100,
            });

            const originalUpdatedAt = sweet.updatedAt;

            // Wait a bit to ensure timestamp difference
            await new Promise((resolve) => setTimeout(resolve, 10));

            sweet.price = 3.99;
            await sweet.save();

            expect(sweet.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
        });
    });
});
