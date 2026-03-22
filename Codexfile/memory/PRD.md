# Fairy (Instagram Clone) - PRD

## Original Problem Statement
Create an Instagram screen where there is home and other elements. User wants all screens: Home feed, Explore/Search, Reels, Profile.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI (port 8001, /api prefix)
- **Database**: MongoDB (motor async driver)

## User Personas
- Social media users familiar with Instagram UI patterns

## Core Requirements
- Home feed with stories rail and post feed
- Explore page with search and image grid
- Reels page with vertical snap-scroll
- Profile page with stats, bio, post grid, tabs (Posts/Saved/Tagged)
- Bottom navigation (Home, Search, Create, Reels, Profile)
- Post interactions: like, comment, share, save
- Custom branding: Slime fist icon + "Fairy" text

## What's Been Implemented (Feb 8, 2026)
- Full backend with 6 users, 6 posts, 6 stories, 12 explore images, 5 comments seeded
- All API endpoints: /api/posts, /api/stories, /api/explore, /api/reels, /api/profile, /api/users
- Like/save toggle endpoints with MongoDB persistence
- Comment creation endpoint
- Home page with story rail (gradient rings) and scrollable feed
- Explore page with search bar and 3-column image grid
- Reels page with vertical snap-scroll and overlay UI
- Profile page with avatar, stats, bio, edit/share buttons, and 3-tab grid
- Top nav with slime fist icon + "Fairy" branding
- Bottom nav with 5 navigation icons
- Custom animations: heart pop, double-tap heart, fade-in-up, shimmer loading

## Prioritized Backlog
- P0: Story viewer overlay (click story to view full-screen)
- P1: Create post flow (image upload + caption)
- P1: Comments modal/drawer on feed posts
- P2: User search functionality on explore page
- P2: Follow/unfollow functionality
- P3: Direct messages section
- P3: Notifications panel
