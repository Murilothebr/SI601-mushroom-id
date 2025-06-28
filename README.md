# Mushroom ID

## Identificação/Autor: Murilo Marçal

## Descrição

API crud de cogumelos para tornar o aprendizado sobre cogumelos mais interativo e educativo. Os usuários exploram diferentes espécies apresentadas em cards visuais e são desafiados a identificar corretamente a espécie com base nas informações exibidas.

## Diagrama de Entidade-Relacionamento (ERD):

  ### https://dbdiagram.io/d/680831891ca52373f5f53f8b
  
  ![Untitled](https://github.com/user-attachments/assets/42502a90-4eff-4669-bf9d-2c718d279f86)

## Compilar e rodar o projeto

```bash

$ npm install

$ npm run start

$ npm run start:dev

$ npm run start:prod
```

### Checklist de Desenvolvimento da API com NestJS

#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS

- [ ] **ID1:** Configuração correta do ambiente e criação da API com rotas e controladores modulares.
- [ ] **ID2:** Organização da lógica de negócio em services chamados pelos controladores.
- [ ] **ID3:** Uso de providers e injeção de dependência configurada corretamente.
- [ ] **ID4:** Criação e manipulação de rotas HTTP com parâmetros de rota, query e body.
- [ ] **ID5:** Implementação de tratamento de erros utilizando filtros globais personalizados.
- [ ] **ID6:** Criação e utilização de classes DTO para validação e consistência dos dados.
- [ ] **ID7:** Aplicação de pipes de validação para assegurar integridade dos dados.

#### RA2 - Implementar persistência de dados com banco relacional (Prisma ou TypeORM)

- [ ] **ID8:** Modelagem correta das entidades e relações (ERD).
- [ ] **ID9:** Conexão configurada corretamente com banco de dados relacional (Prisma ou TypeORM).
- [ ] **ID10:** Criação e aplicação das migrações de banco de dados.
- [ ] **ID11:** Implementação correta das operações CRUD para uma ou mais entidades.

#### RA3 - Realizar testes automatizados da API

- [ ] **ID12:** Implementação de testes automatizados (unitários/integrados) utilizando Jest.
- [ ] **ID13:** Garantia de cobertura de testes nas principais rotas e serviços.

#### RA4 - Gerar documentação e realizar deploy da API

- [ ] **ID14:** Integração correta do Swagger, documentação completa e interativa.
- [ ] **ID15:** Deploy realizado com sucesso em plataforma de hospedagem na nuvem.
- [ ] **ID16:** Verificação funcional no ambiente de produção (API, Swagger, banco de dados).
- [ ] **ID17:** Configuração correta das variáveis de ambiente com ConfigModule.
- [ ] **ID18:** Implementação correta do versionamento das APIs REST.

#### RA5 - Implementar autenticação, autorização e segurança

- [ ] **ID19:** Configuração da autenticação utilizando JWT.
- [ ] **ID20:** Implementação de Guards para controle de acesso baseado em roles e permissões.
- [ ] **ID21:** Configuração e uso de middleware para manipulação prévia das requisições.
- [ ] **ID22:** Implementação de interceptadores para logging ou manip
