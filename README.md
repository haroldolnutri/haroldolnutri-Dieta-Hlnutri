# Dieta HLNutri

Aplicação React/Vite do **NutriPlanner @hlnutri** para gestão de pacientes, alimentos, planos alimentares, substituições equivalentes e exportação em PDF.

## Site publicado

<https://haroldolnutri.github.io/haroldolnutri-Dieta-Hlnutri/>

## Requisitos

- [Node.js](https://nodejs.org/) 22 ou superior
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
│   ├── auth/           # sessão, login e recuperação de senha
│   └── index.css      # estilos base
```

## Acesso protegido

O login usa o Supabase Auth. A senha é validada pelo serviço de autenticação e nunca deve ser colocada no código ou nas configurações do GitHub.

1. Crie um projeto no Supabase.
2. Em **Authentication → Providers → Email**, mantenha o login por e-mail ativo e desative novos cadastros públicos.
3. Em **Authentication → Users**, crie manualmente a única conta autorizada.
4. Em **Authentication → URL Configuration**, configure:
   - Site URL: `https://haroldolnutri.github.io/haroldolnutri-Dieta-Hlnutri/`
   - Redirect URL: `https://haroldolnutri.github.io/haroldolnutri-Dieta-Hlnutri/**`
5. O workflow de publicação fornece ao build a URL e a chave pública do projeto Supabase.

Use somente a chave pública (`publishable`). Nunca coloque uma chave `secret` ou `service_role` no navegador.

Para desenvolvimento local, copie `.env.example` para `.env.local` e preencha apenas os dois valores públicos.

## Publicação automática

O workflow `.github/workflows/deploy-pages.yml` valida a build e publica a pasta `dist` no GitHub Pages sempre que a branch `main` recebe alterações.

No GitHub, em **Settings → Pages → Build and deployment**, use **GitHub Actions** como fonte de publicação.

## Armazenamento

Pacientes, alimentos e dietas ficam salvos no navegador usado para acessar o sistema. Esta versão não possui banco de dados compartilhado.
