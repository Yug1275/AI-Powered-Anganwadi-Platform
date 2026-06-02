import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { Bell, Menu, Mic, User } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* Top Bar */}
        <div className="h-14 bg-[#5C35C0] flex items-center justify-between px-4 sticky top-12 z-40">
          <Menu className="w-6 h-6 text-white" />
          <span className="text-white font-semibold text-lg">Saathi</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8A020] rounded-full text-white text-[10px] flex items-center justify-center">3</div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-20">
          {/* AI Morning Briefing Card */}
          <div className="mt-4 bg-gradient-to-br from-[#5C35C0] to-[#3A1E8A] rounded-2xl p-5 text-white shadow-lg">
            <div className="text-lg font-semibold">Good morning, Sunita Ji 🌅</div>
            <div className="text-xs opacity-70 mt-1">Tuesday, 3 June 2025</div>

            <div className="h-px bg-white/20 my-4" />

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <div className="px-3 py-1.5 bg-blue-500 rounded-full text-xs whitespace-nowrap flex-shrink-0">32 children</div>
              <div className="px-3 py-1.5 bg-[#E8A020] rounded-full text-xs whitespace-nowrap flex-shrink-0">5 home visits due</div>
              <div className="px-3 py-1.5 bg-red-500 rounded-full text-xs whitespace-nowrap flex-shrink-0">2 reports pending</div>
              <div className="px-3 py-1.5 bg-green-500 rounded-full text-xs whitespace-nowrap flex-shrink-0">Nutrition day</div>
            </div>

            <div className="mt-4 text-xs italic opacity-90">
              AI tip: Start with nutrition distribution before 10am — 8 children haven't received this month's ration.
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-base font-semibold text-[#1C1C1C] mb-3">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              <ActionCard emoji="📍" title="Smart Attendance" subtitle="Voice · group · manual" onClick={() => navigate('/attendance')} />
              <ActionCard emoji="👶" title="Child Profiles" subtitle="Progress · growth · vaccine" onClick={() => navigate('/child/1')} />
              <ActionCard emoji="🎨" title="AI Activity Planner" subtitle="AI generated for today" onClick={() => navigate('/activities')} />
              <ActionCard emoji="▶️" title="Activity Walkthrough" subtitle="Audio · video · print" onClick={() => navigate('/activity-walkthrough/1')} />
              <ActionCard emoji="🏠" title="Home Visit Assistant" subtitle="Priority visits today" onClick={() => navigate('/home-visits')} />
              <ActionCard emoji="👨‍👩‍👧" title="Parent Connect" subtitle="Send alerts & meetings" onClick={() => navigate('/parent-connect')} />
              <ActionCard emoji="📄" title="AI Report Generator" subtitle="One-tap daily report" onClick={() => navigate('/reports')} />
              <ActionCard emoji="🧠" title="Worker Wellness" subtitle="AI prioritization" onClick={() => navigate('/wellness')} />
            </div>
          </div>

          {/* Offline Sync Status */}
          <div className="mt-6 bg-[#F0FFF4] border border-green-200 rounded-lg p-3 flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-[#1C1C1C]">All data synced · Last sync 2 mins ago</span>
            </div>
            <button className="text-sm text-[#5C35C0] font-medium">Sync now</button>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 right-8 z-50">
          <div className="relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white text-[#5C35C0] text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-sm">AI</div>
            <button className="w-14 h-14 bg-[#5C35C0] rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A2A9F] transition-colors">
              <Mic className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}

function ActionCard({ emoji, title, subtitle, onClick }: { emoji: string; title: string; subtitle: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left">
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="text-sm font-semibold text-[#1C1C1C] mb-0.5">{title}</div>
      <div className="text-xs text-[#6B6B6B] leading-tight">{subtitle}</div>
    </button>
  );
}
