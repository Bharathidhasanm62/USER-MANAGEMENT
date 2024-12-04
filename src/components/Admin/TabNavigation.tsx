import React from "react";

interface Tab {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[]; 
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabs,
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-sm mb-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 
            ${
              activeTab === tab.value
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-transparent text-gray-600 hover:bg-gray-200 hover:text-blue-700"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-300
            group relative overflow-hidden
          `}
        >
          <tab.icon className={`w-4 h-4 ${activeTab === tab.value ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
          <span className="text-sm font-medium">{tab.label}</span>
          {activeTab === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white opacity-70"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;