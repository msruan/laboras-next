"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { LogOut } from 'lucide-react'
import { useRouter } from "next/navigation";
import { logoutAction } from "@/api/auth.actions";

export function DesktopLogoutMenu({ children }: { children: ReactNode, }) {
  const router = useRouter()

  async function handleLogout() {
    await logoutAction();
    router.replace("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 mr-2 p-2">
        <Separator />
        <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}