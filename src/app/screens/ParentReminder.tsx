import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft } from 'lucide-react';

export default function ParentReminder() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'send' | 'history' | 'events'>('send');
  const [recipientType, setRecipientType] = useState<'all' | 'select'>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [language, setLanguage] = useState<'hindi' | 'gujarati' | 'english'>('hindi');

  const reminderTypes = [
    { id: 'vaccination', icon: '💉', label: 'Vaccination due' },
    { id: 'nutrition', icon: '🍽️', label: 'Nutrition distribution' },
    { id: 'meeting', icon: '📅', label: 'Parent meeting' },
    { id: 'alert', icon: '⚠️', label: 'Health alert' },
    { id: 'event', icon: '🎉', label: 'Event / celebration' },
    { id: 'custom', icon: '✏️', label: 'Custom message' },
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
          <h1 className="font-bold text-white ml-4">Parent Connect</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white">
          {(['send', 'history', 'events'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? 'text-[#5C35C0] border-b-2 border-[#5C35C0]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              {t === 'send' ? 'Send Reminder' : t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {tab === 'send' && (
            <div className="p-4 space-y-6">
              {/* Recipient Selector */}
              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-3">Send To</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRecipientType('all')}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      recipientType === 'all'
                        ? 'bg-[#5C35C0] text-white'
                        : 'bg-gray-100 text-[#6B6B6B]'
                    }`}
                  >
                    All Parents
                  </button>
                  <button
                    onClick={() => setRecipientType('select')}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      recipientType === 'select'
                        ? 'bg-[#5C35C0] text-white'
                        : 'bg-gray-100 text-[#6B6B6B]'
                    }`}
                  >
                    Select Children
                  </button>
                </div>
              </div>

              {/* Reminder Type */}
              <div>
                <h3 className="font-semibold text-[#1C1C1C] mb-3">Reminder Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {reminderTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`h-[72px] rounded-xl border transition-all ${
                        selectedType === type.id
                          ? 'border-2 border-[#5C35C0] bg-[#F0ECFF]'
                          : 'border border-gray-200 bg-white'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium text-[#1C1C1C]">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Preview */}
              {selectedType && (
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-3">Message Preview</h3>
                  <div className="bg-[#F0ECFF] rounded-xl p-4 mb-3">
                    <p className="text-sm text-[#1C1C1C] leading-relaxed">
                      Dear parent, Vaccination (Measles) for [Child Name] is due on [Date]. Please visit ICDS Centre 04 between 9am-12pm.
                    </p>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-[#6B6B6B]">Language</span>
                    <div className="inline-flex bg-gray-100 rounded-lg p-1">
                      {(['hindi', 'gujarati', 'english'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                            language === lang
                              ? 'bg-white text-[#5C35C0] shadow-sm'
                              : 'text-[#6B6B6B]'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="text-sm text-[#5C35C0] font-medium mb-4">
                    Edit message
                  </button>

                  {/* Send Options */}
                  <div className="space-y-3">
                    <button className="w-full h-12 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                      <span className="text-xl">📱</span>
                      Send via WhatsApp
                    </button>
                    <button className="w-full h-12 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg font-medium">
                      Send via SMS
                    </button>
                    <button className="text-sm text-[#6B6B6B] text-center w-full">
                      Schedule for later
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'history' && (
            <div className="p-4 space-y-3">
              {[
                { date: 'Jun 2, 2025', type: 'Vaccination Reminder', count: 12 },
                { date: 'May 28, 2025', type: 'Parent Meeting', count: 32 },
                { date: 'May 25, 2025', type: 'Nutrition Distribution', count: 32 },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#1C1C1C] text-sm">{item.type}</span>
                    <span className="text-xs text-[#6B6B6B]">{item.date}</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">Sent to {item.count} parents</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'events' && (
            <div className="p-4 space-y-3">
              {[
                { date: 'Jun 10, 2025', event: 'Nutrition Day Celebration', time: '10:00 AM' },
                { date: 'Jun 15, 2025', event: 'Parent-Teacher Meeting', time: '2:00 PM' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#E8A020]">
                  <div className="font-semibold text-[#1C1C1C] text-sm mb-1">{item.event}</div>
                  <p className="text-xs text-[#6B6B6B]">
                    {item.date} · {item.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
}
