import React from 'react';
import Icon from 'components/AppIcon';

const UploadButton = ({ disabled, isUploading, onSubmit }) => {
  const handleClick = (e) => {
    if (!disabled && !isUploading) {
      onSubmit(e);
    }
  };

  return (
    <div className="pt-4">
      <button
        type="submit"
        onClick={handleClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center px-6 py-4 text-sm font-medium rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          disabled
            ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
            : isUploading
              ? 'bg-primary text-white cursor-wait' :'bg-primary text-white hover:bg-blue-700 focus:ring-primary'
        }`}
      >
        {isUploading ? (
          <>
            <Icon 
              name="Loader2" 
              size={20} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-3 animate-spin"
            />
            Uploading File...
          </>
        ) : (
          <>
            <Icon 
              name="Upload" 
              size={20} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-3"
            />
            Upload File Securely
          </>
        )}
      </button>

      {/* Upload Requirements */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-text-secondary text-center">
          By uploading, you agree to our security and privacy policies
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
          <div className="flex items-center">
            <Icon 
              name="Shield" 
              size={12} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-1 text-success"
            />
            Encrypted Transfer
          </div>
          
          <div className="flex items-center">
            <Icon 
              name="Lock" 
              size={12} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-1 text-success"
            />
            Secure Storage
          </div>
          
          <div className="flex items-center">
            <Icon 
              name="CheckCircle" 
              size={12} 
              color="currentColor" 
              strokeWidth={2}
              className="mr-1 text-success"
            />
            Validated
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;