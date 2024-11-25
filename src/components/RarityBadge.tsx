import { motion } from 'framer-motion';

interface RarityBadgeProps {
  rarity: string;
  rarityColor: string;
}

export default function RarityBadge({ rarity, rarityColor }: RarityBadgeProps) {
  return (
    <motion.div 
      className="px-4 py-2 rounded-xl border relative overflow-hidden"
      style={{ 
        borderColor: `${rarityColor}33`,
        backgroundColor: `${rarityColor}11`
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `linear-gradient(45deg, ${rarityColor}00 0%, ${rarityColor}20 50%, ${rarityColor}00 100%)`,
            `linear-gradient(45deg, ${rarityColor}00 100%, ${rarityColor}20 150%, ${rarityColor}00 200%)`
          ],
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <span style={{ color: rarityColor }}>
        {rarity}
      </span>
    </motion.div>
  );
} 