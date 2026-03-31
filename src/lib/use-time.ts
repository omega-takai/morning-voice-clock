import { useState, useEffect } from 'react';

/**
 * 現在時刻を返すフック
 */
export function useTime() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // マウント時に初めて時刻をセットする
    const initTime = () => setTime(new Date());
    initTime();

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return time;
}
