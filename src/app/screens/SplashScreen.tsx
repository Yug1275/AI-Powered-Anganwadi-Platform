import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PhoneFrame>
      <div className="w-full h-full bg-gradient-to-b from-[#5C35C0] to-[#3A1E8A] flex flex-col items-center justify-center px-8">
        {/* App Icon */}
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-4xl">🪷</div>
        </div>

        {/* App Name */}
        <h1 className="text-white font-bold text-[28px] mb-2">Anganwadi Saathi</h1>

        {/* Tagline */}
        <p className="text-white text-sm opacity-90">हर बच्चे का साथी · Every Child's Companion</p>

        {/* Loading Bar */}
        <div className="absolute bottom-20 left-8 right-8">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-[loading_2.5s_ease-in-out]" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Version */}
        <p className="absolute bottom-8 text-white text-xs opacity-70">v1.0</p>
      </div>
    </PhoneFrame>
  );
}
