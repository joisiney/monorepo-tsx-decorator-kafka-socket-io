<h1 align="center">😇 Olimpo News</h1>
<p align="center">Olympus News é um monorepositório que integra o BE e o FE de um gerador de notícias.<br/><strong>Está é apenas uma POC de RN/KAFKA/SOCKET.IO</strong>.</p>

<p align="center">
<img alt="Olympus News" src="https://img.freepik.com/vetores-gratis/conjunto-de-pessoas-e-elementos-do-antigo-imperio-romano-soldados-mulheres-guerreiras-imperador-colunas-cidadaos-senador-em-fundo-branco_575670-1254.jpg?w=1380&t=st=1707880477~exp=1707881077~hmac=49cfea368b757a3ae20c352d3852e2bcf5c3bf7f848e6120bda6a42537e32448" />
</p>

## 🥶 Sobre o projeto

Dividi este workspace em 3 aplicativos e 9 bibliotecas. Esta é uma arquitetura robusta projetada para escalar tanto na vertical, com poucos projetos, porém muito grandes (monolito), quanto na horizontal, com diversos microprojetos, todos integrados com o Apache Kafka e com o máximo de reaproveitamento de código entre cada aplicativo.

## Aplicativos:

1. **app/be-demeter:** Este serviço é responsável por produzir as notícias na fila do Apache Kafka, enviadas pelo `app/be-apolo`. [mais info](apps/be-demeter/demeter.md)
   
2. **app/be-apolo:** Esta API REST é responsável pela consumir e envio de notícias para a fila do Apache Kafka. Além disso, este servidor também é responsável pelo gerenciamento do CRUD de usuários. [mais info](apps/be-apolo/readme.md)
   
3. **app/fe-rn-atena:** Este APP, desenvolvido em React Native e inicializado com Expo, é responsável pela visualização do CRUD de notícias e usuários. Além disso, ele irá lidar com a atualização em tempo real das notícias e dos usuários. [mais info](apps/fe-rn-atena/readme.md)

## Bibliotecas:

1. **packages/domain-ceos:** É onde fica a camada de `domain` da aplicação. Esta camada será responsável por centralizar a lógica de todos os aplicativos em um único pacote, facilitando a manutenção e escalabilidade. [mais info](docs/ceos.md)
   
2. **packages/lib-hera:** Bibliotecas comuns utilizadas por todos os `apps/*` ou `packages/*`. [mais info](docs/hera.md)
   
3. **packages/lint-zeus:** Este modulo é responsável por definir as configurações padrão globais para o `lint` e `prettier` dentro do `monorepo`. [mais info](docs/zeus.md)
   
4. **packages/vitest-kairos:** Prepare-se para uma revolução nos testes! Este módulo é o coração pulsante de todos os testes unitários, de integração e end-to-end da nossa aplicação. Chega de perder tempo configurando ambientes de teste em cada projeto! Aqui, reunimos toda a força e energia para garantir que todos os testes da aplicação sejam escritos com paixão e precisão. Este é o lugar onde a magia dos testes acontece! [mais info](docs/kairos.md).
   
5. **packages/kafka-persefone** é uma biblioteca focada em facilitar a produção e consumo de informações por meio do Apache Kafka.
   
6. **packages/io-server-pluto** serviço e decorator para **socket.io**
   
7. **packages/gateway-eros** é uma padronização para consultar dados pelo FE, altamente acoplada ao **react-query** e ao **packages/domain-ceos**, garantindo a integridade entre as entidades do FE e do BE.
   
8. **packages/be-di-ilitia** Esta é uma lib responsável pela injeção de dependência, com um código enxuto e direto ao ponto. Veio para fazer apenas uma coisa: injetar dependências. Simples assim! E o melhor de tudo é que funciona tanto para o backend quanto para o frontend! 😄 [mais info](packages/be-di-ilitia/readme.md).
   
9.  **packages/be-router-angelo** Esta biblioteca utiliza o 'packages/be-di-ilitia' para configurar as rotas da sua REST API. Atualmente, conta com um adaptador específico para o Fastify.js, mas não se preocupe, adicionar suporte para outras bibliotecas como o Express.js é tão fácil quanto preparar uma xícara de café pela manhã! ☕️✨ [mais info](packages/be-router-angelo/readme.md).

## 🚀 Tecnologias

Principais tecnologias que utilizei para desenvolver esta aplicação mobile

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [NativeWind](https://www.nativewind.dev/)
- [React Router DOM](https://reacttraining.com/react-router/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Apache Kafka](https://kafka.apache.org/)
- [Socket.io](https://socket.io/)

## Guia de inicialização

Para instalar e configurar uma cópia local, siga estas etapas simples:

### Prerequisitos

Para garantir o funcionamento adequado do nosso aplicativo, verifique:


1. **Docker** Caso não o tenha faça download através deste [link aqui](https://www.docker.com/products/docker-desktop)
2. **node@v20.9.0**
  ```sh
  nvm use v20.9.0
  ```

3. **yarn@1.22.21**
  ```sh
  # Instalação para IOS
  
  # Opção 1
  $ brew install yarn@1.22.21
  
  # Opção 2
  arch -arm64 brew install yarn
  
  # Instale usando npm
  npm install --global yarn@1.22.21
  ```
### Guia de inicialização

Para inicializar o **backend**, basta seguir as instruções abaixo:

1. Clone o repositório:
   ```sh
   git clone git@github.com:joisiney/monorepo-tsx-decorator-kafka.git
   ```

2. Instale os módulos do YARN:
   ```sh
   yarn install
   ```

3. Inicialize o **mysql** através do Docker Compose:
   ```sh
   yarn apolo:docker-up
   ```
4. Copie o arquivo `apps/be-apolo/.env-development` e salve como `.env`. Observação: O Kafka não está no Docker, pois nesta POC optei por usar o Kafka do `https://upstash.com/`. Neste caso, crie uma conta no UPSTASH e crie um tópico com o nome `news.send-news`. Em seguida, preencha as credenciais de acesso corretamente no arquivo `.env`.
5. Copie o arquivo `apps/be-demeter/.env-development` e salve como `.env`, preenchendo as credenciais de acesso do Kafka com os mesmos dados que você inseriu no item 4.
6. . Inicialize o aplicativo **apolo**, responsável pela API REST e pela consumação de mensagens do KAFKA:
   ```sh
   yarn apolo:dev
   ```
   Se tudo ocorrer conforme o esperado, você deverá visualizar o seguinte **log** em seu terminal:
```bash
┌─────────┬──────────────────┬──────────┬─────────────────────┐
│ (index) │    CONTROLLER    │  METHOD  │        LINK         │
├─────────┼──────────────────┼──────────┼─────────────────────┤
│    0    │ 'NewsController' │  'GET'   │   '/olympus/news'   │
│    1    │ 'NewsController' │  'GET'   │ '/olympus/news/:id' │
│    2    │ 'NewsController' │  'POST'  │   '/olympus/news'   │
│    3    │ 'NewsController' │  'PUT'   │ '/olympus/news/:id' │
│    4    │ 'NewsController' │ 'DELETE' │ '/olympus/news/:id' │
└─────────┴──────────────────┴──────────┴─────────────────────┘
┌─────────┬──────────────────┬──────────┬─────────────────────┐
│ (index) │    CONTROLLER    │  METHOD  │        LINK         │
├─────────┼──────────────────┼──────────┼─────────────────────┤
│    0    │ 'UserController' │  'POST'  │   '/olympus/user'   │
│    1    │ 'UserController' │  'GET'   │ '/olympus/user/:id' │
│    2    │ 'UserController' │  'GET'   │   '/olympus/user'   │
│    3    │ 'UserController' │ 'DELETE' │ '/olympus/user/:id' │
│    4    │ 'UserController' │  'PUT'   │ '/olympus/user/:id' │
└─────────┴──────────────────┴──────────┴─────────────────────┘
Server listening at http://[::1]:3001 🚀🚀
```
   O objetivo deste **log** é apresentar todas as rotas criadas, juntamente com seus respectivos métodos de acesso. Se você utiliza o VSCode e tem o hábito de usar o plugin `REST Client` na pasta `/rest-client-http`, todos os métodos estão cadastrados e atualizados lá 😜.
1. Inicialize o **aplicativo atena**:
   1. Copie o arquivo `apps/fe-rn-atena/.env.example` e salve-o como `.env`.
      - **OBS:** O React Native Android não acessa o host `localhost` da mesma forma que um aplicativo da web. Você deve usar `http://10.0.2.2:3001`, que é um alias para `http://127.0.0.1:3001`, de acordo com a documentação do emulador Android. No iPhone, continue usando `http://localhost:3001`.
   2. Execute `yarn atena:prebuild` para criar os artefatos do **Android/iPhone**.
      1. Por algum motivo, se este comando `yarn atena:prebuild` não funcionar, vá para o diretório `apps/fe-rn-atena` e execute `yarn prebuild`.
   3. Execute `yarn atena:android` para iniciar o aplicativo no emulador **Android**.
   4. Execute `yarn atena:ios` para iniciar o aplicativo no emulador **iPhone**.
2. Com o **apolo** (API REST) inicializado e duas instâncias do aplicativo **atena** abertas, é hora de produzir mensagens. Execute `yarn demeter:dev`; ele irá produzir 10 mensagens, uma a cada 10 segundos, e as enviará usando o KAFKA, para que o **apolo** consuma essas mensagens e dispare notificações via `socket.io` para que o **atena** as receba.
3. Para executar os testes unitários, simplesmente rode o comando yarn test. Se tudo correr como esperado, você verá algo semelhante ao bloco abaixo, que informará a quantidade de testes realizados no projeto.
```bash
 ✓ packages/vitest-kairos/src/gateway-eros/src/services/client-http/adapters/axios-client.spec.ts (6)
 ✓ packages/vitest-kairos/src/gateway-eros/src/services/client-http/index.spec.ts (4)
 ✓ packages/vitest-kairos/src/be-apolo/src/infra/repositories/news/mock.repository.spec.ts (7)
 ✓ packages/vitest-kairos/src/fe-rn-atena/src/pages/news/hooks/find-all-service.hook.spec.ts (1)
 ✓ packages/vitest-kairos/src/fe-rn-atena/src/components/header-list/header.spec.tsx (6)
 ✓ packages/vitest-kairos/src/be-apolo/src/infra/repositories/user/typeorm.repository.spec.ts (7)

 Test Files  6 passed (6)
      Tests  31 passed (31)
   Start at  19:40:51
   Duration  1.15s (transform 485ms, setup 660ms, collect 1.66s, tests 192ms, environment 1ms, prepare 377ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```


## Guia de comandos úteis da aplicação:

O principal objetivo dos comandos no arquivo package.json é criar atalhos para os links dos subaplicativos.

| Bash/Script              | Descrição                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `yarn test`              | Executa todos os testes da aplicação com o Vitest                                  |
| `yarn coverage`          | Gera o coverage do monorepo                                                        |
| `yarn lint:fix`          | Formata todos os arquivos `ts` e `tsx`                                             |
| `yarn lint`              | Verifica todos os arquivos `ts` e `tsx`                                            |
| `yarn reset`             | Remove todas as pastas `node_modules`, `dist` e `yarn.lock`                        |
| `yarn build`             | Gera o bundle de todos os projetos                                                 |
| `yarn start`             | Inicia todos os projetos em modo de produção (Depende de ter bundle pré-existente) |
| `yarn dev`               | Inicia todos os projetos em modo de `Hot reload`                                   |
| `yarn apolo:dev`         | Inicia o Apolo em modo de `Hot reload`                                             |
| `yarn clean`             | Remove todas as pastas `dist`                                                      |
| `yarn apolo:docker-up`   | Levanta o banco `MySQL`                                                            |
| `yarn apolo:docker-down` | Derruba o banco `MySQL`                                                            |
| `yarn atena:prebuild`    | Cria os artefatos pré-requisito para inicializar o Android e iPhone.               |
| `yarn atena:android`     | Inicia o app `Atena` no Android em modo de `Hot reload`                            |
| `yarn atena:ios`         | Inicia o app `Atena` no iPhone em modo de `Hot reload`                             |



## Usage

A parte de notícias está implementada utilizando mock, este CRUD está totalmente administrado pelo APP Atena. A parte do CRUD de usuário ainda está apenas como API REST 🥶 mas pretendo implementar a funcionalidade no APP.

## Roadmap

- [x] Criar CRUD de notícias em memoria (MOCK)
  - [x] Teste unitário/integração (Em andamento)
  - [x] Producer Apache Kafka
  - [x] Consumer Apache Kafka
  - [x] Disparo de notificação com Socket.io
- [x] Criar CRUD de usuário com TypeORM e MYSQL
  - [x] Teste unitário/integração (Em andamento)
- [x] Implementar notícias no APP
  - [x] Integração com API REST
  - [x] Integração com Socket.IO
  - [x] Teste unitário/integração (Em andamento)
- [x] Implementar usuário no APP
  - [x] Integração com API REST

## APP UX

Desenvolvi o aplicativo com o mínimo de telas possível, concentrando todas as funcionalidades em uma única interface. O desafio principal foi garantir que o CRUD funcionasse perfeitamente nesse contexto. Embora seja um aplicativo básico em termos de recursos visíveis, foquei na sua arquitetura de software e escalabilidade para assegurar sua eficiência e potencial de crescimento futuro.

<p align="center">
<img alt="Olympus News" src="https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707882909/github/Captura_de_Tela_2024-02-14_a%CC%80s_00.54.55_ppj0fd.png" />
</p>

## Vídeo demonstrando a funcionalidade implementada em pleno funcionamento.
<a href="https://vimeo.com/manage/videos/915146731/3d16dbfe16?extension_recording=true" target="_blank">Link de apresentação simples</a>