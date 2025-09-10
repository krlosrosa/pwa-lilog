'use client'
import { Button } from "@/_shared/components/ui/button"
import { CheckCircle2, FileWarning } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AcoesRapidas() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-3 pt-2">
      <Button type="submit" className="w-full h-12 text-base">
        <CheckCircle2 className="h-4 w-4 mr-2" /> Confirmar
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="w-full h-10 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50"
        title="Registrar anomalia"
        aria-label="Registrar anomalia"
        onClick={() => router.push("/devolucao/demandas/registraranomalia")}
      >
        <FileWarning className="h-4 w-4 mr-2" /> Registrar anomalia
      </Button>
    </div>
  )
}