import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { t, getSelectedLanguage } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function ActivityPlanner() {
  const navigate = useNavigate();
  const lang = getSelectedLanguage();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [children] = useState(() => {
    const saved = localStorage.getItem('anganwadiChildren');
    const childrenList = [
      { id: 1, nameKey: 'child1Name', age: '2 yr 4 mo', emoji: '👧' },
      { id: 2, nameKey: 'child2Name', age: '3 yr 1 mo', emoji: '👦' },
      { id: 3, nameKey: 'child3Name', age: '2 yr 8 mo', emoji: '👧' },
      { id: 4, nameKey: 'child4Name', age: '3 yr 5 mo', emoji: '👦' },
      { id: 5, nameKey: 'child5Name', age: '2 yr 2 mo', emoji: '👧' },
    ];
    return saved ? JSON.parse(saved) : childrenList;
  });

  const [selectedChildId, setSelectedChildId] = useState<number>(1);
  const activeChild = children.find((c: any) => c.id === selectedChildId) || children[0];
  const [planningMode, setPlanningMode] = useState<'child' | 'ageGroup'>('child');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<'2-3' | '3-4'>('2-3');

  const getRecommendationForAge = (ageStr: string) => {
    const is3to4 = ageStr.includes('3') || ageStr.includes('4');
    if (is3to4) {
      return {
        ageGroup: 'Age 3-4 Years',
        title: t('numberGame') || 'Number Recognition Game',
        duration: '20 minutes',
        desc: 'Learn numbers 1 to 5 using interactive finger count cards and wooden tokens.',
        walkthroughId: 2,
      };
    } else {
      return {
        ageGroup: 'Age 2-3 Years',
        title: t('sortingGame') || 'Colour Sorting Game',
        duration: '15 minutes',
        desc: t('sortingMaterials') || 'Materials Needed: Red, blue, & yellow blocks · 3 bowls',
        walkthroughId: 1,
      };
    }
  };

  const recommendation = getRecommendationForAge(
    planningMode === 'child'
      ? (activeChild?.age || '')
      : (selectedAgeGroup === '3-4' ? '3 yr' : '2 yr')
  );

  // Dynamic category localization mapping
  const categoryNames: Record<string, Record<string, string>> = {
    hi: { All: 'सभी', Language: 'भाषा', Math: 'गणित', 'Motor Skills': 'शारीरिक कौशल', Stories: 'कहानियाँ', Songs: 'गीत' },
    gu: { All: 'બધા', Language: 'ભાષા', Math: 'ગણિત', 'Motor Skills': 'મોટર કૌશલ્ય', Stories: 'વાર્તાઓ', Songs: 'ગીતો' },
    mr: { All: 'सर्व', Language: 'भाषा', Math: 'गणित', 'Motor Skills': 'शारीरिक कौशल्य', Stories: 'गोष्टी', Songs: 'गाणी' },
    ta: { All: 'அனைத்தும்', Language: 'மொழி', Math: 'கணிதம்', 'Motor Skills': 'உடலியக்க திறன்கள்', Stories: 'கதைகள்', Songs: 'பாடல்கள்' },
    te: { All: 'అన్నీ', Language: 'భాష', Math: 'గణితం', 'Motor Skills': 'శారీరక నైపుణ్యాలు', Stories: 'కథలు', Songs: 'పాటలు' },
    en: { All: 'All', Language: 'Language', Math: 'Math', 'Motor Skills': 'Motor Skills', Stories: 'Stories', Songs: 'Songs' }
  };
  const activeCategories = categoryNames[lang] || categoryNames.en;

  const daysMapping: Record<string, Record<string, string>> = {
    hi: { Mon: 'सोम', Tue: 'मंगल', Wed: 'बुध', Thu: 'गुरु', Fri: 'शुक्र', Sat: 'शनि', Sun: 'रवि' },
    gu: { Mon: 'સોમ', Tue: 'મંગળ', Wed: 'બૂધ', Thu: 'ગુરુ', Fri: 'શુક્ર', Sat: 'શનિ', Sun: 'રવિ' },
    mr: { Mon: 'सोम', Tue: 'मंगळ', Wed: 'बुध', Thu: 'गुरु', Fri: 'शुक्र', Sat: 'शनि', Sun: 'रवि' },
    ta: { Mon: 'திங்', Tue: 'செவ்', Wed: 'புதன்', Thu: 'வியா', Fri: 'வெள்', Sat: 'சனி', Sun: 'ஞாயி' },
    te: { Mon: 'సోమ', Tue: 'మం', Wed: 'బుధ', Thu: 'గురు', Fri: 'శుక్ర', Sat: 'శని', Sun: 'ఆది' },
    en: { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' }
  };
  const activeDays = daysMapping[lang] || daysMapping.en;

  // Dynamic translated activities list
  const activities = [
    { 
      name: t('storyTime'), 
      category: activeCategories['Language'], 
      duration: '15 min', 
      icon: '📚', 
      color: 'bg-blue-100' 
    },
    { 
      name: t('numberGame'), 
      category: activeCategories['Math'], 
      duration: '20 min', 
      icon: '🔢', 
      color: 'bg-green-100' 
    },
    { 
      name: t('jumpingHopping'), 
      category: activeCategories['Motor Skills'], 
      duration: '25 min', 
      icon: '🤸', 
      color: 'bg-orange-100' 
    },
    { 
      name: t('rhymeTime'), 
      category: activeCategories['Songs'], 
      duration: '10 min', 
      icon: '🎵', 
      color: 'bg-purple-100' 
    },
  ];

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
          <h3 className="font-bold text-white tracking-wide">{t('activityPlannerTitle')}</h3>
          <div className="flex items-center gap-1.5">
            <ConnectivityStatus />
            <button 
              onClick={() => setCalendarOpen(true)}
              className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
            >
              <Calendar className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {/* Mode Switcher */}
          <div className="px-4 pt-4 flex gap-2">
            <button
              onClick={() => setPlanningMode('child')}
              className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-extrabold transition-all border flex items-center justify-center gap-1.5 ${
                planningMode === 'child'
                  ? 'bg-[#5C35C0] text-white border-[#5C35C0] shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              👶 {t('planForChild') || 'Plan for Child'}
            </button>
            <button
              onClick={() => setPlanningMode('ageGroup')}
              className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-extrabold transition-all border flex items-center justify-center gap-1.5 ${
                planningMode === 'ageGroup'
                  ? 'bg-[#5C35C0] text-white border-[#5C35C0] shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}
            >
              👥 {t('planForAgeGroup') || 'Plan for Age Group'}
            </button>
          </div>

          {/* Selector */}
          <div className="p-4 pb-0 animate-fade-in">
            {planningMode === 'child' ? (
              <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-sm flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
                  {t('selectStudent') || 'Select Child'}:
                </label>
                <select
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(Number(e.target.value))}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-[#1C1C1C] focus:outline-none focus:border-[#5C35C0]"
                >
                  {children.map((child: any) => (
                    <option key={child.id} value={child.id}>
                      {child.emoji} {child.nameVal || t(child.nameKey)} ({child.age})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-sm flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
                  {t('selectAgeGroup') || 'Select Age Group'}:
                </label>
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value as any)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-[#1C1C1C] focus:outline-none focus:border-[#5C35C0]"
                >
                  <option value="2-3">🧸 {t('ageGroup2to3') || 'Age 2-3 Years'}</option>
                  <option value="3-4">🔢 {t('ageGroup3to4') || 'Age 3-4 Years'}</option>
                </select>
              </div>
            )}
          </div>

          {/* Today's Activity Hero Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-[#E8A020] to-[#C87F10] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white/20 rounded-full uppercase tracking-wider">
                  {t('preRecommended')}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white/20 rounded-full uppercase tracking-wider">
                  {recommendation.ageGroup}
                </span>
              </div>
              <h2 className="font-black text-xl tracking-tight mb-2.5">{recommendation.title}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-black/10 rounded-full text-xs font-bold border border-white/10">
                  {recommendation.duration}
                </span>
              </div>
              <p className="text-xs font-semibold mb-4 text-white/95 leading-relaxed">
                {recommendation.desc}
              </p>
              <button
                onClick={() => navigate(`/activity-walkthrough/${recommendation.walkthroughId}`)}
                className="w-full bg-white text-[#C87F10] py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 hover:bg-slate-50"
              >
                {t('startActivity')}
              </button>
            </div>
          </div>

          {/* Weekly Planner */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{t('thisWeek')}</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div
                  key={day}
                  className={`flex-shrink-0 w-[110px] rounded-xl p-3 border transition-all ${
                    i === 1 
                      ? 'bg-[#F0ECFF] border-2 border-[#5C35C0] shadow-sm' 
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="text-[10px] font-bold text-[#6B6B6B] uppercase mb-1">{activeDays[day] || day}</div>
                  <div className="text-xs font-bold text-[#1C1C1C] mb-1 truncate leading-tight">
                    {i === 1 ? t('sortingGame').split(' ')[0] : t('storyTime').split(':')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">{i === 1 ? '20 min' : '15 min'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Library */}
          <div className="px-4 mb-6">
            <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{t('browseActivities')}</h3>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
              {['All', 'Language', 'Math', 'Motor Skills', 'Stories', 'Songs'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap active:scale-95 transition-transform ${
                    filter === 'All'
                      ? 'bg-[#5C35C0] text-white shadow-sm'
                      : 'bg-white text-[#6B6B6B] border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {activeCategories[filter] || filter}
                </button>
              ))}
            </div>

            {/* Activity List */}
            <div className="space-y-3">
              {activities.map((activity, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition-all">
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-xs text-[#1C1C1C] truncate leading-snug">{activity.name}</h4>
                    <p className="text-[10px] text-[#6B6B6B] font-semibold mt-0.5">
                      {activity.category} · {activity.duration}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6B6B6B] flex-shrink-0" />
                </div>
              ))}

              {/* Generate Custom Activity */}
              <button 
                onClick={() => alert('AI Preschool generation started...')}
                className="w-full border-2 border-dashed border-[#5C35C0] rounded-xl p-4 flex items-center justify-center gap-2 text-[#5C35C0] bg-[#5C35C0]/5 hover:bg-[#5C35C0]/10 transition-colors active:scale-95"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-bold">{t('genAgeGroup')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Modal Overlay */}
        {calendarOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end animate-fade-in text-slate-800">
            <div className="absolute inset-0" onClick={() => setCalendarOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl z-50 p-5 flex flex-col border-t border-slate-100 animate-slide-in-up max-h-[85%]">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-[#1C1C1C] flex items-center gap-2">
                  📅 {t('selectDate') || 'Select Date'}
                </h3>
                <button onClick={() => setCalendarOpen(false)} className="text-xs text-slate-500 font-bold hover:underline">
                  Close
                </button>
              </div>

              {/* Month Header */}
              <div className="text-center py-2 font-black text-sm text-[#5C35C0]">
                June 2026
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 mb-2">
                <span>{activeDays.Sun || 'Sun'}</span>
                <span>{activeDays.Mon || 'Mon'}</span>
                <span>{activeDays.Tue || 'Tue'}</span>
                <span>{activeDays.Wed || 'Wed'}</span>
                <span>{activeDays.Thu || 'Thu'}</span>
                <span>{activeDays.Fri || 'Fri'}</span>
                <span>{activeDays.Sat || 'Sat'}</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                {/* Blank slot for Sunday as June 1, 2026 is Monday */}
                <div className="aspect-square" />
                
                {Array.from({ length: 30 }, (_, i) => {
                  const dayNum = i + 1;
                  const isSelected = dayNum === 2; // Default highlight for today (June 2)
                  return (
                    <button
                      key={dayNum}
                      onClick={() => {
                        alert(`Date selected: June ${dayNum}, 2026`);
                        setCalendarOpen(false);
                      }}
                      className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all active:scale-95 ${
                        isSelected 
                          ? 'bg-[#5C35C0] text-white shadow-md' 
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-100'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
