import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Mic, Camera, Edit3 } from 'lucide-react';
import { t } from '../components/translations';

export default function SmartAttendance() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'voice' | 'photo' | 'manual'>('voice');
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);

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
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white tracking-wide">{t('attendanceHeader')}</h1>
          <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
            Jun 3
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
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4 flex flex-col items-center justify-center text-center min-h-[220px]">
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
                      onClick={() => {
                        setIsRecording(true);
                        setTimeout(() => {
                          setIsRecording(false);
                          // Auto-detect children: mark Ananya, Rahul, Priya, Amit as present
                          setAttendance({ 1: true, 2: true, 3: true, 4: true, 5: false });
                        }, 2200);
                      }}
                      className="w-16 h-16 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform mb-3 border-4 border-purple-100"
                    >
                      <Mic className="w-6 h-6 text-white" />
                    </button>
                    <div className="text-xs font-bold text-[#1C1C1C]">{t('voiceAttendanceHeader')}</div>
                    <p className="text-[10px] text-gray-500 mt-1 max-w-[200px]">
                      {t('pressToRecord')}
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
            onClick={() => alert('Attendance submitted successfully!')}
            className="w-full h-12 bg-[#5C35C0] text-white rounded-xl font-bold text-xs hover:bg-[#4A2A9F] shadow-md transition-colors active:scale-95"
          >
            {t('submitAttendance')}
          </button>
        </div>

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
