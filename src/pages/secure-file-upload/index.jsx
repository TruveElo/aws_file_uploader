import React, { useState, useRef } from 'react';
import Header from 'components/ui/Header';
import UploadProgressOverlay from 'components/ui/UploadProgressOverlay';
import FileUploadZone from './components/FileUploadZone';
import FileInfoDisplay from './components/FileInfoDisplay';
import OTPInput from './components/OTPInput';
import UploadButton from './components/UploadButton';
import Icon from 'components/AppIcon';

const SecureFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('uploading');
  const [showProgressOverlay, setShowProgressOverlay] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

  const handleFileSelect = (file) => {
    setError(''); // Clear any existing errors
    
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeded');
      setSelectedFile(null);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setUploadStatus('processing');
            setTimeout(() => {
              setUploadStatus('success');
              resolve();
            }, 2000);
          }, 500);
        }
        setUploadProgress(progress);
      }, 200);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile || !otp) {
      return;
    }

    setIsUploading(true);
    setShowProgressOverlay(true);
    setUploadProgress(0);
    setUploadStatus('uploading');

    try {
      await simulateUpload();
    } catch (error) {
      setUploadStatus('error');
    }
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
    setShowProgressOverlay(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
  };

  const handleCloseOverlay = () => {
    setShowProgressOverlay(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
    
    if (uploadStatus === 'success') {
      // Reset form on successful upload
      setSelectedFile(null);
      setOtp('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const isSubmitDisabled = !selectedFile || !otp || isUploading || error;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <Icon 
                name="Shield" 
                size={32} 
                color="white" 
                strokeWidth={2}
              />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Secure File Upload
            </h1>
            <p className="text-text-secondary max-w-md mx-auto">
              Upload your files securely to AWS cloud storage with validation and confirmation workflow
            </p>
          </div>

          {/* Upload Form */}
          <div className="bg-surface rounded-md shadow-sm border border-border p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Zone */}
              <FileUploadZone
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onBrowseClick={handleBrowseClick}
                selectedFile={selectedFile}
                error={error}
              />

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
                accept="*/*"
              />

              {/* File Information Display */}
              {selectedFile && (
                <FileInfoDisplay 
                  file={selectedFile} 
                  error={error}
                />
              )}

              {/* OTP Input */}
              {selectedFile && !error && (
                <OTPInput
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={isUploading}
                />
              )}

              {/* Submit Button */}
              <UploadButton
                disabled={isSubmitDisabled}
                isUploading={isUploading}
                onSubmit={handleSubmit}
              />
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-sm p-4">
            <div className="flex items-start">
              <Icon 
                name="Info" 
                size={20} 
                color="currentColor" 
                strokeWidth={2}
                className="text-primary mr-3 mt-0.5 flex-shrink-0"
              />
              <div>
                <h3 className="text-sm font-medium text-primary mb-1">
                  Security Information
                </h3>
                <p className="text-sm text-blue-700">
                  All files are encrypted during transfer and storage. Maximum file size is 1MB. 
                  One-time password is required for additional security verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Progress Overlay */}
      <UploadProgressOverlay
        isVisible={showProgressOverlay}
        progress={uploadProgress}
        status={uploadStatus}
        fileName={selectedFile?.name}
        onCancel={handleCancelUpload}
        onClose={handleCloseOverlay}
      />
    </div>
  );
};

export default SecureFileUpload;