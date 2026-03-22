import { useState, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FeedPost({ post, onLike, onSave }) {
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!post.is_liked) {
        onLike(post.id);
      }
      setShowDoubleTapHeart(true);
      setTimeout(() => setShowDoubleTapHeart(false), 1000);
    }
    lastTap.current = now;
  };

  const handleLikeClick = () => {
    setHeartAnimating(true);
    onLike(post.id);
    setTimeout(() => setHeartAnimating(false), 400);
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <article data-testid={`feed-post-${post.id}`} className="fade-in-up">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="story-ring">
            <div className="bg-white rounded-full p-[1.5px]">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.user_avatar} alt={post.username} />
                <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              data-testid={`post-username-${post.id}`}
              className="text-[13px] font-semibold text-[#262626] tracking-wide"
            >
              {post.username}
            </span>
            {post.location && (
              <span className="text-[11px] text-[#8E8E8E] leading-tight">
                {post.location}
              </span>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid={`post-more-${post.id}`} className="press-effect p-1">
              <MoreHorizontal size={20} className="text-[#262626]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem data-testid={`post-report-${post.id}`}>Report</DropdownMenuItem>
            <DropdownMenuItem data-testid={`post-unfollow-${post.id}`}>Unfollow</DropdownMenuItem>
            <DropdownMenuItem data-testid={`post-share-link-${post.id}`}>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Image */}
      <div
        className="relative w-full bg-[#FAFAFA] cursor-pointer"
        onClick={handleDoubleTap}
        data-testid={`post-image-${post.id}`}
      >
        {!imageLoaded && <div className="aspect-[4/5] img-skeleton" />}
        <img
          src={post.image_url}
          alt={post.caption}
          className={`w-full aspect-[4/5] object-cover ${
            imageLoaded ? "img-loaded" : "img-loading"
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {showDoubleTapHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart
              size={80}
              fill="white"
              className="text-white double-tap-heart drop-shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
        <div className="flex items-center gap-4">
          <button
            data-testid={`like-btn-${post.id}`}
            onClick={handleLikeClick}
            className="press-effect"
          >
            <Heart
              size={24}
              strokeWidth={post.is_liked ? 0 : 1.5}
              fill={post.is_liked ? "#ED4956" : "none"}
              className={`${
                post.is_liked ? "text-[#ED4956]" : "text-[#262626]"
              } ${heartAnimating ? "heart-pop" : ""} transition-colors duration-200`}
            />
          </button>
          <button data-testid={`comment-btn-${post.id}`} className="press-effect">
            <MessageCircle size={24} strokeWidth={1.5} className="text-[#262626]" />
          </button>
          <button data-testid={`share-btn-${post.id}`} className="press-effect">
            <Send size={24} strokeWidth={1.5} className="text-[#262626]" />
          </button>
        </div>
        <button
          data-testid={`save-btn-${post.id}`}
          onClick={() => onSave(post.id)}
          className="press-effect"
        >
          <Bookmark
            size={24}
            strokeWidth={post.is_saved ? 0 : 1.5}
            fill={post.is_saved ? "#262626" : "none"}
            className="text-[#262626] transition-colors duration-200"
          />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 pb-1">
        <span
          data-testid={`likes-count-${post.id}`}
          className="text-[13px] font-semibold text-[#262626]"
        >
          {formatCount(post.likes_count)} likes
        </span>
      </div>

      {/* Caption */}
      <div className="px-3 pb-1">
        <span className="text-[13px] text-[#262626]">
          <span className="font-semibold mr-1">{post.username}</span>
          {post.caption}
        </span>
      </div>

      {/* View Comments */}
      {post.comments_count > 0 && (
        <button
          data-testid={`view-comments-${post.id}`}
          className="px-3 pb-2"
        >
          <span className="text-[13px] text-[#8E8E8E]">
            View all {post.comments_count} comments
          </span>
        </button>
      )}

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <span className="text-[10px] text-[#8E8E8E] uppercase tracking-wider">
          2 hours ago
        </span>
      </div>
    </article>
  );
}
