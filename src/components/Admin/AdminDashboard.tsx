import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import { fetchUserData, updateUserData } from "../Shared/apicall";
import TabNavigation from "./TabNavigation";
import UsersTab from "./UsersTab";
import UploadDocumentTab from "./UploadDocumentTab";
import EditUserModal from "./EditUserModal";
import { adminTabs } from "../Shared/constData";
import { Header } from "../Shared/Header";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUser = () => {
    fetchUserData({}).then((res: User[] | null) => {
      if (res) {
        setUsers(res);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    if (updatedUser?.id) {
      updateUserData(updatedUser?.id, updatedUser).then(() => {
        getUser();
        setSelectedUser(null);
        setIsModalOpen(false);
      });
    }
  };

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
          />
        )}

        {activeTab === "upload" && (
          <UploadDocumentTab  users={users}/>
        )}

        {isModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
