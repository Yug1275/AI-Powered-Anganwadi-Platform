import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft, ChevronRight, Eye, Share, Download, ChevronDown } from 'lucide-react';

export default function ReportGenerator() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reportTypes = [
    {
      id: 'daily',
      icon: '📅',
      title: 'Daily Report',
      description: 'Attendance, nutrition, activities for today',
      color: 'bg-blue-100',
    },
    {
      id: 'weekly',
      icon: '📊',
      title: 'Weekly Report',
      description: 'Summary for Mon–Sun with trends',
      color: 'bg-green-100',
    },
    {
      id: 'monthly',
      icon: '🗓️',
      title: 'Monthly Report',
      description: 'Full month data in MIS format',
      color: 'bg-purple-100',
    },
  ];

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col">
        <StatusBar purple />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center">
          <button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white ml-4">Report Generator</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Report Type Selector */}
          <div className="p-4 space-y-3">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 text-left transition-all ${
                  selectedReport === report.id ? 'ring-2 ring-[#5C35C0]' : ''
                }`}
              >
                <div className={`w-10 h-10 ${report.color} rounded-full flex items-center justify-center text-xl flex-shrink-0`}>
                  {report.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1C1C1C] text-sm mb-0.5">{report.title}</h3>
                  <p className="text-xs text-[#6B6B6B]">{report.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B6B6B] flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Generated Report Preview */}
          {selectedReport && (
            <div className="px-4 pb-4">
              <div className="bg-white rounded-2xl border-2 border-[#5C35C0] overflow-hidden">
                {/* Report Header */}
                <div className="bg-[#F7F5F0] p-4 border-b">
                  <h3 className="font-semibold text-[#1C1C1C] mb-1">
                    {reportTypes.find(r => r.id === selectedReport)?.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B]">
                    ICDS Centre 04 · June 3, 2025 · Sunita Ji
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
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between py-3 cursor-pointer list-none">
                        <span className="text-sm font-medium text-[#1C1C1C]">{section}</span>
                        <ChevronDown className="w-4 h-4 text-[#6B6B6B] transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pb-3 pl-4 text-xs text-[#6B6B6B]">
                        Content for {section.toLowerCase()}
                      </div>
                    </details>
                  ))}
                </div>

                {/* AI Status */}
                <div className="p-4 bg-amber-50 border-t flex items-center gap-2">
                  <span className="text-xs font-medium text-amber-700">AI auto-filled</span>
                  <span className="text-xs text-[#6B6B6B]">· Review before submitting</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <button className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                    <Share className="w-4 h-4" />
                    Share
                  </button>
                  <button className="h-10 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>

                <button className="w-full h-[52px] bg-green-600 text-white rounded-lg font-medium">
                  Submit to Supervisor
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
