<h1 align="center">😇 Olimpo News</h1>
<p align="center">Olympus News é um monorepositório que integra o BE e o FE de um gerador de notícias.<br/><strong>Está é apenas uma POC de RN/KAFKA</strong>.</p>

<p align="center">
<img alt="WR At Home" src="https://pics.freeicons.io/premium/prometheus-greek-god-mythology-olympus-fire-icon-520970-256.png" />
</p>

## 🥶 Sobre o projeto
### Dividi-o em X workspaces dentro do monorepo para facilitar o reaproveitamento de código

- **be-demeter:** Servidor responsável por consumir as notícias na fila do Apache Kafka
- **be-apolo:** Servidor responsável pela produção de notícias e envio para a fila do Apache Kafka
- **fe-atena:** Aplicação feita em React Native inicializada com Expo.
- **lib-hera:** Código JavaScript compartilhado entre todos os projetos
- **lint-zeus:** Configuração global de tipagem e formatação do TypeScript

## Documentação dos **workspaces**
- [BE-DEMETER](docs/demeter.md)
- [BE-APOLO](docs/apolo.md)
- [FE-ATENA](docs/atena.md)
- [LIB-HERA](docs/hera.md)
- [LINT-ZEUS](docs/zeus.md)

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

## 💻 Começando

### Requisitos

**Clone o projeto e acesse a pasta**

```bash
$ git clone git@github.com:joisiney/monorepo-tsx-decorator-kafka.git
```

**Siga os passos abaixo**

```bash
# Instale as dependências com yarn ou npm
$ yarn

# Iniciando todas as aplicações em paralelo
$ yarn start
```