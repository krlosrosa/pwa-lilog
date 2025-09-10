"use client"
import { useState } from "react"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/_shared/components/ui/sheet";
import { Button } from "@/_shared/components/ui/button";
import { Badge } from "@/_shared/components/ui/badge";
import { ListChecks, Trash2, Pencil } from "lucide-react";

type ItemConferido = {
  sku: string
  descricao: string
  caixa: string
  unidade: string
}

const itensConferidosMock: ItemConferido[] = [
  {
    sku: "789123456001",
    descricao: "Filé de frango congelado 1kg - Marca Exemplo",
    caixa: "12",
    unidade: "144",
  },
  {
    sku: "789123456002",
    descricao: "Iogurte natural 170g - Caixa com 24 unidades",
    caixa: "8",
    unidade: "192",
  },
  {
    sku: "789123456003",
    descricao: "Leite UHT integral 1L - Lote 24/08",
    caixa: "20",
    unidade: "240",
  },
];

export default function ItensConferidos() {
  const [itens, setItens] = useState<ItemConferido[]>(itensConferidosMock)

  const remover = (idx: number) => {
    const confirmar = window.confirm("Remover este item conferido?")
    if (!confirmar) return
    setItens((prev) => prev.filter((_, i) => i !== idx))
  }

  const editar = (idx: number) => {
    const item = itens[idx]
    const novaDescricao = window.prompt("Descrição do item:", item.descricao) ?? item.descricao
    const novaCaixa = window.prompt("Quantidade de caixas:", item.caixa) ?? item.caixa
    const novaUnidade = window.prompt("Quantidade de unidades:", item.unidade) ?? item.unidade
    setItens((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, descricao: novaDescricao, caixa: novaCaixa, unidade: novaUnidade } : it))
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-12 flex flex-col items-center justify-center gap-1 text-xs">
          <div className="relative">
            <ListChecks className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 py-0 text-[10px] leading-5 rounded-full">
              {itens.length}
            </Badge>
          </div>
          Itens
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="pb-6 px-1 overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-base">Itens conferidos ({itens.length})</SheetTitle>
        </SheetHeader>
        {itens.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-4">Nenhum item conferido ainda</p>
        ) : (
          <div className="mt-3 space-y-2">
            {itens.map((item, idx) => (
              <div key={idx} className="rounded-lg border p-3 hover:bg-muted/40 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{item.sku}</span>
                      <span className="text-xs text-muted-foreground">{item.caixa} cx • {item.unidade} un</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.descricao}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editar(idx)} aria-label="Editar item">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remover(idx)} aria-label="Remover item">
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