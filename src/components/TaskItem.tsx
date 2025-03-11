
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
  CalendarClock, MessageSquareText, Edit, Check, X
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    category: task.category,
    priority: task.priority,
    dueDate: task.dueDate
  });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedTask({
      title: task.title,
      description: task.description || "",
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate
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
      dueDate: editedTask.dueDate
    });
    
    setIsEditing(false);
    toast.success("Task updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-lg transition-all animate-slideIn overflow-hidden">
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full p-2 text-base font-medium border border-gray-200 rounded-md"
          />
          
          <Textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            placeholder="Add description (optional)"
            className="resize-none h-20 border-gray-200"
          />
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Select 
                value={editedTask.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="border-gray-200 h-9">
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
                <SelectTrigger className="border-gray-200 h-9">
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
                      "w-full border-gray-200 justify-start text-left font-normal h-9",
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
                      toast.success("Task deleted");
                    }}
                    className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {task.description && (
                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg flex items-start gap-2">
                  <MessageSquareText className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
                  <p>{task.description}</p>
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
                  <Tag size={12} />
                  <span className="capitalize">{task.category}</span>
                </div>
                
                <div className={`flex items-center gap-1 text-xs ${priorityColors[task.priority]}`}>
                  <Flag size={12} />
                  <span className="capitalize">{task.priority}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
