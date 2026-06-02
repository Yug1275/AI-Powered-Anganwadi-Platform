import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function WorkerWellness() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = [
    { emoji: '😫', label: 'Exhausted' },
    { emoji: '😟', label: 'Stressed' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😊', label: 'Great' },
  ];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white ml-4">My Wellness</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
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
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeDasharray="565"
                  strokeDashoffset="188"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A9E6E" />
                    <stop offset="50%" stopColor="#E8A020" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-[#1C1C1C]">Moderate</div>
                <div className="text-sm text-[#6B6B6B]">Workload</div>
              </div>
            </div>

            <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full" />
              7 pending tasks
            </div>
          </div>

          {/* AI Priority Suggestions */}
          <div className="px-4 mb-6">
            <div className="bg-gradient-to-br from-[#F0ECFF] to-[#E8E0FF] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#5C35C0]" />
                <h3 className="font-semibold text-[#5C35C0]">AI Prioritization for Today</h3>
              </div>

              <ol className="space-y-3">
                {[
                  { emoji: '✅', task: 'Complete nutrition distribution', time: '9:00 – 10:30am' },
                  { emoji: '📍', task: 'Mark attendance', time: '10:30am' },
                  { emoji: '🏠', task: '2 priority home visits', time: '2:00 – 4:00pm' },
                  { emoji: '📄', task: 'Submit daily report', time: '5:00pm' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#1C1C1C]">{item.task}</div>
                      <div className="text-xs text-[#6B6B6B]">{item.time}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <button className="mt-4 text-sm text-[#5C35C0] font-medium">
                Rearrange
              </button>
            </div>
          </div>

          {/* Mood Tracker */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">How are you feeling today?</h3>
            <div className="flex justify-between gap-2">
              {moods.map((mood, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMood(i)}
                  className={`flex-1 aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                    selectedMood === i
                      ? 'bg-[#F0ECFF] ring-2 ring-[#5C35C0]'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.emoji}</span>
                  <span className="text-[10px] text-[#6B6B6B]">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Self-care Tip */}
          <div className="px-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3">
              <span className="text-xl flex-shrink-0">💡</span>
              <div>
                <h4 className="font-semibold text-green-800 text-sm mb-1">Tip</h4>
                <p className="text-sm text-green-700">
                  You've had 6 consecutive working days. Remember to take breaks between home visits.
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Workload Trend */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">Monthly Workload Trend</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              {/* Bar Chart */}
              <div className="h-32 flex items-end justify-between gap-2 mb-3">
                {[60, 75, 85, 70, 50].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t ${
                        height > 75 ? 'bg-red-400' : height > 60 ? 'bg-amber-400' : 'bg-green-400'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-[#6B6B6B] mt-2">W{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B6B6B] text-center">
                Busiest: Wednesday · Lightest: Saturday
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
