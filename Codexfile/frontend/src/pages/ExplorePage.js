import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ExplorePage() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const res = await axios.get(`${API}/explore`);
        setImages(res.data.images || []);
      } catch (e) {
        console.error("Error fetching explore:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchExplore();
  }, []);

  const filteredImages = searchQuery
    ? images.filter((_, i) => i % 2 === 0)
    : images;

  return (
    <div data-testid="explore-page" className="max-w-lg mx-auto">
      {/* Search Bar */}
      <div className="px-4 py-2 sticky top-[70px] z-30 bg-white/95 backdrop-blur-md">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E8E]"
          />
          <Input
            data-testid="explore-search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-[#EFEFEF] border-none rounded-lg text-sm placeholder:text-[#8E8E8E] focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-[#EFEFEF] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0.5" data-testid="explore-grid">
          {filteredImages.map((url, index) => {
            const isLarge = index % 5 === 0;
            return (
              <div
                key={index}
                data-testid={`explore-item-${index}`}
                className={`relative overflow-hidden cursor-pointer group ${
                  isLarge ? "row-span-2 col-span-1" : ""
                }`}
              >
                <img
                  src={url}
                  alt={`Explore ${index}`}
                  className={`w-full ${
                    isLarge ? "h-full" : "aspect-square"
                  } object-cover transition-opacity duration-200 group-hover:opacity-90`}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
