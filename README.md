# Portfolio de Engenharia

Site pessoal estático (HTML, CSS e JS puros) para mostrar projetos de CAE, simulação e vibrações:
modelos de código, CADs 3D visualizáveis no navegador, imagens de resultados e currículo.
Hospedagem prevista: GitHub Pages.

## Estrutura

```
site/        o site (é a pasta publicada)
docs/        plano de trabalho e guia para adicionar projetos
CLAUDE.md    regras e divisão de trabalho para agentes
```

## Rodar localmente

```bash
cd site && python3 -m http.server 8000
```

## Adicionar projeto

Veja [docs/ADICIONAR_PROJETO.md](docs/ADICIONAR_PROJETO.md). Basta criar uma pasta com um `project.json`, o código e o
modelo 3D, e registrar o nome em `site/projects/index.json`.

## Publicar

O deploy é feito pelo GitHub Pages a partir da pasta `site/` (ver Fase 4 em [docs/PLANO.md](docs/PLANO.md)).

## Como trabalhar com agentes

Um modelo orquestrador (Opus) planeja e revisa, e um executor (Sonnet) implementa as tarefas de
`docs/PLANO.md`. Regras completas em [CLAUDE.md](CLAUDE.md).
