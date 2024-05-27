import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { showcart } from "../utils/cartSlice";
import { setLoad } from "../utils/cartLoad";

const Navbar = () => {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const { BookUser } = useAuthContext();
  const [cartItemCount, setCartItemCount] = useState(0);
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  // console.log(cartItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      await axios
        .get("https://book-management-backend-psi.vercel.app/cart", {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          const cart = response.data;
          console.log(cart);
          dispatch(showcart(cart));
          dispatch(setLoad(false));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          dispatch(setLoad(false));
        });
    };
    if (BookUser) {
      fetchCartItems();
    }
  }, [BookUser, dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let cout = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]?.quantity > 0) {
        cout = cout + cartItems[i].quantity;
      }
    }
    setCartItemCount(cout);
  }, [cartItems, cartItemCount]);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-white text-2xl">Books</div>
            <div className="hidden sm:block sm:ml-6 flex-grow">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                {BookUser && (
                  <>
                    <Link
                      to="/books/add"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Add Book
                    </Link>
                    <Link
                      to="/books"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Store
                    </Link>
                    <Link
                      to="/orders"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Orders
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              {BookUser ? (
                <>
                  <div className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    Welcome, {BookUser?.username}!
                  </div>
                  <Link
                    to="/cart"
                    className="relative text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <FaShoppingCart className="inline-block mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {BookUser && (
            <>
              <Link
                to="/books/add"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Book
              </Link>
              <Link
                to="/books"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Store
              </Link>
              <Link
                to="/orders"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                My Orders
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className="relative text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            <FaShoppingCart className="inline-block mr-2" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          {BookUser ? (
            <>
              <div className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Welcome, {BookUser?.username}!
              </div>
              <button
                onClick={logout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
