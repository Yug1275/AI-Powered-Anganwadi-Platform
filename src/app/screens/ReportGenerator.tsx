import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, ChevronRight, Eye, Share, Download, ChevronDown } from 'lucide-react';
import { t } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function ReportGenerator() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Localized report types
  const reportTypes = [
    {
      id: 'daily',
      icon: '📅',
      title: t('dailyReportTitle'),
      description: t('dailyReportDesc'),
      color: 'bg-blue-100',
    },
    {
      id: 'weekly',
      icon: '📊',
      title: t('weeklyReportTitle'),
      description: t('weeklyReportDesc'),
      color: 'bg-green-100',
    },
    {
      id: 'monthly',
      icon: '🗓️',
      title: t('monthlyReportTitle'),
      description: t('monthlyReportDesc'),
      color: 'bg-purple-100',
    },
  ];

  // Section localization dictionary
  const sections: Record<string, string> = {
    'Attendance Summary': t('secAttendance'),
    'Nutrition Distribution': t('secNutrition'),
    'Home Visits Completed': t('secVisits'),
    'Vaccination Updates': t('secVaccine'),
    'Remarks': t('secRemarks'),
  };

  const btnPreview = t('btnPreview');
  const btnShare = t('btnShare');
  const btnSupervisor = t('btnSupervisor');
  const aiAutoFilled = t('aiAutoFilled');
  const aiReviewLabel = t('aiReviewLabel');

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col relative overflow-hidden animate-page-fade">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h3 className="font-bold text-white ml-4 tracking-wide">{t('reportsHeader')}</h3>
          </div>
          <ConnectivityStatus />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {/* Report Type Selector */}
          <div className="p-4 space-y-3">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100/50 flex items-center gap-4 text-left transition-all active:scale-98 ${
                  selectedReport === report.id ? 'ring-2 ring-[#5C35C0]' : ''
                }`}
              >
                <div className={`w-10 h-10 ${report.color} rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-sm`}>
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-[#1C1C1C] text-xs mb-0.5">{report.title}</h3>
                  <p className="text-[10px] text-[#6B6B6B] font-semibold">{report.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B6B6B] flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Generated Report Preview */}
          {selectedReport && (
            <div className="px-4 pb-4 animate-fade-in">
              <div className="bg-white rounded-2xl border-2 border-[#5C35C0] overflow-hidden shadow-sm">
                {/* Report Header */}
                <div className="bg-[#F7F5F0] p-4 border-b">
                  <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-1">
                    {reportTypes.find(r => r.id === selectedReport)?.title}
                  </h3>
                  <p className="text-[10px] text-[#6B6B6B] font-bold">
                    ICDS Centre 04 · June 3, 2026 · {t('workerNameShort')}
                  </p>
                </div>

                {/* Report Sections */}
                <div className="p-4 space-y-2">
                  {[
                    'Attendance Summary',
                    'Nutrition Distribution',
                    'Home Visits Completed',
                    'Vaccination Updates',
                    'Remarks',
                  ].map((section, i) => (
                    <details key={i} className="group border-b border-slate-50 last:border-b-0">
                      <summary className="flex items-center justify-between py-3 cursor-pointer list-none outline-none select-none">
                        <span className="text-xs font-bold text-[#1C1C1C]">{sections[section] || section}</span>
                        <ChevronDown className="w-4 h-4 text-[#6B6B6B] transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pb-3 pl-4 text-[10px] text-[#6B6B6B] font-semibold leading-relaxed">
                        {t('secContentTemplate').replace('{name}', sections[section] || section)}
                      </div>
                    </details>
                  ))}
                </div>

                {/* AI Status */}
                <div className="p-4 bg-amber-50/70 border-t border-slate-100 flex items-center gap-2 font-bold">
                  <span className="text-[10px] text-amber-700">{aiAutoFilled}</span>
                  <span className="text-[9px] text-[#6B6B6B]">{aiReviewLabel}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => alert('Opening screen reader preview...')}
                    className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all bg-white hover:bg-purple-50/30"
                  >
                    <Eye className="w-4 h-4" />
                    {btnPreview}
                  </button>
                  <button 
                    onClick={() => alert('Preparing report sharing intent...')}
                    className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all bg-white hover:bg-purple-50/30"
                  >
                    <Share className="w-4 h-4" />
                    {btnShare}
                  </button>
                  <button 
                    onClick={() => alert('PDF document compiled successfully')}
                    className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-all bg-white hover:bg-purple-50/30"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>

                <button 
                  onClick={() => {
                    const isOnline = localStorage.getItem('isOnline') !== 'false';
                    if (!isOnline) {
                      window.dispatchEvent(new CustomEvent('show-toast', { 
                        detail: { message: t('savedOfflineMessage') || 'Saved Offline ✓ Will sync automatically later.' } 
                      }));
                      const pendingQueue = JSON.parse(localStorage.getItem('pendingQueue') || '[]');
                      const newItem = {
                        id: Date.now(),
                        type: 'Report Submission: ' + (selectedReport === 'daily' ? 'Daily' : selectedReport === 'weekly' ? 'Weekly' : 'Monthly'),
                        status: 'Pending',
                        details: 'Submitted to Supervisor',
                        size: '0.45 MB'
                      };
                      localStorage.setItem('pendingQueue', JSON.stringify([...pendingQueue, newItem]));
                    } else {
                      alert('Report submitted to your ICDS Supervisor successfully!');
                    }
                  }}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  {btnSupervisor}
                </button>
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
