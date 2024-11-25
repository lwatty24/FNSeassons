const FORTNITE_API_BASE = 'https://fortnite-api.com/v2';

const SKIN_NAME_MAPPINGS: Record<string, string> = {
  "Yond3r": "Y0ND3R",
  "Catalyst": "Catalyst (Season X)",
  "The Paradigm (Reality-659)": "The Paradigm",
  "Iron Man": "Tony Stark",
  "Super Man": "Clark Kent",
  "The Mandalorian": "Mandalorian"
};

function normalizeSearchTerm(skinName: string): string {
  // Check mappings first
  if (SKIN_NAME_MAPPINGS[skinName]) {
    return SKIN_NAME_MAPPINGS[skinName];
  }

  // Special handling for names with periods
  if (skinName.includes('.')) {
    return skinName; // Keep the period for cases like "Sgt. Winter"
  }

  // Remove special characters for other cases
  return skinName.replace(/[^\w\s-]/g, '').trim();
}

export async function fetchSkinDetails(skinName: string) {
  try {
    const searchTerm = normalizeSearchTerm(skinName);
    
    // Try exact match first
    const response = await fetch(`${FORTNITE_API_BASE}/cosmetics/br/search?name=${encodeURIComponent(searchTerm)}&type=outfit`);
    const data = await response.json();
    
    if (data.status === 200) {
      return data.data;
    }
    
    // If exact match fails, try contains
    const fuzzyResponse = await fetch(`${FORTNITE_API_BASE}/cosmetics/br/search?name=${encodeURIComponent(searchTerm)}&type=outfit&matchMethod=contains`);
    const fuzzyData = await fuzzyResponse.json();
    
    if (fuzzyData.status === 200) {
      // If multiple results, try to find battle pass variant
      if (Array.isArray(fuzzyData.data)) {
        return fuzzyData.data.find(item => 
          item.introduction?.text?.toLowerCase().includes('battle pass') ||
          item.set?.text?.toLowerCase().includes('battle pass')
        ) || fuzzyData.data[0];
      }
      return fuzzyData.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching skin details:', error);
    return null;
  }
} 