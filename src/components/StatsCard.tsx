import { LucideIcon } from 'lucide-react';
import EventsDisplay from './EventsDisplay';

interface StatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  secondaryValue?: number;
  isEvents?: boolean;
}

export default function StatsCard({ 
  icon: Icon, 
  value, 
  label, 
  secondaryValue,
  isEvents 
}: StatsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <Icon className="w-8 h-8 text-gray-400 mb-4" />
      <div className="space-y-2">
        {isEvents ? (
          <EventsDisplay 
            majorCount={value} 
            miniCount={secondaryValue || 0}
            size="lg"
          />
        ) : (
          <span className="text-4xl font-bold text-white">{value}</span>
        )}
        <p className="text-gray-400">{label}</p>
      </div>
    </div>
  );
} 