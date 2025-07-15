import React, { useState } from 'react';
import { Camera, Edit, Settings, Bell, Shield, CreditCard, LogOut, Save, X, Plus, Trash2, Brain, Target, Star, BookOpen, Trophy, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    university: user?.university || '',
    major: user?.major || '',
    year: user?.year || ''
  });

  // Study Topics Management
  const [topTopics, setTopTopics] = useState(user?.topTopics || ['Machine Learning', 'Data Structures', 'Physics']);
  const [weakTopics, setWeakTopics] = useState(user?.weakTopics || ['Organic Chemistry', 'Calculus', 'Statistics']);
  const [newTopTopic, setNewTopTopic] = useState('');
  const [newWeakTopic, setNewWeakTopic] = useState('');
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [topicModalType, setTopicModalType] = useState<'top' | 'weak'>('top');

  // Achievements
  const [achievements] = useState([
    {
      id: '1',
      title: 'Machine Learning Certification',
      description: 'Completed Stanford\'s Machine Learning Course with 95% score',
      category: 'certification',
      date: '2024-01-15',
      verified: true
    },
    {
      id: '2',
      title: 'Hackathon Winner',
      description: 'Won 1st place in University Tech Hackathon',
      category: 'competition',
      date: '2024-02-20',
      verified: true
    },
    {
      id: '3',
      title: 'Research Paper Published',
      description: 'Published paper on Neural Networks in IEEE conference',
      category: 'academic',
      date: '2024-03-10',
      verified: false
    }
  ]);

  const handleSave = () => {
    updateUser({
      ...editForm,
      topTopics,
      weakTopics
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      bio: user?.bio || '',
      university: user?.university || '',
      major: user?.major || '',
      year: user?.year || ''
    });
    setTopTopics(user?.topTopics || []);
    setWeakTopics(user?.weakTopics || []);
    setIsEditing(false);
  };

  const addTopic = (type: 'top' | 'weak') => {
    const topic = type === 'top' ? newTopTopic : newWeakTopic;
    if (topic.trim()) {
      if (type === 'top') {
        setTopTopics([...topTopics, topic.trim()]);
        setNewTopTopic('');
      } else {
        setWeakTopics([...weakTopics, topic.trim()]);
        setNewWeakTopic('');
      }
      setShowTopicModal(false);
    }
  };

  const removeTopic = (type: 'top' | 'weak', index: number) => {
    if (type === 'top') {
      setTopTopics(topTopics.filter((_, i) => i !== index));
    } else {
      setWeakTopics(weakTopics.filter((_, i) => i !== index));
    }
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

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Basic Profile Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{user?.name?.charAt(0)}</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-white border-2 border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              {user?.isPremium && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-1">{user?.university}</p>
            <p className="text-gray-500 text-sm">{user?.major} • {user?.year}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                <input
                  type="text"
                  value={editForm.university}
                  onChange={(e) => setEditForm({...editForm, university: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                <input
                  type="text"
                  value={editForm.major}
                  onChange={(e) => setEditForm({...editForm, major: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">About</h4>
              <p className="text-gray-600">{user?.bio}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Followers</h4>
                <p className="text-2xl font-bold text-blue-600">{user?.followers?.length || 0}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Following</h4>
                <p className="text-2xl font-bold text-purple-600">{user?.following?.length || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Study Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Topics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Strong Topics</h3>
            </div>
            {isEditing && (
              <button
                onClick={() => {
                  setTopicModalType('top');
                  setShowTopicModal(true);
                }}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {topTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <span className="text-green-800 font-medium">{topic}</span>
                {isEditing && (
                  <button
                    onClick={() => removeTopic('top', index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {topTopics.length === 0 && (
              <p className="text-gray-500 text-center py-4">No strong topics added yet</p>
            )}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Need Help With</h3>
            </div>
            {isEditing && (
              <button
                onClick={() => {
                  setTopicModalType('weak');
                  setShowTopicModal(true);
                }}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-2">
            {weakTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <span className="text-red-800 font-medium">{topic}</span>
                {isEditing && (
                  <button
                    onClick={() => removeTopic('weak', index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {weakTopics.length === 0 && (
              <p className="text-gray-500 text-center py-4">No topics added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Achievements</h3>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {achievements.length} Achievements
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = getCategoryIcon(achievement.category);
            return (
              <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
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
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(achievement.category)}`}>
                  {achievement.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No notifications yet</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  notification.read
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold mb-6">Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications for messages and updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Privacy</h4>
                <p className="text-sm text-gray-500">Control who can see your profile and posts</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-medium text-gray-900">Billing</h4>
                <p className="text-sm text-gray-500">Manage your subscription and payment methods</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-medium text-red-900">Sign Out</h4>
                <p className="text-sm text-red-500">Sign out of your account</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and study preferences</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-lg p-1">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'notifications', label: 'Notifications' },
              { id: 'settings', label: 'Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'settings' && renderSettingsTab()}

        {/* Topic Modal */}
        {showTopicModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Add {topicModalType === 'top' ? 'Strong Topic' : 'Topic You Need Help With'}
                </h3>
                <button
                  onClick={() => setShowTopicModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={topicModalType === 'top' ? newTopTopic : newWeakTopic}
                onChange={(e) => topicModalType === 'top' ? setNewTopTopic(e.target.value) : setNewWeakTopic(e.target.value)}
                placeholder="Enter topic name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                onKeyPress={(e) => e.key === 'Enter' && addTopic(topicModalType)}
              />
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowTopicModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addTopic(topicModalType)}
                  className={`flex-1 py-2 text-white rounded-lg transition-colors ${
                    topicModalType === 'top' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  Add Topic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};