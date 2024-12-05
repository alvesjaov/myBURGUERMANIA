# MyBURGUERMANIA

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.12.

## Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Hospedagem](#hospedagem)
- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Futuras Alterações](#futuras-alterações)
- [Galeria de Fotos](#galeria-de-fotos)

## Visão Geral

MyBURGUERMANIA é uma aplicação web para um restaurante fictício de hambúrgueres. A aplicação permite aos usuários visualizar o cardápio, fazer pedidos e finalizar compras.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
MyBURGUERMANIA/
├── .angular/
├── .cache/
├── .vscode/
├── public/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── footer/
│   │   │   └── header/
│   │   ├── views/
│   │   │   ├── home/
│   │   │   ├── menu/
│   │   │   └── order/
│   └── assets/
│       └── images/
├── .editorconfig
├── .gitignore
├── angular.json
├── db.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Instalação

No diretório do projeto, você pode executar: `npm install`

1. Instala todas as dependências necessárias para o projeto.  `npm start`

2. Executa a aplicação em modo de desenvolvimento. Abra [http://localhost:4200](http://localhost:4200) para visualizá-la no navegador.

3. Executa os testes unitários via Karma.

## Configuração do Ambiente de Desenvolvimento

### Visualizar o Cardápio

1. Acesse a página do cardápio para visualizar os produtos disponíveis.

### Fazer um Pedido

2. Para fazer um pedido, é necessário estar logado. Utilize as seguintes credenciais para login:
    - **Email:** admin@myburguer.com
    - **Senha:** Admin@123

3. Selecione os produtos desejados e adicione-os ao pedido clicando na sacola. Você pode adicionar mais produtos ou remover da sacola conforme necessário.

### Enviar Pedido

4. Envie o pedido e, na tela de pedido, veja o status do pedido, se ele está pendente ou em preparação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Futuras Alterações

- Adicionar histórico de pedidos

## Galeria de Fotos

Confira algumas fotos do projeto:

<img src="/src/assets/images/print-tela-inicial.png" alt="Tela Inicial">
