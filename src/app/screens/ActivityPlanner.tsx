import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Calendar, ChevronRight, Sparkles } from 'lucide-react';

export default function ActivityPlanner() {
  const navigate = useNavigate();

  const activities = [
    { name: 'Story Time: Panchatantra Tales', category: 'Language', duration: '15 min', icon: '📚', color: 'bg-blue-100' },
    { name: 'Number Recognition Game', category: 'Math', duration: '20 min', icon: '🔢', color: 'bg-green-100' },
    { name: 'Jumping & Hopping', category: 'Motor Skills', duration: '25 min', icon: '🤸', color: 'bg-orange-100' },
    { name: 'Rhyme Time: Nursery Songs', category: 'Songs', duration: '10 min', icon: '🎵', color: 'bg-purple-100' },
  ];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white">Activity Planner</h1>
          <button>
            <Calendar className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Today's Activity Hero Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-[#E8A020] to-[#C87F10] rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full">
                  AI Recommended
                </span>
                <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full">
                  Age 2-3 years
                </span>
              </div>
              <h2 className="font-bold text-[22px] mb-3">Colour Sorting Game</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 border border-white rounded-full text-xs">
                  20 minutes
                </span>
              </div>
              <p className="text-sm mb-4 opacity-90">
                Materials: Red/blue/yellow blocks · 3 bowls
              </p>
              <button
                onClick={() => navigate('/activity-walkthrough/1')}
                className="w-full bg-white text-[#E8A020] py-3 rounded-lg font-medium"
              >
                Start Activity
              </button>
            </div>
          </div>

          {/* Weekly Planner */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">This Week</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div
                  key={day}
                  className={`flex-shrink-0 w-[110px] rounded-xl p-3 ${
                    i === 1 ? 'bg-[#F0ECFF] border-2 border-[#5C35C0]' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="text-xs font-medium text-[#6B6B6B] mb-1">{day}</div>
                  <div className="text-sm font-semibold text-[#1C1C1C] mb-1 truncate">
                    {i === 1 ? 'Colour Sorting' : 'Story Time'}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">{i === 1 ? '20 min' : '15 min'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Library */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">Browse Activities</h3>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
              {['All', 'Language', 'Math', 'Motor Skills', 'Stories', 'Songs'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    filter === 'All'
                      ? 'bg-[#5C35C0] text-white'
                      : 'bg-gray-100 text-[#6B6B6B]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Activity List */}
            <div className="space-y-3">
              {activities.map((activity, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#1C1C1C] truncate">{activity.name}</h4>
                    <p className="text-xs text-[#6B6B6B]">
                      {activity.category} · {activity.duration}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6B6B6B] flex-shrink-0" />
                </div>
              ))}

              {/* Generate Custom Activity */}
              <div className="border-2 border-dashed border-[#5C35C0] rounded-xl p-4 flex items-center justify-center gap-2 text-[#5C35C0]">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Generate for your children's age group</span>
              </div>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
