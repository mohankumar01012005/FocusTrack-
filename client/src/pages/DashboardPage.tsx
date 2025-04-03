
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTask, TaskProvider, Task } from "@/context/task-context";
import { TaskCard } from "@/components/task-card";
import { TaskFormDialog } from "@/components/task-form-dialog";
import { TaskSidebar } from "@/components/task-sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { CheckCircle, LogOut, Plus } from "lucide-react";

const TaskDashboardInner = () => {
  const { filteredTasks, filter, reorderTasks } = useTask();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleOpenTaskModal = (task?: Task) => {
    if (task) {
      setTaskToEdit(task);
    } else {
      setTaskToEdit(null);
    }
    setIsDialogOpen(true);
  };
  
  const handleTaskReorder = (newOrder: Task[]) => {
    // Find indices in the original filteredTasks array
    const startIndex = filteredTasks.findIndex(t => t.id === newOrder[0].id);
    const endIndex = 0;
    
    reorderTasks(startIndex, endIndex);
  };
  
  const getFilterTitle = () => {
    switch (filter) {
      case "all": return "All Tasks";
      case "completed": return "Completed Tasks";
      case "pending": return "Pending Tasks";
      default: return "Tasks";
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <TaskSidebar 
        openAddTaskModal={() => handleOpenTaskModal()} 
        isCollapsed={sidebarCollapsed}
        toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b p-4 flex justify-between items-center bg-background">
          <div className="flex items-center">
            <div className="mr-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <h1 className="text-lg font-medium">{getFilterTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
              asChild
            >
              <Link to="/">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-sm max-w-md">
                  {filter === "all" 
                    ? "You haven't created any tasks yet. Start by adding a new task."
                    : filter === "completed"
                      ? "You haven't completed any tasks yet."
                      : "You don't have any pending tasks."}
                </p>
                {filter === "all" && (
                  <Button 
                    onClick={() => handleOpenTaskModal()} 
                    className="mt-4"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add New Task
                  </Button>
                )}
              </motion.div>
            </div>
          ) : (
            <Reorder.Group 
              axis="y" 
              values={filteredTasks} 
              onReorder={handleTaskReorder}
              className="space-y-4"
            >
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <Reorder.Item 
                    key={task.id} 
                    value={task}
                    className="cursor-move"
                  >
                    <TaskCard 
                      task={task} 
                      index={index} 
                      openEditModal={handleOpenTaskModal}
                    />
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}
        </div>
        
        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-6 right-6"
        >
          <Button 
            onClick={() => handleOpenTaskModal()} 
            size="lg" 
            className="rounded-full shadow-lg h-14 w-14"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
      
      <TaskFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

const DashboardPage = () => {
  return (
    <TaskProvider>
      <TaskDashboardInner />
    </TaskProvider>
  );
};

export default DashboardPage;
