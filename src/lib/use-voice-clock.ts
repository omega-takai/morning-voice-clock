import { useState, useEffect, useCallback, useRef } from 'react';

type IntervalOption = 1 | 3 | 5;

interface UseVoiceClockReturn {
  isPlaying: boolean;
  interval: IntervalOption;
  togglePlay: () => void;
  setIntervalValue: (value: IntervalOption) => void;
}

export function useVoiceClock(): UseVoiceClockReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [intervalOption, setIntervalOption] = useState<IntervalOption>(3);
  const lastSpokenMinuteRef = useRef<number | null>(null);

  const speakTime = useCallback((date: Date) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const text = `${hours}時、${minutes}分です。`;

    const utterance = new SpeechSynthesisUtterance(text);
    // 日本語のボイスを優先して選択する処理を入れることも可能
    utterance.lang = 'ja-JP';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
    lastSpokenMinuteRef.current = minutes;
  }, []);

  // IsPlaying 変更時（Playアクション時）の初回発話
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        // 再生開始時、ユーザーインタラクション起因ですぐに発話させる
        speakTime(new Date());
      } else {
        // 停止時は現在キューにある音声をキャンセルする
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        lastSpokenMinuteRef.current = null;
      }
      return next;
    });
  }, [speakTime]);

  const setIntervalValue = useCallback((value: IntervalOption) => {
    setIntervalOption(value);
  }, []);

  // インターバル監視
  useEffect(() => {
    if (!isPlaying) return;

    // 毎秒チェックする
    const timerId = setInterval(() => {
      const now = new Date();
      const currentMinute = now.getMinutes();

      // 秒が 0 (または 0〜1秒の間、ただし今回は1秒ごとのチェックなのでジャスト0秒付近で良き)
      // 厳密には "現在時刻の分が interval の倍数になったら発話"
      // かつ "その分ではまだ発話していない" 場合に発話する
      if (
        currentMinute % intervalOption === 0 &&
        lastSpokenMinuteRef.current !== currentMinute
      ) {
        speakTime(now);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPlaying, intervalOption, speakTime]);

  // コンポーネントアンマウント時にキャンセル処理を入れる
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isPlaying,
    interval: intervalOption,
    togglePlay,
    setIntervalValue,
  };
}
