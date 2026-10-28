# Plano do portfolio

Status: `[ ]` a fazer · `[~]` em andamento · `[x]` feito

## Fase 1 — Esqueleto do site
- [x] Estrutura `site/` (index.html, css, js) com navegação mínima e hero (título laranja em caixa alta + foto P&B)
- [x] Seção Sobre mim, Currículo (com link para PDF) e Contato
- [x] Layout responsivo testado em 390 px e 1440 px

## Fase 2 — Projetos orientados a dados
- [x] `site/projects/index.json` e leitura dinâmica na home (grade de cartões)
- [x] Página de projeto genérica `project.html?p=<slug>` lendo `project.json`
- [x] Visualizador 3D (`<model-viewer>` para `.glb`; three.js + STLLoader para `.stl`)
- [x] Bloco de código com destaque de sintaxe (highlight.js) lendo arquivos de `code/`
- [x] Galeria de imagens e legendas
- [x] Projeto de exemplo com dados fictícios claramente marcados `[EXEMPLO]`

## Fase 3 — Conteúdo real (depende do dono)
- [~] Texto de apresentação e currículo (currículo em PDF feito; faltam resultados concretos da suspensão e o parágrafo final do Sobre)
- [x] Foto principal (escolhida pelo dono, em cor)
- [~] 3 a 5 projetos reais (feitos: pêndulo simples com prints e código, GeoLinkage; em andamento: suspensão Tupã): prints de CAD com descrição (3D opcional), código, imagens (página `suspensao-tupa` criada com logo da equipe Tupã; faltam prints e textos)
- [ ] Projeto em destaque de simulação (CAE) com resultados e validação

## Fase 4 — Publicação
- [~] Ativar GitHub Pages (workflow `.github/workflows/pages.yml` criado; falta o dono tornar o repositório público e escolher Settings → Pages → Source: GitHub Actions)
- [ ] Domínio próprio (opcional) e HTTPS
- [ ] SEO básico: título, descrição, Open Graph, favicon
- [ ] Revisão de acessibilidade e desempenho (Lighthouse)

## Ideias futuras
- Versão em inglês
- Demo interativa de vibrações (placa de Chladni, modos de uma viga)
- Blog curto com notas técnicas

## Perguntas
(o executor registra aqui dúvidas para o orquestrador ou para o dono)
- Fonte do título: usei Syne 800 (Google Fonts); "Archivo Expanded" não existe no Google Fonts. Confirmar se serve.
- Botão de currículo (PDF) é um placeholder sem link; falta o PDF e a decisão de onde hospedá-lo.
- Capa do exemplo e hero são SVG cinza (WebP só quando houver fotos reais).
- Visualizador STL usa three.js 0.160.0 via importmap; model-viewer 3.5.0 não foi exercitado (sem .glb de teste).
- Contato: e-mail institucional e links do LinkedIn e do GitHub estão públicos em `site/data/site.json` com aprovação do dono; GitHub (`flaviocoding22`) assumido pelo dono da sessão, confirmar.
- Currículo e competências preenchidos a partir do LinkedIn (prints do dono). Faltam foto, PDF e previsão de formatura.
- Pêndulo: prints geradas offscreen com a fonte padrão do Matplotlib; trocar por capturas da janela real (Windows) quando possível. A página cita que foi trabalho proposto pelo professor Leopoldo (informado pelo dono).
- GeoLinkage: link do jogo (github.io/GeoLinkage) respondeu 200 em teste; jogo posicionado depois da suspensão Tupã, a pedido do dono. Prints geradas jogando o código headless.
- Suspensão Tupã: sem CAD nem simulações do carro em desenvolvimento (decisão do dono, projeto em andamento). Página usa só fotos do carro anterior; faltam créditos das fotos e o texto sobre a função da gerência de suspensão. Antes de publicar material novo da equipe, confirmar com a equipe o que pode ser divulgado.
