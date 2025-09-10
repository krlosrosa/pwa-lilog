import Header from "@/_shared/components/header";
import ConferenciaReentrega from "../_components/conferenciaReentrega";
import BottomMenu from "../_components/bottomMenu";

export default function ValidacaoReentrega() {
  return (
    <div>
      <Header
        title="Validar reentrega"
        subtitle="Validar reentrega"
        showBack={true}
      />
      <ConferenciaReentrega/>
      <BottomMenu />
    </div>
  )
}