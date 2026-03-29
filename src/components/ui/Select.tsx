import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  return (
    <select className={`px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 w-full ${className}`} {...props}>
      {children}
    </select>
  );
};
