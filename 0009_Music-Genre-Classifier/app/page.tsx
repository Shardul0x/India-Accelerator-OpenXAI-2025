'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Music, Play, Pause, Volume2 } from 'lucide-react';

// Genre themes configuration
const genreThemes = {
  rock: {
    primary: 'from-red-600 to-orange-500',
    secondary: 'from-red-900/20 to-orange-900/20',
    accent: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    particles: 'bg-red-500',
    name: 'Rock'
  },
  jazz: {
    primary: 'from-amber-600 to-yellow-500',
    secondary: 'from-amber-900/20 to-yellow-900/20',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    particles: 'bg-amber-500',
    name: 'Jazz'
  },
  electronic: {
    primary: 'from-cyan-600 to-blue-500',
    secondary: 'from-cyan-900/20 to-blue-900/20',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    particles: 'bg-cyan-500',
    name: 'Electronic'
  },
  classical: {
    primary: 'from-violet-600 to-purple-500',
    secondary: 'from-violet-900/20 to-purple-900/20',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    particles: 'bg-violet-500',
    name: 'Classical'
  },
  hiphop: {
    primary: 'from-emerald-600 to-green-500',
    secondary: 'from-emerald-900/20 to-green-900/20',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    particles: 'bg-emerald-500',
    name: 'Hip Hop'
  },
  pop: {
    primary: 'from-pink-600 to-rose-500',
    secondary: 'from-pink-900/20 to-rose-900/20',
    accent: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    particles: 'bg-pink-500',
    name: 'Pop'
  },
  country: {
    primary: 'from-orange-600 to-amber-500',
    secondary: 'from-orange-900/20 to-amber-900/20',
    accent: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    particles: 'bg-orange-500',
    name: 'Country'
  },
  default: {
    primary: 'from-purple-600 to-fuchsia-500',
    secondary: 'from-purple-900/20 to-fuchsia-900/20',
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    particles: 'bg-purple-500',
    name: 'Music'
  }
};

// Floating music note component
const FloatingNote = ({ delay, theme }: { delay: number; theme: any }) => (
  <div 
    className={`absolute w-3 h-3 ${theme.particles}/30 rounded-full animate-bounce text-xs flex items-center justify-center`}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 3}s`
    }}
  >
    ♪
  </div>
);

// Audio visualizer bars
const AudioBar = ({ height, theme, isActive }: { height: number; theme: any; isActive: boolean }) => (
  <div 
    className={`${theme.bg} rounded-full transition-all duration-300 w-3 ${isActive ? 'animate-pulse' : ''}`}
    style={{ 
      height: `${height}px`,
      animationDelay: `${Math.random() * 2}s`
    }}
  />
);

// Waveform visualization
const Waveform = ({ theme, isActive }: { theme: any; isActive: boolean }) => (
  <div className="flex items-end justify-center space-x-1 h-16">
    {[...Array(20)].map((_, i) => (
      <AudioBar 
        key={i} 
        height={isActive ? 20 + Math.random() * 40 : 10 + Math.random() * 20} 
        theme={theme}
        isActive={isActive}
      />
    ))}
  </div>
);

// Particle system
const ParticleSystem = ({ theme, count = 15 }: { theme: any; count?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(count)].map((_, i) => (
      <FloatingNote key={i} delay={i * 0.5} theme={theme} />
    ))}
  </div>
);

// Main page component
export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const theme = genreThemes[currentTheme as keyof typeof genreThemes];

  // Simulate file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  // Simulate analysis process
  const analyzeAudio = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Random genre selection for demo
    const genres = ['rock', 'jazz', 'electronic', 'classical', 'hiphop', 'pop', 'country'];
    const detectedGenre = genres[Math.floor(Math.random() * genres.length)];
    
    setProgress(100);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentTheme(detectedGenre);
      setResult({
        genre: detectedGenre,
        confidence: 85 + Math.random() * 12,
        mood: ['energetic', 'melancholic', 'upbeat', 'relaxed', 'intense'][Math.floor(Math.random() * 5)],
        tempo: Math.floor(80 + Math.random() * 60),
        key: ['C Major', 'D Minor', 'G Major', 'A Minor', 'E Major'][Math.floor(Math.random() * 5)]
      });
    }, 500);
  };

  // Auto-play simulation
  useEffect(() => {
    if (result) {
      setIsPlaying(true);
      const timer = setTimeout(() => setIsPlaying(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  return (
    <main className={`min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/50 to-purple-950/30 text-white relative overflow-hidden transition-all duration-1000`}>
      {/* Dynamic background based on theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.secondary} transition-all duration-1000`} />
        
        {/* Animated orbs with theme colors */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${theme.primary} opacity-10 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l ${theme.primary} opacity-10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-t ${theme.primary} opacity-10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }} />
        
        {/* Moving grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
      </div>

      {/* Particle system */}
      <ParticleSystem theme={theme} count={result ? 25 : 15} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          {/* Main card with dynamic theme */}
          <div className={`backdrop-blur-2xl bg-white/[0.03] border ${theme.border} rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden transition-all duration-1000`}>
            {/* Dynamic inner glow */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.primary} opacity-5 transition-all duration-1000`} />
            
            <div className="relative z-10">
              {/* Header with animated icon */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${theme.bg} border ${theme.border} mb-8 backdrop-blur-sm shadow-2xl transition-all duration-500 ${isPlaying ? 'animate-spin' : 'animate-pulse'}`}>
                  <Music className={`w-12 h-12 ${theme.accent} transition-colors duration-500`} />
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className={`bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent transition-all duration-1000`}>
                    Music Genre
                  </span>
                  <br />
                  <span className="text-white/90">Classifier</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Discover the hidden patterns in your music. Our AI analyzes 
                  <span className={`${theme.accent} font-medium transition-colors duration-500`}> genre</span>, 
                  <span className="text-fuchsia-400 font-medium"> mood</span>, and 
                  <span className="text-pink-400 font-medium"> style</span> with precision.
                </p>
              </div>

              {/* File upload section */}
              <div className="mb-8">
                <div className={`relative backdrop-blur-sm bg-white/[0.02] border ${theme.border} rounded-2xl p-8 transition-all duration-500`}>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="audio-upload"
                  />
                  
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.bg} border ${theme.border} mb-4 transition-all duration-300 hover:scale-110`}>
                        <Upload className={`w-8 h-8 ${theme.accent}`} />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {selectedFile ? selectedFile.name : 'Drop your music here'}
                      </h3>
                      <p className="text-gray-400">
                        {selectedFile ? 'Ready to analyze' : 'Supports MP3, WAV, FLAC, and more'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Analysis section */}
              {selectedFile && (
                <div className="mb-8">
                  <button
                    onClick={analyzeAudio}
                    disabled={isAnalyzing}
                    className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 disabled:opacity-50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg`}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing... {Math.round(progress)}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Volume2 className="w-5 h-5" />
                        <span>Analyze Audio</span>
                      </div>
                    )}
                  </button>
                  
                  {/* Progress bar */}
                  {isAnalyzing && (
                    <div className={`mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${theme.primary} transition-all duration-300 rounded-full`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Waveform visualization */}
              {(selectedFile || result) && (
                <div className={`mb-8 p-6 rounded-xl ${theme.bg} border ${theme.border} transition-all duration-500`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Audio Visualization</h3>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`p-2 rounded-full ${theme.bg} border ${theme.border} hover:bg-white/10 transition-all duration-300`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                  <Waveform theme={theme} isActive={isPlaying || isAnalyzing} />
                </div>
              )}

              {/* Results section */}
              {result && (
                <div className={`mb-8 p-8 rounded-2xl ${theme.bg} border ${theme.border} transition-all duration-1000 transform animate-in slide-in-from-bottom-4`}>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Analysis Complete!</h2>
                    <p className="text-gray-300">Here's what we discovered about your music</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Genre */}
                    <div className={`p-6 rounded-xl bg-white/[0.05] border ${theme.border} text-center transition-all duration-300 hover:bg-white/[0.08]`}>
                      <div className="text-3xl mb-2">🎵</div>
                      <h3 className="text-white font-semibold mb-1">Genre</h3>
                      <p className={`${theme.accent} font-bold text-lg capitalize`}>{result.genre}</p>
                      <p className="text-gray-400 text-sm">{Math.round(result.confidence)}% confidence</p>
                    </div>
                    
                    {/* Mood */}
                    <div className={`p-6 rounded-xl bg-white/[0.05] border ${theme.border} text-center transition-all duration-300 hover:bg-white/[0.08]`}>
                      <div className="text-3xl mb-2">😊</div>
                      <h3 className="text-white font-semibold mb-1">Mood</h3>
                      <p className={`${theme.accent} font-bold text-lg capitalize`}>{result.mood}</p>
                    </div>
                    
                    {/* Tempo */}
                    <div className={`p-6 rounded-xl bg-white/[0.05] border ${theme.border} text-center transition-all duration-300 hover:bg-white/[0.08]`}>
                      <div className="text-3xl mb-2">⚡</div>
                      <h3 className="text-white font-semibold mb-1">Tempo</h3>
                      <p className={`${theme.accent} font-bold text-lg`}>{result.tempo} BPM</p>
                    </div>
                    
                    {/* Key */}
                    <div className={`p-6 rounded-xl bg-white/[0.05] border ${theme.border} text-center transition-all duration-300 hover:bg-white/[0.08]`}>
                      <div className="text-3xl mb-2">🎹</div>
                      <h3 className="text-white font-semibold mb-1">Key</h3>
                      <p className={`${theme.accent} font-bold text-lg`}>{result.key}</p>
                    </div>
                  </div>
                  
                  {/* Genre description */}
                  <div className={`mt-6 p-6 rounded-xl bg-white/[0.02] border ${theme.border}`}>
                    <h4 className="text-white font-semibold mb-3">About {genreThemes[result.genre as keyof typeof genreThemes].name}</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {result.genre === 'rock' && "Rock music is characterized by amplified instruments, strong rhythm, and powerful vocals. It emerged in the 1950s and continues to evolve with sub-genres like alternative, metal, and indie rock."}
                      {result.genre === 'jazz' && "Jazz is a music genre that originated in African-American communities, featuring improvisation, swing rhythms, and complex harmonies. It's known for its sophisticated musical structure and expressive freedom."}
                      {result.genre === 'electronic' && "Electronic music uses electronic instruments and technology to create sound. From ambient to dance music, it encompasses a wide range of styles and continues to push musical boundaries."}
                      {result.genre === 'classical' && "Classical music represents a long tradition of art music, featuring complex compositions, orchestral arrangements, and sophisticated musical forms developed over centuries."}
                      {result.genre === 'hiphop' && "Hip hop is a cultural movement that includes rap music, characterized by rhythmic speech, strong beats, and often socially conscious lyrics. It originated in the 1970s and has become a global phenomenon."}
                      {result.genre === 'pop' && "Pop music is designed to appeal to a general audience, featuring catchy melodies, accessible lyrics, and polished production. It's the most commercially successful music genre worldwide."}
                      {result.genre === 'country' && "Country music originated in rural Southern United States, featuring storytelling lyrics, acoustic instruments, and themes of everyday life, love, and hardship."}
                    </p>
                  </div>
                </div>
              )}

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <div className={`text-center p-6 rounded-xl bg-white/[0.02] border ${theme.border} hover:bg-white/[0.05] transition-all duration-300 transform hover:scale-105`}>
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Advanced machine learning for accurate classification</p>
                </div>
                
                <div className={`text-center p-6 rounded-xl bg-white/[0.02] border ${theme.border} hover:bg-white/[0.05] transition-all duration-300 transform hover:scale-105`}>
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="text-white font-semibold mb-2">Real-time</h3>
                  <p className="text-gray-400 text-sm">Instant analysis with live visual feedback</p>
                </div>
                
                <div className={`text-center p-6 rounded-xl bg-white/[0.02] border ${theme.border} hover:bg-white/[0.05] transition-all duration-300 transform hover:scale-105`}>
                  <div className="text-3xl mb-3">🔒</div>
                  <h3 className="text-white font-semibold mb-2">Secure</h3>
                  <p className="text-gray-400 text-sm">Your audio never leaves your device</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-center text-sm text-gray-500">
                  Powered by{" "}
                  <span className={`${theme.accent} font-medium hover:opacity-80 transition-all duration-300`}>Advanced AI</span>
                  {" • "}
                  <span className="text-fuchsia-400 font-medium hover:text-fuchsia-300 transition-colors">Modern Web Tech</span>
                  {" • "}
                  <span className="text-pink-400 font-medium hover:text-pink-300 transition-colors">Real-time Processing</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
          }
          25% { 
            transform: translateY(-10px) translateX(5px); 
          }
          50% { 
            transform: translateY(0px) translateX(10px); 
          }
          75% { 
            transform: translateY(10px) translateX(5px); 
          }
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.6s ease-out;
        }
        
        .slide-in-from-bottom-4 {
          animation: animate-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}