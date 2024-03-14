// controller.test.js

const { loginUser } = require('../controller/UserController');
const userService = require('../service/UserService');

jest.mock('../service/UserService');

describe('loginUser', () => {
  it('should return a token when valid email and password are provided', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const token = 'mocked_token';

    userService.loginUser.mockResolvedValueOnce(token);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  it('should return a 401 status when invalid email or password are provided', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'wrongpassword'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const errorMessage = 'Invalid email or password';
    const error = new Error(errorMessage);

    userService.loginUser.mockRejectedValueOnce(error);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
