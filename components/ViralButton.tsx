'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ViralButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function ViralButton({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ViralButtonProps) {
  const baseStyles = "font-bold rounded-xl py-3 px-6 transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20",
    secondary: "bg-gradient-to-r from-pink-500 to-orange-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/20",
    outline: "glass-button text-white hover:bg-white/10",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
