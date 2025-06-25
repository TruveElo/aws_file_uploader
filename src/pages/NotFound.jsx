import React from 'react';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <Icon 
              name="AlertTriangle" 
              size={48} 
              color="currentColor" 
              strokeWidth={2}
              className="text-error"
            />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/secure-file-upload"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Icon 
              name="Home" 
              size={16} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-2"
            />
            Go to Home
          </a>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-text-primary border border-border hover:bg-background rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Icon 
              name="ArrowLeft" 
              size={16} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-2"
            />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;