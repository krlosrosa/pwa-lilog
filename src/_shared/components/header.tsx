"use client"
import { Settings, User, Warehouse, ArrowLeft } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode; // ações adicionais à direita
  sticky?: boolean;
};

export default function Header({
  title = "Lilog",
  subtitle,
  showBack = false,
  onBack,
  rightSlot,
  sticky = true,
}: HeaderProps) {
  const router = useRouter();
  const handleBack = () => (onBack ? onBack() : router.back());

  return (
    <header
      className={`${sticky ? "sticky top-0 z-40" : ""} bg-white dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80 shadow-sm border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            {showBack ? (
              <Button variant="ghost" size="icon" onClick={handleBack} className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : (
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Warehouse className="h-5 w-5 text-primary-foreground" />
              </div>
            )}
            <div className="leading-tight">
              <h1 className="text-base font-semibold text-foreground">{title}</h1>
              {subtitle ? (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {rightSlot}
            <Badge variant="outline" className="hidden sm:flex items-center gap-1">
              <User className="h-3 w-3" />
              Operador
            </Badge>
            <Button variant="ghost" size="sm" aria-label="Configurações">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}