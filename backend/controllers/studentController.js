import Student from '../models/Student.js';
import User from '../models/User.js';
import Grade from '../models/Grade.js';

export const getStudents = async (req, res) => {
  try {
    const { class: classId, page = 1, limit = 10, search } = req.query;
    
    let query = {};
    
    // Filter by class if provided
    if (classId) {
      query.class = classId;
    }
    
    // Search functionality
    if (search) {
      const users = await User.find({
        name: { $regex: search, $options: 'i' }
      }).select('_id');
      
      query.user = { $in: users.map(u => u._id) };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: [
        {
          path: 'user',
          select: 'name email avatar'
        },
        {
          path: 'class',
          select: 'className section'
        }
      ],
      sort: { rollNumber: 1 }
    };

    const students = await Student.find(query)
      .populate('user', 'name email avatar')
      .populate('class', 'className section')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rollNumber: 1 });

    const total = await Student.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate({
        path: 'class',
        populate: {
          path: 'teacher',
          populate: {
            path: 'user',
            select: 'name email'
          }
        }
      });

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    // Students can only view their own profile
    if (req.user.role === 'student') {
      const studentProfile = await Student.findOne({ user: req.user.id });
      if (studentProfile && studentProfile._id.toString() !== req.params.id) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only view your own profile',
        });
      }
    }

    const student = await Student.findById(req.params.id)
      .populate('user', 'name email avatar')
      .populate({
        path: 'class',
        select: 'className section teacher',
        populate: {
          path: 'teacher',
          populate: {
            path: 'user',
            select: 'name email'
          }
        }
      });

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getStudentGrades = async (req, res) => {
  try {
    const studentId = req.params.id;
    
    // Students can only view their own grades
    if (req.user.role === 'student') {
      const studentProfile = await Student.findOne({ user: req.user.id });
      if (!studentProfile || studentProfile._id.toString() !== studentId) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only view your own grades',
        });
      }
    }

    const { term, academicYear } = req.query;
    
    let query = { student: studentId };
    
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const grades = await Grade.find(query)
      .populate('subject', 'subjectName subjectCode credits')
      .populate('teacher', 'user')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .sort({ term: 1, 'subject.subjectName': 1 });

    // Calculate overall performance
    const overallStats = await Grade.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          averageMarks: { $avg: '$marks' },
          totalSubjects: { $sum: 1 },
          averageGPA: { $avg: '$gpa' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        grades,
        overallStats: overallStats[0] || { averageMarks: 0, totalSubjects: 0, averageGPA: 0 }
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    // Check if user exists and is a student
    const user = await User.findById(studentData.user);
    if (!user || user.role !== 'student') {
      return res.status(400).json({
        status: 'error',
        message: 'User must exist and have student role',
      });
    }

    // Check if student profile already exists
    const existingStudent = await Student.findOne({ 
      $or: [
        { user: studentData.user },
        { studentId: studentData.studentId }
      ]
    });

    if (existingStudent) {
      return res.status(400).json({
        status: 'error',
        message: 'Student profile already exists for this user or student ID',
      });
    }

    const student = await Student.create(studentData);

    res.status(201).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('user', 'name email avatar')
     .populate('class', 'className section');

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }

    // Also deactivate the user account
    await User.findByIdAndUpdate(student.user, { isActive: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};