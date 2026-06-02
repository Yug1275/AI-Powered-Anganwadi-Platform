import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Edit, Plus } from 'lucide-react';

export default function ChildProfile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'growth' | 'nutrition' | 'vaccination' | 'notes'>('growth');

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white">Ananya Patel</h1>
          <button>
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#1A9E6E] to-[#0D7A50] p-5 rounded-b-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
              👧
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Ananya Patel</h2>
              <p className="text-white/90 text-sm">2 yr 4 mo</p>
            </div>
          </div>

          <p className="text-white/80 text-xs mb-4">Centre: ICDS 04  ·  ID: CH-2847</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-[#1C1C1C]">12.4 kg</div>
              <div className="text-xs text-green-600">Normal</div>
              <div className="text-xs text-[#6B6B6B]">Weight</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-[#1C1C1C]">89 cm</div>
              <div className="text-xs text-green-600">Normal</div>
              <div className="text-xs text-[#6B6B6B]">Height</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-sm font-bold text-[#1C1C1C]">2yr 4mo</div>
              <div className="text-xs text-[#6B6B6B] mt-1">Age</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white">
          {(['growth', 'nutrition', 'vaccination', 'notes'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-medium capitalize transition-colors ${
                tab === t
                  ? 'text-[#5C35C0] border-b-2 border-[#5C35C0]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {tab === 'growth' && (
            <div className="p-4">
              {/* Growth Chart */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <div className="h-[200px] bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <div className="text-center text-[#6B6B6B]">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-xs">Growth Chart</div>
                    <div className="text-xs">WHO Standard Zone</div>
                  </div>
                </div>
              </div>

              {/* Latest Measurement */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[#1C1C1C]">Latest Measurement</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    Healthy
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-[#6B6B6B] text-xs mb-1">Weight</div>
                    <div className="font-semibold">12.4 kg</div>
                  </div>
                  <div>
                    <div className="text-[#6B6B6B] text-xs mb-1">Height</div>
                    <div className="font-semibold">89 cm</div>
                  </div>
                  <div>
                    <div className="text-[#6B6B6B] text-xs mb-1">MUAC</div>
                    <div className="font-semibold">14.2 cm</div>
                  </div>
                </div>
                <div className="text-xs text-[#6B6B6B] mt-2">Recorded on May 15, 2025</div>
              </div>

              <button className="w-full py-3 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg font-medium">
                Add New Measurement
              </button>
            </div>
          )}

          {tab === 'nutrition' && (
            <div className="p-4">
              {/* Calendar Grid */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <h3 className="font-semibold text-[#1C1C1C] mb-3">May 2025 Distribution</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded flex items-center justify-center text-xs ${
                        i % 4 === 0 ? 'bg-red-100 text-red-600' : i % 7 === 0 ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#1C1C1C] mt-3 font-medium">
                  Received 18/22 days this month
                </p>
              </div>

              {/* Special Nutrition */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-[#1C1C1C] mb-3">Special Nutrition</h3>
                {['THR (Take Home Ration)', 'Iron Tablets', 'Vitamin A'].map((item) => (
                  <label key={item} className="flex items-center gap-3 py-2">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300" />
                    <span className="text-sm text-[#1C1C1C]">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {tab === 'vaccination' && (
            <div className="p-4 space-y-3">
              {[
                { name: 'Measles (MR)', date: 'Jun 15, 2025', status: 'pending', color: 'gray' },
                { name: 'DPT Booster', date: 'May 10, 2025', status: 'done', color: 'green' },
                { name: 'Polio (OPV)', date: 'Apr 5, 2025', status: 'done', color: 'green' },
                { name: 'BCG', date: 'Jan 20, 2023', status: 'done', color: 'green' },
              ].map((vaccine, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#1C1C1C] text-sm">{vaccine.name}</h4>
                      <p className="text-xs text-[#6B6B6B]">Due: {vaccine.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vaccine.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {vaccine.status === 'done' ? '✓ Done' : 'Pending'}
                    </span>
                  </div>
                  {vaccine.status === 'pending' && (
                    <button className="text-xs text-[#5C35C0] font-medium">
                      Send reminder to parent
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'notes' && (
            <div className="p-4 space-y-3">
              {[
                { date: 'May 28, 2025', worker: 'Sunita Ji', note: 'Child is active and responsive. No issues reported by mother.' },
                { date: 'May 15, 2025', worker: 'Sunita Ji', note: 'Weight measurement taken. Growth is normal.' },
              ].map((note, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-[#6B6B6B]">{note.date}</span>
                    <span className="text-xs text-[#6B6B6B]">{note.worker}</span>
                  </div>
                  <p className="text-sm text-[#1C1C1C]">{note.note}</p>
                </div>
              ))}
              <button className="fixed bottom-24 right-8 w-14 h-14 bg-[#5C35C0] rounded-full shadow-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
