import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import EnquirySection from '@/components/home/EnquirySection';
import TespaGroupSection from '@/components/home/TespaGroupSection';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'

const publicUrl = import.meta.env.VITE_PUBLIC_URL

const Index = () => {

  return (
    <>
      <Helmet>
        <title>Home | Tespa Metrology</title>
        <meta name="description" content="Tespa Metrology is a leader in precision measurement solutions, offering advanced metrology tools, calibration, and industrial services since 1983." />
        <link rel="canonical" href={publicUrl + '/'} />
        <meta property="og:title" content="Page Title | Tespa Metrology" />
        <meta property="og:description" content="Tespa Metrology is a leader in precision measurement solutions..." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={publicUrl + '/og-image.jpg'} />
        <meta property="og:image" content={publicUrl + '/og-image.jpg'} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Title | Tespa Metrology" />
        <meta name="twitter:description" content="..." />
        <meta name="twitter:image" content={publicUrl + '/og-image.jpg'} />
      </Helmet>
      <motion.div
        className="flex flex-col min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />

        <main className="flex-grow">
          <HeroSection />
          <TespaGroupSection />
          <ProductsSection />
          <EnquirySection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
