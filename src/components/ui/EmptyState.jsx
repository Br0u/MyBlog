import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  title = "No items found",
  description = "There are no items to display at the moment.",
  icon = null,
  action = null,
  actionLink = null,
  actionText = "Create new"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-sepia-lightest/50 border border-sepia-light/20 rounded-lg">
      {icon && (
        <div className="text-sepia-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-serif text-sepia-dark mb-2">{title}</h3>
      <p className="text-sepia-muted text-center max-w-md mb-6">{description}</p>
      
      {(action || actionLink) && (
        <div>
          {actionLink ? (
            <Link 
              to={actionLink} 
              className="inline-flex items-center px-4 py-2 bg-sepia-dark text-sepia-lightest rounded-md hover:bg-sepia-darkest transition-colors duration-200"
            >
              {actionText}
            </Link>
          ) : (
            <button 
              onClick={action} 
              className="inline-flex items-center px-4 py-2 bg-sepia-dark text-sepia-lightest rounded-md hover:bg-sepia-darkest transition-colors duration-200"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 