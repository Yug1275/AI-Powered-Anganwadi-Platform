export function StatusBar({ purple = false }: { purple?: boolean }) {
  return (
    <div className={`h-12 flex items-center justify-between px-6 pt-3 ${purple ? 'bg-[#5C35C0]' : 'bg-white'}`}>
      <span className={`text-xs ${purple ? 'text-white' : 'text-[#1C1C1C]'}`}>10:35 am</span>
      <div className="flex gap-1 items-center">
        <div className={`w-4 h-3 border rounded-sm ${purple ? 'border-white' : 'border-[#1C1C1C]'}`} />
        <div className={`w-6 h-3 border rounded-sm relative ${purple ? 'border-white' : 'border-[#1C1C1C]'}`}>
          <div className={`absolute inset-0.5 rounded-sm w-3/4 ${purple ? 'bg-white' : 'bg-[#1C1C1C]'}`} />
        </div>
      </div>
    </div>
  );
}
