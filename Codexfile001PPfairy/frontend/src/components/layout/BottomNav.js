import { useLocation, Link } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: "/nav-home.png" },
  { path: "/explore", label: "Search", icon: "/nav-thumbsup.png" },
  { path: "/create", label: "Create", icon: "/nav-ghost.png" },
  { path: "/reels", label: "Reels", icon: "/nav-dog.png" },
  { path: "/profile", label: "Profile", icon: "/nav-profile.png" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 h-[50px] bg-white/95 backdrop-blur-md border-t border-black/5 flex items-center justify-around px-2"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            data-testid={`nav-${item.label.toLowerCase()}`}
            className="flex items-center justify-center w-12 h-12 press-effect"
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`h-[30px] w-[30px] object-contain transition-all duration-200 ${
                isActive ? "opacity-100 scale-110" : "opacity-60"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
