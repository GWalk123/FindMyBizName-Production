import React, { useState } from 'react';

const CustomizeExperience = () => {
  const [preferences, setPreferences] = useState({
    theme: 'Light Mode',
    showImages: true,
    enableAnimations: true,
    saveSearchHistory: false,
    enableNotifications: false,
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem('userPreferences', JSON.stringify({ ...preferences, [key]: value }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold mb-4">Customize Your Experience</h2>
      <div className="mb-4">
        <label className="block font-medium mb-2">Color Theme</label>
        <select
          value={preferences.theme}
          onChange={(e) => handlePreferenceChange('theme', e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="Superman">Superman</option>
          <option value="Dark Mode">Dark Mode</option>
          <option value="Light Mode">Light Mode</option>
          <option value="Vibrant">Vibrant</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">
          <input
            type="checkbox"
            checked={preferences.showImages}
            onChange={(e) => handlePreferenceChange('showImages', e.target.checked)}
            className="mr-2"
          />
          Show Images
        </label>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">
          <input
            type="checkbox"
            checked={preferences.enableAnimations}
            onChange={(e) => handlePreferenceChange('enableAnimations', e.target.checked)}
            className="mr-2"
          />
          Enable Animations
        </label>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">
          <input
            type="checkbox"
            checked={preferences.saveSearchHistory}
            onChange={(e) => handlePreferenceChange('saveSearchHistory', e.target.checked)}
            className="mr-2"
          />
          Save Search History
        </label>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">
          <input
            type="checkbox"
            checked={preferences.enableNotifications}
            onChange={(e) => handlePreferenceChange('enableNotifications', e.target.checked)}
            className="mr-2"
          />
          Enable Notifications
        </label>
      </div>
    </div>
  );
};

export default CustomizeExperience;
