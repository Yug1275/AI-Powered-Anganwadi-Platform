import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { ArrowLeft, LogOut, ChevronDown, ChevronRight } from 'lucide-react';

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/login')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white">Supervisor View</h1>
          <button onClick={() => navigate('/login')}>
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Centre Selector */}
          <div className="p-4">
            <button className="w-full bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow-sm border border-gray-200">
              <span className="font-medium text-[#1C1C1C]">ICDS Block 4 — Gandhinagar</span>
              <ChevronDown className="w-5 h-5 text-[#6B6B6B]" />
            </button>
          </div>

          {/* Key Metrics */}
          <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                icon="👶"
                value="156"
                label="Total Children"
                color="bg-blue-50"
              />
              <MetricCard
                icon="📊"
                value="78%"
                label="Attendance Today"
                color="bg-green-50"
              />
              <MetricCard
                icon="📄"
                value="3"
                label="Pending Reports"
                color="bg-amber-50"
              />
              <div className="bg-red-50 rounded-xl p-4 shadow-sm relative">
                <div className="text-2xl mb-2">⚠️</div>
                <div className="text-2xl font-bold text-[#1C1C1C] mb-1">7</div>
                <div className="text-xs text-[#6B6B6B]">High-Risk Children</div>
                <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  7
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">Attendance Trend</h3>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="h-[180px] bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-[#6B6B6B]">
                  <div className="text-4xl mb-2">📈</div>
                  <div className="text-xs">Last 30 days trend</div>
                </div>
              </div>
            </div>
          </div>

          {/* High-Risk Children */}
          <div className="px-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-[#1C1C1C]">Children Needing Intervention</h3>
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                7
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Priya Patel', centre: 'ICDS 04', risk: 'Weight faltering', lastVisit: 'Apr 28' },
                { name: 'Raj Kumar', centre: 'ICDS 07', risk: 'Missed vaccinations', lastVisit: 'May 5' },
                { name: 'Anita Shah', centre: 'ICDS 04', risk: 'Growth concern', lastVisit: 'May 12' },
              ].map((child, i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#1C1C1C]">{child.name}</h4>
                    <p className="text-xs text-[#6B6B6B]">
                      {child.centre} · {child.risk}
                    </p>
                    <p className="text-xs text-[#6B6B6B]">Last visit: {child.lastVisit}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#5C35C0] text-white rounded-lg text-xs font-medium whitespace-nowrap">
                    Assign Visit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Performance */}
          <div className="px-4 mb-6">
            <h3 className="font-semibold text-[#1C1C1C] mb-3">Worker Activity This Week</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-[#6B6B6B]">Worker</th>
                    <th className="text-center p-3 font-semibold text-[#6B6B6B]">Attend.</th>
                    <th className="text-center p-3 font-semibold text-[#6B6B6B]">Reports</th>
                    <th className="text-center p-3 font-semibold text-[#6B6B6B]">Visits</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Sunita Ji', attendance: '✅', reports: '✅', visits: '✅' },
                    { name: 'Priya D.', attendance: '✅', reports: '⚠️', visits: '✅' },
                    { name: 'Rekha S.', attendance: '⚠️', reports: '✅', visits: '❌' },
                  ].map((worker, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-3 font-medium text-[#1C1C1C]">{worker.name}</td>
                      <td className="p-3 text-center">{worker.attendance}</td>
                      <td className="p-3 text-center">{worker.reports}</td>
                      <td className="p-3 text-center">{worker.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Insights */}
          <div className="px-4 mb-6">
            <div className="bg-gradient-to-r from-[#E8A020] to-[#C87F10] rounded-xl p-4 text-white">
              <p className="text-sm mb-3">
                Centre A has below-average attendance for 3 weeks. 5 children show growth faltering. Recommend targeted home visits.
              </p>
              <button className="flex items-center gap-1 text-white text-sm font-medium">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function MetricCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className={`${color} rounded-xl p-4 shadow-sm`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-[#1C1C1C] mb-1">{value}</div>
      <div className="text-xs text-[#6B6B6B]">{label}</div>
    </div>
  );
}
