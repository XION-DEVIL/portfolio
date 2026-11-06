import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Terminal, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  schemaCheck: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Python Async & FastAPI',
    question: 'In FastAPI, why should CPU-bound ML model inference be run in a ProcessPoolExecutor or dedicated worker rather than directly inside an async def endpoint?',
    options: [
      'Async def endpoints in Python run on the main asyncio event loop; CPU-bound tasks block all other concurrent requests.',
      'FastAPI strictly disallows numpy or scikit-learn imports inside async def routines.',
      'Async functions cannot access memory greater than 512 MB in Python 3.12.',
      'The Python GIL prevents asyncio from executing network I/O calls.'
    ],
    correct: 0,
    explanation: 'Python asyncio is cooperative single-threaded multitasking. A CPU-bound task executes continuously on the main thread, freezing the event loop and blocking all other concurrent HTTP connections until it finishes. Offloading to a process pool or task worker maintains microsecond async latency.',
    schemaCheck: 'PydanticV2: EvaluationRubric(latency_score=0.98, concurrency_safe=True)'
  },
  {
    id: 2,
    topic: 'ML & Data Pipelines',
    question: 'When deploying a scikit-learn regression model for real-time inference, why is computing feature scaling using StandardScaler.fit_transform on incoming production batches considered a critical data leakage / evaluation flaw?',
    options: [
      'StandardScaler only works on training labels, not features.',
      'It recalculates mean and variance from the test batch instead of using frozen training distributions, leading to inconsistent prediction skew.',
      'It forces the model to retraining on every inference call, creating disk write lockups.',
      'Scikit-learn transforms do not serialize to ONNX or pickle.'
    ],
    correct: 1,
    explanation: 'In production inference, pipelines must apply transform() using the pre-fitted parameters (mean and standard deviation) learned strictly from the training dataset. Refitting on the test batch causes test-set distribution leakage and unreliable predictions.',
    schemaCheck: 'PydanticV2: FeatureValidation(pipeline_leakage=False, scaler_frozen=True)'
  },
  {
    id: 3,
    topic: 'React 19 & Architecture',
    question: 'How does client-side state hydration benefit from lazy IntersectionObserver rendering in media-heavy portfolio web applications?',
    options: [
      'It completely removes the need for JavaScript bundles on the client.',
      'It defers off-screen DOM tree construction and heavy canvas/video mounts until the viewport reaches the threshold, preserving 60fps first paint.',
      'It converts React components into native Web Workers automatically.',
      'It forces Vite to load all assets via HTTP/3 only.'
    ],
    correct: 1,
    explanation: 'IntersectionObserver prevents the browser from executing expensive layout calculation, Canvas rendering, and video decoders for sections deep down the page during initial load, ensuring sub-100ms Total Blocking Time (TBT).',
    schemaCheck: 'PydanticV2: CoreWebVitals(tbt_target="<200ms", lcp_target="<2500ms")'
  }
];

export default function PrepMindSimulator() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after answer
    setSelectedOption(idx);
    setShowExplanation(true);
    setAnsweredCount(prev => prev + 1);
    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredCount(0);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 my-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive AI Interview & Quiz Sandbox
          </div>
          <h3 className="text-xl font-heading tracking-tight">Technical Interview Evaluator</h3>
          <p className="text-xs text-white/60 font-body">Experience how PrepMind AI validates engineering concepts with structured schema feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
            Score: <span className="font-bold text-emerald-400">{score}</span> / {answeredCount}
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-white/50 mb-3 font-mono">
          <span>Topic: <strong className="text-sky-300 font-semibold">{currentQ.topic}</strong></span>
          <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
        </div>

        <h4 className="text-base sm:text-lg font-body font-medium leading-relaxed mb-6 text-white/95">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === currentQ.correct;

            let btnStyle = 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-white/80';
            if (showExplanation) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200 font-medium';
              } else if (isSelected) {
                btnStyle = 'border-rose-500/50 bg-rose-500/10 text-rose-200';
              } else {
                btnStyle = 'border-white/5 bg-transparent opacity-40 text-white/60';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border text-sm font-body transition-all duration-200 flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-xs font-mono">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-grow pt-0.5">{opt}</span>
                {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Structured Schema Explanation Box */}
        {showExplanation && (
          <div className="mt-6 p-5 rounded-xl border border-sky-500/30 bg-sky-950/20 animate-fadeIn space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-sky-400 border-b border-sky-500/20 pb-2">
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Structured LLM Evaluator Output
              </span>
              <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded text-sky-300">
                200 OK · Schema Validated
              </span>
            </div>
            <p className="text-xs sm:text-sm font-body leading-relaxed text-white/90">
              {currentQ.explanation}
            </p>
            <div className="p-2.5 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-emerald-400">
              {currentQ.schemaCheck}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-body font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Next Challenge <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
