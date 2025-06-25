import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="flex items-center justify-between h-16 px-4 lg:h-15 lg:px-6">
        {/* Brand Section */}
        <div className="flex items-center">
          <a 
            href="/secure-file-upload" 
            className="flex items-center space-x-3 transition-smooth hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-sm">
              <Icon 
                name="Shield" 
                size={20} 
                color="white" 
                strokeWidth={2}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">
                SecureUpload
              </h1>
              <p className="text-xs text-text-secondary -mt-1">
                Enterprise File Security
              </p>
            </div>
          </a>
        </div>

        {/* Session Utilities */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 px-3 py-2 rounded-sm transition-smooth hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                <Icon 
                  name="User" 
                  size={16} 
                  color="white" 
                  strokeWidth={2}
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">
                  John Doe
                </p>
                <p className="text-xs text-text-secondary">
                  Administrator
                </p>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                color="currentColor" 
                strokeWidth={2}
                className={`transition-smooth ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-border z-overlay">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-secondary">john.doe@company.com</p>
                  </div>
                  
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-background transition-smooth focus:outline-none focus:bg-background"
                  >
                    <Icon 
                      name="User" 
                      size={16} 
                      color="currentColor" 
                      strokeWidth={2}
                      className="mr-3"
                    />
                    Profile Settings
                  </button>
                  
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-background transition-smooth focus:outline-none focus:bg-background"
                  >
                    <Icon 
                      name="Settings" 
                      size={16} 
                      color="currentColor" 
                      strokeWidth={2}
                      className="mr-3"
                    />
                    Security Settings
                  </button>
                  
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-red-50 transition-smooth focus:outline-none focus:bg-red-50"
                    >
                      <Icon 
                        name="LogOut" 
                        size={16} 
                        color="currentColor" 
                        strokeWidth={2}
                        className="mr-3"
                      />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile User Menu Overlay */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-50 md:hidden"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;