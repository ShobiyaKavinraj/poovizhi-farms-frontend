import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('https://poovizhi-farms-backend.onrender.com/api/wishlist', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setWishlist(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch wishlist:', err.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isInWishlist = (productId, variantIndex) =>
    wishlist.some(
      (item) =>
        (item.productId === productId || item._id === productId) &&
        item.selectedVariantIndex === variantIndex
    );

  const addToWishlist = async (item) => {
    if (isInWishlist(item.productId || item._id, item.selectedVariantIndex || 0)) {
      console.log('ℹ️ Item already in wishlist.');
      setSidebarOpen(true);
      return { alreadyExists: true };
      
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/wishlist',
        {
          productId: item.productId || item._id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: parseFloat(item.price),
          selectedVariantIndex: item.selectedVariantIndex || 0,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

    //   setWishlist((prev) => [...prev, res.data.item]);
    //   setSidebarOpen(true);
    // } catch (err) {
    //   if (err.response?.status === 409) {
    //     console.log('ℹ️ Already in wishlist (server). Opening sidebar.');
    //     setSidebarOpen(true);
    //   } else {
    //     console.error('❌ Failed to add to wishlist:', err.message);
    //   }
    // }
    if (!res.data.alreadyExists) {
      setWishlist((prev) => [...prev, res.data.item]);
    }

    return res.data;
  } catch (err) {
    console.error('❌ Failed to add to wishlist:', err.message);
    return null;
  }
  };

  const removeFromWishlist = async (productId, variantIndex, refetchAfterDelete = false) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}/${variantIndex}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (refetchAfterDelete) {
        await fetchWishlist();
      } else {
        setWishlist((prev) =>
          prev.filter(
            (item) =>
                !(
                (item._id === productId || item.productId === productId) &&
                item.selectedVariantIndex === variantIndex
              )
          )
        );
      }
    } catch (err) {
      console.error('❌ Failed to remove from wishlist:', err.message);
    }
  };

  useEffect(() => {
    console.log('🟢 Wishlist updated:', wishlist);
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

