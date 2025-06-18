import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

function generateSlug (name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

const addProduct = async (req, res) => {
    try {
        const { 
            name, description, price, category, stock,
            specifications, features, company, model
        } = req.body;

        // Generate slug
        let slug = generateSlug(name)
        // Ensure slug is unique
        let existing = await productModel.findOne({ slug })
        let suffix = 1
        while (existing) {
          slug = `${generateSlug(name)}-${suffix}`
          existing = await productModel.findOne({ slug })
          suffix++
        }

        // Process images
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        if (images.length === 0) {
            return res.json({ success: false, message: "At least one image is required" });
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        
        // Parse JSON strings for flexible sections
        const parsedSpecifications = specifications ? JSON.parse(specifications) : [];
        const parsedFeatures = features ? JSON.parse(features) : [];

        // Create product data object
        const productData = {
            name,
            slug,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            company,
            model,
            image: imagesUrl,
            
            // Flexible sections
            specifications: parsedSpecifications,
            features: parsedFeatures,
            
            // Timestamp
            date: Date.now()
        }

        console.log("Product data being saved:", productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product added successfully" })
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        
        if (!product) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const updateField = async (req, res) => {
    try {
        const { id, field, value } = req.body;
        
        if (value < 0) {
            return res.json({ success: false, message: `${field} cannot be negative` });
        }

        // Only allow updating price and stock
        if (!['price', 'stock'].includes(field)) {
            return res.json({ success: false, message: "Invalid field to update" });
        }

        const update = { [field]: value };
        const product = await productModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ 
            success: true, 
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`, 
            product 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Edit product controller
const editProduct = async (req, res) => {
  try {
    const { id } = req.body
    const { name, description, price, category, stock, specifications, features, company, model } = req.body

    // Generate slug
    let slug = generateSlug(name)
    // Ensure slug is unique (except for this product)
    let existing = await productModel.findOne({ slug, _id: { $ne: id } })
    let suffix = 1
    while (existing) {
      slug = `${generateSlug(name)}-${suffix}`
      existing = await productModel.findOne({ slug, _id: { $ne: id } })
      suffix++
    }

    // Parse flexible sections
    const parsedSpecifications = specifications ? JSON.parse(specifications) : []
    const parsedFeatures = features ? JSON.parse(features) : []

    // Handle images
    let imagesUrl = []
    if (req.files && Object.keys(req.files).length > 0) {
      const image1 = req.files.image1 && req.files.image1[0]
      const image2 = req.files.image2 && req.files.image2[0]
      const image3 = req.files.image3 && req.files.image3[0]
      const image4 = req.files.image4 && req.files.image4[0]
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
          return result.secure_url
        })
      )
    }

    // Build update object
    const update = {
      name,
      slug,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      company,
      model,
      specifications: parsedSpecifications,
      features: parsedFeatures
    }
    if (imagesUrl.length > 0) {
      update.image = imagesUrl
    }

    const product = await productModel.findByIdAndUpdate(id, update, { new: true })
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }
    res.json({ success: true, message: "Product updated successfully", product })
  } catch (error) {
    console.error("Error editing product:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export {addProduct, listProduct, removeProduct, singleProduct, updateField, editProduct}