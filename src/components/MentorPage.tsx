import React, { useState } from 'react';
import { Star, MessageCircle, Video, Calendar, Search, Filter, Clock, Award, BookOpen, Users, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  university: string;
  subjects: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  isOnline: boolean;
  responseTime: string;
  experience: string;
  languages: string[];
  specialties: string[];
  bio: string;
  totalStudents: number;
  sessionsCompleted: number;
}

export const MentorPage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [mentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: '',
      title: 'Physics Professor',
      university: 'MIT',
      subjects: ['Physics', 'Quantum Mechanics', 'Thermodynamics'],
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      isOnline: true,
      responseTime: '< 1 hour',
      experience: '8+ years',
      languages: ['English', 'Spanish'],
      specialties: ['Quantum Physics', 'Research Methods', 'Exam Preparation'],
      bio: 'PhD in Quantum Physics from MIT. Specialized in helping students understand complex physics concepts through interactive teaching methods.',
      totalStudents: 340,
      sessionsCompleted: 892
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      avatar: '',
      title: 'Computer Science Expert',
      university: 'Stanford',
      subjects: ['Computer Science', 'Algorithms', 'Data Structures'],
      rating: 4.8,
      reviews: 93,
      hourlyRate: 40,
      isOnline: false,
      responseTime: '< 2 hours',
      experience: '6+ years',
      languages: ['English', 'Mandarin'],
      specialties: ['Machine Learning', 'Software Engineering', 'Technical Interviews'],
      bio: 'Senior Software Engineer at Google with PhD in CS. Expertise in helping students with coding interviews and algorithm design.',
      totalStudents: 275,
      sessionsCompleted: 654
    },
    {
      id: '3',
      name: 'Dr. Rohit godara',
      avatar: '',
      title: 'Mathematics Specialist',
      university: 'Harvard',
      subjects: ['Mathematics', 'Calculus', 'Statistics'],
      rating: 4.9,
      reviews: 156,
      hourlyRate: 38,
      isOnline: true,
      responseTime: '< 30 min',
      experience: '10+ years',
      languages: ['English', 'Spanish', 'French'],
      specialties: ['Advanced Calculus', 'Statistical Analysis', 'Research Methods'],
      bio: 'Mathematics Professor with extensive experience in tutoring students from beginner to advanced levels.',
      totalStudents: 420,
      sessionsCompleted: 1250
    },
    {
      id: '4',
      name: 'Dr. Lakshya yadav',
      avatar: '',
      title: 'Chemistry Expert',
      university: 'Caltech',
      subjects: ['Chemistry', 'Organic Chemistry', 'Biochemistry'],
      rating: 4.7,
      reviews: 84,
      hourlyRate: 42,
      isOnline: true,
      responseTime: '< 1 hour',
      experience: '5+ years',
      languages: ['English'],
      specialties: ['Organic Synthesis', 'Lab Techniques', 'MCAT Preparation'],
      bio: 'Research Scientist and Professor specializing in organic chemistry and biochemistry. Passionate about making complex concepts accessible.',
      totalStudents: 180,
      sessionsCompleted: 456
    }
  ]);

  const subjects = ['all', 'Physics', 'Computer Science', 'Mathematics', 'Chemistry', 'Biology', 'Literature'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || mentor.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const handleBookSession = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedMentor) {
      addNotification({
        type: 'mentor',
        title: 'Session Booked',
        message: `Your session with ${selectedMentor.name} has been confirmed!`
      });
      setShowBookingModal(false);
      setSelectedMentor(null);
    }
  };

  const handleStartChat = (mentor: Mentor) => {
    addNotification({
      type: 'message',
      title: 'Chat Started',
      message: `You can now chat with ${mentor.name}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Mentor</h1>
          <p className="text-gray-600">Connect with expert tutors and mentors to accelerate your learning</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search mentors by name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Mentors</p>
                <p className="text-2xl font-bold text-blue-600">124</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sessions Today</p>
                <p className="text-2xl font-bold text-green-600">86</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">96%</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{mentor.name.charAt(0)}</span>
                    </div>
                    {mentor.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{mentor.university}</p>
                <div className="flex flex-wrap gap-1">
                  {mentor.subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{mentor.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{mentor.sessionsCompleted} sessions</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">${mentor.hourlyRate}/hour</p>
                  <p className="text-sm text-gray-600">{mentor.reviews} reviews</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleStartChat(mentor)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleBookSession(mentor)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedMentor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book a Session</h3>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{selectedMentor.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{selectedMentor.name}</h4>
                  <p className="text-sm text-gray-600">{selectedMentor.title}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>2:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 4:00 PM</option>
                    <option>4:00 PM - 5:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Topic</label>
                  <textarea
                    placeholder="Briefly describe what you'd like to focus on..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Total: ${selectedMentor.hourlyRate}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{selectedMentor.rating} ({selectedMentor.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};