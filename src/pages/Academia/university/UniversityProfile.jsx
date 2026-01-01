import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, Mail, Globe, Users, BookOpen, Calendar, Award, ArrowLeft, Share2, Bell, Building2, Search, Upload, X, Image as ImageIcon, Copy, Facebook, Linkedin, Twitter, MessageCircle, Zap, GraduationCap } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import PostComposer from '../../../components/posts/PostComposer';
import PostCard from '../../../components/posts/PostCard';
import { Loader } from '../../../components/common/Loader';
import universitiesData from '../../../data/universities.json';
import universityPostsData from '../../../data/universityPosts.json';
import universityDepartmentsData from '../../../data/universityDepartments.json';

/**
 * University Profile Page
 * Displays individual university profile with announcements, gallery, faculty directory
 */
const UniversityProfile = () => {
    const navigate = useNavigate();
    const { universityId } = useParams();
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
        { id: 1, preview: null, file: null, name: 'Campus Aerial View' },
        { id: 2, preview: null, file: null, name: 'Convocation' },
        { id: 3, preview: null, file: null, name: 'Research Center' },
        { id: 4, preview: null, file: null, name: 'Library' },
        { id: 5, preview: null, file: null, name: 'Student Activity' },
        { id: 6, preview: null, file: null, name: 'International Event' }
    ]);
    const [showBannerUpload, setShowBannerUpload] = useState(false);
    const [showGalleryUpload, setShowGalleryUpload] = useState(false);
    const [showProfileUpload, setShowProfileUpload] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState(false);
    const [uploadToast, setUploadToast] = useState('');
    const bannerInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const profileInputRef = useRef(null);

    // Find university data
    const university = universitiesData.find(u => u.id === universityId) || universitiesData[0];

    // Filter posts for this university
    const universityPosts = React.useMemo(
        () => universityPostsData.filter(post => post.universityId === universityId),
        [universityId]
    );

    // Initialize with first batch of posts
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setDisplayedPosts(universityPosts.slice(0, postsPerPage));
            setPageIndex(1);
            setIsLoading(false);
        }, 300);
    }, [universityPosts, postsPerPage]);

    // Load more posts
    const loadMorePosts = useCallback(() => {
        const nextIndex = pageIndex * postsPerPage;
        if (nextIndex < universityPosts.length) {
            setTimeout(() => {
                setDisplayedPosts(prev => [
                    ...prev,
                    ...universityPosts.slice(nextIndex, nextIndex + postsPerPage)
                ]);
                setPageIndex(prev => prev + 1);
            }, 500);
        } else {
            setHasMore(false);
        }
    }, [pageIndex, universityPosts, postsPerPage]);

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
            setUploadToast('Banner uploaded successfully! ✓');
            setTimeout(() => setUploadToast(''), 3000);
            setShowBannerUpload(false);
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
            setUploadToast('Profile picture updated successfully! ✓');
            setTimeout(() => setUploadToast(''), 3000);
            setShowProfileUpload(false);
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

    // Gallery upload handlers
    const handleGalleryChange = (e) => {
        const files = e.target.files;
        if (!files) return;

        let uploadedCount = 0;
        Array.from(files).forEach((file) => {
            if (uploadedCount >= 6) return;
            
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} is larger than 5MB and was skipped`);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setGalleryImages(prev => {
                    const newImages = [...prev];
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

    // Faculty data for university
    const faculty = [
        { id: 1, name: 'Prof. Dr. Michael Harrison', role: 'Vice-Chancellor', avatar: 'M', department: 'Administration', email: 'michael.harrison@university.edu', experience: '20 years', qualifications: 'Ph.D Physics, D.Sc' },
        { id: 2, name: 'Dr. Elizabeth Taylor', role: 'Registrar', avatar: 'E', department: 'Administration', email: 'elizabeth.taylor@university.edu', experience: '17 years', qualifications: 'Ph.D Management' },
        { id: 3, name: 'Prof. Dr. Alexander Kumar', role: 'Dean - Engineering', avatar: 'A', department: 'Engineering', email: 'alexander.kumar@university.edu', experience: '19 years', qualifications: 'Ph.D Mechanical Engineering' },
        { id: 4, name: 'Dr. Victoria Chen', role: 'Dean - Science', avatar: 'V', department: 'Science', email: 'victoria.chen@university.edu', experience: '16 years', qualifications: 'Ph.D Chemistry' },
        { id: 5, name: 'Prof. Dr. William Johnson', role: 'Dean - Management', avatar: 'W', department: 'Management', email: 'william.johnson@university.edu', experience: '15 years', qualifications: 'Ph.D Business Administration' },
        { id: 6, name: 'Dr. Sophia Martinez', role: 'Librarian', avatar: 'S', department: 'Library', email: 'sophia.martinez@university.edu', experience: '12 years', qualifications: 'Ph.D Information Science' },
        { id: 7, name: 'Prof. Dr. James Wilson', role: 'Research Director', avatar: 'J', department: 'Research', email: 'james.wilson@university.edu', experience: '18 years', qualifications: 'Ph.D Physics' },
        { id: 8, name: 'Dr. Angela Garcia', role: 'International Relations', avatar: 'A', department: 'Relations', email: 'angela.garcia@university.edu', experience: '11 years', qualifications: 'Ph.D Diplomacy' }
    ];

    const events = [
        { id: 1, title: 'Annual Convocation 2025', date: '2025-02-28', type: 'Academic', location: 'Grand Auditorium' },
        { id: 2, title: 'International Research Symposium', date: '2025-03-15', type: 'Research', location: 'Convention Center' },
        { id: 3, title: 'Doctoral Thesis Defense Week', date: '2025-04-01', type: 'Academic', location: 'Multiple Venues' },
        { id: 4, title: 'Global Summit on Innovation', date: '2025-04-20', type: 'Conference', location: 'Main Campus' },
        { id: 5, title: 'Post-Doctoral Fellowship Program', date: '2025-05-10', type: 'Research', location: 'Research Park' }
    ];

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
                                        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 xs:p-7 sm:p-8 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                    >
                                        <Upload className="w-8 xs:w-10 h-8 xs:h-10 text-gray-400 group-hover:text-indigo-500 mx-auto mb-2" />
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

    // Banner Upload Modal
    const BannerUploadModal = () => (
        <>
            <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
            />
            {showBannerUpload && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 xs:p-4 sm:p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-lg w-full sm:max-w-md shadow-2xl max-h-[95vh] overflow-y-auto my-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 xs:p-5 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white">Upload Banner</h3>
                            <button
                                onClick={handleBannerCancel}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5 sm:space-y-6">
                            {/* Preview Section */}
                            {bannerPreview ? (
                                <div className="flex flex-col items-center">
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Preview of your new banner:</p>
                                    <div className="w-full h-32 xs:h-40 sm:h-48 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
                                        <img
                                            src={bannerPreview}
                                            alt="Banner Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mt-4 text-center truncate max-w-xs">{bannerImage?.name}</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Select a banner image (Max 5MB)</p>
                                    <button
                                        onClick={() => bannerInputRef.current?.click()}
                                        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 xs:p-7 sm:p-8 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                    >
                                        <Upload className="w-8 xs:w-10 h-8 xs:h-10 text-gray-400 group-hover:text-indigo-500 mx-auto mb-2" />
                                        <p className="font-medium text-sm xs:text-base text-gray-700 dark:text-gray-300">Tap to upload</p>
                                        <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                                    </button>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 xs:gap-3 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    onClick={handleBannerCancel}
                                    variant="outline"
                                    size="sm"
                                    fullWidth
                                    className="text-xs xs:text-sm"
                                >
                                    Cancel
                                </Button>
                                {bannerPreview && (
                                    <>
                                        <Button
                                            onClick={() => bannerInputRef.current?.click()}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs xs:text-sm"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={handleBannerUpload}
                                            variant="primary"
                                            size="sm"
                                            fullWidth
                                            className="text-xs xs:text-sm"
                                        >
                                            <Upload className="w-4 h-4 mr-1 xs:mr-2" />
                                            Save Banner
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

    const renderFeed = () => {
        if (isLoading && displayedPosts.length === 0) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Loader size="lg" />
                </div>
            );
        }

        return (
            <div className="space-y-4 sm:space-y-6">
                <PostComposer />

                {displayedPosts.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                                <span className="text-2xl">📰</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No announcements yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
                            Check back soon for announcements from this university!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {displayedPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                <div ref={observerTarget} className="py-8">
                    {hasMore && displayedPosts.length > 0 && (
                        <div className="flex flex-col items-center gap-4">
                            <Loader size="md" />
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Loading more announcements...
                            </p>
                        </div>
                    )}

                    {!hasMore && displayedPosts.length > 0 && (
                        <div className="text-center py-4">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
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
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About {university.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{university.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Founded Year</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{university.foundedYear}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Vice-Chancellor</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{university.principalName}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{university.totalStudents}</p>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Faculty</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{university.totalTeachers}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">University Motto</h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">"{university.motto}"</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Accreditation</h4>
                    <Badge variant="success">{university.accreditation}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-5 h-5 flex-shrink-0 text-indigo-600" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{university.location}</p>
                        </div>
                    </div>
                    {university.website && (
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                            <Globe className="w-5 h-5 flex-shrink-0 text-indigo-600" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Website</p>
                                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{university.website}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderGallery = () => (
        <div className="space-y-6">
            {!showGalleryUpload && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 text-center">
                    <ImageIcon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upload University Photos</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add photos to showcase your university's campus, facilities, and achievements</p>
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
                                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 sm:p-8 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer group active:bg-gray-50 dark:active:bg-gray-700"
                                >
                                    <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 group-hover:text-indigo-500 mx-auto mb-2" />
                                    <p className="font-medium text-sm sm:text-base text-gray-700 dark:text-gray-300">Tap to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</p>
                                </button>
                            </div>

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

                            <div className="flex gap-2 sm:gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Button 
                                    onClick={handleGalleryCancel}
                                    variant="outline"
                                    size="sm"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={handleGalleryUpload}
                                    variant="primary"
                                    size="sm"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Photos
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Uploaded Gallery Display */}
            {!showGalleryUpload && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.filter(img => img.preview).map((img) => (
                        <div key={img.id} className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-square hover:shadow-lg transition-all">
                            <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderFaculty = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {faculty.map((member) => (
                <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                            {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-1 mb-1">{member.name}</h4>
                            <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">{member.role}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{member.department}</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                        <p><span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span> {member.email}</p>
                        <p><span className="font-semibold text-gray-700 dark:text-gray-300">Experience:</span> {member.experience}</p>
                        <p><span className="font-semibold text-gray-700 dark:text-gray-300">Qualifications:</span> {member.qualifications}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderEvents = () => (
        <div className="space-y-4 sm:space-y-6">
            {events.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">{event.title}</h4>
                                <Badge variant={
                                    event.type === 'Academic' ? 'primary' :
                                    event.type === 'Research' ? 'success' :
                                    event.type === 'Conference' ? 'warning' : 'secondary'
                                } className="self-start">
                                    {event.type}
                                </Badge>
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 flex-shrink-0 text-indigo-600" />
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0 text-indigo-600" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="self-start sm:self-center">
                            Register
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-2 px-2 sm:px-0">
                <button
                    onClick={() => navigate('/academia')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors -ml-2"
                    aria-label="Go back to Academia"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Back to Academia</span>
            </div>

            {/* University Banner and Profile Photo */}
            <div className="relative">
                {/* Banner Section */}
                <div className="relative group bg-gradient-to-r from-indigo-400 to-indigo-600 h-32 xs:h-40 sm:h-56 md:h-64 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                    {bannerPreview ? (
                        <img 
                            src={bannerPreview} 
                            alt="University Banner" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600" />
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
                        className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 z-30 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white p-2 xs:p-2.5 sm:p-3 md:p-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-1 xs:gap-2 sm:gap-2 active:scale-95"
                        title="Upload banner"
                    >
                        <Upload className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="hidden xs:hidden sm:inline text-xs sm:text-sm font-medium">Banner</span>
                    </button>
                </div>
            </div>

            {/* University Info Card */}
            <div className="w-full mb-6 px-2 xs:px-3 sm:px-4 md:px-0">
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3 xs:gap-4 sm:gap-6 md:gap-8">
                        {/* Logo with Upload Button */}
                        <div className="relative group w-fit">
                            <div className="w-14 xs:w-16 sm:w-20 md:w-24 h-14 xs:h-16 sm:h-20 md:h-24 rounded-xl border-2 border-indigo-500 shadow-md bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl flex-shrink-0">
                                {profilePreview ? (
                                    <img 
                                        src={profilePreview} 
                                        alt="University Logo" 
                                        className="w-full h-full rounded-lg object-cover"
                                    />
                                ) : (
                                    university.name.substring(0, 2)
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
                                className="absolute -bottom-2 -right-2 xs:-bottom-1 xs:-right-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white p-1.5 xs:p-2 rounded-full shadow-lg transition-all active:scale-95 sm:hidden"
                                title="Upload profile picture"
                            >
                                <Upload className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{university.name}</h1>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{university.motto}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                {university.accreditation && (
                                    <Badge variant="success" className="text-xs">✓ {university.accreditation}</Badge>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 xs:gap-3 w-full sm:w-auto flex-shrink-0">
                            <Button
                                variant={isFollowing ? 'outline' : 'primary'}
                                size="sm"
                                onClick={() => setIsFollowing(!isFollowing)}
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
                                title="Share university"
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mt-4 xs:mt-5 sm:mt-6 md:mt-8 pt-4 xs:pt-5 sm:pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-center sm:text-left">
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Students</p>
                            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{university.totalStudents.toLocaleString()}</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Faculty</p>
                            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{university.totalTeachers.toLocaleString()}</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Founded</p>
                            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{university.foundedYear}</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                            <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{university.location.split(',')[1]?.trim() || university.location}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg sm:rounded-none p-2 sm:p-0 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'feed'
                            ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 border-transparent'
                    }`}
                >
                    <MessageCircle className="w-4 h-4" />
                    Feed
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'about'
                            ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 border-transparent'
                    }`}
                >
                    <Award className="w-4 h-4" />
                    About
                </button>
                <button
                    onClick={() => setActiveTab('faculty')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'faculty'
                            ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 border-transparent'
                    }`}
                >
                    <Users className="w-4 h-4" />
                    Faculty
                </button>
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'gallery'
                            ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 border-transparent'
                    }`}
                >
                    <ImageIcon className="w-4 h-4" />
                    Gallery
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                        activeTab === 'events'
                            ? 'text-indigo-600 border-indigo-600 dark:text-indigo-400'
                            : 'text-gray-600 dark:text-gray-400 border-transparent'
                    }`}
                >
                    <Calendar className="w-4 h-4" />
                    Events
                </button>
            </div>

            {/* Content */}
            {activeTab === 'feed' && renderFeed()}
            {activeTab === 'about' && renderAbout()}
            {activeTab === 'faculty' && renderFaculty()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'events' && renderEvents()}

            {/* Modals */}
            <ProfileUploadModal />
            <BannerUploadModal />

            {/* Toast Notification */}
            {uploadToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
                    {uploadToast}
                </div>
            )}
        </div>
    );
};

export default UniversityProfile;
