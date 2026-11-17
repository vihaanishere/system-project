type AttributeGain = {
    attributeName: string;
    gain: number;
};
export function getAttributeGains(
    category: string,
    difficulty: string
): AttributeGain[]{
    const gainAmount = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
        Epic: 5,
    }[difficulty] || 2;
    const categoryMap: Record<string, string[]> = {
    DSA: ["Intelligence"],
    "Full-Stack": ["Intelligence", "Creativity"],
    College: ["Intelligence", "Discipline"],
    Gym: ["Strength", "Vitality"],
    "Personal": ["Creativity", "Discipline"],
    Reading: ["Intelligence", "Discipline"],
  };
  const attributes = categoryMap[category] || ["Discipline"];
  return attributes.map((attributeName) => ({
    attributeName,
    gain: gainAmount,
  }));
}