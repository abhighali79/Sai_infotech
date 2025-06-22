import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: "", 
    password: "",
    role: "admin"
  });

  // Redirect if already logged in (after hooks are called)
  if (user) {
    return <Redirect to="/admin" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(loginData);
      toast({
        title: "Login successful",
        description: "Welcome to Sai Infotech Admin Panel",
      });
    } catch (error) {
      // Error is already handled by the mutation
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMutation.mutateAsync(registerData);
      toast({
        title: "Registration successful",
        description: "Welcome to Sai Infotech Admin Panel",
      });
    } catch (error) {
      // Error is already handled by the mutation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sai-primary to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-white space-y-6">
          <div className="flex items-center space-x-3">
            <Laptop className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Sai Infotech</h1>
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Manage Your Tech Store with Ease
          </h2>
          <p className="text-xl text-blue-100">
            Access your admin dashboard to manage products, monitor sales, and grow your business with our comprehensive catalog management system.
          </p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-200" />
              <span className="text-blue-100">Secure product management</span>
            </div>
            <div className="flex items-center space-x-3">
              <Laptop className="h-6 w-6 text-blue-200" />
              <span className="text-blue-100">Real-time inventory tracking</span>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <Card className="w-full">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Shield className="h-12 w-12 text-sai-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-sai-text">Admin Access</h3>
              <p className="text-gray-600">Sign in to manage your store</p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      placeholder="Enter your username"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="Enter your password"
                      required
                      className="form-input"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sai-primary hover:bg-sai-primary-dark touch-target"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      type="text"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      placeholder="Choose a username"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="Create a password"
                      required
                      className="form-input"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sai-primary hover:bg-sai-primary-dark touch-target"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating account..." : "Create Admin Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
