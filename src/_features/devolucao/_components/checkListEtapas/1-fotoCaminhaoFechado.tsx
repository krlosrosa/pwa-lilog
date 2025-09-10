'use client'
import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Trash2, Truck, Upload } from "lucide-react";
import { useState } from "react";

export default function FotoCaminhaoFechado() {

  const [fotosFechado, setFotosFechado] = useState<File[]>([]);

  const removeFotoFechado = (index: number) => {
    setFotosFechado(prev => prev.filter((_, i) => i !== index));
  };

  const handleFotoUploadFechado = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFotosFechado(prev => [...prev, ...files]);
  };

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
  )
}