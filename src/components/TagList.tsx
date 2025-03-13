
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { Plus, Tag, X } from "lucide-react";

interface TagListProps {
  task: Task;
}

const TagList = ({ task }: TagListProps) => {
  const { addTag, removeTag } = useTaskContext();
  const [newTag, setNewTag] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    addTag(task.id, newTag.trim());
    setNewTag("");
    setIsAdding(false);
  };

  const tagColors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ];

  const getTagColor = (tag: string) => {
    // Create a consistent hash for the tag string
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Use the hash to pick a color from our array
    const index = Math.abs(hash) % tagColors.length;
    return tagColors[index];
  };

  return (
    <div className="mt-2">
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag) => (
            <div 
              key={tag} 
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
            >
              <Tag className="h-3 w-3" />
              <span className="font-sans">{tag}</span>
              <button
                className="hover:text-red-500 ml-1"
                onClick={() => removeTag(task.id, tag)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="flex items-center gap-2 mt-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag..."
            className="text-xs font-sans h-7"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTag();
            }}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
            onClick={handleAddTag}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-red-50 hover:text-red-500"
            onClick={() => setIsAdding(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          className="text-xs h-6 font-medium text-gray-500 hover:text-primary hover:bg-primary/5"
          onClick={() => setIsAdding(true)}
        >
          <Tag className="h-3 w-3 mr-1" />
          Add tag
        </Button>
      )}
    </div>
  );
};

export default TagList;
