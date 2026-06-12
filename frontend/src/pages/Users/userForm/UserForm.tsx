import { useEffect, useState } from "react";
import "./userForm.css";
import type { User } from "../../../types/User";
import { useNavigate } from "react-router-dom";

type Props = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  editUser: User | null;
};

export function UserForm({ setUsers, editUser }: Props) {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

  console.log('dados do usuario:', editUser)

  //para mostrar o usuario editado no formulario
  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setAge(editUser.age || "");
      setOccupation(editUser.occupation || "");
    } else{
      setName("");
      setAge("");
      setOccupation("");
    }
  }, [editUser]);

  //use effect para os usuarios do localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("newUser") || "[]");

    if (!storedUsers) return;

    if (Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);
  //se o array de dependencias estiver vazio, ele vai rodar apenas uma vez
  //nesse caso queremos que ele rode sempre que editUser mudar (o usuario selecionar um usuario diferente na tabela)

  
    function SubmitForm(event: React.FormEvent<HTMLFormElement> ){

      event.preventDefault();
  
      const form: FormData = new FormData(event.currentTarget);
  
      const newUser = getFormData(form);
  
      const previousUsers = getUsersFromLocalStorage();
  
      const updatedUsers = editUser ? updateUser(previousUsers, newUser) : createUser(previousUsers, newUser)
      
      localStorage.setItem('newUser', JSON.stringify(updatedUsers))
  
      saveUsers(updatedUsers)

      //navegando para a tela de listagem de usuarios
      navigate("/list");
  
      clearForm();
    }
  


  //pegando dados do formulario
  function getFormData(form: FormData){
    const id = editUser?.id || Math.floor(Math.random() * 1000);

    return {
      id,
      name: form.get("name")?.toString() || "",
      age: form.get("age")?.toString() || "",
      occupation: form.get("occupation")?.toString() || ""
    }
  }


  //pegando os usuarios do localStorage
  function getUsersFromLocalStorage(){
    const users = localStorage.getItem('newUser');

    if(!users) return [];

    let parsedUsers;

    try {
      parsedUsers = JSON.parse(users)
    } catch {
      return [];
    }

    return Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]; //aqui o dado retornado sempre vem em forma de array
  }


  //atualizando users ao clicar no botao edit
  function updateUser(users: User[], newUser: User){
    return users.map((user)=> {
      if(user.id === newUser.id){
        return newUser;
      }
      return user;
    })
  }


  //criando novo usuario
  function createUser(users: User[], newUser: User){
    return [newUser, ...users]

    //navegando para a tela de listagem de usuarios
    

  }

  //salvando so dados no localStorage
  function saveUsers(users: User[]){
    localStorage.setItem('newUser', JSON.stringify(users));
    setUsers(users)
  }

  
  //limpando os dados do formulario
  function clearForm(){
    setName("");
    setAge("");
    setOccupation("");
  }

  function backToUserList(){
    navigate("/list")
  }

  return (
    <>

    <section className="form-container">
      <h1>Formulário de Cadastro</h1>

      <form onSubmit={SubmitForm}>
        <div className="input-field">
          <label htmlFor="">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            name="name"
            type="text"
          />
        </div>
        <div className="input-field">
          <label htmlFor="">Idade</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Digite sua idade"
            name="age"
            type="text"
          />
        </div>
        <div className="input-field">
          <label htmlFor="">Ocupação</label>
          <input
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            placeholder="Digite sua profissão"
            name="occupation"
            type="text"
          />
        </div>
        
        <div className="btn-container">
        <button className="cancel-btn" type="button" onClick={backToUserList}>Cancelar</button>
        <button className="submit-btn" type="submit">Salvar</button>
        </div>
      </form>

    </section>
    </>
  );
}
