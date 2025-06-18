import express from 'express'
import { submitEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquiryController.js'
import adminUser from '../middleware/adminAuth.js'

const enquiryRouter = express.Router()

enquiryRouter.get('/get', adminUser, getEnquiries)
enquiryRouter.post('/submit',  submitEnquiry)
enquiryRouter.put('/update', adminUser, updateEnquiryStatus)

export default enquiryRouter
