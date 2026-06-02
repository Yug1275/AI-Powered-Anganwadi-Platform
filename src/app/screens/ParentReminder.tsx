import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { ArrowLeft } from 'lucide-react';
import { t } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function ParentReminder() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'send' | 'history' | 'events'>('send');
  const [recipientType, setRecipientType] = useState<'all' | 'select'>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const [children] = useState(() => {
    const saved = localStorage.getItem('anganwadiChildren');
    const defaultRoster = [
      { id: 1, nameKey: 'child1Name', initials: 'AP', color: 'bg-pink-400', emoji: '👧' },
      { id: 2, nameKey: 'child2Name', initials: 'RK', color: 'bg-blue-400', emoji: '👦' },
      { id: 3, nameKey: 'child3Name', initials: 'PS', color: 'bg-green-400', emoji: '👧' },
      { id: 4, nameKey: 'child4Name', initials: 'AS', color: 'bg-purple-400', emoji: '👦' },
      { id: 5, nameKey: 'child5Name', initials: 'SD', color: 'bg-orange-400', emoji: '👧' },
    ];
    return saved ? JSON.parse(saved) : defaultRoster;
  });
  const [selectedChildren, setSelectedChildren] = useState<Record<number, boolean>>({});

  const reminderTypes = [
    { id: 'vaccination', icon: '💉', labelKey: 'reminderVaccination' },
    { id: 'nutrition', icon: '🍽️', labelKey: 'reminderNutrition' },
    { id: 'meeting', icon: '📅', labelKey: 'reminderMeeting' },
    { id: 'alert', icon: '⚠️', labelKey: 'reminderAlert' },
    { id: 'event', icon: '🎉', labelKey: 'reminderEvent' },
    { id: 'custom', icon: '✏️', labelKey: 'reminderCustom' },
  ];

  const getPreviewMessage = () => {
    if (!selectedType) return "";
    const keyMap: Record<string, string> = {
      vaccination: 'reminderMsgVaccination',
      nutrition: 'reminderMsgNutrition',
      meeting: 'reminderMsgMeeting',
      alert: 'reminderMsgAlert',
      event: 'reminderMsgEvent',
      custom: 'reminderMsgCustom',
    };
    const key = keyMap[selectedType] || 'reminderMsgCustom';
    return t(key);
  };

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
            <h1 className="font-bold text-white ml-4 tracking-wide">{t('parentConnectTitle')}</h1>
          </div>
          <ConnectivityStatus />
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-white shadow-sm z-10">
          {[
            { id: 'send', label: t('sendTab') },
            { id: 'history', label: t('historyTab') },
            { id: 'events', label: t('eventsTab') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${
                tab === item.id
                  ? 'text-[#5C35C0] border-b-3 border-[#5C35C0]'
                  : 'text-[#6B6B6B]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 scrollbar-hide">
          {tab === 'send' && (
            <div className="p-4 space-y-6 animate-page-fade">
              {/* Recipient Selector */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{t('sendToLabel')}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRecipientType('all')}
                    className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                      recipientType === 'all'
                        ? 'bg-[#5C35C0] text-white shadow-sm'
                        : 'bg-gray-100 text-[#6B6B6B] hover:bg-slate-200'
                    }`}
                  >
                    {t('allParents')}
                  </button>
                  <button
                    onClick={() => setRecipientType('select')}
                    className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
                      recipientType === 'select'
                        ? 'bg-[#5C35C0] text-white shadow-sm'
                        : 'bg-gray-100 text-[#6B6B6B] hover:bg-slate-200'
                    }`}
                  >
                    {t('selectChildren')}
                  </button>
                </div>
              </div>

              {/* Dynamic Child Selector Checkboxes List */}
              {recipientType === 'select' && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 animate-fade-in space-y-2">
                  <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-2">Select Students</h3>
                  <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1 scrollbar-hide">
                    {children.map((child: any) => {
                      const isSelected = selectedChildren[child.id] || false;
                      const displayName = child.nameVal || t(child.nameKey);
                      return (
                        <label 
                          key={child.id} 
                          className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-slate-100"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${child.color || 'bg-[#5C35C0]/20'} flex items-center justify-center text-xs font-bold ${child.color ? 'text-white' : 'text-[#5C35C0]'}`}>
                              {child.emoji || child.initials || '👶'}
                            </div>
                            <span className="text-xs font-bold text-[#1C1C1C]">{displayName}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => setSelectedChildren({ ...selectedChildren, [child.id]: !isSelected })}
                            className="w-4 h-4 rounded border-slate-300 text-[#5C35C0] focus:ring-[#5C35C0] accent-[#5C35C0]"
                          />
                        </label>
                      );
                    })}
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold text-right pt-1">
                    Selected: {Object.values(selectedChildren).filter(Boolean).length} / {children.length}
                  </div>
                </div>
              )}

              {/* Reminder Type */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">Reminder Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {reminderTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`h-[80px] rounded-xl border flex flex-col items-center justify-center transition-all active:scale-95 ${
                        selectedType === type.id
                          ? 'border-2 border-[#5C35C0] bg-[#F0ECFF] shadow-sm'
                          : 'border border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className="text-[10px] font-bold text-[#1C1C1C] text-center leading-tight px-1">{t(type.labelKey)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Preview */}
              {selectedType && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 animate-fade-in">
                  <h3 className="font-bold text-[#1C1C1C] text-xs uppercase tracking-wider mb-3">{t('previewLabel')}</h3>
                  <div className="bg-[#F0ECFF] rounded-xl p-3.5 mb-4 border border-[#5C35C0]/10">
                    <p className="text-xs text-[#1C1C1C] leading-relaxed font-semibold">
                      {getPreviewMessage()}
                    </p>
                  </div>

                  <button 
                    onClick={() => alert('Message editor opened!')}
                    className="text-xs text-[#5C35C0] font-bold mb-5 hover:underline"
                  >
                    Edit message template
                  </button>

                  {/* Send Options */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => alert('Sending broadcast via WhatsApp...')}
                      className="w-full h-11 bg-green-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-green-700 shadow-sm"
                    >
                      <span className="text-lg">📱</span>
                      {t('whatsappBtn')}
                    </button>
                    <button 
                      onClick={() => alert('Sending broadcast via SMS...')}
                      className="w-full h-11 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors active:scale-95 flex items-center justify-center"
                    >
                      {t('smsBtn')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'history' && (
            <div className="p-4 space-y-3 animate-page-fade">
              {[
                { date: 'Jun 2, 2026', typeKey: 'reminderVaccination', count: 12 },
                { date: 'May 28, 2025', typeKey: 'reminderMeeting', count: 32 },
                { date: 'May 25, 2025', typeKey: 'reminderNutrition', count: 32 },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-1.5 border-b pb-1">
                    <span className="font-extrabold text-[#1C1C1C] text-xs">{t(item.typeKey)}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">{item.date}</span>
                  </div>
                  <p className="text-[10px] text-[#6B6B6B] font-semibold">Sent to {item.count} parents successfully</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'events' && (
            <div className="p-4 space-y-3 animate-page-fade">
              {[
                { date: 'Jun 10, 2026', event: 'Nutrition Day Celebration', time: '10:00 AM' },
                { date: 'Jun 15, 2026', event: 'Parent-Teacher Meeting', time: '2:00 PM' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#E8A020] border-y border-r border-slate-100">
                  <div className="font-extrabold text-[#1C1C1C] text-xs mb-1">{item.event}</div>
                  <p className="text-[10px] text-gray-500 font-semibold">
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
