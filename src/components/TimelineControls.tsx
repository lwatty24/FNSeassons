import { Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

function TimelineControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onScrollLeft,
  onScrollRight
}: TimelineControlsProps) {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4">
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl p-2 border border-white/10">
        <button
          onClick={onScrollLeft}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onScrollRight}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl p-2 border border-white/10">
        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.5}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          aria-label="Zoom out"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={onZoomIn}
          disabled={zoom >= 2}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          aria-label="Zoom in"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default TimelineControls; 