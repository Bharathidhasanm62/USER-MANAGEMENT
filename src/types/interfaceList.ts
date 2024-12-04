export interface User {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone?: string;
  id?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  bankDetails?: {
    bankName?: string;
    lastFourDigits?: string;
  };
}
export interface DocumentMetadata {
  fileName: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: Date;
  recipients: { id: string; name: string }[];
}
