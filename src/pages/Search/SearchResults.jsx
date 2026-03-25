// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SearchResults.css';

// function SearchResults() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get('q') || '';
//   const [query, setQuery] = useState(initialQuery);
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/products/search?q=${initialQuery}`);
//         setResults(response.data);
//         console.log('Search results:', response.data);
//       } catch (error) {
//         console.error('Search error:', error);
//       }
//     };

//     if (initialQuery) {
//       fetchResults();
//     }
//   }, [initialQuery]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/search?q=${encodeURIComponent(query)}`);
//   };

//   return (
//     <div className="search-page-container">
//       <form onSubmit={handleSubmit} className="search-form">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search products..."
//           className="search-input"
//         />
//         <button type="submit" className="search-button">Search</button>
//         <button type="button" onClick={() => navigate('/')} className="back-search-button">← Back</button>
//       </form>

//       <div className="search-results">
//         <h3>Results:</h3>
//         {results.length > 0 ? (
//           <ul className="result-list">
//             {results.map((product) => (
//               <li key={product._id} onClick={() => navigate(`/products/${product._id}`)} className="result-item">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   style={{ width: '100px', marginRight: '10px' }}
//                 />
//                 <div>
//                   <strong>{product.name}</strong><br />
//                   ₹{product.price || product.variants?.[0]?.price}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No matching products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchResults;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './searchsidebar.css';

function SearchResults({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(false); // for smooth animation

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://poovizhi-farms-backend.onrender.com/api/products/search?q=${initialQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    };
    if (initialQuery) fetchResults();
  }, [initialQuery]);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
    onClose();
  };

  if (!visible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} onClick={onClose}></div>

      {/* Sidebar */}
      <div className={`search-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="search-header">
          <h2 className="search-title">Explore Our Selection</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <div className="search-results">
          {results.length > 0 ? (
            <ul className="result-list">
              {results.map(product => (
                <li key={product._id} className="result-item" onClick={() => handleProductClick(product._id)}>
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="result-info">
                    <strong>{product.name}</strong>
                    <span>₹{product.price || product.variants?.[0]?.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No matching products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
