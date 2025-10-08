# Clone Netflix

Projeto que replica a interface principal da Netflix com listagem de categorias, banner dinâmico e exibição de trailers via YouTube. Construído com React + Vite e integração à API do TMDB.

## Sumário
- Visão Geral
- Tecnologias utilizadas
- Como funciona
- Estrutura de Pastas
- Scripts
- Passo a passo para rodar
- Novas funcionalidades
- Dicas de uso
- Melhorias de desempenho aplicadas
- Próximos passos

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

## Tecnologias utilizadas

- <img src="src/assets/tech-icons/react.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> React
- <img src="src/assets/tech-icons/vite.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> Vite
- <img src="src/assets/tech-icons/typescript.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> TypeScript
- <img src="src/assets/tech-icons/axios.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> Axios
- <img src="src/assets/tech-icons/youtube.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> YouTube (react-youtube)
- <img src="src/assets/tech-icons/css3.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> CSS
- <img src="src/assets/tech-icons/tmdb.svg" width="26" height="26" style="vertical-align:middle; margin-right:6px;" /> TMDB API

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