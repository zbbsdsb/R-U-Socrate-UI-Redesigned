import { Split, ChevronRight } from 'lucide-react';
import type { Experiment } from '@/src/types';

interface ComparisonViewProps {
  left: Experiment | null;
  right: Experiment | null;
}

export default function ComparisonView({ left, right }: ComparisonViewProps) {
  return (
    <div className="h-full flex flex-col bg-black">
      <div className="h-10 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Split size={14} className="text-white/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Experimental Comparison</span>
        </div>
        <div className="flex bg-white/5 border border-white/10 rounded-sm">
          <button className="px-3 py-1 text-[9px] font-bold border-r border-white/10 hover:bg-white/5 transition-all text-neon-cyan">SIDE_BY_SIDE</button>
          <button className="px-3 py-1 text-[9px] font-bold text-white/40 hover:text-white transition-all">OVERLAY</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ExperimentPane label="A" experiment={left} />
        <div className="w-px bg-white/10 relative shrink-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border border-white/20 flex items-center justify-center text-[8px] font-bold text-white/20">VS</div>
        </div>
        <ExperimentPane label="B" experiment={right} />
      </div>
    </div>
  );
}

function ExperimentPane({ label, experiment }: { label: string; experiment: Experiment | null }) {
  if (!experiment) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050505] p-12">
        <div className="text-center space-y-4 max-w-xs">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-dashed border-white/10 mb-2">
            <span className="text-white/10 font-bold">{label}</span>
          </div>
          <p className="text-[11px] uppercase tracking-widest text-white/20 font-medium">Pending analysis results for slot {label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto thin-scroll space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-white text-black text-[9px] font-black italic">SLOT_{label}</span>
          <span className="text-xs font-mono text-white/30 tracking-tight">ExpID: {experiment.id.slice(0, 8)}</span>
        </div>
        
        <div className="space-y-2 border-l-2 border-white/5 pl-4">
          <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest block">Parameters</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(experiment.params).map(([key, val]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-white/20 uppercase">{key}</span>
                <span className="text-[10px] font-mono text-white/60">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-[10px] uppercase font-bold text-neon-cyan tracking-widest block flex items-center gap-2 italic">
          <ChevronRight size={12} /> Synthesis Report
        </span>
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-sm text-sm text-white/70 leading-relaxed font-light">
          {experiment.result}
        </div>
      </div>
    </div>
  );
}
