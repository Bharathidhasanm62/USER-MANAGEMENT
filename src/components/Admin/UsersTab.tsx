import React, { useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaUserAlt,
  FaPhoneAlt,
  FaRegSadTear,
} from "react-icons/fa"; // Importing icons
import { MdEmail } from "react-icons/md"; // Importing Email icon
import { User } from "../../types/interfaceList";
import SkeletonLoader from "../Shared/SkeletonLoader";

interface UsersTabProps {
  users: User[];
  loading: boolean;
  setSelectedUser: (user: User) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({
  users,
  setSelectedUser,
  setIsModalOpen,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // This function could trigger an API call or any other action if needed
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phone?.includes(searchTerm)
  );

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Search Users
      </h2>
      <div className="flex space-x-6 mb-8">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all"
        >
          <FaSearch className="inline-block mr-2" /> Search
        </button>
      </div>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-300 transition-all transform hover:scale-105 hover:shadow-xl hover:border-blue-600"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center mb-2">
                      <FaUserAlt className="mr-2 text-gray-600" />
                      <h3 className="text-xl font-semibold text-gray-800">
                        {user.name}
                      </h3>
                    </div>
                    <div className="flex items-center mb-4">
                      <MdEmail className="mr-2 text-gray-600" />
                      <p className="text-gray-600 truncate">{user.email}</p>
                    </div>
                    <div className="flex items-center mb-4">
                      <FaPhoneAlt className="mr-2 text-gray-600" />
                      <p className="text-gray-500">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      className="px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 transition-all"
                    >
                      <FaEdit className="inline-block mr-2" /> Edit{" "}
                      {/* Adding Edit Icon */}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center bg-gray-200 text-gray-600 p-6 rounded-lg shadow-md border border-gray-300">
              <FaRegSadTear className="w-8 h-8 text-gray-500 mr-4" />
              <p className="text-lg font-medium">
                No users found matching the search criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersTab;
