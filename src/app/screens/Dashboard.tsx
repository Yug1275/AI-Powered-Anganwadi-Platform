import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { t, getSelectedLanguage } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';
import { 
  Bell, 
  Menu, 
  User, 
  X, 
  Sparkles, 
  Globe, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isLoggedIn', 'true');
  }, []);

  // Active language display mapping
  const langMap: Record<string, string> = {
    en: 'English',
    hi: 'Hindi (हिंदी)',
    gu: 'Gujarati (ગુજરાતી)',
    mr: 'Marathi (मराठी)',
    ta: 'Tamil (தமிழ்)',
    te: 'Telugu (తెలుగు)'
  };
  const currentLangName = langMap[getSelectedLanguage()] || 'Hindi (हिंदी)';

  // Overlay state management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* Top Bar */}
        <div className="h-14 bg-[#5C35C0] flex items-center justify-between px-4 sticky top-12 z-40 shadow-sm">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-1 hover:bg-white/10 rounded-full active:scale-90 transition-transform"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          <span className="text-white font-bold text-lg tracking-wide">{t('appTitle')}</span>
          <div className="flex items-center gap-3">
            <ConnectivityStatus />
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="relative p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
            >
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#E8A020] rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-sm border border-[#5C35C0]">
                3
              </div>
            </button>
            <button 
              onClick={() => setProfileOpen(true)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center active:scale-90 transition-all border border-white/10"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-20 scrollbar-hide">
          {/* AI Morning Briefing Card */}
          <div className="mt-4 bg-gradient-to-br from-[#5C35C0] to-[#3A1E8A] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            {/* Decorative background glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{t('goodMorning')}</h2>
                <div className="flex flex-col gap-1.5 mt-1">
                  <p className="text-[11px] opacity-75 font-semibold">{t('todayDate')}</p>
                  <div className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-extrabold text-white shadow-sm border border-white/10 w-fit">
                    <span>📍</span>
                    <span>ICDS Centre 04 • Vijapur District</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold tracking-wider uppercase">AI Agent</span>
            </div>

            <div className="h-px bg-white/15 my-4" />

            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-white/70 uppercase">{t('todayOverview')}</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { value: '32', label: t('childrenRegistered'), bg: 'bg-white/10 border-white/5' },
                  { value: '5', label: t('homeVisitsDue'), bg: 'bg-[#E8A020]/20 text-[#FFD275] border-[#E8A020]/10' },
                  { value: '2', label: t('reportsPending'), bg: 'bg-red-500/20 text-red-200 border-red-500/10' },
                  { value: t('today'), label: t('nutritionDistribution'), bg: 'bg-green-500/20 text-green-200 border-green-500/10' },
                ].map((stat, idx) => (
                  <div key={idx} className={`p-3 ${stat.bg} rounded-xl border flex items-center justify-between shadow-sm`}>
                    <span className="text-xs text-white/80 font-medium leading-tight">{stat.label}</span>
                    <span className="text-sm font-bold ml-1">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 p-4 bg-white/10 rounded-xl border border-white/10 flex gap-2.5 items-start">
              <Sparkles className="w-5 h-5 text-[#FFD275] flex-shrink-0 mt-0.5 animate-pulse" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFD275]">{t('aiRecommendation')}</div>
                <p className="text-xs mt-1 leading-relaxed text-white font-medium italic">
                  {t('aiTip')}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-base font-bold text-[#1C1C1C] mb-3">{t('quickActions')}</h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <ActionCard 
                emoji="📍" 
                emojiBg="bg-blue-50 text-blue-600" 
                title={t('attendanceTitle')} 
                subtitle={t('attendanceSub')} 
                onClick={() => navigate('/attendance')} 
              />
              <ActionCard 
                emoji="👶" 
                emojiBg="bg-pink-50 text-pink-600" 
                title={t('childProfilesTitle')} 
                subtitle={t('childProfilesSub')} 
                onClick={() => navigate('/child/1')} 
              />
              <ActionCard 
                emoji="🎨" 
                emojiBg="bg-orange-50 text-orange-600" 
                title={t('activityPlannerTitle')} 
                subtitle={t('activityPlannerSub')} 
                onClick={() => navigate('/activities')} 
              />
              <ActionCard 
                emoji="▶" 
                emojiBg="bg-red-50 text-red-600" 
                title={t('activityWalkthroughTitle')} 
                subtitle={t('activityWalkthroughSub')} 
                onClick={() => navigate('/activity-walkthrough/1')} 
              />
              <ActionCard 
                emoji="🏠" 
                emojiBg="bg-emerald-50 text-emerald-600" 
                title={t('homeVisitsTitle')} 
                subtitle={t('homeVisitsSub')} 
                onClick={() => navigate('/home-visits')} 
              />
              <ActionCard 
                emoji="👨‍👩‍👧" 
                emojiBg="bg-teal-50 text-teal-600" 
                title={t('parentConnectTitle')} 
                subtitle={t('parentConnectSub')} 
                onClick={() => navigate('/parent-connect')} 
              />
              <ActionCard 
                emoji="📄" 
                emojiBg="bg-purple-50 text-purple-600" 
                title={t('aiReportsTitle')} 
                subtitle={t('aiReportsSub')} 
                onClick={() => navigate('/reports')} 
              />
              <ActionCard 
                emoji="🧠" 
                emojiBg="bg-indigo-50 text-indigo-600" 
                title={t('wellnessTitle')} 
                subtitle={t('wellnessSub')} 
                onClick={() => navigate('/wellness')} 
              />
            </div>
          </div>

          {/* Offline Sync Status */}
          <div className="bg-[#F0FFF4] border border-green-200 rounded-xl p-3.5 flex items-center justify-between mb-8 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#1C1C1C]">{t('offlineSynced')}</span>
            </div>
            <button 
              onClick={() => alert('Data sync completed successfully')}
              className="text-xs text-[#5C35C0] font-bold hover:underline active:scale-95 transition-transform"
            >
              {t('syncNow')}
            </button>
          </div>
        </div>

        <BottomNav />

        {/* ========================================================
            OVERLAYS & INTERACTIVE DRAWDERS (CONSTRAINED TO PHONE)
           ======================================================== */}

        {/* 1. Hamburger Sidebar Drawer */}
        {sidebarOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex animate-fade-in">
            <div className="absolute inset-0" onClick={() => setSidebarOpen(false)} />
            
            <div className="relative w-[280px] h-full bg-white shadow-2xl flex flex-col justify-between z-50 animate-slide-in-left">
              <div>
                {/* Header */}
                <div className="bg-gradient-to-br from-[#5C35C0] to-[#3A1E8A] p-5 text-white">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold border border-white/10">
                      SD
                    </div>
                    <button 
                      onClick={() => setSidebarOpen(false)} 
                      className="p-1 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <h3 className="font-bold text-base mt-3">{t('workerName')}</h3>
                  <p className="text-xs text-white/80 font-medium">{t('workerProfile')} · ID: AW-98472</p>
                </div>
                
                {/* Navigation Links */}
                <div className="p-4 space-y-1">
                  {[
                    { icon: <Menu className="w-5 h-5" />, label: t('dashboard'), action: () => setSidebarOpen(false) },
                    { icon: <User className="w-5 h-5" />, label: t('myProfile'), action: () => { setSidebarOpen(false); setProfileOpen(true); } },
                    { icon: <Settings className="w-5 h-5" />, label: t('settings'), action: () => { setSidebarOpen(false); setSettingsOpen(true); } },
                    { icon: <Globe className="w-5 h-5" />, label: t('language'), action: () => navigate('/language', { state: { from: 'profile' } }) },
                    { icon: <HelpCircle className="w-5 h-5" />, label: t('help'), action: () => { setSidebarOpen(false); setHelpOpen(true); } },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={item.action}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-[#1C1C1C] hover:bg-slate-50 active:scale-95 transition-all font-semibold"
                    >
                      <div className="text-slate-500">{item.icon}</div>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Logout Footer */}
              <div className="p-4 border-t">
                <button
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 active:scale-95 transition-all font-bold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Notifications Screen Overlay */}
        {notificationsOpen && (
          <div className="absolute inset-0 bg-[#F7F5F0] z-50 flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="bg-[#5C35C0] h-14 flex items-center justify-between px-4 sticky top-0 shadow-md">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setNotificationsOpen(false)} 
                  className="p-1 hover:bg-white/10 rounded-full active:scale-90 transition-transform"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <span className="text-white font-bold text-base">{t('notificationsTitle')}</span>
              </div>
              <button 
                onClick={() => alert('All notifications marked as read')} 
                className="text-white/80 text-xs font-bold hover:text-white px-2 py-1 rounded bg-white/10 active:scale-95 transition-transform"
              >
                Mark all read
              </button>
            </div>
            
            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {[
                { title: 'Home Visits Due', description: '5 home visits are scheduled for today, including 2 critical growth monitoring visits.', type: 'urgent', time: '10 mins ago', emoji: '🏠' },
                { title: 'Parent Meeting Reminder', description: 'The monthly parent community meeting is scheduled for tomorrow at 10:00 AM.', type: 'info', time: '1 hour ago', emoji: '👨‍👩‍👧' },
                { title: 'Nutrition Alert', description: 'Monthly ration stock for ICDS Centre 04 is running low. Please submit the request.', type: 'warning', time: '4 hours ago', emoji: '🌾' },
                { title: 'Vaccination Reminder', description: 'Measles-Rubella booster doses are pending for 4 children in your list.', type: 'alert', time: '1 day ago', emoji: '💉' },
              ].map((notif, i) => {
                const borderColors = {
                  urgent: 'border-red-500 bg-red-50/50',
                  info: 'border-blue-500 bg-blue-50/50',
                  warning: 'border-[#E8A020] bg-amber-50/50',
                  alert: 'border-purple-500 bg-purple-50/50',
                };
                return (
                  <div key={i} className={`p-4 bg-white rounded-xl border-l-4 ${borderColors[notif.type as keyof typeof borderColors]} shadow-sm flex gap-3 animate-fade-in`}>
                    <span className="text-xl mt-0.5">{notif.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#1C1C1C] text-xs leading-snug">{notif.title}</h4>
                        <span className="text-[9px] text-gray-500 font-semibold">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] leading-relaxed font-medium">{notif.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Worker Profile Screen Overlay */}
        {profileOpen && (
          <div className="absolute inset-0 bg-[#F7F5F0] z-50 flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="bg-[#5C35C0] h-14 flex items-center justify-between px-4 shadow-md">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setProfileOpen(false)} 
                  className="p-1 hover:bg-white/10 rounded-full active:scale-90 transition-transform"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <span className="text-white font-bold text-base">{t('workerProfile')}</span>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center text-center border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5C35C0] to-[#3A1E8A] rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-md mb-3">
                  SD
                </div>
                <h3 className="font-bold text-lg text-[#1C1C1C]">{t('workerName')}</h3>
                <p className="text-xs text-[#6B6B6B] font-semibold mt-0.5">Anganwadi Worker</p>
                <span className="mt-3 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100">
                  {t('activeSync')}
                </span>
              </div>
              
              {/* Details List */}
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5 border border-slate-100">
                {[
                  { label: t('nameLabel'), value: t('workerName') },
                  { label: t('workerId'), value: 'AW-98472' },
                  { label: t('centreName'), value: 'ICDS Centre 04' },
                  { label: t('mobileNumber'), value: '+91 98765 43210' },
                  { label: t('langPreference'), value: currentLangName },
                ].map((info, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-0 text-xs font-semibold">
                    <span className="text-gray-500">{info.label}</span>
                    <span className="text-[#1C1C1C]">{info.value}</span>
                  </div>
                ))}
              </div>
              
              {/* Profile Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => { setProfileOpen(false); navigate('/language', { state: { from: 'profile' } }); }}
                  className="w-full h-11 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {t('langPreference')}
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full h-11 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
            </div>
          </div>
        </div>
      )}

        {/* 4. Settings Overlay Drawer */}
        {settingsOpen && (
          <div className="absolute inset-0 bg-[#F7F5F0] z-50 flex flex-col animate-slide-in-right text-slate-800">
            <div className="bg-[#5C35C0] h-14 flex items-center justify-between px-4 shadow-md">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSettingsOpen(false)} 
                  className="p-1 hover:bg-white/10 rounded-full active:scale-90 transition-transform"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <span className="text-white font-bold text-base">{t('settings')}</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4 text-left">
                <h4 className="text-xs font-bold text-[#5C35C0] uppercase tracking-wider">Preferences</h4>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1C]">App Language</div>
                    <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Currently: {currentLangName}</div>
                  </div>
                  <button 
                    onClick={() => { setSettingsOpen(false); navigate('/language', { state: { from: 'profile' } }); }}
                    className="text-xs text-[#5C35C0] font-extrabold hover:underline"
                  >
                    Change
                  </button>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1C]">Voice Alerts</div>
                    <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Enable spoken tips and instructions</div>
                  </div>
                  <label className="relative inline-block w-10 h-5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow" />
                  </label>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="text-xs font-bold text-[#1C1C1C]">Automatic Cache Sync</div>
                    <div className="text-[10px] text-gray-500 font-semibold mt-0.5">Sync queue automatically when online</div>
                  </div>
                  <label className="relative inline-block w-10 h-5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-[#5C35C0] transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow" />
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 space-y-4 text-left">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Device & App</h4>
                <div className="flex justify-between items-center text-xs font-semibold py-1.5 border-b border-slate-50">
                  <span className="text-gray-500">App Version</span>
                  <span className="text-[#1C1C1C] font-bold">v3.5.2-prod</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold py-1.5 border-b border-slate-50">
                  <span className="text-gray-500">Offline Storage</span>
                  <span className="text-[#1C1C1C] font-bold">12.4 MB Used</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold py-1.5">
                  <span className="text-gray-500">Last Synced</span>
                  <span className="text-[#1C1C1C] font-bold">2 mins ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Help Overlay Drawer */}
        {helpOpen && (
          <div className="absolute inset-0 bg-[#F7F5F0] z-50 flex flex-col animate-slide-in-right text-slate-800">
            <div className="bg-[#5C35C0] h-14 flex items-center justify-between px-4 shadow-md">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setHelpOpen(false)} 
                  className="p-1 hover:bg-white/10 rounded-full active:scale-90 transition-transform"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <span className="text-white font-bold text-base">{t('help')}</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {/* Call Support Banner */}
              <div className="bg-[#F0ECFF] border border-[#5C35C0]/20 rounded-xl p-4 text-center">
                <h4 className="text-xs font-extrabold text-[#5C35C0] uppercase tracking-wider mb-1">ICDS Toll-Free Helpline</h4>
                <p className="text-lg font-black text-[#5C35C0] mb-2">1800-180-5555</p>
                <p className="text-[10px] text-gray-500 font-semibold">Available Monday to Saturday: 9:00 AM – 6:00 PM</p>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-left space-y-4">
                <h4 className="text-xs font-bold text-[#5C35C0] uppercase tracking-wider">Frequently Asked Questions</h4>
                
                <div className="space-y-3.5">
                  <div>
                    <h5 className="text-xs font-bold text-[#1C1C1C]">How to sync data offline?</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      All your data is saved automatically on your phone when offline. Once you connect to the internet, open the "Data Sync Status" screen and click "Upload & Sync Data Now".
                    </p>
                  </div>
                  <div className="border-t border-slate-50 pt-3">
                    <h5 className="text-xs font-bold text-[#1C1C1C]">How to use Voice Assistant?</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      Tap the purple floating mic icon on the bottom right and say a command, such as "Mark attendance" or "Show offline queue".
                    </p>
                  </div>
                  <div className="border-t border-slate-50 pt-3">
                    <h5 className="text-xs font-bold text-[#1C1C1C]">Can I delete a child profile?</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-semibold mt-0.5">
                      Go to Child Profiles, open the 3-dot context menu on the top right, and click "Delete Child".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

// Upgraded ActionCard with animations and better styling
function ActionCard({ 
  emoji, 
  emojiBg, 
  title, 
  subtitle, 
  onClick 
}: { 
  emoji: string; 
  emojiBg: string; 
  title: string; 
  subtitle: string; 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl p-3.5 border border-slate-100/80 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md active:scale-95 hover:-translate-y-0.5 transition-all duration-200 text-left flex flex-col justify-between h-[120px] relative group"
    >
      <div className={`w-9 h-9 ${emojiBg} rounded-lg flex items-center justify-center text-lg mb-2 shadow-sm transition-transform group-hover:scale-110`}>
        {emoji}
      </div>
      <div>
        <div className="text-xs font-bold text-[#1C1C1C] leading-snug mb-0.5">{title}</div>
        <div className="text-[9.5px] text-[#6B6B6B] leading-normal font-semibold line-clamp-2">{subtitle}</div>
      </div>
    </button>
  );
}
