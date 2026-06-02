import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, MapPin, Camera, Edit3 } from 'lucide-react';

export default function SmartAttendance() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'location' | 'photo' | 'manual'>('location');
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});

  const children = [
    { id: 1, name: 'Ananya Patel', age: '2yr 4mo', initials: 'AP', color: 'bg-pink-400' },
    { id: 2, name: 'Rahul Kumar', age: '3yr 1mo', initials: 'RK', color: 'bg-blue-400' },
    { id: 3, name: 'Priya Singh', age: '2yr 8mo', initials: 'PS', color: 'bg-green-400' },
    { id: 4, name: 'Amit Shah', age: '3yr 5mo', initials: 'AS', color: 'bg-purple-400' },
    { id: 5, name: 'Sneha Desai', age: '2yr 2mo', initials: 'SD', color: 'bg-orange-400' },
  ];

  const markedCount = Object.values(attendance).filter(Boolean).length;

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white">Mark Attendance</h1>
          <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">
            Jun 3
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white px-4 py-3 flex gap-2 border-b">
          <TabButton
            active={tab === 'location'}
            onClick={() => setTab('location')}
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
          />
          <TabButton
            active={tab === 'photo'}
            onClick={() => setTab('photo')}
            icon={<Camera className="w-4 h-4" />}
            label="Group Photo"
          />
          <TabButton
            active={tab === 'manual'}
            onClick={() => setTab('manual')}
            icon={<Edit3 className="w-4 h-4" />}
            label="Manual"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          {tab === 'location' && (
            <div className="p-4">
              {/* Map Preview */}
              <div className="h-[200px] bg-gray-200 rounded-xl relative mb-4 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-[#5C35C0]" />
                <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  Within centre radius ✓
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <div className="text-sm font-semibold text-[#1C1C1C]">Ready to mark</div>
                <div className="text-xs text-[#6B6B6B]">12m from ICDS Centre 04</div>
              </div>

              {/* Children List */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-[#1C1C1C] mb-3">
                  32 Children · {markedCount} marked
                </div>

                {children.map((child) => (
                  <div key={child.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                    <div className={`w-10 h-10 ${child.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                      {child.initials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1C1C1C]">{child.name}</div>
                      <div className="text-xs text-[#6B6B6B]">{child.age}</div>
                    </div>
                    <label className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={attendance[child.id] || false}
                        onChange={() => setAttendance({ ...attendance, [child.id]: !attendance[child.id] })}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                    </label>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg font-medium mb-4">
                Mark All Present
              </button>
            </div>
          )}

          {tab === 'photo' && (
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <div className="w-full h-[300px] bg-gray-200 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-[#6B6B6B] text-center mb-4">
                Take a group photo — AI will auto-detect faces
              </p>
              <button className="w-full h-12 bg-[#5C35C0] text-white rounded-lg font-medium">
                Open Camera
              </button>
            </div>
          )}

          {tab === 'manual' && (
            <div className="p-4">
              <input
                type="text"
                placeholder="Search child name..."
                className="w-full h-12 px-4 bg-gray-100 rounded-lg text-sm mb-4"
              />
              {children.map((child) => (
                <div key={child.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <div className={`w-10 h-10 ${child.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                    {child.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#1C1C1C]">{child.name}</div>
                    <div className="text-xs text-[#6B6B6B]">{child.age}</div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={attendance[child.id] || false}
                      onChange={() => setAttendance({ ...attendance, [child.id]: !attendance[child.id] })}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Bottom */}
        <div className="absolute bottom-16 left-0 right-0 bg-white border-t p-4 z-30">
          <div className="text-center text-sm text-[#6B6B6B] mb-2">
            {markedCount} / 32 marked
          </div>
          <button className="w-full h-[52px] bg-[#5C35C0] text-white rounded-lg font-medium">
            Submit Attendance
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
      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
        active ? 'bg-[#5C35C0] text-white' : 'bg-gray-100 text-[#6B6B6B]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
