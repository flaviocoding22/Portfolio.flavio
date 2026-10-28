# Como editar o site à mão

Quase tudo que aparece na home vem de um único arquivo: **`site/data/site.json`**.
Abra no GitHub (ícone de lápis), edite e salve com *Commit changes*. O site se atualiza sozinho
depois do deploy.

## O que cada campo muda

| Campo | Onde aparece |
|---|---|
| `name` | Título grande laranja da home |
| `fullName` | Aba do navegador e rodapé |
| `tagline` | Linha abaixo do título |
| `hero.image` | Foto principal (caminho, ex.: `assets/img/flavio.webp`). Vazio mostra o espaço cinza |
| `hero.position` | Enquadramento da foto na faixa, ex.: `"50% 40%"` (primeiro número: esquerda-direita; segundo: cima-baixo) |
| `about` | Parágrafos da seção Sobre (um item = um parágrafo) |
| `cv` | Linhas do Currículo: `when`, `title`, `text`, e opcionais `logo` e `link` |
| `resume.url` | Link do PDF do currículo (ex.: `assets/curriculo.pdf`). Vazio mostra o aviso `[PREENCHER]` |
| `contact` | Lista de contatos (e-mail, LinkedIn, GitHub...). Para e-mail use `mailto:` na `url` |

Regras do JSON: aspas duplas, vírgula entre itens, nenhuma vírgula depois do último. Se o site
ficar em branco depois de editar, quase sempre é uma vírgula sobrando; cole o arquivo em
jsonlint.com para achar o erro.

## Imagens e arquivos

- Fotos e logos: `site/assets/img/` (WebP ou JPG, até 1600 px de largura, preferência por preto e branco no hero).
- Currículo em PDF: `site/assets/curriculo.pdf` e `"resume": { "url": "assets/curriculo.pdf" }`.
- Para enviar arquivos pelo GitHub: *Add file → Upload files*, dentro da pasta certa.

## Projetos

Veja `docs/ADICIONAR_PROJETO.md`. Resumo: uma pasta em `site/projects/<nome>/` com `project.json`,
e o nome da pasta na lista de `site/projects/index.json` (a ordem do arquivo é a ordem na home).

## Currículo

O fonte do currículo é `docs/curriculo/curriculo.html` e o PDF publicado é `site/assets/curriculo.pdf`.
Para atualizar, edite o HTML e peça para regenerar o PDF (ou use *Imprimir → Salvar como PDF* no navegador com margens padrão e substitua o arquivo).
