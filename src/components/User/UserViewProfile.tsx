import { User } from "../../types/interfaceList";

interface UserViewProfileProps {
  user: User;
}
export const UserViewProfile: React.FC<UserViewProfileProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-600">Name</p>
        <p className="text-lg">{user?.name}</p>
      </div>
      <div>
        <p className="text-gray-600">Email</p>
        <p className="text-lg">{user?.email}</p>
      </div>
      <div>
        <p className="text-gray-600">Phone Number</p>
        <p className="text-lg">{user?.phone || "Not provided"}</p>
      </div>
      <div>
        <p className="text-gray-600">Address</p>
        <p className="text-lg">
          {user?.address
            ? `${user?.address?.street}, ${user?.address?.city}, ${user?.address?.state} ${user?.address?.zipCode}`
            : "Not provided"}
        </p>
      </div>
      <div>
        <p className="text-gray-600">Bank Details</p>
        <p className="text-lg">
          {user?.bankDetails
            ? `${user?.bankDetails?.bankName} - **** **** **** ${user?.bankDetails?.lastFourDigits}`
            : "Not provided"}
        </p>
      </div>
    </div>
  );
};
