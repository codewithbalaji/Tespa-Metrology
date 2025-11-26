import enquiryModel from '../models/enquiryModel.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import { ENQUIRY_EMAIL_TEMPLATE } from '../config/emailTemplates.js';


  // Submit a new enquiry
  const submitEnquiry = async (req, res) => {
    try {
      const {
        productId,
        productName,
        email,
        quantity,
        companyName,
        mobileNo,
        country,
        purpose,
        requirementDetails,
        userId
      } = req.body;

      // Validate required fields
      if (!productId || !productName || !email || !quantity || !mobileNo || !country) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields'
        });
      }

      // Extract user ID from token if provided
      let actualUserId = null;
      if (userId) {
        try {
          const decoded = jwt.verify(userId, process.env.JWT_SECRET);
          actualUserId = decoded.id;
        } catch (error) {
          console.log('Invalid token, continuing without userId');
        }
      }

      // Validate email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address'
        });
      }

      // Validate quantity
      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        });
      }

      // Validate mobile number (basic validation)
      const mobileRegex = /^\+?[0-9\s-]{8,15}$/;
      if (!mobileRegex.test(mobileNo.replace(/\s/g, ''))) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid mobile number'
        });
      }

      // Create new enquiry using enquiryModel
      const newEnquiry = new enquiryModel({
        productId,
        productName,
        email,
        quantity,
        companyName,
        mobileNo,
        country,
        purpose,
        requirementDetails,
        userId: actualUserId // Use the extracted user ID
      });

      // Save the enquiry
      await newEnquiry.save();

      // Send email notification to admin
      try {
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: process.env.USER_EMAIL,
          subject: `New Enquiry: ${productName}`,
          html: ENQUIRY_EMAIL_TEMPLATE({
            productName,
            quantity,
            email,
            mobileNo,
            companyName,
            country,
            purpose,
            requirementDetails
          })
        };

        await transporter.sendMail(mailOptions);
        console.log('Enquiry notification email sent successfully');
      } catch (emailError) {
        console.error('Error sending enquiry email:', emailError);
        // Don't fail the request if email fails
      }

      // Send success response
      res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully',
        data: newEnquiry
      });

    } catch (error) {
      console.error('Error in submitEnquiry:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get all enquiries (with optional filtering)
  const getEnquiries = async (req, res) => {
    try {
      const { status, userId, productId } = req.query;
      const filter = {};

      // Add filters if provided
      if (status) filter.status = status;
      if (userId) filter.userId = userId;
      if (productId) filter.productId = productId;

      const enquiries = await enquiryModel.find(filter)
        .sort({ createdAt: -1 }) // Sort by newest first
        .lean(); // Use lean() for better performance, remove population

      res.status(200).json({
        success: true,
        data: enquiries
      });

    } catch (error) {
      console.error('Error in getEnquiries:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Update enquiry status
  const updateEnquiryStatus = async (req, res) => {
    try {
      const { enquiryId } = req.body;
      const { status } = req.body;

      if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }

      const updatedEnquiry = await enquiryModel.findByIdAndUpdate(
        enquiryId,
        { status },
        { new: true }
      );

      if (!updatedEnquiry) {
        return res.status(404).json({
          success: false,
          message: 'Enquiry not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Enquiry status updated successfully',
        data: updatedEnquiry
      });

    } catch (error) {
      console.error('Error in updateEnquiryStatus:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }



export { submitEnquiry, getEnquiries, updateEnquiryStatus }