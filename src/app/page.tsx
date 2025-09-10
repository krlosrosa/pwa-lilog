'use client'
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/_shared/components/ui/card";
import { Badge } from "@/_shared/components/ui/badge";
import { Button } from "@/_shared/components/ui/button";
import { 
  Package, 
  ArrowLeft, 
  Warehouse,
  User,
  Settings
} from "lucide-react";
import Header from "@/_shared/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}

      <Header/>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Operações do Armazém
          </h2>
        </div>

        {/* Main Menu - Layout Especial */}
        <div className="space-y-6">
          {/* Devolução - Destaque Principal */}
          <div className="relative">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-primary to-primary/90 shadow-lg hover:shadow-primary/20">
              <Link href="/devolucao/demandas">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <ArrowLeft className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-white mb-1">
                        Devoluções
                      </CardTitle>
                      <p className="text-white/90 text-sm mb-4">
                        Processo completo de devolução de mercadorias
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-white text-primary hover:bg-white/90 font-medium px-6 py-2 rounded-lg"
                      >
                        Acessar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>WMS Operador v1.0 - Sistema de Gerenciamento de Armazém</p>
            <p className="mt-1">Desenvolvido para operadores de logística</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
