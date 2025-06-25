import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OTPInput = ({ value, onChange, disabled = false }) => {
  const [showOTP, setShowOTP] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Only allow numbers and limit to 6 digits
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 6);
    onChange(numericValue);
  };

  const toggleShowOTP = () => {
    setShowOTP(!showOTP);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="otp" className="block text-sm font-medium text-text-primary">
        One-Time Password (OTP)
        <span className="text-error ml-1">*</span>
      </label>
      
      <div className="relative">
        <input
          id="otp"
          type={showOTP ? 'text' : 'password'}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className={`w-full px-4 py-3 pr-12 border rounded-sm text-sm font-mono tracking-wider transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
            disabled 
              ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' :'bg-surface border-border text-text-primary hover:border-primary'
          }`}
        />
        
        <button
          type="button"
          onClick={toggleShowOTP}
          disabled={disabled}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            disabled 
              ? 'text-gray-400 cursor-not-allowed' :'text-text-secondary hover:text-text-primary'
          }`}
          aria-label={showOTP ? 'Hide OTP' : 'Show OTP'}
        >
          <Icon 
            name={showOTP ? 'EyeOff' : 'Eye'} 
            size={16} 
            color="currentColor" 
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Helper Text */}
      <div className="flex items-start space-x-2">
        <Icon 
          name="Info" 
          size={14} 
          color="currentColor" 
          strokeWidth={2}
          className="text-primary mt-0.5 flex-shrink-0"
        />
        <p className="text-xs text-text-secondary">
          Enter the 6-digit one-time password sent to your registered device for additional security verification.
        </p>
      </div>

      {/* OTP Length Indicator */}
      {value && (
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index < value.length 
                    ? 'bg-primary' :'bg-border'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-text-secondary">
            {value.length}/6 digits
          </span>
        </div>
      )}

      {/* Mock OTP for Demo */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-3">
        <div className="flex items-start">
          <Icon 
            name="Key" 
            size={16} 
            color="currentColor" 
            strokeWidth={2}
            className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-sm font-medium text-yellow-800 mb-1">
              Demo Mode
            </p>
            <p className="text-xs text-yellow-700">
              Use OTP: <span className="font-mono font-bold">123456</span> for testing purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;