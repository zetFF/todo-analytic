
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Plus, CheckCircle2, Circle, Trash2, Clock, Tag } from "lucide-react";
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
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tasks</h1>
        <p className="text-gray-500">Manage your tasks efficiently</p>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-3 bg-white p-1 rounded-lg shadow-card border border-gray-100">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        />
        <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </form>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Add your first task using the form above and start being productive!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-lg transition-all animate-slideIn"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-gray-400 hover:text-primary transition-all"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                <div className="flex-1">
                  <span
                    className={`block font-medium ${
                      task.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Tag size={12} />
                      <span>{task.category}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  deleteTask(task.id);
                  toast.success("Task deleted");
                }}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
