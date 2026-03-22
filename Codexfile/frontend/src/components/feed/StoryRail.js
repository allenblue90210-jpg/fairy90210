import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function StoryRail({ stories }) {
  if (!stories || stories.length === 0) return null;

  return (
    <div
      data-testid="story-rail"
      className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-black/5"
    >
      {/* Your Story */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="relative">
          <div className="w-[66px] h-[66px] rounded-full bg-[#FAFAFA] border-2 border-dashed border-[#DBDBDB] flex items-center justify-center">
            <Avatar className="w-[58px] h-[58px]">
              <AvatarImage
                src="https://images.unsplash.com/photo-1757700356475-40b0c6c5554e?w=150&h=150&fit=crop"
                alt="Your story"
              />
              <AvatarFallback className="bg-[#FAFAFA] text-[#8E8E8E]">Y</AvatarFallback>
            </Avatar>
          </div>
          <div
            data-testid="add-story-btn"
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#0095F6] rounded-full flex items-center justify-center border-2 border-white"
          >
            <span className="text-white text-xs font-bold leading-none">+</span>
          </div>
        </div>
        <span className="text-[11px] text-[#262626] w-[66px] text-center truncate">
          Your story
        </span>
      </div>

      {/* Other Stories */}
      {stories.map((story, index) => (
        <button
          key={story.id}
          data-testid={`story-${story.username}`}
          className="flex flex-col items-center gap-1 shrink-0 press-effect fade-in-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={story.is_seen ? "story-ring-seen" : "story-ring"}>
            <div className="bg-white rounded-full p-[2px]">
              <Avatar className="w-[58px] h-[58px]">
                <AvatarImage src={story.user_avatar} alt={story.username} />
                <AvatarFallback className="bg-[#FAFAFA] text-[#8E8E8E]">
                  {story.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-[11px] text-[#262626] w-[66px] text-center truncate">
            {story.username}
          </span>
        </button>
      ))}
    </div>
  );
}
