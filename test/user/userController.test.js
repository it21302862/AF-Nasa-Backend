const userService = require("../../service/UserService");
const { registerUser, loginUser } = require("../../controller/UserController");

jest.mock("../../service/UserService");

describe("User Controller Unit Tests", () => {
  describe("registerUser", () => {
    it("should register a new user when called by an admin user", async () => {
      const req = {
        user: { role: 0 }, 
        body: {
          email: "test@example.com",
          password: "password123",
          role: 1,
          name: "Test User",
          firstName: "Test",
          lastName: "User"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it("should return 500 error when registration fails", async () => {
      const req = {
        user: { role: 1 },
        body: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
    });
  });

  describe("loginUser", () => {
    it("should login a user with valid credentials", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mocking the token returned by userService.loginUser
      userService.loginUser.mockResolvedValue("mocked_token");

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "mocked_token" });
    });

    it("should return 401 error when login fails due to incorrect password", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "wrongpassword"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mocking the loginUser function to throw an error
      userService.loginUser.mockRejectedValue(new Error("Invalid password"));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid password" });
    });

    it("should return 401 error when login fails due to user not found", async () => {
      const req = {
        body: {
          email: "nonexistent@example.com",
          password: "password123"
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      userService.loginUser.mockRejectedValue(new Error("User not found"));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
});
