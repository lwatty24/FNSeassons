import { RotateCcw } from 'lucide-react';

export default function ReturningIslandBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
      <RotateCcw className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium text-purple-400">Returning Island</span>
    </div>
  );
} 