import React from 'react';
import './about1.css';
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="poovizhi-farms">
      <div className="about-header">
        <button className="about-back-bttn" onClick={() => navigate(-1)}>←</button>
        <h1 className="about_headline">About Us</h1>
      </div>
      {/* Introduction Section */}
      <section className="intro">
        <h1 className='poovizhi-heading'>Poovizhi Farms: A Commitment to Nature and Purity</h1>
        <p>
          Poovizhi Farms stands as a beacon of sustainable agriculture, deeply rooted in the principles of organic farming.
          Our mission is to cultivate pure, chemical-free products that nourish both body and soul, while fostering a
          harmonious relationship with nature.
        </p>
      </section>

      {/* Organic Farming Section */}
      <section className="organic-farming">
        <h2 className='poovizhi-subheading'>🌱 What Is Organic Farming?</h2>
        <img src='farm.webp' alt='farm' />
        <p>
          Organic farming is a holistic approach to agriculture that emphasizes the use of natural processes and materials.
          It excludes synthetic pesticides, fertilizers, genetically modified organisms (GMOs), and growth hormones. Instead,
          it incorporates practices like crop rotation, composting, and biological pest control to maintain soil health and
          biodiversity. This method not only produces healthier food but also promotes environmental sustainability by reducing
          pollution and conserving water.
        </p>
        <div className="references">
          <p><b>References:</b> <a href="https://www.thespruceeats.com/what-does-organic-really-mean-1708952">The Spruce Eats</a>, <a href="https://en.wikipedia.org/wiki/Organic_farming">Wikipedia</a></p>
        </div>
      </section>

      {/* Production Team Section */}
      <section className="production-team">
        <h2 className='poovizhi-subheading'>👩‍🌾 The Heartbeat of Poovizhi Farms: Our Production Team</h2>
        <p>
          At Poovizhi Farms, our dedicated team is the cornerstone of our operations. From soil preparation to harvesting, each
          member plays a vital role in ensuring the highest quality of produce. Our team embraces traditional farming methods,
          combined with modern sustainable practices, to cultivate a diverse range of crops.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2 className='poovizhi-subheading'>🌍 Our Mission</h2>
        <p>Our mission is to:</p>
        <ul>
          <li><strong>Promote Sustainable Agriculture:</strong> Implement farming practices that preserve the environment for future generations.</li>
          <li><strong>Provide Chemical-Free Products:</strong> Offer consumers healthy, natural produce free from harmful chemicals.</li>
          <li><strong>Support Local Communities:</strong> Engage with and uplift local farmers and artisans through fair trade and cooperative initiatives.</li>
        </ul>
      </section>

      {/* Goals Section */}
      <section className="goals">
        <h2 className='poovizhi-subheading'>🌍 Our Goals</h2>
        <ul>
          <li><strong>Enhance Soil Fertility:</strong> Utilize composting and crop rotation to maintain and improve soil health.</li>
          <li><strong>Increase Biodiversity:</strong> Encourage a variety of crops and natural predators to create a balanced ecosystem.</li>
          <li><strong>Educate and Inspire:</strong> Raise awareness about the benefits of organic farming and inspire others to adopt sustainable practices.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
