import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Testimonial content is required'],
    trim: true
  },
  image: { type: Array, required: true },
  videoUrl: {
    type: String,
    trim: true,
    default: null
  },
  stars: {
    type: Number,
    required: [true, 'Star rating is required'],
    min: 1,
    max: 5,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Validate that either image or videoUrl is provided
testimonialSchema.pre('validate', function(next) {
  if (!this.image && !this.videoUrl) {
    this.invalidate('image', 'Either image or videoUrl must be provided');
  }
  next();
});

const testimonialModel = mongoose.models.testimonial || mongoose.model('testimonial', testimonialSchema)

export default testimonialModel
