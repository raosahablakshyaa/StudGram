import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { Dashboard } from './components/Dashboard';
import { ProfilePage } from './components/ProfilePage';
import { ChatPage } from './components/ChatPage';
import { ReelsPage } from './components/ReelsPage';
import { MentorPage } from './components/MentorPage';
import { PremiumPage } from './components/PremiumPage';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <LoginPage onNavigate={setCurrentPage} onLogin={() => setIsAuthenticated(true)} />;
        case 'signup':
          return <SignUpPage onNavigate={setCurrentPage} onSignUp={() => setIsAuthenticated(true)} />;
        default:
          return <LoginPage onNavigate={setCurrentPage} onLogin={() => setIsAuthenticated(true)} />;
      }
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <ProfilePage />;
      case 'chat':
        return <ChatPage />;
      case 'reels':
        return <ReelsPage />;
      case 'mentor':
        return <MentorPage />;
      case 'premium':
        return <PremiumPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {isAuthenticated && (
            <Navigation 
              currentPage={currentPage} 
              onNavigate={setCurrentPage}
              onLogout={() => {
                setIsAuthenticated(false);
                setCurrentPage('login');
                localStorage.removeItem('currentUser');
              }}
            />
          )}
          <div className={`transition-all duration-300 ${isAuthenticated ? 'ml-64' : ''}`}>
            {renderCurrentPage()}
          </div>
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;