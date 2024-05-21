import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-4">Your Company</h2>
            <p className="text-sm text-center md:text-left">
              &copy; 2024 Book Management. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-300 hover:text-white">
                <FaFacebookF />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <FaTwitter />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <FaInstagram />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <div className="flex flex-col space-y-2">
              <Link to="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
