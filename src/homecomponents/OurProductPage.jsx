import React, { useEffect, useState ,} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
// import { useWishlist } from './WishlistContext'; 
import '../styles/productpage.css';


const OurProductPage = () => {
  const { cartItems = [], addToCart,setCartSidebarOpen } = useCart();
  // const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist disabled
// const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
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
    <div className="product-page-container">
      
      <div className="product-center-heading">
        <h2 className="section-product-title">Our Products For You</h2>
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

              {/*  Wishlist icon removed  */}
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

export default OurProductPage;

/*import './product5.css';
// import './products6.css';
import React, { useEffect, useState } from 'react';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useWishlist();
  const { cartItems = [], addToCart } = useCart();

  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleToggleWishlist = (product) => {
    const variantKey = product.variants ? `variant-${selectedVariants[product._id] || 0}` : 'default';

    const exists = wishlistItems.some(
      item => item.productId === product._id && item.variantKey === variantKey
    );

    if (exists) {
      removeFromWishlist(product._id, variantKey);
      alert(`${product.name} removed from wishlist`);
    } else {
      const variantIndex = selectedVariants[product._id] || 0;
      const variant = product.variants?.[variantIndex];

      const itemToAdd = {
        productId: product._id,
        name: product.name,
        price: variant?.price || product.price,
        quantity: variant?.quantity || 1,
        imageUrl: product.imageUrl,
        variantKey: variant ? `variant-${variantIndex}` : 'default',
      };

      addToWishlist(itemToAdd.productId, itemToAdd.variantKey);
      alert(`${product.name} added to wishlist`);
    }
  };

  // Updated handleAddToCart function with safeguard:
  const handleAddToCart = (product) => {
    if (!cartItems || !Array.isArray(cartItems)) {
      console.error("cartItems is not available yet");
      return;
    }

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
      alert(`${product.name} is already in the cart`);
      return;
    }

    addToCart(cartItem);
    alert(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const isInWishlist = (product) => {
    const variantKey = product.variants ? `variant-${selectedVariants[product._id] || 0}` : 'default';

    return wishlistItems.some(
      item => item.productId === product._id && item.variantKey === variantKey
    );
  };

  return (
   <div className="product-container">
  <div className="product-header">
    <h2 className="product-title">Our Products</h2>
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
          <Link to={`/products/${product._id}?variant=${variantIndex}`}>
            <div className="product-image-wrapper">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/200x200'}
                alt={product.name}
                className="product-image"
              />
            </div>
          </Link>

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
            <>
              <p className="product-price">Price: ₹{product.price}</p>
              <p className="product-quantity">Quantity: {product.quantity || 1}</p>
            </>
          )}

          <div className="product-quantity-controls">
            <button onClick={() => handleQuantityChange(product._id, -1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(product._id, 1)}>+</button>
          </div>

          <div className="product-icon-row">
            <div
              className="product-wishlist-icon"
              onClick={() => handleToggleWishlist(product)}
              title={isInWishlist(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              style={{ cursor: 'pointer' }}
            >
              {isInWishlist(product) ? '❤️' : '♡'}
            </div>

            <button
              className="product-cart-icon"
              onClick={() => handleAddToCart(product)}
              disabled={inCart}
              title={inCart ? 'In Cart' : 'Add to Cart'}
            >
              🛒
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>

    /*<div>
      <div className="cart-header">
        <h2 className="products-heading">Our Products</h2>
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
              <Link to={`/products/${product._id}?variant=${variantIndex}`}>
                <div className="product-img-wrapper">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/200x200'}
                    alt={product.name}
                    className="product-img"
                  />
                </div>
              </Link>

              <h3>{product.name}</h3>

              {product.variants?.length > 0 ? (
                <>
                  <div
                    className="variant-selector"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "8px",
                      margin: "10px 0",
                      width: "100%",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      paddingBottom: "5px",
                    }}
                  >
                    {product.variants.map((v, index) => (
                      <button
                        key={index}
                        className={`variant-btn ${variantIndex === index ? 'active' : ''}`}
                        onClick={() =>
                          setSelectedVariants(prev => ({ ...prev, [product._id]: index }))
                        }
                      >
                        {v.quantity} - ₹{v.price}
                      </button>
                    ))}
                  </div>
                  <p className="selected-price">
                    Selected: {variant?.quantity} - ₹{variant?.price}
                  </p>
                </>
              ) : (
                <>
                  <p className="selected-price">Price: ₹{product.price}</p>
                  <p className="quantity">Quantity: {product.quantity || 1}</p>
                </>
              )}

              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(product._id, 1)}>+</button>
              </div>

              <div className="icon-row">
                <div
                  className="wishlist-icons"
                  onClick={() => handleToggleWishlist(product)}
                  title={isInWishlist(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  style={{ cursor: 'pointer' }}
                >
                  {isInWishlist(product) ? '❤️' : '♡'}
                </div>

                <button
                  className="add-to-cart-icon"
                  onClick={() => handleAddToCart(product)}
                  disabled={inCart}
                  title={inCart ? 'In Cart' : 'Add to Cart'}
                >
                  🛒
                </button> 
              </div>
            </div>
          );
        })}
      </div>
    </div>*
  );
};

export default Products;*/
