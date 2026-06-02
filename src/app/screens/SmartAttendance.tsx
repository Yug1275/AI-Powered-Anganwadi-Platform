import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Mic, Camera, Edit3, Play, Pause, X } from 'lucide-react';
import { t } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function SmartAttendance() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'voice' | 'photo' | 'manual'>('voice');
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);

  // Voice Log flow states
  const [voiceLogCaptureOpen, setVoiceLogCaptureOpen] = useState(false);
  const [reviewLogOpen, setReviewLogOpen] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Editable fields for review log
  const [editChildName, setEditChildName] = useState('Aarav Patel');
  const [editMetric, setEditMetric] = useState('Weight');
  const [editValue, setEditValue] = useState('14.0 kg');

  const getSimulatedTranscript = () => {
    const lang = localStorage.getItem('selectedLanguage') || 'hi';
    switch(lang) {
      case 'gu': return 'Aarav nu vajan 14 kilo chhe...';
      case 'hi': return 'आरव का वजन 14 किलो है...';
      case 'mr': return 'आरवचे वजन 14 खाली आहे...';
      case 'ta': return 'ஆரவ்வின் எடை 14 கிலோ...';
      case 'te': return 'ఆరవ్ బరువు 14 కిలోలు...';
      default: return "Aarav's weight is 14 kg...";
    }
  };

  const startVoiceLogFlow = () => {
    setVoiceLogCaptureOpen(true);
    setIsTranscribing(true);
    setTranscriptionText('');
    
    const transcript = getSimulatedTranscript();
    const words = transcript.split(' ');
    let currentWordIndex = 0;
    
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setTranscriptionText((prev) => prev + (prev ? ' ' : '') + words[currentWordIndex]);
        currentWordIndex++;
      } else {
        clearInterval(interval);
        setIsTranscribing(false);
      }
    }, 450);

    (window as any).captureInterval = interval;
  };

  const stopAndProcessVoiceLog = () => {
    if ((window as any).captureInterval) {
      clearInterval((window as any).captureInterval);
    }
    setIsTranscribing(false);
    setTranscriptionText(getSimulatedTranscript());
    setVoiceLogCaptureOpen(false);
    setReviewLogOpen(true);
  };

  const cancelVoiceLogFlow = () => {
    if ((window as any).captureInterval) {
      clearInterval((window as any).captureInterval);
    }
    setVoiceLogCaptureOpen(false);
    setIsTranscribing(false);
    setTranscriptionText('');
  };

  const handleSaveToOffline = () => {
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
    }));
    
    let pendingQueue = [];
    const saved = localStorage.getItem('pendingQueue');
    if (saved) {
      pendingQueue = JSON.parse(saved);
    } else {
      const defaultQueue = [
        { id: 1, type: 'Morning Attendance', status: 'Pending', details: 'Marked 28 children present', size: '0.45 MB' },
        { id: 2, type: 'Voice Log: Aarav Weight', status: 'Pending', details: 'Weight metric: 14.0 kg', size: '0.12 MB' },
        { id: 3, type: 'Child Growth Alert', status: 'Pending', details: 'Growth risk warning logged', size: '0.62 MB' },
        { id: 4, type: 'Parent Notification', status: 'Pending', details: 'WhatsApp reminder queued', size: '0.08 MB' },
      ];
      pendingQueue = defaultQueue;
    }
    const newItem = {
      id: Date.now(),
      type: 'Voice Log: ' + editChildName + ' ' + editMetric,
      status: 'Pending',
      details: editMetric + ': ' + editValue,
      size: '0.12 MB'
    };
    localStorage.setItem('pendingQueue', JSON.stringify([...pendingQueue, newItem]));
    
    setReviewLogOpen(false);
  };

  const children = [
    { id: 1, nameKey: 'child1Name', age: '2yr 4mo', initials: 'AP', color: 'bg-pink-400' },
    { id: 2, nameKey: 'child2Name', age: '3yr 1mo', initials: 'RK', color: 'bg-blue-400' },
    { id: 3, nameKey: 'child3Name', age: '2yr 8mo', initials: 'PS', color: 'bg-green-400' },
    { id: 4, nameKey: 'child4Name', age: '3yr 5mo', initials: 'AS', color: 'bg-purple-400' },
    { id: 5, nameKey: 'child5Name', age: '2yr 2mo', initials: 'SD', color: 'bg-orange-400' },
  ];

  const markedCount = Object.values(attendance).filter(Boolean).length;

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white tracking-wide">{t('attendanceHeader')}</h1>
          <div className="flex items-center gap-2">
            <ConnectivityStatus />
            <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
              Jun 3
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white px-4 py-3 flex gap-2 border-b z-10 shadow-sm">
          <TabButton
            active={tab === 'voice'}
            onClick={() => setTab('voice')}
            icon={<Mic className="w-4 h-4" />}
            label={t('voiceTab')}
          />
          <TabButton
            active={tab === 'photo'}
            onClick={() => setTab('photo')}
            icon={<Camera className="w-4 h-4" />}
            label={t('photoTab')}
          />
          <TabButton
            active={tab === 'manual'}
            onClick={() => setTab('manual')}
            icon={<Edit3 className="w-4 h-4" />}
            label={t('manualTab')}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 scrollbar-hide">
          {tab === 'voice' && (
            <div className="p-4 animate-page-fade">
              {/* Voice Scanner Box */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4 flex flex-col items-center justify-center text-center min-h-[200px]">
                {isRecording ? (
                  <div className="flex flex-col items-center animate-fade-in">
                    {/* Recording Visualizer Waveform */}
                    <div className="flex items-center justify-center gap-1.5 h-12 mb-5">
                      <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-1" />
                      <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-2" />
                      <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-3" />
                      <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-4" />
                      <div className="w-1.5 bg-[#5C35C0] rounded-full animate-voice-bar-5" />
                    </div>
                    <div className="text-xs font-bold text-[#5C35C0]">{t('recordingState')}</div>
                    <p className="text-[10px] text-gray-500 mt-1">Classroom audio analysis in progress...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center animate-fade-in">
                    <button
                      onClick={startVoiceLogFlow}
                      className="w-16 h-16 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform mb-3 border-4 border-purple-100"
                    >
                      <Mic className="w-6 h-6 text-white" />
                    </button>
                    <div className="text-xs font-bold text-[#1C1C1C]">{t('voiceLog') || 'Voice Log Attendance'}</div>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-[220px]">
                      Tap microphone to log weight, height, or attendance via voice
                    </p>
                  </div>
                )}
              </div>

              {/* Detected List */}
              <div className="mb-4 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="text-xs font-bold text-[#1C1C1C] border-b pb-2 mb-2 flex justify-between items-center">
                  <span>{t('detectedStudents')}</span>
                  <span className="px-2.5 py-0.5 bg-[#5C35C0]/10 text-[#5C35C0] text-[10px] font-bold rounded-full">
                    {markedCount} / 5 Detected
                  </span>
                </div>

                {children.map((child) => {
                  const isPresent = attendance[child.id] || false;
                  return (
                    <div key={child.id} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0 animate-fade-in">
                      <div className={`w-10 h-10 ${child.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm relative`}>
                        {child.initials}
                        {isPresent && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#1C1C1C]">{t(child.nameKey)}</div>
                        <div className="text-[10px] text-[#6B6B6B] font-semibold">{child.age}</div>
                      </div>
                      <label className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isPresent}
                          onChange={() => setAttendance({ ...attendance, [child.id]: !isPresent })}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow" />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'photo' && (
            <div className="p-4 flex flex-col items-center justify-center h-full animate-page-fade">
              <div className="w-full h-[280px] bg-slate-200 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-slate-300">
                <Camera className="w-16 h-16 text-gray-400 animate-pulse" />
              </div>
              <p className="text-xs text-[#6B6B6B] text-center mb-5 font-semibold">
                Take a group photo — AI will auto-detect faces
              </p>
              <button 
                onClick={() => alert('Camera permissions requested')}
                className="w-full h-12 bg-[#5C35C0] text-white rounded-xl font-bold text-xs hover:bg-[#4A2A9F] shadow-md transition-colors active:scale-95"
              >
                Open Camera
              </button>
            </div>
          )}

          {tab === 'manual' && (
            <div className="p-4 animate-page-fade">
              <input
                type="text"
                placeholder={t('searchChild')}
                className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold mb-4 shadow-inner focus:outline-none focus:border-[#5C35C0]"
              />
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                {children.map((child) => (
                  <div key={child.id} className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
                    <div className={`w-10 h-10 ${child.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                      {child.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#1C1C1C]">{t(child.nameKey)}</div>
                      <div className="text-[10px] text-[#6B6B6B] font-semibold">{child.age}</div>
                    </div>
                    <label className="relative inline-block w-12 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={attendance[child.id] || false}
                        onChange={() => setAttendance({ ...attendance, [child.id]: !attendance[child.id] })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Actions */}
        <div className="absolute bottom-16 left-0 right-0 bg-white border-t p-4 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] flex flex-col items-center">
          <div className="text-center text-xs font-bold text-[#6B6B6B] mb-2.5">
            {markedCount} / 32 {t('marked')}
          </div>
          <button 
            onClick={() => {
              const isOnline = localStorage.getItem('isOnline') !== 'false';
              if (!isOnline) {
                window.dispatchEvent(new CustomEvent('show-toast', { 
                  detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                }));
              } else {
                alert('Attendance submitted successfully!');
              }
            }}
            className="w-full h-12 bg-[#5C35C0] text-white rounded-xl font-bold text-xs hover:bg-[#4A2A9F] shadow-md transition-colors active:scale-95"
          >
            {t('submitAttendance')}
          </button>
        </div>

        {/* VOICE CAPTURE SCREEN OVERLAY */}
        {voiceLogCaptureOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in">
            <div className="absolute inset-0" onClick={cancelVoiceLogFlow} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[85%]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-extrabold text-[#5C35C0] tracking-wider uppercase">
                  {t('listeningIn') || `Listening in ${t('language')}...`}
                </span>
                <button 
                  onClick={cancelVoiceLogFlow}
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Recording Animation */}
              <div className="flex flex-col items-center py-6">
                <div className="relative w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-5 animate-pulse">
                  <div className="absolute inset-0 rounded-full bg-purple-200 opacity-50 scale-125 animate-ping" />
                  <Mic className="w-8 h-8 text-[#5C35C0]" />
                </div>
                
                {/* Live Transcription Box */}
                <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-200/60 min-h-[90px] shadow-inner mb-6 text-center">
                  {transcriptionText ? (
                    <p className="text-xs text-[#1C1C1C] font-extrabold italic animate-fade-in leading-relaxed">
                      "{transcriptionText}"
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 font-semibold italic">
                      Start speaking child's name, weight, or health observations...
                    </p>
                  )}
                </div>

                {/* Control Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={cancelVoiceLogFlow}
                    className="py-3 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all active:scale-95"
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                  <button
                    onClick={stopAndProcessVoiceLog}
                    className="py-3 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    {t('stopProcess') || 'Stop & Process'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW LOG SCREEN OVERLAY */}
        {reviewLogOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in">
            <div className="absolute inset-0" onClick={() => setReviewLogOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[90%] overflow-y-auto">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-extrabold text-[#1C1C1C] text-sm">{t('reviewLog') || 'Review Log'}</h2>
                <button 
                  onClick={() => setReviewLogOpen(false)}
                  className="text-xs text-slate-500 font-bold hover:underline"
                >
                  Close
                </button>
              </div>

              {/* Status Banner */}
              <div className="bg-green-50 border border-green-200 text-green-800 text-[10px] font-extrabold p-2.5 rounded-xl mb-4 flex items-center gap-1.5">
                <span>✓</span>
                <span>{t('aiProcessedVoice') || 'AI processed your voice note'}</span>
              </div>

              {/* Audio Preview Card */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4 flex items-center gap-3.5">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 bg-[#5C35C0] text-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform flex-shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>
                
                {/* Waveform lines */}
                <div className="flex-1 flex items-center justify-center gap-1 h-8">
                  {[4, 8, 12, 16, 12, 6, 10, 16, 20, 14, 8, 4, 10, 18, 12, 6].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}px` }}
                      className={`w-0.5 rounded-full transition-colors ${isPlayingAudio ? 'bg-[#5C35C0] animate-voice-bar-' + (i%5+1) : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-gray-500">0:04</div>
              </div>

              {/* AI Extracted Data Section */}
              <div className="space-y-3 mb-4">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">AI Extracted Data</h4>
                
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Child Name</label>
                  <input
                    type="text"
                    value={editChildName}
                    onChange={(e) => setEditChildName(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Metric</label>
                    <input
                      type="text"
                      value={editMetric}
                      onChange={(e) => setEditMetric(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Value</label>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                </div>
              </div>

              {/* Confidence Card */}
              <div className="bg-purple-50/50 border border-purple-100/50 rounded-xl p-3.5 mb-5 flex items-center justify-between text-xs font-bold text-[#5C35C0]">
                <span>{t('aiConfidence') || 'AI Confidence'}: 98%</span>
                <span className="text-[10px] text-purple-700">{editChildName} {t('matchedFromRoster') || 'matched from roster.'}</span>
              </div>

              {/* Bottom Button */}
              <button
                onClick={handleSaveToOffline}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
              >
                {t('saveToOfflineQueue') || 'Save to Offline Queue'}
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
        active ? 'bg-[#5C35C0] text-white shadow-sm' : 'bg-gray-100 text-[#6B6B6B] hover:bg-slate-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
