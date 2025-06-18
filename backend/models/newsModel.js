import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  image: { 
    type: Array, 
    required: [true, 'Image is required'] 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const newsModel = mongoose.models.news || mongoose.model('news', newsSchema)

export default newsModel
