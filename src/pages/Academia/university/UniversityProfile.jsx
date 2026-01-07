import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, Mail, Globe, Users, BookOpen, Calendar, Award, ArrowLeft, Share2, Bell, Building2, Search, Upload, X, Image as ImageIcon, Copy, Facebook, Linkedin, Twitter, MessageCircle, Zap, GraduationCap, Edit, Plus, Trash2, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';
import PostComposer from '../../../components/posts/PostComposer';
import PostCard from '../../../components/posts/PostCard';
import Pagination from '../../../components/common/Pagination';
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
    
    // Find university data FIRST (needed for initialization of other states)
    const universityFromData = universitiesData.find(u => u.id === universityId) || universitiesData[0];
    
    // Create mutable state for university data
    const [university, setUniversityData] = useState({
        ...universityFromData,
        description: universityFromData.description || 'Premier institution dedicated to excellence in education and research.',
        motto: universityFromData.motto || 'Knowledge for a Better Tomorrow',
        accreditation: universityFromData.accreditation || 'ISO Certified',
        location: universityFromData.location || 'Capital City',
        website: universityFromData.website || 'www.university.edu',
        foundedYear: universityFromData.foundedYear || '1985',
        viceCancellor: universityFromData.viceCancellor || 'Prof. David Chen',
        totalStudents: universityFromData.totalStudents || '8500',
        totalFaculty: universityFromData.totalFaculty || '450'
    });

    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const observerTarget = useRef(null);
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

    // Edit mode states
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [editAboutData, setEditAboutData] = useState({
        description: university.description,
        motto: university.motto,
        accreditation: university.accreditation,
        location: university.location,
        website: university.website,
        foundedYear: university.foundedYear || '1985',
        viceCancellor: university.viceCancellor || 'Prof. David Chen',
        totalStudents: university.totalStudents || '8500',
        totalFaculty: university.totalFaculty || '450'
    });

    const [faculty, setFaculty] = useState([
        { id: 1, name: 'Prof. Dr. Michael Harrison', role: 'Vice-Chancellor', avatar: 'M', department: 'Administration', email: 'michael.harrison@university.edu', experience: '20 years', qualifications: 'Ph.D Physics, D.Sc' },
        { id: 2, name: 'Dr. Elizabeth Taylor', role: 'Registrar', avatar: 'E', department: 'Administration', email: 'elizabeth.taylor@university.edu', experience: '17 years', qualifications: 'Ph.D Management' },
        { id: 3, name: 'Prof. Dr. Alexander Kumar', role: 'Dean - Engineering', avatar: 'A', department: 'Engineering', email: 'alexander.kumar@university.edu', experience: '19 years', qualifications: 'Ph.D Mechanical Engineering' },
        { id: 4, name: 'Dr. Victoria Chen', role: 'Dean - Science', avatar: 'V', department: 'Science', email: 'victoria.chen@university.edu', experience: '16 years', qualifications: 'Ph.D Chemistry' },
        { id: 5, name: 'Prof. Dr. William Johnson', role: 'Dean - Management', avatar: 'W', department: 'Management', email: 'william.johnson@university.edu', experience: '15 years', qualifications: 'Ph.D Business Administration' },
        { id: 6, name: 'Dr. Sophia Martinez', role: 'Librarian', avatar: 'S', department: 'Library', email: 'sophia.martinez@university.edu', experience: '12 years', qualifications: 'Ph.D Information Science' },
        { id: 7, name: 'Prof. Dr. James Wilson', role: 'Research Director', avatar: 'J', department: 'Research', email: 'james.wilson@university.edu', experience: '18 years', qualifications: 'Ph.D Physics' },
        { id: 8, name: 'Dr. Angela Garcia', role: 'International Relations', avatar: 'A', department: 'Relations', email: 'angela.garcia@university.edu', experience: '11 years', qualifications: 'Ph.D Diplomacy' }
    ]);

    const [events, setEvents] = useState([
        { id: 1, title: 'Annual Convocation 2025', date: '2025-02-28', type: 'Academic', location: 'Grand Auditorium' },
        { id: 2, title: 'International Research Symposium', date: '2025-03-15', type: 'Research', location: 'Convention Center' },
        { id: 3, title: 'Doctoral Thesis Defense Week', date: '2025-04-01', type: 'Academic', location: 'Multiple Venues' },
        { id: 4, title: 'Global Summit on Innovation', date: '2025-04-20', type: 'Conference', location: 'Main Campus' },
        { id: 5, title: 'Post-Doctoral Fellowship Program', date: '2025-05-10', type: 'Research', location: 'Research Park' }
    ]);

    const [showEditFacultyModal, setShowEditFacultyModal] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);
    const [editFacultyForm, setEditFacultyForm] = useState({});

    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [editEventForm, setEditEventForm] = useState({});

    const [showGalleryRenameModal, setShowGalleryRenameModal] = useState(false);
    const [renamingImageId, setRenamingImageId] = useState(null);
    const [newImageName, setNewImageName] = useState('');

    const [editToast, setEditToast] = useState('');
    const [registeredEvents, setRegisteredEvents] = useState([]);

    // Filter posts for this university
    const universityPosts = React.useMemo(
        () => universityPostsData.filter(post => post.universityId === universityId),
        [universityId]
    );

    // Initialize with first batch of posts
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            setDisplayedPosts(universityPosts.slice(startIndex, endIndex));
            setIsLoading(false);
        }, 300);
    }, [currentPage, universityPosts, postsPerPage]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate total pages
    const totalPages = Math.ceil(universityPosts.length / postsPerPage);

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

    // Edit handlers for About tab
    const handleEditAbout = () => {
        setEditAboutData({
            description: university.description,
            motto: university.motto,
            accreditation: university.accreditation,
            location: university.location,
            website: university.website,
            foundedYear: university.foundedYear,
            viceCancellor: university.viceCancellor,
            totalStudents: university.totalStudents,
            totalFaculty: university.totalFaculty
        });
        setIsEditingAbout(true);
    };

    const handleSaveAbout = () => {
        setUniversityData({
            ...university,
            description: editAboutData.description,
            motto: editAboutData.motto,
            accreditation: editAboutData.accreditation,
            location: editAboutData.location,
            website: editAboutData.website,
            foundedYear: editAboutData.foundedYear,
            viceCancellor: editAboutData.viceCancellor,
            totalStudents: editAboutData.totalStudents,
            totalFaculty: editAboutData.totalFaculty
        });
        setEditToast('University information updated successfully! ✓');
        setTimeout(() => setEditToast(''), 3000);
        setIsEditingAbout(false);
    };

    // Faculty edit handlers
    const handleEditFaculty = (member) => {
        setEditingFaculty(member.id);
        setEditFacultyForm({ ...member });
        setShowEditFacultyModal(true);
    };

    const handleSaveFaculty = () => {
        if (editingFaculty) {
            // Update existing faculty member
            setFaculty(faculty.map(f => f.id === editingFaculty ? editFacultyForm : f));
            setEditToast('Faculty member updated successfully! ✓');
        } else {
            // Add new faculty member (if editingFaculty is null, it means we're creating)
            setFaculty([...faculty, editFacultyForm]);
            setEditToast('Faculty member added successfully! ✓');
        }
        setTimeout(() => setEditToast(''), 3000);
        setShowEditFacultyModal(false);
        setEditingFaculty(null);
        setEditFacultyForm({});
    };

    const handleDeleteFaculty = (id) => {
        if (window.confirm('Are you sure you want to remove this faculty member?')) {
            setFaculty(faculty.filter(f => f.id !== id));
            setEditToast('Faculty member removed! ✓');
            setTimeout(() => setEditToast(''), 3000);
        }
    };

    const handleAddFaculty = () => {
        setEditingFaculty(null);
        setEditFacultyForm({
            id: Math.max(...faculty.map(f => f.id), 0) + 1,
            name: '',
            role: '',
            avatar: '',
            department: '',
            email: '',
            experience: '',
            qualifications: ''
        });
        setShowEditFacultyModal(true);
    };

    // Event edit handlers
    const handleEditEvent = (event) => {
        setEditingEvent(event.id);
        setEditEventForm({ ...event });
        setShowEditEventModal(true);
    };

    const handleSaveEvent = () => {
        if (editingEvent) {
            // Update existing event
            setEvents(events.map(e => e.id === editingEvent ? editEventForm : e));
            setEditToast('Event updated successfully! ✓');
        } else {
            // Add new event
            setEvents([...events, editEventForm]);
            setEditToast('Event created successfully! ✓');
        }
        setTimeout(() => setEditToast(''), 3000);
        setShowEditEventModal(false);
        setEditingEvent(null);
        setEditEventForm({});
    };

    const handleDeleteEvent = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(e => e.id !== id));
            setEditToast('Event deleted! ✓');
            setTimeout(() => setEditToast(''), 3000);
        }
    };

    const handleRegisterEvent = (eventId) => {
        if (registeredEvents.includes(eventId)) {
            // Unregister
            setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
            setEditToast('Unregistered from event ✓');
        } else {
            // Register
            setRegisteredEvents([...registeredEvents, eventId]);
            setEditToast('Registered for event! ✓');
        }
        setTimeout(() => setEditToast(''), 3000);
    };

    const handleAddEvent = () => {
        setEditingEvent(null);
        setEditEventForm({
            id: Math.max(...events.map(e => e.id), 0) + 1,
            title: '',
            date: '',
            type: 'Academic',
            location: ''
        });
        setShowEditEventModal(true);
    };

    // Gallery rename handler
    const handleRenameImage = (id, currentName) => {
        setRenamingImageId(id);
        setNewImageName(currentName);
        setShowGalleryRenameModal(true);
    };

    const handleSaveImageName = () => {
        setGalleryImages(prev => prev.map(img =>
            img.id === renamingImageId ? { ...img, name: newImageName } : img
        ));
        setEditToast('Image renamed successfully! ✓');
        setTimeout(() => setEditToast(''), 3000);
        setShowGalleryRenameModal(false);
    };

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
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-2xl max-h-[95vh] overflow-y-auto">
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

    // Share Modal
    const ShareModal = () => {
        const currentUrl = window.location.href;
        
        const handleCopyLink = () => {
            navigator.clipboard.writeText(currentUrl);
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
        };

        const socialShareLinks = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=Check out this university profile`
        };

        return (
            <>
                {showShareModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-2xl max-h-[95vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 xs:p-5 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-base xs:text-lg sm:text-lg font-bold text-gray-900 dark:text-white">Share University Profile</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5 sm:space-y-6">
                                {/* Share to Social Networks */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Share on Social Networks</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <a
                                            href={socialShareLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                                            title="Share on Facebook"
                                        >
                                            <Facebook className="w-6 h-6 text-blue-600" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Facebook</span>
                                        </a>
                                        <a
                                            href={socialShareLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                                            title="Share on LinkedIn"
                                        >
                                            <Linkedin className="w-6 h-6 text-blue-700" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">LinkedIn</span>
                                        </a>
                                        <a
                                            href={socialShareLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-700 transition-colors"
                                            title="Share on Twitter"
                                        >
                                            <Twitter className="w-6 h-6 text-sky-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Twitter</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Copy Link Section */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 xs:pt-5 sm:pt-6">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Copy Link</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={currentUrl}
                                            readOnly
                                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                                        />
                                        <button
                                            onClick={handleCopyLink}
                                            className="p-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors flex-shrink-0"
                                            title="Copy link to clipboard"
                                        >
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                    {copyFeedback && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ Link copied to clipboard!</p>
                                    )}
                                </div>

                                {/* Close Button */}
                                <div className="flex gap-2 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        onClick={() => setShowShareModal(false)}
                                        variant="primary"
                                        size="sm"
                                        fullWidth
                                        className="text-xs xs:text-sm"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

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
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-2xl max-h-[95vh] overflow-y-auto">
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
                    {displayedPosts.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={universityPosts.length}
                            itemsPerPage={postsPerPage}
                            onPageChange={handlePageChange}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        );
    };

    const renderAbout = () => (
        <div className="space-y-4">
            {/* Edit About Button */}
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => isEditingAbout ? handleSaveAbout() : handleEditAbout()}
                    variant={isEditingAbout ? 'primary' : 'outline'}
                    size="sm"
                    className="flex items-center gap-2"
                >
                    {isEditingAbout ? (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    ) : (
                        <>
                            <Edit className="w-4 h-4" />
                            Edit Information
                        </>
                    )}
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About {university.name}</h3>
                        {isEditingAbout ? (
                            <textarea
                                value={editAboutData.description}
                                onChange={(e) => setEditAboutData({...editAboutData, description: e.target.value})}
                                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                                rows="4"
                            />
                        ) : (
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{editAboutData.description}</p>
                        )}
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {isEditingAbout ? (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Founded Year</label>
                                    <input 
                                        type="text" 
                                        value={editAboutData.foundedYear} 
                                        onChange={(e) => setEditAboutData({...editAboutData, foundedYear: e.target.value})}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Vice-Chancellor</label>
                                    <input 
                                        type="text" 
                                        value={editAboutData.viceCancellor} 
                                        onChange={(e) => setEditAboutData({...editAboutData, viceCancellor: e.target.value})}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Students</label>
                                    <input 
                                        type="text" 
                                        value={editAboutData.totalStudents} 
                                        onChange={(e) => setEditAboutData({...editAboutData, totalStudents: e.target.value})}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Faculty</label>
                                    <input 
                                        type="text" 
                                        value={editAboutData.totalFaculty} 
                                        onChange={(e) => setEditAboutData({...editAboutData, totalFaculty: e.target.value})}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white" 
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Founded Year</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{editAboutData.foundedYear}</p>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Vice-Chancellor</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{editAboutData.viceCancellor}</p>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{editAboutData.totalStudents}</p>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Faculty</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{editAboutData.totalFaculty}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Motto */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">University Motto</h4>
                        {isEditingAbout ? (
                            <input
                                type="text"
                                value={editAboutData.motto}
                                onChange={(e) => setEditAboutData({...editAboutData, motto: e.target.value})}
                                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                            />
                        ) : (
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">"{editAboutData.motto}"</p>
                        )}
                    </div>

                    {/* Accreditation */}
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">Accreditation</h4>
                        {isEditingAbout ? (
                            <input
                                type="text"
                                value={editAboutData.accreditation}
                                onChange={(e) => setEditAboutData({...editAboutData, accreditation: e.target.value})}
                                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                            />
                        ) : (
                            <Badge variant="success">{editAboutData.accreditation}</Badge>
                        )}
                    </div>

                    {/* Location & Website */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-indigo-600" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Location</span>
                            </label>
                            {isEditingAbout ? (
                                <input
                                    type="text"
                                    value={editAboutData.location}
                                    onChange={(e) => setEditAboutData({...editAboutData, location: e.target.value})}
                                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{editAboutData.location}</p>
                            )}
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                                <Globe className="w-5 h-5 flex-shrink-0 text-indigo-600" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">Website</span>
                            </label>
                            {isEditingAbout ? (
                                <input
                                    type="text"
                                    value={editAboutData.website}
                                    onChange={(e) => setEditAboutData({...editAboutData, website: e.target.value})}
                                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                />
                            ) : (
                                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{editAboutData.website}</p>
                            )}
                        </div>
                    </div>
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
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl shadow-lg max-h-[95vh] overflow-y-auto">
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
                        <div key={img.id} className="rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-square hover:shadow-lg transition-all group relative">
                            <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        setRenamingImageId(img.id);
                                        setNewImageName(img.name);
                                        setShowGalleryRenameModal(true);
                                    }}
                                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    title="Rename image"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleRemoveGalleryImage(img.id)}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    title="Remove image"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 line-clamp-2">
                                {img.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderFaculty = () => (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Button
                    onClick={handleAddFaculty}
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Faculty Member
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {faculty.map((member) => (
                    <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all relative">
                        <div className="flex gap-2 absolute top-3 right-3">
                            <button
                                onClick={() => handleEditFaculty(member)}
                                className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDeleteFaculty(member.id)}
                                className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0 overflow-hidden border-2 border-indigo-200 dark:border-indigo-700">
                                {member.avatar ? (
                                    typeof member.avatar === 'string' && member.avatar.startsWith('data:') ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    ) : member.avatar.startsWith('http') ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        member.avatar.charAt(0).toUpperCase()
                                    )
                                ) : (
                                    member.name ? member.name.charAt(0).toUpperCase() : '+'
                                )}
                            </div>
                            <div className="flex-1 min-w-0 pr-8">
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
        </div>
    );

    const renderEvents = () => (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Button
                    onClick={handleAddEvent}
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Event
                </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all relative">
                        <div className="flex gap-2 absolute top-3 right-3 z-10">
                            <button
                                onClick={() => handleEditEvent(event)}
                                className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                title="Edit"
                                type="button"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                title="Delete"
                                type="button"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

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
                            <Button 
                                variant={registeredEvents.includes(event.id) ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => handleRegisterEvent(event.id)}
                                className="self-start sm:self-center"
                            >
                                {registeredEvents.includes(event.id) ? 'Registered' : 'Register'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
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
                    onClick={() => navigate(`/academia/university/${universityId}/gallery`)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 text-gray-600 dark:text-gray-400 border-transparent hover:text-indigo-600 dark:hover:text-indigo-400`}
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
            {activeTab === 'events' && renderEvents()}

            {/* Modals */}
            <ProfileUploadModal />
            <BannerUploadModal />
            <ShareModal />

            {/* Edit Faculty Modal */}
            {showEditFacultyModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 xs:p-4 sm:p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md sm:max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 xs:p-5 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 rounded-t-xl">
                            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                {editingFaculty ? 'Edit Faculty Member' : 'Add Faculty Member'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowEditFacultyModal(false);
                                    setEditingFaculty(null);
                                    setEditFacultyForm({ name: '', role: '', avatar: '', department: '', email: '', experience: '', qualifications: '' });
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5 sm:space-y-6">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                                <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 xs:mb-4 overflow-hidden border-4 border-indigo-200 dark:border-indigo-700">
                                    {editFacultyForm.avatar ? (
                                        typeof editFacultyForm.avatar === 'string' && editFacultyForm.avatar.startsWith('data:') ? (
                                            <img src={editFacultyForm.avatar} alt="Faculty" className="w-full h-full object-cover" />
                                        ) : editFacultyForm.avatar.startsWith('http') ? (
                                            <img src={editFacultyForm.avatar} alt="Faculty" className="w-full h-full object-cover" />
                                        ) : (
                                            editFacultyForm.avatar.charAt(0).toUpperCase()
                                        )
                                    ) : editFacultyForm.name ? (
                                        editFacultyForm.name.charAt(0).toUpperCase()
                                    ) : (
                                        '+'
                                    )}
                                </div>
                                <div className="flex gap-2 flex-wrap justify-center">
                                    <button
                                        onClick={() => document.getElementById('facultyPhotoInput').click()}
                                        className="px-3 xs:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-xs xs:text-sm font-medium"
                                    >
                                        Upload Photo
                                    </button>
                                    {editFacultyForm.avatar && editFacultyForm.avatar.startsWith('data:') && (
                                        <button
                                            onClick={() => setEditFacultyForm({...editFacultyForm, avatar: ''})}
                                            className="px-3 xs:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-xs xs:text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <input
                                    id="facultyPhotoInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setEditFacultyForm({...editFacultyForm, avatar: reader.result});
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="hidden"
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={editFacultyForm.name}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, name: e.target.value})}
                                    placeholder="Full name"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role *</label>
                                <input
                                    type="text"
                                    value={editFacultyForm.role}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, role: e.target.value})}
                                    placeholder="e.g., Professor, Lecturer"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
                                <input
                                    type="text"
                                    value={editFacultyForm.department}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, department: e.target.value})}
                                    placeholder="e.g., Engineering, Science"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={editFacultyForm.email}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, email: e.target.value})}
                                    placeholder="faculty@university.edu"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience (years)</label>
                                <input
                                    type="number"
                                    value={editFacultyForm.experience}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, experience: e.target.value})}
                                    placeholder="15"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Qualifications */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Qualifications</label>
                                <textarea
                                    value={editFacultyForm.qualifications}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, qualifications: e.target.value})}
                                    placeholder="e.g., Ph.D. in Computer Science, Master's in Engineering"
                                    rows="3"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                                />
                            </div>

                            {/* Avatar URL */}
                            <div>
                                <label className="block text-xs xs:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avatar URL</label>
                                <input
                                    type="text"
                                    value={editFacultyForm.avatar}
                                    onChange={(e) => setEditFacultyForm({...editFacultyForm, avatar: e.target.value})}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-4 xs:p-5 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex gap-2 xs:gap-3 rounded-b-xl">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs xs:text-sm"
                                onClick={() => {
                                    setShowEditFacultyModal(false);
                                    setEditingFaculty(null);
                                    setEditFacultyForm({ name: '', role: '', avatar: '', department: '', email: '', experience: '', qualifications: '' });
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1 text-xs xs:text-sm"
                                onClick={handleSaveFaculty}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {showEditEventModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-lg max-h-[95vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                                {editingEvent ? 'Edit Event' : 'Add Event'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowEditEventModal(false);
                                    setEditingEvent(null);
                                    setEditEventForm({ title: '', date: '', type: 'Academic', location: '' });
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                                <input
                                    type="text"
                                    value={editEventForm.title}
                                    onChange={(e) => setEditEventForm({...editEventForm, title: e.target.value})}
                                    placeholder="e.g., Annual Scholarship Summit"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={editEventForm.date}
                                    onChange={(e) => setEditEventForm({...editEventForm, date: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Type</label>
                                <select
                                    value={editEventForm.type}
                                    onChange={(e) => setEditEventForm({...editEventForm, type: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="Academic">Academic</option>
                                    <option value="Research">Research</option>
                                    <option value="Conference">Conference</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={editEventForm.location}
                                    onChange={(e) => setEditEventForm({...editEventForm, location: e.target.value})}
                                    placeholder="e.g., Main Auditorium, Online"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => {
                                    setShowEditEventModal(false);
                                    setEditingEvent(null);
                                    setEditEventForm({ title: '', date: '', type: 'Academic', location: '' });
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1"
                                onClick={handleSaveEvent}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Rename Modal */}
            {showGalleryRenameModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-lg">
                        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Rename Gallery Image</h3>
                            <button
                                onClick={() => {
                                    setShowGalleryRenameModal(false);
                                    setRenamingImageId(null);
                                    setNewImageName('');
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Name</label>
                                <input
                                    type="text"
                                    value={newImageName}
                                    onChange={(e) => setNewImageName(e.target.value)}
                                    placeholder="e.g., Campus Building, Student Center"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => {
                                    setShowGalleryRenameModal(false);
                                    setRenamingImageId(null);
                                    setNewImageName('');
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                className="flex-1"
                                onClick={handleSaveImageName}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}

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
