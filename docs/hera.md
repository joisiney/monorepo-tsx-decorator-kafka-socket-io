# LIB HERA

Biblioteca criada para compartilhamento de código com todos os **apps**


## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
└── src
    ├── application
    │   ├── services
    │   │   └── transform-exception.service.ts
    │   └── shared
    │       ├── either
    │       │   ├── index.ts
    │       │   ├── left.ts
    │       │   └── right.ts
    │       ├── exception
    │       │   ├── bad-request.exception.ts
    │       │   ├── conflict.exception.ts
    │       │   ├── index.ts
    │       │   ├── internal-server.exception.ts
    │       │   ├── not-found.exception.ts
    │       │   └── zod.exception.ts
    │       └── index.ts
    ├── composers
    │   └── controller
    │       ├── controller.composer.ts
    │       ├── controller.params.ts
    │       ├── controller.parser.ts
    │       ├── index.dto.ts
    │       └── index.ts
    ├── decorators
    │   ├── index.dto.ts
    │   ├── injection
    │   │   ├── index.decorator.ts
    │   │   ├── index.dto.ts
    │   │   ├── index.factory.ts
    │   │   └── index.ts
    │   └── resolver
    │       ├── controller.decorator.ts
    │       ├── index.dto.ts
    │       ├── index.ts
    │       └── route.decorator.ts
    ├── domain
    │   └── entities
    │       └── pagination
    │           ├── index.dto.ts
    │           └── index.entity.ts
    ├── index.ts
    └── utils
        └── types
            └── index.d.ts
```