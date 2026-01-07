import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Edit, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight, Pin, Loader } from 'lucide-react';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';

/**
 * University Gallery Page
 * Comprehensive photo gallery with categories, descriptions, lightbox view, and drag-to-reorder
 */
const UniversityGallery = () => {
    const navigate = useNavigate();
    const { universityId } = useParams();
    const galleryInputRef = useRef(null);

    // Gallery state with enhanced data structure
    const [galleryImages, setGalleryImages] = useState([
        { id: 1, preview: null, name: 'Campus Aerial View', category: 'Campus', description: 'Beautiful aerial view of our main campus', date: '2024-01-15', photographer: 'Admin', isCover: true, uploadProgress: 0 },
        { id: 2, preview: null, name: 'Convocation', category: 'Events', description: 'Annual convocation ceremony 2024', date: '2024-02-20', photographer: 'Admin', isCover: false, uploadProgress: 0 },
        { id: 3, preview: null, name: 'Research Center', category: 'Facilities', description: 'State-of-the-art research facilities', date: '2024-03-10', photographer: 'Admin', isCover: false, uploadProgress: 0 },
        { id: 4, preview: null, name: 'Library', category: 'Facilities', description: 'Modern library with digital resources', date: '2024-03-15', photographer: 'Admin', isCover: false, uploadProgress: 0 },
        { id: 5, preview: null, name: 'Student Activity', category: 'Events', description: 'Students engaging in campus activities', date: '2024-04-05', photographer: 'Admin', isCover: false, uploadProgress: 0 },
        { id: 6, preview: null, name: 'International Event', category: 'Events', description: 'International conference at university', date: '2024-04-20', photographer: 'Admin', isCover: false, uploadProgress: 0 }
    ]);

    // UI State
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [uploadProgress, setUploadProgress] = useState({});
    const [editingImage, setEditingImage] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [draggedImage, setDraggedImage] = useState(null);
    const [toast, setToast] = useState('');

    // Categories
    const categories = ['All', 'Campus', 'Facilities', 'Events', 'Academic', 'Sports', 'Other'];

    // Filter images by category
    const filteredImages = selectedCategory === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === selectedCategory);

    // Gallery handlers
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Max 5MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                }
            };
            reader.onloadend = () => {
                const newImage = {
                    id: Math.max(...galleryImages.map(img => img.id), 0) + 1,
                    preview: reader.result,
                    name: file.name.replace(/\.[^/.]+$/, ''),
                    category: 'Other',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
                    photographer: 'Admin',
                    isCover: false,
                    uploadProgress: 100
                };
                setGalleryImages([...galleryImages, newImage]);
                setUploadProgress(prev => {
                    const newProgress = { ...prev };
                    delete newProgress[file.name];
                    return newProgress;
                });
                setToast('Image uploaded successfully! ✓');
                setTimeout(() => setToast(''), 3000);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDeleteImage = (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            setGalleryImages(galleryImages.filter(img => img.id !== id));
            setToast('Image deleted successfully! ✓');
            setTimeout(() => setToast(''), 3000);
        }
    };

    const handleEditImage = (image) => {
        setEditingImage(image.id);
        setEditFormData({ ...image });
    };

    const handleSaveEdit = () => {
        setGalleryImages(galleryImages.map(img => 
            img.id === editingImage ? { ...editFormData } : img
        ));
        setEditingImage(null);
        setToast('Image details updated! ✓');
        setTimeout(() => setToast(''), 3000);
    };

    const handleSetCover = (id) => {
        setGalleryImages(galleryImages.map(img => ({
            ...img,
            isCover: img.id === id
        })));
        setToast('Cover photo updated! ✓');
        setTimeout(() => setToast(''), 3000);
    };

    const handleDragStart = (e, image) => {
        setDraggedImage(image);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetImage) => {
        e.preventDefault();
        if (!draggedImage || draggedImage.id === targetImage.id) return;

        const draggedIndex = galleryImages.findIndex(img => img.id === draggedImage.id);
        const targetIndex = galleryImages.findIndex(img => img.id === targetImage.id);

        const newGallery = [...galleryImages];
        [newGallery[draggedIndex], newGallery[targetIndex]] = [newGallery[targetIndex], newGallery[draggedIndex]];
        
        setGalleryImages(newGallery);
        setDraggedImage(null);
        setToast('Images reordered! ✓');
        setTimeout(() => setToast(''), 3000);
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    const uploadedImages = galleryImages.filter(img => img.preview);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(`/academia/university/${universityId}`)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Back to university profile"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">University Gallery</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{uploadedImages.length} photos in gallery</p>
                    </div>
                </div>

                {/* Upload Button */}
                <div className="mb-8">
                    <Button
                        onClick={() => setShowUploadModal(true)}
                        variant="primary"
                        className="flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Add Photos
                    </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.filter(img => img.preview).map((img, index) => (
                        <div
                            key={img.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, img)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, img)}
                            className="group cursor-move bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                        >
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img
                                    src={img.preview}
                                    alt={img.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform cursor-pointer"
                                    onClick={() => openLightbox(filteredImages.findIndex(i => i.id === img.id))}
                                />
                                {img.isCover && (
                                    <Badge variant="success" className="absolute top-2 left-2">
                                        <Pin className="w-3 h-3 mr-1" />
                                        Cover
                                    </Badge>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => handleEditImage(img)}
                                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{img.name}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{img.description || 'No description'}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <span>{img.category}</span>
                                    <span>{img.date}</span>
                                </div>
                                <button
                                    onClick={() => handleSetCover(img.id)}
                                    className={`w-full py-1.5 rounded text-xs font-medium transition-colors ${
                                        img.isCover
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                    }`}
                                >
                                    {img.isCover ? '✓ Cover Photo' : 'Set as Cover'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {uploadedImages.length === 0 && (
                    <div className="text-center py-12">
                        <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No photos yet. Upload some to get started!</p>
                    </div>
                )}

                {/* Upload Modal */}
                {showUploadModal && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
                            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Add Photos</h3>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
                                        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 sm:p-10 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer group"
                                    >
                                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mx-auto mb-3" />
                                        <p className="font-medium text-gray-700 dark:text-gray-300">Tap to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 5MB each</p>
                                    </button>
                                </div>

                                {/* Upload Progress */}
                                {Object.entries(uploadProgress).map(([filename, progress]) => (
                                    <div key={filename}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{filename}</span>
                                            <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-indigo-600 h-full transition-all"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setShowUploadModal(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editingImage && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-2xl">
                            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit Photo Details</h3>
                                <button
                                    onClick={() => setEditingImage(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="p-4 sm:p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={editFormData.name || ''}
                                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                    <select
                                        value={editFormData.category || ''}
                                        onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={editFormData.description || ''}
                                        onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                        placeholder="Add details about this photo..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photographer</label>
                                    <input
                                        type="text"
                                        value={editFormData.photographer || ''}
                                        onChange={(e) => setEditFormData({...editFormData, photographer: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => setEditingImage(null)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="flex-1"
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Lightbox */}
                {lightboxOpen && (
                    <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4">
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50"
                            disabled={filteredImages.length <= 1}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col items-center max-w-4xl">
                            {filteredImages[lightboxIndex]?.preview && (
                                <>
                                    <img
                                        src={filteredImages[lightboxIndex].preview}
                                        alt={filteredImages[lightboxIndex].name}
                                        className="max-h-[70vh] max-w-full object-contain"
                                    />
                                    <div className="mt-4 text-center text-white">
                                        <h3 className="text-lg font-semibold">{filteredImages[lightboxIndex].name}</h3>
                                        <p className="text-sm text-gray-300 mt-1">{filteredImages[lightboxIndex].description}</p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {lightboxIndex + 1} / {filteredImages.length}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50"
                            disabled={filteredImages.length <= 1}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
                        {toast}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniversityGallery;
