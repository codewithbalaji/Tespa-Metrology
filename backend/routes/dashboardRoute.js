import express from 'express';
import { dashboardData } from '../controllers/dashboardController.js';
import adminUser from '../middleware/adminAuth.js';
import { getAllJobs, createJob, deleteJob, updateJob } from '../controllers/careersController.js';
import { getAllTestimonials, createTestimonial, deleteTestimonial, updateTestimonial } from '../controllers/testimonialController.js';
import upload from "../middleware/multer.js";
import { getAllNews, createNews, deleteNews, updateNews } from '../controllers/newsController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/', adminUser, dashboardData);

// Career routes
dashboardRouter.get('/careers', getAllJobs);
dashboardRouter.post('/careers/add', adminUser, createJob);
dashboardRouter.put('/careers/:id', adminUser, updateJob);
dashboardRouter.delete('/careers/:id', adminUser, deleteJob);

// Testimonial routes with multer middleware
dashboardRouter.get('/testimonials', getAllTestimonials);
dashboardRouter.post('/testimonials/add', 
  adminUser, 
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createTestimonial
);
dashboardRouter.put('/testimonials/:id', 
  adminUser, 
  upload.fields([{ name: 'image', maxCount: 1 }]),
  updateTestimonial
);
dashboardRouter.delete('/testimonials/:id', adminUser, deleteTestimonial);

// News routes with multer middleware
dashboardRouter.get('/news', getAllNews);
dashboardRouter.post('/news/add', 
  adminUser, 
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createNews
);
dashboardRouter.put('/news/:id', 
  adminUser, 
  upload.fields([{ name: 'image', maxCount: 1 }]),
  updateNews
);
dashboardRouter.delete('/news/:id', adminUser, deleteNews);

export default dashboardRouter;
