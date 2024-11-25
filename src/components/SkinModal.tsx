import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Star, Tag, Package, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchSkinDetails } from '../utils/api';
import RarityBackground from './RarityBackground';
import RarityBadge from './RarityBadge';

interface SkinModalProps {
  skinName: string;
  onClose: () => void;
}

export default function SkinModal({ skinName, onClose }: SkinModalProps) {
  const [skinData, setSkinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showStyles, setShowStyles] = useState(false);

  const getRarityColor = (rarity: string) => {
    const rarityColors = {
      common: '#8d8d8d',
      uncommon: '#1e8c3d',
      rare: '#2499ef',
      epic: '#9d4dbb',
      legendary: '#ea8d23',
      marvel: '#ed1d24',
      dc: '#0476f4',
      icon: '#0c82e4',
      gaminglegends: '#7837cc',
      starwars: '#FFE81F',
      default: '#1e8c3d'
    };
    return rarityColors[rarity.toLowerCase().replace(/\s+/g, '')] || rarityColors.default;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchSkinDetails(skinName)
      .then(data => {
        if (data && data.type?.value === 'backpack') {
          setSkinData(null);
        } else {
          setSkinData(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching skin details:', error);
        setSkinData(null);
        setLoading(false);
      });
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [skinName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
      onClick={onClose}
    >
      <div className="h-screen w-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-transparent w-full max-w-[1400px] rounded-3xl border border-white/10 overflow-hidden relative"
          onClick={e => e.stopPropagation()}
        >
          {skinData && (
            <RarityBackground 
              rarityColor={getRarityColor(skinData.rarity.value)} 
            />
          )}
          {loading ? (
            <div className="h-[800px] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : skinData ? (
            <div className="grid grid-cols-[1.2fr_1fr] h-[800px] relative z-10">
              {/* Left column */}
              <div className="h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 will-change-scroll">
                <div className="p-10 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={onClose}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      <X className="w-6 h-6 text-white/80" />
                    </button>
                    <RarityBadge 
                      rarity={skinData.rarity.displayValue}
                      rarityColor={getRarityColor(skinData.rarity.value)}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-8">
                      <h1 className="text-5xl font-bold text-white mb-4">{skinData.name}</h1>
                      <p className="text-lg text-white/70 leading-relaxed">{skinData.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <InfoCard
                        icon={<Calendar className="w-5 h-5 text-blue-400" />}
                        label="Release Date"
                        value={new Date(skinData.added).toLocaleDateString()}
                      />
                      <InfoCard
                        icon={<Tag className="w-5 h-5" style={{ color: getRarityColor(skinData.rarity.value) }} />}
                        label="Type"
                        value={skinData.type.displayValue}
                      />
                    </div>

                    {skinData.set?.value && (
                      <div className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5" style={{ color: getRarityColor(skinData.rarity.value) }} />
                            <h2 className="text-xl font-semibold text-white">Cosmetic Set</h2>
                          </div>
                          <span className="text-white/60">{skinData.set.value}</span>
                        </div>
                      </div>
                    )}

                    {skinData.variants && skinData.variants.length > 0 && (
                      <div className="mt-8 p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                        <button 
                          onClick={() => setShowStyles(prev => !prev)}
                          className="w-full flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Package className="w-5 h-5" style={{ color: getRarityColor(skinData.rarity.value) }} />
                            <h2 className="text-xl font-semibold text-white">Edit Styles</h2>
                          </div>
                          <motion.div
                            animate={{ rotate: showStyles ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-white/60" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {showStyles && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-6">
                                {skinData.variants.map((variant: any) => (
                                  <div key={variant.channel} className="space-y-2">
                                    <h3 className="text-white/80 font-medium capitalize">{variant.channel}</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                      {variant.options.map((option: any) => (
                                        <div 
                                          key={option.tag} 
                                          className="aspect-square rounded-xl overflow-hidden border border-white/10 group relative"
                                        >
                                          <img 
                                            src={option.image} 
                                            alt={option.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                            <span className="text-xs text-white/90">{option.name}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="border-l border-white/10 h-[800px]">
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 will-change-scroll">
                  <div className="p-10 space-y-8">
                    {skinData.images.featured && (
                      <div className="space-y-3">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                          <img 
                            src={skinData.images.featured} 
                            alt={`${skinData.name} Featured`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-center text-white/60 text-sm">Featured View</p>
                      </div>
                    )}
                    {skinData.images.icon && (
                      <div className="space-y-3">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                          <img 
                            src={skinData.images.icon} 
                            alt={`${skinData.name} Icon`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-center text-white/60 text-sm">Icon View</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[800px] flex items-center justify-center">
              <div className="text-center">
                <Package className="w-12 h-12 text-blue-400/80 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white/90 mb-2">Skin Not Found</h2>
                <p className="text-white/60 mb-6">Unable to load details for this skin.</p>
                <button 
                  onClick={onClose} 
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-2xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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