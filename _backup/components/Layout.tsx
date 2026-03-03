
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  onViewChange: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onViewChange, children }) => {
  const navItems = [
    { id: View.Dashboard, icon: 'fa-house', label: 'Dashboard' },
    { id: View.Chat, icon: 'fa-comments', label: 'Study Chat' },
    { id: View.Quiz, icon: 'fa-graduation-cap', label: 'Quiz Mode' },
    { id: View.Live, icon: 'fa-microphone', label: 'Live Coach' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 hidden md:flex flex-col z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2">
            <i className="fa-solid fa-brain"></i> StudyPro
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">JD</div>
            <div>
              <p className="text-sm font-semibold">User Profile</p>
              <p className="text-[10px] text-slate-400">Pro Student</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        {/* Header (Mobile) */}
        <header className="md:hidden glass px-6 py-4 flex items-center justify-between z-30">
          <h1 className="text-xl font-bold text-blue-400">StudyPro</h1>
          <button className="text-slate-400"><i className="fa-solid fa-bars text-xl"></i></button>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          {children}
        </div>

        {/* Bottom Nav (Mobile Only) */}
        <div className="md:hidden glass border-t border-white/10 flex justify-around p-3 z-30">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center gap-1 ${
                currentView === item.id ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg`}></i>
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;
