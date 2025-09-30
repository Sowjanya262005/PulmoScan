import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-md">
      {children}
    </div>
  );
};
