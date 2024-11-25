import { motion, AnimatePresence } from 'framer-motion';
import { Season } from '../types/season';
import { Calendar, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import TimelineEvent from './TimelineEvent';
import EventModal from './EventModal';

interface ModalState {
  type: 'season' | 'event';
  eventName?: string;
  season: Season;
}

export default function TimelineView({ seasons, onSeasonClick }: { seasons: Season[], onSeasonClick: (season: Season) => void }) {
  const [activeChapter, setActiveChapter] = useState(seasons[0].chapter);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const handleEventClick = (event: any, type: 'season' | 'event') => {
    if (type === 'season') {
      onSeasonClick(event.season);
    } else {
      setModalState({
        type: 'event',
        eventName: event.title,
        season: event.season
      });
    }
  };

  const timelineEvents = seasons.flatMap(season => [
    // Season Start
    {
      date: new Date(season.startDate),
      type: 'season_start',
      title: `Chapter ${season.chapter} Season ${season.number}`,
      description: season.description,
      season,
      image: season.coverImage,
      locations: season.keyLocations,
      skins: season.battlePassSkins
    },
    // Live Events
    ...season.liveEvents.map(event => ({
      date: new Date(event.date),
      type: 'live_event',
      title: event.title,
      description: event.description,
      season,
      image: event.image
    })),
    // Crucial Moments
    ...season.crucialMoments.map(event => ({
      date: new Date(event.date),
      type: 'crucial_moment',
      title: event.title,
      description: event.description,
      season,
      image: event.image
    }))
  ]).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Chapter Navigation */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex gap-2 p-4 overflow-x-auto hide-scrollbar">
          {[...new Set(seasons.map(s => s.chapter))].sort().map(chapter => (
            <button
              key={chapter}
              onClick={() => setActiveChapter(chapter)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChapter === chapter 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              Chapter {chapter}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />
        
        <div className="space-y-32">
          {timelineEvents
            .filter(event => event.season.chapter === activeChapter)
            .map((event, index) => (
              <TimelineEvent
                key={`${event.type}-${index}`}
                event={event}
                position={index % 2 === 0 ? 'left' : 'right'}
                onClick={(type) => handleEventClick(event, type)}
              />
            ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalState?.type === 'event' && (
          <EventModal
            eventName={modalState.eventName!}
            seasonName={modalState.season.name}
            seasonNumber={modalState.season.number}
            chapterNumber={modalState.season.chapter}
            onClose={() => setModalState(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}