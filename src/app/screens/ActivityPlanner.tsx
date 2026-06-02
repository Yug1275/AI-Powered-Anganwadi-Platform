import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { t, getSelectedLanguage } from '../components/translations';

export default function ActivityPlanner() {
  const navigate = useNavigate();
  const lang = getSelectedLanguage();

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
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white tracking-wide">{t('activityPlannerTitle')}</h1>
          <button className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform">
            <Calendar className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {/* Today's Activity Hero Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-[#E8A020] to-[#C87F10] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white/20 rounded-full uppercase tracking-wider">
                  {t('preRecommended')}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white/20 rounded-full uppercase tracking-wider">
                  {t('preschoolAge')}
                </span>
              </div>
              <h2 className="font-black text-xl tracking-tight mb-2.5">{t('sortingGame')}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-black/10 rounded-full text-xs font-bold border border-white/10">
                  20 minutes
                </span>
              </div>
              <p className="text-xs font-semibold mb-4 text-white/95 leading-relaxed">
                {t('sortingMaterials')}
              </p>
              <button
                onClick={() => navigate('/activity-walkthrough/1')}
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

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
