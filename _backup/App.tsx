import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudyChat from './components/StudyChat';
import QuizMode from './components/QuizMode';
import LiveCoach from './components/LiveCoach';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard onViewChange={setCurrentView} />;
      case View.Chat:
        return <StudyChat />;
      case View.Quiz:
        return <QuizMode />;
      case View.Live:
        return <LiveCoach />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
