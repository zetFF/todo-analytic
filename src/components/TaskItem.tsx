
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/task";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { 
  CheckCircle2, Circle, Trash2, Clock, Tag, Flag, 
  CalendarClock, MessageSquareText, Edit, Check, X, 
  ChevronDown, ChevronUp, Star, ListChecks, Palette
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SubtaskList from "./SubtaskList";
import TagList from "./TagList";

const categories = [
  { value: "inbox", label: "Inbox" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" }
];

const priorities = [
  { value: "low", label: "Low", color: "bg-blue-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-red-500" }
];

const taskColors = [
  { value: "default", label: "Default", color: "bg-white" },
  { value: "blue", label: "Blue", color: "bg-blue-50" },
  { value: "green", label: "Green", color: "bg-green-50" },
  { value: "purple", label: "Purple", color: "bg-purple-50" },
  { value: "amber", label: "Amber", color: "bg-amber-50" },
  { value: "pink", label: "Pink", color: "bg-pink-50" },
  { value: "teal", label: "Teal", color: "bg-teal-50" }
];

const priorityColors = {
  low: "text-blue-500",
  medium: "text-yellow-500",
  high: "text-red-500"
};

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask, updateTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    category: task.category,
    priority: task.priority,
    dueDate: task.dueDate,
    color: task.color || "default"
  });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedTask({
      title: task.title,
      description: task.description || "",
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
      color: task.color || "default"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setEditedTask(prev => ({ ...prev, dueDate: date }));
  };

  const handleSave = () => {
    if (!editedTask.title.trim()) return;
    
    updateTask(task.id, {
      title: editedTask.title,
      description: editedTask.description,
      category: editedTask.category,
      priority: editedTask.priority as "low" | "medium" | "high",
      dueDate: editedTask.dueDate,
      color: editedTask.color
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getTaskCardBgColor = () => {
    if (!task.color || task.color === "default") return "bg-white";
    switch (task.color) {
      case "blue": return "bg-blue-50";
      case "green": return "bg-green-50";
      case "purple": return "bg-purple-50";
      case "amber": return "bg-amber-50";
      case "pink": return "bg-pink-50";
      case "teal": return "bg-teal-50";
      default: return "bg-white";
    }
  };

  return (
    <div className={`rounded-xl border border-gray-100 shadow-card hover:shadow-lg transition-all animate-slideIn overflow-hidden ${getTaskCardBgColor()}`}>
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full p-2 text-base font-medium border border-gray-200 rounded-md bg-white"
          />
          
          <Textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            placeholder="Add description (optional)"
            className="resize-none h-20 border-gray-200 bg-white"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <Select 
                value={editedTask.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="border-gray-200 h-9 bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select 
                value={editedTask.priority} 
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger className="border-gray-200 h-9 bg-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${priority.color} mr-2`}></div>
                        {priority.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full border-gray-200 justify-start text-left font-normal h-9 bg-white",
                      !editedTask.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    {editedTask.dueDate ? format(editedTask.dueDate, "MM/dd/yy") : <span>Due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editedTask.dueDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Select 
              value={editedTask.color} 
              onValueChange={(value) => handleSelectChange("color", value)}
            >
              <SelectTrigger className="border-gray-200 h-9 bg-white">
                <SelectValue placeholder="Card Color" />
              </SelectTrigger>
              <SelectContent>
                {taskColors.map(color => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${color.color} border border-gray-200 mr-2`}></div>
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCancel}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="flex items-center"
            >
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center gap-3">
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
              <div className="flex items-start justify-between">
                <span
                  className={`block font-medium text-base ${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-primary/10"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleEdit}
                    className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-primary/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tags */}
              <TagList task={task} />
              
              {/* Details section - conditionally rendered based on isExpanded */}
              {isExpanded && (
                <div className="mt-3 space-y-3">
                  {task.description && (
                    <div className="text-sm text-gray-600 bg-white/80 p-3 rounded-lg flex items-start gap-2 border border-gray-100">
                      <MessageSquareText className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
                      <p>{task.description}</p>
                    </div>
                  )}
                  
                  {/* Subtasks */}
                  <SubtaskList task={task} />
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{format(task.createdAt, "MMM d, yyyy")}</span>
                </div>
                
                {task.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CalendarClock size={12} />
                    <span>Due: {format(task.dueDate, "MMM d, yyyy")}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <ListChecks size={12} />
                  <span className="capitalize">{task.category}</span>
                </div>
                
                <div className={`flex items-center gap-1 text-xs ${priorityColors[task.priority]}`}>
                  <Flag size={12} />
                  <span className="capitalize">{task.priority}</span>
                </div>

                {task.subtasks && task.subtasks.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CheckCircle2 size={12} />
                    <span>
                      {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
