import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type IntervalOption = 1 | 3 | 5;

interface SettingsPanelProps {
  interval: IntervalOption;
  setIntervalValue: (value: IntervalOption) => void;
}

export function SettingsPanel({
  interval,
  setIntervalValue,
}: SettingsPanelProps) {
  const intervals: { label: string; value: IntervalOption }[] = [
    { label: '1分', value: 1 },
    { label: '3分', value: 3 },
    { label: '5分', value: 5 },
  ];

  return (
    <div className="absolute top-4 right-4 z-50">
      <Popover>
        <PopoverTrigger
          className="flex items-center justify-center w-12 h-12 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
          aria-label="設定"
        >
          <Settings className="w-6 h-6" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-64 rounded-2xl p-4 shadow-xl border-slate-100 dark:border-slate-800"
        >
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">
              読み上げ間隔
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {intervals.map((item) => (
                <Button
                  key={item.value}
                  variant={interval === item.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIntervalValue(item.value)}
                  className={`rounded-xl font-bold ${
                    interval === item.value
                      ? 'bg-blue-600 text-white shadow hover:bg-blue-700'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              音声を有効にすると、設定された間隔で現在時刻を読み上げます。
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
