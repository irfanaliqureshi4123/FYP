export default function RoadmapFilters({ selectedLevel, onLevelChange }) {
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <section className="py-6 xs:py-7 sm:py-8 mb-6 xs:mb-7 sm:mb-8">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold mb-3 xs:mb-4 sm:mb-6">Filter by Level</h2>
        <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`filter-btn px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-2 text-xs xs:text-sm sm:text-base rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:bg-blue-50'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
