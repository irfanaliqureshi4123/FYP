import React, { useState } from 'react';
import StickPopup from '../components/common/StickPopup';
import Button from '../components/common/Button';

/**
 * StickPopup Demo Page
 * Shows different types of popups: info, success, warning, error
 */
const StickPopupDemo = () => {
    const [popups, setPopups] = useState({
        info: false,
        success: false,
        warning: false,
        error: false,
        autoClose: false
    });

    const handleOpen = (type) => {
        setPopups(prev => ({ ...prev, [type]: true }));
    };

    const handleClose = (type) => {
        setPopups(prev => ({ ...prev, [type]: false }));
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    StickPopup Component
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    A responsive, centered popup for displaying messages to users
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Popup Types
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                        onClick={() => handleOpen('info')}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Info Popup
                    </Button>
                    <Button 
                        onClick={() => handleOpen('success')}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        Success Popup
                    </Button>
                    <Button 
                        onClick={() => handleOpen('warning')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                    >
                        Warning Popup
                    </Button>
                    <Button 
                        onClick={() => handleOpen('error')}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Error Popup
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Usage Examples
                </h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
{`// Import the component
import StickPopup from '../components/common/StickPopup';

// In your component
const [showPopup, setShowPopup] = useState(false);

<StickPopup
  isOpen={showPopup}
  onClose={() => setShowPopup(false)}
  title="Success!"
  message="Your registration has been completed successfully."
  type="success"
/>

// With auto-close
<StickPopup
  isOpen={showPopup}
  onClose={() => setShowPopup(false)}
  title="Please Wait"
  message="Processing your request..."
  type="info"
  autoClose={true}
  autoCloseDuration={3000}
/>`}
                    </pre>
                </div>
            </div>

            {/* Popups */}
            <StickPopup
                isOpen={popups.info}
                onClose={() => handleClose('info')}
                title="Information"
                message="This is an informational message. Users can read it and close when they're done. The popup is centered and responsive on all screen sizes."
                type="info"
            />

            <StickPopup
                isOpen={popups.success}
                onClose={() => handleClose('success')}
                title="Success!"
                message="Your action was completed successfully. Thank you for using our application!"
                type="success"
            />

            <StickPopup
                isOpen={popups.warning}
                onClose={() => handleClose('warning')}
                title="Warning"
                message="Please be careful with this action. Make sure you understand the consequences before proceeding."
                type="warning"
            />

            <StickPopup
                isOpen={popups.error}
                onClose={() => handleClose('error')}
                title="Error"
                message="Something went wrong. Please try again later or contact support if the problem persists."
                type="error"
            />
        </div>
    );
};

export default StickPopupDemo;
