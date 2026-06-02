import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ConnectivityStatus, useOnlineStatus } from '../components/ConnectivityStatus';
import { t } from '../components/translations';
import { ArrowLeft, Wifi, WifiOff, CloudLightning, RefreshCw, FileText, CheckCircle, Database } from 'lucide-react';

interface QueueItem {
  id: number;
  type: string;
  status: string;
  details: string;
  size: string;
}

export default function OfflineSync() {
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus();
  
  // Manage the offline queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [syncing, setSyncing] = useState(false);

  // Default queue items totaling 1.27 MB (4 items)
  const defaultQueue: QueueItem[] = [
    { id: 1, type: 'Morning Attendance', status: 'Pending', details: 'Marked 28 children present', size: '0.45 MB' },
    { id: 2, type: 'Voice Log: Aarav Weight', status: 'Pending', details: 'Weight metric: 14.0 kg', size: '0.12 MB' },
    { id: 3, type: 'Child Growth Alert', status: 'Pending', details: 'Growth risk warning logged', size: '0.62 MB' },
    { id: 4, type: 'Parent Notification', status: 'Pending', details: 'WhatsApp reminder queued', size: '0.08 MB' },
  ];

  // Initialize and load queue from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pendingQueue');
    if (saved) {
      setQueue(JSON.parse(saved));
    } else {
      localStorage.setItem('pendingQueue', JSON.stringify(defaultQueue));
      setQueue(defaultQueue);
    }
  }, []);

  // Compute stats
  const totalItems = queue.length;
  const totalSize = queue.reduce((acc, item) => {
    const num = parseFloat(item.size.split(' ')[0]);
    return acc + num;
  }, 0).toFixed(2);

  const handleSyncNow = () => {
    if (!isOnline) {
      alert('Cannot sync. Please toggle the connection status to "Online" to upload local data.');
      return;
    }

    setSyncing(true);
    // Simulate syncing over 2 seconds
    setTimeout(() => {
      setSyncing(false);
      setQueue([]);
      localStorage.setItem('pendingQueue', JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('show-toast', { 
        detail: { message: 'All pending data successfully synchronized to ICDS Cloud!' } 
      }));
    }, 2200);
  };

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
              title="Go back to dashboard"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="font-bold text-white tracking-wide">{t('syncStatus') || 'Data Sync Status'}</h1>
          </div>
          <ConnectivityStatus />
        </div>

        {/* Scrollable Panel */}
        <div className="flex-1 overflow-y-auto pb-32 bg-slate-50 scrollbar-hide flex flex-col">
          
          {/* Large Dynamic Sync Illustration */}
          <div className="bg-white p-6 flex flex-col items-center justify-center border-b border-slate-100 shadow-sm">
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
              {/* Outer pulsing rings */}
              <div className={`absolute inset-0 rounded-full ${isOnline ? 'bg-purple-50 animate-pulse' : 'bg-rose-50 animate-pulse-subtle'}`} />
              <div className={`absolute inset-2 rounded-full border border-dashed ${isOnline ? 'border-purple-300 animate-spin-slow' : 'border-rose-300'}`} />
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md relative z-10 ${isOnline ? 'bg-[#5C35C0] text-white' : 'bg-rose-600 text-white'}`}>
                {syncing ? (
                  <RefreshCw className="w-8 h-8 animate-spin" />
                ) : isOnline ? (
                  <Wifi className="w-8 h-8" />
                ) : (
                  <WifiOff className="w-8 h-8" />
                )}
              </div>
            </div>

            <h3 className="font-extrabold text-sm text-[#1C1C1C] text-center mb-1">
              {isOnline ? 'Connected to ICDS Cloud' : (t('currentlyOffline') || 'You are currently offline.')}
            </h3>
            <p className="text-[10px] text-[#6B6B6B] font-bold text-center max-w-[280px]">
              {isOnline 
                ? 'All systems active. Ready to synchronize locally stored logs and student cards.'
                : (t('offlineStorageDesc') || 'All data is safely stored on your device.')
              }
            </p>
          </div>

          <div className="p-4 flex-1">
            {/* Sync Summary Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Pending Cache</span>
                  <h4 className="font-extrabold text-xs text-slate-800">
                    {totalItems > 0 ? `${totalSize} MB` : '0.00 MB'}
                  </h4>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Queue Status</span>
                <p className="font-extrabold text-xs text-[#5C35C0]">
                  {totalItems} {totalItems === 1 ? 'item waiting' : (t('itemsWaiting') || 'items waiting')}
                </p>
              </div>
            </div>

            {/* Sync Action Button */}
            {totalItems > 0 && (
              <button
                onClick={handleSyncNow}
                disabled={syncing}
                className={`w-full h-11 rounded-xl font-bold text-xs shadow-md transition-all active:scale-98 mb-4 flex items-center justify-center gap-2 ${
                  isOnline 
                    ? 'bg-[#5C35C0] text-white hover:bg-[#4A2A9F]' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Synchronizing...' : 'Upload & Sync Data Now'}
              </button>
            )}

            {/* Pending Queue List */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">
                {totalItems > 0 ? 'Pending Sync Roster' : 'Queue Empty'}
              </h4>

              {queue.length > 0 ? (
                queue.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-100 flex justify-between items-center transition-all hover:border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-50 text-[#5C35C0] rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0">
                        📁
                      </div>
                      <div>
                        <h5 className="font-extrabold text-[#1C1C1C] text-[11px] leading-snug">{item.type}</h5>
                        <p className="text-[9px] text-[#6B6B6B] font-bold mt-0.5">{item.details}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[8px] font-extrabold rounded-full border border-amber-100 uppercase tracking-wide">
                        Pending
                      </span>
                      <span className="text-[8px] font-bold text-gray-400">{item.size} · Local</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl py-8 px-4 border border-dashed border-slate-200 text-center flex flex-col items-center justify-center text-slate-400">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mb-2.5" />
                  <p className="text-xs font-bold text-slate-700">All data synchronized</p>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Anganwadi records are up-to-date with cloud.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Green Banner */}
        <div className="absolute bottom-16 left-0 right-0 bg-emerald-600 px-4 py-2.5 text-center text-white z-30 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] border-t border-emerald-500/30 flex items-center justify-center gap-1.5">
          <span className="text-[10px] font-extrabold tracking-wide text-emerald-100 flex items-center gap-1.5 leading-snug">
             🛡️ {t('autoSyncEnabled') || 'Auto-sync enabled. Data will upload automatically when 3G/4G/WiFi becomes available.'}
          </span>
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
