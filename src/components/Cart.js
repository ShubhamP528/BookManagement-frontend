import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { removeItems, clearCart } from "../utils/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";

const CartPage = () => {
  const dispatch = useDispatch();
  const { BookUser } = useAuthContext();

  const cartItems = useSelector((store) => store.cart?.items);
  const cartLoad = useSelector((store) => store.cartloader.loading);
  console.log("cartItem", cartItems);
  console.log(cartLoad);

  const handleRemoveItem = async (item) => {
    axios
      .put(
        `/cart/${item.book._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(removeItems(item));
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete the book");
      });
  };

  const handleCheckout = async () => {
    toast.success("Proceeding to checkout...");
    const stripe = await loadStripe(
      "pk_test_51PIsJ3SHp2VgW0nsDmiCFnGWNsBl62z1f6g5iAHRbI7Fy882o43cZVPupGgDJMpx4FIbGhUFATu9f9qP3cJMkTRU00rANbAS0Z"
    );

    const response = await axios.post(
      "/craete-checkout-session",
      { products: cartItems },
      { headers: { "Content-Type": "application/json" } }
    );

    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const handleClearCart = async () => {
    axios
      .delete("/cart", {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(clearCart());
        toast.success("Cart cleared");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to clear the cart");
      });
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
        Your Cart
      </h1>
      {cartLoad ? (
        <CartPageShimmer />
      ) : cartItems?.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr
                    key={item.book._id}
                    className="hover:bg-indigo-100 transition duration-200 ease-in-out"
                  >
                    <td className="py-2 px-4 border-b">{item.book.title}</td>
                    <td className="py-2 px-4 border-b">{item.book.author}</td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                    <td className="py-2 px-4 border-b">₹{item.book.price}</td>
                    <td className="py-2 px-4 border-b">
                      ₹{item.book.price * item.quantity}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-semibold">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCheckout}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

const CartPageShimmer = () => {
  return (
    // <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="py-2 px-4 border-b w-1/4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4 border-b w-1/4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4 border-b w-1/8">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4 border-b w-1/8">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4 border-b w-1/8">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="py-2 px-4 border-b w-1/4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-semibold w-1/6">
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex justify-evenly space-x-4 w-3/4">
          <div className="h-10 bg-gray-200 rounded-full w-1/5 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-full w-1/5 animate-pulse"></div>
        </div>
      </div>
    </>
    // </div>
  );
};
