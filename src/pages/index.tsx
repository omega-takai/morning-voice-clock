import Head from 'next/head';
import { useTime } from '@/lib/use-time';
import { useVoiceClock } from '@/lib/use-voice-clock';
import { ClockDisplay } from '@/components/clock-display';
import { PlayControl } from '@/components/play-control';
import { SettingsPanel } from '@/components/settings-panel';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  const time = useTime();
  const { isPlaying, interval, togglePlay, setIntervalValue } = useVoiceClock();

  return (
    <>
      <Head>
        <title>Morning Voice Clock</title>
        <meta
          name="description"
          content="時刻を読み上げるポップでクリーンな時計。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={twMerge(
          'relative min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500',
          'grid p-4 content-center gap-6',
        )}
      >
        <ClockDisplay time={time} />
        <PlayControl isPlaying={isPlaying} onToggle={togglePlay} />
        <SettingsPanel
          interval={interval}
          setIntervalValue={setIntervalValue}
        />
      </main>
    </>
  );
}
