import transporter from '../config/nodemailer.js';
import { CONTACT_EMAIL_TEMPLATE } from '../config/emailTemplates.js';

// Submit a contact form
const submitContact = async (req, res) => {
  try {
    const {
      product,
      name,
      email,
      mobile,
      enquiry,
      requirement
    } = req.body;

    // Validate required fields
    if (!product || !name || !email || !mobile || !enquiry) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate mobile number
    const mobileRegex = /^\+?[0-9\s-]{8,15}$/;
    if (!mobileRegex.test(mobile.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid mobile number'
      });
    }

    // Send email notification to admin
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.USER_EMAIL,
        subject: `New Contact Form Submission: ${product}`,
        html: CONTACT_EMAIL_TEMPLATE({
          product,
          name,
          email,
          mobile,
          enquiry,
          requirement
        })
      };

      await transporter.sendMail(mailOptions);
      console.log('Contact form notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending contact email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email notification'
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error in submitContact:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export { submitContact };
