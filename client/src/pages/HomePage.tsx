
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    "Simple task management",
    "Track your progress",
    "Set priorities",
    "Stay organized"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <CheckCircle className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-bold">TaskFlow</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4"
        >
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link to="/auth">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Sign Up</Link>
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex"
      >
        <div className="flex-1 flex flex-col md:flex-row items-center px-4 py-12 md:py-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 max-w-lg"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Stay Organized, 
              <span className="text-primary"> Stay Productive</span>
            </h1>
            <p className="mt-4 md:mt-6 text-lg text-muted-foreground">
              TaskFlow helps you manage your tasks efficiently, so you can focus on what matters most.
            </p>
            
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 space-y-3"
            >
              {features.map(feature => (
                <motion.li 
                  key={feature} 
                  variants={itemVariants}
                  className="flex items-center text-sm md:text-base"
                >
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Button size="lg" asChild className="group">
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 mt-12 md:mt-0 w-full md:max-w-md"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-xl opacity-30 blur-xl"></div>
              <div className="relative bg-card rounded-xl shadow-lg p-6 task-card-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">My Tasks</h3>
                  <span className="text-sm text-muted-foreground">Today</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "Design meeting", completed: true, category: "Work" },
                    { title: "Finish project proposal", completed: false, category: "Work" },
                    { title: "Grocery shopping", completed: false, category: "Personal" }
                  ].map((task, idx) => (
                    <div key={idx} className="flex items-center p-3 bg-background rounded-lg">
                      <div className={`w-4 h-4 rounded-full mr-3 ${task.completed ? 'bg-primary' : 'border-2 border-primary'}`}></div>
                      <div className="flex-1">
                        <p className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                        <span className="text-xs text-muted-foreground">{task.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
