
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import { decode, encode, decodeAudioData, getGeminiClient } from '../services/geminiService';

const LiveCoach: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState('Ready to start coaching session...');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('Session ended.');
  };

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setStatus('Initializing microphone and Gemini...');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = getGeminiClient();
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus('Coaching session live. Start speaking!');
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Gemini Live error:', e);
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: 'You are an expert academic coach. Help students understand complex concepts by explaining them simply. Encourage critical thinking and provide step-by-step guidance.'
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error('Failed to start session:', err);
      setIsConnecting(false);
      setStatus('Failed to connect. Check your microphone permissions.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Voice Coaching</h2>
        <p className="text-slate-400">Speak naturally to your study companion for instant help.</p>
      </div>

      <div className="relative">
        {/* Animated Orbs */}
        <div className={`absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transition-all duration-1000 ${isActive ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`}></div>
        
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl ${
            isActive 
              ? 'bg-red-600 hover:bg-red-700 shadow-red-900/40' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/40'
          }`}
        >
          <i className={`fa-solid ${isConnecting ? 'fa-spinner fa-spin' : isActive ? 'fa-microphone-slash' : 'fa-microphone'} text-5xl mb-3`}></i>
          <span className="font-bold text-lg">{isConnecting ? 'Connecting...' : isActive ? 'Stop Coach' : 'Start Coaching'}</span>
        </button>
      </div>

      <div className="glass px-6 py-4 rounded-2xl w-full max-w-md text-center">
        <p className={`text-sm ${isActive ? 'text-green-400' : 'text-slate-300'}`}>
          <i className={`fa-solid ${isActive ? 'fa-circle-dot animate-pulse mr-2' : 'fa-circle mr-2'}`}></i>
          {status}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="glass p-4 rounded-xl text-center">
          <i className="fa-solid fa-bolt text-yellow-400 mb-2"></i>
          <p className="text-xs font-semibold">Real-time Responses</p>
          <p className="text-[10px] text-slate-400 mt-1">Zero latency conversation</p>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <i className="fa-solid fa-wand-magic-sparkles text-purple-400 mb-2"></i>
          <p className="text-xs font-semibold">Adaptive Learning</p>
          <p className="text-[10px] text-slate-400 mt-1">Adjusts to your pace</p>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <i className="fa-solid fa-shield-halved text-green-400 mb-2"></i>
          <p className="text-xs font-semibold">Safe & Academic</p>
          <p className="text-[10px] text-slate-400 mt-1">Focused on learning goals</p>
        </div>
      </div>
    </div>
  );
};

export default LiveCoach;
