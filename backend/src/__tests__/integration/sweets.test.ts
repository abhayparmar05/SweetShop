import request from 'supertest';
import app from '../../app';
import { Sweet } from '../../models/Sweet';

describe('Sweet Integration Tests', () => {
    let userToken: string;
    let adminToken: string;
    let sweetId: string;

    beforeEach(async () => {
        // Create regular user
        const userResponse = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'user@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
            });
        userToken = userResponse.body.data?.token;

        // Create admin user
        const adminResponse = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'admin@example.com',
                password: 'password123',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
            });
        adminToken = adminResponse.body.data.token;

        // Create a test sweet
        const sweet = await Sweet.create({
            name: 'Chocolate Bar',
            category: 'chocolate',
            price: 2.99,
            quantity: 100,
        });
        sweetId = sweet._id.toString();
    });

    describe('POST /api/sweets', () => {
        it('should create a sweet with valid data', async () => {
            const sweetData = {
                name: 'Kaju Katli',
                category: 'regional-traditional',
                price: 1.99,
                quantity: 50,
            };

            const response = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`)
                .send(sweetData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(sweetData.name);
            expect(response.body.data.category).toBe(sweetData.category);
            expect(response.body.data.price).toBe(sweetData.price);
            expect(response.body.data.quantity).toBe(sweetData.quantity);
        });

        it('should fail without authentication', async () => {
            const sweetData = {
                name: 'Kaju Katli',
                category: 'regional-traditional',
                price: 1.99,
                quantity: 50,
            };

            await request(app)
                .post('/api/sweets')
                .send(sweetData)
                .expect(401);
        });

        it('should fail with invalid data', async () => {
            const sweetData = {
                name: 'G',
                category: 'invalid',
                price: -1,
                quantity: 50,
            };

            const response = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`)
                .send(sweetData)
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/sweets', () => {
        it('should get all sweets with pagination', async () => {
            const response = await request(app)
                .get('/api/sweets')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.pagination).toBeDefined();
            expect(response.body.pagination.page).toBe(1);
            expect(response.body.pagination.total).toBeGreaterThan(0);
        });

        it('should support pagination parameters', async () => {
            const response = await request(app)
                .get('/api/sweets?page=1&limit=5')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.pagination.page).toBe(1);
            expect(response.body.pagination.limit).toBe(5);
        });

        it('should fail without authentication', async () => {
            await request(app)
                .get('/api/sweets')
                .expect(401);
        });
    });

    describe('GET /api/sweets/search', () => {
        beforeEach(async () => {
            await Sweet.create([
                { name: 'Dark Chocolate', category: 'chocolate', price: 3.99, quantity: 50 },
                { name: 'Milk Chocolate', category: 'chocolate', price: 2.99, quantity: 75 },
                { name: 'Besan Ladoo', category: 'festival', price: 1.99, quantity: 100 },
            ]);
        });

        it('should search by name', async () => {
            const response = await request(app)
                .get('/api/sweets/search?name=chocolate')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
            expect(response.body.data.every((s: any) =>
                s.name.toLowerCase().includes('chocolate')
            )).toBe(true);
        });

        it('should search by category', async () => {
            const response = await request(app)
                .get('/api/sweets/search?category=festival')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.data.every((s: any) => s.category === 'festival')).toBe(true);
        });

        it('should search by price range', async () => {
            const response = await request(app)
                .get('/api/sweets/search?minPrice=2&maxPrice=3.5')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.data.every((s: any) =>
                s.price >= 2 && s.price <= 3.5
            )).toBe(true);
        });

        it('should combine multiple search criteria', async () => {
            const response = await request(app)
                .get('/api/sweets/search?category=chocolate&minPrice=3')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);

            expect(response.body.data.every((s: any) =>
                s.category === 'chocolate' && s.price >= 3
            )).toBe(true);
        });
    });

    describe('PUT /api/sweets/:id', () => {
        it('should update sweet successfully', async () => {
            const updateData = {
                name: 'Updated Chocolate',
                price: 3.99,
            };

            const response = await request(app)
                .put(`/api/sweets/${sweetId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(updateData.name);
            expect(response.body.data.price).toBe(updateData.price);
        });

        it('should fail with invalid sweet ID', async () => {
            await request(app)
                .put('/api/sweets/invalid-id')
                .set('Authorization', `Bearer ${userToken}`)
                .send({ name: 'Updated' })
                .expect(400);
        });

        it('should fail when sweet not found', async () => {
            await request(app)
                .put('/api/sweets/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${userToken}`)
                .send({ name: 'Updated' })
                .expect(404);
        });
    });

    describe('DELETE /api/sweets/:id', () => {
        it('should allow admin to delete sweet', async () => {
            const response = await request(app)
                .delete(`/api/sweets/${sweetId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toContain('deleted');

            const sweet = await Sweet.findById(sweetId);
            expect(sweet).toBeNull();
        });

        it('should deny regular user from deleting sweet', async () => {
            const response = await request(app)
                .delete(`/api/sweets/${sweetId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Admin');
        });

        it('should fail when sweet not found', async () => {
            await request(app)
                .delete('/api/sweets/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(404);
        });
    });

    describe('POST /api/sweets/:id/purchase', () => {
        it('should purchase sweet successfully', async () => {
            const response = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 10 })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.purchased).toBe(10);
            expect(response.body.data.remaining).toBe(90);
        });

        it('should fail when insufficient stock', async () => {
            const response = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 200 })
                .expect(400);

            expect(response.body.message).toContain('Insufficient stock');
        });

        it('should fail with invalid quantity', async () => {
            await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: -5 })
                .expect(400);
        });

        it('should fail without quantity', async () => {
            await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(400);
        });
    });

    describe('POST /api/sweets/:id/restock', () => {
        it('should allow admin to restock sweet', async () => {
            const response = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ quantity: 50 })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.restocked).toBe(50);
            expect(response.body.data.newQuantity).toBe(150);
        });

        it('should deny regular user from restocking', async () => {
            const response = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({ quantity: 50 })
                .expect(403);

            expect(response.body.message).toContain('Admin');
        });

        it('should fail with invalid quantity', async () => {
            await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ quantity: -10 })
                .expect(400);
        });

        it('should fail when sweet not found', async () => {
            await request(app)
                .post('/api/sweets/507f1f77bcf86cd799439011/restock')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ quantity: 50 })
                .expect(404);
        });
    });
});
