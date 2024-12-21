import React from 'react';
import { Music2 } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Music2 className="h-10 w-10 text-purple-DEFAULT" strokeWidth={2} />
      <span className="text-2xl font-bold text-purple-DEFAULT">Musicify</span>
    </div>
  );
};