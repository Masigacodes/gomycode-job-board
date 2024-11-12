'use client';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar-2';
import { FloatingNav } from './Floating-navbar';

export function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the client flag once component mounts on client side
    setIsClient(true);
  }, []);

  return (
    <>
      <Navbar />
      {/* {isClient && <FloatingNav navItems={[]} />} */}
    </>
  );
}
