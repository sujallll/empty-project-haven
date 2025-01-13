import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="max-w-2xl w-full p-8 space-y-6">
        <div className="space-y-2 text-center">
          <Github className="w-12 h-12 mx-auto text-gray-700" />
          <h1 className="text-3xl font-bold tracking-tighter">Import Your GitHub Project</h1>
          <p className="text-gray-500">
            This space is ready for your GitHub project. Follow these steps to get started:
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Steps to Import:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Clone your GitHub repository locally</li>
              <li>Copy your project files into this directory</li>
              <li>Update dependencies in package.json</li>
              <li>Run npm install to set up dependencies</li>
              <li>Start the development server with npm run dev</li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">
              Tip: Make sure to check your project's compatibility with the current setup and resolve any dependency conflicts.
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <Github className="w-4 h-4" />
            Go to GitHub
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;