"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import LoginPanel from "./LoginPanel";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

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

      <LoginPanel isOpen={showLogin} onClose={handleLoginClose} />
    </div>
  );
}
