import React, { useState, useEffect } from "react";
import {
  X,
  Scale,
  CheckCircle,
  AlertTriangle,
  Loader,
  BookOpen,
  FileText,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const JustificationModal = ({ law, onClose }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJustification = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/justification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ipc: law.IPC }),
        });
        if (!response.ok)
          throw new Error("Failed to fetch justification data.");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (law) fetchJustification();
  }, [law]);

  if (!law) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-6 pt-6 pb-4 rounded-t-2xl"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-4 pr-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              }}
            >
              <Scale size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {law.Description}
              </h2>
              <div className="flex gap-3 mt-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(239,68,68,0.2)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  IPC {law.IPC}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  BNS {law.BNS}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <BookOpen size={15} className="text-indigo-400" />
            <p className="text-sm text-indigo-300 font-medium">
              Case Justification Analysis
            </p>
            {data && !isLoading && (
              <span className="ml-auto text-xs text-slate-500">
                {data.total_cases} cases analysed
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-full"
                  style={{ border: "3px solid rgba(99,102,241,0.2)" }}
                />
                <div
                  className="absolute inset-0 w-14 h-14 rounded-full animate-spin"
                  style={{
                    border: "3px solid transparent",
                    borderTopColor: "#6366f1",
                  }}
                />
              </div>
              <p className="text-slate-400 text-sm animate-pulse">
                Analysing past case records...
              </p>
            </div>
          )}

          {error && !isLoading && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
              }}
            >
              <AlertTriangle size={18} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {data && !isLoading && !error && (
            <div className="space-y-6">
              {/* Common Judgements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.2)" }}
                  >
                    <CheckCircle size={15} className="text-emerald-400" />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#34d399" }}
                  >
                    Common Judgements
                  </h3>
                  <span className="text-xs text-slate-500 ml-1">
                    — repeated patterns across cases
                  </span>
                </div>
                <div className="space-y-3">
                  {data.common.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl text-sm leading-relaxed transition-all hover:scale-[1.01]"
                      style={{
                        background: "rgba(16,185,129,0.08)",
                        border: "1px solid rgba(16,185,129,0.2)",
                        color: "#cbd5e1",
                      }}
                    >
                      <div className="flex gap-3">
                        <div
                          className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: "rgba(16,185,129,0.3)",
                            color: "#34d399",
                          }}
                        >
                          {i + 1}
                        </div>
                        <p>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(99,102,241,0.2)" }}
                />
                <FileText size={14} className="text-slate-500" />
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(99,102,241,0.2)" }}
                />
              </div>

              {/* Different Judgements */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(245,158,11,0.2)" }}
                  >
                    <AlertTriangle size={15} className="text-amber-400" />
                  </div>
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#fbbf24" }}
                  >
                    Different / Notable Judgements
                  </h3>
                  <span className="text-xs text-slate-500 ml-1">
                    — exceptional outcomes
                  </span>
                </div>
                <div className="space-y-3">
                  {data.different.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl text-sm leading-relaxed transition-all hover:scale-[1.01]"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        color: "#cbd5e1",
                      }}
                    >
                      <div className="flex gap-3">
                        <div
                          className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: "rgba(245,158,11,0.3)",
                            color: "#fbbf24",
                          }}
                        >
                          {i + 1}
                        </div>
                        <p>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JustificationModal;
