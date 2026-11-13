import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  openDocsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openDocsModal }) => {
  return (
    <footer className="mt-16 border-t border-border bg-card/25 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-6 text-xs text-muted-foreground sm:px-8">
        <div className="flex items-center gap-2.5 font-display text-sm font-semibold text-foreground">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-primary to-brand flex items-center justify-center p-0.5">
            <div className="h-full w-full rounded-full bg-card flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">D</span>
            </div>
          </div>
          <span>DiumPad</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Built on Raydium LaunchLab</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:ml-auto text-[11px]">
          <button onClick={openDocsModal} className="hover:text-foreground transition-colors">
            Docs
          </button>
          <button onClick={openDocsModal} className="hover:text-foreground transition-colors">
            FAQ
          </button>
          <a
            href="https://raydium.io/launchpad/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            Raydium Protocol
          </a>
          <span className="text-muted-foreground/50">© 2026 DiumPad</span>
        </div>
      </div>
    </footer>
  );
};
