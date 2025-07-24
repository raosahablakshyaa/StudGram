import React, { useState, useEffect } from 'react';

const Home = () => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [topic, setTopic] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);



  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const PEXELS_API_KEY = 'u7Ks6f46u39aTV7Z3LYl0HoyRnQIEcIzoR6V8ErfxHzPgcvJnl4qruAv';

  const uploadedImages = [
    {
      id: 'cloudinary-1',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/6_photo_sivwr9.avif',
      description: 'Tranquil forest landscape – perfect escape into nature.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-2',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/2photo_e2btzj.jpg',
      description: 'Historic streets with local charm – explore the world.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-3',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/4photo_pfwryf.jpg',
      description: 'Athletes in action – the thrill of sports captured.',
      category: 'sports',
      featured: true,
    },
    {
      id: 'cloudinary-4',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/3_photo_igqaeu.jpg',
      description: 'Early morning mist in a peaceful natural setting.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-5',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784792/1photo_qz11ft.jpg',
      description: 'Golden hour by the sea – a perfect travel memory.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-6',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784771/great-wall-of-china-most-visited-tourist-attraction_ipwq9f.png',
      description: 'The Great Wall of China – history carved in stone.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-7',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784770/Most_Popular_Sports_By_Country_ij4rtp.webp',
      description: 'A world united by sports – most popular games globally.',
      category: 'sports',
      featured: true,
    },
    {
      id: 'cloudinary-8',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784766/pexels-photo-2834917_nizxdy.jpg',
      description: 'Lush greenery beside calm waters – pure natural beauty.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-9',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/INDONESIA_tliqyn.jpg',
      description: 'Vibrant Indonesian culture – a journey of colors.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-10',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/p_wtiakh.webp',
      description: 'Excitement of the game – sports spirit in motion.',
      category: 'sports',
      featured: true,
    },
  ];

  const fetchPhotos = async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);

      const queries = searchTerm ? [searchTerm] : ['nature', 'travel', 'sports'];
      const pexelsPhotos = [];

      for (const query of queries) {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=6&page=1`,
          {
            headers: { Authorization: PEXELS_API_KEY },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formatted = data.photos.map((photo) => ({
          id: `pexels-${photo.id}`,
          author: photo.photographer,
          image: photo.src.landscape,
          description: `${photo.alt || 'Beautiful photo'} – ${query}`,
          category: query,
          featured: false,
        }));

        pexelsPhotos.push(...formatted);
      }

      const combined = [...uploadedImages, ...pexelsPhotos];

      const uniquePhotos = combined.filter(
        (photo, index, self) => index === self.findIndex((p) => p.id === photo.id)
      );

      setPhotos(uniquePhotos);

      const initialLikes = {};
      uniquePhotos.forEach((photo) => {
        initialLikes[photo.id] = {
          liked: false,
          count: Math.floor(Math.random() * 500) + 20,
        };
      });
      setLikedPhotos(initialLikes);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Could not fetch from Pexels. Showing Cloudinary only.');
      setPhotos(uploadedImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const filteredPhotos =
    topic === 'all'
      ? photos
      : photos.filter(
          (photo) =>
            photo.category?.toLowerCase().includes(topic.toLowerCase()) ||
            photo.description.toLowerCase().includes(topic.toLowerCase())
        );

  const toggleLike = (id) => {
    setLikedPhotos((prev) => {
      const current = prev[id];
      return {
        ...prev,
        [id]: {
          liked: !current.liked,
          count: current.count + (current.liked ? -1 : 1),
        },
      };
    });
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    fetchPhotos(newTopic === 'all' ? '' : newTopic);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCommentSubmit = (e, photoId) => {
    e.preventDefault();
    if (!newComment[photoId]) return;

    setComments((prev) => ({
      ...prev,
      [photoId]: [...(prev[photoId] || []), newComment[photoId]],
    }));

    setNewComment((prev) => ({
      ...prev,
      [photoId]: '',
    }));
  };

  const sendMessageToAI = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanedMsg = message.trim().toLowerCase();
  
        if (['hi', 'hi.', 'hi...', 'hello'].includes(cleanedMsg)) {
          resolve('hello 😊 how can I help you?');
        } else if (cleanedMsg.includes('how are you')) {
          resolve('I am fine, thank you! 😊');
        } else if (cleanedMsg.includes('help')) {
          resolve('Please drop your message on the Contact Us page — we’ll get in touch soon!');
        } else if (
          cleanedMsg.includes('weather') ||
          cleanedMsg.includes('whether') || 
          cleanedMsg.includes('how is the weather')
        ) {
          resolve('It’s nice and sunny today ☀️');
        } else if (
          cleanedMsg.includes('not able to login') ||
          cleanedMsg.includes('can\'t login') ||
          cleanedMsg.includes('login issue') ||
          cleanedMsg.includes('unable to login')
        ) {
          resolve('Please check the email or password that you have entered.');
        } else if (
          cleanedMsg === 'thank you' ||
          cleanedMsg === 'thanks' ||
          cleanedMsg === 'thankyou'
        ) {
          resolve('Ok, thank you! 🙏');
        } else if (cleanedMsg.includes('how can i post')) {
          resolve(`Thanks! If you want to create a social media feed like Instagram (where users can post photos with captions), here’s a step-by-step breakdown tailored to your needs — using React for frontend and (optionally) Firebase or Node.js backend.`);
        } else if (cleanedMsg.includes('how can i comment')) {
          resolve(`If you want to add a comment feature like Instagram to your social media app (built with React), here's exactly how you can do it:\n\nFeatures:\n- Users can write and submit comments under each post\n- All comments show up in a list under the post\n- Each comment is tied to a specific post`);
        } else if (
          cleanedMsg.includes('how to increase followers') ||
          cleanedMsg.includes('how can i increase followers')
        ) {
          resolve(`To increase followers on Instagram genuinely and sustainably, you need a mix of smart content strategy, consistency, and engagement. Here's a full breakdown:`);
        } else {
          resolve('This is a predefined response from Adfluence AI.');
        }
      }, 1000);
    });
  };
  

    const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { from: 'user', text: chatInput }]);
    setChatInput('');
    setIsChatLoading(true);

    const aiResponse = await sendMessageToAI(chatInput);
    setChatMessages((prev) => [...prev, { from: 'ai', text: aiResponse }]);
    setIsChatLoading(false);
  };

  const NavItem = ({ href, children, isActive = false, className = '' }) => (
    <a
      href={href}
      className={`transition-all duration-300 hover:text-sky-400 hover:scale-105 transform relative group ${
        isActive ? 'text-sky-400 font-semibold' : isDarkMode ? 'text-gray-300' : 'text-gray-700'
      } ${className}`}
    >
      {children}
      {isActive && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full"></div>
      )}
      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
    </a>
  );

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      <nav
      className={`fixed w-full top-0 left-0 z-50 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800/80 border-gray-700/50 shadow-lg shadow-purple-500/10'
          : 'bg-white/80 border-gray-200/50 shadow-lg shadow-sky-500/10'
      }`}
    >
      {}
      <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
        Adfluence
      </h1>

      {}
      <div className="hidden md:flex items-center space-x-4 text-sm md:text-base">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
            isDarkMode
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <NavItem href="/home" isActive>
          Home
        </NavItem>
        <NavItem href="/messages">Messages</NavItem>
        <NavItem href="/profile">Profile</NavItem>
        <NavItem
          href="/help"
          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isDarkMode
              ? 'bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-sky-100 to-purple-100 hover:from-sky-200 hover:to-purple-200 text-sky-700 shadow-md'
          }`}
        >
          Help
        </NavItem>
        <NavItem
          href="/login"
          className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
            isDarkMode
              ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg'
              : 'bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-700 shadow-md'
          }`}
        >
          Logout
        </NavItem>
      </div>

      {}
      <button
        className="md:hidden text-2xl p-2 focus:outline-none transition-transform"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✖️' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-full left-0 w-full px-6 py-4 border-t mt-2 shadow-md backdrop-blur-md ${
            isDarkMode
              ? 'bg-gray-800/90 border-gray-700 text-white'
              : 'bg-white/90 border-gray-200 text-black'
          } flex flex-col space-y-3 md:hidden`}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-2 w-fit rounded-full self-start transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
              isDarkMode
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <NavItem href="/home" isActive>
            Home
          </NavItem>
          <NavItem href="/messages">Messages</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/help">Help</NavItem>
          <NavItem href="/login">Logout</NavItem>
        </div>
      )}
    </nav>

      <header
        className={`text-white py-16 text-center mt-16 relative overflow-hidden ${
          isDarkMode 
            ? 'bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600' 
            : 'bg-gradient-to-r from-sky-500 via-blue-500 to-purple-600'
        }`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-ping"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-4 animate-fadeInUp">
            Welcome to Adfluence
          </h2>
          <p className="text-lg animate-fadeInUp delay-200 opacity-90">
            Explore curated and live photos of travel, sports, and nature 🌍✨
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-center space-x-3 mb-8 flex-wrap">
          {['All', 'Travel', 'Sports', 'Nature'].map((label) => {
            const value = label.toLowerCase();
            return (
              <button
                key={label}
                onClick={() => handleTopicChange(value)}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  topic === value
                    ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white border-transparent shadow-lg shadow-sky-500/30'
                    : `hover:shadow-lg ${
                        isDarkMode 
                          ? 'bg-gray-800/80 text-gray-300 border-gray-600 hover:bg-gray-700/80 backdrop-blur-sm' 
                          : 'bg-white/80 text-gray-700 border-gray-300 hover:bg-gray-50/80 backdrop-blur-sm'
                      }`
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-sky-500 border-r-purple-500 mx-auto"></div>
              <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border border-sky-300 mx-auto"></div>
            </div>
            <p
              className={`mt-4 text-lg animate-pulse ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Loading amazing photos...
            </p>
          </div>
        )}

        {error && (
          <div
            className={`border rounded-xl p-6 mb-8 text-sm backdrop-blur-sm animate-fadeInUp ${
              isDarkMode 
                ? 'bg-red-900/50 border-red-500/50 text-red-300 shadow-lg shadow-red-500/20' 
                : 'bg-red-50/80 border-red-200/50 text-red-600 shadow-lg shadow-red-500/10'
            }`}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-10">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`rounded-2xl shadow-xl overflow-hidden border transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 backdrop-blur-sm animate-fadeInUp ${
                isDarkMode 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/20' 
                  : 'bg-white/80 border-gray-200/50 shadow-sky-500/20'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {photo.featured && (
                <div
                  className={`text-white px-4 py-2 text-sm font-semibold flex items-center space-x-2 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-sky-600 to-purple-600' 
                      : 'bg-gradient-to-r from-sky-500 to-purple-500'
                  }`}
                >
                  <span className="animate-pulse">⭐</span>
                  <span>Featured</span>
                </div>
              )}
              <div className="relative overflow-hidden group">
                <img
                  src={photo.image}
                  alt={photo.description}
                  className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/800x600/38bdf8/ffffff?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent ${
                    isDarkMode ? '' : ''
                  }`}
                >
                  {photo.author}
                </h3>
                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {photo.description}
                </p>
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium px-4 py-2 rounded-full transform hover:scale-105 ${
                    likedPhotos[photo.id]?.liked 
                      ? 'text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30' 
                      : `${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} hover:bg-red-50 dark:hover:bg-red-900/20`
                  }`}
                >
                  <span className={likedPhotos[photo.id]?.liked ? 'animate-bounce' : ''}>❤️</span>
                  <span>
                    {likedPhotos[photo.id]?.liked ? 'Liked' : 'Like'} ·{' '}
                    {likedPhotos[photo.id]?.count || 0}
                  </span>
                </button>

                <div className="mt-6">
                  <h4
                    className={`text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Comments
                  </h4>
                  <div className="space-y-3 mb-4 max-h-32 overflow-y-auto">
                    {(comments[photo.id] || []).map((comment, idx) => (
                      <div
                        key={idx}
                        className={`text-sm p-3 rounded-lg backdrop-blur-sm animate-fadeInUp ${
                          isDarkMode 
                            ? 'bg-gray-700/50 text-gray-300 border border-gray-600/30' 
                            : 'bg-gray-50/80 text-gray-600 border border-gray-200/50'
                        }`}
                      >
                        💬 {comment}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={(e) => handleCommentSubmit(e, photo.id)}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[photo.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [photo.id]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCommentSubmit(e, photo.id);
                        }
                      }}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300 backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-gray-700/50 border-gray-600/50 text-gray-200 placeholder-gray-400'
                          : 'bg-white/80 border-gray-300/50 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredPhotos.length === 0 && (
          <div
            className={`text-center py-12 animate-fadeInUp ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <p className="text-lg">No photos found for "{topic}". Try a different category!</p>
          </div>
        )}
      </main>

      <footer
        className={`text-center py-8 text-sm border-t backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/50 text-gray-400 border-gray-700/50' 
            : 'bg-white/50 text-gray-500 border-gray-200/50'
        }`}
      >
        <div className="animate-pulse">
          © 2025 Adfluence. Connect. Inspire. Grow. ✨
        </div>
      </footer>

      {}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {isChatOpen && (
          <div
            className={`w-80 max-w-xs backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col transition-all duration-500 transform animate-fadeInUp ${
              isDarkMode 
                ? 'bg-gray-800/90 shadow-purple-500/20 border border-gray-700/50' 
                : 'bg-white/90 shadow-sky-500/20 border border-gray-200/50'
            }`}
            style={{ maxHeight: '32rem' }}
          >
            <header className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                AI Chatbot
              </h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400 font-bold text-xl transition-all duration-300 transform hover:rotate-90"
                aria-label="Close chat"
              >
                ✕
              </button>
            </header>
            <div className="flex-1 overflow-y-auto h-64 mb-4 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-transparent">
              {chatMessages.length === 0 && (
                <div className="text-gray-400 text-sm italic text-center py-8 animate-pulse">
                  Ask me anything! 🤖
                </div>
              )}
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-2xl max-w-[85%] transition-all duration-300 animate-fadeInUp ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-sky-500 to-purple-600 text-white self-end rounded-tr-md shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 self-start rounded-tl-md shadow-md backdrop-blur-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isChatLoading && (
                <div className="text-gray-500 italic text-sm animate-pulse flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span>AI is typing...</span>
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="flex space-x-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300 backdrop-blur-sm dark:bg-gray-700/80 dark:text-gray-200 dark:border-gray-600/50"
                disabled={isChatLoading}
              />
              <button
                type="submit"
                disabled={isChatLoading}
                className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 rounded-full p-4 shadow-2xl text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-400/50 transform hover:scale-110 animate-bounce"
          aria-label="Toggle chatbot"
          title={isChatOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          <span className="text-xl">💬</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-sky-500 {
          scrollbar-color: #0ea5e9 transparent;
        }
        
        .group:hover .group-hover:scale-110 {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Home;


