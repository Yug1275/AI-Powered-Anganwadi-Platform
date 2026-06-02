import { useNavigate, useLocation } from 'react-router';
import { t } from './translations';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: '🏠', labelKey: 'dashboard', path: '/dashboard' },
    { icon: '👶', labelKey: 'children', path: '/child/1' },
    { icon: '🎨', labelKey: 'activities', path: '/activities' },
    { icon: '📄', labelKey: 'reports', path: '/reports' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex items-center justify-around px-4 z-40">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path ||
                      (tab.path === '/child/1' && location.pathname.startsWith('/child'));
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-0.5 relative py-1 flex-1 active:scale-95 transition-transform"
          >
            {active && <div className="absolute top-0 w-1.5 h-1.5 bg-[#5C35C0] rounded-full" />}
            <span className={`text-xl transition-all ${active ? 'scale-110' : 'opacity-50 grayscale hover:opacity-80'}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] tracking-wide transition-colors ${active ? 'text-[#5C35C0] font-semibold' : 'text-[#6B6B6B]'}`}>
              {t(tab.labelKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
