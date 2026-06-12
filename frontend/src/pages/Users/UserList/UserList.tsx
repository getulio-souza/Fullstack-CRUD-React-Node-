import "./userList.css";
import { createContext, useEffect, useState } from "react";
import type { User } from "../../../types/User";
import UserFilter from "../../../components/usersFilter/UserFilter";
import OrderList from "../../../components/OrderList/OrderList";
import { useNavigate } from "react-router-dom";
import DeleteUserModal from "../../../components/DeleteUserModal/DeleteUserModal";
import UsersPagination from "../../../components/Pagination/Pagination";
import { userPagination } from "../../../hooks/usePagination";
import { useFilterUsers } from "../../../hooks/FilterUsers";
import Header from "../../../components/header/Header";

type Props = {
  users: User[];
  setEditUser: (user: User) => void;
  setRemoveUser: (user: User) => void;
};

type DeleteUserContextType = {
    selectedUser: User | null;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirmDeleteUser: (selectedUser: User | null) => void
}

//context para a açao de deletar usuario
export const DeleteUserContext = createContext<DeleteUserContextType | null>(null);

export function UserList({ users, setEditUser, setRemoveUser }: Props) {

  const navigate = useNavigate();

  //filtros
  const [searchUser, setSearchUser] = useState<User[]>(users);
  const [userInputText, setUserInputText] = useState<string>("");
  const [sortUsers, setSortUsers] = useState<string>("");

  //select user
  const [selectedUser, setSelectedUser] = useState<User>();

  //state para o modal de deleção
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //state para a paginação
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);


  //hook para o select de opções - primeiro a ordenação
  const {
    filteredUsers,
    selectedSortOption,
    onSortUsers,
  } = useFilterUsers({
    users: searchUser,
  })


  //pagination hook - depois a paginação
  const {
    currentPage,
    totalPages,
    paginatedItems,
    moveToNextPage,
    moveToFirstPage,
    moveToLastPage,
    moveToPreviousPage,
    moveToPageOnClick
  } = userPagination({
    items:  filteredUsers || users,
    itemsPerPage: 5
  })

  console.log('usuarios filtrados:', filteredUsers)

  //metodo para abrir o modal de deleção
  function onOpenDeleteUserModal(selectedUser: User) {
    setSelectedUser(selectedUser);
    setShowDeleteModal(true);
  }

  //funcao para deletar o usuario de vez (botão deletar no modal)
  function onConfirmDeleteUser(selectedUser: User) {
    setRemoveUser(selectedUser);

    //atualiza a lista depois de remover
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);

    setSearchUser(updatedUsers);

    setShowDeleteModal(false);
  }

  function onEditUser(selectedUser: User) {
    setEditUser(selectedUser);
    navigate("/form");
  }

  //metodo para filtrar o input de texto
  function onSearchUsers(userInput: string) {
    console.log("filtrando usuarios no componente de tabela:", userInput);
    console.log("array de users:", users);

    //logica para mostrar os items filtrados na tabela
    const newUserList = users.filter((user) =>
      user.name.toLowerCase().startsWith(userInput.toLowerCase()),
    );
    console.log("novo usuario filtrado:", newUserList);

    //com o usuario filtrado retornado, atualizar a tabela
    setSearchUser(newUserList);

    //guardando o valor do input no meu state que manipula o texto digitado
    setUserInputText(userInput);
  }

  function onClearFilters() {
    //resgatando a lista original
    setSearchUser(users);

    //limpando o campo de input
    setUserInputText("");

    //limpando filtro de ordenação
    setSortUsers("");
  }

  //sincronizando a lista para continuar aparecendo mesmo depois de recarregar a página
  useEffect(() => {
  setSearchUser(filteredUsers);
}, [users]);

  return (
    <>
      <Header/>
      <section className="list-container">
        {/* modal de deleção - verifica antes se o usuario selecionado existe */}
        {selectedUser
          ? showDeleteModal && (
            <DeleteUserContext.Provider value={{selectedUser, setShowDeleteModal, onConfirmDeleteUser}}>
              <DeleteUserModal/>
            </DeleteUserContext.Provider>
            )
          : null}

        <h2>Lista de usuários</h2>

        {/* filtros */}
        <div className="filters-container">
          <UserFilter
            userInputText={userInputText}
            setSearchUser={onSearchUsers}
          />
          <OrderList 
            setSortUsers={onSortUsers} 
            sortUsers={selectedSortOption} 
          />
          <button onClick={onClearFilters}>Clear Filters</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ocupação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 && (
              <tr style={{ color: "red", fontWeight: "bold", padding: "10px" }}>
                <td>Sem usuários para exibir.</td>
              </tr>
            )}

            {paginatedItems.map((user: User, index: any) => (
              <tr key={index}>
                <td data-label="id: ">{user?.id}</td>
                <td data-label="nome: ">{user?.name}</td>
                <td data-label="idade: ">{user?.age}</td>
                <td data-label="ocupação: ">{user?.occupation}</td>
                <td className="actions-list">
                  <button className="edit-btn" onClick={() => onEditUser(user)}>
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onOpenDeleteUserModal(user)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UsersPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          moveToNextPage={moveToNextPage}
          moveToPreviousPage={moveToPreviousPage}
          moveToFirstPage={moveToFirstPage}
          moveToLastPage={moveToLastPage}
          moveToPageOnClick={moveToPageOnClick}
          totalPages={totalPages}
        />
      </section>
    </>
  );
}
