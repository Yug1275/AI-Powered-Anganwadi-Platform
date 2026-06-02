import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Filter, Phone, Check, MapPin, Sparkles } from 'lucide-react';

export default function HomeVisitAssistant() {
  const navigate = useNavigate();

  const visits = [
    {
      name: 'Priya Patel',
      age: '3yr 2mo',
      status: 'overdue',
      badge: 'HIGH RISK',
      color: 'red',
      address: '12 Moti Nagar, Near Temple',
      distance: '2.3 km',
      lastVisit: '28 Apr',
      reason: 'Weight faltering, missed 2 months',
    },
    {
      name: 'Ananya Patel',
      age: '2yr 4mo',
      status: 'due',
      badge: 'DUE TODAY',
      color: 'amber',
      address: '45 Gandhi Road, Sector 7',
      distance: '1.8 km',
      lastVisit: '15 May',
      reason: 'Monthly checkup',
    },
    {
      name: 'Rahul Kumar',
      age: '3yr 1mo',
      status: 'scheduled',
      badge: 'SCHEDULED',
      color: 'green',
      address: '8 Station Road, Block C',
      distance: '3.1 km',
      lastVisit: '20 May',
      reason: 'Vaccination follow-up',
    },
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
          <h1 className="font-bold text-white">Home Visits</h1>
          <button>
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Summary Strip */}
        <div className="bg-[#5C35C0] px-4 pb-4 flex gap-2">
          <div className="flex-1 bg-white/20 rounded-lg px-3 py-2 text-center">
            <div className="text-white font-bold">5</div>
            <div className="text-white/90 text-xs">Due Today</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-lg px-3 py-2 text-center">
            <div className="text-white font-bold">3</div>
            <div className="text-white/90 text-xs">Overdue</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-lg px-3 py-2 text-center">
            <div className="text-white font-bold">12</div>
            <div className="text-white/90 text-xs">This Month</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* AI Recommendation Banner */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-[#E8A020]/20 to-[#E8A020]/10 border-l-4 border-[#E8A020] rounded-lg p-4 flex gap-3">
              <Sparkles className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#1C1C1C]">
                Visit Priya Patel first — missed 2 consecutive months, weight concern flagged
              </p>
            </div>
          </div>

          {/* Priority Visits */}
          <div className="px-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-[#1C1C1C]">Priority Visits Today</h3>
              <span className="px-2 py-0.5 bg-[#F0ECFF] text-[#5C35C0] text-xs font-medium rounded-full">
                AI
              </span>
            </div>

            <div className="space-y-3">
              {visits.map((visit, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                    visit.color === 'red'
                      ? 'border-red-500'
                      : visit.color === 'amber'
                      ? 'border-amber-500'
                      : 'border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-[#1C1C1C]">
                        {visit.name} · {visit.age}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        visit.color === 'red'
                          ? 'bg-red-100 text-red-700'
                          : visit.color === 'amber'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {visit.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6B6B] mb-1">
                    {visit.address} · {visit.distance}
                  </p>
                  <p className="text-xs text-[#6B6B6B] mb-3">
                    Last visit: {visit.lastVisit} · {visit.reason}
                  </p>

                  <div className="flex gap-2">
                    <button className="flex-1 h-9 border border-[#5C35C0] text-[#5C35C0] rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3" />
                      Call
                    </button>
                    <button className="flex-1 h-9 border border-green-600 text-green-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" />
                      Mark Visited
                    </button>
                    <button className="flex-1 h-9 border border-blue-600 text-blue-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Visits */}
          <div className="px-4 mb-6">
            <details className="bg-white rounded-xl shadow-sm">
              <summary className="p-4 cursor-pointer font-semibold text-[#1C1C1C] flex items-center justify-between">
                Completed This Month
                <span className="text-xs text-[#6B6B6B]">12 visits</span>
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {['Sneha Desai - May 28', 'Amit Shah - May 27', 'Raj Sharma - May 25'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-[#1C1C1C]">{item}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
