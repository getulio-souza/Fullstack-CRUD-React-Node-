import "./Footer.css"

const Footer = () => {
    return(
        <>
        <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h3>Minha Empresa</h3>
      <p>Desenvolvendo soluções modernas para web e mobile.</p>
    </div>

    <div className="footer-section">
      <h4>Links</h4>
      <ul>
        <li><a href="#">Início</a></li>
        <li><a href="#">Sobre</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Contato</h4>
      <p>Email: contato@empresa.com</p>
      <p>Tel: (11) 99999-9999</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2026 Minha Empresa. Todos os direitos reservados.</p>
  </div>
</footer>
        </>
    )
}

export default Footer;