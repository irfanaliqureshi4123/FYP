import React, { useState, useRef, useEffect } from 'react';
import { Image, Smile, BarChart3, MapPin, X, Plus, Trash2, ChevronLeft } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Avatar from '../common/Avatar';

/**
 * PostComposer Component
 * Create new posts with character counter, poll feature, and location (using country-state-city library)
 */
const PostComposer = () => {
    const { currentUser } = useAuth();
    const { addPost } = useApp();
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [showPollBuilder, setShowPollBuilder] = useState(false);
    const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2']);
    const [pollDuration, setPollDuration] = useState('unlimited');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationStep, setLocationStep] = useState('country'); // country, state, city
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [locationSearch, setLocationSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [libraryLoaded, setLibraryLoaded] = useState(false);
    const cscRef = useRef(null);
    const fileInputRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const maxChars = 500;

    // Add window resize listener
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load library and countries on mount
    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const { Country, State, City } = await import('country-state-city');
                console.log('Library loaded successfully');
                
                cscRef.current = { Country, State, City };
                
                const allCountries = Country.getAllCountries();
                console.log('Total countries loaded:', allCountries?.length);
                console.log('First country:', allCountries?.[0]);
                setCountries(allCountries || []);
                setLibraryLoaded(true);
            } catch (error) {
                console.error('Error loading country-state-city library:', error);
                setLibraryLoaded(false);
            }
        };
        
        loadLibrary();
    }, []);

    // Load states when country is selected
    useEffect(() => {
        if (selectedCountry && libraryLoaded && cscRef.current) {
            setIsLoadingStates(true);
            try {
                console.log('Fetching states for country:', selectedCountry);
                console.log('Country ISO Code:', selectedCountry.isoCode);
                console.log('State class methods:', Object.getOwnPropertyNames(cscRef.current.State).filter(m => typeof cscRef.current.State[m] === 'function'));
                
                // Try different method names
                let countryStates = [];
                if (typeof cscRef.current.State.getStatesByCountry === 'function') {
                    countryStates = cscRef.current.State.getStatesByCountry(selectedCountry.isoCode);
                } else if (typeof cscRef.current.State.getStateOfCountry === 'function') {
                    countryStates = cscRef.current.State.getStateOfCountry(selectedCountry.isoCode);
                } else if (typeof cscRef.current.State.getStates === 'function') {
                    countryStates = cscRef.current.State.getStates(selectedCountry.isoCode);
                }
                
                console.log('Raw state response:', countryStates);
                console.log('State count:', countryStates?.length);
                console.log('First state:', countryStates?.[0]);
                
                setStates(countryStates || []);
                setSelectedState(null);
                setCities([]);
                setIsLoadingStates(false);
            } catch (error) {
                console.error('Error loading states:', error);
                console.error('Error message:', error.message);
                setStates([]);
                setIsLoadingStates(false);
            }
        }
    }, [selectedCountry, libraryLoaded]);

    // Load cities when state is selected
    useEffect(() => {
        if (selectedCountry && selectedState && libraryLoaded && cscRef.current) {
            setIsLoadingCities(true);
            try {
                console.log('Fetching cities for:', {
                    country: selectedCountry.name,
                    countryCode: selectedCountry.isoCode,
                    state: selectedState.name,
                    stateCode: selectedState.isoCode
                });
                
                const stateCities = cscRef.current.City.getCitiesByStateAndCountry(selectedState.isoCode, selectedCountry.isoCode);
                console.log('Raw city response:', stateCities);
                console.log('City count:', stateCities?.length);
                
                setCities(stateCities || []);
                setIsLoadingCities(false);
            } catch (error) {
                console.log('Error loading cities:', error);
                setCities([]);
                setIsLoadingCities(false);
            }
        }
    }, [selectedCountry, selectedState, libraryLoaded]);

    // Filter locations based on search
    const getFilteredLocations = () => {
        const query = locationSearch.toLowerCase();
        if (locationStep === 'country') {
            return countries.filter(c => 
                c.name.toLowerCase().includes(query)
            );
        } else if (locationStep === 'state' && selectedCountry) {
            // Show all states if search is empty, or filter by search query
            if (query === '') {
                return states;
            }
            return states.filter(s => 
                s.name.toLowerCase().includes(query)
            );
        } else if (locationStep === 'city' && selectedCountry && selectedState) {
            // Show all cities if search is empty, or filter by search query
            if (query === '') {
                return cities;
            }
            return cities.filter(c => 
                c.name.toLowerCase().includes(query)
            );
        }
        return [];
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setLocationStep('state');
        setLocationSearch('');
    };

    const handleStateSelect = (state) => {
        setSelectedState(state);
        setLocationStep('city');
        setLocationSearch('');
    };

    const handleCitySelect = (city) => {
        const location = {
            city: city.name,
            state: selectedState?.name || '',
            country: selectedCountry?.name || '',
            countryCode: selectedCountry?.isoCode || '',
            stateCode: selectedState?.isoCode || '',
        };
        setSelectedLocation(location);
        setShowLocationModal(false);
        resetLocationModal();
    };

    const resetLocationModal = () => {
        setLocationStep('country');
        setSelectedCountry(null);
        setSelectedState(null);
        setLocationSearch('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setContent(prevContent => prevContent + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate poll options if poll is enabled
        const validPollOptions = pollOptions.filter(opt => opt.trim());
        const isPollValid = !showPollBuilder || validPollOptions.length >= 2;
        
        // Validate content
        const isContentValid = content.trim() && content.length <= maxChars;
        
        if (isContentValid && isPollValid && currentUser) {
            addPost({
                userId: currentUser.id,
                username: currentUser.username,
                name: currentUser.name,
                avatar: currentUser.avatar,
                verified: currentUser.verified || false,
                content: content.trim(),
                image: imagePreview || null,
                hashtags: extractHashtags(content),
                visibility: 'public',
                commentsDisabled: false,
                isPinned: false,
                location: selectedLocation || null,
                poll: showPollBuilder && validPollOptions.length >= 2 ? {
                    options: validPollOptions,
                    votes: validPollOptions.map(() => 0),
                    duration: parseInt(pollDuration),
                    hasVoted: false,
                } : null,
            });
            setContent('');
            removeImage();
            resetPoll();
            setSelectedLocation(null);
        }
    };

    const resetPoll = () => {
        setShowPollBuilder(false);
        setPollOptions(['Option 1', 'Option 2']);
        setPollDuration('24');
    };

    const addPollOption = () => {
        if (pollOptions.length < 4) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const removePollOption = (index) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };

    const updatePollOption = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const extractHashtags = (text) => {
        const hashtagRegex = /#(\w+)/g;
        const matches = text.match(hashtagRegex);
        return matches ? matches.map(tag => tag.slice(1)) : [];
    };

    const isNearLimit = content.length > maxChars * 0.9;
    const isOverLimit = content.length > maxChars;
    const validPollOptions = pollOptions.filter(opt => opt.trim());
    const isPollValid = !showPollBuilder || validPollOptions.length >= 2;
    const isPostDisabled = !content.trim() || content.length > maxChars || !isPollValid;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-4 sm:mb-6 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                {/* Main Input Area */}
                <div className="flex gap-3 sm:gap-4">
                    {currentUser && (
                        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
                    )}
                    <div className="flex-1 min-w-0">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's your career goal today?"
                            className="w-full resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base sm:text-lg font-medium leading-relaxed"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                {/* Action Bar */}
                <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200 dark:border-gray-700">
                    {/* Icon Buttons - More Compact */}
                    <div className="flex items-center gap-1 sm:gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            title="Add image"
                        >
                            <Image className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                showEmojiPicker
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-700'
                            }`}
                            title="Add emoji"
                        >
                            <Smile className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowPollBuilder(!showPollBuilder)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                showPollBuilder
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700'
                            }`}
                            title="Create poll"
                        >
                            <BarChart3 className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowLocationModal(!showLocationModal)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                selectedLocation
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'
                            }`}
                            title="Add location"
                        >
                            <MapPin className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div className="mb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-gray-50 dark:bg-gray-700/50 border-y border-gray-200 dark:border-gray-600 py-3 overflow-x-auto">
                            <div ref={emojiPickerRef} className="w-full">
                                <EmojiPicker
                                    onEmojiClick={handleEmojiClick}
                                    theme="auto"
                                    searchPlaceholder="Search emoji..."
                                    height={windowWidth < 640 ? 320 : windowWidth < 1024 ? 360 : 400}
                                    width="100%"
                                    previewConfig={{
                                        defaultCapitalizeRecent: true,
                                        defaultSkinToneIndex: 0,
                                    }}
                                    lazyLoadEmojis={true}
                                    skinTonePickerLocation="preview"
                                />
                            </div>
                        </div>
                    )}

                    {/* Bottom Controls - Post Button and Counter */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <span
                            className={`text-xs sm:text-sm font-medium transition-colors ${
                                content.length > maxChars
                                    ? 'text-red-600 dark:text-red-400'
                                    : content.length > maxChars * 0.9
                                    ? 'text-yellow-600 dark:text-yellow-400'
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            {content.length} / {maxChars}
                        </span>
                        <button
                            type="submit"
                            disabled={isPostDisabled}
                            title={!isPollValid ? 'Poll needs at least 2 options' : ''}
                            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 ${
                                isPostDisabled
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
                            }`}
                        >
                            Post
                        </button>
                    </div>
                </div>

                {/* Image Preview - Bottom */}
                {imagePreview && (
                    <div className="relative bg-gray-900 flex items-center justify-center mt-4 rounded-lg overflow-hidden">
                        <div className="p-3 sm:p-4 max-h-48">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-full max-h-48 object-contain rounded-lg"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white text-gray-900 rounded-full p-1.5 transition-all duration-200 shadow-md hover:shadow-lg z-20"
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Location Display */}
                {selectedLocation && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {selectedLocation.city}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {selectedLocation.state ? `${selectedLocation.state}, ${selectedLocation.country}` : selectedLocation.country}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSelectedLocation(null)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Poll Builder */}
                {showPollBuilder && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Create a Poll</h4>
                            <button
                                type="button"
                                onClick={() => setShowPollBuilder(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-4">
                            {pollOptions.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updatePollOption(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        maxLength="50"
                                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    {pollOptions.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removePollOption(index)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                            title="Remove option"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {validPollOptions.length < 2 && showPollBuilder && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                    Poll needs at least 2 options with text
                                </p>
                            )}
                        </div>

                        {pollOptions.length < 4 && (
                            <button
                                type="button"
                                onClick={addPollOption}
                                className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2 text-green-600 dark:text-green-400 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Option
                            </button>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Poll Duration
                            </label>
                            <select
                                value={pollDuration}
                                onChange={(e) => setPollDuration(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-green-300 dark:border-green-600 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="unlimited">Unlimited Time</option>
                                <option value="1">1 hour</option>
                                <option value="3">3 hours</option>
                                <option value="6">6 hours</option>
                                <option value="12">12 hours</option>
                                <option value="24">24 hours</option>
                                <option value="72">3 days</option>
                                <option value="168">7 days</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Location Modal */}
                {showLocationModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full sm:max-w-sm max-h-[80vh] sm:max-h-[600px] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    {locationStep !== 'country' && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (locationStep === 'state') {
                                                    setLocationStep('country');
                                                    setSelectedCountry(null);
                                                } else if (locationStep === 'city') {
                                                    setLocationStep('state');
                                                }
                                                setLocationSearch('');
                                            }}
                                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                    )}
                                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {locationStep === 'country' && 'Select Country'}
                                        {locationStep === 'state' && `Select State (${selectedCountry?.name})`}
                                        {locationStep === 'city' && `Select City (${selectedState?.name})`}
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowLocationModal(false);
                                        resetLocationModal();
                                    }}
                                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
                                <input
                                    type="text"
                                    value={locationSearch}
                                    onChange={(e) => setLocationSearch(e.target.value)}
                                    placeholder={`Search ${locationStep}...`}
                                    className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    autoFocus
                                />
                                {locationStep === 'city' && cities.length === 0 && (
                                    <p className="text-xs text-amber-600 dark:text-amber-400">
                                        💡 Tip: Some regions don't have city data. You can select the state as your location.
                                    </p>
                                )}
                            </div>

                            {/* Location List */}
                            <div className="overflow-y-auto flex-1">
                                {isLoadingStates && locationStep === 'state' ? (
                                    <div className="p-4 text-center">
                                        <div className="inline-block">
                                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-200 border-t-red-600"></div>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">Loading states...</p>
                                    </div>
                                ) : isLoadingCities && locationStep === 'city' ? (
                                    <div className="p-4 text-center">
                                        <div className="inline-block">
                                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-200 border-t-red-600"></div>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">Loading cities...</p>
                                    </div>
                                ) : getFilteredLocations().length > 0 ? (
                                    getFilteredLocations().map((item, index) => {
                                        const displayName = item.name || item.isoCode;
                                        const isSelected = 
                                            (locationStep === 'country' && selectedCountry?.isoCode === item.isoCode) ||
                                            (locationStep === 'state' && selectedState?.isoCode === item.isoCode);
                                        
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    if (locationStep === 'country') {
                                                        handleCountrySelect(item);
                                                    } else if (locationStep === 'state') {
                                                        handleStateSelect(item);
                                                    } else if (locationStep === 'city') {
                                                        handleCitySelect(item);
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className={`font-medium truncate ${
                                                        isSelected 
                                                            ? 'text-red-600 dark:text-red-400' 
                                                            : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                        {displayName}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                                                )}
                                            </button>
                                        );
                                    })
                                ) : locationStep === 'state' && states.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        <p>No states available for {selectedCountry?.name}</p>
                                    </div>
                                ) : locationStep === 'city' && cities.length === 0 ? (
                                    <div className="p-4 text-center space-y-3">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            No cities available for {selectedState?.name}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const location = {
                                                    city: selectedState?.name || '',
                                                    state: selectedState?.name || '',
                                                    country: selectedCountry?.name || '',
                                                    countryCode: selectedCountry?.isoCode || '',
                                                    stateCode: selectedState?.isoCode || '',
                                                };
                                                setSelectedLocation(location);
                                                setShowLocationModal(false);
                                                resetLocationModal();
                                            }}
                                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Select {selectedState?.name}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        <p>No {locationStep}s found matching "{locationSearch}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostComposer;
