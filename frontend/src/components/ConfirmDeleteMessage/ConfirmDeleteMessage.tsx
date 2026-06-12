type Props = {
  setShowDeleteMessage: React.Dispatch<React.ActionDispatch<boolean>>
}

function ConfirmDeleteMessage({setShowDeleteMessage}: Props) {


  function onCloseConfirmDeleteMessage() {
    setShowDeleteMessage(false)
  }

  return (
    <>
      <article className="confirm-delete-message-container">
        <span>Usuario deletado com sucesso!</span>
        <button onClick={onCloseConfirmDeleteMessage}>OK</button>
    </article>
    </>
  )
}

export default ConfirmDeleteMessage;