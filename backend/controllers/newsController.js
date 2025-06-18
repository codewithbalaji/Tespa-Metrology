import newsModel from '../models/newsModel.js'
import { v2 as cloudinary } from 'cloudinary'

// Get all news
const getAllNews = async (req, res) => {
  try {
    console.log('Fetching all news')
    const news = await newsModel.find()
      .sort('-createdAt')
      .select('-__v')

    console.log('Found news:', news)

    res.status(200).json({
      success: true,
      results: news.length,
      data: news
    })
  } catch (error) {
    console.error('Error in getAllNews:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Add a new news item
const createNews = async (req, res) => {
  try {
    console.log('Request body:', req.body)
    console.log('Request files:', req.files)

    const {
      title,
      description,
      date,
      time,
      location,
      category,
      imageUrl
    } = req.body

    // Validate required fields
    const missingFields = []
    if (!title) missingFields.push('title')
    if (!description) missingFields.push('description')
    if (!date) missingFields.push('date')
    if (!time) missingFields.push('time')
    if (!location) missingFields.push('location')
    if (!category) missingFields.push('category')

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      })
    }

    let imageUploadResult = null

    // Handle image upload
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

    // Create news data
    const newsData = {
      title,
      description,
      date,
      time,
      location,
      category,
      image: imageUploadResult ? [imageUploadResult.secure_url] : 
             imageUrl ? [imageUrl] : []
    }

    console.log('Creating news with data:', newsData)

    const newNews = new newsModel(newsData)
    const savedNews = await newNews.save()

    res.status(201).json({
      success: true,
      message: 'News created successfully',
      data: savedNews
    })
  } catch (error) {
    console.error('Error in createNews:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    })
  }
}

// Update a news item
const updateNews = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = { ...req.body }

    console.log('Updating news with ID:', id)
    console.log('Update data received:', updateData)

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'News ID is required'
      })
    }

    const existingNews = await newsModel.findById(id)
    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      })
    }

    if (req.files && req.files.image) {
      try {
        const imageUploadResult = await cloudinary.uploader.upload(req.files.image[0].path, {
          resource_type: 'image'
        })
        updateData.image = [imageUploadResult.secure_url]
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError)
        return res.status(400).json({
          success: false,
          message: 'Error uploading image'
        })
      }
    } else if (updateData.imageUrl) {
      updateData.image = [updateData.imageUrl]
      delete updateData.imageUrl
    }

    const updatedNews = await newsModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { 
        new: true,
        runValidators: true,
        context: 'query'
      }
    )

    res.status(200).json({
      success: true,
      message: 'News updated successfully',
      data: updatedNews
    })
  } catch (error) {
    console.error('Error in updateNews:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

// Delete a news item
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params

    const news = await newsModel.findByIdAndDelete(id)

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'News permanently deleted',
      data: null
    })
  } catch (error) {
    console.error('Error in deleteNews:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export {
  getAllNews,
  createNews,
  updateNews,
  deleteNews
}
