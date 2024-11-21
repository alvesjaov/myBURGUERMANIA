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

## Hospedagem

A aplicação está hospedada no Vercel e pode ser acessada através do seguinte link: [MyBURGUERMANIA](https://my-burguermania.vercel.app/).

Os endpoints utilizam um `db.json` hospedado também no Vercel, acessível nos seguintes links:
```
https://json-server-burguermania.vercel.app/products
https://json-server-burguermania.vercel.app/orders
https://json-server-burguermania.vercel.app/finalizedOrders
```
## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento. Abra [http://localhost:4200](http://localhost:4200) para visualizá-la no navegador.

### `npm run build`

Compila a aplicação para produção na pasta `dist`.

### `npm test`

Executa os testes unitários via Karma.

## Configuração do Ambiente de Desenvolvimento

### Extensões Recomendadas

As seguintes extensões do Visual Studio Code são recomendadas para um melhor desenvolvimento:

```
{
    "recommendations": ["angular.ng-template"]
}
```

### Configuração do Servidor JSON

Para executar o servidor JSON localmente, use o comando:

```
json-server db.json --port 3000
```

## Uso

### Visualizar o Cardápio

Acesse a página do cardápio para visualizar os produtos disponíveis.

### Fazer um Pedido

Selecione os produtos desejados e adicione-os ao pedido.

### Finalizar Pedido

Preencha as informações necessárias e finalize o pedido.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Futuras Alterações

- Adicionar histórico de pedidos

## Galeria de Fotos

Confira algumas fotos do projeto:

<img src="/src/assets/images/print-tela-inicial.png" alt="Tela Inicial">

<img src="/src/assets/images/tela-inicial-responsiva.jpg" alt="Tela Inicial Responsiva">
