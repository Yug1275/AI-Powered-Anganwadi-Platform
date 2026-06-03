import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { ArrowLeft, WifiOff, Download } from 'lucide-react';
import { setSelectedLanguage, t } from '../components/translations';

export default function LanguageSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<string | null>(null);

  const fromProfile = location.state?.from === 'profile';

  const languages = [
    { code: 'hi', native: 'हिंदी', english: 'Hindi' },
    { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati' },
    { code: 'mr', native: 'मराठी', english: 'Marathi' },
    { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
    { code: 'te', native: 'తెలుగు', english: 'Telugu' },
    { code: 'en', native: 'English', english: 'English' },
  ];

  return (
    <PhoneFrame>
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 pt-6">
          <button onClick={() => fromProfile ? (localStorage.getItem('userRole') === 'supervisor' ? navigate('/supervisor') : navigate('/dashboard')) : navigate('/')} className="mb-4 active:scale-95 transition-transform">
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h2 className="text-center font-bold text-base mb-1">Choose Your Language / भाषा चुनें</h2>
          <div className="flex items-center justify-center gap-1.5 mt-1 text-center text-xs text-gray-500 font-bold">
            <WifiOff className="w-3.5 h-3.5 text-gray-400" />
            <span>{t('worksOffline') || 'Works 100% offline in your language'}</span>
          </div>
        </div>

        {/* Language Grid & Status Card */}
        <div className="flex-1 px-4 py-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`h-[72px] rounded-xl border transition-all active:scale-95 ${
                  selected === lang.code
                    ? 'border-2 border-[#5C35C0] bg-[#F0ECFF]'
                    : 'border border-[#E0E0E0] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="text-lg font-bold text-[#5C35C0]">{lang.native}</div>
                <div className="text-xs text-[#6B6B6B] font-semibold">{lang.english}</div>
              </button>
            ))}
          </div>

          {/* Model Downloaded Status Card */}
          <div className="p-4 bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-3 mt-4">
            <Download className="w-5 h-5 text-emerald-600 flex-shrink-0 animate-bounce" />
            <div className="text-left">
              <p className="text-[11px] font-extrabold text-emerald-800 leading-snug">
                {t('modelDownloaded') || 'Model downloaded: 45 MB • Ready for offline use'}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-4">
          <button
            onClick={() => {
              if (selected) {
                setSelectedLanguage(selected);
                if (fromProfile) {
                  const role = localStorage.getItem('userRole');
                  if (role === 'supervisor') {
                    navigate('/supervisor');
                  } else {
                    navigate('/dashboard');
                  }
                } else {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('isLogin');
                  localStorage.removeItem('userRole');
                  navigate('/login');
                }
              }
            }}
            disabled={!selected}
            className={`w-full h-[52px] rounded-lg font-medium transition-all active:scale-95 ${
              selected
                ? 'bg-[#5C35C0] text-white hover:bg-[#4A2A9F] cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
