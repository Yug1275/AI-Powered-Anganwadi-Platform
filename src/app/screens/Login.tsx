import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { t } from '../components/translations';

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'otp' | 'worker'>('otp');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PhoneFrame>
      <div className="w-full h-full bg-white flex flex-col overflow-y-auto relative animate-page-fade">
        {/* Illustration Banner */}
        <div className="h-[40%] bg-gradient-to-br from-[#E8A020] to-[#1A9E6E] relative flex items-center justify-center">
          {/* Back button to splash screen */}
          <button 
            onClick={() => navigate('/')} 
            className="absolute top-6 left-6 w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center active:scale-90 transition-all border border-white/10 shadow-sm z-10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="text-6xl">👩‍🏫👶👧</div>
          <div className="absolute bottom-6 left-6 text-white font-extrabold text-xl tracking-tight">
            {t('welcomeBack')}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 px-6 py-6 bg-white">
          <h2 className="text-sm font-bold text-[#6B6B6B] uppercase tracking-wider mb-6">
            {t('loginSubtitle')}
          </h2>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab('otp')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                tab === 'otp' ? 'bg-white text-[#5C35C0] shadow-sm' : 'text-[#6B6B6B] hover:text-slate-800'
              }`}
            >
              {t('otpTab')}
            </button>
            <button
              onClick={() => setTab('worker')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                tab === 'worker' ? 'bg-white text-[#5C35C0] shadow-sm' : 'text-[#6B6B6B] hover:text-slate-800'
              }`}
            >
              {t('workerTab')}
            </button>
          </div>

          {/* OTP Tab */}
          {tab === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#1C1C1C]">
                  {t('mobileLabel')}
                </label>
                <div className="flex gap-2">
                  <div className="w-16 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xs font-bold text-slate-700">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="flex-1 h-12 px-4 bg-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full h-12 bg-[#5C35C0] text-white rounded-xl font-bold text-xs hover:bg-[#4A2A9F] transition-all active:scale-95 shadow-md"
                >
                  {t('sendOtpBtn')}
                </button>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex gap-2 justify-between">
                    {[1, 2, 3, 4].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-14 h-14 text-center text-xl font-bold bg-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 text-center font-semibold">Resend in 30s</p>
                </div>
              )}
            </div>
          )}

          {/* Worker ID Tab */}
          {tab === 'worker' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#1C1C1C]">
                  {t('workerId')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. GJ-2024-1847"
                  className="w-full h-12 px-4 bg-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#1C1C1C]">
                  {t('passwordLabel')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-12 px-4 pr-12 bg-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#5C35C0]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200/50 rounded-full"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button 
                  onClick={() => alert('Password reset requested')}
                  className="text-xs text-[#5C35C0] font-bold hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[52px] bg-[#5C35C0] text-white rounded-xl font-bold text-xs mt-6 hover:bg-[#4A2A9F] active:scale-95 transition-all shadow-md"
          >
            {t('loginBtn')}
          </button>

          <p className="text-[10px] text-[#6B6B6B] text-center mt-6 font-semibold">
            {t('needHelp')}
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
