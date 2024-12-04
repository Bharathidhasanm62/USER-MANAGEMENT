// Adjust the import based on your Firebase setup
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { DocumentMetadata, User } from "../../types/interfaceList"; // Assuming User is your custom user type
import { db } from "../../Config/firebaseConfig";

export const fetchUserData = async (credentials: {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
}): Promise<User[] | null> => {
  try {
    // Reference to the "user-data" collection in Firestore
    const userDataRef = collection(db, "user-data");

    // Prepare the filters based on provided credentials
    const filters = [];
    if (credentials.email) {
      filters.push(where("email", ">=", credentials.email)); // Adjust for prefix search
    }
    if (credentials.password) {
      filters.push(where("password", "==", credentials.password));
    }
    if (credentials.name) {
      filters.push(where("name", ">=", credentials.name)); // Adjust for prefix search
    }
    if (credentials.phone) {
      filters.push(where("phone", ">=", credentials.phone)); // Adjust for prefix search
    }

    // Query with the applied filters
    let userQuery = undefined;
    if (filters.length) {
      userQuery = query(userDataRef, ...filters);
    }
    const snapshot = await getDocs(userQuery ? userQuery : userDataRef);

    // Map over the documents to transform them into User objects
    const users: User[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User), // Ensure the document data is cast to the User type
    }));

    // Return the filtered users
    return users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Return null in case of an error
  }
};

export const updateUserData = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User[] | null> => {
  try {
    const userDocRef = doc(db, "user-data", userId);
    await updateDoc(userDocRef, updatedData); // Update with only the fields you want to modify
    const user = await fetchUserData({});
    return user;
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
};
export const fetchDocumentsData = async (
  recipientId?: string
): Promise<DocumentMetadata[] | null> => {
  try {
    const userDataRef = collection(db, "documents");
    const snapshot = await getDocs(userDataRef);

    let documents: DocumentMetadata[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as DocumentMetadata),
    }));

    if (recipientId) {
      documents = documents.filter((doc) =>
        doc?.recipients.some((recipient) => recipient?.id === recipientId)
      );
    }

    return documents;
  } catch (error) {
    console.error("Error fetching documents data:", error);
    return null;
  }
};

export const uploadDocument = async (documentMetadata: DocumentMetadata) => {
  try {
    await addDoc(collection(db, "documents"), documentMetadata);
    const documents = await fetchDocumentsData();
    return documents;
  } catch (err) {
    return null;
  }
};

export const authenticateUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const userDataRef = collection(db, "user-data");
    const filters = [];
    if (credentials.email)
      filters.push(where("email", "==", credentials.email));
    if (credentials.password)
      filters.push(where("password", "==", credentials.password));

    const userQuery = query(userDataRef, ...filters);
    const snapshot = await getDocs(userQuery);

    const users: User[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));
    const user: User | undefined = users.length ? users[0] : undefined;
    return user;
  } catch {
    return undefined;
  }
};

export const addUser = async (newUser: User) => {
  try {
    await addDoc(collection(db, "user-data"), newUser);
    return true;
  } catch (err) {
    console.error("Error adding user:", err); // Log the error for debugging
    throw err; // Re-throw the error to propagate it
  }
};

