import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import {
  ChevronRight,
  Check,
  Info,
  MessageSquareHeart,
  ShoppingCart,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import EnquiryModal from "../components/EnquiryModal";
import { Helmet } from "react-helmet-async";

// Add this interface for type safety
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  category: string;
  subCategory: string;
  stock: number;
  model: string;
  image: string[];
  specifications: Array<{
    key: string;
    value: string | number | boolean | string[];
  }>;
  features: string[];
  businessType?: string[];
  certification?: string;
  deliveryTime?: string;
  measuringRange?: string;
  accuracy?: string;
  software?: string;
  slug: string;
  company?: string;
}

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

const Product = () => {
  const { slug } = useParams();
  const { products, currency, addToCart, isIndianUser } =
    useContext(ShopContext);
  const [productData, setProductData] = useState<Product | null>(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const fetchProductData = async () => {
    if (products && products.length > 0) {
      const product = products.find((item) => item.slug === slug);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [slug, products]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `$${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  if (!productData) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27a3d4]"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{productData.name} | Tespa Metrology</title>
        <meta
          name="description"
          content={productData.description}
        />
        <link
          rel="canonical"
          href={`${publicUrl}/product/${productData.slug}`}
        />
      </Helmet>
      <MainLayout>
        {/* Breadcrumb */}
        <div className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500 py-2">
              <Link to="/" className="hover:text-[#27a3d4]">
                Home
              </Link>
              <ChevronRight size={14} className="mx-2" />
              <Link to="/products" className="hover:text-[#27a3d4]">
                Products
              </Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-gray-700 font-medium line-clamp-1">
                {productData.name}
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Product Main Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Images */}
              <div className="w-full lg:w-2/5">
                <div
                  className="mb-4 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4"
                  style={{ height: "400px" }}
                >
                  <img
                    src={image}
                    alt={productData.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {productData.image.map((img: string, index: number) => (
                    <div
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 border rounded cursor-pointer p-1 ${
                        img === image ? "border-[#27a3d4]" : "border-gray-200"
                      }`}
                      onClick={() => setImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${productData.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-3/5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {productData.name}
                </h1>

                <div className="flex items-center gap-1 mb-4">
                  <p className="text-sm text-gray-500">{productData.model}</p>
                </div>

                {/* Price, Quantity, Add to Cart or Enquiry */}
                <div className="mb-6">
                  {isIndianUser ? (
                    <Button
                      onClick={() => setShowEnquiryModal(true)}
                      className="w-full md:w-auto bg-[#27a3d4] hover:bg-[#1d8cb8] text-white py-3 px-8 rounded-md flex items-center justify-center gap-2"
                    >
                      <MessageSquareHeart size={20} />
                      <span>Send Enquiry</span>
                    </Button>
                  ) : (
                    <>
                      {productData.price > 0 && (
                        <div className="flex items-center mb-4">
                          <span className="text-3xl font-bold text-[#27a3d4]">
                            {formatPrice(productData.price)}
                          </span>
                          {productData.mrp &&
                            productData.mrp > productData.price && (
                              <span className="ml-3 text-gray-500 line-through text-lg">
                                {formatPrice(productData.mrp)}
                              </span>
                            )}
                        </div>
                      )}
                      {productData.price > 0 ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                              onClick={handleDecreaseQuantity}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0) {
                                  setQuantity(value);
                                }
                              }}
                              className="w-16 text-center border-x py-2 focus:outline-none"
                            />
                            <button
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                              onClick={handleIncreaseQuantity}
                            >
                              +
                            </button>
                          </div>
                          <Button
                            onClick={() => addToCart(productData._id, quantity)}
                            className="bg-[#27a3d4] hover:bg-[#1d8cb8] text-white py-3 px-8 rounded-md flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={20} />
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex items-center">
                          <Info size={18} className="text-[#27a3d4] mr-2" />
                          <span className="text-gray-700">
                            Please enquire for pricing information
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">{productData.description}</p>
                </div>

                {/* Key Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {productData.model && (
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Model:</span>{" "}
                        {productData.model}
                      </span>
                    </div>
                  )}
                  {productData.measuringRange && (
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Measuring Range:</span>{" "}
                        {productData.measuringRange}
                      </span>
                    </div>
                  )}
                  {productData.accuracy && (
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Accuracy:</span>{" "}
                        {productData.accuracy}
                      </span>
                    </div>
                  )}
                  {productData.software && (
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <span className="text-sm text-gray-700">
                        <span className="font-medium">Software:</span>{" "}
                        {productData.software}
                      </span>
                    </div>
                  )}
                </div>

                {/* Business Type and Certification */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {productData.businessType &&
                    productData.businessType.length > 0 && (
                      <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
                        {productData.businessType.join(", ")}
                      </div>
                    )}
                  {productData.certification && (
                    <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700">
                      {productData.certification}
                    </div>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Info size={16} className="text-[#27a3d4]" />
                  <span>
                    Delivery Time: {productData.deliveryTime || "3-4 Weeks"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "description"
                    ? "text-[#27a3d4] border-b-2 border-[#27a3d4]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "specifications"
                    ? "text-[#27a3d4] border-b-2 border-[#27a3d4]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "features"
                    ? "text-[#27a3d4] border-b-2 border-[#27a3d4]"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("features")}
              >
                Features & Benefits
              </button>
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="text-gray-700">
                  <p>{productData.description}</p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-2">
                  {/* Display model first as it's a required field */}
                  <div className="border-b pb-2">
                    <span className="font-medium text-gray-700">Model:</span>
                    <span className="ml-2 text-gray-600">
                      {productData.model}
                    </span>
                  </div>

                  {/* Display all specifications from the flexible section */}
                  {productData.specifications.map((spec, index) => (
                    <div key={index} className="border-b pb-2">
                      <span className="font-medium text-gray-700">
                        {spec.key}:
                      </span>
                      <span className="ml-2 text-gray-600">
                        {Array.isArray(spec.value)
                          ? spec.value.join(", ")
                          : spec.value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  {productData.features && productData.features.length > 0 ? (
                    <ul className="space-y-3">
                      {productData.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check
                            size={18}
                            className="text-green-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      No features listed for this product.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <RelatedProducts
              category={productData.category}
              subCategory={productData.subCategory}
              company={productData.company}
            />
          </div>
        </div>

        <EnquiryModal
          isOpen={showEnquiryModal}
          onClose={() => setShowEnquiryModal(false)}
          productName={productData?.name || ""}
          productId={productData?._id || ""}
        />
      </MainLayout>
    </>
  );
};

export default Product;
