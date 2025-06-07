import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react'; // Optional icons

function AlertBox({ message, type = "info", onClose }) {
  const base = "w-full max-w-md mx-auto px-5 py-4 rounded-xl shadow-xl flex items-center justify-between gap-4 border-2";

  const styles = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-300",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-300",
      icon: <AlertCircle className="w-5 h-5 text-red-600" />
    }
  };

  const selected = styles[type] || styles.success;

  return (
    <div className={`${base} ${selected.bg} ${selected.border} ${selected.text} animate-fade-in`}>
      <div className="flex items-center gap-6">
        {selected.icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-lg font-bold text-gray-500 transition-colors hover:text-gray-800"
        aria-label="Close alert"
      >
        &times;
      </button>
    </div>
  );
}

export default AlertBox;
