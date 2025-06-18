import { useState, useContext } from 'react'
import { MessageCircleQuestion, X, Send } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '@/context/ShopContext'
import { toast } from 'react-toastify'

// Helper function to convert URLs in text to clickable links
const formatMessageWithLinks = (text: string) => {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  
  const parts = text.split(urlRegex)
  
  return parts.map((part, index) => {
    if (!part) return null
    // Check if part is a URL
    if (part.match(urlRegex)) {
      // Check if it's an email address
      if (part.includes('@')) {
        return (
          <a 
            key={index}
            href={`mailto:${part}`}
            className="text-blue-500 hover:underline break-words"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        )
      }
      // Regular URL
      return (
        <a 
          key={index}
          href={part}
          className="text-blue-500 hover:underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      )
    }
    // Regular text
    return <span key={index}>{part}</span>
  })
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { backendUrl } = useContext(ShopContext)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }])
    const userMessage = inputMessage
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`${backendUrl}/api/user/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await response.json()

      if (data.success) {
        setMessages(prev => [...prev, {
          text: data.data,
          isUser: false
        }])
      } else {
        throw new Error(data.message || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to send message. Please try again.')
      setMessages(prev => [...prev, {
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-[1000]">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-[#27a3d4] text-white rounded-full p-4 shadow-lg hover:bg-[#1d8cb8] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MessageCircleQuestion className="w-6 h-6" />
      </motion.button>

      {/* Chat Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay 
            className="fixed inset-0 bg-black/50 z-[1000]" 
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          />
          <Dialog.Content 
            className="fixed bottom-24 right-8 w-[90vw] md:w-[380px] max-h-[600px] bg-white rounded-xl shadow-xl z-[1001] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#27a3d4] p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <MessageCircleQuestion className="w-6 h-6" />
                <h3 className="font-semibold">TESPA Support</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="p-4 h-[400px] overflow-y-auto space-y-4 bg-white">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[90%] p-3 rounded-lg break-words ${
                        message.isUser 
                          ? 'bg-[#27a3d4] text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.isUser ? (
                        message.text
                      ) : (
                        <div className="space-y-1">
                          {formatMessageWithLinks(message.text)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#27a3d4] focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-[#27a3d4] text-white p-2 rounded-full hover:bg-[#1d8cb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!inputMessage.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
