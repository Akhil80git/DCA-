import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  WifiOff, 
  Layers, 
  Share2, 
  PlusSquare, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallScreenProps {
  onContinueInBrowser: () => void;
}

export const PWAInstallScreen: React.FC<PWAInstallScreenProps> = ({
  onContinueInBrowser,
}) => {
  const { isInstallable, isIOS, install } = usePWAInstall();
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'manual'>('idle');

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (isInstallable) {
      setInstallStatus('installing');
      const result = await install();
      if (result === 'accepted') {
        // Installed! The appinstalled listener will transition or standalone check
        setInstallStatus('idle');
      } else {
        setInstallStatus('idle');
      }
    } else {
      // Browser didn't provide beforeinstallprompt (e.g. desktop Chrome already promptable via omnibox or Firefox/preview iframe)
      setInstallStatus('manual');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background glowing decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 flex flex-col items-center text-center">
        
        {/* App Logo with animated glow */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-slate-900 rounded-2xl border border-white/20 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
            <img 
              src="/icon.svg" 
              alt="DCA Master Portal" 
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg border border-slate-900">
            PWA
          </div>
        </div>

        {/* Title & Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-3 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>MCU एवं यूनिवर्सिटी परीक्षा गाइड</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          DCA Master Study Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
          डिप्लोमा इन कंप्यूटर एप्लीकेशन (DCA) संपूर्ण 6 पेपर्स, हिंदी मॉडल हल, परीक्षा सारांश और ऑफलाइन तैयारी।
        </p>

        {/* Feature Highlights Card */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% ऑफ़लाइन एक्सेस (Offline PWA)</div>
              <div className="text-[11px] text-slate-400">एक बार इंस्टॉल करने के बाद बिना इंटरनेट कभी भी पढ़ें।</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-800/80 pt-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">सम्पूर्ण 6 पेपर्स (Sem-I & Sem-II)</div>
              <div className="text-[11px] text-slate-400">यूनिट-वार 30 मुख्य प्रश्न, तुलनात्मक तालिकाएं एवं परीक्षा टिप्स।</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-slate-800/80 pt-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">फास्ट नेटिव ऐप अनुभव</div>
              <div className="text-[11px] text-slate-400">होम स्क्रीन से सीधे 1-टैप में ऐप की तरह खुलेगा।</div>
            </div>
          </div>
        </div>

        {/* Primary Centered Install Button (User Requested: 'install button ui mai dikhe bech mai') */}
        <div className="w-full space-y-3">
          <button
            onClick={handleInstallClick}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            <span>ऐप इंस्टॉल करें (Install DCA App)</span>
          </button>

          {/* Secondary fallback/preview button */}
          <button
            onClick={onContinueInBrowser}
            className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>सीधे ब्राउज़र में देखें (Continue in Browser)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Manual Install Instructions Modal/Box if browser didn't fire beforeinstallprompt */}
        {installStatus === 'manual' && (
          <div className="mt-4 w-full p-4 rounded-xl bg-slate-900 border border-indigo-500/40 text-left text-xs space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ब्राउज़र से इंस्टॉल करने का तरीका:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              1. ब्राउज़र के शीर्ष/एड्रेस बार पर मौजूद <strong>इंस्टॉल आइकन (⊕)</strong> या <strong>तीन बिंदु मेनू (⋮)</strong> पर क्लिक करें।<br />
              2. <strong>"Install DCA Master Study Portal"</strong> या <strong>"Add to Home screen"</strong> चुनें।
            </p>
            <div className="pt-1">
              <button
                onClick={onContinueInBrowser}
                className="text-xs font-bold text-teal-400 hover:underline"
              >
                वेबसाइट पर आगे बढ़ें →
              </button>
            </div>
          </div>
        )}

        {/* iOS Safari Guide Modal */}
        {showIOSInstructions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 text-left shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-extrabold text-sm text-white">iPhone / iPad पर इंस्टॉल करें</h3>
                </div>
                <button
                  onClick={() => setShowIOSInstructions(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
                >
                  बंद करें ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    1
                  </div>
                  <div>
                    Safari ब्राउज़र के नीचे स्थित <strong>शेयर (Share) बटन</strong> (<Share2 className="w-3.5 h-3.5 inline text-indigo-400" />) पर टैप करें।
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    2
                  </div>
                  <div>
                    नीचे स्क्रॉल करें और <strong>"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-indigo-400" />) चुनें।
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                    3
                  </div>
                  <div>
                    ऊपर दाएँ कोने में <strong>"Add"</strong> पर टैप करें। DCA ऐप आपकी होम स्क्रीन पर जुड़ जाएगा!
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setShowIOSInstructions(false);
                    onContinueInBrowser();
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                >
                  समझ गया / ब्राउज़र में खोलें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        <p className="text-[11px] text-slate-500 mt-8">
          Diploma in Computer Applications • All 6 Papers Study Material
        </p>
      </div>
    </div>
  );
};
