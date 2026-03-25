import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'

import axios from 'axios';
import './productsDetail.css';
// import CartItem from '../Checkout/CartItem';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToWishlist, removeFromWishlist, isInWishlist, setSidebarOpen } = useWishlist();
const { cart, addToCart, setCartSidebarOpen } = useCart(); // ⬅ add setCartSidebarOpen


  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const variantParam = searchParams.get('variant');

  useEffect(() => {
    const index = parseInt(variantParam, 10);
    setSelectedVariantIndex(isNaN(index) ? 0 : index);
  }, [variantParam]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const response = await axios.get(`https://poovizhi-farms-backend.onrender.com/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const parseDescription = (desc = '') => {
    const benefitsMatch = desc.match(/✨ Benefits:\n([\s\S]*?)\n\n/);
    const howToUseMatch = desc.match(/☕ How to Use:\n([\s\S]*)/);

    const benefits = benefitsMatch
      ? benefitsMatch[1].split('\n').map(line => line.replace(/^- /, '').trim())
      : [];

    const howToUse = howToUseMatch
      ? howToUseMatch[1].split('\n').map(line => line.replace(/^- /, '').trim())
      : [];

    let mainDescription = desc;
    if (benefitsMatch) mainDescription = mainDescription.replace(benefitsMatch[0], '');
    if (howToUseMatch) mainDescription = mainDescription.replace(howToUseMatch[0], '');

    return {
      mainDescription: mainDescription.trim(),
      benefits,
      howToUse,
    };
  };

  if (!product) return <p>Loading...</p>;

  const variant = product.variants?.[selectedVariantIndex] || {
    price: product.price,
    quantity: product.quantity,
  };

  const { mainDescription, benefits, howToUse } = parseDescription(product.description);
  const inWishlist = isInWishlist(product._id, selectedVariantIndex);

  const handleAddToCart = () => {
    const exists = cart.some(c => c._id === product._id && c.selectedVariantIndex === selectedVariantIndex);
    if (exists) {
      alert(`${product.name} is already in the cart`);
      return;
    }

    const itemToAdd = {
      ...product,
      price: variant.price,
      quantity,
      selectedVariantIndex,
    };

    addToCart(itemToAdd);
    setCartSidebarOpen(true); 
    // alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    const itemToBuy = {
      ...product,
      price: variant.price,
      quantity,
      selectedVariantIndex,
    };
    // sessionStorage.setItem('buyNowItem', JSON.stringify(itemToBuy));

    navigate('/checkout',{
      state :{
        cart: [itemToBuy]
      }
    });
  };

//   const handleWishlistToggle = () => {
//     const item = {
//       productId: product._id,
//       name: product.name,
//       imageUrl: product.imageUrl,
//       price: variant.price,
//       selectedVariantIndex,
//       quantity: variant.quantity?.toString() || '1',
//     };

//     if (inWishlist) {
//       removeFromWishlist(product._id, selectedVariantIndex);
//       // alert(`${product.name} removed from wishlist`);
    
//       } else {
//   addToWishlist(item);
//   setSidebarOpen(true); 
  
//   // alert(`${product.name} added to wishlist`);
// }

//     //   addToWishlist(item);
//     //   alert(`${product.name} added to wishlist`);
//     // }
//   };
const handleWishlistToggle = async () => {
  const item = {
    productId: product._id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: variant.price,
    selectedVariantIndex,
    quantity: variant.quantity?.toString() || '1',
  };

  if (inWishlist) {
    await removeFromWishlist(product._id, selectedVariantIndex);
    console.log(`${product.name} removed from wishlist`);
    return;
  }

  // If not in wishlist, try adding
  const added = await addToWishlist(item); // We'll make this return info from server
  if (added?.alreadyExists) {
    console.log('ℹ️ Already in wishlist (server). Opening sidebar.');
  }
  
  setSidebarOpen(true);
};

  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <button onClick={() => navigate('/products')} className="back-button">←</button>
        {/* <h2>{product.name}</h2> */}
      </div>

      <div className="product-details-body">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} className="product-img" />
        </div>

        {/* <div className="product-info">
          <div className="product-description">
            <p style={{ whiteSpace: 'pre-line' }}>{mainDescription}</p> */}
<div className="product-info">
  <h2>{product.name}</h2>
  <div className="product-description">
    <p style={{ whiteSpace: 'pre-line' }}>{mainDescription}</p>

            {benefits.length > 0 && (
              <>
                <h3 className="highlighted-heading">✨ Benefits:</h3>
                <ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </>
            )}

            {howToUse.length > 0 && (
              <>
                <h3 className="highlighted-heading">☕ How to Use:</h3>
                <ul>{howToUse.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </>
            )}
          </div>

          {product.variants?.length > 0 && (
            <div className="variant-selector">
              {product.variants.map((v, index) => (
                <button
                  key={index}
                  className={`variant-btn ${selectedVariantIndex === index ? 'active' : ''}`}
                  onClick={() => setSelectedVariantIndex(index)}
                >
                  {v.quantity} - ₹{v.price}
                </button>
              ))}
            </div>
          )}

          <div className="product-price">
            <p>Price: ₹{variant.price}</p>
            {product.variants?.length > 0 && <p>Quantity: {variant.quantity}</p>}
          </div>

          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => q - 1)} disabled={quantity <= 1}>-</button>
            <input type="number" value={quantity} readOnly />
            <button
              onClick={() => setQuantity(q => q + 1)}
              disabled={quantity >= variant.quantity}
            >+</button>
          </div>

          <div className="product-actions">
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
            <button onClick={handleWishlistToggle} className="wishlist-btn">
              {inWishlist ? '💔 Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
