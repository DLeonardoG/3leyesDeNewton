import Header from "@/components/nav-bar"
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {

     const navItems = [
    { to: '/', label: 'HOME' },
    { to: '/info', label: 'Infografia' },
  ];

    const handleSignIn = () => {
    console.log('Sign In clicked');
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        brandName="GASLUR"
        navItems={navItems}
        signInButtonLabel="SIGN IN"
        onSignInClick={handleSignIn}
      />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;