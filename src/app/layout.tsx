
import Footer from "./componets/footer";
import NavBar from "./componets/Navebar";

import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { WishlistProvider } from "./context/page";
import { Metadata } from "next";


const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A Next.js app with Clerk authentication',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          
          <NavBar/>
           <WishlistProvider>{children}</WishlistProvider>   
       <Footer/>
       
          </body>
      </html>
    </ClerkProvider>
  );
} 