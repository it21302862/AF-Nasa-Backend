const {
  addAnnouncement,
  removeAnnouncement,
  getAllNotifications,
} = require("../../controller/notificationController");

const notificationService = require("../../service/notificationService");

// Mock the notification service
jest.mock("../../service/notificationService");

describe("Notification Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case for adding an announcement
  describe("addAnnouncement", () => {
    it("should add an announcement", async () => {
      const req = {
        body: { message: "Announcement message", title: "Announcement title" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const announcement = {
        /* announcement data */
      };
      notificationService.addAnnouncement.mockResolvedValue(announcement);

      await addAnnouncement(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(announcement);
    });

    // Test case for handling errors when adding an announcement
    it("should handle errors when adding an announcement", async () => {
      const req = {
        body: { message: "Announcement message", title: "Announcement title" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to add announcement";
      notificationService.addAnnouncement.mockRejectedValue(
        new Error(errorMessage)
      );

      await addAnnouncement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("removeAnnouncement", () => {
    // Test case for removing an announcement by its ID
    it("should remove an announcement by its ID", async () => {
      const req = { params: { announcementId: "announcementId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const removedAnnouncement = {
        /* removed announcement data */
      };
      notificationService.removeAnnouncement.mockResolvedValue(
        removedAnnouncement
      );

      await removeAnnouncement(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(removedAnnouncement);
    });

    // Test case for handling errors when removing an announcement
    it("should handle errors when removing an announcement", async () => {
      const req = { params: { announcementId: "announcementId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to remove announcement";
      notificationService.removeAnnouncement.mockRejectedValue(
        new Error(errorMessage)
      );

      await removeAnnouncement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("getAllNotifications", () => {
    // Test case for getting all notifications
    it("should get all notifications", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const notifications = [
        {
          /* notification data */
        },
      ];
      notificationService.getAllNotifications.mockResolvedValue(notifications);

      await getAllNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(notifications);
    });

    // Test case for handling errors when getting all notifications
    it("should handle errors when getting all notifications", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Failed to get notifications";
      notificationService.getAllNotifications.mockRejectedValue(
        new Error(errorMessage)
      );

      await getAllNotifications(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
