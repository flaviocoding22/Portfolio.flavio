# Como adicionar um projeto

1. Crie a pasta `site/projects/<slug>/` (slug em minúsculas, sem acentos, com hífens).
2. Coloque os arquivos:

```
site/projects/<slug>/
├── project.json
├── cover.webp          capa (16:9, até 1600 px de largura)
├── images/             imagens extras
├── model/              .glb ou .stl para o visualizador 3D
└── code/               arquivos de código reais (.py, .m, .ipynb exportado em .py, etc.)
```

3. Preencha `project.json`:

```json
{
  "title": "Título do projeto",
  "summary": "Uma frase que aparece no cartão.",
  "year": 2026,
  "tags": ["CAE", "Python", "FEA"],
  "cover": "cover.webp",
  "description": "Texto em parágrafos. Contexto, método, resultado e o que você aprendeu.",
  "models": [
    { "file": "model/suporte.glb", "caption": "Suporte otimizado" }
  ],
  "code": [
    { "file": "code/solver.py", "language": "python", "caption": "Solver de vigas" }
  ],
  "images": [
    { "file": "images/tensao.webp", "caption": "Mapa de tensão de von Mises" }
  ],
  "links": [
    { "label": "Repositório", "url": "https://github.com/..." }
  ]
}
```

4. Acrescente o slug em `site/projects/index.json` (a ordem do arquivo é a ordem na home).

## Só prints, sem arquivo 3D

O modelo 3D é opcional. Para mostrar um CAD, basta um print (renderização ou captura da tela) e uma
descrição. Não inclua `models` no `project.json`. Cada imagem aceita um `title` (nome da peça) e uma
`caption` (descrição):

```json
"images": [
  { "file": "images/upright.webp", "title": "Upright dianteiro", "caption": "Alumínio 7075, 410 g. Cargas de curva e frenagem simuladas." }
]
```

## Logo no projeto

Para mostrar a logo de uma equipe ou empresa no topo da página, coloque o arquivo na pasta do projeto e
acrescente `"logo": "logo.webp"` e `"logoAlt": "Logo da equipe ..."` ao `project.json`. A capa do cartão
na home é o campo `cover`.

## Convertendo CADs

O navegador não abre STEP, IGES, SLDPRT ou IPT. Exporte ou converta:

- **SolidWorks / Fusion / Inventor:** exporte como STL ou GLTF/GLB (ou STEP e converta).
- **STEP → GLB:** FreeCAD (Arquivo → Exportar) ou o pacote Python `cascadio`.
- **STL → GLB:** `trimesh` (`trimesh.load("peca.stl").export("peca.glb")`).
- Reduza a malha se o arquivo passar de 25 MB (decimation no MeshLab ou Blender).

## Código

Use arquivos reais. Não coloque chaves, senhas nem dados de terceiros. Se o código vem de um
trabalho da faculdade ou da equipe, confirme que pode ser publicado.

## Capa em preto e branco

Para fotos (carro, equipe, pessoas), acrescente `"coverPhoto": true` ao `project.json`: a capa fica em preto e branco
e ganha cor ao passar o mouse. Capturas de tela e gráficos ficam sempre em cor.
