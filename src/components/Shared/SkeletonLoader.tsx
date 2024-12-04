// SkeletonLoader.tsx
import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Skeleton Card */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-300 animate-pulse"
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Skeleton for User Name */}
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-2"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
              {/* Skeleton for Email */}
              <div className="flex items-center mb-4">
                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              </div>
              {/* Skeleton for Phone */}
              <div className="flex items-center mb-4">
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            {/* Skeleton for Edit Button */}
            <div className="flex justify-between items-center mt-4">
              <div className="w-24 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
