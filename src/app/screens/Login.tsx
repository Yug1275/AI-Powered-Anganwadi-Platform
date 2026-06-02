import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PhoneFrame } from '../components/PhoneFrame';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'otp' | 'worker'>('otp');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PhoneFrame>
      <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
        {/* Illustration Banner */}
        <div className="h-[40%] bg-gradient-to-br from-[#E8A020] to-[#1A9E6E] relative flex items-center justify-center">
          <div className="text-6xl">👩‍🏫👶👧</div>
          <div className="absolute bottom-6 left-6 text-white font-bold text-xl">Welcome back</div>
        </div>

        {/* Form Section */}
        <div className="flex-1 px-6 py-6">
          <h2 className="text-lg font-bold mb-6">Login to continue</h2>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setTab('otp')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                tab === 'otp' ? 'bg-white text-[#5C35C0] shadow-sm' : 'text-[#6B6B6B]'
              }`}
            >
              Mobile OTP
            </button>
            <button
              onClick={() => setTab('worker')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                tab === 'worker' ? 'bg-white text-[#5C35C0] shadow-sm' : 'text-[#6B6B6B]'
              }`}
            >
              Worker ID
            </button>
          </div>

          {/* OTP Tab */}
          {tab === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1C1C1C]">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="flex-1 h-12 px-4 bg-gray-100 rounded-lg text-sm"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={() => setOtpSent(true)}
                  className="w-full h-12 bg-[#5C35C0] text-white rounded-lg font-medium"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="flex gap-2 justify-between">
                    {[1, 2, 3, 4].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-14 h-14 text-center text-xl font-bold bg-gray-100 rounded-lg"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#6B6B6B] text-center">Resend in 30s</p>
                </>
              )}
            </div>
          )}

          {/* Worker ID Tab */}
          {tab === 'worker' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#1C1C1C]">Worker ID</label>
                <input
                  type="text"
                  placeholder="e.g. GJ-2024-1847"
                  className="w-full h-12 px-4 bg-gray-100 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-[#1C1C1C]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-12 px-4 pr-12 bg-gray-100 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-[#6B6B6B]" />
                    ) : (
                      <Eye className="w-5 h-5 text-[#6B6B6B]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button className="text-sm text-[#5C35C0] font-medium">Forgot Password?</button>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[52px] bg-[#5C35C0] text-white rounded-lg font-medium mt-6"
          >
            Login
          </button>

          <p className="text-xs text-[#6B6B6B] text-center mt-6">
            Need help? Call 1800-XXX-XXXX
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
