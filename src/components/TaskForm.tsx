
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Plus, Palette } from "lucide-react";
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

const taskColors = [
  { value: "default", label: "Default", color: "bg-white" },
  { value: "blue", label: "Blue", color: "bg-blue-50" },
  { value: "green", label: "Green", color: "bg-green-50" },
  { value: "purple", label: "Purple", color: "bg-purple-50" },
  { value: "amber", label: "Amber", color: "bg-amber-50" },
  { value: "pink", label: "Pink", color: "bg-pink-50" },
  { value: "teal", label: "Teal", color: "bg-teal-50" }
];

const TaskForm = () => {
  const { addTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "inbox",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: undefined as Date | undefined,
    color: "default"
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addTask({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      completed: false,
      dueDate: formData.dueDate,
      color: formData.color !== "default" ? formData.color : undefined,
      subtasks: [],
      tags: []
    });

    setFormData({
      title: "",
      description: "",
      category: "inbox",
      priority: "medium",
      dueDate: undefined,
      color: "default"
    });
    
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-card transition-all">
      <div className="space-y-2">
        <Input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onFocus={() => setIsExpanded(true)}
          placeholder="What do you need to do?"
          className="text-base border-gray-200"
        />
      </div>

      {isExpanded && (
        <>
          <div className="space-y-2">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add description (optional)"
              className="resize-none h-20 border-gray-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category" className="border-gray-200">
                  <SelectValue placeholder="Select category" />
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

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleSelectChange("priority", value as "low" | "medium" | "high")}
              >
                <SelectTrigger id="priority" className="border-gray-200">
                  <SelectValue placeholder="Select priority" />
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

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full border-gray-200 justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={handleDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Card Color</Label>
              <Select 
                value={formData.color} 
                onValueChange={(value) => handleSelectChange("color", value)}
              >
                <SelectTrigger id="color" className="border-gray-200">
                  <SelectValue placeholder="Select color" />
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
          </div>
        </>
      )}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all">
        <Plus className="mr-2 h-4 w-4" />
        {isExpanded ? "Add Task" : "New Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
