import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Sparkles, Star } from 'lucide-react';
import { Season } from '../types/season';

interface TimelineEvent {
  date: Date;
  type: 'season_start' | 'season_end' | 'live_event' | 'crucial_moment';
  title: string;
  description?: string;
  season: Season;
  image?: string;
  locations?: string[];
  skins?: string[];
}

interface TimelineEventProps {
  event: TimelineEvent;
  position: 'left' | 'right';
  onClick: (type: 'season' | 'event') => void;
}

export default function TimelineEvent({ event, position, onClick }: TimelineEventProps) {
  const handleClick = () => {
    if (event.type === 'season_start') {
      onClick('season');
    } else {
      onClick('event');
    }
  };

  const eventStyles = {
    season_start: { icon: Calendar, color: 'blue', gradient: 'from-blue-500/20 to-blue-900/20' },
    live_event: { icon: Sparkles, color: 'green', gradient: 'from-green-500/20 to-green-900/20' },
    crucial_moment: { icon: Star, color: 'yellow', gradient: 'from-yellow-500/20 to-yellow-900/20' }
  }[event.type];

  const Icon = eventStyles.icon;

  const getEventImage = () => {
    if (event.type === 'season_start') {
      return event.season.coverImage;
    } else if (event.type === 'live_event') {
      const liveEvent = event.season.liveEvents.find(e => e.title === event.title);
      return liveEvent?.image;
    } else if (event.type === 'crucial_moment') {
      const crucialMoment = event.season.crucialMoments.find(e => e.title === event.title);
      return crucialMoment?.image;
    }
    return null;
  };

  const eventImage = getEventImage();

  return (
    <div className="group relative">
      <motion.div
        initial={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`w-[calc(50%-40px)] ${position === 'right' ? 'ml-[calc(50%+40px)]' : ''}`}
      >
        <div 
          onClick={handleClick}
          className="relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
        >
          <div className="relative h-48 overflow-hidden">
            {eventImage ? (
              <motion.img 
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={eventImage} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${eventStyles.gradient}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm mb-3">
              <Icon className={`w-4 h-4 text-${eventStyles.color}-400`} />
              <span className="text-white/60">
                {event.date.toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
            
            {event.description && (
              <p className="text-white/60 text-sm line-clamp-2 mb-4">
                {event.description}
              </p>
            )}

            {event.type === 'season_start' && (
              <div className="flex items-center gap-4 text-sm text-white/40">
                {event.locations && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.locations.length} Locations</span>
                  </div>
                )}
                {event.skins && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{event.skins.length} Skins</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3">
        <div className={`w-full h-full rounded-full bg-${eventStyles.color}-400/50 ring-4 ring-${eventStyles.color}-400/20`} />
      </div>
    </div>
  );
}