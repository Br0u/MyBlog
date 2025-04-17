import React from 'react';
import { Link } from 'react-router-dom';

const variantStyles = {
  primary: "bg-sepia-dark text-sepia-lightest hover:bg-sepia-darkest hover:shadow-md border-transparent dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white",
  secondary: "bg-sepia-light/20 text-sepia-dark hover:bg-sepia-light/40 hover:shadow-sm border-sepia-light/30 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:border-gray-600",
  danger: "bg-red-500/80 text-white hover:bg-red-600 hover:shadow-md border-transparent dark:bg-red-700 dark:hover:bg-red-800",
  ghost: "bg-transparent text-sepia-dark hover:bg-sepia-light/20 border-transparent dark:text-gray-300 dark:hover:bg-gray-700/50",
  success: "bg-green-600/80 text-white hover:bg-green-700 hover:shadow-md border-transparent dark:bg-green-700 dark:hover:bg-green-800",
  outline: "bg-transparent text-sepia-dark hover:bg-sepia-light/10 border-sepia-light dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700/50"
};

const sizeStyles = {
  xs: "text-xs px-1.5 py-0.5 rounded",
  sm: "text-xs px-2 py-1 rounded",
  md: "text-sm px-3 py-1.5 rounded-md",
  lg: "text-base px-4 py-2 rounded-md",
  xl: "text-lg px-5 py-2.5 rounded-lg"
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href = null,
  to = null,
  className = "",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  icon = null,
  onClick,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sepia-dark/40 dark:focus:ring-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";
  const combinedClassNames = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-current rounded-full animate-spin mr-2"></span>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </>
  );

  if (to) {
    return (
      <Link 
        to={to}
        className={combinedClassNames}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href}
        className={combinedClassNames}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button; 