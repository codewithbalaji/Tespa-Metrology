import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Base URL of your website
const BASE_URL = process.env.VITE_PUBLIC_URL || 'https://tespametrology.com';

// API endpoint to fetch products
const API_URL = process.env.VITE_BACKEND_URL || 'https://api.tespametrology.com';

// Static routes
const staticRoutes = [
  '',
  'about',
  'products',
  'calibration',
  'contact',
  'news',
  'cart',
  'collection'
];

async function generateSitemap() {
  try {
    console.log('Generating sitemap...');
    
    // Fetch products from API
    const response = await axios.get(`${API_URL}/api/product/list`);
    const products = response.data.products || [];
    
    console.log(`Fetched ${products.length} products`);
    
    // Start XML content
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static routes
    for (const route of staticRoutes) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${BASE_URL}/${route}</loc>\n`;
      sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    }
    
    // Add dynamic product routes
    for (const product of products) {
      if (product.slug) {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${BASE_URL}/product/${product.slug}</loc>\n`;
        sitemap += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.7</priority>\n';
        sitemap += '  </url>\n';
      }
    }
    
    // Close XML
    sitemap += '</urlset>';
    
    // Write to file
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();