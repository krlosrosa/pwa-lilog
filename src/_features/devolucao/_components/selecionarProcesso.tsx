"use client"
import { Card, CardContent } from "@/_shared/components/ui/card"
import { Button } from "@/_shared/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Truck, RotateCcw } from "lucide-react"

type SelecionarProcessoProps = {
  onSelectRedelivery?: () => void
  onSelectReturn?: () => void
  title?: string
}

export default function SelecionarProcesso({
  onSelectRedelivery,
  onSelectReturn,
  title = "Selecionar processo",
}: SelecionarProcessoProps) {
  const router = useRouter()

  const handleRedelivery = () => {
    if (onSelectRedelivery) return onSelectRedelivery()
    router.push("/devolucao/demandas/conferenciareentrega")
  }

  const handleReturn = () => {
    if (onSelectReturn) return onSelectReturn()
    router.push("/devolucao/demandas/conferenciacega")
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Content */}
      <div className="mx-auto max-w-md p-4 space-y-3">
        {/* Reentrega */}
        <Card
          role="button"
          tabIndex={0}
          onClick={handleRedelivery}
          onKeyDown={(e) => e.key === "Enter" && handleRedelivery()}
          className="border-muted-foreground/20 active:scale-[0.98] transition-all"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Reentrega</p>
                <p className="text-xs text-muted-foreground">Iniciar processo de reentrega</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devolução */}
        <Card
          role="button"
          tabIndex={0}
          onClick={handleReturn}
          onKeyDown={(e) => e.key === "Enter" && handleReturn()}
          className="border-muted-foreground/20 active:scale-[0.98] transition-all"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Devolução</p>
                <p className="text-xs text-muted-foreground">Iniciar processo de devolução</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}