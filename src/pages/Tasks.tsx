
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronDown, Filter, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Tasks = () => {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "createdAt">("createdAt");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = filterCategory ? task.category === filterCategory : true;
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    const matchesCompleted = showCompleted ? true : !task.completed;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompleted;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.getTime() - b.dueDate.getTime();
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
      // Default sort by createdAt (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const categories = Array.from(new Set(tasks.map(task => task.category)));
  const priorities = ["low", "medium", "high"];

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    high: tasks.filter(task => task.priority === "high" && !task.completed).length
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Workspace</h1>
        <p className="text-gray-500">Organize, manage, and track your tasks efficiently</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Total Tasks</h3>
            <div className="w-8 h-8 bg-primary/10 text-primary flex items-center justify-center rounded-full">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Completed</h3>
            <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">Pending</h3>
            <div className="w-8 h-8 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm">High Priority</h3>
            <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.high}</p>
        </div>
      </div>

      <TaskForm />

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-white border-gray-200"
            />
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4 p-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={filterCategory === null ? "default" : "outline"}
                        onClick={() => setFilterCategory(null)}
                        className="h-8"
                      >
                        All
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
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Priority</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={filterPriority === null ? "default" : "outline"}
                        onClick={() => setFilterPriority(null)}
                        className="h-8"
                      >
                        All
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
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={showCompleted ? "default" : "outline"}
                        onClick={() => setShowCompleted(true)}
                        className="h-8"
                      >
                        All
                      </Button>
                      <Button
                        size="sm"
                        variant={!showCompleted ? "default" : "outline"}
                        onClick={() => setShowCompleted(false)}
                        className="h-8"
                      >
                        Active Only
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Sort By</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={sortBy === "createdAt" ? "default" : "outline"}
                        onClick={() => setSortBy("createdAt")}
                        className="h-8"
                      >
                        Recent
                      </Button>
                      <Button
                        size="sm"
                        variant={sortBy === "dueDate" ? "default" : "outline"}
                        onClick={() => setSortBy("dueDate")}
                        className="h-8"
                      >
                        Due Date
                      </Button>
                      <Button
                        size="sm"
                        variant={sortBy === "priority" ? "default" : "outline"}
                        onClick={() => setSortBy("priority")}
                        className="h-8"
                      >
                        Priority
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
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
            sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
