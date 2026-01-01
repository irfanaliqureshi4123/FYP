import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';
import messagesData from '../../data/messages.json';
import usersData from '../../data/users.json';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/Loader';

/**
 * Messages Page
 * Chat interface with conversation list and message window
 */
const Messages = () => {
    const { currentUser } = useAuth();
    const [selectedConversationId, setSelectedConversationId] = useState(messagesData[0]?.id || null);
    const [messageText, setMessageText] = useState('');

    const selectedConversation = messagesData.find(c => c.id === selectedConversationId);
    const otherParticipantId = selectedConversation?.participants.find(id => id !== currentUser?.id);
    const otherParticipant = usersData.find(u => u.id === otherParticipantId);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (messageText.trim()) {
            console.log('Sending message:', messageText);
            setMessageText('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-180px)] md:h-[calc(100vh-150px)]">
            <div className="flex h-full">
                {/* Conversation List - Full width on mobile, sidebar on desktop */}
                <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search messages..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                            />
                        </div>
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {messagesData.map((conversation) => {
                            const otherId = conversation.participants.find(id => id !== currentUser?.id);
                            const other = usersData.find(u => u.id === otherId);

                            return (
                                <button
                                    key={conversation.id}
                                    onClick={() => setSelectedConversationId(conversation.id)}
                                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedConversationId === conversation.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                        }`}
                                >
                                    <Avatar src={other?.avatar} alt={other?.name} size="lg" />
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                {other?.name}
                                            </p>
                                            {conversation.unread && (
                                                <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="hidden md:flex flex-col flex-1">
                    {selectedConversation && otherParticipant ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                                <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} size="lg" online />
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">{otherParticipant.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{otherParticipant.title}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                                {selectedConversation.messages.map((message) => {
                                    const isSent = message.senderId === currentUser?.id;
                                    const sender = usersData.find(u => u.id === message.senderId);

                                    return (
                                        <div key={message.id} className={`flex gap-3 ${isSent ? 'flex-row-reverse' : ''}`}>
                                            <Avatar src={sender?.avatar} alt={sender?.name} size="sm" />
                                            <div className={`flex flex-col max-w-xs ${isSent ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-4 py-2 rounded-2xl ${isSent
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    }`}>
                                                    <p className="text-sm">{message.text}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!messageText.trim()}
                                        className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <EmptyState
                            title="No Conversation Selected"
                            description="Select a conversation from the list to start messaging"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
