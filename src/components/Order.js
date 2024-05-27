import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";

const OrderSummary = () => {
  const { orderId } = useParams();
  const { BookUser } = useAuthContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (BookUser?.token) {
      axios
        .get(`/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          setOrder(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [BookUser, orderId]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/order/${orderId}/download`, {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
        responseType: "blob", // Important
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `order_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  if (loading) {
    // Display shimmer effect while loading
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
          Order Summary
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-6 bg-gray-200 w-1/4 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/5 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/6 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/6 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/5 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/6 rounded-md mb-4 animate-pulse"></div>
          <div className="flex justify-between space-x-4 w-full">
            <div className="h-6 bg-gray-200 w-1/3 rounded-md mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 w-32 rounded-md mb-4 animate-pulse"></div>
          </div>
          <div className="flex justify-between space-x-4 w-full">
            <div className="h-6 bg-gray-200 w-1/3 rounded-md mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 w-32 rounded-md mb-4 animate-pulse"></div>
          </div>

          <div className="h-6 bg-gray-200 w-1/5 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-32 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/5 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-32 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/5 rounded-md mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 w-1/6 rounded-md mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 w-32 rounded-md mt-4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return <div className="text-center py-10">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
        Order Summary
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order ID: {order._id}</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Customer Details:</h3>
          <p className="text-gray-700">Name: {order.user.username}</p>
          <p className="text-gray-700">Email: {order.user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Address:</h3>
          <p className="text-gray-700">{order.deliveryAddress}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Items:</h3>
          {order.items.map((item) => (
            <div key={item?._id} className="flex justify-between my-2">
              <span>
                {item?.book.title} (x{item.quantity})
              </span>
              <span>₹{item.book.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Total Amount:</h3>
          <span className="text-gray-700">₹{order.totalAmount}</span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Status:</h3>
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              order.status === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Date:</h3>
          <span className="text-gray-700">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
