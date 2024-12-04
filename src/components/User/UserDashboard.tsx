import { useEffect, useState } from "react";
import { Header } from "../Shared/Header";
import TabNavigation from "../Admin/TabNavigation";
import { userTabs } from "../Shared/constData";
import UserProfile from "./UserProfile"; // Import the new Profile component
import { useAuth } from "../AuthContext";
import { DocumentMetadata, User } from "../../types/interfaceList";
import ViewDocument from "./ViewDocument";
import { fetchDocumentsData } from "../Shared/userService";

function UserDashboard() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [document, setDocument] = useState<DocumentMetadata[]>([]);
  const getUpdateUser = (updateUser: User) => {
    login(updateUser);
  };
  useEffect(() => {
    fetchDocumentsData(user?.id)
      .then((res) => {
        if (res) {
          setDocument(res);
        }
      })
      .catch(() => {})
      .finally(() => {});
  }, [user]);
  return (
    <>
      <div className="bg-gray-100 pl-8 pr-8 pt-4 pb-1">
        <Header />
      </div>
      <div className="min-h-screen bg-gray-100 pl-8 pr-8">
        <TabNavigation
          activeTab={activeTab}
          tabs={userTabs}
          setActiveTab={setActiveTab}
        />
        {activeTab === "profile" && user && (
          <UserProfile
            onUserUpdate={(userId: string, updateUser: User) => {
              getUpdateUser(updateUser);
            }}
            user={user}
          />
        )}
        {activeTab === "document" ? (
          <ViewDocument documents={document} />
        ) : null}
      </div>
    </>
  );
}

export default UserDashboard;
