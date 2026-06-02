import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { StatusBar } from '../components/StatusBar';
import { X, Play, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ActivityWalkthrough() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [language, setLanguage] = useState<'hindi' | 'gujarati'>('hindi');
  const totalSteps = 5;

  const steps = [
    { step: 1, instruction: 'Arrange 3 bowls in a row. Place red, blue, and yellow colored blocks in a pile.' },
    { step: 2, instruction: 'Ask children to sort the red blocks into the red bowl. Say: "Lal rangke pathar idhar rakhein!"' },
    { step: 3, instruction: 'Repeat with blue blocks. Encourage children to say the color name.' },
    { step: 4, instruction: 'Complete with yellow blocks. Clap and celebrate when they finish!' },
    { step: 5, instruction: 'Review all colors together. Point to each bowl and ask children to name the color.' },
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <PhoneFrame>
      <div className="w-full h-full flex flex-col bg-[#F7F5F0]">
        <StatusBar />

        {/* App Bar */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
          <button onClick={() => navigate('/activities')}>
            <X className="w-6 h-6 text-[#1C1C1C]" />
          </button>
          <h1 className="font-bold text-[#1C1C1C]">Colour Sorting Game</h1>
          <span className="text-xs font-medium text-[#6B6B6B]">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-[#5C35C0] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4">
          {/* Step Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <div className="inline-block px-3 py-1 bg-[#F0ECFF] text-[#5C35C0] rounded-full text-xs font-semibold mb-4">
              Step {currentStep}
            </div>

            <p className="text-lg leading-relaxed text-[#1C1C1C] mb-6">
              {steps[currentStep - 1].instruction}
            </p>

            {/* Illustration Area */}
            <div className="h-[140px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">🎨</div>
                <div className="text-xs text-[#6B6B6B]">Visual guide</div>
              </div>
            </div>
          </div>

          {/* Audio/Video Controls */}
          <div className="mb-4">
            <div className="flex gap-3 mb-3">
              <button className="flex-1 h-12 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg font-medium flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Play Audio
              </button>
              <button className="flex-1 h-12 border-2 border-[#5C35C0] text-[#5C35C0] rounded-lg font-medium flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" />
                Show Video
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLanguage('hindi')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'hindi'
                      ? 'bg-white text-[#5C35C0] shadow-sm'
                      : 'text-[#6B6B6B]'
                  }`}
                >
                  Hindi
                </button>
                <button
                  onClick={() => setLanguage('gujarati')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    language === 'gujarati'
                      ? 'bg-white text-[#5C35C0] shadow-sm'
                      : 'text-[#6B6B6B]'
                  }`}
                >
                  Gujarati
                </button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <button className="text-sm text-[#6B6B6B] text-center mb-4">
            Add note about this session
          </button>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
              className={`flex-1 h-12 rounded-lg font-medium border-2 flex items-center justify-center gap-2 ${
                currentStep === 1
                  ? 'border-gray-200 text-gray-400'
                  : 'border-[#5C35C0] text-[#5C35C0]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 h-12 bg-[#5C35C0] text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/activities')}
                className="flex-1 h-12 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Complete Activity ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
