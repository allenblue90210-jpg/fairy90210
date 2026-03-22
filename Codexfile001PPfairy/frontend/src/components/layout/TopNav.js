import { useState } from "react";

export default function TopNav() {
  const [monsterToggled, setMonsterToggled] = useState(false);

  return (
    <header
      data-testid="top-nav"
      className="fixed top-0 left-0 right-0 z-40 h-[90px] bg-white/95 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-3"
    >
      <div className="flex items-center gap-[6px] overflow-x-auto scrollbar-hide">
        <img
          data-testid="slime-icon"
          src="/slime-icon.png"
          alt="Fairy"
          className="h-[75px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="app-logo-text"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/exlmg688_Screenshot%202026-02-08%20082959.png"
          alt="Fairy"
          className="h-[48px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="juice-box-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/ujyt2zk0_Screenshot%202026-02-08%20083628.png"
          alt="Juice box"
          className="h-[51px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="circle-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/2n213ykj_Screenshot%202026-02-08%20083845.png"
          alt="Circle"
          className="h-[42px] w-[42px] object-contain flex-shrink-0"
        />
        <button onClick={() => setMonsterToggled(!monsterToggled)} className="flex-shrink-0 p-0 border-0 bg-transparent cursor-pointer">
          <img
            data-testid="monster-icon"
            src={monsterToggled
              ? "https://customer-assets.emergentagent.com/job_codexfile-clone/artifacts/1qnm9gi3_Screenshot%202026-02-08%20102041.png"
              : "https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/qvkzdv3o_Screenshot%202026-02-08%20084135.png"}
            alt="Monster"
            className="h-[42px] w-auto object-contain transition-transform duration-200"
          />
        </button>
        <img
          data-testid="arrow-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/9jrsskwu_Screenshot%202026-02-08%20084419.png"
          alt="Arrow"
          className="h-[42px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="search-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/29dwrpqn_Screenshot%202026-02-08%20084734.png"
          alt="Search"
          className="h-[39px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="pencil-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/i3vee754_Screenshot%202026-02-08%20085000.png"
          alt="Pencil"
          className="h-[36px] w-auto object-contain flex-shrink-0"
        />
        <img
          data-testid="pot-icon"
          src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/j8ypkpxi_Screenshot%202026-02-08%20085229.png"
          alt="Pot"
          className="h-[39px] w-auto object-contain flex-shrink-0"
        />
        <a href="/bird" data-testid="bird-icon-link" className="flex-shrink-0">
          <img
            data-testid="bird-icon"
            src="https://customer-assets.emergentagent.com/job_feed-preview-1/artifacts/qbk9a2xz_Screenshot%202026-02-08%20085444.png"
            alt="Bird"
            className="h-[42px] w-auto object-contain"
          />
        </a>
      </div>
    </header>
  );
}
