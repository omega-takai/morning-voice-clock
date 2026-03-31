import { VolumeOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayControl({ isPlaying, onToggle }: PlayControlProps) {
  return (
    <div className="grid justify-items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={`size-24 rounded-full shadow-lg transition-all duration-300 transform active:scale-95 ${
          isPlaying
            ? 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600'
            : 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'
        }`}
        aria-label={isPlaying ? '音声通知を停止する' : '音声通知を再生する'}
      >
        {isPlaying ? (
          <Volume2 className="size-8 fill-current" />
        ) : (
          <VolumeOff className="size-8 fill-current" />
        )}
      </Button>
    </div>
  );
}
