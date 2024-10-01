import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"; // Import ScrollToTop component
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Footer from "./Components/Footer/Footer";
import Homepage from "./Pages/HomePage/Homepage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import AboutUs from "./Pages/Footer Pages/AboutUs";
import ShippingAndDelivery from "./Pages/Footer Pages/ShippingAndDelivery";
import ReturnsAndExchanges from "./Pages/Footer Pages/ReturnsAndExchanges";
import WarrantyInformation from "./Pages/Footer Pages/WarrantyInformation";
import ContactUs from "./Pages/Footer Pages/ContactUs";
import PrivacyPolicy from "./Pages/Footer Pages/PrivacyPolicy";
import AccessibilityStatement from "./Pages/Footer Pages/AccessibilityStatement";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Order from "./Components/orders/Order";
import OrderDetails from "./Components/orders/OrderDetails";
import PaymentSuccess from "./Pages/paymentSuccess/PaymentSuccess";
import TermsAndConditions from "./Pages/Footer Pages/TermsOfService";

function CustomerRoutes() {
  const location = useLocation();
    
  
    // Only show Navigation component when not on the NotFound page
    const showNavigation = location.pathname !== "*";
  return (
    <div>
      <ScrollToTop /> {/* Add ScrollToTop component here */}
      {showNavigation && <NavigationBar />}
      <div className="bg-white">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Homepage />} />
          <Route path="/register" element={<Homepage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/shipping-delivery" element={<ShippingAndDelivery />} />
          <Route path="/returns-exchanges" element={<ReturnsAndExchanges />} />
          <Route
            path="/warranty-information"
            element={<WarrantyInformation />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-and-condition" element={<TermsAndConditions />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/accessibility-statement"
            element={<AccessibilityStatement />}
          />
          <Route
            path="/product/:productId"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<Checkout></Checkout>}></Route>
          <Route path="/account/orders" element={<Order></Order>}></Route>
          <Route
            path="/account/order/:orderId"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route
            path="/payment/:orderId"
            element={<PaymentSuccess></PaymentSuccess>}
          ></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerRoutes;
