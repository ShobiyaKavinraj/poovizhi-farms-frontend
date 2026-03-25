import React from 'react'
import Products from './Products';
import HighlightBanner from '../../homecomponents/HighlightBanner';
import HomeVideoGallery from '../../homecomponents/HomeVideoGallery';

function ProductPage() {
  return (
    <div>
        <Products/>
        <HighlightBanner />
        <HomeVideoGallery />
    </div>
  ) 
}

export default ProductPage;