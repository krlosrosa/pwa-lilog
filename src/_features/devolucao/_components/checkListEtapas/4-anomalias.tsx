'use client'
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/_shared/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/_shared/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/_shared/components/ui/accordion";
import { Checkbox } from "@/_shared/components/ui/checkbox";
import { useState } from "react";

const CATEGORIAS_ANOMALIAS = [
  {
    nome: "Embalagem",
    anomalias: ["Caixa amassada", "Lacre rompido", "Etiqueta ilegível"]
  },
  {
    nome: "Produto",
    anomalias: ["Produto vencido", "Produto trocado", "Produto avariado"]
  },
  {
    nome: "Transporte",
    anomalias: ["Produto molhado", "Produto sujo", "Temperatura inadequada"]
  }
];

export default function Anomalias() {
  const [anomalias, setAnomalias] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const handleAbrirDrawer = () => {
    setSelecionadas([]);
    setDrawerOpen(true);
  };

  const handleToggleAnomalia = (anomalia: string) => {
    setSelecionadas((prev) =>
      prev.includes(anomalia)
        ? prev.filter((a) => a !== anomalia)
        : [...prev, anomalia]
    );
  };

  const handleAdicionarSelecionadas = () => {
    setAnomalias((prev) => [...prev, ...selecionadas.filter(a => !prev.includes(a))]);
    setDrawerOpen(false);
  };

  const removerAnomalia = (index: number) => {
    setAnomalias(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="text-center mb-6">
          <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-destructive" />
          <h2 className="text-2xl font-bold mb-1">Anomalias</h2>
          <p className="text-sm text-muted-foreground mb-2">Registre qualquer problema encontrado</p>
        </div>
        <div className="flex justify-center mb-4">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleAbrirDrawer}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Adicionar Anomalia
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh] overflow-y-auto">
              <DrawerHeader>
                <h3 className="text-lg font-bold text-center mb-2">Selecionar Anomalias</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">Selecione uma ou mais anomalias encontradas, agrupadas por categoria.</p>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <Accordion type="multiple" className="w-full">
                  {CATEGORIAS_ANOMALIAS.map((cat) => (
                    <AccordionItem value={cat.nome} key={cat.nome}>
                      <AccordionTrigger className="text-base font-semibold">{cat.nome}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {cat.anomalias.map((anomalia) => (
                            <label key={anomalia} className="flex items-center gap-3 cursor-pointer">
                              <Checkbox
                                checked={selecionadas.includes(anomalia)}
                                onCheckedChange={() => handleToggleAnomalia(anomalia)}
                                aria-label={anomalia}
                              />
                              <span className="text-sm">{anomalia}</span>
                            </label>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button
                  type="button"
                  className="w-full mt-6"
                  onClick={handleAdicionarSelecionadas}
                  disabled={selecionadas.length === 0}
                  aria-label="Adicionar anomalias selecionadas"
                >
                  Adicionar
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        {anomalias.length > 0 ? (
          <div className="space-y-3">
            {anomalias.map((anomalia, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <span className="text-sm text-destructive flex-1">{anomalia}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removerAnomalia(index)}
                  className="text-destructive hover:text-destructive/80"
                  aria-label={`Remover anomalia ${anomalia}`}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p className="text-sm">Nenhuma anomalia registrada</p>
            <p className="text-xs mt-1">Clique em &quot;Adicionar Anomalia&quot; se encontrar problemas</p>
          </div>
        )}
      </div>
    </div>
  );
}