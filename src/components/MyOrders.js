import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { BookUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (BookUser?.token) {
      axios
        .get("/orders", {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [BookUser]);

  if (loading) {
    return <Shimmer />;
  }

  if (!orders.length) {
    return <div className="text-center py-10">No orders found</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
        Your Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Order ID</th>
              <th className="py-4 px-6 text-left">Items</th>
              <th className="py-4 px-6 text-left">Total Amount</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-indigo-100 transition duration-200 ease-in-out cursor-pointer"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {order._id}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {order.items.map((item) => (
                    <div key={item?._id} className="mb-2">
                      <span className="font-semibold">{item?.book.title}</span>{" "}
                      (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  ₹{order.totalAmount}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "success"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
        Your Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Order ID</th>
              <th className="py-4 px-6 text-left">Items</th>
              <th className="py-4 px-6 text-left">Total Amount</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 w-32 rounded mb-1"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 w-64 rounded mb-1"></div>
                  <div className="h-4 bg-gray-200 w-48 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 w-24 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 w-20 rounded"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 w-28 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
