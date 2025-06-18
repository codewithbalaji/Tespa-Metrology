import testimonialModel from '../models/testimonialModel.js'
import { v2 as cloudinary } from 'cloudinary'

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    console.log('Fetching all testimonials')
    const testimonials = await testimonialModel.find()
      .sort('-createdAt')
      .select('-__v')

    console.log('Found testimonials:', testimonials)

    res.status(200).json({
      success: true,
      results: testimonials.length,
      data: testimonials
    })
  } catch (error) {
    console.error('Error in getAllTestimonials:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Add a new testimonial
const createTestimonial = async (req, res) => {
  try {
    console.log('Request body:', req.body)
    console.log('Request files:', req.files)

    const {
      name,
      position,
      content,
      imageUrl,
      videoUrl,
      stars
    } = req.body

    // Validate required fields
    const missingFields = []
    if (!name) missingFields.push('name')
    if (!position) missingFields.push('position')
    if (!content) missingFields.push('content')
    if (!stars) missingFields.push('stars')

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      })
    }

    let imageUploadResult = null

    // Handle image upload - updated to match the new file structure
    if (req.files && req.files.image && req.files.image[0]) {
      try {
        console.log('Uploading image to Cloudinary...')
        imageUploadResult = await cloudinary.uploader.upload(req.files.image[0].path, {
          resource_type: 'image'
        })
        console.log('Image upload result:', imageUploadResult)
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return res.status(400).json({
          success: false,
          message: 'Error uploading image: ' + uploadError.message
        })
      }
    }

    // Create testimonial data
    const testimonialData = {
      name,
      position,
      content,
      stars: Number(stars),
      ...(videoUrl && { videoUrl }),
      ...(imageUploadResult ? { image: imageUploadResult.secure_url } : 
          imageUrl ? { image: imageUrl } : {})
    }

    console.log('Creating testimonial with data:', testimonialData)

    const newTestimonial = new testimonialModel(testimonialData)
    const savedTestimonial = await newTestimonial.save()

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: savedTestimonial
    })
  } catch (error) {
    console.error('Error in createTestimonial:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    })
  }
}

// Update a testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    console.log('Updating testimonial with ID:', id)
    console.log('Update data received:', updateData)

    // Validate if id exists
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Testimonial ID is required'
      })
    }

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update data provided'
      })
    }

    // Check if testimonial exists before update
    const existingTestimonial = await testimonialModel.findById(id)
    if (!existingTestimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }

    // Handle image upload for updates
    if (req.files && req.files.image) {
      try {
        const imageUploadResult = await cloudinary.uploader.upload(req.files.image[0].path, {
          resource_type: 'image'
        })
        updateData.image = imageUploadResult.secure_url
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return res.status(400).json({
          success: false,
          message: 'Error uploading image'
        })
      }
    } else if (updateData.imageUrl) {
      updateData.image = updateData.imageUrl
      delete updateData.imageUrl
    }

    // Perform the update
    const updatedTestimonial = await testimonialModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { 
        new: true, // Return updated document
        runValidators: true, // Run schema validators
        context: 'query' // Required for custom validators
      }
    )

    console.log('Testimonial updated successfully:', updatedTestimonial)

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      data: updatedTestimonial
    })
  } catch (error) {
    console.error('Error in updateTestimonial:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params

    const testimonial = await testimonialModel.findByIdAndDelete(id)

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial permanently deleted',
      data: null
    })
  } catch (error) {
    console.error('Error in deleteTestimonial:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
}
