import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input className={`px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 w-full ${className}`} {...props} />
  );
};
