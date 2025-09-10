'use client'
import { Thermometer } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/_shared/components/ui/form";
import { Input } from "@/_shared/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/_shared/components/ui/button";
import { useRef, useEffect } from "react";

interface ChecklistFormData {
  temperaturaCaminhao: string;
  temperaturaProduto: string;
}

export default function Temperatura() {
  const form = useForm<ChecklistFormData>({
    defaultValues: {
      temperaturaCaminhao: "",
      temperaturaProduto: "",
    }
  });
  const caminhaoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    caminhaoInputRef.current?.focus();
  }, []);

  const onSubmit = (data: ChecklistFormData) => {
    console.log("Dados do checklist:", { ...data });
    // Aqui você implementaria a lógica de envio ou próxima etapa
  };

  const isDisabled = !form.watch("temperaturaCaminhao") || !form.watch("temperaturaProduto");

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="text-center">
          <Thermometer className="h-14 w-14 mx-auto mb-3 text-primary" />
          <h2 className="text-2xl font-bold mb-1">Temperatura</h2>
          <p className="text-sm text-muted-foreground mb-2">Registre as temperaturas do caminhão e produto</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="h-12 text-center text-lg"
                        {...field}
                        ref={caminhaoInputRef}
                        aria-label="Temperatura do caminhão"
                        tabIndex={0}
                        min={-50}
                        max={100}
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
                        className="h-12 text-center text-lg"
                        {...field}
                        aria-label="Temperatura do produto"
                        tabIndex={0}
                        min={-50}
                        max={100}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-3 text-base mt-2"
              disabled={isDisabled}
              aria-label="Próxima etapa"
            >
              Próxima etapa
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}