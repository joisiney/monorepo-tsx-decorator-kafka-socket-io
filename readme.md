# Olimpo News
Aqui será o ponto focal de toda a documentação de todos os fluxos que criaremos dentro da OLYMPUS, sendo constantemente e obrigatóriamente atualizado.
<br></br>
## Quais são os **workspaces** e qual é a responsábilidade de cada um?
<br></br>
- **be-demeter:** Servidor responsável pela consumir das notícias na fila do Apache Kafka
- **be-apolo:** Servidor responsável pela produção de notícias e enviar para a fila do Apache Kafka
- **fe-atena:** Aplicação feita em react-native inicializada com expo.
- **lib-hera:** Código *javascript* compartilhado entre todos os projetos
- **lint-zeus:** Configuração global de datilografia e formatação do TypeScript
<br></br>
## Documentação dos **workspaces**
<br></br>
- [BE-DEMETER](docs/demeter.md)
- [BE-APOLO](docs/apolo.md)
- [FE-ATENA](docs/atena.md)
- [LIB-HERA](docs/hera.md)
- [LINT-ZEUS](docs/zeus.md)

No minuto 49 o cara ensina como transilar tsx do monorepo UX para o projeto