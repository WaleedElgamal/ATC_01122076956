import React from "react";

const Alert = ({ message, type = "error" }) => {
  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";

  return (
    <div className={`${bgColor} ${textColor} p-4 mb-4 rounded-md`}>
      {message}
    </div>
  );
};

export default Alert;
