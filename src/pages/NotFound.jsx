import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Frown } from 'lucide-react';
import Button from '../components/common/Button';

/**
 * 404 Not Found Page
 * Displayed when user navigates to an invalid route
 */
const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <Frown className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" />
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        Sorry, the page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/">
                        <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
                            Go Home
                        </Button>
                    </Link>
                    <Link to="/explore">
                        <Button variant="secondary" size="md" icon={<Search className="w-4 h-4" />}>
                            Explore
                        </Button>
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        If you believe this is an error, please contact support.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
