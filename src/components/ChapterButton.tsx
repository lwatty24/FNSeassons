import { motion } from 'framer-motion';

interface ChapterButtonProps {
  chapter: number;
  isActive: boolean;
  onClick: () => void;
}

export default function ChapterButton({ chapter, isActive, onClick }: ChapterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 rounded-lg transition-all ${
        isActive 
          ? 'text-white' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className="relative z-10">Chapter {chapter}</span>
      {isActive && (
        <motion.div
          layoutId="activeChapter"
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
        />
      )}
    </button>
  );
} 