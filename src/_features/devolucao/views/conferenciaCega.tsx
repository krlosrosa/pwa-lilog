import Header from "@/_shared/components/header";
import BottomMenu from "../_components/bottomMenu";
import AcoesRapidas from "../_components/acoesRapidas";
import FormularioConferenciaCega from "../_components/conferenciaCega";

export default function ConferenciaCega() {
  return (
    <div>
      <Header
        title="Conferencia Cega"
        subtitle="Conferencia Cega"
        showBack={true}
      />
      <FormularioConferenciaCega/>
      <BottomMenu />
    </div>
  )
}