import React, { useState } from 'react';
import {
  Settings,
  Mail,
  Bell,
  Lock,
  Globe,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

/**
 * AdminSettings Component
 * Manages system settings, platform configuration, and admin preferences
 * Features: Email settings, notifications, security, platform configuration
 */
function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'Career Connect',
    platformUrl: 'https://careerconnect.com',
    supportEmail: 'support@careerconnect.com',
    timezone: 'UTC-5',
    maintenanceMode: false,

    // Email Settings
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    emailFrom: 'noreply@careerconnect.com',
    emailFromName: 'Career Connect',
    smtpUsername: 'your-email@gmail.com',

    // Notification Settings
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: false,
    pushNotificationsEnabled: true,
    newUserNotifications: true,
    suspiciousActivityAlerts: true,

    // Security Settings
    twoFactorAuth: true,
    ipWhitelistingEnabled: false,
    passwordMinLength: 8,
    sessionTimeout: 30,
    enableLoginLogs: true,

    // Platform Settings
    maxFileUploadSize: 10,
    allowUserDeletion: true,
    requireEmailVerification: true,
    allowRegistration: true,
    apiRateLimit: 1000,
  });

  const [editedSettings, setEditedSettings] = useState(settings);
  const [smtpPassword, setSmtpPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Handle setting change
  const handleSettingChange = (key, value) => {
    setEditedSettings({
      ...editedSettings,
      [key]: value,
    });
  };

  // Handle save
  const handleSave = () => {
    setSettings(editedSettings);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Handle reset
  const handleReset = () => {
    setEditedSettings(settings);
  };

  // SettingGroup Component
  const SettingGroup = ({ title, description, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );

  // Setting Field Component
  const SettingField = ({ label, description, children }) => (
    <div>
      <label className="text-sm font-medium text-slate-900 dark:text-white">{label}</label>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      )}
      <div className="mt-2">{children}</div>
    </div>
  );

  // Toggle Switch Component
  const ToggleSwitch = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage platform configuration and system settings
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Settings saved successfully!
          </span>
        </div>
      )}

      {showErrorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm font-medium text-red-700 dark:text-red-300">
            Error saving settings. Please try again.
          </span>
        </div>
      )}

      {/* Settings Tabs */}
      <div className="flex gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-1">
        {['general', 'email', 'notifications', 'security', 'platform'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div>
        {/* General Settings */}
        {activeTab === 'general' && (
          <>
            <SettingGroup title="Platform Information" description="Basic platform configuration">
              <SettingField label="Platform Name">
                <input
                  type="text"
                  value={editedSettings.platformName}
                  onChange={(e) => handleSettingChange('platformName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Platform URL">
                <input
                  type="url"
                  value={editedSettings.platformUrl}
                  onChange={(e) => handleSettingChange('platformUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Support Email">
                <input
                  type="email"
                  value={editedSettings.supportEmail}
                  onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Timezone">
                <select
                  value={editedSettings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC">UTC</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                  <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                </select>
              </SettingField>

              <SettingField
                label="Maintenance Mode"
                description="Enable to temporarily take the platform offline"
              >
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.maintenanceMode}
                    onChange={(value) => handleSettingChange('maintenanceMode', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {editedSettings.maintenanceMode ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </SettingField>
            </SettingGroup>
          </>
        )}

        {/* Email Settings */}
        {activeTab === 'email' && (
          <>
            <SettingGroup title="SMTP Configuration" description="Email server settings">
              <SettingField label="SMTP Server">
                <input
                  type="text"
                  value={editedSettings.smtpServer}
                  onChange={(e) => handleSettingChange('smtpServer', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="SMTP Port">
                <input
                  type="number"
                  value={editedSettings.smtpPort}
                  onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="SMTP Username">
                <input
                  type="email"
                  value={editedSettings.smtpUsername}
                  onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="SMTP Password">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={smtpPassword}
                    disabled
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 dark:text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </SettingField>

              <SettingField label="From Email Address">
                <input
                  type="email"
                  value={editedSettings.emailFrom}
                  onChange={(e) => handleSettingChange('emailFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="From Email Name">
                <input
                  type="text"
                  value={editedSettings.emailFromName}
                  onChange={(e) => handleSettingChange('emailFromName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>
            </SettingGroup>
          </>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <>
            <SettingGroup title="Notification Channels" description="Configure notification delivery methods">
              <SettingField label="Email Notifications">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.emailNotificationsEnabled}
                    onChange={(value) => handleSettingChange('emailNotificationsEnabled', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {editedSettings.emailNotificationsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </SettingField>

              <SettingField label="SMS Notifications">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.smsNotificationsEnabled}
                    onChange={(value) => handleSettingChange('smsNotificationsEnabled', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {editedSettings.smsNotificationsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </SettingField>

              <SettingField label="Push Notifications">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.pushNotificationsEnabled}
                    onChange={(value) => handleSettingChange('pushNotificationsEnabled', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {editedSettings.pushNotificationsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </SettingField>
            </SettingGroup>

            <SettingGroup title="Alert Configuration" description="Configure system alerts">
              <SettingField label="New User Notifications">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.newUserNotifications}
                    onChange={(value) => handleSettingChange('newUserNotifications', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Notify on new user registration
                  </span>
                </div>
              </SettingField>

              <SettingField label="Suspicious Activity Alerts">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.suspiciousActivityAlerts}
                    onChange={(value) => handleSettingChange('suspiciousActivityAlerts', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Alert on suspicious activities
                  </span>
                </div>
              </SettingField>
            </SettingGroup>
          </>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <>
            <SettingGroup title="Security Configuration" description="Platform security settings">
              <SettingField label="Two-Factor Authentication">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.twoFactorAuth}
                    onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Require 2FA for admin accounts
                  </span>
                </div>
              </SettingField>

              <SettingField label="IP Whitelisting">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.ipWhitelistingEnabled}
                    onChange={(value) => handleSettingChange('ipWhitelistingEnabled', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Restrict access by IP address
                  </span>
                </div>
              </SettingField>

              <SettingField label="Minimum Password Length">
                <input
                  type="number"
                  min="6"
                  max="32"
                  value={editedSettings.passwordMinLength}
                  onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Session Timeout (minutes)">
                <input
                  type="number"
                  value={editedSettings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Login Logs">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.enableLoginLogs}
                    onChange={(value) => handleSettingChange('enableLoginLogs', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Enable login activity logging
                  </span>
                </div>
              </SettingField>
            </SettingGroup>
          </>
        )}

        {/* Platform Settings */}
        {activeTab === 'platform' && (
          <>
            <SettingGroup title="Platform Configuration" description="General platform settings">
              <SettingField label="Max File Upload Size (MB)">
                <input
                  type="number"
                  value={editedSettings.maxFileUploadSize}
                  onChange={(e) => handleSettingChange('maxFileUploadSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>

              <SettingField label="Allow User Deletion">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.allowUserDeletion}
                    onChange={(value) => handleSettingChange('allowUserDeletion', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Allow users to delete their accounts
                  </span>
                </div>
              </SettingField>

              <SettingField label="Require Email Verification">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.requireEmailVerification}
                    onChange={(value) => handleSettingChange('requireEmailVerification', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Verify email on registration
                  </span>
                </div>
              </SettingField>

              <SettingField label="Allow New Registrations">
                <div className="flex items-center gap-3">
                  <ToggleSwitch
                    value={editedSettings.allowRegistration}
                    onChange={(value) => handleSettingChange('allowRegistration', value)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Allow new user registrations
                  </span>
                </div>
              </SettingField>

              <SettingField label="API Rate Limit (requests/hour)">
                <input
                  type="number"
                  value={editedSettings.apiRateLimit}
                  onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </SettingField>
            </SettingGroup>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;
