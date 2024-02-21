# VITEST KAIROS

Serviço responsável por todos os testes do monorepo. Todo e qualquer teste, seja unitário, de integração ou E2E, deve ser realizado no Kairos.


## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
├── src
│   ├── be-apolo
│   │   └── src
│   │       └── infra
│   │           └── repositories
│   │               ├── news
│   │               │   └── mock.repository.spec.ts
│   │               └── user
│   │                   └── typeorm.repository.spec.ts
│   ├── fe-rn-atena
│   │   └── src
│   │       ├── components
│   │       │   └── header-list
│   │       │       └── header.spec.tsx
│   │       └── pages
│   │           └── news
│   │               └── hooks
│   │                   └── find-all-service.hook.spec.ts
│   ├── gateway-eros
│   │   └── src
│   │       └── services
│   │           └── client-http
│   │               ├── adapters
│   │               │   └── axios-client.spec.ts
│   │               └── index.spec.ts
│   └── utils
│       ├── mocks
│       │   ├── news.mock.ts
│       │   ├── pagination.mock.ts
│       │   └── user.mock.ts
│       ├── pick.ts
│       ├── react-query.tsx
│       └── setup.ts
└── vitest.config.ts
```