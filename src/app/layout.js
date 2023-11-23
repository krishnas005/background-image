'use client';

import { Inter } from 'next/font/google'
import './globals.css';
import { AuthContextProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'BGSTYLE',
//   description: 'Made by @krishnas05',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
      {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
