'use client'
import { useState } from "react";
import { CheckCircle, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const itensIniciais = [
  { codigo: "123", descricao: "Produto A", quantidadeCaixas: 2, quantidadeUnidades: 10, dataFabricacao: "2024-07-01" },
  { codigo: "456", descricao: "Produto B", quantidadeCaixas: 1, quantidadeUnidades: 5, dataFabricacao: "2024-06-15" },
  { codigo: "789", descricao: "Produto C", quantidadeCaixas: 3, quantidadeUnidades: 20, dataFabricacao: "2024-05-20" },
];

const ConferenciaReentrega = () => {
  const [itens, setItens] = useState(itensIniciais);
  const [validados, setValidados] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState<null | typeof itens[0]>(null);
  const [caixasEdit, setCaixasEdit] = useState(0);
  const [unidadesEdit, setUnidadesEdit] = useState(0);
  const router = useRouter();

  const handleValidar = (codigo: string) => {
    setValidados((prev) => prev.includes(codigo) ? prev : [...prev, codigo]);
  };

  const handleAdicionarAnomalia = () => {
    router.push(`/devolucao/demandas/registraranomalia`);
  };

  const handleAbrirModal = (item: typeof itens[0]) => {
    setItemEditando(item);
    setCaixasEdit(item.quantidadeCaixas);
    setUnidadesEdit(item.quantidadeUnidades);
    setModalOpen(true);
  };

  const handleSalvarAjuste = () => {
    if (!itemEditando) return;
    setItens((prev) => prev.map((i) =>
      i.codigo === itemEditando.codigo
        ? { ...i, quantidadeCaixas: caixasEdit, quantidadeUnidades: unidadesEdit }
        : i
    ));
    setModalOpen(false);
    setItemEditando(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Conferência de Reentrega</h1>
        <p className="text-muted-foreground">Valide os itens ou registre anomalias conforme necessário.</p>
      </div>
      <div className="space-y-4">
        {itens.map((item) => {
          const isValidado = validados.includes(item.codigo);
          return (
            <div
              key={item.codigo}
              className={`relative bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 min-h-[170px]`}
            >
              {/* Check verde no canto superior direito se validado */}
              {isValidado && (
                <span className="absolute top-3 right-3 bg-green-500 rounded-full p-1" aria-label="Item validado">
                  <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">Validado</span>
                </span>
              )}
              {/* SKU e descrição */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">SKU: <span className="text-lg text-foreground font-semibold align-middle">{item.codigo}</span></span>
              </div>
              <div className="text-base font-semibold text-foreground mb-1 truncate">
                {item.descricao}
              </div>
              {/* Fabricação */}
              <div className="text-sm text-muted-foreground mb-1">
                Fabricação: <span className="ml-1">{new Date(item.dataFabricacao).toLocaleDateString()}</span>
              </div>
              {/* Caixas e Unidades alinhados + botão de ajuste */}
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-2 gap-2">
                <span className="flex items-center gap-1">
                  Caixas: <span className="text-foreground font-medium">{item.quantidadeCaixas}</span>
                  <button
                    type="button"
                    onClick={() => handleAbrirModal(item)}
                    className="ml-1 p-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Ajustar quantidade de caixas/unidades do item ${item.codigo}`}
                    tabIndex={0}
                  >
                    <Pencil className="h-4 w-4 text-primary" />
                  </button>
                </span>
                <span>Unidades: <span className="text-foreground font-medium">{item.quantidadeUnidades}</span></span>
              </div>
              {/* Botões */}
              <div className="flex gap-2 mt-auto">
                <button
                  type="button"
                  onClick={() => handleAdicionarAnomalia()}
                  className="flex-1 py-2 rounded-lg bg-muted text-foreground font-medium text-base focus:outline-none focus:ring-2 focus:ring-destructive/40 transition-colors"
                  aria-label={`Adicionar anomalia ao item ${item.codigo}`}
                  tabIndex={0}
                >
                  Anomalia
                </button>
                <button
                  type="button"
                  onClick={() => handleValidar(item.codigo)}
                  className={`flex-1 py-2 rounded-lg font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${isValidado ? 'bg-green-500 text-white cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  aria-label={`Validar item ${item.codigo}`}
                  tabIndex={0}
                  disabled={isValidado}
                >
                  Validar
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal de ajuste de quantidade */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto flex flex-col gap-4">
            <h2 className="text-lg font-bold text-center mb-2">Ajustar Quantidade</h2>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="caixas-ajuste">Caixas</label>
              <input
                id="caixas-ajuste"
                type="number"
                min={0}
                value={caixasEdit}
                onChange={e => setCaixasEdit(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <label className="text-sm font-medium text-muted-foreground" htmlFor="unidades-ajuste">Unidades</label>
              <input
                id="unidades-ajuste"
                type="number"
                min={0}
                value={unidadesEdit}
                onChange={e => setUnidadesEdit(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2 rounded-lg bg-muted text-foreground font-medium text-base focus:outline-none focus:ring-2 focus:ring-muted transition-colors"
                aria-label="Cancelar ajuste de quantidade"
                tabIndex={0}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSalvarAjuste}
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                aria-label="Salvar ajuste de quantidade"
                tabIndex={0}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenciaReentrega;