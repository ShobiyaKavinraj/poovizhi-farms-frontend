import React from 'react';
import SlideShow from '../../homecomponents/SlideShow';
import HighlightBanner from '../../homecomponents/HighlightBanner';
import OurProductPage from '../../homecomponents/OurProductPage';
import Add from '../../homecomponents/Add';
import HomeVideoGallery from '../../homecomponents/HomeVideoGallery';
import WhyChoosePoovizhi from '../../homecomponents/WhyChoosePoovizhi';

const Home = () => {
  return (
    <div>
      <SlideShow />
      <HighlightBanner />
      <OurProductPage />
      <Add />
      <HomeVideoGallery />
      <WhyChoosePoovizhi />
    </div>
  );
};

export default Home;
