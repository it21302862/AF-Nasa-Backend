const {
    enrollStudentInCourse,
    getStudentEnrollments,
    getAllEnrollmentForCourse,
    unenrollStudentFromCourse,
  } = require('../../controller/studentEnrollmentController');
  
  const studentEnrollmentService = require('../../service/studentEnrollmentService');
  
  jest.mock('../../service/studentEnrollmentService');
  
  describe('Student Enrollment Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('enrollStudentInCourse', () => {
      it('should enroll a student in a course', async () => {
        const req = { body: { studentId: '1', courseId: '101' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockEnrollment = { _id: '123', studentId: '1', courseId: '101' };
        studentEnrollmentService.enrollStudentInCourse.mockResolvedValue(mockEnrollment);
  
        await enrollStudentInCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(['Enroll for course Succesfully', mockEnrollment]);
      });
  
      it('should handle errors when enrolling a student in a course', async () => {
        const req = { body: { studentId: '1', courseId: '101' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const errorMessage = 'Failed to enroll student in course';
        studentEnrollmentService.enrollStudentInCourse.mockRejectedValue(new Error(errorMessage));
  
        await enrollStudentInCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
    describe('getStudentEnrollments', () => {
      it('should get all enrollments for a student', async () => {
        const req = { params: { studentId: '1' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockEnrollments = [{ _id: '123', studentId: '1', courseId: '101' }];
        studentEnrollmentService.getStudentEnrollment.mockResolvedValue(mockEnrollments);
  
        await getStudentEnrollments(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockEnrollments);
      });
  
      it('should handle errors when getting enrollments for a student', async () => {
        const req = { params: { studentId: '1' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const errorMessage = 'Failed to get student enrollments';
        studentEnrollmentService.getStudentEnrollment.mockRejectedValue(new Error(errorMessage));
  
        await getStudentEnrollments(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
    describe('getAllEnrollmentForCourse', () => {
      it('should get all enrollments for a course', async () => {
        const req = { params: { courseId: '101' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockEnrollments = [{ _id: '123', studentId: '1', courseId: '101' }];
        studentEnrollmentService.getAllEnrollmentForCourse.mockResolvedValue(mockEnrollments);
  
        await getAllEnrollmentForCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockEnrollments);
      });
  
      it('should handle errors when getting all enrollments for a course', async () => {
        const req = { params: { courseId: '101' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const errorMessage = 'Failed to get all enrollments for course';
        studentEnrollmentService.getAllEnrollmentForCourse.mockRejectedValue(new Error(errorMessage));
  
        await getAllEnrollmentForCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
    describe('unenrollStudentFromCourse', () => {
      it('should unenroll a student from a course', async () => {
        const req = { params: { enrollmentId: '123' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        await unenrollStudentFromCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Student unenrolled successfully' });
      });
  
      it('should handle errors when unenrolling a student from a course', async () => {
        const req = { params: { enrollmentId: '123' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const errorMessage = 'Failed to unenroll student from course';
        studentEnrollmentService.unenrollStudentFromCourse.mockRejectedValue(new Error(errorMessage));
  
        await unenrollStudentFromCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  });