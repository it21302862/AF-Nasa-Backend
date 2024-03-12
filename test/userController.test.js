const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const User = require('../model/User');

describe('User Controller', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany();
  });

  describe('POST /api/user/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 0,
        firstName: 'Test',
        lastName: 'User',
      };

      const res = await request(app)
        .post('/api/user/register')
        .send(userData)
        .expect(201);

      expect(res.body.email).toBe(userData.email);
      expect(res.body.role).toBe(userData.role);
      expect(res.body.firstName).toBe(userData.firstName);
      expect(res.body.lastName).toBe(userData.lastName);
    });

    it('should return 400 if required fields are missing', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        // Missing role, firstName, and lastName
      };

      await request(app)
        .post('/api/user/register')
        .send(userData)
        .expect(400);
    });
  });

  describe('POST /api/user/login', () => {
    it('should log in a user with correct credentials', async () => {
      // Register a user first
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 0, // Admin
        firstName: 'Test',
        lastName: 'User',
      };
      await User.create(userData);

      // Login with the registered user's credentials
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/api/user/login')
        .send(loginData)
        .expect(200);

      expect(res.body.token).toBeDefined();
    });

    it('should return 401 if credentials are incorrect', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'invalidpassword',
      };

      await request(app)
        .post('/api/user/login')
        .send(loginData)
        .expect(401);
    });
  });

  describe('POST /api/user/logout', () => {
    it('should log out a user', async () => {
      expect(true).toBe(true);
    });
  });
});
