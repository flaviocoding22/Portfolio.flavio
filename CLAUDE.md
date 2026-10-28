# Instruções para agentes — Portfolio de Flávio

Portfolio de engenharia (CAE, vibrações, simulação) de um estudante de Engenharia Mecânica.
Site estático hospedado no GitHub Pages. Idioma do conteúdo: português (pt-BR), com opção de inglês depois.

## Divisão de trabalho

- **Opus (orquestrador):** decide arquitetura, quebra o trabalho em tarefas (`docs/PLANO.md`), revisa
  entregas, aprova mudanças de design e conteúdo. Não faz trabalho repetitivo.
- **Sonnet (executor):** implementa as tarefas já definidas: HTML/CSS/JS, conversão de arquivos,
  páginas de projeto, ajustes, testes visuais. Atualiza o status em `docs/PLANO.md` ao terminar cada tarefa.
- Dúvida de escopo ou de design: o executor anota em `docs/PLANO.md` (seção "Perguntas") e segue com
  o restante, sem inventar decisões.

## Regras do projeto

1. **Sem etapa de build.** Apenas HTML, CSS e JavaScript puros em `site/`, que o GitHub Pages serve direto.
   Bibliotecas só por CDN (cdnjs, jsdelivr, unpkg) com versão fixa.
2. **Conteúdo guiado por dados.** Projetos ficam em `site/projects/<slug>/` com um `project.json`
   (formato em `docs/ADICIONAR_PROJETO.md`). A home lê `site/projects/index.json`. Adicionar um projeto nunca deve
   exigir mexer em HTML.
   Textos pessoais, contatos e currículo ficam em `site/data/site.json` (guia em `docs/EDITAR_SITE.md`);
   nunca fixar esse conteúdo em HTML. O dono edita esses arquivos à mão, então manter o JSON simples e comentado em `_ajuda`.
3. **Modelos 3D (opcionais):** o navegador não abre STEP/IGES/SLDPRT. Converter para `.glb` (preferido) ou `.stl`
   e guardar em `site/projects/<slug>/model/`. Manter cada arquivo abaixo de 25 MB.
4. **Código:** exibir com destaque de sintaxe a partir de arquivos reais em `site/projects/<slug>/code/`,
   sem colar código dentro de HTML.
5. **Visual:** fundo branco, tipografia grande em caixa alta, cor de destaque laranja `#FF8A00`,
   fotos em preto e branco (exceção: a foto principal da home fica em cor, escolha do dono), navegação mínima (Sobre, Currículo, Projetos, Contato). Mobile primeiro.
6. **Acessibilidade e desempenho:** texto alternativo em imagens, contraste suficiente, imagens
   otimizadas (WebP, largura máxima 1600 px), `loading="lazy"`.
7. **Não inventar conteúdo pessoal.** Nome completo, cargos, datas, resultados e fotos vêm do dono do
   portfolio. Onde faltar, usar marcadores `[PREENCHER: ...]`, nunca texto fictício apresentado como real. Os marcadores ficam escondidos no site publicado e aparecem com `?rascunho=1`.
8. **Não copiar** textos, fotos ou marca de outros portfolios. A referência de estilo é só o layout geral.
9. Nada de dados sensíveis no repositório: sem chaves, sem e-mail pessoal em texto puro (usar formulário
   ou link `mailto:` que o dono aprovar), sem CADs de terceiros ou sob NDA.

## Testar localmente

```bash
cd site && python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Conferir em largura de celular (390 px) e desktop (1440 px).

## Commits

Mensagens curtas, no imperativo, em português ou inglês de forma consistente. Um assunto por commit.
