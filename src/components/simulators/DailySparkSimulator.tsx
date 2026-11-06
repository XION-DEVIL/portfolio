import React, { useState } from 'react';
import { Sparkles, Wifi, WifiOff, CheckCircle2, Circle, Flame, Database, Plus, RefreshCw } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completed: boolean;
}

const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Review ML Paper / ArXiv Feed', streak: 14, completed: true },
  { id: '2', name: 'Write 50 Lines of Async Python', streak: 21, completed: true },
  { id: '3', name: '30-Minute Cardiovascular Fitness', streak: 8, completed: false },
  { id: '4', name: 'System Design / LeetCode Practice', streak: 5, completed: false },
];

export default function DailySparkSimulator() {
  const [isAirplaneMode, setIsAirplaneMode] = useState<boolean>(true);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [lastSyncOp, setLastSyncOp] = useState<string>('IndexedDB: IDBTransaction(readonly=false) committed 0ms');
  const [newHabitName, setNewHabitName] = useState<string>('');

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const progressPercent = Math.round((completedCount / (totalCount || 1)) * 100);
  const maxStreak = Math.max(...habits.map(h => h.streak), 0);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const nextState = !h.completed;
          return {
            ...h,
            completed: nextState,
            streak: nextState ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      })
    );
    setLastSyncOp(`IndexedDB: Put record #${id} -> store: "habits" (0 latency)`);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const newId = String(Date.now());
    const newHabit: Habit = {
      id: newId,
      name: newHabitName.trim(),
      streak: 1,
      completed: true
    };
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setLastSyncOp(`IndexedDB: Auto-increment primary key -> record #${newId} persisted`);
  };

  const handleReset = () => {
    setHabits(INITIAL_HABITS);
    setLastSyncOp('IndexedDB: Reset to mock seed state');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 my-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Offline-First IndexedDB Sandbox
          </div>
          <h3 className="text-xl font-heading tracking-tight">Offline Habit & Streak Engine</h3>
          <p className="text-xs text-white/60 font-body">Test zero-latency local data mutations without relying on any cloud server.</p>
        </div>

        {/* Airplane Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAirplaneMode(!isAirplaneMode);
              setLastSyncOp(isAirplaneMode ? 'Network reconnected: Background sync queued' : 'Airplane mode enabled: Running 100% locally on IndexedDB');
            }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-body transition-all cursor-pointer ${
              isAirplaneMode
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
            }`}
          >
            {isAirplaneMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isAirplaneMode ? 'Airplane Mode (Offline)' : 'Online Connected'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Reset Habits"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Today's Progress</div>
          <div className="text-xl font-heading font-semibold text-white mt-1">{progressPercent}%</div>
          <div className="text-[10px] text-white/40 font-mono mt-0.5">{completedCount} of {totalCount} completed</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Max Streak</div>
          <div className="text-xl font-heading font-semibold text-amber-400 mt-1 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" /> {maxStreak} Days
          </div>
          <div className="text-[10px] text-white/40 font-mono mt-0.5">Consecutive consistency</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Storage Engine</div>
          <div className="text-xl font-heading font-semibold text-purple-300 mt-1 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-purple-400" /> IndexedDB
          </div>
          <div className="text-[10px] text-white/40 font-mono mt-0.5">Zero API roundtrips</div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-black/40">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Client Latency</div>
          <div className="text-xl font-heading font-semibold text-emerald-400 mt-1">0.1 ms</div>
          <div className="text-[10px] text-white/40 font-mono mt-0.5">Hardware-level fast</div>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-2 mb-6">
        {habits.map((h) => (
          <button
            key={h.id}
            onClick={() => toggleHabit(h.id)}
            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
              h.completed
                ? 'border-purple-500/30 bg-purple-500/[0.08] text-white'
                : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white/70'
            }`}
          >
            <div className="flex items-center gap-3">
              {h.completed ? (
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-white/30 shrink-0" />
              )}
              <span className={`text-sm font-body ${h.completed ? 'line-through text-white/60' : 'text-white/90'}`}>
                {h.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>{h.streak}d</span>
            </div>
          </button>
        ))}
      </div>

      {/* Add Habit Form */}
      <form onSubmit={handleAddHabit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Add custom habit to offline sandbox..."
          className="flex-grow px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-purple-400"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-body text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Low-level storage inspector */}
      <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-white/60 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
        <span className="truncate">{lastSyncOp}</span>
      </div>
    </div>
  );
}
