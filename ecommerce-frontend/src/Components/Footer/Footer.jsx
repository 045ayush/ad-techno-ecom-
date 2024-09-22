import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
      setShowTooltip(true)
    }
  };

  // Smooth scroll function for the "Back to Top" button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
    setShowTooltip(false); // Hide tooltip when button is clicked
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">About Us</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              We provide high-quality refurbished laptops, desktops, and tech
              products at unbeatable prices...
            </p>
            <Link
              to="/about-us"
              className="text-sm text-slate-400 hover:text-white transition underline lg:no-underline"
            >
              Read More
            </Link>
          </div>

          {/* Customer Service & Quick Links (Dropdowns for Mobile) */}
          <div className="lg:hidden flex flex-col gap-4 mb-4">
            {/* Customer Service Dropdown */}
            <div className="w-full bg-slate-800 rounded-md">
              <button
                onClick={() => toggleDropdown("customerService")}
                className="text-sm font-semibold px-4 py-2 rounded-md focus:outline-none flex justify-between items-center w-full"
                aria-expanded={activeDropdown === "customerService"}
                aria-controls="customerServiceDropdown"
              >
                Customer Service
                <span
                  className={`transition-transform ${
                    activeDropdown === "customerService" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {activeDropdown === "customerService" && (
                <div
                  id="customerServiceDropdown"
                  className="p-4 pt-1 rounded-md bg-slate-800 flex flex-wrap"
                >
                  <ul className="flex flex-wrap text-sm text-slate-400 w-full">
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/help-support"
                        className="block py-2 hover:text-white transition"
                      >
                        Help & Support
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/shipping-delivery"
                        className="block py-2 hover:text-white transition"
                      >
                        Shipping & Delivery
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/returns-exchanges"
                        className="block py-2 hover:text-white transition"
                      >
                        Returns & Exchanges
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/warranty-information"
                        className="block py-2 hover:text-white transition"
                      >
                        Warranty Information
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/contact-us"
                        className="block py-2 hover:text-white transition"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Quick Links Dropdown */}
            <div className="w-full bg-slate-800 rounded-md">
              <button
                onClick={() => toggleDropdown("quickLinks")}
                className="text-sm font-semibold px-4 py-2 rounded-md focus:outline-none flex justify-between items-center w-full"
                aria-expanded={activeDropdown === "quickLinks"}
                aria-controls="quickLinksDropdown"
              >
                Quick Links
                <span
                  className={`transition-transform ${
                    activeDropdown === "quickLinks" ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {activeDropdown === "quickLinks" && (
                <div
                  id="quickLinksDropdown"
                  className="p-4 pt-1 rounded-md bg-slate-800 flex flex-wrap"
                >
                  <ul className="flex flex-wrap text-sm text-slate-400 w-full">
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/"
                        className="block py-2 hover:text-white transition"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/category/laptops"
                        className="block py-2 hover:text-white transition"
                      >
                        Laptops
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/category/desktops"
                        className="block py-2 hover:text-white transition"
                      >
                        Desktops
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/category/networking-devices"
                        className="block py-2 hover:text-white transition"
                      >
                        Networking Devices
                      </Link>
                    </li>
                    <li className="flex-1 min-w-[45%]">
                      <Link
                        to="/category/surveillance-devices"
                        className="block py-2 hover:text-white transition"
                      >
                        Surveillance Devices
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Customer Service (Desktop) */}
          <div className="hidden lg:block">
            <h4 className="text-2xl font-semibold mb-4">Customer Service</h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>
                <Link
                  to="/help-support"
                  className="hover:text-white transition"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-delivery"
                  className="hover:text-white transition"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/returns-exchanges"
                  className="hover:text-white transition"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty-information"
                  className="hover:text-white transition"
                >
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links (Desktop) */}
          <div className="hidden lg:block">
            <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="hover:text-white transition">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/desktops" className="hover:text-white transition">
                  Desktops
                </Link>
              </li>
              <li>
                <Link
                  to="/category/networking-devices"
                  className="hover:text-white transition"
                >
                  Networking Devices
                </Link>
              </li>
              <li>
                <Link
                  to="/category/surveillance-devices"
                  className="hover:text-white transition"
                >
                  Surveillance Devices
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
          <h4 className="text-2xl font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="flex mb-6">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full px-4 py-2 rounded-l-md bg-slate-800 text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-700 text-white font-semibold rounded-r-md hover:bg-slate-800 focus:outline-none transition"
              >
                Subscribe
              </button>
              </form>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-slate-400 transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white hover:text-slate-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white hover:text-slate-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white hover:text-slate-400 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="text-white hover:text-slate-400 transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-sm text-slate-400 text-center">
        <p>
          &copy; {new Date().getFullYear()} Ad-Techno Solutions. All rights
          reserved.
        </p>
        <p>
          <Link
            to="/terms-of-service"
            className="hover:text-white transition underline lg:no-underline"
          >
            Terms of Service
          </Link>{" "}
          |
          <Link
            to="/privacy-policy"
            className="hover:text-white transition underline lg:no-underline"
          >
            {" "}
            Privacy Policy
          </Link>
        </p>
        <p className="mt-3">
          <Link
            to="/accessibility-statement"
            className="text-slate-400 hover:text-white transition underline lg:no-underline"
          >
            Accessibility Statement
          </Link>
        </p>
      </div>
      </div>

      {showScrollTopButton && (
        <button
          className="group flex  fixed bottom-8 right-8 bg-slate-700 text-white p-1.5 rounded-full shadow-lg focus:outline-none z-50"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          {showTooltip && (
            <span className="pl-3 text-sm hidden group-hover:block">Scroll to top</span>
          )}
          <KeyboardArrowUpIcon />
        </button>
      )}
    </footer>
  );
}
