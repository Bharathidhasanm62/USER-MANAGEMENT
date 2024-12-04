import React, { useEffect, useState } from "react";
import { DocumentMetadata, User } from "../../types/interfaceList";
import { fetchDocumentsData, fetchUserData } from "../Shared/userService";
import TabNavigation from "./TabNavigation";
import UsersTab from "./UsersTab";
import UploadDocumentTab from "./UploadDocumentTab";
import EditUserModal from "./EditUserModal";
import { adminTabs } from "../Shared/constData";
import { Header } from "../Shared/Header";
import ViewDocument from "../User/ViewDocument";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [document, setDocument] = useState<DocumentMetadata[]>([]);

  const getUser = (res: User[]) => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setUsers(res);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userData, documentData] = await Promise.all([
        fetchUserData({}),
        fetchDocumentsData(),
      ]);
      if (userData) {
        setUsers(userData); // Set users data
      }
      if (documentData) {
        setDocument(documentData); // Set documents data
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Error handling
    } finally {
      setLoading(false); // Hide loading state after fetching is complete
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-gray-100 pl-8 pr-8 pt-4 pb-1">
        <Header />
      </div>
      <div className="min-h-screen bg-gray-100 pl-8 pr-8">
        <TabNavigation
          activeTab={activeTab}
          tabs={adminTabs}
          setActiveTab={setActiveTab}
        />

        {activeTab === "users" && (
          <UsersTab
            users={users}
            setSelectedUser={setSelectedUser}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
          />
        )}

        {activeTab === "upload" && (
          <UploadDocumentTab users={users} updateDocument={setDocument} />
        )}
        {activeTab === "document" && <ViewDocument documents={document} />}

        {isModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onUpdate={getUser}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
