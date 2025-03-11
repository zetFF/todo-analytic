
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, Moon, Sun, User, Mail, Globe } from "lucide-react";

const Settings = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Settings</h1>
        <p className="text-gray-500">Customize your experience</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <h2 className="font-medium text-gray-800">Profile Settings</h2>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <Label htmlFor="name" className="font-medium text-gray-700">Display Name</Label>
              </div>
              <Input 
                id="name" 
                placeholder="Your name" 
                className="border-gray-200 focus-visible:ring-primary" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <Label htmlFor="email" className="font-medium text-gray-700">Email Notifications</Label>
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                className="border-gray-200 focus-visible:ring-primary" 
              />
              <p className="text-sm text-gray-500">We'll email you about your tasks and account updates.</p>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="notifications" className="font-medium text-gray-700">
                    Push Notifications
                  </Label>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked="true"
                  data-state="checked"
                  className="bg-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="pointer-events-none block h-5 w-5 translate-x-5 rounded-full bg-background shadow-lg ring-0 transition-transform" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Receive notifications for task reminders and updates.</p>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="language" className="font-medium text-gray-700">
                    Language
                  </Label>
                </div>
                <select
                  id="language"
                  className="h-10 rounded-md border border-gray-200 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="theme" className="font-medium text-gray-700">
                    Theme
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 rounded-md bg-gray-100 text-gray-700"
                  >
                    <Sun className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
