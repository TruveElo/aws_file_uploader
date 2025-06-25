import React from 'react';
import Icon from '../AppIcon';

const UploadProgressOverlay = ({ 
  isVisible = false, 
  progress = 0, 
  status = 'uploading', 
  fileName = '', 
  onCancel = () => {},
  onClose = () => {}
}) => {
  if (!isVisible) return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return 'Upload';
      case 'processing':
        return 'Loader2';
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      default:
        return 'Upload';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'uploading': case'processing':
        return 'text-primary';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing and validating...';
      case 'success':
        return 'Upload completed successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Preparing upload...';
    }
  };

  const canCancel = status === 'uploading' || status === 'processing';
  const isComplete = status === 'success' || status === 'error';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-overlay p-4">
      <div className="bg-surface rounded-md shadow-lg max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">
            File Upload
          </h3>
          {isComplete && (
            <button
              onClick={onClose}
              className="p-1 rounded-sm hover:bg-background transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close"
            >
              <Icon 
                name="X" 
                size={20} 
                color="currentColor" 
                strokeWidth={2}
              />
            </button>
          )}
        </div>

        {/* Status Icon and Message */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            status === 'success' ? 'bg-green-100' : 
            status === 'error'? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <Icon 
              name={getStatusIcon()} 
              size={32} 
              color="currentColor" 
              strokeWidth={2}
              className={`${getStatusColor()} ${
                status === 'uploading' || status === 'processing' ? 'animate-pulse' : ''
              }`}
            />
          </div>
          
          <h4 className="text-lg font-medium text-text-primary mb-2">
            {getStatusMessage()}
          </h4>
          
          {fileName && (
            <p className="text-sm text-text-secondary font-mono truncate">
              {fileName}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {!isComplete && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">Progress</span>
              <span className="text-sm font-medium text-text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Details */}
        {(status === 'uploading' || status === 'processing') && (
          <div className="bg-background rounded-sm p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Status:</span>
              <span className="text-text-primary font-medium">
                {status === 'uploading' ? 'Transferring' : 'Validating'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-text-secondary">Security Check:</span>
              <span className="text-success font-medium">
                {progress > 50 ? 'Passed' : 'In Progress'}
              </span>
            </div>
          </div>
        )}

        {/* Success Details */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-sm p-4 mb-6">
            <div className="flex items-center mb-2">
              <Icon 
                name="Shield" 
                size={16} 
                color="currentColor" 
                strokeWidth={2}
                className="text-success mr-2"
              />
              <span className="text-sm font-medium text-success">
                Security Validation Complete
              </span>
            </div>
            <p className="text-sm text-green-700">
              Your file has been securely uploaded and validated. All security checks passed successfully.
            </p>
          </div>
        )}

        {/* Error Details */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-6">
            <div className="flex items-center mb-2">
              <Icon 
                name="AlertTriangle" 
                size={16} 
                color="currentColor" 
                strokeWidth={2}
                className="text-error mr-2"
              />
              <span className="text-sm font-medium text-error">
                Upload Failed
              </span>
            </div>
            <p className="text-sm text-red-700">
              The upload could not be completed. Please check your file and try again.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          {canCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-sm hover:bg-background transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Cancel Upload
            </button>
          )}
          
          {status === 'success' && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-blue-700 rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Continue
            </button>
          )}
          
          {status === 'error' && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-error hover:bg-red-700 rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProgressOverlay;