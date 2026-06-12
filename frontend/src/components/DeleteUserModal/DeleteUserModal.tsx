import CloseIcon from '@mui/icons-material/Close';
import "./DeleteUserModal.css"
import { useContext } from 'react';
import { DeleteUserContext } from '../../pages/Users/UserList/UserList';

function DeleteUserModal(){
    
    const deleteContext = useContext(DeleteUserContext)

    if(!deleteContext) return null;

    //destruturacao dos parametros passados para o useContext 
    const {selectedUser, setShowDeleteModal, onConfirmDeleteUser} = deleteContext;

    function onCancelDeleteUser(){
      setShowDeleteModal(false);
    }

    function onDeleteUser(){
      onConfirmDeleteUser(selectedUser)
      setShowDeleteModal(false);
    }

    return(
        <>
        <section className='overlay'>
        <article className='delete-modal-container'>
            <div className='close-modal-icon' onClick={onCancelDeleteUser}><CloseIcon/></div>
            <h3 className="delete-user-message">
                Tem certeza que deseja excluir o usuario: <span style={{ color: 'red', marginBottom: '10px' }}>{selectedUser.name}</span> ?
            </h3>
          
            <div className="btn-container">
                <button onClick={onCancelDeleteUser} className="btn-cancel">Cancelar</button>
                <button onClick={onDeleteUser} className="btn-save">Confirmar</button>
            </div>
        </article>
        </section>
        </>
    )
}

export default DeleteUserModal;