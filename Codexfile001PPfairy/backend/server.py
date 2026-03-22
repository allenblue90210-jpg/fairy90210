from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    display_name: str
    avatar_url: str
    bio: str = ""
    posts_count: int = 0
    followers_count: int = 0
    following_count: int = 0
    is_verified: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Post(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    username: str
    user_avatar: str
    image_url: str
    caption: str = ""
    likes_count: int = 0
    comments_count: int = 0
    is_liked: bool = False
    is_saved: bool = False
    location: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Story(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    username: str
    user_avatar: str
    image_url: str
    is_seen: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class Comment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    post_id: str
    user_id: str
    username: str
    user_avatar: str
    text: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class CommentCreate(BaseModel):
    text: str
    username: str = "you"
    user_avatar: str = "https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?w=150"

# Seed data
SEED_USERS = [
    {
        "id": "user_1",
        "username": "aria.lens",
        "display_name": "Aria Chen",
        "avatar_url": "https://images.unsplash.com/photo-1757700356475-40b0c6c5554e?w=150&h=150&fit=crop",
        "bio": "Capturing moments through my lens. Travel & lifestyle.",
        "posts_count": 142,
        "followers_count": 12400,
        "following_count": 534,
        "is_verified": True
    },
    {
        "id": "user_2",
        "username": "marco.studio",
        "display_name": "Marco Rossi",
        "avatar_url": "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?w=150&h=150&fit=crop",
        "bio": "Interior design & architecture. Milano based.",
        "posts_count": 89,
        "followers_count": 8700,
        "following_count": 312,
        "is_verified": False
    },
    {
        "id": "user_3",
        "username": "luna.eats",
        "display_name": "Luna Park",
        "avatar_url": "https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=150&h=150&fit=crop",
        "bio": "Food blogger & recipe creator. NYC eats.",
        "posts_count": 256,
        "followers_count": 34500,
        "following_count": 189,
        "is_verified": True
    },
    {
        "id": "user_4",
        "username": "kai.explores",
        "display_name": "Kai Nakamura",
        "avatar_url": "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?w=150&h=150&fit=crop",
        "bio": "Adventure seeker. Mountain lover.",
        "posts_count": 67,
        "followers_count": 5200,
        "following_count": 421,
        "is_verified": False
    },
    {
        "id": "user_5",
        "username": "sophia.vibes",
        "display_name": "Sophia Williams",
        "avatar_url": "https://images.unsplash.com/photo-1713261162282-57dd8043329a?w=150&h=150&fit=crop",
        "bio": "Art & aesthetics. Living my best life.",
        "posts_count": 198,
        "followers_count": 21000,
        "following_count": 276,
        "is_verified": True
    },
    {
        "id": "user_6",
        "username": "dev.james",
        "display_name": "James Rivera",
        "avatar_url": "https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?w=150&h=150&fit=crop",
        "bio": "Tech & coffee enthusiast. SF bay area.",
        "posts_count": 45,
        "followers_count": 3100,
        "following_count": 567,
        "is_verified": False
    }
]

SEED_POSTS = [
    {
        "id": "post_1",
        "user_id": "user_1",
        "username": "aria.lens",
        "user_avatar": "https://images.unsplash.com/photo-1757700356475-40b0c6c5554e?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1713959989861-2425c95e9777?w=800&h=1000&fit=crop",
        "caption": "Lost in the beauty of nature. Every trail tells a story.",
        "likes_count": 1243,
        "comments_count": 48,
        "location": "Swiss Alps"
    },
    {
        "id": "post_2",
        "user_id": "user_2",
        "username": "marco.studio",
        "user_avatar": "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1680210849773-f97a41c6b7ed?w=800&h=1000&fit=crop",
        "caption": "Minimalism is not about having less. It's about making room for more of what matters.",
        "likes_count": 876,
        "comments_count": 32,
        "location": "Milano, Italy"
    },
    {
        "id": "post_3",
        "user_id": "user_3",
        "username": "luna.eats",
        "user_avatar": "https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1766491764801-bc6e409b60e4?w=800&h=1000&fit=crop",
        "caption": "Sunday brunch done right. Recipe link in bio!",
        "likes_count": 2341,
        "comments_count": 156,
        "location": "Brooklyn, NY"
    },
    {
        "id": "post_4",
        "user_id": "user_5",
        "username": "sophia.vibes",
        "user_avatar": "https://images.unsplash.com/photo-1713261162282-57dd8043329a?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1719150006656-958724675d9d?w=800&h=1000&fit=crop",
        "caption": "Design is intelligence made visible.",
        "likes_count": 1567,
        "comments_count": 67,
        "location": "Los Angeles, CA"
    },
    {
        "id": "post_5",
        "user_id": "user_4",
        "username": "kai.explores",
        "user_avatar": "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1748909082924-ec91097de9af?w=800&h=1000&fit=crop",
        "caption": "The world is a book and those who do not travel read only one page.",
        "likes_count": 3456,
        "comments_count": 89,
        "location": "Bali, Indonesia"
    },
    {
        "id": "post_6",
        "user_id": "user_6",
        "username": "dev.james",
        "user_avatar": "https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?w=150&h=150&fit=crop",
        "image_url": "https://images.unsplash.com/photo-1766491765420-2f4f2c4bf49a?w=800&h=1000&fit=crop",
        "caption": "Coffee and code. The perfect afternoon combo.",
        "likes_count": 654,
        "comments_count": 21,
        "location": "San Francisco, CA"
    }
]

SEED_STORIES = [
    {"id": "story_1", "user_id": "user_1", "username": "aria.lens", "user_avatar": "https://images.unsplash.com/photo-1757700356475-40b0c6c5554e?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1713959989861-2425c95e9777?w=600", "is_seen": False},
    {"id": "story_2", "user_id": "user_3", "username": "luna.eats", "user_avatar": "https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1766491764801-bc6e409b60e4?w=600", "is_seen": False},
    {"id": "story_3", "user_id": "user_5", "username": "sophia.vibes", "user_avatar": "https://images.unsplash.com/photo-1713261162282-57dd8043329a?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1719150006656-958724675d9d?w=600", "is_seen": True},
    {"id": "story_4", "user_id": "user_2", "username": "marco.studio", "user_avatar": "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1680210849773-f97a41c6b7ed?w=600", "is_seen": False},
    {"id": "story_5", "user_id": "user_4", "username": "kai.explores", "user_avatar": "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1748909082924-ec91097de9af?w=600", "is_seen": False},
    {"id": "story_6", "user_id": "user_6", "username": "dev.james", "user_avatar": "https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?w=150&h=150&fit=crop", "image_url": "https://images.unsplash.com/photo-1691967057150-f57a7ca63e3e?w=600", "is_seen": True},
]

EXPLORE_IMAGES = [
    "https://images.unsplash.com/photo-1691967057150-f57a7ca63e3e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1546019284-faf0b791e1f6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1691967057214-39b382606ec0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1724333937296-e7a890f99ade?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1758275557473-6e6359ced762?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1713261162282-57dd8043329a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1680210849773-f97a41c6b7ed?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1748909082924-ec91097de9af?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1766491764801-bc6e409b60e4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1719150006656-958724675d9d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1766491765420-2f4f2c4bf49a?w=400&h=400&fit=crop",
]

SEED_COMMENTS = [
    {"id": "comment_1", "post_id": "post_1", "user_id": "user_3", "username": "luna.eats", "user_avatar": "https://images.unsplash.com/photo-1763328719057-ff6b03c816d0?w=150", "text": "Breathtaking view! Adding this to my bucket list."},
    {"id": "comment_2", "post_id": "post_1", "user_id": "user_5", "username": "sophia.vibes", "user_avatar": "https://images.unsplash.com/photo-1713261162282-57dd8043329a?w=150", "text": "Nature never disappoints."},
    {"id": "comment_3", "post_id": "post_2", "user_id": "user_1", "username": "aria.lens", "user_avatar": "https://images.unsplash.com/photo-1757700356475-40b0c6c5554e?w=150", "text": "This space is incredible!"},
    {"id": "comment_4", "post_id": "post_3", "user_id": "user_4", "username": "kai.explores", "user_avatar": "https://images.unsplash.com/photo-1758691737387-a89bb8adf768?w=150", "text": "Looks delicious! Need the recipe ASAP."},
    {"id": "comment_5", "post_id": "post_5", "user_id": "user_2", "username": "marco.studio", "user_avatar": "https://images.unsplash.com/photo-1582657233895-0f37a3f150c0?w=150", "text": "Paradise on earth. Great capture!"},
]

# Seed on startup
@app.on_event("startup")
async def seed_data():
    users_count = await db.users.count_documents({})
    if users_count == 0:
        for u in SEED_USERS:
            user = User(**u)
            await db.users.insert_one(user.model_dump())
        for p in SEED_POSTS:
            post = Post(**p)
            await db.posts.insert_one(post.model_dump())
        for s in SEED_STORIES:
            story = Story(**s)
            await db.stories.insert_one(story.model_dump())
        for c in SEED_COMMENTS:
            comment = Comment(**c)
            await db.comments.insert_one(comment.model_dump())
        # Store explore images
        await db.explore.insert_one({"id": "explore_data", "images": EXPLORE_IMAGES})
        logger.info("Database seeded successfully")

# Routes
@api_router.get("/")
async def root():
    return {"message": "Instagram Clone API"}

@api_router.get("/posts")
async def get_posts():
    posts = await db.posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(50)
    return posts

@api_router.get("/posts/{post_id}")
async def get_post(post_id: str):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@api_router.post("/posts/{post_id}/like")
async def toggle_like(post_id: str):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    new_liked = not post.get("is_liked", False)
    new_count = post["likes_count"] + (1 if new_liked else -1)
    await db.posts.update_one(
        {"id": post_id},
        {"$set": {"is_liked": new_liked, "likes_count": new_count}}
    )
    return {"is_liked": new_liked, "likes_count": new_count}

@api_router.post("/posts/{post_id}/save")
async def toggle_save(post_id: str):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    new_saved = not post.get("is_saved", False)
    await db.posts.update_one({"id": post_id}, {"$set": {"is_saved": new_saved}})
    return {"is_saved": new_saved}

@api_router.get("/posts/{post_id}/comments")
async def get_comments(post_id: str):
    comments = await db.comments.find({"post_id": post_id}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return comments

@api_router.post("/posts/{post_id}/comment")
async def add_comment(post_id: str, body: CommentCreate):
    post = await db.posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    comment = Comment(
        post_id=post_id,
        user_id="current_user",
        username=body.username,
        user_avatar=body.user_avatar,
        text=body.text
    )
    doc = comment.model_dump()
    await db.comments.insert_one(doc)
    await db.posts.update_one({"id": post_id}, {"$inc": {"comments_count": 1}})
    return {k: v for k, v in doc.items() if k != "_id"}

@api_router.get("/stories")
async def get_stories():
    stories = await db.stories.find({}, {"_id": 0}).to_list(20)
    return stories

@api_router.get("/explore")
async def get_explore():
    explore = await db.explore.find_one({"id": "explore_data"}, {"_id": 0})
    if explore:
        return {"images": explore.get("images", [])}
    return {"images": EXPLORE_IMAGES}

@api_router.get("/reels")
async def get_reels():
    posts = await db.posts.find({}, {"_id": 0}).to_list(20)
    reels = []
    for p in posts:
        reels.append({
            "id": f"reel_{p['id']}",
            "user_id": p["user_id"],
            "username": p["username"],
            "user_avatar": p["user_avatar"],
            "video_thumbnail": p["image_url"],
            "caption": p["caption"],
            "likes_count": p["likes_count"],
            "comments_count": p["comments_count"],
            "music": "Original Audio"
        })
    return reels

@api_router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    posts = await db.posts.find({"user_id": user_id}, {"_id": 0}).to_list(50)
    return {**user, "posts": posts}

@api_router.get("/users")
async def get_users():
    users = await db.users.find({}, {"_id": 0}).to_list(50)
    return users

@api_router.get("/profile")
async def get_current_profile():
    user = await db.users.find_one({"id": "user_1"}, {"_id": 0})
    if not user:
        return SEED_USERS[0]
    posts = await db.posts.find({"user_id": "user_1"}, {"_id": 0}).to_list(50)
    saved = await db.posts.find({"is_saved": True}, {"_id": 0}).to_list(50)
    return {**user, "posts": posts, "saved_posts": saved}

@api_router.post("/seed")
async def reseed():
    await db.users.delete_many({})
    await db.posts.delete_many({})
    await db.stories.delete_many({})
    await db.comments.delete_many({})
    await db.explore.delete_many({})
    for u in SEED_USERS:
        user = User(**u)
        await db.users.insert_one(user.model_dump())
    for p in SEED_POSTS:
        post = Post(**p)
        await db.posts.insert_one(post.model_dump())
    for s in SEED_STORIES:
        story = Story(**s)
        await db.stories.insert_one(story.model_dump())
    for c in SEED_COMMENTS:
        comment = Comment(**c)
        await db.comments.insert_one(comment.model_dump())
    await db.explore.insert_one({"id": "explore_data", "images": EXPLORE_IMAGES})
    return {"message": "Data reseeded successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
