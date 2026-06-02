import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Edit, Plus, Calendar, Sparkles, X, ChevronRight } from 'lucide-react';
import { t, translations } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

// High-fidelity list of mock children profiles
const childrenList = [
  { id: 1, nameKey: 'child1Name', age: '2 yr 4 mo', gender: '👧', idCode: 'CH-2847', weight: '12.4 kg', height: '89 cm', muac: '14.2 cm', status: 'healthyStatus', center: 'ICDS 04', border: 'border-pink-200', bg: 'from-[#1A9E6E] to-[#0D7A50]', emoji: '👧' },
  { id: 2, nameKey: 'child2Name', age: '3 yr 1 mo', gender: '👦', idCode: 'CH-3092', weight: '14.2 kg', height: '96 cm', muac: '15.1 cm', status: 'healthyStatus', center: 'ICDS 04', border: 'border-blue-200', bg: 'from-blue-600 to-indigo-700', emoji: '👦' },
  { id: 3, nameKey: 'child3Name', age: '2 yr 8 mo', gender: '👧', idCode: 'CH-1948', weight: '10.2 kg', height: '91 cm', muac: '13.5 cm', status: 'underweightStatus', center: 'ICDS 04', border: 'border-yellow-200', bg: 'from-[#E8A020] to-[#B3740D]', emoji: '👧' },
  { id: 4, nameKey: 'child4Name', age: '3 yr 5 mo', gender: '👦', idCode: 'CH-4821', weight: '15.9 kg', height: '102 cm', muac: '16.0 cm', status: 'healthyStatus', center: 'ICDS 04', border: 'border-purple-200', bg: 'from-[#5C35C0] to-[#3A1E8A]', emoji: '👦' },
  { id: 5, nameKey: 'child5Name', age: '2 yr 2 mo', gender: '👧', idCode: 'CH-2294', weight: '11.5 kg', height: '86 cm', muac: '14.0 cm', status: 'healthyStatus', center: 'ICDS 04', border: 'border-orange-200', bg: 'from-orange-500 to-amber-600', emoji: '👧' },
];

const childVaccinations: Record<number, Array<{ name: string; date: string; status: 'done' | 'pending' }>> = {
  1: [
    { name: 'Measles (MR)', date: 'Jun 15, 2025', status: 'pending' },
    { name: 'DPT Booster 1', date: 'May 10, 2025', status: 'done' },
    { name: 'Polio (OPV) 3', date: 'Apr 5, 2025', status: 'done' },
    { name: 'BCG', date: 'Jan 20, 2023', status: 'done' },
  ],
  2: [
    { name: 'DPT Booster 2', date: 'Jul 20, 2025', status: 'pending' },
    { name: 'Polio (OPV) 4', date: 'May 18, 2025', status: 'done' },
    { name: 'BCG', date: 'Jan 15, 2023', status: 'done' },
  ],
  3: [
    { name: 'Measles (MR) 1', date: 'May 15, 2025', status: 'pending' },
    { name: 'Vitamin A Dose 2', date: 'May 10, 2025', status: 'done' },
    { name: 'Polio (OPV)', date: 'Dec 12, 2024', status: 'done' },
  ],
  4: [
    { name: 'Measles (MR) 2', date: 'Aug 05, 2025', status: 'pending' },
    { name: 'Polio (OPV) 4', date: 'Jun 01, 2025', status: 'done' },
    { name: 'BCG', date: 'Nov 10, 2022', status: 'done' },
  ],
  5: [
    { name: 'DPT Booster 1', date: 'Jun 28, 2025', status: 'pending' },
    { name: 'Polio (OPV) 3', date: 'Mar 15, 2025', status: 'done' },
    { name: 'BCG', date: 'Apr 10, 2024', status: 'done' },
  ],
};

const childNotes: Record<number, Array<{ date: string; workerKey: string; noteKey: string }>> = {
  1: [
    { date: 'May 28, 2025', workerKey: 'workerNameShort', noteKey: 'noteChildActive' },
    { date: 'May 15, 2025', workerKey: 'workerNameShort', noteKey: 'noteWeightNormal' },
  ],
  2: [
    { date: 'May 30, 2025', workerKey: 'workerNameShort', noteKey: 'noteMotorSkills' },
  ],
  3: [
    { date: 'May 25, 2025', workerKey: 'workerNameShort', noteKey: 'noteLethargic' },
  ],
  4: [
    { date: 'Jun 01, 2025', workerKey: 'workerNameShort', noteKey: 'noteEnergetic' },
  ],
  5: [
    { date: 'May 20, 2025', workerKey: 'workerNameShort', noteKey: 'noteSnehaWeight' },
  ],
};

export default function ChildProfile() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'growth' | 'nutrition' | 'vaccination' | 'notes'>('growth');
  
  // Local CRUD children list state
  const [children, setChildren] = useState(() => {
    const saved = localStorage.getItem('anganwadiChildren');
    return saved ? JSON.parse(saved) : childrenList;
  });

  const { id } = useParams();

  // Selected child state
  const [selectedChildId, setSelectedChildId] = useState<number>(() => {
    return id ? Number(id) : 1;
  });

  useEffect(() => {
    if (id) {
      setSelectedChildId(Number(id));
    }
  }, [id]);

  // Overlays & form states
  const [addChildOpen, setAddChildOpen] = useState(false);
  const [editChildOpen, setEditChildOpen] = useState(false);
  const [childMenuOpen, setChildMenuOpen] = useState(false);
  const [whatsappAlertOpen, setWhatsappAlertOpen] = useState(false);

  // Add child form states
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('👧');
  const [newParentNum, setNewParentNum] = useState('+91 98765 43210');
  const [newCentreId, setNewCentreId] = useState('ICDS Centre 04');
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newMUAC, setNewMUAC] = useState('');

  // Edit child form states
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editGender, setEditGender] = useState('👧');
  const [editParentNum, setEditParentNum] = useState('+91 98765 43210');
  const [editCentreId, setEditCentreId] = useState('ICDS Centre 04');
  const [editWeight, setEditWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editMUAC, setEditMUAC] = useState('');

  // Sync children changes locally
  useEffect(() => {
    localStorage.setItem('anganwadiChildren', JSON.stringify(children));
  }, [children]);

  // Retrieve selected child details
  const activeChild = children.find(c => c.id === selectedChildId) || children[0] || childrenList[0];
  const vaccines = childVaccinations[activeChild.id] || [];
  const notes = childNotes[activeChild.id] || [];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h3 className="font-bold text-white tracking-wide">{t('childProfilesTitle')}</h3>
          <div className="flex items-center gap-1.5">
            <ConnectivityStatus />
            <button 
              onClick={() => setAddChildOpen(true)}
              className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
              title="Add Child"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Dynamic Child Selector Dropdown */}
        <div className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 z-10 flex items-center justify-between gap-3">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {t('selectStudent') || 'Select Student'}:
          </label>
          <div className="relative flex-1">
            <select
              value={selectedChildId}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSelectedChildId(val);
                navigate(`/child/${val}`, { replace: true });
              }}
              className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#1C1C1C] shadow-sm focus:outline-none focus:border-[#5C35C0] appearance-none"
            >
              {children.map((child: any) => (
                <option key={child.id} value={child.id}>
                  {child.emoji} {child.nameVal || t(child.nameKey)} ({child.age})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className={`bg-gradient-to-br ${activeChild.bg} p-5 rounded-b-2xl shadow-md transition-all duration-300 text-white z-10 relative`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl shadow-inner animate-pulse">
                {activeChild.emoji}
              </div>
              <div>
                <h2 className="text-white font-extrabold text-xl tracking-tight">{activeChild.nameVal || t(activeChild.nameKey)}</h2>
                <p className="text-white/90 text-xs font-semibold">{t('ageLabel')}: {activeChild.age}</p>
              </div>
            </div>
            
            {/* Context Menu Button */}
            <div className="relative">
              <button 
                onClick={() => setChildMenuOpen(!childMenuOpen)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold flex items-center justify-center active:scale-90 transition-transform"
              >
                ⋮
              </button>
              
              {childMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 z-50 text-slate-800 text-[10px] font-bold py-1 animate-fade-in">
                  <button 
                    onClick={() => {
                      setChildMenuOpen(false);
                      setEditName(activeChild.nameVal || t(activeChild.nameKey));
                      setEditAge(activeChild.age);
                      setEditGender(activeChild.gender === '👦' ? '👦' : '👧');
                      setEditParentNum(activeChild.parentNum || '+91 98765 43210');
                      setEditCentreId(activeChild.center);
                      setEditWeight(activeChild.weight || '');
                      setEditHeight(activeChild.height || '');
                      setEditMUAC(activeChild.muac || '');
                      setEditChildOpen(true);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-1.5 border-b"
                  >
                    ✏️ Edit Child
                  </button>
                  <button 
                    onClick={() => {
                      setChildMenuOpen(false);
                      const confirmDel = window.confirm(t('deleteChildConfirm') || 'Are you sure you want to delete this child profile?');
                      if (confirmDel) {
                        const updated = children.filter(c => c.id !== activeChild.id);
                        setChildren(updated);
                        localStorage.setItem('anganwadiChildren', JSON.stringify(updated));
                        if (updated.length > 0) {
                          setSelectedChildId(updated[0].id);
                          navigate(`/child/${updated[0].id}`, { replace: true });
                        } else {
                          navigate('/dashboard');
                        }
                        window.dispatchEvent(new CustomEvent('show-toast', { 
                          detail: { message: 'Child profile deleted successfully.' } 
                        }));
                      }
                    }}
                    className="w-full text-left px-3 py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-1.5 border-b"
                  >
                    🗑️ Delete Child
                  </button>
                  <button 
                    onClick={() => {
                      setChildMenuOpen(false);
                      alert('Child profile archived successfully!');
                    }}
                    className="w-full text-left px-3 py-2.5 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                  >
                    📦 Archive Child
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-white/80 text-[10px] font-bold tracking-wider uppercase mb-4">
            Centre: {activeChild.center}  ·  ID: {activeChild.idCode}
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-white/5 transition-transform hover:scale-105 duration-200">
              <div className="text-xs font-bold text-[#1C1C1C]">{activeChild.weight}</div>
              <div className="text-[10px] font-bold text-green-600 uppercase tracking-wide mt-0.5">{t('normalStatus')}</div>
              <div className="text-[9px] text-[#6B6B6B] font-semibold uppercase">{t('weightLabel')}</div>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-white/5 transition-transform hover:scale-105 duration-200">
              <div className="text-xs font-bold text-[#1C1C1C]">{activeChild.height}</div>
              <div className="text-[10px] font-bold text-green-600 uppercase tracking-wide mt-0.5">{t('normalStatus')}</div>
              <div className="text-[9px] text-[#6B6B6B] font-semibold uppercase">{t('heightLabel')}</div>
            </div>
            <div className="bg-white rounded-xl p-2.5 text-center shadow-sm border border-white/5 transition-transform hover:scale-105 duration-200">
              <div className="text-xs font-bold text-[#1C1C1C]">{activeChild.muac}</div>
              <div className={`text-[10px] font-bold uppercase tracking-wide mt-0.5 ${activeChild.status === 'underweightStatus' ? 'text-red-500' : 'text-green-600'}`}>
                {t(activeChild.status)}
              </div>
              <div className="text-[9px] text-[#6B6B6B] font-semibold uppercase">MUAC</div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b bg-white shadow-sm z-10">
          {[
            { id: 'growth', label: t('growthTab') },
            { id: 'nutrition', label: t('nutritionTab') },
            { id: 'vaccination', label: t('vaccineTab') },
            { id: 'notes', label: t('notesTab') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
                tab === item.id
                  ? 'text-[#5C35C0] border-b-3 border-[#5C35C0]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Scrollable Sub-Content */}
        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide bg-slate-50">
          {tab === 'growth' && (
            <div className="p-4 animate-page-fade">
              {/* WHO Growth Chart Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">WHO Growth Chart</h3>
                  <div className="flex gap-2 text-[9px] font-bold">
                    <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"/>Healthy</span>
                    <span className="flex items-center gap-1 text-yellow-600"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block"/>Monitor</span>
                    <span className="flex items-center gap-1 text-red-500"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"/>Risk</span>
                  </div>
                </div>
                
                {/* SVG Chart */}
                <div className="w-full h-[175px] bg-slate-50 rounded-xl p-2 border border-slate-100 flex items-center justify-center relative">
                  <svg className="w-full h-full" viewBox="0 0 300 150">
                    <defs>
                      <linearGradient id="chart-green" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="chart-yellow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#facc15" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="chart-red" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#f87171" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Zone Paths (Red -> Yellow -> Green) */}
                    <path d="M 30,140 Q 150,130 270,120 L 270,140 L 30,140 Z" fill="url(#chart-red)" />
                    <path d="M 30,110 Q 150,90 270,80 L 270,120 Q 150,130 30,140 Z" fill="url(#chart-yellow)" />
                    <path d="M 30,70 Q 150,50 270,40 L 270,80 Q 150,90 30,110 Z" fill="url(#chart-green)" />

                    {/* Zone dividers */}
                    <path d="M 30,140 Q 150,130 270,120" stroke="#f87171" strokeWidth="1" strokeDasharray="2,2" fill="none" />
                    <path d="M 30,110 Q 150,90 270,80" stroke="#eab308" strokeWidth="1" strokeDasharray="2,2" fill="none" />
                    <path d="M 30,70 Q 150,50 270,40" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" fill="none" />

                    {/* Grid lines */}
                    <line x1="30" y1="140" x2="270" y2="140" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="30" y1="20" x2="30" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Child Weight History Line */}
                    {activeChild.status === 'underweightStatus' ? (
                      <>
                        <path d="M 40,118 L 95,110 L 150,115 L 205,122 L 260,130" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="40" cy="118" r="3.5" fill="#e11d48" />
                        <circle cx="95" cy="110" r="3.5" fill="#e11d48" />
                        <circle cx="150" cy="115" r="3.5" fill="#e11d48" />
                        <circle cx="205" cy="122" r="3.5" fill="#e11d48" />
                        <circle cx="260" cy="130" r="5" fill="#e11d48" className="animate-pulse" />
                        <circle cx="260" cy="130" r="2" fill="#ffffff" />
                      </>
                    ) : (
                      <>
                        <path d="M 40,125 L 95,112 L 150,90 L 205,74 L 260,62" fill="none" stroke="#5c35c0" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="40" cy="125" r="3.5" fill="#5c35c0" />
                        <circle cx="95" cy="112" r="3.5" fill="#5c35c0" />
                        <circle cx="150" cy="90" r="3.5" fill="#5c35c0" />
                        <circle cx="205" cy="74" r="3.5" fill="#5c35c0" />
                        <circle cx="260" cy="62" r="5" fill="#5c35c0" className="animate-pulse" />
                        <circle cx="260" cy="62" r="2" fill="#ffffff" />
                      </>
                    )}

                    {/* Labels */}
                    <text x="35" y="148" fontSize="6" fontWeight="bold" fill="#94a3b8">12m</text>
                    <text x="90" y="148" fontSize="6" fontWeight="bold" fill="#94a3b8">15m</text>
                    <text x="145" y="148" fontSize="6" fontWeight="bold" fill="#94a3b8">18m</text>
                    <text x="200" y="148" fontSize="6" fontWeight="bold" fill="#94a3b8">21m</text>
                    <text x="255" y="148" fontSize="6" fontWeight="bold" fill="#94a3b8">24m</text>

                    {/* Y Axis Labels */}
                    <text x="18" y="70" fontSize="6" fontWeight="bold" fill="#94a3b8" transform="rotate(-90 18 70)">Weight (kg)</text>
                    <text x="268" y="58" fontSize="8" fontWeight="extrabold" fill={activeChild.status === 'underweightStatus' ? '#e11d48' : '#5c35c0'}>{activeChild.weight}</text>
                  </svg>
                  
                  {/* Overlay text */}
                  <div className={`absolute bottom-2 left-10 text-[7px] font-bold px-2 py-0.5 rounded border ${activeChild.status === 'underweightStatus' ? 'text-red-700 bg-red-50 border-red-100' : 'text-emerald-700 bg-emerald-50 border-emerald-100'}`}>
                     Current Weight: {activeChild.weight} ({activeChild.status === 'underweightStatus' ? 'Growth Risk' : 'Healthy Growth'})
                  </div>
                </div>
              </div>

              {/* Latest Record Summary */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                  <h3 className="font-bold text-[#1C1C1C] text-sm">{t('latestMeasurement')}</h3>
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase ${activeChild.status === 'underweightStatus' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    {t(activeChild.status)}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                  <div>
                    <div className="text-[#6B6B6B] text-[10px] uppercase font-semibold mb-0.5">{t('weightLabel')}</div>
                    <div className="text-[#1C1C1C]">{activeChild.weight}</div>
                  </div>
                  <div>
                    <div className="text-[#6B6B6B] text-[10px] uppercase font-semibold mb-0.5">{t('heightLabel')}</div>
                    <div className="text-[#1C1C1C]">{activeChild.height}</div>
                  </div>
                  <div>
                    <div className="text-[#6B6B6B] text-[10px] uppercase font-semibold mb-0.5">MUAC</div>
                    <div className="text-[#1C1C1C]">{activeChild.muac}</div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 font-semibold mt-3">{t('recordedOn')}: May 15, 2025</div>
              </div>

              {/* AI Alert Card */}
              {activeChild.status === 'underweightStatus' && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs">
                    <span>⚠️</span>
                    <span>{t('growthConcernDetected') || 'Growth Concern Detected'}</span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold mt-1.5 leading-relaxed">
                    {t('growthConcernDesc') || 'Weight gain is below expected range. Weight dropped from previous month.'}
                  </p>
                  <button 
                    onClick={() => setWhatsappAlertOpen(true)}
                    className="mt-3.5 w-full py-2.5 bg-amber-600 hover:bg-amber-700 active:scale-95 transition-all text-white rounded-xl font-bold text-[10px] shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>💬</span> {t('generateParentAlert') || 'Generate Parent Alert'}
                  </button>
                </div>
              )}

              <button 
                onClick={() => {
                  const isOnline = localStorage.getItem('isOnline') !== 'false';
                  if (!isOnline) {
                    window.dispatchEvent(new CustomEvent('show-toast', { 
                      detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                    }));
                  } else {
                    alert('Add Measurement Modal opened!');
                  }
                }}
                className="w-full py-3.5 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors active:scale-95 duration-200"
              >
                {t('addNewMeasurement')}
              </button>
            </div>
          )}

          {tab === 'nutrition' && (
            <div className="p-4 animate-page-fade space-y-4">
              {/* Distribution Grid */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <h3 className="font-bold text-[#1C1C1C] text-sm mb-3">{t('nutritionCalendar')}</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors ${
                        i % 5 === 0 
                          ? 'bg-red-50 text-red-600 border-red-100' 
                          : i % 7 === 0 
                            ? 'bg-gray-50 text-gray-400 border-gray-100' 
                            : 'bg-green-50 text-green-700 border-green-100'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-green-700 mt-4 bg-green-50/50 p-2.5 rounded-lg border border-green-100/50 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Received 22/28 days this month
                </p>
              </div>

              {/* Special Supplements */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <h3 className="font-bold text-[#1C1C1C] text-sm mb-3">{t('specialNutrition')}</h3>
                {['Take Home Ration (THR)', 'Iron Tablets (IFA)', 'Vitamin A Drop'].map((item) => (
                  <label key={item} className="flex items-center gap-3 py-2.5 border-b last:border-0 border-slate-50 cursor-pointer active:scale-95 transition-transform">
                    <input type="checkbox" className="w-5 h-5 rounded border-2 border-slate-200 accent-[#5C35C0]" defaultChecked={item.startsWith('Take')} />
                    <span className="text-xs text-[#1C1C1C] font-semibold">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {tab === 'vaccination' && (
            <div className="p-4 space-y-3 animate-page-fade">
              {vaccines.map((vaccine, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center transition-all hover:border-slate-200">
                  <div>
                    <h4 className="font-extrabold text-[#1C1C1C] text-xs mb-0.5">{vaccine.name}</h4>
                    <p className="text-[10px] text-gray-500 font-semibold">Due: {vaccine.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      vaccine.status === 'done' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {vaccine.status === 'done' ? '✓ ' + t('normalStatus') : t('pending')}
                    </span>
                    {vaccine.status === 'pending' && (
                      <button 
                        onClick={() => {
                          const isOnline = localStorage.getItem('isOnline') !== 'false';
                          if (!isOnline) {
                            window.dispatchEvent(new CustomEvent('show-toast', { 
                              detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                            }));
                          } else {
                            alert('Reminder alert sent to parent!');
                          }
                        }}
                        className="text-[10px] text-[#5C35C0] font-bold hover:underline active:scale-95 transition-transform"
                      >
                        {t('sendReminder')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'notes' && (
            <div className="p-4 space-y-3 animate-page-fade relative">
              {notes.map((note, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-50">
                    <span className="text-[9px] font-bold text-gray-400">{note.date}</span>
                    <span className="text-[9px] font-bold text-[#5C35C0]">{t('noteAddedBy')} {t(note.workerKey)}</span>
                  </div>
                  <p className="text-xs text-[#1C1C1C] font-semibold leading-relaxed">{t(note.noteKey)}</p>
                </div>
              ))}
              
              {/* Floating button shifted to left (right-20) to prevent overlap with global voice assistant mic (right-4) */}
              <button 
                onClick={() => alert('Mock modal opened: ' + t('addNewNote'))}
                className="absolute bottom-20 right-20 w-14 h-14 bg-[#5C35C0] rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A2A9F] transition-all duration-200 active:scale-95 z-30"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* ADD CHILD OVERLAY MODAL */}
        {addChildOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in text-slate-800">
            <div className="absolute inset-0" onClick={() => setAddChildOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[85%] overflow-y-auto">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-[#1C1C1C] flex items-center gap-1.5">
                  👶 {t('addChild') || 'Add Child'}
                </h3>
                <button onClick={() => setAddChildOpen(false)} className="text-xs text-slate-500 font-bold hover:underline">
                  Cancel
                </button>
              </div>

              <div className="space-y-3.5 mb-5 text-left">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Child Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Patel"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Age</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 yr 4 mo"
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Gender</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value)}
                      className="w-full h-10 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    >
                      <option value="👧">👧 Female</option>
                      <option value="👦">👦 Male</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Parent Mobile</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={newParentNum}
                      onChange={(e) => setNewParentNum(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Centre ID</label>
                    <input
                      type="text"
                      placeholder="e.g. ICDS 04"
                      value={newCentreId}
                      onChange={(e) => setNewCentreId(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      placeholder="e.g. 12.4 kg"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Height (cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 89 cm"
                      value={newHeight}
                      onChange={(e) => setNewHeight(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">MUAC (cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 14.2 cm"
                      value={newMUAC}
                      onChange={(e) => setNewMUAC(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newName) return alert('Name is required');
                  const id = children.reduce((max: number, c: any) => c.id > max ? c.id : max, 0) + 1;
                  const newChild = {
                    id,
                    nameKey: 'child_custom_' + id,
                    nameVal: newName,
                    age: newAge || '2 yr',
                    gender: newGender,
                    idCode: 'CH-' + Math.floor(1000 + Math.random() * 9000),
                    weight: newWeight || '12.0 kg',
                    height: newHeight || '88 cm',
                    muac: newMUAC || '14.0 cm',
                    status: 'healthyStatus',
                    center: newCentreId || 'ICDS 04',
                    border: newGender === '👧' ? 'border-pink-200' : 'border-blue-200',
                    bg: newGender === '👧' ? 'from-pink-500 to-rose-600' : 'from-blue-600 to-indigo-700',
                    emoji: newGender,
                    parentNum: newParentNum
                  };
                  
                  const lang = localStorage.getItem('selectedLanguage') || 'hi';
                  if (!translations[lang]) translations[lang] = {};
                  translations[lang][newChild.nameKey] = newName;
                  translations.en[newChild.nameKey] = newName;

                  const updatedChildren = [...children, newChild];
                  setChildren(updatedChildren);
                  localStorage.setItem('anganwadiChildren', JSON.stringify(updatedChildren));
                  setSelectedChildId(newChild.id);
                  navigate(`/child/${newChild.id}`, { replace: true });
                  setAddChildOpen(false);
                  setNewName('');
                  setNewAge('');
                  setNewWeight('');
                  setNewHeight('');
                  setNewMUAC('');

                  const isOnline = localStorage.getItem('isOnline') !== 'false';
                  if (!isOnline) {
                    window.dispatchEvent(new CustomEvent('show-toast', { 
                      detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                    }));
                  } else {
                    window.dispatchEvent(new CustomEvent('show-toast', { 
                      detail: { message: 'Child profile added successfully!' } 
                    }));
                  }
                }}
                className="w-full py-3.5 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
              >
                {t('saveChild') || 'Save Child'}
              </button>
            </div>
          </div>
        )}

        {/* EDIT CHILD OVERLAY MODAL */}
        {editChildOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in text-slate-800">
            <div className="absolute inset-0" onClick={() => setEditChildOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[85%] overflow-y-auto">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-[#1C1C1C] flex items-center gap-1.5">
                  ✏️ Edit Child Profile
                </h3>
                <button onClick={() => setEditChildOpen(false)} className="text-xs text-slate-500 font-bold hover:underline">
                  Cancel
                </button>
              </div>

              <div className="space-y-3.5 mb-5 text-left">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Child Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Age</label>
                    <input
                      type="text"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Gender</label>
                    <select
                      value={editGender}
                      onChange={(e) => setEditGender(e.target.value)}
                      className="w-full h-10 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    >
                      <option value="👧">👧 Female</option>
                      <option value="👦">👦 Male</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Parent Mobile</label>
                    <input
                      type="text"
                      value={editParentNum}
                      onChange={(e) => setEditParentNum(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Centre ID</label>
                    <input
                      type="text"
                      value={editCentreId}
                      onChange={(e) => setEditCentreId(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      placeholder="e.g. 12.4 kg"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">Height (cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 89 cm"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 mb-1">MUAC (cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 14.2 cm"
                      value={editMUAC}
                      onChange={(e) => setEditMUAC(e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!editName) return alert('Name is required');
                  
                  const lang = localStorage.getItem('selectedLanguage') || 'hi';
                  if (!translations[lang]) translations[lang] = {};
                  translations[lang][activeChild.nameKey] = editName;
                  translations.en[activeChild.nameKey] = editName;

                  const updated = children.map(c => {
                    if (c.id === activeChild.id) {
                      return {
                        ...c,
                        age: editAge,
                        gender: editGender,
                        emoji: editGender,
                        center: editCentreId,
                        parentNum: editParentNum,
                        weight: editWeight,
                        height: editHeight,
                        muac: editMUAC,
                        bg: editGender === '👧' ? 'from-pink-500 to-rose-600' : 'from-blue-600 to-indigo-700',
                      };
                    }
                    return c;
                  });
                  setChildren(updated);
                  localStorage.setItem('anganwadiChildren', JSON.stringify(updated));
                  setEditChildOpen(false);

                  const isOnline = localStorage.getItem('isOnline') !== 'false';
                  if (!isOnline) {
                    window.dispatchEvent(new CustomEvent('show-toast', { 
                      detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                    }));
                  } else {
                    window.dispatchEvent(new CustomEvent('show-toast', { 
                      detail: { message: 'Child profile updated successfully!' } 
                    }));
                  }
                }}
                className="w-full py-3.5 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* WHATSAPP ALERT OVERLAY MODAL */}
        {whatsappAlertOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in text-slate-800">
            <div className="absolute inset-0" onClick={() => setWhatsappAlertOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[85%] text-left">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-extrabold text-[#1C1C1C] text-sm flex items-center gap-1.5">
                  <span className="text-emerald-600">💬</span> {t('whatsappAlertTriggered') || 'WhatsApp Alert Triggered'}
                </h2>
                <button 
                  onClick={() => setWhatsappAlertOpen(false)}
                  className="text-xs text-slate-500 font-bold hover:underline"
                >
                  Close
                </button>
              </div>

              {/* Status Banner */}
              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold p-2.5 rounded-xl mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Status: Queued in Offline Storage</span>
                </div>
                <span>Offline Mode</span>
              </div>

              {/* Recipient Details */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4 text-xs font-semibold">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Recipient</span>
                    <p className="font-extrabold text-[#1C1C1C]">{(activeChild.nameVal || t(activeChild.nameKey)).split(' ')[0]}'s Mother</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Phone Number</span>
                    <p className="font-bold text-slate-700">{activeChild.parentNum || '+91 98765 43210'}</p>
                  </div>
                </div>
                
                {/* AI Generated Message */}
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">AI Generated Message</span>
                  <div className="bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-100/50 mt-1 font-medium leading-relaxed italic text-[11px]">
                    "Namaste {(activeChild.nameVal || t(activeChild.nameKey)).split(' ')[0]}'s Mother. Today's weight was recorded as {activeChild.weight}. Weight progression is lower than expected. Please ensure supplementary nutrition is provided regularly. Contact the Anganwadi worker if needed."
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => alert(`Calling Mother of ${activeChild.nameVal || t(activeChild.nameKey)}...`)}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-[#1C1C1C] rounded-xl font-bold text-xs shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  📞 Call Parent
                </button>
                <button
                  onClick={() => {
                    const isOnline = localStorage.getItem('isOnline') !== 'false';
                    if (!isOnline) {
                      window.dispatchEvent(new CustomEvent('show-toast', { 
                        detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                      }));
                      const pendingQueue = JSON.parse(localStorage.getItem('pendingQueue') || '[]');
                      const newItem = {
                        id: Date.now(),
                        type: 'WhatsApp Notification: ' + (activeChild.nameVal || t(activeChild.nameKey)).split(' ')[0] + ' Growth Alert',
                        status: 'Pending',
                        details: 'Recipient: ' + (activeChild.nameVal || t(activeChild.nameKey)).split(' ')[0] + "'s Mother",
                        size: '0.08 MB'
                      };
                      localStorage.setItem('pendingQueue', JSON.stringify([...pendingQueue, newItem]));
                    } else {
                      alert('WhatsApp notification successfully dispatched.');
                    }
                    setWhatsappAlertOpen(false);
                  }}
                  className="py-3 bg-[#5C35C0] hover:bg-[#4A2A9F] text-white rounded-xl font-bold text-xs shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  ✓ {t('parentConfirmed') || 'Parent Confirmed'}
                </button>
              </div>

              {/* Footer notice */}
              <div className="text-center text-[9px] text-gray-400 font-bold border-t pt-3">
                This message will be sent automatically when internet becomes available.
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
