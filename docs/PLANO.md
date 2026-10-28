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
- [ ] Texto de apresentação e currículo
- [ ] Foto principal em P&B
- [ ] 3 a 5 projetos reais: código, CADs convertidos, imagens, descrição técnica
- [ ] Projeto em destaque de simulação (CAE) com resultados e validação

## Fase 4 — Publicação
- [ ] Ativar GitHub Pages (pasta `site/`, via GitHub Actions)
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
