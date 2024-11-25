import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { seasons } from './data/seasons';
import SeasonModal from './components/SeasonModal';
import ChapterSection from './components/ChapterSection';
import { Season } from './types/season';
import { Search, Filter, Calendar, Users, Sparkles, ChevronDown } from 'lucide-react';
import ViewToggle from './components/ViewToggle';
import FilterButton from './components/FilterButton';
import { FilterOptions } from './components/FilterButton';
import StatsCard from './components/StatsCard';
import EventCountdown from './components/EventCountdown';
import TimelineView from './components/TimelineView';
import './styles/cursor.css';
import Cursor from './components/Cursor';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const searchFilter = (season: Season, query: string): boolean => {
  const searchTerm = query.toLowerCase();
  return (
    season.name.toLowerCase().includes(searchTerm) ||
    season.description.toLowerCase().includes(searchTerm) ||
    season.battlePassSkins.some(skin => skin.toLowerCase().includes(searchTerm)) ||
    season.liveEvents.some(event => event.title.toLowerCase().includes(searchTerm)) ||
    season.crucialMoments.some(event => event.title.toLowerCase().includes(searchTerm)) ||
    season.keyLocations.some(location => location.toLowerCase().includes(searchTerm))
  );
};

export default function App() {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'timeline'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    chapters: [],
    hasEvents: false,
    dateRange: {
      start: null,
      end: null
    }
  });
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowCountdown(currentScrollY <= lastScrollY || currentScrollY < 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get unique chapters for filter options
  const availableChapters = [...new Set(seasons.map(season => season.chapter))].sort((a, b) => b - a);

  // Update the filter logic
  const filteredSeasons = seasons.filter(season => {
    // Search filter
    if (searchQuery && !searchFilter(season, searchQuery)) return false;
    
    // Chapter filter
    if (filterOptions.chapters.length > 0 && !filterOptions.chapters.includes(season.chapter)) return false;
    
    // Events filter
    if (filterOptions.hasEvents && (season.liveEvents?.length === 0 && season.majorEvents?.length === 0)) return false;
    
    // Date range filter
    if (filterOptions.dateRange.start && new Date(season.startDate) < new Date(filterOptions.dateRange.start)) return false;
    if (filterOptions.dateRange.end && new Date(season.endDate) > new Date(filterOptions.dateRange.end)) return false;
    
    return true;
  });

  // Group filtered seasons by chapter
  const chapterSeasons = filteredSeasons.reduce((acc, season) => {
    if (!acc[season.chapter]) {
      acc[season.chapter] = [];
    }
    acc[season.chapter].push(season);
    return acc;
  }, {} as Record<number, Season[]>);

  // Sort chapters in descending order
  const sortedChapters = Object.keys(chapterSeasons)
    .map(Number)
    .sort((a, b) => b - a);

  const totalSeasons = filteredSeasons.length;
  const totalSkins = filteredSeasons.reduce((acc, season) => acc + season.battlePassSkins.length, 0);
  const totalLiveEvents = filteredSeasons.reduce((acc, season) => acc + (season.liveEvents?.length || season.majorEvents?.length || 0), 0);
  const totalCrucialMoments = filteredSeasons.reduce((acc, season) => acc + (season.crucialMoments?.length || season.miniEvents?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Cursor />
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showCountdown ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <EventCountdown />
      </div>

      {/* Hero Section with proper spacing */}
      <div className="relative h-[calc(100vh-96px)] min-h-[600px]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Fortnite Seasons
            </h1>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Journey through time and explore the evolution of Fortnite Battle Royale, from its origins to the present day.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <StatsCard icon={Calendar} value={totalSeasons} label="Seasons" />
              <StatsCard icon={Users} value={totalSkins} label="Battle Pass Skins" />
              <StatsCard 
                icon={Sparkles} 
                value={totalLiveEvents} 
                secondaryValue={totalCrucialMoments}
                label="Total Events"
                isEvents
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search seasons, events, or battle pass skins..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <ViewToggle activeView={activeView} onChange={setActiveView} />
            <FilterButton 
              options={filterOptions}
              onChange={setFilterOptions}
              availableChapters={availableChapters}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeView === 'grid' ? (
          <motion.div 
            className="space-y-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {sortedChapters.map(chapter => (
              <ChapterSection
                key={chapter}
                chapter={chapter}
                seasons={chapterSeasons[chapter]}
                onSeasonClick={setSelectedSeason}
              />
            ))}
          </motion.div>
        ) : (
          <TimelineView 
            seasons={filteredSeasons}
            onSeasonClick={setSelectedSeason}
          />
        )}
      </main>

      <AnimatePresence>
        {selectedSeason && (
          <SeasonModal
            season={selectedSeason}
            onClose={() => setSelectedSeason(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}