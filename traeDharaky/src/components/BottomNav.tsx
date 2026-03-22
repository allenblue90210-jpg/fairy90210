import { Home, Search, Bell, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChallenge } from '../contexts/ChallengeContext';
import { cn } from '../utils';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useChallenge();

  const navItems = [
    { icon: "/icons/home.png", label: t('nav_home'), path: '/' },
    { icon: "/icons/chair.png", label: t('nav_search'), path: '/search' },
    { icon: "/icons/phone_hand.png", label: t('nav_notifications'), path: '/notifications' },
    { icon: "/icons/dog.png", label: 'Dog', path: '/dog' },
    { icon: "/icons/profile.png", label: t('nav_profile'), path: '/profile' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-zinc-100 px-6 py-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center space-y-1 transition-colors relative",
              isActive ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
            )}
          >
            <img 
              src={item.icon}
              alt={item.label}
              className={cn(
                "w-10 h-10 object-contain transition-all duration-300", 
                isActive && "scale-110 brightness-75"
              )}
            />
            {isActive && (
              <span className="absolute -top-2 w-1 h-1 bg-zinc-900 rounded-full animate-in zoom-in" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
