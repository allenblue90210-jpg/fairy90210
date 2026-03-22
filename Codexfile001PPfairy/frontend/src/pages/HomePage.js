import StoryRail from "@/components/feed/StoryRail";
import FeedPost from "@/components/feed/FeedPost";

export default function HomePage({ posts, stories, loading, onLike, onSave }) {
  return (
    <div data-testid="home-page" className="max-w-lg mx-auto">
      <StoryRail stories={stories} />

      {loading ? (
        <div className="space-y-6 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-9 h-9 rounded-full bg-[#EFEFEF]" />
                <div className="h-3 w-24 bg-[#EFEFEF] rounded" />
              </div>
              <div className="aspect-[4/5] bg-[#EFEFEF]" />
              <div className="px-3 py-2 space-y-2">
                <div className="h-3 w-16 bg-[#EFEFEF] rounded" />
                <div className="h-3 w-48 bg-[#EFEFEF] rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 stagger-children" data-testid="feed-posts-list">
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={onLike}
              onSave={onSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}
