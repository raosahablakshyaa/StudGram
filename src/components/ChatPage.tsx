import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, Video, MoreHorizontal, Smile, Paperclip, Users, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  messages: Message[];
}

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '',
      lastMessage: 'Hey! Did you finish the quantum assignment?',
      timestamp: '2m ago',
      unreadCount: 2,
      isOnline: true,
      isGroup: false,
      messages: [
        {
          id: '1',
          senderId: '2',
          senderName: 'Sarah Chen',
          content: 'Hey! Did you finish the quantum assignment?',
          timestamp: '2m ago',
          type: 'text'
        },
        {
          id: '2',
          senderId: '1',
          senderName: user?.name || 'You',
          content: 'Almost done! Just working on the last problem.',
          timestamp: '1m ago',
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      name: 'CS Study Group',
      avatar: '',
      lastMessage: 'Mike: Anyone free for a study session tomorrow?',
      timestamp: '15m ago',
      unreadCount: 5,
      isOnline: false,
      isGroup: true,
      messages: [
        {
          id: '1',
          senderId: '3',
          senderName: 'Mike Rodriguez',
          content: 'Anyone free for a study session tomorrow?',
          timestamp: '15m ago',
          type: 'text'
        },
        {
          id: '2',
          senderId: '4',
          senderName: 'Emma Watson',
          content: 'I\'m available after 3 PM',
          timestamp: '12m ago',
          type: 'text'
        }
      ]
    },
    {
      id: '3',
      name: 'Dr. Johnson (Mentor)',
      avatar: '',
      lastMessage: 'Good work on your last assignment!',
      timestamp: '1h ago',
      unreadCount: 0,
      isOnline: false,
      isGroup: false,
      messages: [
        {
          id: '1',
          senderId: '5',
          senderName: 'Dr. Johnson',
          content: 'Good work on your last assignment!',
          timestamp: '1h ago',
          type: 'text'
        }
      ]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat, chats]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: user?.id || '1',
        senderName: user?.name || 'You',
        content: newMessage,
        timestamp: 'now',
        type: 'text'
      };

      setChats(prevChats => prevChats.map(chat => 
        chat.id === selectedChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              lastMessage: newMessage,
              timestamp: 'now'
            }
          : chat
      ));

      setNewMessage('');
      addNotification({
        type: 'message',
        title: 'Message Sent',
        message: `Message sent to ${chats.find(c => c.id === selectedChat)?.name}`
      });
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Connect with peers and mentors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Chat List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Chats</h2>
                <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        {chat.isGroup ? (
                          <Users className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold">{chat.name.charAt(0)}</span>
                        )}
                      </div>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        {selectedChatData.isGroup ? (
                          <Users className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold">{selectedChatData.name.charAt(0)}</span>
                        )}
                      </div>
                      {selectedChatData.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedChatData.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedChatData.isOnline ? 'Online' : 'Last seen 1h ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChatData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {selectedChatData.isGroup && message.senderId !== user?.id && (
                          <p className="text-xs font-medium mb-1 opacity-75">{message.senderName}</p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};