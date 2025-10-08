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
- `Row` busca os filmes/séries, renderiza as capas e permite rolar por categoria com setas. Ao clicar em um card, abre um painel de detalhes logo abaixo da linha com overview, nota, datas e trailer embutido (via `movie-trailer` + `react-youtube`).
- O `Banner` seleciona aleatoriamente um item dos originais Netflix e aplica seu `backdrop_path` como imagem de fundo. Os botões "Assistir" e "Minha Lista" possuem funcionalidades: reproduzir trailer e salvar no `localStorage`.

## Tecnologias

### Front-end
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> React
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> Vite
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> TypeScript
- <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/axios.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> Axios
- <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/YouTube_Icon.png" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> React YouTube
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> CSS (arquivos .css)

### Back-end
- <img src="https://www.themoviedb.org/assets/2/apple-touch-icon-0de2c1a382b7e4fb0e5bdcce84a8d8b0d8d70c980bafa5327c119cbb5cb6b91d.png" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> TMDB API (consumo de API pública)

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

## Novas funcionalidades
- Setas no carrossel (estilo Netflix):
  - Sempre visíveis (desktop e mobile), com destaque em hover.
  - Ocultação automática nos extremos: esquerda no início, direita no fim.
  - Clique por “página”: rola a largura visível do carrossel.
  - Press-and-hold (desktop) e toque contínuo (mobile) para rolagem contínua.
  - Alinhamento natural com `scroll-snap` no container e nos cards.
- Painel de detalhes na Row:
  - Ao clicar em um card, abre painel com overview, nota e datas.
  - Trailer embutido via YouTube; botão "Fechar" para ocultar.
- Botões do Banner:
  - "Assistir": busca e reproduz o trailer abaixo do banner.
  - "Minha Lista": salva o título atual no `localStorage` (evita duplicados) e exibe feedback.
- Logo da Netflix:
  - Clique na logo recarrega a página para atualizar os conteúdos.

### Dicas de uso
- Desktop: clique e segure nas setas para rolagem contínua; clique simples para rolagem por página.
- Mobile: toque e segure para rolar; um toque rápido desloca uma página.
- Se não houver conteúdo suficiente para rolar, as setas não aparecem, indicando o extremo.
 - Clique em um card para ver mais detalhes e trailer embutido.
 - No banner, use "Assistir" para ver o trailer e "Minha Lista" para salvar o título.

## Próximos passos (sugestões)
- Adicionar skeleton loaders durante o fetch.
- Paginação/infinit scroll por categoria.
- Cache local leve (ex.: SWR/React Query) para evitar refetch redundante.