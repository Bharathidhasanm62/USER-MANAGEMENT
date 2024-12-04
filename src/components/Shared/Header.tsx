import { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { FaUserCircle, FaSignOutAlt, FaHome, FaCog } from "react-icons/fa";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const role = user?.role === "admin" ? "Admin" : "User";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-xl border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
            <span className="text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Welcome,</p>
            <h2 className="text-xl font-bold text-blue-900">
              {user?.name ? (
                user.name.charAt(0).toUpperCase() + user.name.slice(1)
              ) : "User"}
            </h2>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">
          {role} Dashboard
        </h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition duration-200 shadow-md"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <FaUserCircle className="w-7 h-7" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100 text-sm text-gray-600 flex items-center space-x-3">
                <FaUserCircle className="text-blue-500" />
                <span>{user?.email || "User Account"}</span>
              </div>
              
              <button
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3 text-gray-700 hover:text-blue-600"
                onClick={() => {
                  // Navigate to home or dashboard
                  setIsDropdownOpen(false);
                }}
              >
                <FaHome />
                <span>Dashboard</span>
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center space-x-3 text-gray-700 hover:text-red-600 border-t border-gray-100"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;