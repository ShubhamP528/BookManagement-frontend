import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupForm = () => {
  const { signup, isLoading } = useSignup();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    signup(userData.username, userData.email, userData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Email address"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md  bg-green-600  ${
                isLoading
                  ? "bg-gray-400  cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
