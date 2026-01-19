import React from 'react';
import { CloseIcon, MoonIcon, SunIcon, BellIcon, UserIcon, ShieldIcon } from './icons';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userName: string;
  userRole: string;
}

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  userName,
  userRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-4 mb-0 sm:mb-0 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slideUp ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Settings
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'
              }`}
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Profile Section */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-neutral-700' : 'bg-neutral-900'
              }`}>
                <UserIcon className="text-white" size={24} />
              </div>
              <div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {userName}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Appearance
            </h3>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? (
                    <MoonIcon className="text-blue-400" size={20} />
                  ) : (
                    <SunIcon className="text-amber-500" size={20} />
                  )}
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      Dark Mode
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {darkMode ? 'Currently enabled' : 'Currently disabled'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onToggleDarkMode}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-neutral-300'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Notifications
            </h3>
            <div className={`p-4 rounded-xl space-y-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <ToggleOption
                icon={<BellIcon size={20} />}
                title="Push Notifications"
                description="Get notified about new posts"
                darkMode={darkMode}
                defaultChecked={true}
              />
              <ToggleOption
                icon={<BellIcon size={20} />}
                title="Email Digest"
                description="Weekly summary of activity"
                darkMode={darkMode}
                defaultChecked={false}
              />
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Privacy
            </h3>
            <div className={`p-4 rounded-xl space-y-4 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <ToggleOption
                icon={<ShieldIcon size={20} />}
                title="Profile Visibility"
                description="Allow others to see your profile"
                darkMode={darkMode}
                defaultChecked={true}
              />
              <ToggleOption
                icon={<ShieldIcon size={20} />}
                title="Activity Status"
                description="Show when you're active"
                darkMode={darkMode}
                defaultChecked={true}
              />
            </div>
          </div>

          {/* App Info */}
          <div className={`text-center pt-4 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Synapse v1.0.0
            </p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              AI Productivity Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Option Component
interface ToggleOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode: boolean;
  defaultChecked: boolean;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ icon, title, description, darkMode, defaultChecked }) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>
          {icon}
        </span>
        <div>
          <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {title}
          </p>
          <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsChecked(!isChecked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          isChecked 
            ? (darkMode ? 'bg-blue-600' : 'bg-neutral-900')
            : (darkMode ? 'bg-neutral-700' : 'bg-neutral-300')
        }`}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          isChecked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
};

export default Settings;
