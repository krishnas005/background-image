'use client';

import { AuthContextProvider } from '../context/AuthContext';
import './globals.css';


// export const metadata = {
//   title: 'BGSTYLE',
//   description: 'Made by @krishnas05',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
      {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
