import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExplorePage";
import ReelsPage from "@/pages/ReelsPage";
import ProfilePage from "@/pages/ProfilePage";

import BirdPage from "@/pages/BirdPage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    // Mocking data for demonstration since backend is down
    const mockStories = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      username: `user_${i}`,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      has_story: true,
      is_seen: i > 2,
    }));

    const mockPosts = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      username: i === 0 ? "fairy_official" : `friend_${i}`,
      user_avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=post${i}`,
      image_url: `https://picsum.photos/seed/post${i}/800/1000`,
      caption: i === 0 ? "Welcome to the Fairy app! ✨ #fairy #magic" : `Captured this beautiful moment today! #${i}`,
      likes_count: 120 + i * 50,
      comments_count: 12 + i,
      is_liked: false,
      is_saved: false,
      created_at: "2 hours ago"
    }));

    setStories(mockStories);
    setPosts(mockPosts);
    setLoading(false);

    // Original fetch logic commented out:
    /*
    try {
      const [postsRes, storiesRes] = await Promise.all([
        axios.get(`${API}/posts`),
        axios.get(`${API}/stories`),
      ]);
      setPosts(postsRes.data);
      setStories(storiesRes.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
    */
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLike = async (postId) => {
    // Mocking like toggling
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  };

  const handleSave = async (postId) => {
    // Mocking save toggling
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, is_saved: !p.is_saved } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-white" data-testid="app-container">
      <BrowserRouter>
        <TopNav />
        <main className="pb-[60px] pt-[100px]">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  posts={posts}
                  stories={stories}
                  loading={loading}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              }
            />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bird" element={<BirdPage />} />
          </Routes>
        </main>
        <BottomNav />
      </BrowserRouter>
    </div>
  );
}

export default App;
