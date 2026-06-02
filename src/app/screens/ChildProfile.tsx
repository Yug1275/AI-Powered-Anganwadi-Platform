import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Edit, Plus, Calendar, Sparkles } from 'lucide-react';
import { t } from '../components/translations';

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
  
  // Selected child state
  const [selectedChildId, setSelectedChildId] = useState<number>(1);

  // Retrieve selected child details
  const activeChild = childrenList.find(c => c.id === selectedChildId) || childrenList[0];
  const vaccines = childVaccinations[activeChild.id] || [];
  const notes = childNotes[activeChild.id] || [];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white tracking-wide">{t('childProfilesTitle')}</h1>
          <button className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform">
            <Edit className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Dynamic Child Selector Row */}
        <div className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-3 flex gap-2 overflow-x-auto scrollbar-hide z-10">
          {childrenList.map((child) => {
            const isActive = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 whitespace-nowrap border ${
                  isActive 
                    ? 'bg-[#5C35C0] text-white border-[#5C35C0] shadow-sm' 
                    : 'bg-white text-[#6B6B6B] border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{child.emoji}</span>
                <span>{t(child.nameKey).split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Profile Details Card */}
        <div className={`bg-gradient-to-br ${activeChild.bg} p-5 rounded-b-2xl shadow-md transition-all duration-300 text-white z-10`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl shadow-inner animate-pulse">
              {activeChild.emoji}
            </div>
            <div>
              <h2 className="text-white font-extrabold text-xl tracking-tight">{t(activeChild.nameKey)}</h2>
              <p className="text-white/90 text-xs font-semibold">{t('ageLabel')}: {activeChild.age}</p>
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
              {/* Growth Chart Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 flex flex-col items-center">
                <div className="w-full h-[180px] bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex flex-col items-center justify-center border border-purple-200/50">
                  <div className="text-4xl mb-2 animate-bounce">📈</div>
                  <div className="text-xs font-extrabold text-[#5C35C0] uppercase tracking-wider">WHO Growth Chart</div>
                  <div className="text-[10px] text-[#6B6B6B] font-semibold mt-0.5">Healthy Growth Zone</div>
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

              <button className="w-full py-3.5 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs hover:bg-slate-100 transition-colors active:scale-95 duration-200">
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
                        onClick={() => alert('Reminder alert sent to parent!')}
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

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
