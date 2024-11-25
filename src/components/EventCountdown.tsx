import { useEffect, useState } from 'react';
import { Music2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function getTimeUntilEvent(eventDate: string): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const event = new Date(eventDate);
  const diffTime = event.getTime() - now.getTime();
  
  if (diffTime <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl">
        <div className="text-4xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilEvent('2024-11-30T19:00:00Z'));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilEvent('2024-11-30T19:00:00Z'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }
  
  return (
    <div className="w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Music2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Remix: The Finale
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium text-purple-400/80 bg-purple-400/10 rounded-full border border-purple-400/20">
                  Live Event
                </span>
              </div>
              <p className="text-sm text-white/40 mt-0.5">Don't miss the epic concert of a lifetime and the end of Chapter 2: Remix</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <TimeUnit value={timeLeft.days} label="days" />
            <TimeUnit value={timeLeft.hours} label="hours" />
            <TimeUnit value={timeLeft.minutes} label="min" />
            <TimeUnit value={timeLeft.seconds} label="sec" />
          </div>
        </div>
      </div>
    </div>
  );
} 