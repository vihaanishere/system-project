export function getXpForLevel(level: number): number {
    return Math.floor(100 * Math.pow(level, 1.5));
}
export function caclulateLevelFromXP(totalXp: number): number {
    let level = 1;
    let XpRequired = 0;
    while (XpRequired <= totalXp){
        XpRequired += getXpForLevel(level);
        if(XpRequired <= totalXp){
            level++;
        }
    }
    return level;
}
export function getXpProgress(totalXp: number, currentLevel: number) {
    let XpForPreviousLevels = 0;
    for(let i = 1; i < currentLevel; i++){
        XpForPreviousLevels += getXpForLevel(i);
    }
    const XpIntoCurrentLevel = totalXp - XpForPreviousLevels;
    const XpRequiredForLevel = getXpForLevel(currentLevel);
    const percentage = (XpIntoCurrentLevel/XpRequiredForLevel) * 100;
    return{
        current : XpIntoCurrentLevel,
        required : XpRequiredForLevel,
        percentage: Math.min(percentage, 100),
    };
}
export function getRankFromLevel(level: number): string {
    if(level >= 100) return "National Level Hunter"
    if(level >= 80) return "S-Rank Hunter";
    if(level >= 60) return "A-Rank Hunter";
    if(level >= 40) return "B-Rank Hunter";
    if(level >= 25) return "C-Rank Hunter";
    if(level >= 15) return "D-Rank Hunter";
    return "E-Rank Hunter";
}
export function caculateQuestXp(baseDifficulty: string, timeSpent?: number): number {
    const baseXp: Record<string, number> = {
        Easy: 50,
        Medium: 150,
        Hard: 300,
        Epic: 500,
    };
    let xp = baseXp[baseDifficulty] || 100;
    if(timeSpent && timeSpent > 60){
        xp += Math.floor(timeSpent / 60) * 10;
    }
    return xp;
}