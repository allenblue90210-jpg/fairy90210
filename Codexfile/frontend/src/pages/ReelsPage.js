import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Music } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ReelsPage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedReels, setLikedReels] = useState({});

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get(`${API}/reels`);
        setReels(res.data);
      } catch (e) {
        console.error("Error fetching reels:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  const toggleLike = (reelId) => {
    setLikedReels((prev) => ({
      ...prev,
      [reelId]: !prev[reelId],
    }));
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div data-testid="reels-page" className="h-[calc(100vh-104px)] bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      data-testid="reels-page"
      className="h-[calc(100vh-104px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black"
    >
      {reels.map((reel) => (
        <div
          key={reel.id}
          data-testid={`reel-${reel.id}`}
          className="h-[calc(100vh-104px)] w-full snap-center relative flex items-end"
        >
          {/* Background Image */}
          <img
            src={reel.video_thumbnail}
            alt={reel.caption}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Right actions */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-10">
            <button
              data-testid={`reel-like-${reel.id}`}
              onClick={() => toggleLike(reel.id)}
              className="flex flex-col items-center gap-1 press-effect"
            >
              <Heart
                size={28}
                fill={likedReels[reel.id] ? "#ED4956" : "none"}
                strokeWidth={likedReels[reel.id] ? 0 : 2}
                className={likedReels[reel.id] ? "text-[#ED4956]" : "text-white"}
              />
              <span className="text-white text-xs font-medium">
                {formatCount(reel.likes_count + (likedReels[reel.id] ? 1 : 0))}
              </span>
            </button>
            <button
              data-testid={`reel-comment-${reel.id}`}
              className="flex flex-col items-center gap-1 press-effect"
            >
              <MessageCircle size={28} strokeWidth={2} className="text-white" />
              <span className="text-white text-xs font-medium">
                {formatCount(reel.comments_count)}
              </span>
            </button>
            <button
              data-testid={`reel-share-${reel.id}`}
              className="flex flex-col items-center gap-1 press-effect"
            >
              <Send size={28} strokeWidth={2} className="text-white" />
              <span className="text-white text-xs font-medium">Share</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="relative z-10 px-4 pb-6 pr-16 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8 border-2 border-white">
                <AvatarImage src={reel.user_avatar} alt={reel.username} />
                <AvatarFallback className="bg-gray-700 text-white text-xs">
                  {reel.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span
                data-testid={`reel-username-${reel.id}`}
                className="text-white text-sm font-semibold"
              >
                {reel.username}
              </span>
              <button
                data-testid={`reel-follow-${reel.id}`}
                className="ml-1 px-3 py-1 border border-white/80 rounded-lg text-white text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                Follow
              </button>
            </div>
            <p className="text-white text-sm leading-snug mb-2 line-clamp-2">
              {reel.caption}
            </p>
            <div className="flex items-center gap-2">
              <Music size={12} className="text-white" />
              <span className="text-white text-xs">{reel.music}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
