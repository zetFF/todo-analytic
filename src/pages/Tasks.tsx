
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

const Tasks = () => {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = filterCategory ? task.category === filterCategory : true;
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const categories = Array.from(new Set(tasks.map(task => task.category)));
  const priorities = ["low", "medium", "high"];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tasks</h1>
        <p className="text-gray-500">Manage your tasks efficiently</p>
      </div>

      <TaskForm />

      <div className="space-y-2">
        <Input
          type="search"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border-gray-200"
        />
        
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filterCategory === null ? "default" : "outline"}
            onClick={() => setFilterCategory(null)}
            className="h-8"
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              size="sm"
              variant={filterCategory === category ? "default" : "outline"}
              onClick={() => setFilterCategory(category)}
              className="h-8 capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filterPriority === null ? "default" : "outline"}
            onClick={() => setFilterPriority(null)}
            className="h-8"
          >
            All Priorities
          </Button>
          {priorities.map(priority => (
            <Button
              key={priority}
              size="sm"
              variant={filterPriority === priority ? "default" : "outline"}
              onClick={() => setFilterPriority(priority)}
              className="h-8 capitalize"
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="mx-auto w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-full mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {tasks.length === 0 
                ? "Add your first task using the form above and start being productive!" 
                : "Try changing your search or filters to find what you're looking for."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
