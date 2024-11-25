import { Sparkles, Star } from 'lucide-react';

interface EventsDisplayProps {
  liveCount: number;
  crucialCount: number;
  size?: 'sm' | 'lg';
}

export default function EventsDisplay({ liveCount, crucialCount, size = 'sm' }: EventsDisplayProps) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Sparkles className={`${iconSize} text-green-400`} />
        <span className={`${textSize} text-green-400 font-medium`}>{liveCount}</span>
      </div>
      {crucialCount > 0 && (
        <>
          <span className="text-gray-600">+</span>
          <div className="flex items-center gap-1.5">
            <Star className={`${iconSize} text-yellow-400`} />
            <span className={`${textSize} text-yellow-400 font-medium`}>{crucialCount}</span>
          </div>
        </>
      )}
    </div>
  );
} 