import React, {  useState ,useEffect} from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
// import { useWishlist } from './WishlistContext'; // Wishlist disabled
import './product5.css';

const Products = () => {
  const { cartItems = [], addToCart, setCartSidebarOpen  } = useCart();
  // const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist disabled
const navigate = useNavigate();



  const [products,setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    // axios.get('http://localhost:5000/api/products')
    axios.get('https://poovizhi-farms-backend.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  // const handleToggleWishlist = (product) => {
  //   const variantKey = product.variants ? `variant-${selectedVariants[product._id] || 0}` : 'default';
  //   const exists = wishlistItems.some(
  //     item => item.productId === product._id && item.variantKey === variantKey
  //   );
  //   if (exists) {
  //     removeFromWishlist(product._id, variantKey);
  //     alert(`${product.name} removed from wishlist`);
  //   } else {
  //     const variantIndex = selectedVariants[product._id] || 0;
  //     const variant = product.variants?.[variantIndex];
  //     const itemToAdd = {
  //       productId: product._id,
  //       name: product.name,
  //       price: variant?.price || product.price,
  //       quantity: variant?.quantity || 1,
  //       imageUrl: product.imageUrl,
  //       variantKey,
  //     };
  //     addToWishlist(itemToAdd.productId, itemToAdd.variantKey);
  //     alert(`${product.name} added to wishlist`);
  //   }
  // };

  const handleAddToCart = (product) => {
    const variantIndex = selectedVariants[product._id] || 0;
    const variant = product.variants?.[variantIndex];
    const quantity = quantities[product._id] || 1;

    const cartItem = {
      ...product,
      price: variant?.price || product.price,
      quantity,
      selectedVariantIndex: variantIndex,
    };

    const exists = cartItems.some(
      item => item._id === product._id && item.selectedVariantIndex === variantIndex
    );

    if (exists) {
      // alert(`${product.name} is already in the cart`);
      return;
    }

    addToCart(cartItem);
    setCartSidebarOpen(true);
    // alert(`${product.name} added to cart!`);
  };

  // const isInWishlist = (product) => {
  //   const variantKey = product.variants ? `variant-${selectedVariants[product._id] || 0}` : 'default';
  //   return wishlistItems.some(
  //     item => item.productId === product._id && item.variantKey === variantKey
  //   );
  // };

  return (
    <div className="product-page">
      <div className="product-page-header">
      <div className="header-product-left">
        <button className="back-product-button" onClick={() => navigate('/')}>←</button>
        </div>
      <div className="header-product-center">
        <h2 className="section-title">Our Products For You</h2>
      </div>
      </div>
      
      <div className="product-grid">
        {products.map(product => {
          const variantIndex = selectedVariants[product._id] || 0;
          const variant = product.variants?.[variantIndex];
          const quantity = quantities[product._id] || 1;
          const inCart = cartItems.some(
            item => item._id === product._id && item.selectedVariantIndex === variantIndex
          );

          return (
            <div className="product-card" key={product._id}>
              <div className="image-hover-wrapper">
                <Link to={`/products/${product._id}?variant=${variantIndex}`}>
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200x200'}
                    alt={product.name}
                    className="product-image"
                  />
                </Link>

                {/* Green-style Add to Cart hover box */}
                <div className="add-to-cart-hover-box">
                  <div className="qty-controls">
                    <button className="qtybtn" onClick={(e) => { e.preventDefault(); handleQuantityChange(product._id, -1); }}>−</button>
                    <span>{quantity}</span>
                    <button className="qtybtn" onClick={(e) => { e.preventDefault(); handleQuantityChange(product._id, 1); }}>+</button>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                    disabled={inCart}
                  >
                    🛒
                  </button>
                </div>
              </div>

              <h3 className="product-name">{product.name}</h3>

              {product.variants?.length > 0 ? (
                <>
                  <div className="product-variant-selector">
                    {product.variants.map((v, index) => (
                      <button
                        key={index}
                        className={`product-variant-btn ${variantIndex === index ? 'active' : ''}`}
                        onClick={() =>
                          setSelectedVariants(prev => ({ ...prev, [product._id]: index }))
                        }
                      >
                        {v.quantity} - ₹{v.price}
                      </button>
                    ))}
                  </div>
                  <p className="product-price-selected">
                    Selected: {variant?.quantity} - ₹{variant?.price}
                  </p>
                </>
              ) : (
                <p className="product-price">Price: ₹{product.price}</p>
              )}

              {/* Wishlist icon removed */}
              {/* <div className="product-icon-row">
                <div
                  className="product-wishlist-icon"
                  onClick={() => handleToggleWishlist(product)}
                  title={isInWishlist(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isInWishlist(product) ? '❤️' : '♡'}
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

