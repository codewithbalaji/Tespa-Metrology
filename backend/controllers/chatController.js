import { GoogleGenerativeAI } from '@google/generative-ai'
import chatData from '../utils/chatData.js'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Function to find matching response from chatData
const findResponse = (message) => {
  const lowercaseMessage = message.toLowerCase()
  
  for (const [category, data] of Object.entries(chatData)) {
    if (data.keywords && data.keywords.some(keyword => 
      lowercaseMessage.includes(keyword.toLowerCase())
    )) {
      return data.response
    }
  }
  
  return chatData.default.response
}

// Chat response controller
const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // First check predefined responses
    const predefinedResponse = findResponse(message)

    // If no predefined response matches, use Gemini
    if (predefinedResponse === chatData.default.response) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        const prompt = `
          You are a helpful assistant for TESPA, a precision measurement equipment company.
          
          Use these specific details in your responses:
          - Website: https://tespaindia.vercel.app
          - Email: info@tespa.in
          - Support Email: support@tespa.in
          - Business Hours: Monday to Saturday, 9 AM to 6 PM IST
          - Location: Headquarters in Mumbai, India with service centers in Delhi, Bangalore, and Chennai
          
          Important guidelines:
          1. Always use the exact website URL, email, and contact information provided above
          2. Never use placeholders like [insert website] or [contact details]
          3. Keep responses professional and concise
          4. Focus on TESPA's products and services
          5. Include relevant links to specific pages (e.g., /products, /contact, /about)
          6. For product inquiries, direct users to https://tespaindia.vercel.app/products
          7. For support issues, provide the support email and business hours
          8. For contact requests, provide both email and website contact form link
          
          User message: ${message}
        `

        const result = await model.generateContent(prompt)
        const response = result.response.text()

        return res.status(200).json({
          success: true,
          data: response
        })
      } catch (error) {
        console.error('Gemini API Error:', error)
        // Fallback to default response if Gemini fails
        return res.status(200).json({
          success: true,
          data: predefinedResponse
        })
      }
    }

    // Return predefined response
    res.status(200).json({
      success: true,
      data: predefinedResponse
    })

  } catch (error) {
    console.error('Chat Controller Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export { getChatResponse }
