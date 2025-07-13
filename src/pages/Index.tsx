import { useState } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskDialog } from "@/components/TaskDialog";
import { TaskHeader } from "@/components/TaskHeader";
import { Task } from "@/components/TaskCard";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new user onboarding flow',
    description: 'Create wireframes and mockups for the new user registration and onboarding process. Focus on reducing friction and improving conversion rates.',
    priority: 'high',
    status: 'todo',
    assignee: {
      id: '1',
      name: 'Alice Johnson',
      avatar: ''
    },
    dueDate: '2024-12-20',
    tags: ['design', 'ux', 'onboarding'],
    comments: 3
  },
  {
    id: '2',
    title: 'Implement real-time notifications',
    description: 'Add WebSocket support for real-time notifications across the application. Include push notifications for mobile users.',
    priority: 'urgent',
    status: 'in-progress',
    assignee: {
      id: '2',
      name: 'Bob Smith',
      avatar: ''
    },
    dueDate: '2024-12-18',
    tags: ['backend', 'realtime', 'notifications'],
    comments: 7
  },
  {
    id: '3',
    title: 'Update API documentation',
    description: 'Review and update all API endpoint documentation. Ensure examples are current and comprehensive.',
    priority: 'medium',
    status: 'done',
    assignee: {
      id: '3',
      name: 'Carol Davis',
      avatar: ''
    },
    dueDate: '2024-12-15',
    tags: ['documentation', 'api'],
    comments: 2
  },
  {
    id: '4',
    title: 'Optimize database queries',
    description: 'Analyze and optimize slow database queries. Focus on the user dashboard and reporting sections.',
    priority: 'high',
    status: 'todo',
    assignee: {
      id: '4',
      name: 'David Wilson',
      avatar: ''
    },
    dueDate: '2024-12-22',
    tags: ['performance', 'database', 'optimization'],
    comments: 1
  },
  {
    id: '5',
    title: 'Mobile app UI improvements',
    description: 'Polish the mobile app interface based on user feedback. Focus on accessibility and dark mode support.',
    priority: 'medium',
    status: 'in-progress',
    assignee: {
      id: '1',
      name: 'Alice Johnson',
      avatar: ''
    },
    dueDate: '2024-12-25',
    tags: ['mobile', 'ui', 'accessibility'],
    comments: 5
  },
  {
    id: '6',
    title: 'Security audit and fixes',
    description: 'Conduct comprehensive security review and implement necessary fixes. Update dependencies and patch vulnerabilities.',
    priority: 'urgent',
    status: 'todo',
    assignee: {
      id: '2',
      name: 'Bob Smith',
      avatar: ''
    },
    dueDate: '2024-12-19',
    tags: ['security', 'audit', 'critical'],
    comments: 0
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
  };

  const handleTasksUpdate = (newTasks: Task[]) => {
    setTasks(newTasks);
    toast({
      title: "Task moved",
      description: "Task status has been updated.",
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Task has been removed from the board.",
      variant: "destructive"
    });
  };

  const handleAddTask = (status: Task['status'] = 'todo') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      description: 'Click to edit this task...',
      priority: 'medium',
      status,
      assignee: {
        id: '1',
        name: 'Alice Johnson',
        avatar: ''
      },
      dueDate: new Date().toISOString().split('T')[0],
      tags: [],
      comments: 0
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setSelectedTask(newTask);
    setIsDialogOpen(true);
    
    toast({
      title: "New task created",
      description: "A new task has been added to your board.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TaskHeader
        onAddTask={() => handleAddTask()}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="container mx-auto px-6 py-6">
        <KanbanBoard
          tasks={filteredTasks}
          onTaskUpdate={handleTasksUpdate}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
      </div>

      <TaskDialog
        task={selectedTask}
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedTask(null);
        }}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
      />
    </div>
  );
};

export default Index;
