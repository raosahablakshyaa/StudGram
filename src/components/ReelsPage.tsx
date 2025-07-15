import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, MoreHorizontal, Plus, User, UserPlus, UserCheck, X, Trophy, Award, BookOpen, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface ReelUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  university: string;
  major: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  bio: string;
  achievements: Achievement[];
  topTopics: string[];
  weakTopics: string[];
  joinDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'project' | 'certification' | 'competition' | 'skill';
  date: string;
  verified: boolean;
}

interface Reel {
  id: string;
  user: ReelUser;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
  timestamp: string;
  duration: string;
}

export const ReelsPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<ReelUser | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  // Fetch reels data from multiple APIs
  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        
        // Fetch random users from JSONPlaceholder
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        
        // Fetch posts for content
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();
        
        // Fetch photos for thumbnails
        const photosResponse = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');
        const photos = await photosResponse.json();

        // Create mock reels data combining API data
        const mockReels: Reel[] = photos.slice(0, 15).map((photo: any, index: number) => {
          const apiUser = users[index % users.length];
          const post = posts[index];
          
          const reelUser: ReelUser = {
            id: apiUser.id.toString(),
            name: apiUser.name,
            username: apiUser.username.toLowerCase(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.username}`,
            university: `${apiUser.address.city} University`,
            major: ['Computer Science', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'Literature', 'Engineering'][index % 7],
            followers: Math.floor(Math.random() * 5000) + 100,
            following: Math.floor(Math.random() * 1000) + 50,
            isFollowing: Math.random() > 0.7,
            bio: `${apiUser.company.catchPhrase} | Passionate about learning and sharing knowledge.`,
            joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
            topTopics: ['Machine Learning', 'Data Structures', 'Physics', 'Calculus'].slice(0, Math.floor(Math.random() * 3) + 1),
            weakTopics: ['Organic Chemistry', 'Statistics', 'Literature'].slice(0, Math.floor(Math.random() * 2) + 1),
            achievements: [
              {
                id: '1',
                title: 'Academic Excellence',
                description: 'Achieved top 5% in semester exams',
                category: 'academic',
                date: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28)).toISOString(),
                verified: Math.random() > 0.5
              },
              {
                id: '2',
                title: 'Project Completion',
                description: 'Successfully completed final year project',
                category: 'project',
                date: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28)).toISOString(),
                verified: Math.random() > 0.3
              }
            ].slice(0, Math.floor(Math.random() * 3) + 1)
          };

          return {
            id: photo.id.toString(),
            user: reelUser,
            title: post.title.split(' ').slice(0, 4).join(' '),
            description: `${post.body.slice(0, 100)}... #StudyTips #Learning #${reelUser.major.replace(' ', '')}`,
            videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_${(index % 5) + 1}280x720_1mb.mp4`,
            thumbnail: photo.url,
            likes: Math.floor(Math.random() * 1000) + 50,
            comments: Math.floor(Math.random() * 100) + 10,
            shares: Math.floor(Math.random() * 50) + 5,
            isLiked: Math.random() > 0.6,
            isBookmarked: Math.random() > 0.8,
            tags: [`#${reelUser.major.replace(' ', '')}`, '#StudyTips', '#Learning', '#Education'],
            timestamp: `${Math.floor(Math.random() * 24) + 1}h ago`,
            duration: `${Math.floor(Math.random() * 50) + 10}s`
          };
        });

        setReels(mockReels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reels:', error);
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleLike = (reelId: string) => {
    setReels(prevReels => prevReels.map(reel => 
      reel.id === reelId 
        ? { ...reel, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1, isLiked: !reel.isLiked }
        : reel
    ));
    
    const reel = reels.find(r => r.id === reelId);
    if (reel) {
      addNotification({
        type: 'like',
        title: 'Reel Liked',
        message: `You liked a reel by ${reel.user.name}`
      });
    }
  };

  const handleFollow = (userId: string) => {
    setReels(prevReels => prevReels.map(reel => 
      reel.user.id === userId 
        ? { 
            ...reel, 
            user: { 
              ...reel.user, 
              isFollowing: !reel.user.isFollowing,
              followers: reel.user.isFollowing ? reel.user.followers - 1 : reel.user.followers + 1
            }
          }
        : reel
    ));

    const reel = reels.find(r => r.user.id === userId);
    if (reel) {
      addNotification({
        type: 'follow',
        title: reel.user.isFollowing ? 'Unfollowed' : 'Following',
        message: `You ${reel.user.isFollowing ? 'unfollowed' : 'started following'} ${reel.user.name}`
      });
    }
  };

  const handleBookmark = (reelId: string) => {
    setReels(prevReels => prevReels.map(reel => 
      reel.id === reelId 
        ? { ...reel, isBookmarked: !reel.isBookmarked }
        : reel
    ));
    
    addNotification({
      type: 'message',
      title: 'Reel Bookmarked',
      message: 'Reel saved to your bookmarks'
    });
  };

  const handleShare = (reel: Reel) => {
    addNotification({
      type: 'message',
      title: 'Reel Shared',
      message: `You shared "${reel.title}" by ${reel.user.name}`
    });
  };

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    } else if (direction === 'down' && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    }
  };

  const openUserProfile = (user: ReelUser) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return BookOpen;
      case 'certification': return Award;
      case 'competition': return Trophy;
      case 'project': return Star;
      default: return Trophy;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'certification': return 'bg-green-100 text-green-800';
      case 'competition': return 'bg-yellow-100 text-yellow-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg">No reels available</p>
        </div>
      </div>
    );
  }

  const currentReel = reels[currentReelIndex];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Mobile-style full-screen video player */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="relative w-full max-w-md h-full bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Placeholder with Image */}
          <div 
            className="w-full h-full bg-cover bg-center relative cursor-pointer group"
            style={{ backgroundImage: `url(${currentReel.thumbnail})` }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Play/Pause overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-black/60 rounded-full flex items-center justify-center animate-pulse backdrop-blur-sm">
                  <Play className="w-10 h-10 text-white ml-2" />
                </div>
              </div>
            )}

            {/* Duration badge */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              {currentReel.duration}
            </div>
          </div>

          {/* Top overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-white z-10">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold">Study Reels</h2>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
            <div className="flex items-end justify-between">
              <div className="flex-1 pr-4">
                {/* Author info */}
                <div className="flex items-center space-x-3 mb-3">
                  <button
                    onClick={() => openUserProfile(currentReel.user)}
                    className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-1 transition-colors"
                  >
                    <img
                      src={currentReel.user.avatar}
                      alt={currentReel.user.name}
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">@{currentReel.user.username}</h3>
                      <p className="text-xs text-gray-300">{currentReel.user.major} • {currentReel.user.university}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleFollow(currentReel.user.id)}
                    className={`px-4 py-1 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${
                      currentReel.user.isFollowing
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {currentReel.user.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <h4 className="font-semibold text-sm mb-1">{currentReel.title}</h4>
                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">{currentReel.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {currentReel.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleLike(currentReel.id)}
                  className="flex flex-col items-center space-y-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                    currentReel.isLiked ? 'bg-red-500' : 'bg-black/50 hover:bg-black/70'
                  }`}>
                    <Heart className={`w-6 h-6 transition-all ${currentReel.isLiked ? 'text-white fill-current animate-pulse' : 'text-white'}`} />
                  </div>
                  <span className="text-xs font-medium">{currentReel.likes}</span>
                </button>

                <button className="flex flex-col items-center space-y-1 transition-transform hover:scale-110 active:scale-95">
                  <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium">{currentReel.comments}</span>
                </button>

                <button
                  onClick={() => handleShare(currentReel)}
                  className="flex flex-col items-center space-y-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium">{currentReel.shares}</span>
                </button>

                <button
                  onClick={() => handleBookmark(currentReel.id)}
                  className="flex flex-col items-center space-y-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                    currentReel.isBookmarked ? 'bg-yellow-500' : 'bg-black/50 hover:bg-black/70'
                  }`}>
                    <Bookmark className={`w-6 h-6 transition-all ${currentReel.isBookmarked ? 'text-white fill-current' : 'text-white'}`} />
                  </div>
                </button>

                <button
                  onClick={() => openUserProfile(currentReel.user)}
                  className="flex flex-col items-center space-y-1 transition-transform hover:scale-110 active:scale-95"
                >
                  <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            <button
              onClick={() => handleScroll('up')}
              disabled={currentReelIndex === 0}
              className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all hover:scale-110 hover:bg-black/70"
            >
              ↑
            </button>
            <button
              onClick={() => handleScroll('down')}
              disabled={currentReelIndex === reels.length - 1}
              className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white disabled:opacity-30 transition-all hover:scale-110 hover:bg-black/70"
            >
              ↓
            </button>
          </div>

          {/* Volume control */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-16 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-black/70"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Progress indicator */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {reels.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentReelIndex ? 'bg-white w-8' : 'bg-white/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Create Reel Button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all z-20 animate-pulse">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all animate-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
              <button
                onClick={() => setShowUserProfile(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full border-4 border-white/20"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                  <p className="text-blue-100">@{selectedUser.username}</p>
                  <p className="text-sm text-blue-200">{selectedUser.major} • {selectedUser.university}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-6">
                  <div className="text-center">
                    <p className="text-xl font-bold">{selectedUser.followers}</p>
                    <p className="text-xs text-blue-200">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">{selectedUser.following}</p>
                    <p className="text-xs text-blue-200">Following</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleFollow(selectedUser.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                    selectedUser.isFollowing
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {selectedUser.isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{selectedUser.isFollowing ? 'Following' : 'Follow'}</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{selectedUser.bio}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Joined {new Date(selectedUser.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* Study Topics */}
              <div className="grid grid-cols-1 gap-4">
                {/* Strong Topics */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Strong Topics</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.topTopics.map((topic, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weak Topics */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Needs Help With</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.weakTopics.map((topic, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>Achievements ({selectedUser.achievements.length})</span>
                </h3>
                <div className="space-y-3">
                  {selectedUser.achievements.map((achievement) => {
                    const Icon = getCategoryIcon(achievement.category);
                    return (
                      <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                              <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {achievement.verified && (
                            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              <Award className="w-3 h-3" />
                              <span>Verified</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(achievement.category)}`}>
                          {achievement.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};