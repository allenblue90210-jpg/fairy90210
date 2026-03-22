import React, { useState, useCallback } from 'react';
import { INITIAL_POSTS, CURRENT_USER } from './constants';
import { Post, ViewType } from './types';
import PostCard from './components/PostCard';
import { HomeIcon, ExploreIcon, CreateIcon, HeartIcon, HeaderHeartIcon, SendIcon, CommentIcon, CameraIcon, SearchIcon, PlayIcon, ThumbsUpIcon, PhoneIcon, EyeIcon, HeaderEyeIcon, HoneyJarIcon, HeaderHoneyJarIcon, HeaderMeltEyeIcon, DogIcon, GhostIcon, ProfileFireIcon, CircleCommentIcon, ProfileHoneyJarIcon, ProfilePhoneIcon, ProfileMaskIcon, ProfileEndEyeIcon, ProfileSquirtGunIcon, ProfileCommentIcon, ProfileSendMessageIcon, ProfileLiveCommentsIcon } from './components/Icons';
import { generateImage, editImage } from './services/geminiService';


const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [view, setView] = useState<ViewType>('HOME');
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState('');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [editInstruction, setEditInstruction] = useState('');

  const [subIconsGone, setSubIconsGone] = useState(false);
  const [isHatMorphed, setIsHatMorphed] = useState(false);
  const [activePhonePopupPostId, setActivePhonePopupPostId] = useState<string | null>(null);
  const [activeHomePhonePopupPostId, setActiveHomePhonePopupPostId] = useState<string | null>(null);

  const handleAntigravity = () => {
    setSubIconsGone(prev => !prev);
  };

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const img = await generateImage(prompt);
    if (img) setGeneratedImg(img);
    setLoading(false);
  };

  const handleEdit = async () => {
    if (!generatedImg || !editInstruction.trim()) return;
    setLoading(true);
    const edited = await editImage(generatedImg, editInstruction);
    if (edited) setGeneratedImg(edited);
    setLoading(false);
  };

  const handleShare = () => {
    if (!generatedImg) return;
    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: CURRENT_USER.id,
      username: CURRENT_USER.username,
      userAvatar: CURRENT_USER.avatar,
      imageUrl: generatedImg,
      caption: caption || prompt,
      likes: 0,
      isLiked: false,
      timestamp: 'Just now',
      comments: []
    };
    setPosts([newPost, ...posts]);
    resetCreation();
    setView('HOME');
  };

  const resetCreation = () => {
    setPrompt('');
    setGeneratedImg(null);
    setCaption('');
    setEditInstruction('');
  };

  const renderHome = () => (
    <div className="pb-24 pt-4">
      {activeHomePhonePopupPostId && (
        <div 
          className="fixed inset-0 z-30 bg-black/5" 
          onClick={() => setActiveHomePhonePopupPostId(null)} 
        />
      )}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id} style={{ position: 'relative', zIndex: activeHomePhonePopupPostId === post.id ? 40 : posts.length - index }}>
            <PostCard 
              post={post} 
              onLike={handleLike} 
              isHatMorphed={isHatMorphed} 
              hideEnemy={index === 1} 
              isPhonePopupOpen={activeHomePhonePopupPostId === post.id}
              onPhonePopupToggle={() => setActiveHomePhonePopupPostId(prev => prev === post.id ? null : post.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderExplore = () => (
    <div className="grid grid-cols-3 gap-[2px] pt-1 pb-24">
      {[...posts, ...posts, ...posts].map((post, idx) => (
        <div key={`${post.id}-${idx}`} className="relative group aspect-square overflow-hidden cursor-pointer bg-gray-200">
          <img src={post.imageUrl} className="w-full h-full object-cover group-hover:brightness-75 transition-all" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-xs">
            <div className="flex items-center gap-1"><HeartIcon filled /> {post.likes}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className="px-4 py-8 pb-24 relative">
      {activePhonePopupPostId && (
        <div 
          className="fixed inset-0 z-40 bg-black/5" 
          onClick={() => setActivePhonePopupPostId(null)} 
        />
      )}
      <div className="flex items-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border p-1 shrink-0">
          <img src={CURRENT_USER.avatar} className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="ml-6 flex-1">
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="text-xl font-light">{CURRENT_USER.username}</h2>
            <button className="w-full py-1.5 bg-gray-100 rounded-lg font-semibold text-sm">Edit profile</button>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-center border-y py-3 mb-6">
        <div className="flex-1"><div className="font-bold text-sm">{posts.filter(p => p.userId === CURRENT_USER.id).length}</div><div className="text-gray-400 text-xs">posts</div></div>
        <div className="flex-1"><div className="font-bold text-sm">{CURRENT_USER.followersCount}</div><div className="text-gray-400 text-xs">followers</div></div>
        <div className="flex-1"><div className="font-bold text-sm">{CURRENT_USER.followingCount}</div><div className="text-gray-400 text-xs">following</div></div>
      </div>

      <div className="mb-8 px-1">
        <h1 className="font-semibold text-sm">{CURRENT_USER.fullName}</h1>
        <p className="text-sm text-gray-600">{CURRENT_USER.bio}</p>
      </div>

      <div className="grid grid-cols-3 gap-[2px]">
        {posts.filter(p => p.userId === CURRENT_USER.id).map(post => (
          <div key={post.id} className={`aspect-square bg-gray-100 cursor-pointer relative group ${activePhonePopupPostId === post.id ? 'z-50' : ''}`}>
            <img src={post.imageUrl} className="w-full h-full object-cover" />

            <div className={`absolute inset-0 flex items-center justify-center transition-opacity bg-black/30 ${activePhonePopupPostId === post.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="flex flex-col items-center gap-2 w-full">
                {/* Send Message on top by the right */}
                <div className="flex justify-end w-full pr-0 translate-x-4">
                  <ProfileSendMessageIcon />
                </div>
                {/* Horizontal Divider */}
                <hr className="w-[90%] border-t border-white/30 my-2" />
                
                {/* Top Row: 5 Icons */}
                <div className="flex items-center justify-between w-full">
                  <ProfileFireIcon />
                  <ProfileCommentIcon />
                  <ProfileHoneyJarIcon />
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setActivePhonePopupPostId(activePhonePopupPostId === post.id ? null : post.id); 
                    }}
                    className="hover:scale-110 active:scale-95 transition-transform"
                  >
                    <ProfilePhoneIcon />
                  </button>
                  <ProfileEndEyeIcon />
                </div>
                {/* Bottom Row: 3 Icons horizontally distributed nicely */}
                <div className="flex items-center justify-between w-full px-12">
                  <div className="-translate-y-3 -translate-x-9">
                    <ProfileLiveCommentsIcon />
                  </div>
                  <div className="flex gap-12 -translate-y-3">
                    <div className="-translate-x-8">
                      <ProfileMaskIcon />
                    </div>
                    <ProfileSquirtGunIcon />
                  </div>
                </div>
              </div>
              
              {/* Phone rating Popup */}
              {activePhonePopupPostId === post.id && (
                <div 
                  className="absolute -top-[130px] left-1/2 -translate-x-1/2 w-[320px] bg-white border border-gray-100 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col gap-2 z-50 animate-scaleUp cursor-default"
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
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="p-4 pb-24 flex flex-col">
      <div className="flex-1 flex flex-col gap-6">
        <div className="aspect-square bg-white border rounded-lg flex items-center justify-center relative overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center gap-4 text-center p-6">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-medium text-gray-500">Gemini is thinking...</p>
            </div>
          ) : generatedImg ? (
            <img src={generatedImg} className="w-full h-full object-cover" alt="Generated" />
          ) : (
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <CreateIcon />
              </div>
              <p className="text-sm font-medium text-gray-900">Create with Gemini</p>
              <p className="text-xs text-gray-400 mt-1">AI-powered image generation</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {!generatedImg ? (
            <div className="flex flex-col gap-3">
              <textarea
                className="w-full border rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white"
                rows={3}
                placeholder="Describe your vision..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full bg-blue-500 text-white rounded-xl py-3 font-bold disabled:opacity-50 transition-colors"
              >
                Generate Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Refine (e.g. 'add more color')"
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                />
                <button
                  onClick={handleEdit}
                  disabled={loading || !editInstruction.trim()}
                  className="bg-black text-white px-5 py-3 rounded-xl text-sm font-bold disabled:opacity-50"
                >
                  Edit
                </button>
              </div>
              <textarea
                className="w-full border rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white"
                rows={2}
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={() => setGeneratedImg(null)} className="flex-1 bg-white border rounded-xl py-3 font-bold text-sm">Discard</button>
                <button onClick={handleShare} className="flex-[2] bg-blue-500 text-white rounded-xl py-3 font-bold text-sm">Share</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white md:bg-[#fafafa]">
      <header
        className={`sticky top-0 bg-white border-b z-50 pl-4 pr-4 max-w-[500px] mx-auto w-full flex items-start pt-0 justify-between relative overflow-hidden transition-all duration-200 ease-in-out ${
          subIconsGone ? 'h-24' : 'h-44'
        }`}
      >
        {/* Separator line — visible by default, disappears when icons fly away */}
        <hr className={`absolute left-4 right-4 border-t border-gray-200 transition-all duration-500 top-[80px] ${subIconsGone ? 'opacity-0' : 'opacity-100'}`} />
        
        <div className="flex items-center gap-1 shrink-0 h-24 z-10">
          <button 
            onClick={handleAntigravity} 
            className="cursor-pointer"
          >
            <ThumbsUpIcon />
          </button>
          <img 
            src="/icons/brand_text.png" 
            alt="Fairy" 
            className="h-16 cursor-pointer select-none -ml-2" 
            onClick={() => setView('HOME')}
          />
        </div>

        <div className="flex items-center gap-5 h-24 z-10">
          <button className="hover:scale-110 active:scale-95 transition-transform"><CameraIcon /></button>
          <button className="hover:scale-110 active:scale-95 transition-transform"><SearchIcon /></button>

          <div className="relative flex flex-col items-center justify-center h-14">
            <button
              onClick={() => setIsHatMorphed(prev => !prev)}
              className="relative w-12 h-12 hover:scale-110 active:scale-95 transition-transform cursor-pointer flex items-center justify-center"
            >
              <img 
                src="/icons/header_play.png" 
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHatMorphed ? 'opacity-0' : 'opacity-100'}`} 
                alt="Play"
              />
              <img 
                src="/icons/hat_morphed.png" 
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 -translate-y-1 ${isHatMorphed ? 'opacity-100' : 'opacity-0'}`} 
                alt="Morphed Hat"
              />
            </button>
            {!subIconsGone && (
              <div className="absolute top-[calc(100%+12px)]">
                <button className="hover:scale-110 active:scale-95 transition-transform"><PhoneIcon /></button>
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-center justify-center h-14">
            <button className="hover:scale-110 active:scale-95 transition-transform"><HeaderHeartIcon /></button>
            {!subIconsGone && (
              <div className="absolute top-[calc(100%+12px)]">
                <button className="hover:scale-110 active:scale-95 transition-transform"><HeaderEyeIcon /></button>
              </div>
            )}
          </div>

          <div className="relative flex flex-col items-center justify-center h-14">
            <button className="hover:scale-110 active:scale-95 transition-transform"><SendIcon /></button>
            {!subIconsGone && (
              <div className="absolute top-[calc(100%+12px)]">
                <button className="hover:scale-110 active:scale-95 transition-transform"><HeaderMeltEyeIcon /></button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[500px] mx-auto min-h-[calc(100vh-140px)] bg-white md:shadow-xl md:border-x overflow-y-auto">
        {view === 'HOME' && renderHome()}
        {view === 'EXPLORE' && renderExplore()}
        {view === 'CREATE' && renderCreate()}
        {view === 'PROFILE' && renderProfile()}
      </main>

      <nav className="fixed bottom-0 left-0 w-full h-14 bg-white border-t flex items-center justify-center z-50">
        <div className="flex items-center justify-around w-full max-w-[500px]">
          <button onClick={() => setView('HOME')} className="p-3 hover:scale-110 active:scale-95 transition-transform"><HomeIcon active={view === 'HOME'} /></button>
          <button onClick={() => setView('EXPLORE')} className="p-3 hover:scale-110 active:scale-95 transition-transform"><ExploreIcon active={view === 'EXPLORE'} /></button>
          <button onClick={() => setView('CREATE')} className="p-3 hover:scale-110 active:scale-95 transition-transform"><CreateIcon active={view === 'CREATE'} /></button>
          <button className="p-3 hover:scale-110 active:scale-95 transition-transform"><DogIcon /></button>
          <button onClick={() => setView('PROFILE')} className="p-3 hover:scale-110 active:scale-95 transition-transform">
            <img 
              src="/icons/profile.png" 
              alt="Profile"
              className="w-10 h-10" 
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
