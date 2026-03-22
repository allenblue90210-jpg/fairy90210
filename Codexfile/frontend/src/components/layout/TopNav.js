import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <header
      data-testid="top-nav"
      className="fixed top-0 left-0 right-0 z-40 h-[70px] bg-white/95 backdrop-blur-md border-b border-black/5 flex items-center justify-center px-3"
    >
      {/* Logo Group (Far Left) */}
      <div className="absolute left-[140px] flex items-center gap-[8px]">
        <img
          data-testid="slime-icon"
          src="/slime-icon.png"
          alt="RipIt"
          className="h-[56px] w-auto object-contain flex-shrink-0"
        />
        <span className="text-xl font-bold text-black tracking-tight">RipIt</span>
        <img
          data-testid="chair-icon"
          src="/chair-icon.png"
          alt="Chair"
          className="h-[30px] w-auto object-contain flex-shrink-0 ml-[-4px]"
        />
      </div>

      {/* Interactive Icons (Centered) */}
      <div className="flex items-center gap-[12px] overflow-x-auto scrollbar-hide ml-auto sm:ml-0">
        <Link to="#" data-testid="circle-icon-link" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            data-testid="circle-icon"
            src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/2n213ykj_Screenshot%202026-02-08%20083845.png"
            alt="Circle"
            className="h-[34px] w-[34px] object-contain"
          />
        </Link>
        <Link to="#" data-testid="arrow-icon-link" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            data-testid="arrow-icon"
            src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/9jrsskwu_Screenshot%202026-02-08%20084419.png"
            alt="Arrow"
            className="h-[34px] w-auto object-contain"
          />
        </Link>
        <Link to="#" data-testid="search-icon-link" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            data-testid="search-icon"
            src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/29dwrpqn_Screenshot%202026-02-08%20084734.png"
            alt="Search"
            className="h-[32px] w-auto object-contain"
          />
        </Link>
        <Link to="#" data-testid="pencil-icon-link" className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            data-testid="pencil-icon"
            src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/i3vee754_Screenshot%202026-02-08%20085000.png"
            alt="Pencil"
            className="h-[30px] w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
