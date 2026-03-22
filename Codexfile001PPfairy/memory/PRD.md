# Fairy (Instagram Clone) - PRD

## Original Problem Statement
Clone the repository https://github.com/allenblue90210-jpg/Codexfile001PPfairy and get it running.

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
- Profile page with stats, bio, post grid, tabs
- Bottom navigation (Home, Search, Create, Reels, Profile)
- Post interactions: like, comment, share, save
- Custom branding: Slime fist icon + "Fairy" text

## What's Been Implemented (Feb 8, 2026)
- Cloned full repo and set up in Emergent workspace
- Backend seeded with 6 users, 6 posts, 6 stories, 12 explore images, 5 comments
- All API endpoints working: posts, stories, explore, reels, profile, users, like/save/comment
- Frontend pages: Home, Explore, Reels, Profile, Bird
- Top nav icons resized to 2x (user request)

## Prioritized Backlog
- P0: Fix Profile page Heart import error
- P0: Fix Home page post display integration issue
- P1: Story viewer overlay
- P1: Create post flow
- P2: Comments modal/drawer
- P2: User search on explore
- P3: DMs, Notifications
