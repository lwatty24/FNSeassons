import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { Season } from '../types/season';
import { colors } from '../utils/colors';
import EventsDisplay from './EventsDisplay';
import EventsInfo from './EventsInfo';

interface SeasonCardProps {
  season: Season;
  onClick: () => void;
}

export function SeasonCard({ season, onClick }: SeasonCardProps) {
  const isOGSeason = season.number === "OG";
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[rgba(30,30,30,0.8)] to-[rgba(20,20,20,0.8)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] shadow-lg"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={season.image} 
          alt={`${isOGSeason ? 'Fortnite OG' : `Season ${season.number}`}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-400">Chapter {season.chapter}</span>
            {!isOGSeason && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-sm font-medium text-blue-400">Season {season.number}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-1">{season.name}</h2>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">{season.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <InfoItem
              icon={<Calendar className="w-4 h-4 text-blue-400" />}
              label={new Date(season.startDate).toLocaleDateString()}
            />
            <InfoItem
              icon={<MapPin className="w-4 h-4 text-purple-400" />}
              label={season.keyLocations?.[0] || "No Locations"}
            />
          </div>
          <div className="space-y-4">
            <InfoItem
              icon={<Users className="w-4 h-4 text-pink-400" />}
              label={`${season.battlePassSkins.length} Skins`}
            />
            <InfoItem
              icon={
                season.liveEvents?.length > 0 
                  ? <Sparkles className="w-4 h-4 text-green-400" />
                  : <Star className="w-4 h-4 text-yellow-400" />
              }
              label={
                season.liveEvents?.length > 0 
                  ? `${season.liveEvents.length} Live Events`
                  : season.crucialMoments?.length > 0 
                    ? `${season.crucialMoments.length} Crucial Moments`
                    : "No Events"
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function InfoItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-xs text-gray-400 truncate">{label}</span>
    </div>
  );
}

interface EventsListProps {
  majorEvents: string[];
  miniEvents: string[];
}

function EventsList({ majorEvents, miniEvents }: EventsListProps) {
  const totalEvents = majorEvents.length + miniEvents.length;
  if (totalEvents === 0) return <span className="text-gray-400">No events</span>;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Events</span>
        <span className="text-xs text-gray-400">{totalEvents} total</span>
      </div>
      <div className="space-y-1">
        {majorEvents.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-green-400" />
            <span className="text-sm text-green-400">{majorEvents[0]}</span>
          </div>
        )}
        {miniEvents.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-sm text-yellow-400">{miniEvents[0]}</span>
          </div>
        )}
        {totalEvents > 2 && (
          <span className="text-xs text-gray-400">
            +{totalEvents - (majorEvents.length > 0 ? 1 : 0) - (miniEvents.length > 0 ? 1 : 0)} more
          </span>
        )}
      </div>
    </div>
  );
}

export default SeasonCard;