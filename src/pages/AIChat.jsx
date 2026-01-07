import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Loader, Mic, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIChat = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: 'Hello! I\'m your AI assistant. I\'m here to help you with career guidance, skill development, university information, and much more. What would you like to know about today?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateAIResponse = (userMessage) => {
        const responses = {
            career: [
                'I\'d be happy to help you explore career paths! Are you interested in a specific industry or field? I can provide insights about different careers, required skills, salary expectations, and growth opportunities.',
                'Career planning is crucial for your future. What\'s your current educational background and what are your interests? This will help me suggest suitable career paths for you.',
                'Different careers require different skill sets. Would you like to know about the in-demand skills in your field of interest?'
            ],
            skill: [
                'Skill development is essential in today\'s job market. I can help you identify which skills are most valuable in your desired field and suggest resources to develop them.',
                'Both technical and soft skills are important. Would you like to focus on a specific skill or learn about the top skills employers are looking for?',
                'Great question! Building a strong skill set takes time and practice. Let me suggest a roadmap for your skill development.'
            ],
            university: [
                'Universities play a crucial role in your career journey. Are you looking for information about specific universities, programs, admission requirements, or scholarships?',
                'I can help you find the right university program that matches your interests and career goals. What\'s your preferred field of study?',
                'Different universities specialize in different fields. Tell me more about your academic interests and I can suggest suitable options.'
            ],
            mentors: [
                'Having a mentor can greatly accelerate your career growth. Would you like to connect with mentors in your field of interest? I can help you find the right person.',
                'Mentorship is a valuable relationship. Are you looking for guidance on specific aspects of your career or personal development?',
                'Our mentor network includes professionals from various industries. Who would you like to learn from?'
            ],
            default: [
                'That\'s an interesting question! Could you provide more details? I\'m here to help with career guidance, skill development, university information, and personal growth.',
                'I understand your concern. Let me help you with that. Could you tell me more about what you\'re looking for?',
                'Great! I\'m ready to assist. What specific information would be most helpful for you right now?'
            ]
        };

        const lowerMessage = userMessage.toLowerCase();
        let responseArray = responses.default;

        if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('profession')) {
            responseArray = responses.career;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('develop')) {
            responseArray = responses.skill;
        } else if (lowerMessage.includes('university') || lowerMessage.includes('college') || lowerMessage.includes('school')) {
            responseArray = responses.university;
        } else if (lowerMessage.includes('mentor') || lowerMessage.includes('guide') || lowerMessage.includes('coach')) {
            responseArray = responses.mentors;
        }

        return responseArray[Math.floor(Math.random() * responseArray.length)];
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI response delay
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                type: 'bot',
                text: generateAIResponse(inputValue),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 800);
    };

    const suggestedQuestions = [
        'How do I choose the right career path?',
        'What skills should I develop for tech industry?',
        'Can you help me find a mentor?',
        'Which universities are best for business?'
    ];

    const handleSuggestedQuestion = (question) => {
        setInputValue(question);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/explore')}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Chat Assistant</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your personal career & learning guide</p>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                                message.type === 'user'
                                    ? 'bg-primary-600 text-white rounded-br-none'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                            }`}
                        >
                            <p className="text-sm sm:text-base">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                                message.type === 'user'
                                    ? 'text-primary-100'
                                    : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg rounded-bl-none">
                            <div className="flex gap-2">
                                <Loader className="w-4 h-4 animate-spin text-primary-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">AI is typing...</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (shown when no messages beyond initial) */}
            {messages.length === 1 && !isLoading && (
                <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Suggested questions:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {suggestedQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestedQuestion(question)}
                                className="text-left text-sm p-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                        title="Attach file"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-gray-500 dark:placeholder-gray-400"
                        disabled={isLoading}
                    />
                    
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                        title="Voice input"
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                    
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    AI Chat can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    );
};

export default AIChat;
