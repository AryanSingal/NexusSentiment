import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Activity, Sparkles, Network, Terminal, 
  Zap, Fingerprint, RefreshCcw, MessageSquare, 
  Cpu, Timer, Database, CheckCircle2 
} from 'lucide-react';

// Custom hook for animated counting
const useCounter = (end, duration = 1000, start = 0) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    if (end === null) return;
    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);
  const terminalRef = useRef(null);
  
  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const generateDynamicResults = (text) => {
    const len = text.length;
    const words = text.split(/\s+/).length;
    
    // Pseudo-random but deterministic based on input length
    const baseScore = Math.max(12, Math.min(96, 40 + (len % 55)));
    const label = baseScore > 75 ? 'Positive' : baseScore > 45 ? 'Neutral' : 'Negative';
    
    const possibleEntities = ['Neural Network', 'Optimization', 'LLM', 'React', 'UX Design', 'Data Pipeline', 'API', 'TensorFlow', 'Python', 'Cloud'];
    const shuffledEntities = [...possibleEntities].sort(() => 0.5 - Math.random());
    
    return {
      score: baseScore,
      label: label,
      emotions: [
        { name: 'Joy', value: baseScore > 50 ? baseScore - 10 : 15 },
        { name: 'Analytical', value: Math.min(98, words * 2 + 30) },
        { name: 'Urgency', value: (len * 3) % 100 },
        { name: 'Confidence', value: Math.max(40, 100 - (len % 40)) }
      ],
      entities: shuffledEntities.slice(0, Math.max(2, (len % 4) + 2)),
      telemetry: {
        tokens: words + Math.floor(len * 0.2),
        latency: 240 + (len % 150),
        gpu: 45 + (len % 35)
      }
    };
  };
  
  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setLogs([]);
    
    const sequence = [
      { text: "Initializing Nexus_NLP_v4.2...", type: "info" },
      { text: `Allocating VRAM for sequence length ${inputText.length}...`, type: "system" },
      { text: "Tokenizing input string into sub-word arrays...", type: "process" },
      { text: "Mapping semantic embeddings (dim=1024)...", type: "process" },
      { text: "Propagating through transformer attention layers...", type: "process" },
      { text: "Computing sentiment distributions...", type: "process" },
      { text: "Extracting Named Entity Recognitions (NER)...", type: "process" },
      { text: "Tensors successfully finalized. Returning payload.", type: "success" }
    ];

    let delay = 0;
    sequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { time: new Date().toISOString().substring(11, 23), ...log }]);
      }, delay);
      delay += 300 + Math.random() * 500;
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(generateDynamicResults(inputText));
    }, delay + 200);
  };

  const handleReset = () => {
    setInputText("");
    setResults(null);
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-200 font-sans overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHoiLz48L2c+PC9zdmc+')] opacity-50 z-0"></div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .glass-panel {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-700 rounded-full mix-blend-screen filter blur-[150px] opacity-15 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <Brain className="w-7 h-7 text-indigo-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400 tracking-tight">
                Nexus<span className="font-light">Sentiment</span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm tracking-widest uppercase font-medium mt-1">LLM-Powered Semantic Engine</p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs font-mono bg-black/40 px-4 py-2 rounded-full border border-white/10 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            SYSTEM_ONLINE
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Input - Spans 8 cols */}
          <div className="glass-panel rounded-3xl p-1 md:col-span-8 flex flex-col relative overflow-hidden group transition-all duration-500 hover:border-indigo-500/40 focus-within:border-indigo-500/60 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-30"></div>
            
            <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2 text-slate-200">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Input Data Stream
                </h2>
                {results && (
                  <button onClick={handleReset} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-lg">
                    <RefreshCcw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste paragraph or document here to analyze semantic sentiment, emotional vectors, and extract entities..."
                className="w-full flex-grow min-h-[180px] bg-black/20 border border-transparent rounded-xl p-4 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-slate-200 placeholder-slate-600 text-lg leading-relaxed transition-all"
                spellCheck="false"
              />
              <div className="mt-6 flex justify-between items-center">
                <div className="text-xs text-slate-500 font-mono">
                  {inputText.length} chars | {inputText.split(/\s+/).filter(w => w.length > 0).length} words
                </div>
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="relative px-8 py-3.5 rounded-2xl bg-slate-100 text-black font-semibold overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isAnalyzing ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    {isAnalyzing ? 'Processing Pipeline...' : 'Run Analysis'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Terminal / Live Logs - Spans 4 cols */}
          <div className="glass-panel rounded-3xl p-6 md:col-span-4 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <h2 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2 font-mono uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-slate-300" />
              Runtime Logs
            </h2>
            <div 
              ref={terminalRef}
              className="flex-grow bg-[#02040a]/80 rounded-xl p-4 font-mono text-xs overflow-y-auto border border-white/5 shadow-inner"
            >
              {!isAnalyzing && !results && (
                 <div className="text-slate-600 flex items-center gap-2">
                   <span className="w-2 h-4 bg-slate-600 animate-pulse inline-block"></span>
                   Awaiting sequence input...
                 </div>
              )}
              {logs.map((log, i) => (
                <div key={i} className="mb-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <span className="text-slate-600 mr-2">[{log.time}]</span>
                  <span className={`
                    ${log.type === 'info' ? 'text-blue-400' : ''}
                    ${log.type === 'system' ? 'text-purple-400' : ''}
                    ${log.type === 'process' ? 'text-cyan-200/80' : ''}
                    ${log.type === 'success' ? 'text-emerald-400' : ''}
                  `}>
                    {log.text}
                  </span>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-cyan-400 mt-4">
                  <RefreshCcw className="w-3 h-3 animate-spin" />
                  calculating_tensors...
                </div>
              )}
            </div>
          </div>

          {/* Results Grid - Only visible after analysis */}
          {results && (
            <>
              {/* Sentiment Score */}
              <div className="glass-panel rounded-3xl p-6 md:col-span-4 flex flex-col justify-between relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -top-4 -right-4 p-4 opacity-5 rotate-12">
                  <Activity className="w-40 h-40" />
                </div>
                <h2 className="text-lg font-medium flex items-center gap-2 text-slate-300">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Primary Sentiment
                </h2>
                <div className="mt-8 flex items-end gap-3 relative z-10">
                  <div className="text-7xl font-light text-white tracking-tighter">
                    <AnimatedNumber value={results.score} />
                  </div>
                  <div className="pb-3 text-2xl font-light text-slate-400">%</div>
                  <div className={`pb-3 ml-2 font-medium tracking-wide uppercase 
                    ${results.label === 'Positive' ? 'text-emerald-400' : 
                      results.label === 'Neutral' ? 'text-amber-400' : 'text-rose-400'}`}>
                    {results.label}
                  </div>
                </div>
                
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-6 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out 
                      ${results.label === 'Positive' ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 
                        results.label === 'Neutral' ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 
                        'bg-gradient-to-r from-rose-500 to-pink-400'}`}
                    style={{ width: `${results.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Emotion Breakdown */}
              <div className="glass-panel rounded-3xl p-6 md:col-span-4 flex flex-col animate-in slide-in-from-bottom-6 duration-700">
                <h2 className="text-lg font-medium flex items-center gap-2 mb-6 text-slate-300">
                  <Network className="w-5 h-5 text-purple-400" />
                  Emotional Vectors
                </h2>
                <div className="space-y-4">
                  {results.emotions.map((emotion, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <span className="text-sm text-slate-400 w-24 group-hover:text-slate-200 transition-colors">{emotion.name}</span>
                      <div className="flex-grow h-1.5 mx-4 bg-white/5 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-purple-500 rounded-full opacity-80 relative"
                           style={{ width: `${emotion.value}%`, transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s` }}
                         >
                           <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                         </div>
                      </div>
                      <span className="text-sm font-mono text-slate-300 w-8 text-right">{emotion.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entity Extraction */}
              <div className="glass-panel rounded-3xl p-6 md:col-span-4 flex flex-col animate-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-lg font-medium flex items-center gap-2 mb-5 text-slate-300">
                  <Fingerprint className="w-5 h-5 text-pink-400" />
                  Extracted Entities
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {results.entities.map((entity, i) => (
                    <span 
                      key={i} 
                      className="px-3.5 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-200 text-sm font-medium backdrop-blur-sm shadow-[0_4px_12px_rgba(236,72,153,0.05)] hover:bg-pink-500/20 hover:border-pink-500/40 transition-all cursor-default"
                      style={{ animation: `fadeIn 0.5s ease-out ${i * 0.15}s backwards` }}
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Telemetry Footer - Full Width */}
              <div className="glass-panel rounded-3xl p-5 md:col-span-12 flex flex-col md:flex-row items-center justify-between animate-in slide-in-from-bottom-10 duration-1000 border-t border-white/5">
                <div className="flex items-center gap-8 w-full">
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800/50 rounded-lg"><Cpu className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">GPU Utilization</div>
                      <div className="text-lg font-mono text-slate-200"><AnimatedNumber value={results.telemetry.gpu} />%</div>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-white/10"></div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800/50 rounded-lg"><Timer className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Inference Latency</div>
                      <div className="text-lg font-mono text-slate-200"><AnimatedNumber value={results.telemetry.latency} /> ms</div>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-white/10"></div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800/50 rounded-lg"><Database className="w-5 h-5 text-slate-400" /></div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Tokens Processed</div>
                      <div className="text-lg font-mono text-slate-200"><AnimatedNumber value={results.telemetry.tokens} /></div>
                    </div>
                  </div>
                  
                  <div className="ml-auto flex items-center gap-2 text-emerald-400/80 bg-emerald-400/10 px-4 py-2 rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Model Synced
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}} />
      </div>
    </div>
  );
}

// Helper component for animated numbers
function AnimatedNumber({ value }) {
  const count = useCounter(value, 1500);
  return <span>{count}</span>;
}