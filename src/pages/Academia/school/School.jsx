import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, Mail, Globe, Users, BookOpen, Calendar, Award, ArrowLeft, Share2, Bell, GraduationCap, Search, Upload, X, Image as ImageIcon, Copy, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import PostComposer from '../../../components/posts/PostComposer';
import PostCard from '../../../components/posts/PostCard';
import { Loader } from '../../../components/common/Loader';
import { useApp } from '../../../context/AppContext';
import schoolsData from '../../../data/schools.json';
import schoolPostsData from '../../../data/schoolPosts.json';
import schoolGroupsData from '../../../data/schoolGroups.json';
import RegisterSchool from './register-school/RegisterSchool';
import RegisterSchoolTab from './register-school/RegisterSchoolTab';

/**
 * Main School Page
 * Lists all schools and their groups for exploration
 */
const School = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('schools');
    const [schools, setSchools] = useState(schoolsData);
    const [schoolGroups, setSchoolGroups] = useState(schoolGroupsData);

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getSchoolGroups = (schoolId) => {
        return schoolGroups.filter(group => group.schoolId === schoolId);
    };

    const handleRegisterSchool = (newSchool) => {
        // Add the new school to the schools list
        setSchools(prev => [newSchool, ...prev]);

        // Create a default group for the new school
        const newGroup = {
            id: `group-${Date.now()}`,
            schoolId: newSchool.id,
            name: `${newSchool.name} Community`,
            description: `Official community group for ${newSchool.name}. Connect, share resources, and collaborate.`,
            coverImage: null,
            memberCount: 1,
            isPublic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            classes: []
        };

        // Add the new group to the groups list
        setSchoolGroups(prev => [newGroup, ...prev]);

        // Switch to schools tab to show the newly created school
        setActiveTab('schools');
    };

    return (
        <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-start sm:items-center gap-3 xs:gap-4 sm:gap-6 mb-3 xs:mb-4 sm:mb-6 justify-between">
                    <div className="flex items-start sm:items-center gap-2 xs:gap-3 sm:gap-4 flex-1">
                        <button
                            onClick={() => navigate('/academia')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Go back to Academia"
                        >
                            <ArrowLeft className="w-4 xs:w-5 h-4 xs:h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <GraduationCap className="w-6 xs:w-8 h-6 xs:h-8 text-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">My School</h1>
                            <p className="text-xs xs:text-sm sm:text-base text-gray-600 dark:text-gray-400">Explore schools and join class communities</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                        onClick={() => setActiveTab('schools')}
                        className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                            activeTab === 'schools'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Browse Schools
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                            activeTab === 'register'
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                    >
                        Register New School
                    </button>
                </div>

                {/* Search - only show in schools tab */}
                {activeTab === 'schools' && (
                    <div className="relative">
                        <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-gray-400 flex-shrink-0" />
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search schools..."
                            className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                )}
            </div>

            {/* Content Area */}
            {activeTab === 'schools' && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                        {filteredSchools.map((school) => {
                        const schoolGroups = getSchoolGroups(school.id);
                        const primaryGroup = schoolGroups[0]; // Get first group
                        
                        return (
                            <div key={school.id} className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
                            {/* School Header Section */}
                            <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
                                    <div className="w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 rounded-lg xs:rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg xs:text-xl flex-shrink-0" style={{
                                        backgroundImage: `linear-gradient(135deg, ${school.colors?.[0] || '#3B82F6'} 0%, ${school.colors?.[1] || '#1D4ED8'} 100%)`
                                    }}>
                                        {school.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-sm xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                                {school.name}
                                            </h3>
                                            {school.type && (
                                                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded whitespace-nowrap">
                                                    {school.type}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2 xs:mb-3 line-clamp-2">
                                            {school.description}
                                        </p>
                                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1 min-w-0">
                                                <MapPin className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                <span className="truncate">{school.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                                <span className="whitespace-nowrap">{school.totalStudents} students</span>
                                            </div>
                                        </div>
                                        {school.principalName && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                <span className="font-semibold">Principal:</span> {school.principalName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Group Section */}
                            {primaryGroup && (
                                <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 flex-grow">
                                    <h4 className="text-xs xs:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 xs:mb-3 uppercase tracking-wide">
                                        School Group
                                    </h4>
                                    <h5 className="text-sm xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white mb-1 xs:mb-2 line-clamp-2">
                                        {primaryGroup.name}
                                    </h5>
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-2 xs:mb-3 line-clamp-2">
                                        {primaryGroup.description}
                                    </p>
                                    <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 text-xs xs:text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                            <span className="whitespace-nowrap">{primaryGroup.memberCount} members</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-3 xs:w-4 h-3 xs:h-4 flex-shrink-0" />
                                            <span className="whitespace-nowrap">{primaryGroup.classes?.length || 0} classes</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="p-3 xs:p-4 sm:p-5 md:p-6 flex flex-col gap-3">
                                {/* School Details */}
                                <div className="grid grid-cols-2 gap-2 text-xs xs:text-sm">
                                    {school.totalTeachers && (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                            <p className="text-gray-600 dark:text-gray-400">Teachers</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{school.totalTeachers}</p>
                                        </div>
                                    )}
                                    {school.foundedYear && (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                            <p className="text-gray-600 dark:text-gray-400">Founded</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{school.foundedYear}</p>
                                        </div>
                                    )}
                                </div>

                                {school.motto && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Motto</p>
                                        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{school.motto}</p>
                                    </div>
                                )}

                                {school.accreditation && (
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold">Accreditation:</span> {school.accreditation}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="p-3 xs:p-4 sm:p-5 md:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col xs:flex-row gap-2 xs:gap-3">
                                <Button
                                    onClick={() => navigate(`/school-profile/${school.id}`)}
                                    className="flex-1 text-xs xs:text-sm"
                                    variant="primary"
                                    size="sm"
                                >
                                    <BookOpen className="w-3 xs:w-4 h-3 xs:h-4 mr-1 xs:mr-2" />
                                    View School
                                </Button>
                                {primaryGroup && (
                                    <Button
                                        onClick={() => navigate(`/school-group/${primaryGroup.id}`)}
                                        className="flex-1 text-xs xs:text-sm"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Users className="w-3 xs:w-4 h-3 xs:h-4 mr-1 xs:mr-2" />
                                        Explore Group
                                    </Button>
                                )}
                            </div>

                            {/* Additional Groups Info */}
                            {schoolGroups.length > 1 && (
                                <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-2 xs:pb-3 sm:pb-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                        +{schoolGroups.length - 1} more group{schoolGroups.length - 1 > 1 ? 's' : ''}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                    })}
                    </div>

                    {filteredSchools.length === 0 && (
                        <div className="text-center py-12">
                            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No schools found</h3>
                            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search terms</p>
                        </div>
                    )}
                </>
            )}

            {/* Register Tab Content */}
            {activeTab === 'register' && (
                <RegisterSchoolTab onRegister={handleRegisterSchool} />
            )}
        </div>
    );
};

/**
 * School Profile Page
 * Displays individual school profile, announcements, activities, and engagement
 */
const SchoolProfile = () => {
    const navigate = useNavigate();
    const { schoolId } = useParams();
    const { posts } = useApp();
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [postsPerPage] = useState(5);
    const observerTarget = useRef(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('feed');
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [galleryImages, setGalleryImages] = useState([
        { id: 1, preview: null, file: null, name: 'Sports Day' },
        { id: 2, preview: null, file: null, name: 'Science Exhibition' },
        { id: 3, preview: null, file: null, name: 'Cultural Event' },
        { id: 4, preview: null, file: null, name: 'School Event 1' },
        { id: 5, preview: null, file: null, name: 'School Event 2' },
        { id: 6, preview: null, file: null, name: 'School Event 3' }
    ]);
    const [showBannerUpload, setShowBannerUpload] = useState(false);
    const [showGalleryUpload, setShowGalleryUpload] = useState(false);
    const [showProfileUpload, setShowProfileUpload] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [uploadToast, setUploadToast] = useState('');
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const bannerInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const profileInputRef = useRef(null);

    // Find school data
    const school = schoolsData.find(s => s.id === schoolId) || schoolsData[0];

    // Filter posts to show only school's own posts from schoolPostsData using useMemo to prevent infinite loops
    const schoolPosts = React.useMemo(
        () => schoolPostsData.filter(post => post.schoolId === schoolId),
        [schoolId]
    );

    // Initialize with first batch of school posts
    useEffect(() => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            setDisplayedPosts(schoolPosts.slice(0, postsPerPage));
            setPageIndex(1);
            setIsLoading(false);
        }, 300);
    }, [schoolPosts, postsPerPage]);

    // Load more posts when reaching bottom
    const loadMorePosts = useCallback(() => {
        const nextIndex = pageIndex * postsPerPage;
        if (nextIndex < schoolPosts.length) {
            setTimeout(() => {
                setDisplayedPosts(prev => [
                    ...prev,
                    ...schoolPosts.slice(nextIndex, nextIndex + postsPerPage)
                ]);
                setPageIndex(prev => prev + 1);
            }, 500);
        } else {
            setHasMore(false);
        }
    }, [pageIndex, schoolPosts, postsPerPage]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMorePosts();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMorePosts, hasMore, isLoading]);

    // Banner upload handlers
    const handleBannerChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Banner image must be less than 5MB');
                return;
            }
            setBannerImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBannerUpload = () => {
        if (bannerImage && bannerPreview) {
            // In production, upload to backend here
            console.log('Banner uploaded:', bannerImage.name);
            setUploadToast('Banner uploaded successfully! ✓');
            setTimeout(() => setUploadToast(''), 3000);
            setShowBannerUpload(false);
            // Keep the banner preview displayed (state persists)
        }
    };

    const handleBannerCancel = () => {
        setBannerImage(null);
        setBannerPreview(null);
        setShowBannerUpload(false);
        if (bannerInputRef.current) {
            bannerInputRef.current.value = '';
        }
    };

    // Gallery upload handlers
    const handleGalleryChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        let uploadedCount = 0;
        Array.from(files).forEach((file) => {
            if (uploadedCount >= 6) return; // Max 6 images
            
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} is larger than 5MB and was skipped`);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryImages(prev => {
                    const newImages = [...prev];
                    // Find first empty slot
                    const emptySlot = newImages.findIndex(img => !img.preview);
                    if (emptySlot !== -1) {
                        newImages[emptySlot] = {
                            ...newImages[emptySlot],
                            file,
                            preview: reader.result,
                            name: file.name
                        };
                    }
                    return newImages;
                });
            };
            reader.readAsDataURL(file);
            uploadedCount++;
        });
    };

    const handleGalleryUpload = () => {
        const uploadedImages = galleryImages.filter(img => img.preview);
        if (uploadedImages.length > 0) {
            // In production, upload to backend here
            console.log('Gallery images uploaded:', uploadedImages.length);
            setShowGalleryUpload(false);
        }
    };

    const handleRemoveGalleryImage = (id) => {
        setGalleryImages(prev => prev.map(img => 
            img.id === id ? { ...img, preview: null, file: null, name: `Image ${id}` } : img
        ));
    };

    const handleGalleryCancel = () => {
        setShowGalleryUpload(false);
        if (galleryInputRef.current) {
            galleryInputRef.current.value = '';
        }
    };

    // Profile picture upload handlers
    const handleProfileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Profile picture must be less than 5MB');
                return;
            }
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpload = () => {
        if (profileImage && profilePreview) {
            // In production, upload to backend here
            console.log('Profile picture uploaded:', profileImage.name);
            setUploadToast('Profile picture updated successfully! ✓');
            setTimeout(() => setUploadToast(''), 3000);
            setShowProfileUpload(false);
            // Keep the profile preview displayed (state persists)
        }
    };

    const handleProfileCancel = () => {
        setProfileImage(null);
        setProfilePreview(null);
        setShowProfileUpload(false);
        if (profileInputRef.current) {
            profileInputRef.current.value = '';
        }
    };

    // Share handlers
    const schoolUrl = `${window.location.origin}/school/${school.id}`;
    const encodedUrl = encodeURIComponent(schoolUrl);
    const schoolTitle = `Check out ${school.name}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(schoolUrl).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        }).catch(() => {
            alert('Failed to copy link');
        });
    };

    const shareToTwitter = () => {
        const text = `${schoolTitle}... ${schoolUrl}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
    };

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=400');
    };

    const shareToWhatsApp = () => {
        const text = `${schoolTitle}... ${schoolUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareViaEmail = () => {
        const subject = `Check out this school: ${schoolTitle}`;
        const body = `I thought you might find this interesting: ${schoolUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const tabs = [
        { id: 'feed', label: 'Feed', icon: BookOpen },
        { id: 'about', label: 'About', icon: Award },
        { id: 'gallery', label: 'Gallery', icon: Users },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'members', label: 'Members', icon: Users }
    ];

    const samplePosts = [
        {
            id: 1,
            title: 'Annual Sports Day 2024 Announced',
            content: 'Exciting news! Our annual sports day is scheduled for March 15, 2024. Students from all classes are invited to participate in various athletic events.',
            type: 'announcement',
            author: 'Ms. Sarah Johnson',
            timestamp: '2 days ago',
            likes: 245,
            comments: 18,
            image: null
        },
        {
            id: 2,
            title: 'Class 5A Wins Science Fair',
            content: 'Congratulations to Class 5A for winning the inter-school science fair with their innovative project on renewable energy!',
            type: 'achievement',
            author: 'Dr. James Mitchell',
            timestamp: '4 days ago',
            likes: 520,
            comments: 42,
            image: null
        },
        {
            id: 3,
            title: 'New Smart Classroom Facility Inaugurated',
            content: 'We are delighted to announce the inauguration of our state-of-the-art smart classroom facility with interactive boards and advanced learning tools.',
            type: 'activity',
            author: 'Principal Office',
            timestamp: '1 week ago',
            likes: 380,
            comments: 25,
            image: null
        }
    ];

    const sampleMembers = [
        { id: 1, name: 'Dr. James Mitchell', role: 'Principal', avatar: 'J', department: 'Administration', email: 'james.mitchell@greenvalley.edu', experience: '18 years', qualifications: 'Ph.D. in Education' },
        { id: 2, name: 'Ms. Sarah Johnson', role: 'Vice Principal', avatar: 'S', department: 'Administration', email: 'sarah.johnson@greenvalley.edu', experience: '14 years', qualifications: 'M.Ed., B.Sc Mathematics' },
        { id: 3, name: 'Mr. Robert Davis', role: 'Mathematics Teacher', avatar: 'R', department: 'Mathematics', email: 'robert.davis@greenvalley.edu', experience: '12 years', qualifications: 'M.Sc Mathematics, B.Ed' },
        { id: 4, name: 'Ms. Emily Brown', role: 'Science Teacher', avatar: 'E', department: 'Science', email: 'emily.brown@greenvalley.edu', experience: '10 years', qualifications: 'M.Sc Chemistry, B.Ed' },
        { id: 5, name: 'Mr. David Wilson', role: 'English Teacher', avatar: 'D', department: 'English', email: 'david.wilson@greenvalley.edu', experience: '11 years', qualifications: 'M.A English, B.Ed' },
        { id: 6, name: 'Ms. Lisa Garcia', role: 'Science Teacher', avatar: 'L', department: 'Science', email: 'lisa.garcia@greenvalley.edu', experience: '9 years', qualifications: 'M.Sc Physics, B.Ed' },
        { id: 7, name: 'Mr. John Smith', role: 'Sports Director', avatar: 'J', department: 'Sports', email: 'john.smith@greenvalley.edu', experience: '15 years', qualifications: 'M.Ed Physical Education' },
        { id: 8, name: 'Ms. Angela Martinez', role: 'School Counselor', avatar: 'A', department: 'Support Staff', email: 'angela.martinez@greenvalley.edu', experience: '8 years', qualifications: 'M.A Psychology, B.Sc' },
        { id: 9, name: 'Mr. Michael Chen', role: 'Computer Science Teacher', avatar: 'M', department: 'IT', email: 'michael.chen@greenvalley.edu', experience: '7 years', qualifications: 'B.Tech Computer Science' },
        { id: 10, name: 'Ms. Jennifer White', role: 'History Teacher', avatar: 'J', department: 'Social Studies', email: 'jennifer.white@greenvalley.edu', experience: '13 years', qualifications: 'M.A History, B.Ed' },
        { id: 11, name: 'Mr. Thomas Brown', role: 'Art & Design Teacher', avatar: 'T', department: 'Arts', email: 'thomas.brown@greenvalley.edu', experience: '6 years', qualifications: 'M.F.A Fine Arts, B.Ed' },
        { id: 12, name: 'Ms. Sophia Patel', role: 'Music Teacher', avatar: 'S', department: 'Music', email: 'sophia.patel@greenvalley.edu', experience: '9 years', qualifications: 'M.A Music, B.Ed' }
    ];

    const renderFeed = () => {
        if (isLoading && displayedPosts.length === 0) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Loader size="lg" />
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {/* Post Composer */}
                <PostComposer />

                {/* Feed */}
                {displayedPosts.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                <span className="text-2xl">📝</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No posts yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Check back soon for posts from this school!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {displayedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Load More / Loading Indicator */}
                <div ref={observerTarget} className="py-8">
                    {hasMore && displayedPosts.length > 0 && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader size="md" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Loading more posts...
                            </p>
                        </div>
                    )}

                    {!hasMore && displayedPosts.length > 0 && (
                        <div className="text-center py-4">
                            <p className="text-gray-500 dark:text-gray-400">
                                ✓ You've reached the end of the feed
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderAbout = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About {school.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{school.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Founded Year</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{school.foundedYear}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Principal</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{school.principalName}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{school.totalStudents}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Teachers</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{school.totalTeachers}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Motto</h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">"{school.motto}"</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Accreditation</h4>
                    <Badge variant="success">{school.accreditation}</Badge>
                </div>
            </div>
        </div>
    );

    const renderGallery = () => (
        <div className="space-y-6">
            {/* Upload Section */}
            {!showGalleryUpload && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
                    <ImageIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upload School Photos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add photos to showcase your school's facilities and events</p>
                    <Button 
                        onClick={() => setShowGalleryUpload(true)}
                        variant="primary"
                        size="sm"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photos
                    </Button>
                </div>
            )}

            {/* Gallery Upload Modal */}
            {showGalleryUpload && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg w-full sm:max-w-2xl shadow-lg max-h-[95vh] overflow-y-auto my-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Upload Gallery Photos</h3>
                            <button
                                onClick={handleGalleryCancel}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">You can upload up to 6 photos (Max 5MB each)</p>

                            {/* Upload input */}
                            <div>
                                <input
                                    ref={galleryInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleGalleryChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => galleryInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 sm:p-8 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                >
                                    <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
                                    <p className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">Tap to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</p>
                                </button>
                            </div>

                            {/* Gallery preview */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                                {galleryImages.map((img) => (
                                    <div key={img.id} className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 group aspect-square">
                                        {img.preview ? (
                                            <>
                                                <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => handleRemoveGalleryImage(img.id)}
                                                    className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                                    title="Remove image"
                                                >
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </button>
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 sm:p-2 line-clamp-1">
                                                    {img.name}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                                                <ImageIcon className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2 sm:gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button 
                                    onClick={handleGalleryCancel}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={handleGalleryUpload}
                                    variant="primary"
                                    size="sm"
                                    disabled={!galleryImages.some(img => img.preview)}
                                    className="text-xs sm:text-sm"
                                >
                                    <Upload className="w-4 h-4 mr-1 sm:mr-2" />
                                    Upload Photos
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Uploaded Gallery */}
            {!showGalleryUpload && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {galleryImages.map((item) => (
                        <div key={item.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group bg-gray-100 dark:bg-gray-700 aspect-square">
                            {item.preview ? (
                                <>
                                    <img src={item.preview} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                        <span className="text-white font-semibold text-xs sm:text-sm text-center px-2">{item.name}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-400">
                                    <ImageIcon className="w-8 sm:w-10 h-8 sm:h-10" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Profile Picture Upload Modal
    const ProfileUploadModal = () => (
        <>
            <input
                ref={profileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="hidden"
            />
            {showProfileUpload && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 xs:p-4 sm:p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-lg w-full sm:max-w-md shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 xs:p-5 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white">Upload Profile Picture</h3>
                            <button
                                onClick={handleProfileCancel}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5 sm:space-y-6">
                            {/* Preview Section */}
                            {profilePreview ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Preview of your new profile picture:</p>
                                    <div className="w-32 xs:w-40 sm:w-48 h-32 xs:h-40 sm:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
                                        <img 
                                            src={profilePreview} 
                                            alt="Profile Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mt-4 text-center truncate max-w-xs">{profileImage?.name}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Select a profile picture (Max 5MB)</p>
                                    <button
                                        onClick={() => profileInputRef.current?.click()}
                                        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 xs:p-7 sm:p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                    >
                                        <Upload className="w-8 xs:w-10 h-8 xs:h-10 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                                        <p className="font-medium text-sm xs:text-base text-gray-700 dark:text-gray-300">Tap to upload</p>
                                        <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                                    </button>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 xs:gap-3 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={handleProfileCancel}
                                    variant="outline"
                                    size="sm"
                                    fullWidth
                                    className="text-xs xs:text-sm"
                                >
                                    Cancel
                                </Button>
                                {profilePreview && (
                                    <>
                                        <Button
                                            onClick={() => profileInputRef.current?.click()}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs xs:text-sm"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </Button>
                                        <Button 
                                            onClick={handleProfileUpload}
                                            variant="primary"
                                            size="sm"
                                            fullWidth
                                            className="text-xs xs:text-sm"
                                        >
                                            <Upload className="w-4 h-4 mr-1 xs:mr-2" />
                                            Save Picture
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // School Share Modal
    const SchoolShareModal = () => (
        <>
            {showShareModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-3 xs:p-4 sm:p-4 backdrop-blur-sm bg-black/40 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full sm:max-w-sm md:max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300 my-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 xs:p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 sticky top-0">
                            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Share School</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-9 xs:w-10 h-9 xs:h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
                            >
                                <X className="w-5 xs:w-6 h-5 xs:h-6" />
                            </button>
                        </div>

                        {/* Share Options Grid */}
                        <div className="p-3 xs:p-4 sm:p-6 space-y-2 xs:space-y-3 sm:space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Copy Link */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className={`w-10 xs:w-12 h-10 xs:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${copyFeedback ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'}`}>
                                    <Copy className={`w-5 xs:w-6 h-5 xs:h-6 ${copyFeedback ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">
                                        {copyFeedback ? '✓ Link Copied!' : 'Copy Link'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Copy to clipboard</p>
                                </div>
                            </button>

                            {/* Twitter */}
                            <button
                                onClick={shareToTwitter}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                    <Twitter className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">Twitter/X</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Share your thoughts</p>
                                </div>
                            </button>

                            {/* LinkedIn */}
                            <button
                                onClick={shareToLinkedIn}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0">
                                    <Linkedin className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">LinkedIn</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Share professionally</p>
                                </div>
                            </button>

                            {/* Facebook */}
                            <button
                                onClick={shareToFacebook}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                                    <Facebook className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">Facebook</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Share with friends</p>
                                </div>
                            </button>

                            {/* WhatsApp */}
                            <button
                                onClick={shareToWhatsApp}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">WhatsApp</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Share with contacts</p>
                                </div>
                            </button>

                            {/* Email */}
                            <button
                                onClick={shareViaEmail}
                                className="w-full flex items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl xs:rounded-2xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.01] transform active:scale-95"
                            >
                                <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 xs:w-6 h-5 xs:h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white text-xs xs:text-sm sm:text-base leading-tight">Email</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden xs:block">Send via email</p>
                                </div>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-2 sticky bottom-0">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    const renderAnnouncements = () => (
        <div className="space-y-4">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-primary-500 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex-shrink-0">
                            <Bell className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Important Announcement {item}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Details about the important school announcement and updates for students and parents.</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Posted 2 days ago</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderEvents = () => {
        const events = [
            { id: 1, title: 'Upcoming Event 1', date: 'March 11, 2024', description: 'Join us for an exciting event featuring activities and opportunities for all students.', location: 'School Auditorium', time: '10:00 AM - 2:00 PM', attendees: 450 },
            { id: 2, title: 'Upcoming Event 2', date: 'March 12, 2024', description: 'Join us for an exciting event featuring activities and opportunities for all students.', location: 'Sports Ground', time: '3:00 PM - 5:00 PM', attendees: 320 },
            { id: 3, title: 'Upcoming Event 3', date: 'March 13, 2024', description: 'Join us for an exciting event featuring activities and opportunities for all students.', location: 'School Auditorium', time: '9:00 AM - 12:00 PM', attendees: 280 },
            { id: 4, title: 'Upcoming Event 4', date: 'March 14, 2024', description: 'Join us for an exciting event featuring activities and opportunities for all students.', location: 'Cafeteria', time: '2:00 PM - 4:00 PM', attendees: 500 }
        ];

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {events.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                            <div className="flex items-start gap-3 mb-3">
                                <Calendar className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{item.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">{item.date}</p>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                fullWidth
                                onClick={() => { setSelectedEvent(item); setShowEventModal(true); }}
                            >
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Event Details Modal */}
                {showEventModal && selectedEvent && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto my-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-600 p-6 flex items-center justify-between text-white">
                                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                                <button
                                    onClick={() => { setShowEventModal(false); setSelectedEvent(null); }}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Date & Time</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedEvent.date}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.time}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Location</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary-600" />
                                        {selectedEvent.location}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Description</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Expected Attendees</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedEvent.attendees}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Event Type</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">School Event</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    fullWidth
                                    onClick={() => { setShowEventModal(false); setSelectedEvent(null); }}
                                >
                                    Close
                                </Button>
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    fullWidth
                                >
                                    Register Event
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    const renderMembers = () => (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">School Staff & Teachers</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Meet our dedicated educators and support staff</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                    {sampleMembers.map(member => (
                        <div key={member.id} className="flex flex-col p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-700/30 rounded-lg hover:shadow-md transition">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                    {member.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</h4>
                                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.department}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 mb-3 text-xs">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Experience:</span>
                                    <span>{member.experience}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold flex-shrink-0">Qualification:</span>
                                    <span className="line-clamp-2">{member.qualifications}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 truncate">
                                    <span className="font-semibold flex-shrink-0">Email:</span>
                                    <a href={`mailto:${member.email}`} className="text-primary-600 dark:text-primary-400 hover:underline truncate text-xs">
                                        {member.email}
                                    </a>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                                <button className="flex-1 px-2 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-100 dark:bg-primary-900/20 rounded hover:bg-primary-200 dark:hover:bg-primary-900/40 transition">
                                    Message
                                </button>
                                <button className="flex-1 px-2 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                                    Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'feed':
                return renderFeed();
            case 'about':
                return renderAbout();
            case 'gallery':
                return renderGallery();
            case 'announcements':
                return renderAnnouncements();
            case 'events':
                return renderEvents();
            case 'members':
                return renderMembers();
            default:
                return renderFeed();
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Upload Success Toast */}
            {uploadToast && (
                <div className="fixed top-4 xs:top-5 sm:top-6 right-4 xs:right-5 sm:right-6 z-[100] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-4 xs:p-5 flex items-center gap-3 animate-in slide-in-from-top duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <p className="text-sm xs:text-base text-gray-900 dark:text-white font-medium">{uploadToast}</p>
                </div>
            )}

            {/* Back Button */}
            <div className="flex items-center mb-2">
                <button
                    onClick={() => navigate('/school')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    aria-label="Go back to schools"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Schools</span>
            </div>

            {/* School Banner and Header */}
            <div className="relative">
                {/* Banner Upload Modal */}
                {showBannerUpload && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 xs:p-4 sm:p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-lg w-full sm:max-w-md shadow-lg max-h-[95vh] overflow-y-auto my-auto">
                            <div className="sticky top-0 bg-white dark:bg-gray-800 p-3 xs:p-4 sm:p-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 gap-2">
                                <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 dark:text-white min-w-0 flex-1">Upload Banner</h3>
                                <button
                                    onClick={handleBannerCancel}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4">
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400">Upload image (Max 5MB)</p>

                                {bannerPreview ? (
                                    <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img src={bannerPreview} alt="Banner preview" className="w-full h-32 xs:h-40 sm:h-48 object-cover" />
                                        <div className="p-2 xs:p-3 flex items-center justify-between gap-2">
                                            <span className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 truncate">{bannerImage?.name}</span>
                                            <button
                                                onClick={handleBannerCancel}
                                                className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            ref={bannerInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerChange}
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => bannerInputRef.current?.click()}
                                            className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 xs:p-5 sm:p-8 text-center hover:border-primary-500 dark:hover:border-primary-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                        >
                                            <Upload className="w-5 xs:w-6 sm:w-8 h-5 xs:h-6 sm:h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-2" />
                                            <p className="font-medium text-xs xs:text-sm sm:text-base text-gray-700 dark:text-gray-300">Tap to upload</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF</p>
                                        </button>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex gap-2 xs:gap-3 justify-end pt-2 xs:pt-3">
                                    <Button 
                                        onClick={handleBannerCancel}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs xs:text-sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        onClick={handleBannerUpload}
                                        variant="primary"
                                        size="sm"
                                        disabled={!bannerPreview}
                                        className="text-xs xs:text-sm"
                                    >
                                        <Upload className="w-3 xs:w-4 h-3 xs:h-4 mr-1" />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Picture Upload Modal */}
                <ProfileUploadModal />

                {/* School Share Modal */}
                <SchoolShareModal />

                {/* Banner */}
                <div className="relative group w-full h-32 xs:h-40 sm:h-56 md:h-64 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden">
                    {bannerPreview ? (
                        <img src={bannerPreview} alt="School banner" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                    ) : (
                        <h2 className="text-white text-lg xs:text-2xl sm:text-3xl font-bold text-center px-4 line-clamp-3">{school.name}</h2>
                    )}
                    
                    {/* Banner upload button - overlays on hover */}
                    <button
                        onClick={() => setShowBannerUpload(true)}
                        className="absolute inset-0 items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer z-20 hidden sm:flex"
                        title="Edit banner"
                    >
                        <div className="text-center">
                            <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                            <span className="text-white text-sm font-medium">Change Banner</span>
                        </div>
                    </button>

                    {/* Always visible edit button in top-right corner */}
                    <button
                        onClick={() => setShowBannerUpload(true)}
                        className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 z-30 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white p-2 xs:p-2.5 sm:p-3 md:p-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-1 xs:gap-2 sm:gap-2 active:scale-95"
                        title="Upload banner"
                    >
                        <Upload className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="hidden xs:hidden sm:inline text-xs sm:text-sm font-medium">Banner</span>
                    </button>
                </div>

                {/* School Info Card */}
                <div className="w-full mb-6 px-2 xs:px-3 sm:px-4 md:px-0">
                    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-3 xs:gap-4 sm:gap-6 md:gap-8">
                            {/* Logo with Upload Button */}
                            <div className="relative group w-fit">
                                <div className="w-14 xs:w-16 sm:w-20 md:w-24 h-14 xs:h-16 sm:h-20 md:h-24 rounded-xl border-2 border-primary-500 shadow-md bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl flex-shrink-0">
                                    {profilePreview ? (
                                        <img 
                                            src={profilePreview} 
                                            alt="School Logo" 
                                            className="w-full h-full rounded-lg object-cover"
                                        />
                                    ) : (
                                        school.name.substring(0, 2)
                                    )}
                                </div>
                                {/* Upload Overlay */}
                                <button
                                    onClick={() => setShowProfileUpload(true)}
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 rounded-xl items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:flex z-20"
                                    title="Upload profile picture"
                                >
                                    <Upload className="w-6 h-6 text-white" />
                                </button>
                                {/* Mobile Upload Button */}
                                <button
                                    onClick={() => setShowProfileUpload(true)}
                                    className="absolute -bottom-2 -right-2 xs:-bottom-1 xs:-right-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white p-1.5 xs:p-2 rounded-full shadow-lg transition-all active:scale-95 sm:hidden"
                                    title="Upload profile picture"
                                >
                                    <Upload className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                                </button>
                            </div>


                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{school.name}</h1>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{school.motto}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {school.verified && (
                                        <Badge variant="success" className="text-xs">✓ Verified School</Badge>
                                    )}
                                    {school.type && (
                                        <Badge variant="primary" className="text-xs">{school.type}</Badge>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 xs:gap-3 w-full sm:w-auto flex-shrink-0">
                                <Button
                                    variant={isFollowing ? 'outline' : 'primary'}
                                    size="sm"
                                    onClick={() => {
                                        setIsFollowing(!isFollowing);
                                        if (!isFollowing) {
                                            setFollowerCount(prev => prev + 1);
                                        } else {
                                            setFollowerCount(prev => Math.max(0, prev - 1));
                                        }
                                    }}
                                    fullWidth={true}
                                    className="sm:w-auto text-xs xs:text-sm px-3 xs:px-4 py-2 xs:py-2.5"
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => setShowShareModal(true)}
                                    className="px-2.5 xs:px-3 sm:px-4 flex-shrink-0"
                                    title="Share school"
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mt-4 xs:mt-5 sm:mt-6 md:mt-8 pt-4 xs:pt-5 sm:pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center sm:text-left">
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Followers</p>
                                <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{(school.followers + followerCount).toLocaleString()}</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Students</p>
                                <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{school.totalStudents}</p>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Teachers</p>
                                <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{school.totalTeachers}</p>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Members</p>
                                <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{sampleMembers.length}</p>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Est.</p>
                                <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{school.foundedYear}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6 px-2 xs:px-3 sm:px-4 md:px-0">
                <a href={`tel:${school.contact.phone}`} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 xs:gap-3 active:scale-95">
                    <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg xs:text-xl">📞</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white truncate">{school.contact.phone}</p>
                    </div>
                </a>
                <a href={`mailto:${school.contact.email}`} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 xs:gap-3 active:scale-95">
                    <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 xs:w-6 h-5 xs:h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                        <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white truncate">{school.contact.email}</p>
                    </div>
                </a>
                <a href={school.contact.website} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 xs:gap-3 xs:col-span-2 sm:col-span-1 active:scale-95">
                    <div className="w-10 xs:w-12 h-10 xs:h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 xs:w-6 h-5 xs:h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Website</p>
                        <p className="text-xs xs:text-sm font-semibold text-gray-900 dark:text-white truncate">Visit Website</p>
                    </div>
                </a>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 sm:gap-0 overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                            activeTab === tab.id
                                ? 'text-primary-600 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-300'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {renderTabContent()}
        </div>
    );
};

// Export both components
export { School };
export default SchoolProfile;
