interface EventWithDate {
  title: string;
  date: string; // ISO date string
}

export interface Season {
  chapter: number;
  number: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  battlePassSkins: string[];
  liveEvents: EventWithDate[];
  crucialMoments: EventWithDate[];
  keyLocations: string[];
}