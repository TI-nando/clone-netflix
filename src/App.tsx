import { Row } from "./components/Row";
import requests from "./apiConfig";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Vamos Contruir o Clone da Netflix</h1>

      <Row
        title="Originais Netflix"
        fetchUrl="resquest.fetchNetFliixOriginals"
        isLargeRow
      />
      <Row title="Em Alta" fetchUrl={requests.fetchTrending} />
      <Row title="Mais Votados" fetchUrl={requests.fetchTopRated} />
      <Row title="Filmes de Ação" fetchUrl={requests.fetchActionMovies} />
      <Row title="Filmes de Comédia" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Filmes de Terror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Filmes de Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentários" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
