import express from 'express'
import { submitApplication, getApplications, updateApplicationStatus, deleteApplication } from '../controllers/applicationController.js'
import upload from '../middleware/multer.js'
import adminUser from '../middleware/adminAuth.js'

const applicationRouter = express.Router()

applicationRouter.post('/submit', upload.single('resume'), submitApplication)
applicationRouter.get('/get', adminUser, getApplications)
applicationRouter.put('/update', adminUser, updateApplicationStatus)
applicationRouter.delete('/delete/:id', adminUser, deleteApplication)

export default applicationRouter
