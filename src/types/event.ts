export type Event = {
  description: string;
  date: string;
  type: "Live Event" | "Seasonal Event" | "Collaboration" | "Game Mode Launch" | "Map Change" | "Limited Time" | "Season Launch";
  image: string;
  source: string;
} 