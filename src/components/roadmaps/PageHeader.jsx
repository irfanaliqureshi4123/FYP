import { Map, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6 xs:mb-7 sm:mb-8">
      <div className="flex items-start gap-3 xs:gap-4">
        <button
          onClick={() => navigate('/explore')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          aria-label="Go back to Explore"
        >
          <ArrowLeft className="w-5 xs:w-6 h-5 xs:h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <div className="p-2 xs:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg xs:rounded-xl flex-shrink-0">
          <Map className="w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1 xs:mb-2">
            Developer Roadmaps
          </h1>
          <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
            Step-by-step guides to help you navigate your learning journey and become a professional developer
          </p>
        </div>
      </div>
    </div>
  );
}
