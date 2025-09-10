'use client'
import { Separator } from "@/_shared/components/ui/separator";
import { CardDevolucao } from "../_components/cardDevolucao";
import Header from "@/_shared/components/header";
import { listaDemandas } from "../__mocks__/listaDemandas";
import { Input } from "@/_shared/components/ui/input";
import { listaDemandasEmAberto } from "../__mocks__/listaDemandasEmAberto";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/_shared/components/ui/accordion";
import { CardContinuarDemanda } from "../_components/cardContinuarDemanda";

export function ListaDemanda() {

  return (
    <div className="">
      <Header
        title="Lista de Demandas"
        subtitle="Lista de demandas de devolução"
        showBack={true}
      />
      <Separator />
      <div className="flex flex-col gap-2 px-1 py-2">
        <Input
          placeholder="Buscar Placa"
          className="px-1 py-6 mt-2"
        />
        <Accordion defaultValue={`${listaDemandasEmAberto.length > 0 ? "em-aberto" : "outras"}`} type="single" className="flex flex-col gap-2">
          <AccordionItem value="em-aberto">
            <AccordionTrigger>
              <h1>Demandas em Aberto</h1>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {listaDemandasEmAberto.map((demanda) => (
                <CardContinuarDemanda
                  key={demanda.id}
                  id={demanda.id.toString()}
                  dataInicio={demanda.dataInicio}
                  status={demanda.status as "pendente" | "em_andamento" | "concluida"}
                  doca={demanda.doca}
                  codigo={demanda.codigo}
                  onContinue={() => { }}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="outras">
            <AccordionTrigger>
              <h1>Outras Demandas</h1>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {listaDemandas.map((demanda) => (
                <CardDevolucao
                  key={demanda.id}
                  id={demanda.id.toString()}
                  dataInicio={demanda.dataInicio}
                  status={demanda.status as "pendente" | "em_andamento" | "concluida"}
                  doca={demanda.doca}
                  codigo={demanda.codigo}
                  onContinue={() => { }}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}