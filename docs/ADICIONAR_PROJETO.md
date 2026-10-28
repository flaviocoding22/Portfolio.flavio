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

## Convertendo CADs

O navegador não abre STEP, IGES, SLDPRT ou IPT. Exporte ou converta:

- **SolidWorks / Fusion / Inventor:** exporte como STL ou GLTF/GLB (ou STEP e converta).
- **STEP → GLB:** FreeCAD (Arquivo → Exportar) ou o pacote Python `cascadio`.
- **STL → GLB:** `trimesh` (`trimesh.load("peca.stl").export("peca.glb")`).
- Reduza a malha se o arquivo passar de 25 MB (decimation no MeshLab ou Blender).

## Código

Use arquivos reais. Não coloque chaves, senhas nem dados de terceiros. Se o código vem de um
trabalho da faculdade ou da equipe, confirme que pode ser publicado.
