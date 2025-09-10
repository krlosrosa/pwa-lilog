'use client'
import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/_shared/components/ui/card";
import { Badge } from "@/_shared/components/ui/badge";
import { ArrowRight, Calendar, Truck, Warehouse } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmacaoStartDemandaModal from "./confirmacaoStartDemandaModal";

interface CardDevolucaoProps {
  id: string;
  dataInicio: string;
  status: "pendente" | "em_andamento" | "concluida";
  doca: string;
  codigo: string;
  onContinue?: () => void;
}

export function CardContinuarDemanda({
  id,
  dataInicio,
  status,
  doca,
  codigo,
  onContinue
}: CardDevolucaoProps) {
  const router = useRouter();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pendente":
        return "secondary";
      case "em_andamento":
        return "default";
      case "concluida":
        return "outline";
      default:
        return "secondary";
    }
  };


  return (
    <Card className="w-full p-2 hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-0 px-1">
        <div className="space-y-3 flex gap-4 justify-between">
          <div className="flex-1 gap-1 flex flex-col">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-foreground">
                  Devolução #{id}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Iniciado em {dataInicio}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{doca}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-mono">{codigo}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Badge variant={getStatusVariant(status)} className="text-xs">
              {status}
            </Badge>
            <Button
              onClick={() => {
                if (onContinue) {
                  onContinue();
                } else {
                  router.push(`/devolucao/demandas/checklist`);
                }
              }}
              className="h-10 text-sm font-medium"
              size="default"
            >
              Continuar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}