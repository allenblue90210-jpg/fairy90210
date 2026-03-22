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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`${API}/posts/${postId}/like`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, is_liked: res.data.is_liked, likes_count: res.data.likes_count }
            : p
        )
      );
    } catch (e) {
      console.error("Error toggling like:", e);
    }
  };

  const handleSave = async (postId) => {
    try {
      const res = await axios.post(`${API}/posts/${postId}/save`);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, is_saved: res.data.is_saved } : p
        )
      );
    } catch (e) {
      console.error("Error toggling save:", e);
    }
  };

  return (
    <div className="min-h-screen bg-white" data-testid="app-container">
      <BrowserRouter>
        <TopNav />
        <main className="pb-[60px] pt-[70px]">
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
