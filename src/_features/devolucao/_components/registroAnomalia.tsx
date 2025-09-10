'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/_shared/components/ui/form";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Upload,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";

const ETAPAS = [
  { id: 1, titulo: "Natureza da Anomalia" },
  { id: 2, titulo: "Tipo de Anomalia" },
  { id: 3, titulo: "Causa" },
  { id: 4, titulo: "Informações" },
  { id: 5, titulo: "Fotos" }
];

const NATUREZAS = ["Avaria", "Desvio", "Falta", "Outro"];
const TIPOS = ["Embalagem danificada", "Produto vencido", "Produto trocado", "Outro"];
const CAUSAS = ["Transporte", "Armazenagem", "Manuseio", "Outro"];

type RegistroAnomaliaFormData = {
  natureza: string;
  tipo: string;
  causa: string;
  quantidadeUnidades: string;
  quantidadeCaixas: string;
  observacoes: string;
};

const defaultValues: RegistroAnomaliaFormData = {
  natureza: "",
  tipo: "",
  causa: "",
  quantidadeUnidades: "",
  quantidadeCaixas: "",
  observacoes: ""
};

const RegistroAnomalia = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [etapasCompletas, setEtapasCompletas] = useState<number[]>([]);
  const [fotos, setFotos] = useState<File[]>([]);

  const router = useRouter();

  const form = useForm<RegistroAnomaliaFormData>({ defaultValues });

  const handleFotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFotos(prev => [...prev, ...files]);
  };

  const removeFoto = (index: number) => {
    setFotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (etapaAtual < ETAPAS.length) {
      setEtapasCompletas(prev => [...prev, etapaAtual]);
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const handlePrevStep = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleGoToStep = (etapa: number) => {
    setEtapaAtual(etapa);
  };

  const onSubmit = (data: RegistroAnomaliaFormData) => {
    // Aqui você pode enviar os dados para a API
    // Inclua as fotos no payload se necessário
    console.log({ ...data, fotos });
  };

  const renderStep = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="natureza"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Natureza da Anomalia</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full h-10 rounded-md border border-muted-foreground/30 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Selecione a natureza da anomalia"
                      tabIndex={0}
                    >
                      <option value="" disabled>Selecione...</option>
                      {NATUREZAS.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Tipo de Anomalia</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full h-10 rounded-md border border-muted-foreground/30 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Selecione o tipo de anomalia"
                      tabIndex={0}
                    >
                      <option value="" disabled>Selecione...</option>
                      {TIPOS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="causa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Causa</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full h-10 rounded-md border border-muted-foreground/30 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Selecione a causa"
                      tabIndex={0}
                    >
                      <option value="" disabled>Selecione...</option>
                      {CAUSAS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantidadeUnidades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Qtd. Avarias (Unidades)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="h-10 text-center text-lg"
                        aria-label="Quantidade de avarias em unidades"
                        tabIndex={0}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantidadeCaixas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Qtd. Avarias (Caixas)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        className="h-10 text-center text-lg"
                        aria-label="Quantidade de avarias em caixas"
                        tabIndex={0}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Observações</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full min-h-[80px] rounded-md border border-muted-foreground/30 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Descreva detalhes relevantes..."
                      aria-label="Observações do usuário"
                      tabIndex={0}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <Label htmlFor="fotosAnomalia" className="cursor-pointer">
                  <span className="text-sm font-medium">Adicionar fotos da anomalia</span>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 10MB cada</p>
                </Label>
                <Input
                  id="fotosAnomalia"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={handleFotoUpload}
                  className="hidden"
                  aria-label="Upload de fotos da anomalia"
                  tabIndex={0}
                />
              </div>
            </div>
            {fotos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {fotos.map((foto, index) => (
                  <div key={index} className="relative group">
                    <div
                      className="w-full h-24 bg-muted rounded-lg border"
                      style={{
                        backgroundImage: `url(${URL.createObjectURL(foto)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <span className="sr-only">Foto {index + 1}</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFoto(index)}
                      aria-label={`Remover foto ${index + 1}`}
                      tabIndex={0}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Indicador de Etapas */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          {ETAPAS.map((etapa, index) => {
            const isCompleta = etapasCompletas.includes(etapa.id);
            const isAtual = etapaAtual === etapa.id;
            return (
              <div key={etapa.id} className="flex items-center">
                <button
                  onClick={() => handleGoToStep(etapa.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleta
                      ? 'bg-green-500 border-green-500 text-white'
                      : isAtual
                      ? 'bg-primary border-primary text-white'
                      : 'bg-background border-muted-foreground text-muted-foreground'
                  }`}
                  aria-label={`Ir para etapa ${etapa.titulo}`}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleGoToStep(etapa.id); }}
                >
                  {isCompleta || isAtual ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-bold">{etapa.id}</span>
                  )}
                </button>
                {index < ETAPAS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    etapasCompletas.includes(etapa.id) ? 'bg-green-500' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Título da Etapa Atual */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Registro de Anomalia</h1>
        <p className="text-muted-foreground">
          Etapa {etapaAtual} de {ETAPAS.length}: {ETAPAS[etapaAtual - 1]?.titulo}
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStep()}
              {/* Navegação */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={etapaAtual === 1}
                  className="flex items-center gap-2"
                  aria-label="Etapa anterior"
                  tabIndex={0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                {etapaAtual < ETAPAS.length ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2"
                    aria-label="Próxima etapa"
                    tabIndex={0}
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    aria-label="Finalizar registro de anomalia"
                    tabIndex={0}
                    onClick={() => router.back()}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Finalizar Registro
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistroAnomalia;