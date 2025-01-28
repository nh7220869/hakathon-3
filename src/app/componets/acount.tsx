'use client'; 

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
export default function Acount() {
  return (
    <div>
      <SignedOut>
        <SignInButton />
        </SignedOut>
      <SignedIn>
        <UserButton />
        
      </SignedIn>
      
    </div>
  );
}