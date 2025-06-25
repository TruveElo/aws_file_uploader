import React from 'react';
import Icon from 'components/AppIcon';

const FileInfoDisplay = ({ file, error }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      case 'ppt': case'pptx':
        return 'Presentation';
      case 'jpg': case'jpeg': case'png': case'gif': case'svg':
        return 'Image';
      case 'mp4': case'avi': case'mov':
        return 'Video';
      case 'mp3': case'wav':
        return 'Music';
      case 'zip': case'rar': case'7z':
        return 'Archive';
      default:
        return 'File';
    }
  };

  if (!file) return null;

  return (
    <div className={`border rounded-sm p-4 ${
      error ? 'border-error bg-red-50' : 'border-success bg-green-50'
    }`}>
      <div className="flex items-start space-x-4">
        {/* File Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center ${
          error ? 'bg-red-100' : 'bg-green-100'
        }`}>
          <Icon 
            name={getFileIcon(file.name)} 
            size={24} 
            color="currentColor" 
            strokeWidth={2}
            className={error ? 'text-error' : 'text-success'}
          />
        </div>

        {/* File Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium truncate ${
                error ? 'text-error' : 'text-success'
              }`}>
                {file.name}
              </h4>
              
              <div className="mt-1 flex items-center space-x-4 text-xs text-text-secondary">
                <span className="flex items-center">
                  <Icon 
                    name="HardDrive" 
                    size={12} 
                    color="currentColor" 
                    strokeWidth={2}
                    className="mr-1"
                  />
                  {formatFileSize(file.size)}
                </span>
                
                <span className="flex items-center">
                  <Icon 
                    name="Calendar" 
                    size={12} 
                    color="currentColor" 
                    strokeWidth={2}
                    className="mr-1"
                  />
                  {new Date(file.lastModified).toLocaleDateString()}
                </span>
              </div>

              {/* File Type */}
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  error 
                    ? 'bg-red-100 text-error' :'bg-green-100 text-success'
                }`}>
                  {file.type || 'Unknown type'}
                </span>
              </div>
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0 ml-4">
              <Icon 
                name={error ? 'XCircle' : 'CheckCircle'} 
                size={20} 
                color="currentColor" 
                strokeWidth={2}
                className={error ? 'text-error' : 'text-success'}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center">
              <Icon 
                name="AlertTriangle" 
                size={14} 
                color="currentColor" 
                strokeWidth={2}
                className="text-error mr-2 flex-shrink-0"
              />
              <p className="text-sm text-error font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {!error && (
            <div className="mt-3 flex items-center">
              <Icon 
                name="Shield" 
                size={14} 
                color="currentColor" 
                strokeWidth={2}
                className="text-success mr-2 flex-shrink-0"
              />
              <p className="text-sm text-success">
                File validated and ready for secure upload
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInfoDisplay;