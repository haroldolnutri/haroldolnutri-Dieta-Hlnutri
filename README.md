# Nutri Planner

Aplicação React para gestão de pacientes, alimentos e planos alimentares (@hlnutri).

## Requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
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

## Publicando no GitHub

```bash
cd nutri-planner
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

Troque `SEU_USUARIO/NOME_DO_REPO` pelo caminho do seu repositório no GitHub.
