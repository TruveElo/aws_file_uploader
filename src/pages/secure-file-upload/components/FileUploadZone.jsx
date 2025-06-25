import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FileUploadZone = ({ 
  onDrop, 
  onDragOver, 
  onBrowseClick, 
  selectedFile, 
  error 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(e);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        Select File
      </label>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-md p-8 text-center transition-all duration-200 cursor-pointer hover:border-primary hover:bg-blue-50 focus-within:border-primary focus-within:bg-blue-50 ${
          isDragOver 
            ? 'border-primary bg-blue-50' 
            : error 
              ? 'border-error bg-red-50' 
              : selectedFile 
                ? 'border-success bg-green-50' :'border-border bg-background'
        }`}
        onClick={onBrowseClick}
      >
        <div className="space-y-4">
          {/* Upload Icon */}
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
            error 
              ? 'bg-red-100' 
              : selectedFile 
                ? 'bg-green-100' 
                : isDragOver 
                  ? 'bg-blue-100' :'bg-gray-100'
          }`}>
            <Icon 
              name={error ? 'AlertCircle' : selectedFile ? 'CheckCircle' : isDragOver ? 'Upload' : 'Upload'} 
              size={24} 
              color="currentColor" 
              strokeWidth={2}
              className={
                error 
                  ? 'text-error' 
                  : selectedFile 
                    ? 'text-success' 
                    : isDragOver 
                      ? 'text-primary' :'text-text-secondary'
              }
            />
          </div>

          {/* Upload Text */}
          <div>
            <h3 className={`text-lg font-medium mb-2 ${
              error 
                ? 'text-error' 
                : selectedFile 
                  ? 'text-success' :'text-text-primary'
            }`}>
              {error 
                ? 'File Upload Error' 
                : selectedFile 
                  ? 'File Selected Successfully' 
                  : isDragOver 
                    ? 'Drop file here' :'Drag and drop your file here'
              }
            </h3>
            
            {!selectedFile && !error && (
              <p className="text-text-secondary mb-4">
                or click to browse from your computer
              </p>
            )}

            {selectedFile && !error && (
              <p className="text-success mb-4">
                {selectedFile.name} is ready for upload
              </p>
            )}

            {error && (
              <p className="text-error mb-4">
                Please select a file under 1MB and try again
              </p>
            )}

            {!selectedFile && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBrowseClick();
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-sm hover:bg-primary hover:text-white transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon 
                  name="FolderOpen" 
                  size={16} 
                  color="currentColor" 
                  strokeWidth={2}
                  className="mr-2"
                />
                Browse Files
              </button>
            )}
          </div>

          {/* File Size Limit */}
          <p className="text-xs text-text-secondary">
            Maximum file size: 1MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;