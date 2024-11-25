import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { Season } from '../types/season';
import { useEffect, useState } from 'react';
import SkinModal from './SkinModal';
import EventModal from './EventModal';
import NewIslandBadge from './NewIslandBadge';
import ReturningIslandBadge from './ReturningIslandBadge';

interface SeasonModalProps {
  season: Season;
  onClose: () => void;
}

export default function SeasonModal({ season, onClose }: SeasonModalProps) {
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const isOGSeason = season.number === "OG";

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <div className="h-screen w-screen flex items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0A0A0A]/95 w-full max-w-[1400px] rounded-3xl border border-white/10 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid grid-cols-[1fr_1.5fr] h-[850px] relative">
              {/* Full-width background image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={season.image} 
                  alt={season.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, 
                      rgba(0,0,0,0.95) 0%,
                      rgba(0,0,0,0.70) 25%,
                      rgba(0,0,0,0.50) 50%,
                      rgba(0,0,0,0.70) 80%,
                      rgba(0,0,0,0.95) 100%
                    )`
                  }}
                />
              </div>

              {/* Content columns with transparent backgrounds */}
              <div className="relative z-10">
                {/* Left column content */}
                <div className="relative h-full p-10 flex flex-col justify-between">
                  <button
                    onClick={onClose}
                    className="self-start p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white/80" />
                  </button>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-lg">
                        <span className="font-medium text-blue-400">Chapter {season.chapter}</span>
                        {!isOGSeason && (
                          <>
                            <span className="text-white/40">•</span>
                            <span className="font-medium text-blue-400">Season {season.number}</span>
                          </>
                        )}
                      </div>
                      <h1 className="text-6xl font-bold text-white mb-4">{season.name}</h1>
                      <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                        {season.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InfoCard
                        icon={<Calendar className="w-5 h-5 text-blue-400" />}
                        label="Season Duration"
                        value={
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/60">{formatSeasonDuration(season.startDate, season.endDate).formattedStart}</span>
                              <span className="text-white/40">→</span>
                              <span className="text-white/60">{formatSeasonDuration(season.startDate, season.endDate).formattedEnd}</span>
                            </div>
                            <div className="text-white/80 font-medium">
                              {formatSeasonDuration(season.startDate, season.endDate).duration} Days
                            </div>
                          </div>
                        }
                      />
                      <InfoCard
                        icon={<Users className="w-5 h-5 text-pink-400" />}
                        label="Battle Pass"
                        value={`${season.battlePassSkins?.length || 0} Skins`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                {/* Right column content */}
                <div className="p-10 space-y-8">
                  {season.battlePassSkins?.length > 0 && (
                    <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-pink-400" />
                        <h2 className="text-xl font-semibold text-white">Battle Pass Skins</h2>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {season.battlePassSkins.map(skin => (
                          <button
                            key={skin}
                            onClick={() => setSelectedSkin(skin)}
                            className="p-3 text-left rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 text-white/80 transition-colors"
                          >
                            {skin}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {season.keyLocations?.length > 0 && (
                    <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-purple-400" />
                          <h2 className="text-xl font-semibold text-white">Key Locations</h2>
                        </div>
                        <div className="flex gap-2">
                          {season.keyLocations.includes("New Island") && <NewIslandBadge />}
                          {season.keyLocations.includes("Old Island") && <ReturningIslandBadge />}
                        </div>
                      </div>
                      <div className={`${season.keyLocations.length > 12 ? "h-[108px] overflow-y-auto pr-2 custom-scrollbar" : ""}`}>
                        <div className="grid grid-cols-4 gap-2">
                          {season.keyLocations
                            .filter(location => location !== "New Island" && location !== "Old Island")
                            .map(location => (
                              <div
                                key={location}
                                className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/80"
                              >
                                {location}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-8">
                    {season.liveEvents?.length > 0 && (
                      <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-green-400" />
                          <h2 className="text-xl font-semibold text-white">Live Events</h2>
                        </div>
                        <div className="space-y-2">
                          {season.liveEvents.map(event => (
                            <button
                              key={event.title}
                              onClick={() => setSelectedEvent(event.title)}
                              className="w-full p-3 text-left rounded-lg bg-black/40 hover:bg-black/60 border border-green-500/10 text-white/80 transition-colors"
                            >
                              {event.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {season.crucialMoments?.length > 0 && (
                      <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <h2 className="text-xl font-semibold text-white">Crucial Moments</h2>
                        </div>
                        <div className="space-y-2">
                          {season.crucialMoments.map(event => (
                            <button
                              key={event.title}
                              onClick={() => setSelectedEvent(event.title)}
                              className="w-full p-3 text-left rounded-lg bg-black/40 hover:bg-black/60 border border-yellow-500/10 text-white/80 transition-colors"
                            >
                              {event.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSkin && <SkinModal skinName={selectedSkin} onClose={() => setSelectedSkin(null)} />}
        {selectedEvent && (
          <EventModal
            eventName={selectedEvent}
            seasonName={season.name}
            chapterNumber={season.chapter}
            seasonNumber={season.number}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function calculateSeasonLength(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function formatSeasonDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = calculateSeasonLength(startDate, endDate);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return {
    formattedStart: formatDate(start),
    formattedEnd: formatDate(end),
    duration: diffDays
  };
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-black/20 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <span className="text-lg text-white">{value}</span>
    </div>
  );
}