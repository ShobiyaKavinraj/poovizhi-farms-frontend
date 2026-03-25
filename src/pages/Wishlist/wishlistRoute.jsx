import React from 'react';
import { WishlistProvider } from '../context/WishlistContext';
import WishlistPage from '../context/WishlistPage'; // or any component that uses the wishlist
import { UserProvider } from '../context/UserContext';

function wishlistRoute() {
  return (
    <UserProvider>
    <WishlistProvider>
      <WishlistPage />
    </WishlistProvider>
    </UserProvider>
  );
}

export default wishlistRoute;
