"use client";
import React, { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { useRouter } from "next/navigation";
import myAxios from '@/lib/axios.config';
import { LOGIN_URL } from '@/lib/apiEndPoints';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  const [messages, setMessages] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true); 
    setErrors({ email: [], password: [] }); 
    setMessages(null); 

    try {
      const response = await myAxios.post(LOGIN_URL, user);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/"); 
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
        setMessages(error.response.data.message); 
      } else {
        console.error("Login failed", error);
        setMessages("An unexpected error occurred."); 
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to X Hotel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Type here.."
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <span className="text-red-500">{errors?.email?.[0]}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Type here.."
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span className="text-red-500">{errors?.password?.[0]}</span>
            </div>
            {messages && <div className="text-red-500">{messages}</div>} 
            <div className="mt-4">
              <Button className="w-full" disabled={loading}>
                {loading ? "Processing.." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default Login;
