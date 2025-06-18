import mongoose from "mongoose";

const keyValuePairSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
    // Basic product information (required fields)
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    model: { type: String, required: true },
    company: { type: String, required: true },
    
    // Flexible sections
    specifications: [keyValuePairSchema],
    features: { type: [String], default: [] },
    
    // Timestamp
    date: { type: Date, default: Date.now }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;