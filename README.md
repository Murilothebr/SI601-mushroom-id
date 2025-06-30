# Mushroom ID

## Autor: Murilo Marçal

## Descrição

API crud de cogumelos para tornar o aprendizado sobre cogumelos mais interativo e educativo. Os usuários exploram diferentes espécies apresentadas em cards visuais e são desafiados a identificar corretamente a espécie com base nas informações exibidas.

## Diagrama de Entidade-Relacionamento (ERD):

  ### https://dbdiagram.io/d/680831891ca52373f5f53f8b

## 📦 Requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes requisitos instalados:

- [Docker](https://www.docker.com/) (versão 20 ou superior recomendada)
- [Docker Compose](https://docs.docker.com/compose/) (v2 ou superior)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (versão 10 ou superior)

---

## 🐘 Como rodar o banco de dados (MySQL)

1. **Suba o container do banco de dados com Docker Compose:**

```bash
docker-compose up -d

npx prisma migrate dev
```

## Compilar e rodar o projeto

```bash

$ npm install

$ npm run start
```

### Checklist de Desenvolvimento da API com NestJS

#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS

- [x] **ID1:** Configuração correta do ambiente e criação da API com rotas e controladores modulares.
- [x] **ID2:** Organização da lógica de negócio em services chamados pelos controladores.
- [x] **ID3:** Uso de providers e injeção de dependência configurada corretamente.
- [x] **ID4:** Criação e manipulação de rotas HTTP com parâmetros de rota, query e body.
- [x] **ID5:** Implementação de tratamento de erros utilizando filtros globais personalizados.
- [x] **ID6:** Criação e utilização de classes DTO para validação e consistência dos dados.
- [x] **ID7:** Aplicação de pipes de validação para assegurar integridade dos dados.

#### RA2 - Implementar persistência de dados com banco relacional (Prisma ou TypeORM)

- [x] **ID8:** Modelagem correta das entidades e relações (ERD).
- [x] **ID9:** Conexão configurada corretamente com banco de dados relacional (Prisma ou TypeORM).
- [x] **ID10:** Criação e aplicação das migrações de banco de dados.
- [x] **ID11:** Implementação correta das operações CRUD para uma ou mais entidades.

#### RA3 - Realizar testes automatizados da API

- [ ] **ID12:** Implementação de testes automatizados (unitários/integrados) utilizando Jest.
- [ ] **ID13:** Garantia de cobertura de testes nas principais rotas e serviços.

#### RA4 - Gerar documentação e realizar deploy da API

- [x] **ID14:** Integração correta do Swagger, documentação completa e interativa.
- [ ] **ID15:** Deploy realizado com sucesso em plataforma de hospedagem na nuvem.
- [ ] **ID16:** Verificação funcional no ambiente de produção (API, Swagger, banco de dados).
- [x] **ID17:** Configuração correta das variáveis de ambiente com ConfigModule.
- [x] **ID18:** Implementação correta do versionamento das APIs REST.

#### RA5 - Implementar autenticação, autorização e segurança

- [x] **ID19:** Configuração da autenticação utilizando JWT.
- [x] **ID20:** Implementação de Guards para controle de acesso baseado em roles e permissões.
- [x] **ID21:** Configuração e uso de middleware para manipulação prévia das requisições.
- [x] **ID22:** Implementação de interceptadores para realizar logging ou modificar as respostas antes de enviá-las ao cliente.
