import "./OrderList.css"
import type { ChangeEvent } from "react"

type Props = {
  sortUsers: string,
  setSortUsers: (selectedOption: any) => void
}

function OrderList({ setSortUsers, sortUsers }: Props) {
  
  //funcao para pegar a opcao selecionada no select
  function onSelectOption(event: ChangeEvent<HTMLSelectElement>) {
    setSortUsers(event.target.value)
  }

  return (
    <>
      <select value={sortUsers} onChange={onSelectOption} name="" id="">
        <option value="">Filtrar por:</option>
        <option value="a-z">Nome A-Z</option>
        <option value="z-a">Nome Z-A</option>
        <option value="idadeCrescente">Idade crescente</option>
        <option value="idadeDecrescente">Idade decrescente</option>
      </select>
    </>
  )
}

export default OrderList