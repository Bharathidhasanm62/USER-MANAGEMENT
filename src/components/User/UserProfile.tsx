import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { User } from "../../types/interfaceList";
import { updateUserData } from "../Shared/userService";
import toast from "react-hot-toast";
import { UserViewProfile } from "./UserViewProfile";

interface UserProfileProps {
  user: User;
  onUserUpdate: (userId: string, updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      //   .nullable()
      .required("Phone is required"),
    address: Yup.object()
      .shape({
        street: Yup.string()
          .max(100, "Street must be at most 100 characters")
          .required("Street is required"),
        city: Yup.string()
          .max(50, "City must be at most 50 characters")
          .required("City is required"),
      })
      .required("Street is required"),
    bankDetails: Yup.object()
      .shape({
        bankName: Yup.string()
          .max(50, "Bank name must be at most 50 characters")
          .required("Bank name is required"),
        lastFourDigits: Yup.string()
          .matches(/^\d{4}$/, "Last four digits must be 4 numbers")
          .required("Street is required")
          .optional(),
      })
      .required("Street is required"),
    newPassword: Yup.string()
      .nullable()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      )
      .optional(),
    confirmPassword: Yup.string()
      .nullable()
      .when("newPassword", {
        is: (val: string | undefined) => val && val.length > 0,
        then: (schema) =>
          schema
            .required("Confirm password is required")
            .oneOf([Yup.ref("newPassword")], "Passwords must match"),
      })
      .optional(),
  });

  const renderEditMode = () => (
    <Formik
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: {
          street: user?.address?.street || "",
          city: user?.address?.city || "",
          state: user?.address?.state || "",
          zipCode: user?.address?.zipCode || "",
        },
        bankDetails: {
          bankName: user?.bankDetails?.bankName || "",
          lastFourDigits: user?.bankDetails?.lastFourDigits || "",
        },
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const updatePayload: User = {
            ...user,
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            bankDetails: values.bankDetails,
            ...(values.newPassword && { password: values.newPassword }),
          };

          await updateUserData(user.id!, updatePayload);
          onUserUpdate(user.id!, updatePayload);
          setIsEditing(false);
          toast.success("Profile updated successfully");
        } catch (error) {
          toast.error("Failed to update profile");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              name="name"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                ${
                  errors.name && touched.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              name="email"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                ${
                  errors.email && touched.email
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Field
              type="tel"
              name="phone"
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                ${
                  errors.phone && touched.phone
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          {/* Address fields (similar pattern to phone and email) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <Field
                type="text"
                name="address.street"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.address?.street && touched.address?.street
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <ErrorMessage
                name="address.street"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <Field
                type="text"
                name="address.city"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.address?.city && touched.address?.city
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <ErrorMessage
                name="address.city"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          {/* Bank Details fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <Field
                type="text"
                name="bankDetails.bankName"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.bankDetails?.bankName &&
                    touched.bankDetails?.bankName
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <ErrorMessage
                name="bankDetails.bankName"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Four Digits
              </label>
              <Field
                type="text"
                name="bankDetails.lastFourDigits"
                maxLength={4}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.bankDetails?.lastFourDigits &&
                    touched.bankDetails?.lastFourDigits
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <ErrorMessage
                name="bankDetails.lastFourDigits"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          </div>

          {/* Password fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="newPassword"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.newPassword && touched.newPassword
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <ErrorMessage
              name="newPassword"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 
                  ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
            >
              <FaTimes size={24} />
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-green-600 hover:bg-green-50 p-2 rounded-full transition"
            >
              <FaSave size={24} />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition"
          >
            <FaEdit size={24} />
          </button>
        )}
      </div>

      {!isEditing ? <UserViewProfile user={user} /> : renderEditMode()}
    </div>
  );
};

export default UserProfile;
