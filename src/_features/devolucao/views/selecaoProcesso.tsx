import Header from "@/_shared/components/header";
import SelecionarProcesso from "../_components/selecionarProcesso";
import { Separator } from "@/_shared/components/ui/separator";

export default function SelecaoProcesso() {
  return (
    <div>
      <Header
        title="Seleção de processo"
        subtitle="Seleção de processo"
        showBack={true}
      />
      <Separator />
      <SelecionarProcesso />
    </div>
  )
}