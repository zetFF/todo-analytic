
import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { CheckCircle2, Circle, Plus, Trash2, X } from "lucide-react";

interface SubtaskListProps {
  task: Task;
}

const SubtaskList = ({ task }: SubtaskListProps) => {
  const { addSubtask, toggleSubtask, deleteSubtask } = useTaskContext();
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    
    addSubtask(task.id, newSubtaskTitle);
    setNewSubtaskTitle("");
    setIsAdding(false);
  };

  return (
    <div className="mt-4 space-y-2">
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Subtasks</h4>
          <ul className="space-y-1">
            {task.subtasks.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => toggleSubtask(task.id, subtask.id)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {subtask.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </button>
                <span className={subtask.completed ? "line-through text-gray-400" : "text-gray-600"}>
                  {subtask.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto text-gray-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => deleteSubtask(task.id, subtask.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAdding ? (
        <div className="flex items-center gap-2 mt-2">
          <Input
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            placeholder="Add subtask..."
            className="text-xs h-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddSubtask();
            }}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
            onClick={handleAddSubtask}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-50 hover:text-red-500"
            onClick={() => setIsAdding(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          className="text-xs h-7 text-gray-500 hover:text-primary hover:bg-primary/5"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add subtask
        </Button>
      )}
    </div>
  );
};

export default SubtaskList;
