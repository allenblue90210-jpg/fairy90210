import React, { useEffect, useState, useRef } from 'react';

interface MaskedEyeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdvanced?: boolean;
}

const MaskedEyeModal: React.FC<MaskedEyeModalProps> = ({ isOpen, onClose, isAdvanced = false }) => {
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState<string>('8.9');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showBars, setShowBars] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState<boolean[]>([true, true, true]);
  
  const [ratings, setRatings] = useState({
    accuracy: 5.8,
    positivity: 8.2,
    decency: 2.5,
    efficiency: 9.0
  });

  const getBarColor = (score: number) => {
    if (score < 4) return '#FF3B30'; // Red
    if (score < 7) return '#FFCC00'; // Yellow
    return '#34C759'; // Green
  };

  const toggleCategory = (index: number) => {
    setCheckedCategories(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const scores = Array.from({ length: 91 }, (_, i) => (1.0 + i * 0.1).toFixed(1));
  const activeRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(isAdvanced);
    }
  }, [isOpen, isAdvanced]);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowBars(true), 150);
      return () => clearTimeout(timer);
    } else {
      setShowBars(false);
    }
  }, [isExpanded]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -80, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 80, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const img = new Image();
    img.src = '/icons/thumbs_up_new2.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        if (r < 15 && g < 15 && b < 15) {
          data[i+3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setThumbSrc(canvas.toDataURL('image/png'));
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
    }
  }, [isOpen, selectedScore]);

  const handleSliderMove = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.min(Math.max(0, x / rect.width), 1);
      const score = (1 + percent * 9).toFixed(1);
      setSelectedScore(score);
    }
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleSliderMove(e.touches[0].clientX);
    const onEnd = () => setIsDragging(false);
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <>
      {/* Background shadow overlay (transparent to allow floating look) */}
      <div className="fixed inset-0 z-40 bg-transparent" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
      <div 
        className="absolute top-[calc(100%+12px)] right-[-10px] w-[340px] z-50 bg-white rounded-[16px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.05)] border border-gray-100/80 flex flex-col animate-scaleUp cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Upward triangle arrow with shadow */}
        <div className="absolute -top-3 right-[18px] w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-[#F4F7FB] drop-shadow-[0_-3px_3px_rgba(0,0,0,0.08)] z-10"></div>

        {/* Stats Row with light grey-blue background */}
        <div className="bg-[#F4F7FB] rounded-t-[16px] p-5 pb-5 flex items-center relative z-20">
          <div className="flex flex-col gap-0.5 w-1/2 pr-3">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[22px] leading-none text-gray-900">8.9</span>
              <span className="text-[#FFB800] text-sm leading-none">⭐</span>
              <span className="font-bold text-[13px] text-[#34C759] leading-none mt-0.5">Very good</span>
            </div>
            <div className="text-[12px] font-bold text-gray-900 mt-1">Overall ratings</div>
            <div className="text-[11px] text-gray-400 font-medium tracking-tight">1.3M ratings</div>
          </div>
          
          <div className="w-px h-12 bg-gray-200 mx-2"></div>
          
          <div className="flex flex-col gap-0.5 w-1/2 pl-3">
            <div className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">97%</div>
            <div className="flex items-center gap-1 text-[12px] font-bold text-gray-900 mt-1">
              Completion rates
              <svg className="w-3.5 h-3.5 text-gray-400 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-[11px] text-gray-400 font-medium tracking-tight">400K check-ins</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`p-5 flex flex-col gap-5 bg-white rounded-b-[16px] relative z-20 ${!isExpanded ? 'rounded-t-[16px]' : ''}`}>
          
          {/* Custom Star Icons Row */}
          <div className="flex justify-between px-2">
            <div className="w-12 h-12 flex items-center justify-center relative">
              {isAdvanced ? (
                <img src="/icons/red.png" alt="Red Monster" className="absolute w-full h-full object-contain transform scale-[1.35] transition-transform duration-300" />
              ) : (
                <img src="/icons/star_fail.png" alt="Fail" className="absolute w-full h-full object-contain transform scale-[0.85] transition-transform duration-300" />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center relative">
              {isAdvanced ? (
                <img src="/icons/orange.png?v=4" alt="Orange Monster" className="absolute w-full h-full object-contain transform scale-[1.35] translate-y-[2px] transition-transform duration-300" />
              ) : (
                <img src="/icons/star_poor.png" alt="Poor" className="absolute w-full h-full object-contain transform translate-y-[2px] transition-transform duration-300" />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center relative">
              {isAdvanced ? (
                <img src="/icons/yellow.png" alt="Yellow Monster" className="absolute w-full h-full object-contain transform scale-[1.65] transition-transform duration-300" />
              ) : (
                <img src="/icons/star_fair.png" alt="Fair" className="absolute w-full h-full object-contain transform scale-[0.85] transition-transform duration-300" />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center relative">
              {isAdvanced ? (
                <img src="/icons/blue.png" alt="Blue Monster" className="absolute w-full h-full object-contain transform scale-[1.35] transition-transform duration-300" />
              ) : (
                <img src="/icons/star_good.png" alt="Good" className="absolute w-full h-full object-contain transition-transform duration-300" />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center relative">
              {isAdvanced ? (
                <img src="/icons/green.png" alt="Green Monster" className="absolute w-full h-full object-contain transform scale-[1.65] transition-transform duration-300" />
              ) : (
                <img src="/icons/star_very_good.png" alt="Very good" className="absolute w-full h-full object-contain transition-transform duration-300" />
              )}
            </div>
          </div>

          {/* Gradient slider */}
          <div className="relative flex flex-col gap-1 -mt-1">
            <div className="flex items-center w-full gap-2 relative">
              <span className="text-gray-400 text-lg font-medium leading-none w-3 text-center -mt-0.5 select-none cursor-pointer hover:text-gray-600" onClick={() => {
                const s = Math.max(1, parseFloat(selectedScore) - 0.1).toFixed(1);
                setSelectedScore(s);
              }}>−</span>
              <div 
                ref={sliderRef}
                className="relative h-1.5 flex-1 bg-gradient-to-r from-[#FF3B30] via-[#FF9500] via-[#FFCC00] to-[#34C759] rounded-full cursor-pointer"
                onMouseDown={(e) => {
                  handleSliderMove(e.clientX);
                  setIsDragging(true);
                }}
                onTouchStart={(e) => {
                  handleSliderMove(e.touches[0].clientX);
                  setIsDragging(true);
                }}
              >
                {/* Blue Slider Handle */}
                <div 
                  className={`absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-[#007AFF] rounded-full border-[2.5px] border-white shadow-md transition-shadow ${isDragging ? 'shadow-lg scale-110' : ''}`}
                  style={{ left: `calc(${(parseFloat(selectedScore) - 1) / 9 * 100}% - 9px)` }}
                ></div>
              </div>
              <span className="text-gray-400 text-lg font-medium leading-none w-3 text-center -mt-0.5 select-none cursor-pointer hover:text-gray-600" onClick={() => {
                const s = Math.min(10, parseFloat(selectedScore) + 0.1).toFixed(1);
                setSelectedScore(s);
              }}>+</span>
            </div>
            {/* Labels below */}
            <div className="flex justify-between text-[11px] text-gray-400 font-medium px-6 tracking-tight">
              <span>Fail</span>
              <span className="ml-[2px]">Poor</span>
              <span className="ml-[4px]">Fair</span>
              <span className="ml-[6px]">Good</span>
              <span className="text-gray-400 font-medium -mr-2">Very good</span>
            </div>
          </div>

          {/* Text block */}
          {isExpanded && (
            <div className="flex items-start justify-between gap-1 mt-1">
              <div className="flex flex-col gap-0.5">
                <div className="text-[15px] font-bold text-gray-900 tracking-tight">Max out your social reach.</div>
                <div className="text-[15px] text-gray-900 tracking-tight">500X your presence.</div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 tracking-tight">
                  Only on Fairy where Influence gets real.
                  <svg className="w-[14px] h-[14px] text-gray-400 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="w-10 h-10 opacity-90 pr-1 select-none leading-none -mt-1 flex items-center justify-center">
                {thumbSrc ? (
                  <img src={thumbSrc} alt="Thumbs up" className="w-full h-full object-contain" />
                ) : (
                  <img src="/icons/thumbs_up_new2.jpg" alt="Thumbs up" className="w-full h-full object-contain" />
                )}
              </div>
            </div>
          )}

          {/* Manual Input Field */}
          <div className="flex items-center justify-center -mb-2 mt-1">
            <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-gray-50/80 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 mr-1 select-none">Score:</span>
              <input 
                type="number" 
                step="0.1" 
                min="1.0" 
                max="10.0" 
                value={selectedScore} 
                onChange={(e) => setSelectedScore(e.target.value)}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (val === '') return;
                  const num = parseFloat(val);
                  if (!isNaN(num)) {
                     if (num < 1.0) setSelectedScore('1.0');
                     else if (num > 10.0) setSelectedScore('10.0');
                     else setSelectedScore(num.toFixed(1));
                  }
                }}
                className="w-12 bg-transparent text-[13px] font-bold text-gray-900 border-none outline-none text-center"
              />
            </div>
          </div>

          {/* Score Selector - Scrollable Container with Arrows */}
          <div className="relative flex items-center w-full mt-1">
            {/* Left Scroll Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); scrollLeft(); }} 
              className="absolute left-1 z-30 bg-white/90 rounded-full w-6 h-6 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:bg-gray-50 border border-gray-100 text-gray-500 font-bold text-[14px]"
            >
              ‹
            </button>

            {/* Scrollable Numbers Row */}
            <div 
              ref={scrollRef} 
              className="overflow-x-auto whitespace-nowrap overflow-y-hidden flex items-center text-[13px] font-medium text-gray-400 gap-2.5 px-7 py-1 w-full scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {scores.map((s, index) => {
                const isActive = s === parseFloat(selectedScore || '0').toFixed(1);
                if (isActive) {
                  return (
                    <span 
                      key={s} 
                      ref={activeRef} 
                      className="bg-[#34C759] text-white px-3 py-1 rounded-full text-[13px] font-bold shadow-sm flex-shrink-0 cursor-pointer"
                    >
                      {s}
                    </span>
                  );
                } else {
                  return (
                    <React.Fragment key={s}>
                      <span 
                        className="flex-shrink-0 cursor-pointer hover:text-gray-600 px-1" 
                        onClick={() => setSelectedScore(s)}
                      >
                        {s}
                      </span>
                      {index < scores.length - 1 && <span className="text-gray-300 font-bold select-none">·</span>}
                    </React.Fragment>
                  );
                }
              })}
            </div>

            {/* Right Scroll Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); scrollRight(); }} 
              className="absolute right-1 z-30 bg-white/90 rounded-full w-6 h-6 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:bg-gray-50 border border-gray-100 text-gray-500 font-bold text-[14px]"
            >
              ›
            </button>
          </div>

          {/* Advanced Mode: Category Rows + Metrics Grid */}
          {isExpanded && (
            <>
              {/* Three Category Rows */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between bg-gray-50 rounded-[12px] p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img src="/icons/truth_dose.png" alt="Truth Dose" className="w-full h-full object-contain transform scale-[2.4]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-gray-900 leading-tight">Truth Dose</span>
                      <span className="text-[12px] text-gray-500 font-medium tracking-tight">"Real"</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-gray-900">1.2M</span>
                    <button 
                      onClick={() => toggleCategory(0)} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${checkedCategories[0] ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      {checkedCategories[0] && (
                        <svg className="w-3.5 h-3.5 text-white stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-[12px] p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img src="/icons/serving.png" alt="Serving" className="w-full h-full object-contain transform scale-[1.85]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-gray-900 font-bold leading-tight">Serving</span>
                      <span className="text-[12px] text-gray-500 font-medium tracking-tight">"Offer"</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-gray-900">200k</span>
                    <button 
                      onClick={() => toggleCategory(1)} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${checkedCategories[1] ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      {checkedCategories[1] && (
                        <svg className="w-3.5 h-3.5 text-white stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-[12px] p-3 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img src="/icons/antidote.png" alt="Antidote" className="w-full h-full object-contain transform scale-[1.4]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-gray-900 leading-tight">Antidote</span>
                      <span className="text-[12px] text-gray-500 font-medium tracking-tight">"Heal"</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[14px] text-gray-900">1.7M</span>
                    <button 
                      onClick={() => toggleCategory(2)} 
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${checkedCategories[2] ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      {checkedCategories[2] && (
                        <svg className="w-3.5 h-3.5 text-white stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Four Metric Boxes Grid */}
              <div className="grid grid-cols-2 gap-3 mt-2 mb-1">
                {/* Accuracy */}
                <div className="flex flex-col gap-1.5 p-3 rounded-[12px] border border-gray-100 bg-white shadow-sm">
                  <div className="flex justify-between items-end">
                    <span className="text-[12px] font-bold text-gray-500">Accuracy</span>
                    <span className="text-[14px] font-bold text-gray-900 leading-none">{ratings.accuracy.toFixed(1)}<span className="text-[10px] text-gray-400">/10</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
                    <div className="h-full rounded-full relative" style={{ width: showBars ? `${ratings.accuracy * 10}%` : '0%', backgroundColor: getBarColor(ratings.accuracy) }}>
                      {/* Handle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-gray-200 shadow-sm"></div>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="10.0" 
                      step="0.1" 
                      value={ratings.accuracy} 
                      onChange={(e) => setRatings(prev => ({ ...prev, accuracy: parseFloat(e.target.value) }))}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Positivity */}
                <div className="flex flex-col gap-1.5 p-3 rounded-[12px] border border-gray-100 bg-white shadow-sm">
                  <div className="flex justify-between items-end">
                    <span className="text-[12px] font-bold text-gray-500">Positivity</span>
                    <span className="text-[14px] font-bold text-gray-900 leading-none">{ratings.positivity.toFixed(1)}<span className="text-[10px] text-gray-400">/10</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
                    <div className="h-full rounded-full relative" style={{ width: showBars ? `${ratings.positivity * 10}%` : '0%', backgroundColor: getBarColor(ratings.positivity) }}>
                      {/* Handle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-gray-200 shadow-sm"></div>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="10.0" 
                      step="0.1" 
                      value={ratings.positivity} 
                      onChange={(e) => setRatings(prev => ({ ...prev, positivity: parseFloat(e.target.value) }))}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                {/* Decency */}
                <div className="flex flex-col gap-1.5 p-3 rounded-[12px] border border-gray-100 bg-white shadow-sm">
                  <div className="flex justify-between items-end">
                    <span className="text-[12px] font-bold text-gray-500">Decency</span>
                    <span className="text-[14px] font-bold text-gray-900 leading-none">{ratings.decency.toFixed(1)}<span className="text-[10px] text-gray-400">/10</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
                    <div className="h-full rounded-full relative" style={{ width: showBars ? `${ratings.decency * 10}%` : '0%', backgroundColor: getBarColor(ratings.decency) }}>
                      {/* Handle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-gray-200 shadow-sm"></div>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="10.0" 
                      step="0.1" 
                      value={ratings.decency} 
                      onChange={(e) => setRatings(prev => ({ ...prev, decency: parseFloat(e.target.value) }))}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>

                {/* Efficiency */}
                <div className="flex flex-col gap-1.5 p-3 rounded-[12px] border border-gray-100 bg-white shadow-sm">
                  <div className="flex justify-between items-end">
                    <span className="text-[12px] font-bold text-gray-500">Efficiency</span>
                    <span className="text-[14px] font-bold text-gray-900 leading-none">{ratings.efficiency.toFixed(1)}<span className="text-[10px] text-gray-400">/10</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full relative">
                    <div className="h-full rounded-full relative" style={{ width: showBars ? `${ratings.efficiency * 10}%` : '0%', backgroundColor: getBarColor(ratings.efficiency) }}>
                      {/* Handle */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-gray-200 shadow-sm"></div>
                    </div>
                    <input 
                      type="range" 
                      min="1.0" 
                      max="10.0" 
                      step="0.1" 
                      value={ratings.efficiency} 
                      onChange={(e) => setRatings(prev => ({ ...prev, efficiency: parseFloat(e.target.value) }))}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Unlock the Rest Toggle (Only when not expanded) */}
          {!isExpanded && (
            <div 
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-between border border-gray-200 rounded-[12px] p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors mt-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[18px]">🔒</span>
                <span className="font-bold text-[14px] text-gray-900">Unlock the Rest</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end mt-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="bg-[#CC3FCC] hover:bg-[#b538b5] text-white font-bold px-10 py-3 rounded-full text-[15px] shadow-sm transition-colors active:scale-95"
            >
              Submit
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default MaskedEyeModal;
