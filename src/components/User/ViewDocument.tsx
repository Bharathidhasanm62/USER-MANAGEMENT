import React, { useState } from "react";
import { DocumentMetadata } from "../../types/interfaceList";
import { FaFileAlt, FaEye, FaDownload, FaTimes } from "react-icons/fa"; // Import necessary icons

// Props Interface
interface ViewDocumentProps {
  documents: DocumentMetadata[];
}

const ViewDocument: React.FC<ViewDocumentProps> = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentMetadata | null>(null);

  const handleDownload = (fileName: string, fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if documents array is empty or null
  if (!documents || documents.length === 0) {
    return (
      <div className="flex justify-center items-center p-6 h-64 border border-dashed border-gray-300 bg-gray-50 rounded-lg">
        <div className="text-center text-gray-600">
          <FaFileAlt className="text-4xl mb-4 text-gray-500" />
          <p className="text-xl">No documents available</p>
          <p className="text-sm text-gray-500 mt-2">Please upload a document to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-md bg-white p-4"
        >
          <h3 className="text-lg font-semibold text-blue-600 hover:underline">
            <a rel="noopener noreferrer">
              {doc.fileName}
            </a>
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Uploaded by: <span className="font-medium">{doc.uploadedBy}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Recipients:
            {doc.recipients.map((recipient, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-2"
              >
                {recipient?.name}
              </span>
            ))}
          </p>
          <div className="flex space-x-4 mt-4">
            {/* View Button (opens modal) */}
            <button
              onClick={() => setSelectedDocument(doc)}
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center space-x-2"
            >
              <FaEye className="text-white" />
              <span>View</span>
            </button>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(doc.fileName, doc.fileUrl)}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <FaDownload className="text-white" />
              <span>Download</span>
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <h2 className="text-xl font-bold mb-4">
              {selectedDocument.fileName}
            </h2>
            <iframe
              src={selectedDocument.fileUrl}
              className="w-full h-96 border"
              title={selectedDocument.fileName}
            ></iframe>

            {/* Close Button */}
            <button
              onClick={() => setSelectedDocument(null)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-lg"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDocument;
