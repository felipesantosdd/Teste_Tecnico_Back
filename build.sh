#!/bin/bash

# Remove a pasta de construção se ela já existir
rm -rf dist

# Instala as dependências do projeto
npm install

# Compila o código TypeScript
npm run build

# Gera as migrações do Prisma
npx prisma migrate dev --preview-feature

# Gera o schema do Prisma
npx prisma generate

# Copia os arquivos necessários para a pasta de construção
cp -R src/public dist/
cp src/config.json dist/

# Inicia o servidor com o PM2
pm2 start dist/main.js --name teste_tecnico_back