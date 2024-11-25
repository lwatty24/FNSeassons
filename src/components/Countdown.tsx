import { useEffect, useState } from 'react';
import { Music2 } from 'lucide-react';
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
    <div className="flex items-center gap-2">
      <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilEvent('2024-03-08T19:00:00Z'));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilEvent('2024-03-08T19:00:00Z'));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
              <Music2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Remix: The Finale
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium text-purple-400/80 bg-purple-400/10 rounded-full border border-purple-400/20">
                  Live Event
                </span>
              </div>
              <p className="text-sm text-white/40">Don't miss the epic conclusion of Chapter 5: Season 1</p>
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
    </motion.div>
  );
} 