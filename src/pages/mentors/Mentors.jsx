import React, { useState, useMemo } from 'react';
import { Search, Star, MessageCircle, Calendar, DollarSign, Check, Filter, X } from 'lucide-react';
import Badge from '../../components/common/Badge';
import Toast from '../../components/common/Toast';
import mentorsData from '../../data/mentors.json';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [savedMentors, setSavedMentors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);

  // Get unique specializations for filtering
  const specializations = ['All', ...new Set(mentorsData.flatMap(m => m.specializations))];

  // Filter and sort mentors
  const filteredMentors = useMemo(() => {
    let result = mentorsData.filter(mentor => {
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        selectedSpecialization === 'All' ||
        mentor.specializations.includes(selectedSpecialization);

      const matchesRating =
        selectedRating === 'All' ||
        (selectedRating === '4.5+' && mentor.rating >= 4.5) ||
        (selectedRating === '4.7+' && mentor.rating >= 4.7) ||
        (selectedRating === '4.8+' && mentor.rating >= 4.8) ||
        (selectedRating === '4.9+' && mentor.rating >= 4.9);

      return matchesSearch && matchesSpecialization && matchesRating;
    });

    // Sort mentors
    return result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      if (sortBy === 'mentees') return b.mentees - a.mentees;
      return 0;
    });
  }, [searchTerm, selectedSpecialization, selectedRating, sortBy]);

  const handleSaveMentor = (mentorId) => {
    if (savedMentors.includes(mentorId)) {
      setSavedMentors(savedMentors.filter(id => id !== mentorId));
      showToast('Mentor removed from saved', 'info');
    } else {
      setSavedMentors([...savedMentors, mentorId]);
      showToast('Mentor saved successfully!', 'success');
    }
  };

  const handleBookSession = (mentorName) => {
    showToast(`Booking request sent to ${mentorName}!`, 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 xl:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 lg:mb-3">
          Find Your Mentor
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Connect with experienced professionals to accelerate your growth
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-6 sm:mb-8 lg:mb-10">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 lg:p-6 border border-blue-200 dark:border-blue-800">
          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-600 dark:text-blue-400">
            {mentorsData.length}
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Expert Mentors</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 sm:p-4 lg:p-6 border border-green-200 dark:border-green-800">
          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-green-600 dark:text-green-400">
            4.8+
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Avg Rating</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 sm:p-4 lg:p-6 border border-purple-200 dark:border-purple-800">
          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-600 dark:text-purple-400">
            {mentorsData.reduce((sum, m) => sum + m.mentees, 0)}+
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Active Mentees</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 sm:p-4 lg:p-6 border border-orange-200 dark:border-orange-800">
          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-orange-600 dark:text-orange-400">
            $55-120
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Hourly Rate</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 lg:p-6 xl:p-8 mb-6 sm:mb-8 lg:mb-10 border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 lg:mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 sm:top-3 lg:top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 lg:pl-11 pr-3 sm:pr-4 lg:pr-5 py-2 lg:py-3 text-sm sm:text-base lg:text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 sm:px-4 lg:px-6 py-2 lg:py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center sm:justify-start gap-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base lg:text-lg font-medium transition"
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-5 lg:pt-6 space-y-3 sm:space-y-4 lg:space-y-5">
            {/* Specialization Filter */}
            <div>
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 lg:mb-4">
                Specialization
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                {specializations.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialization(spec)}
                    className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-medium transition ${
                      selectedSpecialization === spec
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 lg:mb-4">
                Rating
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
                {['All', '4.5+', '4.7+', '4.8+', '4.9+'].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-medium transition ${
                      selectedRating === rating
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-xs sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 lg:mb-4">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 sm:px-4 lg:px-5 py-2 lg:py-2.5 text-sm lg:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
              >
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="experience">Most Experienced</option>
                <option value="mentees">Most Active Mentees</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold">{filteredMentors.length}</span> of{' '}
          <span className="font-semibold">{mentorsData.length}</span> mentors
        </p>
        {savedMentors.length > 0 && (
          <p className="text-xs sm:text-sm lg:text-base bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 sm:px-3 lg:px-4 py-1 lg:py-1.5 rounded-full">
            {savedMentors.length} mentor{savedMentors.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {filteredMentors.map(mentor => (
            <div
              key={mentor.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition duration-300"
            >
              {/* Header with Avatar */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 lg:p-5 xl:p-6">
                <div className="flex items-start justify-between">
                  <div className="text-4xl sm:text-5xl lg:text-6xl">{mentor.avatar}</div>
                  <button
                    onClick={() => handleSaveMentor(mentor.id)}
                    className={`p-1.5 sm:p-2 lg:p-2.5 rounded-full transition ${
                      savedMentors.includes(mentor.id)
                        ? 'bg-yellow-400 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <svg
                      className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6"
                      fill={savedMentors.includes(mentor.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-5 xl:p-6 space-y-3 sm:space-y-4 lg:space-y-5">
                {/* Name and Title */}
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 lg:mb-1.5">
                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {mentor.name}
                    </h3>
                    {mentor.verified && (
                      <Check className="text-blue-500 flex-shrink-0" size={16} />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 line-clamp-1">
                    {mentor.title} <span className="font-semibold">@{mentor.company}</span>
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(mentor.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300">
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 lg:text-sm">
                    ({mentor.reviews})
                  </span>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.slice(0, 2).map(exp => (
                    <span key={exp} className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs lg:text-sm px-2 lg:px-2.5 py-1 rounded">
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 py-2 sm:py-3 lg:py-4 border-y border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <DollarSign size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 lg:mt-1" />
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500 line-clamp-1">Hourly</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">${mentor.hourlyRate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 lg:mt-1" />
                    <div className="min-w-0">
                      <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500 line-clamp-1">Available</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-xs lg:text-sm line-clamp-1">
                        {mentor.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-center gap-1 sm:gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500">Exp.</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                      {mentor.yearsExperience}+
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500">Mentees</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                      {mentor.mentees}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500">Langs</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                      {mentor.languages.length}
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-1.5 sm:p-2 lg:p-3 text-center">
                  <p className="text-xs lg:text-sm text-blue-700 dark:text-blue-300 line-clamp-1">
                    ⚡ {mentor.responseTime}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1 sm:pt-2 lg:pt-3">
                  <button
                    onClick={() => handleBookSession(mentor.name)}
                    className="flex-1 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs sm:text-sm lg:text-base transition flex items-center justify-center gap-1"
                  >
                    <Calendar size={14} />
                    <span className="hidden sm:inline">Book</span>
                    <span className="sm:hidden">Book</span>
                  </button>
                  <button className="flex-1 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-xs sm:text-sm lg:text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-1">
                    <MessageCircle size={14} />
                    <span className="hidden sm:inline">Message</span>
                    <span className="sm:hidden">Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 lg:mb-6">🔍</div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 lg:mb-3">
            No mentors found
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialization('All');
              setSelectedRating('All');
            }}
            className="px-4 sm:px-6 lg:px-8 py-2 lg:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm lg:text-base"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    </div>
  );
};

export default Mentors;
