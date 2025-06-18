import careerModel from '../models/careersModel.js'

// Get all active job openings
const getAllJobs = async (req, res) => {
  try {
    console.log('Fetching all jobs')
    const jobs = await careerModel.find()
      .sort('-createdAt')
      .select('-__v')

    console.log('Found jobs:', jobs)

    res.status(200).json({
      success: true,
      results: jobs.length,
      data: jobs
    })
  } catch (error) {
    console.error('Error in getAllJobs:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Add a new job opening
const createJob = async (req, res) => {
  try {
    const {
      title,
      location,
      qualification,
      description,
      responsibilities,
      requirements
    } = req.body

    console.log('Creating new job with data:', {
      title,
      location,
      qualification,
      description,
      responsibilities,
      requirements
    })

    // Validate required fields
    if (!title || !location || !qualification || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Validate arrays
    if (!Array.isArray(responsibilities) || responsibilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one responsibility'
      })
    }

    if (!Array.isArray(requirements) || requirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one requirement'
      })
    }

    // Create new job using careerModel
    const newJob = new careerModel({
      title,
      location,
      qualification,
      description,
      responsibilities,
      requirements
    })

    // Save the job
    const savedJob = await newJob.save()
    console.log('Job saved successfully:', savedJob)

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: savedJob
    })
  } catch (error) {
    console.error('Error in createJob:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    console.log('Updating job with ID:', id)
    console.log('Update data received:', updateData)

    // Validate if id exists
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required'
      })
    }

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      })
    }

    // Validate required fields if they are being updated
    if (updateData.title || updateData.location || updateData.qualification || updateData.description) {
      if (!updateData.title || !updateData.location || !updateData.qualification || !updateData.description) {
        return res.status(400).json({
          success: false,
          message: 'All required fields must be provided when updating basic information'
        })
      }
    }

    // Validate arrays if provided
    if (updateData.responsibilities && (!Array.isArray(updateData.responsibilities) || updateData.responsibilities.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one responsibility'
      })
    }

    if (updateData.requirements && (!Array.isArray(updateData.requirements) || updateData.requirements.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one requirement'
      })
    }

    // Check if job exists before update
    const existingJob = await careerModel.findById(id)
    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      })
    }

    // Perform the update
    const updatedJob = await careerModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { 
        new: true, // Return updated document
        runValidators: true, // Run schema validators
        context: 'query' // Required for custom validators
      }
    )

    console.log('Job updated successfully:', updatedJob)

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    })
  } catch (error) {
    console.error('Error in updateJob:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Hard delete a job (admin only)
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params

    const job = await careerModel.findByIdAndDelete(id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Job permanently deleted',
      data: null
    })
  } catch (error) {
    console.error('Error in hardDeleteJob:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
}