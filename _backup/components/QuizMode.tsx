
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

const QuizMode: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const newQuestions = await generateQuiz(topic);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
    setShowExplanation(false);
    setIsLoading(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold">Generating your custom quiz...</p>
        <p className="text-slate-400 mt-2">Gemini is researching "{topic}"</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center text-4xl font-bold">
          {percentage}%
        </div>
        <h2 className="text-3xl font-bold">Quiz Completed!</h2>
        <p className="text-slate-400 text-lg">You scored {score} out of {questions.length} correct.</p>
        <button 
          onClick={() => { setQuestions([]); setTopic(''); }}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/30"
        >
          Try Another Topic
        </button>
      </div>
    );
  }

  if (questions.length > 0) {
    const q = questions[currentIndex];
    return (
      <div className="max-w-3xl mx-auto w-full space-y-8 py-8">
        <div className="flex justify-between items-center glass px-6 py-4 rounded-2xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Question {currentIndex + 1} / {questions.length}</span>
            <p className="text-sm font-semibold">Topic: {topic}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Current Score</span>
            <p className="text-xl font-bold text-green-400">{score}</p>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl space-y-6 shadow-2xl">
          <h3 className="text-2xl font-bold leading-tight">{q.question}</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt, idx) => {
              let btnClass = "text-left p-5 rounded-2xl border transition-all text-lg font-medium ";
              if (selectedOption === null) {
                btnClass += "bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50";
              } else {
                if (idx === q.correctAnswer) {
                  btnClass += "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  btnClass += "bg-white/5 border-white/10 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={btnClass}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
              <p className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-circle-info"></i> Explanation
              </p>
              <p className="text-slate-200 leading-relaxed italic">{q.explanation}</p>
              <button
                onClick={nextQuestion}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold shadow-lg transition-all"
              >
                {currentIndex + 1 === questions.length ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8">
      <div className="w-24 h-24 bg-blue-600/20 rounded-3xl flex items-center justify-center text-4xl text-blue-500 shadow-inner">
        <i className="fa-solid fa-brain"></i>
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black">AI Quiz Generator</h2>
        <p className="text-slate-400 text-lg">Enter a subject and Gemini will create a challenging multiple-choice test to evaluate your knowledge.</p>
      </div>

      <div className="w-full relative group">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Quantum Physics, French Revolution, Photosynthesis..."
          className="w-full bg-white/5 border-2 border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-lg font-medium pr-32"
          onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
        />
        <button
          onClick={startQuiz}
          className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-bold shadow-lg transition-all"
        >
          Generate
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['History', 'Science', 'Math', 'Geography', 'Art'].map(t => (
          <button 
            key={t}
            onClick={() => { setTopic(t); }}
            className="px-4 py-2 rounded-full glass text-xs font-semibold hover:border-blue-500 transition-all"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizMode;
