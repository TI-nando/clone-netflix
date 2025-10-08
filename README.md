# Clone Netflix

Projeto que replica a interface principal da Netflix com listagem de categorias, banner dinâmico e exibição de trailers via YouTube. Construído com React + Vite e integração à API do TMDB.

## Visão Geral
- Navegação com barra que muda de cor ao rolar.
- Banner dinâmico que exibe um título aleatório dos originais Netflix.
- Linhas horizontais por categoria, com setas visíveis e rolagem suave.
- Clique em um card abre o trailer relacionado na própria página.

## Como funciona
- O cliente consome endpoints do TMDB (`/discover`, `/trending`, `/movie/top_rated` etc.) através de um `axios` pré-configurado com `baseURL`.
- As categorias são definidas em `src/apiConfig.ts` e passadas para o componente `Row`.
- `Row` busca os filmes/series, renderiza as capas e permite rolar por categoria com setas. O click tenta localizar um trailer com a lib `movie-trailer` e renderiza via `react-youtube`.
- O `Banner` seleciona aleatoriamente um item dos originais Netflix e aplica seu `backdrop_path` como imagem de fundo.

## Tecnologias

### Front-end
- ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg) React
- ![Vite](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg) Vite
- ![TypeScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg) TypeScript
- ![Axios](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg) Axios
- ![YouTube](https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png) React YouTube
- ![CSS3](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg) CSS Modules simples

### Back-end
- ![TMDB](https://www.themoviedb.org/assets/2/apple-touch-icon-0de2c1a382b7e4fb0e5bdcce84a8d8b0d8d70c980bafa5327c119cbb5cb6b91d.png) TMDB API (consumo de API pública)

Observação: Não há servidor próprio neste projeto. O "back-end" aqui refere-se à API de terceiros (TMDB) utilizada para obter dados.

## Estrutura de Pastas
- `src/axios.ts`: instancia do `axios` com `baseURL` para TMDB.
- `src/apiConfig.ts`: endpoints por categoria.
- `src/components/Nav.tsx` e `.css`: barra de navegação responsiva.
- `src/components/Banner.tsx` e `.css`: banner dinâmico.
- `src/components/Row.tsx` e `.css`: linhas por categoria com rolagem via setas.
- `src/App.tsx`: composição dos componentes.

## Scripts
- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: gera build de produção.
- `npm run preview`: pré-visualiza o build.

## Passo a passo para rodar
1. Instale dependências: `npm install`.
2. Inicie o projeto: `npm run dev`.
3. Abra a URL fornecida pelo Vite no navegador.

## Melhorias de desempenho aplicadas
- Lazy-loading de imagens nos cards (`loading="lazy"`).
- Rolagem suave por largura de viewport para uma experiência consistente.
- Correção do cálculo aleatório no Banner, evitando índices inválidos.
- Ajuste do `fetchUrl` dos Originais Netflix no `App.tsx` para evitar requisições quebradas.

## Novas funcionalidades (setas estilo Netflix)
- Setas sempre visíveis (desktop e mobile), com destaque em hover.
- Ocultação automática nos extremos: a seta esquerda some ao chegar no início e a direita ao chegar no fim.
- Clique por “página”: um clique rola a largura visível do carrossel.
- Press-and-hold (desktop): segurar o clique na seta inicia rolagem contínua, soltou/parou.
- Toque contínuo (mobile): tocar e segurar rola continuamente; soltar interrompe.
- Alinhamento natural dos itens com `scroll-snap` no container e nos cards.

### Dicas de uso
- Desktop: clique e segure nas setas para rolagem contínua; clique simples para rolagem por página.
- Mobile: toque e segure para rolar; um toque rápido desloca uma página.
- Se não houver conteúdo suficiente para rolar, as setas não aparecem, indicando o extremo.

## Próximos passos (sugestões)
- Adicionar skeleton loaders durante o fetch.
- Paginação/infinit scroll por categoria.
- Cache local leve (ex.: SWR/React Query) para evitar refetch redundante.