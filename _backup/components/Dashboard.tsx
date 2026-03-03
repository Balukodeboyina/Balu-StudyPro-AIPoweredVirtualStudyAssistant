import React from 'react';
import { View } from '../types';

interface DashboardProps {
  onViewChange: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  const stats = [
    { label: 'Study Hours', value: '12.5h', icon: 'fa-clock', color: 'text-blue-400' },
    { label: 'Quizzes Taken', value: '8', icon: 'fa-vial', color: 'text-purple-400' },
    { label: 'Avg. Score', value: '92%', icon: 'fa-chart-line', color: 'text-green-400' },
    { label: 'Topics Mastered', value: '4', icon: 'fa-trophy', color: 'text-yellow-400' },
  ];

  const recentNotes = [
    { id: '1', title: 'Cell Biology Fundamentals', date: '2 hours ago', tags: ['Biology', 'Science'] },
    { id: '2', title: 'Industrial Revolution Timeline', date: 'Yesterday', tags: ['History'] },
    { id: '3', title: 'Trigonometric Identities', date: '2 days ago', tags: ['Math'] },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Master your subjects with AI.</h2>
          <p className="text-blue-100 text-lg mb-8 opacity-90 leading-relaxed">
            Upload notes, ask complex questions, or practice with customized quizzes. Your personal academic coach is ready.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onViewChange(View.Chat)}
              className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> New Study Session
            </button>
            <button
              onClick={() => onViewChange(View.Live)}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-microphone"></i> Voice Coach
            </button>
          </div>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-20 -bottom-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl hover:border-blue-500/50 transition-all">
            <div className={`${stat.color} mb-3 text-2xl`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Study Materials</h3>
            <button className="text-sm text-blue-400 hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <div key={note.id} className="glass p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 border border-white/5">
                  <i className="fa-solid fa-file-lines text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{note.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-500">{note.date}</span>
                    <div className="flex gap-1">
                      {note.tags.map(tag => (
                        <span key={tag} className="text-[8px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-600 text-xs"></i>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Tips */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold">Today's Learning Tip</h3>
          <div className="glass p-8 rounded-3xl border-l-4 border-l-purple-500 relative overflow-hidden group">
            <i className="fa-solid fa-lightbulb absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:scale-110 transition-transform"></i>
            <h4 className="text-lg font-bold mb-3 text-purple-400">The Spaced Repetition Method</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Instead of cramming for 5 hours straight, try studying for 25 minutes, then taking a 5-minute break. Review the material again 2 hours later, then 24 hours later. This signals your brain that the information is important to keep!
            </p>
            <button className="mt-6 text-sm font-bold text-purple-400 flex items-center gap-2 hover:gap-4 transition-all">
              Learn more about this technique <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
