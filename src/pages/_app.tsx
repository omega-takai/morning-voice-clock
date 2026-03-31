import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_JP } from 'next/font/google';

const notoSans = Noto_Sans_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${notoSans.variable} font-sans antialiased min-h-screen`}>
      <Component {...pageProps} />
    </div>
  );
}
