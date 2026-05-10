import { Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 px-8 flex items-center justify-between border-b border-white/10 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tighter uppercase">
          R U Socrates <span className="text-[10px] bg-white text-black px-1.5 py-0.5 ml-2 align-middle">DESIGN LAB v1.0.4</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <a 
          href="https://github.com/zbbsdsb/R-U-Socrates" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Github size={18} />
          <span>R-U-SOCRATES</span>
        </a>
      </div>
    </header>
  );
}
