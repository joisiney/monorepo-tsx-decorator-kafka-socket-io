<h1 align="center">😇 Olimpo News</h1>
<p align="center">Olympus News é um monorepositório que integra o BE e o FE de um gerador de notícias.<br/><strong>Está é apenas uma POC de RN/KAFKA/SOCKET.IO</strong>.</p>

<p align="center">
<img alt="Olympus News" src="https://img.freepik.com/vetores-gratis/conjunto-de-pessoas-e-elementos-do-antigo-imperio-romano-soldados-mulheres-guerreiras-imperador-colunas-cidadaos-senador-em-fundo-branco_575670-1254.jpg?w=1380&t=st=1707880477~exp=1707881077~hmac=49cfea368b757a3ae20c352d3852e2bcf5c3bf7f848e6120bda6a42537e32448" />
</p>

## 🥶 Sobre o projeto

Dividi-o em 7 workspaces dentro do monorepo para garantir a escalabilidade do projeto em uma arquitetura robusta e escalável.

1. **app/be-demeter:** Este serviço é responsável por produzir as notícias na fila do Apache Kafka, enviadas pelo `app/be-apolo`. [mais info](docs/demeter.md)
2. **app/be-apolo:** Esta API REST é responsável pela consumir e envio de notícias para a fila do Apache Kafka. Além disso, este servidor também é responsável pelo gerenciamento do CRUD de usuários. [mais info](docs/apolo.md)
3. **app/fe-rn-atena:** Este APP, desenvolvido em React Native e inicializado com Expo, é responsável pela visualização do CRUD de notícias e usuários. Além disso, ele irá lidar com a atualização em tempo real das notícias e dos usuários. [mais info](docs/atena.md)
4. **packages/lib-ceos:** É onde fica a camada de `domain` da aplicação. Esta camada será responsável por centralizar a lógica de todos os aplicativos em um único pacote, facilitando a manutenção e escalabilidade. [mais info](docs/ceos.md)
5. **packages/lib-hera:** Bibliotecas comuns utilizadas por todos os `apps/*` ou `packages/*`. [mais info](docs/hera.md)
6. **packages/lint-zeus:** Este modulo é responsável por definir as configurações padrão globais para o `lint` e `prettier` dentro do `monorepo`. [mais info](docs/zeus.md)
7. **packages/vitest-kairos:** Prepare-se para uma revolução nos testes! Este módulo é o coração pulsante de todos os testes unitários, de integração e end-to-end da nossa aplicação. Chega de perder tempo configurando ambientes de teste em cada projeto! Aqui, reunimos toda a força e energia para garantir que todos os testes da aplicação sejam escritos com paixão e precisão. Este é o lugar onde a magia dos testes acontece! [mais info](docs/kairos.md).

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

1. Clone o repositório
   ```sh
   git clone git@github.com:joisiney/monorepo-tsx-decorator-kafka.git
   ```
2. Instale YARN modules
   ```sh
   yarn install
   ```
3. Execute o comando que cria o __link__ entre os repositórios, permitindo que as dependências entre eles possam funcionar.
   ```sh
   yarn link:all
   ```
4. Inicializando o __mysql__ através do docker composer
   ```sh
   yarn start:mysql:apolo
   ```
5. Inicializando o **backend**
   ```sh
   yarn start:dev:apolo
   ```
   Se tudo der certo deverá ver o seguinte __log__ em seu terminal:
   <img src="https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707882723/github/Captura_de_Tela_2024-02-14_a%CC%80s_00.51.58_r8lg3q.png" alt=""/>
   O objetivo deste **log** é apresentar todas as rotas criadas, juntamente com seus respectivos métodos de acesso.
   Se você utiliza o VSCode e tem o hábito de usar o plugin `REST Client` na pasta `/rest-client-http`, todos os métodos estão cadastrados e atualizados lá 😜.<br/><br/>
   **Erro ao inicializar o Apollo** 😢<br/>
   Não se preocupe, vamos resolver isso juntos. Neste repositório, você encontrará todos os pacotes com a pasta `packages/**/dist` compilada, que podem ter alguma incompatibilidade com sua configuração. Para resolver isso, basta executar `yarn remove:all`. Esse comando irá apagar todas as pastas `packages/**/dist` já compiladas. Em seguida, execute novamente `yarn start:dev:apollo`, que deve começar a funcionar corretamente.
6. Inicializando o **app**, o primeiro passo é fazer uma cópia do arquivo `apps/fe-rn-atena/.env.example` e salvá-lo como `.env`.<br/>
    **OBS:** O React Native não pode acessar o host local da mesma forma que um aplicativo da web. Você deve usar `http://10.0.2.2:3001`, que é um alias para `http://127.0.0.1:3001`, de acordo com a documentação do emulador Android.
7. Para executar os testes, basta rodar `yarn test` no diretório raiz onde se encontra o arquivo `package.json`, ou no módulo responsável pelos testes em `packages/vitest-kairos/package.json`. Isso mostrará os testes realizados até o momento com o Vitest.
<img src="https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707916641/github/svccujdpeyrhgpz9lchi.png?nocache=1" alt="test">


## Guia de comandos úteis da aplicação:

O principal objetivo dos comandos no arquivo package.json é criar atalhos para os links dos subaplicativos.

| Bash/Script                    | Descrição                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `yarn test`                    | Executa todos os testes da aplicação com o vitest                                                                            |
| `yarn link:all`                | Cria links entre todas as aplicações, isto permite que um app acesso um package por exemplo                                  |
| `yarn start:mysql:apolo`       | inicializa o banco de dados `mysql` no `docker`, seria o mesmo que vc em `apps/be-apolo` e digitasse `docker-composer up -d` |
| `yarn stop:mysql:apolo`        |                                                                                                                              |
| `yarn start:prd:apolo`         |                                                                                                                              |
| `yarn start:dev:apolo`         |                                                                                                                              |
| `yarn start:dev:atena:android` |                                                                                                                              |
| `yarn start:dev:atena:ios`     |                                                                                                                              |
| `yarn start:prd`               | Inicializando todos os `serviços/api` em modo de produção                                                                    |
| `yarn start:dev`               | Inicializando todos os `serviços/api` em modo de desenvolvimento                                                             |
| `yarn build:apolo`             |                                                                                                                              |
| `yarn build:ceos`              |                                                                                                                              |
| `yarn build:hera`              |                                                                                                                              |
| `yarn build`                   | Fazendo `build` de todos os `serviços/api` para produção                                                                     |


## Usage

A parte de notícias está implementada utilizando mock, este CRUD está totalmente administrado pelo APP Atena. A parte do CRUD de usuário ainda está apenas como API REST 🥶 mas pretendo implementar a funcionalidade no APP.

## Roadmap

- [x] Criar CRUD de notícias em memoria (MOCK)
  - [ ] Teste unitário/integração (Em andamento)
  - [ ] Producer Apache Kafka (Em andamento)
  - [ ] Consumer Apache Kafka (Em andamento) 
- [x] Criar CRUD de usuário com TypeORM e MYSQL
  - [ ] Teste unitário/integração (Em andamento)
- [x] Implementar notícias no APP
  - [x] Integração com API REST
  - [ ] Integração com Socket.IO
  - [x] Teste unitário/integração (Em andamento)
- [ ] Implementar usuário no APP
  - [x] Integração com API REST

## APP UX

Desenvolvi o aplicativo com o mínimo de telas possível, concentrando todas as funcionalidades em uma única interface. O desafio principal foi garantir que o CRUD funcionasse perfeitamente nesse contexto. Embora seja um aplicativo básico em termos de recursos visíveis, foquei na sua arquitetura de software e escalabilidade para assegurar sua eficiência e potencial de crescimento futuro.

<p align="center">
<img alt="Olympus News" src="https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707882909/github/Captura_de_Tela_2024-02-14_a%CC%80s_00.54.55_ppj0fd.png" />
</p>

## Vídeo demonstrando a funcionalidade implementada em pleno funcionamento.
[Link de apresentação simples feito com Video](https://vimeo.com/manage/videos/912920778/9a01d9e851/player?extension_recording=true)