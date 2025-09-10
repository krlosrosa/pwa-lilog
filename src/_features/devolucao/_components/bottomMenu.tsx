"use client"
import { Button } from "@/_shared/components/ui/button"
import ItensAnomalia from "./itensAnomalia"
import ItensConferidos from "./itensConferidos"
import { useRouter } from "next/navigation"

export default function BottomMenu() {
  const router = useRouter()
  return (
    <div className="fixed bottom-0 inset-x-0 z-20">
      <div className="mx-auto max-w-md p-3">
        <div className="rounded-2xl border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-lg px-3 py-3 grid grid-cols-4 gap-3">
          {/* Itens conferidos sheet */}
          <ItensConferidos />
          {/* Anomalias sheet */}
          <ItensAnomalia />

          {/* Finalizar demanda */}
          <Button
            className="col-span-2 h-12 text-sm shadow-md"
            onClick={() => {
              router.push("/devolucao/demandas/finalizar")
            }}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}