import React from 'react';
import { Logo } from './Logo';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center space-y-6">
      <Logo />
      <div>
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-dark to-purple-DEFAULT">
          {title}
        </h2>
        <p className="mt-2 text-sm text-purple-DEFAULT/80">
          {subtitle}
        </p>
      </div>
    </div>
  );
};