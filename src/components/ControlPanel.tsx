import { Play, Shield, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { SandboxStatus } from '@/src/types';

interface ControlPanelProps {
  status: SandboxStatus;
  onRun: (task: string) => void;
}

export default function ControlPanel({ status, onRun }: ControlPanelProps) {
  return (
    <div className="p-8 border-b border-white/10 flex items-end gap-8 bg-black">
      <div className="flex-1 space-y-4">
        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
          <Terminal size={12} /> Input Research Objective
        </label>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Initialize hypothesis exploration..."
            className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-medium focus:outline-none focus:border-neon-cyan transition-all placeholder:text-white/10"
            onKeyDown={(e) => {
              if (e.key === 'Enter') onRun(e.currentTarget.value);
            }}
          />
          <button 
            className="absolute right-0 bottom-4 text-white/20 hover:text-neon-cyan transition-colors"
            onClick={() => {/* Trigger run */}}
          >
            <Play size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-l border-white/10 pl-8 w-64 grow-0 shrink-0">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block">Sandbox Engine</span>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              status.isRunning ? "bg-neon-cyan animate-pulse shadow-[0_0_8px_#00ffff]" : "bg-red-500"
            )} />
            <span className="text-sm font-mono tracking-tight uppercase">
              {status.isRunning ? "Docker: Active" : "Docker: Offline"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 py-2 px-3 border border-white/5 bg-white/5 rounded-sm">
          <Shield size={14} className="text-neon-cyan" />
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 leading-none">Security Mask</span>
            <span className="text-[10px] font-mono">ENCLAVE_READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
