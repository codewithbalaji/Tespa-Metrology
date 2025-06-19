import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Calibration from "./pages/Calibration";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import { ToastContainer } from "react-toastify";
import Testimonial from "./pages/Testimonial";
import News from "./pages/News";
import Chatbot from "./components/Chatbot";
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from "./components/ScrollToTop.";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
        <ScrollToTop />
          <ShopContextProvider>
            <ToastContainer position="bottom-right" />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/calibration" element={<Calibration />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/collection" element={<Collection/>}/>
              <Route path="/product/:slug" element={<Product/>}/>
              <Route path="/place-order" element={<PlaceOrder/>}/>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/verify" element={<Verify/>}/>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </ShopContextProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
