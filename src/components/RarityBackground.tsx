import { motion } from 'framer-motion';

interface RarityBackgroundProps {
  rarityColor: string;
}

export default function RarityBackground({ rarityColor }: RarityBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Base color layer */}
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />

      {/* Subtle base gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(145deg, ${rarityColor}70, transparent 80%)`
        }}
      />

      {/* Animated overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${rarityColor}60 0%, transparent 70%)`
        }}
      />

      {/* Floating particles */}
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ 
          y: [-20, 0, -20],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent, ${rarityColor}40 50%, transparent)`
        }}
      />
    </div>
  );
} 