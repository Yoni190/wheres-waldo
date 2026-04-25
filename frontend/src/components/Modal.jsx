import React, { useState } from "react";

const Modal = ({ isModalOpen, onClose, title, duration, setName }) => {
  if (!isModalOpen) return null;

  const [username, setUsername] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 z-10 text-center">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        <div className="bg-green-50 rounded-lg py-6 px-4 mb-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Your Time
          </p>

          <p className="text-4xl font-extrabold text-green-600 mt-2">
            {duration}
            <span className="text-lg font-medium ml-1">s</span>
          </p>
        </div>

        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => setName(username)}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;