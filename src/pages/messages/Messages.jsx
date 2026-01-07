import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, ArrowLeft, Phone, Video, MoreVertical, Smile, Image as ImageIcon, Paperclip } from 'lucide-react';
import messagesData from '../../data/messages.json';
import usersData from '../../data/users.json';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/Loader';

/**
 * Messages Page
 * Complete chat interface with conversation list and message window
 */
const Messages = () => {
    const { currentUser } = useAuth();
    const [selectedConversationId, setSelectedConversationId] = useState(messagesData[0]?.id || null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileChat, setShowMobileChat] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const [messageStatuses, setMessageStatuses] = useState({});
    const messagesEndRef = useRef(null);

    const selectedConversation = messagesData.find(c => c.id === selectedConversationId);
    const otherParticipantId = selectedConversation?.participants.find(id => id !== currentUser?.id);
    const otherParticipant = usersData.find(u => u.id === otherParticipantId);

    // Filter conversations by search
    const filteredConversations = messagesData.filter(conversation => {
        const otherId = conversation.participants.find(id => id !== currentUser?.id);
        const other = usersData.find(u => u.id === otherId);
        return other?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
               conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation?.messages]);

    // Format time ago
    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        
        return date.toLocaleDateString();
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            // Simulate sending message
            const newMessage = {
                id: Math.max(...selectedConversation.messages.map(m => m.id), 0) + 1,
                senderId: currentUser?.id,
                text: messageText,
                timestamp: new Date().toISOString()
            };
            
            // Simulate message status progression
            setMessageStatuses(prev => ({
                ...prev,
                [newMessage.id]: 'sending'
            }));

            setTimeout(() => {
                setMessageStatuses(prev => ({
                    ...prev,
                    [newMessage.id]: 'delivered'
                }));
            }, 500);

            setTimeout(() => {
                setMessageStatuses(prev => ({
                    ...prev,
                    [newMessage.id]: 'read'
                }));
            }, 1500);

            setMessageText('');
        }
    };

    const getMessageStatus = (messageId) => {
        return messageStatuses[messageId] || 'read';
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-150px)]">
            <div className="flex h-full">
                {/* Conversation List - Full width on mobile, sidebar on desktop */}
                <div className={`${showMobileChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 lg:w-96 flex-col border-r border-gray-200 dark:border-gray-700`}>
                    {/* Header */}
                    <div className="p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 px-1">Messages</h2>
                        <div className="relative px-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => {
                                const otherId = conversation.participants.find(id => id !== currentUser?.id);
                                const other = usersData.find(u => u.id === otherId);
                                const isSelected = selectedConversationId === conversation.id;

                                return (
                                    <button
                                        key={conversation.id}
                                        onClick={() => {
                                            setSelectedConversationId(conversation.id);
                                            setShowMobileChat(true);
                                        }}
                                        className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-b-0 ${
                                            isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                        }`}
                                    >
                                        <div className="relative flex-shrink-0">
                                            <Avatar src={other?.avatar} alt={other?.name} size="md" sm:size="lg" online={other?.online} />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center justify-between mb-1 gap-1">
                                                <p className={`text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate ${
                                                    conversation.unread ? 'font-bold' : ''
                                                }`}>
                                                    {other?.name}
                                                </p>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                    {formatTimeAgo(conversation.timestamp)}
                                                </span>
                                            </div>
                                            <p className={`text-xs sm:text-sm truncate ${
                                                conversation.unread
                                                    ? 'text-gray-900 dark:text-gray-200 font-medium'
                                                    : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {conversation.lastMessage}
                                            </p>
                                        </div>
                                        {conversation.unread && (
                                            <span className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></span>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="p-4 sm:p-8 text-center">
                                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No conversations found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className={`${showMobileChat ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
                    {selectedConversation && otherParticipant ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 gap-2">
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    <button
                                        onClick={() => setShowMobileChat(false)}
                                        className="md:hidden p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex-shrink-0"
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} size="md" sm:size="lg" online={otherParticipant.online} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">{otherParticipant.name}</p>
                                        <p className={`text-xs ${
                                            otherParticipant.online 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                            {otherParticipant.online ? 'Online' : 'Active 2h ago'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                    <button className="hidden sm:block p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <button className="hidden sm:block p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <button className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin">
                                {selectedConversation.messages.map((message) => {
                                    const isSent = message.senderId === currentUser?.id;
                                    const sender = usersData.find(u => u.id === message.senderId);
                                    const status = getMessageStatus(message.id);

                                    return (
                                        <div key={message.id} className={`flex gap-1 sm:gap-2 ${isSent ? 'flex-row-reverse' : ''}`}>
                                            {!isSent && <Avatar src={sender?.avatar} alt={sender?.name} size="xs" sm:size="sm" />}
                                            <div className={`flex flex-col ${isSent ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-3 sm:px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm break-words text-sm ${
                                                    isSent
                                                        ? 'bg-primary-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                }`}>
                                                    <p>{message.text}</p>
                                                </div>
                                                <div className={`flex items-center gap-1 mt-1 text-xs ${
                                                    isSent
                                                        ? 'text-gray-500 dark:text-gray-400'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {isSent && (
                                                        <span className="ml-1">
                                                            {status === 'sending' && '⏱️'}
                                                            {status === 'delivered' && '✓'}
                                                            {status === 'read' && '✓✓'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Typing Indicator */}
                                {typingUsers.length > 0 && (
                                    <div className="flex gap-1 sm:gap-2">
                                        <Avatar src={otherParticipant?.avatar} alt={otherParticipant?.name} size="xs" sm:size="sm" />
                                        <div className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-2 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                <div className="flex gap-1 sm:gap-2 items-end">
                                    <button type="button" className="hidden sm:block p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0">
                                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <button type="button" className="hidden sm:block p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0">
                                        <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                    <div className="flex-1 flex gap-1 sm:gap-2 min-w-0">
                                        <input
                                            type="text"
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Message..."
                                            className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-0"
                                        />
                                        <button type="button" className="hidden sm:block p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0">
                                            <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!messageText.trim()}
                                        className="p-1.5 sm:p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                                        title="Send message"
                                    >
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full p-4">
                            <EmptyState
                                title="No Conversation Selected"
                                description="Select a conversation from the list to start messaging"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
