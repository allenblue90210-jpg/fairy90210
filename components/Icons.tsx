
import React from 'react';

export const HomeIcon = ({ active }: { active?: boolean }) => (
  <img 
    src="/icons/home.png" 
    alt="Home" 
    className="w-10 h-10" 
  />
);

export const ExploreIcon = ({ active }: { active?: boolean }) => (
  <img 
    src="/icons/search.png" 
    alt="Explore" 
    className="w-10 h-10" 
  />
);

export const SearchIcon = () => (
  <img 
    src="/icons/header_search.png" 
    alt="Search" 
    className="h-8 w-auto object-contain" 
  />
);

export const CreateIcon = ({ active }: { active?: boolean }) => (
  <img 
    src="/icons/create.png" 
    alt="Create" 
    className="w-10 h-10" 
  />
);

export const CameraIcon = () => (
  <img 
    src="/icons/camera.png" 
    alt="Camera" 
    className="h-24 w-auto object-contain" 
  />
);

export const PlayIcon = () => (
  <img 
    src="/icons/header_play.png" 
    alt="Play" 
    className="h-14 w-auto object-contain" 
  />
);

export const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg className={`w-6 h-6 ${filled ? 'fill-red-500 stroke-red-500' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const HeaderHeartIcon = () => (
  <img 
    src="/icons/header_heart.png" 
    alt="Heart" 
    className="h-12 w-auto object-contain" 
  />
);

export const CommentIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const SendIcon = () => (
  <img 
    src="/icons/header_search_v2.png" 
    alt="Search" 
    className="h-10 w-auto object-contain" 
  />
);

export const BookmarkIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const ThumbsUpIcon = () => (
  <img 
    src="/icons/header_logo.png" 
    alt="Logo" 
    className="w-16 h-16 object-contain" 
  />
);

export const TwitterIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
  </svg>
);

export const HoneyJarIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 3h10v4H7z" />
    <path d="M5 7c0 0 0 14 2 14h10c2 0 2-14 2-14" />
    <path d="M12 11v4" />
    <path d="M10 13h4" />
  </svg>
);

export const HeaderHoneyJarIcon = () => (
  <img 
    src="/icons/header_honeyjar.png" 
    alt="Honey Jar" 
    className="h-16 w-auto object-contain" 
  />
);

export const HeaderMeltEyeIcon = () => (
  <img 
    src="/icons/header_melt_eye.png" 
    alt="Eye" 
    className="h-16 w-auto object-contain" 
  />
);

export const PencilIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export const PhoneIcon = () => (
  <img 
    src="/icons/header_phone.png" 
    alt="Phone" 
    className="h-12 w-auto object-contain" 
  />
);

export const HeaderEyeIcon = () => (
  <img 
    src="/icons/header_eye.png" 
    alt="Eye" 
    className="h-10 w-auto object-contain" 
  />
);

export const EyeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const DotsHorizontalIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);
export const DogIcon = () => (
  <img 
    src="/icons/dog.png" 
    alt="Dog" 
    className="w-10 h-10 object-contain" 
  />
);

export const GhostIcon = () => (
  <img 
    src="/icons/ghost.png" 
    alt="Ghost" 
    className="w-10 h-10 object-contain" 
  />
);
export const ProfileFireIcon = () => (
  <img 
    src="/icons/fire.png" 
    alt="Fire" 
    className="w-12 h-12 object-contain" 
  />
);
export const CircleCommentIcon = () => (
  <img 
    src="/icons/circle_comment.png" 
    alt="Comment" 
    className="w-10 h-10 object-contain" 
  />
);

export const ProfileHoneyJarIcon = () => (
  <img 
    src="/icons/profile_honey_latest4.png" 
    alt="Honey Jar" 
    className="w-10 h-10 object-contain" 
  />
);

export const ProfilePhoneIcon = () => (
  <img 
    src="/icons/profile_phone_latest_final.png" 
    alt="Phone" 
    className="w-12 h-12 object-contain translate-y-1" 
  />
);

export const ProfileMaskIcon = () => (
  <img 
    src="/icons/profile_new_mask.png" 
    alt="Mask" 
    className="w-24 h-24 object-contain" 
  />
);

export const ProfileEndEyeIcon = () => (
  <img 
    src="/icons/profile_end_eye.png" 
    alt="End Eye" 
    className="w-14 h-14 object-contain" 
  />
);

export const ProfileSquirtGunIcon = () => (
  <img 
    src="/icons/profile_squirt_gun.png" 
    alt="Squirt Gun" 
    className="w-14 h-14 object-contain" 
  />
);

export const ProfileCommentIcon = () => (
  <img 
    src="/icons/profile_comment_latest.png" 
    alt="Profile Comment" 
    className="w-9 h-9 object-contain" 
  />
);

export const ProfileSendMessageIcon = () => (
  <img 
    src="/icons/profile_send_message.png" 
    alt="Send Message" 
    className="h-10 object-contain" 
  />
);

export const ProfileLiveCommentsIcon = () => (
  <img 
    src="/icons/profile_live_comments.png" 
    alt="Live Comments" 
    className="h-12 object-contain" 
  />
);
