# SERVICE KAFKA DEMETER

Neste projeto, não vamos usar o Docker para iniciar o Kafka. Em vez disso, iremos utilizar o [Upstash](https://upstash.com). Basta acessar este site, criar sua conta e criar um cluster Kafka e um tópico chamado `news.send-news` para que possamos enviar notificações para o Apolo.

### Informações sobre como criar um kafka tópico/cluster

1. O nome do cluster pode ser o nome do projeto mesmo, não há segredo.
2. O nome do tópico deve seguir a seguinte convenção, que é `NOME_DO_SERVICO` + `.` + `QUAL_E_O_EVENTO`. Em nosso caso, o serviço se chama `news` e o evento se chama `send-news`, formando o tópico `news.send-news`.
3. Ao finalizar o cadastro, você terá acesso às credenciais de acesso, algo semelhante a isto:
   ![Credenciais Upstash](https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707931501/github/c6ixrffrcdifww3o5rm7.png)
4. Agora, basta duplicar o arquivo `.env.example` e adicionar suas credenciais.

## Arvore de pastas

Demonstração de como este serviço foi modelado.

```
.
└── src
    ├── application
    │   ├── dto
    │   │   └── index.dto.ts
    │   └── use-cases
    │       └── producer.use-case.ts
    └── infra
        └── server.ts
```