import { useState } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import AgentFlowGraph from './components/AgentFlowGraph';
import ThoughtStream from './components/ThoughtStream';
import ComparisonView from './components/ComparisonView';
import type { Thought, AgentRole, SandboxStatus, Experiment } from './types';

export default function App() {
  const [activeAgent, setActiveAgent] = useState<AgentRole | null>(null);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [sandboxStatus] = useState<SandboxStatus>({ isRunning: true });
  const [experiments, setExperiments] = useState<{ left: Experiment | null; right: Experiment | null }>({
    left: null,
    right: null
  });

  // Simulation of research process
  const startSimulation = (task: string) => {
    setThoughts([]);
    setActiveAgent('RESEARCHER');
    
    // 1. Researcher Phase
    setTimeout(() => {
      addThought('RESEARCHER', `Hypothesis generated for objective: "${task}". Initiating literature synthesis and historical precedent analysis.`, 'hypothesis');
      
      // 2. Engineer Phase
      setTimeout(() => {
        setActiveAgent('ENGINEER');
        addThought('ENGINEER', '```python\ndef recursive_synthesis(data_nodes):\n    # Simulate Socratian dialogue dialectic\n    return [d.synthesize() for d in data_nodes]\n```', 'code');
        
        // 3. Analyzer Phase
        setTimeout(() => {
          setActiveAgent('ANALYZER');
          addThought('ANALYZER', 'Analysis complete. Emergent patterns detected in dialectic synthesis nodes. Reliability index: 0.94.', 'analysis');
          
          setExperiments({
            left: {
              id: Math.random().toString(36),
              params: { model: 'GPT-4', dialectic_depth: 12, reasoning: 'deductive' },
              result: 'The initial dialectic synthesis suggests a strong correlation between recursive thought patterns and the emergent properties of the proposed Socrates-node architecture.',
              timestamp: new Date()
            },
            right: {
              id: Math.random().toString(36),
              params: { model: 'Gemini-Ultra', dialectic_depth: 24, reasoning: 'abductive' },
              result: 'Abductive reasoning at depth 24 reveals a divergent path where the model prioritizes ethical constraints over raw computational throughput, resulting in a more balanced synthesis.',
              timestamp: new Date()
            }
          });
          
          setActiveAgent(null);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  const addThought = (role: AgentRole, content: string, type: Thought['type']) => {
    setThoughts(prev => [...prev, {
      id: Math.random().toString(36),
      role,
      content,
      type,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-neon-cyan/30">
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <ControlPanel status={sandboxStatus} onRun={startSimulation} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Thoughts + Comparison */}
          <div className="flex-[3] flex flex-col min-w-0">
            <div className="flex-1 flex overflow-hidden">
              <div className="w-[450px] shrink-0 border-r border-white/10">
                <ThoughtStream thoughts={thoughts} />
              </div>
              <div className="flex-1">
                <ComparisonView left={experiments.left} right={experiments.right} />
              </div>
            </div>
            
            {/* Bottom Panel: Agent Flow Graph */}
            <div className="h-72 border-t border-white/10 bg-black/40">
              <div className="h-full relative">
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan neon-border shadow-[0_0_5px_#00ffff]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Active Neural Topology</span>
                </div>
                <AgentFlowGraph activeAgent={activeAgent} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Ultra-minimal Footer Status Bar */}
      <footer className="h-6 px-6 border-t border-white/5 flex items-center justify-between bg-black">
        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Network</span>
            <span className="text-[9px] font-mono text-neon-cyan tracking-tighter shadow-sm">SOCKET_ESTABLISHED</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Latency</span>
            <span className="text-[9px] font-mono text-white/40 tracking-tighter">14ms</span>
          </div>
        </div>
        <div>
          <span className="text-[9px] font-mono text-white/10 tracking-widest uppercase">system.log_level = VERBOSE :: node_id = SOC_042</span>
        </div>
      </footer>
    </div>
  );
}
