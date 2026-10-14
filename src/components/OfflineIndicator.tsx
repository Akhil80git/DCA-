import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-14 left-3 right-3 sm:left-auto sm:right-6 sm:w-auto z-50 flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-amber-500/50 px-3.5 py-2 text-xs font-bold text-amber-300 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-200">
      <WifiOff className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
      <span>ऑफलाइन मोड सक्रिय (Offline Mode Active) — पूर्ण DCA अध्ययन सामग्री उपलब्ध है</span>
    </div>
  );
};
