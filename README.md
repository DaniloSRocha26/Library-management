# 📚 Library Management System

Esse projeto é o **backend lógico** de um sistema de livraria. Estou desenvolvendo ele para fixar conceitos avançados de **TypeScript** e **Programação Orientada a Objetos (POO)** antes de conectar com o Frontend (React).

O foco aqui não foi apenas fazer o código funcionar, mas sim criar uma **arquitetura limpa**, separando as responsabilidades corretamente entre Classes, Interfaces e Enums.

## 🧠 O que estou praticando

No começo desse projeto, evitei frameworks para entender como as coisas funcionam "por baixo do capô". Apliquei conceitos como:

-   **Encapsulamento:** Protegendo dados sensíveis com `private fields` e expondo apenas o necessário via `getters`.
-   **Interfaces:** Criando contratos (`IBook`, `IUser`) para facilitar a futura integração com API/Banco de Dados.
-   **Enums:** Para evitar "strings mágicas" no controle de status dos livros.
-   **Lógica de Negócio:** Validações reais (ex: checar limites de empréstimo antes de liberar o livro).

## ⚙️ Funcionalidades (Core)

Atualmente, o sistema roda totalmente em TypeScript e já suporta:

-   **CRUD de Livros:** Criar, buscar, listar e deletar.
-   **Edição Inteligente:** O método `updateBook` aceita objetos parciais (posso mandar só o título para corrigir, sem precisar mandar o autor junto).
-   **Gestão de Empréstimos:**
    -   O sistema impede que um livro já emprestado seja pego por outra pessoa.
    -   Controle de histórico (o usuário sabe quais livros estão com ele).

## 📂 Como o código está organizado

Separei o código em camadas para facilitar a manutenção:

-   `src/entities`: Onde ficam as classes com a lógica (User, Book, Library).
-   `src/interfaces`: Os "contratos" que definem o formato dos dados.
-   `src/core/enums`: Padronização de status (`Available`, `Borrowed`, etc).

## 🚀 Como rodar

Como ainda não tem interface visual, os testes são feitos via terminal rodando o arquivo de simulação:

1. Clone o repo:

```bash
git clone https://github.com/DaniloSRocha26/library-management.git
```
