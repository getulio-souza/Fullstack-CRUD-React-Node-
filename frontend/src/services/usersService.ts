import type { User } from "../types/User";


    //removendo usuario
    export function removeSelectedUser(user: User, users: User[]) {
        const selectedUserToRemove = user;

        //criar uma nova lista sem o usuario selecionado para remover (nao pode alterar a lista original)
        const updatedList: User[] = users.filter((item: User) => item.id !== selectedUserToRemove?.id);
        console.log("lista atualizada apos remoção:", updatedList);

        //percorrendo o localStorage
        const usersFromLocal = JSON.parse(localStorage.getItem("newUser") || "[]");
        const updatedListOnLocalStorage = usersFromLocal.filter((user: User)=> user.id !== selectedUserToRemove.id)
        localStorage.setItem('newUser', JSON.stringify(updatedListOnLocalStorage))
        
        return updatedList
    }

    //editando usuario

    //criando usuario






