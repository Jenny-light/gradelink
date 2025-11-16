import Grade from '../models/Grade.js';
import Student from '../models/Student.js';
import Subject from '../models/Subject.js';

export const getGrades = async (req, res) => {
  try {
    const { student, subject, term, academicYear, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Teachers can only see grades for their subjects
    if (req.user.role === 'teacher') {
      const teacherSubjects = await Subject.find({ teacher: req.user.teacherProfile });
      query.subject = { $in: teacherSubjects.map(sub => sub._id) };
    }
    
    // Students can only see their own grades
    if (req.user.role === 'student') {
      const studentProfile = await Student.findOne({ user: req.user.id });
      if (studentProfile) {
        query.student = studentProfile._id;
      }
    }
    
    if (student) query.student = student;
    if (subject) query.subject = subject;
    if (term) query.term = term;
    if (academicYear) query.academicYear = academicYear;

    const grades = await Grade.find(query)
      .populate('student', 'studentId rollNumber')
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .populate('subject', 'subjectName subjectCode')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ academicYear: -1, term: 1 });

    const total = await Grade.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: grades.length,
      data: {
        grades,
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

export const getGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('student')
      .populate('subject')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!grade) {
      return res.status(404).json({
        status: 'error',
        message: 'Grade not found',
      });
    }

    // Check permissions
    if (req.user.role === 'student') {
      const studentProfile = await Student.findOne({ user: req.user.id });
      if (!studentProfile || grade.student._id.toString() !== studentProfile._id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only view your own grades',
        });
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        grade,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const createGrade = async (req, res) => {
  try {
    const gradeData = req.body;

    // Verify that the teacher owns the subject
    if (req.user.role === 'teacher') {
      const subject = await Subject.findById(gradeData.subject);
      if (!subject || subject.teacher.toString() !== req.user.teacherProfile._id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only add grades for your subjects',
        });
      }
    }

    const grade = await Grade.create({
      ...gradeData,
      teacher: req.user.teacherProfile?._id || gradeData.teacher
    });

    const populatedGrade = await Grade.findById(grade._id)
      .populate('student')
      .populate('subject')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    res.status(201).json({
      status: 'success',
      data: {
        grade: populatedGrade,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Grade already exists for this student, subject, and term',
      });
    }
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        status: 'error',
        message: 'Grade not found',
      });
    }

    // Check permissions
    if (req.user.role === 'teacher') {
      const subject = await Subject.findById(grade.subject);
      if (!subject || subject.teacher.toString() !== req.user.teacherProfile._id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only update grades for your subjects',
        });
      }
    }

    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('student')
      .populate('subject')
      .populate({
        path: 'teacher',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    res.status(200).json({
      status: 'success',
      data: {
        grade: updatedGrade,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);

    if (!grade) {
      return res.status(404).json({
        status: 'error',
        message: 'Grade not found',
      });
    }

    // Check permissions
    if (req.user.role === 'teacher') {
      const subject = await Subject.findById(grade.subject);
      if (!subject || subject.teacher.toString() !== req.user.teacherProfile._id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'You can only delete grades for your subjects',
        });
      }
    }

    await Grade.findByIdAndDelete(req.params.id);

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

export const bulkUploadGrades = async (req, res) => {
  try {
    const { grades } = req.body;

    if (!grades || !Array.isArray(grades)) {
      return res.status(400).json({
        status: 'error',
        message: 'Grades array is required',
      });
    }

    const results = {
      successful: [],
      failed: []
    };

    for (const gradeData of grades) {
      try {
        // Verify teacher owns the subject
        if (req.user.role === 'teacher') {
          const subject = await Subject.findById(gradeData.subject);
          if (!subject || subject.teacher.toString() !== req.user.teacherProfile._id.toString()) {
            results.failed.push({
              ...gradeData,
              error: 'You can only add grades for your subjects'
            });
            continue;
          }
        }

        const grade = await Grade.create({
          ...gradeData,
          teacher: req.user.teacherProfile?._id || gradeData.teacher
        });

        results.successful.push(grade);
      } catch (error) {
        results.failed.push({
          ...gradeData,
          error: error.message
        });
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        total: grades.length,
        successful: results.successful.length,
        failed: results.failed.length,
        results
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};