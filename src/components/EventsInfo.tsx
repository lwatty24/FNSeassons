import { Sparkles, Star } from 'lucide-react';

interface EventsInfoProps {
  majorEvents: string[];
  miniEvents: string[];
}

export default function EventsInfo({ majorEvents, miniEvents }: EventsInfoProps) {
  const totalEvents = majorEvents.length + miniEvents.length;
  if (totalEvents === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white font-medium">Events</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-green-400 font-medium">{majorEvents.length}</span>
          {miniEvents.length > 0 && (
            <>
              <span className="text-gray-500">+</span>
              <span className="text-sm text-yellow-400 font-medium">{miniEvents.length}</span>
            </>
          )}
        </div>
      </div>
      {majorEvents.length > 0 && (
        <span className="text-sm text-gray-400 truncate">
          {majorEvents[0]}
        </span>
      )}
    </div>
  );
} 