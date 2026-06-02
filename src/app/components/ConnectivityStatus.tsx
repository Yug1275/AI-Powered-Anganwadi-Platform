import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    return localStorage.getItem('isOnline') !== 'false';
  });

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(localStorage.getItem('isOnline') !== 'false');
    };
    window.addEventListener('online-status-change', handleStatusChange);
    window.addEventListener('storage', handleStatusChange);
    return () => {
      window.removeEventListener('online-status-change', handleStatusChange);
      window.removeEventListener('storage', handleStatusChange);
    };
  }, []);

  const toggleOnline = () => {
    const nextVal = !isOnline;
    localStorage.setItem('isOnline', String(nextVal));
    window.dispatchEvent(new Event('online-status-change'));
    window.dispatchEvent(new CustomEvent('connectivity-toast', { detail: { isOnline: nextVal } }));
  };

  return { isOnline, toggleOnline };
}

export function ConnectivityStatus() {
  const { isOnline, toggleOnline } = useOnlineStatus();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    toggleOnline();
    setShowTooltip(true);
    // Hide tooltip after a short delay for mobile feedback
    setTimeout(() => {
      setShowTooltip(false);
    }, 2800);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 rounded-full border border-white/10 transition-all cursor-pointer text-white text-[10px] font-bold"
        title={isOnline ? "Online - Connected to cloud" : "Offline - Storing locally"}
      >
        <span className={`flex h-2 w-2 relative`}>
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
        </span>
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </button>

      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900/95 text-white text-[9px] p-2.5 rounded-lg shadow-xl z-50 border border-slate-700/50 leading-relaxed animate-fade-in">
          {isOnline ? (
            <>
              <p className="font-bold text-emerald-400">🟢 Online</p>
              <p className="text-gray-300 font-medium">Connected to cloud. Data syncing normally.</p>
            </>
          ) : (
            <>
              <p className="font-bold text-rose-400">🔴 Offline</p>
              <p className="text-gray-300 font-medium">No internet connection. All data will be stored locally and synced automatically.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
