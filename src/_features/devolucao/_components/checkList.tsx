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
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Upload,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  Truck
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChecklistFormData {
  temperaturaCaminhao: string;
  temperaturaProduto: string;
}

const ETAPAS = [
  { id: 1, titulo: "Foto caminhão fechado", icone: Truck },
  { id: 2, titulo: "Foto caminhão aberto", icone: Truck },
  { id: 3, titulo: "Temperatura", icone: Thermometer },
  { id: 4, titulo: "Anomalia", icone: AlertTriangle }
];

export default function CheckListComponent() {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [fotosFechado, setFotosFechado] = useState<File[]>([]);
  const [fotosAberto, setFotosAberto] = useState<File[]>([]);
  const [anomalias, setAnomalias] = useState<string[]>([]);
  const [etapasCompletas, setEtapasCompletas] = useState<number[]>([]);

  const router = useRouter();

  const form = useForm<ChecklistFormData>({
    defaultValues: {
      temperaturaCaminhao: "",
      temperaturaProduto: "",
    }
  });

  const handleFotoUploadFechado = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFotosFechado(prev => [...prev, ...files]);
  };

  const handleFotoUploadAberto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFotosAberto(prev => [...prev, ...files]);
  };

  const removeFotoFechado = (index: number) => {
    setFotosFechado(prev => prev.filter((_, i) => i !== index));
  };

  const removeFotoAberto = (index: number) => {
    setFotosAberto(prev => prev.filter((_, i) => i !== index));
  };

  const adicionarAnomalia = () => {
    const novaAnomalia = prompt("Descreva a anomalia encontrada:");
    if (novaAnomalia) {
      setAnomalias(prev => [...prev, novaAnomalia]);
    }
  };

  const removerAnomalia = (index: number) => {
    setAnomalias(prev => prev.filter((_, i) => i !== index));
  };

  const proximaEtapa = () => {
    if (etapaAtual < ETAPAS.length) {
      setEtapasCompletas(prev => [...prev, etapaAtual]);
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const irParaEtapa = (etapa: number) => {
    setEtapaAtual(etapa);
  };

  const onSubmit = (data: ChecklistFormData) => {
    console.log("Dados do checklist:", { ...data, fotosFechado, fotosAberto, anomalias });
    // Aqui você implementaria a lógica de envio
  };

  const renderEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Truck className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h2 className="text-xl font-semibold">Foto caminhão fechado</h2>
              <p className="text-sm text-muted-foreground">Adicione fotos do caminhão fechado (porta lacrada)</p>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <Label htmlFor="fotosFechado" className="cursor-pointer">
                  <span className="text-sm font-medium">Adicionar fotos do caminhão fechado</span>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG até 10MB cada</p>
                </Label>
                <Input id="fotosFechado" type="file" accept="image/*" capture="environment" multiple onChange={handleFotoUploadFechado} className="hidden" />
              </div>
            </div>

            {fotosFechado.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {fotosFechado.map((foto, index) => (
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
                    <Button type="button" variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFotoFechado(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-destructive" />
              <h2 className="text-xl font-semibold">Anomalias</h2>
              <p className="text-sm text-muted-foreground">Registre qualquer problema encontrado</p>
            </div>

            <div className="flex justify-center mb-4">
              <Button
                type="button"
                variant="outline"
                onClick={adicionarAnomalia}
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Adicionar Anomalia
              </Button>
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
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Truck className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h2 className="text-xl font-semibold">Foto caminhão aberto</h2>
              <p className="text-sm text-muted-foreground">Adicione fotos do interior do caminhão</p>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                <Label htmlFor="fotosAberto" className="cursor-pointer">
                  <span className="text-sm font-medium">Adicionar fotos do caminhão aberto</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG até 10MB cada
                  </p>
                </Label>
                <Input
                  id="fotosAberto"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={handleFotoUploadAberto}
                  className="hidden"
                />
              </div>
            </div>

            {fotosAberto.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {fotosAberto.map((foto, index) => (
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
                      onClick={() => removeFotoAberto(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Thermometer className="h-12 w-12 mx-auto mb-3 text-primary" />
              <h2 className="text-xl font-semibold">Temperatura</h2>
              <p className="text-sm text-muted-foreground">Registre as temperaturas do caminhão e produto</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="temperaturaCaminhao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Thermometer className="h-4 w-4" />
                      Caminhão (°C)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 4" 
                        className="h-10 text-center text-lg"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperaturaProduto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium">
                      <Thermometer className="h-4 w-4" />
                      Produto (°C)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ex: 2" 
                        className="h-10 text-center text-lg"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
            const Icone = etapa.icone;
            const isCompleta = etapasCompletas.includes(etapa.id);
            const isAtual = etapaAtual === etapa.id;
            
            return (
              <div key={etapa.id} className="flex items-center">
                <button
                  onClick={() => irParaEtapa(etapa.id)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleta
                      ? 'bg-green-500 border-green-500 text-white'
                      : isAtual
                      ? 'bg-primary border-primary text-white'
                      : 'bg-background border-muted-foreground text-muted-foreground'
                  }`}
                >
                  {isCompleta ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icone className="h-5 w-5" />
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
        <h1 className="text-2xl font-bold">Checklist do Caminhão</h1>
        <p className="text-muted-foreground">
          Etapa {etapaAtual} de {ETAPAS.length}: {ETAPAS[etapaAtual - 1]?.titulo}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderEtapa()}

              {/* Navegação */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={etapaAnterior}
                  disabled={etapaAtual === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                {etapaAtual < ETAPAS.length ? (
                  <Button
                    type="button"
                    onClick={proximaEtapa}
                    className="flex items-center gap-2"
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    onClick={() => router.push("/devolucao/demandas/processo")}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Finalizar Checklist
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}