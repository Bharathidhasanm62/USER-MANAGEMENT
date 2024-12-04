import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User } from "../../types/interfaceList";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import { HiUserAdd } from "react-icons/hi"; // Import user add icon
import { MdEmail } from "react-icons/md"; // Import email icon
import { FaUserAlt } from "react-icons/fa"; // Importing a loader component
import { FiLoader } from "react-icons/fi";
import { addUser } from "../Shared/userService";
const Signup: React.FC = () => {
  const [formData, setFormData] = useState<Omit<User, "role">>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State for the loading indicator

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loader when form is being submitted
    try {
      const newUser: User = { ...formData, role: "user" };
      // Add new user to Firebase collection
      await addUser(newUser)
      toast.success("Signup successful!", {
        position: "top-center",
        className: "bg-green-500 text-white font-semibold p-3 rounded-lg",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error signing up. Please try again.", {
        position: "top-center",
        className: "bg-red-500 text-white font-semibold p-3 rounded-lg",
      });
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-full md:max-w-4xl w-full">
        {/* Left Section with Image (Mobile view: stacked above the form) */}
        <div className="w-full md:w-1/2">
          <img
            src="/login-Image.jpg" // Replace with the appropriate image URL
            alt="Signup illustration"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        {/* Right Section with Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-3xl font-extrabold mb-4 text-gray-700">
            Create an Account
          </h2>
          <p className="mb-8 text-gray-500">
            Sign up to start using our services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600"
              >
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaUserAlt className="ml-3 text-gray-500" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-r-lg"
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <MdEmail className="ml-3 text-gray-500" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-r-lg"
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
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-r-lg"
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
              disabled={loading} // Disable the button while loading
            >
              {loading ? (
                <FiLoader className="animate-spin mr-2 inline" size={20} /> // Show the loader
              ) : (
                <>
                  <HiUserAdd className="inline-block mr-2" size={20} />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
