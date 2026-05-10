import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { Thought } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface ThoughtStreamProps {
  thoughts: Thought[];
}

export default function ThoughtStream({ thoughts }: ThoughtStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [thoughts]);

  return (
    <div className="flex flex-col h-full bg-black/40 border-r border-white/10">
      <div className="h-10 px-6 flex items-center justify-between border-b border-white/10 bg-white/5">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Real-time Thought Stream</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 thin-scroll"
      >
        <AnimatePresence initial={false}>
          {thoughts.map((thought) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-1.5 py-0.5 text-[9px] font-bold rounded-sm border",
                  thought.role === 'RESEARCHER' ? "border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5" :
                  thought.role === 'ENGINEER' ? "border-purple-500/40 text-purple-400 bg-purple-500/5" :
                  "border-amber-500/40 text-amber-400 bg-amber-500/5"
                )}>
                  {thought.role}
                </span>
                <span className="text-[9px] font-mono text-white/20 italic">
                  {thought.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <div className="h-px flex-1 bg-white/5 group-hover:bg-white/10 transition-colors" />
              </div>
              
              <div className="pl-2 space-y-3">
                {thought.type === 'code' ? (
                  <pre className="p-4 bg-white/[0.03] border border-white/5 font-mono text-xs rounded overflow-x-auto text-white/80">
                    <code>{thought.content}</code>
                  </pre>
                ) : (
                  <div className="text-sm leading-relaxed text-white/70 prose prose-invert prose-xs max-w-none">
                    <ReactMarkdown>{thought.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {thoughts.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-10">
            <div className="w-12 h-[2px] bg-white mb-2" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Awaiting Input</span>
          </div>
        )}
      </div>
    </div>
  );
}
