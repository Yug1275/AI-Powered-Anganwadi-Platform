import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Mic, X, Sparkles, Volume2 } from 'lucide-react';
import { t } from './translations';

export function PhoneFrame({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Assistant overlay states
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantText, setAssistantText] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [isListening, setIsListening] = useState(true);

  // Define paths where the AI mic button should be HIDDEN (onboarding screens)
  const hideAIPaths = ['/', '/login', '/language'];
  const showAI = !hideAIPaths.includes(location.pathname);

  // Dynamic voice commands mapped to translations
  const voiceCommands = [
    { commandKey: 'attendanceTitle', commandDefault: 'Mark attendance', target: '/attendance', reply: 'Opening Smart Attendance screen to register attendance...' },
    { commandKey: 'wellnessTitle', commandDefault: 'Show pending tasks', target: '/wellness', reply: 'Sure, opening the wellness priority tasks panel...' },
    { commandKey: 'aiReportsTitle', commandDefault: 'Generate report', target: '/reports', reply: 'Taking you to the AI report generation center...' },
    { commandKey: 'homeVisitsTitle', commandDefault: 'Show home visits', target: '/home-visits', reply: 'Opening priority home visits manager...' },
    { commandKey: 'childProfilesTitle', commandDefault: 'Open child profile', target: '/child/1', reply: 'Opening profile details for Ananya Patel...' },
  ];

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] shadow-2xl p-3">
        {/* Phone outer bezel */}
        <div className="relative w-full h-full bg-[#1C1C1C] rounded-[48px] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50" />

          {/* Screen Content */}
          <div className="relative w-full h-full bg-[#F7F5F0] overflow-hidden">
            {children}

            {/* Global Conversational AI Assistant Button */}
            {showAI && (
              <div className="absolute bottom-20 right-4 z-40">
                <div className="relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-[#5C35C0] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-bounce tracking-wide z-10">
                    AI
                  </div>
                  <button 
                    onClick={() => {
                      setAssistantOpen(true);
                      setIsListening(true);
                      setAssistantText('');
                      setAssistantReply('');
                    }}
                    className="w-14 h-14 bg-[#5C35C0] rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A2A9F] transition-all duration-200 active:scale-90 border-2 border-white/20 hover:rotate-12"
                  >
                    <Mic className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Conversational AI Assistant Overlay */}
            {showAI && assistantOpen && (
              <div className="absolute inset-0 bg-black/45 z-50 flex flex-col justify-end animate-fade-in">
                <div className="absolute inset-0" onClick={() => setAssistantOpen(false)} />
                
                <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 max-h-[80%] flex flex-col border-t border-slate-100 animate-slide-in-up">
                  {/* Drag indicator bar */}
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3" />
                  
                  <div className="px-5 pb-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-[#5C35C0] tracking-wider uppercase">{t('voiceAssistant')}</span>
                      </div>
                      <button 
                        onClick={() => setAssistantOpen(false)} 
                        className="p-1 hover:bg-slate-100 rounded-full transition-colors active:scale-90"
                      >
                        <X className="w-5 h-5 text-slate-500" />
                      </button>
                    </div>

                    {/* Voice Input States / Responses */}
                    <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[220px]">
                      {isListening ? (
                        <div className="flex flex-col items-center text-center">
                          {/* Pulsing Waveform Animation */}
                          <div className="flex items-center justify-center gap-1.5 h-12 mb-5">
                            <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-1" />
                            <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-2" />
                            <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-3" />
                            <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-4" />
                            <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-5" />
                          </div>
                          
                          <h3 className="font-bold text-base text-[#1C1C1C]">{t('listening')}</h3>
                          <p className="text-[11px] text-[#6B6B6B] mt-1 max-w-[220px] font-semibold leading-relaxed">
                            {t('voiceTip')}
                          </p>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col gap-4 animate-fade-in">
                          {/* User Voice Transcript */}
                          <div className="self-end bg-[#5C35C0]/10 text-[#5C35C0] px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] text-xs font-bold flex items-center gap-2">
                            <Volume2 className="w-4 h-4 flex-shrink-0" />
                            <span>"{assistantText}"</span>
                          </div>
                          
                          {/* AI Response Text */}
                          <div className="self-start bg-slate-50 text-[#1C1C1C] px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%] text-[11px] font-semibold leading-relaxed flex items-start gap-2 border border-slate-100 shadow-sm">
                            <Sparkles className="w-4 h-4 text-[#5C35C0] flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-bold text-[9px] text-[#5C35C0] uppercase tracking-wider mb-0.5">Saathi AI</div>
                              <p className="text-[#1C1C1C]">{assistantReply}</p>
                              <div className="mt-2.5 flex items-center gap-1 text-[9px] text-[#5C35C0] font-bold">
                                Opening screen now
                                <span className="animate-pulse">...</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Voice Commands List */}
                    <div className="mt-4">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{t('trySaying')}</div>
                      <div className="flex flex-wrap gap-2">
                        {voiceCommands.map((cmd, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setIsListening(false);
                              setAssistantText(t(cmd.commandKey));
                              setAssistantReply(cmd.reply);
                              
                              // Simulate routing delay
                              setTimeout(() => {
                                setAssistantOpen(false);
                                navigate(cmd.target);
                              }, 1600);
                            }}
                            className="px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs text-[#1C1C1C] hover:bg-slate-100 font-bold transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#5C35C0]" />
                            {t(cmd.commandKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
