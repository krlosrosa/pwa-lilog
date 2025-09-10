import Header from "@/_shared/components/header";
import FinalizarProcessoDevolucao from "../_components/finalizarProcessoDevolucao";

export default function FinalizarDemanda() {
  return (
    <div>
      <Header
        title="Finalizar demanda"
        subtitle="Finalizar demanda"
        showBack={true}
      />
      <FinalizarProcessoDevolucao/>
    </div>
  )
}