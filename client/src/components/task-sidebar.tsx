
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTask } from "@/context/task-context";
import { motion } from "framer-motion";
import { CheckCircle, Clock, List } from "lucide-react";

interface TaskSidebarProps {
  openAddTaskModal: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const TaskSidebar = ({ openAddTaskModal, isCollapsed, toggleCollapse }: TaskSidebarProps) => {
  const { filter, setFilter, tasks } = useTask();
  
  // Count tasks
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;
  
  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className="h-full bg-sidebar border-r flex flex-col overflow-hidden"
    >
      <div className="p-4">
        <Button 
          onClick={openAddTaskModal}
          className="w-full"
          size={isCollapsed ? "icon" : "default"}
        >
          {isCollapsed ? "+" : "Add New Task"}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          <motion.li layout>
            <Button
              variant={filter === "all" ? "secondary" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => setFilter("all")}
            >
              <List className="mr-2 h-4 w-4" />
              {!isCollapsed && (
                <span className="flex-1 text-left">All Tasks</span>
              )}
              {!isCollapsed && (
                <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                  {tasks.length}
                </span>
              )}
            </Button>
          </motion.li>
          
          <motion.li layout>
            <Button
              variant={filter === "pending" ? "secondary" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => setFilter("pending")}
            >
              <Clock className="mr-2 h-4 w-4" />
              {!isCollapsed && (
                <span className="flex-1 text-left">Pending</span>
              )}
              {!isCollapsed && (
                <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </Button>
          </motion.li>
          
          <motion.li layout>
            <Button
              variant={filter === "completed" ? "secondary" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => setFilter("completed")}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {!isCollapsed && (
                <span className="flex-1 text-left">Completed</span>
              )}
              {!isCollapsed && (
                <span className="ml-auto bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                  {completedCount}
                </span>
              )}
            </Button>
          </motion.li>
        </ul>
      </div>
      
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className="w-full justify-center"
        >
          {isCollapsed ? "→" : "←"}
        </Button>
      </div>
    </motion.div>
  );
};
