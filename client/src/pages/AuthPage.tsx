import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const API_BASE_URL = "http://localhost:3001/auth"; // Adjust this if your backend is running on another port

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // Added Name Field for Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/signup`;
      const requestBody = isLogin ? { email, password } : { name, email, password };
  
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging line
  
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }
  
      if (!data.userId) {
        throw new Error("User ID not received from backend");
      }
  
      // Store userId in local storage
      localStorage.setItem("userId", data.userId);
  
      toast({
        title: `${isLogin ? "Login" : "Signup"} successful!`,
        description: "Redirecting to dashboard...",
      });
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-3xl"
      />
      
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-4"
        >
          <ThemeToggle />
        </motion.div>
      </nav>

      {/* Main Content */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow flex items-center justify-center px-4 py-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-lg task-card-shadow">
              <CardHeader className="space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold text-center">
                  {isLogin ? "Welcome back" : "Create an account"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                        className="h-10"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-10"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-6 hover:shadow-md transition-all"
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="text-center w-full text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
