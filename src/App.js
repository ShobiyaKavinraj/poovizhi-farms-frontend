import './App.css';
import './HeaderStyle.css';
import LoginForm from './pages/Forms/LoginForm';
import './pages/Forms/loginStyle.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, Suspense } from 'react';
import ContactUs from './pages/Info/ContactUs';
import Home from './pages/Home/Home';
import SignupForm from './pages/Forms/SignupForm';
import ForgotPasswordForm from './pages/Forms/ForgotPasswordForm';
import CartPage from './pages/Cart/CartPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import ErrorBoundary from './ErrorBoundary';
import AboutUs from './pages/Info/AboutUs';
import ThankYouPage from './MyAccount/ThankYouPage';
import ProductDetails from './pages/Product/ProductDetails';
import Addresses from './MyAccount/Addressess/Addresses';
import PrivateRoute from './PrivateRoute';
import ResetPasswordForm from './pages/Forms/ResetPasswordForm';
import Footer from './pages/Footer/Footer';
import Checkouts from './pages/Checkout/Checkouts';
import OrderHistory from './MyAccount/Orderhistory/OrderHistory';
import Dashboards from './MyAccount/Dashboard/Dashboards';
import Main from './pages/Header/Main';
import WishlistSidebar from './pages/Wishlist/WishlistSidebar';
import AdminOrderList from './Admin/AdminOrderList';
import WishlistPage from './pages/Wishlist/WishlistPage';
import ProductPage from './pages/Product/ProductPage';
import CartSidebar from './pages/Cart/CartSidebar';
import SearchResults from './pages/Search/SearchResults';

function App() {
  const [wishlistSidebarOpen, setWishlistSidebarOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [searchSidebarOpen, setSearchSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Open wishlist sidebar
  const handleWishlistAdd = () => setWishlistSidebarOpen(true);

  // Open search sidebar from header
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchSidebarOpen(true);
  };

  return (
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="App">
                <Main 
                  onWishlistAdd={handleWishlistAdd} 
                  onSearch={handleSearch} 
                />

                {/* Sidebars */}
                <WishlistSidebar 
                  isOpen={wishlistSidebarOpen} 
                  onClose={() => setWishlistSidebarOpen(false)} 
                />
                <CartSidebar
                  isOpen={cartSidebarOpen}
                  onClose={() => setCartSidebarOpen(false)}
                />
                <SearchResults
                  isOpen={searchSidebarOpen}
                  onClose={() => setSearchSidebarOpen(false)}
                  initialQuery={searchQuery}
                />

                <Suspense fallback={<div>Loading...</div>}>
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductPage />} />
                      <Route path="/aboutUs" element={<AboutUs />} />
                      <Route path="/contactUs" element={<ContactUs />} />
                      <Route path="/forgot" element={<ForgotPasswordForm />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path='/signup' element={<SignupForm />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path='/checkout' element={<Checkouts />} />
                      <Route path='/thankyou' element={<ThankYouPage />} />
                      <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
                      <Route path="/admin/orders" element={<AdminOrderList />} />
                      
                      <Route 
                        path="/dashboard" 
                        element={
                          <PrivateRoute>
                            <Dashboards />
                          </PrivateRoute>
                        } 
                      /> 
                      <Route path="/address" element={
                        <PrivateRoute>
                          <Addresses />
                        </PrivateRoute>
                      } />
                      <Route path="/order-history" element={
                        <PrivateRoute>
                          <OrderHistory />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </Suspense>
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
// // import logo from './logo.svg';
// import './App.css';
// import './HeaderStyle.css'
// import LoginForm from './pages/Forms/LoginForm';
// import './pages/Forms/loginStyle.css'; 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
// // import Products from './pages/Product/Products';
// import ContactUs from './pages/Info/ContactUs';
// import Home from './pages/Home/Home';
// import SignupForm from './pages/Forms/SignupForm';
// import ForgotPasswordForm from './pages/Forms/ForgotPasswordForm';
// import CartPage from './pages/Cart/CartPage';
// // import WishlistPage from './WishlistPage';
// import { CartProvider } from './context/CartContext';
// import SearchResults from './pages/Search/SearchResults';
// //  import CheckOut from './CheckOut';
// import { WishlistProvider } from './context/WishlistContext';
// import { UserProvider } from './context/UserContext';
// import ErrorBoundary from './ErrorBoundary';
// import { Suspense } from 'react';
// import AboutUs from './pages/Info/AboutUs';
// import ThankYouPage from './MyAccount/ThankYouPage';
// import ProductDetails from './pages/Product/ProductDetails';
// // import CheckoutAddressPage from './CheckoutAddressPage';
// import Addresses from './MyAccount/Addressess/Addresses';
// // import Dashboard from './Dashboard';
// import PrivateRoute from './PrivateRoute';
// import ResetPasswordForm from './pages/Forms/ResetPasswordForm';

// import Footer from './pages/Footer/Footer';
// // import Header from './Header';
// // import Productfinall from './Productfinall';
// import Checkouts from './pages/Checkout/Checkouts';
// // import OrderHistoryPage from './OrderHistoryPage';
// import OrderHistory from './MyAccount/Orderhistory/OrderHistory';
// import Dashboards from './MyAccount/Dashboard/Dashboards';
// import Main from './pages/Header/Main';
// import WishlistSidebar from './pages/Wishlist/WishlistSidebar';
// import AdminOrderList from './Admin/AdminOrderList';
// import WishlistPage from './pages/Wishlist/WishlistPage';
// import ProductPage from './pages/Product/ProductPage';
// import CartSidebar from './pages/Cart/CartSidebar';
// // import Mains from './Mains';



// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
// const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
//   // Triggered when a product is added to wishlist
//   const handleWishlistAdd = () => {
//     setSidebarOpen(true);
//   };

//   return (
//     <ErrorBoundary>
//     <UserProvider>
//     <CartProvider>
//       <WishlistProvider>
//     <Router>
//     <div className="App">
//       <Main onWishlistAdd={handleWishlistAdd} /> 
//                 <WishlistSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//                   <CartSidebar
//               isOpen={cartSidebarOpen}
//               onClose={() => setCartSidebarOpen(false)}
//             />
       
//        <Suspense fallback={<div>Loading...</div>}>
//        <main>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/products" element={<ProductPage/>} />
//               {/* <Route path="/products" element={<Productfinall />} /> */}
//               <Route path="/aboutUs" element={<AboutUs />} /> 
//               <Route path="/contactUs" element={<ContactUs />} />
//               <Route path="/forgot" element={<ForgotPasswordForm />} />
//               <Route path="/login" element={<LoginForm />} />
//               <Route path='/signup' element={<SignupForm/>}/>
//               <Route path="/cart" element={<CartPage />} />
//               <Route path="/wishlist" element={<WishlistPage />} />
//               <Route path="/products/:id" element={<ProductDetails />} />
//               <Route path="/product/:id" element={<ProductDetails />} />
//               <Route path='/search' element={<SearchResults />} />
//               {/* <Route path='/checkout' element={<CheckOut />} />  */}
//               {/* <Route path='/checkout' element={<CheckoutAddressPage />} />  */}
//               <Route path='/checkout' element={<Checkouts />} />
//               <Route path='/thankyou' element={<ThankYouPage />} />
//               <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
//               <Route path="/admin/orders" element={<AdminOrderList />} />


//                  <Route 
//           path="/dashboard" 
//           element={
//             <PrivateRoute>
//               {/* < Dashboard/> */}
//               < Dashboards/>

//             </PrivateRoute>
//           } 
//         /> 
//         <Route path="/address" element={
//                       <PrivateRoute>
//                         <Addresses />
//                       </PrivateRoute>
//                     } />

//                     {/* Protected Orders Route */}
//                     <Route path="/order-history" element={
//                       <PrivateRoute>
//                         {/* <OrderHistoryPage /> */}
//                         <OrderHistory />
//                       </PrivateRoute>
//                     } />
//         {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//         {/* <Route path="/address" element={<Addresses />} /> */}
//         {/* <Route path="*" element={<NotFound />} /> */}
                 
//                   </Routes>
//                   </main>
//                   <Footer />
//             </Suspense>
//             </div>

//         </Router>
//         </WishlistProvider>
//         </CartProvider>
//         </UserProvider>
//         </ErrorBoundary>
//   );
// }

// export default App;
