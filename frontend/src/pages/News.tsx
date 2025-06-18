import MainLayout from '@/components/layout/MainLayout'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { ShopContext } from '@/context/ShopContext'
import { Helmet } from 'react-helmet-async'

// Define the event type
interface NewsItem {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string[]
  category: string
  createdAt: string
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { backendUrl } = useContext(ShopContext)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(backendUrl + '/api/dashboard/news')
        const data = await response.json()
        if (data.success) {
          setNews(data.data)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [backendUrl])

  return (
    <>
      <Helmet>
        <title>Latest News & Events | Tespa Metrology</title>
        <meta name="description" content="Stay updated with the latest news, events, and innovations from Tespa Metrology." />
        <link rel="canonical" href={`${publicUrl}/news`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Latest News & Events</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">News</span>
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div className="container mx-auto px-4 py-16">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar size={48} className="mx-auto mb-6 text-[#27a3d4]" />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Stay Updated with TESPA</h2>
              <p className="text-lg text-gray-600">
                Keep up with our latest news, events, and innovations in precision measurement technology.
              </p>
            </motion.div>

            {/* News Section */}
            <div className="space-y-24 mb-16">
              {news.map((item, index) => (
                <motion.div 
                  key={item._id}
                  className="flex flex-col md:flex-row items-center gap-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
                >
                  {/* Media Content */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                      {item.image && item.image.length > 0 ? (
                        <img 
                          src={item.image[0]} 
                          alt={item.title}
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No image available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-[#27a3d4]/10 text-[#27a3d4] rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      
                      <div className="space-y-3 border-t border-gray-200 pt-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={18} className="mr-2 text-[#27a3d4]" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        {item.time && (
                          <div className="flex items-center text-gray-600">
                            <Clock size={18} className="mr-2 text-[#27a3d4]" />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center text-gray-600">
                            <MapPin size={18} className="mr-2 text-[#27a3d4]" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Call to Action */}
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-[#27a3d4] text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Want to stay updated?</h3>
                <p className="mb-6">
                  Subscribe to our newsletter to receive the latest news, events, 
                  and industry insights directly in your inbox.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-[#27a3d4] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Subscribe Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default News