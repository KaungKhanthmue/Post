"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import myAxios from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true); 
    setErrors({ name: [], email: [], password: [] }); 

    try {
      const response = await myAxios.post(
        REGISTER_URL,
        authState
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/"); 
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      } else {
        console.error("Registration failed", error);
      }
    } finally {
      setLoading(false); 
    }
  };
  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Welcome to Daily Dev.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Type here.."
                value={authState.name}
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
              <span className="text-red-500">{errors?.name?.[0]}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Type here.."
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
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
                value={authState.password}
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
              <span className="text-red-500">{errors?.password?.[0]}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                id="cpassword"
                type="password"
                name="password_confirmation"
                placeholder="Type here.."
                value={authState.password_confirmation}
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <Button className="w-full" disabled={loading}>
                {loading ? "Processing.." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}