import { ArrowRight, BookOpen } from 'lucide-react';
import Badge from '../common/Badge';

export default function RoadmapCard({ roadmap }) {
  // Map roadmap titles to roadmap.sh URLs
  const roadmapURLs = {
    'Full Stack Web Developer': 'https://roadmap.sh/full-stack',
    'Data Scientist': 'https://roadmap.sh/ai-data-scientist',
    'Frontend Developer': 'https://roadmap.sh/frontend',
    'Backend Developer': 'https://roadmap.sh/backend',
    'DevOps Engineer': 'https://roadmap.sh/devops',
    'Mobile Developer': 'https://roadmap.sh/android',
    'iOS Developer': 'https://roadmap.sh/ios',
    'Android Developer': 'https://roadmap.sh/android',
    'Game Developer': 'https://roadmap.sh/game-developer',
    'Blockchain Developer': 'https://roadmap.sh/blockchain',
    'Cybersecurity Specialist': 'https://roadmap.sh/cyber-security',
    'Machine Learning Engineer': 'https://roadmap.sh/machine-learning',
    'Cloud Engineer': 'https://roadmap.sh/aws',
    'AI/ML Engineer': 'https://roadmap.sh/machine-learning',
  };

  const getLevelVariant = (level) => {
    const normalizedLevel = level.toLowerCase();
    switch (normalizedLevel) {
      case 'beginner':
        return 'info';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'default';
    }
  };

  const handleViewRoadmap = () => {
    const url = roadmapURLs[roadmap.title] || 'https://roadmap.sh';
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-lg sm:rounded-xl md:rounded-xl lg:rounded-xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md xs:hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3 xs:mb-3 sm:mb-4 md:mb-4 gap-2 xs:gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 xs:mb-2 sm:mb-2 line-clamp-2 leading-tight xs:leading-snug">
            {roadmap.title}
          </h3>
          <Badge variant={getLevelVariant(roadmap.difficulty)} className="text-xs xs:text-xs sm:text-sm">
            {roadmap.difficulty}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs xs:text-sm sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 xs:mb-4 sm:mb-4 md:mb-5 line-clamp-3 flex-grow leading-relaxed">
        {roadmap.description}
      </p>

      {/* Button */}
      <button
        onClick={handleViewRoadmap}
        className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-2 xs:py-2.5 sm:py-2.5 md:py-3 px-3 xs:px-4 sm:px-5 md:px-6 rounded-lg xs:rounded-lg sm:rounded-lg md:rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs xs:text-sm sm:text-sm md:text-base active:scale-95 xs:active:scale-95"
      >
        View Roadmap
        <ArrowRight className="w-3 xs:w-3.5 sm:w-4 md:w-4" />
      </button>
    </div>
  );
}
