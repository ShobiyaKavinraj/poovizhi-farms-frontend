import React, { useState } from 'react';
import products from './productData';
import './groupProduct.css';

// Mapping for category image thumbnails
const categoryImages = {
  'Herbal Tea': '/cat-herbaltea.jpg',
  'Dry Flower Powders': '/cat-powder.jpg',
  'Oils': '/cat-oil.jpg',
  'Malt Drinks': '/cat-malt.jpg',
  'Others': '/cat-others.jpg',
};

const groupProducts = (products) => {
  const groups = {
    'Herbal Tea': [],
    'Dry Flower Powders': [],
    'Oils': [],
    'Malt Drinks': [],
    'Others': []
  };

  for (const p of products) {
    const name = p.name.toLowerCase();
    if (name.includes('tea')) {
      groups['Herbal Tea'].push(p);
    } else if (name.includes('powder')) {
      groups['Dry Flower Powders'].push(p);
    } else if (name.includes('oil')) {
      groups['Oils'].push(p);
    } else if (name.includes('malt')) {
      groups['Malt Drinks'].push(p);
    } else {
      groups['Others'].push(p);
    }
  }

  return groups;
};

const groupedProducts = groupProducts(products);

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Herbal Tea');

  return (
    <div className="product-page">
      <h1 className="page-title">Explore Our Products</h1>

      {/* Category Thumbnails */}
      <div className="category-thumbnails">
        {Object.keys(groupedProducts).map((category) => (
          <div
            key={category}
            className={`category-thumb ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            <img src={categoryImages[category]} alt={category} />
            <p>{category}</p>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {groupedProducts[selectedCategory].map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-qty">
              {product.quantity || product.variants?.map(v => v.quantity).join(', ')}
            </p>
            <p className="product-price">₹{product.price || product.variants?.[0]?.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
