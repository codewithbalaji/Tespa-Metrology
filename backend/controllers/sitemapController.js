import productModel from "../models/productModel.js";
import newsModel from "../models/newsModel.js";

const generateSitemap = async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://tespa-metrology.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Fetch all products
    const products = await productModel.find({}, 'slug');
    
    // Fetch all news articles if the model exists
    let newsArticles = [];
    try {
      newsArticles = await newsModel.find({}, 'slug');
    } catch (error) {
      console.log('News model might not exist or other error:', error.message);
    }
    
    // Start XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/products', priority: '0.9', changefreq: 'weekly' },
      { url: '/calibration', priority: '0.7', changefreq: 'monthly' },
      { url: '/clients', priority: '0.6', changefreq: 'monthly' },
      { url: '/careers', priority: '0.7', changefreq: 'weekly' },
      { url: '/testimonial', priority: '0.6', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
      { url: '/news', priority: '0.7', changefreq: 'weekly' },
    ];
    
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    // Add product pages
    products.forEach(product => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/product/${product.slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
    
    // Add news article pages if they exist
    newsArticles.forEach(article => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/news/${article.slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });
    
    // Close XML
    xml += '</urlset>';
    
    // Set appropriate headers and send response
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { generateSitemap };