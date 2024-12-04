import { User } from "../../types/interfaceList";

export const getStoredUser = (): User | undefined => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      return JSON.parse(storedUser); // Parse and return user data
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }
  return undefined; // Return undefined if no user data is found
};
// Convert file to Base64 format
export const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
