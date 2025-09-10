'use client'
import { Card, CardContent } from "@/_shared/components/ui/card";
import { Button } from "@/_shared/components/ui/button";
import { AlertTriangle, CheckCircle, ListChecks } from "lucide-react";

const itensConferidos = [
  { nome: "Produto A", codigo: "123", divergente: false },
  { nome: "Produto B", codigo: "456", divergente: true },
  { nome: "Produto C", codigo: "789", divergente: false },
  { nome: "Produto D", codigo: "321", divergente: true },
];

const anomalias = [
  { id: 1, descricao: "Avaria na caixa" },
  { id: 2, descricao: "Produto vencido" },
];

const produtosDivergentes = itensConferidos.filter(item => item.divergente);

const FinalizarProcessoDevolucao = () => {
  const handleFinalizar = () => {
    // Aqui você pode implementar a lógica de finalização
    alert('Processo de devolução finalizado!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Finalizar Processo de Devolução</h1>
        <p className="text-muted-foreground mb-4">Confira o resumo antes de finalizar o processo.</p>
      </div>
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex gap-16 justify-center">
            <div className="flex flex-col items-center">
              <ListChecks className="h-8 w-8 text-primary mb-1" />
              <span className="text-lg font-semibold">{itensConferidos.length}</span>
              <span className="text-xs text-muted-foreground">Itens Conferidos</span>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className="h-8 w-8 text-destructive mb-1" />
              <span className="text-lg font-semibold">{anomalias.length}</span>
              <span className="text-xs text-muted-foreground">Anomalias Registradas</span>
            </div>
          </div>

          {/* Divergências em lista editável */}
          {produtosDivergentes.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-destructive font-semibold">Divergência encontrada entre físico e contábil</span>
              </div>
              <ul className="flex flex-col gap-4 mt-2">
                {produtosDivergentes.map((item) => (
                  <li key={item.codigo} className="flex items-center justify-between py-4 px-2 rounded-lg bg-white/60 hover:bg-primary/5 transition-colors">
                    <span className="text-sm text-destructive">
                      {item.nome} <span className="text-xs text-muted-foreground">(Cód: {item.codigo})</span>
                    </span>
                    <button
                      type="button"
                      className="ml-2 p-2 rounded-full hover:bg-destructive/20 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Editar divergência do produto ${item.nome}`}
                      tabIndex={0}
                      onClick={() => alert(`Editar divergência de ${item.nome}`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">Apenas os produtos estão listados, sem detalhar quantidades.</p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Button
              type="button"
              onClick={handleFinalizar}
              className="flex items-center gap-2 w-full max-w-xs md:max-w-md lg:max-w-lg text-base py-6"
              aria-label="Finalizar processo de devolução"
              tabIndex={0}
            >
              <CheckCircle className="h-4 w-4" />
              Finalizar Processo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinalizarProcessoDevolucao;