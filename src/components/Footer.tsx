import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <span className="footer__logo">Netflix Clone</span>
          <span className="footer__year">© {new Date().getFullYear()}</span>
        </div>
        <div className="footer__links">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a>
          <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a>
        </div>
      </div>
      <div className="footer__note" title="Projeto de aprendizado">
      </div>
    </footer>
  );
}