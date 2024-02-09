# Olimpo News

- Este projeto foi dividido em 5 subprojetos, vou descrever cada um:
  - **be-apolo:** Servidor responsável pela consumir das notícias na fila do Apache Kafka
  - **be-demeter:** Servidor responsável pela produção de notícias e enviar para a fila do Apache Kafka
  - **fe-atena:** Aplicação feita em react-native inicializada com expo.
  - **lib-hera:** Código *javascript* compartilhado entre todos os projetos
  - Consumidor de notícias


Sempre que cria um pacote dentro dele tem que executar
```bash
yarn link
# Este comando faz build de um unico
yarn tsc --build packages/lib-hera/tsconfig.json
```


comandos iniciais:
```bash
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-n eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks prettier tsx typescript @types/node vitest



```
```bash
yarn add reflect-metadata zod fastify stacktrace-js useragent
```


Video aula
https://www.youtube.com/watch?v=QeDgjmwN7kM&t=815s