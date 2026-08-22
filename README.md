# Dieta HLNutri

Aplicação React/Vite do **NutriPlanner @hlnutri** para gestão de pacientes, alimentos, planos alimentares, substituições equivalentes e exportação em PDF.

## Site publicado

<https://haroldolnutri.github.io/haroldolnutri-Dieta-Hlnutri/>

## Requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (instalado junto com o Node)

## Rodando localmente

```bash
npm install
npm run dev
```

Isso abre o app em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais ficam na pasta `dist/`.

## Estrutura

```
nutri-planner/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx      # ponto de entrada
│   ├── App.jsx        # componente principal (NutriPlanner)
│   └── index.css      # estilos base
```

## Publicação automática

O workflow `.github/workflows/deploy-pages.yml` valida a build e publica a pasta `dist` no GitHub Pages sempre que a branch `main` recebe alterações.

No GitHub, em **Settings → Pages → Build and deployment**, use **GitHub Actions** como fonte de publicação.

## Armazenamento

Pacientes, alimentos e dietas ficam salvos no navegador usado para acessar o sistema. Esta versão não possui banco de dados compartilhado.
