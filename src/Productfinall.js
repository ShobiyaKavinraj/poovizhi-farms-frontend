import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { Heart, ShoppingCart } from 'lucide-react';
import './Productfinall.css'; // Make sure this CSS is added

const Products = () => {
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleToggleWishlist = (product) => {
    const exists = wishlistItems.some(item => item.productId === product._id);
    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        productId: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
      });
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product); // Context handles variant/quantity
  };

  return (
    <div className="products-grid">
      {products.map(product => (
        <div className="product-float-card" key={product._id}>
          <div className="product-image-wrap">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
          </div>
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>

            <p className="product-price">
              ₹{product.variants ? product.variants[0].price : product.price}
              <span className="product-quantity">
                {product.variants ? ` (${product.variants[0].quantity})` : ` (${product.quantity})`}
              </span>
            </p>

            <div className="product-actions">
              <button onClick={() => handleToggleWishlist(product)} className="icon-btn">
                <Heart fill={wishlistItems.some(item => item.productId === product._id) ? 'red' : 'none'} />
              </button>
              <button onClick={() => handleAddToCart(product)} className="icon-btn">
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
