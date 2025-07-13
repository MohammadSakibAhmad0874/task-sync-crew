import { Search, Filter, Plus, Users, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TaskHeaderProps {
  onAddTask: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const teamMembers = [
  { id: '1', name: 'Alice Johnson', avatar: '', initials: 'AJ' },
  { id: '2', name: 'Bob Smith', avatar: '', initials: 'BS' },
  { id: '3', name: 'Carol Davis', avatar: '', initials: 'CD' },
  { id: '4', name: 'David Wilson', avatar: '', initials: 'DW' },
];

export function TaskHeader({ onAddTask, searchTerm, onSearchChange }: TaskHeaderProps) {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Title and search */}
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Task Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Collaborate with your team in real-time
              </p>
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right side - Actions and team */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Team:</span>
              <div className="flex -space-x-2">
                {teamMembers.map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <Users className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={onAddTask} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}