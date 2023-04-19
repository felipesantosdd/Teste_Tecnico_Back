#!/usr/bin/env bash
# exit on error
set -o errexit
rm -rf dist

# Instala as dependências do projeto
npm install

npm install -g @nestjs/cli

npm add -D prisma
# Compila o código TypeScript
npm run build

# Gera as migrações do Prisma
npx prisma migrate dev --preview-feature

# Gera o schema do Prisma
npx prisma generate

# Copia os arquivos necessários para a pasta de construção
cp -R src/public dist/
cp src/config.json dist/
