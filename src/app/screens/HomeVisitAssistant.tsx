import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Filter, Phone, Check, MapPin, Sparkles } from 'lucide-react';
import { t } from '../components/translations';

export default function HomeVisitAssistant() {
  const navigate = useNavigate();

  // Localized visits dataset using dynamic name translations
  const visits = [
    {
      name: t('child3Name'),
      age: '3yr 2mo',
      status: 'overdue',
      badge: t('visitBadgeHighRisk'),
      color: 'red',
      address: t('visitAddress1'),
      distance: '2.3 km',
      lastVisit: '28 Apr',
      reason: t('visitReason1'),
    },
    {
      name: t('child1Name'),
      age: '2yr 4mo',
      status: 'due',
      badge: t('visitBadgeDueToday'),
      color: 'amber',
      address: t('visitAddress2'),
      distance: '1.8 km',
      lastVisit: '15 May',
      reason: t('visitReason2'),
    },
    {
      name: t('child2Name'),
      age: '3yr 1mo',
      status: 'scheduled',
      badge: t('visitBadgeScheduled'),
      color: 'green',
      address: t('visitAddress3'),
      distance: '3.1 km',
      lastVisit: '20 May',
      reason: t('visitReason3'),
    },
  ];

  const dueLabel = t('dueLabel');
  const overdueLabel = t('overdueLabel');
  const monthLabel = t('monthLabel');
  
  const aiAdvice = t('aiAdviceTemplate').replace('{name}', t('child3Name'));

  const btnCall = t('btnCall');
  const btnMark = t('btnMark');
  const btnNav = t('btnNav');
  const completedLabel = t('completedThisMonth');

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
          <h1 className="font-bold text-white tracking-wide">{t('visitsHeader')}</h1>
          <button className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform">
            <Filter className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Summary Strip */}
        <div className="bg-[#5C35C0] px-4 pb-4 flex gap-2 z-10">
          <div className="flex-1 bg-white/20 rounded-xl px-3 py-2.5 text-center border border-white/5 shadow-sm">
            <div className="text-white font-bold text-sm">5</div>
            <div className="text-white/80 text-[10px] font-bold uppercase tracking-wide mt-0.5">{dueLabel}</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl px-3 py-2.5 text-center border border-white/5 shadow-sm">
            <div className="text-white font-bold text-sm">3</div>
            <div className="text-white/80 text-[10px] font-bold uppercase tracking-wide mt-0.5">{overdueLabel}</div>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl px-3 py-2.5 text-center border border-white/5 shadow-sm">
            <div className="text-white font-bold text-sm">12</div>
            <div className="text-white/80 text-[10px] font-bold uppercase tracking-wide mt-0.5">{monthLabel}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {/* AI Recommendation Banner */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-[#E8A020]/20 to-[#E8A020]/10 border-l-4 border-[#E8A020] rounded-xl p-4 flex gap-3 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#E8A020] flex-shrink-0 mt-0.5 animate-pulse" />
              <p className="text-xs text-[#1C1C1C] font-semibold leading-relaxed">
                {aiAdvice}
              </p>
            </div>
          </div>

          {/* Priority Visits */}
          <div className="px-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider">{t('priorityVisits')}</h3>
              <span className="px-2 py-0.5 bg-[#F0ECFF] text-[#5C35C0] text-[9px] font-bold rounded-full uppercase tracking-wider">
                AI
              </span>
            </div>

            <div className="space-y-3">
              {visits.map((visit, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 border-l-4 transition-all hover:border-slate-200 ${
                    visit.color === 'red'
                      ? 'border-l-red-500'
                      : visit.color === 'amber'
                      ? 'border-l-amber-500'
                      : 'border-l-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-extrabold text-[#1C1C1C] text-xs">
                        {visit.name} · {visit.age}
                      </h4>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        visit.color === 'red'
                          ? 'bg-red-50 text-red-700 border border-red-100'
                          : visit.color === 'amber'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100'
                          : 'bg-green-50 text-green-700 border border-green-100'
                      }`}
                    >
                      {visit.badge}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6B6B6B] font-semibold mb-1">
                    {visit.address} · {visit.distance}
                  </p>
                  <p className="text-[10px] text-[#6B6B6B] font-semibold mb-3">
                    Last visit: {visit.lastVisit} · {visit.reason}
                  </p>

                  <div className="flex gap-2 border-t pt-3 mt-1">
                    <button 
                      onClick={() => alert('Dialing parent contact...')}
                      className="flex-1 h-9 border border-[#5C35C0] text-[#5C35C0] rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                      <Phone className="w-3 h-3" />
                      {btnCall}
                    </button>
                    <button 
                      onClick={() => alert('Visit status marked as completed!')}
                      className="flex-1 h-9 border border-green-600 text-green-600 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                      <Check className="w-3 h-3" />
                      {btnMark}
                    </button>
                    <button 
                      onClick={() => alert('Launching Google Maps navigator...')}
                      className="flex-1 h-9 border border-blue-600 text-blue-600 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    >
                      <MapPin className="w-3 h-3" />
                      {btnNav}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Visits */}
          <div className="px-4 mb-6">
            <details className="bg-white rounded-xl shadow-sm border border-slate-100 group">
              <summary className="p-4 cursor-pointer font-bold text-xs uppercase tracking-wider text-[#1C1C1C] flex items-center justify-between outline-none select-none">
                <span>{completedLabel}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">12 visits</span>
              </summary>
              <div className="px-4 pb-4 space-y-2 border-t border-slate-50 pt-3">
                {[`${t('child5Name')} - May 28`, `${t('child4Name')} - May 27`, `Raj Sharma - May 25`].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-slate-50 last:border-0">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs text-[#1C1C1C] font-semibold">{item}</span>
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
