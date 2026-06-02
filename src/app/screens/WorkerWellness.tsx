import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { t } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function WorkerWellness() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  // Localized moods
  const moods = [
    { emoji: '😫', label: t('moodExhausted') },
    { emoji: '😟', label: t('moodStressed') },
    { emoji: '😐', label: t('moodOkay') },
    { emoji: '🙂', label: t('moodGood') },
    { emoji: '😊', label: t('moodGreat') },
  ];

  const workloadStatus = t('workloadModerate');
  const workloadLabel = t('workloadLabel');
  const pendingLabel = t('pendingTasks');
  const btnRearrange = t('btnRearrange');
  const moodQuestion = t('moodQuestion');
  const wellnessTipTitle = t('wellnessTipTitle');
  const wellnessTipDesc = t('wellnessTipDesc');
  
  const trendTitle = t('trendTitle');
  const trendFooter = t('trendFooter');

  // Localized AI workload priorities
  const localizedPriorities = [
    { emoji: '✅', task: t('taskCompleteNutrition'), time: '9:00 – 10:30am' },
    { emoji: '📍', task: t('attendanceTitle'), time: '10:30am' },
    { emoji: '🏠', task: t('taskPriorityVisits'), time: '2:00 – 4:00pm' },
    { emoji: '📄', task: t('taskSubmitReport'), time: '5:00pm' },
  ];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="font-bold text-white ml-4 tracking-wide">{t('wellnessTitle')}</h1>
          </div>
          <ConnectivityStatus />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {/* Workload Gauge */}
          <div className="p-6 flex flex-col items-center">
            <div className="relative w-[200px] h-[200px] mb-4">
              {/* Circular gauge background */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#E0E0E0"
                  strokeWidth="12"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#wellnessGradient)"
                  strokeWidth="12"
                  strokeDasharray="565"
                  strokeDashoffset="188"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="wellnessGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A9E6E" />
                    <stop offset="50%" stopColor="#E8A020" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-black text-[#1C1C1C]">{workloadStatus}</div>
                <div className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-wider mt-0.5">{workloadLabel}</div>
              </div>
            </div>

            <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-2 border border-amber-200">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              {pendingLabel}
            </div>
          </div>

          {/* AI Priority Suggestions */}
          <div className="px-4 mb-6">
            <div className="bg-gradient-to-br from-[#F0ECFF] to-[#E8E0FF] rounded-2xl p-5 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#5C35C0]" />
                <h3 className="font-bold text-[#5C35C0] text-xs uppercase tracking-wider">{t('prioritiesToday')}</h3>
              </div>

              <ol className="space-y-3.5">
                {localizedPriorities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[#1C1C1C] leading-snug">{item.task}</div>
                      <div className="text-[10px] text-[#6B6B6B] font-semibold mt-0.5">{item.time}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <button 
                onClick={() => alert('Rearranging priority stack...')}
                className="mt-4 text-xs text-[#5C35C0] font-bold hover:underline"
              >
                {btnRearrange}
              </button>
            </div>
          </div>

          {/* Mood Tracker */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{moodQuestion}</h3>
            <div className="flex justify-between gap-2">
              {moods.map((mood, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMood(i)}
                  className={`flex-1 aspect-square rounded-xl flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm border ${
                    selectedMood === i
                      ? 'bg-[#F0ECFF] border-2 border-[#5C35C0]'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl mb-1">{mood.emoji}</span>
                  <span className="text-[9px] text-[#6B6B6B] font-bold text-center leading-tight px-0.5">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Self-care Tip */}
          <div className="px-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 shadow-sm">
              <span className="text-xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-bold text-green-800 text-xs uppercase tracking-wide mb-1">{wellnessTipTitle}</h4>
                <p className="text-xs text-green-700 leading-relaxed font-semibold">
                  {wellnessTipDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Workload Trend */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{trendTitle}</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              {/* Bar Chart */}
              <div className="h-32 flex items-end justify-between gap-2.5 mb-3">
                {[60, 75, 85, 70, 50].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        height > 75 ? 'bg-red-400' : height > 60 ? 'bg-amber-400' : 'bg-green-400'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-slate-500 font-bold mt-2">W{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#6B6B6B] text-center font-bold">
                {trendFooter}
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
