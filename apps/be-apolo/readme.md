# REST API APOLO

Servidor responsável pelas APIs REST de usuários e notícias, assim como notificar e disparar notificações via socket.io quando uma nova notícia é criada, atualizada ou excluída. As notícias podem ser criadas via API REST ou via 'Demeter', que é outro serviço responsável por produzir e disparar via Kafka para que o 'Apolo' possa consumi-las.


## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
└── src
    ├── application
    │   ├── controllers
    │   │   ├── news
    │   │   │   ├── dto
    │   │   │   │   ├── all.dto.ts
    │   │   │   │   ├── news.dto.ts
    │   │   │   │   └── put.dto.ts
    │   │   │   └── index.controller.ts
    │   │   └── users
    │   │       ├── dto
    │   │       │   ├── create.dto.ts
    │   │       │   ├── id.dto.ts
    │   │       │   └── put.dto.ts
    │   │       └── index.controller.ts
    │   ├── dto
    │   │   └── id.dto.ts
    │   └── use-cases
    │       ├── news
    │       │   ├── create
    │       │   │   ├── index.dto.ts
    │       │   │   └── index.use-case.ts
    │       │   ├── find-all
    │       │   │   ├── index.dto.ts
    │       │   │   └── index.use-case.ts
    │       │   ├── find-id
    │       │   │   ├── index.dto.ts
    │       │   │   └── index.use-case.ts
    │       │   ├── remove
    │       │   │   ├── index.dto.ts
    │       │   │   └── index.use-case.ts
    │       │   └── update
    │       │       ├── index.dto.ts
    │       │       └── index.use-case.ts
    │       └── users
    │           ├── create
    │           │   ├── index.dto.ts
    │           │   └── index.use-case.ts
    │           ├── find-all
    │           │   ├── index.dto.ts
    │           │   └── index.use-case.ts
    │           ├── find-id
    │           │   └── index.use-case.ts
    │           ├── remove
    │           │   └── index.use-case.ts
    │           └── update
    │               ├── index.dto.ts
    │               └── index.use-case.ts
    └── infra
        ├── database
        │   └── typeorm
        │       ├── data-source.ts
        │       ├── entities
        │       │   └── user.entity.ts
        │       └── migrations
        │           ├── 1699354629453-create-user-table.ts
        │           └── 1707261901674-add-password-column-user-table.ts
        ├── repositories
        │   ├── news
        │   │   ├── index.dto.ts
        │   │   └── mock.repository.ts
        │   └── user
        │       ├── index.dto.ts
        │       └── typeorm.repository.ts
        └── server.ts
```