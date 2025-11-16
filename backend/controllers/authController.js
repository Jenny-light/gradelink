import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isActive: user.isActive
    },
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, studentId, teacherId, ...additionalData } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Create role-specific profile
    if (role === 'student') {
      await Student.create({
        user: user._id,
        studentId: studentId || `STU${Date.now()}`,
        ...additionalData,
      });
    } else if (role === 'teacher') {
      await Teacher.create({
        user: user._id,
        teacherId: teacherId || `TCH${Date.now()}`,
        ...additionalData,
      });
    }

    // Update last login
    await user.updateLastLogin();

    createSendToken(user, 201, res);
  } catch (error) {
    // If user creation fails, clean up
    if (error.code === 11000) {
      await User.findOneAndDelete({ email: req.body.email });
    }
    
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password',
      });
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Your account has been deactivated. Please contact administrator.',
      });
    }

    // Update last login
    await user.updateLastLogin();

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    
    // Populate role-specific data
    let populatedUser;
    if (req.user.role === 'student') {
      populatedUser = await User.findById(req.user.id)
        .populate({
          path: 'studentProfile',
          populate: {
            path: 'class',
            model: 'Class',
            populate: {
              path: 'teacher',
              model: 'Teacher',
              populate: {
                path: 'user',
                model: 'User',
                select: 'name email'
              }
            }
          }
        });
    } else if (req.user.role === 'teacher') {
      populatedUser = await User.findById(req.user.id)
        .populate({
          path: 'teacherProfile',
          populate: [
            {
              path: 'classes',
              model: 'Class'
            },
            {
              path: 'subjects',
              model: 'Subject'
            }
          ]
        });
    } else {
      populatedUser = user;
    }

    res.status(200).json({
      status: 'success',
      user: populatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check if current password is correct
    if (!(await user.correctPassword(currentPassword, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Your current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};