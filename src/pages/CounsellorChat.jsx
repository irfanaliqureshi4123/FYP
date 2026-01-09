import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Loader, MoreVertical, Phone, Video } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import counsellorsData from '../data/counsellors.json';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Toast from '../components/common/Toast';

const CounsellorChat = () => {
    const navigate = useNavigate();
    const { counsellorId } = useParams();
    const { currentUser } = useApp();

    const counsellor = counsellorsData.find(c => c.id === counsellorId);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'counsellor',
            text: `Hello! I'm ${counsellor?.name || 'your counsellor'}. How can I help you today?`,
            timestamp: new Date(Date.now() - 5 * 60000),
            senderName: counsellor?.name || 'Counsellor'
        }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [toast, setToast] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!counsellor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Counsellor not found</h1>
                <Button onClick={() => navigate('/counselling')} className="mt-4">
                    Back to Counselling
                </Button>
            </div>
        );
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue,
            timestamp: new Date(),
            senderName: currentUser?.name || 'You'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setIsTyping(true);

        // Simulate counsellor response
        setTimeout(() => {
            const responses = [
                "That's a great question! Let me help you with that.",
                "I understand your concern. Here's what I suggest...",
                "That's an important point. Have you considered...?",
                "I appreciate you sharing that. Let's explore this further.",
                "That's a common challenge. Here are some strategies that work well...",
                "I'm glad you brought that up. Let me share some insights...",
                "That's excellent progress! Keep building on that..."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const counsellorMessage = {
                id: messages.length + 2,
                sender: 'counsellor',
                text: randomResponse,
                timestamp: new Date(),
                senderName: counsellor.name
            };

            setMessages(prev => [...prev, counsellorMessage]);
            setIsLoading(false);
            setIsTyping(false);
        }, 1500);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    // Group messages by date
    const groupedMessages = {};
    messages.forEach(msg => {
        const dateStr = formatDate(msg.timestamp);
        if (!groupedMessages[dateStr]) {
            groupedMessages[dateStr] = [];
        }
        groupedMessages[dateStr].push(msg);
    });

    return (
        <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                    <button
                        onClick={() => navigate('/counselling')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                    >
                        <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                        <Avatar src={counsellor.avatar} alt={counsellor.name} size="md" />
                        <div className="flex-1 min-w-0">
                            <h1 className="font-bold text-gray-900 dark:text-white text-sm xs:text-base truncate">{counsellor.name}</h1>
                            <p className="text-xs xs:text-sm text-green-600 dark:text-green-400">Active now</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden xs:flex">
                        <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden xs:flex">
                        <Video className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-6 space-y-4 xs:space-y-6">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                    <div key={date}>
                        <div className="flex items-center justify-center mb-4 xs:mb-6">
                            <span className="text-xs xs:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 xs:px-4 py-1 xs:py-1.5 rounded-full">
                                {date}
                            </span>
                        </div>

                        <div className="space-y-2 xs:space-y-3">
                            {msgs.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`flex items-end gap-2 xs:gap-3 max-w-xs sm:max-w-md`}
                                    >
                                        {message.sender === 'counsellor' && (
                                            <Avatar src={counsellor.avatar} alt={counsellor.name} size="sm" />
                                        )}

                                        <div
                                            className={`rounded-lg p-3 xs:p-4 ${
                                                message.sender === 'user'
                                                    ? 'bg-primary-500 text-white rounded-br-none'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                                            }`}
                                        >
                                            <p className="text-sm xs:text-base break-words">{message.text}</p>
                                            <p className={`text-xs mt-1.5 ${
                                                message.sender === 'user'
                                                    ? 'text-primary-100'
                                                    : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>

                                        {message.sender === 'user' && (
                                            <Avatar src={currentUser?.avatar} alt={currentUser?.name || 'You'} size="sm" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-end gap-2 xs:gap-3">
                            <Avatar src={counsellor.avatar} alt={counsellor.name} size="sm" />
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 xs:p-4 rounded-bl-none">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 xs:w-3 xs:h-3 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 xs:w-3 xs:h-3 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 xs:w-3 xs:h-3 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 p-3 xs:p-4 text-center">
                <p className="text-xs xs:text-sm text-blue-900 dark:text-blue-300">
                    For urgent matters, consider <Button onClick={() => navigate(`/counselling/booking/${counsellorId}`)} className="underline p-0 h-auto font-semibold text-xs" variant="text">booking a session</Button>
                </p>
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <form onSubmit={handleSendMessage} className="flex gap-2 xs:gap-3">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="flex-shrink-0 p-2 xs:p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <Loader className="w-4 h-4 xs:w-5 xs:h-5 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4 xs:w-5 xs:h-5" />
                        )}
                    </button>
                </form>
            </div>

            {/* Toast */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default CounsellorChat;
