import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, X, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import usersData from '../../data/users.json';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Toast from '../../components/common/Toast';

/**
 * Edit Profile Page
 * Allows users to edit their profile information
 */
const EditProfile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const { currentUser } = useAuth();
    const user = usersData.find(u => u.username === username) || currentUser;

    // Ensure user owns the profile
    if (user?.id !== currentUser?.id) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-red-900 dark:text-red-300">Unauthorized</h3>
                        <p className="text-sm text-red-800 dark:text-red-400">You can only edit your own profile.</p>
                    </div>
                </div>
            </div>
        );
    }

    const [formData, setFormData] = useState({
        name: user?.name || '',
        title: user?.title || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || '',
        coverImage: user?.coverImage || '',
    });

    const [skills, setSkills] = useState(user?.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [interests, setInterests] = useState(user?.interests || []);
    const [selectedInterests, setSelectedInterests] = useState(user?.interests || []);
    const [careerGoals, setCareerGoals] = useState(user?.careerGoals || []);
    const [newGoal, setNewGoal] = useState('');
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const allInterests = ['Tech', 'Design', 'Business', 'Data', 'Healthcare', 'AI', 'Marketing', 'Education', 'Entrepreneurship', 'Science'];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
        if (skills.length === 0) newErrors.skills = 'Add at least one skill';
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skill) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleAddGoal = () => {
        if (newGoal.trim() && !careerGoals.includes(newGoal)) {
            setCareerGoals([...careerGoals, newGoal]);
            setNewGoal('');
        }
    };

    const handleRemoveGoal = (goal) => {
        setCareerGoals(careerGoals.filter(g => g !== goal));
    };

    const handleInterestToggle = (interest) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleImageUpload = (e, field) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    [field]: event.target?.result || ''
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setToastMessage('Please fix the errors below');
            setToastType('error');
            setShowToast(true);
            return;
        }

        const profileData = {
            ...formData,
            skills,
            interests: selectedInterests,
            careerGoals,
        };

        console.log('Profile updated:', profileData);
        setToastMessage('Profile updated successfully!');
        setToastType('success');
        setShowToast(true);

        setTimeout(() => {
            navigate(`/profile/${user?.username}`);
        }, 1500);
    };

    const profileCompletion = Math.round(
        ((formData.name ? 1 : 0) +
            (formData.title ? 1 : 0) +
            (formData.bio ? 1 : 0) +
            (formData.location ? 1 : 0) +
            (formData.website ? 1 : 0) +
            (skills.length > 0 ? 1 : 0) +
            (selectedInterests.length > 0 ? 1 : 0) +
            (careerGoals.length > 0 ? 1 : 0)) / 8 * 100
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {Math.round(profileCompletion)}% Complete
                    </div>
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                            style={{ width: `${profileCompletion}%` }}
                        />
                    </div>
                </div>
            </div>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Image */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <img
                            src={formData.coverImage}
                            alt="Cover"
                            className="w-full h-48 object-cover"
                        />
                        <label className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg cursor-pointer transition-colors">
                            <Camera className="w-5 h-5" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'coverImage')}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="p-6 pb-4">
                        <div className="flex items-end gap-4 -mt-20 mb-6">
                            <div className="relative">
                                <Avatar
                                    src={formData.avatar}
                                    alt={formData.name}
                                    size="2xl"
                                    className="ring-4 ring-white dark:ring-gray-800"
                                />
                                <label className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                                    <Camera className="w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'avatar')}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                error={errors.name}
                                required
                            />

                            <Input
                                label="Title/Role"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Senior Software Engineer"
                                error={errors.title}
                                required
                            />

                            <Input
                                label="Bio"
                                name="bio"
                                type="textarea"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself"
                                error={errors.bio}
                                required
                                rows="4"
                            />

                            <Input
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="City, Country"
                            />

                            <Input
                                label="Website"
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleInputChange}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skills</h3>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill (e.g., React, Python)"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                            />
                            <Button
                                type="button"
                                onClick={handleAddSkill}
                                icon={<Plus className="w-4 h-4" />}
                            >
                                Add
                            </Button>
                        </div>
                        {errors.skills && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.skills}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="primary"
                                    className="flex items-center gap-2 group cursor-pointer"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interests */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Career Interests</h3>
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

                {/* Career Goals */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Career Goals</h3>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                placeholder="Add a career goal"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGoal())}
                            />
                            <Button
                                type="button"
                                onClick={handleAddGoal}
                                icon={<Plus className="w-4 h-4" />}
                            >
                                Add
                            </Button>
                        </div>
                        <ul className="space-y-2">
                            {careerGoals.map((goal, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <span className="text-gray-900 dark:text-white">{goal}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGoal(goal)}
                                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/profile/${user?.username}`)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Save Profile
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
