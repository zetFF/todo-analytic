
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Layout, BarChart2, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fadeIn">
        <h1 className="heading-gradient">Modern Task Workspace</h1>
        <p className="lead text-balance md:text-pretty mx-auto max-w-3xl">
          A beautifully designed productivity tool to manage your tasks, track your progress, and boost your efficiency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl">Task Management</CardTitle>
              <CardDescription className="subtle">
                Organize and prioritize your tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create, edit, and track your tasks with intuitive tools for managing priorities, categories, and deadlines.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/tasks">
                <Button>Manage Tasks</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <BarChart2 className="h-10 w-10 text-secondary" />
              </div>
              <CardTitle className="text-xl">Analytics</CardTitle>
              <CardDescription className="subtle">
                Track your productivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualize your progress with comprehensive charts and statistics to identify patterns and improve efficiency.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/analytics">
                <Button variant="secondary">View Analytics</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Settings className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="text-xl">Settings</CardTitle>
              <CardDescription className="subtle">
                Customize your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tailor your experience by adjusting preferences, categories, and visual settings to match your workflow.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/settings">
                <Button variant="outline">Configure</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <blockquote className="mx-auto max-w-2xl px-6 py-4 border-l-4 bg-muted/50 rounded-r-md">
          <p className="italic text-muted-foreground">
            "The key is not to prioritize what's on your schedule, but to schedule your priorities."
          </p>
          <footer className="mt-2 text-sm font-medium">— Stephen Covey</footer>
        </blockquote>

        <div className="mt-10">
          <code className="text-sm">Modern Workspace • Version 1.0</code>
        </div>
      </div>
    </div>
  );
};

export default Index;
