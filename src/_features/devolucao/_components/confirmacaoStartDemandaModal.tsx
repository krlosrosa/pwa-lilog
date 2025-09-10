"use client"
import { Button } from "@/_shared/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/_shared/components/ui/drawer";
import { Input } from "@/_shared/components/ui/input";
import { useRouter } from "next/navigation";
import { listaDemandasEmAberto } from "../__mocks__/listaDemandasEmAberto";
import { useState, useRef, useEffect } from "react";

type ConfirmacaoStartDemandaModalProps = {
  children: React.ReactNode;
}

export default function ConfirmacaoStartDemandaModal({ children }: ConfirmacaoStartDemandaModalProps) {
  const [doca, setDoca] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const hasDemandasEmAberto = listaDemandasEmAberto.length > 0;
  const docaInputRef = useRef<HTMLInputElement>(null);
  const senhaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Foco automático no campo correto ao abrir
    setTimeout(() => {
      if (hasDemandasEmAberto && senhaInputRef.current) {
        senhaInputRef.current.focus();
      } else if (docaInputRef.current) {
        docaInputRef.current.focus();
      }
    }, 200);
  }, [hasDemandasEmAberto]);

  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/devolucao/demandas/checklist");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="min-h-5/12 px-4 pt-6 pb-8 flex flex-col items-center">
        <DrawerHeader className="w-full text-center mb-2">
          <h2 className="text-xl font-bold mb-1">Confirmar Início da Demanda</h2>
          <p className="text-muted-foreground text-sm">Preencha as informações abaixo para iniciar o processo.</p>
        </DrawerHeader>
        <form className="w-full max-w-sm space-y-4 mt-2" onSubmit={handleConfirmar}>
          {hasDemandasEmAberto && (
            <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 p-3 rounded mb-2 text-sm">
              Há demandas em aberto. Finalize-as antes de iniciar uma nova ou solicite a senha de acesso ao líder.
            </div>
          )}
          {hasDemandasEmAberto && (
            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1">Senha de acesso</label>
              <Input
                id="senha"
                ref={senhaInputRef}
                placeholder="Senha de acesso"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                autoComplete="off"
                aria-label="Senha de acesso"
                disabled={!hasDemandasEmAberto}
              />
            </div>
          )}
          <div>
            <label htmlFor="doca" className="block text-sm font-medium mb-1">Doca</label>
            <Input
              id="doca"
              ref={docaInputRef}
              placeholder="Informe a Doca"
              value={doca}
              onChange={e => setDoca(e.target.value)}
              autoComplete="off"
              aria-label="Informe a Doca"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-4 text-base py-3"
            disabled={!doca || (hasDemandasEmAberto && !senha)}
            aria-label="Confirmar início da demanda"
          >
            Confirmar
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  )
}