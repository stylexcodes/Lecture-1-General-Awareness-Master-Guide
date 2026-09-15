export default function TonicitySVG() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-6 bg-[#0c1322] rounded-xl border border-slate-800 my-4 shadow-inner">
      {/* Hypertonic */}
      <div className="flex flex-col items-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
          <circle cx="60" cy="60" r="50" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
          {/* Shriveled cell */}
          <path d="M40,50 Q45,30 60,35 T80,50 Q85,70 70,80 T40,75 Z" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
          {/* Arrows pointing out */}
          <g stroke="#38bdf8" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)">
            <line x1="75" y1="45" x2="95" y2="30" />
            <line x1="45" y1="75" x2="25" y2="90" />
            <line x1="75" y1="75" x2="95" y2="90" />
            <line x1="45" y1="45" x2="25" y2="30" />
          </g>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>
        </svg>
        <h4 className="font-bold text-slate-100 mt-3 text-sm">Hypertonic</h4>
        <p className="text-xs text-slate-400 text-center mt-0.5">Water leaves cell<br/>(Plasmolysis/Shrinks)</p>
      </div>

      {/* Isotonic */}
      <div className="flex flex-col items-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
          <circle cx="60" cy="60" r="50" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
          {/* Normal cell */}
          <circle cx="60" cy="60" r="25" fill="#f87171" stroke="#fca5a5" strokeWidth="2" />
          {/* Arrows pointing in and out */}
          <g stroke="#38bdf8" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)">
            <line x1="90" y1="45" x2="70" y2="55" />
            <line x1="70" y1="65" x2="90" y2="75" />
            
            <line x1="30" y1="45" x2="50" y2="55" />
            <line x1="50" y1="65" x2="30" y2="75" />
          </g>
        </svg>
        <h4 className="font-bold text-slate-100 mt-3 text-sm">Isotonic</h4>
        <p className="text-xs text-slate-400 text-center mt-0.5">Equal movement<br/>(Normal equilibrium)</p>
      </div>

      {/* Hypotonic */}
      <div className="flex flex-col items-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-lg">
          <circle cx="60" cy="60" r="50" fill="#082f49" stroke="#0284c7" strokeWidth="2" />
          {/* Swollen cell */}
          <circle cx="60" cy="60" r="38" fill="#fda4af" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
          {/* Arrows pointing in */}
          <g stroke="#38bdf8" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)">
            <line x1="95" y1="30" x2="75" y2="45" />
            <line x1="25" y1="90" x2="45" y2="75" />
            <line x1="95" y1="90" x2="75" y2="75" />
            <line x1="25" y1="30" x2="45" y2="45" />
          </g>
        </svg>
        <h4 className="font-bold text-slate-100 mt-3 text-sm">Hypotonic</h4>
        <p className="text-xs text-slate-400 text-center mt-0.5">Water enters cell<br/>(Cytolysis/Bursts)</p>
      </div>
    </div>
  );
}
