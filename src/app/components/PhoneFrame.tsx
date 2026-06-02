import { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[55px] shadow-2xl p-3">
        {/* Phone outer bezel */}
        <div className="relative w-full h-full bg-[#1C1C1C] rounded-[48px] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50" />

          {/* Screen Content */}
          <div className="w-full h-full bg-[#F7F5F0] overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
