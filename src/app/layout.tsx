import './globals.css';
import "@/styles/index.scss";
import type { Metadata } from 'next';
import { Poppins } from "next/font/google";
import { Inter } from 'next/font/google';
import 'sweetalert2/src/sweetalert2.scss';
import WrapperClass from './wrapper';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agoracom: Small Cap Investment - Home',
  icons: {
    icon: '/icon.png'
  }
}

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <Script
        id="qmod"
        type="application/javascript"
        src="https://qmod.quotemedia.com/js/qmodLoader.js"
        data-qmod-wmid="92583"
      />
      <body className="">
        <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
          <WrapperClass>
            {children}
          </WrapperClass>
        </div>
      </body>
    </html>
  )
}
