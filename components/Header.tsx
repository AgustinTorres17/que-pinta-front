"use client";
import { useEffect, useState } from "react";
import { Leading } from "./Leading";
import { Clapperboard } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Input } from "./ui/input";
import Link from "next/link";

export const Header = () => {
  const [search, setSearch] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log("Search:", search);
  }, [search]);
  return (
    <div className="w-full p-4 flex justify-between items-center border-b border-fondo-200 dark:border-fondo-800 sticky top-0 bg-fondo-50 dark:bg-fondo-950 z-50">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-full" />
          <Leading variant="h1">QuePinta</Leading>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Buscar"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleContentChange(e)
          }
        />
        <ModeToggle />
      </div>
    </div>
  );
};
