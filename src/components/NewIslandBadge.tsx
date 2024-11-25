import { Map } from 'lucide-react';

export default function NewIslandBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30">
      <Map className="w-4 h-4 text-blue-400" />
      <span className="text-sm font-medium text-blue-400">New Island</span>
    </div>
  );
} 