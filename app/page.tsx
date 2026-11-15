"use client";
import {useEffect, useState} from "react";
import QuestForm from "@/components/QuestForm";

type Attribute = {
  id: string;
  name: string;
  value: number;
  category: string;
};
type Quest = {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  xpReward: number;
  category: string;
  status: string;
  type: string;
}
type Player = {
  id:string;
  name: string;
  level: string;
  totalXp: number;
  rank: string;
  attributes: Attribute[];
  quests: Quest[];
  xpProgress: {
    current: number;
    required: number;
    percentage: number;
  };
};
export default function Dashboard(){
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState<string | null>(null);
  const [showQuestForm, setShowQuestForm] = useState(false);
  const [editingQuest, setEditingQuest] = useState<any>(null);
  const fetchPlayer = async () => {
    try {
      const res = await fetch("/api/player");
      const data = await res.json();
      setPlayer(data.player);
    } catch (error){
      console.error("Failed to fetch player: ", error);
    } finally{
      setLoading(false);
    }
  };
  const completeQuest = async (questId: string) => {
    setCompleting(questId);
    try {
      const res = await fetch(`/api/quest/${questId}/complete`, {
        method: "POST",
      });
      const data = await res.json();
      if(data.success){
        alert(
           `✅ Quest Complete!\n+${data.xpAwarded} XP${
            data.leveledUp ? `\n🎉 LEVEL UP! Now level ${data.newLevel}` : ""
           }`
        );
        fetchPlayer();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error){
      console.error("Failed to complete quest: ", error);
      alert("Failed to complete quest");
    } finally{
      setCompleting(null);
    }
  };
  useEffect(() => {
    fetchPlayer();
  }, []);
  if(loading) {
    return (
      <div className="min-h-screen bg-grey-900 text-white flex items-center justify-center">
        <p className = "text-xl">Loading SYSTEM...</p>
      </div>
    );
  }
  if (!player){
    return (
      <div className="min-h-screen bg-grey-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No player found</p>
          <p className="text-gray-400">Run: npx primsa db seed</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SYSTEM</h1>
          <p className="text-gray-400">Your Personal Progression Interface</p>
        </header>

        {/* Player Stats */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold">{player.name}</h2>
              <p className="text-blue-400 text-lg">{player.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-blue-400">
                Level {player.level}
              </p>
              <p className="text-gray-400 text-sm">
                {player.totalXp.toLocaleString()} Total XP
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>XP Progress</span>
              <span>
                {Math.floor(player.xpProgress.current)} /{" "}
                {player.xpProgress.required}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${player.xpProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* Attributes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Attributes</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {player.attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="bg-gray-700 rounded p-3 text-center"
                >
                  <p className="text-gray-400 text-sm">{attr.name}</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Quests */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Active Quests</h3>
            <button
              onClick={() => {
                setEditingQuest(null);
                setShowQuestForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg font-semibold transition-all">
                + New Quest
            </button>
          </div>
          {player.quests.length === 0 ? (
            <p className="text-gray-400">No active quests. Time to create some!</p>
          ) : (
            <div className="space-y-4">
              {player.quests.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold">{quest.title}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          quest.difficulty === "Easy"
                            ? "bg-green-600"
                            : quest.difficulty === "Medium"
                            ? "bg-yellow-600"
                            : quest.difficulty === "Hard"
                            ? "bg-red-600"
                            : "bg-purple-600"
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-600">
                        {quest.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{quest.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-blue-400 font-bold">
                        +{quest.xpReward} XP
                      </p>
                      <p className="text-gray-500 text-xs">{quest.type}</p>
                    </div>
                    <button
                      onClick={() => completeQuest(quest.id)}
                      disabled={completing === quest.id}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded font-semibold transition-colors"
                    >
                      {completing === quest.id ? "..." : "Complete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quest Form Modal */}
        <QuestForm
          isOpen={showQuestForm}
          onClose={() => setShowQuestForm(false)}
          onSuccess={() => {
            fetchPlayer();
            alert("Quest saved successfully!");
          }}
          editQuest={editingQuest}
        />
      </div>
    </div>
  );
}