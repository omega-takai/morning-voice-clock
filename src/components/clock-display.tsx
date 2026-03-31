import React from 'react';

interface ClockDisplayProps {
  time: Date | null;
}

export function ClockDisplay({ time }: ClockDisplayProps) {
  if (!time) {
    return (
      <div className="flex items-center justify-center flex-1">
        <span className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-gray-300 to-gray-400 opacity-50 select-none">
          --:--
        </span>
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full relative">
      <div className="flex items-baseline justify-center select-none w-full">
        <span className="text-8xl sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-black tracking-tighter text-slate-800 dark:text-slate-100 tabular-nums leading-none">
          {hours}
        </span>
        <span className="text-6xl sm:text-[6rem] md:text-[9rem] lg:text-[14rem] font-black text-slate-400 dark:text-slate-500 mx-2 sm:mx-4 -translate-y-[10%] sm:-translate-y-[15%]">
          :
        </span>
        <span className="text-8xl sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-black tracking-tighter text-blue-600 dark:text-blue-400 tabular-nums leading-none">
          {minutes}
        </span>
      </div>
    </div>
  );
}
