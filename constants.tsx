
import { Post, User } from './types';

export const CURRENT_USER: User = {
  id: 'user_1',
  username: 'ai_visionary',
  fullName: 'Gemini Creator',
  avatar: 'https://picsum.photos/seed/ai_visionary/150/150',
  bio: 'Exploring the frontiers of AI-generated art. ✨',
  followersCount: 1240,
  followingCount: 450,
  postsCount: 12
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    userId: 'user_2',
    username: 'cosmic_explorer',
    userAvatar: 'https://picsum.photos/seed/cosmic/150/150',
    imageUrl: 'https://picsum.photos/seed/galaxy/800/1000',
    caption: 'Lost in the nebula. The colors of the universe are truly infinite. #space #aiart',
    likes: 1242,
    isLiked: false,
    timestamp: '2h ago',
    comments: [
      { id: 'c1', username: 'stargazer', text: 'This is breathtaking!', timestamp: '1h ago' }
    ]
  },
  {
    id: 'post_2',
    userId: 'user_3',
    username: 'nature_lover',
    userAvatar: 'https://picsum.photos/seed/nature/150/150',
    imageUrl: 'https://picsum.photos/seed/forest/800/1000',
    caption: 'Serenity found in the deep woods. Breathing in the fresh morning air.',
    likes: 850,
    isLiked: true,
    timestamp: '5h ago',
    comments: []
  },
  {
    id: 'post_3',
    userId: 'user_4',
    username: 'cyber_punk_88',
    userAvatar: 'https://picsum.photos/seed/cyber/150/150',
    imageUrl: 'https://picsum.photos/seed/neon/800/1000',
    caption: 'Neon dreams in the heart of the city. Tomorrow is already here. 🌃',
    likes: 2105,
    isLiked: false,
    timestamp: '12h ago',
    comments: []
  }
];
