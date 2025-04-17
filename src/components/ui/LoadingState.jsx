import React from 'react';

const LoadingState = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-2",
    large: "h-12 w-12 border-3"
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`${sizeClasses[size]} border-t-transparent border-sepia-dark rounded-full animate-spin mb-3`}
      ></div>
      <p className="text-sepia-muted">{message}</p>
    </div>
  );
};

export default LoadingState; 