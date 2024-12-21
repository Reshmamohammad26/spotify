import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-purple-lightest backdrop-blur-sm border border-purple-light text-purple-dark px-4 py-3 rounded-lg shadow-lg">
      <div className="flex items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-purple-DEFAULT hover:text-purple-dark transition-colors duration-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};