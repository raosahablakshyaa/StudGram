import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState({});
  const messagesEndRef = useRef(null);
  const [contacts] = useState([
    {
      id: 1,
      name: 'Varun Sharms',
      username: '@emmawilson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg',
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: '2 min ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 2,
      name: 'Harender chhoker',
      username: '@marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for sharing those photos!',
      lastMessageTime: '15 min ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 3,
      name: 'Dhruv Kumar',
      username: '@sophialee',
      avatar: 'https://media.istockphoto.com/id/613557584/photo/portrait-of-a-beautifull-smiling-man.jpg?s=612x612&w=0&k=20&c=hkCg5CrmTKOApePbPOyo1U9GexEfIJOJqoLXJIvcN8E=',
      lastMessage: 'Let’s plan the trip!',
      lastMessageTime: '1 hr ago',
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 4,
      name: 'Rohit',
      username: '@danielk',
      avatar: 'https://thumbs.dreamstime.com/b/portrait-young-handsome-man-white-shirt-outdoor-portrait-young-handsome-man-white-shirt-outdoor-nice-appearance-131934608.jpg',
      lastMessage: 'Catch you later!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 5,
      name: 'Abhinav',
      username: '@avapatel',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Meeting was great!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 6,
      name: 'Lakshya',
      username: '@liamg',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Okay 👍',
      lastMessageTime: 'Just now',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 7,
      name: 'Smith',
      username: '@olivias',
      avatar: 'https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg',
      lastMessage: 'I’ll call you soon.',
      lastMessageTime: '10 min ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 8,
      name: 'Noah',
      username: '@noahb',
      avatar: 'https://www.shutterstock.com/shutterstock/photos/2451544833/display_1500/stock-photo-confident-smiling-middle-aged-business-woman-attorney-years-old-lady-entrepreneur-mature-2451544833.jpg',
      lastMessage: 'Can you send that again?',
      lastMessageTime: '30 min ago',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 9,
      name: 'Isabella Davis',
      username: '@isabellad',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Sounds good to me!',
      lastMessageTime: '2 hrs ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 10,
      name: 'Akash Kumar gautam',
      username: '@jamesm',
      avatar: 'https://i.pinimg.com/474x/a6/54/00/a65400bec578fe36f9b022ee92681fad.jpg',
      lastMessage: 'Will update you later.',
      lastMessageTime: '3 hrs ago',
      unreadCount: 2,
      isOnline: false
    },
    {
      id: 11,
      name: 'Mia Gonzalez',
      username: '@miag',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'LOL 😄',
      lastMessageTime: '5 hrs ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 12,
      name: 'Elijah',
      username: '@elijahmoore',
      avatar: 'https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=',
      lastMessage: 'Meeting starts at 3PM.',
      lastMessageTime: 'Today',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 13,
      name: 'Charlotte Taylor',
      username: '@charltay',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Got it. Thanks!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 14,
      name: 'Williams',
      username: '@williams',
      avatar: '',
      lastMessage: 'Let’s catch up tomorrow.',
      lastMessageTime: '3 days ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 15,
      name: 'Amelia Nguyen',
      username: '@amelian',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'I’ll be offline for a bit.',
      lastMessageTime: '1 week ago',
      unreadCount: 0,
      isOnline: false
    }
  ]);
  useEffect(() => {
    const initialMessages = {};
    contacts.forEach((contact) => {
      initialMessages[contact.id] = [
        {
          id: 1,
          senderId: contact.id,
          text: contact.lastMessage,
          timestamp: new Date(),
          isOwn: false,
        },
      ];
    });
    setMessages(initialMessages);

    const onlineStatus = {};
    contacts.forEach((contact) => {
      onlineStatus[contact.id] = contact.isOnline;
    });
    setIsOnline(onlineStatus);
  }, [contacts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      text: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg],
    }));

    setNewMessage('');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-sky-500 font-medium' : 'text-gray-700 hover:text-sky-500';


  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm border-b px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-2xl font-bold text-sky-500">Studgram</h1>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
          <NavLink to="/home" className={navLinkClass}>Home</NavLink>
          <NavLink to="/messages" className={navLinkClass}>Messages</NavLink>
          <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
          <NavLink to="/help" className="bg-sky-100 hover:bg-sky-200 text-sky-600 px-3 py-1 rounded-md transition">Help</NavLink>
          <NavLink to="/login" className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md transition">Logout</NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button className="sm:hidden text-gray-700" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-3 space-y-2 sm:hidden text-sm">
          <NavLink to="/home" onClick={toggleMenu} className={navLinkClass}>Home</NavLink>
          <NavLink to="/messages" onClick={toggleMenu} className={navLinkClass}>Messages</NavLink>
          <NavLink to="/profile" onClick={toggleMenu} className={navLinkClass}>Profile</NavLink>
          <NavLink to="/help" onClick={toggleMenu} className="bg-sky-100 hover:bg-sky-200 text-sky-600 px-3 py-1 rounded-md transition">Help</NavLink>
          <NavLink to="/login" onClick={toggleMenu} className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md transition">Logout</NavLink>
        </div>
      )}
    </nav>

      {/* Layout */}
      <div className="pt-20 h-[calc(100vh-5rem)] flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-1/3 bg-white border-r border-gray-200 flex flex-col max-h-[50vh] sm:max-h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts
              .filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-sky-50 transition ${
                    selectedContact?.id === contact.id ? 'bg-sky-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOnline[contact.id] && (
                      <span className="absolute left-8 bottom-0 bg-green-400 w-2.5 h-2.5 rounded-full border border-white"></span>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">{contact.name}</h3>
                        <span className="text-xs text-gray-400">{contact.lastMessageTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 truncate w-[80%]">
                          {contact.lastMessage}
                        </p>
                        {contact.unreadCount > 0 && (
                          <span className="bg-sky-500 text-white text-xs rounded-full px-2 ml-2">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">
                    {isOnline[selectedContact.id] ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-blue-50">
                {messages[selectedContact.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-[80%] sm:max-w-xs ${
                        msg.isOwn
                          ? 'bg-sky-500 text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="block text-xs mt-1 opacity-75">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 disabled:opacity-50 text-sm"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm sm:text-base px-4 text-center">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
