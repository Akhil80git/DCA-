import React from 'react';
import { 
  Search, 
  Sun, 
  Moon,
  Download,
  GraduationCap
} from 'lucide-react';
import { Language } from '../utils/langHelper';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  currentSemester: 'Sem-I' | 'Sem-II';
  onSemesterChange: (s: 'Sem-I' | 'Sem-II') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenInstallModal?: () => void;
  lang?: Language;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSemester,
  onSemesterChange,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenInstallModal,
  lang = 'hi',
}) => {
  const { isStandalone, isInstallable, install } = usePWAInstall();

  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (onOpenInstallModal) {
      onOpenInstallModal();
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 no-print bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800 shadow-2xs">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-13 gap-2">
          
          {/* Left: DCA Brand Identity */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-teal-500 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs tracking-tighter">DCA</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 tracking-tight leading-none flex items-center gap-1">
                DCA Portal
                <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                  MCU
                </span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight hidden xs:inline">
                {lang === 'hi' ? 'डिप्लोमा इन कंप्यूटर एप्लीकेशन' : 'Diploma in Computer Applications'}
              </span>
            </div>
          </div>

          {/* Center: Semester Switcher (Sem: [1] [2]) */}
          <div className="flex items-center bg-slate-100/80 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 pl-2 pr-1 select-none">
              Sem
            </span>
            <button
              onClick={() => onSemesterChange('Sem-I')}
              className={`w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSemester === 'Sem-I'
                  ? 'bg-indigo-100/90 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200/90 dark:border-indigo-800 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={lang === 'hi' ? "Semester 1 के विषय" : "Semester 1 Subjects"}
            >
              1
            </button>
            <button
              onClick={() => onSemesterChange('Sem-II')}
              className={`w-6.5 h-6.5 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentSemester === 'Sem-II'
                  ? 'bg-indigo-100/90 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200/90 dark:border-indigo-800 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={lang === 'hi' ? "Semester 2 के विषय" : "Semester 2 Subjects"}
            >
              2
            </button>
          </div>

          {/* Right: Install PWA + Search + Theme Toggle */}
          <div className="flex items-center gap-1.5">
            
            {/* Install Button (visible if not standalone) */}
            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer
                  bg-gradient-to-r from-indigo-50 to-teal-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-teal-100
                  dark:from-indigo-950/60 dark:to-teal-950/60 dark:border-indigo-800 dark:text-indigo-300 dark:hover:from-indigo-900 dark:hover:to-teal-900 shadow-2xs"
                title={lang === 'hi' ? "ऐप इंस्टॉल करें (Install DCA PWA App)" : "Install App"}
              >
                <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'ऐप इंस्टॉल करें' : 'Install App'}</span>
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer
                bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100
                dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
              title={lang === 'hi' ? "खोजें (Ctrl+K)" : "Search (Ctrl+K)"}
            >
              <Search className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden md:inline">{lang === 'hi' ? 'खोजें' : 'Search'}</span>
            </button>

            {/* Dark/Light Mode Button */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? (lang === 'hi' ? 'लाइट मोड चालू करें' : 'Switch to Light Mode') : (lang === 'hi' ? 'डार्क मोड चालू करें' : 'Switch to Dark Mode')}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
