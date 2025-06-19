import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional since guest users can submit enquiries
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  companyName: {
    type: String,
    required: false,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  purpose: {
    type: String,
    required: false,
    trim: true
  },
  requirementDetails: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const enquiryModel = mongoose.models.enquiry || mongoose.model('enquiry', enquirySchema)

export default enquiryModel