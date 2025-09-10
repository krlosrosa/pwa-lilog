"use client"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import { Badge } from "@/_shared/components/ui/badge"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/_shared/components/ui/form"
import { Separator } from "@/_shared/components/ui/separator"
import { Skeleton } from "@/_shared/components/ui/skeleton"
import { ScanLine, FileWarning, CheckCircle2, ListChecks, AlertTriangle } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/_shared/components/ui/sheet"
import ItensConferidos from "./itensConferidos"
import ItensAnomalia from "./itensAnomalia"
import { useRouter } from "next/navigation"
import AcoesRapidas from "./acoesRapidas"

type ConferenciaForm = {
  sku: string
  data: string
  sif: string
  caixa: string
  unidade: string
}

type ItemConferido = {
  sku: string
  descricao: string
  data: string
  sif: string
  caixa: string
  unidade: string
}

type Anomalia = {
  sku: string
  descricao: string
  detalhes: string
}

export default function FormularioConferenciaCega() {
  const form = useForm<ConferenciaForm>({
    defaultValues: {
      sku: "",
      data: "",
      sif: "",
      caixa: "",
      unidade: "",
    },
    mode: "onChange",
  })

  const skuRef = useRef<HTMLInputElement | null>(null)
  const sifRef = useRef<HTMLInputElement | null>(null)
  const unidadeRef = useRef<HTMLInputElement | null>(null)
  const [descricaoBanco, setDescricaoBanco] = useState<string>("")
  const [loadingDesc, setLoadingDesc] = useState<boolean>(false)
  const [itensConferidos, setItensConferidos] = useState<ItemConferido[]>([])
  const buscarProdutoPorSku = async (sku: string) => {
    if (!sku) return
    try {
      setLoadingDesc(true)
      // TODO: integrar com backend e preencher descrição real
      // Exemplo:
      // const res = await fetch(`/api/produtos?sku=${sku}`)
      // const data = await res.json()
      // setDescricaoBanco(data.descricao)
      setDescricaoBanco("")
    } finally {
      setLoadingDesc(false)
    }
  }

  const onSubmit = (values: ConferenciaForm) => {
    // TODO: integrar com backend
    console.log("Conferência registrada:", values)
    setItensConferidos((prev) => [
      {
        sku: values.sku,
        descricao: descricaoBanco,
        data: values.data,
        sif: values.sif,
        caixa: values.caixa,
        unidade: values.unidade,
      },
      ...prev,
    ])
    form.reset()
    skuRef.current?.focus()
  }

  return (
    <div className="max-w-md mx-auto p-2 space-y-4 pb-28">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* SKU + descrição */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => {
                const { ref, ...rest } = field
                return (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ScanLine className="h-4 w-4" /> Código SKU
                    </FormLabel>
                    <FormControl>
                      <Input
                        ref={(el) => {
                          ref(el)
                          skuRef.current = el
                        }}
                        placeholder="Ex.: 789123456"
                        autoFocus
                        inputMode="numeric"
                        autoComplete="off"
                        enterKeyHint="next"
                        className="h-14 text-lg"
                        {...rest}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            void buscarProdutoPorSku((e.target as HTMLInputElement).value)
                            // pular para SIF
                            sifRef.current?.focus()
                          }
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                        onBlur={(e) => {
                          void buscarProdutoPorSku(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Descrição (somente leitura, vinda do banco) */}
            <div>
              <FormLabel>Descrição</FormLabel>
              <div className="mt-1 rounded-md border bg-muted/30 p-2 min-h-[64px]">
                {loadingDesc ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : (
                  <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">
                    {descricaoBanco || "—"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Dados do lote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" className="h-14 text-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sif"
              render={({ field }) => {
                const { ref, ...rest } = field
                return (
                  <FormItem>
                    <FormLabel>SIF</FormLabel>
                    <FormControl>
                      <Input
                        ref={(el) => {
                          ref(el)
                          sifRef.current = el
                        }}
                        placeholder="Ex.: 1234"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        enterKeyHint="next"
                        className="h-14 text-lg"
                        {...rest}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            unidadeRef.current?.focus()
                          }
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="caixa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caixas</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: 10" inputMode="numeric" className="h-14 text-lg" enterKeyHint="next" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unidade"
              render={({ field }) => {
                const { ref, ...rest } = field
                return (
                  <FormItem>
                    <FormLabel>Unidades</FormLabel>
                    <FormControl>
                      <Input
                        ref={(el) => {
                          ref(el)
                          unidadeRef.current = el
                        }}
                        placeholder="Ex.: 100"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        enterKeyHint="done"
                        className="h-14 text-lg"
                        {...rest}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            form.handleSubmit(onSubmit)()
                          }
                        }}
                        onFocus={(e) => e.currentTarget.select()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

          {/* Ações rápidas */}
          <AcoesRapidas />
        </form>
      </Form>
    </div>
  )
}