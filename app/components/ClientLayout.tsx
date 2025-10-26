"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import LoginPanel from "./LoginPanel";
import WelcomePage from "./WelcomePage";
import NavbarWithLogout from "./NavbarWithLogout";

interface ClientLayoutProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  email: string;
  role: string;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem('biomedis_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('biomedis_user');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
    // Save user to localStorage
    localStorage.setItem('biomedis_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('biomedis_user');
    // Redirect to homepage after logout
    window.location.href = '/';
  };

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E64A19] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in
  if (user) {
    // Show WelcomePage only for root path
    if (pathname === '/') {
      return <WelcomePage user={user} onLogout={handleLogout} />;
    }
    
    // For other pages, show with authenticated navbar
    return (
      <div className="min-h-screen bg-[#FAF6EF]">
        <NavbarWithLogout userName={user.email.split('@')[0]} onLogout={handleLogout} />
        {children}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Main content with slide animation */}
      <motion.div
        animate={{ 
          x: showLogin ? "-420px" : "0px"
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          stiffness: 300,
          mass: 0.8
        }}
        className="min-h-screen w-full relative z-10"
        style={{
          boxShadow: showLogin ? "2px 0 10px rgba(0,0,0,0.1)" : "none"
        }}
      >
        <Navbar onLoginClick={handleLoginClick} />
        {children}
      </motion.div>

      {/* Clickable overlay to close (no blur) */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-transparent z-30"
          onClick={handleLoginClose}
        />
      )}

      <LoginPanel isOpen={showLogin} onClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
