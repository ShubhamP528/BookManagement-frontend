import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const PaymentSuccess = () => {
  const { BookUser } = useAuthContext();
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const deleteCart = async () => {
      // Check if cartItems is an array
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart items is not an array or is empty:", cartItems);
        return;
      }

      const totalPrice = cartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      );
      console.log(totalPrice);

      try {
        await axios.delete(`/api/payment-success/${totalPrice}`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        });
        toast.success("Order successfully done");
        dispatch(clearCart());
      } catch (error) {
        console.error("Error during payment success request:", error);
        toast.error(error.message);
      }
    };

    if (BookUser && cartItems.length > 0) {
      deleteCart();
    }
  }, [BookUser, cartItems, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Payment Successful!
        </h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your cart has been processed
          successfully.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/books"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            Back to Store
          </Link>
          <Link
            to={`/orders`}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
