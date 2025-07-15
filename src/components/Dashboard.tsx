import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Plus, Users, BookOpen, Trophy, Clock, Award, Star, Target, Brain, Lightbulb, Medal, Camera, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

export const Dashboard: React.FC = () => {
  const { user, followUser, unfollowUser } = useAuth();
  const { addNotification } = useNotifications();
  const [newPost, setNewPost] = useState('');
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    category: 'academic' as const,
    studyTopic: ''
  });

  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Sarah Chen',
      avatar: '',
      university: 'MIT',
      major: 'Physics',
      type: 'achievement',
      content: 'Just completed my Quantum Mechanics final project! 🎉 Built a simulation showing wave-particle duality. So proud of this milestone!',
      achievement: {
        title: 'Quantum Mechanics Project Completed',
        category: 'academic',
        verified: true
      },
      likes: 45,
      comments: 12,
      shares: 6,
      timestamp: '2h ago',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: '2',
      author: 'Mike Rodriguez',
      avatar: '',
      university: 'Stanford',
      major: 'Computer Science',
      type: 'study',
      content: 'Spent 6 hours today mastering Dynamic Programming! 💪 Finally understood the concept of memoization. Looking for study partners for algorithms practice.',
      studySession: {
        topic: 'Dynamic Programming',
        duration: '6 hours',
        difficulty: 'Advanced'
      },
      likes: 28,
      comments: 8,
      shares: 3,
      timestamp: '4h ago',
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      author: 'Emma Watson',
      avatar: '',
      university: 'Harvard',
      major: 'Literature',
      type: 'achievement',
      content: 'Won 1st place in the University Literature Competition! 🏆 My analysis of modern poetry techniques paid off. Thank you to everyone who supported me!',
      achievement: {
        title: 'Literature Competition Winner',
        category: 'competition',
        verified: true
      },
      likes: 67,
      comments: 18,
      shares: 12,
      timestamp: '6h ago',
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '4',
      author: 'Alex Johnson',
      avatar: '',
      university: 'Caltech',
      major: 'Chemistry',
      type: 'help',
      content: 'Struggling with Organic Chemistry reactions 😅 Specifically having trouble with nucleophilic substitutions. Any tips or study resources would be greatly appreciated!',
      helpRequest: {
        topic: 'Organic Chemistry',
        specificArea: 'Nucleophilic Substitutions',
        urgency: 'medium'
      },
      likes: 15,
      comments: 24,
      shares: 2,
      timestamp: '8h ago',
      isLiked: false,
      isBookmarked: false
    }
  ]);

  const studyStats = [
    { icon: BookOpen, label: 'Study Hours', value: '124h', color: 'bg-blue-500' },
    { icon: Users, label: 'Study Groups', value: '8', color: 'bg-green-500' },
    { icon: Trophy, label: 'Achievements', value: '12', color: 'bg-yellow-500' },
    { icon: Clock, label: 'Streak', value: '15d', color: 'bg-purple-500' }
  ];

  const postTypes = [
    { id: 'general', label: 'General Post', icon: MessageCircle, color: 'bg-blue-500' },
    { id: 'achievement', label: 'Achievement', icon: Trophy, color: 'bg-yellow-500' },
    { id: 'study', label: 'Study Session', icon: BookOpen, color: 'bg-green-500' },
    { id: 'help', label: 'Need Help', icon: Target, color: 'bg-red-500' }
  ];

  const [selectedPostType, setSelectedPostType] = useState('general');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        author: user?.name || 'Anonymous',
        avatar: user?.avatar || '',
        university: user?.university || '',
        major: user?.major || '',
        type: selectedPostType,
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'now',
        isLiked: false,
        isBookmarked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setSelectedPostType('general');
      addNotification({
        type: 'message',
        title: 'Post Created',
        message: 'Your post has been shared with the community!'
      });
    }
  };

  const handleCreateAchievement = () => {
    if (achievementForm.title && achievementForm.description) {
      const achievementPost = {
        id: Date.now().toString(),
        author: user?.name || 'Anonymous',
        avatar: user?.avatar || '',
        university: user?.university || '',
        major: user?.major || '',
        type: 'achievement',
        content: `🎉 ${achievementForm.description}`,
        achievement: {
          title: achievementForm.title,
          category: achievementForm.category,
          verified: false
        },
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'now',
        isLiked: false,
        isBookmarked: false
      };
      
      setPosts([achievementPost, ...posts]);
      setShowAchievementModal(false);
      setAchievementForm({
        title: '',
        description: '',
        category: 'academic',
        studyTopic: ''
      });
      
      addNotification({
        type: 'message',
        title: 'Achievement Shared!',
        message: 'Your achievement has been posted to the community!'
      });
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return Trophy;
      case 'study': return BookOpen;
      case 'help': return Target;
      default: return MessageCircle;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      case 'study': return 'text-green-600 bg-green-100';
      case 'help': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Let's continue your learning journey</p>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {studyStats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{user?.name?.charAt(0)}</span>
                </div>
                <input
                  type="text"
                  placeholder="Share your thoughts, achievements, or ask for help..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Post Type Selection */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {postTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedPostType(type.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedPostType === type.id
                            ? `${type.color} text-white shadow-md`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAchievementModal(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105"
                  >
                    <Medal className="w-4 h-4" />
                    <span>Add Achievement</span>
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => {
              const PostIcon = getPostTypeIcon(post.type);
              return (
                <div key={post.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{post.author.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <p className="text-sm text-gray-500">{post.major} • {post.university}</p>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                        <PostIcon className="w-3 h-3" />
                        <span className="capitalize">{post.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  {post.achievement && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">{post.achievement.title}</span>
                        {post.achievement.verified && (
                          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            <Award className="w-3 h-3" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full capitalize">
                        {post.achievement.category}
                      </span>
                    </div>
                  )}

                  {/* Study Session Info */}
                  {post.studySession && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">{post.studySession.topic}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-green-700">
                          <span>⏱️ {post.studySession.duration}</span>
                          <span className="bg-green-200 px-2 py-1 rounded-full">{post.studySession.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Help Request */}
                  {post.helpRequest && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">Need Help: {post.helpRequest.topic}</span>
                      </div>
                      <p className="text-sm text-red-700 mb-2">{post.helpRequest.specificArea}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        post.helpRequest.urgency === 'high' ? 'bg-red-200 text-red-800' :
                        post.helpRequest.urgency === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {post.helpRequest.urgency} priority
                      </span>
                    </div>
                  )}

                  <p className="text-gray-700 mb-4">{post.content}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`transition-colors ${
                        post.isBookmarked ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['#QuantumPhysics', '#DataStructures', '#MachineLearning', '#StudyTips', '#ExamPrep'].map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <span className="text-blue-600 font-medium">{topic}</span>
                    <span className="text-xs text-gray-500">{Math.floor(Math.random() * 1000) + 100} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Groups */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Active Study Groups</h3>
              <div className="space-y-3">
                {[
                  { name: 'CS50 Study Group', members: 24, active: true },
                  { name: 'Calculus Help', members: 18, active: false },
                  { name: 'Physics Lab Partners', members: 12, active: true },
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{group.name}</p>
                        <p className="text-sm text-gray-500">{group.members} members</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Join</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { user: 'Sarah C.', achievement: 'Completed Quantum Physics', icon: Trophy, color: 'text-yellow-500' },
                  { user: 'Mike R.', achievement: 'Algorithm Master', icon: Award, color: 'text-blue-500' },
                  { user: 'Emma W.', achievement: 'Literature Champion', icon: Medal, color: 'text-purple-500' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.user}</p>
                      <p className="text-xs text-gray-500">{item.achievement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Modal */}
        {showAchievementModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Your Achievement</h3>
                <button
                  onClick={() => setShowAchievementModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Title</label>
                  <input
                    type="text"
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm({...achievementForm, title: e.target.value})}
                    placeholder="e.g., Completed Machine Learning Course"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
                    placeholder="Tell us about your achievement..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={achievementForm.category}
                    onChange={(e) => setAchievementForm({...achievementForm, category: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="academic">Academic</option>
                    <option value="project">Project</option>
                    <option value="certification">Certification</option>
                    <option value="competition">Competition</option>
                    <option value="skill">Skill</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    onClick={() => setShowAchievementModal(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAchievement}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Share Achievement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};