export interface KeyValuePair {
  key: string;
  value: string | number | boolean | string[];
}

export interface ProductFormData {
  // Basic Information
  name: string;
  slug?: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  model: string;
  company: string;
  
  // Images
  image1?: File;
  image2?: File;
  image3?: File;
  image4?: File;
  
  // Specifications section
  specifications: KeyValuePair[];
  
  // Features section
  features: string[];

  // Additional fields that will be converted to specifications
  businessType?: string[];
  certification?: string;
  measuringRange?: string;
  accuracy?: string;
  software?: string;
  color?: string;
  brandName?: string;
  application?: string;
  countryOfOrigin?: string;
  warranty?: string;
  driven?: string;
  power?: string;
  weight?: string;
  resolution?: string;
  voltage?: string;
  material?: string;
  displayType?: string;
  control?: string;
  workingTemp?: string;
  probingSystem?: string;
  afterSalesService?: string;
  subCategory?: string;
}

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
} 