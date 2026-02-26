import React, { useState, useEffect } from 'react';
import { Search, Scale, ChevronDown, Loader, CheckCircle, AlertTriangle, BookOpen, Gavel, FileText } from 'lucide-react';
import JustificationModal from './JustificationModal';

const API_URL = 'http://localhost:5000';

const LawSearch = () => {
  const [allRules, setAllRules] = useState([]);
  const [ipcCodes, setIpcCodes] = useState([]);
  const [bnsCodes, setBnsCodes] = useState([]);
  const [selectedIpc, setSelectedIpc] = useState('');
  const [selectedBns, setSelectedBns] = useState('');
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [justificationData, setJustificationData] = useState(null);
  const [isLoadingRules, setIsLoadingRules] = useState(true);
  const [isLoadingJustification, setIsLoadingJustification] = useState(false);
  const [error, setError] = useState(null);
  const [justificationModalLaw, setJustificationModalLaw] = useState(null);

  // Fetch all rules on mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rules`);
        if (!res.ok) throw new Error('Failed to fetch rules');
        const data = await res.json();
        const rules = data.rules || [];
        setAllRules(rules);
        setIpcCodes(rules.map(r => r.IPC).sort());
        setBnsCodes(rules.map(r => r.BNS).sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingRules(false);
      }
    };
    fetchRules();
  }, []);

  // When IPC is selected, auto-link BNS
  const handleIpcChange = (ipc) => {
    setSelectedIpc(ipc);
    setSelectedBns('');
    setSelectedLaw(null);
    setJustificationData(null);
    if (ipc) {
      const rule = allRules.find(r => r.IPC === ipc);
      if (rule) {
        setSelectedBns(rule.BNS);
        setSelectedLaw(rule);
      }
    }
  };

  // When BNS is selected, auto-link IPC
  const handleBnsChange = (bns) => {
    setSelectedBns(bns);
    setSelectedIpc('');
    setSelectedLaw(null);
    setJustificationData(null);
    if (bns) {
      const rule = allRules.find(r => r.BNS === bns);
      if (rule) {
        setSelectedIpc(rule.IPC);
        setSelectedLaw(rule);
      }
    }
  };

  const handleGetJustification = async () => {
    if (!selectedLaw) return;
    setIsLoadingJustification(true);
    setJustificationData(null);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/justification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ipc: selectedLaw.IPC }),
      });
      if (!res.ok) throw new Error('Failed to fetch justification');
      const data = await res.json();
      setJustificationData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingJustification(false);
    }
  };

  const selectStyle = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(99,102,241,0.3)',
    color: 'white',
    borderRadius: '12px',
    padding: '14px 18px',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
    paddingRight: '44px',
  };

  return (
    <>
      {justificationModalLaw && (
        <JustificationModal
          law={justificationModalLaw}
          onClose={() => setJustificationModalLaw(null)}
        />
      )}

      <div
        className="min-h-screen text-white"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3c 50%, #0f172a 100%)' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.6) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Scale size={36} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ background: 'linear-gradient(135deg, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Law Section Search
            </h1>
            <p className="text-slate-400 text-lg">Search directly by IPC or BNS section code to get case analysis</p>
          </div>

          {/* Search Card */}
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(20px)' }}
          >
            {isLoadingRules ? (
              <div className="flex items-center justify-center py-8 gap-3">
                <Loader className="animate-spin text-indigo-400" size={24} />
                <span className="text-slate-400">Loading law sections...</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* IPC Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(239,68,68,0.3)', color: '#f87171' }}>IPC</span>
                      Indian Penal Code Section
                    </label>
                    <div className="relative">
                      <select
                        value={selectedIpc}
                        onChange={e => handleIpcChange(e.target.value)}
                        style={selectStyle}
                      >
                        <option value="" style={{ background: '#1e293b', color: '#94a3b8' }}>— Select IPC Section —</option>
                        {ipcCodes.map(code => (
                          <option key={code} value={code} style={{ background: '#1e293b', color: 'white' }}>
                            IPC {code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* BNS Dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(139,92,246,0.3)', color: '#c4b5fd' }}>BNS</span>
                      Bharatiya Nyaya Sanhita Section
                    </label>
                    <div className="relative">
                      <select
                        value={selectedBns}
                        onChange={e => handleBnsChange(e.target.value)}
                        style={selectStyle}
                      >
                        <option value="" style={{ background: '#1e293b', color: '#94a3b8' }}>— Select BNS Section —</option>
                        {bnsCodes.map(code => (
                          <option key={code} value={code} style={{ background: '#1e293b', color: 'white' }}>
                            BNS {code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Selected Law Preview */}
                {selectedLaw && (
                  <div
                    className="mb-6 p-5 rounded-xl"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.2)' }}>
                        <BookOpen size={18} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{selectedLaw.Description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                            IPC {selectedLaw.IPC}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(139,92,246,0.2)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)' }}>
                            BNS {selectedLaw.BNS}
                          </span>
                          {selectedLaw.Category.slice(0, 2).map(cat => (
                            <span key={cat} className="px-2.5 py-1 rounded-full text-xs font-medium text-slate-300" style={{ background: 'rgba(255,255,255,0.07)' }}>
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGetJustification}
                  disabled={!selectedLaw || isLoadingJustification}
                  className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' }}
                >
                  {isLoadingJustification ? (
                    <><Loader className="animate-spin" size={22} /> Analysing Cases...</>
                  ) : (
                    <><Gavel size={22} /> Get Case Justification</>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {justificationData && !isLoadingJustification && (
            <div className="space-y-6">
              {/* Stats banner */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-indigo-400" />
                  <span className="text-slate-300 text-sm font-medium">
                    Analysis based on <span className="text-white font-bold">{justificationData.total_cases}</span> case records
                  </span>
                </div>
                <button
                  onClick={() => setJustificationModalLaw(selectedLaw)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                >
                  Open in popup
                </button>
              </div>

              {/* Common Judgements */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'rgba(16,185,129,0.1)' }}>
                  <CheckCircle size={20} className="text-emerald-400" />
                  <h3 className="text-lg font-bold" style={{ color: '#34d399' }}>Common Judgements</h3>
                  <span className="text-xs text-slate-500 ml-1">— repeated patterns across cases</span>
                </div>
                <div className="p-6 space-y-4" style={{ background: 'rgba(16,185,129,0.04)' }}>
                  {justificationData.common.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(16,185,129,0.25)', color: '#34d399' }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Different Judgements */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(245,158,11,0.25)' }}
              >
                <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'rgba(245,158,11,0.1)' }}>
                  <AlertTriangle size={20} className="text-amber-400" />
                  <h3 className="text-lg font-bold" style={{ color: '#fbbf24' }}>Different / Notable Judgements</h3>
                  <span className="text-xs text-slate-500 ml-1">— exceptional outcomes</span>
                </div>
                <div className="p-6 space-y-4" style={{ background: 'rgba(245,158,11,0.04)' }}>
                  {justificationData.different.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'rgba(245,158,11,0.25)', color: '#fbbf24' }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LawSearch;
