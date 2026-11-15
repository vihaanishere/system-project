"use client";
import {useState} from "react";
import { calculateQuestXp } from "@/modules/progression";
type QuestFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editQuest: {
        id: string;
        title:string;
        description: string | null;
        difficulty: string;
        category: string;
        type: string;
        dueDate: Date | null;
    } | null;
};
export default function QuestForm({ isOpen, onClose, onSuccess, editQuest}:QuestFormProps){
    const [formData, setFormData] = useState({
        title: editQuest?.title || "",
        description: editQuest?.description || "",
        difficulty: editQuest?.difficulty || "Medium",
        category: editQuest?.category || "",
        type: editQuest?.type || "DAILY",
        dueDate: editQuest?.dueDate ? new Date(editQuest.dueDate).toISOString().split('T')[0]:"",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const categories = ["DSA", "Full-Stack", "College", "Gym", "Personal", "Reading", "Other"];
    const difficulties = ["Easy", "Medium", "Hard", "Epic"];
    const types = ["DAILY", "WEEKLY", "MAIN", "SIDE", "MILESTONE"];
    const xpPreview = calculateQuestXp(formData.difficulty);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try{
            const url = editQuest ? `/api/quest/${editQuest.id}/update` : "/api/quest/create";
            const method = editQuest ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success){
                onSuccess();
                onClose();
                if(!editQuest){
                    setFormData({
                        title: "",
                        description: "",
                        difficulty: "Medium",
                        category: "",
                        type: "DAILY",
                        dueDate: "",
                    });
                }
            } else{
                setError(data.error || "Failed to save quest");
            }
        }catch(err){
            console.error("Error saving quest: ", err);
            setError("Failed to save quest");
        } finally{
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editQuest ? "Edit Quest" : "Create New Quest"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-gray-300 mb-2">
                Quest Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Complete 5 LeetCode problems"
                required
                minLength={3}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Focus on arrays and strings"
                rows={3}
              />
            </div>

            {/* Difficulty and XP Preview */}
            <div>
              <label className="block text-gray-300 mb-2">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: diff })}
                    className={`flex-1 py-2 rounded font-semibold transition-colors ${
                      formData.difficulty === diff
                        ? diff === "Easy"
                          ? "bg-green-600 text-white"
                          : diff === "Medium"
                          ? "bg-yellow-600 text-white"
                          : diff === "Hard"
                          ? "bg-red-600 text-white"
                          : "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
              <p className="text-sm text-blue-400 mt-2">XP Reward: +{xpPreview} XP</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                list="categories"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="DSA, Full-Stack, College, Gym..."
                required
              />
              <datalist id="categories">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-300 mb-2">Quest Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-gray-300 mb-2">Due Date (Optional)</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded font-semibold transition-colors"
              >
                {loading ? "Saving..." : editQuest ? "Update Quest" : "Create Quest"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}