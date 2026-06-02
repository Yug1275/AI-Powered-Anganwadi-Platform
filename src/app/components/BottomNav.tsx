import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '👤', label: 'Children', path: '/child/1' },
    { icon: '⭐', label: 'Activities', path: '/activities' },
    { icon: '📄', label: 'Reports', path: '/reports' },
    { icon: '🎤', label: 'AI Help', path: '/dashboard' }, // Opens voice overlay
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-around px-4 z-40">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path ||
                      (tab.path === '/child/1' && location.pathname.startsWith('/child'));
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 relative"
          >
            {active && <div className="absolute -top-2 w-1 h-1 bg-[#5C35C0] rounded-full" />}
            <span className={`text-lg ${active ? 'grayscale-0' : 'grayscale opacity-60'}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] ${active ? 'text-[#5C35C0] font-medium' : 'text-[#6B6B6B]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
