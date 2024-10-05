"use client";
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); 

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState); 
  };

  return (
    <section>
      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col gap-2">
            <div className="flex h-14 items-center border-b lg:h-[60px] justify-between pr-1">
              <div className="w-[100px] bg-black h-full ml-1"></div>
              <button onClick={toggleDrawer}>
                <Menu
                  width={32}
                  height={32}
                  color="white"
                  className="border border-gray-600 rounded-md"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Header />
        </div>
      </div>

      <div className="flex mt-1">
        <div
          className={`fixed top-15 left-0 h-screen bg-black border transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } w-[280px] rounded-md`}
        >
          <div className="p-4">
            <Link href="/another-page">
              <Button
                variant="default"
                className="w-full bg-black text-white border hover:bg-gray-800"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>

        <div className={`transition-all ${isDrawerOpen ? "ml-[280px]" : "ml-0"}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
