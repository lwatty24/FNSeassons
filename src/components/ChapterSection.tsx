import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Season } from '../types/season';
import SeasonCard from './SeasonCard';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

interface ChapterSectionProps {
  chapter: number;
  seasons: Season[];
  onSeasonClick: (season: Season) => void;
}

export default function ChapterSection({ chapter, seasons, onSeasonClick }: ChapterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div 
      className="space-y-6"
      variants={item}
    >
      <div className="flex items-center gap-6 group">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Chapter {chapter}</h2>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-sm text-gray-400">
            {seasons.length} Season{seasons.length !== 1 ? 's' : ''}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {seasons.map(season => (
              <SeasonCard
                key={`${season.chapter}-${season.number}`}
                season={season}
                onClick={() => onSeasonClick(season)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 