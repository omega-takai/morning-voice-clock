import Head from 'next/head';
import { useTime } from '@/lib/use-time';
import { useVoiceClock } from '@/lib/use-voice-clock';
import { ClockDisplay } from '@/components/clock-display';
import { PlayControl } from '@/components/play-control';
import { SettingsPanel } from '@/components/settings-panel';

export default function Home() {
  const time = useTime();
  const { isPlaying, interval, togglePlay, setIntervalValue } = useVoiceClock();

  return (
    <>
      <Head>
        <title>Morning Voice Clock</title>
        <meta
          name="description"
          content="北欧モダン×朝のエネルギー。時刻を読み上げるポップでクリーンな時計。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500">
        {/* 右上の設定パネル */}
        <SettingsPanel
          interval={interval}
          setIntervalValue={setIntervalValue}
        />

        {/* 画面の上半分〜中央: 時計表示 */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 mt-12 sm:mt-0">
          <ClockDisplay time={time} />
        </div>

        {/* 画面の下部: コントロール */}
        <div className="flex-none pb-24 sm:pb-32">
          <PlayControl isPlaying={isPlaying} onToggle={togglePlay} />
        </div>
      </main>
    </>
  );
}
