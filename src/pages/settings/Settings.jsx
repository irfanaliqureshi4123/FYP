import React, { useState } from 'react';
import { User, Bell, Lock, Palette } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

/**
 * Settings Page
 * User preferences and settings
 */
const Settings = () => {
    const { currentUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        bio: currentUser?.bio || '',
        location: currentUser?.location || '',
        website: currentUser?.website || '',
    });

    const [selectedInterests, setSelectedInterests] = useState(currentUser?.interests || []);

    const allInterests = ['Tech', 'Design', 'Business', 'Data', 'Healthcare', 'AI', 'Marketing', 'Education'];

    const handleInterestToggle = (interest) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving settings:', { ...formData, interests: selectedInterests });
        // Mock save
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Avatar src={currentUser?.avatar} alt={currentUser?.name} size="2xl" />
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <Input
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                    />

                    <Input
                        label="Bio"
                        type="textarea"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us about yourself"
                    />

                    <Input
                        label="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, Country"
                    />

                    <Input
                        label="Website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Career Interests
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {allInterests.map((interest) => (
                                <Badge
                                    key={interest}
                                    variant={selectedInterests.includes(interest) ? 'primary' : 'default'}
                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => handleInterestToggle(interest)}
                                >
                                    {interest}
                                    {selectedInterests.includes(interest) && ' ✓'}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" variant="primary" fullWidth>
                        Save Changes
                    </Button>
                </form>
            </div>

            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-gray-900 dark:text-white"
                    >
                        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Likes and reactions', description: 'When someone likes your post' },
                        { label: 'Comments', description: 'When someone comments on your post' },
                        { label: 'New followers', description: 'When someone follows you' },
                        { label: 'Mentions', description: 'When someone mentions you' },
                        { label: 'Messages', description: 'When you receive a new message' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Privacy */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h2>
                </div>

                <div className="space-y-3">
                    <Button variant="outline" fullWidth className="justify-start">
                        Change Password
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start">
                        Blocked Users
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start">
                        Privacy Policy
                    </Button>
                    <Button variant="outline" fullWidth className="justify-start">
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
