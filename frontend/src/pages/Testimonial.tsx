import MainLayout from '@/components/layout/MainLayout'
import { motion } from 'framer-motion'
import { ChevronRight, Star, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { ShopContext } from '@/context/ShopContext'
import { Helmet } from 'react-helmet-async'

// Define the testimonial type
interface Testimonial {
  _id: string
  name: string
  position: string
  content: string
  image: string[]
  videoUrl: string | null
  stars: number
  createdAt: string
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { backendUrl } = useContext(ShopContext)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(backendUrl + '/api/dashboard/testimonials')
        const data = await response.json()
        if (data.success) {
          setTestimonials(data.data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <>
      <Helmet>
        <title>Client Testimonials | Tespa Metrology</title>
        <meta name="description" content="Read what our clients say about Tespa Metrology's precision tools and calibration services." />
        <link rel="canonical" href={`${publicUrl}/testimonial`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Client Testimonials</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">Testimonials</span>
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
              <Quote size={48} className="mx-auto mb-6 text-[#27a3d4]" />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
              <p className="text-lg text-gray-600">
                Don't just take our word for it. Hear from the businesses who have transformed their 
                precision measurement capabilities with TESPA Tools.
              </p>
            </motion.div>

            {/* Testimonials Section */}
            <div className="space-y-24 mb-16">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial._id}
                  className="flex flex-col md:flex-row items-center gap-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
                >
                  {/* Media Content (Image or Video) */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                      {testimonial.videoUrl ? (
                        <div className="relative pb-[56.25%] h-0">
                          <iframe 
                            src={testimonial.videoUrl} 
                            title={`Testimonial from ${testimonial.name}`}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : testimonial.image && testimonial.image.length > 0 ? (
                        <img 
                          src={testimonial.image[0]} 
                          alt={`Testimonial from ${testimonial.name}`}
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No media available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                      <div className="flex mb-4">
                        {Array.from({ length: testimonial.stars }).map((_, i) => (
                          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                          <Star key={i} size={20} className="text-gray-300" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 italic mb-6 text-lg">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.position}</p>
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
                <h3 className="text-2xl font-bold mb-4">Ready to experience the TESPA difference?</h3>
                <p className="mb-6">
                  Join hundreds of satisfied customers who have improved their measurement capabilities 
                  with our precision tools and expert support.
                </p>
                <Link 
                  to="/contact"
                  className="inline-block bg-white text-[#27a3d4] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Contact Us Today
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Testimonial