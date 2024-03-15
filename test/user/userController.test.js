const { registerUser, loginUser } = require("../../controller/UserController");
const userService = require("../../service/UserService");

jest.mock("../../service/UserService");

describe("registerUser", () => {
  it("should register a new user when called by an admin", async () => {
    // Mocking request object with admin role and user data
    const req = {
      user: {
        role: 0,
      },
      body: {
        email: "chamaththa@gmail.com",
        password: "password123",
        role: 1,
        firstName: "chamaththa",
        lastName: "shamod",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking registered user data
    const registeredUser = {
      id: 1,
      email: "chamaththa@gmail.com",
      role: 1,
      firstName: "chamaththa",
      lastName: "shamod",
    };

    // Mocking userService.registerUser method to resolve with registeredUser
    userService.registerUser.mockResolvedValueOnce(registeredUser);

    await registerUser(req, res);

    // Asserting status and response JSON
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(registeredUser);
  });

  it("should return a error status when an error occurs during registration", async () => {
    // Mocking request object with non-admin role and user data
    const req = {
      user: {
        role: 1,
      },
      body: {
        email: "chamaththa@gmail.com",
        password: "password123",
        role: 1,
        firstName: "John",
        lastName: "Doe",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Error message to simulate the rejection of registration
    const errorMessage = "Only admin can register new users";
    const error = new Error(errorMessage);

    userService.registerUser.mockRejectedValueOnce(error);

    await registerUser(req, res);

    // Calling registerUser function with mocked request and response objects
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe("loginUser", () => {
  it("should return a token when valid email and password are provided", async () => {
    // Mocking request object with valid email and password
    const req = {
      body: {
        email: "chamaththa@gmail.com",
        password: "password123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const token = "mocked_token";

    userService.loginUser.mockResolvedValueOnce(token);

    await loginUser(req, res);

    // Asserting status and response JSON with token
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  it("should return a 401 status when invalid email or password are provided", async () => {
    // Mocking request object with invalid email or password
    const req = {
      body: {
        email: "chamaththa@gmail.com",
        password: "wrongpassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Invalid email or password";
    const error = new Error(errorMessage);

    userService.loginUser.mockRejectedValueOnce(error);

    await loginUser(req, res);

    // Asserting status and response JSON with token
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
