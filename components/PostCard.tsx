
import React, { useState, useRef } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon, SendIcon, BookmarkIcon, PlayIcon, PhoneIcon, EyeIcon, HoneyJarIcon, ProfileFireIcon, CircleCommentIcon, ProfileHoneyJarIcon, ProfilePhoneIcon, ProfileMaskIcon, ProfileEndEyeIcon, ProfileSquirtGunIcon, ProfileCommentIcon, ProfileSendMessageIcon, ProfileLiveCommentsIcon, GhostIcon } from './Icons';
import MaskedEyeModal from './MaskedEyeModal';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  isHatMorphed: boolean;
  hideEnemy?: boolean;
  isPhonePopupOpen?: boolean;
  onPhonePopupToggle?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, isHatMorphed, hideEnemy, isPhonePopupOpen, onPhonePopupToggle }) => {
  const [commentText, setCommentText] = useState('');
  const [isFireMorphed, setIsFireMorphed] = useState(false);
  const [isMaskedEyeModalOpen, setIsMaskedEyeModalOpen] = useState(false);
  const [isBattleOpen, setIsBattleOpen] = useState(false);
  const [isAdverb, setIsAdverb] = useState(false);
  const [isAngryEyesActive, setIsAngryEyesActive] = useState(false);
  const [viewState, setViewState] = useState<'enemy' | 'pencil' | 'hidden'>(hideEnemy ? 'pencil' : 'enemy');
  const prevViewState = useRef<'enemy' | 'pencil'>(hideEnemy ? 'pencil' : 'enemy');
  const pressTimer = useRef<any>(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setViewState(current => {
        if (current === 'hidden') return 'pencil';
        if (current === 'pencil') return 'hidden';
        if (current === 'enemy') return 'pencil';
        return current;
      });
    }, 600);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleShortClick = () => {
    setViewState(current => {
      if (current === 'hidden') return 'enemy';
      return current === 'enemy' ? 'pencil' : 'enemy';
    });
  };

  return (
    <div className="bg-white border-b mb-1 w-full animate-in fade-in duration-500 relative">
      <div className="pl-8 pr-5 py-0 flex items-center gap-1.5 w-full -translate-y-2">
        <img src="/icons/fire_trending.png" className="w-4 h-4 object-contain" alt="Trending Fire" />
        <h2 className="text-sm font-bold text-fuchsia-600">Trending</h2>
        <button className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer transition-colors hover:scale-110 active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <hr className="border-t border-gray-200 w-full mb-0" />

      {/* ── Inline Battle System ── */}
      {isBattleOpen && (
      <div className="px-5 py-4 flex flex-col gap-3 bg-white animate-in slide-in-from-top-2 fade-in duration-300 border-b border-gray-100 shadow-sm relative z-10">
        {/* Headers */}
        <div className="flex flex-col gap-1 w-full">
          {isHatMorphed && (
            <div className="flex justify-between items-end w-full">
              <h2 className="font-bold text-[28px] tracking-tight leading-none text-[#E52B31]">WINNER</h2>
              <h2 className="font-bold text-[28px] tracking-tight leading-none text-[#2C469D]">LOSER</h2>
            </div>
          )}
          <div className="text-[17px] font-bold text-gray-900 leading-none mt-1">
            Preference estimate
          </div>
        </div>

        {/* Avatars, Timer */}
        <div className="flex justify-between items-center w-full mt-3 px-1">
          {/* Left avatar */}
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/freda/200/200" className="w-[54px] h-[54px] rounded-full object-cover shadow-sm border border-gray-100" alt="Freda" />
            {isHatMorphed && <div className="text-[16px] font-bold text-[#E52B31]">52.0%</div>}
          </div>
          {/* Timer */}
          <div className="text-[14px] font-bold text-gray-900">
            0:00:00
          </div>
          {/* Right avatar */}
          <div className="flex items-center gap-3">
            {isHatMorphed && <div className="text-[16px] font-bold text-[#2C469D]">48.0%</div>}
            <img src="https://picsum.photos/seed/heather/200/200" className="w-[54px] h-[54px] rounded-full object-cover shadow-sm border border-gray-100" alt="Heather" />
          </div>
        </div>

        {/* Names */}
        <div className="flex justify-between items-center w-full mt-1.5 px-2">
          <div className="font-bold text-[13.5px] text-gray-900 leading-tight">
            Freda Da. pepper
          </div>
          <div className="font-bold text-[13.5px] text-gray-900 leading-tight">
            Heather Slime
          </div>
        </div>

        {/* Buttons and Counts */}
        <div className="flex items-center justify-between w-full mt-2 pl-2">
          {/* Like Side */}
          <div className="flex items-center gap-3">
            <img src="/icons/btn_red_thumb.png" className="w-[110px] h-auto object-contain shadow-sm cursor-pointer active:scale-95 transition-transform" alt="Winner Vote" />
            {isHatMorphed && (
              <div className="flex flex-col leading-tight ml-1.5">
                <span className="text-[11.5px] font-medium text-gray-900 tracking-tight">234,095</span>
                <span className="text-[11.5px] text-gray-600 tracking-tight">Likes</span>
              </div>
            )}
          </div>
          
          <div className="w-px h-9 mx-2 bg-gray-300"></div>

          {/* Dislike Side */}
          <div className="flex items-center gap-3 justify-end pr-1">
            {isHatMorphed && (
              <div className="flex flex-col leading-tight items-end mr-1.5">
                <span className="text-[11.5px] font-medium text-gray-900 tracking-tight">90,000</span>
                <span className="text-[11.5px] text-gray-600 tracking-tight">Dislikes</span>
              </div>
            )}
            {/* Kept blue button slightly wider (125px compared to 110px) as requested */}
            <img src="/icons/btn_blue_thumb.png" className="w-[125px] h-auto object-contain shadow-sm cursor-pointer active:scale-95 transition-transform" alt="Loser Vote" />
          </div>
        </div>

        {/* Red/Blue Bar — only in creepy doll (isHatMorphed) mode */}
        {isHatMorphed && (
          <div className="flex flex-col w-full mt-5 px-1">
            <div className="flex w-full h-[7px] rounded-full overflow-hidden items-center relative">
              <div className="h-full bg-[#E52B31]" style={{ width: '51%' }}></div>
              <div className="h-full bg-[#2C469D]" style={{ width: '49%' }}></div>
              <div className="absolute left-[51%] w-[4px] h-full bg-white -ml-[2px]" />
            </div>
            <div className="flex justify-between items-center w-full mt-1.5">
              <span className="text-[12.5px] font-bold text-[#E52B31]">Red</span>
              <span className="text-[12.5px] font-bold text-[#2C469D]">Blue</span>
            </div>
          </div>
        )}

        {/* Slider */}
        <div className="relative h-6 w-full flex items-end mt-1 mb-2 px-1">
          <div className="w-full absolute bottom-[2px] border-b-[3px] border-[#F0D420]"></div>
          <div className="w-full absolute bottom-[-4px] border-b-[4px] border-[#F0D420]"></div>
          <div 
            className="absolute bottom-[-1px] pointer-events-none"
            style={{ left: `calc(50% - 14px)` }}
          >
            <div 
              className="w-0 h-0"
              style={{
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderBottom: `16px solid #F0D420`
              }}
            />
          </div>
        </div>
      </div>
      )}

      {/* Header */}
      <div className="flex items-center p-3">
        <img
          src={post.userAvatar}
          alt={post.username}
          className="w-8 h-8 rounded-full object-cover border p-[1px] border-gray-200"
        />
        <div className="ml-3 font-semibold text-xs hover:underline cursor-pointer">
          {post.username}
        </div>
        <div 
          className="ml-auto flex items-center gap-1.5 cursor-pointer select-none"
          onMouseDown={viewState !== 'enemy' ? handlePressStart : undefined}
          onMouseUp={viewState !== 'enemy' ? handlePressEnd : undefined}
          onTouchStart={viewState !== 'enemy' ? handlePressStart : undefined}
          onTouchEnd={viewState !== 'enemy' ? handlePressEnd : undefined}
        >
          {viewState === 'pencil' && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling state to 'enemy'
                  setIsAdverb(prev => !prev);
                }}
                className="text-xs font-bold hover:scale-110 active:scale-95 transition-transform cursor-pointer text-purple-600"
              >
                {isAdverb ? 'adverb' : 'verb'}
              </button>
              <img 
                src="/icons/broken_pencil.png?v=1" 
                className="h-16 w-24 object-contain flex-shrink-0 -translate-y-1" 
                alt="Broken Pencil" 
                onClick={() => setViewState('enemy')}
              />
            </>
          )}

          {viewState === 'enemy' && (
            <div className="flex items-center gap-1 text-gray-500">
              <button className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer transition-colors mr-1">
                Add Enemy
              </button>
              <button 
                className="p-0"
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
              >
                <img src="/icons/profile_menu_dots.png" className="h-10 w-auto object-contain" alt="Menu" />
              </button>
            </div>
          )}

          {viewState === 'hidden' && (
            <div 
              className="w-24 h-16 bg-transparent"
              onClick={() => setViewState('enemy')}
            ></div>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="bg-gray-50 aspect-square overflow-hidden">
        <img
          src={post.imageUrl}
          alt="Post content"
          className="w-full h-full object-cover select-none"
          onDoubleClick={() => onLike(post.id)}
        />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between w-full pb-4">
          <div className="flex flex-col w-full flex-1 pr-4 mr-2 gap-2">
            {/* Send Message on top by the right */}
            <div className="flex justify-between items-center w-full pr-4">
              {/* 4 dots for pagination */}
              <div className="flex gap-1.5 items-center pl-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              </div>
              <button className="hover:scale-110 transition-transform translate-x-8">
                <ProfileSendMessageIcon />
              </button>
            </div>
            {/* Horizontal Divider with Fire */}
            <div className="relative flex justify-center items-center w-full my-5">
              <hr className="w-full border-t border-gray-200" />
              <div className="absolute left-1/2 -translate-x-1/2 bg-white px-3 flex items-center gap-1.5">
                <img 
                  src="/icons/fire_divider.png?v=1" 
                  className="h-6 w-6 object-contain -translate-y-1" 
                  alt="Fire Divider" 
                />
                <span className="text-sm font-bold text-orange-600">102</span>
                <span className="text-xs text-gray-400 pl-3 font-medium">3 comment • 89 reposts</span>
              </div>
            </div>
            
            {/* Top Row: 5 Icons */}
            <div className="flex items-center justify-between w-full">
              <button 
                onClick={() => setIsFireMorphed(prev => !prev)}
                className="relative w-12 h-12 hover:scale-110 active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
              >
                <img 
                  src="/icons/fire.png" 
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isFireMorphed ? 'opacity-0' : 'opacity-100'}`} 
                  alt="Fire" 
                />
                <img 
                  src={isHatMorphed ? "/icons/profile_fire_high.png" : "/icons/profile_fire_click.png"} 
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 -translate-y-1.5 ${isFireMorphed ? 'opacity-100' : 'opacity-0'}`} 
                  alt="Morphed Fire" 
                />
              </button>
              <button className="hover:scale-110 transition-transform">
                <ProfileCommentIcon />
              </button>
              <button className="hover:scale-110 transition-transform">
                <ProfileHoneyJarIcon />
              </button>
              <div className="relative flex flex-col items-center justify-center">
                <button 
                  className="hover:scale-110 active:scale-95 transition-transform"
                  onClick={onPhonePopupToggle}
                >
                  <ProfilePhoneIcon />
                </button>
                {/* Phone Rating Popup */}
                {isPhonePopupOpen && (
                  <div 
                    className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[320px] bg-white border border-gray-100 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col gap-2 z-50 animate-scaleUp cursor-default"
                    onClick={(e) => e.stopPropagation()}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    <div className="flex justify-between items-center gap-1">
                      <img src="/icons/phone_rate_up.png" className="w-[140px] h-auto object-contain hover:scale-105 active:scale-95 transition-transform cursor-pointer" alt="Up" />
                      <img src="/icons/phone_rate_down.png" className="w-[140px] h-auto object-contain hover:scale-105 active:scale-95 transition-transform cursor-pointer" alt="Down" />
                    </div>
                    <div className="relative w-full h-[30px] flex items-center mt-1">
                      <img src="/icons/phone_rate_slider.png" className="w-full h-full object-contain" alt="Slider" />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsMaskedEyeModalOpen(true)}
                  className="hover:scale-110 active:scale-95 transition-transform transform-gpu duration-200"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHatMorphed ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}>
                      <ProfileEndEyeIcon />
                    </div>
                    <img 
                      src="/icons/angry_mask_eyes.png" 
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${isHatMorphed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`} 
                      style={{ transform: 'scale(1.8) translateY(2px) translateX(-2px)' }}
                      alt="Angry Eyes" 
                    />
                  </div>
                </button>
                <MaskedEyeModal isOpen={isMaskedEyeModalOpen} onClose={() => setIsMaskedEyeModalOpen(false)} isAdvanced={isHatMorphed} />
              </div>
            </div>
            {/* Bottom Row: 3 Icons spacing aligned under the right items */}
            <div className="flex items-center justify-between w-full pr-2">
              <button className="hover:scale-110 transition-transform -translate-y-3 -translate-x-9">
                <ProfileLiveCommentsIcon />
              </button>
              <div className="flex gap-6 -translate-y-3">
                <button 
                  className="hover:scale-110 active:scale-95 transition-transform -translate-x-8"
                  onClick={() => setIsBattleOpen(prev => !prev)}
                >
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHatMorphed ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}>
                      <ProfileMaskIcon />
                    </div>
                    <img 
                      src="/icons/creepy_doll.png" 
                      className={`absolute inset-0 w-20 h-20 m-auto object-contain transition-all duration-500 ${isHatMorphed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`} 
                      alt="Girl Icon" 
                    />
                  </div>
                </button>
                <button className="hover:scale-110 transition-transform">
                  <ProfileSquirtGunIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 font-bold text-xs">
          {post.likes.toLocaleString()} likes
        </div>

        <div className="mt-1 text-sm leading-tight">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </div>

        {post.comments.length > 0 && (
          <div className="mt-1.5 text-gray-400 text-xs cursor-pointer">
            View all {post.comments.length} comments
          </div>
        )}

        <div className="mt-1.5 text-[9px] text-gray-400 uppercase tracking-tighter">
          {post.timestamp}
        </div>
      </div>

      {/* Quick Comment Input */}
      <div className="flex items-center p-3 border-t border-gray-50">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-xs focus:outline-none bg-transparent"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className={`ml-2 font-semibold text-xs transition-colors ${commentText ? 'text-blue-500' : 'text-blue-200 pointer-events-none'}`}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
