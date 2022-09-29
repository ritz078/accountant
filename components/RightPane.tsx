import React from "react";

export const RightPane: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-1 flex-row">
      <div className="h-fit w-8/12 shrink-0 flex-col overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};
