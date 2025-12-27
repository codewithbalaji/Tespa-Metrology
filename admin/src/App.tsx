import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import Index from './pages/Index'
import Enquiries from './pages/Enquiries'
import Careers from './pages/Careers'
import Testimonial from './pages/Testimonial'
import News from './pages/News'
import Edit from './pages/Edit'
import Applications from './pages/Applications'
export const backendUrl = import.meta.env.VITE_BACKEND_URL as string
export const currency = '$'

const App = () => {

  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      { token === "" ? <Login setToken={setToken} />: 
      <>
      <Navbar setToken={setToken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path='/' element={<Index token={token} />} />
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
            <Route path='/enquiries' element={<Enquiries token={token} />} />
            <Route path='/careers' element={<Careers token={token} />} />
            <Route path='/applications' element={<Applications token={token} />} />
            <Route path='/testimonial' element={<Testimonial token={token} />} />
            <Route path='/news' element={<News token={token} />} />
            <Route path='/edit/:id' element={<Edit token={token} />} />
            <Route path='*' element={<Index token={token} />} />
          </Routes>
        </div>
      </div>
      </>
      }
      
    </div>
  )
}

export default App
