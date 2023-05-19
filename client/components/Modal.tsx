import React from 'react';

const Modal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-1/2 h-1/2 bg-white rounded-lg shadow-lg">
        random modal content
      </div>
    </div>
  );
};

export default Modal;