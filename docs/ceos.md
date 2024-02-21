# DOMAIN CEOS

O núcleo da aplicação! Aqui, encontram-se todas as interfaces e entidades do BE. Essas entidades e interfaces podem e devem ser usadas pelo FE. No entanto, caso o FE precise adicionar funcionalidades, ele não deve usar a classe diretamente. Em vez disso, deve estendê-la e adicionar os **getters/setters** necessários. A ideia é manter as interfaces sincronizadas entre o FE e o BE, garantindo a integridade entre os sistemas.


## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
└── src
    ├── domain
    │   ├── dto
    │   │   ├── index.ts
    │   │   ├── news.dto.ts
    │   │   └── user.dto.ts
    │   └── entities
    │       ├── index.ts
    │       ├── news.entity.ts
    │       └── user.entity.ts
    └── index.ts
```