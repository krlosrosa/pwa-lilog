'use client'
import Header from "@/_shared/components/header";
import FotoCaminhaoFechado from "../_components/checkListEtapas/1-fotoCaminhaoFechado";
import FotoCaminhaoAberto from "../_components/checkListEtapas/2-fotoCaminhaoAberto";
import Temperatura from "../_components/checkListEtapas/3-temperatura";
import Anomalias from "../_components/checkListEtapas/4-anomalias";
import { Button } from "@/_shared/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ETAPAS = [
  { nome: "Foto caminhão fechado" },
  { nome: "Foto caminhão aberto" },
  { nome: "Temperatura" },
  { nome: "Anomalia" },
];

export default function CheckList() {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [etapasConcluidas, setEtapasConcluidas] = useState<number[]>([]);
  const router = useRouter();

  const handleAvancar = () => {
    if (!etapasConcluidas.includes(etapaAtual)) {
      setEtapasConcluidas((prev) => [...prev, etapaAtual]);
    }
    if (etapaAtual < ETAPAS.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const handleVoltar = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleEnviarChecklist = () => {
    // Aqui pode adicionar lógica de envio se necessário
    router.push("/devolucao/demandas/processo");
  };

  const renderEtapa = () => {
    switch (etapaAtual) {
      case 0:
        return <FotoCaminhaoFechado />;
      case 1:
        return <FotoCaminhaoAberto />;
      case 2:
        return <Temperatura />;
      case 3:
        return <Anomalias />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header
        title="CheckList"
        subtitle="CheckList de devolução"
        showBack={true}
      />
      {/* Indicador de status das etapas */}
      <div className="flex justify-center mt-6 mb-8">
        <div className="flex items-center gap-2">
          {ETAPAS.map((etapa, idx) => {
            const isAtual = idx === etapaAtual;
            const isConcluida = etapasConcluidas.includes(idx);
            return (
              <div key={etapa.nome} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full border-2 text-base font-bold transition-all
                    ${isConcluida ? 'bg-green-500 border-green-500 text-white' :
                      isAtual ? 'bg-primary border-primary text-white' :
                        'bg-background border-muted-foreground text-muted-foreground'}`}
                  aria-label={etapa.nome}
                >
                  {isConcluida ? <Check className="h-5 w-5" /> : idx + 1}
                </div>
                {idx < ETAPAS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    etapasConcluidas.includes(idx) ? 'bg-green-500' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Etapa atual */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          {renderEtapa()}
        </div>
        {/* Navegação */}
        <div className="flex justify-between w-full max-w-2xl mt-8 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleVoltar}
            disabled={etapaAtual === 0}
            className="flex-1"
            aria-label="Etapa anterior"
          >
            Anterior
          </Button>
          {etapaAtual < ETAPAS.length - 1 ? (
            <Button
              type="button"
              onClick={handleAvancar}
              className="flex-1"
              aria-label="Próxima etapa"
            >
              Próxima
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleEnviarChecklist}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              aria-label="Enviar checklist"
            >
              Enviar checklist
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}