import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { User } from "../../types/interfaceList";
import { useAuth } from "../AuthContext";
import { getStoredUser } from "../Shared/utils";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import visibility icons
import { FiLoader } from "react-icons/fi"; // Import loading spinner icon
import { HiOutlineMail, HiLockClosed } from "react-icons/hi"; // Import email, lock, and login icons
import { MdLogin } from "react-icons/md";
import { authenticateUser } from "../Shared/userService";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    const user: User | undefined = await authenticateUser(credentials);

    setIsLoading(false); // Hide loading indicator
    if (user) {
      login(user);
      toast.success("Login successful!", {
        position: "top-center",
        className: "bg-green-500 text-white font-semibold p-3 rounded-lg",
      });
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } else {
      toast.error("Invalid credentials", {
        position: "top-center",
        className: "bg-red-500 text-white font-semibold p-3 rounded-lg",
      });
    }
  };

  useEffect(() => {
    const userdata = getStoredUser();
    if (userdata) {
      navigate(
        userdata.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
      );
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2">
          <img
            src="/login-Image.jpg"
            alt="Login illustration"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-700">
            Welcome Back
          </h2>
          <p className="mb-8 text-gray-500">
            Please enter your credentials to log in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <HiOutlineMail className="ml-3 text-gray-600" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <HiLockClosed className="ml-3 text-gray-600" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 cursor-pointer text-gray-600"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {isLoading ? (
                <FiLoader className="animate-spin mr-2 inline" size={20} />
              ) : (
                <>
                  <MdLogin className="inline-block mr-2" size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
