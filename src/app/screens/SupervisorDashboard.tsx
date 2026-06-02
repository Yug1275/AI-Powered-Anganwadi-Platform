import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { ArrowLeft, LogOut, ChevronDown, ChevronRight, Bell, User, MapPin, TrendingUp, TrendingDown, FileText, Users, Home, Settings, Download, Share, Eye } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const attendanceData = [
  { name: 'Day 1', attendance: 75 },
  { name: 'Day 5', attendance: 78 },
  { name: 'Day 10', attendance: 82 },
  { name: 'Day 15', attendance: 80 },
  { name: 'Day 20', attendance: 85 },
  { name: 'Day 25', attendance: 83 },
  { name: 'Day 30', attendance: 88 },
];

const COLORS = ['#5C35C0', '#E8A020', '#1A9E6E', '#DC2626'];

const pieData = [
  { name: 'Children', value: 156 },
  { name: 'Attendance Today', value: 78 },
  { name: 'Pending Reports', value: 3 },
  { name: 'High-Risk Children', value: 7 },
];

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col bg-slate-50">
        <StatusBar purple />

        {/* Premium Supervisor Header */}
        <div className="bg-gradient-to-br from-[#5C35C0] to-[#3A1E8A] px-4 pt-4 pb-6 text-white shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-light">Good Morning, Supervisor 👋</p>
              <h1 className="text-2xl font-bold">District Overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative">
                <Bell className="w-6 h-6 text-white/80 hover:text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">3</span>
              </button>
          
              <button onClick={handleLogout}>
                <LogOut className="w-6 h-6 text-white/80 hover:text-white" />
              </button>
            </div>
          </div>
          <p className="text-sm text-white/70 font-medium">Gandhinagar District • 14 Centres</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-6">
          
          {/* District Health Score Card */}
          <div className="p-4 -mt-8">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ value: 87 }, { value: 13 }]} dataKey="value" innerRadius={35} outerRadius={45} startAngle={90} endAngle={450} cornerRadius={5}>
                        <Cell fill="#5C35C0" />
                        <Cell fill="#E5E7EB" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-[#1C1C1C]">87</span>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-md text-[#1C1C1C] mb-2">District Health Score</h3>
                  <div className="space-y-1 text-xs">
                    <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Attendance Healthy</p>
                    <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Nutrition Stable</p>
                    <p className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>Vaccination Follow-ups</p>
                    <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>Reports Submitted</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-slate-100/70 p-3 rounded-lg text-xs text-slate-600 font-medium">
                "Overall district performance is good. 7 children require immediate intervention."
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                icon={<Users className="w-6 h-6"/>}
                value="156"
                label="Total Children"
                trend="↑ 4% from yesterday"
                trendColor="text-green-600"
                color="from-blue-500 to-blue-400"
              />
              <MetricCard
                icon={<FileText className="w-6 h-6"/>}
                value="78%"
                label="Attendance Today"
                trend="↓ 2% this week"
                trendColor="text-red-600"
                color="from-green-500 to-green-400"
              />
              <MetricCard
                icon={<FileText className="w-6 h-6"/>}
                value="3"
                label="Pending Reports"
                trend="No change"
                trendColor="text-slate-500"
                color="from-amber-500 to-amber-400"
              />
              <MetricCard
                icon={<TrendingUp className="w-6 h-6"/>}
                value="7"
                label="High Risk Children"
                trend="↑ 1 from last week"
                trendColor="text-red-600"
                color="from-red-500 to-red-400"
              />
            </div>
          </div>

          {/* AI Priority Alerts */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">AI Priority Alerts</h3>
            <div className="space-y-3">
              <AlertCard
                priority="🔴"
                text="3 centres with attendance below 70%"
              />
              <AlertCard
                priority="🟠"
                text="5 children flagged for growth concerns"
              />
              <AlertCard
                priority="🟡"
                text="2 reports pending approval"
              />
            </div>
          </div>

          {/* Interactive District Map */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">Centre Overview</h3>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="h-48 bg-slate-200 rounded-lg flex items-center justify-center relative">
                <MapPin className="w-10 h-10 text-slate-400" />
                <p className="absolute bottom-2 text-xs text-slate-500">Interactive Map Placeholder</p>
                <CentreMarker name="ICDS 04" status="green" position="top-4 left-8" />
                <CentreMarker name="ICDS 07" status="yellow" position="top-16 right-12" />
                <CentreMarker name="ICDS 12" status="red" position="bottom-6 left-16" />
              </div>
            </div>
          </div>

          {/* Attendance Trend */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">Last 30 Days Attendance</h3>
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#9CA3AF" unit="%" />
                    <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="attendance" stroke="#5C35C0" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                <div>
                  <p className="text-slate-500">Highest</p>
                  <p className="font-bold text-green-600">88%</p>
                </div>
                <div>
                  <p className="text-slate-500">Lowest</p>
                  <p className="font-bold text-red-600">75%</p>
                </div>
                <div>
                  <p className="text-slate-500">Average</p>
                  <p className="font-bold text-[#5C35C0]">82%</p>
                </div>
              </div>
            </div>
          </div>

          {/* High-Risk Children Section */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">Children Needing Intervention</h3>
            <div className="space-y-3">
              {[
                { name: 'Priya Patel', age: '3y 2m', centre: 'ICDS 04', risk: 'Weight faltering', lastVisit: 'Apr 28', riskLevel: 'HIGH' },
                { name: 'Raj Kumar', age: '2y 8m', centre: 'ICDS 07', risk: 'Missed vaccinations', lastVisit: 'May 5', riskLevel: 'MEDIUM' },
                { name: 'Anita Shah', age: '4y 1m', centre: 'ICDS 04', risk: 'Growth concern', lastVisit: 'May 12', riskLevel: 'HIGH' },
              ].map((child, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-md flex items-start gap-4">
                  <img src={`https://i.pravatar.cc/150?u=${child.name}`} alt={child.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-md text-[#1C1C1C]">{child.name}</h4>
                      <RiskBadge level={child.riskLevel as 'HIGH' | 'MEDIUM' | 'LOW'} />
                    </div>
                    <p className="text-xs text-slate-500">{child.age} • {child.centre}</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{child.risk}</p>
                    <p className="text-xs text-slate-400 mt-1">Last visit: {child.lastVisit}</p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 bg-[#5C35C0] text-white rounded-lg text-xs font-medium whitespace-nowrap flex-1">
                        Assign Visit
                      </button>
                      <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium whitespace-nowrap flex-1">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Performance Leaderboard */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">🏆 Top Performing Workers</h3>
            <div className="space-y-2">
              <WorkerCard rank={1} name="Sunita Ji" score="98%" />
              <WorkerCard rank={2} name="Priya Ben" score="94%" />
              <WorkerCard rank={3} name="Rekha Ben" score="91%" />
            </div>
          </div>

          {/* AI Insights Command Center */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">AI Recommendations</h3>
            <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
              <InsightCard icon="📈" text="Attendance improving in ICDS 04" />
              <InsightCard icon="⚠️" text="Growth faltering detected in ICDS 07" />
              <InsightCard icon="🏠" text="Recommend 12 targeted home visits" />
              <InsightCard icon="💉" text="Vaccination follow-up required for 8 children" />
              <button className="w-full mt-2 px-4 py-2 bg-[#5C35C0] text-white rounded-lg text-sm font-bold">
                View Full Analysis
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-lg text-[#1C1C1C] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              <QuickAction icon={<FileText />} label="Review Reports" />
              <QuickAction icon={<Users />} label="High-Risk" />
              <QuickAction icon={<Home />} label="Home Visits" />
              <QuickAction icon={<TrendingUp />} label="Analytics" />
              <QuickAction icon={<Download />} label="Download" />
              <QuickAction icon={<Settings />} label="Settings" />
            </div>
          </div>

          {/* District Report Download */}
          <div className="px-4">
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h3 className="font-bold text-md text-[#1C1C1C] mb-1">Monthly District Report</h3>
              <p className="text-xs text-slate-500 mb-4">Generate consolidated report for all centres.</p>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button className="flex-1 px-4 py-2 bg-[#5C35C0] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PhoneFrame>
  );
}

function MetricCard({ icon, value, label, trend, trendColor, color }: { icon: React.ReactNode; value: string; label: string; trend: string; trendColor: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${color} text-white mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-[#1C1C1C]">{value}</div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`text-xs font-semibold ${trendColor}`}>{trend}</div>
    </div>
  );
}

function AlertCard({ priority, text }: { priority: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">{priority}</span>
        <p className="text-sm font-medium text-slate-700">{text}</p>
      </div>
      <button>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </button>
    </div>
  );
}

function CentreMarker({ name, status, position }: { name: string; status: 'green' | 'yellow' | 'red'; position: string }) {
  const color = status === 'green' ? 'bg-green-500' : status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className={`absolute ${position} flex flex-col items-center`}>
      <div className={`w-3 h-3 ${color} rounded-full border-2 border-white shadow-lg`}></div>
      <span className="text-[10px] font-bold text-slate-600 bg-white/50 px-1 rounded">{name}</span>
    </div>
  );
}

function RiskBadge({ level }: { level: 'HIGH' | 'MEDIUM' | 'LOW' }) {
  const styles = {
    HIGH: 'bg-red-100 text-red-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    LOW: 'bg-green-100 text-green-700',
  };
  return <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${styles[level]}`}>{level}</span>;
}

function WorkerCard({ rank, name, score }: { rank: number; name: string; score: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold text-slate-400 w-6 text-center">{rank}</span>
        <div >
          <p className="font-bold text-md text-[#1C1C1C]">{name}</p>
          <p className="text-xs text-slate-500">Completion Rate</p>
        </div>
      </div>
      <span className="text-lg font-bold text-[#5C35C0]">{score}</span>
    </div>
  );
}

function InsightCard({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-slate-100/70 rounded-lg">
      <span className="text-xl">{icon}</span>
      <p className="text-sm text-slate-700 font-medium">{text}</p>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-md flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#5C35C0] mb-2">
        {icon}
      </div>
      <p className="text-xs font-semibold text-slate-600">{label}</p>
    </div>
  );
}
