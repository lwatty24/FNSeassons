import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViewToggleProps {
  activeView: 'grid' | 'timeline';
  onChange: (view: 'grid' | 'timeline') => void;
}

export default function ViewToggle({ activeView, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
      <ToggleButton
        isActive={activeView === 'grid'}
        onClick={() => onChange('grid')}
        icon={<LayoutGrid className="w-4 h-4" />}
        label="Grid"
      />
      <ToggleButton
        isActive={activeView === 'timeline'}
        onClick={() => onChange('timeline')}
        icon={<List className="w-4 h-4" />}
        label="Timeline"
      />
    </div>
  );
}

function ToggleButton({ 
  isActive, 
  onClick, 
  icon, 
  label 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 text-sm flex items-center gap-2"
    >
      {isActive && (
        <motion.div
          layoutId="activeView"
          className="absolute inset-0 bg-white/10 rounded-lg"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <span className="relative z-10 text-white">
        {icon}
      </span>
      <span className="relative z-10 text-white">
        {label}
      </span>
    </button>
  );
} 