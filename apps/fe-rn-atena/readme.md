# APP REACT-NATIVE ATENA

Aplicativo responsável por apresentar o **CRUD** de notícias e usuários, sendo que no caso das notícias, as atualizações são realizadas via **Socket.IO**.


## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
└── src
    ├── @core
    │   └── domain
    │       └── entities
    │           ├── news.entity.ts
    │           └── user.entity.ts
    ├── @types
    │   ├── declarations.d.ts
    │   ├── nativewind.d.ts
    │   ├── png.d.ts
    │   └── svg.d.ts
    ├── components
    │   ├── button.tsx
    │   ├── empty-state.tsx
    │   ├── header-list.tsx
    │   ├── input-list.tsx
    │   ├── item-list.tsx
    │   └── loading.tsx
    ├── layout
    │   └── root.layout.tsx
    ├── navigation
    │   └── root-stack.navigator.tsx
    ├── pages
    │   ├── news
    │   │   ├── hooks
    │   │   │   ├── create-service.hook.ts
    │   │   │   ├── find-all-service.hook.ts
    │   │   │   ├── remove-service.hook.ts
    │   │   │   └── update-service.hook.ts
    │   │   ├── index.dto.ts
    │   │   └── index.tsx
    │   ├── user
    │   │   ├── hooks
    │   │   │   ├── create-service.hook.ts
    │   │   │   ├── find-all-service.hook.ts
    │   │   │   ├── remove-service.hook.ts
    │   │   │   └── update-service.hook.ts
    │   │   ├── index.dto.ts
    │   │   └── index.tsx
    │   └── welcome
    │       └── index.tsx
    ├── template
    │   └── list-crud
    │       ├── index.dto.ts
    │       ├── index.styl.ts
    │       └── index.tsx
    └── utils
        ├── envVars.ts
        ├── is
        │   └── device.ts
        └── socket.ts
```