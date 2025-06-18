import applicationModel from '../models/applicationModel.js'
import { v2 as cloudinary } from 'cloudinary'

// Submit a new job application
const submitApplication = async (req, res) => {
  try {
    const { name, email, qualification, position, mobile, message } = req.body
    // Validate required fields
    if (!name || !email || !qualification || !position || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }
    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }
    // Validate mobile number (basic)
    const mobileRegex = /^\+?[0-9\s-]{8,15}$/
    if (!mobileRegex.test(mobile.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid mobile number'
      })
    }
    // Validate file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      })
    }
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Only PDF, DOC, and DOCX files are allowed'
      })
    }
    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'File size should not exceed 2MB'
      })
    }
    // Upload to Cloudinary
    let resumeUrl = ''
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'raw',
        folder: 'tespa-resumes',
        public_id: `${Date.now()}_${req.file.originalname}`.replace(/\s+/g, '_')
      })
      resumeUrl = uploadResult.secure_url
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload resume',
        error: err.message
      })
    }
    // Save application
    const newApplication = new applicationModel({
      name,
      email,
      qualification,
      position,
      mobile,
      message,
      resumeUrl
    })
    await newApplication.save()
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: newApplication
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Get all job applications (admin only)
const getApplications = async (req, res) => {
  try {
    const applications = await applicationModel.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      data: applications
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Update application status (admin only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body
    if (!['pending', 'shortlisted', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }
    const updated = await applicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    )
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Status updated',
      data: updated
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Delete application (admin only)
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await applicationModel.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Application deleted'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export { submitApplication, getApplications, updateApplicationStatus, deleteApplication }
