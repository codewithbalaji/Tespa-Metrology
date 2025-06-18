import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, Briefcase, MapPin, GraduationCap, FileText, Upload, ChevronDown, ChevronUp, X, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { ShopContext } from '@/context/ShopContext';
import { Helmet } from 'react-helmet-async'

interface Job {
  _id: string;
  title: string;
  location: string;
  qualification: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Careers = () => {
  const { toast } = useToast();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    fetchJobs();
  }, [backendUrl]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching jobs from:', `${backendUrl}/api/dashboard/careers`);
      const response = await axios.get(`${backendUrl}/api/dashboard/careers`);
      
      console.log('Jobs response:', response.data);

      if (response.data.success) {
        setJobs(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to fetch jobs');
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to fetch jobs',
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch jobs';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleJobExpand = (jobId: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
    }
  };

  const handleApply = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setShowApplyForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB
      
      if (file.size > maxSize) {
        toast({
          title: 'Error',
          description: 'File size should not exceed 2MB',
          duration: 3000,
        });
        e.target.value = '';
        return;
      }
      
      setFileSelected(true);
      setFileName(file.name);
    } else {
      setFileSelected(false);
      setFileName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
      const response = await axios.post(`${backendUrl}/api/careers/applications/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Thank you for your interest. We\'ll review your application and get back to you soon.',
          duration: 5000,
        });
        setShowApplyForm(false);
        setSelectedJobTitle('');
        setFileSelected(false);
        setFileName('');
        formElement.reset();
      } else {
        throw new Error(response.data.message || 'Failed to submit application');
      }
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to submit application. Please try again.',
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#27a3d4]"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchJobs} className="bg-[#27a3d4] hover:bg-[#1d8cb8]">
            Try Again
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers | Tespa Metrology</title>
        <meta name="description" content="Join Tespa Metrology and build a rewarding career in the metrology industry. View current job openings and apply online." />
        <link rel="canonical" href={`${publicUrl}/careers`} />
      </Helmet>
      <MainLayout>
        <div className="bg-[#f8f9fa] min-h-screen">
          {/* Header Section */}
          <div className="bg-white shadow-sm py-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Careers</h1>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Link to="/" className="hover:text-[#27a3d4]">Home</Link>
                <ChevronRight size={14} className="mx-2" />
                <span className="text-gray-700 font-medium">Careers</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            {showApplyForm ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                  <div className="p-6 bg-[#27a3d4] text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Application Form: {selectedJobTitle}</h2>
                    <button 
                      onClick={() => setShowApplyForm(false)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-semibold mb-6">Send Your Resume</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name*
                        </label>
                        <Input id="name" name="name" required />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email*
                        </label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                      
                      <div>
                        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1">
                          Qualification*
                        </label>
                        <Input id="qualification" name="qualification" required />
                      </div>
                      
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                          Position Apply*
                        </label>
                        <Input id="position" name="position" defaultValue={selectedJobTitle} required />
                      </div>
                      
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile No.*
                        </label>
                        <Input id="mobile" name="mobile" required />
                      </div>
                      
                      <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                          Upload Your Resume:
                        </label>
                        <div className="flex items-center">
                          <label htmlFor="resume" className="cursor-pointer">
                            <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                              <Upload size={16} className="text-gray-700" />
                              <span className="text-sm text-gray-700">Choose File</span>
                            </div>
                            <input 
                              type="file" 
                              id="resume" 
                              name="resume"
                              className="hidden" 
                              accept=".pdf,.doc,.docx" 
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                          <span className="ml-3 text-sm text-gray-500">
                            {fileSelected ? fileName : 'No file chosen'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message*
                        </label>
                        <Textarea id="message" name="message" className="min-h-[120px]" required />
                      </div>
                      
                      <Button type="submit" className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Intro Section */}
                <motion.div 
                  className="max-w-3xl mx-auto text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase size={48} className="mx-auto mb-6 text-[#27a3d4]" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Team</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    At TESPA Tools, we're always looking for talented individuals who are passionate about precision, 
                    quality, and innovation. Join us to build a rewarding career in the metrology industry.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center px-4 py-2 bg-[#e6f7ff] rounded-full">
                      <GraduationCap size={18} className="text-[#27a3d4] mr-2" />
                      <span className="text-gray-700">Professional Growth</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-[#e6f7ff] rounded-full">
                      <Users size={18} className="text-[#27a3d4] mr-2" />
                      <span className="text-gray-700">Collaborative Environment</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-[#e6f7ff] rounded-full">
                      <Globe size={18} className="text-[#27a3d4] mr-2" />
                      <span className="text-gray-700">International Exposure</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Jobs Section */}
                <motion.div 
                  className="max-w-4xl mx-auto mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-8">Current Openings</h3>
                  
                  <div className="space-y-6">
                    {jobs.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No job openings available at the moment.
                      </div>
                    ) : (
                      jobs.map((job) => (
                        <motion.div 
                          key={job._id}
                          className="bg-white shadow-md rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div 
                            className={cn(
                              "p-6 cursor-pointer hover:bg-gray-50 transition-colors",
                              expandedJob === job._id ? "border-b border-gray-200" : ""
                            )}
                            onClick={() => toggleJobExpand(job._id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                                  <Briefcase size={18} className="text-[#27a3d4] mr-2" />
                                  {job.title}
                                </h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <MapPin size={14} className="mr-1" /> 
                                    <span>{job.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <GraduationCap size={14} className="mr-1" /> 
                                    <span>{job.qualification}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Button
                                  className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white mr-4 hidden sm:inline-flex"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApply(job.title);
                                  }}
                                >
                                  Apply Now
                                </Button>
                                {expandedJob === job._id ? (
                                  <ChevronUp size={20} className="text-gray-500" />
                                ) : (
                                  <ChevronDown size={20} className="text-gray-500" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {expandedJob === job._id && (
                            <div className="p-6 bg-gray-50">
                              <div className="mb-6">
                                <h5 className="font-semibold text-gray-800 mb-2">Job Description</h5>
                                <p className="text-gray-700">{job.description}</p>
                              </div>
                              
                              <div className="mb-6">
                                <h5 className="font-semibold text-gray-800 mb-2">Responsibilities</h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                  {job.responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="mb-6">
                                <h5 className="font-semibold text-gray-800 mb-2">Requirements</h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                  {job.requirements.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <Button 
                                className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white sm:hidden"
                                onClick={() => handleApply(job.title)}
                              >
                                Apply Now
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Careers;
