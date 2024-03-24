const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../server'); // Assuming your Express app is exported from 'app.js'

// Import your User model if necessary
const User = require('../../model/UserModel');

// let server;

// beforeAll(async () => {
//   // Connect to the test database
//   await mongoose.connect(process.env.TEST_MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   // Start the server before running tests and assign it to the server variable
//   server = app.listen(3000); // Listen on a different port for testing
// });

// afterAll(async () => {
//   // Disconnect from the test database
//   await mongoose.disconnect();

//   // Close the server after all tests are done
//   if (server) {
//     server.close();
//   }
// });

describe('Integration Tests', () => {
  describe('User Registration', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        role: 1,
        firstName: 'John',
        lastName: 'Doe',
      };

      const res = await request(app)
        .post('/api/user/register')
        .send(userData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('email', userData.email);
      // Add more assertions as needed
    });

    it('should return an error for duplicate email during registration', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        role: 1,
        firstName: 'John',
        lastName: 'Doe',
      };

      await User.create(userData); // Create a user with the same email

      const res = await request(app)
        .post('/api/user/register')
        .send(userData);

      expect(res.status).toBe(500); // Assuming you're returning 500 for duplicate email
      // Add more assertions as needed
    });
  });

  // Add more test suites for login, API endpoints, error scenarios, etc.
});