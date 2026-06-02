import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { X, Play, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { t } from '../components/translations';
import { ConnectivityStatus } from '../components/ConnectivityStatus';

export default function ActivityWalkthrough() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 5;

  const steps = [
    t('step1Desc'),
    t('step2Desc'),
    t('step3Desc'),
    t('step4Desc'),
    t('step5Desc')
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col bg-[#F7F5F0] relative overflow-hidden animate-page-fade">
        <StatusBar />

        {/* App Bar */}
        <div className="bg-[#5C35C0] px-4 py-3 flex items-center justify-between shadow-sm z-30 text-white">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1 hover:bg-white/10 rounded-full active:scale-95 transition-transform"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-bold text-white text-sm">{t('sortingGame')}</h1>
          <div className="flex items-center gap-1.5">
            <ConnectivityStatus />
            <span className="text-[10px] font-bold text-white/90 bg-white/20 px-2 py-1 rounded-full uppercase tracking-wider">
              {t('stepTitle')} {currentStep}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 z-10">
          <div
            className="h-full bg-[#5C35C0] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4 z-10">
          {/* Step Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-4 border border-slate-100 flex-1 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-[#F0ECFF] text-[#5C35C0] rounded-full text-[10px] font-extrabold uppercase tracking-wide mb-4">
                {t('stepTitle')} {currentStep}
              </div>

              <p className="text-sm font-bold leading-relaxed text-[#1C1C1C] mb-6">
                {steps[currentStep - 1]}
              </p>
            </div>

            {/* Illustration Area */}
            <div className="h-[140px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center border border-purple-100/50">
              <div className="text-center">
                <div className="text-5xl mb-2 animate-bounce">🎨</div>
                <div className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider">{t('visualGuide')}</div>
              </div>
            </div>
          </div>

          {/* Audio/Video Controls */}
          <div className="mb-4">
            <div className="flex gap-3 mb-3">
              <button 
                onClick={() => alert('Playing guide audio...')}
                className="flex-1 h-12 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all bg-white hover:bg-purple-50/30"
              >
                <Play className="w-4 h-4 fill-current" />
                {t('playAudioLabel')}
              </button>
              <button 
                onClick={() => alert('Displaying visual video player...')}
                className="flex-1 h-12 border-2 border-[#5C35C0] text-[#5C35C0] rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all bg-white hover:bg-purple-50/30"
              >
                <Camera className="w-4 h-4" />
                {t('showVideoLabel')}
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <button 
            onClick={() => alert('Notes input opened!')}
            className="text-xs text-[#6B6B6B] text-center mb-4 font-bold hover:underline"
          >
            {t('noteSessionLabel')}
          </button>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className={`flex-1 h-12 rounded-xl font-bold text-xs border-2 flex items-center justify-center gap-2 active:scale-95 transition-all ${
                currentStep === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-slate-100'
                  : 'border-[#5C35C0] text-[#5C35C0] bg-white hover:bg-slate-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('btnPrevStep')}
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 h-12 bg-[#5C35C0] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 hover:bg-[#4A2A9F] transition-colors shadow-md"
              >
                {t('btnNextStep')}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/activities')}
                className="flex-1 h-12 bg-green-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 hover:bg-green-700 transition-colors shadow-md animate-pulse"
              >
                {t('completeActivity')}
              </button>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
