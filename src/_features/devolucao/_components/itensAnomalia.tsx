"use client"
import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/_shared/components/ui/sheet";
import { Button } from "@/_shared/components/ui/button";
import { Badge } from "@/_shared/components/ui/badge";
import { AlertTriangle, Trash2, Pencil } from "lucide-react";

type Anomalia = {
  sku: string
  detalhes: string
}

const anomaliasMock: Anomalia[] = [
  { sku: "789123456001", detalhes: "Caixa amassada e rasgada em uma das laterais." },
  { sku: "789123456003", detalhes: "Produto com prazo de validade próximo (15 dias)." },
]

export default function ItensAnomalia() {
  const [anomalias, setAnomalias] = useState<Anomalia[]>(anomaliasMock)

  const remover = (idx: number) => {
    const confirmar = window.confirm("Remover esta anomalia?")
    if (!confirmar) return
    setAnomalias((prev) => prev.filter((_, i) => i !== idx))
  }

  const editar = (idx: number) => {
    const atual = anomalias[idx]
    const novoSku = window.prompt("SKU relacionado:", atual.sku) ?? atual.sku
    const novosDetalhes = window.prompt("Detalhes da anomalia:", atual.detalhes) ?? atual.detalhes
    setAnomalias((prev) => prev.map((a, i) => (i === idx ? { sku: novoSku, detalhes: novosDetalhes } : a)))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-12 flex flex-col items-center justify-center gap-1 text-xs">
          <div className="relative">
            <AlertTriangle className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 min-w-5 px-1 py-0 text-[10px] leading-5 rounded-full">
              {anomalias.length}
            </Badge>
          </div>
          Anomalias
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="pb-6 px-1 overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-base">Anomalias registradas ({anomalias.length})</SheetTitle>
        </SheetHeader>
        {anomalias.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-4">Nenhuma anomalia registrada</p>
        ) : (
          <div className="mt-3 space-y-2">
            {anomalias.map((a, idx) => (
              <div key={idx} className="rounded-lg border p-3 bg-destructive/5 hover:bg-destructive/10 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-destructive">{a.sku || "—"}</span>
                    </div>
                    <p className="text-sm text-destructive/90 leading-relaxed">{a.detalhes}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editar(idx)} aria-label="Editar anomalia">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remover(idx)} aria-label="Remover anomalia">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}