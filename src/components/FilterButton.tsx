import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface FilterOptions {
  chapters: number[];
  hasEvents: boolean;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

interface FilterButtonProps {
  options: FilterOptions;
  onChange: (options: FilterOptions) => void;
  availableChapters: number[];
}

export default function FilterButton({ options, onChange, availableChapters }: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChapter = (chapter: number) => {
    const newChapters = options.chapters.includes(chapter)
      ? options.chapters.filter(c => c !== chapter)
      : [...options.chapters, chapter];
    onChange({ ...options, chapters: newChapters });
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
      >
        <Filter className="w-5 h-5 text-gray-400" />
        <span className="text-gray-300">Filters</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 w-80 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl z-50"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <button onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Chapter filters */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Chapters</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {availableChapters.map(chapter => (
                        <button
                          key={chapter}
                          onClick={() => toggleChapter(chapter)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            options.chapters.includes(chapter)
                              ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                              : 'bg-white/5 text-gray-400 border-white/10'
                          } border`}
                        >
                          Ch. {chapter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Events filter */}
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      <input
                        type="checkbox"
                        checked={options.hasEvents}
                        onChange={(e) => onChange({ ...options, hasEvents: e.target.checked })}
                        className="rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500/50"
                      />
                      Has Major Events
                    </label>
                  </div>

                  {/* Date range */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-400">Date Range</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={options.dateRange.start || ''}
                        onChange={(e) => onChange({
                          ...options,
                          dateRange: { ...options.dateRange, start: e.target.value }
                        })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                      <input
                        type="date"
                        value={options.dateRange.end || ''}
                        onChange={(e) => onChange({
                          ...options,
                          dateRange: { ...options.dateRange, end: e.target.value }
                        })}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 