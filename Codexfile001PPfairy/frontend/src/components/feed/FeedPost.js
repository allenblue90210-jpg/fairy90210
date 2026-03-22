import { useState, useRef } from "react";
import {
  Bookmark,
  MoreHorizontal,
  Heart,
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
          className={`w-full aspect-[4/5] object-cover ${imageLoaded ? "img-loaded" : "img-loading"
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
      <div className="px-3 pt-2.5 pb-1">
        {/* Row 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              data-testid={`like-btn-${post.id}`}
              onClick={handleLikeClick}
              className={`press-effect ${heartAnimating ? "heart-pop" : ""} w-[42px] flex justify-center`}
            >
              <img
                src={post.is_liked
                  ? "https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/480tpvit_Screenshot%202026-02-08%20101942.png"
                  : "https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/o69f198i_Screenshot%202026-02-08%20095920.png"}
                alt="Like"
                className={`object-contain transition-transform duration-200 ${post.is_liked ? "h-[42px] w-[42px]" : "h-[34px] w-[34px]"}`}
              />
            </button>
            <button data-testid={`comment-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/4krzdywl_Screenshot%202026-02-08%20095928.png"
                alt="Comment"
                className="h-[34px] w-[34px] object-contain"
              />
            </button>
            <button data-testid={`share-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/nc98ncwg_Screenshot%202026-02-08%20085229.png"
                alt="Honey Jar"
                className="h-[34px] w-[34px] object-contain"
              />
            </button>
            <button data-testid={`phone-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/zqyyv78k_Screenshot%202026-02-08%20095936.png"
                alt="Phone"
                className="h-[42px] w-[42px] object-contain"
              />
            </button>
            <button data-testid={`mask-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
              <img
                src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/ay7ilnsx_Screenshot%202026-02-08%20095942.png"
                alt="Mask Eyes"
                className="h-[42px] w-[42px] object-contain"
              />
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
        {/* Row 2 */}
        <div className="flex items-center gap-8 mt-2">
          <button data-testid={`purple-comment-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
            <img
              src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/ylxds9kw_Screenshot%202026-02-08%20095953.png"
              alt="Purple Comment"
              className="h-[42px] w-auto object-contain"
            />
          </button>
          <div className="w-[42px]" />
          <button data-testid={`girl-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
            <img
              src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/u4lzdigr_Screenshot%202026-02-08%20095959.png"
              alt="Girl"
              className="h-[50px] w-[50px] object-contain"
            />
          </button>
          <div className="w-[42px]" />
          <button data-testid={`gun-btn-${post.id}`} className="press-effect w-[42px] flex justify-center">
            <img
              src="https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/hnss7mtz_Screenshot%202026-02-08%20100003.png"
              alt="Gun"
              className="h-[46px] w-[46px] object-contain"
            />
          </button>
        </div>
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
