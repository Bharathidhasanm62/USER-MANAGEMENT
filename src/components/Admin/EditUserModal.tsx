import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "../../types/interfaceList";
import {
  FaEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa"; // Importing icons
import { updateUserData } from "../Shared/userService";
import toast from "react-hot-toast";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (User:User[]) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });
  const updateUser = async (values: User) => {
    if (values?.id) {
      try {
        const response = await updateUserData(values?.id, values);
        if (response) {
          toast.success("User updated successfully!");
          onUpdate(response);
        }
      } catch {
        toast.error("Failed to update user. Please try again.");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 text-white p-5 flex justify-between items-center rounded-t-lg shadow-sm">
          <h2 className="text-lg font-semibold flex items-center">
            <FaEdit className="mr-3" /> Edit User Details
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-blue-500 hover:text-white rounded-full p-2 transition-colors"
          >
            <FaTimesCircle className="text-white" size={20} />
          </button>
        </div>

        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={updateUser}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <FaUser className="inline-block mr-2" /> Full Name
                </label>
                <Field name="name">
                  {({ field, meta }: any) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter full name"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <FaEnvelope className="inline-block mr-2" /> Email Address
                </label>
                <Field name="email">
                  {({ field, meta }: any) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <FaPhoneAlt className="inline-block mr-2" /> Phone Number
                </label>
                <Field name="phone">
                  {({ field, meta }: any) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="Enter phone number"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        meta.touched && meta.error
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex space-x-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`flex-1 flex items-center justify-center py-3 font-semibold rounded-lg transition-colors ${
                    isSubmitting || !isValid
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <FaCheckCircle className="mr-2" />
                  {isSubmitting ? "Updating..." : "Update User"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FaTimesCircle className="mr-2" />
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUserModal;
