import React, { useState, useEffect, useRef } from "react";
import { DocumentMetadata, User } from "../../types/interfaceList";
import { FaFileUpload, FaChevronDown, FaUsers, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";
import { convertToBase64 } from "../Shared/utils";
import { uploadDocument } from "../Shared/userService";

interface UploadDocumentTabProps {
  users: User[];
  updateDocument: (data: DocumentMetadata[]) => void;
}

const UploadDocumentTab: React.FC<UploadDocumentTabProps> = ({
  users,
  updateDocument,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [document, setDocument] = useState<File | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const handleUploadDocument = async () => {
    if (!document) {
      toast.error("Please select a file to upload");
      return;
    }
    if (!selectedUsers.length) {
      toast.error("Please select a User");
      return;
    }

    // Allowed file types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(document.type)) {
      toast.error("Invalid file type. Please upload PDF, Word, or Text files.");
      return;
    }

    setLoading(true);

    try {
      // Convert the file to Base64
      const base64File = await convertToBase64(document);

      // Prepare metadata for Firestore
      const documentMetadata: DocumentMetadata = {
        fileName: document.name,
        fileUrl: base64File, // Store the Base64 string
        uploadedBy: user?.name || "", // Replace with actual user
        uploadedAt: new Date(),
        recipients: selectedUsers.length
          ? selectedUsers.map((user) => ({
              id: user?.id || "default-id", // Fallback ID if missing
              name: user?.name || "Unknown User", // Fallback name if missing
            }))
          : [{ id: "all-users", name: "All Users" }], // Fallback for all users
      };

      const doc = await uploadDocument(documentMetadata);
      if (doc) {
        updateDocument(doc);
        toast.success("Document uploaded successfully!");
      }
      // Reset state
      setDocument(null);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (user: User) => {
    setSelectedUsers((prev) =>
      prev.includes(user)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
    setDropdownOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    window.document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      window.document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-8 shadow-2xl border border-blue-100 w-full">
      <div className="flex items-center mb-6">
        <FaFileUpload className="mr-3 text-blue-600" size={32} />
        <h2 className="text-2xl font-bold text-blue-800">Upload Document</h2>
      </div>

      <div className="mb-6">
        <label className="block mb-3 text-sm font-semibold text-gray-600">
          Select Recipients
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            className="w-full flex justify-between items-center px-4 py-3 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 transition-all"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="flex items-center">
              <FaUsers className="mr-2 text-blue-500" size={20} />
              <span className="text-gray-700">
                {selectedUsers.length
                  ? `${selectedUsers.length} User(s) Selected`
                  : "Select Recipients"}
              </span>
            </div>
            <FaChevronDown
              className={`text-gray-500 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-blue-100 z-20 max-h-60 overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-100 hover:bg-blue-50">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 rounded focus:ring-blue-500"
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedUsers(users)
                        : setSelectedUsers([])
                    }
                  />
                  <span className="ml-3 text-gray-700 font-medium flex items-center">
                    <FaUsers className="mr-2 text-blue-500" size={16} />
                    Share with All Users
                  </span>
                </label>
              </div>

              {users.map((user) => (
                <div
                  key={user.id}
                  className="px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 border-gray-100"
                >
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 rounded focus:ring-blue-500"
                      checked={selectedUsers.includes(user)}
                      onChange={() => handleCheckboxChange(user)}
                    />
                    <span className="ml-3 text-gray-700 font-medium flex items-center">
                      {selectedUsers.includes(user) && (
                        <FaCheck className="mr-2 text-blue-500" size={16} />
                      )}
                      {user.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-3 text-sm font-semibold text-gray-600">
          Upload Document
        </label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
          onChange={(e) =>
            setDocument(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      <button
        onClick={handleUploadDocument}
        className={`w-full px-6 py-3 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white rounded-xl transition-all flex items-center justify-center`}
        disabled={loading}
      >
        <FaFileUpload className="mr-2" size={20} />
        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
};

export default UploadDocumentTab;
