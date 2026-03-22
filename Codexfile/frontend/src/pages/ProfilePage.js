import { useState, useEffect } from "react";
import {
  Settings,
  Grid3x3,
  Bookmark,
  UserSquare2,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/profile`);
        setProfile(res.data);
      } catch (e) {
        console.error("Error fetching profile:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  if (loading) {
    return (
      <div data-testid="profile-page" className="max-w-lg mx-auto p-4 space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#EFEFEF] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-[#EFEFEF] rounded animate-pulse" />
            <div className="h-3 w-48 bg-[#EFEFEF] rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div data-testid="profile-page" className="max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="px-4 pt-2 pb-3">
        {/* Username row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <h1
              data-testid="profile-username"
              className="text-xl font-bold text-[#262626] tracking-tight"
            >
              {profile.username}
            </h1>
            {profile.is_verified && (
              <svg className="w-4 h-4 text-[#0095F6] ml-0.5" viewBox="0 0 40 40" fill="currentColor">
                <path d="M19.998 3.094L14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v6.354h6.234L14.638 40l5.36-3.094L25.358 40l2.972-5.15h6.234v-6.354L40 25.359 36.906 20 40 14.641l-5.436-3.137V5.15h-6.234L25.358 0l-5.36 3.094zm7.415 11.225l2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18z" />
              </svg>
            )}
            <ChevronDown size={16} className="text-[#262626] ml-0.5" />
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="profile-settings" className="press-effect">
              <Settings size={24} strokeWidth={1.5} className="text-[#262626]" />
            </button>
          </div>
        </div>

        {/* Avatar + Stats */}
        <div className="flex items-center gap-6 mb-4">
          <div className="story-ring">
            <div className="bg-white rounded-full p-[2px]">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar_url} alt={profile.username} />
                <AvatarFallback className="text-lg">
                  {profile.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex-1 flex justify-around">
            <div className="flex flex-col items-center" data-testid="profile-posts-count">
              <span className="text-base font-bold text-[#262626]">
                {formatCount(profile.posts_count)}
              </span>
              <span className="text-[13px] text-[#262626]">posts</span>
            </div>
            <div className="flex flex-col items-center" data-testid="profile-followers-count">
              <span className="text-base font-bold text-[#262626]">
                {formatCount(profile.followers_count)}
              </span>
              <span className="text-[13px] text-[#262626]">followers</span>
            </div>
            <div className="flex flex-col items-center" data-testid="profile-following-count">
              <span className="text-base font-bold text-[#262626]">
                {formatCount(profile.following_count)}
              </span>
              <span className="text-[13px] text-[#262626]">following</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-3">
          <p
            data-testid="profile-display-name"
            className="text-sm font-semibold text-[#262626]"
          >
            {profile.display_name}
          </p>
          <p data-testid="profile-bio" className="text-sm text-[#262626] leading-snug mt-0.5">
            {profile.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            data-testid="edit-profile-btn"
            variant="secondary"
            className="flex-1 h-9 text-sm font-semibold bg-[#EFEFEF] hover:bg-[#DBDBDB] text-[#262626] rounded-lg"
          >
            Edit profile
          </Button>
          <Button
            data-testid="share-profile-btn"
            variant="secondary"
            className="flex-1 h-9 text-sm font-semibold bg-[#EFEFEF] hover:bg-[#DBDBDB] text-[#262626] rounded-lg"
          >
            Share profile
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList
          data-testid="profile-tabs"
          className="w-full bg-transparent border-t border-[#DBDBDB] rounded-none h-11 p-0"
        >
          <TabsTrigger
            value="posts"
            data-testid="tab-posts"
            className="flex-1 rounded-none h-full data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#262626] border-b-2 border-transparent"
          >
            <Grid3x3 size={22} strokeWidth={1.5} />
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            data-testid="tab-saved"
            className="flex-1 rounded-none h-full data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#262626] border-b-2 border-transparent"
          >
            <Bookmark size={22} strokeWidth={1.5} />
          </TabsTrigger>
          <TabsTrigger
            value="tagged"
            data-testid="tab-tagged"
            className="flex-1 rounded-none h-full data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#262626] border-b-2 border-transparent"
          >
            <UserSquare2 size={22} strokeWidth={1.5} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          <div className="grid grid-cols-3 gap-0.5" data-testid="profile-posts-grid">
            {(profile.posts || []).map((post) => (
              <div
                key={post.id}
                data-testid={`profile-post-${post.id}`}
                className="aspect-square relative group cursor-pointer"
              >
                <img
                  src={post.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-4 text-white">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <Heart size={16} fill="white" /> {post.likes_count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <div className="grid grid-cols-3 gap-0.5" data-testid="profile-saved-grid">
            {(profile.saved_posts || []).length === 0 ? (
              <div className="col-span-3 py-16 text-center">
                <Bookmark
                  size={40}
                  strokeWidth={1}
                  className="mx-auto mb-3 text-[#262626]"
                />
                <p className="text-sm text-[#8E8E8E]">
                  Save photos and videos that you want to see again.
                </p>
              </div>
            ) : (
              (profile.saved_posts || []).map((post) => (
                <div
                  key={post.id}
                  data-testid={`saved-post-${post.id}`}
                  className="aspect-square relative group cursor-pointer"
                >
                  <img
                    src={post.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="tagged" className="mt-0">
          <div
            className="col-span-3 py-16 text-center"
            data-testid="tagged-empty-state"
          >
            <UserSquare2
              size={40}
              strokeWidth={1}
              className="mx-auto mb-3 text-[#262626]"
            />
            <p className="text-sm text-[#8E8E8E]">
              When people tag you in photos and videos, they'll appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
