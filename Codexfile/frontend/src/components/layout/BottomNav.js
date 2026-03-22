import { useLocation, Link } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: "/nav-home-v2.png" },
  { path: "/explore", label: "Search", icon: "/nav-chair-v2.png" },
  { path: "/create", label: "Create", icon: "/nav-ghost.png" },
  { path: "/reels", label: "Reels", icon: "/nav-phone-v2.png" },
  { path: "/profile", label: "Profile", icon: "/nav-profile-v2.png" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 h-[65px] bg-white/95 backdrop-blur-md border-t border-gray-200 flex items-center justify-around px-2 pb-1"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            data-testid={`nav-${item.label.toLowerCase()}`}
            className="flex flex-col items-center justify-center w-16 h-14 press-effect"
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`h-[40px] w-[40px] object-contain transition-all duration-200 ${isActive ? "opacity-100 scale-110" : "opacity-60"
                }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
