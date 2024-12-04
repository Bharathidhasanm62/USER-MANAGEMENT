import { FaUsers, FaUserCircle } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai"; // New icon for Upload Document
import { BsFolder2Open } from "react-icons/bs"; // New icon for Document View

export const adminTabs = [
  { label: "Users", value: "users", icon: FaUsers },
  { label: "Upload Document", value: "upload", icon: AiOutlineFileAdd },
  { label: "Document View", value: "document", icon: BsFolder2Open },
];

export const userTabs = [
  { label: "Profile", value: "profile", icon: FaUserCircle }, // Changed to FaUserCircle for better representation
  { label: "Document View", value: "document", icon: BsFolder2Open },
];
