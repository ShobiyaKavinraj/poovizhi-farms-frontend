// productData.js

const products = [
  // Herbal Teas
  {
    _id: 1,
    name: 'Dry Avarampoo Tea',
    price: 95,
    quantity: '25g',
    imageUrl: '/img1.jpg',
    category: 'Herbal Tea',
    description: `Avarampoo tea is known for its cooling and detoxifying properties...`
  },
  {
    _id: 2,
    name: 'Dry Hibiscus Tea',
    price: 78,
    quantity: '25g',
    imageUrl: '/img2.jpg',
    category: 'Herbal Tea',
    description: `Dried Hibiscus petals create a vibrant, tart herbal tea...`
  },
  {
    _id: 10,
    name: 'Hibiscus Lemon Tea',
    price: 130,
    quantity: '100g',
    imageUrl: '/hibitea.png',
    category: 'Herbal Tea',
    description: `Refreshing blend of tangy hibiscus and lemon...`
  },
  {
    _id: 11,
    name: 'Lemon Tea',
    price: 180,
    quantity: '250ml',
    imageUrl: '/lemont.png',
    category: 'Herbal Tea',
    description: `Invigorating lemon tea with antioxidants and zesty flavor...`
  },

  // Dry Flower Powders
  {
    _id: 5,
    name: 'Hibiscus Dried Flower',
    price: 130,
    quantity: '100g',
    imageUrl: '/img6.jpg',
    category: 'Dry Flower Powders',
    description: `Naturally dried hibiscus flowers for tea, skincare, and hair masks...`
  },
  {
    _id: 7,
    name: 'Pure Hibiscus Powder',
    price: 199,
    quantity: '100g',
    imageUrl: '/img6.jpg',
    category: 'Dry Flower Powders',
    description: `Finely ground hibiscus flower powder for hair and skincare...`
  },
  {
    _id: 8,
    name: 'Pure Avarampoo Powder',
    price: 199,
    quantity: '100g',
    imageUrl: '/avapowder.jpg',
    category: 'Dry Flower Powders',
    description: `Avarampoo powder made from dried flowers for glowing skin...`
  },
  {
    _id: 9,
    name: 'Turmeric Powder',
    price: 120,
    quantity: '100g',
    imageUrl: '/tumericpowder.jpg',
    category: 'Dry Flower Powders',
    description: `Golden turmeric powder for immunity and inflammation...`
  },

  // Oils
  {
    _id: 3,
    name: 'Coconut Oil',
    variants: [
      { quantity: '500ml', price: 190 },
      { quantity: '1lt', price: 380 }
    ],
    imageUrl: '/coco.jpg',
    category: 'Oils',
    description: `Cold-pressed coconut oil — pure, aromatic, and multipurpose...`
  },

  // Malt Drinks
  {
    _id: 14,
    name: 'ABC Malt',
    price: 120,
    quantity: '100g',
    imageUrl: '/abcmalt.jpeg',
    category: 'Malt Drinks',
    description: `Wholesome malt made from almonds, bajra, and cashews...`
  },
  {
    _id: 15,
    name: 'Ragi Malt',
    price: 100,
    quantity: '100g',
    imageUrl: '/ragimalt.jpg',
    category: 'Malt Drinks',
    description: `Nutritious ragi-based malt loaded with calcium, iron...`
  },
  {
    _id: 16,
    name: 'BeetRoot Malt',
    price: 100,
    quantity: '100g',
    imageUrl: '/beetmalt.jpg',
    category: 'Malt Drinks',
    description: `Vibrant pink malt packed with beetroot goodness and energy...`
  },

  // Others
  {
    _id: 6,
    name: 'Jaggery Powder',
    variants: [
      { quantity: '500g', price: 65 },
      { quantity: '1Kg', price: 130 }
    ],
    imageUrl: '/img5.jpg',
    category: 'Others',
    description: `Unrefined jaggery powder with rich mineral content...`
  },
  {
    _id: 12,
    name: 'Lemon Dishwash Powder',
    price: 180,
    quantity: '250ml',
    imageUrl: '/lemonpremix.jpg',
    category: 'Others',
    description: `Natural lemon-based dishwashing powder for grease-free clean...`
  },
  {
    _id: 13,
    name: 'Lemon Premix Powder',
    price: 200,
    quantity: '250g',
    imageUrl: '/lemonpremix.jpg',
    category: 'Others',
    description: `Instant lemon drink premix with cane sugar...`
  }
];

export default products;
