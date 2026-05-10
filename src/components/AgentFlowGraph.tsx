import { motion } from 'motion/react';
import { Search, Code, BarChart3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { AgentRole } from '@/src/types';

interface AgentFlowGraphProps {
  activeAgent: AgentRole | null;
}

const agents = [
  { id: 'RESEARCHER' as AgentRole, label: 'Researcher', icon: Search },
  { id: 'ENGINEER' as AgentRole, label: 'Engineer', icon: Code },
  { id: 'ANALYZER' as AgentRole, label: 'Analyzer', icon: BarChart3 },
];

export default function AgentFlowGraph({ activeAgent }: AgentFlowGraphProps) {
  return (
    <div className="p-8 h-full flex items-center justify-center relative">
      <div className="flex items-center gap-24 relative z-10">
        {agents.map((agent, i) => {
          const isActive = activeAgent === agent.id;
          const isNextActive = i < agents.length - 1 && activeAgent === agents[i+1].id;
          const isCurrentActive = i < agents.length - 1 && activeAgent === agent.id;

          return (
            <div key={agent.id} className="relative flex items-center">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{
                    borderColor: isActive ? '#00ffff' : 'rgba(255,255,255,0.1)',
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive ? 'rgba(0,255,255,0.05)' : 'rgba(0,0,0,0)'
                  }}
                  className={cn(
                    "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-shadow",
                    isActive && "shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                  )}
                >
                  <agent.icon 
                    size={32} 
                    className={cn(
                      "transition-colors duration-500",
                      isActive ? "text-neon-cyan" : "text-white/20"
                    )} 
                  />
                </motion.div>
                <div className="flex flex-col items-center">
                  <span className={cn(
                    "text-[10px] uppercase font-bold tracking-[0.2em] transition-colors",
                    isActive ? "text-neon-cyan" : "text-white/20"
                  )}>
                    AGENT_{i+1}
                  </span>
                  <span className={cn(
                    "text-xs font-medium",
                    isActive ? "text-white" : "text-white/40"
                  )}>
                    {agent.label}
                  </span>
                </div>
              </div>

              {i < agents.length - 1 && (
                <div className="absolute left-20 w-24 h-[2px] bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ 
                      x: isCurrentActive ? '100%' : '-100%',
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "linear"
                    }}
                    className="w-full h-full bg-neon-cyan shadow-[0_0_8px_#00ffff]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
