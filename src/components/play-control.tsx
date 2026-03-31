import React from 'react';
import { Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayControl({ isPlaying, onToggle }: PlayControlProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`w-36 h-36 rounded-full shadow-lg transition-all duration-300 transform active:scale-95 ${
          isPlaying
            ? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'
            : 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600'
        }`}
        aria-label={isPlaying ? '音声通知を停止する' : '音声通知を再生する'}
      >
        {isPlaying ? (
          <Square className="w-16 h-16 fill-current" />
        ) : (
          <Play className="w-16 h-16 fill-current ml-2" />
        )}
      </Button>
      <p className="mt-4 text-sm font-medium text-slate-500">
        {isPlaying ? '音声通知を停止する' : '音声通知を再生する'}
      </p>
    </div>
  );
}
