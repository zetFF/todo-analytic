
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Plus, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Tasks = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      completed: false,
      category: "inbox",
    });
    setNewTaskTitle("");
    toast.success("Task added successfully");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-slideIn"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                deleteTask(task.id);
                toast.success("Task deleted");
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
