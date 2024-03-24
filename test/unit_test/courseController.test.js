const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    assignFaculty,
    removeFaculty,
    getCourseById,
  } = require('../../controller/CourseController');
  
  const courseService = require('../../service/CourseService');
  
  jest.mock('../../service/CourseService');
  
  describe('Course Controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createCourse', () => {
      it('should create a new course', async () => {
        const req = { body: { code: 'CSE101', name: 'Introduction to Computer Science' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockCreatedCourse = { _id: '123', code: 'CSE101', name: 'Introduction to Computer Science' };
        courseService.createCourse.mockResolvedValue({ message: 'Course created successfully', course: mockCreatedCourse });
  
        await createCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
      });
  
      it('should handle errors when creating a course', async () => {
        const req = { body: { code: 'CSE101', name: 'Introduction to Computer Science' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const errorMessage = 'Failed to create course';
        courseService.createCourse.mockRejectedValue(new Error(errorMessage));
  
        await createCourse(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
    });
  
    describe('getCourses', () => {
        it('should get all courses', async () => {
          const mockCourses = [
            { _id: '1', code: 'CSE101', name: 'Introduction to Computer Science' },
            { _id: '2', code: 'ENG202', name: 'English Literature' },
          ];
    
          const req = {};
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourses.mockResolvedValue(mockCourses);
    
          await getCourses(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockCourses);
        });
    
        it('should handle errors when getting courses', async () => {
          const errorMessage = 'Failed to get courses';
          const req = {};
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourses.mockRejectedValue(new Error(errorMessage));
    
          await getCourses(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });
    
      describe('updateCourse', () => {
        it('should update a course', async () => {
          const courseId = '123';
          const updatedCourseData = { name: 'Updated Course Name' };
          const updatedCourse = {
            _id: courseId,
            code: 'CSE101',
            name: 'Updated Course Name',
          };
    
          const req = { params: { courseId }, body: updatedCourseData };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.updateCourse.mockResolvedValue({ message: 'Course updated successfully', updatedCourse });
    
          await updateCourse(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('Course updated successfully');
        });
    
        it('should handle errors when updating a course', async () => {
          const courseId = '123';
          const updatedCourseData = { name: 'Updated Course Name' };
          const errorMessage = 'Failed to update course';
    
          const req = { params: { courseId }, body: updatedCourseData };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.updateCourse.mockRejectedValue(new Error(errorMessage));
    
          await updateCourse(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });

      describe('deleteCourse', () => {
        it('should delete a course', async () => {
          const courseId = '123';
    
          const req = { params: { courseId } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.deleteCourse.mockResolvedValue({ message: 'Course deleted successfully' });
    
          await deleteCourse(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('Course deleted successfully');
        });
    
        it('should handle errors when deleting a course', async () => {
          const courseId = '123';
          const errorMessage = 'Failed to delete course';
    
          const req = { params: { courseId } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.deleteCourse.mockRejectedValue(new Error(errorMessage));
    
          await deleteCourse(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });

      describe('assignFaculty', () => {
        it('should assign a faculty to a course', async () => {
          const courseId = '123';
          const facultyId = '456';
          const position = 'Professor';
    
          const req = { body: { courseId, facultyId, position } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.assignFaculty.mockResolvedValue({ message: 'Faculty member is assigned successfully' });
    
          await assignFaculty(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('Faculty member is assigned successfully');
        });
    
        it('should handle errors when assigning a faculty to a course', async () => {
          const courseId = '123';
          const facultyId = '456';
          const position = 'Professor';
          const errorMessage = 'Failed to assign faculty to the course';
    
          const req = { body: { courseId, facultyId, position } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.assignFaculty.mockRejectedValue(new Error(errorMessage));
    
          await assignFaculty(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });

      describe('removeFaculty', () => {
        it('should remove a faculty from a course', async () => {
          const courseId = '123';
          const facultyId = '456';
    
          const req = { params: { courseId, facultyId } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.removeFaculty.mockResolvedValue({ message: 'Faculty member is removed successfully' });
    
          await removeFaculty(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith('Faculty member is removed successfully');
        });
    
        it('should handle errors when removing a faculty from a course', async () => {
          const courseId = '123';
          const facultyId = '456';
          const errorMessage = 'Failed to remove faculty from the course';
    
          const req = { params: { courseId, facultyId } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.removeFaculty.mockRejectedValue(new Error(errorMessage));
    
          await removeFaculty(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });

      describe('getCourseById', () => {
        it('should get course by ID for non-student user', async () => {
          const courseId = '123';
          const userId = '456';
          const role = 1; // Assuming 1 represents a non-student role
    
          const course = {
            _id: courseId,
            name: 'Course Name',
          };
    
          const req = { params: { courseId }, user: { userId, role } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourseById.mockResolvedValue(course);
    
          await getCourseById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(course);
        });
    
        it('should get course by ID for student user if enrolled', async () => {
          const courseId = '123';
          const userId = '456';
          const role = 2; // Assuming 2 represents a student role
    
          const course = {
            _id: courseId,
            name: 'Course Name',
          };
    
          const req = { params: { courseId }, user: { userId, role } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourseById.mockResolvedValue(course);
    
          await getCourseById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(course);
        });
    
        it('should handle errors when getting course by ID', async () => {
          const courseId = '123';
          const userId = '456';
          const role = 1; // Assuming 1 represents a non-student role
          const errorMessage = 'Failed to get course by ID';
    
          const req = { params: { courseId }, user: { userId, role } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourseById.mockRejectedValue(new Error(errorMessage));
    
          await getCourseById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    
        it('should handle error when student is not enrolled in the course', async () => {
          const courseId = '123';
          const userId = '456';
          const role = 2; // Assuming 2 represents a student role
          const errorMessage = 'You are not enrolled in this course.';
    
          const req = { params: { courseId }, user: { userId, role } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
    
          courseService.getCourseById.mockRejectedValue(new Error(errorMessage));
    
          await getCourseById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
      });
  });
  