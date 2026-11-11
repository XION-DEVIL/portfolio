import React, { useState, useMemo } from "react";
import { Sparkles, AlertTriangle, CheckCircle2, Truck, RefreshCw, Play } from "lucide-react";

export default function NelSyncSimulator() {
  const [moisture, setMoisture] = useState<number>(14.5);
  const [temperature, setTemperature] = useState<number>(28);
  const [transitDays, setTransitDays] = useState<number>(3);

  // Predictive ML calculation model (client-side simulation of the NelSync hackathon model)
  const analysis = useMemo(() => {
    // Moisture index above safe storage threshold (14.0%)
    const moistureDelta = Math.max(0, moisture - 13.5);
    // Thermal acceleration factor
    const tempFactor = Math.max(0.8, (temperature - 15) / 10);
    // Transit duration exponential risk
    const timeFactor = transitDays / 5;

    // Predicted Spoilage Probability %
    const rawRisk = moistureDelta * 8.5 * tempFactor * (1 + timeFactor * 0.4);
    const spoilageRisk = Math.min(99.2, Math.max(1.8, Number(rawRisk.toFixed(1))));

    // Quality Grade assignment
    let grade:
      "Grade A (Export)" | "Grade B (Commercial)" | "Grade C (Immediate Mill)" | "Reject / Biofuel";
    let gradeColor: string;
    let badgeBg: string;

    if (moisture <= 14.0 && temperature <= 28 && transitDays <= 5) {
      grade = "Grade A (Export)";
      gradeColor = "text-emerald-400";
      badgeBg = "bg-emerald-500/10 border-emerald-500/30";
    } else if (moisture <= 16.5 && spoilageRisk < 35) {
      grade = "Grade B (Commercial)";
      gradeColor = "text-blue-400";
      badgeBg = "bg-blue-500/10 border-blue-500/30";
    } else if (spoilageRisk < 65) {
      grade = "Grade C (Immediate Mill)";
      gradeColor = "text-amber-400";
      badgeBg = "bg-amber-500/10 border-amber-500/30";
    } else {
      grade = "Reject / Biofuel";
      gradeColor = "text-rose-400";
      badgeBg = "bg-rose-500/10 border-rose-500/30";
    }

    // Logistics Dispatch Priority
    let priority: "Normal Routine" | "Priority Scheduled" | "Emergency Expedited";
    let priorityColor: string;

    if (spoilageRisk > 50 || moisture > 18) {
      priority = "Emergency Expedited";
      priorityColor = "text-rose-400 border-rose-500/40 bg-rose-500/10";
    } else if (spoilageRisk > 25 || transitDays > 5) {
      priority = "Priority Scheduled";
      priorityColor = "text-amber-400 border-amber-500/40 bg-amber-500/10";
    } else {
      priority = "Normal Routine";
      priorityColor = "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
    }

    return { spoilageRisk, grade, gradeColor, badgeBg, priority, priorityColor };
  }, [moisture, temperature, transitDays]);

  const handleReset = () => {
    setMoisture(14.5);
    setTemperature(28);
    setTransitDays(3);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 my-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Illustrative Demo · Procurement Logistics Simulator
          </div>
          <h3 className="text-xl font-heading tracking-tight">
            Grain Moisture &amp; Spoilage Predictor
          </h3>
          <p className="text-xs text-white/60 font-body">
            Illustrative client-side simulation demonstrating four-stage procurement logistics and
            dispatch risk concepts from the AIxcelerate 2026 hackathon.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href="https://lnkd.in/ghBUvf4P"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-black bg-white hover:bg-white/90 px-3.5 py-1.5 rounded-lg font-semibold transition-all shadow cursor-pointer"
            title="Watch the hackathon video demo on LinkedIn"
          >
            <Play className="w-3 h-3 fill-black" /> Video Demo
          </a>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
            title="Reset to baseline values"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Moisture Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-body">
            <span className="text-white/70">Grain Moisture:</span>
            <span className="font-mono font-semibold text-emerald-300">{moisture.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="10.0"
            max="24.0"
            step="0.5"
            value={moisture}
            onChange={(e) => setMoisture(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            aria-label="Grain moisture percentage"
          />
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>10% (Dry)</span>
            <span>14% Safe</span>
            <span>24% (Wet)</span>
          </div>
        </div>

        {/* Ambient Temperature Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-body">
            <span className="text-white/70">Ambient Temp:</span>
            <span className="font-mono font-semibold text-amber-300">{temperature}°C</span>
          </div>
          <input
            type="range"
            min="15"
            max="45"
            step="1"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
            aria-label="Ambient storage temperature in Celsius"
          />
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>15°C Cold</span>
            <span>28°C Room</span>
            <span>45°C Harsh</span>
          </div>
        </div>

        {/* Transit Days Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-body">
            <span className="text-white/70">Transit / Storage Time:</span>
            <span className="font-mono font-semibold text-sky-300">
              {transitDays} {transitDays === 1 ? "day" : "days"}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="14"
            step="1"
            value={transitDays}
            onChange={(e) => setTransitDays(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sky-400"
            aria-label="Transit duration in days"
          />
          <div className="flex justify-between text-[10px] text-white/40 font-mono">
            <span>1 Day Express</span>
            <span>7 Days</span>
            <span>14 Days Max</span>
          </div>
        </div>
      </div>

      {/* Real-time Output Predictions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
        {/* Prediction 1: Spoilage Risk Gauge */}
        <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
          <div className="text-xs font-body text-white/60 mb-1">Predicted Spoilage Risk</div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-mono font-bold ${analysis.gradeColor}`}>
              {analysis.spoilageRisk}%
            </span>
            <span className="text-[10px] text-white/50 font-body">
              {analysis.spoilageRisk < 20
                ? "Optimal"
                : analysis.spoilageRisk < 50
                  ? "Moderate"
                  : "High Risk"}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                analysis.spoilageRisk < 25
                  ? "bg-emerald-400"
                  : analysis.spoilageRisk < 60
                    ? "bg-amber-400"
                    : "bg-rose-500"
              }`}
              style={{ width: `${analysis.spoilageRisk}%` }}
            />
          </div>
        </div>

        {/* Prediction 2: Quality Grade */}
        <div className={`p-4 rounded-xl border ${analysis.badgeBg} flex flex-col justify-between`}>
          <div className="text-xs font-body text-white/60 mb-1">Paddy Quality Grade</div>
          <div
            className={`text-lg font-heading tracking-tight font-semibold ${analysis.gradeColor} flex items-center gap-1.5`}
          >
            {analysis.spoilageRisk < 40 ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            {analysis.grade}
          </div>
          <div className="text-[10px] text-white/50 mt-2 font-mono">
            {moisture <= 14
              ? "Moisture within standard limits"
              : "High moisture increases spoilage"}
          </div>
        </div>

        {/* Prediction 3: Logistics Action */}
        <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-between">
          <div className="text-xs font-body text-white/60 mb-1 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> Logistics Priority
          </div>
          <div
            className={`text-sm font-body font-semibold px-3 py-1.5 rounded-lg border inline-flex items-center gap-2 ${analysis.priorityColor}`}
          >
            {analysis.priority}
          </div>
          <div className="text-[10px] text-white/50 mt-2 font-mono">
            {analysis.priority === "Emergency Expedited"
              ? "Immediate silo allocation required"
              : "Standard regional transit queue"}
          </div>
        </div>
      </div>
    </div>
  );
}
