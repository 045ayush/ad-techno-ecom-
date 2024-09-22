import { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  MicrophoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../Redux/Auth/Action";
import { getAllCategories } from "../../Redux/Customers/Category/Action";
import { fetchCart } from "../../Redux/Customers/Cart/Action";
import { fetchProducts } from "../../Redux/Customers/Product/ProductAction";

export default function NavigationBar() {
  // State declarations
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs
  const menuRef = useRef(null);

  // Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Redux hooks
  const dispatch = useDispatch();
  const { user, auth_Loading, auth_error } = useSelector((state) => state.auth);
  const { categories, category_loading, category_error } = useSelector(
    (state) => state.category
  );
  const { cart } = useSelector((state) => state.cart);
  const { loading, products, error } = useSelector((state) => state.products);

  const jwt = localStorage.getItem("jwt");

  // Fetch all categories on component mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Fetch user if JWT is present
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  // Handle user state changes
  useEffect(() => {
    if (user) {
      handleClose();
    }
    if (
      user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.cartItems?.length) {
      setCartItems(cart.cartItems.length);
    }
  }, [cart?.cartItems]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.toString();
    dispatch(fetchProducts(query));
  }, [dispatch, location.search]);

  const searchDropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(logout());
  };

  // Open auth modal
  const handleOpen = () => {
    navigate("/login");
    setOpenAuthModal(true);
  };

  // Close auth modal
  const handleClose = () => {
    setOpenAuthModal(false);
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate("/");
    }
  };

  // Handle navigation with menu close
  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Toggle menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu if clicked outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle category click
  const handleCategoryClick = (category, id) => {
    category = category.replace(/\s+/g, "");
    setActiveCategory(category);
    navigate(`/category/${category.toLowerCase()}?id=${id}`);
  };

  // Headlines for sliding banner
  const headlines = [
    "Get free delivery on orders over ₹10000",
    "Limited time offer: Up to 50% off on all laptops!",
    "New arrivals: Check out the latest networking devices",
    "Free returns within 30 days of purchase",
  ];

  // Example products
  // const products = [
  //   { id: 1, name: "Laptop Pro 15", category: "Laptops" },
  //   { id: 2, name: "Gaming Desktop X", category: "Desktop" },
  //   { id: 3, name: "Office Suite Software", category: "Software" },
  //   { id: 4, name: "High-Speed Router", category: "Networking" },
  //   { id: 5, name: "4K Security Camera", category: "Surveillance" },
  //   { id: 6, name: "Wireless Printer", category: "Printer" },
  // ];

  // Handle sliding banner headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setHeadlineIndex((prevIndex) => (prevIndex + 1) % headlines.length);
        setIsSliding(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle voice input
  useEffect(() => {
    if (isListening) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        setSearchQuery(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      recognition.start();
    }
  }, [isListening]);

  // Handle search query
  useEffect(() => {
    if (searchQuery) {
      const results = products.filter((product) =>
        product.variantName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  // Toggle voice input listening state
  const handleVoiceInput = () => {
    setIsListening((prev) => !prev);
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  // Handle search input blur
  const handleSearchBlur = (event) => {
    setTimeout(() => {

        setIsSearchActive(false);
      
    }, 200); // Adjust delay as needed
  };
  
  

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
  };

  // Handle loading and error states
  if (auth_Loading || category_loading) return <p>Loading...</p>;
  // if (auth_error) return <p>Error: {auth_error}</p>;
  if (category_error) return <p>Error: {category_error}</p>;

  return (
    <>
      {isSearchActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      <div className="bg-slate-800 text-white text-center py-2 text-sm relative h-8 flex items-center justify-center overflow-hidden z-30">
        <div
          className={`pt-1 absolute inset-0 transition-transform duration-1000 transform ${
            isSliding ? "translate-x-0" : "translate-x-full"
          }`}
          key={headlineIndex}
        >
          {headlines[headlineIndex]}
        </div>
        <div
          className={`pt-1 absolute inset-0 transition-transform duration-1000 transform ${
            isSliding ? "-translate-x-full" : "translate-x-0"
          }`}
          key={
            headlineIndex - 1 >= 0 ? headlineIndex - 1 : headlines.length - 1
          }
        >
          {
            headlines[
              headlineIndex - 1 >= 0 ? headlineIndex - 1 : headlines.length - 1
            ]
          }
        </div>
      </div>

      <div
        className={`sticky top-0 z-50 bg-white shadow-md ${
          isSearchActive ? "relative" : ""
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-white relative">
          <a href="/" className="text-xl font-bold text-slate-900">
            <img src="/images/logo.webp" alt="Logo" className="h-10 md:h-12" />
          </a>

          <div className="flex-1 mx-4 lg:mx-10 relative flex items-center">
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full px-4 py-2 pl-10 bg-slate-50 border border-slate-300 rounded-3xl text-sm md:text-base"
                aria-label="Search"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-900 h-5 w-5" />
            </div>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-slate-900 hover:text-slate-700"
                aria-label="Clear Search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={handleVoiceInput}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isListening ? "text-red-600" : "text-slate-900"
              } hover:text-slate-700`}
              aria-label={
                isListening ? "Stop Voice Input" : "Start Voice Input"
              }
            >
              <MicrophoneIcon
                className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          <div ref={menuRef}>
            {user?.firstName ? (
              <div className="flex space-x-4 relative items-center">
                <div className="relative">
                  <button
                    onClick={handleMenuToggle}
                    className="focus:outline-none"
                  >
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 rounded-full">
                      {user?.firstName[0].toUpperCase()}
                    </Avatar>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 p-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 w-40 sm:w-40">
                      <button
                        onClick={() => handleNavigate("/account/orders")}
                        className="block w-full text-left text-sm text-slate-700 hover:bg-slate-100 border-b border-slate-200 py-2 px-4"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left text-sm text-slate-700 hover:bg-slate-100 py-2 px-4"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative ">
                  <a
                    href="#"
                    className="text-slate-900 hover:text-slate-700"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCartIcon
                      onClick={() => navigate('/cart')}
                      className="h-6 w-6 md:h-8 md:w-8"
                    />
                  </a>
                  {cartItems > 0 && (
                    <div className="absolute top-0 right-0 text-xs bg-slate-800 text-white rounded-full px-1.5 py-0.5 transform translate-x-1/2 -translate-y-1/2 md:px-2 md:py-1">
                      {cartItems}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex space-x-4 relative items-center">
                <div className="space-y-6">
                  <div className="flow-root">
                    <Button
                      onClick={handleOpen}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Login
                    </Button>
                  </div>
                </div>
                <div className="relative ">
                  <a
                    href="#"
                    className="text-slate-900 hover:text-slate-700"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCartIcon
                      onClick={handleOpen}
                      className="h-6 w-6 md:h-8 md:w-8"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {isSearchActive && searchQuery && (
          <div className="absolute z-50 w-full bg-white border border-slate-200 shadow-lg max-h-60 overflow-y-auto mt-1" ref={searchDropdownRef}>
            {filteredProducts.length > 0 ? (
              <ul>
                {filteredProducts.map((product) => (
                  <li
                  key={product?.variantId}
                  className="px-4 py-2 border-b border-slate-200 hover:bg-slate-50"
                  onClick={() => {
                    console.log("hiiii");
                    
                    navigate(`/product/${product.productId}`);
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 m-3">
                      <img
                        src={product.variantImages[0]}
                        alt={product.variantName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-3">{product.variantName}</div>
                  </div>
                </li>
                
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-center text-slate-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-50 text-slate-900 flex space-x-4 p-2 overflow-x-auto border-b-2 mt-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`py-2 px-4 text-nowrap text-md font-semibold transition-colors duration-300 ${
              activeCategory == category.name.replace(/\s+/g, "")
                ? "border-b-2 border-slate-900"
                : "hover:text-slate-600"
            }`}
            onClick={() =>
              handleCategoryClick(
                category.name.replace(/\s+/g, ""),
                category.id
              )
            }
          >
            {category.name}
          </button>
        ))}
      </div>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </>
  );
}
